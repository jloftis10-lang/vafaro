/**
 * All tunable lead-scoring inputs live here so thresholds/weights can be
 * adjusted without touching engine logic. Placeholder values are marked —
 * replace with real ones once you have a view on deal-size economics and
 * industry specialization.
 */

export const LEAD_SCORE_WEIGHTS = {
  financialAttractiveness: 0.35,
  transactionTiming: 0.25,
  dealReadiness: 0.15,
  industryFit: 0.1,
  growth: 0.1,
  intent: 0.05,
} as const;

/**
 * Scores each industry's fit for this practice's deal focus (0–100),
 * derived from the site owner's ranked 30-industry target list — his
 * deliberate view (from real deal experience on $5M–$320M transactions) on
 * which verticals this practice actually wants leads from, weighted by his
 * "M&A attractiveness" and "OwnerGauge priority" ratings for each:
 * Very High priority + high attractiveness -> 90, Very High + moderate -> 82,
 * High + high -> 75, High + moderate -> 68, Medium-High + high -> 60.
 * Ids not listed here (currently just "other") fall back to
 * DEFAULT_INDUSTRY_FIT_SCORE.
 */
export const INDUSTRY_FIT_SCORES: Record<string, number> = {
  "hvac-mechanical": 90,
  "accounting-firms": 90,
  "fire-life-safety": 90,
  "managed-it-services": 90,
  "insurance-brokerages": 90,
  "industrial-environmental-services": 90,
  "testing-inspection-certification": 90,
  "commercial-facility-services": 90,
  plumbing: 90,
  "engineering-consulting": 90,
  "restoration-remediation": 90,
  "waste-recycling": 90,
  "water-wastewater": 90,
  "home-services": 90,
  "specialty-manufacturing": 82,
  "commercial-landscaping": 82,
  "specialty-distribution": 82,
  "wealth-management": 75,
  "cybersecurity-services": 75,
  "vertical-saas": 75,
  "physician-practices": 75,
  "behavioral-health": 75,
  "security-monitoring": 75,
  "aerospace-defense-government": 75,
  "energy-infrastructure-services": 75,
  "dental-services": 68,
  "veterinary-services": 68,
  "transportation-logistics": 68,
  "staffing-workforce": 68,
  "medical-devices": 60,
};

export const DEFAULT_INDUSTRY_FIT_SCORE = 50;

/**
 * PLACEHOLDER — brackets the seller's SDE/EBITDA into a 0–100 attractiveness
 * score, used as a proxy for deal size / advisory fee potential. First
 * matching bracket (by minMetricValue, descending) wins. Replace the dollar
 * cutoffs with whatever reflects this practice's actual deal-size sweet spot.
 */
export const FINANCIAL_ATTRACTIVENESS_BRACKETS: { minMetricValue: number; score: number }[] = [
  { minMetricValue: 5_000_000, score: 100 },
  { minMetricValue: 2_000_000, score: 85 },
  { minMetricValue: 1_000_000, score: 70 },
  { minMetricValue: 500_000, score: 55 },
  { minMetricValue: 250_000, score: 40 },
  { minMetricValue: 100_000, score: 25 },
  { minMetricValue: 0, score: 10 },
];

/** Minimum total score (0–100) required for each classification tier, checked highest-first. */
export const LEAD_CLASSIFICATION_THRESHOLDS = {
  A: 75,
  B: 55,
  C: 35,
} as const;
