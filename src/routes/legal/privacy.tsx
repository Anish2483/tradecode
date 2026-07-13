import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/layout/PageShell";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Tradecode" }, { name: "description", content: "How Tradecode collects, uses and protects personal data." }] }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated: July 04, 2026" />
      <Prose>
        <h2>1. Overview</h2>
        <p>This Privacy Policy explains how Tradecode Technologies collects, uses, and protects personal information when you visit our website, engage with our services, or communicate with us.</p>
        <h2>2. Information We Collect</h2>
        <ul>
          <li>Contact details you provide (name, email, phone, company).</li>
          <li>Project and enquiry details submitted through our forms.</li>
          <li>Technical data such as IP address, browser type and pages visited.</li>
          <li>Cookies and similar technologies for essential functionality and analytics.</li>
        </ul>
        <h2>3. How We Use Information</h2>
        <ul>
          <li>To respond to enquiries and deliver engaged services.</li>
          <li>To improve our website, products and communications.</li>
          <li>To comply with legal, regulatory and contractual obligations.</li>
          <li>To send occasional updates about relevant services (opt-out available).</li>
        </ul>
        <h2>4. Data Sharing</h2>
        <p>We do not sell personal data. We share information only with (a) service providers under confidentiality obligations, (b) legal authorities where required by law, and (c) as expressly agreed in a signed customer agreement.</p>
        <h2>5. Data Retention</h2>
        <p>We retain personal data only as long as necessary to fulfill the purposes described in this policy, or as required by law and contract.</p>
        <h2>6. Security</h2>
        <p>We implement industry-standard technical and organizational measures to protect personal data, including encryption in transit, access controls and audit logging.</p>
        <h2>7. Your Rights</h2>
        <p>You may request access, correction, deletion, portability or restriction of your personal data by writing to privacy@tradecode.in.</p>
        <h2>8. International Transfers</h2>
        <p>Where personal data is transferred across borders, appropriate safeguards are in place consistent with applicable data-protection laws.</p>
        <h2>9. Children</h2>
        <p>Our services are not directed to children under 16, and we do not knowingly collect personal data from them.</p>
        <h2>10. Contact</h2>
        <p>Data-protection queries: privacy@tradecode.in.</p>
      </Prose>
    </>
  ),
});
