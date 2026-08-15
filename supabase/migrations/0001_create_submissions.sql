create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  industry text not null,
  revenue numeric not null,
  sde_or_ebitda numeric not null,
  metric_type text not null check (metric_type in ('sde', 'ebitda')),
  trend text not null,
  owner_involvement text not null,
  customer_concentration text not null,
  recurring_revenue_pct text not null,
  calculated_multiple_low numeric not null,
  calculated_multiple_high numeric not null,
  valuation_low numeric not null,
  valuation_high numeric not null
);

-- Row level security is on with no policies: the only writer is the
-- server-side /api/submit route, which uses the service role key and
-- bypasses RLS. There's no admin panel in V1 — query this table directly
-- via the Supabase SQL editor / dashboard, which also bypasses RLS.
alter table public.submissions enable row level security;
