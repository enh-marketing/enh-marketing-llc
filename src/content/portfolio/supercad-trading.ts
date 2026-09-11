// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/supercad-trading
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
  slug: "supercad-trading",
  title: "Supercad Trading",
  categories: [
    "web-design",
  ],
  order: 33,
  profile: [
    {
      type: "p",
      text: [
        "Supercad Trading LLC is your go-to IT consultancy firm in the UAE, offering cutting-edge IT, consulting, and trading solutions. With over 20 years of experience, Supercad is a trusted partner for businesses of all sizes, helping them to achieve their business goals through innovative IT solutions.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/supercad-trading/card.webp",
    small: "/portfolio/supercad-trading/card-700.webp",
    alt: "The card published for Supercad Trading on the ENH portfolio.",
    w: 1400,
    h: 965,
  },
  projectUrl: "https://www.supercadonline.com/",
  caseStudy: "supercad",
  source: "https://enhmedia.com/portfolio/supercad-trading",
};
