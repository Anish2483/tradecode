import { useEffect, useRef, useCallback } from "react";

/**
 * CursorTrail — Morphing particle field that reacts to cursor movement.
 *
 * Inspired by Google Antigravity's particle physics system.
 * Particles form a floating grid, gently drift, and are repelled by the cursor.
 * When the cursor moves fast, particles scatter dramatically then regroup.
 * Uses Aurora Studio palette: Violet, Amber, Indigo, Rose.
 */

interface Particle {
  // current position
  x: number;
  y: number;
  // home position (where particle wants to return to)
  homeX: number;
  homeY: number;
  // velocity
  vx: number;
  vy: number;
  // visual properties
  size: number;
  baseSize: number;
  colorIdx: number;
  opacity: number;
  // physics
  friction: number;
  returnForce: number;
  // animation phase
  phase: number;
  phaseSpeed: number;
  // float drift
  driftX: number;
  driftY: number;
  driftPhase: number;
  driftSpeed: number;
}

const COLORS = [
  [124, 58, 237],   // violet
  [167, 139, 250],  // light violet
  [79, 70, 229],    // indigo
  [245, 158, 11],   // amber
  [251, 191, 36],   // light amber
  [236, 72, 153],   // rose
  [99, 102, 241],   // indigo-400
];

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const dimRef = useRef({ w: 0, h: 0 });

  const createParticles = useCallback((W: number, H: number) => {
    const particles: Particle[] = [];
    // Grid-based particle placement with jitter for organic feel
    const spacing = 55;
    const cols = Math.ceil(W / spacing) + 2;
    const rows = Math.ceil(H / spacing) + 2;
    const offsetX = (W - (cols - 1) * spacing) / 2;
    const offsetY = (H - (rows - 1) * spacing) / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * spacing + (Math.random() - 0.5) * 20;
        const y = offsetY + row * spacing + (Math.random() - 0.5) * 20;
        const baseSize = Math.random() * 2.2 + 0.8;

        particles.push({
          x, y,
          homeX: x,
          homeY: y,
          vx: 0, vy: 0,
          size: baseSize,
          baseSize,
          colorIdx: Math.floor(Math.random() * COLORS.length),
          opacity: Math.random() * 0.4 + 0.15,
          friction: 0.92 + Math.random() * 0.04,
          returnForce: 0.008 + Math.random() * 0.012,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.005 + Math.random() * 0.015,
          driftX: (Math.random() - 0.5) * 8,
          driftY: (Math.random() - 0.5) * 8,
          driftPhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.003 + Math.random() * 0.007,
        });
      }
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimRef.current = { w: W, h: H };
      particlesRef.current = createParticles(W, H);
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => { mouseRef.current.active = false; };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };
    const onTouchEnd = () => { mouseRef.current.active = false; };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const CURSOR_RADIUS = 140;
    const CURSOR_FORCE = 8;

    const draw = () => {
      const { w: W, h: H } = dimRef.current;
      const t = timeRef.current += 0.016;
      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, W, H);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Floating drift animation
        const driftX = Math.sin(t * p.driftSpeed * 2 + p.driftPhase) * p.driftX;
        const driftY = Math.cos(t * p.driftSpeed * 2 + p.driftPhase + 1.3) * p.driftY;
        const targetX = p.homeX + driftX;
        const targetY = p.homeY + driftY;

        // Return-to-home spring force
        p.vx += (targetX - p.x) * p.returnForce;
        p.vy += (targetY - p.y) * p.returnForce;

        // Cursor repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS && dist > 0.1) {
            const force = (1 - dist / CURSOR_RADIUS) * CURSOR_FORCE;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        // Apply friction
        p.vx *= p.friction;
        p.vy *= p.friction;

        // Integrate
        p.x += p.vx;
        p.y += p.vy;

        // Pulsing size
        const pulse = Math.sin(t * p.phaseSpeed * 10 + p.phase);
        p.size = p.baseSize * (0.8 + pulse * 0.3);

        // Distance from home affects opacity (brighter when displaced)
        const homeDist = Math.sqrt((p.x - targetX) ** 2 + (p.y - targetY) ** 2);
        const displacedBoost = Math.min(homeDist / 50, 1) * 0.5;
        const alpha = (p.opacity + displacedBoost) * (0.7 + pulse * 0.3);

        const c = COLORS[p.colorIdx];

        // Glow halo
        if (p.size > 1.2 || homeDist > 15) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha * 0.06})`;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
        ctx.fill();
      }

      // Draw constellation lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        // Only check neighbors in a limited radius to keep perf
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          // Quick distance check (skip sqrt for far pairs)
          if (Math.abs(dx) > 65 || Math.abs(dy) > 65) continue;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            const lineAlpha = (1 - dist / 60) * 0.06;
            // Use average color
            const cA = COLORS[a.colorIdx];
            const cB = COLORS[b.colorIdx];
            const r = (cA[0] + cB[0]) >> 1;
            const g = (cA[1] + cB[1]) >> 1;
            const bv = (cA[2] + cB[2]) >> 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${r},${g},${bv},${lineAlpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Draw cursor glow when active
      if (mouse.active) {
        // Outer aura
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, CURSOR_RADIUS
        );
        gradient.addColorStop(0, "rgba(124,58,237,0.04)");
        gradient.addColorStop(0.5, "rgba(167,139,250,0.02)");
        gradient.addColorStop(1, "rgba(124,58,237,0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, CURSOR_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(124,58,237,0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124,58,237,0.25)";
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(animRef.current);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  );
}
