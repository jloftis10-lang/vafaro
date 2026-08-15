import {
  CUSTOMER_CONCENTRATION_ADJUSTMENTS,
  OWNER_INVOLVEMENT_ADJUSTMENTS,
  RECURRING_REVENUE_ADJUSTMENTS,
  TREND_ADJUSTMENTS,
} from "@/lib/data/adjustments";
import type { ValuationInputs } from "@/lib/types";

export type QualityPositionLabel = "lower" | "middle" | "upper";

export interface QualityPosition {
  /** 0 = bottom of the benchmark's supported multiple range, 1 = top. */
  fraction: number;
  label: QualityPositionLabel;
  positiveFactors: string[];
  negativeFactors: string[];
}

interface QualityFactor {
  normalized: number;
  positiveLabel: string;
  negativeLabel: string;
  positiveThreshold: number;
  negativeThreshold: number;
}

function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

/**
 * Deterministic company-quality positioning (master prompt section 18):
 * places a company within its market-supported multiple range rather than
 * shifting a fixed midpoint by arbitrary additive amounts. Reuses the same
 * four factor tables as before (src/lib/data/adjustments.ts) — same
 * reviewed magnitudes, different mechanism. Each factor's own declared
 * min/max span (documented in that file) becomes a 0-1 normalized position
 * within *that factor's* possible outcomes; the four are averaged with
 * equal weight (a simple, defensible starting point — no basis exists yet
 * to weight one factor's positioning power over another) into one fraction
 * that positions the multiple within the selected benchmark's low-high
 * range in calculateValuation().
 */
export function computeQualityPosition(inputs: ValuationInputs): QualityPosition {
  const factors: QualityFactor[] = [
    {
      normalized: normalize(TREND_ADJUSTMENTS[inputs.trend], -0.5, 0.5),
      positiveLabel: "a growing revenue trend",
      negativeLabel: "a declining revenue trend",
      positiveThreshold: 0.6,
      negativeThreshold: 0.4,
    },
    {
      normalized: normalize(OWNER_INVOLVEMENT_ADJUSTMENTS[inputs.ownerInvolvement], -0.5, 0.5),
      positiveLabel: "the business running without the owner day to day",
      negativeLabel: "heavy day-to-day reliance on the owner",
      positiveThreshold: 0.6,
      negativeThreshold: 0.4,
    },
    {
      normalized: normalize(CUSTOMER_CONCENTRATION_ADJUSTMENTS[inputs.customerConcentration], -0.5, 0),
      positiveLabel: "low customer concentration",
      negativeLabel: "customer concentration risk",
      positiveThreshold: 0.9,
      negativeThreshold: 0.4,
    },
    {
      normalized: normalize(RECURRING_REVENUE_ADJUSTMENTS[inputs.recurringRevenuePct], 0, 0.5),
      positiveLabel: "a meaningful share of recurring revenue",
      negativeLabel: "little to no recurring revenue",
      positiveThreshold: 0.6,
      negativeThreshold: 0.1,
    },
  ];

  const fraction = factors.reduce((sum, f) => sum + f.normalized, 0) / factors.length;

  const positiveFactors = factors.filter((f) => f.normalized >= f.positiveThreshold).map((f) => f.positiveLabel);
  const negativeFactors = factors.filter((f) => f.normalized <= f.negativeThreshold).map((f) => f.negativeLabel);

  // Equal thirds is a deliberate, simple default for the human-readable
  // label only — it has no bearing on the actual (continuous) fraction used
  // for the multiple math above.
  const label: QualityPositionLabel = fraction >= 0.66 ? "upper" : fraction <= 0.33 ? "lower" : "middle";

  return { fraction, label, positiveFactors, negativeFactors };
}
