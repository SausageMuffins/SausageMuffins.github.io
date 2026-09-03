#!/usr/bin/env python3
"""Rebuild the byline avatar from images/profile_v3.jpg.

The source is a cutout Ryan made: the sitter on pure white. Two things have to
be undone before it can sit on a transparent background.

The cutout's edge is feathered about 12px into the sitter, blended with the
white behind it -- luminance ramps 212 -> 50 over that band. Shipped as-is those
pixels are opaque and pale, and the dark theme shows them as a glowing outline.
They are not pale subject, they are partly background, so the fix is to recover
how much: take each pixel's true colour F from the nearest uncontaminated core
pixel, then read alpha off the blend C = alpha*F + (1-alpha)*bg by least squares
over the three channels. Solving C for F instead would divide by alpha and turn
to noise exactly where alpha is smallest.

The photo also carries a cold cast (subject mean B > G > R) that fights the warm
paper, so a grey-world gain neutralises it.
"""
import os
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = sys.argv[1] if len(sys.argv) > 1 else 'images/profile_v3.jpg'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'images/profile.webp'
SIZE, QUALITY = 448, 88        # 4x the 112px byline photo
EDGE, CORE = 60.0, 10          # rough silhouette cut, and px eroded to reach clean colour
HEAD, AIR = 0.53, 0.01         # head fills 53% of the frame; the crown sits at the top edge, so
                               # the hair lands on the cap top of the name (see _byline.scss)
WARMTH = np.array([1.0, 1.0, 1.0])  # tilt after neutralising; >1 on R warms the sitter

im = Image.open(SRC).convert('RGB')
src = np.asarray(im).astype(np.float32)
h, w, _ = src.shape

ring = np.concatenate([src[:20].reshape(-1, 3), src[-20:].reshape(-1, 3),
                       src[:, :20].reshape(-1, 3), src[:, -20:].reshape(-1, 3)])
bg = np.median(ring, axis=0)
d = np.sqrt(((src - bg) ** 2).sum(axis=2))

# Every pixel takes the colour of the nearest core pixel, so no white survives
# anywhere in the rim to glow on the dark theme.
core = ndimage.binary_erosion(ndimage.binary_fill_holes(d > EDGE), iterations=CORE)
iy, ix = ndimage.distance_transform_edt(~core, return_indices=True)[1]
a = src[iy, ix]

den, num = bg - a, bg - src
alpha = np.clip((num * den).sum(axis=2) / np.maximum((den * den).sum(axis=2), 1e-6), 0, 1)
alpha[core] = 1.0

# Only background CONNECTED TO THE BORDER is transparent, so interior near-white
# areas (teeth, catchlights) stay opaque.
lab, n = ndimage.label(alpha < 0.5)
border = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
alpha[(alpha < 0.5) & ~np.isin(lab, border[border > 0])] = 1.0

# Keep only the sitter, in case the source carries a stray mark.
slab, sn = ndimage.label(alpha > 0.3)
if sn > 1:
    sizes = ndimage.sum(np.ones_like(slab), slab, range(1, sn + 1))
    keep = int(np.argmax(sizes)) + 1
    print('subject components %d; kept the largest (%d px), dropped %d px'
          % (sn, sizes[keep - 1], sizes.sum() - sizes[keep - 1]))
    alpha[slab != keep] = 0.0

mean = a[alpha > 0.5].mean(axis=0)
a = (a * (mean.mean() / mean) * WARMTH).clip(0, 255)
print('subject mean RGB %s -> %s' % (mean.round(1), a[alpha > 0.5].mean(axis=0).round(1)))

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

# The crop may reach above the source: this cutout is framed with the hair at
# the top edge, and PIL pads an out-of-bounds crop with transparent pixels,
# which is exactly the air wanted over the crown.
side = min(w, h, int((neck - crown) / HEAD))
top = min(h - side, crown - int(side * AIR))
left = max(0, min(w - side, head_cx - side // 2))
box = (left, top, left + side, top + side)

# Transparent, so the sitter reads on the light paper AND on the dark theme
# without a second file or a CSS filter; the theme toggle needs nothing.
rgba = np.dstack([a.round().astype(np.uint8),
                  (alpha * 255).round().clip(0, 255).astype(np.uint8)])
out = Image.fromarray(rgba, 'RGBA').crop(box).resize((SIZE, SIZE), Image.LANCZOS)
out.save(OUT, 'WEBP', quality=QUALITY, method=6)

print('crown %d neck %d head %dpx cx %d | crop %s side %d'
      % (crown, neck, neck - crown, head_cx, tuple(int(v) for v in box), side))
print('wrote %s  %dx%d  %d bytes  q%d' % (OUT, SIZE, SIZE, os.path.getsize(OUT), QUALITY))
