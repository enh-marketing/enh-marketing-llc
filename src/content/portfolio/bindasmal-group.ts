// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/bindasmal-group
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
  slug: "bindasmal-group",
  title: "Bindasmal Group",
  categories: [
    "video-production",
  ],
  order: 10,
  profile: [
    {
      type: "p",
      text: [
        "Bin Dasmal Group is a prominent engineering solutions provider based in the UAE. With over 40 years of experience, the group is recognized for its diverse range of businesses in the areas of HVAC, MEP, lifting and safety, automatic doors, construction, and real estate management. Committed to delivering high-quality products and services, Bin Dasmal Group holds ISO certifications and aims to exceed customer expectations. With a focus on constant improvement, ethical conduct, and sustainability initiatives, the group strives to be a socially responsible organization. Supported by a dedicated team and state-of-the-art infrastructure, Bin Dasmal Group aims to remain at the forefront of the industry in the GCC region.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/bindasmal-group/card.webp",
    small: "/portfolio/bindasmal-group/card-700.webp",
    alt: "The card published for Bindasmal Group on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  film: {
    provider: "vimeo",
    id: "877057474",
    title: "Bindasmal Group",
  },
  source: "https://enhmedia.com/portfolio/bindasmal-group",
};
