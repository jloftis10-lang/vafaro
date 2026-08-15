# Valuation benchmark policy

Governs `src/lib/data/valuation-benchmarks.ts` (the `ValuationBenchmark` schema and `selectBenchmarks()`) and `src/lib/valuation/confidence.ts` (`calculateEstimateConfidence()`). Read this before adding, editing, or approving any benchmark record.

## The schema

Every benchmark carries, at minimum: `industry`/`subIndustry`, `metric` (SDE / EBITDA / Adjusted EBITDA / Revenue / Recurring Revenue / RMR — never mixed in a single comparison), a size band (`revenueBand`, `earningsBand`, or `enterpriseValueBand`), `lowMultiple`/`medianMultiple`/`highMultiple`, `buyerPopulation`, `transactionRole` (platform / add-on / both / unknown), `transactionStructure` (asset / equity / mixed), `publicOrPrivate`, `peSponsoredOnly`, `geography`, `sourceId`, `evidenceType`, `evidenceQuality`, `applicability`, `calculatorUsage`, and freshness fields (`dataAsOf`, `nextReviewAt`).

**Never** reduce a benchmark to a bare `{ industry, multiple }` pair. That collapses exactly the distinctions (size, buyer type, structure, evidence grade) this schema exists to preserve.

## Evidence quality (A–E)

- **A** — institutional transaction evidence: robust closed-deal datasets (GF Data-type sources, transparent transaction databases).
- **B** — reputable sector M&A research.
- **C** — specialist advisor compilation; generally needs corroboration.
- **D** — practitioner commentary; educational/contextual only.
- **E** — OwnerGauge's own inference. **Never presented as external market evidence** — every E-graded record's notes must make clear it's OwnerGauge's directional analysis, not a cited dataset.

## Applicability is separate from evidence quality

A high-quality (A/B) dataset can still be low-applicability for a specific company. Example already in the codebase: GF Data's H1 2025 PE-platform transaction data is genuinely Evidence Quality B, but its $10M–$500M enterprise-value floor sits above most OwnerGauge users, so it's marked `calculatorUsage: "context-only"` regardless of its evidence grade. `applicabilityFor()` in `valuation-benchmarks.ts` computes real per-query applicability by comparing the company's estimated enterprise value against the benchmark's declared band; a record's own `applicability` field is only the typical/default value used when no size comparison applies.

## Calculator usage — the enforcement layer

- **allowed** — may influence the valuation range when applicability is satisfied.
- **supporting** — may corroborate a range but shouldn't determine it alone.
- **context-only** — may appear in educational content (guide pages, methodology); must never alter the calculated valuation.
- **prohibited** — never used in valuation logic, full stop.

`selectBenchmarks()` filters out `prohibited` records unconditionally. `calculateEstimateConfidence()` only counts `allowed`/`supporting` records toward confidence — a `context-only` record, however strong its evidence quality, can never push confidence above what the `allowed` records support. This is enforced in code, not left to developer memory.

**This now also governs the valuation number itself, not just confidence.** `calculateValuation()` (`src/lib/valuation.ts`) calls `selectBenchmarks()` directly: the highest-ranked `allowed` record anchors the multiple range (`benchmarkLow`/`benchmarkHigh`), any matching `supporting` records may widen that range, and `context-only`/`prohibited` records are structurally excluded from `pickPrimaryBenchmark()`/`widenWithSupporting()` — they can never move the number no matter how the selection ranking shakes out. This replaced the prior architecture, where `valuation.ts` read `INDUSTRY_VALUATION_PROFILES` directly and the benchmark/selection machinery only fed `calculateEstimateConfidence()` and market-segment metadata alongside the number, not into it.

## Company-quality positioning within the range

Once a benchmark anchors `[benchmarkLow, benchmarkHigh]`, `computeQualityPosition()` (`src/lib/valuation/quality-position.ts`) places the company within that range rather than shifting a fixed midpoint by additive point deltas. It reuses the same four factor tables as before (`src/lib/data/adjustments.ts` — trend, owner involvement, customer concentration, recurring revenue), normalized to each factor's own declared span and averaged into one 0-1 fraction: `positionedMultiple = benchmarkLow + fraction * (benchmarkHigh - benchmarkLow)`. The positioned point is then widened into a displayed range (± 0.4x, clamped to the benchmark range padded by 0.5x on each side) — see `VALUATION_MULTIPLE_SPREAD`/`CLAMP_PADDING` in `valuation.ts`. `benchmarkIdsUsed`, the position fraction/label, and the deterministic positive/negative factor labels are attached to `ValuationResult` for the results page's "Why this valuation?" drawer and persisted per-submission (`valuation_explainability` jsonb column, migration `0005`).

## Benchmark selection (deterministic, no averaging)

Priority order when multiple benchmarks match: exact subindustry match → appropriate earnings metric → appropriate size/EV band → private/public population → relevant buyer universe → relevant transaction role → higher evidence quality → higher applicability → most recent comparable market period.

**Never** blindly average conflicting benchmarks, and **never** select a benchmark because it produces a higher valuation — selection happens independent of any multiple's value (`selectBenchmarks()` ranks purely on evidence/applicability/recency criteria, with no awareness of the resulting number).

## Conflict resolution

If multiple credible sources disagree, investigate whether the difference traces to size, buyer population, geography, deal period, subindustry, platform/add-on, SDE/EBITDA, public/private, or asset/equity structure. If it can't be reconciled: widen the range, lower confidence, preserve both sources, and document the limited comparability in `notes`/`limitations`. The codebase doesn't yet have two genuinely conflicting A/B records for the same industry+metric+size — this policy is written ahead of that happening, not in response to it.

## Recency and staleness

Every benchmark has `dataAsOf` and `nextReviewAt`. A stale benchmark should never be silently deleted; flag it for review (mirroring `src/content/freshness.ts`'s `findStaleContent()` pattern) and consider downgrading applicability if very stale, but only through an explicit, documented rule — not automatically.

## Model versioning

Four independent versions persist with every assessment submission (`src/lib/assessment/model-version.ts`): `VALUATION_MODEL_VERSION` (the multiple math/adjustments), `READINESS_MODEL_VERSION` (Buyer Lens category weights/scorers), `INDUSTRY_MODEL_VERSION` (the taxonomy + fit scores), `BENCHMARK_DATASET_VERSION` (this file's data specifically). Bump the narrowest version that actually changed — a new benchmark record doesn't require bumping the valuation logic version, and vice versa.

## No false precision

Display sensible ranges (`5.0x–6.0x`, not `5.37x–5.91x`) and rounded dollar figures (`$7.2M–$8.0M`, not `$7,438,291`). `roundDirectionalValue()` in `src/lib/valuation.ts` already enforces this on the dollar side.

## Calculator approval process

A benchmark only earns `calculatorUsage: "allowed"` when: (1) its `sourceId` resolves to a real entry in `RESEARCH_SOURCES` (or, for OwnerGauge-inference records, the E-quality grade is honestly declared), (2) size/EV band, buyer population, and transaction structure are populated (not left `unknown` when knowable), and (3) `evidenceQuality` and `applicability` are set deliberately, not defaulted. Never invent a benchmark's numbers to finish an integration — an unresearched industry gets `calculatorUsage: "prohibited"` (or the honest E-grade "allowed" fallback this dataset currently uses) until real data is supplied, never a fabricated placeholder presented as real.

## Related

- `docs/industry-intelligence-status.md` — per-industry research/benchmark/calculator status.
- `docs/content-competitive-audit.md` — unrelated (content SEO audit, not benchmark data).
