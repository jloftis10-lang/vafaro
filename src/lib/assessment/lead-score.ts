import {
  DEFAULT_INDUSTRY_FIT_SCORE,
  FINANCIAL_ATTRACTIVENESS_BRACKETS,
  INDUSTRY_FIT_SCORES,
  LEAD_CLASSIFICATION_THRESHOLDS,
  LEAD_SCORE_WEIGHTS,
} from "@/lib/assessment/lead-score-config";
import { REVENUE_GROWTH_ORDER, SALE_TIMELINE_ORDER, scoreFromOrderedOptions } from "@/lib/assessment/scoring-utils";
import type {
  AssessmentAnswers,
  LeadClassification,
  LeadScoreResult,
  ReadinessResult,
} from "@/lib/assessment/types";

function scoreFinancialAttractiveness(metricValue: number): number {
  const bracket = FINANCIAL_ATTRACTIVENESS_BRACKETS.find((b) => metricValue >= b.minMetricValue);
  return bracket?.score ?? 0;
}

function scoreIndustryFit(industryId: string): number {
  return INDUSTRY_FIT_SCORES[industryId] ?? DEFAULT_INDUSTRY_FIT_SCORE;
}

/**
 * Placeholder intent signal — this app has no accounts, dashboard, or
 * behavioral tracking (email opens, return visits, calendar clicks) yet.
 * Until that exists, intent is inferred from how much optional detail the
 * seller volunteered and whether they engaged with sale timing at all,
 * which are the only "effort" signals available in a single-session form.
 * Revisit once real contact-behavior data is being captured.
 */
function scoreIntent(answers: AssessmentAnswers): number {
  let score = 60;
  if (typeof answers.yearsInBusiness === "number") score += 10;
  if (typeof answers.top5CustomersPct === "number") score += 10;
  if (answers.saleTimeline !== "no_specific_timeline") score += 20;
  return Math.min(100, score);
}

function classify(score: number): LeadClassification {
  if (score >= LEAD_CLASSIFICATION_THRESHOLDS.A) return "A";
  if (score >= LEAD_CLASSIFICATION_THRESHOLDS.B) return "B";
  if (score >= LEAD_CLASSIFICATION_THRESHOLDS.C) return "C";
  return "D";
}

/**
 * Internal-only — never returned to the client for display. Deliberately
 * weighted so deal size (financialAttractiveness, 35%) and timing (25%)
 * dominate over readiness (15%): a large, unprepared business is a bigger
 * opportunity than a small, well-prepared one.
 */
export function calculateLeadScore(
  answers: AssessmentAnswers,
  readiness: ReadinessResult,
): LeadScoreResult {
  const components = {
    financialAttractiveness: scoreFinancialAttractiveness(answers.metricValue),
    transactionTiming: scoreFromOrderedOptions(answers.saleTimeline, SALE_TIMELINE_ORDER),
    dealReadiness: readiness.totalScore,
    industryFit: scoreIndustryFit(answers.industryId),
    growth: scoreFromOrderedOptions(answers.revenueGrowth, REVENUE_GROWTH_ORDER),
    intent: scoreIntent(answers),
  };

  const score = Math.round(
    components.financialAttractiveness * LEAD_SCORE_WEIGHTS.financialAttractiveness +
      components.transactionTiming * LEAD_SCORE_WEIGHTS.transactionTiming +
      components.dealReadiness * LEAD_SCORE_WEIGHTS.dealReadiness +
      components.industryFit * LEAD_SCORE_WEIGHTS.industryFit +
      components.growth * LEAD_SCORE_WEIGHTS.growth +
      components.intent * LEAD_SCORE_WEIGHTS.intent,
  );

  return {
    score,
    classification: classify(score),
    components,
  };
}
