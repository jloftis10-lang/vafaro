import { Resend } from "resend";

let client: Resend | null = null;

/** Lazily constructed so a missing API key only errors when email is actually sent. */
export function getResendClient(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }
    client = new Resend(apiKey);
  }
  return client;
}
