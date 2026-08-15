-- Stores the benchmark-driven valuation's audit trail (master prompt
-- sections 45-46): which benchmark record(s) determined the range and how
-- the company was positioned within it. Kept as one jsonb column rather
-- than several new scalar columns, per the "don't create excessive columns"
-- guidance — this is diagnostic/reconstruction data, not something queried
-- by itself.
alter table public.assessment_submissions
  add column if not exists valuation_explainability jsonb;
