-- Extends model-version tracking (0003) to cover the industry taxonomy and
-- the valuation-benchmark dataset separately from the valuation/readiness
-- scoring logic itself, per the Valuation Intelligence + Deal Readiness V1
-- master prompt's model-versioning requirement (section 27).
alter table public.assessment_submissions
  add column if not exists industry_model_version text not null default '2026.1',
  add column if not exists benchmark_dataset_version text not null default '2026.08',
  add column if not exists estimate_confidence_level text,
  add column if not exists market_segment text;
