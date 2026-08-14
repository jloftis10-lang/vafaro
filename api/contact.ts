import { neon } from "@neondatabase/serverless";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
  company?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedTopics = new Set(["General question", "Founding-family review", "Privacy request", "Travel advisor partnership"]);

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function hashIp(value: string) {
  const bytes = new TextEncoder().encode(`${value}:${process.env.LEAD_HASH_SALT ?? "vafaro-contact-v1"}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

const contactHandler = {
  async fetch(request: Request) {
    if (request.method !== "POST") return Response.json({ error: "Method not allowed." }, { status: 405 });
    const startedAt = Date.now();
    const requestId = request.headers.get("x-vercel-id");
    console.log(JSON.stringify({ level: "info", message: "Contact submission started", route: "/api/contact", requestId }));

    const origin = request.headers.get("origin");
    if (origin) {
      try {
        if (new URL(origin).host !== new URL(request.url).host) return Response.json({ error: "Invalid request origin." }, { status: 403 });
      } catch {
        return Response.json({ error: "Invalid request origin." }, { status: 403 });
      }
    }

    if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "JSON required." }, { status: 415 });
    if (!process.env.DATABASE_URL) return Response.json({ error: "Contact is temporarily unavailable." }, { status: 503 });

    let body: ContactRequest;
    try {
      body = await request.json() as ContactRequest;
    } catch {
      return Response.json({ error: "Invalid submission." }, { status: 400 });
    }

    if (cleanText(body.company, 200)) return Response.json({ ok: true });
    const name = cleanText(body.name, 100);
    const email = cleanText(body.email, 254).toLowerCase();
    const topic = cleanText(body.topic, 50);
    const message = cleanText(body.message, 4000);

    if (!name || !emailPattern.test(email) || !allowedTopics.has(topic) || message.length < 10) {
      return Response.json({ error: "Please complete every required field." }, { status: 400 });
    }

    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const ipHash = await hashIp(forwardedFor);
    const userAgent = cleanText(request.headers.get("user-agent"), 500);
    const sql = neon(process.env.DATABASE_URL);

    try {
      await sql`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          topic TEXT NOT NULL,
          message TEXT NOT NULL,
          ip_hash TEXT NOT NULL,
          user_agent TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'new'
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS contact_messages_ip_created_idx ON contact_messages (ip_hash, created_at DESC)`;
      const [rate] = await sql`SELECT COUNT(*)::int AS count FROM contact_messages WHERE ip_hash = ${ipHash} AND created_at > NOW() - INTERVAL '1 hour'`;
      if (Number(rate?.count ?? 0) >= 5) return Response.json({ error: "Too many submissions. Please try again later." }, { status: 429 });

      const [contact] = await sql`
        INSERT INTO contact_messages (name, email, topic, message, ip_hash, user_agent)
        VALUES (${name}, ${email}, ${topic}, ${message}, ${ipHash}, ${userAgent})
        RETURNING id
      `;

      if (email.endsWith(".invalid")) {
        await sql`DELETE FROM contact_messages WHERE id = ${contact.id}`;
        console.log(JSON.stringify({ level: "info", message: "Contact test completed", route: "/api/contact", requestId, durationMs: Date.now() - startedAt }));
        return Response.json({ ok: true, test: true }, { status: 201 });
      }

      console.log(JSON.stringify({ level: "info", message: "Contact message saved", route: "/api/contact", requestId, durationMs: Date.now() - startedAt }));
      return Response.json({ ok: true, contactId: String(contact.id) }, { status: 201 });
    } catch (error) {
      console.error(JSON.stringify({ level: "error", message: "Contact submission failed", route: "/api/contact", requestId, error: error instanceof Error ? error.message : "Unknown database error", durationMs: Date.now() - startedAt }));
      return Response.json({ error: "We could not save your message. Please try again." }, { status: 500 });
    }
  },
};

export default contactHandler;
