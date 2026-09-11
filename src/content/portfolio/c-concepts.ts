// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/c-concepts
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
  slug: "c-concepts",
  title: "Product Launch Video For Casio",
  categories: [
    "video-production",
  ],
  order: 14,
  profile: [
    {
      type: "p",
      text: [
        "Product launch video for Casio, a prominent global electronics manufacturer, has established a remarkable legacy since its inception in 1957. Renowned for innovation, Casio has consistently pushed the boundaries of technology, producing a diverse range of products. The company has iconic offerings such as calculators, electronic musical instruments, digital cameras, timepieces, and more. Casio renowned watches, in particular, have set industry standards for precision and reliability. Committed to quality and innovation, Casio continues to shape the world of electronics and timekeeping, maintaining its status as a trusted and innovative brand worldwide.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/c-concepts/card.webp",
    small: "/portfolio/c-concepts/card-700.webp",
    alt: "The card published for Product Launch Video For Casio on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  film: {
    provider: "vimeo",
    id: "315835292",
    title: "Product Launch Video For Casio",
  },
  source: "https://enhmedia.com/portfolio/c-concepts",
};
