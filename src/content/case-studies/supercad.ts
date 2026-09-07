// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/supercad
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
  slug: "supercad",
  client: "Supercad Trading",
  title: "Revamping IT Solutions with a 128% Increase in Organic Traffic",
  sector: "Technology & IT",
  sectorEvidence: "IT consultancy firm in the UAE",
  order: 15,
  metrics: [
    {
      value: "128%",
      label: "Increase in organic traffic year on year over the first 12 months",
    },
    {
      value: "39%",
      label: "Increase in traffic of UAE visitors to tap the local market over the first 12 months",
    },
    {
      value: "47%",
      label: "Increase in new users from organic traffic over the first 12 months",
    },
    {
      value: "20",
      label: "Keywords ranking in the top 10 on SERPs in the first 4 months",
    },
  ],
  services: [
    {
      key: "seo",
      evidence: "We conducted an in-depth SEO analysis to identify areas of improvement on the client's website and devised a robust SEO strategy.",
    },
    {
      key: "content",
      evidence: "we developed content that was localized and relevant to the region",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Supercad Trading LLC is your go-to IT consultancy firm in the UAE, offering cutting-edge IT, consulting, and trading solutions. With over 20 years of experience, Supercad is a trusted partner for businesses of all sizes, helping them to achieve their business goals through innovative IT solutions.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Supercad Trading, a leading company providing IT structure management solutions, faced the challenge of limited online visibility and exposure to the UAE market. Despite offering cutting-edge IT solutions, their online presence was not adequately tapping into the local audience in the UAE.",
      ],
    },
    {
      type: "p",
      text: [
        "The client's website struggled to attract organic traffic, which hindered its potential for growth. The client aimed to expand their user base from organic traffic, particularly targeting local businesses in the UAE.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "We conducted an in-depth SEO analysis to identify areas of improvement on the client's website and devised a robust SEO strategy. To tap into the UAE market, we developed content that was localized and relevant to the region. We launched targeted SEO campaigns to optimize the client's online presence for organic search traffic. Additionally, we also focused on acquiring local backlinks from UAE-based websites and directories, increasing the client's local authority.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "Over the course of the initial 12 months, our client experienced a truly impressive 128% surge in organic traffic, marking a resounding validation of the effectiveness of our SEO strategy. Our concerted efforts to establish a stronger foothold in the UAE market yielded fruitful results, with a substantial 39% increase in website visitors hailing from the region. Simultaneously, the client also observed a noteworthy uptick in new users acquired through organic traffic. This reaffirmed the potency of our tailored content and localized SEO endeavors.",
      ],
    },
    {
      type: "p",
      text: [
        "Notably, in a mere four months, we managed to make significant strides in enhancing the client's keyword rankings. Over 20 keywords rapidly ascended to the top 10 positions on Search Engine Results Pages, further underscoring our SEO expertise and swift impact on their online visibility.",
      ],
    },
    {
      type: "p",
      text: [
        "The remarkable increases in organic traffic, the acquisition of new users, and the enhanced keyword rankings collectively underscore the resounding success of our comprehensive SEO strategy and our localized content creation. This case study serves as a shining testament to the potent effects of targeted digital marketing in rejuvenating a company's online presence and driving substantial growth within a relatively short time frame.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/supercad/card.webp",
    small: "/case-studies/supercad/card-700.webp",
    alt: "supercad - 128% Increase in organic traffic",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/supercad/sheet-full-1200.webp",
    full: "/case-studies/supercad/sheet-full.webp",
    alt: "Results sheet published for Supercad Trading: a one-page summary of the campaign's figures.",
    w: 2000,
    h: 954,
  },
  projectUrl: "https://www.supercadonline.com",
  source: "https://enhmedia.com/case-studies/supercad",
};
