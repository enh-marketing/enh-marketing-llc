// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/topshelf
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
  slug: "topshelf",
  client: "Top Shelf Technical Services",
  title: "Boosting Organic Traffic by 245% in 12 months",
  sector: "Industrial & trade supply",
  sectorEvidence: "provider of storage solutions for businesses in the UAE",
  order: 16,
  metrics: [
    {
      value: "245%",
      label: "Increase in organic traffic year on year over the first 12 months",
    },
    {
      value: "424%",
      label: "Increase in new users from organic traffic over the first 12 months",
    },
    {
      value: "194%",
      label: "Increase in traffic of UAE visitors to tap the local market over the first 12 months",
    },
    {
      value: "391%",
      label: "Increase in traffic engagements over the first 12 months",
    },
  ],
  services: [
    {
      key: "seo",
      evidence: "We initiated a holistic SEO strategy, including technical improvements and content optimization",
    },
    {
      key: "local",
      evidence: "We employed local SEO strategies, including Google My Business optimization, location-based keywords, and local directories",
    },
    {
      key: "content",
      evidence: "A consistent and informative blog was created to attract organic traffic",
    },
    {
      key: "performance",
      evidence: "initiating targeted Google Ads campaigns to increase website traffic and attract potential customers",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Top Shelf Technical Services is a leading provider of storage solutions for businesses in the UAE. With over 10 years of experience, they have a proven track record of helping businesses of all sizes to improve their storage efficiency and organization. They offer a wide range of solutions and are committed to providing its customers with excellent customer service and satisfaction.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "TopShelf is a premier supplier of racking and shelving solutions in the UAE. They offer a wide range of shelves and racks to businesses, including retail stores, warehouses, and logistics companies. TopShelf faced the difficulty of having little internet presence despite having good product offerings, which made it difficult for them to reach the local market. They recognized the importance of leveraging digital marketing to expand their reach.",
      ],
    },
    {
      type: "p",
      text: [
        "TopShelf aimed to attract and engage new users from organic traffic, particularly those seeking racking and shelving solutions. The goal was to boost website engagement and encourage interactions with their products and services.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "We initiated a holistic SEO strategy, including technical improvements and content optimization, to increase organic traffic and keyword rankings. A consistent and informative blog was created to attract organic traffic and demonstrate TopShelf's expertise in racking and shelving solutions. We employed local SEO strategies, including Google My Business optimization, location-based keywords, and local directories, to tap into the UAE market. Along with initiating targeted Google Ads campaigns to increase website traffic and attract potential customers, we worked on optimizing the website to improve the user experience and increase lead generation and inquiries.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "In the span of the first 12 months, TopShelf celebrated a remarkable achievement with a staggering 245% surge in organic traffic, a clear testament to the resounding success of our carefully crafted SEO strategy. This impressive growth marked a pivotal milestone in our partnership.",
      ],
    },
    {
      type: "p",
      text: [
        "Our concerted efforts in focused content creation and unwavering SEO endeavors yielded exceptional results, as TopShelf experienced an astonishing 424% increase in new users from organic traffic within the inaugural year. This significant uptick reflected the triumphant impact of our strategic approach.",
      ],
    },
    {
      type: "p",
      text: [
        "By strategically targeting the local market, the client achieved a substantial 194% increase in traffic from visitors based in the UAE. This outcome not only emphasized the efficacy of our localized strategies but also underscored TopShelf's growing influence within its regional audience. The overarching success was further evident in the skyrocketing of overall website engagements, which saw a remarkable 391% increase. This uptick indicated that visitors were not merely browsing but actively exploring the diverse product offerings, a sign of heightened interest and a deepened connection with the brand.",
      ],
    },
    {
      type: "p",
      text: [
        "In terms of SEO, our combined efforts led to more than 35 relevant keywords consistently ranking in the top 10 on Search Engine Results Pages (SERPs). This impressive achievement significantly solidified TopShelf's online presence and visibility within its niche, ensuring that the brand was prominently displayed to its target audience.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/topshelf/card.webp",
    small: "/case-studies/topshelf/card-700.webp",
    alt: "topshelf - 245% Increase in organic traffic",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/topshelf/sheet-full-1200.webp",
    full: "/case-studies/topshelf/sheet-full.webp",
    alt: "Results sheet published for Top Shelf Technical Services: a one-page summary of the campaign's figures.",
    w: 2000,
    h: 1116,
  },
  source: "https://enhmedia.com/case-studies/topshelf",
};
