# Legal review checklist

**STATUS: PROFESSIONAL LEGAL REVIEW REQUIRED BEFORE SIGNIFICANT PUBLIC PROMOTION.**

Neither `/terms`, `/privacy`, nor `/disclaimer` have been reviewed by an attorney. They were drafted for directional accuracy about what this specific app actually does — not as a substitute for that review. This file is the honest internal record of that status; the public pages themselves no longer announce it (a legal page stating its own unreviewed status undermines the site's credibility with the professional audiences OwnerGauge is trying to reach more than it protects anyone — see the 2026-08 credibility/compliance pass).

This document does not draft legal conclusions. It organizes what counsel needs to look at, so the legal architecture can be handed to a real attorney rather than reviewed page-by-page from scratch.

## Valuation

- [ ] Confirm "directional estimate" / "not a formal business valuation, appraisal, or fairness opinion" language (present on the results page, `/disclaimer`, `/methodology`, footer, and in the emailed report — see `src/components/assessment/results/ValuationSection.tsx`, `src/app/disclaimer/page.tsx`, `src/app/methodology/page.tsx`, `src/components/site/Footer.tsx`, `src/lib/assessment/email-template.ts`) is legally sufficient and consistently worded.
- [ ] Confirm "Estimate Confidence" (Higher/Moderate/Limited) framing doesn't itself imply a certification or professional opinion.
- [ ] Review `src/content/industries/*.ts` for any remaining industry-specific valuation claims that read as more authoritative than "directional, evidence-informed range" — see `docs/valuation-benchmark-policy.md` and `docs/industry-intelligence-status.md` for the underlying evidence-quality framework.

## Advisory

- [ ] Confirm no page implies an advisory, consulting, brokerage, or fiduciary relationship is created by using the site (current language: `src/app/disclaimer/page.tsx`, `src/app/privacy/page.tsx` — "Submitting an assessment does not create an advisory, consulting, or fiduciary relationship of any kind").
- [ ] Confirm CTA copy (`src/lib/assessment/cta.ts`) doesn't cross into offering brokerage or investment-banking services — current three tiers ("Schedule a Confidential Conversation," "Get My Exit Preparation Plan," "Email Me These Results") are deliberately non-transactional; flag if that changes.
- [ ] Confirm no page states or implies OwnerGauge negotiates, represents sellers in, or solicits transactions.

## Data

- [ ] What's collected: email (required), assessment answers (business financials, qualitative operating detail — see `src/lib/assessment/schema.ts` and `supabase/migrations/0002_create_assessment_submissions.sql`). No name, phone, or company name field exists (the `company` field in the submission schema is a spam honeypot, not a real data field — see the `if (company) return` early-exit in `src/app/api/assessment/submit/route.ts`).
- [ ] Third-party processors: Supabase (storage), Resend (email delivery), Microsoft Clarity (optional analytics — assessment answers/financial inputs/email/report content are explicitly masked from session recordings, see `src/components/analytics/ClarityTracking.tsx`).
- [ ] Retention: no automated retention/deletion policy exists yet. Every row in `assessment_submissions` persists indefinitely once written. Deletion today is a manual request-driven process (`/privacy`: "If you have questions about your data or want it removed, contact us"). Counsel should set an actual retention period and whether/how it's enforced technically.
- [ ] Access/deletion requests: no self-service mechanism exists. Confirm whether one is legally required for the jurisdictions being marketed to before scaling promotion.

## Security

- [ ] No claims made anywhere in the current copy about encryption strength, "bank-level" security, or compliance certifications (verified via repo-wide search this pass — none found). Keep it that way unless a specific, true, attributable claim is added later.
- [ ] RLS is enabled on `assessment_submissions` with no policies; the only writer is the server-side route using the Supabase service role key. Confirm this is accurately described if security posture is ever discussed publicly.

## Privacy

- [ ] California / CCPA and other state privacy law applicability — not evaluated. `/privacy` flags this itself ("especially around any state-specific privacy law requirements (CCPA, etc.) that may apply").
- [ ] Confirm whether current data collection (email + business financials) triggers any state-specific disclosure or consent requirements beyond the current implicit-consent framing near the submit button.

## Transactions

- [ ] California business-brokerage licensing, securities-related transaction issues, referral/transaction-based compensation, and business-opportunity rules — not evaluated by this pass. See `docs/professional-review-checklist.md` for the standing item; do not assume any license (real estate or otherwise) resolves M&A-transaction regulatory questions without counsel confirming that specifically.

## Content

- [ ] Confirm resource articles (`src/content/resources/*.ts`) that touch tax, legal, or accounting topics (e.g. `earnouts.ts`, `working-capital-adjustments.ts`, `asset-sale-vs-stock-sale.ts`) are adequately hedged as educational content, not advice. Spot-checked this pass — each carries a `Disclaimer` component (`src/components/content/Disclaimer.tsx`) with type-specific wording (`tax`, `legal`, `earnout`, `working-capital`); confirm coverage is complete across all articles that touch these topics.

## Founder

- [ ] Credential: corrected this pass from "Certified M&A Advisor (CM&A)" to "Certified Merger & Acquisition Advisor (CM&AA)" in `src/lib/content/founder.ts` — confirm the site owner holds this exact certification.
- [ ] Employment: title changed this pass from "Independent M&A Advisor" to "Founder, OwnerGauge" — see the comment block in `src/lib/content/founder.ts` for why. No firm/employer is currently named (`firm: ""`).
- [ ] Blue River Financial Group: no reference exists anywhere in the repo as of this pass (verified via repo-wide search). If historical experience there is ever added, it needs explicit past-tense framing with no implied current relationship — see `docs/professional-review-checklist.md`.
- [ ] Deal-range claim ("$5 million to $320 million," "worked on" — never "closed") — not independently verified by this pass; flagged for founder verification.
