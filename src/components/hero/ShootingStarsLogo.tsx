import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import logoImg from "@/assets/tradecode-wireframe-logo.png";

interface ShootingStarsLogoProps {
  className?: string;
}

export function ShootingStarsLogo({ className = "" }: ShootingStarsLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logoRevealed, setLogoRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Shooting Star Particle Class
    class ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      size: number;
      color: string;
      alpha: number;
      life: number;
      maxLife: number;

      constructor() {
        this.reset(true);
        this.life = Math.random() * this.maxLife;
      }

      reset(initial = false) {
        // Angle shooting downwards-right (-35 deg to -45 deg)
        this.angle = (Math.PI / 180) * (35 + Math.random() * 20);
        this.length = 60 + Math.random() * 80;
        this.speed = 8 + Math.random() * 12;
        this.size = 1.5 + Math.random() * 2;
        
        // Color palette: Violet (#7C3AED), Amber (#F59E0B), Cyan (#3B82F6)
        const colors = [
          "rgba(124, 58, 237, ",  // Violet
          "rgba(245, 158, 11, ",  // Amber
          "rgba(59, 130, 246, ",  // Electric Blue
          "rgba(167, 139, 250, "  // Light Violet
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 0.7 + Math.random() * 0.3;

        if (initial) {
          this.x = Math.random() * width * 1.5 - width * 0.25;
          this.y = Math.random() * height * 0.8 - height * 0.2;
        } else {
          // Spawn from top or left edge
          if (Math.random() > 0.5) {
            this.x = Math.random() * width * 1.2 - width * 0.2;
            this.y = -50;
          } else {
            this.x = -50;
            this.y = Math.random() * height * 0.6;
          }
        }

        this.maxLife = 60 + Math.random() * 80;
        this.life = 0;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life++;

        if (this.x > width + 100 || this.y > height + 100 || this.life >= this.maxLife) {
          this.reset();
        }
      }

      draw(context: CanvasRenderingContext2D) {
        const headX = this.x;
        const headY = this.y;
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        // Fading tail gradient
        const grad = context.createLinearGradient(headX, headY, tailX, tailY);
        const currentAlpha = this.alpha * (1 - this.life / this.maxLife);
        grad.addColorStop(0, `${this.color}${currentAlpha})`);
        grad.addColorStop(0.3, `${this.color}${currentAlpha * 0.6})`);
        grad.addColorStop(1, `${this.color}0)`);

        context.beginPath();
        context.moveTo(headX, headY);
        context.lineTo(tailX, tailY);
        context.strokeStyle = grad;
        context.lineWidth = this.size;
        context.lineCap = "round";
        context.stroke();

        // Glowing star head point
        context.beginPath();
        context.arc(headX, headY, this.size * 1.4, 0, Math.PI * 2);
        context.fillStyle = `${this.color}${currentAlpha})`;
        context.fill();
      }
    }

    // Create 18 shooting stars
    const stars: ShootingStar[] = Array.from({ length: 18 }, () => new ShootingStar());

    // Reveal logo after 800ms initial starfall
    const timer = setTimeout(() => {
      setLogoRevealed(true);
    }, 600);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render shooting stars
      stars.forEach((star) => {
        star.update();
        star.draw(ctx);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-[420px] w-full max-w-[440px] mx-auto select-none ${className}`}>
      {/* Background Shooting Star Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Ambient background aura behind logo */}
      <div
        className="absolute inset-[-10%] rounded-full animate-glow-pulse pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.20) 0%, rgba(245,158,11,0.10) 50%, transparent 75%)",
          filter: "blur(36px)",
        }}
      />

      {/* Central Tradecode Logo Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={logoRevealed ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center justify-center p-8 rounded-3xl bg-white/40 backdrop-blur-sm border border-violet-100/60 shadow-2xl shadow-violet-500/10 group hover:border-violet-300 transition-colors duration-500"
      >
        {/* Subtle top light bar */}
        <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

        {/* Wireframe Logo Display with Violet/Indigo tint and ambient drop shadow */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex flex-col items-center justify-center"
        >
          {/* Logo glow backdrop */}
          <div className="absolute inset-[-10%] rounded-full bg-violet-500/15 blur-xl pointer-events-none" />

          <img
            src={logoImg}
            alt="Tradecode Isometric Wireframe Logo"
            className="w-[240px] h-auto object-contain filter drop-shadow-[0_10px_25px_rgba(124,58,237,0.3)] transition-transform duration-700 group-hover:scale-105"
            style={{
              mixBlendMode: "multiply",
              filter: "brightness(0.9) contrast(1.1) drop-shadow(0 8px 24px rgba(124, 58, 237, 0.35))",
            }}
          />
        </motion.div>

        {/* Live Status Badge beneath logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={logoRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-violet-200/80 shadow-md text-[11px] font-semibold tracking-wider text-violet-700 uppercase"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Tradecode Innovations
        </motion.div>
      </motion.div>
    </div>
  );
}
