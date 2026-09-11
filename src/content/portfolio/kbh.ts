// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/kbh
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
  slug: "kbh",
  title: "KBH",
  categories: [
    "web-design",
  ],
  order: 26,
  profile: [
    {
      type: "p",
      text: [
        "KBH is a boutique law firm with a strong regional presence in Dubai, Bahrain, and Kuwait. Specializing in international dispute resolution and commercial transactions, KBH was founded by the pioneering barrister Kaashif Basit in 2006, aligning with the establishment of the DIFC Courts. In 2010, the firm expanded its reach to Bahrain and Kuwait. KBH has been instrumental in shaping DIFC law, establishing significant precedents that resonate with commercial practitioners in the GCC and beyond. As a result, the firm is recognized for its expertise in international legal matters and its vital contributions to the legal landscape.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/kbh/card.webp",
    small: "/portfolio/kbh/card-700.webp",
    alt: "The card published for KBH on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  projectUrl: "https://kbh.ae/",
  source: "https://enhmedia.com/portfolio/kbh",
};
