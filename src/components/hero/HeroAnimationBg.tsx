import { useEffect, useRef } from "react";

// ── Tradecode isometric cube wireframe geometry ──────────────────────────────
function buildCubeLines(cx: number, cy: number, r: number) {
  const s = Math.sin(Math.PI / 3); // 0.866
  const c = Math.cos(Math.PI / 3); // 0.5

  // Flat-top hexagon — 6 outer vertices
  const V = [
    { x: cx,       y: cy - r         }, // V0 top
    { x: cx + r*s, y: cy - r*c       }, // V1 top-right
    { x: cx + r*s, y: cy + r*c       }, // V2 bottom-right
    { x: cx,       y: cy + r         }, // V3 bottom
    { x: cx - r*s, y: cy + r*c       }, // V4 bottom-left
    { x: cx - r*s, y: cy - r*c       }, // V5 top-left
  ];
  const C = { x: cx, y: cy }; // center

  // Mid hexagon at 55%
  const rm = r * 0.55;
  const M = [
    { x: cx,        y: cy - rm        },
    { x: cx + rm*s, y: cy - rm*c      },
    { x: cx + rm*s, y: cy + rm*c      },
    { x: cx,        y: cy + rm        },
    { x: cx - rm*s, y: cy + rm*c      },
    { x: cx - rm*s, y: cy - rm*c      },
  ];

  // Inner hexagon at 27%
  const ri = r * 0.27;
  const I = [
    { x: cx,        y: cy - ri        },
    { x: cx + ri*s, y: cy - ri*c      },
    { x: cx + ri*s, y: cy + ri*c      },
    { x: cx,        y: cy + ri        },
    { x: cx - ri*s, y: cy + ri*c      },
    { x: cx - ri*s, y: cy - ri*c      },
  ];

  return [
    // — Group 0: outer hexagon (6 edges)
    { a: V[0], b: V[1], grp: 0 },
    { a: V[1], b: V[2], grp: 0 },
    { a: V[2], b: V[3], grp: 0 },
    { a: V[3], b: V[4], grp: 0 },
    { a: V[4], b: V[5], grp: 0 },
    { a: V[5], b: V[0], grp: 0 },
    // — Group 1: outer → center "Y" (3 cube face edges)
    { a: V[0], b: C,    grp: 1 },
    { a: V[2], b: C,    grp: 1 },
    { a: V[4], b: C,    grp: 1 },
    // — Group 2: outer → mid connections
    { a: V[0], b: M[0], grp: 2 },
    { a: V[1], b: M[1], grp: 2 },
    { a: V[2], b: M[2], grp: 2 },
    { a: V[3], b: M[3], grp: 2 },
    { a: V[4], b: M[4], grp: 2 },
    { a: V[5], b: M[5], grp: 2 },
    // — Group 3: mid hexagon
    { a: M[0], b: M[1], grp: 3 },
    { a: M[1], b: M[2], grp: 3 },
    { a: M[2], b: M[3], grp: 3 },
    { a: M[3], b: M[4], grp: 3 },
    { a: M[4], b: M[5], grp: 3 },
    { a: M[5], b: M[0], grp: 3 },
    // — Group 4: inner hexagon
    { a: I[0], b: I[1], grp: 4 },
    { a: I[1], b: I[2], grp: 4 },
    { a: I[2], b: I[3], grp: 4 },
    { a: I[3], b: I[4], grp: 4 },
    { a: I[4], b: I[5], grp: 4 },
    { a: I[5], b: I[0], grp: 4 },
    // — Group 5: inner "Y"
    { a: I[0], b: C,    grp: 5 },
    { a: I[2], b: C,    grp: 5 },
    { a: I[4], b: C,    grp: 5 },
    // — Group 6: mid → inner connections
    { a: M[0], b: I[0], grp: 6 },
    { a: M[1], b: I[1], grp: 6 },
    { a: M[2], b: I[2], grp: 6 },
    { a: M[3], b: I[3], grp: 6 },
    { a: M[4], b: I[4], grp: 6 },
    { a: M[5], b: I[5], grp: 6 },
  ];
}

// ── Main animated background component ───────────────────────────────────────
export function HeroAnimationBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", resize);

    // ── Particles ─────────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 130;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:      Math.random() * W,
      y:      Math.random() * H,
      vx:     (Math.random() - 0.5) * 0.25,
      vy:     (Math.random() - 0.5) * 0.25,
      size:   0.4 + Math.random() * 1.4,
      alpha:  0.25 + Math.random() * 0.65,
      hue:    [260, 280, 240, 210, 200][Math.floor(Math.random() * 5)],
      phase:  Math.random() * Math.PI * 2,
      speed:  0.018 + Math.random() * 0.032,
    }));

    // ── Shooting stars ─────────────────────────────────────────────────────────
    const MAX_STARS = 4;
    interface SStar {
      x: number; y: number; vx: number; vy: number;
      trail: {x:number;y:number}[];
      alpha: number; hue: number; active: boolean;
      timer: number; next: number;
    }
    const sstars: SStar[] = Array.from({ length: MAX_STARS }, () => ({
      x:0, y:0, vx:0, vy:0, trail:[], alpha:0, hue:270,
      active:false, timer:0, next: Math.random() * 120 + 60,
    }));

    // ── Cube state ─────────────────────────────────────────────────────────────
    // Draw duration: 280 frames (~4.7s at 60fps), then hold
    const DRAW_FRAMES = 280;
    let drawProgress = 0;
    let fullyDrawn   = false;

    // ── Aurora waves ───────────────────────────────────────────────────────────
    const waves = [
      { ry: 0.22, amp: 0.07, spd: 0.00018, hue: 262, phase: 0.0, alpha: 0.055 },
      { ry: 0.55, amp: 0.05, spd: 0.00013, hue: 282, phase: 2.1, alpha: 0.045 },
      { ry: 0.78, amp: 0.06, spd: 0.00016, hue: 245, phase: 4.2, alpha: 0.04  },
    ];

    // ── Render helpers ─────────────────────────────────────────────────────────

    function drawAurora(ts: number) {
      waves.forEach(w => {
        const cy = H * w.ry + Math.sin(ts * w.spd + w.phase) * H * w.amp;
        const h  = 90;
        const g  = ctx.createLinearGradient(0, cy - h, 0, cy + h);
        g.addColorStop(0,   `hsla(${w.hue},80%,62%,0)`);
        g.addColorStop(0.35,`hsla(${w.hue},82%,64%,${w.alpha})`);
        g.addColorStop(0.5, `hsla(${w.hue},90%,68%,${w.alpha * 1.6})`);
        g.addColorStop(0.65,`hsla(${w.hue},82%,64%,${w.alpha})`);
        g.addColorStop(1,   `hsla(${w.hue},80%,62%,0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, cy - h, W, h * 2);
      });
    }

    function stepParticles() {
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0)  p.x = W;
        if (p.x > W)  p.x = 0;
        if (p.y < 0)  p.y = H;
        if (p.y > H)  p.y = 0;
        p.phase += p.speed;
        const a = p.alpha * (0.45 + 0.55 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,86%,${a})`;
        ctx.fill();
      });
    }

    function stepShootingStars() {
      sstars.forEach(s => {
        if (!s.active) {
          s.timer++;
          if (s.timer < s.next) return;
          // spawn
          const fromTop = Math.random() < 0.6;
          if (fromTop) {
            s.x = Math.random() * W * 0.8;
            s.y = -15;
          } else {
            s.x = -15;
            s.y = Math.random() * H * 0.6;
          }
          const ang = (Math.PI / 4) + (Math.random() - 0.5) * 0.4;
          const spd = 14 + Math.random() * 10;
          s.vx    = Math.cos(ang) * spd;
          s.vy    = Math.sin(ang) * spd;
          s.alpha = 1;
          s.hue   = [260, 270, 285][Math.floor(Math.random() * 3)];
          s.trail = [];
          s.active= true;
          s.timer = 0;
          s.next  = Math.random() * 300 + 180;
          return;
        }
        s.x += s.vx; s.y += s.vy;
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 28) s.trail.shift();
        s.alpha -= 0.014;
        if (s.alpha <= 0 || s.x > W + 60 || s.y > H + 60) {
          s.active = false; s.trail = [];
          return;
        }
        // trail
        for (let i = 1; i < s.trail.length; i++) {
          const p = i / s.trail.length;
          const g = ctx.createLinearGradient(
            s.trail[i-1].x, s.trail[i-1].y,
            s.trail[i].x,   s.trail[i].y
          );
          g.addColorStop(0, `hsla(${s.hue},90%,88%,0)`);
          g.addColorStop(1, `hsla(${s.hue},95%,92%,${s.alpha * p * 0.85})`);
          ctx.beginPath();
          ctx.moveTo(s.trail[i-1].x, s.trail[i-1].y);
          ctx.lineTo(s.trail[i].x,   s.trail[i].y);
          ctx.strokeStyle = g;
          ctx.lineWidth   = 1.6 * p;
          ctx.lineCap     = "round";
          ctx.stroke();
        }
        // head glow
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 9);
        grd.addColorStop(0, `hsla(${s.hue},100%,99%,${s.alpha})`);
        grd.addColorStop(1, `hsla(${s.hue},90%,82%,0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });
    }

    function drawCube(cx: number, cy: number, r: number, prog: number, ts: number) {
      const lines = buildCubeLines(cx, cy, r);
      const n     = lines.length;
      const drawn = Math.min(n, Math.floor(prog * n));
      const frac  = (prog * n) % 1;
      const pulse = fullyDrawn ? 0.75 + 0.25 * Math.sin(ts * 0.0018) : 1;

      ctx.save();
      ctx.lineCap = "round";

      lines.forEach(({ a, b, grp }, i) => {
        if (i > drawn) return;

        const isPartial = i === drawn && !fullyDrawn;
        const endX      = isPartial ? a.x + (b.x - a.x) * frac : b.x;
        const endY      = isPartial ? a.y + (b.y - a.y) * frac : b.y;

        // How "old" / lit-up this line is
        const age   = Math.min(1, (drawn - i) / 6) * pulse;
        const lineA = isPartial ? frac * 0.9 : age * 0.9;

        // Outer layers are cooler blue-violet; inner layers are warmer violet
        const hue   = grp < 2 ? 262 : grp < 4 ? 270 : 280;

        // ─ Wide soft glow (draw first, lowest z)
        ctx.strokeStyle = `hsla(${hue},80%,72%,${lineA * 0.3})`;
        ctx.lineWidth   = 6;
        ctx.shadowColor = `hsla(${hue},90%,70%,${lineA * 0.5})`;
        ctx.shadowBlur  = 18;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // ─ Crisp core line (on top)
        ctx.shadowBlur  = 6;
        ctx.lineWidth   = 1.4;
        ctx.strokeStyle = `hsla(${hue},90%,88%,${lineA})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // ─ Animated draw-tip spark
        if (isPartial) {
          const sparkg = ctx.createRadialGradient(endX, endY, 0, endX, endY, 10);
          sparkg.addColorStop(0, `rgba(220,205,255,0.95)`);
          sparkg.addColorStop(0.4, `rgba(167,139,250,0.5)`);
          sparkg.addColorStop(1, `rgba(124,58,237,0)`);
          ctx.fillStyle = sparkg;
          ctx.beginPath();
          ctx.arc(endX, endY, 10, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // ─ Centre bloom when fully drawn ──────────────────────────────────────
      if (fullyDrawn) {
        const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.4);
        bloom.addColorStop(0, `rgba(167,139,250,${0.18 * pulse})`);
        bloom.addColorStop(0.5, `rgba(124,58,237,${0.09 * pulse})`);
        bloom.addColorStop(1, `rgba(79,34,180,0)`);
        ctx.fillStyle = bloom;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // outer halo
        const halo = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.7);
        halo.addColorStop(0, `rgba(104,60,240,${0.1 * pulse})`);
        halo.addColorStop(1, `rgba(79,34,180,0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // ── Main render loop ───────────────────────────────────────────────────────
    let raf: number;

    const render = (ts: number) => {
      // — Background: near-opaque fill for motion-blur trail effect
      ctx.fillStyle = "rgba(5, 8, 18, 0.9)";
      ctx.fillRect(0, 0, W, H);

      // — Subtle deep-radial warmth from cube area
      const warmCX = W * 0.65;
      const warmCY = H * 0.50;
      const warm = ctx.createRadialGradient(warmCX, warmCY, 0, warmCX, warmCY, W * 0.55);
      warm.addColorStop(0, "rgba(50, 20, 100, 0.35)");
      warm.addColorStop(0.5, "rgba(18, 10, 50, 0.15)");
      warm.addColorStop(1, "rgba(5, 8, 18, 0)");
      ctx.fillStyle = warm;
      ctx.fillRect(0, 0, W, H);

      drawAurora(ts);
      stepParticles();
      stepShootingStars();

      // — Cube: positioned right-of-center to match layout
      const cubeCX = W * 0.65;
      const cubeCY = H * 0.50;
      const cubeR  = Math.min(W * 0.20, H * 0.32, 160);

      if (!fullyDrawn) {
        drawProgress = Math.min(1, drawProgress + 1 / DRAW_FRAMES);
        if (drawProgress >= 1) fullyDrawn = true;
      }

      drawCube(cubeCX, cubeCY, cubeR, drawProgress, ts);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
