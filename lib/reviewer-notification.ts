type NotificationResult = {
  status: "disabled" | "sent" | "failed";
  providerId?: string;
  error?: string;
};

type ReviewApplicationNotification = {
  leadId: string;
  name: string;
  email: string;
  timeframe: string;
  priceInterest: number;
  reportTitle: string;
  score: number;
  tripDescription: string;
  companions: string[];
  needs: string[];
  walkingHours: number;
  pace: number;
  excursion?: Record<string, unknown>;
};

type ContactNotification = {
  contactId: string;
  name: string;
  email: string;
  topic: string;
  message: string;
};

type ReviewAcceptanceNotification = {
  leadId: string;
  name: string;
  email: string;
  reportTitle: string;
  priceCents: number;
  checkoutReady: boolean;
};

type PaymentConfirmationNotification = {
  leadId: string;
  name: string;
  email: string;
  reportTitle: string;
  priceCents: number;
  stripeEventId: string;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function list(items: string[]) {
  return items.length ? items.map(item => `<li>${escapeHtml(item)}</li>`).join("") : "<li>None supplied</li>";
}

function excursionRows(excursion?: Record<string, unknown>) {
  if (!excursion) return "";
  return Object.entries(excursion)
    .filter(([, value]) => value !== "" && value !== undefined && value !== null)
    .map(([key, value]) => `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(key)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`)
    .join("");
}

async function sendEmail(input: { subject: string; html: string; text: string; replyTo?: string; idempotencyKey: string }): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const reviewerEmail = process.env.REVIEWER_NOTIFICATION_EMAIL;
  if (!apiKey || !reviewerEmail) return { status: "disabled" };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": input.idempotencyKey,
      },
      body: JSON.stringify({
        from: process.env.VAFARO_NOTIFICATION_FROM ?? "Vafaro <onboarding@resend.dev>",
        to: reviewerEmail.split(",").map(item => item.trim()).filter(Boolean),
        reply_to: input.replyTo,
        subject: input.subject,
        html: input.html,
        text: input.text,
      }),
    });
    const result = await response.json() as { id?: string; message?: string };
    if (!response.ok) return { status: "failed", error: result.message ?? `Resend returned ${response.status}` };
    return { status: "sent", providerId: result.id };
  } catch (error) {
    return { status: "failed", error: error instanceof Error ? error.message : "Unknown email error" };
  }
}

export function sendReviewApplicationNotification(input: ReviewApplicationNotification) {
  const rows = excursionRows(input.excursion);
  const subject = `New Vafaro review application #${input.leadId}`;
  const offerUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vafaro.com"}/review/offer?lead=${encodeURIComponent(input.leadId)}`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:680px;color:#172b24"><h1>New review application</h1><p><strong>${escapeHtml(input.name)}</strong> applied for a Vafaro review.</p><table><tr><th align="left" style="padding:6px 12px 6px 0">Email</th><td>${escapeHtml(input.email)}</td></tr><tr><th align="left" style="padding:6px 12px 6px 0">Timeframe</th><td>${escapeHtml(input.timeframe)}</td></tr><tr><th align="left" style="padding:6px 12px 6px 0">Price interest</th><td>$${input.priceInterest}</td></tr><tr><th align="left" style="padding:6px 12px 6px 0">Planning signal</th><td>${input.score}</td></tr><tr><th align="left" style="padding:6px 12px 6px 0">Report</th><td>${escapeHtml(input.reportTitle)}</td></tr>${rows}</table><h2>Trip or excursion</h2><p style="white-space:pre-wrap">${escapeHtml(input.tripDescription)}</p><h2>Traveler profile</h2><p>Comfortable walking: ${input.walkingHours} hours · Pace: ${input.pace}/5</p><strong>Travelers</strong><ul>${list(input.companions)}</ul><strong>Planning needs</strong><ul>${list(input.needs)}</ul><p><strong>Customer acceptance link:</strong> <a href="${escapeHtml(offerUrl)}">${escapeHtml(offerUrl)}</a></p><p style="color:#607067">Do not send the acceptance link until the database offer contains the final scope, price, delivery estimate, revision terms, refund terms, and offered status. Review all claims against current first-party sources before making a recommendation.</p></div>`;
  const text = `New Vafaro review application #${input.leadId}\n\n${input.name} <${input.email}>\nTimeframe: ${input.timeframe}\nPrice interest: $${input.priceInterest}\nPlanning signal: ${input.score}\nReport: ${input.reportTitle}\n\n${input.tripDescription}\n\nCustomer acceptance link (send only after the offer is finalized): ${offerUrl}`;
  return sendEmail({ subject, html, text, replyTo: input.email, idempotencyKey: `review-application-${input.leadId}` });
}

export function sendContactNotification(input: ContactNotification) {
  const subject = `Vafaro contact: ${input.topic} #${input.contactId}`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:680px;color:#172b24"><h1>New Vafaro contact message</h1><p><strong>${escapeHtml(input.name)}</strong> (${escapeHtml(input.email)})</p><p><strong>Topic:</strong> ${escapeHtml(input.topic)}</p><p style="white-space:pre-wrap">${escapeHtml(input.message)}</p></div>`;
  const text = `New Vafaro contact message #${input.contactId}\n\n${input.name} <${input.email}>\nTopic: ${input.topic}\n\n${input.message}`;
  return sendEmail({ subject, html, text, replyTo: input.email, idempotencyKey: `contact-message-${input.contactId}` });
}

export function sendReviewAcceptanceNotification(input: ReviewAcceptanceNotification) {
  const subject = `Vafaro review scope accepted #${input.leadId}`;
  const checkoutStatus = input.checkoutReady ? "Stripe checkout was created." : "Checkout is not configured; follow up manually before requesting payment.";
  const html = `<div style="font-family:Arial,sans-serif;max-width:680px;color:#172b24"><h1>Review scope accepted</h1><p><strong>${escapeHtml(input.name)}</strong> (${escapeHtml(input.email)}) accepted the written scope and price for review #${escapeHtml(input.leadId)}.</p><table><tr><th align="left" style="padding:6px 12px 6px 0">Report</th><td>${escapeHtml(input.reportTitle)}</td></tr><tr><th align="left" style="padding:6px 12px 6px 0">Price</th><td>$${(input.priceCents / 100).toFixed(2)}</td></tr><tr><th align="left" style="padding:6px 12px 6px 0">Payment handoff</th><td>${escapeHtml(checkoutStatus)}</td></tr></table></div>`;
  const text = `Review scope accepted #${input.leadId}\n\n${input.name} <${input.email}>\nReport: ${input.reportTitle}\nPrice: $${(input.priceCents / 100).toFixed(2)}\n${checkoutStatus}`;
  return sendEmail({ subject, html, text, replyTo: input.email, idempotencyKey: `review-acceptance-${input.leadId}` });
}

export function sendPaymentConfirmationNotification(input: PaymentConfirmationNotification) {
  const subject = `Vafaro payment confirmed #${input.leadId}`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:680px;color:#172b24"><h1>Payment confirmed</h1><p>Stripe reported a paid checkout for review #${escapeHtml(input.leadId)}.</p><table><tr><th align="left" style="padding:6px 12px 6px 0">Customer</th><td>${escapeHtml(input.name)} (${escapeHtml(input.email)})</td></tr><tr><th align="left" style="padding:6px 12px 6px 0">Report</th><td>${escapeHtml(input.reportTitle)}</td></tr><tr><th align="left" style="padding:6px 12px 6px 0">Amount</th><td>$${(input.priceCents / 100).toFixed(2)}</td></tr><tr><th align="left" style="padding:6px 12px 6px 0">Stripe event</th><td>${escapeHtml(input.stripeEventId)}</td></tr></table></div>`;
  const text = `Payment confirmed #${input.leadId}\n\n${input.name} <${input.email}>\nReport: ${input.reportTitle}\nAmount: $${(input.priceCents / 100).toFixed(2)}\nStripe event: ${input.stripeEventId}`;
  return sendEmail({ subject, html, text, replyTo: input.email, idempotencyKey: `payment-confirmation-${input.stripeEventId}` });
}
