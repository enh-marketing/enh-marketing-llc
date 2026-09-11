// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/healthy-farm-eatery
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
  slug: "healthy-farm-eatery",
  title: "Healthy Farm Eatery",
  categories: [
    "digital-marketing",
    "web-design",
  ],
  order: 3,
  profile: [
    {
      type: "p",
      text: [
        "Healthy Farm Eatery is an innovative dining concept founded by celebrated Chef Luca Cobre, created with a passion for transforming the way people experience food. Rooted in a commitment to health, sustainability, and flavor, they craft wholesome meals that nourish the body while delighting the senses.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/healthy-farm-eatery/card.webp",
    small: "/portfolio/healthy-farm-eatery/card-700.webp",
    alt: "The card published for Healthy Farm Eatery on the ENH portfolio.",
    w: 1400,
    h: 964,
  },
  gallery: [
    {
      src: "/portfolio/healthy-farm-eatery/work-1.webp",
      alt: "Published work from the Healthy Farm Eatery project, 1 of 5.",
      w: 219,
      h: 219,
    },
    {
      src: "/portfolio/healthy-farm-eatery/work-2.webp",
      alt: "Published work from the Healthy Farm Eatery project, 2 of 5.",
      w: 219,
      h: 219,
    },
    {
      src: "/portfolio/healthy-farm-eatery/work-3.webp",
      alt: "Published work from the Healthy Farm Eatery project, 3 of 5.",
      w: 219,
      h: 219,
    },
    {
      src: "/portfolio/healthy-farm-eatery/work-4.webp",
      alt: "Published work from the Healthy Farm Eatery project, 4 of 5.",
      w: 219,
      h: 219,
    },
    {
      src: "/portfolio/healthy-farm-eatery/work-5.webp",
      alt: "Published work from the Healthy Farm Eatery project, 5 of 5.",
      w: 219,
      h: 219,
    },
  ],
  siteShot: {
    src: "/portfolio/healthy-farm-eatery/site.webp",
    small: "/portfolio/healthy-farm-eatery/site-800.webp",
    alt: "A screenshot of the Healthy Farm Eatery website.",
    w: 1019,
    h: 541,
  },
  caseStudy: "healthy-farm",
  source: "https://enhmedia.com/portfolio/healthy-farm-eatery",
};
