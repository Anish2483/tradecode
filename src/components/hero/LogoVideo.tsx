import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import logoVideo from "@/assets/logo-scramble.mp4.asset.json";

/**
 * Cursor-reactive 3D-tilt logo video with real-time chroma-key.
 * Draws each video frame to an offscreen canvas, removes the dark
 * navy background by luminance, and paints the transparent result
 * to a visible canvas — so the logo floats with no background at all.
 */
export function LogoVideo() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 80, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), { stiffness: 80, damping: 14 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 90, damping: 18 });
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), { stiffness: 90, damping: 18 });
  const glowX = useTransform(mx, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["30%", "70%"]);

  // pointer tracking on the hero container
  useEffect(() => {
    const el = wrapRef.current?.closest("[data-hero-track]") as HTMLElement | null;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => { mx.set(0); my.set(0); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  // per-frame chroma-key: dark navy → transparent
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const size = 512;
    canvas.width = size;
    canvas.height = size;

    // Luminance threshold: below this the pixel becomes fully transparent,
    // above it the pixel fades in smoothly for clean edges.
    const LO = 40;   // pure background
    const HI = 120;  // fully opaque logo

    const draw = () => {
      if (video.readyState >= 2 && video.videoWidth > 0) {
        ctx.drawImage(video, 0, 0, size, size);
        const img = ctx.getImageData(0, 0, size, size);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          // perceived luminance
          const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          let a: number;
          if (lum <= LO) a = 0;
          else if (lum >= HI) a = 255;
          else a = Math.round(((lum - LO) / (HI - LO)) * 255);
          d[i + 3] = a;
          // premultiply-ish boost so faint edges don't look dirty navy
          if (a > 0 && a < 255) {
            const boost = 255 / Math.max(lum, 1);
            d[i] = Math.min(255, r * boost);
            d[i + 1] = Math.min(255, g * boost);
            d[i + 2] = Math.min(255, b * boost);
          }
        }
        ctx.putImageData(img, 0, 0);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const onPlay = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(draw);
    };
    video.addEventListener("play", onPlay);
    video.addEventListener("loadeddata", onPlay);
    // kick it off if already playing
    onPlay();

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("loadeddata", onPlay);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[560px] aspect-square select-none">
      {/* cursor-following glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--brand-glow) 55%, transparent), transparent 70%)",
          left: glowX,
          top: glowY,
          width: "70%",
          height: "70%",
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
          opacity: 0.5,
        }}
      />

      <motion.div className="absolute inset-0 grid place-items-center" style={{ perspective: 1200 }}>
        <motion.div
          className="relative w-[92%] h-[92%]"
          style={{
            transformStyle: "preserve-3d",
            rotateX: rx,
            rotateY: ry,
            x: tx,
            y: ty,
          }}
        >
          {/* hidden source video; canvas is what's shown */}
          <video
            ref={videoRef}
            src={logoVideo.url}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className="hidden"
          />
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
            style={{ filter: "drop-shadow(0 0 30px color-mix(in oklch, var(--brand-glow) 45%, transparent))" }}
          />
        </motion.div>
      </motion.div>

      {/* orbit rings */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none text-brand-glow"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeOpacity="0.12" strokeDasharray="1 2" />
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeOpacity="0.08" />
      </svg>
    </div>
  );
}
