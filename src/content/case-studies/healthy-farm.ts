// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/healthy-farm
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
  slug: "healthy-farm",
  client: "Healthy Farm Eatery",
  title: "Consistent Sales Growth Driven by High-Quality Lead Generation",
  sector: "Food & retail",
  sectorEvidence: "premium catering and healthy dining brand",
  order: 0,
  metrics: [
    {
      value: "211%",
      label: "Exceptional growth in social media reach within 30 days",
    },
    {
      value: "209%",
      label: "Significant increase in content visibility and impressions",
    },
    {
      value: "80%",
      label: "Strong expansion in Instagram audience reach",
    },
    {
      value: "60+",
      label: "High-quality leads generated driving sales opportunities",
    },
  ],
  services: [
    {
      key: "performance",
      evidence: "We optimized Facebook and Instagram ad campaigns with targeted audience segmentation",
    },
    {
      key: "seo",
      evidence: "A comprehensive SEO strategy was executed, including keyword optimization, landing page improvements, and content enhancements.",
    },
    {
      key: "social",
      evidence: "Reels and video content were prioritized to increase reach and interaction.",
    },
    {
      key: "web",
      evidence: "User journey improvements and content structuring were implemented to support better engagement and conversion actions",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Healthy Farm Eatery is a Dubai-based premium catering and healthy dining brand focused on delivering fresh, wholesome, and high-quality meals. The brand caters to a wide range of needs including corporate catering, events, meal plans, and customized healthy menus, with a strong emphasis on quality ingredients and conscious dining experiences.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Healthy Farm Eatery identified a strong opportunity to further elevate its digital presence and expand its reach within a competitive catering market. With a solid foundation already in place, the focus was on unlocking greater potential through enhanced visibility, improved audience targeting, and more consistent engagement across digital platforms.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "We implemented a ",
        {
          b: [
            "multi-channel digital strategy",
          ],
        },
        " combining paid media, SEO, and social media optimization to drive measurable growth.",
      ],
    },
    {
      type: "h3",
      text: "Paid Campaigns",
    },
    {
      type: "p",
      text: [
        "We optimized Facebook and Instagram ad campaigns with targeted audience segmentation, focusing on high-intent users in the UAE. Creative messaging was aligned with seasonal demand (Ramadan & catering services), resulting in stronger engagement and lead generation.",
      ],
    },
    {
      type: "h3",
      text: "SEO Strategy",
    },
    {
      type: "p",
      text: [
        "A comprehensive SEO strategy was executed, including keyword optimization, landing page improvements, and content enhancements. High-value catering keywords were targeted to improve rankings and visibility in search results.",
      ],
    },
    {
      type: "h3",
      text: "Social Media Optimization",
    },
    {
      type: "p",
      text: [
        "Content strategy was refined to focus on video-driven engagement, consistent posting, and relevant hashtag usage. Reels and video content were prioritized to increase reach and interaction.",
      ],
    },
    {
      type: "h3",
      text: "Website & Conversion Optimization",
    },
    {
      type: "p",
      text: [
        "User journey improvements and content structuring were implemented to support better engagement and conversion actions such as calls and WhatsApp inquiries.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "The integrated digital strategy delivered strong and measurable growth across all key channels. Healthy Farm Eatery experienced a significant improvement in online visibility, audience reach, and overall engagement, strengthening its position in the competitive catering market.",
      ],
    },
    {
      type: "p",
      text: [
        "Our efforts successfully enhanced the brand’s digital presence, attracting a more relevant audience and increasing interaction across social media platforms. The refined content strategy, combined with performance-driven campaigns, helped generate consistent, high-quality leads while improving overall campaign efficiency.",
      ],
    },
    {
      type: "p",
      text: [
        "On the SEO front, the website achieved improved keyword rankings and greater search visibility, enabling the brand to capture high-intent users actively searching for catering services. This contributed to a steady flow of organic traffic and increased opportunities for conversions.",
      ],
    },
    {
      type: "p",
      text: [
        "Additionally, enhancements to the website experience supported better user engagement and encouraged more direct actions such as inquiries and contact requests.",
      ],
    },
    {
      type: "p",
      text: [
        "Overall, the strategy enabled Healthy Farm Eatery to build a stronger digital foundation, drive meaningful customer engagement, and achieve sustainable growth across paid, organic, and social channels.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/healthy-farm/card.webp",
    small: "/case-studies/healthy-farm/card-700.webp",
    alt: "Result card published for Healthy Farm Eatery.",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/healthy-farm/sheet-full-1200.webp",
    full: "/case-studies/healthy-farm/sheet-full.webp",
    alt: "Results sheet published for Healthy Farm Eatery: a one-page summary of the campaign's figures.",
    w: 2000,
    h: 1116,
  },
  source: "https://enhmedia.com/case-studies/healthy-farm",
};
