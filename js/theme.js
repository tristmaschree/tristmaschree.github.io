/* theme.js — the theme button (one copy in the phone header,
 * one in the desktop footer; only one is visible at a time), plus
 * a small touch check that keeps hover effects off touchscreens.
 *
 * Loaded from <head> WITHOUT defer, so it runs before the page paints
 * and there's no flash of the wrong theme.
 *
 * Each click moves System → Light → Dark → System. Light and Dark put
 * data-theme="light" or "dark" on <html>, which css/style.css keys off.
 * System removes the attribute so the OS setting takes over again.
 */
(function () {
  var KEY = 'theme';
  var ORDER = ['system', 'light', 'dark'];
  var NAMES = { system: 'System', light: 'Light', dark: 'Dark' };

  // localStorage can throw (private windows, blocked cookies), so every
  // read and write is wrapped. The site must work without it.
  function read() {
    try { return localStorage.getItem(KEY) || 'system'; } catch (e) { return 'system'; }
  }
  function write(v) {
    try { v === 'system' ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, v); } catch (e) {}
  }

  function apply(mode) {
    if (mode === 'light' || mode === 'dark') {
      document.documentElement.setAttribute('data-theme', mode);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  // Run immediately, before first paint.
  var mode = read();
  apply(mode);

  // Hover effects are for a mouse or trackpad only (see "Hover effects"
  // in css/style.css). On a laptop with a touchscreen, mark the page
  // while it's being touched so a tap doesn't trigger them, and unmark
  // it as soon as a mouse or trackpad is used again.
  var root = document.documentElement;
  window.addEventListener('pointerdown', function (e) {
    root.classList.toggle('touching', e.pointerType === 'touch');
  }, { passive: true });
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'mouse') root.classList.remove('touching');
  }, { passive: true });

  // Then wire up the buttons once the page exists.
  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.theme-button');

    function sync() {
      // Each icon shows the current mode; the label says what it is.
      var label = 'Theme: ' + NAMES[mode];
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].dataset.mode = mode;
        buttons[i].setAttribute('aria-label', label);
        buttons[i].title = label;
      }
    }

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        mode = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
        write(mode);
        apply(mode);
        sync();
      });
    }

    sync();
  });
})();
