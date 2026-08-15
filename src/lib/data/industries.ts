export const INDUSTRY_GROUPS = [
  "Home & Commercial Services",
  "Technology",
  "Industrial & Infrastructure",
  "Professional Services",
  "Healthcare",
  "Financial Services",
  "Consumer & Other Services",
] as const;

export type IndustryGroup = (typeof INDUSTRY_GROUPS)[number];

export interface IndustryDefinition {
  id: string;
  label: string;
  group: IndustryGroup;
  /** Set only after an industry-specific assumption has been reviewed and approved. */
  valuationProfileId?: string;
}

/**
 * Product taxonomy. `valuationProfileId` (when set) points at a reviewed
 * entry in src/lib/data/valuation-assumptions.ts's INDUSTRY_VALUATION_PROFILES;
 * industries without one fall back to the generic SDE/EBITDA assumption
 * rather than fabricating a benchmark. Lead-fit scoring lives separately in
 * src/lib/assessment/lead-score-config.ts.
 */
export const INDUSTRIES: IndustryDefinition[] = [
  { id: "hvac-mechanical", label: "HVAC & Mechanical Services", group: "Home & Commercial Services", valuationProfileId: "hvac-mechanical" },
  { id: "plumbing", label: "Plumbing Services", group: "Home & Commercial Services", valuationProfileId: "plumbing" },
  { id: "fire-life-safety", label: "Fire & Life Safety", group: "Home & Commercial Services", valuationProfileId: "fire-life-safety" },
  { id: "restoration-remediation", label: "Restoration & Remediation", group: "Home & Commercial Services", valuationProfileId: "restoration-remediation" },
  { id: "commercial-landscaping", label: "Commercial Landscaping", group: "Home & Commercial Services", valuationProfileId: "commercial-landscaping" },
  { id: "commercial-facility-services", label: "Commercial Facility Services", group: "Home & Commercial Services", valuationProfileId: "commercial-facility-services" },
  { id: "security-monitoring", label: "Security, Alarm & Monitoring", group: "Home & Commercial Services", valuationProfileId: "security-monitoring" },
  { id: "home-services", label: "Other Home Services", group: "Home & Commercial Services", valuationProfileId: "home-services" },
  { id: "managed-it-services", label: "Managed IT Services / MSPs", group: "Technology", valuationProfileId: "managed-it-services" },
  { id: "cybersecurity-services", label: "Cybersecurity Services", group: "Technology", valuationProfileId: "cybersecurity-services" },
  { id: "vertical-saas", label: "Vertical SaaS / B2B Software", group: "Technology", valuationProfileId: "vertical-saas" },
  { id: "specialty-manufacturing", label: "Specialty Manufacturing", group: "Industrial & Infrastructure", valuationProfileId: "specialty-manufacturing" },
  { id: "industrial-environmental-services", label: "Industrial & Environmental Services", group: "Industrial & Infrastructure", valuationProfileId: "industrial-environmental-services" },
  { id: "testing-inspection-certification", label: "Testing, Inspection & Certification", group: "Industrial & Infrastructure", valuationProfileId: "testing-inspection-certification" },
  { id: "specialty-distribution", label: "Specialty Distribution", group: "Industrial & Infrastructure", valuationProfileId: "specialty-distribution" },
  { id: "transportation-logistics", label: "Transportation & Logistics", group: "Industrial & Infrastructure", valuationProfileId: "transportation-logistics" },
  { id: "aerospace-defense-government", label: "Aerospace, Defense & Government Services", group: "Industrial & Infrastructure", valuationProfileId: "aerospace-defense-government" },
  { id: "waste-recycling", label: "Waste & Recycling", group: "Industrial & Infrastructure", valuationProfileId: "waste-recycling" },
  { id: "water-wastewater", label: "Water / Wastewater Services", group: "Industrial & Infrastructure", valuationProfileId: "water-wastewater" },
  { id: "energy-infrastructure-services", label: "Energy / Infrastructure Services", group: "Industrial & Infrastructure", valuationProfileId: "energy-infrastructure-services" },
  { id: "accounting-firms", label: "Accounting / CPA / Tax Firms", group: "Professional Services", valuationProfileId: "accounting-firms" },
  { id: "engineering-consulting", label: "Engineering & Technical Consulting", group: "Professional Services", valuationProfileId: "engineering-consulting" },
  { id: "staffing-workforce", label: "Staffing & Workforce Solutions", group: "Professional Services", valuationProfileId: "staffing-workforce" },
  { id: "dental-services", label: "Dental Services", group: "Healthcare", valuationProfileId: "dental-services" },
  { id: "veterinary-services", label: "Veterinary Services", group: "Healthcare", valuationProfileId: "veterinary-services" },
  { id: "behavioral-health", label: "Behavioral Health", group: "Healthcare", valuationProfileId: "behavioral-health" },
  { id: "physician-practices", label: "Specialty Medical / Physician Practices", group: "Healthcare", valuationProfileId: "physician-practices" },
  { id: "medical-devices", label: "Medical Devices / MedTech", group: "Healthcare", valuationProfileId: "medical-devices" },
  { id: "insurance-brokerages", label: "Insurance Brokerages", group: "Financial Services", valuationProfileId: "insurance-brokerages" },
  { id: "wealth-management", label: "Wealth Management / RIAs", group: "Financial Services", valuationProfileId: "wealth-management" },
  { id: "other", label: "Other / Not Listed", group: "Consumer & Other Services" },
];

export function getIndustryById(id: string): IndustryDefinition | undefined {
  return INDUSTRIES.find((industry) => industry.id === id);
}

export function getIndustriesByGroup() {
  return INDUSTRY_GROUPS.map((label) => ({
    label,
    industries: INDUSTRIES.filter((industry) => industry.group === label),
  })).filter((group) => group.industries.length > 0);
}
