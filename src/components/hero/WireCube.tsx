import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Interactive 3D wireframe hero visual.
 * - Tracks cursor across the whole hero to tilt the cube (parallax)
 * - Idle floating animation while cursor is away
 * - Pure CSS 3D transforms + SVG edges, no external 3D lib
 */
export function WireCube() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), { stiffness: 80, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-25, 25]), { stiffness: 80, damping: 14 });
  const glowX = useTransform(mx, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["30%", "70%"]);

  useEffect(() => {
    const el = wrapRef.current?.closest("[data-hero-track]") as HTMLElement | null;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <div ref={wrapRef} className="relative aspect-square w-full max-w-[560px] mx-auto select-none">
      {/* radial glow follows cursor */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(closest-side, color-mix(in oklch, var(--brand-glow) 55%, transparent), transparent 70%)`,
          left: glowX,
          top: glowY,
          width: "60%",
          height: "60%",
          transform: "translate(-50%, -50%)",
          filter: "blur(30px)",
          opacity: 0.55,
        }}
      />

      <motion.div
        className="absolute inset-0 grid place-items-center"
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="relative"
          style={{
            width: "70%",
            aspectRatio: "1 / 1",
            transformStyle: "preserve-3d",
            rotateX: rx,
            rotateY: ry,
          }}
          animate={{ rotateZ: [0, 1.2, 0, -1.2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <CubeFaces />
          {/* inner cube */}
          <motion.div
            className="absolute inset-[22%]"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            <CubeFaces small />
          </motion.div>
          {/* central node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-brand-glow shadow-[0_0_40px_10px_var(--brand-glow)]" />
        </motion.div>
      </motion.div>

      {/* orbit rings */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeOpacity="0.12" strokeDasharray="1 2" />
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeOpacity="0.08" />
      </svg>
    </div>
  );
}

function CubeFaces({ small = false }: { small?: boolean }) {
  const size = "100%";
  const half = small ? "60px" : "160px";
  const faceCls =
    "absolute inset-0 border rounded-md " +
    (small
      ? "border-brand-glow/70 bg-brand-glow/[0.04]"
      : "border-brand-glow/60 bg-brand-glow/[0.03]");
  const faces = [
    { t: `translateZ(${half})` },
    { t: `translateZ(-${half})` },
    { t: `rotateY(90deg) translateZ(${half})` },
    { t: `rotateY(-90deg) translateZ(${half})` },
    { t: `rotateX(90deg) translateZ(${half})` },
    { t: `rotateX(-90deg) translateZ(${half})` },
  ];
  return (
    <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", width: size, height: size }}>
      {faces.map((f, i) => (
        <div key={i} className={faceCls} style={{ transform: f.t }}>
          <div className="absolute inset-0 opacity-70">
            {/* internal cross lines for wire look */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-glow/40" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-brand-glow/40" />
            <div className="absolute inset-3 border border-brand-glow/25 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}
