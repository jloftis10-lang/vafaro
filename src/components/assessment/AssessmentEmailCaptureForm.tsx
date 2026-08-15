"use client";

import { useState } from "react";

import type { AssessmentAnswers } from "@/lib/assessment/types";
import { trackEvent } from "@/lib/analytics";

interface AssessmentEmailCaptureFormProps {
  answers: AssessmentAnswers;
}

type Status = "idle" | "submitting" | "success" | "error";

export function AssessmentEmailCaptureForm({ answers }: AssessmentEmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot — real users never see or fill this field
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    trackEvent("report_email_requested", { industry: answers.industryId });
    setStatus("submitting");

    try {
      const response = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, email, company }),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-line bg-accent-soft px-5 py-4 text-sm text-ink">
        Your full report is on its way to <strong>{email}</strong>.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="assessment-email" className="text-sm font-medium text-ink">
        Get the full report by email
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="assessment-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-md border border-line bg-surface px-3 py-2.5 text-ink outline-none focus:border-primary sm:flex-1"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Email Me the Report"}
        </button>
      </div>
      {/* Honeypot — hidden from real users via CSS, not `type="hidden"`, since some bots skip hidden inputs. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong sending your report. Please try again.
        </p>
      )}
    </form>
  );
}
