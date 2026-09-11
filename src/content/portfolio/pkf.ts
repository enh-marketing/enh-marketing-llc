// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/pkf
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
  slug: "pkf",
  title: "PKF",
  categories: [
    "digital-marketing",
    "web-design",
  ],
  order: 5,
  profile: [
    {
      type: "p",
      text: [
        "PKF UAE is a member of PKF International, a global network of accounting firms offering audit, accounting, tax, and business advisory solutions. The company has over 165 staff members and serves a wide range of clients. PKF UAE is committed to providing its clients with the highest quality services. The company's team of experienced professionals is dedicated to helping its clients to achieve their business goals.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/pkf/card.webp",
    small: "/portfolio/pkf/card-700.webp",
    alt: "The card published for PKF on the ENH portfolio.",
    w: 1400,
    h: 965,
  },
  gallery: [
    {
      src: "/portfolio/pkf/work-1.webp",
      small: "/portfolio/pkf/work-1-540.webp",
      alt: "Published work from the PKF project, 1 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/pkf/work-2.webp",
      small: "/portfolio/pkf/work-2-540.webp",
      alt: "Published work from the PKF project, 2 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/pkf/work-3.webp",
      small: "/portfolio/pkf/work-3-540.webp",
      alt: "Published work from the PKF project, 3 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/pkf/work-4.webp",
      small: "/portfolio/pkf/work-4-540.webp",
      alt: "Published work from the PKF project, 4 of 5.",
      w: 1080,
      h: 1080,
    },
    {
      src: "/portfolio/pkf/work-5.webp",
      alt: "Published work from the PKF project, 5 of 5.",
      w: 219,
      h: 219,
    },
  ],
  projectUrl: "https://pkfuae.com/",
  caseStudy: "pkfuae",
  source: "https://enhmedia.com/portfolio/pkf",
};
