// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/autobahn-car-rental
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
  slug: "autobahn-car-rental",
  title: "Autobahn Car Rental",
  categories: [
    "digital-marketing",
    "web-design",
  ],
  order: 1,
  profile: [
    {
      type: "p",
      text: [
        "Autobahn Car Rental is a prominent car rental company in the UAE with service centers strategically located throughout the country. The company has a fleet of over 10,000 vehicles, including cars, SUVs, commercial vehicles, and refrigerated vehicles to meet the needs of every type of customer, including leasing services.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/autobahn-car-rental/card.webp",
    small: "/portfolio/autobahn-car-rental/card-700.webp",
    alt: "The card published for Autobahn Car Rental on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  gallery: [
    {
      src: "/portfolio/autobahn-car-rental/work-1.webp",
      small: "/portfolio/autobahn-car-rental/work-1-540.webp",
      alt: "Published work from the Autobahn Car Rental project, 1 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/autobahn-car-rental/work-2.webp",
      small: "/portfolio/autobahn-car-rental/work-2-540.webp",
      alt: "Published work from the Autobahn Car Rental project, 2 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/autobahn-car-rental/work-3.webp",
      small: "/portfolio/autobahn-car-rental/work-3-540.webp",
      alt: "Published work from the Autobahn Car Rental project, 3 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/autobahn-car-rental/work-4.webp",
      small: "/portfolio/autobahn-car-rental/work-4-540.webp",
      alt: "Published work from the Autobahn Car Rental project, 4 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/autobahn-car-rental/work-5.webp",
      alt: "Published work from the Autobahn Car Rental project, 5 of 5.",
      w: 220,
      h: 220,
    },
  ],
  siteShot: {
    src: "/portfolio/autobahn-car-rental/site.webp",
    small: "/portfolio/autobahn-car-rental/site-800.webp",
    alt: "A screenshot of the Autobahn Car Rental website.",
    w: 1019,
    h: 542,
  },
  caseStudy: "autobahn",
  source: "https://enhmedia.com/portfolio/autobahn-car-rental",
};
