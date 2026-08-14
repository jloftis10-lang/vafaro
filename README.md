# Vafaro

Vafaro is a travel fit-check for families planning around an older adult's real walking, standing, stairs, and pacing tolerance. The current product includes a general family trip scan and a narrow shore-excursion pilot for checking one named cruise excursion against one traveler profile.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Current experience

- Premium, responsive landing page
- Four-step browser-based Trip Check intake and heuristic report
- Structured named shore-excursion intake and traveler fit-check
- Transparent evidence, unknown, and confidence language
- Reusable human-review schema and standard report template
- Founding-family human-review application saved to Neon Postgres
- Guarded Resend notifications with delivery status stored alongside each application
- Private human-review offer lookup, explicit scope acceptance, and Stripe-hosted checkout handoff
- Signed Stripe webhook processing for paid and expired checkout sessions
- Contact, privacy, terms, analytics, sitemap, and canonical metadata

The free scan applies deterministic heuristics to the information a traveler enters. It does not yet browse or independently verify live excursion listings, routing, weather, accessibility, or operator policies. Paid human verification should not be offered as a guarantee; dated sources, material unknowns, and traveler-specific limits need to remain visible in every reviewed result.

## Environment

The lead, offer, and payment-status APIs require `DATABASE_URL`. Reviewer notifications activate when `RESEND_API_KEY` and `REVIEWER_NOTIFICATION_EMAIL` are configured; `VAFARO_NOTIFICATION_FROM` optionally sets a verified sender. Stripe checkout activates when `STRIPE_SECRET_KEY` is configured. Set `STRIPE_WEBHOOK_SECRET` for the `/api/stripe-webhook` endpoint and `NEXT_PUBLIC_SITE_URL` to the canonical production origin. Vercel Web Analytics is enabled through `@vercel/analytics`.

## Pilot review offers

An application does not automatically become payable. A reviewer must first finalize the written offer in Neon. For the early pilot, update the application row only after agreeing on the scope:

```sql
UPDATE founding_family_leads
SET review_offer_status = 'offered',
    review_offer_scope = '["Verify the named excursion route and activity requirements", "Compare walking, standing, stairs, and transfers with the submitted traveler profile", "Deliver a dated evidence register, recommendation, and unresolved unknowns"]'::jsonb,
    review_offer_price_cents = 11900,
    review_offer_delivery_estimate = 'Within 5 business days after confirmed payment',
    review_offer_revision_terms = 'One clarification round within 7 days of delivery; new research is a separate scope',
    review_offer_refund_terms = 'Full refund before research begins; no refund after the completed report is delivered',
    review_offer_expires_at = NOW() + INTERVAL '14 days',
    updated_at = NOW()
WHERE id = 42;
```

Replace `42` and every offer term with the actual agreement. The customer then opens `/review/offer?lead=42`, confirms the application email, reviews the terms, and accepts before checkout. Without Stripe credentials, acceptance is recorded but no payment is requested.
