/* yurielryan.com — one classic deferred script (PLAN §5, §6.3).
   Modules: theme toggle, delegated clipboard, Contents scroll-spy, channel (stub until Phase 3).
   No timers except the 1.5 s "Copied" revert; no scroll listeners; no layout measurement. */
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

  /* ---- Channel (§4.15): stub; the Phase 3 agent fills this in ------------ */
  function channel() {
    if (!document.querySelector('.channel .channel__send')) return;
    // Phase 3: adopt the static SVG (seed 0x5EED, mulberry32), pointer sets p, click re-seeds.
  }

  theme();
  clipboard();
  scrollSpy();
  channel();
})();
