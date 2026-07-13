import { useRef, type ReactNode } from "react";

/**
 * Cursor-reactive spotlight card — the light follows the mouse over the card,
 * mirroring the interaction on Lovable/Antigravity marketing sites.
 */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={
        "group relative overflow-hidden rounded-2xl border border-border bg-card transition-colors " +
        className
      }
      style={{
        // spotlight
        backgroundImage:
          "radial-gradient(320px circle at var(--spot-x, -100px) var(--spot-y, -100px), color-mix(in oklch, var(--brand-glow) 18%, transparent), transparent 60%)",
      }}
    >
      {children}
    </div>
  );
}
