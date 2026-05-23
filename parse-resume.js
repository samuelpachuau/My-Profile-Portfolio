#!/usr/bin/env node
/**
 * parse-resume.js
 * ============================================
 * One-time script: converts your .docx resume into
 * the resume section of js/config.js.
 *
 * Usage:
 *   npm install mammoth          (first time only)
 *   node parse-resume.js resume.docx
 *
 * It will overwrite js/config.js with your real data.
 * Run it once, then you never need it again.
 * ============================================
 */

const fs      = require('fs');
const path    = require('path');
const mammoth = require('mammoth');

// ---- Args ----
const docxPath = process.argv[2];
if (!docxPath) {
  console.error('Usage: node parse-resume.js <path-to-resume.docx>');
  process.exit(1);
}
if (!fs.existsSync(docxPath)) {
  console.error(`File not found: ${docxPath}`);
  process.exit(1);
}

// ---- Read existing config so we preserve socials/projects ----
const configPath = path.join(__dirname, 'js', 'config.js');
let existingConfig = fs.existsSync(configPath) ? fs.readFileSync(configPath, 'utf8') : '';

// ---- Parse ----
mammoth.extractRawText({ path: docxPath }).then(result => {

  const raw     = result.value;
  const sections = parseResume(raw);

  // Build the resume JS object as a formatted string
  const resumeJs = buildResumeJs(sections);

  // Splice it into config.js
  const newConfig = spliceResumeIntoConfig(existingConfig, resumeJs, sections);
  fs.writeFileSync(configPath, newConfig, 'utf8');

  console.log('✅  js/config.js updated successfully!');
  console.log(`    Name:     ${sections.name}`);
  console.log(`    Contacts: ${sections.contact.length} found`);
  console.log(`    Sections: ${sections.sections.map(s => s.heading).join(', ')}`);
  console.log('\nOpen index.html in your browser to see the result.');

}).catch(err => {
  console.error('Failed to parse .docx:', err.message);
  process.exit(1);
});

// ============================================
// Parser
// ============================================

function parseResume(raw) {
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);

  const result = {
    name:     '',
    contact:  [],
    sections: [],
  };

  if (!lines.length) return result;

  // Name = first line
  result.name = lines[0];

  // Contact = lines 1–6 that look like contact info
  const contactRe = /[@(+]|\d{3}[-.\s]\d{3}|linkedin|github|http|www|,\s*[A-Z]{2}/i;
  let i = 1;
  while (i < lines.length && i < 7) {
    if (contactRe.test(lines[i]) || lines[i].length < 80) {
      result.contact.push(lines[i]);
      i++;
    } else {
      break;
    }
  }
  // Dedupe contact
  result.contact = [...new Set(result.contact)].slice(0, 5);

  // Section header patterns
  const SECTION_PATTERNS = [
    { key: 'About',        re: /^(summary|profile|about|objective|professional\s+summary)/i },
    { key: 'Experience',   re: /^(experience|work|employment|career)/i },
    { key: 'Education',    re: /^(education|academics|qualifications)/i },
    { key: 'Skills',       re: /^(skills|technical|competencies|technologies|tools)/i },
    { key: 'Achievements', re: /^(achievements|awards|certifications|honors|accomplishments)/i },
    { key: 'Projects',     re: /^(projects|portfolio|work\s+samples)/i },
  ];

  let currentKey  = null;
  let currentLines = [];

  function flush() {
    if (!currentKey || !currentLines.length) return;
    result.sections.push(buildSection(currentKey, currentLines));
    currentLines = [];
  }

  for (; i < lines.length; i++) {
    const line = lines[i];
    const match = SECTION_PATTERNS.find(p => p.re.test(line) && line.length < 50);
    if (match) {
      flush();
      currentKey = match.key;
    } else if (currentKey) {
      currentLines.push(line);
    }
  }
  flush();

  return result;
}

// ---- Build a typed section from raw lines ----
function buildSection(heading, lines) {
  if (heading === 'Skills') {
    // Skills: split by commas, pipes, bullets
    const raw  = lines.join(' ');
    const tags = raw.split(/[,|;·•\n]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 30);
    return { heading, type: 'tags', items: tags };
  }

  if (heading === 'About') {
    return { heading, type: 'paragraphs', items: lines };
  }

  // Blocks (Experience, Education, Projects, Achievements)
  const blocks = [];
  let current  = null;

  lines.forEach(line => {
    const isBullet   = /^[-•·*–—]/.test(line);
    const isDateLine = /\d{4}/.test(line) && line.length < 70;
    const isHeading  = !isBullet && /^[A-Z]/.test(line) && line.length < 90;

    if (isHeading && !isDateLine) {
      if (current) blocks.push(current);
      current = { title: line, subtitle: '', bullets: [] };
    } else if (isDateLine && current && !current.subtitle) {
      current.subtitle = line;
    } else if (isBullet && current) {
      current.bullets.push(line.replace(/^[-•·*–—]\s*/, ''));
    } else if (current) {
      // treat as extra subtitle or fold into bullets
      if (!current.subtitle) current.subtitle = line;
      else current.bullets.push(line);
    }
  });
  if (current) blocks.push(current);

  // If no blocks parsed, fall back to a bullet list
  if (!blocks.length) {
    return { heading, type: 'bullets', items: lines.map(l => l.replace(/^[-•·*–—]\s*/, '')) };
  }

  return { heading, type: 'blocks', items: blocks };
}

// ============================================
// Serialiser — writes the resume as JS
// ============================================

function buildResumeJs(parsed) {
  const indent = s => s.split('\n').map(l => '  ' + l).join('\n');

  const contactJs = parsed.contact.map(c => `      ${jsStr(c)},`).join('\n');

  const sectionsJs = parsed.sections.map(sec => {
    if (sec.type === 'paragraphs') {
      const items = sec.items.map(p => `          ${jsStr(p)},`).join('\n');
      return `      {
        heading: ${jsStr(sec.heading)},
        type: 'paragraphs',
        items: [
${items}
        ],
      }`;
    }
    if (sec.type === 'tags') {
      const items = sec.items.map(t => `          ${jsStr(t)},`).join('\n');
      return `      {
        heading: ${jsStr(sec.heading)},
        type: 'tags',
        items: [
${items}
        ],
      }`;
    }
    if (sec.type === 'bullets') {
      const items = sec.items.map(b => `          ${jsStr(b)},`).join('\n');
      return `      {
        heading: ${jsStr(sec.heading)},
        type: 'bullets',
        items: [
${items}
        ],
      }`;
    }
    // blocks
    const blocksJs = sec.items.map(block => {
      const bullets = (block.bullets || []).map(b => `              ${jsStr(b)},`).join('\n');
      return `          {
            title:    ${jsStr(block.title)},
            subtitle: ${jsStr(block.subtitle || '')},
            bullets:  [
${bullets}
            ],
          }`;
    }).join(',\n');

    return `      {
        heading: ${jsStr(sec.heading)},
        type: 'blocks',
        items: [
${blocksJs},
        ],
      }`;
  }).join(',\n');

  return `    name:    ${jsStr(parsed.name)},
    contact: [
${contactJs}
    ],
    sections: [
${sectionsJs},
    ],`;
}

// ---- Safely quote a string for JS ----
function jsStr(s) {
  return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

// ============================================
// Splice the new resume block into config.js
// ============================================

function spliceResumeIntoConfig(existing, resumeJs, parsed) {
  // If config.js exists and has a resume: { ... } block, replace it
  const resumeBlockRe = /resume:\s*\{[\s\S]*?\},(\s*\/\/|(\s*\n\s*(socials|projects|name|title|location)))/;

  const newBlock = `resume: {\n${resumeJs}\n  },\n  //`;

  if (resumeBlockRe.test(existing)) {
    return existing.replace(resumeBlockRe, newBlock + '$1');
  }

  // Otherwise regenerate a full config.js from scratch
  return `/**
 * config.js — auto-generated by parse-resume.js
 * Edit freely. Re-run parse-resume.js to refresh from your .docx.
 */

const CONFIG = {

  // ---- Personal info ----
  name:     ${jsStr(parsed.name)},
  title:    'Software Engineer',
  location: '',

  // ---- Resume ----
  resume: {
${resumeJs}
  },

  // ---- Social links (fill in your real URLs) ----
  socials: [
    { id: 'github',   name: 'GitHub',    desc: 'Code & open source',          handle: '@yourhandle',       href: 'https://github.com/yourhandle',       icon: 'github'   },
    { id: 'linkedin', name: 'LinkedIn',  desc: 'Professional network',        handle: 'in/yourname',       href: 'https://linkedin.com/in/yourname',    icon: 'linkedin' },
    { id: 'twitter',  name: 'X/Twitter', desc: 'Thoughts & updates',          handle: '@yourhandle',       href: 'https://twitter.com/yourhandle',      icon: 'twitter'  },
    { id: 'email',    name: 'Email',     desc: 'Reach me for opportunities',  handle: 'you@email.com',     href: 'mailto:you@email.com',                icon: 'email'    },
    { id: 'devto',    name: 'Dev.to',    desc: 'Articles & tutorials',        handle: 'dev.to/yourname',   href: 'https://dev.to/yourname',             icon: 'devto'    },
  ],

  // ---- Projects (fill in your real projects) ----
  projects: [],
};
`;
}
