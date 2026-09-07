// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/neo-data
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
  slug: "neo-data",
  client: "Neo Data Technologies",
  title: "Expanding Search Visibility & Lead Growth for an Enterprise IT Distributor",
  sector: "Technology & IT",
  sectorEvidence: "provider of enterprise networking and IT infrastructure solutions",
  order: 5,
  metrics: [
    {
      value: "#1",
      label: "Ranking for “DellEMC distributors in Dubai”",
    },
    {
      value: "2,086",
      label: "Monthly users at peak traffic",
    },
    {
      value: "1,076",
      label: "Google My Business impressions",
    },
    {
      value: "60–70",
      label: "Average monthly WhatsApp enquiries",
    },
  ],
  services: [
    {
      key: "seo",
      evidence: "A dual strategy combining Technical SEO and Local SEO was implemented",
    },
    {
      key: "local",
      evidence: "Google My Business optimization ensured strong local visibility",
    },
    {
      key: "content",
      evidence: "technical comparison blogs strengthened domain authority and captured informational traffic",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Neo Data Technologies LLC is a Dubai-based provider of enterprise networking and IT infrastructure solutions. The company supplies routers, switches, firewalls, wireless access points, IP phones, and related hardware from global brands including Cisco, Juniper, Huawei, Dell EMC, HP, Fortinet, Ubiquiti, and Aruba.",
      ],
    },
    {
      type: "p",
      text: [
        "Serving clients across the UAE and Africa, Neo Data focuses on secure, scalable, and performance-driven network infrastructure supported by technical expertise and responsive service.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Operating in Dubai’s competitive IT distribution market, Neo Data Technologies needed to capture high-intent B2B traffic while standing out among numerous resellers targeting similar keywords. Ranking for brand-specific distributor searches was critical.",
      ],
    },
    {
      type: "p",
      text: [
        "The company also needed to expand visibility beyond Dubai to reach buyers across Africa and other UAE regions. Most importantly, website traffic had to convert into actionable inquiries such as WhatsApp messages and phone calls for high-value hardware quotations.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "A dual strategy combining Technical SEO and Local SEO was implemented to capture brand-product intent searches. The campaign focused on granular keyword targeting for distributor-based queries such as DellEMC distributors in Dubai, Juniper distributors in Africa, and Fortinet firewall Dubai.",
      ],
    },
    {
      type: "p",
      text: [
        "Dedicated brand landing pages were optimized to serve as entry points for high-intent searches, while technical comparison blogs strengthened domain authority and captured informational traffic. Google My Business optimization ensured strong local visibility for mobile and “near me” distributor searches in Al Garhoud.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "The SEO strategy delivered sustained growth throughout 2025, strengthening Neo Data’s authority in enterprise IT distribution. The website achieved #1 ranking for “DellEMC distributors in Dubai” and Top 2 positions for high-value terms including “Juniper distributors in Africa” and “Aruba distributors in Africa.” Monthly website users increased from 1,016 in January to 1,449 in December, with a peak of 2,086 users in November 2025. Local visibility improved significantly, with Google My Business impressions rising from 809 to 1,076, and interactions more than doubling from 47 to 115 within the year. Increased visibility translated into consistent business impact, generating an average of 60–70 WhatsApp enquiries per month.",
      ],
    },
    {
      type: "p",
      text: [
        "Through targeted brand-level SEO, localized optimization, and authority-driven content, Neo Data Technologies strengthened its position as a trusted IT hardware distributor across the UAE and Africa. The strategy delivered measurable visibility growth, sustained traffic expansion, and consistent B2B lead generation in a highly competitive technology market.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/neo-data/card.webp",
    small: "/case-studies/neo-data/card-700.webp",
    alt: "neodata - #1 #1 Ranking for keywords",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/neo-data/sheet-full-1200.webp",
    full: "/case-studies/neo-data/sheet-full.webp",
    alt: "Results sheet published for Neo Data Technologies: a one-page summary of the campaign's figures.",
    w: 2000,
    h: 1048,
  },
  source: "https://enhmedia.com/case-studies/neo-data",
};
