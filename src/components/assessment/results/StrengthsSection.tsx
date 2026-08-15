import type { Strength } from "@/lib/assessment/strengths";

interface StrengthsSectionProps {
  strengths: Strength[];
}

export function StrengthsSection({ strengths }: StrengthsSectionProps) {
  if (strengths.length === 0) return null;

  return (
    <section className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-primary">
        What&apos;s Working in Your Favor
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {strengths.map((strength) => (
          <div key={strength.id} className="rounded-md border border-line bg-canvas p-4">
            <p className="text-sm font-medium text-primary">{strength.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{strength.explanation}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
