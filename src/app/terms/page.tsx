import type { Metadata } from "next";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: "Terms of Use | OwnerGauge",
  description: "Terms governing use of the OwnerGauge website and assessment.",
};

/**
 * PLACEHOLDER — same caveat as privacy/page.tsx: directionally accurate,
 * not attorney-reviewed. Flag for legal review before production use.
 * See docs/legal-review-checklist.md — do not remove that internal status
 * without professional legal review actually happening; this comment is
 * the honest record of that status, even though the public page itself no
 * longer states it (a legal page announcing its own unreviewed status
 * undermines the site's credibility more than it protects anyone — see
 * master prompt section 13's reasoning for that pass).
 */
export default function TermsPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Legal</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-6 text-sm text-muted">Last updated August 2026.</p>

          <section className="mt-10 space-y-4 leading-relaxed text-ink">
            <p>
              By using this website and its assessment tool, you agree that
              the estimates and information provided are for general,
              informational, and educational purposes only. See our{" "}
              <a href="/disclaimer" className="text-primary underline-offset-4 hover:underline">
                disclaimer
              </a>{" "}
              for details on what the assessment is and isn&apos;t.
            </p>
            <p>
              You agree to provide accurate information when using the
              assessment, and understand that results are only as reliable
              as the information you provide.
            </p>
            <p>
              This site and its content are provided &quot;as is&quot;
              without warranties of any kind. We are not liable for any
              decisions made based on information from this site.
            </p>
            <p>
              These terms may be updated from time to time. Continued use of
              the site after changes constitutes acceptance of the updated
              terms.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
