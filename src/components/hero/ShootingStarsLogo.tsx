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

interface AmbientParticle {
  x: number;
  y: number;
  vy: number;
  alpha: number;
  size: number;
  hue: number;
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

    const createStar = (i: number): Star => {
      const edge = Math.floor(Math.random() * 4);
      let startX = 0, startY = 0;
      const targetX = cx + (Math.random() - 0.5) * 40;
      const targetY = cy + (Math.random() - 0.5) * 40;

      switch (edge) {
        case 0: startX = Math.random() * W; startY = -30; break;
        case 1: startX = W + 30; startY = Math.random() * H; break;
        case 2: startX = Math.random() * W; startY = H + 30; break;
        default: startX = -30; startY = Math.random() * H; break;
      }

      const dist = Math.hypot(targetX - startX, targetY - startY);
      const speed = 11 + Math.random() * 11;
      const vx = ((targetX - startX) / dist) * speed;
      const vy = ((targetY - startY) / dist) * speed;

      const hues = [270, 250, 285, 230, 200];
      const hue = hues[Math.floor(Math.random() * hues.length)];

      return {
        x: startX,
        y: startY,
        vx,
        vy,
        length: 80 + Math.random() * 100,
        alpha: 0.8 + Math.random() * 0.2,
        size: 1.5 + Math.random() * 1.5,
        decay: 0.01 + Math.random() * 0.01,
        hue,
        trail: [],
        done: false,
        delay: i * 75 + Math.random() * 100,
        started: false,
      };
    };

    const TOTAL_STARS = 32;
    const stars: Star[] = Array.from({ length: TOTAL_STARS }, (_, i) => createStar(i));

    // Floating glass motes
    const ambientParticles: AmbientParticle[] = Array.from({ length: 24 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vy: -(0.3 + Math.random() * 0.6),
      alpha: 0.2 + Math.random() * 0.5,
      size: 1 + Math.random() * 2,
      hue: [260, 280, 220][Math.floor(Math.random() * 3)],
    }));

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

      ctx.fillStyle = "rgba(10, 14, 26, 0.22)";
      ctx.fillRect(0, 0, W, H);

      // Render floating glass motes (always)
      ambientParticles.forEach((p) => {
        p.y += p.vy;
        if (p.y < -10) {
          p.y = H + 10;
          p.x = Math.random() * W;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 80%, ${p.alpha * (currentPhase === "logo" ? 0.6 : 0.3)})`;
        ctx.fill();
      });

      // Shooting stars logic
      stars.forEach((star) => {
        if (star.done) return;
        if (!star.started && elapsed < star.delay) return;
        star.started = true;

        star.x += star.vx;
        star.y += star.vy;

        star.trail.push({ x: star.x, y: star.y });
        if (star.trail.length > 20) star.trail.shift();

        star.alpha -= star.decay;
        if (star.alpha <= 0) {
          star.done = true;
          return;
        }

        // Draw luminous star trails
        if (star.trail.length > 1) {
          for (let t = 1; t < star.trail.length; t++) {
            const progress = t / star.trail.length;
            const trailAlpha = star.alpha * progress;

            ctx.beginPath();
            ctx.moveTo(star.trail[t - 1].x, star.trail[t - 1].y);
            ctx.lineTo(star.trail[t].x, star.trail[t].y);

            const grad = ctx.createLinearGradient(
              star.trail[t - 1].x, star.trail[t - 1].y,
              star.trail[t].x, star.trail[t].y
            );
            grad.addColorStop(0, `hsla(${star.hue}, 85%, 75%, 0)`);
            grad.addColorStop(1, `hsla(${star.hue}, 95%, 85%, ${trailAlpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = star.size * progress * 1.2;
            ctx.lineCap = "round";
            ctx.stroke();
          }
        }

        // Star head glow
        const grd = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 5);
        grd.addColorStop(0, `hsla(${star.hue}, 100%, 98%, ${star.alpha})`);
        grd.addColorStop(0.5, `hsla(${star.hue}, 90%, 80%, ${star.alpha * 0.7})`);
        grd.addColorStop(1, `hsla(${star.hue}, 80%, 70%, 0)`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      // Converge phase radial burst ring
      if (currentPhase === "converge") {
        const burstProgress = Math.min(1, (elapsed - 1800) / 800);
        const radius = 130 * (1 - burstProgress);
        const ringAlpha = (1 - burstProgress) * 0.6;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167, 139, 250, ${ringAlpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        const burstGrd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 100 * burstProgress);
        burstGrd.addColorStop(0, `rgba(167, 139, 250, ${0.45 * burstProgress})`);
        burstGrd.addColorStop(0.5, `rgba(124, 58, 237, ${0.2 * burstProgress})`);
        burstGrd.addColorStop(1, "rgba(124, 58, 237, 0)");
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, 100 * burstProgress, 0, Math.PI * 2);
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
      style={{ width: "440px", minHeight: "500px" }}
    >
      {/* Canvas layer for shooting stars & motes */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />

      {/* Deep volumetric background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.14) 0%, rgba(124,58,237,0.04) 55%, transparent 75%)",
        }}
      />

      {/* Glassmorphism Logo reveal */}
      <AnimatePresence>
        {phase === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.65, filter: "blur(24px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            {/* ── 3D Floating Glass Orbit Ring 1 ── */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 340,
                height: 340,
                border: "1px solid rgba(167, 139, 250, 0.18)",
                boxShadow: "0 0 25px rgba(124, 58, 237, 0.15), inset 0 0 15px rgba(167, 139, 250, 0.08)",
                backdropFilter: "blur(2px)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            >
              {/* Luminous orbital node */}
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-300"
                style={{ boxShadow: "0 0 12px #c4b5fd, 0 0 24px #8b5cf6" }}
              />
            </motion.div>

            {/* ── 3D Floating Glass Orbit Ring 2 (Counter) ── */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 400,
                height: 400,
                border: "1px dashed rgba(199, 210, 254, 0.12)",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            >
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-300"
                style={{ boxShadow: "0 0 10px #a5b4fc" }}
              />
            </motion.div>

            {/* ── Core Glassmorphic Crystal Card ── */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex flex-col items-center p-11 rounded-[2.5rem] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(15, 23, 42, 0.65) 50%, rgba(124, 58, 237, 0.08) 100%)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow: "0 30px 70px rgba(0, 0, 0, 0.5), 0 0 40px rgba(124, 58, 237, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
              }}
            >
              {/* Dynamic Prismatic Shimmer Sweep across glass */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.15) 50%, transparent 65%)",
                }}
                animate={{
                  x: ["-150%", "150%"],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />

              {/* Specular glass top accent edge */}
              <div
                className="absolute top-0 inset-x-10 h-px rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
                }}
              />

              {/* Glass Logo Container */}
              <div className="relative flex items-center justify-center p-4">
                {/* Core radial backlight bloom */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl pointer-events-none animate-pulse"
                  style={{
                    background: "radial-gradient(circle, rgba(167,139,250,0.55) 0%, rgba(124,58,237,0.25) 55%, transparent 80%)",
                  }}
                />

                <motion.img
                  src={logoImg}
                  alt="Tradecode Logo"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: 190,
                    height: "auto",
                    filter: "brightness(1.25) contrast(1.15) drop-shadow(0 8px 32px rgba(167,139,250,0.85))",
                    mixBlendMode: "screen",
                  }}
                />
              </div>

              {/* "TRADECODE INNOVATIONS" Metallic Glass Wordmark */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 text-center z-10"
              >
                <div
                  className="text-xs uppercase font-semibold tracking-[0.38em]"
                  style={{
                    background: "linear-gradient(90deg, #ffffff 0%, #c4b5fd 50%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "0.38em",
                    filter: "drop-shadow(0 2px 8px rgba(139,92,246,0.4))",
                  }}
                >
                  Tradecode
                </div>
                <div
                  className="mt-1.5 text-[9px] uppercase tracking-[0.24em] font-medium text-violet-200/70"
                >
                  Innovations
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom Glass Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-7 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] font-medium tracking-widest uppercase text-white/80"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              Live · 40M+ runs / month
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
