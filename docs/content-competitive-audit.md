# Content competitive audit — flagship pages

Ran 3 of the master prompt's 12 suggested queries live (WebSearch was available this session). Documenting findings for those 3, plus the evaluation framework and the remaining 9 queries for a future pass — running the rest wasn't worth the marginal value against everything else in this phase, but the framework below makes it a quick follow-up.

## Findings

### "how much will I actually take home selling my business"

- **Who's ranking**: Home-sale-proceeds calculators dominate (wrong intent match — Google conflates "sell my business" with "sell my house" for this phrasing more than expected). The one real business-sale competitor found (Iconic) leads with a proceeds *calculator* and a specific, memorable claim: take-home lands around two-thirds of the sale price after debt payoff, brokerage fees (~10-15%, tiered by deal size), and capital gains tax.
- **OwnerGauge's opportunity**: Nobody in this space explains the *structure* (enterprise value → equity value → cash/note/earnout/rollover split) as clearly as they lead with a single blended percentage. Our flagship teaches the mechanism rather than anchoring on one number that varies enormously by deal — a real differentiation, but it means we're less quotable/shareable than "you'll keep about two-thirds." Worth watching whether that tradeoff costs us organic traffic against a punchier, less accurate competitor claim.
- **Gap we can own**: The distinction between guaranteed (cash at close) and contingent (earnout, rollover, note) consideration is essentially absent from what's ranking — everyone treats "purchase price" as one lump sum minus costs. Our `<ProceedsWaterfall />` visual is the differentiated angle.

### "how to sell a business step by step process guide"

- **Who's ranking**: Forbes, bank content-marketing blogs, business brokers, CPA firms — mostly the same 7-9 step outline (assess readiness → financials → valuation → prep → hire help → market → diligence → close), written for a broad SMB audience, not specifically the lower-middle-market owner.
- **Depth gap**: None of the ranking pages answer "what does the *buyer* evaluate at each stage" or "what commonly goes wrong here" — they describe the seller's to-do list, not the two-sided negotiation. Our per-stage 4-question structure (what happens / seller prep / buyer evaluates / common problems) is genuinely more useful than anything ranking for this query.
- **One real stat found**: "diligence takes 6-9 months on average" (uncited, no source given on the ranking page) — close to, but less precise than, our sourced IBBA breakdown by deal size. Worth noting competitors are comfortable stating uncited averages; our sourced version is a credibility edge, not just a nice-to-have.

### "EBITDA multiple small business valuation guide"

- **Who's ranking**: Valuation-advisory-firm content marketing (Peak Business Valuation, Sofer Advisors, DHJJ, Phoenix Strategy Group) — all publish an industry-by-industry multiple table, similar to what we deliberately did *not* build into this flagship (see `src/lib/data/valuation-benchmarks.ts`'s empty-on-purpose comment).
- **A genuinely useful data point surfaced**: sub-$1M EBITDA businesses trade around 2-3.5x, $1-5M EBITDA at 3-5.5x, $5M+ at 4-7x — a size-band breakdown similar in shape to the GF Data figures we already cite, from a different (unverified) source. Not added to `RESEARCH_SOURCES` since the publisher/methodology wasn't verified in this pass — a candidate for a future citation once confirmed.
- **Gap we can own**: Every ranking page implies "your industry has a multiple" as the headline framing. Our flagship's actual thesis — there is no single correct multiple, buyer type and quality factors move it more than industry alone — is the direct rebuttal to how this whole category currently writes about the topic. That's the differentiation worth defending in future content, not diluting toward an industry-multiple-table format just because it's what ranks.

## Evaluation framework (for the remaining 9 queries)

For each query, capture: ranking domains, content angle, content depth (does it answer the buyer-side question, not just the seller-side?), whether it cites real sources or states uncited averages, and one specific gap OwnerGauge's existing or planned content already fills or could fill.

## Remaining queries not yet run

- enterprise value vs equity value business sale
- EBITDA multiples middle market
- M&A sale process for business owners
- what happens after LOI
- earnout business sale
- working capital peg business sale
- quality of earnings seller
- rollover equity private equity
- strategic buyer vs private equity
