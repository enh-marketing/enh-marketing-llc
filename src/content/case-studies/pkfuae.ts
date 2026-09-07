// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/pkfuae
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
  slug: "pkfuae",
  client: "PKF UAE",
  title: "Driving Success for PKF with 71% Traffic Surge",
  sector: "Professional services",
  sectorEvidence: "global network of accounting firms offering audit, accounting, tax, and business advisory solutions",
  order: 11,
  metrics: [
    {
      value: "71%",
      label: "Increase in website traffic year on year over the first 12 months",
    },
    {
      value: "90+",
      label: "Keywords ranking in the top 10 on SERPs in the first 12 months",
    },
    {
      value: "53%",
      label: "Increased social media reach across multiple channels over the first 12 months",
    },
    {
      value: "85%",
      label: "Increased local audience reach over the first 12 months",
    },
  ],
  services: [
    {
      key: "seo",
      evidence: "We conducted a thorough SEO audit and implemented on-page and off-page optimizations",
    },
    {
      key: "content",
      evidence: "An engaging content strategy was developed, including blog posts and informative articles",
    },
    {
      key: "performance",
      evidence: "targeted Google Ads campaigns were launched to boost website traffic and generate qualified leads",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "PKF UAE is a member of PKF International, a global network of accounting firms offering audit, accounting, tax, and business advisory solutions. The company has over 165 staff members and serves a wide range of clients. PKF UAE is committed to providing its clients with the highest quality services. The company's team of experienced professionals is dedicated to helping its clients to achieve their business goals.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "With its global headquarters in London, PKF is an established accounting firm well known for its competence in financial and business advice services. In a very competitive market, the UAE division of PKF intended to strengthen its online presence and increase its reach. With their global reputation, they aimed to establish a more significant presence within the UAE market.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "We designed a comprehensive digital marketing strategy to address PKF's unique challenges. We conducted a thorough SEO audit and implemented on-page and off-page optimizations to enhance the website's search engine rankings. An engaging content strategy was developed, including blog posts and informative articles, to showcase PKF's expertise and engage visitors. Comprehensive keyword research was conducted to target relevant industry-specific search terms and targeted Google Ads campaigns were launched to boost website traffic and generate qualified leads.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "PKF experienced a remarkable transformation, and it's evident in its enhanced digital presence. Their SEO strategy bore results, with an impressive tally of over 90 keywords consistently securing top 10 positions on Search Engine Results Pages. This achievement substantially elevated their online visibility, making them a prominent fixture in their industry.",
      ],
    },
    {
      type: "p",
      text: [
        "Throughout the initial 12 months, PKF witnessed a substantial year-on-year increase of 71% in website traffic. This upsurge was instrumental in expanding their reach beyond borders, propelling them to a significant position in the UAE market and beyond. It's not merely an increase in numbers but a testament to the resonance of their services in the online sphere.",
      ],
    },
    {
      type: "p",
      text: [
        "The substantial growth in both keyword rankings and website traffic was a game-changer, solidifying PKF's standing in the highly competitive UAE market. Moreover, it served as a catalyst for substantial business growth. The increased visibility and audience engagement translated into tangible results, further emphasizing the prowess of strategic digital marketing in driving a company's growth trajectory.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/pkfuae/card.webp",
    small: "/case-studies/pkfuae/card-700.webp",
    alt: "pkfuae - 90+ Keywords ranking in the top",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/pkfuae/sheet-full-1200.webp",
    full: "/case-studies/pkfuae/sheet-full.webp",
    alt: "Results sheet published for PKF UAE: a one-page summary of the campaign's figures.",
    w: 1376,
    h: 768,
  },
  projectUrl: "https://pkfuae.com",
  source: "https://enhmedia.com/case-studies/pkfuae",
};
