import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service/ServicePage";
import { services } from "@/content/services";
const c = services["agentic-ai"];
export const Route = createFileRoute("/services/agentic-ai")({
  head: () => ({ meta: [{ title: `${c.title} — Tradecode` }, { name: "description", content: c.intro }] }),
  component: () => <ServicePage content={c} />,
});
