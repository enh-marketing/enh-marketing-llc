// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/dgr-aviation
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
// THIS PAGE IS PUBLISHED WITH ITS TWO MIDDLE SECTIONS SWAPPED. Upstream, the
// block headed "challenges" holds the approach and the block headed "Approach"
// holds the challenge. Both are migrated verbatim into the roles their own
// sentences describe, and `sourceSectionsSwapped` records it. Fix at source.
//
// Generated. To re-migrate, re-run the converter rather than editing by hand.

import type { Study } from "@/content/case-studies";

export const study: Study = {
  slug: "dgr-aviation",
  client: "DGR Aviation Training Services",
  title: "Driving High-Intent Visibility for Aviation Compliance Training",
  sector: "Training & compliance",
  sectorEvidence: "aviation training provider specializing in Dangerous Goods Regulations (DGR) training",
  order: 8,
  metrics: [
    {
      value: "#1",
      label: "Rankings for DGR Training Dubai & Dangerous Goods Training Dubai",
    },
    {
      value: "1,600+",
      label: "Google My Business impressions in a single month",
    },
    {
      value: "170+",
      label: "Local actions (calls & direction requests) in peak months",
    },
    {
      value: "1,000+",
      label: "Monthly website users driven by high-intent searches",
    },
  ],
  services: [
    {
      key: "seo",
      evidence: "a focused digital strategy was implemented combining hyper-targeted SEO with strong local presence optimization",
    },
    {
      key: "local",
      evidence: "A mobile-first local SEO strategy was executed through Google My Business optimization",
    },
    {
      key: "content",
      evidence: "Role-specific content was developed and optimized to capture granular search queries",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "DGR Aviation Training Services LLC is a Dubai-based aviation training provider specializing in Dangerous Goods Regulations (DGR) training. The institute delivers UAE-approved certification courses for professionals in aviation, logistics, and cargo operations, ensuring compliance with international IATA standards as well as local GCAA and DCAA regulations. As a provider of highly specialized aviation compliance training, DGR Aviation plays a critical role in enabling the safe handling and transport of hazardous materials by air across the UAE and beyond.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Despite offering essential and highly regulated certifications, DGR Aviation operated within a crowded and competitive education market in Dubai. The primary challenge was capturing highly specific, role-based search intent, as prospective students often searched for niche certification requirements rather than general aviation training terms. In parallel, the business needed to strengthen local visibility to drive phone inquiries and physical visits to its Al Garhoud location, particularly from mobile users. Competing with established institutes for broader corporate and soft skills keywords further intensified the challenge.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "To address these challenges, a focused digital strategy was implemented combining hyper-targeted SEO with strong local presence optimization. Role-specific content was developed and optimized to capture granular search queries related to flight operations, dispatch, security screening, and air cargo compliance. A mobile-first local SEO strategy was executed through Google My Business optimization to dominate “near me” searches and drive immediate actions such as calls and direction requests. To diversify traffic sources, the SEO scope was expanded to include corporate and soft skills training keywords alongside technical aviation compliance terms.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "The digital strategy delivered strong and sustained growth for DGR Aviation throughout 2025. The institute secured #1 search rankings for high-intent keywords such as DGR training Dubai, DGR course in Dubai, and dangerous goods training Dubai, establishing clear market leadership in aviation compliance training. Targeted role-based SEO also strengthened visibility for specialized certifications, while a mobile-first local strategy significantly increased calls and direction requests to the Al Garhoud training center. This improved visibility translated into consistent website traffic growth, higher-quality inquiries, and reinforced DGR Aviation’s position as a trusted provider of regulated aviation training in the UAE.",
      ],
    },
    {
      type: "p",
      text: [
        "DGR Aviation’s digital growth strengthened its position as a leading provider of DGR and aviation compliance training in Dubai. Through precise role-based SEO and a mobile-driven local strategy, the institute achieved consistent visibility for high-intent certifications while increasing inquiries and on-site engagement. This approach reinforced DGR Aviation’s authority in regulated aviation training and supported sustained enrollment growth in a competitive education landscape.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/dgr-aviation/card.webp",
    small: "/case-studies/dgr-aviation/card-700.webp",
    alt: "DGR Aviation - 1,600+ Google My Business impressions",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/dgr-aviation/sheet-full-1200.webp",
    full: "/case-studies/dgr-aviation/sheet-full.webp",
    alt: "Results sheet published for DGR Aviation Training Services: a one-page summary of the campaign's figures.",
    w: 2000,
    h: 1096,
  },
  projectUrl: "https://dgraviation.com/",
  sourceSectionsSwapped: true,
  source: "https://enhmedia.com/case-studies/dgr-aviation",
};
