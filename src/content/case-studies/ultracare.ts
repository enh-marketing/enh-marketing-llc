// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/ultracare
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
  slug: "ultracare",
  client: "Ultracare",
  title: "Elevating Engagement - A 371% Boost in Website Interactions",
  sector: "Industrial & trade supply",
  sectorEvidence: "tissue paper manufacturing company",
  order: 10,
  metrics: [
    {
      value: "25%",
      label: "Increase in website traffic year on year over the first 12 months",
    },
    {
      value: "76%",
      label: "Increase in new users from organic traffic over the first 12 months",
    },
    {
      value: "126%",
      label: "Increase in the total number of incoming inquiries",
    },
    {
      value: "371%",
      label: "Increase in traffic engagements over the first 12 months",
    },
  ],
  services: [
    {
      key: "seo",
      evidence: "We delved deep into SEO, meticulously crafting and refining every aspect",
    },
    {
      key: "content",
      evidence: "we developed a captivating content strategy, featuring blog posts and informative articles",
    },
    {
      key: "web",
      evidence: "enhancing the website's design and user experience, thereby increasing incoming inquiries",
    },
    {
      key: "performance",
      evidence: "We launched targeted Google Ads campaigns that drove traffic to the Ultracare website",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Ultracare is a tissue paper manufacturing company in Dubai that produces a wide range of products for both retail and institutional clients. The company is committed to sustainability and uses recycled materials to make its products. Ultracare's clients include hotels, restaurants, airlines, and schools.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Ultracare is a prominent provider of hygiene solutions in the UAE, specializing in state-of-the-art products and services for both businesses and individuals. While their commitment to hygiene excellence was unwavering, they faced the challenge of limited online visibility. Ultracare sought to leverage the power of digital marketing to expand its reach and enhance its presence in the competitive UAE market. The company sought to boost incoming inquiries to drive business growth.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "We delved deep into SEO, meticulously crafting and refining every aspect to ensure Ultracare's website ranked high on search engines, making it more accessible to potential clients. Crafting an engaging narrative, we developed a captivating content strategy, featuring blog posts and informative articles, showcasing Ultracare's expertise in the realm of hygiene solutions.",
      ],
    },
    {
      type: "p",
      text: [
        "To convert visitors into clients, we worked on our Conversion Rate Optimization, enhancing the website's design and user experience, thereby increasing incoming inquiries. We launched targeted Google Ads campaigns that drove traffic to the Ultracare website and generated qualified leads, securing the company's foothold in the competitive market.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "Ultracare experienced a notable 25% increase in website traffic year-on-year over the first 12 months, expanding its online reach and visibility. The number of new users originating from organic traffic sources also surged by an impressive 76%, signifying a significant improvement in conversion rates. Our efforts resulted in a remarkable 126% increase in incoming inquiries, reflecting substantial business growth.",
      ],
    },
    {
      type: "p",
      text: [
        "Overall website engagements skyrocketed by 371%, indicating that visitors were actively exploring Ultracare's products and services. The SEO strategies led to 20+ relevant keywords ranking in the top 10 on Search Engine Results Pages within the first 6 months, solidifying Ultracare's online presence and visibility.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/ultracare/card.webp",
    small: "/case-studies/ultracare/card-700.webp",
    alt: "ultracare - 371% Increase in traffic engagements",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/ultracare/sheet-full-1200.webp",
    full: "/case-studies/ultracare/sheet-full.webp",
    alt: "Results sheet published for Ultracare: a one-page summary of the campaign's figures.",
    w: 2000,
    h: 1116,
  },
  source: "https://enhmedia.com/case-studies/ultracare",
};
