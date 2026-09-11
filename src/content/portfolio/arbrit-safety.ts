// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/arbrit-safety
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
  slug: "arbrit-safety",
  title: "Arbrit Safety",
  categories: [
    "web-design",
  ],
  order: 19,
  profile: [
    {
      type: "p",
      text: [
        "Arbrit Safety is a health and safety training company that provides training in the UAE. The company offers a variety of courses, including first aid, fire safety, and construction safety with experienced and qualified trainers. For years they have trained and continue to educate professionals so they can handle any emergency situation.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/arbrit-safety/card.webp",
    small: "/portfolio/arbrit-safety/card-700.webp",
    alt: "The card published for Arbrit Safety on the ENH portfolio.",
    w: 1400,
    h: 933,
  },
  siteShot: {
    src: "/portfolio/arbrit-safety/site.webp",
    small: "/portfolio/arbrit-safety/site-800.webp",
    alt: "A screenshot of the Arbrit Safety website.",
    w: 1019,
    h: 541,
  },
  caseStudy: "arbritsafety",
  source: "https://enhmedia.com/portfolio/arbrit-safety",
};
