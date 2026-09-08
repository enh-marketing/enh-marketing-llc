// AI Hub — landing page content.
//
// NOTHING ON THIS PAGE IS WRITTEN HERE. There is no client document for the
// landing page, so on 2026-09-08 the decision was made to give it no prose of
// its own rather than invent connective copy. Every string below is quoted from
// somewhere already approved, and marked with the slug it came from:
//
//   Category titles   the labels in src/lib/sitemap.ts, which are what the
//                     navigation and the sitemap already call these pages.
//   Category bodies   that service page's own `meta.description`.
//   "Explore New Heights"
//                     the site's existing line, already on the home page in
//                     src/components/sections/AISection.tsx.
//
// The visuals carry the story between categories. Where earlier drafts had a
// bridging line, there is now silence and a moving picture, which is the point:
// the page cannot overclaim in copy it does not have. If a bridging line is
// ever wanted, it needs to come from a document, not from here.
//
// `npm run check:copy` reads this file and the files it quotes as text and
// fails if any of them disagree, so a change to a service page's description or
// to a sitemap label is caught here rather than shipping as a quiet drift.
//
// WHY THE SERVICE FILES ARE NOT IMPORTED. Importing `meta` pulls that service
// page's entire content file into this page's client bundle, measured at
// 12.9 KB of eagerly loaded copy to render one sentence and roughly eight times
// that once every category is on the page. The gate above gives the same
// guarantee at no runtime cost.
//
// THE RULES THE SOURCE DOCUMENTS SET still apply, and this page is the one most
// tempted to break them: no guaranteed placements and no general AI score, no
// figures anywhere except "15 years", dashboards show shapes and never values,
// and no client examples until permissioned ones are supplied. Quoting rather
// than writing is what keeps that true by construction.

/** A line of the story, shown at a point within its chapter. */
export type Beat = {
  /** Where in the chapter it appears, 0 to 1. */
  at: number;
  title: string;
  body?: string;
  /** Present only on a beat that names a real service. */
  href?: string;
  /** Small label above the title. */
  eyebrow?: string;
  /** Slug of the service this beat quotes. Its title must match that page's
   *  sitemap label and its body that page's meta.description, word for word.
   *  Enforced by scripts/check-hub-copy.mjs. */
  quotes?: string;
};

/* ---------------------------------------------------------------- chapter 0 */

/** The ascent. The name, and then the picture on its own. */
export const ascent: Beat[] = [
  {
    at: 0.06,
    eyebrow: "AI Hub",
    title: "Explore New Heights",
  },
];

/* ---------------------------------------------------------------- chapter 1 */

/** The system. One category at each of the camera's stops.
 *
 *  THE ORDER IS THE SITE'S ORDER, taken straight from the AI Hub group in
 *  sitemap.ts rather than rearranged into a theme. Any other order would be a
 *  claim about which of these matters most, and that is not a claim to make
 *  here. The remaining five categories follow in the same order in the chapters
 *  still to be built.
 *
 *  `at` values line up with the camera: 0.34 is the stop the particle field
 *  belongs to, 0.67 the helix, 1 the wide edge-on view. */
export const system: Beat[] = [
  {
    at: 0.34,
    eyebrow: "01",
    title: "AI Search Visibility",
    body: "ENH Marketing helps UAE brands improve how they appear in AI-generated search results.",
    quotes: "ai-search-visibility",
    href: "/ai-hub/ai-search-visibility",
  },
  {
    at: 0.67,
    eyebrow: "02",
    title: "AI & Automation",
    body: "ENH Marketing builds AI agents, automated workflows and custom tools for UAE businesses. Every project starts with a paid diagnostic that identifies what to automate and what should stay manual.",
    quotes: "ai-automation",
    href: "/ai-hub/ai-automation",
  },
  {
    at: 1,
    eyebrow: "03",
    title: "AI Creative Production",
    body: "ENH Marketing produces AI-generated videos, UGC-style ads, product imagery, and creative variants for UAE brands.",
    quotes: "ai-creative-production",
    href: "/ai-hub/ai-creative-production",
  },
];

/* ---------------------------------------------------------------- chapter 2 */

/** The horizon. The last two categories, at the thing you can only see by
 *  what it does to the light around it.
 *
 *  IT ENDS ON A CATEGORY, NOT ON A CLOSING LINE. A page that has no prose of
 *  its own does not get to write one for its ending either, however much an
 *  ending wants one. If a closing line is ever wanted it has to come from a
 *  document.
 *
 *  04, 05 and 06 are missing on purpose. Conversational AI, Campaign
 *  Intelligence and Intelligent Web belong to the uplink chapter, which is not
 *  built yet, and the site's order is kept across the chapters rather than
 *  inside each one: 01-03 in the system, 04-06 in the uplink, 07-08 here.
 */
export const horizon: Beat[] = [
  {
    at: 0.28,
    eyebrow: "07",
    title: "Data & Dashboards",
    body: "ENH Marketing builds live reporting dashboards and marketing attribution systems for UAE businesses.",
    quotes: "data-and-dashboards",
    href: "/ai-hub/data-and-dashboards",
  },
  {
    at: 0.72,
    eyebrow: "08",
    title: "AI Workshops & Training",
    body: "ENH Marketing runs practical corporate AI training in Dubai and across the UAE. Each session is built around the team’s actual workflows, tools and responsibilities.",
    quotes: "ai-workshops-and-training",
    href: "/ai-hub/ai-workshops-and-training",
  },
];
