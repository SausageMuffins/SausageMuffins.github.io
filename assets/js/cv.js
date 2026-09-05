/* yurielryan.com — /cv/ only (PLAN §5). The Work Experience roles are native
   <details> (_includes/experience.html); this adds the two things markup alone
   cannot do: one Expand all / Collapse all control, and a printed résumé that
   shows every role whatever the reader had open.

   Deferred, dependency-free, ES5, same shape as site.js: no timers, no scroll
   listeners, no state outside the DOM. Loaded via the CV front matter's
   `scripts:` list, which _includes/scripts.html emits after site.js. If it
   never runs, the control is hidden by .no-js and the roles still open. */
(function () {
  'use strict';

  var wrap = document.querySelector('[data-roles]');
  if (!wrap) return;

  var roles = [].slice.call(wrap.querySelectorAll('details.role'));
  if (!roles.length) return;

  var btn = wrap.querySelector('[data-roles-toggle]');

  function allOpen() {
    for (var i = 0; i < roles.length; i++) {
      if (!roles[i].open) return false;
    }
    return true;
  }

  /* The control names the action, not the state: "Expand all" while anything
     is closed, "Collapse all" once everything is open. Its accessible name is
     the label, so nothing else has to be announced. */
  function label() {
    if (btn) btn.textContent = allOpen() ? 'Collapse all' : 'Expand all';
  }

  function setAll(open) {
    for (var i = 0; i < roles.length; i++) roles[i].open = open;
  }

  if (btn) {
    btn.addEventListener('click', function () {
      setAll(!allOpen());
      label();
    });
    /* Opening or closing a role by hand re-reads the control. `toggle` is
       queued, so this also covers the programmatic changes above. */
    for (var i = 0; i < roles.length; i++) roles[i].addEventListener('toggle', label);
    label();
  }

  /* ---- Print: every role open, then back exactly as the reader left it ---- */
  var saved = null;

  function openForPrint() {
    if (saved) return;
    saved = [];
    for (var i = 0; i < roles.length; i++) {
      saved.push(roles[i].open);
      roles[i].open = true;
    }
  }

  function restore() {
    if (!saved) return;
    for (var i = 0; i < roles.length; i++) roles[i].open = saved[i];
    saved = null;
    label();
  }

  window.addEventListener('beforeprint', openForPrint);
  window.addEventListener('afterprint', restore);

  /* WebKit routes printing through a print media query rather than the
     events; harmless where both fire, since openForPrint/restore are idempotent. */
  if (window.matchMedia) {
    var mq = window.matchMedia('print');
    var onPrint = function (e) { if (e.matches) openForPrint(); else restore(); };
    if (mq.addEventListener) mq.addEventListener('change', onPrint);
    else if (mq.addListener) mq.addListener(onPrint);
  }
})();
