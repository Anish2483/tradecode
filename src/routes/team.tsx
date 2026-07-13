import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github, Globe } from "lucide-react";
import { PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Our Team — Tradecode" }, { name: "description", content: "Meet the leadership and senior team behind Tradecode." }] }),
  component: Team,
});

const team = [
  { name: "Yogendra Bhardwaj", role: "Founder & CEO", bio: "Sets strategic vision, leads enterprise partnerships and long-term product bets across the Tradecode portfolio.", initials: "YB" },
  { name: "Anissh Kumar", role: "Co-Founder & CTO", bio: "Leads engineering, agentic AI research and the robotics practice. Accountable for delivery quality and technical excellence.", initials: "AK" },
  { name: "Dr. Neha Kapoor", role: "Head of Data Science", bio: "20+ years in applied ML. Leads the senior data science team and enterprise analytics programs.", initials: "NK" },
  { name: "Rahul Mehta", role: "Head of Robotics", bio: "Robotics systems engineer specializing in vision, ROS2 and industrial deployments.", initials: "RM" },
  { name: "Priya Sharma", role: "Head of Delivery", bio: "Runs the delivery organization — 40+ engineers, program managers and analysts across four practices.", initials: "PS" },
  { name: "Aakash Verma", role: "Principal AI Engineer", bio: "Agentic AI systems, LLM fine-tuning and evaluation infrastructure lead.", initials: "AV" },
];

const socials = [Linkedin, Twitter, Github, Globe];

function Team() {
  return (
    <>
      <PageHeader eyebrow="Our Team" title="Senior operators, applied researchers, working shoulder-to-shoulder." description="A small, senior team by design — every engagement is led by someone with skin in the game." />
      <section className="container-x py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-brand/50 transition-colors">
              <div className="relative aspect-[4/3] bg-brand overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="absolute inset-0 grid place-items-center font-display text-6xl font-bold text-brand-foreground/90">
                  {m.initials}
                </div>
              </div>
              <div className="p-6">
                <div className="font-display text-xl font-semibold">{m.name}</div>
                <div className="text-sm text-brand-glow font-medium">{m.role}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                <div className="mt-5 flex gap-2">
                  {socials.map((Icon, j) => (
                    <a key={j} href="#" className="grid h-8 w-8 place-items-center rounded-md border border-border hover:bg-brand hover:text-brand-foreground transition-colors">
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
