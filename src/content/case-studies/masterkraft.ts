// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/masterkraft
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
  slug: "masterkraft",
  client: "Masterkraft",
  title: "Driving Digital Growth with a 346% Increase in Website Traffic",
  sector: "Automotive",
  sectorEvidence: "car detailing company",
  order: 9,
  metrics: [
    {
      value: "346%",
      label: "Increase in website traffic over the first 12 months",
    },
    {
      value: "305%",
      label: "Increase in organic traffic over the first 12 months",
    },
    {
      value: "331%",
      label: "Planned and executed on improving UAE-based organic traffic over the last 6 months",
    },
    {
      value: "15+",
      label: "keywords ranking in the top 10 on SERPs in the first 6 months",
    },
  ],
  services: [
    {
      key: "seo",
      evidence: "This approach included comprehensive SEO optimization",
    },
    {
      key: "local",
      evidence: "a focus on local SEO to target the UAE-based audience",
    },
    {
      key: "content",
      evidence: "high-quality, industry-specific content development",
    },
    {
      key: "performance",
      evidence: "We launched targeted Google Ads campaigns that drove traffic to the Masterkraft website and generated qualified leads",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Masterkraft, a prominent car detailing company based in the United Arab Emirates (UAE), offers a comprehensive range of services, including exterior car detailing, car interior deep cleaning, car paint protection, car chrome polish, snow foam car wash, car trim restoration, car headlight restoration, and more. As a leading digital marketing company in the UAE, we've had the privilege of partnering with Masterkraft to amplify their online presence and drive digital success in this competitive industry.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "At the outset of our collaboration with Masterkraft, the company faced several formidable challenges in a highly competitive market. These included low online visibility that hindered their ability to attract a broader customer base, limited organic traffic to their website, and poor keyword rankings that affected their positioning on search engine results pages (SERPs).",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "To overcome these challenges and position Masterkraft as a market leader in the UAE's car detailing industry, we devised a strategic digital marketing approach. This approach included comprehensive SEO optimization, high-quality, industry-specific content development, a focus on local SEO to target the UAE-based audience, and strategic keyword research and implementation. We launched targeted Google Ads campaigns that drove traffic to the Masterkraft website and generated qualified leads, securing the company's foothold in the competitive market.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "Our digital marketing efforts for Masterkraft have yielded impressive results over the past 12 months. These results include a significant 346% increase in overall website traffic, reflecting the successful implementation of our digital marketing strategy. Additionally, we achieved a 305% increase in organic traffic within the first 12 months, enhancing Masterkraft's online visibility. Over the last 6 months, our planned strategy resulted in a remarkable 331% boost in organic traffic from potential customers within the UAE. Furthermore, we successfully secured 15+ keywords in the top 10 positions on SERPs within the first 6 months, ensuring that Masterkraft is now highly visible to anyone seeking car detailing services in the UAE.",
      ],
    },
    {
      type: "p",
      text: [
        "Masterkraft's digital transformation has led to increased brand recognition, a broader customer base, and a dominant online presence within the UAE's car detailing industry. By harnessing the power of digital marketing, we've established Masterkraft as a leading name in their field, enhancing their competitive edge and fostering business growth.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/masterkraft/card.webp",
    small: "/case-studies/masterkraft/card-700.webp",
    alt: "Masterkraft - 346% Increase in website traffic ",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/masterkraft/sheet-full-1200.webp",
    full: "/case-studies/masterkraft/sheet-full.webp",
    alt: "Results sheet published for Masterkraft: a one-page summary of the campaign's figures.",
    w: 1376,
    h: 768,
  },
  projectUrl: "https://masterkraft.ae/",
  source: "https://enhmedia.com/case-studies/masterkraft",
};
