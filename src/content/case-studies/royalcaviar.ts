// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/royalcaviar
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
  slug: "royalcaviar",
  client: "Royal Caviar",
  title: "Increase in sales by 132% in the First Six Months",
  sector: "Food & retail",
  sectorEvidence: "HACCP-certified seafood supplier and distributor",
  order: 19,
  metrics: [
    {
      value: "132%",
      label: "Increase in sales in the first 6 months",
    },
    {
      value: "97%",
      label: "Increase in new users from organic traffic over the first 12 months",
    },
    {
      value: "30%",
      label: "Increase in online orders over the first 12 months",
    },
    {
      value: "155%",
      label: "Increase in total online sales over the first 12 months",
    },
  ],
  services: [
    {
      key: "performance",
      evidence: "We implemented a comprehensive Shopping Ads strategy on platforms such as Google and social media channels",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Royal Caviar is a HACCP-certified seafood supplier and distributor that sources and ships a variety of fresh and frozen seafood, including sturgeon caviar, salmon, mackerel, fish roe, and more. Their client list includes five-star hotels, first-class restaurants, and customers across the GCC.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Royal Caviar, a renowned premium caviar supplier in the UAE, approached our digital marketing agency seeking assistance in boosting their sales and enhancing their online presence. Their exquisite products deserved a spotlight, yet they grappled with brand awareness obstacles.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "Our journey with Royal Caviar began with a meticulous process of initial research and analysis. We set out on a mission to fully understand the essence of their brand, its beliefs, and its strengths, which helped us to comprehend both their target market and their unique selling propositions.",
      ],
    },
    {
      type: "p",
      text: [
        "The target market for the customer was divided into several groups, including gourmet chefs, caviar connoisseurs, and high-end event planners. We implemented a ",
        {
          a: "https://enhmedia.com/e-commerce-marketing",
          children: [
            "comprehensive Shopping Ads strategy",
          ],
        },
        " on platforms such as Google and social media channels, focusing on showcasing the premium quality and sustainability of the client's caviar. Dynamic remarketing was employed to remind visitors of the client's website about the products they viewed, encouraging them to return and make a purchase.",
      ],
    },
    {
      type: "p",
      text: [
        "We continuously monitored and analyzed performance data, making adjustments to the ad campaigns based on real-time insights.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "Within the initial six months of our partnership, the client experienced an astounding 132% increase in sales, far exceeding their initial revenue goals. Notably, the growth continued as the client witnessed a substantial 155% increase in total online sales over the first 12 months, accompanied by a 30% surge in online orders.",
      ],
    },
    {
      type: "p",
      text: [
        "The client's website also saw a substantial boost in organic traffic, leading to enhanced visibility and higher search engine rankings. This organic traffic increase resulted in a significant 97% rise in new users visiting the site over the first 12 months, attesting to the growth in their online audience.",
      ],
    },
    {
      type: "p",
      text: [
        "The engaging content and strategic advertising campaigns executed by the client had a profound impact, effectively establishing the client's brand values and unique selling points in the market. This contributed to their impressive success in sales and engagement. Over the course of the first year, there was a notable 230% increase in traffic engagements.",
      ],
    },
    {
      type: "p",
      text: [
        "Perhaps one of the most noteworthy achievements was the client's website ranking for more than 50 keywords in the top 10 on Search Engine Results Pages (SERPs) within the first 12 months. This level of visibility ensured that their website was readily discoverable by their target audience, further solidifying their strong position in the market.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/royalcaviar/card.webp",
    small: "/case-studies/royalcaviar/card-700.webp",
    alt: "royal caviar - 132% Increase in sales",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/royalcaviar/sheet-full-1200.webp",
    full: "/case-studies/royalcaviar/sheet-full.webp",
    alt: "Results sheet published for Royal Caviar: a one-page summary of the campaign's figures.",
    w: 1357,
    h: 745,
  },
  projectUrl: "https://royalcaviaruae.com/",
  source: "https://enhmedia.com/case-studies/royalcaviar",
};
