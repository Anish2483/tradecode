import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/press")({
  head: () => ({ meta: [{ title: "Press & Notices — Tradecode" }, { name: "description", content: "Official press releases, notices and public announcements from Tradecode." }] }),
  component: Press,
});

const releases = [
  { date: "Jun 20, 2026", tag: "Press Release", title: "Tradecode launches Robotics Lab in Dehradun", body: "Tradecode inaugurates a dedicated robotics R&D facility focused on industrial vision and autonomous material handling." },
  { date: "May 12, 2026", tag: "Notice", title: "Q2 2026 project intake now open", body: "Enterprise engagements for agentic AI programs are now being scheduled for the Q2 2026 window." },
  { date: "Apr 03, 2026", tag: "Press Release", title: "Tradecode publishes agentic AI reliability benchmark", body: "The public benchmark evaluates production agentic systems across 12 canonical enterprise tasks." },
  { date: "Feb 27, 2026", tag: "Notice", title: "Institutional training partnership with a leading engineering college", body: "Joint 12-week deep-learning module launched with 120 students in the inaugural cohort." },
];

function Press() {
  return (
    <>
      <PageHeader eyebrow="Press & Notices" title="Official announcements from Tradecode." description="Press releases, public notices and official communications." />
      <section className="container-x py-20 divide-y divide-border border-y border-border">
        {releases.map((r, i) => (
          <motion.article key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="grid gap-6 py-8 md:grid-cols-[180px_1fr]">
            <div>
              <div className="text-xs font-mono text-brand-glow uppercase tracking-wider">{r.tag}</div>
              <div className="mt-1 text-sm text-muted-foreground">{r.date}</div>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">{r.title}</h3>
              <p className="mt-2 text-muted-foreground">{r.body}</p>
            </div>
          </motion.article>
        ))}
      </section>
    </>
  );
}
