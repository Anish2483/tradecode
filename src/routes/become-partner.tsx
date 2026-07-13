import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/become-partner")({
  head: () => ({ meta: [{ title: "Become a Partner — Tradecode" }, { name: "description", content: "Partner with Tradecode. Comprehensive partnership programs for institutes and industry." }] }),
  component: Partner,
});

function Partner() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = Array.from(fd.entries()).map(([k, v]) => `${k}: ${v}`).join("\n");
    const subject = encodeURIComponent(`Partnership enquiry — ${fd.get("org")}`);
    window.location.href = `mailto:partners@tradecode.in?subject=${subject}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <>
      <PageHeader
        eyebrow="Become an Official Partner"
        title={<>Partner with <span className="text-gradient-brand">Tradecode.</span></>}
        description="For institutes, universities, industries and enterprises seeking a strategic deep-tech partner. Tell us about your organization — we'll route you to the right partner lead."
      />
      <section className="container-x py-20 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field name="org" label="Organization name" required />
            <Field name="type" label="Organization type" placeholder="Institute / Industry / Government / Other" required />
            <Field name="contact_name" label="Primary contact" required />
            <Field name="title" label="Title / Designation" required />
            <Field name="email" label="Email" type="email" required />
            <Field name="phone" label="Phone" required />
            <Field name="country" label="Country" required />
            <Field name="website" label="Website" />
          </div>
          <Field name="focus" label="Areas of interest" placeholder="Agentic AI, Robotics, Data Science, Training, R&D, ..." />
          <div>
            <label className="text-sm font-medium">About the partnership you're proposing</label>
            <textarea name="proposal" required rows={6} className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-brand resize-none" />
          </div>
          <Field name="budget" label="Approx. budget range (optional)" />
          <Field name="timeline" label="Timeline" placeholder="Q3 2026, immediate, ..." />
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground">
            Submit partnership request <Send className="h-4 w-4" />
          </motion.button>
          {sent && <p className="text-sm text-brand-glow">Opening your email — thanks!</p>}
        </motion.form>
        <aside className="space-y-5">
          {[
            { t: "Institutional partnerships", d: "Universities, labs and research institutions co-building programs, publications and student pipelines with Tradecode." },
            { t: "Industry partnerships", d: "Enterprises adopting our AI, robotics and automation systems under long-term strategic engagements." },
            { t: "Government & PSU", d: "Deep-tech engagements for public sector programs including R&D, training and analytics." },
            { t: "Technology partners", d: "Cloud, hardware and platform vendors integrating with Tradecode products and delivery programs." },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-6">
              <div className="font-semibold">{c.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </aside>
      </section>
    </>
  );
}

function Field({ name, label, required, type = "text", placeholder }: { name: string; label: string; required?: boolean; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}{required && <span className="text-brand-glow"> *</span>}</label>
      <input name={name} required={required} type={type} placeholder={placeholder} className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-brand" />
    </div>
  );
}
