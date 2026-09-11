// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/fabcon
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
  slug: "fabcon",
  title: "Fabcon",
  categories: [
    "video-production",
  ],
  order: 11,
  profile: [
    {
      type: "p",
      text: [
        "FABCON is a globally renowned steel fabrication expert who excels in engineering, fabrication, and construction services. With a skilled and experienced workforce, coupled with expansive, state-of-the-art workshops and fabrication yards, their mission is to be an indispensable partner in their clients' success stories. FABCON's expertise caters to diverse industries, including oil & gas, chemical & petrochemical, power, cement, and metal sectors. Holding ISO 9001 accreditation, FABCON has made significant contributions to numerous large-scale engineering projects throughout the GCC, with a notable presence in the UAE.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/fabcon/card.webp",
    small: "/portfolio/fabcon/card-700.webp",
    alt: "The card published for Fabcon on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  film: {
    provider: "vimeo",
    id: "830104677",
    title: "Fabcon",
  },
  source: "https://enhmedia.com/portfolio/fabcon",
};
