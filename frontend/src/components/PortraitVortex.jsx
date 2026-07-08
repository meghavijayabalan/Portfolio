import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * PortraitVortex – dense swirling green particles that orbit
 * around the portrait, evoking the vein-green energy field
 * from the reference image.
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
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const colors =
      theme === "dark"
        ? ["#22ff88", "#a3ff5c", "#00e0a0", "#d4ff8a"]
        : ["#10b981", "#22c55e", "#84cc16", "#4ade80"];

    const PARTICLE_COUNT = 260;
    const rect = () => canvas.getBoundingClientRect();
    const cx = () => rect().width / 2;
    const cy = () => rect().height / 2;

    // Each particle sits on an orbit ring around center with wobble.
    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => {
      const baseR = 120 + Math.random() * 180; // orbit radius (px)
      return {
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.6 + 0.15) * (Math.random() < 0.5 ? 1 : -1) * 0.008,
        r: baseR,
        rWobble: (Math.random() - 0.5) * 40,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.04,
        size: Math.random() * 1.8 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.5,
        life: Math.random(),
      };
    });

    let t = 0;
    const draw = () => {
      t += 0.008;
      const w = rect().width;
      const h = rect().height;
      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h / 2;

      // draw particles with additive-like blending
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.angle += p.speed;
        p.wobblePhase += p.wobbleSpeed;
        const r = p.r + Math.sin(p.wobblePhase) * p.rWobble;
        const x = centerX + Math.cos(p.angle) * r;
        // squash vertical orbit slightly to make it feel like a 3D field
        const y = centerY + Math.sin(p.angle) * r * 0.95;

        // twinkle
        p.life += 0.02;
        const twinkle = 0.6 + Math.sin(p.life) * 0.4;

        // soft glow
        const glowR = p.size * 8;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        grad.addColorStop(0, p.color + "cc");
        grad.addColorStop(0.4, p.color + "44");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.globalAlpha = p.alpha * twinkle * 0.55;
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
