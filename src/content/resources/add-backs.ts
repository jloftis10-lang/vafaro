import type { ResourceArticle } from "@/content/resources/types";

export const addBacks: ResourceArticle = {
  slug: "add-backs",
  title: "What Are Add-Backs in a Business Valuation?",
  metaDescription:
    "What discretionary add-backs are, common examples, and why documentation is one of the first things buyers scrutinize.",
  dek: "Add-backs adjust reported earnings to reflect what the business actually generates — but only the ones you can document will hold up.",
  sections: [
    {
      heading: "What an add-back is",
      paragraphs: [
        "Small and mid-sized businesses routinely run personal or one-time expenses through the business for tax reasons — which means the company's reported net income understates what it actually generates for an owner. An add-back is an adjustment that reverses one of those items to get to a more accurate earnings figure.",
      ],
    },
    {
      heading: "Common examples",
      paragraphs: [
        "Owner compensation above (or a personal vehicle, phone, or travel run through the business), one-time legal or consulting fees unrelated to ongoing operations, a family member on payroll who isn't actively working, and non-recurring expenses like a lawsuit settlement or a one-time equipment write-off are all typical add-backs.",
        "Some are straightforward and well-accepted by buyers. Others — particularly anything that requires judgment about what's 'personal' versus 'business,' or that isn't clearly one-time — invite far more scrutiny.",
      ],
    },
    {
      heading: "Why documentation matters",
      paragraphs: [
        "An add-back that isn't documented is, from a buyer's perspective, just a claim. Buyers and their advisors will typically ask for receipts, invoices, or clear explanations for every meaningful adjustment, and add-backs that can't be substantiated are usually removed from the earnings figure entirely — which lowers the value the multiple gets applied to.",
        "The businesses that come through diligence smoothly are usually the ones that kept a running, well-documented schedule of adjustments all along, rather than trying to reconstruct it under pressure once a buyer is asking questions.",
      ],
    },
  ],
  relatedSlugs: ["sde-vs-ebitda", "quality-of-earnings", "due-diligence"],
};
