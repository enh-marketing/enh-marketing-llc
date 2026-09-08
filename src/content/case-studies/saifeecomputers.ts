// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/saifeecomputers
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
  slug: "saifeecomputers",
  client: "Saifee Computers",
  title: "Accounting Software Sales with an 85% Increase in Enquiries",
  sector: "Technology & IT",
  sectorEvidence: "provider of accounting software solutions and other business management software",
  order: 18,
  metrics: [
    {
      value: "85%",
      label: "Increase in enquiries",
    },
    {
      value: "47%",
      label: "Increase in conversions from Google campaigns over the last 6 months",
    },
    {
      value: "37%",
      label: "Increase in organic traffic year on year over the first 12 months",
    },
    {
      value: "40+",
      label: "keywords ranking in the top 10 on SERPs in the first 12 months",
    },
  ],
  services: [
    {
      key: "web",
      evidence: "The website underwent a transformation, becoming exceptionally user-friendly and optimized to maximize conversion rates.",
    },
    {
      key: "performance",
      evidence: "we launched precisely targeted PPC campaigns across both search and display networks",
    },
    {
      key: "social",
      evidence: "we curated a dynamic social media calendar that facilitated regular engagement",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Saifee Computers is a leading provider of accounting software solutions and other business management software in Dubai, UAE. With over 10 years of experience, Saifee Computers has a proven track record of helping businesses of all sizes manage their finances and operations more effectively.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Saifee Computers is a prominent player in the field of accounting software solutions, offering comprehensive financial management software tailored to businesses of all sizes. Despite having a robust product suite, they faced a challenge in generating online leads and converting website visitors into customers. They had limited online presence, lack of visibility in search engines, and minimal engagement on social media in a highly competitive market with several well-established competitors.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "As part of our comprehensive strategy, we conducted a meticulous website audit that identified areas for enhancement encompassing design, user experience, and content. The website underwent a transformation, becoming exceptionally user-friendly and optimized to maximize conversion rates. Simultaneously, we launched precisely targeted PPC campaigns across both search and display networks, which effectively increased website visibility and drove substantial traffic growth. Additionally, we curated a dynamic social media calendar that facilitated regular engagement with our audience through an array of informative posts, engaging webinars, and compelling customer success stories, further bolstering our online presence, and fostering valuable connections with our community.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "The outcomes of our digital marketing campaign have been nothing short of remarkable, marking a transformative journey for Saifee Computers. Over time, we proudly witnessed a staggering 85% surge in website conversions and inquiries, a triumph that exceeded our initial goals. Alongside this achievement, our persistent SEO efforts propelled our website to new heights, securing top positions in search results for critical industry terms. The combination of these accomplishments not only elevated Saifee Computers but also established it as a well-recognized industry leader, reinforced by increased trust and unshakable credibility.",
      ],
    },
    {
      type: "p",
      text: [
        "To add to this remarkable success, the last 6 months saw a substantial 47% increase in conversions from Google campaigns. This result underlined the effectiveness of our targeted advertising and campaign strategies in driving valuable actions.",
      ],
    },
    {
      type: "p",
      text: [
        "Furthermore, over the initial 12 months, we experienced an impressive 37% year-on-year increase in organic traffic, indicating the growing interest in our offerings and brand. This additional growth in our online audience further solidified our online presence.",
      ],
    },
    {
      type: "p",
      text: [
        "Last but not least, the performance of our SEO strategy resulted in over 40 keywords consistently ranking in the top 10 on Search Engine Results Pages (SERPs) within the first 12 months. This high level of visibility reinforced our standing as a reputable industry leader, emphasizing our role in shaping the digital landscape and fostering trust with our audience.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/saifeecomputers/card.webp",
    small: "/case-studies/saifeecomputers/card-700.webp",
    alt: "saifee computers - 100% Increase in enquiries",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/saifeecomputers/sheet-full-1200.webp",
    full: "/case-studies/saifeecomputers/sheet-full.webp",
    alt: "Results sheet published for Saifee Computers: a one-page summary of the campaign's figures.",
    w: 1376,
    h: 753,
  },
  projectUrl: "https://www.saifeecomputers.com/",
  source: "https://enhmedia.com/case-studies/saifeecomputers",
};
