// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/oriental
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
  slug: "oriental",
  title: "Oriental",
  categories: [
    "video-production",
  ],
  order: 13,
  profile: [
    {
      type: "p",
      text: [
        "Since its inception in 1952, the Oriental Group has evolved into a globally recognized print powerhouse, exporting products to over 80 countries across the world. Operating from modern manufacturing facilities in Dubai and Bahrain, complemented by Sales and Marketing offices strategically placed in the Middle East and Europe, Oriental has garnered a devoted clientele that spans decades. The company boasts an extensive product portfolio spanning five business divisions: Books, Packaging, Commercial Printing, Security Printing, and Digital Printing. Renowned for their unwavering commitment to quality, Oriental continues to be a leading force in the printing industry.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/oriental/card.webp",
    small: "/portfolio/oriental/card-700.webp",
    alt: "The card published for Oriental on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  film: {
    provider: "vimeo",
    id: "698140411",
    title: "Oriental",
  },
  source: "https://enhmedia.com/portfolio/oriental",
};
