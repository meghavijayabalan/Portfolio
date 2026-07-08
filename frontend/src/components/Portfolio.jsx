import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Download,
  Sparkles,
  Cpu,
  Cloud,
  BarChart3,
  Zap,
  BrainCircuit,
  Rocket,
  Award,
  BookOpen,
  Send,
  ExternalLink,
} from "lucide-react";
import NeuralCanvas from "@/components/NeuralCanvas";
import { useTheme } from "@/context/ThemeContext";
import {
  experience,
  education,
  publications,
  projects,
  achievements,
  skills,
  values,
} from "@/data/portfolio";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

// Reveal on scroll hook
const useReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const Nav = () => {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      for (const s of NAV) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          const bot = top + el.offsetHeight;
          if (y >= top && y < bot) {
            setActive(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nav" data-testid="main-nav">
      <div className="brand" data-testid="brand-logo">
        <span className="brand-dot" />
        Megha Raj V S
      </div>
      <div className={`nav-links flex items-center gap-1 ${open ? "open" : ""}`}>
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={active === n.id ? "active" : ""}
            onClick={() => setOpen(false)}
            data-testid={`nav-link-${n.id}`}
          >
            {n.label}
          </a>
        ))}
      </div>
      <button
        className="theme-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        data-testid="theme-toggle"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen((s) => !s)}
        aria-label="Menu"
        data-testid="mobile-menu-toggle"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="hero" data-testid="section-home">
    <div className="floating-shapes">
      <div className="shape s1" />
      <div className="shape s2" />
      <div className="shape s3" />
    </div>
    <div className="container-x z-content grid md:grid-cols-2 gap-16 items-center">
      <div className="reveal">
        <span className="eyebrow" data-testid="hero-eyebrow">
          <Sparkles size={12} /> Data Scientist · AI Developer
        </span>
        <h1 className="hero-title" data-testid="hero-title">
          I turn data into <span className="accent">intelligence.</span>
          <br />
          I turn ideas into <span className="accent">impact.</span>
        </h1>
        <p className="hero-sub">
          Megha Raj V S — Data Scientist & AI Engineer with 1.3+ years of
          production experience building LLM agents, RAG pipelines, and
          cloud-scale ETL systems that drive measurable business value.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { icon: <BrainCircuit size={12} />, t: "AI & Machine Learning" },
            { icon: <BarChart3 size={12} />, t: "Data Science & Analytics" },
            { icon: <Cloud size={12} />, t: "Cloud & Data Engineering" },
            { icon: <Zap size={12} />, t: "Agents & Automation" },
          ].map((c) => (
            <span key={c.t} className="chip">
              {c.icon} {c.t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="#projects"
            className="btn btn-primary"
            data-testid="cta-view-work"
          >
            View my work <ArrowRight size={16} />
          </a>
          <a
            href="mailto:megha042023@gmail.com"
            className="btn btn-ghost"
            data-testid="cta-hire"
          >
            <Download size={16} /> Get in touch
          </a>
        </div>

        <div className="flex items-center gap-4 mt-10">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "var(--ink-soft)" }}
          >
            Connect
          </span>
          <span
            className="h-px flex-1 max-w-[60px]"
            style={{ background: "var(--border-strong)" }}
          />
          <a
            href="https://www.linkedin.com/in/meghavijayabalan"
            target="_blank"
            rel="noreferrer"
            className="chip"
            data-testid="social-linkedin"
          >
            <Linkedin size={12} /> LinkedIn
          </a>
          <a
            href="https://github.com/megharaj1997"
            target="_blank"
            rel="noreferrer"
            className="chip"
            data-testid="social-github"
          >
            <Github size={12} /> GitHub
          </a>
        </div>
      </div>

      <div className="reveal relative" style={{ transitionDelay: "0.1s" }}>
        <div className="portrait-frame" data-testid="hero-portrait">
          <div className="portrait-orbit">
            <span className="dot d1" />
            <span className="dot d2" />
            <span className="dot d3" />
          </div>
          <div className="inner">
            <img src="/images/profile.jpeg" alt="Megha Raj V S" />
          </div>
          <div className="glare" />
        </div>

        {/* Floating badges around portrait */}
        <div
          className="hidden md:flex absolute -top-4 -left-4 items-center gap-2 px-4 py-3 rounded-2xl"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            backdropFilter: "blur(12px)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <Cpu size={16} style={{ color: "var(--neuron-1)" }} />
          <div>
            <div className="font-mono text-[10px] opacity-60 uppercase">
              Building
            </div>
            <div className="text-sm font-semibold">LLM Agents</div>
          </div>
        </div>

        <div
          className="hidden md:flex absolute -bottom-4 -right-4 items-center gap-2 px-4 py-3 rounded-2xl"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            backdropFilter: "blur(12px)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <BarChart3 size={16} style={{ color: "var(--neuron-3)" }} />
          <div>
            <div className="font-mono text-[10px] opacity-60 uppercase">
              Impact
            </div>
            <div className="text-sm font-semibold">10% revenue lift</div>
          </div>
        </div>
      </div>
    </div>

    {/* Stats strip */}
    <div className="container-x z-content mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
      {[
        { n: "3+", l: "Years Experience" },
        { n: "1.3+", l: "Years Data Scientist" },
        { n: "10+", l: "Projects Delivered" },
        { n: "15%+", l: "Business Impact" },
      ].map((s) => (
        <div key={s.l} className="stat-card">
          <div className="num">{s.n}</div>
          <div className="lbl">{s.l}</div>
        </div>
      ))}
    </div>
  </section>
);

const MarqueeStrip = () => {
  const items = [
    "Python",
    "SQL",
    "AWS",
    "MongoDB",
    "LangChain",
    "OpenAI",
    "Power BI",
    "Docker",
    "PyTorch",
    "TensorFlow",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="marquee" data-testid="tech-marquee">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
};

const About = () => (
  <section id="about" className="section" data-testid="section-about">
    <div className="grid-bg" />
    <div className="container-x z-content grid md:grid-cols-2 gap-16 items-center">
      <div className="reveal relative">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <img
            src="/images/about.jpg"
            alt="Megha Raj V S at work"
            className="w-full h-auto block"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(200deg, transparent 40%, color-mix(in srgb, var(--neuron-1) 15%, transparent))",
            }}
          />
        </div>
        <div
          className="absolute -bottom-6 -right-6 hidden md:block px-6 py-4 rounded-2xl font-mono text-xs"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            backdropFilter: "blur(12px)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div style={{ color: "var(--neuron-1)" }}>
            {"> deep_learning.deploy()"}
          </div>
          <div style={{ color: "var(--ink-soft)" }}>
            {"  status: production ✓"}
          </div>
        </div>
      </div>

      <div className="reveal">
        <span className="eyebrow">
          <BrainCircuit size={12} /> About Me
        </span>
        <h2 className="section-title">
          Bridging <em>Data</em> & Cognition
        </h2>
        <p
          className="mt-6 text-base leading-relaxed"
          style={{ color: "var(--ink-muted)" }}
        >
          I am a passionate Data Scientist and AI Engineer with a solid
          grounding in Digital Image Computing. My expertise lies in designing
          deep neural architectures and optimization frameworks — making deep
          learning accessible, resource-efficient, and practical for production
          deployment.
        </p>
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: "var(--ink-muted)" }}
        >
          My career reflects a deliberate transition: from Automation (RPA) &
          Data Analysis — building software robots and optimizing backend
          workflows — into Deep Learning & Computer Vision, designing
          spatiotemporal networks for visual speech recognition and advanced
          mathematical imaging solutions.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <a href="#contact" className="btn btn-primary">
            <Send size={16} /> Hire me
          </a>
          <a href="#journey" className="btn btn-ghost">
            Read journey <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Achievements = () => (
  <section
    id="achievements"
    className="section"
    style={{ paddingTop: 0 }}
    data-testid="section-achievements"
  >
    <div className="container-x z-content">
      <div className="reveal text-center max-w-2xl mx-auto">
        <span className="eyebrow">
          <Rocket size={12} /> Synaptic Firings
        </span>
        <h2 className="section-title">
          Key <em>Achievements</em>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {achievements.map((a, i) => (
          <div key={i} className="card achievement reveal">
            <div className="icon">
              <Award size={20} />
            </div>
            <p>{a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="section" data-testid="section-skills">
    <div className="grid-bg" />
    <div className="container-x z-content">
      <div className="reveal text-center max-w-2xl mx-auto">
        <span className="eyebrow">
          <Cpu size={12} /> Neural Stack
        </span>
        <h2 className="section-title">
          Expertise & <em>Toolkit</em>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-14">
        {skills.map((s) => (
          <div key={s.title} className="card skill-cat reveal">
            <h4>{s.title}</h4>
            <div className="chips">
              {s.items.map((it) => (
                <span key={it} className="chip">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" className="section" data-testid="section-projects">
    <div className="container-x z-content">
      <div className="reveal text-center max-w-2xl mx-auto">
        <span className="eyebrow">
          <Sparkles size={12} /> Select Neurons
        </span>
        <h2 className="section-title">
          Featured <em>Projects</em>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-14">
        {projects.map((p, i) => (
          <article
            key={p.title}
            className="card project-card reveal"
            data-testid={`project-card-${i}`}
          >
            <span className="tag">{p.tag}</span>
            <h3>{p.title}</h3>
            <p style={{ color: "var(--ink-muted)", lineHeight: 1.65 }}>
              {p.desc}
            </p>
            <ul className="single-bullet">
              <li>{p.impact}</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-2">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const TimelineList = ({ items, testId }) => (
  <div className="timeline" data-testid={testId}>
    {items.map((it, i) => (
      <div
        key={i}
        className="timeline-item reveal"
        style={{ transitionDelay: `${i * 0.05}s` }}
      >
        <div className="when">{it.when}</div>
        <div className="role">{it.role}</div>
        <div className="org">
          {it.org}
          {it.duration ? ` · ${it.duration}` : ""}
        </div>
        <ul className="single-bullet">
          {it.bullets.map((b, k) => (
            <li key={k}>{b}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const Journey = () => {
  const [tab, setTab] = useState("exp");
  return (
    <section id="journey" className="section" data-testid="section-journey">
      <div className="grid-bg" />
      <div className="container-x z-content">
        <div className="reveal text-center max-w-2xl mx-auto">
          <span className="eyebrow">
            <BookOpen size={12} /> My Journey
          </span>
          <h2 className="section-title">
            From Curiosity to <em>Impact</em>
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "var(--ink-muted)" }}
          >
            A journey of continuous learning, building meaningful solutions, and
            turning data into decisions that drive real-world impact.
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-10 reveal">
          {[
            { id: "exp", l: "Experience" },
            { id: "edu", l: "Education & Publications" },
          ].map((t) => (
            <button
              key={t.id}
              className={`btn ${tab === t.id ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setTab(t.id)}
              data-testid={`journey-tab-${t.id}`}
            >
              {t.l}
            </button>
          ))}
        </div>

        <div className="mt-14 max-w-3xl mx-auto">
          {tab === "exp" ? (
            <>
              <h3
                className="font-display text-2xl mb-8"
                style={{ color: "var(--ink)" }}
              >
                Professional Experience
              </h3>
              <TimelineList items={experience} testId="timeline-experience" />
            </>
          ) : (
            <>
              <h3
                className="font-display text-2xl mb-8"
                style={{ color: "var(--ink)" }}
              >
                Education
              </h3>
              <TimelineList items={education} testId="timeline-education" />
              <h3
                className="font-display text-2xl mb-8 mt-4"
                style={{ color: "var(--ink)" }}
              >
                Publications
              </h3>
              <TimelineList
                items={publications}
                testId="timeline-publications"
              />
            </>
          )}
        </div>

        <div className="mt-20 reveal">
          <h3
            className="font-display text-2xl text-center mb-10"
            style={{ color: "var(--ink)" }}
          >
            What I Bring to the Table
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <div key={v.title} className="card achievement">
                <div className="icon">
                  <Sparkles size={18} />
                </div>
                <h4
                  className="font-display text-lg mb-2"
                  style={{ color: "var(--ink)" }}
                >
                  {v.title}
                </h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio contact from ${form.name || "you"}`
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:megha042023@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section" data-testid="section-contact">
      <div className="container-x z-content">
        <div className="reveal text-center max-w-2xl mx-auto">
          <span className="eyebrow">
            <Zap size={12} /> Synapse Connection
          </span>
          <h2 className="section-title">
            Get in <em>Touch</em>
          </h2>
          <p className="mt-4" style={{ color: "var(--ink-muted)" }}>
            Interested in collaborating, hiring me, or discussing deep learning
            / computer vision architectures? Feel free to drop a message.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-14 max-w-5xl mx-auto">
          <div className="space-y-4 reveal">
            {[
              {
                icon: <Mail size={18} />,
                lbl: "Email",
                val: "megha042023@gmail.com",
                href: "mailto:megha042023@gmail.com",
              },
              {
                icon: <Phone size={18} />,
                lbl: "Phone",
                val: "+91 7025654877",
                href: "tel:+917025654877",
              },
              {
                icon: <MapPin size={18} />,
                lbl: "Location",
                val: "Trivandrum, Kerala, India",
              },
              {
                icon: <Linkedin size={18} />,
                lbl: "LinkedIn",
                val: "linkedin.com/in/meghavijayabalan",
                href: "https://www.linkedin.com/in/meghavijayabalan",
              },
              {
                icon: <Github size={18} />,
                lbl: "GitHub",
                val: "github.com/megharaj1997",
                href: "https://github.com/megharaj1997",
              },
            ].map((c) => (
              <div className="card contact-card" key={c.lbl}>
                <div className="icon">{c.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="lbl">{c.lbl}</div>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="val flex items-center gap-2 truncate"
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      {c.val}
                      {c.href.startsWith("http") && <ExternalLink size={12} />}
                    </a>
                  ) : (
                    <div className="val">{c.val}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={submit}
            className="card p-8 space-y-4 reveal"
            data-testid="contact-form"
          >
            <div>
              <label
                className="font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "var(--ink-soft)" }}
              >
                Your Name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ada Lovelace"
                data-testid="contact-name"
                className="mt-2"
              />
            </div>
            <div>
              <label
                className="font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "var(--ink-soft)" }}
              >
                Email Address
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ada@lovelace.dev"
                data-testid="contact-email"
                className="mt-2"
              />
            </div>
            <div>
              <label
                className="font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "var(--ink-soft)" }}
              >
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Let's build something intelligent…"
                data-testid="contact-message"
                className="mt-2"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full justify-center"
              data-testid="contact-submit"
            >
              <Send size={16} />{" "}
              {sent ? "Message drafted!" : "Send connection request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer" data-testid="site-footer">
    <div className="container-x z-content flex flex-wrap items-center justify-between gap-6">
      <div className="brand" style={{ padding: 0 }}>
        <span className="brand-dot" />
        Megha Raj V S
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/megharaj1997"
          target="_blank"
          rel="noreferrer"
          className="chip"
        >
          <Github size={12} /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/meghavijayabalan"
          target="_blank"
          rel="noreferrer"
          className="chip"
        >
          <Linkedin size={12} /> LinkedIn
        </a>
        <a href="mailto:megha042023@gmail.com" className="chip">
          <Mail size={12} /> Email
        </a>
      </div>
      <div
        className="font-mono text-xs"
        style={{ color: "var(--ink-soft)" }}
      >
        © {new Date().getFullYear()} · Built with neurons & curiosity
      </div>
    </div>
  </footer>
);

const Portfolio = () => {
  useReveal();
  return (
    <div className="relative overflow-x-hidden">
      <NeuralCanvas />
      <Nav />
      <main className="relative z-[1]">
        <Hero />
        <MarqueeStrip />
        <About />
        <Achievements />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
