// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/helpsters
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
  slug: "helpsters",
  client: "Helpsters Cleaning Services",
  title: "Capturing High-Value Cleaning Contracts Through Targeted SEO",
  sector: "Construction & facilities",
  sectorEvidence: "facility management and cleaning solutions provider",
  order: 3,
  metrics: [
    {
      value: "#1",
      label: "Rankings for event & exhibition cleaning keywords",
    },
    {
      value: "183",
      label: "Monthly tracked conversions (Jan 2025)",
    },
    {
      value: "3,450+",
      label: "Monthly page views at peak",
    },
    {
      value: "57",
      label: "Monthly GMB call clicks",
    },
  ],
  services: [
    {
      key: "seo",
      evidence: "A focused SEO and Local Search strategy was implemented to capture niche commercial demand.",
    },
    {
      key: "local",
      evidence: "Google My Business was actively managed to increase map visibility and track calls and direction requests.",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Helpsters Cleaning Services LLC is a Dubai-based facility management and cleaning solutions provider serving both residential and commercial sectors. The company delivers specialized services, including event and exhibition cleaning, medical facility sanitation, corporate office maintenance, and deep cleaning for retail environments.",
      ],
    },
    {
      type: "p",
      text: [
        "Known for reliability and service quality, Helpsters supports clients across Dubai with structured, professional cleaning solutions tailored to commercial requirements.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Operating in Dubai’s saturated cleaning market, Helpsters needed to move beyond generic “cleaning services” visibility and compete for higher-value commercial contracts. Ranking for specialized verticals such as exhibition and medical cleaning was critical.",
      ],
    },
    {
      type: "p",
      text: [
        "The company also aimed to generate consistent organic leads without heavy reliance on paid advertising, while strengthening local search presence to capture residential and corporate “near me” intent.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "A focused SEO and Local Search strategy was implemented to capture niche commercial demand. Industry-specific keywords such as exhibition cleaning, medical cleaning services, and retail cleaning services were prioritized to attract B2B decision-makers.",
      ],
    },
    {
      type: "p",
      text: [
        "Dedicated landing pages were optimized for each service vertical to improve search relevance. Google My Business was actively managed to increase map visibility and track calls and direction requests. Conversion tracking was implemented across WhatsApp, phone clicks, and booking actions to measure real lead performance.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "The strategy positioned Helpsters as a visible leader in specialized cleaning services. The company secured #1 rankings for high-value keywords including “event cleaning services,” “exhibition cleaning,” and “exhibition cleaning UAE,” alongside Top 3 rankings for “medical cleaning services Dubai” and “clinic cleaning services Dubai.”",
      ],
    },
    {
      type: "p",
      text: [
        "In January 2025 alone, the website recorded 183 tracked conversions across calls, WhatsApp chats, and booking requests. Monthly page views exceeded 3,450, with organic search driving the majority of traffic. Local performance remained strong, with Google My Business generating 57 call clicks and 52 direction requests in a single month.",
      ],
    },
    {
      type: "p",
      text: [
        "Through niche-focused SEO, structured service page optimization, and local search management, Helpsters strengthened its position in Dubai’s competitive cleaning market. The strategy shifted visibility toward high-revenue commercial services while delivering consistent organic lead generation and measurable business growth.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/helpsters/card.webp",
    small: "/case-studies/helpsters/card-700.webp",
    alt: "helpsters - 2066 monthly mobile viewers",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/helpsters/sheet-full-1200.webp",
    full: "/case-studies/helpsters/sheet-full.webp",
    alt: "Results sheet published for Helpsters Cleaning Services: a one-page summary of the campaign's figures.",
    w: 2000,
    h: 1086,
  },
  source: "https://enhmedia.com/case-studies/helpsters",
};
