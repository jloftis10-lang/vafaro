import { buildBuyerInterestNarrative } from "@/lib/assessment/buyer-interest";
import { REVENUE_GROWTH_OPTIONS } from "@/lib/assessment/questions";
import { buildTransactionSnapshot } from "@/lib/assessment/snapshot";
import type { AssessmentAnswers, Recommendation, RiskFlag, ReadinessResult, CTAResult } from "@/lib/assessment/types";
import type { Strength } from "@/lib/assessment/strengths";
import { BRAND, SITE_URL } from "@/lib/content/brand";
import { getIndustryById } from "@/lib/data/industries";
import { formatCurrency } from "@/lib/format";
import type { ValuationResult } from "@/lib/types";

interface AssessmentEmailData {
  answers: AssessmentAnswers;
  valuation: ValuationResult;
  readiness: ReadinessResult;
  strengths: Strength[];
  risks: RiskFlag[];
  recommendations: Recommendation[];
  cta: CTAResult;
}

const INK = "#1b2733";
const MUTED = "#5b6b76";
const PRIMARY = "#031b3f";
const ACCENT = "#0060e4";
const LINE = "#e1ded4";
const CANVAS = "#f7f5f0";

function sectionLabel(text: string): string {
  return `<p style="font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: ${ACCENT}; margin: 0 0 8px;">${text}</p>`;
}

const CONFIDENCE_LABEL: Record<string, string> = { higher: "Higher", moderate: "Moderate", limited: "Limited" };

export function renderAssessmentReportEmail(data: AssessmentEmailData): string {
  const { answers, valuation, readiness, strengths, risks, recommendations, cta } = data;
  const range = `${formatCurrency(valuation.valuationLow)} – ${formatCurrency(valuation.valuationHigh)}`;

  const industryLabel = getIndustryById(answers.industryId)?.label ?? answers.industryId;
  const growthLabel =
    REVENUE_GROWTH_OPTIONS.find((option) => option.value === answers.revenueGrowth)?.label ??
    answers.revenueGrowth;

  const profileRows = [
    ["Industry", industryLabel],
    ["Revenue", formatCurrency(answers.revenue)],
    [`Adjusted ${answers.metricType.toUpperCase()}`, formatCurrency(answers.metricValue)],
    ["Growth Profile", growthLabel],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 4px 0; font-size: 13px; color: ${MUTED};">${label}</td>
          <td style="padding: 4px 0; font-size: 13px; color: ${INK}; text-align: right;">${value}</td>
        </tr>`,
    )
    .join("");

  const snapshotRows = buildTransactionSnapshot(readiness)
    .map(
      (item) => `
        <tr>
          <td style="padding: 4px 0; font-size: 13px; color: ${INK};">${item.label}</td>
          <td style="padding: 4px 0; font-size: 13px; color: ${MUTED}; text-align: right;">${item.value}</td>
        </tr>`,
    )
    .join("");

  const holdBacks = risks.filter((r) => r.severity === "critical" || r.severity === "important").slice(0, 5);

  const categoryRows = readiness.categories
    .map(
      (c) => `
        <tr>
          <td style="padding: 4px 0; font-size: 13px; color: ${INK};">${c.label}</td>
          <td style="padding: 4px 0; font-size: 13px; color: ${MUTED}; text-align: right;">${c.score}</td>
        </tr>`,
    )
    .join("");

  const strengthsList =
    strengths.length > 0
      ? strengths
          .map(
            (s) => `<li style="margin-bottom: 8px;"><strong style="color: ${PRIMARY};">${s.title}.</strong> <span style="color: ${MUTED};">${s.explanation}</span></li>`,
          )
          .join("")
      : "";

  const risksList =
    holdBacks.length > 0
      ? holdBacks
          .map(
            (r) => `
        <li style="margin-bottom: 14px;">
          <strong style="color: ${PRIMARY};">${r.title}</strong>
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: ${ACCENT};"> — ${r.severity}</span>
          <div style="color: ${INK}; margin-top: 2px;">${r.explanation}</div>
          <div style="color: ${MUTED}; margin-top: 2px; font-size: 13px;"><em>What to do:</em> ${r.recommendedAction}</div>
        </li>`,
          )
          .join("")
      : "";

  const buyerInterestNarrative = buildBuyerInterestNarrative(answers);

  const recommendationsList = recommendations
    .map(
      (rec) => `
      <li style="margin-bottom: 12px;">
        <strong style="color: ${PRIMARY};">${rec.title}</strong>
        <div style="color: ${MUTED}; margin-top: 2px;">${rec.detail}</div>
      </li>`,
    )
    .join("");

  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; color: ${INK};">
      <img
        src="${SITE_URL}/email-logo.png"
        alt="${BRAND.name}"
        width="180"
        height="24"
        style="display: block; width: 180px; height: auto; margin: 0 0 12px; border: 0;"
      />
      <p style="font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: ${ACCENT}; margin: 0 0 8px;">
        Business Value &amp; Deal Readiness Report
      </p>

      <div style="margin-bottom: 24px;">
        ${sectionLabel("Business Profile")}
        <table style="width: 100%; border-collapse: collapse;">
          ${profileRows}
        </table>
      </div>

      ${sectionLabel("Estimated Market Value")}
      <p style="font-size: 28px; font-weight: bold; margin: 0 0 4px; color: ${PRIMARY};">${range}</p>
      <p style="font-size: 14px; color: ${MUTED}; margin: 0 0 20px;">
        ${
          valuation.isIndustrySpecific
            ? `Based on approximately ${valuation.multipleLow.toFixed(1)}x&ndash;${valuation.multipleHigh.toFixed(1)}x adjusted ${answers.metricType.toUpperCase()}.`
            : `Directional planning range using broad, provisional ${answers.metricType.toUpperCase()} assumptions&mdash;not an industry-specific transaction benchmark.`
        }
      </p>
      <div style="background: ${CANVAS}; border-radius: 6px; padding: 12px 16px; margin: 0 0 20px;">
        <p style="font-size: 14px; font-weight: 600; margin: 0 0 4px; color: ${INK};">
          Estimate confidence: ${CONFIDENCE_LABEL[valuation.estimateConfidence.level] ?? valuation.estimateConfidence.level}
        </p>
        <p style="font-size: 12px; line-height: 1.5; margin: 0; color: ${MUTED};">${valuation.estimateConfidence.explanation}</p>
      </div>
      <p style="font-size: 14px; line-height: 1.6; margin: 0 0 24px;">${valuation.commentary}</p>

      <div style="border-top: 1px solid ${LINE}; padding-top: 20px; margin-bottom: 24px;">
        ${sectionLabel("Deal Readiness")}
        <p style="font-size: 24px; font-weight: bold; margin: 0 0 4px; color: ${PRIMARY};">
          ${readiness.totalScore} / 100 — ${readiness.band}
        </p>
        <p style="font-size: 14px; line-height: 1.6; margin: 8px 0 0;">${readiness.summary}</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
          ${categoryRows}
        </table>
      </div>

      <div style="border-top: 1px solid ${LINE}; padding-top: 20px; margin-bottom: 24px;">
        ${sectionLabel("Transaction Snapshot")}
        <table style="width: 100%; border-collapse: collapse;">
          ${snapshotRows}
        </table>
      </div>

      ${
        strengthsList
          ? `<div style="border-top: 1px solid ${LINE}; padding-top: 20px; margin-bottom: 24px;">
              ${sectionLabel("What's Working in Your Favor")}
              <ul style="padding-left: 18px; margin: 0; font-size: 14px; line-height: 1.5;">${strengthsList}</ul>
            </div>`
          : ""
      }

      ${
        risksList
          ? `<div style="border-top: 1px solid ${LINE}; padding-top: 20px; margin-bottom: 24px;">
              ${sectionLabel("What Could Hold Back a Deal")}
              <ul style="padding-left: 18px; margin: 0; font-size: 14px; line-height: 1.5;">${risksList}</ul>
            </div>`
          : ""
      }

      ${
        buyerInterestNarrative
          ? `<div style="border-top: 1px solid ${LINE}; padding-top: 20px; margin-bottom: 24px;">
              ${sectionLabel("How a Buyer May View Your Business")}
              <p style="font-size: 14px; line-height: 1.6; margin: 0; color: ${INK};">${buyerInterestNarrative}</p>
            </div>`
          : ""
      }

      <div style="border-top: 1px solid ${LINE}; padding-top: 20px; margin-bottom: 24px;">
        ${sectionLabel("Your Three Highest-Impact Actions")}
        <ol style="padding-left: 18px; margin: 0; font-size: 14px; line-height: 1.5;">${recommendationsList}</ol>
      </div>

      <div style="background: ${PRIMARY}; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 24px;">
        <p style="color: white; font-size: 17px; font-weight: bold; margin: 0 0 8px;">${cta.headline}</p>
        <p style="color: rgba(255,255,255,0.8); font-size: 13px; line-height: 1.5; margin: 0 0 16px;">${cta.subhead}</p>
        <a href="${cta.buttonHref}" style="display: inline-block; background: white; color: ${PRIMARY}; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: bold; text-decoration: none;">
          ${cta.buttonLabel}
        </a>
      </div>

      <p style="font-size: 12px; line-height: 1.6; color: ${MUTED}; border-top: 1px solid ${LINE}; padding-top: 16px;">
        This report is a directional estimate for planning purposes only, generated from the information you
        provided. It is not a formal business valuation, appraisal, fairness opinion, or transaction advice, and
        should not be relied on for tax, legal, or transaction purposes. Submitting this assessment does not
        create an advisory relationship.
      </p>
    </div>
  `.trim();
}
