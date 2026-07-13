import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Rocket, Users, Award, Globe, FlaskConical, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Tradecode" },
    { name: "description", content: "Tradecode is a deep-tech consultancy building agentic AI, robotics and automation for founders and enterprises." },
  ]}),
  component: About,
});

const pillars = [
  { icon: Target,    t: "Mission",      d: "To help ambitious operators deploy agentic AI, robotics and automation as durable, production-grade systems — not demos." },
  { icon: Eye,       t: "Vision",       d: "A world where every business, institution and lab has direct access to state-of-the-art AI and automation engineering." },
  { icon: Rocket,    t: "What we do",   d: "We design, build and operate custom AI, robotics, data and software systems, and train the teams who run them." },
  { icon: Users,     t: "Who we serve", d: "Founders, scale-ups, enterprises, universities, government labs and research institutions across 18 countries." },
];

const achievements = [
  { icon: Globe,        v: "18",    l: "Countries served" },
  { icon: Users,        v: "120+",  l: "Enterprise clients" },
  { icon: FlaskConical, v: "15+",   l: "R&D publications" },
  { icon: Award,        v: "99.98%",l: "Uptime SLA" },
];

const timeline = [
  { year: "2020", t: "Founded in Dehradun", d: "Tradecode was founded with a mission to bring frontier AI and robotics to Indian enterprises." },
  { year: "2021", t: "First Enterprise Contracts", d: "Signed 10+ enterprise agreements in manufacturing, logistics and edtech." },
  { year: "2022", t: "Robotics Lab Launched", d: "Opened our in-house robotics R&D lab — shipping custom industrial robotic systems." },
  { year: "2023", t: "AI Research Program", d: "Launched our agentic AI research group, publishing proprietary work on multi-agent orchestration." },
  { year: "2024", t: "Global Expansion", d: "Expanded to 18 countries, serving clients from Southeast Asia, the Middle East, and Europe." },
  { year: "2025", t: "GenAI & LLM Division", d: "Dedicated GenAI division launched — RAG pipelines, fine-tuning and production LLM deployments." },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Tradecode"
        title={<>A deep-tech firm built by <span className="text-gradient-brand">operators, for operators.</span></>}
        description="We are a Dehradun-headquartered consultancy building agentic AI, robotics and automation systems for teams that need to ship."
      />

      {/* Pillars */}
      <section className="container-x py-20 grid gap-6 md:grid-cols-2">
        {pillars.map((p, i) => (
          <motion.div key={p.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-border bg-card p-8 hover:border-brand/40 transition-colors">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand text-brand-foreground">
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold">{p.t}</h3>
            <p className="mt-3 text-muted-foreground">{p.d}</p>
          </motion.div>
        ))}
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container-x py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((a, i) => (
            <motion.div key={a.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="text-center">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand mx-auto mb-4">
                <a.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-4xl font-bold">{a.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{a.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How we operate */}
      <section className="border-b border-border">
        <div className="container-x py-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-5 w-5 text-brand-glow" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-glow">Our Principles</span>
          </div>
          <h2 className="font-display text-3xl font-bold">How we operate</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Tradecode operates under strict engagement discipline. No project, product or transaction begins
            without a formally signed customer agreement — protecting scope, IP and outcomes for both sides.
            Every engagement ships with complete technical documentation before and after delivery, plus
            ongoing technical support and maintenance for the full product lifecycle.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our senior teams sit at the intersection of applied research and production engineering. We
            invest heavily in R&D — our robotics lab and agentic AI research group publish proprietary work
            annually and license selected IP to enterprise partners.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-x py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-glow">Our journey</span>
          <h2 className="mt-3 font-display text-3xl font-bold">From Dehradun to the world.</h2>
        </motion.div>
        <div className="relative border-l-2 border-brand/20 pl-8 space-y-10">
          {timeline.map((t, i) => (
            <motion.div key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="relative">
              <div className="absolute -left-[2.85rem] top-1 h-4 w-4 rounded-full border-2 border-brand bg-background" />
              <div className="text-xs font-bold text-brand-glow uppercase tracking-wider mb-1">{t.year}</div>
              <div className="font-display text-lg font-semibold">{t.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.d}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
