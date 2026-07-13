import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageShell";
import { services } from "@/content/services";

export const Route = createFileRoute("/services/")({
  head: () => ({ meta: [{ title: "Services — Tradecode" }, { name: "description", content: "The full Tradecode service catalog: AI, robotics, data, software, consulting and training." }] }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const list = Object.values(services);
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="The full deep-tech stack, delivered by one partner."
        description="From agentic AI and robotics to data platforms, consulting and training — every service is delivered by senior teams with formal customer agreements, documentation and long-term support."
      />
      <section className="container-x py-20">
        <div className="grid gap-px bg-border rounded-2xl overflow-hidden md:grid-cols-2">
          {list.map((s, i) => (
            <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
              <Link to={`/services/${s.slug}`} className="group block bg-card p-8 hover:bg-accent/50 transition-colors h-full">
                <div className="text-xs uppercase tracking-wider text-brand-glow font-semibold">{s.eyebrow}</div>
                <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.intro}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-glow">
                  Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
