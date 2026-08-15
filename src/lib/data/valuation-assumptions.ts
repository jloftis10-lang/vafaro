import type { MetricType } from "@/lib/types";

export interface ValuationAssumption {
  id: string;
  metricType: MetricType;
  multipleLow: number;
  multipleHigh: number;
  status: "provisional" | "reviewed";
  basis: string;
}

/**
 * Provisional generic fallback, used only for "other" and any industry id
 * without an entry in INDUSTRY_VALUATION_PROFILES below. Keeps the
 * calculator usable for businesses that don't fit the named taxonomy,
 * without pretending to have a benchmark for them.
 */
export const GENERIC_VALUATION_ASSUMPTIONS: Record<MetricType, ValuationAssumption> = {
  sde: {
    id: "generic-sde-v1",
    metricType: "sde",
    multipleLow: 2,
    multipleHigh: 4,
    status: "provisional",
    basis: "Broad planning fallback for owner-operated businesses; not an industry benchmark.",
  },
  ebitda: {
    id: "generic-ebitda-v1",
    metricType: "ebitda",
    multipleLow: 3,
    multipleHigh: 5,
    status: "provisional",
    basis: "Broad planning fallback for management-run businesses; not an industry benchmark.",
  },
};

export function getValuationAssumption(metricType: MetricType): ValuationAssumption {
  return GENERIC_VALUATION_ASSUMPTIONS[metricType];
}

interface IndustryValuationProfile {
  sde: { multipleLow: number; multipleHigh: number };
  ebitda: { multipleLow: number; multipleHigh: number };
  basis: string;
}

/**
 * Directional multiple ranges for the 30 industries this practice actually
 * targets (src/lib/data/industries.ts), keyed by industry id. SDE ranges
 * anchor to smaller, owner-operated deals; EBITDA ranges anchor to the
 * lower-middle-market end of each sector (not large PE platform multiples,
 * which run considerably higher for scale). Grounded in public 2025-2026
 * benchmark sources — BizBuySell/DealStats commentary, IBBA/M&A Source
 * Market Pulse, and sector-specific M&A advisory reports (First Page Sage,
 * Aventis Advisors, FOCUS, Sica | Fletcher, and similar) — reviewed and
 * directionally approved by the site owner from his own deal experience
 * ($5M–$320M in closed transactions), not a substitute for real comps on
 * any specific deal. Treat every range as a rough benchmark to validate,
 * not a finished table.
 */
export const INDUSTRY_VALUATION_PROFILES: Record<string, IndustryValuationProfile> = {
  "hvac-mechanical": {
    sde: { multipleLow: 2.75, multipleHigh: 3.75 },
    ebitda: { multipleLow: 5.0, multipleHigh: 7.5 },
    basis: "Home services (HVAC) 2025-2026 market data; premium for recurring maintenance-contract revenue.",
  },
  plumbing: {
    sde: { multipleLow: 2.75, multipleHigh: 3.75 },
    ebitda: { multipleLow: 5.0, multipleHigh: 7.0 },
    basis: "Tracks closely with HVAC/mechanical trades data given similar owner-operator and consolidation dynamics.",
  },
  "fire-life-safety": {
    sde: { multipleLow: 3.0, multipleHigh: 4.0 },
    ebitda: { multipleLow: 5.5, multipleHigh: 8.0 },
    basis: "Inspection/monitoring-driven recurring revenue and regulatory tailwinds support a premium over general trades.",
  },
  "restoration-remediation": {
    sde: { multipleLow: 3.0, multipleHigh: 4.0 },
    ebitda: { multipleLow: 5.5, multipleHigh: 8.0 },
    basis: "Insurance-referral demand and active platform consolidation in water/fire restoration.",
  },
  "commercial-landscaping": {
    sde: { multipleLow: 2.75, multipleHigh: 3.75 },
    ebitda: { multipleLow: 5.0, multipleHigh: 7.0 },
    basis: "Recurring maintenance-contract revenue supports a premium over residential-only landscaping.",
  },
  "commercial-facility-services": {
    sde: { multipleLow: 2.25, multipleHigh: 3.25 },
    ebitda: { multipleLow: 4.5, multipleHigh: 6.5 },
    basis: "Janitorial/facilities management is contract-recurring but more competitive and lower-margin than the trades.",
  },
  "security-monitoring": {
    sde: { multipleLow: 3.25, multipleHigh: 4.25 },
    ebitda: { multipleLow: 6.0, multipleHigh: 9.0 },
    basis: "Monitoring/RMR revenue streams command a premium similar to other subscription-style service businesses.",
  },
  "home-services": {
    sde: { multipleLow: 2.75, multipleHigh: 3.75 },
    ebitda: { multipleLow: 5.0, multipleHigh: 7.0 },
    basis: "General catch-all for home-services trades not otherwise listed; mirrors HVAC/plumbing benchmarks.",
  },
  "managed-it-services": {
    sde: { multipleLow: 3.0, multipleHigh: 4.5 },
    ebitda: { multipleLow: 5.0, multipleHigh: 9.0 },
    basis: "MSP market data: sub-$5M EBITDA averages ~5x, $3-10M revenue band trades 6-9x on recurring-revenue quality.",
  },
  "cybersecurity-services": {
    sde: { multipleLow: 3.5, multipleHigh: 5.0 },
    ebitda: { multipleLow: 7.0, multipleHigh: 11.0 },
    basis: "Specialized cybersecurity MSPs trade at a documented premium over traditional managed services.",
  },
  "vertical-saas": {
    sde: { multipleLow: 3.5, multipleHigh: 5.0 },
    ebitda: { multipleLow: 6.0, multipleHigh: 10.0 },
    basis: "Software/SaaS margins and retention support higher multiples than services businesses at similar scale.",
  },
  "specialty-manufacturing": {
    sde: { multipleLow: 3.0, multipleHigh: 4.0 },
    ebitda: { multipleLow: 4.5, multipleHigh: 7.0 },
    basis: "Niche/specialty manufacturers carry a premium over general manufacturing on proprietary process or IP.",
  },
  "industrial-environmental-services": {
    sde: { multipleLow: 3.0, multipleHigh: 4.0 },
    ebitda: { multipleLow: 5.5, multipleHigh: 8.5 },
    basis: "Regulatory-compliance-driven, recurring environmental services command a premium over general industrials.",
  },
  "testing-inspection-certification": {
    sde: { multipleLow: 3.25, multipleHigh: 4.5 },
    ebitda: { multipleLow: 6.0, multipleHigh: 9.0 },
    basis: "TIC is a well-known premium consolidation category due to regulatory-mandated, recurring demand.",
  },
  "specialty-distribution": {
    sde: { multipleLow: 2.75, multipleHigh: 3.75 },
    ebitda: { multipleLow: 4.5, multipleHigh: 7.0 },
    basis: "Niche/specialty distributors carry a modest premium over general wholesale distribution.",
  },
  "transportation-logistics": {
    sde: { multipleLow: 2.5, multipleHigh: 3.5 },
    ebitda: { multipleLow: 4.0, multipleHigh: 6.5 },
    basis: "Asset-heavy, competitive sector; multiples trail asset-light services categories.",
  },
  "aerospace-defense-government": {
    sde: { multipleLow: 3.5, multipleHigh: 4.75 },
    ebitda: { multipleLow: 6.0, multipleHigh: 9.5 },
    basis: "Government/defense contract backlogs and security clearances support a premium and high buyer demand.",
  },
  "waste-recycling": {
    sde: { multipleLow: 3.25, multipleHigh: 4.25 },
    ebitda: { multipleLow: 6.0, multipleHigh: 9.0 },
    basis: "Route density and recurring contracts make waste/recycling a historically premium-multiple category.",
  },
  "water-wastewater": {
    sde: { multipleLow: 3.25, multipleHigh: 4.25 },
    ebitda: { multipleLow: 6.0, multipleHigh: 9.0 },
    basis: "Essential, regulation-driven infrastructure services with recurring municipal/commercial contracts.",
  },
  "energy-infrastructure-services": {
    sde: { multipleLow: 3.0, multipleHigh: 4.25 },
    ebitda: { multipleLow: 5.5, multipleHigh: 8.5 },
    basis: "Infrastructure-services demand tailwinds support a premium over general contracting.",
  },
  "accounting-firms": {
    sde: { multipleLow: 2.5, multipleHigh: 3.5 },
    ebitda: { multipleLow: 3.5, multipleHigh: 5.5 },
    basis: "2025-2026 PE/institutional accounting-firm acquisitions of $2-10M revenue firms typically price 3.0-5.5x adjusted EBITDA.",
  },
  "engineering-consulting": {
    sde: { multipleLow: 3.0, multipleHigh: 4.0 },
    ebitda: { multipleLow: 4.5, multipleHigh: 6.5 },
    basis: "Tracks general professional-services benchmarks with a modest premium for technical/licensed expertise.",
  },
  "staffing-workforce": {
    sde: { multipleLow: 2.25, multipleHigh: 3.25 },
    ebitda: { multipleLow: 4.0, multipleHigh: 6.0 },
    basis: "People-heavy, lower-margin model trades below most other professional-services categories.",
  },
  "dental-services": {
    sde: { multipleLow: 3.0, multipleHigh: 4.0 },
    ebitda: { multipleLow: 4.5, multipleHigh: 7.5 },
    basis: "Individual/small-group dental practices; DSO platform-scale multiples (8-14x) run considerably higher.",
  },
  "veterinary-services": {
    sde: { multipleLow: 3.0, multipleHigh: 4.0 },
    ebitda: { multipleLow: 4.0, multipleHigh: 8.0 },
    basis: "Single-doctor GPs typically clear 4-7x EBITDA; multi-doctor practices 6-9x per 2025-2026 market data.",
  },
  "behavioral-health": {
    sde: { multipleLow: 3.0, multipleHigh: 4.25 },
    ebitda: { multipleLow: 5.0, multipleHigh: 9.0 },
    basis: "Small practices/add-ons trade 4-8x EBITDA; scaled accredited platforms trade materially higher.",
  },
  "physician-practices": {
    sde: { multipleLow: 3.25, multipleHigh: 4.5 },
    ebitda: { multipleLow: 5.0, multipleHigh: 9.0 },
    basis: "Specialty-medical practice management benchmarks; varies significantly by specialty and payer mix.",
  },
  "medical-devices": {
    sde: { multipleLow: 3.0, multipleHigh: 4.25 },
    ebitda: { multipleLow: 5.0, multipleHigh: 8.0 },
    basis: "Manufacturing-adjacent with an IP/regulatory-moat premium over general specialty manufacturing.",
  },
  "insurance-brokerages": {
    sde: { multipleLow: 4.0, multipleHigh: 5.5 },
    ebitda: { multipleLow: 7.0, multipleHigh: 11.0 },
    basis: "2025 mid-market brokerage deals ($1-10M EBITDA) averaged ~11-12x; smaller agencies trade toward the low end.",
  },
  "wealth-management": {
    sde: { multipleLow: 3.5, multipleHigh: 5.0 },
    ebitda: { multipleLow: 5.0, multipleHigh: 9.0 },
    basis: "Sub-$500M AUM practices trade from ~5x EBITDA; scaled fee-only RIAs trade materially higher (11x+ median in 2025).",
  },
};

export function getIndustryValuationAssumption(
  industryId: string,
  metricType: MetricType,
): ValuationAssumption | undefined {
  const profile = INDUSTRY_VALUATION_PROFILES[industryId];
  if (!profile) return undefined;
  const range = profile[metricType];
  return {
    id: `${industryId}-${metricType}-v1`,
    metricType,
    multipleLow: range.multipleLow,
    multipleHigh: range.multipleHigh,
    status: "reviewed",
    basis: profile.basis,
  };
}
