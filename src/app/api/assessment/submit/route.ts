import { NextResponse } from "next/server";

import { getIndustryById } from "@/lib/data/industries";
import { determineCTA } from "@/lib/assessment/cta";
import { renderAssessmentReportEmail } from "@/lib/assessment/email-template";
import { calculateLeadScore } from "@/lib/assessment/lead-score";
import { rankRecommendations } from "@/lib/assessment/recommendations";
import { calculateReadiness } from "@/lib/assessment/readiness";
import { evaluateRiskFlags } from "@/lib/assessment/risks";
import { assessmentSubmissionSchema } from "@/lib/assessment/schema";
import { evaluateStrengths } from "@/lib/assessment/strengths";
import {
  BENCHMARK_DATASET_VERSION,
  INDUSTRY_MODEL_VERSION,
  READINESS_MODEL_VERSION,
  VALUATION_MODEL_VERSION,
} from "@/lib/assessment/model-version";
import { toValuationInputs } from "@/lib/assessment/valuation-adapter";
import { BRAND } from "@/lib/content/brand";
import { getResendClient } from "@/lib/resend";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { calculateValuation } from "@/lib/valuation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = assessmentSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { company, ...answers } = parsed.data;

  // Honeypot tripped — pretend success so bots don't learn to avoid this field.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const industry = getIndustryById(answers.industryId);
  if (!industry) {
    return NextResponse.json({ error: "Unknown industry." }, { status: 400 });
  }

  const valuation = calculateValuation(toValuationInputs(answers));
  const readiness = calculateReadiness(answers);
  const risks = evaluateRiskFlags(answers);
  const strengths = evaluateStrengths(answers);
  const recommendations = rankRecommendations(risks);
  const cta = determineCTA(readiness, answers);
  // Internal only — computed here for storage, never included in any
  // response sent back to the client.
  const leadScore = calculateLeadScore(answers, readiness);

  const supabase = getSupabaseServerClient();
  const { error: insertError } = await supabase.from("assessment_submissions").insert({
    email: answers.email,

    industry: answers.industryId,
    revenue: answers.revenue,
    metric_type: answers.metricType,
    metric_value: answers.metricValue,

    multiple_low: valuation.multipleLow,
    multiple_high: valuation.multipleHigh,
    valuation_low: valuation.valuationLow,
    valuation_high: valuation.valuationHigh,

    readiness_total: readiness.totalScore,
    readiness_band: readiness.band,
    readiness_categories: readiness.categories,

    risk_flags: risks,
    recommendations,
    strengths,

    sale_timeline: answers.saleTimeline,
    transaction_priorities: answers.transactionPriorities,

    lead_score: leadScore.score,
    lead_classification: leadScore.classification,

    valuation_model_version: VALUATION_MODEL_VERSION,
    readiness_model_version: READINESS_MODEL_VERSION,
    industry_model_version: INDUSTRY_MODEL_VERSION,
    benchmark_dataset_version: BENCHMARK_DATASET_VERSION,
    estimate_confidence_level: valuation.estimateConfidence.level,
    market_segment: valuation.marketSegment,

    // Audit trail for reconstructing how this valuation was reached — see
    // docs/valuation-benchmark-policy.md and master prompt sections 45-46.
    valuation_explainability: {
      benchmarkIdsUsed: valuation.benchmarkIdsUsed,
      confidenceBenchmarkIds: valuation.estimateConfidence.benchmarkIds,
      fallbackLevel: valuation.fallbackLevel,
      benchmarkLow: valuation.benchmarkLow,
      benchmarkHigh: valuation.benchmarkHigh,
      qualityPositionFraction: valuation.qualityPositionFraction,
      qualityPositionLabel: valuation.qualityPositionLabel,
      positiveFactors: valuation.positiveFactors,
      negativeFactors: valuation.negativeFactors,
    },

    answers,
  });

  if (insertError) {
    console.error("Supabase insert failed:", insertError);
    return NextResponse.json(
      { error: "Could not save your submission. Please try again." },
      { status: 500 },
    );
  }

  try {
    const resend = getResendClient();
    const { error: sendError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? `${BRAND.name} <reports@${BRAND.domain}>`,
      to: answers.email,
      subject: "Your business valuation + deal readiness report",
      html: renderAssessmentReportEmail({ answers, valuation, readiness, strengths, risks, recommendations, cta }),
    });
    if (sendError) {
      console.error("Resend send failed:", sendError);
    }
  } catch (emailError) {
    console.error("Resend send failed:", emailError);
  }

  return NextResponse.json({ ok: true });
}
