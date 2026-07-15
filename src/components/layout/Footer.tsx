import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Linkedin, Twitter, Youtube, Github } from "lucide-react";
import { SmallLogo } from "@/components/brand/AnimatedLogo";

const footerNav = [
  {
    title: "Services",
    links: [
      { label: "Agentic AI & Automation", to: "/services/agentic-ai" },
      { label: "Generative AI", to: "/services/generative-ai" },
      { label: "Robotics", to: "/services/robotics" },
      { label: "AI Chatbots", to: "/services/chatbots" },
      { label: "Data Science", to: "/services/data-science" },
      { label: "Software Development", to: "/services/software" },
      { label: "Web Development", to: "/services/web" },
      { label: "ML / Deep Learning", to: "/services/ml-dl" },
      { label: "Consulting", to: "/services/consulting" },
      { label: "Training", to: "/services/training" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Tradecode", to: "/about" },
      { label: "Leadership Team", to: "/team" },
      { label: "R&D Program", to: "/rnd" },
      { label: "Partners", to: "/partners" },
      { label: "Become a Partner", to: "/become-partner" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Client Reviews", to: "/reviews" },
      { label: "Gallery", to: "/gallery" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", to: "/legal/terms" },
      { label: "Privacy Policy", to: "/legal/privacy" },
      { label: "Terms of Use", to: "/legal/terms-of-use" },
      { label: "Disclaimer", to: "/legal/disclaimer" },
    ],
  },
];

const social = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/tradecode" },
  { icon: Twitter,  label: "Twitter / X", href: "https://twitter.com/tradecode" },
  { icon: Youtube,  label: "YouTube", href: "https://youtube.com/@tradecode" },
  { icon: Github,   label: "GitHub", href: "https://github.com/Anish2483/tradecode" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0e1a] text-white/70 border-t border-white/8">
      {/* CTA strip */}
      <div className="border-b border-white/8">
        <div className="container-x py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#78a9ff] mb-3">
              Start today
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
              Ready to build something remarkable?
            </h2>
            <p className="mt-3 text-white/60 text-sm leading-relaxed max-w-lg">
              Tell us about your AI, automation or robotics challenge. We respond within one business day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f62fe] text-white text-sm font-semibold hover:bg-[#0353e9] transition-colors"
            >
              Start a Project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services/consulting"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm hover:bg-white/5 transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="container-x py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {footerNav.map((col) => (
          <div key={col.title}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-5">
              {col.title}
            </p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-x py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
          <SmallLogo height={28} className="opacity-70" />
            <span className="text-xs text-white/30">
              © {new Date().getFullYear()} Tradecode Innovations Pvt. Ltd. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-3">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-8 w-8 place-items-center text-white/30 hover:text-white border border-white/10 hover:border-white/30 transition-all"
              >
                <s.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
