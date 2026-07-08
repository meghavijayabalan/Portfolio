import { useEffect, useMemo, useRef, useState } from "react";
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
  Users,
  FlaskConical,
  Package,
  TrendingUp,
  CalendarDays,
  Bot,
  FileText,
  Trophy,
  MessageCircle,
} from "lucide-react";
import PortraitVortex from "@/components/PortraitVortex";
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
  certifications,
  techLogos,
  heroStats,
  heroCategories,
} from "@/data/portfolio";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
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

const iconForCategory = (id, size = 24) => {
  const map = {
    brain: <BrainCircuit size={size} />,
    chart: <BarChart3 size={size} />,
    cloud: <Cloud size={size} />,
    bot: <Bot size={size} />,
  };
  return map[id] || <Sparkles size={size} />;
};

const iconForStat = (id, size = 18) => {
  const map = {
    calendar: <CalendarDays size={size} />,
    users: <Users size={size} />,
    flask: <FlaskConical size={size} />,
    package: <Package size={size} />,
    trending: <TrendingUp size={size} />,
  };
  return map[id] || <Sparkles size={size} />;
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
        <span>Megha Raj V S</span>
        <span className="brand-dot" />
      </div>

      <div className={`nav-links ${open ? "open" : ""}`}>
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

      <div className="flex items-center gap-3">
        <button
          className={`theme-switch ${theme === "dark" ? "is-dark" : "is-light"}`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          data-testid="theme-toggle"
        >
          <span className="thumb">
            {theme === "dark" ? <Moon size={13} /> : <Sun size={13} />}
          </span>
        </button>
        <button
          className="mobile-menu-btn"
          onClick={() => setOpen((s) => !s)}
          aria-label="Menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="hero" data-testid="section-home">
    <div className="container-x z-content w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <span className="eyebrow" data-testid="hero-eyebrow">
            <Sparkles size={12} /> Data Scientist | AI Developer
          </span>

          <h1 className="hero-title" data-testid="hero-title">
            I turn data into <span className="accent">intelligence.</span>
            <br />
            I turn ideas into <span className="accent">impact.</span>
          </h1>

          <p className="hero-desc">
            Building intelligent AI agents, analytics platforms and cloud data
            pipelines that solve real-world problems and drive measurable
            business value.
          </p>

          <div className="cat-row">
            {heroCategories.map((c) => (
              <div key={c.title} className="cat-item">
                <div className="cat-circle">{iconForCategory(c.icon, 22)}</div>
                <div className="cat-label">{c.title}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href="#projects"
              className="btn-solid"
              data-testid="cta-view-work"
            >
              View My Work <ArrowRight size={16} />
            </a>
            <a
              href="/cv.pdf"
              download
              className="btn-outline"
              data-testid="cta-download-cv"
            >
              Download CV <Download size={16} />
            </a>
          </div>

          <div className="social-row">
            <span className="social-label">Connect with me</span>
            <a
              href="https://www.linkedin.com/in/meghavijayabalan"
              target="_blank"
              rel="noreferrer"
              className="social-circle"
              data-testid="social-linkedin"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://github.com/megharaj1997"
              target="_blank"
              rel="noreferrer"
              className="social-circle"
              data-testid="social-github"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="mailto:megha042023@gmail.com"
              className="social-circle"
              data-testid="social-email"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://wa.me/917025654877?text=Hi%20Megha%2C%20I%20saw%20your%20portfolio"
              target="_blank"
              rel="noreferrer"
              className="social-circle"
              data-testid="social-whatsapp"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="/cv.pdf"
              download
              className="social-circle"
              data-testid="social-cv"
              aria-label="Resume"
            >
              <FileText size={16} />
            </a>
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: "0.1s" }}>
          <div className="portrait-stage" data-testid="hero-portrait">
            <div className="portrait-halo" />
            <div className="portrait-frame">
              <div className="inner">
                <img src="/images/profile-nobg.png" alt="Megha Raj V S" />
              </div>
            </div>
            <PortraitVortex />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="hero-stats reveal" data-testid="hero-stats">
        {heroStats.map((s) => (
          <div key={s.n + s.l2} className="hero-stat">
            <div className="stat-icon">{iconForStat(s.icon)}</div>
            <div className="stat-body">
              <div className="stat-num">{s.n}</div>
              <div className="stat-l1">{s.l1}</div>
              <div className="stat-l2">{s.l2}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tech logos */}
      <div className="tech-strip reveal">
        <div className="title">Technologies I Work With</div>
        <div className="logos">
          {techLogos.map((t) => (
            <span key={t.name} className="tech-logo">
              <img
                src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
                alt={t.name}
                loading="lazy"
              />
              {t.name}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <div className="mouse" />
        <span>Scroll to explore</span>
      </div>
    </div>
  </section>
);

const About = () => {
  const tiltRef = useRef(null);
  const sceneRef = useRef(null);

  const onMove = (e) => {
    const el = tiltRef.current;
    const scene = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = -y * 14;
    const rotY = x * 18;
    el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(20px)`;
    // Parallax the floating orbs / badges the opposite way for depth
    if (scene) {
      const orbs = scene.querySelectorAll(".about-orb, .about-badge");
      orbs.forEach((o, i) => {
        const depth = 20 + (i % 4) * 10;
        o.style.transform = `translate3d(${-x * depth}px, ${-y * depth}px, 0)`;
      });
    }
  };
  const onLeave = () => {
    if (tiltRef.current)
      tiltRef.current.style.transform =
        "rotateX(0deg) rotateY(0deg) translateZ(0)";
    if (sceneRef.current) {
      sceneRef.current
        .querySelectorAll(".about-orb, .about-badge")
        .forEach((o) => (o.style.transform = ""));
    }
  };

  return (
    <section id="about" className="section" data-testid="section-about">
      <div className="grid-bg" />
      <div className="container-x z-content grid md:grid-cols-2 gap-16 items-center">
        <div className="reveal about-3d">
          <div
            ref={sceneRef}
            className="about-scene"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <div
              ref={tiltRef}
              className="tilt-target"
              data-testid="about-3d-image"
            >
              <img src="/images/about.jpg" alt="Megha Raj V S at work" />
              <div className="tilt-shine" />
            </div>
            <span className="about-orb o1" />
            <span className="about-orb o2" />
            <span className="about-orb o3" />
            <span className="about-orb o4" />
            <div className="about-badge b-top">
              <span className="dot" />
              <div>
                <div
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: "var(--ink-soft)" }}
                >
                  Now
                </div>
                <div className="font-semibold text-sm">
                  Shipping LLM agents
                </div>
              </div>
            </div>
            <div className="about-badge b-bot">
              <BrainCircuit size={16} style={{ color: "var(--neuron-1)" }} />
              <div>
                <div
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: "var(--ink-soft)" }}
                >
                  Focus
                </div>
                <div className="font-semibold text-sm">
                  Deep Learning · CV
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal">
          <span className="eyebrow">
            <BrainCircuit size={12} /> About Me
          </span>
          <h2 className="section-title">
            Where Data Meets <em>Intelligence.</em>
          </h2>
          <p
            className="mt-6 text-lg leading-relaxed font-medium"
            style={{ color: "var(--ink)" }}
          >
            Every dataset tells a story. Every model should solve a real
            problem.
          </p>
          <p
            className="mt-5 text-base leading-relaxed"
            style={{ color: "var(--ink-muted)" }}
          >
            I specialize in building AI systems that move beyond experimentation
            into real-world impact. My expertise combines data engineering,
            machine learning, LLM applications, analytics, and computer vision
            to develop solutions that are accurate, scalable, and practical.
          </p>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "var(--ink-muted)" }}
          >
            From automating enterprise workflows to designing deep learning
            architectures, my focus has always remained the same — building
            technology that creates measurable value.
          </p>
          <p
            className="mt-6 text-base leading-relaxed"
            style={{ color: "var(--ink)", fontWeight: 500 }}
          >
            For me, AI isn&apos;t about replacing people.
          </p>
          <p
            className="mt-1 text-base leading-relaxed"
            style={{ color: "var(--neuron-1)", fontWeight: 500 }}
          >
            It&apos;s about empowering better decisions, faster innovation, and
            meaningful outcomes.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#contact" className="btn-solid">
              Hire me <Send size={16} />
            </a>
            <a href="#experience" className="btn-outline">
              Read journey <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

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
        {achievements.map((a) => (
          <div key={a.slice(0, 40)} className="card achievement reveal">
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
        key={`${it.role}-${it.when}`}
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
          {it.bullets.map((b) => (
            <li key={b.slice(0, 50)}>{b}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const Experience = () => {
  const [tab, setTab] = useState("exp");
  return (
    <section id="experience" className="section" data-testid="section-experience">
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
              className={tab === t.id ? "btn-solid" : "btn-outline"}
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

const Certificates = () => (
  <section id="certificates" className="section" data-testid="section-certificates">
    <div className="container-x z-content">
      <div className="reveal text-center max-w-2xl mx-auto">
        <span className="eyebrow">
          <Trophy size={12} /> Credentials
        </span>
        <h2 className="section-title">
          Certificates & <em>Recognitions</em>
        </h2>
        <p className="mt-4 text-base" style={{ color: "var(--ink-muted)" }}>
          Professional certifications, bootcamps, publications, and academic
          achievements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {certifications.map((c) => (
          <div key={c.title} className="card p-6 reveal">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "color-mix(in srgb, var(--neuron-1) 12%, transparent)",
                  color: "var(--neuron-1)",
                }}
              >
                <Award size={20} />
              </div>
              <span className="chip">{c.tag}</span>
            </div>
            <h4
              className="font-display text-lg mb-2"
              style={{ color: "var(--ink)", lineHeight: 1.25 }}
            >
              {c.title}
            </h4>
            <div
              className="text-sm"
              style={{ color: "var(--ink-muted)" }}
            >
              {c.issuer}
            </div>
            <div
              className="font-mono text-xs mt-3"
              style={{ color: "var(--neuron-1)" }}
            >
              {c.year}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

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
                icon: <MessageCircle size={18} />,
                lbl: "WhatsApp",
                val: "Chat on WhatsApp",
                href: "https://wa.me/917025654877?text=Hi%20Megha%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect.",
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
              className="btn-solid w-full justify-center"
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
        <span>Megha Raj V S</span>
        <span className="brand-dot" />
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

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/917025654877?text=Hi%20Megha%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect."
    target="_blank"
    rel="noreferrer"
    className="floating-wa"
    data-testid="floating-whatsapp"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={22} />
    <span className="floating-wa-label">Message me</span>
  </a>
);

const Portfolio = () => {
  useReveal();
  return (
    <div className="relative overflow-x-hidden">
      <NeuralCanvas />
      <Nav />
      <main className="relative z-[1]">
        <Hero />
        <About />
        <Achievements />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Portfolio;
