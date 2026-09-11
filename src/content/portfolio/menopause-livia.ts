// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/menopause-livia
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
  slug: "menopause-livia",
  title: "Menopause Livia",
  categories: [
    "web-design",
  ],
  order: 29,
  profile: [
    {
      type: "p",
      text: [
        "Menopause Livia, a visionary startup dedicated to enhancing women's health, approached our team to develop a dynamic website targeting women in the peri-menopausal, menopausal, and post-menopausal stages of life. The goal was to provide an all-encompassing online platform that offered personalized nutrition plans, resistance training programs, workout modules, and diet plans while incorporating modern functionality for a seamless user experience.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/menopause-livia/card.webp",
    small: "/portfolio/menopause-livia/card-700.webp",
    alt: "The card published for Menopause Livia on the ENH portfolio.",
    w: 1400,
    h: 964,
  },
  projectUrl: "https://menopauselivia.com",
  source: "https://enhmedia.com/portfolio/menopause-livia",
};
