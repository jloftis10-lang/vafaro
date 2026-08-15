import type { AssessmentAnswers } from "@/lib/assessment/types";

/**
 * "Why a Buyer Might Be Interested" — the deterministic, non-numeric
 * qualitative section covering Market Position (master prompt section 4).
 * Market Position stays in OwnerGauge's knowledge model but is never scored
 * numerically in V1 (no "Market Position: 79/100") — this generates plain-
 * language sentences from real assessment answers instead. Template-based,
 * not AI-generated. Only produces a result for the five industries with a
 * real question module (src/lib/assessment/industry-questions.ts); for
 * every other industry there's no industry-specific signal to build a
 * credible sentence from, so this returns null and the section is omitted
 * rather than showing a generic, hollow one.
 */
export function buildBuyerInterestNarrative(answers: AssessmentAnswers): string | null {
  const clauses = collectClauses(answers);
  if (clauses.length === 0) return null;

  const joined = joinClauses(clauses);
  return `Your combination of ${joined} may be attractive to buyers evaluating acquisitions in your sector.`;
}

function collectClauses(a: AssessmentAnswers): string[] {
  switch (a.industryId) {
    case "specialty-manufacturing":
      return [
        a.backlogMonths === "6_plus" && "meaningful forward revenue visibility from confirmed backlog",
        a.endMarketConcentration === "diversified" && "diversified end-market exposure",
        a.capexOutlook === "recently_upgraded" && "recently upgraded production equipment",
      ].filter((c): c is string => Boolean(c));

    case "specialty-distribution":
      return [
        a.largestSupplierPct === "under_20" && "a diversified supplier base",
        a.territoryProtection === "exclusive_protected" && "protected or exclusive territory rights",
        a.reorderRevenuePct === "majority_repeat" && "a high share of repeat, reorder-driven revenue",
      ].filter((c): c is string => Boolean(c));

    case "engineering-consulting":
      return [
        a.contractedBacklogMonths === "12_plus" && "well-contracted forward backlog",
        a.licensedStaffBeyondOwner === "yes_multiple" && "licensed technical depth beyond the owner",
      ].filter((c): c is string => Boolean(c));

    case "hvac-mechanical":
      return [
        a.serviceVsInstallMix === "mostly_service" && "a service-heavy, less cyclical revenue mix",
        a.maintenanceAgreementRevenuePct === "over_30" && "a meaningful base of recurring maintenance-agreement revenue",
        a.licenseHolderBeyondOwner === "yes" && "licensing that isn't dependent on one person",
      ].filter((c): c is string => Boolean(c));

    case "accounting-firms":
      return [
        a.recurringComplianceRevenuePct === "over_70" && "a high share of recurring compliance and advisory revenue",
        a.staffCpaDepth === "multiple_licensed_staff" && "a bench of licensed staff beyond the owner",
      ].filter((c): c is string => Boolean(c));

    default:
      return [];
  }
}

function joinClauses(clauses: string[]): string {
  if (clauses.length === 1) return clauses[0];
  if (clauses.length === 2) return `${clauses[0]} and ${clauses[1]}`;
  return `${clauses.slice(0, -1).join(", ")}, and ${clauses[clauses.length - 1]}`;
}
