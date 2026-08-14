export type TripInput = {
  companions: string[];
  needs: string[];
  walkingHours: number;
  pace: number;
  description: string;
};

export type Finding = {
  level: "high" | "check" | "good";
  title: string;
  detail: string;
  action: string;
  confidence: "AI estimate" | "Official source needed" | "Based on your profile";
};

export type TripReport = {
  id: string;
  title: string;
  score: number;
  summary: string;
  createdAt: string;
  input: TripInput;
  findings: Finding[];
};

export function generateReport(input: TripInput): TripReport {
  const text = input.description.toLowerCase();
  const findings: Finding[] = [];
  let score = 92;

  if (input.needs.includes("Easy walking") || input.walkingHours <= 2) {
    score -= 12;
    findings.push({ level:"high", title:"Daily walking needs a closer look", detail:"This group prefers shorter walking windows. Door-to-door distance, queues, and uneven ground can make a light-looking day considerably harder.", action:"Keep one principal activity per day and verify the complete walking route.", confidence:"Based on your profile" });
  }
  if (input.needs.includes("Step-free access")) {
    score -= 9;
    findings.push({ level:"check", title:"Step-free access is still unverified", detail:"An elevator listing does not confirm a step-free entrance, accessible route, or lift access to every floor.", action:"Confirm entrances, elevators, bathrooms, and vehicle access directly.", confidence:"Official source needed" });
  }
  if (text.includes("flight") || text.includes("overseas") || text.includes("international")) {
    score -= 6;
    findings.push({ level:"check", title:"Arrival-day recovery is not protected", detail:"Long-haul travel, immigration, baggage, and the hotel transfer can consume more energy than the itinerary suggests.", action:"Leave the arrival day untimed and move major plans to the following day.", confidence:"AI estimate" });
  }
  if (text.includes("train") || text.includes("connection") || text.includes("multiple cities")) {
    score -= 7;
    findings.push({ level:"check", title:"Transfers may be carrying hidden friction", detail:"Platform changes, luggage, stairs, and short connection windows affect groups differently.", action:"Add a 30-minute group buffer and verify station accessibility.", confidence:"AI estimate" });
  }
  if (input.companions.includes("Young children")) {
    score -= 5;
    findings.push({ level:"check", title:"Children need an exit plan", detail:"Timed activities work better when meals, bathrooms, naps, and an easy return to lodging are visible in the plan.", action:"Add one flexible break and one weather-proof backup each day.", confidence:"Based on your profile" });
  }
  if (text.includes("pet") || text.includes("dog") || text.includes("cat")) {
    score -= 8;
    findings.push({ level:"high", title:"Pet policies require itinerary-level verification", detail:"Airline, lodging, destination, and return-entry rules can differ by animal, size, route, and travel history.", action:"Verify every carrier and government requirement before purchasing nonrefundable travel.", confidence:"Official source needed" });
  }

  findings.push({ level:"good", title:"Your group profile is a strong start", detail:"You have surfaced preferences that generic itinerary tools usually miss.", action:"Save this profile and reuse it when comparing future trips.", confidence:"Based on your profile" });
  const safeScore = Math.max(48, Math.min(96, score));
  const place = input.description.match(/(?:to|in|visit(?:ing)?)\s+([A-Z][A-Za-zÀ-ÿ\s]{2,24})/)?.[1]?.trim();

  return {
    id: `vf-${Date.now().toString(36)}`,
    title: place ? `${place} trip check` : "Your Trip Fit check",
    score: safeScore,
    summary: safeScore >= 80 ? "A strong fit with a few details to verify." : safeScore >= 65 ? "A promising trip with friction worth correcting." : "This trip needs adjustment before you commit.",
    createdAt: new Date().toISOString(), input, findings,
  };
}

export function encodeReport(report: TripReport) {
  const bytes = new TextEncoder().encode(JSON.stringify(report));
  let binary = "";
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

export function decodeReport(value: string): TripReport | null {
  try {
    const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as TripReport;
  } catch { return null; }
}
