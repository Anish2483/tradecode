import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  heroImage,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  heroImage?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border" style={{ minHeight: heroImage ? "420px" : undefined }}>
      {/* Hero background image */}
      {heroImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          {/* Dark overlay gradient so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/90 via-[#0a0e1a]/70 to-[#0a0e1a]/30" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </>
      )}

      {/* Fallback pattern when no image */}
      {!heroImage && (
        <>
          <div className="absolute inset-0 bg-brand-radial" />
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        </>
      )}

      {/* Dot grid overlay always */}
      {heroImage && (
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      )}

      <div className={`container-x relative ${heroImage ? "py-24 md:py-36" : "py-20 md:py-28"}`}>
        {eyebrow && (
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur">
            {eyebrow}
          </span>
        )}
        <h1
          className="mt-4 max-w-4xl text-4xl md:text-6xl font-bold tracking-tight"
          style={{ color: heroImage ? "#ffffff" : undefined }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mt-5 max-w-2xl text-lg leading-relaxed"
            style={{ color: heroImage ? "rgba(255,255,255,0.75)" : undefined }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="container-x py-16 md:py-20">
      <div className="prose prose-neutral dark:prose-invert max-w-3xl [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-3 [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>ul]:text-muted-foreground [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:my-1">
        {children}
      </div>
    </div>
  );
}
