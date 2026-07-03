(function() {
  const canvas = document.getElementById('neuron-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId = null;

  // Track dynamic colors from CSS variables
  let signalColor = '#10B981';
  let emberColor = '#34D399';

  function updateThemeColors() {
    const rootStyle = getComputedStyle(document.documentElement);
    signalColor = rootStyle.getPropertyValue('--signal').trim() || '#10B981';
    emberColor = rootStyle.getPropertyValue('--ember').trim() || '#34D399';
  }

  // State configurations
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let nodes = [];
  let pulses = [];
  const maxNodes = Math.min(80, Math.floor((width * height) / 18000));
  const connectionDist = 130;
  const repulsionDist = 160;
  const repulsionForce = 0.45;
  const nodeSpeed = 0.35;
  
  const mouse = { x: null, y: null };

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Handle window resizing
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNodes();
  });

  // Helper function to convert hex to RGBA
  function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * nodeSpeed;
      this.vy = (Math.random() - 0.5) * nodeSpeed;
      this.baseRadius = Math.random() * 2 + 1.5;
      this.radius = this.baseRadius;
      // Unique offset key for curving connections (dendrites)
      this.curveKey = Math.random() * 100;
    }

    update() {
      // Gentle drift
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repulsionDist) {
          const force = (repulsionDist - dist) / repulsionDist;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * repulsionForce * 5;
          this.y += Math.sin(angle) * force * repulsionForce * 5;
          this.radius = this.baseRadius + force * 2;
        } else {
          this.radius = this.baseRadius;
        }
      } else {
        this.radius = this.baseRadius;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(signalColor, 0.6);
      ctx.fill();
    }
  }

  class SynapsePulse {
    constructor(startNode, endNode, curveOffset) {
      this.start = startNode;
      this.end = endNode;
      this.curveOffset = curveOffset;
      this.progress = 0; // 0 to 1
      this.speed = Math.random() * 0.012 + 0.008;
    }

    update() {
      this.progress += this.speed;
      return this.progress >= 1;
    }

    draw() {
      // Calculate position along the quadratic bezier curve
      const t = this.progress;
      const x0 = this.start.x;
      const y0 = this.start.y;
      const x2 = this.end.x;
      const y2 = this.end.y;
      
      const midX = (x0 + x2) / 2;
      const midY = (y0 + y2) / 2;
      const dx = x0 - x2;
      const dy = y0 - y2;
      const len = Math.sqrt(dx*dx + dy*dy);
      const perpX = -dy / len;
      const perpY = dx / len;
      
      const x1 = midX + perpX * this.curveOffset;
      const y1 = midY + perpY * this.curveOffset;

      // Quadratic Bezier interpolation
      const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2;
      const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * y1 + t * t * y2;

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = emberColor;
      ctx.shadowBlur = 8;
      ctx.shadowColor = emberColor;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow
    }
  }

  function initNodes() {
    nodes = [];
    pulses = [];
    const count = Math.min(maxNodes, Math.floor((width * height) / 18000));
    for (let i = 0; i < count; i++) {
      nodes.push(new Node());
    }
  }

  // Check and fire a synapse pulse between close nodes
  function triggerPulseChance() {
    if (pulses.length >= 6 || Math.random() > 0.02) return;

    // Pick a random start node
    const startIdx = Math.floor(Math.random() * nodes.length);
    const startNode = nodes[startIdx];
    
    // Find close neighbors
    const neighbors = [];
    for (let i = 0; i < nodes.length; i++) {
      if (i === startIdx) continue;
      const dx = startNode.x - nodes[i].x;
      const dy = startNode.y - nodes[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connectionDist) {
        // Calculate curve offset based on deterministic formula
        const offset = Math.sin((startNode.curveKey + nodes[i].curveKey)) * 10;
        neighbors.push({ node: nodes[i], offset: offset });
      }
    }

    // Fire pulse to a random neighbor
    if (neighbors.length > 0) {
      const selection = neighbors[Math.floor(Math.random() * neighbors.length)];
      pulses.push(new SynapsePulse(startNode, selection.node, selection.offset));
    }
  }

  function loop() {
    // Dynamic updates for dark/light themes
    updateThemeColors();
    
    ctx.clearRect(0, 0, width, height);

    // Update & draw nodes
    nodes.forEach(node => {
      node.update();
      node.draw();
    });

    // Draw connection lines - styled as curved dendritic branches
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = (1 - (dist / connectionDist)) * 0.18;
          
          // Draw curved (dendritic) line using quadratic bezier
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          
          // Compute control point perpendicular to line
          const midX = (nodes[i].x + nodes[j].x) / 2;
          const midY = (nodes[i].y + nodes[j].y) / 2;
          const len = dist;
          const perpX = -dy / len;
          const perpY = dx / len;
          
          // Curve offset using a stable sine wave to avoid jittering
          const curveOffset = Math.sin((nodes[i].curveKey + nodes[j].curveKey)) * 10;
          ctx.quadraticCurveTo(midX + perpX * curveOffset, midY + perpY * curveOffset, nodes[j].x, nodes[j].y);
          
          ctx.strokeStyle = hexToRgba(signalColor, alpha);
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Occasionally draw a tiny sub-branch from the mid-point to mimic plant veins / dendrites
          if (dist > 80 && (i + j) % 7 === 0) {
            ctx.beginPath();
            const bx = midX + perpX * curveOffset;
            const by = midY + perpY * curveOffset;
            ctx.moveTo(bx, by);
            // Branch off slightly
            ctx.lineTo(bx + perpX * 12, by + perpY * 6);
            ctx.strokeStyle = hexToRgba(signalColor, alpha * 0.5);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // Update & draw pulses
    triggerPulseChance();
    pulses = pulses.filter(pulse => {
      const completed = pulse.update();
      pulse.draw();
      return !completed;
    });

    animationId = requestAnimationFrame(loop);
  }

  // Draw static frame for reduced motion users
  function drawStaticFrame() {
    updateThemeColors();
    ctx.clearRect(0, 0, width, height);
    
    // Draw curved lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = (1 - (dist / connectionDist)) * 0.12;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          
          const midX = (nodes[i].x + nodes[j].x) / 2;
          const midY = (nodes[i].y + nodes[j].y) / 2;
          const perpX = -dy / dist;
          const perpY = dx / dist;
          const curveOffset = Math.sin((nodes[i].curveKey + nodes[j].curveKey)) * 10;
          ctx.quadraticCurveTo(midX + perpX * curveOffset, midY + perpY * curveOffset, nodes[j].x, nodes[j].y);
          
          ctx.strokeStyle = hexToRgba(signalColor, alpha);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(signalColor, 0.4);
      ctx.fill();
    });
  }

  function handleMotionPreference() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    initNodes();
    
    if (prefersReducedMotion.matches) {
      drawStaticFrame();
    } else {
      loop();
    }
  }

  // Initialize
  handleMotionPreference();

  // Listen to preference changes
  prefersReducedMotion.addEventListener('change', handleMotionPreference);

  // Expose function to redraw frame on theme toggle for static rendering
  window.addEventListener('theme-changed', () => {
    if (prefersReducedMotion.matches) {
      drawStaticFrame();
    }
  });

})();
