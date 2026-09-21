/* theme.js — the System / Light / Dark switch in the top right.
 *
 * Loaded from <head> WITHOUT defer, so it runs before the page paints
 * and there's no flash of the wrong theme.
 *
 * How it works: it puts data-theme="light" or "dark" on the <html>
 * element, and css/style.css keys off that. "System" removes the
 * attribute entirely, which lets the OS setting take over again.
 */
(function () {
  var KEY = 'theme';

  // localStorage can throw (private windows, blocked cookies), so every
  // read and write is wrapped. The site must work without it.
  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(v) {
    try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY); } catch (e) {}
  }

  function apply(choice) {
    if (choice === 'light' || choice === 'dark') {
      document.documentElement.setAttribute('data-theme', choice);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  // Run immediately, before first paint.
  apply(read());

  // Then wire up the buttons once the header exists.
  document.addEventListener('DOMContentLoaded', function () {
    var group = document.querySelector('.theme-toggle');
    if (!group) return;

    var buttons = group.querySelectorAll('button[data-theme-set]');

    function sync() {
      var current = read() || 'system';
      for (var i = 0; i < buttons.length; i++) {
        var b = buttons[i];
        b.setAttribute('aria-pressed', String(b.dataset.themeSet === current));
      }
    }

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var choice = this.dataset.themeSet;
        write(choice === 'system' ? null : choice);
        apply(choice);
        sync();
      });
    }

    sync();
    group.classList.add('ready');
  });
})();
