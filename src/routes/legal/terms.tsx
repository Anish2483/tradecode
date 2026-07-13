import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/layout/PageShell";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — Tradecode" }, { name: "description", content: "Tradecode terms and conditions of engagement." }] }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" description="Last updated: July 04, 2026" />
      <Prose>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using Tradecode Technologies ("Tradecode", "we", "us", "our") services, website or platforms, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.</p>
        <h2>2. Engagement & Customer Agreement</h2>
        <p>Tradecode operates under a strict engagement policy: no project, product delivery, deployment, transaction, or work of any kind shall begin without a formally signed customer agreement executed by both parties. Scope, deliverables, IP ownership, payment schedules, SLAs, warranties and confidentiality obligations are defined in that agreement.</p>
        <h2>3. Scope of Services</h2>
        <p>Services include but are not limited to: agentic AI systems, generative AI, robotics, chatbot integration, data science and analytics, custom software and web development, machine learning and deep learning engineering, comprehensive consulting, and industry / institutional training. Detailed scope for any engagement is defined in the signed statement of work.</p>
        <h2>4. Intellectual Property</h2>
        <p>Unless expressly agreed otherwise in the signed customer agreement, deliverables produced specifically for a client are transferred to the client upon full payment. Tradecode retains all rights to its pre-existing IP, proprietary frameworks, tools, R&D outputs and reusable components.</p>
        <h2>5. Payment Terms</h2>
        <p>Payment schedules, milestone gates, taxes and currency are defined in each signed agreement. Late payments may attract interest and pause of active engagements at Tradecode's discretion.</p>
        <h2>6. Confidentiality</h2>
        <p>Both parties agree to protect confidential information exchanged during discussions or engagements. Confidentiality obligations survive the termination of any engagement.</p>
        <h2>7. Warranties & Limitations</h2>
        <p>Services are provided "as is" beyond the specific warranties expressly stated in the signed agreement. To the maximum extent permitted by law, Tradecode's aggregate liability is limited to the fees paid by the client in the preceding twelve (12) months.</p>
        <h2>8. Termination</h2>
        <p>Either party may terminate an engagement per the terms of the signed agreement. Fees for work performed prior to termination remain payable.</p>
        <h2>9. Governing Law</h2>
        <p>These terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts of Dehradun, Uttarakhand.</p>
        <h2>10. Changes to Terms</h2>
        <p>Tradecode may update these terms from time to time. Continued use of the website or services constitutes acceptance of the updated terms.</p>
        <h2>11. Contact</h2>
        <p>Questions? Write to legal@tradecode.in.</p>
      </Prose>
    </>
  ),
});
