-- Tracks which deterministic model version produced each row's valuation and
-- readiness output, so future changes to the scoring/valuation logic
-- (src/lib/valuation.ts, src/lib/assessment/readiness.ts) don't make past
-- submissions ambiguous to interpret. Defaulted for the existing row.
alter table public.assessment_submissions
  add column if not exists valuation_model_version text not null default '2026.1',
  add column if not exists readiness_model_version text not null default '2026.1';
