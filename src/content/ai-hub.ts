// AI Hub — landing page content.
//
// WHO WROTE THIS, AND WHAT THAT LIMITS. There is no client document for this
// page, and on 2026-09-08 Divij asked for the writing to be done here instead.
// So the narration below is ours: the chapter titles, the connective lines and
// the close. It is written about a journey, and it claims nothing about the
// business.
//
// WHERE A LINE DESCRIBES A SERVICE, IT IS THAT SERVICE'S OWN SENTENCE, copied
// exactly and marked with `quotes`. It is a literal rather than an import on
// purpose: importing `meta` from a service file pulls that entire file into
// this page's bundle, which measured at 12.9 KB of eagerly loaded copy to
// render one sentence, and would have been roughly eight times that once every
// category is on the page. `npm run check:copy` reads both files as text and
// fails if the two ever differ, so the guarantee an import would have given us
// is kept without the weight. Change a service description and that gate will
// tell you this file needs the same edit.
//
// The rules those documents set apply here too, and they are worth repeating
// because this page is the one most tempted to break them:
//
//   AI Search Visibility: "No guaranteed placements and no general AI score."
//   AI & Automation: the only number in the whole set is "15 years".
//   Data & Dashboards: dashboards show shapes, never values.
//   Every category: no client examples until permissioned ones are supplied.
//
// So nothing here carries a figure, a result, a placement or a named client.
//
// THE STORY, AND WHY IT IS THIS ONE. ENH is Explore New Heights. The page takes
// the name literally, and then goes past where the name stops: a summit, then
// the door out, then the system, then the thing at the end that you can only
// see by what it does to everything around it. Each category is a stop on that
// climb rather than an item in a list.

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
  /** Slug of the service whose `meta.description` this body must match word
   *  for word. Enforced by scripts/check-hub-copy.mjs. */
  quotes?: string;
};

/* ---------------------------------------------------------------- chapter 0 */

/** The ascent. The name on the door, taken at face value. */
export const ascent: Beat[] = [
  {
    at: 0.06,
    eyebrow: "AI Hub",
    title: "Explore new heights",
    body: "It is the name on our door. This is the page where it stops being a figure of speech.",
  },
  {
    at: 0.62,
    title: "The summit was never the ceiling",
    body: "Climb far enough and the ground runs out. What is worth reaching next is above it.",
  },
];

/* ---------------------------------------------------------------- chapter 1 */

/** The system. Arrival, then the first category. */
export const system: Beat[] = [
  {
    at: 0.02,
    title: "Nothing out here holds still",
    body: "Every system a business runs on is already moving. The work is knowing where it will be, not where it was.",
  },
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
    title: "Then the paths bend",
    body: "Seen from here, a straight line is only ever the near part of a longer curve.",
  },
  {
    at: 1,
    title: "Further out",
    body: "Past the last orbit there is still somewhere to go.",
  },
];
