export type FunnelEvent =
  | "assessment_started"
  | "assessment_completed"
  | "report_email_requested"
  | "booking_clicked"
  | "industry_assessment_started"
  | "resource_assessment_clicked";

/** Provider-agnostic hook. Analytics tools can consume either dataLayer or this DOM event. */
export function trackEvent(name: FunnelEvent, properties: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event: name, ...properties };
  window.dispatchEvent(new CustomEvent("ownergauge:analytics", { detail: payload }));
  const analyticsWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
  analyticsWindow.dataLayer?.push(payload);
}
