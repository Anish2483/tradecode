import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Bot,
  ShieldCheck,
  Radio,
  Building2,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Camera,
  Car,
  CreditCard,
  Sliders,
  ScanLine,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Home,
  Store,
  Video,
  Eye,
  Server,
  KeyRound,
  Compass,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageShell";
import heroProducts from "@/assets/hero-products.jpg";
import productBattery from "@/assets/product-battery.jpg";
import productMissKaur from "@/assets/product-miss-kaur.jpg";
import productScanner from "@/assets/product-scanner.jpg";
import productLvd from "@/assets/product-lvd.jpg";
import productParking from "@/assets/product-parking.jpg";
import productProximity from "@/assets/product-proximity.jpg";
import productPtz from "@/assets/product-ptz.jpg";
import { products, productCategories, ProductItem } from "@/content/products";

const productImages: Record<string, string> = {
  tradecell: productBattery,
  "miss-kaur": productMissKaur,
  scanner: productScanner,
  "lvd-controller": productLvd,
  parking: productParking,
  proximity: productProximity,
  "ptz-camera": productPtz,
};

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Hardware Products & Solutions — Tradecode" },
      {
        name: "description",
        content:
          "Enterprise hardware catalog by Tradecode: Custom Lithium/LFP Blade Cell Batteries, Miss Kaur Patented Humanoid Robot, 100*100 X-Ray Baggage Scanners, SISPL LVD Controllers, Smart Parking Guidance, Proximity RFID Readers, and Robotic PTZ Cameras.",
      },
    ],
  }),
  component: ProductsPage,
});

export function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({
    tradecell: true,
    scanner: true,
  });

  const toggleSpecs = (id: string) => {
    setExpandedSpecs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const productList = Object.values(products);
  const filteredProducts =
    activeCategory === "all"
      ? productList
      : productList.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHeader
        eyebrow="Commercial & Enterprise Hardware"
        title={
          <>
            Precision hardware engineered for{" "}
            <span className="text-gradient-brand">mission-critical scale.</span>
          </>
        }
        description="Explore our portfolio of energy storage systems, autonomous service robotics, security inspection scanners, intelligent power controllers, smart mobility, and access infrastructure."
        heroImage={heroProducts}
      />

      {/* ── CATEGORY FILTER TABS ──────────────────────────────────────────────── */}
      <section className="sticky top-14 z-30 bg-background/90 backdrop-blur-md border-b border-border py-4">
        <div className="container-x flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar">
          {productCategories.map((cat) => {
            const count =
              cat.id === "all"
                ? productList.length
                : productList.filter((p) => p.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand text-brand-foreground shadow-md shadow-brand/20 scale-105"
                    : "bg-card text-muted-foreground border border-border hover:border-brand/40 hover:text-foreground"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── PRODUCTS SHOWCASE LIST ────────────────────────────────────────────── */}
      <div className="divide-y divide-border">
        {filteredProducts.map((p, index) => {
          const isEven = index % 2 === 0;
          const imgSrc = productImages[p.id] || p.image;
          const isSpecsOpen = expandedSpecs[p.id] ?? false;

          return (
            <section key={p.id} id={p.slug} className="container-x py-20 scroll-mt-28">
              <div className="grid gap-12 lg:grid-cols-12 items-start">
                {/* ── Product Media Column ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`lg:col-span-6 relative ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-2xl group">
                    <img
                      src={imgSrc}
                      alt={p.name}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/90 backdrop-blur px-3.5 py-1 text-xs font-semibold text-white shadow-md">
                        {p.category === "energy" && <Zap className="h-3.5 w-3.5" />}
                        {p.category === "robotics" && <Bot className="h-3.5 w-3.5" />}
                        {p.category === "security" && <ShieldCheck className="h-3.5 w-3.5" />}
                        {p.category === "access" && <KeyRound className="h-3.5 w-3.5" />}
                        {p.badge}
                      </span>
                      {p.patent && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 backdrop-blur px-3 py-1 text-xs font-semibold text-violet-300 border border-violet-400/30">
                          <Award className="h-3.5 w-3.5 text-violet-400" /> Patented
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Core USP Callout Box */}
                  <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-50/80 dark:bg-violet-950/20 p-5">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-violet-600">
                          Key Advantage & USP
                        </div>
                        <p className="mt-1 text-sm font-medium text-foreground leading-snug">
                          {p.usp}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Options Matrix (if applicable, e.g. for batteries) */}
                  {p.options && (
                    <div className="mt-5 rounded-2xl border border-border bg-card p-5 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <Layers className="h-4 w-4 text-brand-glow" /> Configurable Options
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3 text-xs">
                        {p.options.map((opt) => (
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
                  )}

                  {/* LVD Calibration Table (for SISPL Controller) */}
                  {p.calibration && (
                    <div className="mt-5 rounded-2xl border border-border bg-card p-5 space-y-3 overflow-x-auto">
                      <div className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <SlidersHorizontal className="h-4 w-4 text-brand-glow" /> Programmable Thresholds (LVD / Latch)
                      </div>
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-border text-muted-foreground">
                            <th className="py-2 pr-4 font-semibold">Parameter</th>
                            <th className="py-2 px-2 font-semibold">Min</th>
                            <th className="py-2 px-2 font-semibold">Max</th>
                            <th className="py-2 pl-4 font-semibold">Default</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {p.calibration.map((row) => (
                            <tr key={row.parameter}>
                              <td className="py-2 pr-4 font-medium text-foreground">{row.parameter}</td>
                              <td className="py-2 px-2 text-muted-foreground">{row.minVal}</td>
                              <td className="py-2 px-2 text-muted-foreground">{row.maxVal}</td>
                              <td className="py-2 pl-4 font-semibold text-brand-glow">{row.defaultVal}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="text-[11px] text-muted-foreground pt-1">
                        🔘 3-Button User Interface: <strong>SW1</strong> (Increment), <strong>SW2</strong> (Decrement), <strong>SW3</strong> (Enter/Save).
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* ── Product Info Column ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`lg:col-span-6 space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-glow">
                      {p.categoryLabel}
                    </span>
                    <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
                      {p.name}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-violet-600 dark:text-violet-400">
                      {p.tagline}
                    </p>
                    <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Key Capabilities & Specifications
                    </div>
                    {p.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <div className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand shrink-0 mt-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-foreground leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Full Technical Specs Table */}
                  <div className="rounded-2xl border border-border bg-card overflow-hidden">
                    <button
                      onClick={() => toggleSpecs(p.id)}
                      className="w-full flex items-center justify-between p-4 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-brand-glow" /> Full Technical Specifications ({p.specs.length})
                      </span>
                      {isSpecsOpen ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>

                    {isSpecsOpen && (
                      <div className="p-4 pt-0 border-t border-border">
                        <div className="grid gap-2 sm:grid-cols-2 text-xs pt-3">
                          {p.specs.map((spec) => (
                            <div key={spec.label} className="p-2.5 rounded-lg bg-muted/40 border border-border/50">
                              <div className="text-muted-foreground font-medium text-[11px]">{spec.label}</div>
                              <div className="font-semibold text-foreground mt-0.5">{spec.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Target Application Cards */}
                  {p.applications && p.applications.length > 0 && (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        Recommended Deployments & Use Cases
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {p.applications.map((app) => (
                          <div
                            key={app.title}
                            className="rounded-xl border border-border bg-card p-3.5 hover:border-brand/40 transition-colors"
                          >
                            <div className="flex items-center gap-1.5 font-semibold text-xs text-foreground">
                              <Building2 className="h-3.5 w-3.5 text-brand-glow shrink-0" />
                              <span className="truncate">{app.title.split(" (")[0]}</span>
                            </div>
                            <p className="mt-1.5 text-[11px] text-muted-foreground leading-normal">
                              {app.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Warranty & Inquire CTA */}
                  <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{p.warranty || "Comprehensive Manufacturer Warranty & Technical Support"}</span>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 hover:scale-105 transition-all shrink-0"
                    >
                      Inquire / Request Quote <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── CUSTOM HARDWARE & SOURCING CONSULTATION CTA ──────────────────────── */}
      <section className="container-x py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-violet-50/40 dark:to-violet-950/20 p-8 md:p-14 text-center relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-brand-glow mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Custom Procurement & Integration Support
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Need Custom Specifications or Turnkey Installation?
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-base leading-relaxed">
            Whether you require tailored battery pack capacities, facility calibration for baggage inspection systems, or fleet deployment for Miss Kaur humanoid robots, our engineering team provides end-to-end consulting, technical documentation, and on-site commissioning.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground hover:scale-105 transition-all shadow-md"
            >
              Talk to Our Hardware Engineers <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services/consulting"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-accent/50 transition-all"
            >
              Book Technical Consultation
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
