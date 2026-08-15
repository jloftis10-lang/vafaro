import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  ADD_BACK_DOCUMENTATION_HELP,
  ADD_BACK_DOCUMENTATION_OPTIONS,
  EXPENSE_SEPARATION_OPTIONS,
  FINANCIAL_HISTORY_YEARS_OPTIONS,
  FINANCIAL_STATEMENT_QUALITY_OPTIONS,
  RECORDS_CURRENCY_OPTIONS,
} from "@/lib/assessment/questions";

import type { StepProps } from "./StepProps";

export function StepFinancialReadiness({ form, update, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <RadioGroup
        name="financialStatementQuality"
        legend="How are your financial statements/books maintained?"
        options={FINANCIAL_STATEMENT_QUALITY_OPTIONS}
        value={form.financialStatementQuality}
        onChange={(value) => update("financialStatementQuality", value)}
        error={errors.financialStatementQuality}
      />

      <RadioGroup
        name="recordsCurrency"
        legend="How current are your financial records?"
        options={RECORDS_CURRENCY_OPTIONS}
        value={form.recordsCurrency}
        onChange={(value) => update("recordsCurrency", value)}
        error={errors.recordsCurrency}
      />

      <RadioGroup
        name="financialHistoryYears"
        legend="How many years of complete financial history are readily available?"
        options={FINANCIAL_HISTORY_YEARS_OPTIONS}
        value={form.financialHistoryYears}
        onChange={(value) => update("financialHistoryYears", value)}
        error={errors.financialHistoryYears}
      />

      <RadioGroup
        name="addBackDocumentation"
        legend="Can you clearly document discretionary adjustments / add-backs?"
        helpText={ADD_BACK_DOCUMENTATION_HELP}
        options={ADD_BACK_DOCUMENTATION_OPTIONS}
        value={form.addBackDocumentation}
        onChange={(value) => update("addBackDocumentation", value)}
        error={errors.addBackDocumentation}
      />

      <RadioGroup
        name="expenseSeparation"
        legend="Are business and personal expenses clearly separated?"
        options={EXPENSE_SEPARATION_OPTIONS}
        value={form.expenseSeparation}
        onChange={(value) => update("expenseSeparation", value)}
        error={errors.expenseSeparation}
      />
    </div>
  );
}
