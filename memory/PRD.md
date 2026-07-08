# Megha Raj V S — Portfolio (Neuron Theme)

## Original Problem Statement
Enhance the existing portfolio (https://portfolio-megha-vijayabalan.vercel.app/):
- Make it more impressive with additional graphics
- Apply a "neuron" theme (neural network animated background)
- Style the profile photo more realistically
- Replace "MR" branding with "Megha Raj V S"
- Support BOTH dark and light themes; fix the light theme menu bar readability
- Ensure single bullet markers in Projects & Education (fix double-bullet issue)

## Architecture
- Frontend: React 19 + CRACO + Tailwind + Framer-independent custom CSS
- Backend: FastAPI (kept minimal, not used by the static portfolio)
- No third-party integrations needed for this iteration
- Assets: profile.jpeg + about.jpg pulled from the deployed reference site into /app/frontend/public/images/

## Implemented (Jan 2026)
- Full rebuild in `/app/frontend/src/`:
  - `components/Portfolio.jsx` — main page (Hero, Marquee, About, Achievements, Skills, Projects, Journey, Contact, Footer)
  - `components/NeuralCanvas.jsx` — animated neuron network background canvas with mouse gravity, dynamic node/line colors per theme
  - `context/ThemeContext.js` — theme provider persisting to localStorage
  - `data/portfolio.js` — all copy (experience, education, publications, projects, achievements, skills, values)
  - `index.css` — complete design system with CSS variables for both dark & light themes
- Neuron theme graphics: animated neural network canvas + floating gradient blobs + orbital dots around portrait + rotating conic-gradient border + grid pattern overlay + tech marquee
- Portrait styled with 3D frame, rotating gradient border, hover zoom, glare and floating "Building LLM Agents" / "10% revenue lift" badges
- Brand replaced: "Megha Raj V S" everywhere (nav, footer, meta)
- Light theme menu bar: glassmorphism pill nav with warm off-white surface, indigo accents, high contrast text
- Custom `.single-bullet` list class ensures ONE bullet marker per list item across Projects & Journey (Education)
- Fully responsive with mobile hamburger nav

## User Personas
- Recruiters / hiring managers evaluating an AI/Data Science candidate
- Potential collaborators or clients looking for LLM/RAG/ETL expertise

## Backlog / Ideas
- P1: Add a downloadable CV/resume PDF (button currently placeholder)
- P2: Add a small blog/writing section
- P2: Add Framer Motion page transitions
- P2: Add a Three.js hero 3D scene (currently 2D canvas only)
