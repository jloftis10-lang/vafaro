import type { AssessmentFormState } from "@/components/assessment/AssessmentFormState";

export interface StepProps {
  form: AssessmentFormState;
  update: <K extends keyof AssessmentFormState>(
    key: K,
    value: AssessmentFormState[K],
  ) => void;
  errors: Record<string, string>;
}
