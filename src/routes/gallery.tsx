import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Tradecode" }, { name: "description", content: "Photos from Tradecode events, labs, deployments and team offsites." }] }),
  component: Gallery,
});

const items = [
  { title: "Agentic AI Bootcamp", subtitle: "Cohort 04, Bengaluru", date: "May 2026", desc: "60 engineers from 22 companies shipped a production agentic system in five days at our flagship bootcamp." },
  { title: "Robotics Lab Demo Day", subtitle: "Dehradun HQ", date: "Apr 2026", desc: "Live demos of our vision QA and material-handling robotics platforms to enterprise partners." },
  { title: "Enterprise AI Summit", subtitle: "Mumbai", date: "Mar 2026", desc: "Tradecode led four sessions on operationalizing generative AI at scale for financial services." },
  { title: "R&D Publication Launch", subtitle: "White paper release", date: "Feb 2026", desc: "Public release of our benchmark study on agentic system reliability across 12 real-world tasks." },
  { title: "University Program Kickoff", subtitle: "IIT partnership", date: "Jan 2026", desc: "Launched a joint 12-week deep-learning module with a top-tier engineering institute." },
  { title: "Team Offsite 2026", subtitle: "Rishikesh", date: "Jan 2026", desc: "Annual planning offsite for the Tradecode senior team — roadmap, R&D bets and 2026 hiring plan." },
];

function Gallery() {
  return (
    <>
      <PageHeader eyebrow="Photo Gallery" title="Moments from the Tradecode story." description="Deployments, demos, cohorts and the occasional offsite." />
      <section className="container-x py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.figure key={it.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-[4/3] bg-brand overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-25" />
                <div className="absolute inset-0 grid place-items-center text-brand-foreground/80 font-display text-2xl font-bold px-6 text-center">
                  {it.title}
                </div>
              </div>
              <figcaption className="p-6">
                <div className="text-xs text-brand-glow font-mono uppercase tracking-wider">{it.date}</div>
                <div className="mt-1 font-display text-lg font-bold">{it.title}</div>
                <div className="text-sm text-muted-foreground">{it.subtitle}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </>
  );
}
