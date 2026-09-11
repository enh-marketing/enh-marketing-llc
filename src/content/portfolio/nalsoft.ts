// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/nalsoft
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
  slug: "nalsoft",
  title: "Nalsoft",
  categories: [
    "web-design",
  ],
  order: 30,
  profile: [
    {
      type: "p",
      text: [
        "Nalsoft is a thriving and agile IT service provider with a rich history of aiding its clients in their digital transformation journeys spanning more than 20 years. With the headquarters based in Dubai and an offshore development center situated in Hyderabad, India, they specialize in delivering consulting and IT services to a diverse range of businesses across the GCC and KSA. They offer a comprehensive array of services, including implementation, upgrades, and support for Oracle Enterprise Applications, which encompass Cloud ERP, Cloud HCM, Cloud SCM, Cloud CX, and Cloud Enterprise Performance Management (EPM).",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/nalsoft/card.webp",
    small: "/portfolio/nalsoft/card-700.webp",
    alt: "The card published for Nalsoft on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  siteShot: {
    src: "/portfolio/nalsoft/site.webp",
    small: "/portfolio/nalsoft/site-800.webp",
    alt: "A screenshot of the Nalsoft website.",
    w: 1019,
    h: 541,
  },
  source: "https://enhmedia.com/portfolio/nalsoft",
};
