// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/masterkraft
//
// The title is that page's <h1> and the profile is its COMPANY PROFILE rich
// text, converted block for block. Nothing is reworded, summarised, shortened
// or added. A portfolio entry publishes no figures, so none appear here: the
// numbers for this client, where there are any, live in the case study.
//
// WHAT IS NOT THE SOURCE'S OWN: the alt text on every picture, because the
// source publishes none, and the category labels, because those are the live
// index's tab names. See scripts/migrate-portfolio/meta.py. `categories` is
// read from the index's tab panes rather than assigned.
//
// Generated. To re-migrate, re-run the converter rather than editing by hand.

import type { Project } from "@/content/portfolio";

export const project: Project = {
  slug: "masterkraft",
  title: "Masterkraft",
  categories: [
    "web-design",
  ],
  order: 27,
  profile: [
    {
      type: "p",
      text: [
        "Masterkraft, a prominent car detailing company based in the United Arab Emirates (UAE), offers a comprehensive range of services, including exterior car detailing, car interior deep cleaning, car paint protection, car chrome polish, snow foam car wash, car trim restoration, car headlight restoration, and more. As a leading digital marketing company in the UAE, we've had the privilege of partnering with Masterkraft to amplify their online presence and drive digital success in this competitive industry.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/masterkraft/card.webp",
    small: "/portfolio/masterkraft/card-700.webp",
    alt: "The card published for Masterkraft on the ENH portfolio.",
    w: 1400,
    h: 964,
  },
  projectUrl: "https://masterkraft.ae/",
  caseStudy: "masterkraft",
  source: "https://enhmedia.com/portfolio/masterkraft",
};
