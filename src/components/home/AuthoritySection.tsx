import Link from "next/link";

import { FOUNDER_CONTENT } from "@/lib/content/founder";

export function AuthoritySection() {
  const credentialLine = [FOUNDER_CONTENT.title, FOUNDER_CONTENT.firm]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-20">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
          Behind OwnerGauge
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-primary">
          {FOUNDER_CONTENT.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
          {FOUNDER_CONTENT.blurb}
        </p>
        {credentialLine && (
          <p className="mt-6 text-sm font-medium text-ink">
            {FOUNDER_CONTENT.name}
            {credentialLine && <span className="text-muted"> — {credentialLine}</span>}
          </p>
        )}
        <div className="mt-6">
          <Link
            href="/about"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            More about OwnerGauge →
          </Link>
        </div>
      </div>
    </section>
  );
}
