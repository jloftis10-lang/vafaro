import type { Metadata } from "next";
import { ExcursionCheck } from "./excursion-check";

export const metadata: Metadata = {
  title: "Check a Cruise Shore Excursion for an Older Traveler",
  description: "Compare one named shore excursion with an older traveler's walking, standing, stairs, mobility-aid, and pacing tolerance before booking.",
  alternates: { canonical: "/check/excursion" },
};

export default function ExcursionCheckPage() {
  return <ExcursionCheck />;
}
