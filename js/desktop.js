/**
 * Desktop
 * Clock, icon selection, start menu, About dialog.
 * On mobile: single tap opens a window (no double-click needed).
 */

const Desktop = (() => {

  const isMobile = () => window.innerWidth <= 600;

  // ---- Clock ----

  function updateClock() {
    const now  = new Date();
    let h      = now.getHours();
    const m    = now.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const el = document.getElementById('clock');
    if (el) el.textContent = `${h}:${m} ${ampm}`;
  }

  // ---- Icon selection ----

  function selectIcon(id) {
    document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
    document.getElementById(id)?.classList.add('selected');
  }

  function clearSelection(e) {
    if (!e.target.closest('.desktop-icon')) {
      document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
    }
  }

  // ---- Start menu ----

  function toggleStartMenu() {
    document.getElementById('start-menu')?.classList.toggle('open');
  }

  function closeStartMenu(e) {
    if (!e.target.closest('#start-menu') && !e.target.closest('#start-btn')) {
      document.getElementById('start-menu')?.classList.remove('open');
    }
  }

  // ---- About dialog ----

  function showAbout() {
    document.getElementById('about-dialog')?.classList.add('open');
    document.getElementById('start-menu')?.classList.remove('open');
  }

  function closeAbout() {
    document.getElementById('about-dialog')?.classList.remove('open');
  }

  // ---- Icon interaction ----
  // Desktop: double-click opens window.
  // Mobile:  single tap opens window immediately.

  function attachIconListeners() {
    document.querySelectorAll('.desktop-icon').forEach(icon => {
      // Mobile: single tap
      icon.addEventListener('touchend', e => {
        e.preventDefault();
        icon.dispatchEvent(new Event('dblclick'));
      });

      // Desktop: two quick clicks = double-click
      let clicks = 0;
      icon.addEventListener('click', () => {
        if (isMobile()) return; // handled by touchend
        clicks++;
        if (clicks === 1) {
          setTimeout(() => { clicks = 0; }, 400);
        } else if (clicks >= 2) {
          icon.dispatchEvent(new Event('dblclick'));
          clicks = 0;
        }
      });
    });
  }

  // ---- Init ----

  function init() {
    updateClock();
    setInterval(updateClock, 1000);

    document.getElementById('desktop')?.addEventListener('click', clearSelection);
    document.addEventListener('click', closeStartMenu);

    attachIconListeners();
  }

  return { init, selectIcon, toggleStartMenu, showAbout, closeAbout };
})();

window.selectIcon      = (id) => Desktop.selectIcon(id);
window.toggleStartMenu = ()   => Desktop.toggleStartMenu();
window.showAbout       = ()   => Desktop.showAbout();
window.closeAbout      = ()   => Desktop.closeAbout();

document.addEventListener('DOMContentLoaded', () => Desktop.init());