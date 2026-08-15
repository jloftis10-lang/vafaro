# Terminology reference & longitudinal data architecture

Two related reference topics from the 2026-08 credibility/compliance pass: consistent product terminology, and whether the current data model blocks future repeated-assessment ("re-gauge") and diligence-comparison features. Neither topic required code changes beyond what's noted below — this documents what already exists and what's still open.

## Terminology reference

Preferred site-wide terms, already used consistently as of this pass:

| Use this | Not this |
|---|---|
| OwnerGauge | Vafaro (fully removed; see below) |
| The OwnerGauge Assessment | — |
| Your OwnerGauge Report | — |
| Estimated Market Value (range) | Appraised Value, Official Value |
| Estimate Confidence | Certified Confidence |
| Deal Readiness | — |
| Earnings Quality / Revenue Quality / Transferability | — |
| Concentration Risk | — (see open item below) |

Always avoid, sitewide (verified clean via repo-wide search this pass — none found):

- "Certified Valuation" / "Professional Valuation" / "Appraised Value" / "Official Value"
- "AI-powered" / "proprietary AI" (the engine is explicitly deterministic, rule-based, and the disclaimer page says so directly — that's a credibility strength, not a gap to fill)

**Open item, not applied this pass:** the master prompt's terminology list suggests "Revenue Diversification" as the preferred label instead of "Concentration Risk." The current codebase uses "Concentration Risk" as a load-bearing string in several places — `src/lib/assessment/categories.ts` (`CATEGORY_LABELS`), `ReadinessSection.tsx`, `TransactionSnapshotSection.tsx`, the methodology page, and a literal assertion in `src/lib/assessment/__tests__/snapshot.test.ts`. A prior pass already addressed the most confusing symptom (a bare "Concentration Risk — 92" reading ambiguously since higher is better despite the word "Risk") by adding a qualitative Low/Moderate/Elevated readout next to the score (`ReadinessSection.tsx`). A full label rename is a larger, testable behavior change than this pass's scope — flagging it here as a deliberate decision to defer, not an oversight.

## Vafaro cleanup status

Confirmed via repo-wide case-insensitive search this pass: zero remaining public-facing "Vafaro" references anywhere in the codebase. The only surviving references are the intentional 301 redirect in `next.config.ts` (`vafaro.com` / `www.vafaro.com` → `www.ownergauge.com`), which the master prompt explicitly says is fine to keep, and `.next/` build artifacts (gitignored, regenerated, not shipped as source).

## Longitudinal data readiness

The schema already supports future longitudinal comparison without changes:

- Every `assessment_submissions` row has a stable UUID `id`, a `created_at` timestamp, and four independent version columns (`valuation_model_version`, `readiness_model_version`, `industry_model_version`, `benchmark_dataset_version` — added across migrations `0003`/`0004`) plus a `valuation_explainability` jsonb column (migration `0005`) capturing which benchmark(s) and quality-position factors drove that specific result.
- Rows are never overwritten or mutated after insert — each assessment is an immutable, independently-versioned snapshot. A future "re-gauge" feature (owner returns in 6/12/24 months) can join on `email` (the one stable identifying field collected) and order by `created_at` without any schema change.
- Historical rows stay interpretable even after the scoring logic changes, because the version columns record exactly which model produced them — this was a deliberate design goal of the versioning system, not incidental.

What does **not** exist yet, and would need to be built when the feature is actually prioritized (not before):

- Any UI for an owner to request or view a re-gauge comparison.
- Any verified/diligence-stage or transaction-outcome data model (the master prompt's own "potential future fields" — verified revenue, QoE-adjusted EBITDA, transaction outcome, closing multiple, etc.). Nothing in the current schema blocks adding these later as a separate table joined by email or a future user identifier; nothing needs to change now to keep that option open.
- Any admin/internal tooling to actually run these comparisons. Per the master prompt's own scope limits, this pass did not build one.

**Conclusion: the data model does not need to change to keep re-gauge and longitudinal-comparison options open.** No action taken beyond confirming this.
