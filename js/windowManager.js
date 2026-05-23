/**
 * WindowManager
 * Handles all window lifecycle: open, close, minimize, maximize,
 * dragging, resizing, focus/z-index, and taskbar state.
 * On mobile (≤600px) windows open full-screen; drag/resize are disabled.
 */

const WindowManager = (() => {
  const state = {
    open:      {},
    minimized: {},
    maximized: {},
    savedPos:  {},
    zTop:      100,
  };

  const isMobile = () => window.innerWidth <= 600;

  function getEl(name)   { return document.getElementById('win-' + name); }
  function getTb(name)   { return document.getElementById('tb-'  + name); }
  function getTask(name) { return document.getElementById('task-' + name); }

  function updateTaskbarButtons() {
    document.querySelectorAll('.taskbar-task').forEach(t => t.classList.remove('active'));
    let topName = null, topZ = 0;
    Object.keys(state.open).forEach(name => {
      if (!state.open[name] || state.minimized[name]) return;
      const z = parseInt(getEl(name)?.style.zIndex || 0);
      if (z > topZ) { topZ = z; topName = name; }
    });
    if (topName) getTask(topName)?.classList.add('active');
  }

  function updateTitleBars() {
    Object.keys(state.open).forEach(name => {
      const tb = getTb(name);
      const el = getEl(name);
      if (!tb || !el) return;
      const isTop = parseInt(el.style.zIndex) === state.zTop;
      tb.classList.toggle('inactive', !isTop);
    });
  }

  function open(name) {
    const el   = getEl(name);
    const task = getTask(name);
    if (!el) return;
    state.open[name]      = true;
    state.minimized[name] = false;
    el.classList.add('open');
    el.style.display = 'flex';
    task?.classList.add('visible');
    focus(name);
  }

  function close(name) {
    const el   = getEl(name);
    const task = getTask(name);
    state.open[name]      = false;
    state.minimized[name] = false;
    state.maximized[name] = false;
    if (el) {
      el.classList.remove('open', 'maximized');
      el.style.display = 'none';
    }
    task?.classList.remove('visible', 'active');
    updateTitleBars();
    updateTaskbarButtons();
  }

  function minimize(name) {
    // On mobile, minimize = close (no taskbar buttons visible)
    if (isMobile()) { close(name); return; }
    const el   = getEl(name);
    const task = getTask(name);
    state.minimized[name] = true;
    if (el) el.style.display = 'none';
    task?.classList.remove('active');
    updateTitleBars();
    updateTaskbarButtons();
  }

  function maximize(name) {
    if (isMobile()) return; // always full-screen on mobile via CSS
    const el = getEl(name);
    if (!el) return;
    if (!state.maximized[name]) {
      state.savedPos[name] = {
        top: el.style.top, left: el.style.left,
        width: el.style.width, height: el.style.height,
      };
      el.classList.add('maximized');
      state.maximized[name] = true;
    } else {
      el.classList.remove('maximized');
      const p = state.savedPos[name];
      if (p) {
        el.style.top    = p.top;
        el.style.left   = p.left;
        el.style.width  = p.width;
        el.style.height = p.height;
      }
      state.maximized[name] = false;
    }
  }

  function toggle(name) {
    const el = getEl(name);
    if (!el) return;
    if (!state.open[name]) { open(name); return; }
    if (state.minimized[name]) {
      state.minimized[name] = false;
      el.style.display = 'flex';
      focus(name);
    } else if (parseInt(el.style.zIndex) === state.zTop) {
      minimize(name);
    } else {
      focus(name);
    }
  }

  function focus(name) {
    state.zTop++;
    const el = getEl(name);
    if (el) el.style.zIndex = state.zTop;
    updateTitleBars();
    updateTaskbarButtons();
    document.querySelectorAll('.taskbar-task').forEach(t => t.classList.remove('active'));
    getTask(name)?.classList.add('active');
  }

  // ---- Drag (desktop only) ----

  function makeDraggable(name) {
    const el     = getEl(name);
    const handle = getTb(name);
    if (!el || !handle) return;

    let dragging = false, startX, startY, initX, initY;

    handle.addEventListener('mousedown', e => {
      if (isMobile()) return;
      if (e.target.classList.contains('title-btn')) return;
      if (state.maximized[name]) return;
      dragging = true;
      startX = e.clientX; startY = e.clientY;
      initX  = el.offsetLeft; initY = el.offsetTop;
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      el.style.left = Math.max(0, initX + e.clientX - startX) + 'px';
      el.style.top  = Math.max(0, initY + e.clientY - startY) + 'px';
    });

    document.addEventListener('mouseup', () => { dragging = false; });
  }

  // ---- Resize (desktop only) ----

  function makeResizable(name) {
    const el     = getEl(name);
    const handle = document.getElementById('rh-' + name);
    if (!el || !handle) return;

    let resizing = false, startX, startY, startW, startH;

    handle.addEventListener('mousedown', e => {
      if (isMobile()) return;
      resizing = true;
      startX = e.clientX; startY = e.clientY;
      startW = el.offsetWidth; startH = el.offsetHeight;
      e.preventDefault();
      e.stopPropagation();
    });

    document.addEventListener('mousemove', e => {
      if (!resizing) return;
      el.style.width  = Math.max(300, startW + e.clientX - startX) + 'px';
      el.style.height = Math.max(200, startH + e.clientY - startY) + 'px';
    });

    document.addEventListener('mouseup', () => { resizing = false; });
  }

  function registerFocusOnClick(name) {
    const el = getEl(name);
    if (!el) return;
    el.addEventListener('mousedown', () => focus(name));
  }

  function init(names) {
    names.forEach(name => {
      makeDraggable(name);
      makeResizable(name);
      registerFocusOnClick(name);
    });
  }

  return { open, close, minimize, maximize, toggle, focus, init };
})();

window.openWindow     = (n) => WindowManager.open(n);
window.closeWindow    = (n) => WindowManager.close(n);
window.minimizeWindow = (n) => WindowManager.minimize(n);
window.maximizeWindow = (n) => WindowManager.maximize(n);
window.toggleWindow   = (n) => WindowManager.toggle(n);