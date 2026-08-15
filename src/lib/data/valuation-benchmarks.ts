import { GENERIC_VALUATION_ASSUMPTIONS, INDUSTRY_VALUATION_PROFILES } from "@/lib/data/valuation-assumptions";

export type BuyerType = "individual" | "strategic" | "pe-platform" | "pe-addon" | "family-office" | "search-fund";
export type TransactionRole = "platform" | "add-on" | "both" | "unknown";
export type TransactionStructure = "asset" | "equity" | "mixed" | "unknown";
export type PublicOrPrivate = "private" | "public" | "mixed";

/**
 * A — institutional transaction evidence (robust closed-deal datasets, e.g.
 *     GF Data-type sources). B — reputable sector M&A research. C —
 * specialist advisor compilation, generally needs corroboration. D —
 * practitioner commentary, educational/contextual. E — OwnerGauge's own
 * inference. E must never be presented as external market evidence — see
 * docs/valuation-benchmark-policy.md.
 */
export type EvidenceQuality = "A" | "B" | "C" | "D" | "E";

export type EvidenceType =
  | "institutional-transaction-data"
  | "sector-research"
  | "specialist-compilation"
  | "practitioner-commentary"
  | "ownergauge-inference";

/**
 * ALLOWED — may influence the valuation range when applicability is
 * satisfied. SUPPORTING — may corroborate a range but shouldn't determine
 * it alone. CONTEXT-ONLY — may appear in educational content; must never
 * alter the calculated valuation. PROHIBITED — never used in valuation
 * logic at all. The selection engine below enforces this; it is not a
 * convention developers have to remember.
 */
export type CalculatorUsage = "allowed" | "supporting" | "context-only" | "prohibited";

export type BenchmarkMetric = "SDE" | "EBITDA" | "Adjusted EBITDA" | "Revenue" | "Recurring Revenue" | "RMR";

export interface ValuationBenchmark {
  id: string;

  /** Industry id from src/lib/data/industries.ts, or "*" for a broad-market record not specific to one industry. */
  industry: string;
  subIndustry?: string;

  metric: BenchmarkMetric;

  revenueBand?: { min?: number; max?: number };
  earningsBand?: { min?: number; max?: number };
  enterpriseValueBand?: { min?: number; max?: number };

  lowMultiple?: number;
  medianMultiple?: number;
  highMultiple?: number;

  buyerPopulation: BuyerType[];
  transactionRole: TransactionRole;
  transactionStructure?: TransactionStructure;
  publicOrPrivate: PublicOrPrivate;
  peSponsoredOnly: boolean;
  geography: string;

  /** Id into RESEARCH_SOURCES (src/content/sources.ts). Omitted for OwnerGauge-inference records, which have no external source. */
  sourceId?: string;
  evidenceType: EvidenceType;

  sampleSize?: number;
  periodMeasured: string;
  marketPeriod?: string;

  dataAsOf: string;
  publishedAt?: string;
  nextReviewAt: string;

  evidenceQuality: EvidenceQuality;
  /**
   * The record's *typical* applicability, before it's checked against a
   * specific company. Real applicability for a given assessment is computed
   * per-query by applicabilityFor() below, which can downgrade this default
   * (e.g. a broad PE-platform dataset defaults to "medium" here but scores
   * "low" applicability against a $2M-EBITDA owner-operated business).
   */
  applicability: "high" | "medium" | "low";
  calculatorUsage: CalculatorUsage;

  notes: string[];
  limitations: string[];
}

const CURRENT_PERIOD = "2025-2026";
const NEXT_REVIEW = "2027-01-01";

/**
 * The 30 industry SDE/EBITDA ranges in valuation-assumptions.ts are
 * WebSearch-researched public-benchmark estimates, directionally approved
 * by the site owner from his own deal experience — real analysis, but not
 * institutional transaction data with a verifiable sample size or
 * publisher. Represented honestly here as Evidence Quality E (OwnerGauge
 * inference), not A/B external evidence. calculatorUsage stays "allowed"
 * because this is the only valuation data OwnerGauge has for these industries
 * today, and removing it would regress working functionality — see
 * docs/valuation-benchmark-policy.md's "market baseline fallback" policy.
 * Estimate Confidence (src/lib/valuation/confidence.ts) reflects the E
 * grade honestly: these can only ever produce "Moderate," never "Higher."
 */
function deriveIndustryInferenceBenchmarks(): ValuationBenchmark[] {
  const records: ValuationBenchmark[] = [];
  for (const [industryId, profile] of Object.entries(INDUSTRY_VALUATION_PROFILES)) {
    const metrics: { metric: BenchmarkMetric; metricType: "sde" | "ebitda" }[] = [
      { metric: "SDE", metricType: "sde" },
      { metric: "EBITDA", metricType: "ebitda" },
    ];
    for (const { metric, metricType } of metrics) {
      const range = profile[metricType];
      records.push({
        id: `ownergauge-inference-${industryId}-${metricType}-v1`,
        industry: industryId,
        metric,
        lowMultiple: range.multipleLow,
        highMultiple: range.multipleHigh,
        medianMultiple: Math.round(((range.multipleLow + range.multipleHigh) / 2) * 100) / 100,
        buyerPopulation: ["individual", "strategic", "pe-platform", "pe-addon", "search-fund"],
        transactionRole: "unknown",
        transactionStructure: "unknown",
        publicOrPrivate: "private",
        peSponsoredOnly: false,
        geography: "US",
        evidenceType: "ownergauge-inference",
        periodMeasured: CURRENT_PERIOD,
        dataAsOf: CURRENT_PERIOD,
        nextReviewAt: NEXT_REVIEW,
        evidenceQuality: "E",
        applicability: "medium",
        calculatorUsage: "allowed",
        notes: [profile.basis],
        limitations: [
          "Directional public-benchmark estimate, not a verified institutional transaction dataset.",
          "No size/EV-band segmentation — the same multiple range is used regardless of company size within this industry.",
        ],
      });
    }
  }
  return records;
}

/**
 * Real, cited institutional transaction data (GF Data H1 2025) — genuinely
 * Evidence Quality B, unlike everything else in this file. Deliberately
 * marked calculatorUsage "context-only": this dataset covers PE-sponsored
 * platform buyouts from $10M-$500M enterprise value, and the overwhelming
 * majority of OwnerGauge's users are well below that floor. This is the exact
 * "high-quality dataset, low applicability" scenario the benchmark policy
 * exists to catch — see docs/valuation-benchmark-policy.md and the
 * corresponding test in valuation-benchmarks.test.ts.
 */
const GF_DATA_PE_PLATFORM_BENCHMARK: ValuationBenchmark = {
  id: "gf-data-h1-2025-ebitda-10m-500m",
  industry: "*",
  metric: "EBITDA",
  enterpriseValueBand: { min: 10_000_000, max: 500_000_000 },
  lowMultiple: 5.5,
  medianMultiple: 7.2,
  highMultiple: 10.0,
  buyerPopulation: ["pe-platform", "pe-addon"],
  transactionRole: "both",
  transactionStructure: "unknown",
  publicOrPrivate: "private",
  peSponsoredOnly: true,
  geography: "US",
  sourceId: "gf-data-small-deal-resilience-h1-2025",
  evidenceType: "institutional-transaction-data",
  periodMeasured: "H1 2025",
  marketPeriod: "H1 2025",
  dataAsOf: "H1 2025",
  nextReviewAt: "2026-07-01",
  evidenceQuality: "B",
  applicability: "medium",
  calculatorUsage: "context-only",
  notes: [
    "Multiple climbs by enterprise-value band within this range: ~5.9x at $10-25M, ~6.6x at $25-50M, ~8.7x at $50-100M, ~10.0x at $100-250M.",
    "Cited narratively on /resources/ebitda-multiple as the size-premium example — not wired into the calculator's output.",
  ],
  limitations: [
    "PE-sponsored deals only — not representative of individual-buyer or strategic-acquirer transactions.",
    "Floor of this dataset ($10M EV) is above most OwnerGauge users' company size, so applicability is low for the typical assessment.",
  ],
};

/**
 * Broad-market fallback for the one industry id without a research profile
 * ("other" — src/lib/data/industries.ts) and for any unrecognized industry
 * id. Wraps the same GENERIC_VALUATION_ASSUMPTIONS calculateValuation() used
 * to fall back on directly before this file existed, into a real
 * ValuationBenchmark record — so "no industry match" flows through
 * selectBenchmarks() like every other case (master prompt section 17's
 * fallback hierarchy) instead of a second, special-cased lookup path.
 * industry: "*" means it only wins when no industry-specific record exists —
 * selectBenchmarks() always ranks an exact industry match ahead of "*".
 */
function deriveGenericFallbackBenchmarks(): ValuationBenchmark[] {
  const metrics: { metric: BenchmarkMetric; metricType: "sde" | "ebitda" }[] = [
    { metric: "SDE", metricType: "sde" },
    { metric: "EBITDA", metricType: "ebitda" },
  ];
  return metrics.map(({ metric, metricType }) => {
    const assumption = GENERIC_VALUATION_ASSUMPTIONS[metricType];
    return {
      id: `ownergauge-inference-broad-market-${metricType}-v1`,
      industry: "*",
      metric,
      lowMultiple: assumption.multipleLow,
      highMultiple: assumption.multipleHigh,
      medianMultiple: Math.round(((assumption.multipleLow + assumption.multipleHigh) / 2) * 100) / 100,
      buyerPopulation: ["individual", "strategic", "pe-platform", "pe-addon", "search-fund"],
      transactionRole: "unknown",
      transactionStructure: "unknown",
      publicOrPrivate: "private",
      peSponsoredOnly: false,
      geography: "US",
      evidenceType: "ownergauge-inference",
      periodMeasured: CURRENT_PERIOD,
      dataAsOf: CURRENT_PERIOD,
      nextReviewAt: NEXT_REVIEW,
      evidenceQuality: "E",
      applicability: "medium",
      calculatorUsage: "allowed",
      notes: [assumption.basis],
      limitations: [
        "No industry-specific research — broad planning range only, not tailored to any sector.",
        "No size/EV-band segmentation.",
      ],
    };
  });
}

export const VALUATION_BENCHMARKS: ValuationBenchmark[] = [
  ...deriveIndustryInferenceBenchmarks(),
  ...deriveGenericFallbackBenchmarks(),
  GF_DATA_PE_PLATFORM_BENCHMARK,
];

export function getBenchmarkById(id: string): ValuationBenchmark | undefined {
  return VALUATION_BENCHMARKS.find((b) => b.id === id);
}

// ---------------------------------------------------------------------------
// Selection — deterministic priority order per docs/valuation-benchmark-policy.md.
// Never averages blindly, never picks whichever record produces the highest
// valuation (selection happens independent of any multiple's value).
// ---------------------------------------------------------------------------

export interface BenchmarkSelectionCriteria {
  industryId: string;
  metric: BenchmarkMetric;
  enterpriseValue?: number;
}

/**
 * How well a benchmark's *typical* applicability holds up for this specific
 * company — the applicability field on the record is a default, this is
 * the real per-query check. A benchmark with no size band is treated as
 * broadly applicable to its declared industry; a benchmark with a size band
 * is downgraded to "low" when the company's estimated enterprise value
 * falls well outside it (matching the master prompt's worked example: a
 * $100M-platform dataset applied to a $2M-EBITDA business is low
 * applicability regardless of the dataset's own evidence quality).
 */
function applicabilityFor(benchmark: ValuationBenchmark, criteria: BenchmarkSelectionCriteria): "high" | "medium" | "low" {
  const { enterpriseValueBand } = benchmark;
  if (!enterpriseValueBand || criteria.enterpriseValue === undefined) return benchmark.applicability;

  const { min = 0, max = Infinity } = enterpriseValueBand;
  if (criteria.enterpriseValue >= min && criteria.enterpriseValue <= max) return benchmark.applicability;

  // Company size is outside the band. How far outside determines the downgrade.
  const distanceRatio = criteria.enterpriseValue < min
    ? min / Math.max(criteria.enterpriseValue, 1)
    : criteria.enterpriseValue / max;
  if (distanceRatio >= 3) return "low";
  return "medium";
}

export interface SelectedBenchmark {
  benchmark: ValuationBenchmark;
  applicability: "high" | "medium" | "low";
}

/**
 * Returns every non-prohibited benchmark matching the industry+metric,
 * ranked by the priority order in section 21 of the master prompt: exact
 * industry match, then evidence quality, then applicability, then recency.
 * Callers decide what to do with ties/conflicts (see confidence.ts) — this
 * function only filters and ranks, it never averages.
 */
export function selectBenchmarks(criteria: BenchmarkSelectionCriteria): SelectedBenchmark[] {
  return VALUATION_BENCHMARKS
    .filter((b) => b.calculatorUsage !== "prohibited")
    .filter((b) => b.industry === criteria.industryId || b.industry === "*")
    .filter((b) => b.metric === criteria.metric)
    .map((benchmark) => ({ benchmark, applicability: applicabilityFor(benchmark, criteria) }))
    .sort((a, b) => {
      // Exact industry match beats the broad-market ("*") fallback.
      const industryRank = (x: SelectedBenchmark) => (x.benchmark.industry === criteria.industryId ? 0 : 1);
      if (industryRank(a) !== industryRank(b)) return industryRank(a) - industryRank(b);

      const qualityRank: Record<EvidenceQuality, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };
      if (qualityRank[a.benchmark.evidenceQuality] !== qualityRank[b.benchmark.evidenceQuality]) {
        return qualityRank[a.benchmark.evidenceQuality] - qualityRank[b.benchmark.evidenceQuality];
      }

      const applicabilityRank: Record<"high" | "medium" | "low", number> = { high: 0, medium: 1, low: 2 };
      if (applicabilityRank[a.applicability] !== applicabilityRank[b.applicability]) {
        return applicabilityRank[a.applicability] - applicabilityRank[b.applicability];
      }

      return b.benchmark.dataAsOf.localeCompare(a.benchmark.dataAsOf);
    });
}
