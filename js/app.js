/**
 * app.js
 * Main entry point. Bootstraps the portfolio from CONFIG.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Inject icons ----
  const iconMap = {
    'icon-img-resume':     Icons.resumeIcon,
    'icon-img-projects':   Icons.projectsIcon,
    'icon-img-socials':    Icons.socialsIcon,
    'win-logo-taskbar':    Icons.winLogo,
    'task-icon-resume':    Icons.resumeIconSm,
    'task-icon-projects':  Icons.projectsIconSm,
    'task-icon-socials':   Icons.socialsIconSm,
    'start-icon-resume':   Icons.resumeIconSm,
    'start-icon-projects': Icons.projectsIconSm,
    'start-icon-socials':  Icons.socialsIconSm,
    'start-icon-about':    Icons.winLogo,
    'tb-icon-resume':      Icons.resumeIconSm,
    'tb-icon-projects':    Icons.projectsIconSm,
    'tb-icon-socials':     Icons.socialsIconSm,
    'rh-svg-resume':       Icons.resizeGrip,
    'rh-svg-projects':     Icons.resizeGrip,
    'rh-svg-socials':      Icons.resizeGrip,
    'about-logo':          Icons.winLogo,
  };
  Object.entries(iconMap).forEach(([id, svg]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = svg;
  });

  // ---- About dialog name ----
  const aboutName = document.getElementById('about-name');
  if (aboutName) aboutName.textContent = CONFIG.name;

  // ---- Render windows ----
  renderProjects();
  renderSocials();

  // ---- Init window manager ----
  WindowManager.init(['resume', 'projects', 'socials']);
});

// =============================================
// Projects
// =============================================

function renderProjects() {
  const content = document.getElementById('content-projects');
  const count   = document.getElementById('projects-count');
  if (!content) return;

  const projects = CONFIG.projects || [];
  if (!projects.length) {
    content.innerHTML = '<p style="color:#555;font-size:11px;">No projects in config.js yet.</p>';
    return;
  }

  content.innerHTML = projects.map(buildProjectCard).join('');
  if (count) count.textContent = `${projects.length} object(s)`;
}

function buildProjectCard(p) {
  const tags  = (p.tags || []).map(t => `<span class="project-tag">${escHtml(t)}</span>`).join('');
  const links = [];
  if (p.github) links.push(`<a class="project-link" href="${escHtml(p.github)}" target="_blank" rel="noopener">🔗 View on GitHub</a>`);
  if (p.demo)   links.push(`<a class="project-link" href="${escHtml(p.demo)}"   target="_blank" rel="noopener">🌍 Live Demo</a>`);

  return `
    <div class="project-card">
      <h3>📁 ${escHtml(p.title)}</h3>
      <p>${escHtml(p.desc)}</p>
      <div class="project-tag-row">${tags}</div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">${links.join('')}</div>
    </div>`;
}

// =============================================
// Socials
// =============================================

function renderSocials() {
  const content  = document.getElementById('content-socials');
  const countEl  = document.getElementById('socials-count');
  if (!content) return;

  const socials = (CONFIG.socials || []).filter(s => s.href);
  if (!socials.length) {
    content.innerHTML = '<p style="color:#555;font-size:11px;">No socials in config.js yet.</p>';
    return;
  }

  let html = '<p class="socials-intro">Click a link to open in your browser.</p>';
  html += socials.map(buildSocialRow).join('');
  content.innerHTML = html;
  if (countEl) countEl.textContent = `${socials.length} link(s) found`;
}

function buildSocialRow(s) {
  const iconSvg = Icons[s.icon] || Icons.email;
  return `
    <a class="social-row" href="${escHtml(s.href)}" target="_blank" rel="noopener noreferrer">
      <span class="social-icon">${iconSvg}</span>
      <span class="social-info">
        <span class="social-name">${escHtml(s.name)}</span>
        <span class="social-desc">${escHtml(s.desc)}</span>
      </span>
      <span class="social-handle">${escHtml(s.handle)}</span>
    </a>`;
}

// =============================================
// Utility
// =============================================

function escHtml(str) {
  return String(str || '')
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}