import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SmallLogo } from "@/components/brand/AnimatedLogo";

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
  { label: "Products", to: "/products" },
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
          ? "bg-white/96 backdrop-blur-xl border-b border-gray-200 shadow-sm"
          : "bg-white/80 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      {/* Top thin brand line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

      <div className="container-x flex h-14 items-center gap-6">
        {/* Tradecode Logo */}
        <Link to="/" aria-label="Tradecode home" className="flex items-center gap-3 shrink-0">
          <SmallLogo height={34} />
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
              className="flex items-center gap-1.5 px-4 py-4 text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors border-b-2 border-transparent hover:border-violet-500"
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
                  <div className="bg-white border border-gray-200 shadow-xl shadow-gray-100/80">
                    {services.map((s, i) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        onClick={() => setServicesOpen(false)}
                        className="group flex items-center justify-between px-5 py-3.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-violet-50 border-b border-gray-100 last:border-0 transition-all"
                      >
                        <span>{s.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[#4589ff]" />
                      </Link>
                    ))}
                    <div className="px-5 py-3 border-t border-gray-100 bg-violet-50">
                      <Link
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-2 text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors uppercase tracking-wider"
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
              className="px-4 py-4 text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors border-b-2 border-transparent hover:border-violet-500"
              activeProps={{ className: "px-4 py-4 text-sm font-normal text-violet-700 border-b-2 border-violet-500" }}
            >
              {n.label}
            </Link>
          ))}

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="px-4 py-2 text-sm font-normal text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-violet-400 transition-all hover:bg-violet-50"
            >
              Contact
            </Link>
            <Link
              to="/become-partner"
              className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-all shadow-md shadow-violet-200"
            >
              Become a Partner
            </Link>
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex-1 lg:hidden" />
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="lg:hidden grid h-9 w-9 place-items-center text-gray-600 hover:text-gray-900 transition-colors"
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
            className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="py-4 flex flex-col">
              <p className="px-6 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">Services</p>
              {services.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="px-6 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-violet-50 transition-colors border-b border-gray-100"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
              <p className="px-6 py-2 mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">Company</p>
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="px-6 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-violet-50 transition-colors border-b border-gray-100"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
              <div className="px-6 pt-4 pb-2 flex flex-col gap-2">
                <Link
                  to="/contact"
                  className="py-3 text-sm text-center text-gray-700 border border-gray-300 hover:bg-violet-50 hover:border-violet-400 transition-all"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/become-partner"
                  className="py-3 text-sm font-semibold text-center text-white bg-violet-600"
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
