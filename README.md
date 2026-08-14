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
- Shore-excursion fit-check pilot landing page
- Transparent evidence, unknown, and confidence language
- Founding-family human-review application saved to Neon Postgres
- Contact, privacy, terms, analytics, sitemap, and canonical metadata

The free scan applies deterministic heuristics to the information a traveler enters. It does not yet browse or independently verify live excursion listings, routing, weather, accessibility, or operator policies. Paid human verification should not be offered as a guarantee; dated sources, material unknowns, and traveler-specific limits need to remain visible in every reviewed result.

## Environment

The lead and contact APIs require `DATABASE_URL`. Vercel Web Analytics is enabled through `@vercel/analytics`.
