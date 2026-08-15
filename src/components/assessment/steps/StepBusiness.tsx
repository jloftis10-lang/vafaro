import { CurrencyField } from "@/components/ui/CurrencyField";
import { NumberField } from "@/components/ui/NumberField";
import { SelectField } from "@/components/ui/SelectField";
import { INDUSTRIES } from "@/lib/data/industries";
import { getIndustryQuestions } from "@/lib/assessment/industry-questions";
import { METRIC_TYPE_HELP } from "@/lib/assessment/questions";
import type { AssessmentFormState } from "@/components/assessment/AssessmentFormState";

import type { StepProps } from "./StepProps";

const INDUSTRY_OPTIONS = INDUSTRIES.map((industry) => ({
  value: industry.id,
  label: industry.label,
  group: industry.group,
}));

export function StepBusiness({ form, update, errors }: StepProps) {
  const metricLabel = form.metricType === "sde" ? "SDE" : "EBITDA";

  return (
    <div className="space-y-6">
      <SelectField
        id="industry"
        label="Industry"
        value={form.industryId}
        onChange={(value) => update("industryId", value)}
        options={INDUSTRY_OPTIONS}
        placeholder="Select your industry"
        error={errors.industryId}
      />
      <p className="-mt-4 text-xs leading-relaxed text-muted">
        Choose the closest operating model — most industries apply a tailored valuation
        multiple range; a general planning range is used otherwise.
      </p>

      <CurrencyField
        id="revenue"
        label="Trailing 12-month revenue"
        value={form.revenue}
        onChange={(value) => update("revenue", value)}
        placeholder="500,000"
        error={errors.revenue}
      />

      <div>
        <span className="text-sm font-medium text-ink">
          Which figure are you entering?
        </span>
        <p className="mt-1 text-xs text-muted">{METRIC_TYPE_HELP}</p>
        <div className="mt-2 flex gap-2">
          {(["sde", "ebitda"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => update("metricType", option)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                form.metricType === option
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-surface text-ink hover:border-muted-soft"
              }`}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <CurrencyField
        id="metricValue"
        label={`Trailing 12-month ${metricLabel}`}
        value={form.metricValue}
        onChange={(value) => update("metricValue", value)}
        placeholder="150,000"
        error={errors.metricValue}
      />

      <NumberField
        id="yearsInBusiness"
        label="Years in business (optional)"
        value={form.yearsInBusiness}
        onChange={(value) => update("yearsInBusiness", value)}
        placeholder="10"
        suffix="years"
      />

      {getIndustryQuestions(form.industryId).length > 0 && (
        <div className="space-y-6 border-t border-line pt-6">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-accent">
            A few questions specific to your industry
          </p>
          {getIndustryQuestions(form.industryId).map((question) => (
            <SelectField
              key={question.field}
              id={question.field}
              label={question.label}
              value={form[question.field] ?? ""}
              onChange={(value) =>
                update(
                  question.field as keyof AssessmentFormState,
                  value as AssessmentFormState[keyof AssessmentFormState],
                )
              }
              options={question.options}
              placeholder="Select an answer"
            />
          ))}
        </div>
      )}
    </div>
  );
}
