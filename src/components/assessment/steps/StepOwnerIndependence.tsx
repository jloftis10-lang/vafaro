import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  CUSTOMER_RELATIONSHIP_OWNERSHIP_OPTIONS,
  MANAGEMENT_DEPTH_OPTIONS,
  OWNER_ABSENCE_HELP,
  OWNER_ABSENCE_OPTIONS,
  OWNER_HOURS_OPTIONS,
  PROCESS_DOCUMENTATION_OPTIONS,
  SUCCESSOR_READINESS_HELP,
  SUCCESSOR_READINESS_OPTIONS,
  shouldAskSuccessorReadiness,
} from "@/lib/assessment/questions";

import type { StepProps } from "./StepProps";

export function StepOwnerIndependence({ form, update, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <RadioGroup
        name="ownerHoursPerWeek"
        legend="How involved is the owner in daily operations?"
        options={OWNER_HOURS_OPTIONS}
        value={form.ownerHoursPerWeek}
        onChange={(value) => update("ownerHoursPerWeek", value)}
        error={errors.ownerHoursPerWeek}
      />

      {shouldAskSuccessorReadiness(form.ownerHoursPerWeek) && (
        <RadioGroup
          name="successorReadiness"
          legend="Successor readiness"
          helpText={SUCCESSOR_READINESS_HELP}
          options={SUCCESSOR_READINESS_OPTIONS}
          value={form.successorReadiness}
          onChange={(value) => update("successorReadiness", value)}
        />
      )}

      <RadioGroup
        name="ownerAbsenceImpact"
        legend="If the owner disappeared for 90 days…"
        helpText={OWNER_ABSENCE_HELP}
        options={OWNER_ABSENCE_OPTIONS}
        value={form.ownerAbsenceImpact}
        onChange={(value) => update("ownerAbsenceImpact", value)}
        error={errors.ownerAbsenceImpact}
      />

      <RadioGroup
        name="customerRelationshipOwnership"
        legend="Who owns the major customer relationships?"
        options={CUSTOMER_RELATIONSHIP_OWNERSHIP_OPTIONS}
        value={form.customerRelationshipOwnership}
        onChange={(value) => update("customerRelationshipOwnership", value)}
        error={errors.customerRelationshipOwnership}
      />

      <RadioGroup
        name="managementDepth"
        legend="Is there a management team below the owner?"
        options={MANAGEMENT_DEPTH_OPTIONS}
        value={form.managementDepth}
        onChange={(value) => update("managementDepth", value)}
        error={errors.managementDepth}
      />

      <RadioGroup
        name="processDocumentation"
        legend="Are critical operating processes documented?"
        options={PROCESS_DOCUMENTATION_OPTIONS}
        value={form.processDocumentation}
        onChange={(value) => update("processDocumentation", value)}
        error={errors.processDocumentation}
      />
    </div>
  );
}
