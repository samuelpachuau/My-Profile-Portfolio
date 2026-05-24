
const CONFIG = {

  // ---- Personal info ----
  name:     'Samuel Lalmuanpuia Pachuau',
  title:    'Software Engineer',
  location: 'Mizoram, India',

  // ---- Resume ----
  resume: {
    name:    'SAMUEL LALMUANPUIA PACHUAU',
    contact: [
      '+91 9612041068  |  samuellmpachuau@gmail.com  |  GitHub  |  LinkedIn  |  Aizawl, Mizoram',
      'EDUCATION',
      'Govt. College of Engineering, Tirunelveli	2023 – 2027',
      'B.E. Computer Science and Engineering  |  Tamil Nadu, India',
      'TECHNICAL SKILLS',
    ],
    sections: [
      {
        heading: 'Experience',
        type: 'blocks',
        items: [
          {
            title:    "Data Analyst Intern  |  Mar-Apr 26'",
            subtitle: 'Built reports in IBM Cognos Analytics to analyze project performance, employee attrition, budgeting, and resource utilization.',
            bullets:  [
              'Conducted a business analytics case study, uncovering operational insights through data visualization and story-based reports.',
              'Analyzed planned vs. actual costs and billing rates to assess project efficiency and identify cost optimization opportunities.',
              'Lailen Consulting Pvt Ltd	Jul 2025 – Aug 2025',
            ],
          },
          {
            title:    "Software Engineering Development Intern  |  Jul-Aug 25'",
            subtitle: 'Independently developed a full-stack E-Ticketing System as part of an internship project, covering event creation, booking management, and user/admin authentication.',
            bullets:  [
              'Implemented QR-code-based e-tickets with seat allocation and real-time booking verification, streamlining event entry.',
              'Designed and managed a MySQL relational database schema to store and query event, booking, and user data efficiently.',
            ],
          },
        ],
      },
      {
        heading: 'Projects',
        type: 'blocks',
        items: [
          {
            title:    'HabitAI  —  React · Node.js · Express.js · SQLite · Ollama · Tailwind CSS',
            subtitle: 'Won the IBM NM Hackathon 2025–26 competing as a team of 4, building a gamified habit-tracking app with streak tracking, freeze options, heatmap progress visualization, and a rewards system.',
            bullets:  [
              'Contributed fullstack — built React frontend components and Express.js backend APIs, and integrated a locally-hosted LLM via Ollama to power a personalized AI coaching feature.',
              'Designed the SQLite database schema for user habits, streaks, and reward data, ensuring efficient querying for real-time progress updates.',
            ],
          },
          {
            title:    'E-Ticketing System  —  PHP Laravel · MySQL · QR Code',
            subtitle: 'Built a full-stack event management and e-ticketing platform in a team of 3–5 interns, handling event creation, ticket booking, and attendee management end-to-end.',
            bullets:  [
              'Developed an admin panel for organizers to manage events, bookings, ticket sales, and user details, reducing manual coordination overhead.',
              'Implemented QR-code-based e-ticket generation and validation to streamline ticket verification at event entry points.',
            ],
          },
        ],
      },
      {
        heading: 'Achievements',
        type: 'bullets',
        items: [
          'Winner, IBM NM Hackathon 2025–26 — built and presented HabitAI, a full-stack AI-powered habit tracker, beating competing teams.',
        ],
      },
    ],
  },
  //

  // ---- Social links ----
  socials: [
    {
      id:     'github',
      name:   'GitHub',
      desc:   'Code repositories & open source',
      handle: '@samuelpachuau',
      href:   'https://github.com/samuelpachuau',
      icon:   'github',
    },
    {
      id:     'linkedin',
      name:   'LinkedIn',
      desc:   'Professional network & work history',
      handle: 'in/samuel-pachuau/',
      href:   'https://linkedin.com/in/samuel-pachuau/',
      icon:   'linkedin',
    },
    {
      id:     'email',
      name:   'Email',
      desc:   'Reach me directly for opportunities',
      handle: 'samuellmpachuau@gmail.com',
      href:   'mailto:samuellmpachuau@gmail.com',
      icon:   'email',
    },
  ],

  // ---- Projects ----
  projects: [
    {
      title:  'Event Management',
      desc:   'A platform where you can host event, search for events and book ticket for event.',
      tags:   ['PHP','Laravel', 'SQLite'],
      github: 'https://github.com/samuelpachuau/EventManagement',
    },
    {
      title:  'REHABit',
      desc:   'A gamified habit-tracking app with streak tracking, freeze options, heatmap progress visualization, and a rewards system.',
      tags:   ['React', 'Node.js', 'Express.js', 'SQLite', 'Ollama', 'Tailwind CSS'],
      github: 'https://github.com/samuelpachuau/REHABit',
    },
  ],
};
