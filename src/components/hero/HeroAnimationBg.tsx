/**
 * HeroAnimationBg
 * ───────────────
 * Full-screen canvas animation for the homepage hero.
 *
 * LEFT HALF  → deep-space atmosphere: drifting particles, aurora ribbons,
 *              occasional shooting-star trails. No logo here.
 *
 * RIGHT HALF → the exact Tradecode wireframe-logo PNG loaded from assets,
 *              coloured violet via offscreen destination-in compositing,
 *              revealed top-to-bottom by a glowing scan-line, then
 *              pulsing with a deep violet bloom forever.
 */

import { useEffect, useRef } from "react";
import logoSrc from "@/assets/tradecode-wireframe-logo.png";

// ── tiny helpers ─────────────────────────────────────────────────────────────
interface Dot {
  x: number; y: number;
  vx: number; vy: number;
  r: number; a: number; hue: number;
  phase: number; spd: number;
}

interface SStar {
  x: number; y: number; vx: number; vy: number;
  trail: { x: number; y: number }[];
  alpha: number; hue: number;
  active: boolean; timer: number; next: number;
}

// ── component ─────────────────────────────────────────────────────────────────
export function HeroAnimationBg() {
  const cvs = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // ── Load actual Tradecode logo PNG ────────────────────────────────────────
    const logo = new Image();
    logo.src = logoSrc;
    let logoReady = false;
    logo.onload = () => { logoReady = true; };

    // Offscreen canvas: violet-gradient masked to the logo's alpha channel
    const off    = document.createElement("canvas");
    const offCtx = off.getContext("2d")!;
    let lastOW = 0, lastOH = 0;

    function buildVioletLogo(lw: number, lh: number) {
      off.width  = Math.ceil(lw);
      off.height = Math.ceil(lh);
      offCtx.clearRect(0, 0, off.width, off.height);

      // 1 – violet → lavender gradient fill
      const g = offCtx.createLinearGradient(0, 0, lw * 0.7, lh);
      g.addColorStop(0,   "rgba(220, 208, 255, 1)"); // pale lavender (top-left)
      g.addColorStop(0.45,"rgba(167, 139, 250, 1)"); // violet mid
      g.addColorStop(1,   "rgba(109,  58, 230, 1)"); // deep violet (bottom-right)
      offCtx.fillStyle = g;
      offCtx.fillRect(0, 0, lw, lh);

      // 2 – clip to the logo's opaque pixels only
      offCtx.globalCompositeOperation = "destination-in";
      offCtx.drawImage(logo, 0, 0, lw, lh);
      offCtx.globalCompositeOperation = "source-over";
    }

    // ── Floating particles ────────────────────────────────────────────────────
    const HUES = [260, 275, 245, 215] as const;
    const dots: Dot[] = Array.from({ length: 130 }, () => ({
      x:     Math.random() * 1920,
      y:     Math.random() * 1080,
      vx:    (Math.random() - 0.5) * 0.28,
      vy:    (Math.random() - 0.5) * 0.28,
      r:     0.4 + Math.random() * 1.5,
      a:     0.18 + Math.random() * 0.55,
      hue:   HUES[Math.floor(Math.random() * HUES.length)],
      phase: Math.random() * Math.PI * 2,
      spd:   0.018 + Math.random() * 0.028,
    }));

    // ── Shooting stars ────────────────────────────────────────────────────────
    const stars: SStar[] = Array.from({ length: 4 }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, trail: [],
      alpha: 0, hue: 270, active: false, timer: 0,
      next: 80 + Math.random() * 140,
    }));

    // ── Aurora waves ──────────────────────────────────────────────────────────
    const waves = [
      { ry: 0.20, amp: 0.07, spd: 0.00017, hue: 262, ph: 0.0 },
      { ry: 0.54, amp: 0.05, spd: 0.00013, hue: 280, ph: 2.2 },
      { ry: 0.78, amp: 0.06, spd: 0.00015, hue: 248, ph: 4.3 },
    ];

    // ── Animation timeline ────────────────────────────────────────────────────
    // Logo reveal starts 1.1 s in and takes 3.4 s to sweep fully.
    const SCAN_DELAY = 1.1;
    const SCAN_DUR   = 3.4;

    let t0 = 0;
    let raf: number;

    const frame = (ts: number) => {
      if (!t0) t0 = ts;
      const elapsed = (ts - t0) / 1000; // seconds

      // ── logo geometry (recomputed every frame to handle resize) ─────────────
      // Logo sits in the RIGHT 38% of the viewport so it never overlaps the
      // left-aligned text content (max-w-3xl ≈ first 60 % of viewport width).
      const lh = Math.min(H * 0.56, 360);
      const lw = logoReady
        ? (logo.naturalWidth || 400) * (lh / (logo.naturalHeight || 450))
        : lh * 0.88;
      // Centre the logo at 74 % across; clamp so it never bleeds off-screen.
      const lcx = Math.min(W * 0.745, W - lw * 0.5 - 24);
      const lcy = H * 0.465;
      const lx  = lcx - lw / 2;
      const ly  = lcy - lh / 2;

      // Rebuild offscreen if logo size changed
      if (logoReady && (Math.ceil(lw) !== lastOW || Math.ceil(lh) !== lastOH)) {
        buildVioletLogo(lw, lh);
        lastOW = Math.ceil(lw);
        lastOH = Math.ceil(lh);
      }

      // ── Background ──────────────────────────────────────────────────────────
      ctx.fillStyle = "rgba(5, 8, 18, 0.91)";
      ctx.fillRect(0, 0, W, H);

      // Radial violet warmth emanating from logo position
      const warm = ctx.createRadialGradient(lcx, lcy, 0, lcx, lcy, lw * 1.15);
      warm.addColorStop(0,   "rgba(60, 22, 118, 0.45)");
      warm.addColorStop(0.55,"rgba(22,  9,  52, 0.20)");
      warm.addColorStop(1,   "rgba( 5,  8,  18, 0)");
      ctx.fillStyle = warm;
      ctx.fillRect(0, 0, W, H);

      // ── Aurora ribbons ──────────────────────────────────────────────────────
      waves.forEach(w => {
        const cy = H * w.ry + Math.sin(ts * w.spd + w.ph) * H * w.amp;
        const g  = ctx.createLinearGradient(0, cy - 92, 0, cy + 92);
        g.addColorStop(0,    `hsla(${w.hue},78%,62%,0)`);
        g.addColorStop(0.38, `hsla(${w.hue},84%,65%,0.055)`);
        g.addColorStop(0.5,  `hsla(${w.hue},90%,68%,0.105)`);
        g.addColorStop(0.62, `hsla(${w.hue},84%,65%,0.055)`);
        g.addColorStop(1,    `hsla(${w.hue},78%,62%,0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, cy - 92, W, 184);
      });

      // ── Floating particles ──────────────────────────────────────────────────
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; else if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; else if (d.y > H) d.y = 0;
        d.phase += d.spd;
        const a = d.a * (0.38 + 0.62 * Math.sin(d.phase));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue},78%,88%,${a})`;
        ctx.fill();
      });

      // ── Shooting stars ──────────────────────────────────────────────────────
      stars.forEach(s => {
        if (!s.active) {
          if (++s.timer >= s.next) {
            // Spawn from top or left edge
            if (Math.random() < 0.6) {
              s.x = Math.random() * W * 0.85; s.y = -14;
            } else {
              s.x = -14; s.y = Math.random() * H * 0.55;
            }
            const ang = Math.PI / 4 + (Math.random() - 0.5) * 0.45;
            const sp  = 13 + Math.random() * 11;
            s.vx = Math.cos(ang) * sp; s.vy = Math.sin(ang) * sp;
            s.alpha = 1;
            s.hue   = [260, 270, 282][Math.floor(Math.random() * 3)];
            s.trail = []; s.active = true; s.timer = 0;
            s.next  = 200 + Math.random() * 320;
          }
          return;
        }
        s.x += s.vx; s.y += s.vy;
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 30) s.trail.shift();
        s.alpha -= 0.013;
        if (s.alpha <= 0 || s.x > W + 60 || s.y > H + 60) {
          s.active = false; s.trail = [];
          return;
        }
        // Trail
        for (let i = 1; i < s.trail.length; i++) {
          const p  = i / s.trail.length;
          const tg = ctx.createLinearGradient(
            s.trail[i - 1].x, s.trail[i - 1].y,
            s.trail[i].x,     s.trail[i].y,
          );
          tg.addColorStop(0, `hsla(${s.hue},88%,88%,0)`);
          tg.addColorStop(1, `hsla(${s.hue},94%,92%,${s.alpha * p * 0.88})`);
          ctx.beginPath();
          ctx.moveTo(s.trail[i - 1].x, s.trail[i - 1].y);
          ctx.lineTo(s.trail[i].x,     s.trail[i].y);
          ctx.strokeStyle = tg; ctx.lineWidth = 1.6 * p; ctx.lineCap = "round";
          ctx.stroke();
        }
        // Head glow
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 9);
        hg.addColorStop(0, `hsla(${s.hue},100%,99%,${s.alpha})`);
        hg.addColorStop(1, `hsla(${s.hue},90%,80%,0)`);
        ctx.beginPath(); ctx.arc(s.x, s.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = hg; ctx.fill();
      });

      // ── Logo reveal + steady-state ──────────────────────────────────────────
      if (logoReady && off.width > 0) {
        const scanProg  = Math.min(1, Math.max(0, (elapsed - SCAN_DELAY) / SCAN_DUR));
        const revealedH = lh * scanProg;

        if (scanProg > 0) {
          // ── Background bloom behind logo ───────────────────────────────────
          ctx.save();
          const bloom = ctx.createRadialGradient(lcx, lcy, 0, lcx, lcy, lw * 0.95);
          bloom.addColorStop(0,    `rgba(108, 52, 228, ${0.42 * scanProg})`);
          bloom.addColorStop(0.45, `rgba( 82, 38, 182, ${0.20 * scanProg})`);
          bloom.addColorStop(1,    `rgba( 52, 20, 100, 0)`);
          ctx.fillStyle = bloom;
          ctx.beginPath();
          ctx.arc(lcx, lcy, lw * 0.95, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // ── Clip to revealed band and draw logo ────────────────────────────
          ctx.save();
          ctx.beginPath();
          ctx.rect(lx - 24, ly, lw + 48, revealedH + 2);
          ctx.clip();

          // Outer soft glow copy (slightly upscaled)
          ctx.globalAlpha = 0.28;
          ctx.drawImage(off, lx - 10, ly - 10, lw + 20, lh + 20);

          // Crisp logo
          ctx.globalAlpha = 0.93;
          ctx.drawImage(off, lx, ly, lw, lh);
          ctx.globalAlpha = 1;
          ctx.restore();

          // ── Glowing scan-line at the reveal boundary ───────────────────────
          if (scanProg < 0.99) {
            const scanY = ly + revealedH;
            ctx.save();
            const slg = ctx.createLinearGradient(lx - 32, 0, lx + lw + 32, 0);
            slg.addColorStop(0,   "rgba(167,139,250,0)");
            slg.addColorStop(0.18,"rgba(196,181,253,0.75)");
            slg.addColorStop(0.5, "rgba(255,255,255,0.98)");
            slg.addColorStop(0.82,"rgba(196,181,253,0.75)");
            slg.addColorStop(1,   "rgba(167,139,250,0)");
            ctx.strokeStyle = slg;
            ctx.lineWidth   = 2.2;
            ctx.shadowColor = "rgba(215,198,255,1)";
            ctx.shadowBlur  = 24;
            ctx.beginPath();
            ctx.moveTo(lx - 32, scanY);
            ctx.lineTo(lx + lw + 32, scanY);
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.restore();
          }
        }

        // ── Steady-state: pulsing bloom + redraw logo ──────────────────────
        if (scanProg >= 1) {
          const pulse = 0.76 + 0.24 * Math.sin(elapsed * 1.85);

          ctx.save();
          const halo = ctx.createRadialGradient(lcx, lcy, lw * 0.04, lcx, lcy, lw * 1.08);
          halo.addColorStop(0,   `rgba(142, 96, 252, ${0.22 * pulse})`);
          halo.addColorStop(0.5, `rgba(108, 56, 218, ${0.11 * pulse})`);
          halo.addColorStop(1,   "rgba( 76, 32, 168, 0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(lcx, lcy, lw * 1.08, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Glow copy behind
          ctx.save();
          ctx.globalAlpha = 0.28;
          ctx.drawImage(off, lx - 10, ly - 10, lw + 20, lh + 20);
          // Crisp logo on top
          ctx.globalAlpha = 0.94;
          ctx.drawImage(off, lx, ly, lw, lh);
          ctx.globalAlpha = 1;
          ctx.restore();
        }
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={cvs}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
