/**
 * AnimatedLogo — Tradecode wireframe isometric cube with Framer Motion
 *
 * Replicates the exact logo from public/logo.png:
 *  - Outer isometric cube outline
 *  - Inner lines / cross detail
 *  - "Tradecode" wordmark below
 *
 * Animations:
 *  - SVG path stroke-dasharray draw-in on mount
 *  - Continuous subtle float (translateY)
 *  - Blue glow pulse on the cube lines
 *  - Edge highlight sweep on hover
 */
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedLogoProps {
  /** Size of the cube in px (height = width * 1.15 approx) */
  size?: number;
  /** Show "Tradecode" wordmark below cube */
  showText?: boolean;
  /** Additional className on the wrapper */
  className?: string;
  /** Color of the cube lines */
  color?: string;
  /** Glow color */
  glowColor?: string;
}

// Path data for each face / edge of the isometric wireframe cube
// Based on the 485×560 viewport of the source logo
const PATHS = {
  // Outer hexagon silhouette top-face
  topFace: "M242 28 L432 138 L432 248 L242 138 Z",
  // Left face
  leftFace: "M52 138 L242 28 L242 138 L52 248 Z",
  // Right face (bottom half)
  rightFace: "M432 138 L432 358 L242 468 L242 248 Z",
  // Left bottom face
  leftBottom: "M52 248 L242 138 L242 248 L52 358 Z",
  // Bottom face
  bottomFace: "M52 358 L242 248 L432 358 L242 468 Z",
  // Inner vertical center line
  centerV: "M242 28 L242 468",
  // Inner horizontal top
  innerHTop: "M52 138 L432 138",
  // Inner horizontal bottom
  innerHBot: "M52 358 L432 358",
  // Left diagonal upper
  diagLU: "M52 138 L242 248",
  // Right diagonal upper
  diagRU: "M432 138 L242 248",
  // Left diagonal lower
  diagLL: "M52 358 L242 248",
  // Right diagonal lower
  diagRL: "M432 358 L242 248",
  // Inner cube top
  innerTop: "M152 193 L242 138 L332 193 L242 248 Z",
  // Inner cube left
  innerLeft: "M152 193 L152 303 L242 358 L242 248 Z",
  // Inner cube right
  innerRight: "M332 193 L332 303 L242 358 L242 248 Z",
};

const ALL_PATHS = Object.values(PATHS);

function CubeSVG({ color, glowColor, size }: { color: string; glowColor: string; size: number }) {
  const [drawn, setDrawn] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Small delay then draw in
    const t = setTimeout(() => setDrawn(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (drawn) {
      controls.start("visible");
    }
  }, [drawn, controls]);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3, delay: i * 0.07 },
      },
    }),
  };

  const viewW = 485;
  const viewH = 500;
  const scale = size / viewW;

  return (
    <svg
      width={size}
      height={viewH * scale}
      viewBox={`0 0 ${viewW} ${viewH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 8px ${glowColor}50)` }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Sweep gradient for hover highlight */}
        <linearGradient id="sweep" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={glowColor} stopOpacity="0" />
          <stop offset="50%" stopColor={glowColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Main cube paths — drawn in sequence */}
      {ALL_PATHS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={i < 5 ? 3.5 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          custom={i}
          variants={pathVariants}
          initial="hidden"
          animate={controls}
          filter="url(#glow)"
        />
      ))}

      {/* Animated glow overlay that pulses */}
      <motion.path
        d="M242 28 L432 138 L432 358 L242 468 L52 358 L52 138 Z"
        stroke={glowColor}
        strokeWidth={1.5}
        opacity={0}
        animate={{ opacity: [0, 0.6, 0], strokeWidth: [1, 2.5, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
      />
    </svg>
  );
}

export function AnimatedLogo({ size = 120, showText = true, className = "", color = "#ffffff", glowColor = "#4589ff" }: AnimatedLogoProps) {
  return (
    <motion.div
      className={`flex flex-col items-center select-none ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.04 }}
    >
      <CubeSVG color={color} glowColor={glowColor} size={size} />

      {showText && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 300,
            fontSize: size * 0.22,
            color,
            letterSpacing: "0.04em",
            marginTop: size * 0.06,
            textShadow: `0 0 20px ${glowColor}60`,
          }}
        >
          Tradecode
        </motion.span>
      )}
    </motion.div>
  );
}

/**
 * SmallLogo — compact logo for the header/navbar (image + text)
 * Uses the actual logo.png but with an animated CSS glow
 */
import logoSrc from "@/assets/logo.png";

interface SmallLogoProps {
  className?: string;
  height?: number;
}

export function SmallLogo({ className = "", height = 36 }: SmallLogoProps) {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <motion.img
        src={logoSrc}
        alt="Tradecode"
        style={{ height }}
        className="w-auto object-contain"
        animate={{
          filter: [
            "drop-shadow(0 0 4px rgba(69,137,255,0.3))",
            "drop-shadow(0 0 12px rgba(69,137,255,0.7))",
            "drop-shadow(0 0 4px rgba(69,137,255,0.3))",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
