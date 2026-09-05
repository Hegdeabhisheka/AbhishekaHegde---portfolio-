// ─── Central content data source ───────────────────────────────────────────
// TODO: Swap placeholder links below with your real GitHub/LinkedIn URLs
// TODO: Add resume.pdf to /public/ and uncomment the resumeUrl

export const personal = {
  name: 'Abhisheka C Hegde',
  nameDisplay: { first: 'ABHISHEKA', last: 'C HEGDE' },
  title: 'Full Stack Developer',
  tagline: 'I build things that are fast, scalable, and actually work.',
  location: 'Bengaluru, Karnataka, India',
  email: 'hegdeabhisheka@gmail.com',
  phone: '8277349488',
  // TODO: Replace # with your real URLs
  github: '#',   // e.g. https://github.com/hegdeabhisheka
  linkedin: '#', // e.g. https://linkedin.com/in/hegdeabhisheka
  resumeUrl: '/resume.pdf', // TODO: Drop resume.pdf in /public/
  bio: `I'm a Computer Science student and Full Stack Developer based in Bengaluru,
currently interning at Castlerockin Private Limited. I care deeply about performance —
the kind you can actually measure: 8 seconds became under a second.
I build end-to-end: from PostgreSQL schemas and FastAPI services to React UIs
and AI-powered features. I thrive in collaborative Agile teams where code quality
and shipping velocity aren't at odds.`,
  howIWork: `I live in sprint cycles. Daily standups, pull request reviews, and
retrospectives aren't ceremonies I endure — they're how I get better. I own
features end-to-end: design, implementation, deployment, monitoring. I write
code I'd be comfortable reviewing, not just code that compiles. Problems that
have been "around forever" are just the ones no one debugged properly yet.`,
} as const

// ─── Experience ──────────────────────────────────────────────────────────────
export const experience = [
  {
    company: 'Castlerockin Private Limited',
    role: 'Software Engineer Intern',
    location: 'Bangalore',
    period: 'Jan 2026 – Jun 2026',
    type: 'Internship',
    achievements: [
      {
        tag: 'PERF',
        label: 'Dashboard load time',
        stat: { from: '8.0s', to: '< 1s', improvement: '−88%' },
        description:
          'Optimised dashboard with compound MongoDB indexes — cut load time from 8 seconds to under 1 second.',
      },
      {
        tag: 'FIX',
        label: 'Session reliability',
        stat: null,
        description:
          'Fixed session-expiry bugs by implementing a JWT token refresh mechanism, eliminating silent auth failures.',
      },
      {
        tag: 'BUG',
        label: 'Timezone accuracy',
        stat: null,
        description:
          'Resolved timezone mismatches in SQL date filters to ensure accurate cross-region reporting.',
      },
      {
        tag: 'COLLAB',
        label: 'Agile cadence',
        stat: null,
        description:
          'Active participant in daily standups, code reviews, sprint planning sessions, and production deployments.',
      },
    ],
  },
]

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 'resume-matcher',
    slug: '01',
    name: 'AI Resume & JD Matcher',
    tagline: 'NLP-powered semantic compatibility engine for resumes and job descriptions.',
    description: `Computes resume-to-job-description compatibility using sentence embeddings and cosine similarity. 
Surfaces keyword gaps via ATS-style feedback, giving candidates real-time signal on what's missing — 
not just a score, but actionable next steps. Built with Streamlit for rapid iteration and user testing.`,
    tech: ['Python', 'Streamlit', 'Sentence Transformers', 'NLP', 'Scikit-learn', 'Semantic Search'],
    // TODO: Replace with real links
    github: '#',
    live: '#',
    year: '2025',
  },
  {
    id: 'sky-talk',
    slug: '02',
    name: 'Sky Talk',
    tagline: 'Real-time chat platform with WebSocket messaging and media sharing.',
    description: `Full-stack real-time chat application featuring WebSocket-based message delivery, JWT authentication, 
and encrypted media sharing. Backend API designed for concurrency — optimised database schemas handle 
simultaneous connections without race conditions. Scalable architecture ready for horizontal scaling.`,
    tech: ['WebSocket', 'JWT', 'REST APIs', 'MongoDB', 'Node.js', 'React'],
    github: '#',
    live: '#',
    year: '2025',
  },
  {
    id: 'voice-to-task',
    slug: '03',
    name: 'Voice-to-Task AI Assistant',
    tagline: 'Speak your tasks — Whisper + NLP handles the rest.',
    description: `Eliminates manual task entry entirely. Whisper transcribes spoken input; a custom NLP pipeline 
extracts intent, entity names, and deadline signals from natural language. Tasks are auto-generated 
and categorised — no UI friction, no typing. Designed for developers who live in flow state.`,
    tech: ['OpenAI Whisper', 'Python', 'NLP', 'FastAPI', 'Intent Extraction', 'React'],
    github: '#',
    live: '#',
    year: '2026',
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skills = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'],
  Frameworks: ['React', 'FastAPI', 'Scikit-learn', 'NumPy', 'Pandas', 'Streamlit'],
  Tools: ['Git', 'GitHub', 'Postman', 'VS Code', 'Render', 'Vercel', 'GCP', 'AWS'],
  Databases: ['MongoDB', 'MySQL'],
  'Process & Soft': ['Agile / Scrum', 'Sprint Planning', 'Code Review', 'CI/CD', 'Problem Solving', 'Communication'],
}

// ─── Education ────────────────────────────────────────────────────────────────
export const education = [
  {
    degree: 'B.E. Computer Science & Engineering',
    institution: 'SDM Institute of Technology',
    location: 'Karnataka',
    period: '2022 – 2026',
    cgpa: '8.0',
    status: 'Ongoing',
  },
]

// ─── Certifications ───────────────────────────────────────────────────────────
export const certifications = [
  {
    title: 'Software Engineer Intern Certificate',
    issuer: 'HackerRank',
    year: '2025',
  },
  {
    title: 'SQL (Advanced) Certificate',
    issuer: 'HackerRank',
    year: '2025',
  },
  {
    title: 'Generative AI',
    issuer: 'Udemy',
    year: '2024',
  },
  {
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy',
    year: '2023',
  },
]

// ─── Typewriter stack items (Hero) ────────────────────────────────────────────
export const stackItems = [
  'React + FastAPI',
  'Python & SQL',
  'Machine Learning & NLP',
  'MongoDB & MySQL',
  'AWS & GCP',
  'Agile / Scrum',
]
