// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/matrixfinishes
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
  slug: "matrixfinishes",
  title: "Matrixfinishes",
  categories: [
    "web-design",
  ],
  order: 28,
  profile: [
    {
      type: "p",
      text: [
        "Matrix Finishes is a UAE-based company that supplies graphic display products and interior finishes. They offer a wide range of custom solutions and in-house manufacturing. Matrix Finishes is a well-known company that supports retail customers and trading partners.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/matrixfinishes/card.webp",
    small: "/portfolio/matrixfinishes/card-700.webp",
    alt: "The card published for Matrixfinishes on the ENH portfolio.",
    w: 1400,
    h: 964,
  },
  projectUrl: "https://matrixfinishes.com/",
  source: "https://enhmedia.com/portfolio/matrixfinishes",
};
