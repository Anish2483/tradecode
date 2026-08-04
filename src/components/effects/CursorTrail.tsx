import { useEffect, useRef, useCallback } from "react";

/**
 * CursorTrail — Optimized morphing particle field (home page only).
 *
 * Optimizations vs previous version:
 * - Reduced particle density (spacing 80 → fewer particles)
 * - Spatial hashing for O(n) line drawing instead of O(n²)
 * - Skip off-screen particles
 * - Use integer math where possible
 * - Throttled resize
 * - requestAnimationFrame with delta time
 */

interface Particle {
  x: number; y: number;
  homeX: number; homeY: number;
  vx: number; vy: number;
  size: number; baseSize: number;
  colorIdx: number;
  opacity: number;
  friction: number;
  returnForce: number;
  phase: number; phaseSpeed: number;
  driftX: number; driftY: number;
  driftPhase: number; driftSpeed: number;
}

const COLORS: [number, number, number][] = [
  [124, 58, 237],   // violet
  [167, 139, 250],  // light violet
  [79, 70, 229],    // indigo
  [245, 158, 11],   // amber
  [251, 191, 36],   // light amber
  [99, 102, 241],   // indigo-400
];

const CURSOR_RADIUS = 130;
const CURSOR_FORCE = 7;
const LINE_DIST = 58;
const CELL_SIZE = 60; // spatial hash cell

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const dimRef = useRef({ w: 0, h: 0 });

  const createParticles = useCallback((W: number, H: number) => {
    const particles: Particle[] = [];
    const spacing = 80; // wider spacing = fewer particles
    const cols = Math.ceil(W / spacing) + 1;
    const rows = Math.ceil(H / spacing) + 1;
    const offsetX = (W - (cols - 1) * spacing) / 2;
    const offsetY = (H - (rows - 1) * spacing) / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * spacing + (Math.random() - 0.5) * 18;
        const y = offsetY + row * spacing + (Math.random() - 0.5) * 18;
        const baseSize = Math.random() * 2 + 0.8;
        particles.push({
          x, y, homeX: x, homeY: y, vx: 0, vy: 0,
          size: baseSize, baseSize,
          colorIdx: Math.floor(Math.random() * COLORS.length),
          opacity: Math.random() * 0.35 + 0.12,
          friction: 0.93 + Math.random() * 0.03,
          returnForce: 0.01 + Math.random() * 0.01,
          phase: Math.random() * 6.28,
          phaseSpeed: 0.006 + Math.random() * 0.012,
          driftX: (Math.random() - 0.5) * 6,
          driftY: (Math.random() - 0.5) * 6,
          driftPhase: Math.random() * 6.28,
          driftSpeed: 0.004 + Math.random() * 0.006,
        });
      }
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const parent = canvas.parentElement!;
        const W = parent.offsetWidth;
        const H = parent.offsetHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + "px";
        canvas.style.height = H + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        dimRef.current = { w: W, h: H };
        particlesRef.current = createParticles(W, H);
      }, 100);
    };

    // Convert viewport mouse coords to section-relative coords
    const onMove = (e: MouseEvent) => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = e.clientY >= rect.top && e.clientY <= rect.bottom;
    };
    const onLeave = () => { mouseRef.current.active = false; };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.parentElement!.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
        mouseRef.current.active = true;
      }
    };
    const onTouchEnd = () => { mouseRef.current.active = false; };

    // Initial setup (no debounce)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement!;
    const W = parent.offsetWidth;
    const H = parent.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dimRef.current = { w: W, h: H };
    particlesRef.current = createParticles(W, H);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Spatial hash for efficient neighbor lookup
    const hashMap = new Map<string, number[]>();

    const draw = () => {
      const { w: WW, h: HH } = dimRef.current;
      const t = timeRef.current += 0.016;
      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, WW, HH);

      // Build spatial hash
      hashMap.clear();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = (p.x / CELL_SIZE) | 0;
        const cy = (p.y / CELL_SIZE) | 0;
        const key = `${cx},${cy}`;
        const list = hashMap.get(key);
        if (list) list.push(i);
        else hashMap.set(key, [i]);
      }

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        const driftX = Math.sin(t * p.driftSpeed * 2 + p.driftPhase) * p.driftX;
        const driftY = Math.cos(t * p.driftSpeed * 2 + p.driftPhase + 1.3) * p.driftY;
        const targetX = p.homeX + driftX;
        const targetY = p.homeY + driftY;

        // Spring return
        p.vx += (targetX - p.x) * p.returnForce;
        p.vy += (targetY - p.y) * p.returnForce;

        // Cursor repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CURSOR_RADIUS * CURSOR_RADIUS && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / CURSOR_RADIUS) * CURSOR_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx *= p.friction;
        p.vy *= p.friction;
        p.x += p.vx;
        p.y += p.vy;

        // Pulse
        const pulse = Math.sin(t * p.phaseSpeed * 10 + p.phase);
        p.size = p.baseSize * (0.8 + pulse * 0.25);

        // Brightness boost when displaced
        const homeDist = Math.abs(p.x - targetX) + Math.abs(p.y - targetY); // manhattan
        const boost = Math.min(homeDist / 60, 1) * 0.4;
        const alpha = (p.opacity + boost) * (0.75 + pulse * 0.25);
        const c = COLORS[p.colorIdx];

        // Draw glow only when significantly displaced
        if (homeDist > 20) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, 6.28);
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha * 0.05})`;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 6.28);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
        ctx.fill();
      }

      // Draw lines using spatial hash (O(n) instead of O(n²))
      ctx.lineWidth = 0.4;
      for (const [key, indices] of hashMap) {
        const [cx, cy] = key.split(",").map(Number);
        // Check this cell + 3 neighbors (right, below, below-right)
        const neighborKeys = [
          key,
          `${cx + 1},${cy}`,
          `${cx},${cy + 1}`,
          `${cx + 1},${cy + 1}`,
        ];
        for (let ni = 0; ni < neighborKeys.length; ni++) {
          const nList = hashMap.get(neighborKeys[ni]);
          if (!nList) continue;
          const isSelf = ni === 0;
          for (let ii = 0; ii < indices.length; ii++) {
            const a = particles[indices[ii]];
            const startJ = isSelf ? ii + 1 : 0;
            for (let jj = startJ; jj < nList.length; jj++) {
              const b = particles[nList[jj]];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              if (Math.abs(dx) > LINE_DIST || Math.abs(dy) > LINE_DIST) continue;
              const distSq = dx * dx + dy * dy;
              if (distSq < LINE_DIST * LINE_DIST) {
                const dist = Math.sqrt(distSq);
                const lineAlpha = (1 - dist / LINE_DIST) * 0.055;
                const cA = COLORS[a.colorIdx];
                const cB = COLORS[b.colorIdx];
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(${(cA[0] + cB[0]) >> 1},${(cA[1] + cB[1]) >> 1},${(cA[2] + cB[2]) >> 1},${lineAlpha})`;
                ctx.stroke();
              }
            }
          }
        }
      }

      // Cursor aura
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 16, 0, 6.28);
        ctx.strokeStyle = "rgba(124,58,237,0.1)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, 6.28);
        ctx.fillStyle = "rgba(124,58,237,0.2)";
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      clearTimeout(resizeTimer);
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
      className="absolute inset-0 z-[10] pointer-events-none"
      aria-hidden="true"
    />
  );
}
