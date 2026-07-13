import mark from "@/assets/tradecode-mark.png.asset.json";
import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="relative h-9 w-9 shrink-0 rounded-lg bg-brand grid place-items-center overflow-hidden transition-transform group-hover:scale-105">
        <img src={mark.url} alt="Tradecode" className="h-7 w-7 object-contain" />
      </div>
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-tight">Tradecode</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Build · Automate · Scale
          </span>
        </div>
      )}
    </Link>
  );
}
