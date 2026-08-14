import { neon } from "@neondatabase/serverless";

type LeadRequest = {
  name?: unknown;
  email?: unknown;
  timeframe?: unknown;
  priceInterest?: unknown;
  consent?: unknown;
  company?: unknown;
  sourceUrl?: unknown;
  report?: {
    id?: unknown;
    title?: unknown;
    score?: unknown;
    summary?: unknown;
    input?: {
      companions?: unknown;
      needs?: unknown;
      walkingHours?: unknown;
      pace?: unknown;
      description?: unknown;
    };
  };
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedTimeframes = new Set(["Just exploring", "Within 3 months", "3–6 months", "6–12 months", "Trip already booked"]);
const allowedPrices = new Set([79, 119, 149]);

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanList(value: unknown, maxItems = 12) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, maxItems).map(item => cleanText(item, 80)).filter(Boolean);
}

async function hashIp(value: string) {
  const bytes = new TextEncoder().encode(`${value}:${process.env.LEAD_HASH_SALT ?? "vafaro-leads-v1"}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

const leadHandler = {
  async fetch(request: Request) {
    if (request.method !== "POST") return Response.json({ error: "Method not allowed." }, { status: 405 });
    const startedAt = Date.now();
    const requestId = request.headers.get("x-vercel-id");
    console.log(JSON.stringify({ level: "info", message: "Lead submission started", route: "/api/leads", requestId }));

    const origin = request.headers.get("origin");
    if (origin) {
      try {
        if (new URL(origin).host !== new URL(request.url).host) return Response.json({ error: "Invalid request origin." }, { status: 403 });
      } catch {
        return Response.json({ error: "Invalid request origin." }, { status: 403 });
      }
    }

    if (!request.headers.get("content-type")?.includes("application/json")) {
      return Response.json({ error: "JSON required." }, { status: 415 });
    }

    if (!process.env.DATABASE_URL) {
      console.error("Lead capture is missing DATABASE_URL.");
      return Response.json({ error: "Lead capture is temporarily unavailable." }, { status: 503 });
    }

    let body: LeadRequest;
    try {
      body = await request.json() as LeadRequest;
    } catch {
      return Response.json({ error: "Invalid submission." }, { status: 400 });
    }

    if (cleanText(body.company, 200)) return Response.json({ ok: true });

    const name = cleanText(body.name, 100);
    const email = cleanText(body.email, 254).toLowerCase();
    const timeframe = cleanText(body.timeframe, 40);
    const priceInterest = Number(body.priceInterest);
    const reportId = cleanText(body.report?.id, 80);
    const reportTitle = cleanText(body.report?.title, 180);
    const reportSummary = cleanText(body.report?.summary, 500);
    const tripDescription = cleanText(body.report?.input?.description, 5000);
    const companions = cleanList(body.report?.input?.companions);
    const needs = cleanList(body.report?.input?.needs);
    const walkingHours = Number(body.report?.input?.walkingHours);
    const pace = Number(body.report?.input?.pace);
    const score = Number(body.report?.score);
    const sourceUrl = cleanText(body.sourceUrl, 500);

    if (!name || !emailPattern.test(email) || body.consent !== true || !reportId || !tripDescription) {
      return Response.json({ error: "Please complete every required field and agree to be contacted." }, { status: 400 });
    }
    if (!allowedTimeframes.has(timeframe) || !allowedPrices.has(priceInterest)) {
      return Response.json({ error: "Please choose a valid trip timeframe and price." }, { status: 400 });
    }
    if (!Number.isFinite(score) || score < 0 || score > 100 || !Number.isFinite(walkingHours) || !Number.isFinite(pace)) {
      return Response.json({ error: "The attached trip report is invalid." }, { status: 400 });
    }

    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const ipHash = await hashIp(forwardedFor);
    const userAgent = cleanText(request.headers.get("user-agent"), 500);
    const sql = neon(process.env.DATABASE_URL);

    try {
      await sql`
        CREATE TABLE IF NOT EXISTS founding_family_leads (
          id BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          timeframe TEXT NOT NULL,
          price_interest INTEGER NOT NULL,
          report_id TEXT NOT NULL,
          report_title TEXT NOT NULL,
          planning_signal SMALLINT NOT NULL,
          report_summary TEXT NOT NULL,
          trip_description TEXT NOT NULL,
          companions JSONB NOT NULL DEFAULT '[]'::jsonb,
          needs JSONB NOT NULL DEFAULT '[]'::jsonb,
          walking_hours SMALLINT NOT NULL,
          pace SMALLINT NOT NULL,
          source_url TEXT NOT NULL,
          consented_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          ip_hash TEXT NOT NULL,
          user_agent TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'new',
          UNIQUE (email, report_id)
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS founding_family_leads_ip_created_idx ON founding_family_leads (ip_hash, created_at DESC)`;

      const [rate] = await sql`SELECT COUNT(*)::int AS count FROM founding_family_leads WHERE ip_hash = ${ipHash} AND created_at > NOW() - INTERVAL '1 hour'`;
      if (Number(rate?.count ?? 0) >= 5) return Response.json({ error: "Too many submissions. Please try again later." }, { status: 429 });

      const [lead] = await sql`
        INSERT INTO founding_family_leads (
          name, email, timeframe, price_interest, report_id, report_title,
          planning_signal, report_summary, trip_description, companions, needs,
          walking_hours, pace, source_url, ip_hash, user_agent
        ) VALUES (
          ${name}, ${email}, ${timeframe}, ${priceInterest}, ${reportId}, ${reportTitle},
          ${Math.round(score)}, ${reportSummary}, ${tripDescription}, ${JSON.stringify(companions)}::jsonb,
          ${JSON.stringify(needs)}::jsonb, ${Math.round(walkingHours)}, ${Math.round(pace)},
          ${sourceUrl}, ${ipHash}, ${userAgent}
        )
        ON CONFLICT (email, report_id) DO UPDATE SET
          name = EXCLUDED.name,
          timeframe = EXCLUDED.timeframe,
          price_interest = EXCLUDED.price_interest,
          updated_at = NOW()
        RETURNING id
      `;

      if (email.endsWith(".invalid")) {
        await sql`DELETE FROM founding_family_leads WHERE id = ${lead.id}`;
        console.log(JSON.stringify({ level: "info", message: "Lead test completed", route: "/api/leads", requestId, durationMs: Date.now() - startedAt }));
        return Response.json({ ok: true, test: true }, { status: 201 });
      }

      console.log(JSON.stringify({ level: "info", message: "Lead saved", route: "/api/leads", requestId, durationMs: Date.now() - startedAt }));
      return Response.json({ ok: true, leadId: String(lead.id) }, { status: 201 });
    } catch (error) {
      console.error(JSON.stringify({ level: "error", message: "Lead submission failed", route: "/api/leads", requestId, error: error instanceof Error ? error.message : "Unknown database error", durationMs: Date.now() - startedAt }));
      return Response.json({ error: "We could not save your request. Please try again." }, { status: 500 });
    }
  },
};

export default leadHandler;
