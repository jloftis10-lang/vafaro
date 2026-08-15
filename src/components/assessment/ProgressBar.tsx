import { STEP_TITLES, TOTAL_STEPS } from "@/lib/assessment/questions";

interface ProgressBarProps {
  step: number;
}

export function ProgressBar({ step }: ProgressBarProps) {
  const percent = (step / TOTAL_STEPS) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          Step {step} of {TOTAL_STEPS}
        </span>
        <span className="font-medium text-primary">{STEP_TITLES[step]}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
