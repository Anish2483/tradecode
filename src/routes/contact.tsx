import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Twitter, Linkedin, Instagram, Facebook, Youtube, GraduationCap, MessageCircle, Send } from "lucide-react";
import { PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Tradecode" }, { name: "description", content: "Get in touch with Tradecode. Dehradun office. Reach us on any channel." }] }),
  component: Contact,
});

const channels = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: GraduationCap, label: "Google Scholar", href: "https://scholar.google.com" },
  { icon: Mail, label: "Email", href: "mailto:hello@tradecode.in" },
  { icon: Phone, label: "Phone", href: "tel:+910000000000" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/910000000000" },
];

function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const first = (form.elements.namedItem("first") as HTMLInputElement).value;
    const last = (form.elements.namedItem("last") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const subject = encodeURIComponent(`New enquiry from ${first} ${last}`);
    const body = encodeURIComponent(`Name: ${first} ${last}\n\n${message}`);
    window.location.href = `mailto:hello@tradecode.in?subject=${subject}&body=${body}`;
    setStatus("sent");
  };
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk." description="Tell us about your project. We respond within one business day." />
      <section className="container-x py-20 grid gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-bold">Send us a message</h2>
          <p className="text-sm text-muted-foreground mt-2">Submissions open your email client and route directly to our team.</p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">First name</label>
                <input name="first" required className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-brand" />
              </div>
              <div>
                <label className="text-sm font-medium">Last name</label>
                <input name="last" required className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-brand" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea name="message" required rows={6} className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-brand resize-none" />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground">
              Send message <Send className="h-4 w-4" />
            </motion.button>
            {status === "sent" && <p className="text-sm text-brand-glow">Opening your email — thanks!</p>}
          </form>
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-brand-glow mt-0.5" />
              <div>
                <div className="font-semibold">Dehradun Office</div>
                <p className="text-sm text-muted-foreground mt-1">Tradecode Technologies<br />Rajpur Road, Dehradun<br />Uttarakhand 248001, India</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Reach us on any channel</div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {channels.map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" title={c.label}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-border p-3 hover:bg-brand hover:text-brand-foreground transition-colors">
                  <c.icon className="h-4 w-4" />
                  <span className="text-[10px] font-medium">{c.label}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
