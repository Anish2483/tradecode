import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/careers")({
  head: () => ({ meta: [{ title: "Careers — Tradecode" }, { name: "description", content: "Join Tradecode. Open roles across engineering, AI research, robotics and delivery." }] }),
  component: Careers,
});

const roles = [
  { title: "Senior AI Engineer — Agentic Systems", team: "AI Engineering", type: "Full-time", location: "Dehradun / Remote" },
  { title: "Robotics Systems Engineer", team: "Robotics", type: "Full-time", location: "Dehradun" },
  { title: "Senior Data Scientist", team: "Data Science", type: "Full-time", location: "Bengaluru / Remote" },
  { title: "Full-Stack Engineer (TypeScript)", team: "Product Engineering", type: "Full-time", location: "Remote (India)" },
  { title: "Applied ML Research Engineer", team: "R&D", type: "Full-time", location: "Dehradun" },
  { title: "Program Manager — Enterprise Delivery", team: "Delivery", type: "Full-time", location: "Mumbai / Remote" },
];

function Careers() {
  return (
    <>
      <PageHeader eyebrow="Careers" title="Build the deep-tech stack of the next decade." description="We hire senior, curious, kind operators. Every hire is a long-horizon bet on both sides." />
      <section className="container-x py-20">
        <h2 className="font-display text-2xl font-bold">Open roles</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {roles.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 sm:flex sm:flex-wrap sm:justify-between">
              <div className="min-w-0">
                <div className="font-display text-lg font-semibold truncate">{r.title}</div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>{r.team}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{r.location}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.type}</span>
                </div>
              </div>
              <Link to="/contact" className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">
                Apply <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground max-w-2xl">
          Don't see your role? We're always interested in outstanding operators. Write to us at{" "}
          <a href="mailto:careers@tradecode.in" className="text-brand-glow font-semibold">careers@tradecode.in</a>.
        </p>
      </section>
    </>
  );
}
