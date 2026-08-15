# Industry intelligence status

Tracks research/benchmark/calculator readiness per industry, so future benchmark research is easy to operationalize. Update this file whenever a benchmark's `calculatorUsage` or `evidenceQuality` changes.

## The five priority industries (master prompt section 29)

| Industry | Research status | Benchmark status | Calculator status | Industry-specific questions | Last review | Next review |
|---|---|---|---|---|---|---|
| Specialty Manufacturing | WebSearch-informed public benchmark only | Evidence Quality E (OwnerGauge inference), no size-band segmentation | `allowed` (fallback tier — see policy doc) | Built: backlog visibility, end-market concentration, capex outlook (3 questions) | 2025-2026 | 2027-01-01 |
| Specialty Distribution | WebSearch-informed public benchmark only | Evidence Quality E, no size-band segmentation | `allowed` (fallback tier) | Built: largest-supplier %, territory protection, reorder revenue mix (3 questions) | 2025-2026 | 2027-01-01 |
| Engineering & Technical Consulting | WebSearch-informed public benchmark only | Evidence Quality E, no size-band segmentation | `allowed` (fallback tier) | Built: contracted backlog, licensed staff beyond owner (2 questions) | 2025-2026 | 2027-01-01 |
| HVAC & Mechanical Services | WebSearch-informed public benchmark only | Evidence Quality E, no size-band segmentation | `allowed` (fallback tier) | Built: service/install mix, maintenance-agreement revenue, license holder beyond owner (3 questions) | 2025-2026 | 2027-01-01 |
| Accounting / CPA Firms | WebSearch-informed public benchmark only + real cited market context (accounting-firm-specific PE deal multiples, see `RESEARCH_SOURCES` — not yet formalized as a benchmark record) | Evidence Quality E, no size-band segmentation | `allowed` (fallback tier) | Built: recurring compliance revenue, owner-produced billings %, staff CPA depth (3 questions) | 2025-2026 | 2027-01-01 |

**Honest summary: none of the five priority industries have institutional (A/B) transaction data wired into the calculator yet.** All five currently produce valuations from the same Evidence-Quality-E "OwnerGauge inference" tier as the other 25 industries in the taxonomy — see `docs/valuation-benchmark-policy.md`'s explanation of why that tier stays `calculatorUsage: "allowed"` (preserves existing working functionality; Estimate Confidence communicates the honest grade as "Moderate," never "Higher"). Size-first segmentation exists at the *market-segment* level (`src/lib/valuation/market-segment.ts` — Micro / Small-Main Street / Lower Middle Market / Middle Market by revenue) but does not yet change which multiple a given industry uses within that industry — no size-banded benchmark data exists to drive that differentiation yet.

**Mechanism update:** these E-tier records now directly anchor the calculator's output range via `selectBenchmarks()` — previously `valuation.ts` read `INDUSTRY_VALUATION_PROFILES` directly and the benchmark-selection machinery only shaped Estimate Confidence and market-segment metadata alongside the number. Company-quality factors (trend, owner involvement, customer concentration, recurring revenue) now position the company within each benchmark's low-high range instead of shifting a fixed midpoint by additive amounts — see the "Company-quality positioning" section of `docs/valuation-benchmark-policy.md`. The evidence grade, applicability, and calculator-usage status of these five industries did not change; only how their existing numbers reach the calculator did. Real size-banded A/B data for any of the five (the GF Data manufacturing/distribution/engineering figures referenced in the original brief) is still not entered as structured benchmark records — see "What 'real research' would need to look like" below — and must not be fabricated to fill this gap.

## What "real research" would need to look like, per industry

To move any of the five from Evidence Quality E to a real `allowed`-tier A/B benchmark: a publisher, report title, source URL, publication date, data period, sample size (if disclosed), buyer population, geography, transaction structure, and at least a low/median/high multiple broken out by a size band relevant to OwnerGauge's actual user base (most are well under the $10M enterprise-value floor of the one real dataset currently in the system, GF Data). Add it to `RESEARCH_SOURCES` (`src/content/sources.ts`) first, then a `ValuationBenchmark` record referencing that `sourceId`.

## The other 25 industries in the taxonomy

Same status as the five above — Evidence Quality E, `calculatorUsage: "allowed"` as the working fallback, Estimate Confidence caps at "Moderate." Not prioritized for real-data research ahead of the five above, per the master prompt's explicit "build industry modules FIRST for [these five]" instruction. See `src/lib/data/industries.ts` for the full list.

## Industry-specific assessment questions (master prompt section 30) — built

All five priority industries now have their 2-4 question module (`src/lib/assessment/industry-questions.ts`), rendered conditionally in Step 1 of the assessment (`StepBusiness.tsx`) once the matching industry is selected. Every question is optional and supports "Not sure." Answers feed:

- **Industry-conditional risk flags** (`src/lib/assessment/risks.ts`) — e.g. limited manufacturing backlog, heavy supplier concentration, no HVAC maintenance-agreement revenue.
- **Two new hard-readiness-overrides** (`src/lib/assessment/readiness.ts`'s `readinessCapReasons()`): a required license/credential existing only with the owner (HVAC, Engineering, Accounting), and majority of billings personally produced by the owner in a professional-services model (Accounting) — both from master prompt section 11's example list, previously undeployable for lack of underlying data.
- **The "How a Buyer May View Your Business" qualitative narrative** (`src/lib/assessment/buyer-interest.ts`) — deterministic, template-based Market Position sentence, only rendered for these five industries and only when a real positive signal was answered (never a generic filler sentence).

Not extended to the other 25 industries in the taxonomy — that's the natural next increment once these five are validated in production.
