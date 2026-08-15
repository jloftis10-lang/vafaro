"use client";

import { useState } from "react";

import {
  INITIAL_ASSESSMENT_STATE,
  toAssessmentAnswers,
  type AssessmentFormState,
} from "@/components/assessment/AssessmentFormState";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import { StepBusiness } from "@/components/assessment/steps/StepBusiness";
import { StepFinancialReadiness } from "@/components/assessment/steps/StepFinancialReadiness";
import { StepOwnerIndependence } from "@/components/assessment/steps/StepOwnerIndependence";
import { StepOwnerPlans } from "@/components/assessment/steps/StepOwnerPlans";
import { StepPerformance } from "@/components/assessment/steps/StepPerformance";
import { toValuationInputs } from "@/lib/assessment/valuation-adapter";
import type { AssessmentAnswers } from "@/lib/assessment/types";
import { calculateValuation } from "@/lib/valuation";
import type { ValuationResult } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

const TOTAL_STEPS = 5;

// Mirrors the ceilings in src/lib/assessment/schema.ts — these exist to
// catch obvious typos (an extra zero) client-side before the API's own
// validation runs, not to cap legitimate large businesses.
const MONEY_CAP = 1_000_000_000;
const MAX_YEARS_IN_BUSINESS = 150;

function isValidMoney(value: string, cap: number): boolean {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 && n <= cap;
}

function isValidOptionalPercent(value: string): boolean {
  if (value === "") return true;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 && n <= 100;
}

function isValidOptionalYears(value: string): boolean {
  if (value === "") return true;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 && n <= MAX_YEARS_IN_BUSINESS;
}

function validateStep(
  step: number,
  form: AssessmentFormState,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 1) {
    if (!form.industryId) errors.industryId = "Select an industry.";
    if (!isValidMoney(form.revenue, MONEY_CAP))
      errors.revenue = "Enter a valid trailing 12-month revenue.";
    if (!isValidMoney(form.metricValue, MONEY_CAP))
      errors.metricValue = `Enter a valid ${form.metricType.toUpperCase()}.`;
    else if (Number(form.metricValue) > Number(form.revenue))
      errors.metricValue = `${form.metricType.toUpperCase()} cannot exceed revenue.`;
    if (!isValidOptionalYears(form.yearsInBusiness))
      errors.yearsInBusiness = "Enter a valid number of years.";
  }

  if (step === 2) {
    if (!form.revenueGrowth) errors.revenueGrowth = "Select your revenue trend.";
    if (!form.profitabilityTrend)
      errors.profitabilityTrend = "Select your profitability trend.";
    if (!form.recurringRevenuePct)
      errors.recurringRevenuePct = "Select your recurring revenue.";
    if (!form.largestCustomerPct)
      errors.largestCustomerPct = "Select your largest customer concentration.";
    if (!isValidOptionalPercent(form.top5CustomersPct))
      errors.top5CustomersPct = "Enter a percentage between 0 and 100.";
  }

  if (step === 3) {
    if (!form.ownerHoursPerWeek)
      errors.ownerHoursPerWeek = "Select owner involvement.";
    if (!form.ownerAbsenceImpact)
      errors.ownerAbsenceImpact = "Select what would happen if you stepped away.";
    if (!form.customerRelationshipOwnership)
      errors.customerRelationshipOwnership = "Select who owns customer relationships.";
    if (!form.managementDepth) errors.managementDepth = "Select your management depth.";
    if (!form.processDocumentation)
      errors.processDocumentation = "Select your process documentation level.";
  }

  if (step === 4) {
    if (!form.financialStatementQuality)
      errors.financialStatementQuality = "Select how your books are maintained.";
    if (!form.recordsCurrency)
      errors.recordsCurrency = "Select how current your records are.";
    if (!form.financialHistoryYears)
      errors.financialHistoryYears = "Select your available financial history.";
    if (!form.addBackDocumentation)
      errors.addBackDocumentation = "Select your add-back documentation level.";
    if (!form.expenseSeparation)
      errors.expenseSeparation = "Select your expense separation level.";
  }

  if (step === 5) {
    if (!form.saleTimeline) errors.saleTimeline = "Select a timeline.";
    if (form.transactionPriorities.length === 0)
      errors.transactionPriorities = "Select at least one priority.";
  }

  return errors;
}

export function AssessmentForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<AssessmentFormState>(INITIAL_ASSESSMENT_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submission, setSubmission] = useState<{
    answers: AssessmentAnswers;
    valuation: ValuationResult;
  } | null>(null);

  function update<K extends keyof AssessmentFormState>(
    key: K,
    value: AssessmentFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleNext() {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (step < TOTAL_STEPS) {
      if (step === 1) trackEvent("assessment_started", { industry: form.industryId });
      setStep(step + 1);
    } else {
      const answers = toAssessmentAnswers(form);
      const valuation = calculateValuation(toValuationInputs(answers));
      trackEvent("assessment_completed", { industry: answers.industryId });
      setSubmission({ answers, valuation });
    }
  }

  function handleBack() {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  }

  function handleStartOver() {
    setForm(INITIAL_ASSESSMENT_STATE);
    setErrors({});
    setSubmission(null);
    setStep(1);
  }

  if (submission) {
    return (
      <AssessmentResults
        answers={submission.answers}
        valuation={submission.valuation}
        onStartOver={handleStartOver}
      />
    );
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <ProgressBar step={step} />

      {step === 1 && <StepBusiness form={form} update={update} errors={errors} />}
      {step === 2 && <StepPerformance form={form} update={update} errors={errors} />}
      {step === 3 && (
        <StepOwnerIndependence form={form} update={update} errors={errors} />
      )}
      {step === 4 && (
        <StepFinancialReadiness form={form} update={update} errors={errors} />
      )}
      {step === 5 && <StepOwnerPlans form={form} update={update} errors={errors} />}

      <div className="mt-8 flex justify-between border-t border-line pt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center justify-center rounded-md border border-line px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:border-muted-soft"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          {step < TOTAL_STEPS ? "Continue" : "See My Results"}
        </button>
      </div>
    </div>
  );
}
