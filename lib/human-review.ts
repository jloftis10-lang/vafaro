export type EvidenceRecord = {
  claim: string;
  source: string;
  checkedOn: string;
  status: "Verified" | "Estimate" | "Unresolved";
  notes: string;
};

export type FrictionMapRow = {
  segment: string;
  load: "Low" | "Medium" | "High";
  why: string;
  correction: string;
};

export type HumanReviewReport = {
  reviewId: string;
  subject: string;
  reviewedOn: string;
  reviewer: string;
  scope: string[];
  travelerProfile: string[];
  planningSignal: number;
  summary: string;
  frictionMap: FrictionMapRow[];
  evidence: EvidenceRecord[];
  correctedPlan: string[];
  unresolved: string[];
};

export const sampleHumanReview: HumanReviewReport = {
  reviewId: "VF-SAMPLE-001",
  subject: "Rome and Florence family itinerary",
  reviewedOn: "Illustrative sample",
  reviewer: "Vafaro human review format",
  scope: [
    "Walking, standing, stairs, transfers, and recovery time",
    "Three material access questions identified in the intake",
    "Current first-party sources for claims marked Verified",
  ],
  travelerProfile: [
    "Six travelers including two parents/grandparents",
    "Comfortable with about two hours of walking in a day",
    "Prefers one main activity and a slower pace",
  ],
  planningSignal: 72,
  summary: "A promising trip hiding two difficult days. The route can work better if the first demanding day moves later and the Florence transfer gains a larger buffer.",
  frictionMap: [
    { segment: "Arrival and hotel transfer", load: "Medium", why: "Overnight flight, immigration, baggage, and hotel access are not recovery time.", correction: "Keep arrival evening untimed." },
    { segment: "Ancient Rome day", load: "High", why: "Long museum-style route, uneven terrain, standing, heat exposure, and an evening tour are stacked.", correction: "Move the evening tour and add a seated midday break." },
    { segment: "Rome–Florence transfer", load: "Medium", why: "The current connection leaves little room for luggage, platform changes, and a slower group.", correction: "Choose a later connection or a direct service with a larger buffer." },
  ],
  evidence: [
    { claim: "Complete hotel entrance-to-room route", source: "Hotel accessibility desk", checkedOn: "Required before final delivery", status: "Unresolved", notes: "Confirm entrance step, lift dimensions, room route, and taxi stopping point." },
    { claim: "Ancient Rome walking estimate", source: "Mapped route plus published venue information", checkedOn: "Illustrative only", status: "Estimate", notes: "Must be recalculated for the actual entrances and timed tickets." },
    { claim: "Specific rail platform and lift operation", source: "Rail operator and station assistance service", checkedOn: "Required near travel date", status: "Unresolved", notes: "Platforms and equipment can change." },
  ],
  correctedPlan: [
    "Arrival: hotel transfer, nearby meal, and no timed attraction.",
    "Ancient Rome: one guided visit, seated lunch, optional evening.",
    "Historic center: taxi to the first stop, short walking segments, café recovery breaks.",
    "Transfer day: direct train where possible and at least a 30-minute group buffer.",
  ],
  unresolved: [
    "The complete step-free route from street to guest room",
    "The operating lift and platform for the specific train",
    "Door-to-door walking distances including queues and detours",
  ],
};
