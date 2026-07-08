document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("portrait-vortex-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    const parent = canvas.parentElement;
    const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();
    // give the canvas some breathing room so the arc extends past the portrait
    const w = rect.width * 1.16;
    const h = rect.height * 1.16;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.style.left = -(w - rect.width) / 2 + "px";
    canvas.style.top = -(h - rect.height) / 2 + "px";
    canvas.style.position = "absolute";
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  };
  resize();
  window.addEventListener("resize", resize);

  // Check if body is in light theme
  const getTheme = () => {
    return document.documentElement.classList.contains("light-theme") ? "light" : "dark";
  };

  const getColors = () => {
    const isDark = getTheme() === "dark";
    return isDark
      ? ["#22c55e", "#a3e635", "#10b981", "#84cc16"]
      : ["#10b981", "#22c55e", "#16a34a", "#4ade80"];
  };

  let colors = getColors();
  window.addEventListener("theme-changed", () => {
    colors = getColors();
    particles.forEach(p => {
      p.color = colors[Math.floor(Math.random() * colors.length)];
    });
  });

  const PARTICLE_COUNT = 200;

  const rect = () => ({
    width: parseFloat(canvas.style.width) || canvas.getBoundingClientRect().width,
    height: parseFloat(canvas.style.height) || canvas.getBoundingClientRect().height,
  });

  const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
    t: Math.random(),
    speed: 0.0015 + Math.random() * 0.0035,
    arc: Math.random() < 0.5 ? 0 : 1,
    radialJitter: (Math.random() - 0.5) * 20,
    size: Math.random() * 1.6 + 0.6,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: Math.random() * 0.5 + 0.5,
    life: Math.random() * Math.PI * 2,
  }));

  const positionOnArc = (t, arcIndex, w, h) => {
    const cx = w / 2;
    const cy = h / 2;
    const rx = w * 0.48;
    const ry = h * 0.52;
    if (arcIndex === 0) {
      const angle = Math.PI * 1.15 + t * Math.PI * 1.7;
      return {
        x: cx + Math.cos(angle) * rx,
        y: cy + Math.sin(angle) * ry,
        angle,
      };
    }
    const angle = Math.PI * 0.15 + t * Math.PI * 1.7;
    return {
      x: cx + Math.cos(angle) * rx * 0.9,
      y: cy + Math.sin(angle) * ry * 0.95,
      angle,
    };
  };

  let rafId = null;
  const draw = () => {
    const w = rect().width;
    const h = rect().height;
    ctx.clearRect(0, 0, w, h);

    ctx.globalCompositeOperation = "lighter";

    for (const p of particles) {
      p.t += p.speed;
      if (p.t > 1) p.t = 0;
      p.life += 0.05;

      const { x: bx, y: by, angle } = positionOnArc(p.t, p.arc, w, h);
      const nx = Math.cos(angle + Math.PI / 2);
      const ny = Math.sin(angle + Math.PI / 2);
      const x = bx + nx * p.radialJitter;
      const y = by + ny * p.radialJitter;

      const twinkle = 0.55 + Math.sin(p.life) * 0.45;

      // soft glow
      const glowR = p.size * 9;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
      grad.addColorStop(0, p.color + "cc");
      grad.addColorStop(0.4, p.color + "44");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.globalAlpha = p.alpha * twinkle * 0.5;
      ctx.beginPath();
      ctx.arc(x, y, glowR, 0, Math.PI * 2);
      ctx.fill();

      // core
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha * twinkle;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    rafId = requestAnimationFrame(draw);
  };
  draw();

  window.addEventListener("unload", () => {
    if (rafId) cancelAnimationFrame(rafId);
  });
});
