/**
 * Icons
 * Returns SVG strings for all icons used in the portfolio.
 * All icons are inline SVG — no external dependencies.
 */

const Icons = {

  // ---- Social icons ----

  github: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#24292e"/>
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.71c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 7.38c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.49A10.27 10.27 0 0022 12.26C22 6.58 17.52 2 12 2z" fill="white"/>
  </svg>`,

  linkedin: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#0077b5"/>
    <path d="M6.5 9.5h-3v9h3v-9zm-1.5-1.5a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm14 1.5h-2.8c-.7 0-1.2.5-1.2 1.2v7.8h-3v-9h3v1.3c.7-1 1.8-1.3 2.8-1.3 2 0 3.2 1.4 3.2 4v5h-3v-5c0-1-.3-2-2-2z" fill="white"/>
  </svg>`,

  twitter: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="#000"/>
    <path d="M17.7 4h2.4l-5.3 6 6.2 8.2H16l-3.8-5-4.4 5H5.3l5.7-6.5L5 4h4.9l3.5 4.6L17.7 4zm-.8 12.7h1.3L7.3 5.3H5.9l11 11.4z" fill="white"/>
  </svg>`,

  email: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="#ea4335"/>
    <path d="M4 8l8 5 8-5V6H4v2zm0 2.5V18h16v-7.5l-8 5-8-5z" fill="white"/>
  </svg>`,

  devto: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="2" fill="#0a0a0a"/>
    <text x="3" y="16" font-size="8" font-weight="bold" fill="white" font-family="monospace">DEV</text>
  </svg>`,

  // ---- Desktop / file icons ----

  resumeIcon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="2" width="20" height="26" fill="#fffff0" stroke="#000" stroke-width="1"/>
    <rect x="4" y="2" width="20" height="4" fill="#000080"/>
    <rect x="20" y="2" width="4" height="4" fill="#c0c0c0" stroke="#000" stroke-width="1"/>
    <polygon points="20,2 24,2 24,6" fill="#ffffff"/>
    <line x1="8" y1="11" x2="20" y2="11" stroke="#000" stroke-width="1"/>
    <line x1="8" y1="14" x2="20" y2="14" stroke="#000" stroke-width="1"/>
    <line x1="8" y1="17" x2="16" y2="17" stroke="#000" stroke-width="1"/>
    <line x1="8" y1="20" x2="20" y2="20" stroke="#000" stroke-width="1"/>
  </svg>`,

  projectsIcon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="28" height="19" fill="#ffcc00" stroke="#000" stroke-width="1"/>
    <rect x="2" y="10" width="28" height="2" fill="#cc9900"/>
    <path d="M2 10 L2 8 L10 8 L12 10 Z" fill="#ffcc00" stroke="#000" stroke-width="1"/>
    <line x1="6" y1="15" x2="26" y2="15" stroke="#cc9900" stroke-width="1"/>
    <line x1="6" y1="19" x2="26" y2="19" stroke="#cc9900" stroke-width="1"/>
    <line x1="6" y1="23" x2="18" y2="23" stroke="#cc9900" stroke-width="1"/>
  </svg>`,

  socialsIcon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="13" fill="#0055cc" stroke="#000" stroke-width="1"/>
    <circle cx="10" cy="13" r="3" fill="#ffffff"/>
    <circle cx="22" cy="13" r="3" fill="#ffffff"/>
    <circle cx="16" cy="22" r="3" fill="#ffffff"/>
    <line x1="10" y1="13" x2="22" y2="13" stroke="#ffffff" stroke-width="1.5"/>
    <line x1="10" y1="13" x2="16" y2="22" stroke="#ffffff" stroke-width="1.5"/>
    <line x1="22" y1="13" x2="16" y2="22" stroke="#ffffff" stroke-width="1.5"/>
  </svg>`,

  winLogo: `<svg width="16" height="16" viewBox="0 0 16 16">
    <rect x="0" y="0" width="7" height="7" fill="#ff0000"/>
    <rect x="9" y="0" width="7" height="7" fill="#00ff00"/>
    <rect x="0" y="9" width="7" height="7" fill="#0000ff"/>
    <rect x="9" y="9" width="7" height="7" fill="#ffff00"/>
  </svg>`,

  // Small (14px) versions for taskbar
  resumeIconSm: `<svg width="14" height="14" viewBox="0 0 32 32">
    <rect x="4" y="2" width="20" height="26" fill="#fffff0" stroke="#000" stroke-width="1"/>
    <rect x="4" y="2" width="20" height="4" fill="#000080"/>
  </svg>`,

  projectsIconSm: `<svg width="14" height="14" viewBox="0 0 32 32">
    <rect x="2" y="10" width="28" height="19" fill="#ffcc00" stroke="#000" stroke-width="1"/>
    <path d="M2 10 L2 8 L10 8 L12 10 Z" fill="#ffcc00" stroke="#000" stroke-width="1"/>
  </svg>`,

  socialsIconSm: `<svg width="14" height="14" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="13" fill="#0055cc" stroke="#000" stroke-width="1"/>
  </svg>`,

  resizeGrip: `<svg width="12" height="12" viewBox="0 0 12 12">
    <line x1="4" y1="12" x2="12" y2="4" stroke="#808080" stroke-width="1"/>
    <line x1="8" y1="12" x2="12" y2="8" stroke="#808080" stroke-width="1"/>
  </svg>`,
};
