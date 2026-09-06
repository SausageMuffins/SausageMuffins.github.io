/* yurielryan.com — one classic deferred script (PLAN §5, §6.3): theme toggle,
   delegated clipboard, Contents scroll-spy, the channel (§4.15) and the
   figure lightbox.
   No timers except the 1.5 s "Copied" revert; no scroll listeners. */
(function () {
  'use strict';

  var root = document.documentElement;
  var BG = { light: '#f9f7f2', dark: '#171614' };

  /* ---- Theme (§4.14): system default, localStorage override -------------- */
  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    return t === 'dark' || t === 'light' ? t : systemTheme();
  }
  function paintThemeColor(theme) {
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', BG[theme]);
  }
  function labelToggle(btn, theme) {
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  function theme() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    labelToggle(btn, currentTheme());
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
      paintThemeColor(next);
      labelToggle(btn, next);
    });
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () { if (!root.getAttribute('data-theme')) labelToggle(btn, currentTheme()); };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  /* ---- Clipboard (§5 #5): the announcer, the 1.5 s label swap and the write
     itself, shared by every copy control on the site (the BibTeX buttons and
     the contact line). One aria-live region for all of them. */
  var clip = (function () {
    var live = null;
    function announce(msg) {
      if (!live) {
        live = document.createElement('span');
        live.className = 'sr-only';
        live.setAttribute('aria-live', 'polite');
        document.body.appendChild(live);
      }
      live.textContent = '';
      live.textContent = msg;
    }
    // Swap the control's own label for 1.5 s and colour it with .is-copied.
    // The original label is remembered on the first swap, so a second click
    // inside the window cannot latch "Copied" permanently.
    function feedback(el, label, message) {
      if (el._copyTimer) clearTimeout(el._copyTimer);
      else el._copyLabel = el.textContent;
      el.textContent = label;
      el.classList.add('is-copied');
      announce(message || label);
      el._copyTimer = setTimeout(function () {
        el.textContent = el._copyLabel;
        el.classList.remove('is-copied');
        el._copyTimer = null;
      }, 1500);
    }
    function write(text, ok, fail) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(ok, fail);
      } else {
        fail();
      }
    }
    return { announce: announce, feedback: feedback, write: write };
  })();

  /* One delegated handler for [data-copy]. Two contracts, both optional-free:
       data-copy-target="id"  copy that element's text (BibTeX blocks) — on
                              failure the block is revealed and selected;
       data-copy-text="…"     copy the literal string (contact line).
     data-copy-label / data-copy-message override the 1.5 s label and what the
     live region says. The target contract is unchanged. */
  function clipboard() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-copy]') : null;
      if (!btn) return;
      var literal = btn.getAttribute('data-copy-text');
      var label = btn.getAttribute('data-copy-label') || 'Copied';
      var message = btn.getAttribute('data-copy-message') || label;
      var target = null;
      var text;
      if (literal !== null) {
        text = literal;
      } else {
        target = document.getElementById(btn.getAttribute('data-copy-target'));
        if (!target) return;
        text = target.innerText || target.textContent || '';
      }
      function fail() {
        // Nothing to fall back to for a literal string: say so and leave the
        // control alone rather than flashing a success label.
        if (!target) { clip.announce('Copy failed'); return; }
        target.hidden = false;
        try {
          var range = document.createRange();
          range.selectNodeContents(target);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } catch (err) { /* nothing to select */ }
        clip.feedback(btn, 'Select & copy', 'Select & copy');
      }
      clip.write(text, function () { clip.feedback(btn, label, message); }, fail);
    });
  }

  /* ---- Enlarge (click-to-zoom): each figure in the prose is wrapped at
     runtime in a bare button, and one shared <dialog> shows it on the paper.
     Native modal, so Escape, the top layer and focus containment come free.
     Without HTMLDialogElement.showModal nothing is injected at all and the
     images stay exactly as they render now. */
  function lightbox() {
    if (!window.HTMLDialogElement) return;
    if (typeof document.createElement('dialog').showModal !== 'function') return;

    var figures = document.querySelectorAll('.prose img, .entry img');
    if (!figures.length) return;

    var dlg = null, view = null, opener = null;

    function build() {
      dlg = document.createElement('dialog');
      dlg.className = 'lightbox';
      var close = document.createElement('button');
      close.type = 'button';
      close.className = 'lightbox__close';
      close.textContent = 'Close';
      view = document.createElement('img');
      view.className = 'lightbox__img';
      view.setAttribute('decoding', 'async');
      dlg.appendChild(close); // first in the DOM, so showModal() lands here
      dlg.appendChild(view);
      close.addEventListener('click', function () { dlg.close(); });
      // The dialog box is the veil: a hit on it — and not on the figure or on
      // Close — is the backdrop click.
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener('close', function () {
        // Defer past the UA's own focus restoration so the trigger wins.
        var o = opener;
        if (o && document.contains(o)) setTimeout(function () { o.focus(); }, 0);
        opener = null;
      });
      document.body.appendChild(dlg);
    }

    function open(btn, img) {
      if (!dlg) build();
      if (dlg.open) return;
      opener = btn;
      view.src = img.currentSrc || img.src;
      view.alt = img.alt || '';
      dlg.setAttribute('aria-label', img.alt || 'Enlarged figure');
      dlg.showModal();
    }

    [].forEach.call(figures, function (img) {
      // Not the byline portrait, the masthead or the colophon, and never an
      // image that is already a link or already wrapped: no nested controls.
      if (img.closest('a, button, .masthead, .colophon, .byline, .channel')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lightbox__trigger';
      btn.setAttribute('aria-label', 'Enlarge figure');
      img.parentNode.insertBefore(btn, img);
      btn.appendChild(img);
      btn.addEventListener('click', function () { open(btn, img); });
    });
  }

  /* ---- Contents scroll-spy (§5 #4): IntersectionObserver, no scroll listener */
  function scrollSpy() {
    var links = document.querySelectorAll('.toc--rail a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var headings = [];
    var linkFor = {};
    for (var i = 0; i < links.length; i++) {
      var id = decodeURIComponent(links[i].getAttribute('href').slice(1));
      var h = document.getElementById(id);
      if (h) { headings.push(h); linkFor[id] = links[i]; }
    }
    if (!headings.length) return;
    var remPx = parseFloat(getComputedStyle(root).fontSize) || 16;
    var mastheadPx = (parseFloat(getComputedStyle(root).getPropertyValue('--masthead-h')) || 3.5) * remPx;
    var active = null;
    function update() {
      // The current section is the last heading whose top has passed into the band
      // [masthead, 30 % of the viewport]; nothing is current above the first heading.
      var band = window.innerHeight * 0.3;
      var pick = null;
      for (var j = 0; j < headings.length; j++) {
        if (headings[j].getBoundingClientRect().top <= band) pick = headings[j];
        else break;
      }
      var link = pick ? linkFor[pick.id] : null;
      if (link === active) return;
      if (active) active.removeAttribute('aria-current');
      active = link;
      if (active) active.setAttribute('aria-current', 'location');
    }
    var io = new IntersectionObserver(update, {
      rootMargin: '-' + Math.round(mastheadPx) + 'px 0px -70% 0px',
      threshold: 0
    });
    for (var k = 0; k < headings.length; k++) io.observe(headings[k]);
    update();
  }

  /* ---- Channel (§4.15): adopt the static strip; pointer sets p, click re-seeds.
     mulberry32/message/h2 must match _tools/channel_svg.py. */
  function channel() {
    var send = document.querySelector('.channel .channel__send');
    if (!send) return;
    var SEED = 0x5EED, P0 = 0.10, MAXN = 64;
    var z = new Uint8Array(MAXN), u = new Float64Array(MAXN), p = P0;
    function mulberry32(a) {
      return function () {
        a = a + 0x6D2B79F5 | 0;
        var t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    }
    // flip(i) = u[i] < p is derived, never stored: raising p only adds flips.
    function message(seed) {
      var rand = mulberry32(seed | 0);
      for (var i = 0; i < MAXN; i++) { z[i] = rand() < 0.5 ? 1 : 0; u[i] = rand(); }
    }
    function h2(q) {
      return q <= 0 || q >= 1 ? 0 : -q * Math.log2(q) - (1 - q) * Math.log2(1 - q);
    }
    function bit(on, flip) {
      return 'channel__bit' + (on ? ' channel__bit--1' : '') + (flip ? ' channel__bit--flip' : '');
    }
    var fig = send.parentNode;
    var pOut = fig.querySelector('.channel__p'), iOut = fig.querySelector('.channel__i');
    var strips = [].map.call(send.querySelectorAll('svg'), function (svg) {
      var zr = svg.querySelectorAll('.channel__z rect');
      return { n: zr.length, z: zr, zh: svg.querySelectorAll('.channel__zhat rect'), title: svg.querySelector('title') };
    });
    function paint(checkOnly) {
      var same = true, P = p.toFixed(2);
      function put(el, c) {
        if (el.getAttribute('class') === c) return;
        same = false;
        if (!checkOnly) el.setAttribute('class', c);
      }
      for (var j = 0; j < strips.length; j++) {
        var s = strips[j], k = 0;
        for (var i = 0; i < s.n; i++) {
          var f = u[i] < p ? 1 : 0;
          k += f;
          put(s.z[i], bit(z[i], 0));
          put(s.zh[i], bit(z[i] ^ f, f));
        }
        if (!checkOnly) s.title.textContent = s.n + ' bits through a binary symmetric channel, p = ' + P + ', ' + k + ' flipped';
      }
      if (checkOnly) return same;
      pOut.textContent = P;
      iOut.textContent = Math.max(0, 1 - h2(p)).toFixed(2);
      send.setAttribute('aria-label', 'Binary symmetric channel, p = ' + P + '. Send a new message.');
    }
    message(SEED);
    if (!paint(true)) {
      console.warn('channel: static SVG does not match the seed; repainting');
      paint();
    }
    if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      send.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        var r = send.getBoundingClientRect();
        var x = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
        p = 0.5 * x * x;
        paint();
      });
      send.addEventListener('pointerleave', function () { p = P0; paint(); });
    }
    send.addEventListener('click', function () { message(Date.now()); paint(); });
  }

  /* ---- Off-site links in the author's prose open in a new tab, announced for
     screen readers. The site's own chrome does the same in Liquid; this covers
     markdown links, which kramdown emits bare. */
  function extlinks() {
    [].forEach.call(document.querySelectorAll('.prose a[href^="http"]'), function (a) {
      if (a.hostname === location.hostname || a.querySelector('.sr-only')) return;
      a.target = '_blank';
      if (!/noopener/.test(a.rel)) a.rel = (a.rel + ' noopener').trim();
      a.insertAdjacentHTML('beforeend', '<span class="sr-only"> (opens in a new tab)</span>');
    });
  }

  theme();
  clipboard();
  lightbox();
  scrollSpy();
  channel();
  extlinks();
})();
