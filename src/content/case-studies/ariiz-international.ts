// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/ariiz-international
//
// Every sentence below is that page's own: the title is its <h1>, the four
// figures are its counter strip, and the four sections are its COMPANY
// PROFILE, challenges, Approach and Outcome rich text, converted block for
// block. Nothing is reworded, summarised, shortened or added, and no figure
// appears anywhere that the page does not publish.
//
// WHAT IS NOT THE SOURCE'S OWN, and why each one is here rather than invented:
// `client` is lifted from the profile's first sentence, `sector` is assigned
// with the phrase it was read from beside it, each entry in `services` carries
// the sentence that names it, and the results sheet's alt text is authored
// because the source publishes none. See scripts/migrate-case-studies/meta.py.
//
// Generated. To re-migrate, re-run the converter rather than editing by hand.

import type { Study } from "@/content/case-studies";

export const study: Study = {
  slug: "ariiz-international",
  client: "Ariiz International",
  title: "Driving High-Intent Search Growth for an Industrial Sealing Supplier",
  sector: "Industrial & trade supply",
  sectorEvidence: "supplier of industrial sealing solutions",
  order: 6,
  metrics: [
    {
      value: "#1",
      label: "Rankings for high-value industrial sealing keywords",
    },
    {
      value: "1,700+",
      label: "Monthly website users are at peak growth",
    },
    {
      value: "550+",
      label: "Backlinks supporting domain authority",
    },
    {
      value: "75+",
      label: "WhatsApp inquiries in a single month",
    },
  ],
  services: [
    {
      key: "seo",
      evidence: "ENH Marketing implemented a focused SEO strategy built around technical accuracy and buyer-intent visibility.",
    },
    {
      key: "content",
      evidence: "Educational content was optimized to attract technical searches",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Ariiz International is a Dubai-based supplier of industrial sealing solutions located in Al Garhoud, UAE. The company specializes in sourcing, exporting, and wholesaling products such as Oil Seals, O-Rings, Hydraulic and Pneumatic Seals, Mechanical Seals, V-Packings, and End Caps.",
      ],
    },
    {
      type: "p",
      text: [
        "Working with global brands including TTO, Kastas, Trisun, GMORS, and National Seals, Ariiz International serves B2B buyers across the Middle East and international markets with precision-engineered sealing products.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Ariiz International operates in a highly technical and competitive industrial market where buyers search for very specific products and sourcing terms rather than generic keywords. Capturing this granular search intent was a major challenge.",
      ],
    },
    {
      type: "p",
      text: [
        "Organic traffic had also plateaued at around 600 monthly users in early 2025, limiting growth. In addition, the business needed to convert online visibility into direct wholesale enquiries through WhatsApp and phone calls.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "ENH Marketing implemented a focused SEO strategy built around technical accuracy and buyer-intent visibility. Hundreds of long-tail and product-specific keywords were targeted by combining sourcing terms such as exporters, suppliers, and distributors with individual sealing products.",
      ],
    },
    {
      type: "p",
      text: [
        "Educational content was optimized to attract technical searches, while dedicated product category pages were strengthened to capture high-intent transactional queries. A sustained backlink strategy was also executed, resulting in 550+ backlinks to reinforce domain authority.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "The SEO campaign delivered consistent growth throughout 2025. By January 2026, Ariiz International achieved #1 rankings for high-value keywords, including oil seal sourcing, V-packing exporters, industrial sealing solutions, and wiper seal suppliers. Monthly website users more than doubled, rising from 632 users in January 2025 to a peak of 1,765 users in November 2025, with organic search becoming the primary acquisition channel. Increased visibility translated into measurable business impact, including 77 WhatsApp enquiries in a single month, supported by steady phone and form enquiries.",
      ],
    },
    {
      type: "p",
      text: [
        "Through precise keyword targeting, technical content optimization, and authority-driven SEO, Ariiz International strengthened its visibility among high-intent B2B buyers. This approach positioned the company as a trusted industrial sealing supplier while driving sustained traffic growth and consistent wholesale enquiries.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/ariiz-international/card.webp",
    small: "/case-studies/ariiz-international/card-700.webp",
    alt: "Ariiz - 100% increase monthly users",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/ariiz-international/sheet-full.webp",
    full: "/case-studies/ariiz-international/sheet-full.webp",
    alt: "Results sheet published for Ariiz International: a one-page summary of the campaign's figures.",
    w: 1080,
    h: 591,
  },
  source: "https://enhmedia.com/case-studies/ariiz-international",
};
