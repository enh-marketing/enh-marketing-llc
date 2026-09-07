// Insights — the content model for /insights and /insights/[slug].
//
// THE MODEL AND THE HELPERS. The articles themselves live one file per post in
// src/content/insights/, collected by src/content/insights/posts.ts — the same
// convention src/content/services already uses for its service documents.
//
// NOTHING IN A MIGRATED POST IS INVENTED. Each was converted from its live
// enhmedia.com/blog page by the migration converter: the title is that page's
// <title>, the standfirst its meta description, the date and topic its
// banner's, and the body its rich-text block turned block for block into the
// Block union below. Every post carries a `source` URL so any line on the page
// can be checked against the page it came from.
//
// A NOTE WITH NO BODY IS NOT A PAGE. `published()` is the gate: it is what
// [slug].astro walks to build routes, and what the listing reads to decide
// whether a card is a link or a heading. A half-migrated note therefore cannot
// be a link on the listing and a 404 in the router — it is a title, set as
// text, which is the same rule Crosslink and sitemap.ts's BUILT already apply
// to unbuilt routes.
//
// DATES ARE ISO. The rest of the repository writes "April 2, 2026", which
// cannot be sorted or handed to <time dateTime> or to JSON-LD without being
// re-parsed each time. The model stores the machine form and formats for
// display, so the string on screen and the string in the schema can never
// disagree.

import { posts } from "@/content/insights/posts";

/* ------------------------------------------------------------------ inline */

/** Rich text, as data rather than as an HTML string.
 *
 *  WHY NOT HTML. A migrated article is somebody else's markup: rendering it
 *  through dangerouslySetInnerHTML puts their <script>, their inline styles and
 *  their class names inside our page, and there is no way to restyle a <table>
 *  we did not emit. Inline nodes are typed, so the renderer decides how a link
 *  or a bold run looks, the migration is a pure transform, and nothing arrives
 *  that ArticleBody has not agreed to draw. */
export type Inline =
  | string
  | { b: Inline[] }
  | { i: Inline[] }
  | { code: string }
  | { a: string; children: Inline[] };

/* ------------------------------------------------------------------ blocks */

/** One bullet, which may carry a nested list of its own.
 *
 *  ONE LEVEL OF NESTING, AND IT IS NOT DECORATION. A single migrated post
 *  ("On Page SEO Checker") uses ten labelled bullets that each carry three
 *  sub-points — "Content:" over three things to do about content. Flattening
 *  that into the parent bullet ran the label and the sub-points together into
 *  one sentence and, without a separator, concatenated words across the
 *  boundary: "keywordsExpand". So the structure is carried rather than
 *  discarded. Two levels is the limit: nothing in the archive goes deeper, and
 *  a third level of bullets is a sign the prose should have been a table. */
export type ListItem = {
  text: Inline[];
  items?: Inline[][];
};

export type Figure = {
  src: string;
  alt: string;
  /** Intrinsic pixel size. Reserves the box so a late image shifts nothing. */
  w: number;
  h: number;
  caption?: Inline[];
  /** Breaks out past the reading measure, up to the container. For a diagram
   *  or a wide screenshot that is unreadable at 68ch. */
  bleed?: boolean;
};

/** Everything the renderer can draw. A migration that meets something not in
 *  this union has to extend it here, which is the point: the article template
 *  never has to guess. */
export type Block =
  /** The opening paragraph, set one step up. At most one per article. */
  | { type: "lead"; text: Inline[] }
  | { type: "p"; text: Inline[] }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: ListItem[] }
  | { type: "ol"; items: ListItem[] }
  | { type: "quote"; text: Inline[]; cite?: string }
  | { type: "figure"; figure: Figure }
  | { type: "table"; head: string[]; rows: Inline[][][]; caption?: string }
  | { type: "code"; code: string; lang?: string }
  /** An aside the reader may skip without losing the argument. */
  | { type: "callout"; title?: string; text: Inline[] }
  | { type: "hr" }
  | { type: "embed"; provider: "youtube" | "vimeo"; id: string; title: string };

/* ------------------------------------------------------------------- notes */

export type Author = {
  name: string;
  /** Only where the source states one. Never inferred from a name. */
  role?: string;
};

export type Note = {
  slug: string;
  title: string;
  /** The source's own standfirst. Absent where it publishes none — the card
   *  and the article hero both simply omit it rather than quoting the first
   *  sentence of the body back at the reader. */
  excerpt?: string;
  /** The topic shown on the page and used by the filter rail.
   *
   *  ASSIGNED, NOT MIGRATED, and that is why `sourceCategory` exists beside
   *  it. The live blog files all seventy-two posts under one category, "News",
   *  which cannot drive a filter, so each post's topic was read off its own
   *  title and subject and named after the ENH service pillar it belongs to.
   *  Keeping the source's own value next to it means the substitution is
   *  visible in the content rather than buried in a migration script. */
  category: string;
  /** What the source filed the post under. Informational: nothing renders it.
   *  It is here so any assigned topic can be checked against the original. */
  sourceCategory?: string;
  tags?: string[];
  author?: Author;
  /** ISO 8601, YYYY-MM-DD. */
  date: string;
  /** ISO 8601. Emitted as dateModified where the source records an edit. */
  updated?: string;
  hero?: Figure;
  /** The listing image. Falls back to `hero`, then to a drawn plate. */
  thumb?: Figure;
  /** Empty until the article is migrated. See the header of this file. */
  body: Block[];
  /** Slugs, in the order they should be offered. Where absent, RelatedNotes
   *  derives its own set from the category and the date. */
  related?: string[];
  /** Where the content was migrated from, so any line on the page can be
   *  checked against its source. */
  source?: string;
};

/** THE ARCHIVE.
 *
 *  Imported rather than written here: see src/content/insights/posts.ts. */
export const notes: Note[] = posts;

/* ----------------------------------------------------------------- helpers */

/** A note is readable only if there is something to read.
 *
 *  Every "is this a link" decision on both pages routes through here, so there
 *  is exactly one answer to it and a half-migrated note cannot be a link on
 *  the listing and a 404 in the router. */
export function hasBody(note: Note): boolean {
  return note.body.length > 0;
}

/** Newest first, and the only ordering either page uses. */
export function all(): Note[] {
  return [...notes].sort((a, b) => b.date.localeCompare(a.date));
}

/** The notes that answer a URL. Empty until the migration lands. */
export function published(): Note[] {
  return all().filter(hasBody);
}

export function bySlug(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}

/** Topics in the archive, most-used first, then alphabetically so the rail
 *  does not reorder itself when two topics draw level. */
export function topics(list: Note[] = all()): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const n of list) counts.set(n.category, (counts.get(n.category) ?? 0) + 1);
  return [...counts]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/** Notes grouped by calendar year, newest year first — the register's spine. */
export function byYear(list: Note[]): { year: string; notes: Note[] }[] {
  const groups = new Map<string, Note[]>();
  for (const n of [...list].sort((a, b) => b.date.localeCompare(a.date))) {
    const year = n.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), n]);
  }
  return [...groups].map(([year, notes]) => ({ year, notes }));
}

/** "2 April 2026". Fixed to en-GB and UTC on purpose: Intl formats in the
 *  runtime's own locale and zone otherwise, so the same note rendered on the
 *  server and re-rendered in a browser five hours west printed two different
 *  dates and React threw the island away as a hydration mismatch. */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
}

/** "Apr 2026", for the route's axis where the full date will not fit. */
export function formatMonth(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** The aspect ratio to give a frame that must show a note's picture WHOLE.
 *
 *  WHY EVERY FRAME ASKS THIS INSTEAD OF FIXING ITS OWN RATIO. Every hero the
 *  live blog publishes is a square social title card with the article's
 *  headline set into it as artwork. `object-cover` in a landscape frame scales
 *  such an image to the frame's width and then crops the overflow off the top
 *  and bottom — which on a title card cuts through the words. There is no safe
 *  fixed ratio for artwork with text in it: the only safe frame is the
 *  picture's own. Used by the register card, the read-next lead and the
 *  article header.
 *
 *  So a frame sizes itself to the picture and crops nothing. Returns undefined
 *  where there is no picture, and the caller keeps its own ratio — which is
 *  what the drawn NotePlate wants, since it is drawn to fill whatever box it
 *  is given.
 *
 *  A future post carrying real landscape photography gets a landscape frame
 *  from the same rule, with no code change. */
export function mediaAspect(note: Note): string | undefined {
  const figure = note.thumb ?? note.hero;
  return figure ? `${figure.w} / ${figure.h}` : undefined;
}

/** The picture's width over its height, or undefined where there is none. */
export function mediaRatio(note: Note): number | undefined {
  const figure = note.thumb ?? note.hero;
  return figure ? figure.w / figure.h : undefined;
}

/* ------------------------------------------------------------ reading time */

/** Words in an inline tree. */
function inlineWords(nodes: Inline[]): number {
  let n = 0;
  for (const node of nodes) {
    if (typeof node === "string") n += node.trim().split(/\s+/).filter(Boolean).length;
    else if ("b" in node) n += inlineWords(node.b);
    else if ("i" in node) n += inlineWords(node.i);
    else if ("a" in node) n += inlineWords(node.children);
    else n += 1;
  }
  return n;
}

/** Words in the article body. Headings count; captions, code and table cells
 *  do not, because none of them is read at prose speed. */
function bodyWords(body: Block[]): number {
  let n = 0;
  for (const b of body) {
    switch (b.type) {
      case "lead":
      case "p":
      case "quote":
      case "callout":
        n += inlineWords(b.text);
        break;
      case "h2":
      case "h3":
        n += b.text.trim().split(/\s+/).filter(Boolean).length;
        break;
      case "ul":
      case "ol":
        n += b.items.reduce(
          (sum, item) =>
            sum +
            inlineWords(item.text) +
            (item.items?.reduce((k, sub) => k + inlineWords(sub), 0) ?? 0),
          0,
        );
        break;
      default:
        break;
    }
  }
  return n;
}

/** WORDS PER MINUTE. 220 is the middle of the range measured for adult silent
 *  reading of non-technical prose, and it is a rounded figure on purpose: the
 *  output is a minute count, so a tighter constant would imply a precision the
 *  method does not have. */
const WPM = 220;

/** Minutes, or undefined where there is no body to count. Never a guess: an
 *  unmigrated note shows no reading time at all rather than a plausible one. */
export function readingMinutes(note: Note): number | undefined {
  const words = bodyWords(note.body);
  return words === 0 ? undefined : Math.max(1, Math.round(words / WPM));
}

/** "6 min read", or undefined. */
export function readingTime(note: Note): string | undefined {
  const m = readingMinutes(note);
  return m === undefined ? undefined : `${m} min read`;
}

/* -------------------------------------------------------------- navigation */

/** The h2s of an article, as a table of contents.
 *
 *  h3s are deliberately left out. A two-level contents list on a rail 14rem
 *  wide wraps every child entry to three lines, and the value of the rail is
 *  that the whole article is visible in it at once. */
export function outline(note: Note): { id: string; text: string }[] {
  return note.body
    .filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: headingId(b.text), text: b.text }));
}

/** A heading's anchor. Derived from the text rather than authored, so a
 *  contents entry and the heading it points at cannot drift apart. */
export function headingId(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") || "section"
  );
}

/** What to offer at the end of an article.
 *
 *  Explicit `related` first, in the order given. Then same-topic notes, newest
 *  first, then the rest — so the set is always full where the archive can fill
 *  it, and every entry is a real relation rather than a random pick. */
export function relatedTo(note: Note, count = 3): Note[] {
  const pool = all().filter((n) => n.slug !== note.slug);
  const named = (note.related ?? [])
    .map((slug) => pool.find((n) => n.slug === slug))
    .filter((n): n is Note => Boolean(n));
  const sameTopic = pool.filter((n) => n.category === note.category && !named.includes(n));
  const rest = pool.filter((n) => !named.includes(n) && !sameTopic.includes(n));
  return [...named, ...sameTopic, ...rest].slice(0, count);
}

/* ------------------------------------------------------------------ search */

/** THE SEARCH FIELD APPEARS ONLY WHEN IT EARNS ITS PLACE.
 *
 *  A search box over an archive the reader can already see in full is a
 *  control that cannot do anything the eye has not done, and it is the first
 *  thing that makes an editorial page read as a dashboard. Twelve is the point
 *  at which the register runs past a laptop fold on its own. */
export const SEARCH_THRESHOLD = 12;

/** Title, excerpt, topic and tags. Not the body: matching text a reader cannot
 *  see on the card produces results that look like mistakes. */
export function matches(note: Note, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [note.title, note.excerpt ?? "", note.category, ...(note.tags ?? [])]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

/* --------------------------------------------------------------- page copy */

// EVERYTHING BELOW IS PAGE FURNITURE, NOT ARTICLE CONTENT. Headings, labels
// and the closing ask: the words that describe the archive rather than words
// taken from inside it. Nothing here claims anything about a note.
//
// "Field notes from the climb" is not new. It is the heading the homepage's
// Insights section has carried since V3 was written, and this page is that
// section's destination, so the reader arrives at the phrase they clicked.

export const meta = {
  title: "Insights | ENH Marketing, Dubai",
  description:
    "Field notes from fifteen years of digital marketing in the UAE — SEO, paid media, AI and the strategy behind them, from the ENH Marketing team in Dubai.",
  ogTitle: "Insights — ENH Marketing",
  ogDescription:
    "The ENH archive: what we have learned building search, paid media and AI systems for brands across the UAE.",
};

export const masthead = {
  /** Solid / brand, matching every section heading on the site. The hero
   *  three-line tri-tone belongs to the service pages; this page is an archive
   *  and its masthead sits one step below theirs. */
  title: "Field notes",
  strokeTitle: "from the climb.",
  /** One factual sentence about the archive. It describes the shape of the
   *  collection and makes no claim about any note in it. */
  sub: "What we have learned building search, paid media and AI systems for brands across the UAE — written down as we go, newest first.",
  /** The route's own caption. Two labels, which is inside the three the design
   *  rules allow a drawing. */
  routeLabel: "The record",
  routeHint: "Every note, in the order it was written",
};

export const register = {
  index: "01",
  title: "The register",
  strokeTitle: "by year.",
  lede: "The whole archive, grouped by the year each note was written.",
  /** The topic rail's label. Named for what the chips actually are — the topic
   *  each note was filed under — rather than for a taxonomy we do not have. */
  topicLabel: "Filed under",
  allLabel: "Everything",
  searchLabel: "Search the archive",
};

export const related = {
  index: "01",
  title: "Read",
  strokeTitle: "next.",
};

/** The closing ask, in the shape CtaBand takes on every other page. */
export const finalCta = {
  index: "02",
  title: "Bring us",
  strokeTitle: "a problem.",
  body: "Reading about it is the easy half. If any of this is a live question for your brand, put it in front of the team that wrote it and we will tell you what we would actually do.",
  note: "No deck, no discovery fee. One conversation, and a straight answer about whether we are the right agency for it.",
  submitLabel: "Start the conversation",
  whatsappLabel: "Message us on WhatsApp",
};

/** The enquiry form's fields, matching the set the contact page uses. */
export const formFields = [
  { id: "name", label: "Your name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  {
    id: "message",
    label: "What are you trying to solve?",
    textarea: true,
    wide: true,
    required: true,
  },
];
