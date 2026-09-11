// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/kaishan
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
  slug: "kaishan",
  title: "Kaishan",
  categories: [
    "web-design",
  ],
  order: 25,
  profile: [
    {
      type: "p",
      text: [
        "Kaishan is a leading manufacturer of industrial machinery, such as air compressors. They have been in business for over 60 years and are one of the world’s largest manufacturers of compressed air equipment. Kaishan is committed to sustainability and makes energy-efficient products. They also offer a lifetime warranty on some of their products.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/kaishan/card.webp",
    small: "/portfolio/kaishan/card-700.webp",
    alt: "The card published for Kaishan on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  projectUrl: "https://kaishanmea.com/",
  source: "https://enhmedia.com/portfolio/kaishan",
};
