#!/usr/bin/env python3
"""channel_svg.py -- static renders of the binary symmetric channel (plan 4.15).

Run from the repository root (the include path is resolved from this file):

    python3 _tools/channel_svg.py --include       # rewrites _includes/channel.html
    python3 _tools/channel_svg.py                 # interactive figure, p = 0.10, to stdout
    python3 _tools/channel_svg.py --static        # static figure (no button), p = 0.50
    python3 _tools/channel_svg.py --seed 0x5EED --p 0.10
    python3 _tools/channel_svg.py --json [--seed S]   # z, u and a p-sweep for the tests

The PRNG (mulberry32), the message (z, u interleaved from one stream) and H2
must stay bit-identical to the channel module in assets/js/site.js, which
adopts the interactive render and asserts it matches the seed.  Geometry:
cell 6, gap 3 (pitch 9), 20-unit label column; row Z at y=3, hairline at
y=16, row Z-hat at y=23; H=32.  `_tools` is in the Jekyll exclude list.
"""
import argparse
import json
import math
import os
import sys

MASK = 0xFFFFFFFF
SEED, P0, P_STATIC = 0x5EED, 0.10, 0.50
VARIANTS = (64, 40)
CELL, GAP, LABEL, H = 6, 3, 20, 32
PITCH = CELL + GAP
Y_Z, Y_LINE, Y_ZH = 3, 16, 23
INCLUDE = os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir, '_includes', 'channel.html')
COMMAND = 'python3 _tools/channel_svg.py --include'
# Labels: 13px mono, anchored mid at x=7. Z baseline 10.5 centres the cap on row Z;
# Z-hat sits at 31 (half a unit low) so the 1.5-unit hat clears both the hairline and the cap.


def mulberry32(seed):
    """Same sequence as the JS mulberry32 (int32 arithmetic emulated with masks)."""
    a = seed & MASK

    def rand():
        nonlocal a
        a = (a + 0x6D2B79F5) & MASK
        t = ((a ^ (a >> 15)) * (1 | a)) & MASK
        t = ((t + (((t ^ (t >> 7)) * (61 | t)) & MASK)) ^ t) & MASK
        return ((t ^ (t >> 14)) & MASK) / 4294967296
    return rand


def message(seed, n=max(VARIANTS)):
    """z[i] = rand() < 0.5, u[i] = rand(); flips are derived as u[i] < p, never stored."""
    rand = mulberry32(seed)
    z, u = [], []
    for _ in range(n):
        z.append(1 if rand() < 0.5 else 0)
        u.append(rand())
    return z, u


def h2(p):
    if p <= 0 or p >= 1:
        return 0.0
    return -p * math.log2(p) - (1 - p) * math.log2(1 - p)


def info(p):
    return max(0.0, 1 - h2(p))


def flips(u, p):
    return [i for i, x in enumerate(u) if x < p]


def width(n):
    return LABEL + n * PITCH - GAP


def rect(i, y, cls):
    # 5x5 at +0.5 with a 1px stroke fills the 6x6 cell edge to edge and stays crisp.
    return '<rect class="%s" x="%g" y="%g" width="5" height="5"/>' % (cls, LABEL + 0.5 + PITCH * i, y + 0.5)


def svg(n, z, u, p):
    w = width(n)
    k = len(flips(u[:n], p))
    out = ['<svg class="channel__svg channel__svg--%d" viewBox="0 0 %d %d" width="%d" height="%d" '
           'role="img" data-n="%d">' % (n, w, H, w, H, n),
           '<title>%d bits through a binary symmetric channel, p = %.2f, %d flipped</title>' % (n, p, k),
           '<g class="channel__labels" aria-hidden="true">',
           '<text class="channel__label" x="7" y="10.5" text-anchor="middle">Z</text>',
           '<text class="channel__label" x="7" y="31" text-anchor="middle">Z</text>',
           '<path class="channel__hat" d="M4.5 20.5L7 19L9.5 20.5"/>',
           '</g>',
           '<line class="channel__line" x1="%d" y1="%d" x2="%d" y2="%d" shape-rendering="crispEdges"/>'
           % (LABEL, Y_LINE, w, Y_LINE),
           '<g class="channel__z" shape-rendering="crispEdges">']
    for i in range(n):
        out.append(rect(i, Y_Z, 'channel__bit' + (' channel__bit--1' if z[i] else '')))
    out.append('</g>')
    out.append('<g class="channel__zhat" shape-rendering="crispEdges">')
    for i in range(n):
        f = 1 if u[i] < p else 0
        cls = 'channel__bit' + (' channel__bit--1' if z[i] ^ f else '') + (' channel__bit--flip' if f else '')
        out.append(rect(i, Y_ZH, cls))
    out.append('</g>')
    out.append('</svg>')
    return '\n'.join(out)


def aria_label(p):
    """The button's accessible name: the model and the current p (site.js keeps it in step)."""
    return 'Binary symmetric channel, p = %.2f. Send a new message.' % p


def caption(p):
    return ('<figcaption class="channel__caption">p = <span class="channel__p">%.2f</span> · '
            'I(Z;Ẑ) = 1 − H₂(p) = <span class="channel__i">%.2f</span> bit</figcaption>' % (p, info(p)))


def figure(z, u, p, seed=SEED, static=False):
    """Interactive: figure > button > svg x2, then figcaption (a button admits phrasing
    content only, so the caption is the button's sibling).  Static: figure > svg x2 + caption,
    no button, so the channel module in site.js leaves it alone."""
    strips = [svg(n, z, u, p) for n in VARIANTS]
    if static:
        return '\n'.join(['<figure class="channel channel--static" data-seed="0x%X">' % seed,
                          *strips, caption(p), '</figure>'])
    return '\n'.join(['<figure class="channel" data-seed="0x%X">' % seed,
                      '<button type="button" class="channel__send" aria-label="%s">' % aria_label(p),
                      *strips, '</button>', caption(p), '</figure>'])


def include(seed=SEED):
    """The whole _includes/channel.html: a comment, then one conditional on include.static."""
    z, u = message(seed)
    live, static = figure(z, u, P0, seed), figure(z, u, P_STATIC, seed, static=True)
    for body in (live, static):
        # Liquid reads {{ and {% (and the comment body must not close early); keep the
        # markup free of braces altogether so nothing in it can ever be parsed as Liquid.
        assert '{' not in body and '}' not in body, 'figure markup contains a brace'
    return '\n'.join([
        '{% comment %}',
        '  GENERATED by _tools/channel_svg.py -- do not hand-edit; regenerate from the repository root with',
        '    ' + COMMAND,
        '  Plan 4.15: the binary symmetric channel from seed 0x%X, N = 64 (>= 768px) and N = 40 variants.' % seed,
        '  Default: the interactive figure at p = %.2f (the channel module in site.js adopts it).' % P0,
        '  include.static = true: the static figure at p = %.2f, no button (the 404 page).' % P_STATIC,
        '{% endcomment %}',
        '{% if include.static %}',
        static,
        '{% else %}',
        live,
        '{% endif %}',
        '',
    ])


def dump(seed, z, u):
    sweep = sorted({round(i / 100, 2) for i in range(51)} | {0.02, 0.10, 0.25, 0.50})
    return {
        'seed': seed & MASK,
        'z': z,
        'u': u,
        'sweep': [{'p': p, 'p_str': '%.2f' % p, 'I': '%.2f' % info(p), 'flips': flips(u, p)} for p in sweep],
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--seed', type=lambda s: int(s, 0), default=SEED)
    ap.add_argument('--p', type=float, default=None, help='crossover probability (default 0.10; 0.50 with --static)')
    ap.add_argument('--static', action='store_true', help='the static figure: no button, p = 0.50')
    ap.add_argument('--json', action='store_true', help='z, u and a p-sweep for the tests')
    ap.add_argument('--include', action='store_true', help='write _includes/channel.html (both variants)')
    a = ap.parse_args()
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    if a.include:
        text = include(a.seed)
        with open(INCLUDE, 'w', encoding='utf-8', newline='\n') as f:
            f.write(text)
        print('wrote %s (%d bytes)' % (os.path.normpath(INCLUDE), len(text.encode('utf-8'))))
        return
    z, u = message(a.seed)
    if a.json:
        print(json.dumps(dump(a.seed, z, u)))
        return
    p = a.p if a.p is not None else (P_STATIC if a.static else P0)
    print(figure(z, u, p, a.seed, static=a.static))


if __name__ == '__main__':
    main()
