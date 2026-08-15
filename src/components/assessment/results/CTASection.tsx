"use client";

import type { CTAResult } from "@/lib/assessment/types";
import { trackEvent } from "@/lib/analytics";

interface CTASectionProps {
  cta: CTAResult;
}

export function CTASection({ cta }: CTASectionProps) {
  const isExternal = cta.buttonHref.startsWith("http");

  return (
    <section className="rounded-lg border border-line bg-primary p-6 text-center sm:p-8">
      <h2 className="font-display text-xl font-semibold text-white">{cta.headline}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/80">
        {cta.subhead}
      </p>
      <a
        href={cta.buttonHref}
        onClick={() => { if (isExternal) trackEvent("booking_clicked"); }}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-white px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-white/90"
      >
        {cta.buttonLabel}
      </a>
    </section>
  );
}
