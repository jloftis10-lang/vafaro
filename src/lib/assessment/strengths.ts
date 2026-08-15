import { CATEGORY_WEIGHTS } from "@/lib/assessment/categories";
import type { AssessmentAnswers, ReadinessCategoryKey } from "@/lib/assessment/types";

export interface Strength {
  id: string;
  category: ReadinessCategoryKey;
  title: string;
  explanation: string;
}

interface StrengthRule {
  id: string;
  category: ReadinessCategoryKey;
  applies: (a: AssessmentAnswers) => boolean;
  title: string;
  explanation: (a: AssessmentAnswers) => string;
}

/** Mirrors risks.ts, but for the best answer options rather than the worst — surfaced in the "What's Working in Your Favor" section. */
const STRENGTH_RULES: StrengthRule[] = [
  {
    id: "strong-recurring-revenue",
    category: "revenueQuality",
    applies: (a) => a.recurringRevenuePct === "majority_30_plus",
    title: "Strong Recurring Revenue",
    explanation: () => "The majority of your revenue is recurring, contracted, or highly repeatable.",
  },
  {
    id: "improving-profitability",
    category: "revenueQuality",
    applies: (a) => a.profitabilityTrend === "improving",
    title: "Improving Profitability",
    explanation: () => "Your profitability trend has been improving, not just holding steady.",
  },
  {
    id: "positive-growth",
    category: "revenueQuality",
    applies: (a) => a.revenueGrowth === "growing_10_20" || a.revenueGrowth === "growing_20_plus",
    title: "Positive Growth Trajectory",
    explanation: (a) =>
      `Revenue has been growing ${a.revenueGrowth === "growing_20_plus" ? "more than 20%" : "10–20%"} annually.`,
  },
  {
    id: "low-customer-concentration",
    category: "concentrationRisk",
    applies: (a) => a.largestCustomerPct === "under_10",
    title: "Low Customer Concentration",
    explanation: () => "No single customer represents more than 10% of revenue.",
  },
  {
    id: "clean-financial-records",
    category: "earningsQuality",
    applies: (a) =>
      (a.financialStatementQuality === "audited_reviewed" || a.financialStatementQuality === "cpa_prepared") &&
      a.recordsCurrency === "through_last_month",
    title: "Clean, Current Financial Records",
    explanation: () => "Your books are professionally maintained and current through the most recent month.",
  },
  {
    id: "well-documented-addbacks",
    category: "earningsQuality",
    applies: (a) => a.addBackDocumentation === "well_documented",
    title: "Well-Documented Add-Backs",
    explanation: () => "Your discretionary earnings adjustments are clearly documented and ready for buyer review.",
  },
  {
    id: "strong-management-depth",
    category: "transferability",
    applies: (a) => a.managementDepth === "strong_team" || a.managementDepth === "several_capable_managers",
    title: "Strong Management Depth",
    explanation: () => "You have real management depth below you, not just informal supervisors.",
  },
  {
    id: "documented-processes",
    category: "transferability",
    applies: (a) => a.processDocumentation === "formal_sops",
    title: "Well-Documented Operations",
    explanation: () => "Formal standard operating procedures are in place across your major functions.",
  },
  {
    id: "reduced-owner-dependence",
    category: "transferability",
    applies: (a) =>
      (a.ownerHoursPerWeek === "under_10" || a.ownerHoursPerWeek === "between_10_20") &&
      (a.ownerAbsenceImpact === "normal_operation" || a.ownerAbsenceImpact === "minor_disruption"),
    title: "Reduced Owner Dependence",
    explanation: () => "The business would largely continue operating normally without you day to day.",
  },
  {
    id: "transferable-relationships",
    category: "transferability",
    applies: (a) => a.customerRelationshipOwnership === "sales_team" || a.customerRelationshipOwnership === "multiple_employees_plus_owner",
    title: "Transferable Customer Relationships",
    explanation: () => "Customer relationships are already spread across your team rather than concentrated with you.",
  },
];

/**
 * Surfaces 2–4 dynamically generated positives, prioritized toward the
 * higher-weighted readiness categories, with at most one strength per
 * category on the first pass so the section shows variety rather than
 * several angles on the same underlying answer.
 */
export function evaluateStrengths(answers: AssessmentAnswers): Strength[] {
  const triggered = STRENGTH_RULES.filter((rule) => rule.applies(answers)).map((rule) => ({
    id: rule.id,
    category: rule.category,
    title: rule.title,
    explanation: rule.explanation(answers),
  }));

  const byWeight = [...triggered].sort(
    (a, b) => CATEGORY_WEIGHTS[b.category] - CATEGORY_WEIGHTS[a.category],
  );

  const seenCategories = new Set<ReadinessCategoryKey>();
  const firstPass: Strength[] = [];
  const remainder: Strength[] = [];

  for (const strength of byWeight) {
    if (!seenCategories.has(strength.category)) {
      seenCategories.add(strength.category);
      firstPass.push(strength);
    } else {
      remainder.push(strength);
    }
  }

  return [...firstPass, ...remainder].slice(0, 4);
}
