import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Twitter, Linkedin, Instagram, Facebook, Youtube, Mail, MapPin, ArrowRight } from "lucide-react";

const socials = [
  { Icon: Twitter,   label: "Twitter",   href: "https://twitter.com/tradecode_in" },
  { Icon: Linkedin,  label: "LinkedIn",  href: "https://linkedin.com/company/tradecode-innovations" },
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com/tradecode.in" },
  { Icon: Facebook,  label: "Facebook",  href: "https://facebook.com/tradecode.in" },
  { Icon: Youtube,   label: "YouTube",   href: "https://youtube.com/@tradecode" },
  { Icon: Mail,      label: "Email",     href: "mailto:hello@tradecode.in" },
];

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Tradecode", to: "/about" },
      { label: "Our Team",        to: "/team" },
      { label: "R&D",             to: "/rnd" },
      { label: "Press & Notices", to: "/press" },
      { label: "Careers",         to: "/careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Agentic AI",       to: "/services/agentic-ai" },
      { label: "Generative AI",    to: "/services/generative-ai" },
      { label: "Robotics",         to: "/services/robotics" },
      { label: "Data Science",     to: "/services/data-science" },
      { label: "Consulting",       to: "/services/consulting" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog",            to: "/blog" },
      { label: "Gallery",         to: "/gallery" },
      { label: "Client Reviews",  to: "/reviews" },
      { label: "Partners",        to: "/partners" },
      { label: "Become a Partner",to: "/become-partner" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", to: "/legal/terms" },
      { label: "Terms of Use",       to: "/legal/terms-of-use" },
      { label: "Privacy Policy",     to: "/legal/privacy" },
      { label: "Disclaimer",         to: "/legal/disclaimer" },
      { label: "Contact Us",         to: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      {/* Newsletter bar */}
      <div className="border-b border-border">
        <div className="container-x py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-lg font-semibold">Stay ahead of the curve.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Get AI, robotics & automation insights delivered to your inbox.
            </p>
          </div>
          <form
            className="flex w-full max-w-sm gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-brand transition-colors placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity"
            >
              Subscribe <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main columns */}
      <div className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand col */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Tradecode is a deep-tech consultancy building agentic AI, robotics and automation for founders,
              enterprises and institutions.
            </p>
            {/* Location */}
            <div className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-brand-glow mt-0.5" />
              <span>Rajpur Road, Dehradun, Uttarakhand 248001, India</span>
            </div>
            {/* Socials */}
            <div className="mt-5 flex items-center gap-2 flex-wrap">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground hover:bg-brand hover:text-brand-foreground hover:border-brand transition-all duration-200"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Tradecode Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/legal/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/legal/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/legal/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
