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
  - `components/NeuralCanvas.jsx` — animated glowing particle background (lines removed per user request)
  - `components/PortraitVortex.jsx` — dense green particle swirl orbiting around the portrait (vein-green energy field)
  - `context/ThemeContext.js` — theme provider persisting to localStorage
  - `data/portfolio.js` — all copy
  - `index.css` — complete design system with vein-green CSS variables for both dark & light themes

### Iteration 2 (Vein-Green update)
- Palette switched from indigo/violet to vein-neon green (dark: #22ff88 / #a3ff5c / #00e0a0; light: emerald #10b981 / #22c55e / #84cc16)
- Removed all connecting synapse lines from the background neural canvas — only glowing green particles remain
- Portrait now frameless: radial mask fades the photo edges into the page background, with a soft pulsing green halo behind and a swirling `PortraitVortex` particle orbit around it (matches user's reference screenshot)
- About-Me image is now a fully 3D interactive tilt (rotateX/Y follows cursor with translateZ pop-out and green sheen)
- Added `Download CV` button in hero → `/cv.pdf` (placeholder file at `/app/frontend/public/cv.pdf` — user should replace with real PDF)

## User Personas
- Recruiters / hiring managers evaluating an AI/Data Science candidate
- Potential collaborators or clients looking for LLM/RAG/ETL expertise

## Backlog / Ideas
- P1: Add a downloadable CV/resume PDF (button currently placeholder)
- P2: Add a small blog/writing section
- P2: Add Framer Motion page transitions
- P2: Add a Three.js hero 3D scene (currently 2D canvas only)
