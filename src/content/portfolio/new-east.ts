// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/new-east
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
  slug: "new-east",
  title: "New East",
  categories: [
    "video-production",
  ],
  order: 12,
  profile: [
    {
      type: "p",
      text: [
        "New East has been a steadfast partner to automotive businesses since 1992. As the largest importer and distributor of aftermarket automotive parts in the UAE, New East takes pride in its membership with the Auto Parts Member Group (APMG). The company's unwavering commitment to excellence is reflected in its investment in a highly skilled team. This investment ensures that New East continually advances as an organization, remaining poised to meet the future needs of the automotive aftermarket.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/new-east/card.webp",
    small: "/portfolio/new-east/card-700.webp",
    alt: "The card published for New East on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  film: {
    provider: "vimeo",
    id: "781742052",
    title: "New East",
  },
  source: "https://enhmedia.com/portfolio/new-east",
};
