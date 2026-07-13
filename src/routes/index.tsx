import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bot, Cpu, Sparkles, LineChart, Code2, Globe, GraduationCap,
  MessageSquare, Layers, Workflow, ArrowRight, ArrowUpRight,
  Shield, Zap, Users, Search, Lightbulb, Hammer, HeartHandshake,
  Star, CheckCircle2, TrendingUp
} from "lucide-react";
import markAsset from "@/assets/tradecode-mark.png.asset.json";
import patternAsset from "@/assets/tradecode-pattern.png.asset.json";
import { LogoVideo } from "@/components/hero/LogoVideo";
import { SpotlightCard } from "@/components/hero/SpotlightCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tradecode — Agentic AI, Robotics & Automation" },
      { name: "description", content: "We build agentic AI systems, robotics and automation for founders and enterprises. Trusted by teams across India and beyond." },
      { property: "og:title", content: "Tradecode — Agentic AI, Robotics & Automation" },
      { property: "og:description", content: "Deep-tech consultancy building agentic AI, robotics and automation programs for enterprises." },
    ],
  }),
  component: Home,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const services = [
  { icon: Bot,          title: "Agentic AI & Automation",      desc: "Multi-agent systems with n8n, custom orchestration & tool use.",                    to: "/services/agentic-ai" },
  { icon: Sparkles,     title: "Generative AI",                 desc: "Fine-tuned LLMs, RAG, and production-grade GenAI applications.",                    to: "/services/generative-ai" },
  { icon: Cpu,          title: "Robotics",                      desc: "Custom robotics engineered for industrial and business automation.",                 to: "/services/robotics" },
  { icon: MessageSquare,title: "AI Chatbot Support",            desc: "Custom-trained chatbots on your data with end-to-end API integration.",              to: "/services/chatbots" },
  { icon: LineChart,    title: "Data Science & Analytics",      desc: "Pipelines, dashboards & analysis by senior data scientists.",                        to: "/services/data-science" },
  { icon: Code2,        title: "Software Development",          desc: "Custom software for scale-ups and enterprises.",                                     to: "/services/software" },
  { icon: Globe,        title: "Web Development",               desc: "Premium web platforms with full customization.",                                     to: "/services/web" },
  { icon: Layers,       title: "Machine Learning / DL",         desc: "Applied ML and deep learning for real business outcomes.",                           to: "/services/ml-dl" },
  { icon: Workflow,     title: "Consulting",                    desc: "Strategy for AI, automation, R&D and proprietary products.",                         to: "/services/consulting" },
  { icon: GraduationCap,title: "Industry & Institutional Training", desc: "Corporate and student training led by super-experts.",                          to: "/services/training" },
];

const partners = [
  "NeuralForge", "Helix Robotics", "Kairos Data", "Vertex Labs", "Northwind AI",
  "OrbitStack", "Prism Analytics", "Quanta Systems", "Sentinel Cloud", "Meridian Tech",
];

const stats = [
  { v: "120+",   l: "Enterprise engagements" },
  { v: "40M+",   l: "Automated workflow runs" },
  { v: "18",     l: "Countries served" },
  { v: "99.98%", l: "Production uptime" },
];

const process = [
  { icon: Search,        step: "01", title: "Discover",  desc: "We map your workflows, data and business goals to find the highest-impact opportunities for AI and automation." },
  { icon: Lightbulb,     step: "02", title: "Design",    desc: "Senior architects design the system: tech stack, integrations, data flows and success metrics." },
  { icon: Hammer,        step: "03", title: "Build",     desc: "Our engineering team ships production-grade code with full documentation and test coverage from day one." },
  { icon: HeartHandshake,step: "04", title: "Support",   desc: "We stay on for the full product lifecycle — maintenance, upgrades and ongoing technical support included." },
];

const testimonials = [
  {
    quote: "Tradecode cut our manual QA cycle time by 74% using agentic AI and robotic vision. The documentation they delivered was flawless.",
    name: "Arjun Mehta",
    role: "CTO, ScaleOps India",
    rating: 5,
  },
  {
    quote: "Their data science team built our entire analytics platform from scratch in 6 weeks. World-class engineers, zero hand-holding needed.",
    name: "Priya Nair",
    role: "Head of Data, Northwind AI",
    rating: 5,
  },
  {
    quote: "The chatbot they built handles 80% of our support tickets autonomously. ROI was visible in the first month.",
    name: "Rohan Singh",
    role: "Founder, Kairos Data",
    rating: 5,
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section
        data-hero-track
        className="relative overflow-hidden bg-[oklch(0.14_0.04_265)] text-white isolate"
      >
        <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-screen"
          style={{ backgroundImage: `url(${patternAsset.url})`, backgroundSize: "320px" }}
        />
        {/* ambient glows */}
        <div
          className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full pointer-events-none animate-glow-pulse"
          style={{ background: "radial-gradient(closest-side, color-mix(in oklch, var(--brand-glow) 45%, transparent), transparent 70%)", filter: "blur(20px)" }}
        />
        <div
          className="absolute -bottom-40 -right-20 h-[600px] w-[600px] rounded-full pointer-events-none animate-glow-pulse"
          style={{ background: "radial-gradient(closest-side, color-mix(in oklch, var(--brand) 60%, transparent), transparent 70%)", filter: "blur(20px)", animationDelay: "2s" }}
        />

        <div className="container-x relative py-20 md:py-28 grid gap-12 lg:grid-cols-[1.05fr_1fr] items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-glow animate-pulse" />
                AI · Automation · Innovation
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.02]"
            >
              Building Intelligent Solutions for a{" "}
              <span className="text-gradient-brand">Smarter Tomorrow.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed"
            >
              Tradecode empowers businesses with AI, Automation, Data Science, Robotics
              and scalable digital solutions — engineered by senior operators.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link to="/services" className="group inline-flex items-center gap-2 rounded-lg bg-brand-glow px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_var(--brand-glow)] hover:brightness-110 transition">
                Explore Services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 backdrop-blur transition">
                Book a Consultation <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[0,1,2,3].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-[oklch(0.14_0.04_265)] bg-gradient-to-br from-brand-glow to-brand" />
                ))}
              </div>
              <div>
                <div className="font-display text-lg font-bold leading-none flex items-center gap-1">
                  4.9
                  <span className="text-white/50 text-sm">/5</span>
                  <span className="ml-1 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-brand-glow text-brand-glow" />
                    ))}
                  </span>
                </div>
                <div className="text-xs text-white/60">100+ Happy Clients</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl"
            >
              {stats.map((s) => (
                <div key={s.l} className="border-l-2 border-brand-glow pl-4">
                  <div className="font-display text-3xl md:text-4xl font-bold">{s.v}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-white/60">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative text-brand-glow animate-float"
          >
            <LogoVideo />
          </motion.div>
        </div>
      </section>

      {/* Partner marquee */}
      <section className="border-y border-border bg-secondary/40 py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
          Trusted by teams building the next generation of software
        </p>
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 items-center gap-14 whitespace-nowrap animate-marquee">
            {[...partners, ...partners].map((p, i) => (
              <span key={i} className="font-display text-xl font-semibold text-muted-foreground/70 hover:text-foreground transition-colors">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="container-x py-24 md:py-32">
        <motion.div {...fadeUp} className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-glow">Services</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            One partner. The full deep-tech stack.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From agentic AI and robotics to data platforms and executive training — we design, build, and
            operate the systems that move your business forward.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <SpotlightCard className="h-full hover:border-brand-glow/60">
                <Link
                  to={s.to}
                  className="relative flex h-full flex-col justify-between gap-8 p-7"
                >
                  <div>
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand text-brand-foreground">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-glow">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-10 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors">
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* How we work — 4-step process */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container-x py-24 md:py-32">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-glow">Our Process</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">How we work</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A disciplined 4-step process that ensures every project ships on time, on scope, and fully documented.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl border border-border bg-card p-7 hover:border-brand/40 transition-colors"
              >
                <span className="font-display text-5xl font-bold text-brand/10 select-none absolute top-5 right-6">{p.step}</span>
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand/10 text-brand">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights: Robotics & Automation */}
      <section className="border-b border-border">
        <div className="container-x py-24 md:py-32 grid gap-16 lg:grid-cols-2 items-center">
          <motion.div {...fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-glow">Flagship focus</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Robotics + Automation, made for real businesses.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Our robotics lab and automation practice deliver systems that measurably reduce cost, defects,
              and cycle time — from custom industrial robotics to end-to-end agentic workflows.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                { icon: Shield, t: "Formal customer agreements", d: "No engagement begins without a signed agreement — clean scope, IP and SLAs." },
                { icon: Zap, t: "Documentation before & after", d: "Full technical documentation pre-deploy and post-deploy for every product." },
                { icon: Users, t: "Ongoing technical support", d: "Long-term maintenance, upgrades and support engineered into every program." },
              ].map((f) => (
                <div key={f.t} className="flex gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand/10 text-brand">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold">{f.t}</div>
                    <div className="text-sm text-muted-foreground">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/services/robotics" className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity">
                Explore Robotics <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="relative aspect-square rounded-3xl bg-brand overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: `url(${patternAsset.url})`, backgroundSize: "220px" }}
            />
            <img src={markAsset.url} alt="Tradecode" className="absolute inset-0 m-auto h-40 w-40 object-contain animate-float" />
            <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-background/95 backdrop-blur p-5 border border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Case study</div>
              <div className="mt-1 font-display text-lg font-semibold">
                Cut manual QA cycle time 74% with agentic AI + robotic vision
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-brand-glow font-medium">
                <TrendingUp className="h-3.5 w-3.5" /> 74% efficiency improvement
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-x py-24 md:py-32">
        <motion.div {...fadeUp} className="max-w-2xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-glow">Client Reviews</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">What our clients say.</h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-7 flex flex-col justify-between gap-6 hover:border-brand/40 transition-colors"
            >
              <div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-brand-glow text-brand-glow" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground font-display font-bold text-sm">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-brand-glow ml-auto" />
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} className="mt-10 text-center">
          <Link to="/reviews" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-glow hover:opacity-80">
            See all reviews <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* Leadership */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-x py-24 md:py-32">
          <motion.div {...fadeUp} className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-glow">Leadership</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Built by operators.</h2>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { name: "Yogendra Bhardwaj", role: "Founder & CEO", bio: "Sets the strategic vision for Tradecode, leading enterprise partnerships, R&D programs and long-term product bets." },
              { name: "Anissh Kumar", role: "Co-Founder & CTO", bio: "Leads engineering, agentic AI research and the robotics practice — accountable for delivery quality and technical excellence." },
            ].map((p) => (
              <motion.div key={p.name} {...fadeUp} className="group relative rounded-2xl border border-border bg-card p-8 hover:border-brand/50 transition-colors">
                <div className="flex items-start gap-5">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-brand text-brand-foreground font-display text-xl font-bold">
                    {p.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-xl font-semibold">{p.name}</div>
                    <div className="text-sm text-brand-glow font-medium">{p.role}</div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/team" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-glow hover:opacity-80">
              Meet the full team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="container-x py-20 md:py-28 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-radial opacity-60 pointer-events-none" />
          <motion.h2 {...fadeUp} className="relative text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
            Ready to ship something remarkable?
          </motion.h2>
          <motion.p {...fadeUp} className="relative mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
            Tell us about your product, your data and your goals. We'll respond within one business day.
          </motion.p>
          <motion.div {...fadeUp} className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover:opacity-90 shadow-[0_8px_30px_-8px_var(--brand)]">
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services/consulting" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent">
              Book a consult
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
