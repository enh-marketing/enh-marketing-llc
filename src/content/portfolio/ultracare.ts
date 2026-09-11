// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/ultracare
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
  slug: "ultracare",
  title: "Ultracare",
  categories: [
    "digital-marketing",
    "web-design",
  ],
  order: 7,
  profile: [
    {
      type: "p",
      text: [
        "Ultracare is a tissue paper manufacturing company in Dubai that produces a wide range of products for both retail and institutional clients. The company is committed to sustainability and uses recycled materials to make its products. Ultracare's clients include hotels, restaurants, airlines, and schools.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/ultracare/card.webp",
    small: "/portfolio/ultracare/card-700.webp",
    alt: "The card published for Ultracare on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  gallery: [
    {
      src: "/portfolio/ultracare/work-1.webp",
      small: "/portfolio/ultracare/work-1-540.webp",
      alt: "Published work from the Ultracare project, 1 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/ultracare/work-2.webp",
      small: "/portfolio/ultracare/work-2-540.webp",
      alt: "Published work from the Ultracare project, 2 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/ultracare/work-3.webp",
      small: "/portfolio/ultracare/work-3-540.webp",
      alt: "Published work from the Ultracare project, 3 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/ultracare/work-4.webp",
      small: "/portfolio/ultracare/work-4-540.webp",
      alt: "Published work from the Ultracare project, 4 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/ultracare/work-5.webp",
      alt: "Published work from the Ultracare project, 5 of 5.",
      w: 219,
      h: 219,
    },
  ],
  siteShot: {
    src: "/portfolio/ultracare/site.webp",
    small: "/portfolio/ultracare/site-800.webp",
    alt: "A screenshot of the Ultracare website.",
    w: 1019,
    h: 541,
  },
  caseStudy: "ultracare",
  source: "https://enhmedia.com/portfolio/ultracare",
};
