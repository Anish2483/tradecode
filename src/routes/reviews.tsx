import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title: "Client Reviews — Tradecode" }, { name: "description", content: "What Tradecode clients say — testimonials mapped to specific projects and outcomes." }] }),
  component: Reviews,
});

const reviews = [
  { name: "Rohit Iyer", title: "VP Engineering, Meridian Tech", project: "Agentic customer-support automation", outcome: "Cut ticket volume by 62%", quote: "Tradecode delivered a production-grade agentic system in eight weeks. The documentation and handover were unlike anything we'd seen from a consultancy." },
  { name: "Sara Lin", title: "Chief Data Officer, Prism Analytics", project: "Enterprise data platform", outcome: "10x faster reporting cycle", quote: "Their senior data scientists rebuilt our warehouse and dashboards. Reporting that used to take a week is now real-time." },
  { name: "Vikram Chatterjee", title: "COO, Helix Robotics", project: "Robotic vision QA line", outcome: "Defect rate 4.1% → 0.7%", quote: "The Tradecode robotics team is world-class. Our defect rate dropped from 4.1% to 0.7% within a single quarter." },
  { name: "Meera Krishnan", title: "CEO, Vertex Labs", project: "GenAI product integration", outcome: "Shipped MVP in 5 weeks", quote: "The team took our vague AI ambitions and turned them into a shipped, evaluated product that customers actually love." },
];

function Reviews() {
  return (
    <>
      <PageHeader eyebrow="Client Reviews" title="Outcomes, in our clients' own words." description="Every testimonial mapped to a specific project, engagement, and measurable outcome." />
      <section className="container-x py-20 grid gap-6 md:grid-cols-2">
        {reviews.map((r, i) => (
          <motion.blockquote key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-card p-8">
            <div className="flex gap-1 text-brand-glow">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-5 text-lg leading-relaxed">"{r.quote}"</p>
            <footer className="mt-6 flex items-start justify-between gap-4 border-t border-border pt-5">
              <div>
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.title}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{r.project}</div>
                <div className="text-sm font-semibold text-brand-glow mt-0.5">{r.outcome}</div>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </section>
    </>
  );
}
