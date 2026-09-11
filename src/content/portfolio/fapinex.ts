// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/fapinex
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
  slug: "fapinex",
  title: "Fapinex",
  categories: [
    "web-design",
  ],
  order: 23,
  profile: [
    {
      type: "p",
      text: [
        "Fapinex, a leading facade engineering company, recognized the need to enhance its online presence and create a platform that would cater to the technical demands of its B2B clientele. They aimed to detail their extensive product categories and individual product lines, including comprehensive technical specifications while providing an engaging and interactive online experience.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/fapinex/card.webp",
    small: "/portfolio/fapinex/card-700.webp",
    alt: "The card published for Fapinex on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  projectUrl: "https://fapinex.com/",
  source: "https://enhmedia.com/portfolio/fapinex",
};
