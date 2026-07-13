import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/layout/PageShell";

export const Route = createFileRoute("/legal/disclaimer")({
  head: () => ({ meta: [{ title: "Disclaimer — Tradecode" }, { name: "description", content: "Tradecode website and services disclaimer." }] }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Disclaimer" description="Last updated: July 04, 2026" />
      <Prose>
        <h2>General Information</h2>
        <p>The information provided on this website is for general informational purposes only. All information is provided in good faith, but Tradecode Technologies makes no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
        <h2>Professional Advice</h2>
        <p>Content on this website does not constitute professional advice. Engagements with Tradecode are governed solely by the signed customer agreement executed between Tradecode and the client.</p>
        <h2>External Links</h2>
        <p>The website may contain links to external websites that are not maintained by Tradecode. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external sites.</p>
        <h2>Data & Statistics</h2>
        <p>All statistics, case studies and outcome metrics presented on this site are derived from Tradecode's own engagement data or from public sources cited alongside the numbers. Client-identifiable metrics are only shared with prior written consent.</p>
        <h2>Limitation of Liability</h2>
        <p>Under no circumstances shall Tradecode have any liability to you for any loss or damage of any kind incurred as a result of the use of the website or reliance on information provided on the website.</p>
      </Prose>
    </>
  ),
});
