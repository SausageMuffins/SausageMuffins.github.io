#!/usr/bin/env python3
"""Rebuild the byline avatar from images/profile_v2.jpg.

The supplied file is a rounded-corner card: cream background (#faf1e2), white
outside the baked-in radius, a compositing seam at the upper right, and a soft
shadow beside the head. One cutout removes all four -- the background by colour
distance, the shadow by keeping only the largest connected component -- and the
sitter is written out on transparency, which is what makes one file work on
both themes.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = sys.argv[1] if len(sys.argv) > 1 else 'images/profile_v2.jpg'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'images/profile.webp'
SIZE, QUALITY = 448, 88         # 4x the 112px byline photo; 23.9 KB, budget 30 KB
LO, HI = 60.0, 110.0            # alpha ramp on colour distance from the background
HEAD, AIR = 0.47, 0.12          # head fills 47% of the frame; 12% of a side as air above it

im = Image.open(SRC).convert('RGB')
a = np.asarray(im).astype(np.float32)
h, w, _ = a.shape

ring = np.concatenate([a[40:60].reshape(-1, 3), a[-60:-40].reshape(-1, 3),
                       a[:, 40:60].reshape(-1, 3), a[:, -60:-40].reshape(-1, 3)])
bg = np.median(ring, axis=0)
d = np.sqrt(((a - bg) ** 2).sum(axis=2))

# Only background CONNECTED TO THE BORDER is removed, so interior near-cream
# areas (teeth, catchlights) keep their alpha.
lab, n = ndimage.label(d < HI)
border = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
outside = np.isin(lab, border[border > 0])

alpha = np.clip((d - LO) / (HI - LO), 0, 1)
alpha[~outside] = 1.0

# Keep only the sitter: the soft shadow beside the head is a separate blob that
# partly clears the threshold, and it reads as torn debris at byline size.
slab, sn = ndimage.label(alpha > 0.3)
if sn > 1:
    sizes = ndimage.sum(np.ones_like(slab), slab, range(1, sn + 1))
    keep = int(np.argmax(sizes)) + 1
    dropped = sizes.sum() - sizes[keep - 1]
    print(f'subject components {sn}; kept the largest ({int(sizes[keep-1])} px), '
          f'dropped {int(dropped)} px of shadow/debris')
    alpha[slab != keep] = 0.0

alpha = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8))
                   .filter(ImageFilter.GaussianBlur(0.6))).astype(np.float32) / 255

# Square crop driven by the HEAD, not the whole sitter: a body-relative crop
# leaves the face at a third of the frame, which is unreadable at 80-112px.
# The neck is the narrowest row of the silhouette between a quarter and a half
# of the way down, so crown -> neck measures the head without face detection.
m = alpha > 0.5
ys, xs = np.where(m)
crown, sub_h = ys.min(), ys.max() - ys.min()
rows = m.sum(axis=1)
band = slice(crown + int(sub_h * 0.25), crown + int(sub_h * 0.55))
neck = band.start + int(np.argmin(rows[band]))
head_cx = int(np.median([np.where(m[y])[0].mean()
                         for y in range(crown + 20, neck) if rows[y]]))

side = min(w, h, int((neck - crown) / HEAD))
top = max(0, min(h - side, crown - int(side * AIR)))
left = max(0, min(w - side, head_cx - side // 2))
box = (left, top, left + side, top + side)

# Transparent, so the sitter reads on the light paper AND on the dark theme
# without a second file or a CSS filter; the theme toggle needs nothing.
rgba = np.dstack([a.round().clip(0, 255).astype(np.uint8),
                  (alpha * 255).round().clip(0, 255).astype(np.uint8)])
out = (Image.fromarray(rgba, 'RGBA').crop(box).resize((SIZE, SIZE), Image.LANCZOS))
out.save(OUT, 'WEBP', quality=QUALITY, method=6)

import os
print(f'crown {crown} neck {neck} head {neck-crown}px cx {head_cx} | crop {tuple(int(v) for v in box)} side {side}')
print(f'wrote {OUT}  {SIZE}x{SIZE}  {os.path.getsize(OUT)} bytes  q{QUALITY}')
