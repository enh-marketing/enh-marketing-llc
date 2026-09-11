// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/glass-world
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
  slug: "glass-world",
  title: "Glass World",
  categories: [
    "web-design",
  ],
  order: 24,
  profile: [
    {
      type: "p",
      text: [
        "Glass World Industries is a renowned independent glass company in the UAE. We provide comprehensive services, including nationwide supply, complete design, project management, and installation solutions. Founded in September 2000, the company has expanded to deliver the highest quality products, craftsmanship, and finishes at competitive rates. We achieve this by harnessing the latest technology to consistently deliver exceptional quality to our clients.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/glass-world/card.webp",
    small: "/portfolio/glass-world/card-700.webp",
    alt: "The card published for Glass World on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  projectUrl: "https://glassworld.ae/",
  source: "https://enhmedia.com/portfolio/glass-world",
};
