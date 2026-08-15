# OwnerGauge

A lead-generation site for a business valuation + deal readiness assessment,
targeting small business owners researching what their business is worth
before a potential sale. Leads feed into an M&A advisory practice.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres) for the `assessment_submissions` table
- Resend for transactional email
- Microsoft Clarity for optional, masked behavioral analytics
- Vitest for the assessment engines' test suite
- Deploy target: Vercel

## Scope

- `/` — homepage with a single CTA into the assessment.
- `/calculator` — a single-page, 5-step assessment (~15–18 questions) that
  computes a valuation range and a Deal Readiness score client-side (pure
  TypeScript, no AI), then shows a full results report inline: estimated
  market value, readiness score by category, strengths, risk flags, the
  top 3 highest-impact actions, and an adaptive CTA.
- Below the results, an email capture form (with a honeypot field for spam
  protection) that saves the full structured submission to Supabase and
  sends an upgraded report via Resend.

Explicitly out of scope for now: blog/CMS, accounts/login, a dashboard,
AI-generated commentary, payments, and an admin panel (query Supabase
directly instead).

## Data flow — read this before touching the scoring logic

All assessment logic lives in `src/lib/assessment/`:

- `types.ts` — the full type surface: `AssessmentAnswers` (all 5 steps) and
  the output contracts (`ReadinessResult`, `RiskFlag`, `Recommendation`,
  `LeadScoreResult`, `CTAResult`).
- `questions.ts` — centralized question copy, options, and helper text for
  the UI. Conditional-question predicates (e.g. only ask about customer
  contract protection above 20% concentration) live here too.
- `valuation-adapter.ts` — maps the assessment's finer-grained answers down
  to the `ValuationInputs` shape `src/lib/valuation.ts` expects.
- `src/lib/data/industries.ts` — a grouped 30-industry product taxonomy with
  no embedded multiples, content, or lead-fit scores.
- `src/lib/data/valuation-assumptions.ts` — explicit provisional SDE/EBITDA
  fallbacks. No industry-specific assumption is currently marked reviewed;
  the UI therefore does not claim to show current industry transaction comps.
- `src/lib/data/adjustments.ts` — provisional company-factor adjustments,
  isolated for human review and future replacement.
- `readiness.ts` — the 7-category weighted Deal Readiness score (0–100).
  Category weights live in `categories.ts`.
- `risks.ts` — deterministic Critical/Important/Opportunity risk flag rules.
- `strengths.ts` — the inverse of `risks.ts`, for the "what's working"
  section.
- `recommendations.ts` — ranks triggered risks into the top 3 actions.
- `lead-score.ts` / `lead-score-config.ts` — internal-only 0–100 lead score
  and A–D classification. **Never returned to the client.** Tunable
  weights/brackets/thresholds are isolated in the config file — the
  industry-fit scores and deal-size $ brackets in there are placeholders
  pending real inputs from the practice.
- `cta.ts` — picks the results page's closing call-to-action based on
  readiness + sale timeline.
- `schema.ts` — the Zod validation for a submission (used by both the API
  route and its tests).

Every engine is pure TypeScript with no I/O, so they're safe to call from
client or server code and are covered by unit tests in
`src/lib/assessment/__tests__/`.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Resend credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

```bash
npm test
```

Runs the Vitest suite for the assessment engines (readiness, risks,
recommendations, lead score, valuation adapter, strengths, CTA, and the
validation schema).

## Supabase

Apply `supabase/migrations/0001_create_submissions.sql` and
`0002_create_assessment_submissions.sql` to your Supabase project (via the
SQL editor, or the Supabase CLI). `assessment_submissions` is the live
table for the current assessment flow; `submissions` is a legacy table from
an earlier iteration, kept for its existing rows but no longer written to.
Row-level security is enabled on both with no policies — the only writer is
the server-side `/api/assessment/submit` route, which uses the service role
key and bypasses RLS. There's no admin panel; query directly via the
Supabase dashboard's SQL editor.

## Environment variables

See `.env.example`. `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are
server-only — do not prefix them with `NEXT_PUBLIC_`, since the service role
key must never reach the browser. `NEXT_PUBLIC_BOOKING_URL` is the one
public exception — it's where the results page's "Schedule a Confidential
Conversation" CTA links to; until it's set, that CTA falls back to
scrolling to the on-page email capture form instead.

Microsoft Clarity uses OwnerGauge project `y0l9bq6ldx` by default.
`NEXT_PUBLIC_CLARITY_PROJECT_ID` can override it for another environment.
The assessment and generated report subtree is explicitly masked from
session recordings.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
- `npm test` — Vitest suite
