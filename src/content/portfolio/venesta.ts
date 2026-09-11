// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/venesta
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
  slug: "venesta",
  title: "Venesta",
  categories: [
    "digital-marketing",
    "web-design",
  ],
  order: 8,
  profile: [
    {
      type: "p",
      text: [
        "Venesta, with its parent company in the UK, lives and breathes to give your washrooms an aesthetic yet functional twist. They have toilet cubicles and washroom systems that combine cutting-edge innovation with superb performance and aesthetics, with solutions to satisfy the most demanding brief. This prominent company providing commercial washroom solutions that started in the UK years ago faced several challenges.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/venesta/card.webp",
    small: "/portfolio/venesta/card-700.webp",
    alt: "The card published for Venesta on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  gallery: [
    {
      src: "/portfolio/venesta/work-1.webp",
      small: "/portfolio/venesta/work-1-540.webp",
      alt: "Published work from the Venesta project, 1 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/venesta/work-2.webp",
      small: "/portfolio/venesta/work-2-540.webp",
      alt: "Published work from the Venesta project, 2 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/venesta/work-3.webp",
      small: "/portfolio/venesta/work-3-540.webp",
      alt: "Published work from the Venesta project, 3 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/venesta/work-4.webp",
      small: "/portfolio/venesta/work-4-540.webp",
      alt: "Published work from the Venesta project, 4 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/venesta/work-5.webp",
      alt: "Published work from the Venesta project, 5 of 5.",
      w: 219,
      h: 219,
    },
  ],
  siteShot: {
    src: "/portfolio/venesta/site.webp",
    small: "/portfolio/venesta/site-800.webp",
    alt: "A screenshot of the Venesta website.",
    w: 1019,
    h: 541,
  },
  caseStudy: "venesta",
  source: "https://enhmedia.com/portfolio/venesta",
};
