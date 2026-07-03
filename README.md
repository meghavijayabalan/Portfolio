# Megharaj V S — Portfolio

A single-page, scrollable Flask portfolio for a Data Scientist / AI Engineer
with 3+ years of experience (RPA & Data Analysis → Data Science & AI).
Built to feel classy and HR-catchy in the first five seconds, and honest
about real production work underneath.

Live sections: **Hero → About → Experience → Skills → Projects → Education
→ Contact**, plus a floating **chatbot** that only answers questions about
Megharaj, and a **contact form that sends real email**.

---

## 1. Design plan ("design thinking using neurons")

### Why neurons
The brief is a Data Scientist / AI Engineer's portfolio. Instead of a
generic "tech" look (dark mode + one neon accent + numbered feature
cards), the whole page is treated as **a small neural network you're
looking at from the inside**: nodes drift, connect to nearby nodes, and
occasionally fire a synapse pulse — exactly the mental model of the
work described in the Experience section (RAG pipelines, entity graphs,
agent reasoning paths). The metaphor isn't decorative; it's the same
diagram-language used in Megharaj's own thesis and conference slides
(edge-detection pipelines, architecture flowcharts, confusion matrices),
so the site's visual system is drawn from the subject's own world.

### Design tokens

**Color — "Synapse" palette**
| Token | Hex | Use |
|---|---|---|
| `--bg-void` | `#0B0E14` | Page background — near-black navy, not pure black |
| `--bg-panel` | `#10141D` | Card / panel surfaces |
| `--text-primary` | `#EDEAE3` | Headlines, body — warm parchment, not pure white |
| `--text-muted` | `#8B93A7` | Secondary copy |
| `--signal` (accent 1) | `#6C8CFF` | Structure: links, node color, section eyebrows |
| `--ember` (accent 2) | `#FFB37B` | The one warm accent — CTA hover, "current role" marker, synapse pulse |

Two accents, used with discipline: blue = the network at rest, amber =
the network firing (a live role, a hover state, a call-to-action). That
distinction is the whole color system.

**Type**
| Role | Face | Why |
|---|---|---|
| Display | **Fraunces** (serif, italic for emphasis) | Gives the page a human, editorial voice instead of the default "startup sans" — signals "person," not "product" |
| Body | **Inter** | Neutral, highly legible at small sizes |
| Mono / labels | **JetBrains Mono** | Used for nav, eyebrows, tags, dates, periods — reads as "data," reinforcing the technical subject without shouting it |

**Layout**
- Single page, `scroll-behavior: smooth`, sticky top nav that highlights
  the section currently in view.
- Hero is a thesis statement, not a stat wall: name, role, one sentence,
  two buttons — the neuron canvas behind it does the "selling."
- Experience is a **vertical timeline** (order carries real information:
  most recent role first, current role marked with the ember node).
- Skills are **grouped chip clusters** (by category, not a flat cloud) so
  a recruiter can scan "does he know cloud/MLOps" in two seconds.
- Projects are a **card grid**, tagged `Production` vs `Academic` vs
  `Published Research` — signals seniority without extra copy.

**Signature element**
`static/js/neurons.js` — a full-viewport canvas of drifting nodes with
proximity-based connecting lines, gently repelled by the cursor, that
occasionally sends a bright "synapse" pulse from one node to a neighbour.
It sits behind every section (not just the hero) at low opacity so it
reads as atmosphere, not noise, and respects
`prefers-reduced-motion` (draws one static frame and stops).

### Interaction & motion
- Sections fade/slide in on scroll via `IntersectionObserver`
  (`[data-reveal]` in CSS/JS) — one clean reveal, not per-element stagger
  chaos.
- Hover states are restrained: cards lift 4px, chips tint, buttons invert.
- All motion is disabled under `prefers-reduced-motion: reduce`.

### Accessibility & responsiveness baseline
- Visible focus rings (`:focus-visible`) everywhere.
- Semantic HTML (`nav`, `section`, `form`, `label`+`input` pairs).
- Mobile: nav collapses to a toggle menu, grids collapse to one column,
  hero type scales with `clamp()`, chat panel width caps at
  `calc(100vw - 40px)`.
- Reduced-motion users get a static neuron frame instead of the animation
  loop.

---

## 2. What's actually built

```
megharaj-portfolio/
├── app.py                 # Flask app: page route, /api/contact, /api/chat
├── chatbot.py              # Rule-based chatbot, gated to on-topic questions only
├── profile_data.py          # SINGLE SOURCE OF TRUTH for all content on the site
│                             #   AND everything the chatbot is allowed to say
├── requirements.txt
├── .env.example             # Copy to .env and fill in real SMTP creds
├── templates/
│   └── index.html            # The entire single page (Jinja2, loops over profile_data)
└── static/
    ├── css/style.css          # Design tokens + full responsive layout
    └── js/
        ├── neurons.js          # Signature neuron-network canvas background
        └── main.js              # Nav, scroll-reveal, contact form, chatbot wiring
```

### Why one data file (`profile_data.py`)
Every fact on the page (experience, skills, projects, education) lives in
one Python dict/list structure. `app.py` passes it straight to the Jinja2
template, and `chatbot.py` imports the *same* structures to build its
answers. **Update your resume in one place and both the visible page and
the chatbot stay accurate — there is no second copy to forget about.**

### The chatbot — and why it's rule-based, not an LLM call
`chatbot.py` does keyword/regex matching against topic buckets
(experience, skills, projects, education, contact, location, summary) and
returns a templated answer built from `profile_data.py`. Anything that
doesn't match a bucket gets a fixed refusal:

> "I only talk about Megharaj's work — experience, skills, projects,
> education or how to get in touch. Try asking me one of those!"

This was a deliberate choice over wiring up an LLM API:
- **No API key, no cost, nothing to leak** — the portfolio runs standalone.
- **It cannot go off-script.** An LLM system prompt saying "only talk about
  X" can still be jailbroken; a bot with no general-knowledge path
  structurally can't answer "who won the World Cup" because it has no
  code path that does anything but look up Megharaj's own data.
- If you later want a real LLM personality layered on top, keep
  `is_on_topic()` (already exported from `chatbot.py`) as a **gate**
  in front of it, and only call the LLM when it returns `True`.

### The contact form — real email, not a `mailto:` link
`POST /api/contact` validates the payload, then sends mail via `smtplib`
(SMTP over SSL) using credentials from environment variables — never
hard-coded, never committed. If the server isn't configured yet, the
visitor gets a graceful message pointing to the direct email address
instead of a broken form.

---

## 3. Running it locally

```bash
cd megharaj-portfolio
python3 -m venv venv && source venv/bin/activate      # optional but recommended
pip install -r requirements.txt

cp .env.example .env
# edit .env with a real SMTP_USER / SMTP_PASS (see notes below)

python app.py
# visit http://127.0.0.1:5000
```

### Setting up SMTP (Gmail example — free, works for a portfolio's volume)
1. Turn on 2-Step Verification on the sending Gmail account.
2. Google Account → Security → **App passwords** → generate one for "Mail".
3. Put that 16-character password in `.env` as `SMTP_PASS` (not your normal
   Gmail password). `SMTP_USER` is the full Gmail address.
4. `CONTACT_TO` is where messages land — defaults to Megharaj's email in
   `profile_data.py`.

Any SMTP provider works (Outlook, SES, SendGrid SMTP relay, Zoho) — just
change `SMTP_HOST` / `SMTP_PORT` accordingly.

---

## 4. Deploying

The app is a standard Flask app — deploy anywhere that runs Python:

- **Render / Railway / Fly.io**: `gunicorn app:app`, set the env vars from
  `.env.example` in the platform's dashboard (never upload `.env` itself).
- **PythonAnywhere**: point the WSGI file at `app.app`, set env vars in
  the web app's "Environment variables" section.
- Any host: `gunicorn -w 2 -b 0.0.0.0:8000 app:app` behind a reverse proxy
  (nginx/Caddy) with HTTPS.

Static assets are served by Flask's default static handler, which is fine
at portfolio-traffic scale; put a CDN/nginx in front if that ever changes.

---

## 5. Updating content

You almost never need to touch `templates/index.html` or the CSS/JS.
To update your resume on the live site:

1. Open `profile_data.py`.
2. Edit `PROFILE`, `EXPERIENCE`, `SKILLS`, `PROJECTS`, `EDUCATION`, or
   `CERTIFICATIONS`.
3. Restart the app. The page **and** the chatbot both pick up the change
   automatically.

---

## 6. Design decisions I'd reconsider if this grows

- If the project list grows past ~10, add category filter chips above the
  grid rather than a longer scroll.
- If you want the chatbot to handle genuinely open-ended questions well,
  swap the regex matcher for embeddings-based retrieval over
  `profile_data.py` chunks, but keep the "no match → refuse" fallback —
  that's the actual safety property, not the matching technique.
- Resume PDF download: not included by default (none was supplied for
  this build). Drop a `resume.pdf` into `static/` and add one `<a>` link
  in the hero `hero__cta` block if you want that button.
