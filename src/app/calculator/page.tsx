import type { Metadata } from "next";

import { AssessmentForm } from "@/components/assessment/AssessmentForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BRAND } from "@/lib/content/brand";

export const metadata: Metadata = {
  title: "Business Valuation + Deal Readiness Assessment | OwnerGauge",
  description:
    "A short assessment covering your business's value, sale readiness, and the highest-impact actions to improve your position before a transaction.",
};

export default function CalculatorPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-semibold text-primary">
              The {BRAND.name} Assessment
            </h1>
            <p className="mt-2 text-muted">
              Understand your estimated market value, deal readiness, and how
              buyers may view your business. About 15 questions, roughly 5–7
              minutes.
            </p>
          </div>

          <div data-clarity-mask="true">
            <AssessmentForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
