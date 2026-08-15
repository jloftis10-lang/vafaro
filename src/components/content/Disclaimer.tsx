const DISCLAIMER_TEXT = {
  tax: "Educational only. Consult qualified tax professionals.",
  legal: "Educational only. Consult transaction counsel.",
  earnout: "Transaction-specific and subject to negotiated documentation.",
  "working-capital": "Accounting definitions and closing mechanics vary by agreement.",
  valuation: "Directional estimate, not a certified valuation, appraisal, or fairness opinion.",
} as const;

export type DisclaimerType = keyof typeof DISCLAIMER_TEXT;

interface DisclaimerProps {
  type: DisclaimerType;
}

/**
 * Short, contextual disclaimer for a specific claim or section — distinct
 * from the site-wide legal disclaimer in the footer. Use inline, next to
 * the specific claim it qualifies (a tax paragraph, an earnout section),
 * not as a catch-all at the bottom of every page.
 */
export function Disclaimer({ type }: DisclaimerProps) {
  return <p className="mt-2 text-xs italic text-muted">{DISCLAIMER_TEXT[type]}</p>;
}
