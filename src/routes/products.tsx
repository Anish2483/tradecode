import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BatteryCharging,
  Bot,
  Zap,
  ShieldCheck,
  Radio,
  Cpu,
  Home,
  Store,
  Building2,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Layers,
  Activity,
  Gauge,
  Wifi,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageShell";
import heroProducts from "@/assets/hero-products.jpg";
import productBattery from "@/assets/product-battery.jpg";
import productMissKaur from "@/assets/product-miss-kaur.jpg";
import { products } from "@/content/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Tradecode" },
      {
        name: "description",
        content:
          "Proprietary hardware products by Tradecode: Ultra-compact TradeCell Lithium/LFP blade cell battery systems and Miss Kaur patented humanoid reception robot.",
      },
    ],
  }),
  component: ProductsPage,
});

export function ProductsPage() {
  const battery = products["tradecell-batteries"];
  const missKaur = products["miss-kaur-robot"];

  return (
    <>
      <PageHeader
        eyebrow="Proprietary Hardware"
        title={
          <>
            Engineered hardware for a{" "}
            <span className="text-gradient-brand">smarter world.</span>
          </>
        }
        description="From ultra-compact high-density blade cell energy storage systems to patented autonomous humanoid service robotics — built from the ground up by Tradecode."
        heroImage={heroProducts}
      />

      {/* ── PRODUCT 1: TRADECELL BATTERIES ────────────────────────────────────── */}
      <section id="batteries" className="container-x py-20 border-b border-border">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left: Product Media */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-2xl group">
              <img
                src={productBattery}
                alt="TradeCell Custom Smart Battery System"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/90 backdrop-blur px-3.5 py-1 text-xs font-semibold text-white shadow-md">
                  <Zap className="h-3.5 w-3.5" /> High Density Blade Cells
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/85 backdrop-blur px-3.5 py-1 text-xs font-semibold text-white border border-white/20">
                  <Radio className="h-3.5 w-3.5 text-violet-400" /> 5G IoT Enabled
                </span>
              </div>
            </div>

            {/* USP Highlight Callout */}
            <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-50/80 dark:bg-violet-950/20 p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-violet-600">
                    Core Engineering USP
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground leading-snug">
                    {battery.usp}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Product Details & Specs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-glow">
                Clean Energy Storage & Mobility
              </span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
                {battery.name}
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                {battery.description}
              </p>
            </div>

            {/* Application Pills */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Target Applications
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {battery.applications.map((app) => (
                  <div
                    key={app.title}
                    className="rounded-xl border border-border bg-card p-3.5 hover:border-brand/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                      {app.title.includes("Home") && <Home className="h-4 w-4 text-brand-glow" />}
                      {app.title.includes("Commercial") && <Store className="h-4 w-4 text-brand-glow" />}
                      {app.title.includes("Vehicle") && <Zap className="h-4 w-4 text-brand-glow" />}
                      {app.title.split(" (")[0]}
                    </div>
                    <p className="mt-1.5 text-[11px] text-muted-foreground leading-normal">
                      {app.desc.slice(0, 75)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customization Matrix */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Layers className="h-4 w-4 text-brand-glow" /> Modular Customization Options
              </div>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                {battery.options.map((opt) => (
                  <div key={opt.title} className="space-y-1">
                    <div className="font-semibold text-muted-foreground">{opt.title}</div>
                    <ul className="space-y-0.5">
                      {opt.choices.map((c) => (
                        <li key={c} className="flex items-center gap-1.5 text-foreground">
                          <CheckCircle2 className="h-3 w-3 text-brand-glow shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Warranty & CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Full Warranty & Performance Guarantee Included</span>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 hover:scale-105 transition-all"
              >
                Custom Battery Enquiry <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCT 2: MISS KAUR HUMANOID ROBOT ──────────────────────────────── */}
      <section id="miss-kaur" className="container-x py-20 border-b border-border">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left: Product Details & Specs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 order-2 lg:order-1"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-50 dark:bg-violet-950/30 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300 mb-3">
                <Award className="h-3.5 w-3.5 text-violet-600" /> {missKaur.patent}
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                {missKaur.name}
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                {missKaur.description}
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2.5">
              {missKaur.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-foreground leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            {/* Deployment Locations */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Ideal Deployment Facilities
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {missKaur.applications.map((app) => (
                  <div
                    key={app.title}
                    className="rounded-xl border border-border bg-card p-3.5 hover:border-brand/40 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-foreground">
                      <Building2 className="h-3.5 w-3.5 text-brand-glow" />
                      {app.title.split(" &")[0]}
                    </div>
                    <p className="mt-1.5 text-[11px] text-muted-foreground leading-normal">
                      {app.desc.slice(0, 75)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-muted-foreground font-medium">
                🛡️ Complete On-Site Calibration & Maintenance Support
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 hover:scale-105 transition-all"
              >
                Schedule Robot Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Product Media */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative order-1 lg:order-2"
          >
            <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-2xl group">
              <img
                src={productMissKaur}
                alt="Miss Kaur Humanoid Receptionist Robot"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/90 backdrop-blur px-3.5 py-1 text-xs font-semibold text-white shadow-md">
                  <Bot className="h-3.5 w-3.5" /> Autonomous Roaming
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/85 backdrop-blur px-3.5 py-1 text-xs font-semibold text-white border border-white/20">
                  <Award className="h-3.5 w-3.5 text-violet-400" /> Design Patented
                </span>
              </div>
            </div>

            {/* Roaming Info Desk Highlight Callout */}
            <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-50/80 dark:bg-violet-950/20 p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-violet-600">
                    Roaming Reception Desk Concept
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground leading-snug">
                    {missKaur.usp}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCT 3 / COMING SOON SECTION ─────────────────────────────────── */}
      <section className="container-x py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-violet-50/40 dark:to-violet-950/20 p-8 md:p-14 text-center relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-brand-glow mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Next-Generation Hardware in R&D
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            More Deep-Tech Products Coming Soon
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-base leading-relaxed">
            Our engineering and robotics labs in Dehradun are actively prototyping our next frontier hardware architectures. For private institutional previews and early partnership access, get in touch with our leadership.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground hover:scale-105 transition-all shadow-md"
            >
              Inquire Early Access <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
