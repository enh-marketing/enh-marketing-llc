// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/uis-inspection
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
  slug: "uis-inspection",
  title: "UIS Inspection",
  categories: [
    "video-production",
  ],
  order: 18,
  profile: [
    {
      type: "p",
      text: [
        "Universal Inspectorate and Services is a globally renowned inspection services provider in Libya, with unparalleled expertise in surveying, inspection, loss adjustment, quality specifications, and analyses, pre-risk surveying for industrial trading production, storage facilities, and claim adjustment across a spectrum of property and liability risks. Their commitment extends to serving both the Libyan market and international inspection companies, insurance brokers, and agents. As a trusted industry leader, they remain dedicated to delivering comprehensive, high-quality inspection services to their valued clientele.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/uis-inspection/card.webp",
    small: "/portfolio/uis-inspection/card-700.webp",
    alt: "The card published for UIS Inspection on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  film: {
    provider: "vimeo",
    id: "698136367",
    title: "UIS Inspection",
  },
  source: "https://enhmedia.com/portfolio/uis-inspection",
};
