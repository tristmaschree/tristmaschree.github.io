/* theme.js — the round theme button in the header.
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

  // Then wire up the button once the header exists.
  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.theme-button');
    if (!button) return;

    function sync() {
      // The icon shows the current mode; the label says what it is.
      button.dataset.mode = mode;
      var label = 'Theme: ' + NAMES[mode];
      button.setAttribute('aria-label', label);
      button.title = label;
    }

    button.addEventListener('click', function () {
      mode = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
      write(mode);
      apply(mode);
      sync();
    });

    sync();
  });
})();
