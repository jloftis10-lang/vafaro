import { AssessmentEmailCaptureForm } from "@/components/assessment/AssessmentEmailCaptureForm";
import { BusinessProfileSection } from "@/components/assessment/results/BusinessProfileSection";
import { BuyerInterestSection } from "@/components/assessment/results/BuyerInterestSection";
import { CTASection } from "@/components/assessment/results/CTASection";
import { ReadinessSection } from "@/components/assessment/results/ReadinessSection";
import { RecommendationsSection } from "@/components/assessment/results/RecommendationsSection";
import { RisksSection } from "@/components/assessment/results/RisksSection";
import { StrengthsSection } from "@/components/assessment/results/StrengthsSection";
import { TransactionSnapshotSection } from "@/components/assessment/results/TransactionSnapshotSection";
import { ValuationSection } from "@/components/assessment/results/ValuationSection";
import { determineCTA } from "@/lib/assessment/cta";
import { rankRecommendations } from "@/lib/assessment/recommendations";
import { calculateReadiness } from "@/lib/assessment/readiness";
import { evaluateRiskFlags } from "@/lib/assessment/risks";
import { evaluateStrengths } from "@/lib/assessment/strengths";
import type { AssessmentAnswers } from "@/lib/assessment/types";
import type { ValuationResult } from "@/lib/types";

interface AssessmentResultsProps {
  answers: AssessmentAnswers;
  valuation: ValuationResult;
  onStartOver: () => void;
}

export function AssessmentResults({ answers, valuation, onStartOver }: AssessmentResultsProps) {
  const readiness = calculateReadiness(answers);
  const risks = evaluateRiskFlags(answers);
  const strengths = evaluateStrengths(answers);
  const recommendations = rankRecommendations(risks);
  const cta = determineCTA(readiness, answers);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          OwnerGauge Business Value &amp; Deal Readiness Report
        </p>
      </div>

      <ValuationSection metricType={answers.metricType} valuation={valuation} />
      <ReadinessSection readiness={readiness} />
      <TransactionSnapshotSection readiness={readiness} />
      <BusinessProfileSection answers={answers} />
      <StrengthsSection strengths={strengths} />
      <RisksSection risks={risks} />
      <BuyerInterestSection answers={answers} />
      <RecommendationsSection recommendations={recommendations} />
      <CTASection cta={cta} />

      <div id="assessment-email-report" className="scroll-mt-8 rounded-lg border border-line bg-surface p-6 sm:p-8">
        <AssessmentEmailCaptureForm answers={answers} />
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onStartOver}
          className="text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
