import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * NeuralCanvas – animated neuron network with connecting synapses.
 * Nodes drift slowly; nearby nodes are linked with fading lines.
 * Mouse acts as a gravity well that attracts and pulses nodes.
 */
const NeuralCanvas = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(dpr, dpr);

    const colors =
      theme === "dark"
        ? {
            node: "rgba(34, 255, 136, 0.9)",
            nodeGlow: "rgba(34, 255, 136, 0.28)",
            accent: "rgba(163, 255, 92, 0.9)",
            accent2: "rgba(0, 224, 160, 0.9)",
          }
        : {
            node: "rgba(16, 185, 129, 0.8)",
            nodeGlow: "rgba(16, 185, 129, 0.22)",
            accent: "rgba(132, 204, 22, 0.85)",
            accent2: "rgba(34, 197, 94, 0.85)",
          };

    const NODE_COUNT = Math.floor((width * height) / 30000);
    const nodes = Array.from({ length: NODE_COUNT }).map((_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 1.2,
      accent: i % 9 === 0 ? "a1" : i % 11 === 0 ? "a2" : "n",
      pulse: Math.random() * Math.PI * 2,
    }));

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", onResize);

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      // update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;

        // mouse attraction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 200 * 200) {
          const d = Math.sqrt(dist2) || 1;
          const force = (200 - d) / 200;
          n.vx += (dx / d) * force * 0.02;
          n.vy += (dy / d) * force * 0.02;
        }

        // dampen velocity
        n.vx *= 0.985;
        n.vy *= 0.985;

        // keep minimum drift
        if (Math.abs(n.vx) < 0.05) n.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(n.vy) < 0.05) n.vy += (Math.random() - 0.5) * 0.1;

        // bounds
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;
      }

      // draw nodes with soft glow (no connecting lines)
      for (const n of nodes) {
        const scale = 1 + Math.sin(n.pulse) * 0.25;
        const r = n.r * scale;
        const color =
          n.accent === "a1"
            ? colors.accent
            : n.accent === "a2"
              ? colors.accent2
              : colors.node;

        // glow halo
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
        grad.addColorStop(0, colors.nodeGlow);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="neural-canvas" aria-hidden />;
};

export default NeuralCanvas;
