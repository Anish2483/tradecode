import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/partners")({
  head: () => ({ meta: [{ title: "Partners — Tradecode" }, { name: "description", content: "Meet the Tradecode partner ecosystem." }] }),
  component: Partners,
});

const partners = [
  { name: "NeuralForge", type: "AI Research Partner", desc: "Joint applied research programs on multi-agent evaluation." },
  { name: "Helix Robotics", type: "Hardware Partner", desc: "Fabrication and hardware supply for the Tradecode robotics practice." },
  { name: "Kairos Data", type: "Data Infrastructure", desc: "Data warehouse and lakehouse tooling for enterprise engagements." },
  { name: "Vertex Labs", type: "Cloud & Compute", desc: "GPU compute and edge-inference infrastructure partner." },
  { name: "Northwind AI", type: "Model Provider", desc: "Enterprise LLM licensing and fine-tuning collaboration." },
  { name: "OrbitStack", type: "Platform Partner", desc: "Deployment and observability platform for Tradecode products." },
];

function Partners() {
  return (
    <>
      <PageHeader eyebrow="Partners" title="A curated ecosystem." description="Tradecode partners with best-in-class research, hardware, cloud and platform teams to deliver end-to-end programs." />
      <section className="container-x py-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
            className="rounded-2xl border border-border bg-card p-6">
            <div className="font-display text-xl font-bold">{p.name}</div>
            <div className="text-xs text-brand-glow font-mono uppercase tracking-wider mt-1">{p.type}</div>
            <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </section>
    </>
  );
}
