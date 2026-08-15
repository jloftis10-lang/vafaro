import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  SALE_TIMELINE_OPTIONS,
  TRANSACTION_PRIORITIES_HELP,
  TRANSACTION_PRIORITY_OPTIONS,
} from "@/lib/assessment/questions";

import type { StepProps } from "./StepProps";

export function StepOwnerPlans({ form, update, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <RadioGroup
        name="saleTimeline"
        legend="When would you realistically consider a transaction?"
        options={SALE_TIMELINE_OPTIONS}
        value={form.saleTimeline}
        onChange={(value) => update("saleTimeline", value)}
        error={errors.saleTimeline}
      />

      <CheckboxGroup
        name="transactionPriorities"
        legend="What matters most in a transaction?"
        helpText={TRANSACTION_PRIORITIES_HELP}
        options={TRANSACTION_PRIORITY_OPTIONS}
        value={form.transactionPriorities}
        onChange={(value) => update("transactionPriorities", value)}
        error={errors.transactionPriorities}
      />
    </div>
  );
}
