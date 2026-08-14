import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { sendReviewAcceptanceNotification } from "../lib/reviewer-notification.js";

type OfferRequest = {
  action?: unknown;
  leadId?: unknown;
  email?: unknown;
  scopeAccepted?: unknown;
  termsAccepted?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const leadIdPattern = /^\d{1,18}$/;
const allowedActions = new Set(["lookup", "accept"]);
const activeOfferStatuses = new Set(["offered", "accepted"]);

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanScope(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 12).map(item => cleanText(item, 240)).filter(Boolean);
}

async function hashIp(value: string) {
  const bytes = new TextEncoder().encode(`${value}:${process.env.LEAD_HASH_SALT ?? "vafaro-leads-v1"}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

function siteOrigin(request: Request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    try { return new URL(configured).origin; } catch { /* fall through */ }
  }
  return new URL(request.url).origin;
}

async function createCheckout(input: { leadId: string; email: string; priceCents: number; reportTitle: string; origin: string }) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return { ready: false as const };

  const params = new URLSearchParams({
    mode: "payment",
    success_url: `${input.origin}/review/payment-complete?lead=${encodeURIComponent(input.leadId)}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.origin}/review/offer?lead=${encodeURIComponent(input.leadId)}&canceled=1`,
    customer_email: input.email,
    client_reference_id: input.leadId,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(input.priceCents),
    "line_items[0][price_data][product_data][name]": "Vafaro human-reviewed excursion fit check",
    "line_items[0][price_data][product_data][description]": input.reportTitle.slice(0, 200),
    "metadata[lead_id]": input.leadId,
    "metadata[service]": "human_review",
    "payment_intent_data[metadata][lead_id]": input.leadId,
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Idempotency-Key": `vafaro-review-offer-${input.leadId}`,
      "Stripe-Version": "2026-02-25.clover",
    },
    body: params,
  });
  const result = await response.json() as { id?: string; url?: string; error?: { message?: string } };
  if (!response.ok || !result.id || !result.url) throw new Error(result.error?.message ?? "Stripe checkout could not be created.");
  return { ready: true as const, id: result.id, url: result.url };
}

async function ensureOfferSchema(sql: NeonQueryFunction<false, false>) {
  await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS review_offer_status TEXT NOT NULL DEFAULT 'not_offered'`;
  await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS review_offer_scope JSONB NOT NULL DEFAULT '[]'::jsonb`;
  await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS review_offer_price_cents INTEGER`;
  await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS review_offer_expires_at TIMESTAMPTZ`;
  await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS review_offer_delivery_estimate TEXT`;
  await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS review_offer_revision_terms TEXT`;
  await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS review_offer_refund_terms TEXT`;
  await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS review_scope_accepted_at TIMESTAMPTZ`;
  await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS review_terms_accepted_at TIMESTAMPTZ`;
  await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'not_started'`;
  await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT`;
  await sql`CREATE TABLE IF NOT EXISTS review_offer_attempts (id BIGSERIAL PRIMARY KEY, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), ip_hash TEXT NOT NULL)`;
  await sql`CREATE INDEX IF NOT EXISTS review_offer_attempts_ip_created_idx ON review_offer_attempts (ip_hash, created_at DESC)`;
}

const reviewOfferHandler = {
  async fetch(request: Request) {
    if (request.method !== "POST") return Response.json({ error: "Method not allowed." }, { status: 405 });
    const requestId = request.headers.get("x-vercel-id");
    const startedAt = Date.now();

    const origin = request.headers.get("origin");
    if (origin) {
      try {
        if (new URL(origin).host !== new URL(request.url).host) return Response.json({ error: "Invalid request origin." }, { status: 403 });
      } catch {
        return Response.json({ error: "Invalid request origin." }, { status: 403 });
      }
    }
    if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "JSON required." }, { status: 415 });
    if (!process.env.DATABASE_URL) return Response.json({ error: "Review offers are temporarily unavailable." }, { status: 503 });

    let body: OfferRequest;
    try { body = await request.json() as OfferRequest; } catch { return Response.json({ error: "Invalid submission." }, { status: 400 }); }
    const action = cleanText(body.action, 20);
    const leadId = cleanText(body.leadId, 20);
    const email = cleanText(body.email, 254).toLowerCase();
    if (!leadIdPattern.test(leadId) || !emailPattern.test(email) || !allowedActions.has(action)) {
      return Response.json({ error: "Enter the review reference and application email." }, { status: 400 });
    }

    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const ipHash = await hashIp(forwardedFor);
    const sql = neon(process.env.DATABASE_URL);

    try {
      await ensureOfferSchema(sql);
      const [rate] = await sql`SELECT COUNT(*)::int AS count FROM review_offer_attempts WHERE ip_hash = ${ipHash} AND created_at > NOW() - INTERVAL '1 hour'`;
      if (Number(rate?.count ?? 0) >= 20) return Response.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
      await sql`INSERT INTO review_offer_attempts (ip_hash) VALUES (${ipHash})`;

      const [offer] = await sql`
        SELECT id, name, email, report_title, review_offer_status, review_offer_scope,
               review_offer_price_cents, review_offer_expires_at, review_offer_delivery_estimate,
               review_offer_revision_terms, review_offer_refund_terms, payment_status
        FROM founding_family_leads
        WHERE id = ${leadId} AND email = ${email}
        LIMIT 1
      `;
      const expired = offer?.review_offer_expires_at && new Date(offer.review_offer_expires_at).getTime() <= Date.now();
      if (!offer || !activeOfferStatuses.has(String(offer.review_offer_status)) || expired) {
        return Response.json({ error: "No active review offer matches those details." }, { status: 404 });
      }

      const priceCents = Number(offer.review_offer_price_cents);
      const scope = cleanScope(offer.review_offer_scope);
      const deliveryEstimate = cleanText(offer.review_offer_delivery_estimate, 300);
      const revisionTerms = cleanText(offer.review_offer_revision_terms, 500);
      const refundTerms = cleanText(offer.review_offer_refund_terms, 500);
      if (!Number.isInteger(priceCents) || priceCents < 1000 || priceCents > 100000 || !scope.length || !deliveryEstimate || !revisionTerms || !refundTerms) {
        console.error(JSON.stringify({ level: "error", message: "Review offer is incomplete", route: "/api/review-offer", requestId, leadId }));
        return Response.json({ error: "This review offer is not ready yet. Please contact Vafaro." }, { status: 409 });
      }

      const publicOffer = {
        leadId,
        reportTitle: cleanText(offer.report_title, 180),
        scope,
        priceCents,
        expiresAt: offer.review_offer_expires_at ? new Date(offer.review_offer_expires_at).toISOString() : null,
        deliveryEstimate,
        revisionTerms,
        refundTerms,
        paymentStatus: cleanText(offer.payment_status, 40),
      };
      if (action === "lookup") return Response.json({ ok: true, offer: publicOffer });

      if (body.scopeAccepted !== true || body.termsAccepted !== true) {
        return Response.json({ error: "Accept the written scope, price, and service terms before continuing." }, { status: 400 });
      }
      await sql`
        UPDATE founding_family_leads SET
          review_offer_status = 'accepted',
          review_scope_accepted_at = COALESCE(review_scope_accepted_at, NOW()),
          review_terms_accepted_at = COALESCE(review_terms_accepted_at, NOW()),
          updated_at = NOW()
        WHERE id = ${leadId}
      `;

      const checkout = await createCheckout({ leadId, email, priceCents, reportTitle: publicOffer.reportTitle, origin: siteOrigin(request) });
      if (!checkout.ready) {
        await sendReviewAcceptanceNotification({ leadId, name: cleanText(offer.name, 100), email, reportTitle: publicOffer.reportTitle, priceCents, checkoutReady: false });
        console.log(JSON.stringify({ level: "info", message: "Review scope accepted without checkout", route: "/api/review-offer", requestId, leadId, durationMs: Date.now() - startedAt }));
        return Response.json({ ok: true, accepted: true, checkoutReady: false });
      }

      await sql`UPDATE founding_family_leads SET payment_status = 'checkout_created', stripe_checkout_session_id = ${checkout.id}, updated_at = NOW() WHERE id = ${leadId}`;
      await sendReviewAcceptanceNotification({ leadId, name: cleanText(offer.name, 100), email, reportTitle: publicOffer.reportTitle, priceCents, checkoutReady: true });
      console.log(JSON.stringify({ level: "info", message: "Review checkout created", route: "/api/review-offer", requestId, leadId, durationMs: Date.now() - startedAt }));
      return Response.json({ ok: true, accepted: true, checkoutReady: true, checkoutUrl: checkout.url });
    } catch (error) {
      console.error(JSON.stringify({ level: "error", message: "Review offer request failed", route: "/api/review-offer", requestId, error: error instanceof Error ? error.message : "Unknown error", durationMs: Date.now() - startedAt }));
      return Response.json({ error: "We could not process this review offer. Please try again." }, { status: 500 });
    }
  },
};

export default reviewOfferHandler;
