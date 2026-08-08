import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Bot, Cpu, Sparkles, LineChart,
  Code2, Globe, GraduationCap, MessageSquare, Layers, Workflow,
  Shield, Zap, Users, Search, Lightbulb, Hammer, HeartHandshake,
  Star, CheckCircle2, TrendingUp, ChevronRight, Play
} from "lucide-react";
import { AnimatedLogo, SmallLogo } from "@/components/brand/AnimatedLogo";
import { CursorTrail } from "@/components/effects/CursorTrail";
import yogendraImg from "@/assets/tradecode.jpeg";
import ctoImg from "@/assets/myimg.jpeg";
import showcaseAiDashboard from "@/assets/showcase-ai-dashboard.jpg";
import showcaseRobotics from "@/assets/showcase-robotics.jpg";
import showcaseChatbot from "@/assets/showcase-chatbot.jpg";
import showcaseIot from "@/assets/showcase-iot.jpg";

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

// ─── Aurora Gradient Orbs (ChatGPT Codex-style floating blobs) ─────────────
function AuroraOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Violet blob — top-left */}
      <div className="aurora-orb aurora-orb-1" style={{
        width: "800px", height: "800px",
        background: "radial-gradient(circle at center, rgba(124,58,237,0.38) 0%, rgba(167,139,250,0.18) 45%, transparent 70%)",
        top: "-20%", left: "-15%",
      }} />
      {/* Amber/Gold blob — bottom-right */}
      <div className="aurora-orb aurora-orb-2" style={{
        width: "700px", height: "700px",
        background: "radial-gradient(circle at center, rgba(245,158,11,0.28) 0%, rgba(251,191,36,0.12) 40%, transparent 70%)",
        bottom: "-18%", right: "-12%",
      }} />
      {/* Indigo blob — top-right */}
      <div className="aurora-orb aurora-orb-3" style={{
        width: "580px", height: "580px",
        background: "radial-gradient(circle at center, rgba(79,70,229,0.22) 0%, rgba(99,102,241,0.1) 50%, transparent 70%)",
        top: "15%", right: "-8%",
      }} />
      {/* Rose accent blob — center-left */}
      <div className="aurora-orb aurora-orb-4" style={{
        width: "480px", height: "480px",
        background: "radial-gradient(circle at center, rgba(236,72,153,0.16) 0%, rgba(251,113,133,0.06) 50%, transparent 70%)",
        top: "45%", left: "15%",
      }} />
    </div>
  );
}


// ─── Animated counter ───────────────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 2000 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = duration / to;
    const timer = setInterval(() => {
      start += Math.ceil(to / 60);
      if (start >= to) { setCount(to); clearInterval(timer); } else { setCount(start); }
    }, step);
    return () => clearInterval(timer);
  }, [inView, to, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Section fade-in wrapper ─────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const services = [
  { icon: Bot,           title: "Agentic AI & Automation",     desc: "Multi-agent orchestration, n8n workflows, and custom AI pipelines that run 24/7.",            to: "/services/agentic-ai" },
  { icon: Sparkles,      title: "Generative AI",                desc: "Fine-tuned LLMs, RAG systems and production GenAI applications at enterprise scale.",          to: "/services/generative-ai" },
  { icon: Cpu,           title: "Robotics",                     desc: "Custom industrial robotics and vision systems for manufacturing and logistics.",                to: "/services/robotics" },
  { icon: MessageSquare, title: "AI Chatbots",                  desc: "Custom-trained chatbots on your data with end-to-end API integration and analytics.",          to: "/services/chatbots" },
  { icon: LineChart,     title: "Data Science & Analytics",     desc: "Pipelines, dashboards and insight systems built by senior data scientists.",                    to: "/services/data-science" },
  { icon: Code2,         title: "Software Development",         desc: "Custom software for scale-ups and enterprises — built to last.",                              to: "/services/software" },
  { icon: Globe,         title: "Web Development",              desc: "Premium web platforms with full stack customization and modern UX.",                            to: "/services/web" },
  { icon: Layers,        title: "Machine Learning / DL",        desc: "Applied ML and deep learning producing measurable business outcomes.",                         to: "/services/ml-dl" },
  { icon: Workflow,      title: "Consulting",                   desc: "AI strategy, R&D roadmaps and proprietary product development consulting.",                    to: "/services/consulting" },
  { icon: GraduationCap,title: "Industry Training",             desc: "Corporate and institutional training programs led by super-experts.",                          to: "/services/training" },
];

const stats = [
  { value: 120, suffix: "+", label: "Enterprise Clients" },
  { value: 40,  suffix: "M+", label: "Automated Workflow Runs" },
  { value: 18,  suffix: "",   label: "Countries Served" },
  { value: 99,  suffix: ".98%", label: "Production Uptime SLA" },
];

const process = [
  { icon: Search,         n: "01", title: "Discover",  desc: "We audit your workflows, data and business goals to find the highest-impact AI and automation opportunities." },
  { icon: Lightbulb,      n: "02", title: "Design",    desc: "Senior architects produce a full system design — stack, integrations, data flows and success metrics." },
  { icon: Hammer,         n: "03", title: "Build",     desc: "Our engineering team ships production-grade code with full documentation and test coverage." },
  { icon: HeartHandshake, n: "04", title: "Support",   desc: "We remain on call for the full product lifecycle — maintenance, upgrades and ongoing technical support." },
];

const testimonials = [
  { quote: "Tradecode cut our manual QA cycle time by 74% using agentic AI and robotic vision. World-class delivery.", name: "Arjun Mehta",  role: "CTO, ScaleOps India",  rating: 5 },
  { quote: "Their data science team built our entire analytics platform in 6 weeks. Senior engineers, zero hand-holding.", name: "Priya Nair", role: "Head of Data, Northwind AI", rating: 5 },
  { quote: "The chatbot handles 80% of our support tickets autonomously. ROI was visible in the first month.", name: "Rohan Singh",  role: "Founder, Kairos Data",  rating: 5 },
];

const partners = [
  "NeuralForge", "Helix Robotics", "Kairos Data", "Vertex Labs", "Northwind AI",
  "OrbitStack", "Prism Analytics", "Quanta Systems", "Sentinel Cloud", "Meridian Tech",
  "DeepVision", "AeroLogix", "DataCore", "CipherAI", "FusionTech",
];

const showcaseProjects = [
  { image: showcaseAiDashboard, title: "NeuralForge Analytics",    category: "Agentic AI",     desc: "Real-time AI analytics dashboard with predictive insights" },
  { image: showcaseRobotics,    title: "Helix Robotics Control",   category: "Robotics",       desc: "Industrial robotic arm control and monitoring platform" },
  { image: showcaseChatbot,     title: "Kairos Support Agent",     category: "Conversational AI", desc: "Autonomous customer support chatbot with sentiment analysis" },
  { image: showcaseIot,         title: "Meridian IoT Monitor",     category: "IoT / Hardware",  desc: "Smart factory sensor monitoring and predictive maintenance" },
];

// ─── Component ───────────────────────────────────────────────────────────────
function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">
        {/* Watermark animation video background — high intensity, zoomed out 10% */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 flex items-center justify-center">
          <video
            src={`${import.meta.env.BASE_URL}tradecode-animation.mp4`}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-90"
          />
        </div>

        {/* Particle animation — contained to hero only */}
        <CursorTrail />
        {/* Aurora orb background — ChatGPT Codex style */}
        <AuroraOrbs />

        {/* Architectural dot grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-grid" />

        {/* Top gradient bar */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative container-x pt-20 pb-16 md:pt-32 md:pb-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-[1px] w-12 bg-violet-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                  Agentic AI · Robotics · Automation
                </span>
              </motion.div>

              {/* Headline — Aurora Studio editorial style */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.8rem,6vw,5.5rem)] font-light leading-[1.04] tracking-tight text-gray-900"
              >
                Building intelligent<br />
                solutions for a{" "}
                <span className="text-gradient-brand">smarter</span><br />
                tomorrow.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="mt-8 max-w-2xl text-lg text-gray-500 leading-relaxed font-light"
              >
                Tradecode empowers businesses with AI, Automation, Data Science, Robotics
                and scalable digital solutions — engineered by senior operators, documented
                and supported for the long term.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 px-7 py-4 bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-4 border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 hover:border-violet-400 transition-all"
                >
                  Book a Consultation
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-12 flex items-center gap-5 border-t border-gray-200 pt-8"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">4.9 / 5 rating</div>
                  <div className="text-xs text-gray-400">from 100+ enterprise clients</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-sm text-gray-500 font-light">
                  Trusted across <span className="text-gray-900 font-medium">18 countries</span>
                </div>
              </motion.div>
            </div>

            {/* Logo visual — animated logo video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-col items-center gap-6"
            >
              {/* Glow halo & video container */}
              <div className="relative group">
                <div className="absolute inset-[-15%] rounded-3xl animate-glow-pulse pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)", filter: "blur(24px)" }} />
                <div className="relative w-[340px] h-[220px] rounded-2xl overflow-hidden border border-violet-200/80 shadow-2xl shadow-violet-500/10 bg-white">
                  <video
                    src={`${import.meta.env.BASE_URL}tradecode-animation.mp4`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating data cards around logo */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="bg-white border border-violet-100 px-5 py-3 text-left shadow-lg shadow-violet-100/50 rounded-xl"
              >
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Live Production</div>
                <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  40M+ automated runs / month
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="h-10 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
          <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* ── PARTNER MARQUEE ────────────────────────────────────────────────── */}
      <section className="bg-[#0d1120] border-y border-white/6 py-6 overflow-hidden">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25 mb-5">
          Trusted by teams building the next generation of technology
        </p>
        <div className="flex">
          <div className="flex shrink-0 items-center gap-16 whitespace-nowrap animate-marquee">
            {[...partners, ...partners].map((p, i) => (
              <span key={i} className="text-base font-light text-white/30 hover:text-white/60 transition-colors tracking-wide">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0a0e1a] border-b border-white/6">
        <div className="container-x py-20 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="border-l border-white/8 px-8 py-8 first:border-l-0"
            >
              <div className="text-[clamp(2.2rem,4vw,3.5rem)] font-light tracking-tight text-[#4589ff] leading-none">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs text-white/40 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section className="bg-[#0d1120] border-b border-white/6">
        <div className="container-x py-24">
          <motion.div {...fadeUp} className="mb-16 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78a9ff] mb-4">Services</p>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
              One partner.<br />The full deep-tech stack.
            </h2>
            <p className="mt-5 text-white/50 leading-relaxed">
              From agentic AI and robotics to data platforms and executive training — we design,
              build and operate systems that move your business forward.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
              >
                <Link
                  to={s.to}
                  className="group flex flex-col justify-between h-full bg-[#0d1120] p-8 hover:bg-[#111827] transition-colors"
                >
                  <div>
                    <div className="grid h-10 w-10 place-items-center bg-[#0f62fe]/10 border border-[#0f62fe]/30 mb-6 group-hover:bg-[#0f62fe]/20 transition-colors">
                      <s.icon className="h-4.5 w-4.5 text-[#4589ff]" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-3">{s.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-[#4589ff] group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white text-sm hover:bg-white/5 transition-colors"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── HOW WE WORK ────────────────────────────────────────────────────── */}
      <section className="bg-[#0a0e1a] border-b border-white/6">
        <div className="container-x py-24">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78a9ff] mb-4">Our Process</p>
            <h2 className="text-4xl md:text-5xl font-light text-white">How we work</h2>
            <p className="mt-4 text-white/50">
              A disciplined 4-step process — every project ships on time, on scope, fully documented.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
            {process.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative bg-[#0a0e1a] p-8 hover:bg-[#0d1120] transition-colors"
              >
                <div className="text-[5rem] font-light text-white/4 absolute top-4 right-6 leading-none select-none">{p.n}</div>
                <div className="grid h-10 w-10 place-items-center border border-[#0f62fe]/30 bg-[#0f62fe]/8 mb-6">
                  <p.icon className="h-4.5 w-4.5 text-[#4589ff]" />
                </div>
                <h3 className="text-base font-semibold text-white mb-3">{p.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROBOTICS FEATURE ───────────────────────────────────────────────── */}
      <section className="bg-[#0d1120] border-b border-white/6">
        <div className="container-x py-24 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78a9ff] mb-5">Flagship Focus</p>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
              Robotics + AI,<br />made for real<br />businesses.
            </h2>
            <p className="mt-6 text-white/55 leading-relaxed">
              Our robotics lab and automation practice deliver systems that measurably reduce cost,
              defects and cycle time — from custom industrial robotics to end-to-end agentic workflows.
            </p>

            <div className="mt-10 space-y-6">
              {[
                { icon: Shield, t: "Formal agreements on every engagement", d: "No project starts without a signed agreement — clean scope, IP and SLAs protected." },
                { icon: Zap, t: "Full documentation before & after delivery", d: "Technical documentation pre-deploy and post-deploy, every time." },
                { icon: Users, t: "Lifetime technical support included", d: "Maintenance, upgrades and support for the full product lifecycle." },
              ].map((f) => (
                <div key={f.t} className="flex gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center border border-[#0f62fe]/30 bg-[#0f62fe]/8">
                    <f.icon className="h-4 w-4 text-[#4589ff]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{f.t}</div>
                    <div className="text-sm text-white/45 mt-1">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/services/robotics"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f62fe] text-white text-sm font-semibold hover:bg-[#0353e9] transition-colors"
              >
                Explore Robotics <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Case study card */}
          <motion.div
            {...fadeUp}
            className="relative bg-[#0a0e1a] border border-white/8 overflow-hidden"
          >
            {/* Particle overlay in card */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: "repeating-linear-gradient(-45deg, rgba(69,137,255,0.04) 0px, rgba(69,137,255,0.04) 1px, transparent 1px, transparent 30px)" }} />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(15,98,254,0.15) 0%, transparent 70%)", filter: "blur(30px)" }} />

            <div className="relative p-12 flex flex-col items-center text-center">
              <motion.div
                className="mb-8"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <SmallLogo height={100} />
              </motion.div>
              <div className="text-[clamp(3rem,5vw,4rem)] font-light text-[#4589ff] leading-none tracking-tight">74%</div>
              <div className="mt-2 text-sm text-white/50">reduction in QA cycle time</div>
              <div className="mt-6 border-t border-white/8 pt-6 text-xs text-white/35 uppercase tracking-wider">
                Client Case Study — Manufacturing Automation
              </div>
              <div className="mt-4 flex items-center gap-2 text-[#42be65] text-sm">
                <TrendingUp className="h-4 w-4" />
                74% efficiency improvement via agentic AI + robotic vision
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="bg-[#0a0e1a] border-b border-white/6">
        <div className="container-x py-24">
          <motion.div {...fadeUp} className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78a9ff] mb-4">Client Feedback</p>
            <h2 className="text-4xl md:text-5xl font-light text-white">What our clients say.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-white/6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-[#0a0e1a] p-8 hover:bg-[#0d1120] transition-colors"
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-[#4589ff] text-[#4589ff]" />
                  ))}
                </div>
                <p className="text-sm text-white/65 leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/6">
                  <div className="grid h-8 w-8 shrink-0 place-items-center bg-[#0f62fe] text-white text-xs font-semibold">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-[#42be65] ml-auto" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-8">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-sm text-[#4589ff] hover:text-[#78a9ff] transition-colors">
              See all reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── LEADERSHIP ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0d1120] border-b border-white/6">
        <div className="container-x py-24">
          <motion.div {...fadeUp} className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78a9ff] mb-4">Leadership</p>
            <h2 className="text-4xl md:text-5xl font-light text-white">Built by operators.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-white/6">
            {[
              { name: "Yogendra Bhardwaj", role: "Founder & CEO", bio: "Sets the strategic vision for Tradecode — leading enterprise partnerships, R&D programs and long-term product bets.", image: yogendraImg },
              { name: "Anissh Kumar", role: "Co-Founder & CTO", bio: "Leads engineering, agentic AI research and the robotics practice — accountable for delivery quality and technical excellence.", image: ctoImg },
            ].map((p) => (
              <motion.div
                key={p.name}
                {...fadeUp}
                className="bg-[#0d1120] p-10 hover:bg-[#111827] transition-colors"
              >
                <div className="flex items-start gap-5">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="h-14 w-14 shrink-0 object-cover object-top" />
                  ) : (
                    <div className="grid h-14 w-14 shrink-0 place-items-center bg-[#0f62fe] text-white font-semibold text-lg">
                      {p.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                  <div>
                    <div className="text-xl font-semibold text-white">{p.name}</div>
                    <div className="text-sm text-[#4589ff] font-medium mt-0.5">{p.role}</div>
                    <p className="mt-4 text-sm text-white/55 leading-relaxed">{p.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Link to="/team" className="inline-flex items-center gap-2 text-sm text-[#4589ff] hover:text-[#78a9ff] transition-colors">
              Meet the full team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MADE WITH TRADECODE (Squarespace-style showcase) ──────────────────── */}
      <section className="relative py-28 md:py-36 bg-[#f5f3ff] overflow-hidden">
        {/* Section heading */}
        <div className="container-x text-center mb-16">
          <motion.p
            {...fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500 mb-4"
          >
            Portfolio
          </motion.p>
          <motion.h2
            {...fadeUp}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-light tracking-tight text-gray-900 leading-[1.1]"
          >
            Made with{" "}
            <span className="text-violet-600 font-medium">Tradecode</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            className="mt-5 text-gray-500 max-w-lg mx-auto text-base leading-relaxed"
          >
            Real products we've shipped for founders and enterprises — from agentic AI dashboards to industrial robotics platforms.
          </motion.p>
        </div>

        {/* Auto-scrolling marquee — Squarespace showcase style */}
        <div className="relative w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#f5f3ff] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#f5f3ff] to-transparent z-10 pointer-events-none" />

          {/* Row 1 — scroll left */}
          <div className="flex gap-6 mb-6 animate-marquee" style={{ width: "max-content" }}>
            {[...showcaseProjects, ...showcaseProjects].map((project, i) => (
              <div
                key={`row1-${i}`}
                className="group relative w-[340px] md:w-[420px] shrink-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-300 mb-1">{project.category}</span>
                  <h3 className="text-lg font-medium text-white">{project.title}</h3>
                  <p className="text-sm text-white/70 mt-1">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 — scroll right (reverse) */}
          <div className="flex gap-6 animate-marquee" style={{ width: "max-content", animationDirection: "reverse", animationDuration: "60s" }}>
            {[...showcaseProjects.slice().reverse(), ...showcaseProjects.slice().reverse()].map((project, i) => (
              <div
                key={`row2-${i}`}
                className="group relative w-[340px] md:w-[420px] shrink-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-300 mb-1">{project.category}</span>
                  <h3 className="text-lg font-medium text-white">{project.title}</h3>
                  <p className="text-sm text-white/70 mt-1">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────  */}
      <section className="relative bg-[#0f62fe] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 30px)" }} />
        <div className="absolute right-0 top-0 w-[500px] h-full pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(3,83,233,0.6), transparent)" }} />

        <div className="relative container-x py-24 grid md:grid-cols-2 items-center gap-12">
          <div>
            <motion.h2
              {...fadeUp}
              className="text-4xl md:text-5xl font-light text-white leading-tight"
            >
              Ready to ship something remarkable?
            </motion.h2>
            <motion.p {...fadeUp} className="mt-5 text-white/70 leading-relaxed">
              Tell us about your product, your data and your goals. We'll respond within one business day.
            </motion.p>
          </div>
          <motion.div {...fadeUp} className="flex flex-wrap gap-4 md:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white text-[#0f62fe] text-sm font-semibold hover:bg-[#e8f1ff] transition-colors"
            >
              Start a Project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services/consulting"
              className="inline-flex items-center gap-2 px-7 py-4 border border-white/30 text-white text-sm hover:bg-white/10 transition-colors"
            >
              Book a Consult
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
