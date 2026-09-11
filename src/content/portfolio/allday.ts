// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/allday
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
  slug: "allday",
  title: "Allday",
  categories: [
    "digital-marketing",
    "video-production",
  ],
  order: 0,
  profile: [
    {
      type: "p",
      text: [
        "AllDay is a well-established retail chain with multiple locations across the UAE. They are dedicated to providing an extensive range of products and services that cater to the diverse needs of our valued customers. Their commitment to quality, convenience, and exceptional customer service sets them apart, making them a go-to destination for shoppers seeking both everyday essentials and special finds.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/allday/card.webp",
    small: "/portfolio/allday/card-700.webp",
    alt: "The card published for Allday on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  gallery: [
    {
      src: "/portfolio/allday/work-1.webp",
      small: "/portfolio/allday/work-1-540.webp",
      alt: "Published work from the Allday project, 1 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/allday/work-2.webp",
      small: "/portfolio/allday/work-2-540.webp",
      alt: "Published work from the Allday project, 2 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/allday/work-3.webp",
      small: "/portfolio/allday/work-3-540.webp",
      alt: "Published work from the Allday project, 3 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/allday/work-4.webp",
      small: "/portfolio/allday/work-4-540.webp",
      alt: "Published work from the Allday project, 4 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/allday/work-5.webp",
      alt: "Published work from the Allday project, 5 of 5.",
      w: 219,
      h: 219,
    },
  ],
  film: {
    provider: "vimeo",
    id: "698134514",
    title: "Allday",
  },
  caseStudy: "allday",
  source: "https://enhmedia.com/portfolio/allday",
};
