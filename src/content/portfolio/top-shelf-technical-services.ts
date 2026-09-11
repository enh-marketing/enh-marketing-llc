// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/top-shelf-technical-services
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
  slug: "top-shelf-technical-services",
  title: "Top Shelf Technical Services",
  categories: [
    "web-design",
  ],
  order: 34,
  profile: [
    {
      type: "p",
      text: [
        "Top Shelf Technical Services is a leading provider of storage solutions for businesses in the UAE. With over 10 years of experience, they have a proven track record of helping businesses of all sizes to improve their storage efficiency and organization. They offer a wide range of solutions and are committed to providing its customers with excellent customer service and satisfaction.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/top-shelf-technical-services/card.webp",
    small: "/portfolio/top-shelf-technical-services/card-700.webp",
    alt: "The card published for Top Shelf Technical Services on the ENH portfolio.",
    w: 1400,
    h: 933,
  },
  projectUrl: "https://topshelfuae.com/",
  caseStudy: "topshelf",
  source: "https://enhmedia.com/portfolio/top-shelf-technical-services",
};
