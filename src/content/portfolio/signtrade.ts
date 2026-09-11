// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/signtrade
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
  slug: "signtrade",
  title: "Signtrade",
  categories: [
    "video-production",
  ],
  order: 16,
  profile: [
    {
      type: "p",
      text: [
        "For more than three decades, Signtrade has solidified its position as a dominant force within the signage, graphics, and textile industry. The company is renowned for delivering innovative, dependable solutions and offering unparalleled customer service through an expansive network spanning the Middle East, Africa, and South Asia. Signtrade's unique integrative workflow approach ensures a comprehensive one-stop experience for its clientele, distinguishing the company as a paragon of excellence and reliability in the hearts of its valued customers. Signtrade's enduring legacy continues to shape the industry and inspire trust among its diverse and satisfied customer base.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/signtrade/card.webp",
    small: "/portfolio/signtrade/card-700.webp",
    alt: "The card published for Signtrade on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  film: {
    provider: "vimeo",
    id: "877058639",
    title: "Signtrade",
  },
  source: "https://enhmedia.com/portfolio/signtrade",
};
