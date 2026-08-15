import type { Metadata } from "next";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: "Privacy Policy | OwnerGauge",
  description: "How OwnerGauge collects and uses information submitted through the assessment.",
};

/**
 * PLACEHOLDER — drafted for clarity and directional accuracy about what
 * this specific app actually does with data, not as a substitute for
 * attorney review. Get real legal review before relying on this in
 * production, especially around any state-specific privacy law
 * requirements (CCPA, etc.) that may apply. See docs/legal-review-checklist.md
 * — do not remove that internal status without professional legal review
 * actually happening; this comment is the honest record of that status,
 * even though the public page itself no longer states it (a privacy page
 * announcing its own unreviewed status undermines the site's credibility
 * more than it protects anyone — see master prompt section 13's reasoning
 * for that pass).
 */
export default function PrivacyPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Legal</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm text-muted">
            Last updated August 2026. This page describes what this site
            actually does with your information today.
          </p>

          <section className="mt-10 space-y-4 leading-relaxed text-ink">
            <p>
              When you complete the assessment on this site, we collect the
              answers you provide (business details, financial figures, and
              qualitative information about the business) along with your
              email address if you request the full report.
            </p>
            <p>
              This information is stored in our database and used to
              calculate your estimated valuation and deal readiness results,
              send you the report you requested by email, and understand
              general interest in the assessment. We do not sell your
              information to third parties.
            </p>
            <p>
              We use third-party service providers to operate this site,
              including a database provider to store submissions and an
              email provider to send report emails. These providers process
              data on our behalf and are not authorized to use it for their
              own purposes.
            </p>
            <p>
              When analytics is enabled, we use Microsoft Clarity to understand
              aggregate navigation patterns, interactions, and site usability through
              tools such as heatmaps and session recordings. Assessment answers,
              financial inputs, email fields, and generated report content are masked
              from those recordings. Microsoft may process device and usage data as
              described in its privacy documentation.
            </p>
            <p>
              Submitting the assessment does not create an advisory,
              consulting, or fiduciary relationship of any kind. If you have
              questions about your data or want it removed, contact us using
              the information on this site.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
