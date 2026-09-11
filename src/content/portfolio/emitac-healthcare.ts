// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/emitac-healthcare
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
  slug: "emitac-healthcare",
  title: "Emitac Healthcare",
  categories: [
    "web-design",
  ],
  order: 22,
  profile: [
    {
      type: "p",
      text: [
        "Emitac, a locally-owned entity within a renowned UAE conglomerate, has proudly served its clientele since 1978. As an independent, privately-owned firm, Emitac places a strong emphasis on cultivating enduring customer relationships. This dedication extends to both its loyal client base and its globally acclaimed partners, prominent leaders within the healthcare industry. Collaborating closely with these esteemed partners has been instrumental in Emitac's remarkable growth and enduring success throughout the years.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/emitac-healthcare/card.webp",
    small: "/portfolio/emitac-healthcare/card-700.webp",
    alt: "The card published for Emitac Healthcare on the ENH portfolio.",
    w: 1400,
    h: 933,
  },
  siteShot: {
    src: "/portfolio/emitac-healthcare/site.webp",
    small: "/portfolio/emitac-healthcare/site-800.webp",
    alt: "A screenshot of the Emitac Healthcare website.",
    w: 1019,
    h: 541,
  },
  source: "https://enhmedia.com/portfolio/emitac-healthcare",
};
