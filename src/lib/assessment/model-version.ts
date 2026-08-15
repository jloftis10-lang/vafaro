/**
 * Bump these when the corresponding logic changes materially, so past
 * submissions (which store all four versions — see
 * assessment_submissions.valuation_model_version / readiness_model_version /
 * industry_model_version / benchmark_dataset_version) stay interpretable
 * against the model that actually generated them rather than silently
 * being read against newer logic.
 *
 * - VALUATION_MODEL_VERSION: calculateValuation()'s multiple math. Bumped to
 *   2026.2: replaced the industry-midpoint + four additive-adjustment
 *   mechanism with selectBenchmarks()-driven range selection + deterministic
 *   quality positioning within that range (src/lib/valuation/quality-position.ts)
 *   — the benchmark-selection architecture now determines the valuation
 *   range itself, not just confidence/metadata alongside it. A 2026.1
 *   submission's multiple math is not directly comparable to a 2026.2 one
 *   even for identical inputs.
 * - READINESS_MODEL_VERSION: calculateReadiness()'s category weights/scorers
 *   (bumped to 2026.2 for the 7->4 Buyer Lens category merge).
 * - INDUSTRY_MODEL_VERSION: the industries.ts taxonomy + INDUSTRY_FIT_SCORES.
 * - BENCHMARK_DATASET_VERSION: VALUATION_BENCHMARKS' contents specifically —
 *   bump this (not VALUATION_MODEL_VERSION) when benchmark *data* changes
 *   without the selection/confidence *logic* changing, and vice versa.
 *   Bumped to 2026.09: added the broad-market fallback benchmark records
 *   (industry "*", allowed) that back the "other"/unrecognized-industry case.
 */
export const VALUATION_MODEL_VERSION = "2026.2";
export const READINESS_MODEL_VERSION = "2026.2";
export const INDUSTRY_MODEL_VERSION = "2026.1";
export const BENCHMARK_DATASET_VERSION = "2026.09";
