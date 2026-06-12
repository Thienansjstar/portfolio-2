// ─────────────────────────────────────────────────────────────
// All site content lives here. Edit this file to update the
// site — no need to touch any component.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Thien-An Tran',
  shortName: 'Thien-An',
  role: 'Software Engineer',
  tagline: 'I build secure systems, full-stack apps, and the occasional video game.',
  location: 'Seattle, WA',
  availability: 'Open to new opportunities',
  email: 'thienanthedrmer@gmail.com',
  phone: '(206) 883-0263',
  github: 'https://github.com/Thienansjstar',
  linkedin: 'https://www.linkedin.com/in/thienan-tran-0a9803233',
  resume: `${import.meta.env.BASE_URL}Thien-An_Tran_Resume.pdf`,
  education: {
    school: 'University of Washington',
    degree: 'BSc. Computer Science',
    years: '2022 — 2026',
    coursework: [
      'Cryptography',
      'Secure Coding Principles',
      'Data Structures & Algorithms',
      'Machine Learning',
      'AI & Knowledge',
      'Machine Organization',
      'Database Systems Design',
      'Game Simulation & Design',
    ],
  },
  about: [
    `Hi, I'm Thien-An Tran, a computer science student at the University of Washington (Class of 2026) with a deep passion for building secure, scalable, and intelligent software.`,
    `My love for coding started with the thrill of bringing ideas to life — whether that was developing a real-time multiplayer game from scratch or building platforms that help people connect. There is something incredibly rewarding about taking a blank screen and turning it into a functional tool that people can actually use.`,
    `As I've progressed through my degree, my interests have gravitated toward the complex puzzles of cryptography, AI, and secure systems architecture. Recently, I've been heavily focused on building hardened applications and implementing encryption standards from the ground up. Whether I'm designing a Bayesian reasoning engine for an autonomous agent, managing sensitive databases for my local community, or red-teaming a peer's codebase to find vulnerabilities, I love the challenge of writing code that isn't just functional, but rock-solid and secure.`,
    `When I'm not debugging a tricky stream cipher or optimizing a React frontend, I'm always looking for the next challenging project to tackle.`,
  ],
  currently: [
    { label: 'Building', value: 'A computer vision pipeline for real-time object detection' },
  ],
};

export const experience = [
  {
    role: 'Full Stack Developer',
    company: "Vietnamese Martyr's Parish",
    period: '2024 — 2026',
    stack: ['React', 'Azure Blob Storage', 'SQL'],
    points: [
      'Developed a secure document management system with React and Microsoft Azure Blob Storage.',
      'Implemented access controls and data-integrity measures for 500+ sensitive user records.',
      'Designed and maintain a SQL database of 500+ user records with optimized queries and strict integrity enforcement.',
      'Applied security best practices throughout: parameterized queries, access controls, and privacy-compliant data handling.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'PROstrada',
    period: '2024 — 2025',
    stack: ['React', 'JavaScript'],
    points: [
      'Designed and developed interactive web applications in React, translating client requirements into functional software that met performance and responsiveness standards.',
      'Partnered with non-technical stakeholders to turn operational requirements into software designs aligned with business and user needs.',
      'Maintained and enhanced products iteratively on stakeholder feedback, managing requirement changes across the development lifecycle.',
    ],
  },
];

// `file` powers the IDE-style title bar on each project card.
export const projects = [
  {
    title: 'Cryptography Library',
    file: 'crypto-lib.java',
    year: '2026',
    featured: true,
    stack: ['Java', 'NIST FIPS 202', 'SHA-3', 'SHAKE', 'ECIES', 'Schnorr'],
    description:
      'A from-scratch implementation of modern cryptographic primitives in Java — no libraries, verified against official NIST test vectors.',
    points: [
      'SHA-3-256/512 and SHAKE-128/256 conforming to NIST FIPS 202',
      'Symmetric encryption with SHAKE-128 as a stream cipher + SHAKE-based MAC for tamper detection',
      'NUMS ed-256 Edwards curve arithmetic: point addition, scalar multiplication, subgroup validation',
      'ECIES authenticated public-key encryption and Schnorr signatures with deterministic nonces',
    ],
    github: 'https://github.com/Thienansjstar',
  },
  {
    title: 'Secure Data Entry System',
    file: 'secure-entry.py',
    year: '2026',
    stack: ['Java', 'Python', 'Argon2', 'unittest'],
    description:
      'Hardened data-entry applications built twice — once in Java, once in Python — then defended in an adversarial red-team competition.',
    points: [
      'Salted SHA-256 (Java) and Argon2 memory-hard hashing (Python) for password storage',
      'Overflow-safe arithmetic, regex-whitelisted path sanitization, parameterized input handling',
      '20+ unit tests covering boundary conditions, overflow cases, and error paths',
      'Exploited vulnerabilities in peer implementations while defending my own codebase',
    ],
    github: 'https://github.com/Thienansjstar',
  },
  {
    title: 'B+ Tree Index Engine',
    file: 'BTreeIndex.java',
    year: '2026',
    stack: ['Java', 'B+ Tree', 'SQL Parsing', 'Database Systems'],
    description:
      'A from-scratch in-memory B+ tree index integrated into a relational database engine, accelerating point and range queries with no external libraries.',
    points: [
      'Degree-10 B+ tree built from scratch: insertion, node splitting, and linked leaf traversal',
      'Parsed and executed CREATE INDEX SQL statements with automatic index selection on equality queries',
      'Range query acceleration via linked leaf nodes for WHERE col > a AND col < b patterns',
      'Bulk CSV ingestion via LOAD DATA INFILE with index construction on indexed columns',
    ],
    github: 'https://github.com/Thienansjstar',
  },
  {
    title: 'Nightfall Survivors',
    file: 'nightfall.js',
    year: '2026',
    stack: ['JavaScript', 'HTML5 Canvas', 'GitHub Pages'],
    description:
      'A 2D top-down wave-survival game inspired by Vampire Survivors — auto-attacking weapons, swelling enemy waves, and level-up upgrade choices, built on raw HTML5 Canvas with a three-person team.',
    points: [
      'Complete play-until-death loop: wave spawning, XP gems, leveling, and upgrade selection',
      'Circle-based collision detection and an infinite scrolling world with no walls',
      'Auto-firing weapon system with cooldowns and stacking upgrades',
    ],
    github: 'https://github.com/GeorgeNj101/tcss-491-nightfall-survivors',
  },
  {
    title: 'AI Autonomous Agent',
    file: 'agent.py',
    year: '2025',
    stack: ['Python', 'Bayesian Inference', 'A*'],
    description:
      'A multi-agent navigation system combining adversarial search with probabilistic reasoning under sensor uncertainty.',
    points: [
      'Five pathfinding algorithms (BFS, DFS, UCS, Greedy, A*) with comparative optimality analysis',
      'Bayesian reasoning engine handling false-positive and false-negative sensor readings',
      'Belief distributions maintained and updated via posterior inference',
    ],
    github: 'https://github.com/Thienansjstar',
  },
  {
    title: 'Beaches-N-Barrels',
    file: 'crabstone.py',
    year: '2025',
    stack: ['Python', 'Pygame', 'MVC', 'Unit Testing'],
    description:
      'A fast-paced, beach-themed roguelike: battle bizarre sea creatures and collect wacky power-ups through the ever-changing rooms of the Crabstone Castle.',
    points: [
      'Clean MVC architecture — separate Model, View, and Controller layers with a custom event system',
      'Procedurally varied castle rooms, power-ups, and a game-save system',
      'Dedicated unit-test suite covering core game logic',
    ],
    github: 'https://github.com/buruky/Beaches-N-Barrels',
  },
  {
    title: 'Calculrush',
    file: 'server.js',
    year: '2024',
    stack: ['Node.js', 'Phaser', 'Socket.IO'],
    description:
      'Real-time multiplayer educational game with a server-authoritative architecture, shipped to production with 25+ concurrent users.',
    points: [
      'Client–server event protocol enabling parallel frontend/backend work across a three-person team',
      'Server-authoritative game state to keep competitive play fair',
    ],
    github: 'https://github.com/Thienansjstar/tower-defense',
  },
  {
    title: 'Vicinity',
    file: 'vicinity.jsx',
    year: '2023',
    stack: ['React', 'Firebase', 'Google Maps API'],
    description:
      'A social app for discovering and posting local events in real time, filtered by a user-defined radius.',
    points: [
      'Google Maps integration displaying events within a custom radius',
      'Firestore queries for category, date, and location filtering with real-time retrieval',
    ],
    github: 'https://github.com/Thienansjstar',
  },
  {
    title: 'JumpMan',
    file: 'JumpMan.cs',
    year: '2022',
    stack: ['C#', 'Unity Engine'],
    description:
      'My first game: a multi-difficulty platformer where you dodge homing bullets and spikes across three difficulty levels — the same little guy who runs across this site if you find him.',
    points: [
      'Three difficulty modes with player-tracking projectiles and hazard layouts',
      'Health system and complete game loop built solo in Unity',
    ],
    github: 'https://github.com/Thienansjstar/Jump-man',
    demo: 'https://drive.google.com/file/d/1t2sQbIclPtLFTxqrBFk-nF8CRK-yisS5/view?usp=sharing',
  },
];

// IDE tabs in the Skills section — `file` is the tab label.
export const skills = [
  {
    group: 'Languages',
    file: 'languages.json',
    items: ['Java', 'Python', 'JavaScript', 'C#', 'C++', 'SQL', 'C', 'Erlang', 'Assembly', 'HTML', 'CSS'],
  },
  {
    group: 'Security & Cryptography',
    file: 'security.md',
    items: ['SHA-3 / SHAKE', 'NIST FIPS 202', 'Argon2', 'ECIES', 'Schnorr Signatures', 'Secure Coding', 'Red Teaming'],
  },
  {
    group: 'Frameworks & Tools',
    file: 'tooling.config',
    items: ['React', 'Node.js', 'Firebase', 'Microsoft Azure', 'PyTorch', 'OpenCV', 'NumPy', 'Git', 'Socket.IO', 'Phaser', 'Unity', 'Bootstrap', 'Heroku'],
  },
];

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
