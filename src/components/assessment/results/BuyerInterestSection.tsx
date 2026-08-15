import { buildBuyerInterestNarrative } from "@/lib/assessment/buyer-interest";
import type { AssessmentAnswers } from "@/lib/assessment/types";

interface BuyerInterestSectionProps {
  answers: AssessmentAnswers;
}

/** Renders nothing when no industry-specific narrative applies — see buildBuyerInterestNarrative's docstring. */
export function BuyerInterestSection({ answers }: BuyerInterestSectionProps) {
  const narrative = buildBuyerInterestNarrative(answers);
  if (!narrative) return null;

  return (
    <section className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-primary">
        How a Buyer May View Your Business
      </h2>
      <p className="mt-3 leading-relaxed text-ink">{narrative}</p>
    </section>
  );
}
