// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/autobahn
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
  slug: "autobahn",
  client: "Autobahn Car Rental",
  title: "Accelerating Success with a 155% Growth in Website Traffic",
  sector: "Automotive",
  sectorEvidence: "car rental company",
  order: 12,
  metrics: [
    {
      value: "155%",
      label: "Increase in website traffic year on year over the first 12 months",
    },
    {
      value: "1070",
      label: "Total number of organic conversions over the last 6 months",
    },
    {
      value: "22%",
      label: "Planned and executed on improving UAE-based organic traffic over the last 6 months",
    },
    {
      value: "260",
      label: "Total number of organic call inquiries over the last 6 months",
    },
  ],
  services: [
    {
      key: "seo",
      evidence: "implemented on-page and off-page SEO enhancements to improve the website's search engine rankings",
    },
    {
      key: "content",
      evidence: "A content strategy was developed, including blog posts and landing pages",
    },
    {
      key: "local",
      evidence: "We also employed local SEO strategies, including Google My Business optimization",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Autobahn Car Rental is a prominent car rental company in the UAE with service centers strategically located throughout the country. The company has a fleet of over 10,000 vehicles, including cars, SUVs, commercial vehicles, and refrigerated vehicles to meet the needs of every type of customer, including leasing services.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Autobahn is a prominent car rental company in the UAE with service centers strategically located throughout the country. Despite their physical presence, they recognized the need to boost their digital footprint and leverage online channels to attract more customers. To achieve this, they partnered with us to revamp their online presence and drive tangible results.",
      ],
    },
    {
      type: "p",
      text: [
        "The company's online presence was relatively limited, making it challenging to stand out in a competitive car rental market. Autobahn wanted to convert more website visitors into customers, with a particular focus on increasing organic conversions and call inquiries.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "We formulated a comprehensive digital marketing strategy to address Autobahn's challenges. Our team performed an extensive audit and implemented on-page and off-page SEO enhancements to improve the website's search engine rankings. A content strategy was developed, including blog posts and landing pages, to engage visitors and enhance their website's authority and relevance.",
      ],
    },
    {
      type: "p",
      text: [
        "We also employed local SEO strategies, including Google My Business optimization, location-based keywords, and local directories, to attract more local traffic. Extensive keyword research and optimization efforts were conducted to target relevant search terms in the car rental industry.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "The collaborative efforts produced significant results. Autobahn experienced a remarkable 155% increase in website traffic year on year over the first 12 months, significantly expanding its online reach. Over the last 6 months, Autobahn achieved a total of 1070 organic conversions, signifying a substantial improvement in their ability to turn web visitors into customers.",
      ],
    },
    {
      type: "p",
      text: [
        "Our strategy successfully increased the number of UAE-based organic visitors by 22% over the last 6 months, driving growth in the local market, and also resulting in 260 organic call inquiries over the last 6 months, showcasing a boost in customer engagement. The SEO strategies led to 32+ relevant keywords ranking in the top 10 on SERPs within the first 12 months, strengthening Autobahn's online presence and visibility.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/autobahn/card.webp",
    small: "/case-studies/autobahn/card-700.webp",
    alt: "Autobahn - 155% Increase in website traffic",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/autobahn/sheet-full-1200.webp",
    full: "/case-studies/autobahn/sheet-full.webp",
    alt: "Results sheet published for Autobahn Car Rental: a one-page summary of the campaign's figures.",
    w: 1376,
    h: 768,
  },
  projectUrl: "https://autobahnuae.com",
  source: "https://enhmedia.com/case-studies/autobahn",
};
