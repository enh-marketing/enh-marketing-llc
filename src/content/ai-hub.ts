// AI Hub — landing page content.
//
// NOTHING IN THIS FILE IS WRITTEN HERE, and that is still true. There is no
// client document for the landing page, so on 2026-09-08 the decision was made
// to give it no prose of its own rather than invent connective copy. Every
// string below is quoted from somewhere already approved, and marked with the
// slug it came from:
//
// WHAT CHANGED ON 2026-09-09 is that Divij authorised copy to be written for
// the pillar page, having been shown that no document exists for it. He also
// asked that these seven stay quoted, so they have, and check:copy still
// enforces them. The written copy is the connective layer and it lives in
// src/pages/ai-hub/index.astro, not here: the head tags and the structured
// data. See the note there and the exception recorded in docs/PRODUCT.md.
// If prose is ever wanted between the categories it belongs beside this
// comment, marked as written rather than quoted, so the two never blur.
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

/** The ascent. The name, and then the picture on its own.
 *
 *  THESE TWO LINES CAME FROM DIVIJ DIRECTLY, on 2026-09-08, written out in his
 *  own message: "change the text to Explore new heights with us" and "the text
 *  changes to explore new heights with AI". They are recorded here as his
 *  words, not drafted here and not quoted from a document. The site's existing
 *  "Explore New Heights", still on the home page in
 *  src/components/sections/AISection.tsx, is the phrase both extend. If either
 *  ever needs to trace back to a client document rather than to a message,
 *  this is the note that says it does not yet.
 *
 *  ONE LINE BECOMING ANOTHER is the opener's whole move: it rides the Sun out
 *  of the photograph and into the system, and swaps its last word on the way.
 *  So they are a pair and have to stay a pair; changing one alone breaks the
 *  sentence the transition is built on. */
export const ascent: Beat[] = [
  {
    at: 0.06,
    eyebrow: "AI Hub",
    title: "Explore New Heights With Us",
  },
];

/** What the opener's line becomes once it has crossed into the system. */
export const ASCENT_HANDOVER = "Explore New Heights With AI";

/** The standfirst under the opening line.
 *
 *  WHAT IT IS DOING. The headline is a promise, "Explore New Heights With AI".
 *  A standfirst's job is to make that promise credible in one glance, to a
 *  reader who is deciding within a screen whether this agency is serious.
 *
 *  THE OBJECTION IT ANSWERS is the only one that matters here: every agency in
 *  Dubai is selling AI this year, and a marketing lead cannot tell which of
 *  them can actually build any of it. Nothing about the services themselves
 *  answers that, because every competitor's page says the same words.
 *
 *  SO IT ANSWERS WITH THE SEQUENCE. Fifteen years of marketing came first and
 *  the AI came after, which is a fact about this agency that a firm founded
 *  last year cannot copy. It is the difference between a marketing company that
 *  learned AI and an AI company guessing at marketing, and it is the reason to
 *  believe the seven services below are pointed at a business rather than at a
 *  model. That is proof by history, not proof by number, which is the only kind
 *  available here and, on this subject, the more convincing kind anyway.
 *
 *  The first draft of this said "AI services for UAE businesses, run by a Dubai
 *  agency of fifteen years. What each one does, and where each one stops." It
 *  opened on a category, which is the weakest sentence available, and closed on
 *  a hedge dressed as a virtue. Divij's word for it was accurate. */
export const ASCENT_STANDFIRST =
  "We did the marketing for fifteen years before we did the AI. Which is why every service below starts with your business, not with the model.";

/* ---------------------------------------------------------------- chapter 1 */

/** The system. One category at each of the camera's stops.
 *
 *  THE ORDER IS THE SITE'S, for as far as it goes. Where the page departs from
 *  it, at the uplink, the reason is written where that happens rather than
 *  here.
 *
 *  `at` values line up with the camera's stops: the network, the helix, and the
 *  straightening where every trail lies flat and hands over to the voice. */
export const system: Beat[] = [
  {
    at: 0.25,
    eyebrow: "01",
    title: "AI Search Visibility",
    body: "ENH Marketing helps UAE brands improve how they appear in AI-generated search results.",
    quotes: "ai-search-visibility",
    href: "/ai-hub/ai-search-visibility",
  },
  {
    at: 0.55,
    eyebrow: "02",
    title: "AI & Automation",
    body: "ENH Marketing builds AI agents, automated workflows and custom tools for UAE businesses. Every project starts with a paid diagnostic that identifies what to automate and what should stay manual.",
    quotes: "ai-automation",
    href: "/ai-hub/ai-automation",
  },
  {
    at: 0.85,
    eyebrow: "03",
    title: "AI Creative Production",
    body: "ENH Marketing produces AI-generated videos, UGC-style ads, product imagery, and creative variants for UAE brands.",
    quotes: "ai-creative-production",
    href: "/ai-hub/ai-creative-production",
  },
];

/* ---------------------------------------------------------------- chapter 2 */

/** The uplink. The trails become a voice.
 *
 *  IT SITS BETWEEN CREATIVE PRODUCTION AND THE CHART, which is not the site's
 *  own order and is a deliberate break from the rule the rest of the page
 *  follows. The sequence here is set by the picture: the planets' coloured
 *  trails straighten and lie flat, and horizontal coloured lines are what a
 *  waveform is made of, so the voice is what those trails can become without
 *  anything having to morph. Conversational AI is also the only category whose
 *  own description names voice agents, so the picture and the copy agree.
 *
 *  The eyebrows count the journey rather than the sitemap, 01 to 07, and always
 *  did; this is the first version where that is consistent all the way down. */
export const uplink: Beat[] = [
  {
    at: 0.5,
    eyebrow: "04",
    title: "Conversational AI",
    body: "ENH Marketing builds AI chatbots, voice agents and customer service systems for UAE businesses. Every project starts with a paid diagnostic.",
    quotes: "conversational-ai",
    href: "/ai-hub/conversational-ai",
  },
];

/* ---------------------------------------------------------------- chapter 3 */

/** The chart. Two categories share it, so it runs long: the Sun has to have
 *  somewhere to be while each of them is read. */
export const chart: Beat[] = [
  {
    at: 0.35,
    eyebrow: "05",
    title: "Campaign Intelligence",
    body: "ENH Marketing helps UAE businesses plan campaign budgets using historical performance, relevant benchmarks and forecast ranges.",
    quotes: "campaign-intelligence",
    href: "/ai-hub/campaign-intelligence",
  },
  {
    at: 0.8,
    eyebrow: "06",
    title: "Data & Dashboards",
    body: "ENH Marketing builds live reporting dashboards and marketing attribution systems for UAE businesses.",
    quotes: "data-and-dashboards",
    href: "/ai-hub/data-and-dashboards",
  },
];
/* ---------------------------------------------------------------- chapter 4 */

/** The horizon. Intelligent Web, at the thing you can only see by what it does
 *  to the light around it.
 *
 *  THE BLACK HOLE IS THIS CATEGORY'S SCENE NOW, on Divij's call of 2026-09-09.
 *  It closed the story under AI Workshops & Training before, and before that a
 *  branching structure was built for Intelligent Web and rejected on sight. The
 *  black hole is the stronger picture and this is the copy it now carries.
 *
 *  IT IS SEVENTH, NOT SIXTH, which is where the site's own navigation lists it.
 *  That is the chart's doing: it draws one unbroken line and Campaign
 *  Intelligence and Data & Dashboards are read against two points on it, so a
 *  different scene between them would cut the line in half and cost that
 *  chapter the only thing it is. This is the page's second deliberate departure
 *  from site order, after the uplink.
 *
 *  AI WORKSHOPS & TRAINING IS OFF THE PAGE, same call. So one category is
 *  unplaced again, as one always has been: the hub runs 01 to 07 and Workshops
 *  is reachable from the navigation and from its own page but has no section
 *  here. It is left out rather than folded into a scene built for something
 *  else, which is the same rule that kept Intelligent Web off until today.
 *
 *  IT ENDS ON A CATEGORY, NOT ON A CLOSING LINE. A page whose categories are
 *  all quoted does not get to write itself an ending, however much an ending
 *  wants one. If a closing line is ever wanted it has to come from a document
 *  or from Divij. */
export const horizon: Beat[] = [
  {
    at: 0.5,
    eyebrow: "07",
    title: "Intelligent Web",
    body: "ENH Marketing designs and develops intelligent websites for UAE businesses that personalise content, display live information and use a clear structure.",
    quotes: "intelligent-web",
    href: "/ai-hub/intelligent-web",
  },
];
