import { useEffect, useRef } from "react";

/**
 * CursorTrail — A full-page canvas overlay that renders an interactive
 * particle constellation that reacts to cursor movement.
 *
 * Inspired by Google Antigravity's cursor-reactive field.
 * Uses the Aurora Studio palette: Violet (#7C3AED), Amber (#F59E0B),
 * Indigo (#4F46E5), and Rose (#EC4899).
 *
 * Renders behind interactive content via pointer-events: none.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;     // index into palette
  friction: number;
}

interface Orb {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  glowColor: string;
  speed: number;    // lerp speed
  offset: number;   // angular offset for orbit
  orbitRadius: number;
}

const PALETTE = [
  { r: 124, g: 58,  b: 237 },  // violet
  { r: 167, g: 139, b: 250 },  // light violet
  { r: 245, g: 158, b: 11  },  // amber
  { r: 251, g: 191, b: 36  },  // light amber
  { r: 79,  g: 70,  b: 229 },  // indigo
  { r: 236, g: 72,  b: 153 },  // rose
];

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let W = 0, H = 0;

    // Mouse state
    let mouseX = -9999, mouseY = -9999;
    let prevMouseX = -9999, prevMouseY = -9999;
    let mouseActive = false;

    // Particle pool
    const particles: Particle[] = [];
    const MAX_PARTICLES = 120;

    // Orbiting follower orbs (always visible, pulled toward cursor)
    const orbs: Orb[] = [
      { x: 0, y: 0, targetX: 0, targetY: 0, size: 8, color: "rgba(124,58,237,0.5)", glowColor: "rgba(124,58,237,0.2)", speed: 0.04, offset: 0, orbitRadius: 60 },
      { x: 0, y: 0, targetX: 0, targetY: 0, size: 6, color: "rgba(245,158,11,0.45)", glowColor: "rgba(245,158,11,0.15)", speed: 0.03, offset: Math.PI * 0.66, orbitRadius: 45 },
      { x: 0, y: 0, targetX: 0, targetY: 0, size: 5, color: "rgba(79,70,229,0.4)", glowColor: "rgba(79,70,229,0.15)", speed: 0.05, offset: Math.PI * 1.33, orbitRadius: 35 },
    ];

    let time = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };

    const onLeave = () => {
      mouseActive = false;
    };

    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        mouseActive = true;
      }
    };

    const onTouchEnd = () => {
      mouseActive = false;
    };

    const spawnParticle = (x: number, y: number, velScale: number) => {
      if (particles.length >= MAX_PARTICLES) {
        // Recycle oldest
        const p = particles.shift()!;
        p.x = x;
        p.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 2.5 + 0.8) * velScale;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
        p.life = 0;
        p.maxLife = Math.random() * 40 + 25;
        p.size = Math.random() * 3.5 + 1;
        p.hue = Math.floor(Math.random() * PALETTE.length);
        p.friction = 0.96 + Math.random() * 0.02;
        particles.push(p);
      } else {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 2.5 + 0.8) * velScale;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: Math.random() * 40 + 25,
          size: Math.random() * 3.5 + 1,
          hue: Math.floor(Math.random() * PALETTE.length),
          friction: 0.96 + Math.random() * 0.02,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Initialize orbs at center
    orbs.forEach(o => {
      o.x = W / 2;
      o.y = H / 2;
    });

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, W, H);

      // Calculate cursor velocity for spawn rate
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // Spawn particles on mouse movement
      if (mouseActive && speed > 2) {
        const count = Math.min(Math.floor(speed / 6) + 1, 4);
        for (let i = 0; i < count; i++) {
          const t = i / count;
          const sx = mouseX - dx * t + (Math.random() - 0.5) * 10;
          const sy = mouseY - dy * t + (Math.random() - 0.5) * 10;
          spawnParticle(sx, sy, Math.min(speed / 20, 1.5));
        }
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += 0.02; // tiny gravity
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.15
          ? progress / 0.15
          : 1 - ((progress - 0.15) / 0.85);
        const sz = p.size * (1 - progress * 0.5);
        const c = PALETTE[p.hue];

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha * 0.08})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha * 0.7})`;
        ctx.fill();
      }

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const ddx = a.x - b.x, ddy = a.y - b.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < 80) {
            const progA = a.life / a.maxLife;
            const progB = b.life / b.maxLife;
            const lineAlpha = (1 - dist / 80) * 0.18 * (1 - progA) * (1 - progB);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(124,58,237,${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Update & draw orbiting follower orbs
      if (mouseActive) {
        orbs.forEach((o, idx) => {
          // Target is an orbital position around cursor
          const angle = time * (0.8 + idx * 0.3) + o.offset;
          o.targetX = mouseX + Math.cos(angle) * o.orbitRadius;
          o.targetY = mouseY + Math.sin(angle) * o.orbitRadius;

          // Smooth lerp
          o.x += (o.targetX - o.x) * o.speed;
          o.y += (o.targetY - o.y) * o.speed;

          // Outer glow
          ctx.beginPath();
          ctx.arc(o.x, o.y, o.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = o.glowColor;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(o.x, o.y, o.size, 0, Math.PI * 2);
          ctx.fillStyle = o.color;
          ctx.fill();

          // Bright center
          ctx.beginPath();
          ctx.arc(o.x, o.y, o.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,0.6)`;
          ctx.fill();

          // Draw lines from orbs to cursor
          const toCursorDist = Math.sqrt(
            (o.x - mouseX) ** 2 + (o.y - mouseY) ** 2
          );
          if (toCursorDist < 120) {
            ctx.beginPath();
            ctx.moveTo(o.x, o.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(124,58,237,${(1 - toCursorDist / 120) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }

          // Draw lines between orbs
          orbs.forEach((other, j) => {
            if (j <= idx) return;
            const dd = Math.sqrt((o.x - other.x) ** 2 + (o.y - other.y) ** 2);
            if (dd < 150) {
              ctx.beginPath();
              ctx.moveTo(o.x, o.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(167,139,250,${(1 - dd / 150) * 0.12})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });

        // Cursor dot
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124,58,237,0.35)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 12, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124,58,237,0.06)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ mixBlendMode: "normal" }}
      aria-hidden="true"
    />
  );
}
