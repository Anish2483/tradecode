import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FlaskConical, Cpu, Brain, Radar } from "lucide-react";
import { PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/rnd")({
  head: () => ({ meta: [{ title: "R&D — Tradecode" }, { name: "description", content: "Tradecode's proprietary R&D initiatives: agentic AI, robotics, applied ML and autonomous systems." }] }),
  component: RnD,
});

const projects = [
  { icon: Brain, code: "TC-R1", name: "Agentic Reliability Framework", status: "Active", desc: "A benchmark and toolkit for measuring reliability of production agentic systems across 12 canonical tasks. Public v1 released Feb 2026." },
  { icon: Cpu, code: "TC-R2", name: "Industrial Vision QA Platform", status: "Pilot", desc: "Modular robotic vision platform for manufacturing lines. Currently piloting with three automotive tier-1 suppliers." },
  { icon: Radar, code: "TC-R3", name: "Autonomous Warehouse Fleet", status: "Prototype", desc: "Fleet coordination and material-handling stack combining ROS2, custom hardware and multi-agent planning." },
  { icon: FlaskConical, code: "TC-R4", name: "Domain-Tuned LLM Suite", status: "Active", desc: "Open-weight LLMs fine-tuned for legal, finance and manufacturing domains with rigorous eval harnesses." },
];

function RnD() {
  return (
    <>
      <PageHeader eyebrow="Research & Development" title="Proprietary R&D that ships." description="Tradecode Labs runs applied research in agentic AI, robotics and autonomous systems — with a bias toward code that ships to production." />
      <section className="container-x py-20 space-y-6">
        {projects.map((p, i) => (
          <motion.article key={p.code} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="grid gap-6 md:grid-cols-[auto_1fr_auto] items-start rounded-2xl border border-border bg-card p-8">
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-brand text-brand-foreground">
              <p.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs text-brand-glow">{p.code}</span>
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
              </div>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
            <span className="inline-flex items-center rounded-full border border-brand/40 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand-glow whitespace-nowrap">
              {p.status}
            </span>
          </motion.article>
        ))}
      </section>
    </>
  );
}
