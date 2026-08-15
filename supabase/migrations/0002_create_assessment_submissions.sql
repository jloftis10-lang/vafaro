create table if not exists public.assessment_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  email text not null,

  -- Step 1 — core business inputs, kept as scalar columns since they're the
  -- fields most likely to be filtered or sorted on directly.
  industry text not null,
  revenue numeric not null,
  metric_type text not null check (metric_type in ('sde', 'ebitda')),
  metric_value numeric not null,

  -- Valuation engine output (src/lib/valuation.ts via the adapter).
  multiple_low numeric not null,
  multiple_high numeric not null,
  valuation_low numeric not null,
  valuation_high numeric not null,

  -- Deal Readiness engine output (src/lib/assessment/readiness.ts).
  readiness_total numeric not null,
  readiness_band text not null,
  readiness_categories jsonb not null,

  -- Risk / recommendation / strength engines (risks.ts, recommendations.ts, strengths.ts).
  risk_flags jsonb not null,
  recommendations jsonb not null,
  strengths jsonb not null,

  -- Step 5 — lead qualification signals, kept queryable rather than buried
  -- in the full answers payload.
  sale_timeline text not null,
  transaction_priorities text[] not null,

  -- Internal lead score (lead-score.ts) — never returned to the client,
  -- only ever written here from server-side code.
  lead_score numeric not null,
  lead_classification text not null check (lead_classification in ('A', 'B', 'C', 'D')),

  -- Full raw assessment payload, for anything not broken out into a
  -- column above and for future re-scoring if the engines change.
  answers jsonb not null
);

-- Row level security is on with no policies: the only writer is the
-- server-side /api/assessment/submit route, which uses the service role
-- key and bypasses RLS. No admin panel in V1 — query directly via the
-- Supabase SQL editor/dashboard, which also bypasses RLS.
alter table public.assessment_submissions enable row level security;
