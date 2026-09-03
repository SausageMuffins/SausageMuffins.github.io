/* yurielryan.com — one classic deferred script (PLAN §5, §6.3): theme toggle,
   delegated clipboard, Contents scroll-spy, the channel (§4.15).
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

  /* ---- Clipboard (§5 #5): one delegated handler for [data-copy] ---------- */
  function clipboard() {
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
    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-copy]') : null;
      if (!btn) return;
      var target = document.getElementById(btn.getAttribute('data-copy-target'));
      if (!target) return;
      var text = target.innerText || target.textContent || '';
      var original = btn.textContent;
      function done(msg) {
        btn.textContent = msg;
        btn.classList.add('is-copied');
        announce(msg);
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('is-copied');
        }, 1500);
      }
      function fail() {
        target.hidden = false;
        try {
          var range = document.createRange();
          range.selectNodeContents(target);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } catch (err) { /* nothing to select */ }
        done('Select & copy');
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done('Copied'); }, fail);
      } else {
        fail();
      }
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

  theme();
  clipboard();
  scrollSpy();
  channel();
})();
