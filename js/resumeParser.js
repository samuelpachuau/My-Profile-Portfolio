/**
 * ResumeParser
 * Parses an uploaded .docx file using mammoth.js (loaded from CDN),
 * then renders a structured Win97-styled resume in the content pane.
 */

const ResumeParser = (() => {

  // ---- State ----
  let mammothReady = false;

  // ---- Load mammoth from CDN ----

  function loadMammoth() {
    return new Promise((resolve, reject) => {
      if (window.mammoth) { mammothReady = true; resolve(); return; }
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';
      s.onload  = () => { mammothReady = true; resolve(); };
      s.onerror = () => reject(new Error('Failed to load mammoth.js'));
      document.head.appendChild(s);
    });
  }

  // ---- Render upload prompt ----

  function renderUploadPrompt() {
    const content = document.getElementById('content-resume');
    if (!content) return;
    content.innerHTML = `
      <div class="resume-upload-prompt">
        <div class="upload-icon">📄</div>
        <h2>Import Your Resume</h2>
        <p>Upload your Word document (.docx) and it will be converted into this Win97 resume view.</p>
        <div class="upload-drop-zone" id="drop-zone">
          <input type="file" id="resume-file-input" accept=".docx">
          <div style="font-size:24px;margin-bottom:8px;">📂</div>
          <div><strong>Click to browse</strong> or drag &amp; drop</div>
          <div style="color:#888;margin-top:4px;">.docx files only</div>
        </div>
        <div style="font-size:10px;color:#888;margin-top:4px;">
          Your file stays local — nothing is uploaded to a server.
        </div>
      </div>
    `;
    attachDropZoneListeners();
  }

  // ---- Drop zone listeners ----

  function attachDropZoneListeners() {
    const zone  = document.getElementById('drop-zone');
    const input = document.getElementById('resume-file-input');
    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());

    input.addEventListener('change', e => {
      if (e.target.files[0]) handleFile(e.target.files[0]);
    });

    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.classList.add('dragover');
    });

    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));

    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.name.endsWith('.docx')) {
        handleFile(file);
      } else {
        alert('Please drop a .docx file.');
      }
    });
  }

  // ---- File handler ----

  async function handleFile(file) {
    showLoading();
    try {
      await loadMammoth();
      const arrayBuffer = await file.arrayBuffer();
      setProgress(30);

      const result = await mammoth.extractRawText({ arrayBuffer });
      setProgress(70);

      const text = result.value;
      const sections = parseResumeText(text);
      setProgress(100);

      setTimeout(() => renderResume(sections, file.name), 300);
    } catch (err) {
      console.error('Resume parse error:', err);
      showError(err.message);
    }
  }

  // ---- Loading state ----

  function showLoading() {
    const content = document.getElementById('content-resume');
    if (!content) return;
    content.innerHTML = `
      <div class="resume-loading">
        <div>📄 Reading your resume...</div>
        <div class="progress-bar-outer">
          <div class="progress-bar-inner" id="resume-progress" style="width:10%">10%</div>
        </div>
        <div style="font-size:10px;color:#888;">Processing with mammoth.js</div>
      </div>
    `;
  }

  function setProgress(pct) {
    const bar = document.getElementById('resume-progress');
    if (bar) {
      bar.style.width = pct + '%';
      bar.textContent = pct + '%';
    }
  }

  function showError(msg) {
    const content = document.getElementById('content-resume');
    if (!content) return;
    content.innerHTML = `
      <div class="resume-error">
        <div style="font-size:32px;">⚠️</div>
        <strong>Could not parse resume</strong>
        <div style="font-size:10px;color:#666;">${escHtml(msg)}</div>
        <button class="win-btn" onclick="ResumeParser.reset()">Try Again</button>
      </div>
    `;
  }

  // ---- Text parser ----
  // Heuristic section detection from raw text. Works well on typical resumes.

  function parseResumeText(raw) {
    const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const sections = {
      name:        '',
      contact:     [],
      summary:     [],
      experience:  [],
      education:   [],
      skills:      [],
      achievements:[],
      other:       {},
    };

    // Guess name = first non-empty line
    sections.name = lines[0] || 'Your Name';

    // Contact info heuristic = lines containing @, phone patterns, URLs, or location
    const contactRe = /[@(+]|\d{3}[-.\s]\d{3}|linkedin|github|http|www|\bIN\b|\bUS\b|,\s*[A-Z]{2}/i;

    let i = 1;
    while (i < lines.length && (contactRe.test(lines[i]) || lines[i].length < 80)) {
      if (contactRe.test(lines[i])) sections.contact.push(lines[i]);
      i++;
      if (sections.contact.length >= 4) break;
    }

    // Section header detection
    const sectionHeaders = {
      summary:      /^(summary|profile|about|objective|professional\s+summary)/i,
      experience:   /^(experience|work\s+experience|employment|career|professional\s+experience)/i,
      education:    /^(education|academics|qualifications)/i,
      skills:       /^(skills|technical\s+skills|competencies|technologies|tools)/i,
      achievements: /^(achievements|awards|certifications|honors|accomplishments|projects)/i,
    };

    let currentSection = null;
    let currentBlock   = [];

    function flushBlock() {
      if (!currentSection || currentBlock.length === 0) return;
      if (currentSection in sections && Array.isArray(sections[currentSection])) {
        sections[currentSection].push(...currentBlock);
      } else {
        if (!sections.other[currentSection]) sections.other[currentSection] = [];
        sections.other[currentSection].push(...currentBlock);
      }
      currentBlock = [];
    }

    for (; i < lines.length; i++) {
      const line = lines[i];
      let matched = false;
      for (const [sName, re] of Object.entries(sectionHeaders)) {
        if (re.test(line) && line.length < 40) {
          flushBlock();
          currentSection = sName;
          matched = true;
          break;
        }
      }
      if (!matched && currentSection) {
        currentBlock.push(line);
      }
    }
    flushBlock();

    return sections;
  }

  // ---- Renderer ----

  function renderResume(sections, fileName) {
    const content = document.getElementById('content-resume');
    if (!content) return;

    // Update status bar
    const statusEl = document.querySelector('#win-resume .status-bar .status-section');
    if (statusEl) statusEl.textContent = fileName;

    let html = '';

    // Name
    html += `<div class="resume-name">${escHtml(sections.name)}</div>`;

    // Contact
    if (sections.contact.length) {
      html += `<div class="resume-contact">${sections.contact.map(escHtml).join(' &nbsp;|&nbsp; ')}</div>`;
    }

    // Summary
    if (sections.summary.length) {
      html += renderSection('About', sections.summary.map(l =>
        `<p>${escHtml(l)}</p>`
      ).join(''));
    }

    // Experience
    if (sections.experience.length) {
      html += renderSection('Experience', renderBlocks(sections.experience));
    }

    // Education
    if (sections.education.length) {
      html += renderSection('Education', renderBlocks(sections.education));
    }

    // Skills
    if (sections.skills.length) {
      const tags = parseSkillTags(sections.skills);
      const tagsHtml = tags.map(t => `<span class="skill-tag">${escHtml(t)}</span>`).join('');
      html += renderSection('Skills', `<div class="skill-grid">${tagsHtml}</div>`);
    }

    // Achievements
    if (sections.achievements.length) {
      html += renderSection('Achievements', renderBlocks(sections.achievements));
    }

    // Other sections
    for (const [name, lines] of Object.entries(sections.other || {})) {
      if (lines.length) {
        html += renderSection(name, renderBlocks(lines));
      }
    }

    // Re-import button
    html += `
      <div style="margin-top:16px;padding-top:8px;border-top:1px solid #ccc;text-align:right;">
        <button class="win-btn" onclick="ResumeParser.reset()" style="font-size:10px;height:20px;">
          📂 Import different resume
        </button>
      </div>
    `;

    content.innerHTML = html;
  }

  function renderSection(title, bodyHtml) {
    return `
      <div class="resume-section">
        <h2>${escHtml(title)}</h2>
        ${bodyHtml}
      </div>
    `;
  }

  // Convert an array of lines into headings + bullet points heuristically
  function renderBlocks(lines) {
    let html = '';
    lines.forEach(line => {
      // Looks like a job title / institution (short, possibly title-cased)
      if (line.length < 80 && /^[A-Z]/.test(line) && !/^[-•·*–—]/.test(line) && !line.startsWith(' ')) {
        html += `<h3>${escHtml(line)}</h3>`;
      }
      // Looks like a date range or subtitle
      else if (/\d{4}/.test(line) && line.length < 60) {
        html += `<div class="subtitle">${escHtml(line)}</div>`;
      }
      // Bullet
      else if (/^[-•·*–—]/.test(line)) {
        html += `<ul><li>${escHtml(line.replace(/^[-•·*–—]\s*/, ''))}</li></ul>`;
      }
      // Regular paragraph
      else {
        html += `<p>${escHtml(line)}</p>`;
      }
    });
    return html;
  }

  // Parse skills: split by commas, pipes, newlines, semicolons
  function parseSkillTags(lines) {
    const raw = lines.join(' ');
    return raw
      .split(/[,|;·•\n]/)
      .map(s => s.trim())
      .filter(s => s.length > 1 && s.length < 30);
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---- Public ----

  function reset() {
    renderUploadPrompt();
  }

  function init() {
    renderUploadPrompt();
  }

  return { init, reset, handleFile };
})();

window.ResumeParser = ResumeParser;
document.addEventListener('DOMContentLoaded', () => ResumeParser.init());
