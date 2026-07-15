import { Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Tradecode logo — uploaded by user
import logoUrl from "@/assets/tradecode-logo.png.asset.json";

const services = [
  { label: "Agentic AI & Automation", to: "/services/agentic-ai" },
  { label: "Generative AI", to: "/services/generative-ai" },
  { label: "Robotics", to: "/services/robotics" },
  { label: "AI Chatbots", to: "/services/chatbots" },
  { label: "Data Science & Analytics", to: "/services/data-science" },
  { label: "Software Development", to: "/services/software" },
  { label: "Web Development", to: "/services/web" },
  { label: "Machine Learning / DL", to: "/services/ml-dl" },
  { label: "Consulting", to: "/services/consulting" },
  { label: "Training", to: "/services/training" },
];

const nav = [
  { label: "About", to: "/about" },
  { label: "R&D", to: "/rnd" },
  { label: "Partners", to: "/partners" },
  { label: "Blog", to: "/blog" },
  { label: "Careers", to: "/careers" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/8 shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-[#0a0e1a]/80 backdrop-blur-md border-b border-white/5"
      }`}
    >
      {/* Top thin brand line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#4589ff] to-transparent opacity-60" />

      <div className="container-x flex h-14 items-center gap-6">
        {/* Tradecode Logo */}
        <Link to="/" aria-label="Tradecode home" className="flex items-center gap-3 shrink-0">
          <img src={logoUrl.url} alt="Tradecode" className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center flex-1" aria-label="Main navigation">
          {/* Services dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className="flex items-center gap-1.5 px-4 py-4 text-sm font-normal text-white/70 hover:text-white transition-colors border-b-2 border-transparent hover:border-[#4589ff]"
            >
              Services
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute left-0 top-full w-80 z-50"
                >
                  <div className="bg-[#161b2e] border border-white/10 shadow-2xl shadow-black/60">
                    {services.map((s, i) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        onClick={() => setServicesOpen(false)}
                        className="group flex items-center justify-between px-5 py-3.5 text-sm text-white/70 hover:text-white hover:bg-white/5 border-b border-white/5 last:border-0 transition-all"
                      >
                        <span>{s.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[#4589ff]" />
                      </Link>
                    ))}
                    <div className="px-5 py-3 border-t border-white/8 bg-[#0f62fe]/10">
                      <Link
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-2 text-xs font-semibold text-[#78a9ff] hover:text-white transition-colors uppercase tracking-wider"
                      >
                        View All Services <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-4 text-sm font-normal text-white/70 hover:text-white transition-colors border-b-2 border-transparent hover:border-[#4589ff]"
              activeProps={{ className: "px-4 py-4 text-sm font-normal text-white border-b-2 border-[#4589ff]" }}
            >
              {n.label}
            </Link>
          ))}

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="px-4 py-2 text-sm font-normal text-white/80 hover:text-white border border-white/20 hover:border-white/50 transition-all"
            >
              Contact
            </Link>
            <Link
              to="/become-partner"
              className="px-4 py-2 text-sm font-semibold text-white bg-[#0f62fe] hover:bg-[#0353e9] transition-colors"
            >
              Become a Partner
            </Link>
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex-1 lg:hidden" />
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="lg:hidden grid h-9 w-9 place-items-center text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-white/8 bg-[#0a0e1a]"
          >
            <div className="py-4 flex flex-col">
              <p className="px-6 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">Services</p>
              {services.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="px-6 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
              <p className="px-6 py-2 mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">Company</p>
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="px-6 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
              <div className="px-6 pt-4 pb-2 flex flex-col gap-2">
                <Link
                  to="/contact"
                  className="py-3 text-sm text-center text-white border border-white/20"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/become-partner"
                  className="py-3 text-sm font-semibold text-center text-white bg-[#0f62fe]"
                  onClick={() => setOpen(false)}
                >
                  Become a Partner
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
