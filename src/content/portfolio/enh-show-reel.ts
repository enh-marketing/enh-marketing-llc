// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/portfolio/enh-show-reel
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
  slug: "enh-show-reel",
  title: "ENH Show Reel",
  categories: [
    "video-production",
  ],
  order: 9,
  profile: [
    {
      type: "p",
      text: [
        "ENH Media, a leading digital marketing company based in Dubai, specializes in providing top-notch video production services. With over a decade of experience, their team of creative experts excels in creating compelling and visually stunning videos that captivate audiences. They offer a comprehensive range of video production solutions, including corporate videos, event videography, promos, and training videos. From concept development and scriptwriting to 4K video production and post-production, their dedicated team works closely with clients to bring their vision to life. By utilizing strategic storytelling techniques, they ensure that each video not only engages viewers but also drives results. Their expertise extends beyond video production, as they also offer SEO services, website design and development, branding, and social media marketing. With a track record of delivering measurable success, ENH Media is committed to helping brands elevate their digital presence through impactful video content.",
      ],
    },
  ],
  thumb: {
    src: "/portfolio/enh-show-reel/card.webp",
    small: "/portfolio/enh-show-reel/card-700.webp",
    alt: "The card published for ENH Show Reel on the ENH portfolio.",
    w: 1400,
    h: 980,
  },
  film: {
    provider: "vimeo",
    id: "752829729",
    title: "ENH Show Reel",
  },
  source: "https://enhmedia.com/portfolio/enh-show-reel",
};
