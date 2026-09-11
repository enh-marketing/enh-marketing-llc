// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/ecosys-integrated-solutions
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
  slug: "ecosys-integrated-solutions",
  title: "Ecosys Integrated Solutions",
  categories: [
    "web-design",
  ],
  order: 21,
  profile: [
    {
      type: "p",
      text: [
        "Ecosys is a team of experienced engineers from diverse disciplines with fresh perspectives, continuous learning and collaborative spirit to deliver efficiency in Advanced waste water, biosolids treatment and nutrient recovery solutions. It’s our comprehensive understanding of equipments and process perspectives that gives us the upper-hand.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/ecosys-integrated-solutions/card.webp",
    small: "/portfolio/ecosys-integrated-solutions/card-700.webp",
    alt: "The card published for Ecosys Integrated Solutions on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  projectUrl: "https://ecosysworld.com/",
  source: "https://enhmedia.com/portfolio/ecosys-integrated-solutions",
};
