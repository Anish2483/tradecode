import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [
    { title: "Blog — Tradecode" },
    { name: "description", content: "Insights on agentic AI, robotics, automation, data science and deep-tech from the Tradecode team." },
  ]}),
  component: Blog,
});

const posts = [
  {
    slug: "agentic-ai-enterprise",
    tag: "Agentic AI",
    title: "How Agentic AI Is Reshaping Enterprise Workflows in 2025",
    excerpt: "Multi-agent systems are moving from demos to production. Here's what the shift looks like inside real enterprises — and how to do it without burning your budget.",
    date: "July 8, 2025",
    readTime: "7 min read",
    featured: true,
  },
  {
    slug: "robotics-sme",
    tag: "Robotics",
    title: "Custom Robotics for SMEs: What's Actually Possible Now",
    excerpt: "Industrial robotics used to require a seven-figure budget. Tradecode's robotics lab breaks down what mid-market businesses can realistically deploy in 2025.",
    date: "June 22, 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "rag-vs-finetuning",
    tag: "Generative AI",
    title: "RAG vs Fine-Tuning: Choosing the Right LLM Strategy",
    excerpt: "The two dominant approaches to customising large language models have very different trade-offs. Our engineering team breaks down when to use which.",
    date: "June 10, 2025",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "data-pipelines-production",
    tag: "Data Science",
    title: "Building Data Pipelines That Actually Survive Production",
    excerpt: "Most data pipelines fail silently in production. Tradecode's data team shares the patterns we use to make pipelines robust, observable, and self-healing.",
    date: "May 28, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "ai-chatbot-roi",
    tag: "AI Chatbots",
    title: "Measuring ROI on Enterprise AI Chatbots",
    excerpt: "How do you actually prove that your AI chatbot is delivering value? A practical framework from deployments that handle millions of messages a month.",
    date: "May 14, 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "consulting-ai-strategy",
    tag: "Consulting",
    title: "Building an AI Strategy That Lasts More Than 6 Months",
    excerpt: "Most AI strategies are obsolete before they're implemented. Tradecode's consulting practice shares how to build strategies that flex with the technology.",
    date: "April 30, 2025",
    readTime: "9 min read",
    featured: false,
  },
];

const tags = ["All", "Agentic AI", "Robotics", "Generative AI", "Data Science", "AI Chatbots", "Consulting"];

function Blog() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights from the deep-tech frontier."
        description="Practical guides, case studies and research from the Tradecode engineering and research team."
      />

      {/* Tag filter row */}
      <div className="border-b border-border">
        <div className="container-x py-4 flex items-center gap-2 overflow-x-auto">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                tag === "All"
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-brand/60 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <section className="container-x py-16">
        {/* Featured post */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 rounded-2xl border border-border bg-card overflow-hidden hover:border-brand/40 transition-colors group"
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-glow">
                  {featured.tag}
                </span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Featured</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold max-w-2xl group-hover:text-brand transition-colors">
                {featured.title}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Tag className="h-3.5 w-3.5" />{featured.date}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />{featured.readTime}
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-glow ml-auto">
                  Read article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Post grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-card p-7 flex flex-col justify-between gap-6 hover:border-brand/40 transition-colors"
            >
              <div>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-glow">
                  {post.tag}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold group-hover:text-brand transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Tag className="h-3 w-3" />{post.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                <span className="ml-auto inline-flex items-center gap-1 text-brand-glow font-semibold text-xs">
                  Read <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
