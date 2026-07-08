import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * PortraitVortex – curved green swoosh trail of particles that arcs around
 * the portrait, matching the reference image's vein-green energy stream.
 */
const PortraitVortex = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : canvas.getBoundingClientRect();
      // give the canvas some breathing room so the arc extends past the portrait
      const w = rect.width * 1.16;
      const h = rect.height * 1.16;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.style.left = -(w - rect.width) / 2 + "px";
      canvas.style.top = -(h - rect.height) / 2 + "px";
      canvas.style.right = "auto";
      canvas.style.bottom = "auto";
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const isDark = theme === "dark";
    const colors = isDark
      ? ["#22c55e", "#a3e635", "#10b981", "#84cc16"]
      : ["#10b981", "#22c55e", "#16a34a", "#4ade80"];

    // Particles ride two curved arcs (top-left → right, and bottom-right → left)
    // to form a figure-8-like swoosh trail around the portrait.
    const PARTICLE_COUNT = 200;

    const rect = () => ({
      width: parseFloat(canvas.style.width) || canvas.getBoundingClientRect().width,
      height: parseFloat(canvas.style.height) || canvas.getBoundingClientRect().height,
    });
    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      // t is the position along the arc (0 → 1 → 0 loop)
      t: Math.random(),
      speed: 0.0015 + Math.random() * 0.0035,
      arc: Math.random() < 0.5 ? 0 : 1, // which of the two arcs
      radialJitter: (Math.random() - 0.5) * 20,
      size: Math.random() * 1.6 + 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.5,
      life: Math.random() * Math.PI * 2,
    }));

    /**
     * Arc paths: parametric ellipses that curve around the portrait.
     * arc 0 sweeps from upper-left to bottom-right along the outer edge;
     * arc 1 sweeps from bottom-left to upper-right on the inner side.
     */
    const positionOnArc = (t, arcIndex, w, h) => {
      const cx = w / 2;
      const cy = h / 2;
      // Ellipse radii — outside the portrait mask
      const rx = w * 0.48;
      const ry = h * 0.52;
      if (arcIndex === 0) {
        // outer arc: 210° → -30° (going clockwise around top-right side)
        const angle = Math.PI * (1.15) + t * Math.PI * 1.7;
        return {
          x: cx + Math.cos(angle) * rx,
          y: cy + Math.sin(angle) * ry,
          angle,
        };
      }
      // inner sweep near portrait bottom
      const angle = Math.PI * (0.15) + t * Math.PI * 1.7;
      return {
        x: cx + Math.cos(angle) * rx * 0.9,
        y: cy + Math.sin(angle) * ry * 0.95,
        angle,
      };
    };

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
        // add a subtle radial jitter perpendicular to the tangent for a "trail" width
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
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="portrait-vortex" aria-hidden />;
};

export default PortraitVortex;
