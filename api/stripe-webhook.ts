import { neon } from "@neondatabase/serverless";
import { sendPaymentConfirmationNotification } from "../lib/reviewer-notification.js";

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, "0")).join("");
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

async function verifyStripeSignature(payload: string, header: string, secret: string) {
  const entries = header.split(",").map(item => item.trim().split("=", 2));
  const timestamp = entries.find(([key]) => key === "t")?.[1] ?? "";
  const signatures = entries.filter(([key]) => key === "v1").map(([, value]) => value);
  const unixSeconds = Number(timestamp);
  if (!Number.isFinite(unixSeconds) || Math.abs(Date.now() / 1000 - unixSeconds) > 300 || !signatures.length) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${payload}`));
  const expected = toHex(digest);
  return signatures.some(signature => safeEqual(expected, signature));
}

type StripeEvent = {
  id?: string;
  type?: string;
  data?: { object?: { id?: string; payment_status?: string; amount_total?: number; currency?: string; client_reference_id?: string; metadata?: { lead_id?: string } } };
};

const stripeWebhookHandler = {
  async fetch(request: Request) {
    if (request.method !== "POST") return Response.json({ error: "Method not allowed." }, { status: 405 });
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret || !process.env.DATABASE_URL) return Response.json({ error: "Webhook not configured." }, { status: 503 });
    const signature = request.headers.get("stripe-signature") ?? "";
    const payload = await request.text();
    if (!await verifyStripeSignature(payload, signature, webhookSecret)) return Response.json({ error: "Invalid signature." }, { status: 400 });

    let event: StripeEvent;
    try { event = JSON.parse(payload) as StripeEvent; } catch { return Response.json({ error: "Invalid payload." }, { status: 400 }); }
    const session = event.data?.object;
    const leadId = session?.metadata?.lead_id ?? "";
    if (!/^\d{1,18}$/.test(leadId)) return Response.json({ received: true });

    const sql = neon(process.env.DATABASE_URL);
    try {
      await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'not_started'`;
      await sql`ALTER TABLE founding_family_leads ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT`;
      if (event.type === "checkout.session.completed" && session?.payment_status === "paid") {
        const [lead] = await sql`
          UPDATE founding_family_leads SET payment_status = 'paid', stripe_checkout_session_id = ${session.id ?? null}, updated_at = NOW()
          WHERE id = ${leadId}
            AND review_offer_price_cents = ${Number(session.amount_total ?? -1)}
            AND ${String(session.currency ?? "").toLowerCase()} = 'usd'
            AND ${String(session.client_reference_id ?? "")} = ${leadId}
          RETURNING name, email, report_title, review_offer_price_cents
        `;
        if (lead) {
          await sendPaymentConfirmationNotification({ leadId, name: String(lead.name), email: String(lead.email), reportTitle: String(lead.report_title), priceCents: Number(lead.review_offer_price_cents ?? 0), stripeEventId: event.id ?? "unknown" });
        } else {
          console.error(JSON.stringify({ level: "error", message: "Paid Stripe session did not match the stored review offer", route: "/api/stripe-webhook", eventId: event.id, leadId }));
        }
      } else if (event.type === "checkout.session.expired") {
        await sql`UPDATE founding_family_leads SET payment_status = 'checkout_expired', updated_at = NOW() WHERE id = ${leadId} AND payment_status <> 'paid'`;
      }
      return Response.json({ received: true });
    } catch (error) {
      console.error(JSON.stringify({ level: "error", message: "Stripe webhook failed", route: "/api/stripe-webhook", eventId: event.id, error: error instanceof Error ? error.message : "Unknown error" }));
      return Response.json({ error: "Webhook processing failed." }, { status: 500 });
    }
  },
};

export default stripeWebhookHandler;
