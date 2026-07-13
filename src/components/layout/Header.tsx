import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

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
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
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
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border/80 bg-background/95 backdrop-blur-xl shadow-sm"
          : "border-border/40 bg-background/70 backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-16 items-center gap-4">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 ml-6" aria-label="Main navigation">
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
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/50"
            >
              Services
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 top-full pt-2 w-72 z-50"
                >
                  <div className="rounded-xl border border-border bg-popover shadow-2xl p-2 backdrop-blur-xl">
                    {services.map((s) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        onClick={() => setServicesOpen(false)}
                        className="group flex items-center justify-between rounded-md px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                      >
                        <span>{s.label}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/50"
              activeProps={{ className: "relative px-3 py-2 text-sm font-medium text-foreground rounded-md bg-accent/60" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Get in Touch
          </Link>
          <Link
            to="/become-partner"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity shadow-[0_4px_16px_-4px_var(--brand)]"
          >
            Become a Partner
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-accent transition-colors"
            onClick={() => setOpen(!open)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border bg-background/98 backdrop-blur-xl"
          >
            <div className="container-x py-4 flex flex-col gap-1">
              <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Services</p>
              {services.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="px-3 py-2.5 rounded-md text-sm hover:bg-accent transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
              <div className="my-2 border-t border-border" />
              <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Company</p>
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="px-3 py-2.5 rounded-md text-sm hover:bg-accent transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
              <div className="my-2 border-t border-border" />
              <Link
                to="/become-partner"
                className="mx-3 mt-1 flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground"
                onClick={() => setOpen(false)}
              >
                Become a Partner
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
