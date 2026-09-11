// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/royal-caviar
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
  slug: "royal-caviar",
  title: "Royal Caviar",
  categories: [
    "digital-marketing",
    "web-design",
  ],
  order: 6,
  profile: [
    {
      type: "p",
      text: [
        "Royal Caviar is a HACCP-certified seafood supplier and distributor that sources and ships a variety of fresh and frozen seafood, including sturgeon caviar, salmon, mackerel, fish roe, and more. Their client list includes five-star hotels, first-class restaurants, and customers across the GCC.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/royal-caviar/card.webp",
    small: "/portfolio/royal-caviar/card-700.webp",
    alt: "The card published for Royal Caviar on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  gallery: [
    {
      src: "/portfolio/royal-caviar/work-1.webp",
      small: "/portfolio/royal-caviar/work-1-540.webp",
      alt: "Published work from the Royal Caviar project, 1 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/royal-caviar/work-2.webp",
      small: "/portfolio/royal-caviar/work-2-540.webp",
      alt: "Published work from the Royal Caviar project, 2 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/royal-caviar/work-3.webp",
      small: "/portfolio/royal-caviar/work-3-540.webp",
      alt: "Published work from the Royal Caviar project, 3 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/royal-caviar/work-4.webp",
      small: "/portfolio/royal-caviar/work-4-540.webp",
      alt: "Published work from the Royal Caviar project, 4 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/royal-caviar/work-5.webp",
      alt: "Published work from the Royal Caviar project, 5 of 5.",
      w: 219,
      h: 219,
    },
  ],
  projectUrl: "https://royalcaviaruae.com/",
  caseStudy: "royalcaviar",
  source: "https://enhmedia.com/portfolio/royal-caviar",
};
