// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/datagram
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
  slug: "datagram",
  title: "Datagram",
  categories: [
    "digital-marketing",
    "web-design",
  ],
  order: 2,
  profile: [
    {
      type: "p",
      text: [
        "We will explore the journey of Datagram Store, a high-end IT product e-commerce website specializing in servers, network switches, routers, and firewalls. The aim was to create a cutting-edge online platform that not only showcased these products but also incorporated modern communication functionalities.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/datagram/card.webp",
    small: "/portfolio/datagram/card-700.webp",
    alt: "The card published for Datagram on the ENH portfolio.",
    w: 1400,
    h: 964,
  },
  gallery: [
    {
      src: "/portfolio/datagram/work-1.webp",
      small: "/portfolio/datagram/work-1-540.webp",
      alt: "Published work from the Datagram project, 1 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/datagram/work-2.webp",
      small: "/portfolio/datagram/work-2-540.webp",
      alt: "Published work from the Datagram project, 2 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/datagram/work-3.webp",
      small: "/portfolio/datagram/work-3-540.webp",
      alt: "Published work from the Datagram project, 3 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/datagram/work-4.webp",
      small: "/portfolio/datagram/work-4-540.webp",
      alt: "Published work from the Datagram project, 4 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/datagram/work-5.webp",
      alt: "Published work from the Datagram project, 5 of 5.",
      w: 219,
      h: 219,
    },
  ],
  projectUrl: "https://datagramstore.com/",
  caseStudy: "datagram",
  source: "https://enhmedia.com/portfolio/datagram",
};
