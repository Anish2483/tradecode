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
  const imageSrc =
    typeof heroImage === "string"
      ? heroImage
      : (heroImage as any)?.default || heroImage;

  return (
    <section
      className="relative overflow-hidden border-b border-border"
      style={{
        minHeight: heroImage ? "420px" : undefined,
        backgroundColor: heroImage ? "#0a0e1a" : undefined,
      }}
    >
      {/* Bulletproof HTML <img> background tag */}
      {imageSrc && (
        <>
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            style={{ zIndex: 0 }}
          />
          {/* Dark overlay gradient so white text stays crisp & legible */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(10,14,26,0.92) 0%, rgba(10,14,26,0.72) 50%, rgba(10,14,26,0.30) 100%)",
              zIndex: 1,
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, var(--background) 0%, transparent 100%)",
              zIndex: 2,
            }}
          />
        </>
      )}

      {/* Fallback pattern when no image */}
      {!imageSrc && (
        <>
          <div className="absolute inset-0 bg-brand-radial" />
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        </>
      )}

      {/* Dot grid overlay always when image present */}
      {imageSrc && (
        <div
          className="absolute inset-0 bg-grid opacity-10 pointer-events-none"
          style={{ zIndex: 3 }}
        />
      )}

      {/* Content wrapper sitting firmly on top of all background layers */}
      <div
        className={`container-x relative ${imageSrc ? "py-24 md:py-36" : "py-20 md:py-28"}`}
        style={{ zIndex: 10 }}
      >
        {eyebrow && (
          <span
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur"
            style={{ color: imageSrc ? "rgba(255,255,255,0.90)" : undefined }}
          >
            {eyebrow}
          </span>
        )}
        <h1
          className="mt-4 max-w-4xl text-4xl md:text-6xl font-bold tracking-tight"
          style={{ color: imageSrc ? "#ffffff" : undefined }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mt-5 max-w-2xl text-lg leading-relaxed"
            style={{ color: imageSrc ? "rgba(255,255,255,0.80)" : undefined }}
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
