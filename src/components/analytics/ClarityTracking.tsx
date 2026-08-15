"use client";

import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

const DEFAULT_CLARITY_PROJECT_ID = "y0l9bq6ldx";

interface OwnerGaugeAnalyticsEvent extends CustomEvent<Record<string, string | number>> {
  detail: { event?: string } & Record<string, string | number>;
}

export function ClarityTracking() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || DEFAULT_CLARITY_PROJECT_ID;

    Clarity.init(projectId);

    const forwardEvent = (event: Event) => {
      const { event: eventName, ...properties } = (event as OwnerGaugeAnalyticsEvent).detail;
      if (!eventName) return;
      Clarity.event(eventName);
      Object.entries(properties).forEach(([key, value]) => Clarity.setTag(key, String(value)));
    };

    window.addEventListener("ownergauge:analytics", forwardEvent);
    return () => window.removeEventListener("ownergauge:analytics", forwardEvent);
  }, []);

  return null;
}
