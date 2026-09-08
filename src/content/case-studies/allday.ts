// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/allday
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
  slug: "allday",
  client: "AllDay Supermarket",
  title: "Incredible 64x Increase in Social Media Impressions for AllDay Supermarket",
  sector: "Food & retail",
  sectorEvidence: "well-established retail chain",
  order: 13,
  metrics: [
    {
      value: "18,914",
      label: "The total number of app installs generated",
    },
    {
      value: "64x",
      label: "More impressions on social media over the first 12 months",
    },
    {
      value: "14x",
      label: "More impressions in the following 12 months through campaign optimization",
    },
    {
      value: "",
      label: "",
    },
  ],
  services: [
    {
      key: "performance",
      evidence: "We ran targeted mobile app install campaigns, using a combination of search and display ads",
    },
    {
      key: "social",
      evidence: "We also leveraged Ecommerce social media advertising, focusing on platforms such as Facebook and Instagram",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "AllDay is a well-established retail chain with multiple locations across the UAE. They are dedicated to providing an extensive range of products and services that cater to the diverse needs of our valued customers. Their commitment to quality, convenience, and exceptional customer service sets them apart, making them a go-to destination for shoppers seeking both everyday essentials and special finds.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "AllDay is a well-established retail chain with multiple locations across the UAE. As a trusted destination for groceries and household essentials, they recognized the need to boost their online presence and reach a wider audience. AllDay Supermarket engaged our services to help them achieve goals and drive results.",
      ],
    },
    {
      type: "p",
      text: [
        "The store had a limited online presence at the time, therefore it was necessary to increase it if they wanted to continue competing in the UAE market. One of their major priorities was to increase client involvement on their digital platforms, including their mobile app and social media.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "Our team devised a multifaceted digital marketing strategy to address these challenges. We ran targeted mobile app install campaigns, using a combination of search and display ads to encourage users to download the allday app. We also leveraged ",
        {
          a: "https://enhmedia.com/e-commerce-marketing",
          children: [
            "Ecommerce social media advertising",
          ],
        },
        ", focusing on platforms such as Facebook and Instagram, to increase impressions and engagement by creating visually appealing ad creatives to promote the supermarket's products and deals.",
      ],
    },
    {
      type: "p",
      text: [
        "After the initial success, we continued to optimize the social media campaigns, improving targeting, ad placement, and ad copy to achieve even more impressions in the following year. For social media page Like campaigns, we also implemented cost optimization techniques to reduce the cost while maintaining a steady flow of new followers.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "The collaborative efforts between AllDay supermarket and ENH produced remarkable results. Our mobile app campaigns delivered astounding results, yielding an impressive total of 18,914 app installs. This achievement not only translated into a burgeoning mobile audience but also fortified the supermarket's ability to engage with a broader spectrum of users on the go.",
      ],
    },
    {
      type: "p",
      text: [
        "Over the inaugural 12 months, the social media campaigns orchestrated an unprecedented feat, achieving a remarkable 64-fold increase in impressions. This surge in visibility significantly broadened AllDay Supermarket's online reach, marking a pivotal step in its digital evolution.",
      ],
    },
    {
      type: "p",
      text: [
        "Through diligent and ongoing optimization, we continued to propel their social media campaigns to greater heights. In the subsequent 12 months, we achieved an additional 14-fold increase in impressions. This ensured a sustained and impressive expansion of their online visibility, firmly establishing them as a prominent player in the digital landscape.",
      ],
    },
    {
      type: "p",
      text: [
        "Our relentless pursuit of cost-efficiency bore fruit as well. Through meticulous cost-optimization strategies, we managed to dramatically reduce the expenses associated with page Like campaigns.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/allday/card.webp",
    small: "/case-studies/allday/card-700.webp",
    alt: "Result card published for AllDay Supermarket.",
    w: 1400,
    h: 980,
  },
  source: "https://enhmedia.com/case-studies/allday",
};
