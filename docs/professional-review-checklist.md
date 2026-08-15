# Professional review checklist

Distinct from `docs/legal-review-checklist.md`: that file is for counsel. This one covers the non-legal professional review OwnerGauge needs before significant public promotion — a valuation professional, an M&A practitioner, and a security/data pass, plus founder-fact verification. None of this has happened yet; this is the standing list of who needs to look at what.

## Legal counsel

See `docs/legal-review-checklist.md` in full. Summary pointer only, not a duplicate list.

## Valuation professional

- [ ] Review the distinction drawn throughout the site between "OwnerGauge Estimate" and a formal professional valuation — is the line drawn in the right place, and is it drawn clearly enough for a lay reader? (`/methodology`, `/disclaimer`, results page, emailed report.)
- [ ] Review `src/lib/valuation.ts` / `src/lib/valuation/quality-position.ts` methodology wording for anything that overstates precision or certainty relative to what the underlying benchmark data (`docs/valuation-benchmark-policy.md`) actually supports.
- [ ] Review Estimate Confidence's three-tier framing (Higher/Moderate/Limited) — does it read as a professional-standard concept to a valuation practitioner, or does it invite confusion with a formal confidence interval?
- [ ] Sanity-check the "no false precision" convention (ranges like "$7.2M–$8.0M," never "$7,438,291" — enforced in `roundDirectionalValue()` in `src/lib/valuation.ts`) is actually followed everywhere a dollar figure or multiple renders.

## M&A practitioner

- [ ] Review the four Deal Readiness categories (Revenue Quality, Earnings Quality, Transferability, Concentration Risk — `src/lib/assessment/categories.ts`) for whether they reflect how a real buyer actually evaluates a target, and whether anything material is missing.
- [ ] Review "What Buyers May Like" / "What Buyers May Question" narrative content (`src/lib/assessment/buyer-interest.ts`) for accuracy against real buyer behavior.
- [ ] Review industry-specific content for the priority industries (`src/content/industries/*.ts`) — HVAC, plumbing, specialty manufacturing, specialty distribution, accounting, etc. — for anything a practitioner in that space would flag as off.
- [ ] Review `/sell-your-business`'s stage-by-stage process description for accuracy against a real deal timeline.

## Security / data

- [ ] Confirm the retention/deletion posture described in `docs/legal-review-checklist.md`'s Data section is acceptable, or set an actual policy.
- [ ] Confirm no security claim anywhere overstates what's actually true (see the Security section of the legal checklist — none currently exist, keep it that way unless a specific true claim is added and attributed).
- [ ] Confirm the third-party processor list (Supabase, Resend, Microsoft Clarity) is complete and accurately described wherever it's mentioned.

## Founder verification

- [ ] **CM&AA** — confirm the site owner currently holds the Certified Merger & Acquisition Advisor certification (corrected this pass from the non-existent "CM&A" abbreviation in `src/lib/content/founder.ts`).
- [ ] **Transaction claims** — the "$5 million to $320 million" deal-range and "worked on" (not "closed") framing in `src/lib/content/founder.ts` has not been independently verified this pass. Confirm the figures and confirm "worked on" is the accurate verb (vs. "closed," "advised on," "represented a party in," etc. — these are not interchangeable claims).
- [ ] **Prior employment** — no current or prior employer is named anywhere in the site (`firm: ""` in `founder.ts`). If one is ever added, confirm dates, title, and whether describing it implies any current relationship, license, or authorization that doesn't actually exist.
- [ ] **Blue River Financial Group wording** — no reference exists anywhere in the repo as of this pass (verified via repo-wide search, both `.ts`/`.tsx` source and public copy). This item stays open only in case that changes: any future reference needs to be clearly historical, past-tense, and free of any implied current affiliation, employment, endorsement, ownership, partnership, or referral arrangement.
- [ ] **Title** — changed this pass from "Independent M&A Advisor" to "Founder, OwnerGauge" (see `src/lib/content/founder.ts`'s comment block for the reasoning: the former asserts an active, ongoing advisory role/practice that isn't anchored to any confirmed current firm or license in this codebase). Confirm this is the desired final positioning, or provide the specific accurate alternative.
