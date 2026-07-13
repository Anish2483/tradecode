import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/layout/PageShell";

export const Route = createFileRoute("/legal/terms-of-use")({
  head: () => ({ meta: [{ title: "Terms of Use — Tradecode" }, { name: "description", content: "Tradecode website terms of use." }] }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" description="Last updated: July 04, 2026" />
      <Prose>
        <h2>1. Website Use</h2>
        <p>By accessing this website, you agree to use it only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of the site by any third party.</p>
        <h2>2. Intellectual Property</h2>
        <p>All content, trademarks, logos, graphics, and materials on the Tradecode website are owned by or licensed to Tradecode. You may not reproduce, distribute, modify, or create derivative works without prior written permission.</p>
        <h2>3. Prohibited Activities</h2>
        <ul>
          <li>Attempting to gain unauthorized access to the website, its servers or related systems.</li>
          <li>Using automated systems (bots, crawlers, scrapers) beyond what our robots.txt permits.</li>
          <li>Uploading malware, viruses or content that is unlawful, defamatory or infringes any right.</li>
          <li>Impersonating Tradecode or its employees, officers or partners.</li>
        </ul>
        <h2>4. User Submissions</h2>
        <p>Any information you submit through our forms is subject to our Privacy Policy. You represent that submissions are accurate, not misleading, and do not violate any third-party rights.</p>
        <h2>5. Modifications</h2>
        <p>Tradecode reserves the right to modify or discontinue the website at any time without notice.</p>
        <h2>6. Governing Law</h2>
        <p>These Terms of Use are governed by the laws of India and subject to the exclusive jurisdiction of the courts of Dehradun, Uttarakhand.</p>
      </Prose>
    </>
  ),
});
