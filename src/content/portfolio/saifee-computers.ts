// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/saifee-computers
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
  slug: "saifee-computers",
  title: "Saifee Computers",
  categories: [
    "web-design",
  ],
  order: 32,
  profile: [
    {
      type: "p",
      text: [
        "Saifee Computers is a leading provider of accounting software solutions and other business management software in Dubai, UAE. With over 10 years of experience, Saifee Computers has a proven track record of helping businesses of all sizes manage their finances and operations more effectively.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/saifee-computers/card.webp",
    small: "/portfolio/saifee-computers/card-700.webp",
    alt: "The card published for Saifee Computers on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  gallery: [
    {
      src: "/portfolio/saifee-computers/work-1.webp",
      small: "/portfolio/saifee-computers/work-1-540.webp",
      alt: "Published work from the Saifee Computers project, 1 of 4.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/saifee-computers/work-2.webp",
      small: "/portfolio/saifee-computers/work-2-540.webp",
      alt: "Published work from the Saifee Computers project, 2 of 4.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/saifee-computers/work-3.webp",
      small: "/portfolio/saifee-computers/work-3-540.webp",
      alt: "Published work from the Saifee Computers project, 3 of 4.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/saifee-computers/work-4.webp",
      small: "/portfolio/saifee-computers/work-4-540.webp",
      alt: "Published work from the Saifee Computers project, 4 of 4.",
      w: 1080,
      h: 1080,
    },
  ],
  projectUrl: "https://www.saifeecomputers.com/",
  caseStudy: "saifeecomputers",
  source: "https://enhmedia.com/portfolio/saifee-computers",
};
