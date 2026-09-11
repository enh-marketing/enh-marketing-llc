// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/axcl-lubes
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
  slug: "axcl-lubes",
  title: "AXCL Lubes",
  categories: [
    "web-design",
  ],
  order: 20,
  profile: [
    {
      type: "p",
      text: [
        "AXCL LUBE is a lubricants manufacturer founded 28 years ago in the UAE. It has grown rapidly and is now one of the UAE's fastest-growing oil companies. AXCL LUBE produces a wide range of automotive and industrial lubricants and exports its products to over 45 countries. The company is ISO 9001:2015 certified and its products are approved by major auto manufacturers.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/axcl-lubes/card.webp",
    small: "/portfolio/axcl-lubes/card-700.webp",
    alt: "The card published for AXCL Lubes on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  projectUrl: "https://shop.axcllubes.com/",
  source: "https://enhmedia.com/portfolio/axcl-lubes",
};
