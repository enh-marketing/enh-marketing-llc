// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/venesta
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
  slug: "venesta",
  client: "Venesta",
  title: "New Market Expansion for a Washroom Solutions Provider",
  sector: "Industrial & trade supply",
  sectorEvidence: "commercial washroom solutions",
  order: 21,
  metrics: [
    {
      value: "174%",
      label: "Increase in organic traffic year-on-year over the first 12 months",
    },
    {
      value: "101%",
      label: "Crease in new users from organic traffic over the first 12 months",
    },
    {
      value: "61%",
      label: "Increase in enquiries",
    },
    {
      value: "235%",
      label: "Increase in traffic engagements over the first 12 months",
    },
  ],
  services: [
    {
      key: "performance",
      evidence: "we executed extensive campaigns on various platforms such as Google, Facebook, Instagram, and LinkedIn",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Venesta, with its parent company in the UK, lives and breathes to give your washrooms an aesthetic yet functional twist. They have toilet cubicles and washroom systems that combine cutting-edge innovation with superb performance and aesthetics, with solutions to satisfy the most demanding brief. This prominent company providing commercial washroom solutions that started in the UK years ago faced several challenges.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Venesta, a prominent company providing commercial washroom solutions that started in the UK years ago, faced several challenges. The client aimed to establish a foothold in the GCC market, but they lacked the necessary connections and exposure. The primary hurdle lay in connecting with a diverse audience, including interior fit-out companies, consultants, and architects spread across the region. Building these crucial relationships and effectively conveying the value of their offerings demanded a targeted approach that addressed the specific needs and preferences of their potential clients in the GCC market.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "Working closely alongside Venesta's in-house teams, we centered our digital strategy on Google and Facebook as primary lead sources. Employing a technology-focused approach, we executed extensive campaigns on various platforms such as Google, Facebook, Instagram, and LinkedIn, enabling us to engage a worldwide audience in diverse languages. This was achieved while efficiently overseeing substantial advertising budgets and presenting outcomes through tailor-made Google Data Studio reports. This strategic method facilitated successful connections with interior fit-out firms, consultants, and architects throughout the GCC region, contributing significantly to Venesta's market expansion and the promotion of its digital solutions.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "Throughout our engagement, the client experienced a remarkable 61% increase in enquiries from interior fit-out companies, consultants, and architects across the GCC region. Moreover, Venesta's website saw a substantial increase in organic and referral traffic from the GCC region, with organic traffic alone surging by a staggering 174% over the first 12 months.",
      ],
    },
    {
      type: "p",
      text: [
        "In addition to this, there was an impressive 101% increase in new users from organic traffic during the same period, demonstrating the substantial growth in their online audience. The client also achieved a remarkable 235% rise in traffic engagements over the course of the first year, a testament to the effectiveness of their digital strategies.",
      ],
    },
    {
      type: "p",
      text: [
        "Furthermore, the client's Google campaigns led to an 85% increase in conversions over the initial 6 months, showcasing the success of their targeted advertising efforts. This substantial increase in conversions directly contributed to the client's growth in inquiries and brand visibility.",
      ],
    },
    {
      type: "p",
      text: [
        "Perhaps one of the most remarkable achievements was the client's website ranking on over 50 keywords in the top 10 on Search Engine Results Pages (SERPs) within the first 12 months. This level of visibility ensured that their website was easily discoverable by their target audience, solidifying their strong position in the GCC interior fit-out industry.",
      ],
    },
    {
      type: "p",
      text: [
        "Through strategic networking and targeted outreach, the client successfully established valuable connections and partnerships with key players keeping them on the path of steady growth, reaping the rewards of their newfound brand awareness, precise audience targeting, strong positioning, undeniable visibility, and impressive online performance metrics.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/venesta/card.webp",
    small: "/case-studies/venesta/card-700.webp",
    alt: "Venesta - 174% Increase in organic traffic",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/venesta/sheet-full-1200.webp",
    full: "/case-studies/venesta/sheet-full.webp",
    alt: "Results sheet published for Venesta: a one-page summary of the campaign's figures.",
    w: 2000,
    h: 1116,
  },
  source: "https://enhmedia.com/case-studies/venesta",
};
