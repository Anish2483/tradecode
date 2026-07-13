import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageShell";


export interface ServiceContent {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  outcomes: { label: string; value: string }[];
  offerings: string[];
  process: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export function ServicePage({ content }: { content: ServiceContent }) {
  return (
    <>
      <PageHeader eyebrow={content.eyebrow} title={content.title} description={content.intro} />
      <section className="border-b border-border bg-secondary/30">
        <div className="container-x py-14 grid gap-6 md:grid-cols-4">
          {content.outcomes.map((o) => (
            <div key={o.label} className="border-l-2 border-brand pl-4">
              <div className="font-display text-3xl font-bold">{o.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{o.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="container-x py-20 grid gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-display text-3xl font-bold">What we deliver</h2>
          <ul className="mt-6 space-y-3">
            {content.offerings.map((o) => (
              <motion.li
                key={o}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-3 text-muted-foreground"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-glow mt-0.5" />
                <span>{o}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="text-xs uppercase tracking-wider text-brand-glow font-semibold">Engagement</div>
          <h3 className="mt-2 font-display text-2xl font-bold">Ready when you are</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            No project begins without a formally signed customer agreement. Full documentation, SLAs and
            ongoing support are engineered into every engagement.
          </p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90">
            Talk to our team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <section className="border-t border-border bg-secondary/30">
        <div className="container-x py-20">
          <h2 className="font-display text-3xl font-bold">How we work</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {content.process.map((p) => (
              <div key={p.step} className="rounded-xl border border-border bg-card p-6">
                <div className="font-mono text-xs text-brand-glow">{p.step}</div>
                <div className="mt-2 font-semibold">{p.title}</div>
                <div className="mt-2 text-sm text-muted-foreground">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container-x py-20">
        <h2 className="font-display text-3xl font-bold">FAQ</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {content.faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-center justify-between font-semibold">
                {f.q}
                <span className="text-brand-glow group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

