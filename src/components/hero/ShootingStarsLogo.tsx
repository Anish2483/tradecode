import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/tradecode-wireframe-logo.png";

interface ShootingStarsLogoProps {
  className?: string;
}

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  size: number;
  decay: number;
  hue: number;
  trail: { x: number; y: number }[];
  done: boolean;
  delay: number;
  started: boolean;
}

export function ShootingStarsLogo({ className = "" }: ShootingStarsLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"stars" | "converge" | "logo">("stars");
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = container.clientWidth;
    let H = container.clientHeight;
    canvas.width = W;
    canvas.height = H;

    const cx = W / 2;
    const cy = H / 2;

    const createStar = (i: number, total: number): Star => {
      // Stars come from edges toward center
      const edge = Math.floor(Math.random() * 4);
      let startX = 0, startY = 0;
      let targetX = cx + (Math.random() - 0.5) * 60;
      let targetY = cy + (Math.random() - 0.5) * 60;

      switch (edge) {
        case 0: startX = Math.random() * W; startY = -20; break;
        case 1: startX = W + 20; startY = Math.random() * H; break;
        case 2: startX = Math.random() * W; startY = H + 20; break;
        default: startX = -20; startY = Math.random() * H; break;
      }

      const dist = Math.hypot(targetX - startX, targetY - startY);
      const speed = 10 + Math.random() * 12;
      const vx = ((targetX - startX) / dist) * speed;
      const vy = ((targetY - startY) / dist) * speed;

      // Violet / indigo / cyan palette
      const hues = [260, 240, 280, 220, 195];
      const hue = hues[Math.floor(Math.random() * hues.length)];

      return {
        x: startX,
        y: startY,
        vx,
        vy,
        length: 60 + Math.random() * 100,
        alpha: 0.7 + Math.random() * 0.3,
        size: 1.2 + Math.random() * 1.5,
        decay: 0.012 + Math.random() * 0.01,
        hue,
        trail: [],
        done: false,
        delay: i * 80 + Math.random() * 120,
        started: false,
      };
    };

    const TOTAL_STARS = 28;
    const stars: Star[] = Array.from({ length: TOTAL_STARS }, (_, i) =>
      createStar(i, TOTAL_STARS)
    );

    startTimeRef.current = performance.now();
    let elapsed = 0;
    let currentPhase: "stars" | "converge" | "logo" = "stars";

    const render = (now: number) => {
      elapsed = now - startTimeRef.current;
      W = canvas.width;
      H = canvas.height;

      // Phase transitions
      if (elapsed > 1800 && currentPhase === "stars") {
        currentPhase = "converge";
        setPhase("converge");
      }
      if (elapsed > 2600 && currentPhase === "converge") {
        currentPhase = "logo";
        setPhase("logo");
      }

      // Subtle trail fade (not full clear — creates comet-tail blur)
      ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
      ctx.fillRect(0, 0, W, H);

      stars.forEach((star) => {
        if (star.done) return;
        if (!star.started && elapsed < star.delay) return;
        star.started = true;

        // Move
        star.x += star.vx;
        star.y += star.vy;

        // Record trail
        star.trail.push({ x: star.x, y: star.y });
        if (star.trail.length > 18) star.trail.shift();

        // Fade out
        star.alpha -= star.decay;
        if (star.alpha <= 0) {
          star.done = true;
          return;
        }

        // Draw trail — gradient line from head to tail
        if (star.trail.length > 1) {
          for (let t = 1; t < star.trail.length; t++) {
            const progress = t / star.trail.length;
            const trailAlpha = star.alpha * progress * 0.9;

            ctx.beginPath();
            ctx.moveTo(star.trail[t - 1].x, star.trail[t - 1].y);
            ctx.lineTo(star.trail[t].x, star.trail[t].y);

            const grad = ctx.createLinearGradient(
              star.trail[t - 1].x, star.trail[t - 1].y,
              star.trail[t].x, star.trail[t].y
            );
            grad.addColorStop(0, `hsla(${star.hue}, 80%, 75%, 0)`);
            grad.addColorStop(1, `hsla(${star.hue}, 90%, 80%, ${trailAlpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = star.size * progress;
            ctx.lineCap = "round";
            ctx.stroke();
          }
        }

        // Bright star head
        const grd = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
        grd.addColorStop(0, `hsla(${star.hue}, 100%, 95%, ${star.alpha})`);
        grd.addColorStop(0.4, `hsla(${star.hue}, 90%, 80%, ${star.alpha * 0.6})`);
        grd.addColorStop(1, `hsla(${star.hue}, 80%, 70%, 0)`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      // In converge phase — add a burst ring at center
      if (currentPhase === "converge") {
        const burstProgress = Math.min(1, (elapsed - 1800) / 800);
        const radius = 120 * (1 - burstProgress);
        const ringAlpha = (1 - burstProgress) * 0.4;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 92, 246, ${ringAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner glow burst
        const burstGrd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 80 * burstProgress);
        burstGrd.addColorStop(0, `rgba(167, 139, 250, ${0.3 * burstProgress})`);
        burstGrd.addColorStop(1, "rgba(167, 139, 250, 0)");
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, 80 * burstProgress, 0, Math.PI * 2);
        ctx.fillStyle = burstGrd;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    const handleResize = () => {
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className}`}
      style={{ width: "420px", minHeight: "480px" }}
    >
      {/* Canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />

      {/* Ambient background glow — always present */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Logo — fades in after stars converge */}
      <AnimatePresence>
        {phase === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            {/* Outer ring orbits */}
            <motion.div
              className="absolute rounded-full border border-violet-200/40"
              style={{ width: 320, height: 320 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {/* Orbit dot */}
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-400/60"
              />
            </motion.div>

            <motion.div
              className="absolute rounded-full border border-violet-100/30"
              style={{ width: 380, height: 380 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            >
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-indigo-300/50"
              />
            </motion.div>

            {/* Core glass card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex flex-col items-center p-10 rounded-3xl z-10"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(139,92,246,0.18)",
                boxShadow: "0 8px 60px rgba(124,58,237,0.12), 0 2px 20px rgba(124,58,237,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              {/* Top shimmer bar */}
              <div
                className="absolute top-0 inset-x-8 h-px rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)" }}
              />

              {/* Logo with violet tint overlay */}
              <div className="relative">
                {/* Glow behind logo */}
                <div
                  className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(124,58,237,0.40) 0%, rgba(109,40,217,0.15) 50%, transparent 75%)" }}
                />
                <img
                  src={logoImg}
                  alt="Tradecode Logo"
                  style={{
                    width: 180,
                    height: "auto",
                    filter: "sepia(1) saturate(8) hue-rotate(220deg) brightness(0.52) contrast(1.5) drop-shadow(0 6px 32px rgba(109,40,217,0.65))",
                  }}
                />
              </div>

              {/* "TRADECODE" wordmark — matching logo style */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-5 text-center"
              >
                <div
                  className="text-[11px] uppercase tracking-[0.35em] font-semibold"
                  style={{ color: "rgba(88,28,180,0.92)", letterSpacing: "0.35em" }}
                >
                  Tradecode
                </div>
                <div
                  className="mt-1 text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: "rgba(88,28,180,0.65)" }}
                >
                  Innovations
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-7 flex items-center gap-2 text-[10px] font-medium tracking-widest uppercase"
              style={{ color: "rgba(109,40,217,0.5)" }}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live · 40M+ runs / month
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
