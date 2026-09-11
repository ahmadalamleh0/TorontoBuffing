/**
 * Lightweight metadata for the 24 Insight drafts — title, excerpt,
 * category, related service, nothing else. This is NOT the source of
 * truth for article content (that lives only in Supabase, written by
 * scripts/seed-draft-seo-pages.mjs + scripts/migrate-insights.mjs) —
 * it exists purely so RelatedInsightsSection has something real to
 * show in local development before any Insight is actually published,
 * without duplicating full article bodies here. See that component
 * for exactly how (and only how) this gets used: as a dev-only
 * fallback when the live query returns nothing, stripped from
 * production the same way every other import.meta.env.DEV branch in
 * this project is.
 */
export const INSIGHTS_MANIFEST = [
  { slug: "paint-correction-stages", title: "Understanding Paint Correction Stages", excerpt: "A clear explanation of one stage, two stage and three stage paint correction, what each level actually removes, and how Toronto Buffing decides which one a vehicle needs.", category: "Paint Correction", relatedService: "paint-correction" },
  { slug: "three-stage-paint-correction", title: "The Three Stage Paint Correction Process", excerpt: "How a three stage paint correction actually works, from initial inspection through cutting, refining and final protection.", category: "Paint Correction", relatedService: "paint-correction" },
  { slug: "paint-correction-101", title: "Paint Correction 101: Understanding Your Car's Paint", excerpt: "A plain explanation of how automotive paint is built, what causes swirl marks and oxidation, and what paint correction can and cannot fix.", category: "Paint Correction", relatedService: "paint-correction" },
  { slug: "wetsanding-and-watersanding", title: "Wetsanding and Watersanding Explained", excerpt: "What wetsanding actually does, when it is needed, and how it fits alongside standard paint correction at Toronto Buffing.", category: "Paint Correction", relatedService: "paint-correction" },
  { slug: "paint-chip-repair-explained", title: "Understanding Paint Chip Repair", excerpt: "Why paint chips matter more than they look, how Toronto Buffing repairs them, and why chip repair is paired with a larger protection service.", category: "Paint Correction", relatedService: "paint-chip-repair" },
  { slug: "headlight-restoration-explained", title: "How Headlight Restoration Actually Works", excerpt: "What causes headlights to yellow and haze, how restoration corrects it, and how long the results actually last.", category: "Vehicle Care", relatedService: "headlight-restoration" },
  { slug: "self-healing-ppf", title: "How Self Healing PPF Actually Works", excerpt: "The science behind self healing paint protection film, and why heat matters to how well it recovers from light marks.", category: "Paint Protection Film", relatedService: "ppf" },
  { slug: "how-strong-is-ppf", title: "How Strong Is PPF, Really", excerpt: "What paint protection film can and cannot stop, and realistic expectations for how it holds up over time.", category: "Paint Protection Film", relatedService: "ppf" },
  { slug: "ceramic-coating-vs-ppf", title: "Ceramic Coating vs PPF: What Is The Actual Difference", excerpt: "The real difference between ceramic coating and PPF, what each one protects against, and why many vehicles use both together.", category: "Ceramic Coating", relatedService: "ceramic-coating" },
  { slug: "good-ppf-vs-bad-ppf", title: "Good PPF Installation vs Bad PPF Installation", excerpt: "How to tell a properly installed paint protection film from a poor one, from cutting method to edge wrapping to surface preparation.", category: "Paint Protection Film", relatedService: "ppf" },
  { slug: "why-ppf-edges-lift", title: "Why PPF Edges Sometimes Lift", excerpt: "The real causes of PPF edge lifting, and what a properly managed installation does to catch it early.", category: "Paint Protection Film", relatedService: "ppf" },
  { slug: "ppf-installation-cost-factors", title: "What Actually Affects PPF Installation Cost", excerpt: "The real factors that affect what paint protection film costs, from vehicle size to film quality to coverage chosen.", category: "Paint Protection Film", relatedService: "ppf" },
  { slug: "ppf-removal", title: "What Happens When PPF Is Removed", excerpt: "How paint protection film is removed, what determines whether the paint underneath is safe, and when removal makes sense.", category: "Paint Protection Film", relatedService: "ppf" },
  { slug: "bulk-vs-precut-ppf", title: "Bulk PPF vs Precut PPF: What Is The Difference", excerpt: "The difference between bulk PPF installation and precut kits, and why installation method affects edge quality.", category: "Paint Protection Film", relatedService: "ppf" },
  { slug: "ppf-curing-period", title: "The PPF Curing Period Explained", excerpt: "What actually happens while paint protection film cures, and what to do and avoid during that window.", category: "Paint Protection Film", relatedService: "ppf" },
  { slug: "insurance-and-ppf", title: "Insurance And PPF: What Owners Should Know", excerpt: "What to know about insurance and paint protection film, including disclosure and how claims can be affected.", category: "Paint Protection Film", relatedService: "ppf" },
  { slug: "full-body-ppf", title: "What Full Body PPF Actually Covers", excerpt: "What full body paint protection film coverage includes, how long it takes, and who it makes the most sense for.", category: "Paint Protection Film", relatedService: "ppf" },
  { slug: "matte-and-satin-ppf", title: "Matte And Satin PPF: What Is Different", excerpt: "How matte and satin paint protection film differs from gloss film, and what to know about maintaining a matte finish.", category: "Paint Protection Film", relatedService: "ppf" },
  { slug: "ceramic-coating-toronto-guide", title: "Choosing A Ceramic Coating In Toronto: A Practical Guide", excerpt: "How to think about choosing a ceramic coating tier in Toronto, from durability to maintenance to what correction it actually needs first.", category: "Ceramic Coating", relatedService: "ceramic-coating" },
  { slug: "ceramic-coating-cost", title: "What Affects Ceramic Coating Cost", excerpt: "The real factors that affect what ceramic coating costs, including preparation, product tier and vehicle condition.", category: "Ceramic Coating", relatedService: "ceramic-coating" },
  { slug: "ceramic-coating-curing", title: "How Ceramic Coating Actually Cures", excerpt: "The science behind how ceramic coating hardens over time, and how to care for a vehicle during that window.", category: "Ceramic Coating", relatedService: "ceramic-coating" },
  { slug: "ceramic-coating-removal", title: "How Ceramic Coating Is Safely Removed", excerpt: "What removing a ceramic coating actually involves, and why premium coatings take more than a simple stripper to fully remove.", category: "Ceramic Coating", relatedService: "ceramic-coating" },
  { slug: "ceramic-coating-winter-vs-summer", title: "Ceramic Coating In Winter vs Summer", excerpt: "How the season affects ceramic coating application and curing, and what to consider when timing the service.", category: "Ceramic Coating", relatedService: "ceramic-coating" },
  { slug: "post-service-car-care", title: "Caring For Your Car After Correction, Coating Or PPF", excerpt: "How to care for your vehicle after paint correction, ceramic coating or PPF, including wash timing and what to avoid early on.", category: "Vehicle Care", relatedService: null },
];

export function getRelatedInsightsFromManifest(serviceSlug, excludeSlug) {
  return INSIGHTS_MANIFEST.filter((item) => item.relatedService === serviceSlug && item.slug !== excludeSlug);
}
