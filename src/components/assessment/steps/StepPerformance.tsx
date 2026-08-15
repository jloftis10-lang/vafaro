import { NumberField } from "@/components/ui/NumberField";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  CUSTOMER_PROTECTION_OPTIONS,
  LARGEST_CUSTOMER_OPTIONS,
  PROFITABILITY_TREND_OPTIONS,
  RECURRING_REVENUE_HELP,
  RECURRING_REVENUE_OPTIONS,
  REVENUE_GROWTH_OPTIONS,
  shouldAskCustomerProtection,
} from "@/lib/assessment/questions";

import type { StepProps } from "./StepProps";

export function StepPerformance({ form, update, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <RadioGroup
        name="revenueGrowth"
        legend="Revenue growth over the last three years"
        options={REVENUE_GROWTH_OPTIONS}
        value={form.revenueGrowth}
        onChange={(value) => update("revenueGrowth", value)}
        error={errors.revenueGrowth}
      />

      <RadioGroup
        name="profitabilityTrend"
        legend="Profitability / EBITDA trend"
        options={PROFITABILITY_TREND_OPTIONS}
        value={form.profitabilityTrend}
        onChange={(value) => update("profitabilityTrend", value)}
        error={errors.profitabilityTrend}
      />

      <RadioGroup
        name="recurringRevenuePct"
        legend="Recurring, contracted, or highly repeatable revenue"
        helpText={RECURRING_REVENUE_HELP}
        options={RECURRING_REVENUE_OPTIONS}
        value={form.recurringRevenuePct}
        onChange={(value) => update("recurringRevenuePct", value)}
        error={errors.recurringRevenuePct}
      />

      <NumberField
        id="top5CustomersPct"
        label="Top 5 customers as a percentage of revenue (optional)"
        value={form.top5CustomersPct}
        onChange={(value) => update("top5CustomersPct", value)}
        placeholder="40"
        suffix="%"
      />

      <RadioGroup
        name="largestCustomerPct"
        legend="Largest customer as a percentage of revenue"
        options={LARGEST_CUSTOMER_OPTIONS}
        value={form.largestCustomerPct}
        onChange={(value) => update("largestCustomerPct", value)}
        error={errors.largestCustomerPct}
      />

      {shouldAskCustomerProtection(form.largestCustomerPct) && (
        <RadioGroup
          name="largestCustomerProtection"
          legend="Is that relationship protected?"
          options={CUSTOMER_PROTECTION_OPTIONS}
          value={form.largestCustomerProtection}
          onChange={(value) => update("largestCustomerProtection", value)}
        />
      )}
    </div>
  );
}
