import { REVENUE_GROWTH_OPTIONS } from "@/lib/assessment/questions";
import type { AssessmentAnswers } from "@/lib/assessment/types";
import { getIndustryById } from "@/lib/data/industries";
import { formatCurrency } from "@/lib/format";

interface BusinessProfileSectionProps {
  answers: AssessmentAnswers;
}

export function BusinessProfileSection({ answers }: BusinessProfileSectionProps) {
  const industry = getIndustryById(answers.industryId);
  const growthLabel =
    REVENUE_GROWTH_OPTIONS.find((option) => option.value === answers.revenueGrowth)?.label ??
    answers.revenueGrowth;

  const rows = [
    { label: "Industry", value: industry?.label ?? "—" },
    { label: "Revenue", value: formatCurrency(answers.revenue) },
    { label: `Adjusted ${answers.metricType.toUpperCase()}`, value: formatCurrency(answers.metricValue) },
    { label: "Growth Profile", value: growthLabel },
  ];

  return (
    <section className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent">Business Profile</p>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs text-muted">{row.label}</dt>
            <dd className="mt-1 text-sm font-medium text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
