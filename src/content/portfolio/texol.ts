// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/texol
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
  slug: "texol",
  title: "Texol",
  categories: [
    "video-production",
  ],
  order: 17,
  profile: [
    {
      type: "p",
      text: [
        "Texol Lubritech FZC, an overseas joint venture of Gandhar Oil Refinery India Ltd (GORIL), is a thriving member of the Gandhar Oil Group, a distinguished conglomerate with over three decades of expertise in oil and petroleum products. GORIL's footprint includes two well-established manufacturing facilities situated in Taloja, Maharashtra, and Silvassa, a Union Territory bordering Gujarat, India. In 2017, Texol became the third jewel in GORIL's crown, establishing a state-of-the-art plant in Hamriyah Free Zone, UAE. The Texol product line encompasses high-performance industrial and automotive lubricants, greases, transformer oils, rubber process oils, white oils, heavy and light liquid paraffin, and petroleum jelly.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/texol/card.webp",
    small: "/portfolio/texol/card-700.webp",
    alt: "The card published for Texol on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  film: {
    provider: "vimeo",
    id: "752828036",
    title: "Texol",
  },
  source: "https://enhmedia.com/portfolio/texol",
};
