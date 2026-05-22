/**
 * config.js
 * ============================================
 * ✏️  EDIT THIS FILE to personalize your portfolio.
 * Change your name, social links, and project details here.
 * ============================================
 */

const CONFIG = {

  // ---- Personal info ----
  name: 'Your Name',
  title: 'Software Engineer',
  location: 'Chennai, India',

  // ---- Social links ----
  // Set href to the real URL. Leave blank ("") to hide that row.
  socials: [
    {
      id:    'github',
      name:  'GitHub',
      desc:  'Code repositories & open source',
      handle:'@yourhandle',
      href:  'https://github.com/yourhandle',
      icon:  'github',
    },
    {
      id:    'linkedin',
      name:  'LinkedIn',
      desc:  'Professional network & work history',
      handle:'in/yourname',
      href:  'https://linkedin.com/in/yourname',
      icon:  'linkedin',
    },
    {
      id:    'twitter',
      name:  'X / Twitter',
      desc:  'Thoughts, tech takes & updates',
      handle:'@yourhandle',
      href:  'https://twitter.com/yourhandle',
      icon:  'twitter',
    },
    {
      id:    'email',
      name:  'Email',
      desc:  'Reach me directly for opportunities',
      handle:'yourname@email.com',
      href:  'mailto:yourname@email.com',
      icon:  'email',
    },
    {
      id:    'devto',
      name:  'Dev.to / Blog',
      desc:  'Technical articles & tutorials',
      handle:'dev.to/yourname',
      href:  'https://dev.to/yourname',
      icon:  'devto',
    },
  ],

  // ---- Projects ----
  projects: [
    {
      title: 'DevLink — Developer Networking Platform',
      desc:  'A platform where developers connect, share projects and find collaborators. Features real-time chat and a project matching algorithm.',
      tags:  ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
      github:'https://github.com/yourhandle/devlink',
      demo:  'https://devlink.example.com',
    },
    {
      title: 'AutoDocs — AI Documentation Generator',
      desc:  'CLI tool that automatically generates README and API docs from source code using LLMs. Supports Python, JS and Go. 500+ GitHub stars.',
      tags:  ['Python', 'OpenAI API', 'CLI', 'AST Parsing'],
      github:'https://github.com/yourhandle/autodocs',
      demo:  '',
    },
    {
      title: 'BudgetOS — Personal Finance Tracker',
      desc:  'Progressive web app for tracking expenses, income and savings goals with smart categorization and monthly insights. Offline-first.',
      tags:  ['TypeScript', 'React', 'PWA', 'Chart.js'],
      github:'https://github.com/yourhandle/budgetos',
      demo:  'https://budgetos.example.com',
    },
    {
      title: 'VaultPass — Local Password Manager',
      desc:  'Electron desktop app for managing passwords locally with AES-256 encryption. No cloud sync — your data never leaves your machine.',
      tags:  ['Electron', 'React', 'AES-256', 'SQLite'],
      github:'https://github.com/yourhandle/vaultpass',
      demo:  '',
    },
  ],
};
