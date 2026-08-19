/**
 * HeroAnimationBg — "Assembly from the Void"
 * ─────────────────────────────────────────────
 * The Tradecode logo is sampled pixel-by-pixel.
 * Each logo pixel becomes a particle that starts far outside the viewport,
 * flying inward like a comet (velocity-based streak trail), and snaps to its
 * exact pixel position — assembling the full logo from stardust.
 *
 * After assembly the particles breathe with subtle drift and random sparkle.
 * The left-half canvas stays atmospheric (bg stars, aurora, shooting stars).
 */

import { useEffect, useRef } from "react";
import logoSrc from "@/assets/tradecode-wireframe-logo.png";

// ── types ─────────────────────────────────────────────────────────────────────
interface BgDot  { x:number; y:number; vx:number; vy:number; r:number; a:number; hue:number; phase:number; dspd:number; }
interface SStar  { x:number; y:number; vx:number; vy:number; trail:{x:number;y:number}[]; alpha:number; hue:number; active:boolean; timer:number; next:number; }
interface LPart  {
  x:number;  y:number;   // current position
  px:number; py:number;  // previous position (velocity trail)
  tx:number; ty:number;  // target pixel on logo
  r:number;              // radius
  hue:number;
  delay:number;          // stagger delay in seconds
  spd:number;            // convergence speed (lerp factor)
  dspd:number;           // drift speed after assembly
  phase:number;          // drift phase
  assembled:boolean;
  sparkle:number;        // 0-1 sparkle brightness boost
}

// ── component ─────────────────────────────────────────────────────────────────
export function HeroAnimationBg() {
  const cvs = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    // ── Logo load ─────────────────────────────────────────────────────────────
    const logo = new Image();
    logo.src = logoSrc;
    let natW = 0, natH = 0, logoReady = false;
    logo.onload = () => { logoReady = true; natW = logo.naturalWidth; natH = logo.naturalHeight; };

    // ── Logo particle state ───────────────────────────────────────────────────
    let lparts: LPart[] = [];
    let partsBuilt = false;

    function getLogoDims() {
      const aspect = natW && natH ? natW / natH : 1.0;
      const lw  = Math.min(W * 0.36, 340);
      const lh  = lw / aspect;
      const lcx = Math.min(W * 0.73, W - lw * 0.5 - 24);
      const lcy = H * 0.46;
      return { lw, lh, lcx, lcy, lx: lcx - lw / 2, ly: lcy - lh / 2 };
    }

    function buildParticles() {
      const { lw, lh, lx, ly, lcx, lcy } = getLogoDims();

      // Sample logo pixels on an offscreen canvas
      const samp   = document.createElement("canvas");
      samp.width   = Math.ceil(lw);
      samp.height  = Math.ceil(lh);
      const sc     = samp.getContext("2d")!;
      sc.drawImage(logo, 0, 0, samp.width, samp.height);
      const id = sc.getImageData(0, 0, samp.width, samp.height);

      const STEP   = 3; // sample every 3rd pixel for ~2 k particles
      const maxR   = Math.max(W, H) * 1.3;
      const result: LPart[] = [];

      for (let py = 0; py < samp.height; py += STEP) {
        for (let px = 0; px < samp.width; px += STEP) {
          const alpha = id.data[(py * samp.width + px) * 4 + 3];
          if (alpha < 80) continue;   // transparent — not part of logo

          // Start far outside the viewport (random angle from logo centre)
          const angle = Math.random() * Math.PI * 2;
          const dist  = maxR * (0.6 + Math.random() * 0.7);
          result.push({
            x:  lcx + Math.cos(angle) * dist,
            y:  lcy + Math.sin(angle) * dist,
            px: lcx + Math.cos(angle) * dist,
            py: lcy + Math.sin(angle) * dist,
            tx: lx + px,
            ty: ly + py,
            r:    0.9 + Math.random() * 0.8,
            hue:  258 + Math.floor(Math.random() * 28),  // violet range
            delay: Math.random() * 2.0,    // staggered over 2 s
            spd:   0.05 + Math.random() * 0.06,
            dspd:  0.018 + Math.random() * 0.022,
            phase: Math.random() * Math.PI * 2,
            assembled: false,
            sparkle: 0,
          });
        }
      }

      lparts    = result;
      partsBuilt = true;
    }

    // ── Background starfield ──────────────────────────────────────────────────
    const HUES = [260, 275, 245, 215] as const;
    const bgDots: BgDot[] = Array.from({ length: 120 }, () => ({
      x:     Math.random() * 1920,
      y:     Math.random() * 1080,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    (Math.random() - 0.5) * 0.25,
      r:     0.35 + Math.random() * 1.2,
      a:     0.14 + Math.random() * 0.42,
      hue:   HUES[Math.floor(Math.random() * HUES.length)],
      phase: Math.random() * Math.PI * 2,
      dspd:  0.016 + Math.random() * 0.024,
    }));

    // ── Shooting stars ────────────────────────────────────────────────────────
    const sstars: SStar[] = Array.from({ length: 4 }, () => ({
      x:0, y:0, vx:0, vy:0, trail:[], alpha:0, hue:270,
      active:false, timer:0, next:80 + Math.random() * 140,
    }));

    // ── Aurora ribbons ────────────────────────────────────────────────────────
    const waves = [
      { ry:0.20, amp:0.07, spd:0.00017, hue:262, ph:0.0 },
      { ry:0.54, amp:0.05, spd:0.00013, hue:280, ph:2.2 },
      { ry:0.78, amp:0.06, spd:0.00015, hue:248, ph:4.3 },
    ];

    // ── Timeline ──────────────────────────────────────────────────────────────
    const ASSEMBLE_AFTER = 0.9; // seconds before first particle launches

    let t0 = 0, raf: number;

    // ── Render loop ───────────────────────────────────────────────────────────
    const frame = (ts: number) => {
      if (!t0) t0 = ts;
      const elapsed = (ts - t0) / 1000;

      // Build particles once, right after logo loads
      if (logoReady && !partsBuilt) buildParticles();

      // ── BG fill (slightly transparent for motion trail on fast particles) ──
      ctx.fillStyle = "rgba(5, 8, 18, 0.88)";
      ctx.fillRect(0, 0, W, H);

      // ── Aurora ─────────────────────────────────────────────────────────────
      waves.forEach(w => {
        const cy = H * w.ry + Math.sin(ts * w.spd + w.ph) * H * w.amp;
        const g  = ctx.createLinearGradient(0, cy - 90, 0, cy + 90);
        g.addColorStop(0,   `hsla(${w.hue},78%,62%,0)`);
        g.addColorStop(0.4, `hsla(${w.hue},84%,65%,0.05)`);
        g.addColorStop(0.5, `hsla(${w.hue},90%,68%,0.10)`);
        g.addColorStop(0.6, `hsla(${w.hue},84%,65%,0.05)`);
        g.addColorStop(1,   `hsla(${w.hue},78%,62%,0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, cy - 90, W, 180);
      });

      // ── Background starfield ────────────────────────────────────────────────
      bgDots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; else if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; else if (d.y > H) d.y = 0;
        d.phase += d.dspd;
        const a = d.a * (0.38 + 0.62 * Math.sin(d.phase));
        ctx.fillStyle = `hsla(${d.hue},78%,88%,${a})`;
        ctx.fillRect(d.x - d.r, d.y - d.r, d.r * 2, d.r * 2);
      });

      // ── Shooting stars ──────────────────────────────────────────────────────
      sstars.forEach(s => {
        if (!s.active) {
          if (++s.timer < s.next) return;
          s.x = Math.random() < 0.6 ? Math.random() * W * 0.85 : -14;
          s.y = s.x < 0 ? Math.random() * H * 0.55 : -14;
          const ang = Math.PI / 4 + (Math.random() - 0.5) * 0.45;
          const sp  = 13 + Math.random() * 11;
          s.vx = Math.cos(ang) * sp; s.vy = Math.sin(ang) * sp;
          s.alpha = 1; s.hue = [260, 270, 282][Math.floor(Math.random() * 3)];
          s.trail = []; s.active = true; s.timer = 0;
          s.next  = 200 + Math.random() * 320;
          return;
        }
        s.x += s.vx; s.y += s.vy;
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 30) s.trail.shift();
        s.alpha -= 0.013;
        if (s.alpha <= 0 || s.x > W + 60 || s.y > H + 60) { s.active = false; s.trail = []; return; }
        for (let i = 1; i < s.trail.length; i++) {
          const p  = i / s.trail.length;
          const tg = ctx.createLinearGradient(s.trail[i-1].x, s.trail[i-1].y, s.trail[i].x, s.trail[i].y);
          tg.addColorStop(0, `hsla(${s.hue},88%,88%,0)`);
          tg.addColorStop(1, `hsla(${s.hue},94%,92%,${s.alpha * p * 0.88})`);
          ctx.beginPath();
          ctx.moveTo(s.trail[i-1].x, s.trail[i-1].y);
          ctx.lineTo(s.trail[i].x, s.trail[i].y);
          ctx.strokeStyle = tg; ctx.lineWidth = 1.5 * p; ctx.lineCap = "round";
          ctx.stroke();
        }
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 8);
        hg.addColorStop(0, `hsla(${s.hue},100%,99%,${s.alpha})`);
        hg.addColorStop(1, `hsla(${s.hue},90%,80%,0)`);
        ctx.beginPath(); ctx.arc(s.x, s.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = hg; ctx.fill();
      });

      // ── Logo particle assembly ──────────────────────────────────────────────
      if (partsBuilt) {
        const assTime = Math.max(0, elapsed - ASSEMBLE_AFTER);
        ctx.lineCap = "round";

        lparts.forEach(p => {
          const pt = assTime - p.delay; // particle's personal elapsed time
          if (pt <= 0) return;          // not yet launched

          if (!p.assembled) {
            // ── Flying phase: lerp toward target ────────────────────────────
            p.px = p.x;
            p.py = p.y;
            p.x += (p.tx - p.x) * p.spd;
            p.y += (p.ty - p.y) * p.spd;

            const dx   = p.tx - p.x;
            const dy   = p.ty - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 1.2) {
              p.x = p.tx; p.y = p.ty;
              p.assembled = true;
              return;
            }

            // Velocity vector
            const vx  = p.x - p.px;
            const vy  = p.y - p.py;
            const spd = Math.sqrt(vx * vx + vy * vy);

            if (spd > 0.4) {
              // Streak trail — length proportional to speed
              const trailLen = Math.min(spd * 5, 28);
              const inv      = 1 / spd;
              const ox       = -vx * inv * trailLen;
              const oy       = -vy * inv * trailLen;
              const tg       = ctx.createLinearGradient(p.x + ox, p.y + oy, p.x, p.y);
              tg.addColorStop(0, `hsla(${p.hue},90%,90%,0)`);
              tg.addColorStop(1, `hsla(${p.hue},95%,96%,0.95)`);
              ctx.beginPath();
              ctx.moveTo(p.x + ox, p.y + oy);
              ctx.lineTo(p.x, p.y);
              ctx.strokeStyle = tg;
              ctx.lineWidth   = p.r * 0.75;
              ctx.stroke();
            }

            // Particle head (bright tip)
            ctx.fillStyle = `hsla(${p.hue},90%,96%,0.95)`;
            ctx.fillRect(p.x - p.r * 0.5, p.y - p.r * 0.5, p.r, p.r);

          } else {
            // ── Assembled phase: gentle drift + rare sparkle ─────────────
            p.phase += p.dspd;
            const drift = 0.7;
            const ox    = Math.sin(p.phase) * drift;
            const oy    = Math.cos(p.phase * 1.4) * drift;

            // Random sparkle (very rare — feels organic)
            p.sparkle = Math.max(0, p.sparkle - 0.04);
            if (Math.random() < 0.00025) p.sparkle = 1.0;

            const L = 72 + p.sparkle * 28;          // lightness
            const a = 0.82 + p.sparkle * 0.18;      // alpha
            ctx.fillStyle = `hsla(${p.hue},85%,${L}%,${a})`;
            ctx.fillRect(
              p.tx + ox - p.r * 0.5,
              p.ty + oy - p.r * 0.5,
              p.r, p.r,
            );
          }
        });
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas
      ref={cvs}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
