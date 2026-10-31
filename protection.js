/*
 * Casual-copy deterrents only.
 * These controls discourage common shortcuts but cannot prevent saving public
 * files through browser tools, screenshots, caches, or direct HTTP requests.
 */
(function () {
  'use strict';

  // Suppress the context menu for ordinary page content and images, while
  // preserving native context menus in editable form controls.
  document.addEventListener('contextmenu', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
    event.preventDefault();
  }, true);

  // Discourage dragging images out of the page.
  document.addEventListener('dragstart', function (event) {
    var target = event.target;
    if (target && target.closest && target.closest('img, picture, svg, .art')) {
      event.preventDefault();
    }
  }, true);

  // Prevent site links from invoking the browser's download attribute.
  // This is not a restriction on direct requests or browser/network tools.
  document.addEventListener('click', function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest('a[download]') : null;
    if (link) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  // Best-effort shortcut deterrents. Browser menus and alternate shortcuts
  // may still work, and this must not be treated as a security boundary.
  document.addEventListener('keydown', function (event) {
    var key = (event.key || '').toLowerCase();
    var modifier = event.ctrlKey || event.metaKey;
    var blocked = false;

    // Save / Save As, View Source, and Print.
    if (modifier && (key === 's' || key === 'u' || key === 'p')) blocked = true;
    // Common DevTools shortcuts.
    if (event.key === 'F12') blocked = true;
    if (modifier && event.shiftKey && ['i', 'j', 'c', 's'].includes(key)) blocked = true;

    if (blocked) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === 'function') {
        event.stopImmediatePropagation();
      }
    }
  }, true);
})();
