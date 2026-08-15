import type { Recommendation } from "@/lib/assessment/types";

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

export function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  if (recommendations.length === 0) return null;

  return (
    <section className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-primary">
        Your Three Highest-Impact Actions
      </h2>
      <p className="mt-1 text-sm text-muted">
        Ranked by what would most improve your readiness or buyer perception.
      </p>
      <ol className="mt-5 space-y-4">
        {recommendations.map((rec) => (
          <li key={rec.id} className="flex gap-4 rounded-md border border-line p-4">
            <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              {rec.rank}
            </span>
            <div>
              <p className="text-sm font-medium text-ink">{rec.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{rec.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
