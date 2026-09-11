// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/quadbikeindubai
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
  slug: "quadbikeindubai",
  title: "Quadbikeindubai",
  categories: [
    "web-design",
  ],
  order: 31,
  profile: [
    {
      type: "p",
      text: [
        "Big Red stands as a premier ATV rental provider in Dubai, offering top-quality ATVs suitable for both adults and children. Quad biking, an exhilarating desert activity, is a must-try for those seeking adventure amidst Dubai's striking dunes. With Big Red, anyone can embark on adventurers across undulating dunes, guided by experts. They offer quad biking on 400 cc bikes for adults and 200 cc bikes for kids, ensuring safety and excitement in equal measure.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/quadbikeindubai/card.webp",
    small: "/portfolio/quadbikeindubai/card-700.webp",
    alt: "The card published for Quadbikeindubai on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  projectUrl: "https://www.quadbikeindubai.com/",
  source: "https://enhmedia.com/portfolio/quadbikeindubai",
};
