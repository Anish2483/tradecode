import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-brand-radial">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="container-x relative py-20 md:py-28">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">{description}</p>
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
