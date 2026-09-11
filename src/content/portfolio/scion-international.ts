// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/scion-international
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
  slug: "scion-international",
  title: "Scion International",
  categories: [
    "video-production",
  ],
  order: 15,
  profile: [
    {
      type: "p",
      text: [
        "Scion International LLC is a renowned manufacturer in the fragrance, personal care, and color cosmetics segments, with a legacy dating back to 1974. As a third-generation family business, Scion International has built a strong worldwide reputation, with its products in over 70 countries. Their diverse portfolio of brands includes Jean-Paul Dupont, Creation Lamis, Paris Collection, Bio Glow, and more. With two fully owned manufacturing facilities equipped with cutting-edge technology and adhering to international certifications such as ISO, GMP, PETA Animal Cruelty-Free, and Vegan, Scion ensures the highest quality standards in its products.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/scion-international/card.webp",
    small: "/portfolio/scion-international/card-700.webp",
    alt: "The card published for Scion International on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  film: {
    provider: "vimeo",
    id: "877057789",
    title: "Scion International",
  },
  source: "https://enhmedia.com/portfolio/scion-international",
};
