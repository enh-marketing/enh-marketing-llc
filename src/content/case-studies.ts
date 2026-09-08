// Case studies — the content model for /case-studies and /case-studies/[slug].
//
// THE STUDIES THEMSELVES live one file per client in src/content/case-studies/,
// collected by src/content/case-studies/studies.ts. Same convention as
// src/content/insights and src/content/services.
//
// NOTHING IN A MIGRATED STUDY IS INVENTED. Each was converted from its live
// enhmedia.com/case-studies page: the title is that page's <h1>, the four
// figures are its counter strip, and the four sections are its COMPANY
// PROFILE, challenges, Approach and Outcome rich text. Every study carries a
// `source` URL so any sentence on the page can be checked against the page it
// came from, and scripts/migrate-case-studies/verify.py compares the two word
// for word.
//
// NO FIGURE EXISTS THAT THE SOURCE DOES NOT PUBLISH. Not a total, not an
// average, not a "clients served" count derived from the archive length. The
// one number this file computes is `rankingCount()`, which counts studies
// rather than results, is checkable by eye against the cards, and is the
// sentence the archive's own interlude is built from.
//
// THE ORDER IS THE SOURCE'S ORDER. The live index lists these twenty-two in a
// deliberate sequence and `order` preserves it. It is also the only reason the
// page can call one of them the lead story without inventing a ranking: the
// lead is whichever study the agency itself puts first.

import { studies as migrated } from "@/content/case-studies/studies";

/* ------------------------------------------------------------------ inline */

/** Rich text as data rather than as an HTML string, for the same reason
 *  src/content/insights.ts does it: a migrated page is somebody else's markup,
 *  and rendering it through dangerouslySetInnerHTML puts their classes and
 *  their inline styles inside ours. The union is smaller than the archive's
 *  because these twenty-two pages use less: bold, italic and links, and
 *  nothing else. */
export type Inline =
  | string
  | { b: Inline[] }
  | { i: Inline[] }
  | { a: string; children: Inline[] };

/** Everything a study's prose can contain. A migration that meets something
 *  outside this union extends it here rather than guessing at render time. */
export type Block =
  | { type: "p"; text: Inline[] }
  /** A named step inside Approach. Only Healthy Farm publishes these today. */
  | { type: "h3"; text: string }
  | { type: "ul"; items: Inline[][] };

/* ------------------------------------------------------------------ pieces */

export type Figure = {
  src: string;
  /** A half-width file for the same picture, offered through srcset. */
  small?: string;
  /** The full-resolution file, where one is worth opening. Only the results
   *  sheets have one: they carry twenty-odd figures of their own and are not
   *  readable at the width the page shows them at. */
  full?: string;
  alt: string;
  /** Intrinsic pixel size of `src`. Reserves the box so nothing shifts. */
  w: number;
  h: number;
};

/** One published figure. `value` is printed exactly as the source writes it,
 *  including the "#", the "+", the "×" and the en dash in "60–70". These are
 *  strings, never numbers: a count-up animation on "#1" or "1.8K" would have
 *  to parse and re-format them, and would get them wrong. */
export type Metric = { value: string; label: string };

/** The ENH service lines these studies name. Not a taxonomy invented for this
 *  page: every label and every href below is the site's own. */
export type ServiceKey = "seo" | "local" | "content" | "performance" | "social" | "web";

export const SERVICES: Record<ServiceKey, { label: string; href: string }> = {
  seo: { label: "SEO", href: "/services/seo" },
  local: { label: "Local SEO", href: "/services/seo/local-seo-services" },
  content: { label: "SEO Content", href: "/services/seo/seo-content-creation" },
  performance: { label: "Performance Marketing", href: "/services/performance-marketing" },
  social: { label: "Social Media", href: "/services/social-media-marketing" },
  web: { label: "Web Design & Development", href: "/services/web-design-development" },
};

/** A service tag and the sentence in the study that names it.
 *
 *  THE EVIDENCE IS NOT DECORATION. It is what stops this from being a list of
 *  capabilities pasted onto every project: a study that describes a website
 *  rebuild and nothing else carries one tag, because one is what its own copy
 *  supports. The migration verifier fails if an evidence string is not a
 *  verbatim substring of the study it sits in. */
export type Mention = { key: ServiceKey; evidence: string };

export type Study = {
  slug: string;
  /** The company's own name, from the first sentence of its profile. */
  client: string;
  /** The live page's <h1>. */
  title: string;
  /** Assigned, not published. See `sectorEvidence`. */
  sector: string;
  /** The phrase in this study's own profile the sector was read from, printed
   *  wherever the sector is, so the label can be checked against the sentence. */
  sectorEvidence: string;
  /** Position on the live index, which is the agency's own sequence. */
  order: number;
  metrics: Metric[];
  services: Mention[];
  profile: Block[];
  challenge: Block[];
  approach: Block[];
  outcome: Block[];
  thumb: Figure;
  /** The one-page results graphic the live page publishes. Twenty-one of the
   *  twenty-two have one; AllDay's slot holds a placeholder file upstream, so
   *  it has none here rather than a stand-in. */
  sheet?: Figure;
  /** The client's own site, taken from the frame the live page embeds. */
  projectUrl?: string;
  /** Set where the live page publishes its challenge and approach in each
   *  other's slots. Both are migrated verbatim into the roles their sentences
   *  describe; this records that the swap happened. */
  sourceSectionsSwapped?: boolean;
  source: string;
};

/* ----------------------------------------------------------------- archive */

export const studies: Study[] = migrated;

/* ----------------------------------------------------------------- helpers */

/** A study is readable only where there is something to read. The same gate
 *  `hasBody` is for a note: it decides whether a card is a link, and
 *  [slug].astro builds a route for exactly the set it returns, so a
 *  half-migrated study can never be a link on the index and a 404 in the
 *  router. */
export function hasStory(study: Study): boolean {
  return study.challenge.length > 0 || study.approach.length > 0 || study.outcome.length > 0;
}

/** All of them, in the source's order. */
export function all(): Study[] {
  return [...studies].sort((a, b) => a.order - b.order);
}

export function published(): Study[] {
  return all().filter(hasStory);
}

export function bySlug(slug: string): Study | undefined {
  return studies.find((s) => s.slug === slug);
}

/** The study the live index leads with. This is the only definition of
 *  "featured" on the page, and it belongs to the agency rather than to us. */
export function lead(): Study | undefined {
  return all()[0];
}

/** Sectors present, largest first, then alphabetically so two sectors of the
 *  same size do not swap places between renders. */
export function sectors(list: Study[] = all()): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const s of list) counts.set(s.sector, (counts.get(s.sector) ?? 0) + 1);
  return [...counts]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/** The study before and after this one, wrapping at the ends.
 *
 *  Wrapping is deliberate. The archive is a fixed set the reader is being
 *  invited to walk, not a dated feed with a first and last entry, so the
 *  twenty-second study offering the first back is a continuation rather than a
 *  dead end. */
export function neighbours(study: Study): { prev: Study; next: Study } {
  const list = published();
  const i = list.findIndex((s) => s.slug === study.slug);
  const at = (n: number) => list[(n + list.length) % list.length];
  return { prev: at(i - 1), next: at(i + 1) };
}

/** What to offer at the end of a study: the same sector first, then the rest
 *  in the source's order, so the set is always full and every entry is a real
 *  relation rather than a random pick. */
export function relatedTo(study: Study, count = 2): Study[] {
  const pool = published().filter((s) => s.slug !== study.slug);
  const sameSector = pool.filter((s) => s.sector === study.sector);
  const rest = pool.filter((s) => s.sector !== study.sector);
  return [...sameSector, ...rest].slice(0, count);
}

/** A figure the source writes as a search position rather than as a quantity:
 *  "#1". Used to sort the four figures on a card so the rank leads, and to
 *  count the studies the interlude is about. */
export function isRank(metric: Metric): boolean {
  return metric.value.trim().startsWith("#");
}

/** How many studies publish a #1 ranking among their figures.
 *
 *  COMPUTED, NEVER WRITTEN DOWN. It is the one number on the index that is not
 *  lifted from a single study, and it is countable by eye against the cards
 *  below it, which is the test every figure on this site has to pass. If a
 *  study is added or a figure is corrected, the sentence corrects itself. */
export function rankingCount(list: Study[] = all()): number {
  return list.filter((s) => s.metrics.some(isRank)).length;
}

/** The services a study names, resolved to their labels and pages. */
export function servicesOf(study: Study): { key: ServiceKey; label: string; href: string; evidence: string }[] {
  return study.services.map((m) => ({ key: m.key, ...SERVICES[m.key], evidence: m.evidence }));
}

/** The client's site, as a hostname. "https://www.saifeecomputers.com/" is a
 *  URL; "saifeecomputers.com" is what a reader wants printed. */
export function siteLabel(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

/** Plain text of an inline tree. For meta descriptions and JSON-LD, which
 *  cannot carry marks. */
export function plain(nodes: Inline[]): string {
  return nodes
    .map((n) =>
      typeof n === "string" ? n : "b" in n ? plain(n.b) : "i" in n ? plain(n.i) : plain(n.children),
    )
    .join("");
}

/** The study's first paragraph as plain text. */
function firstParagraph(blocks: Block[]): string {
  const p = blocks.find((b) => b.type === "p");
  return p && p.type === "p" ? plain(p.text) : "";
}

/** THE PAGE DESCRIPTION, DERIVED RATHER THAN COPIED.
 *
 *  The live pages set their meta description to the same string as their
 *  title, which search engines treat as no description at all. So the
 *  description here is the study's title followed by the opening of its own
 *  COMPANY PROFILE, cut at a word boundary. Every word still comes from the
 *  page; only the joining is ours. */
export function describe(study: Study, limit = 155): string {
  const opener = firstParagraph(study.profile);
  const text = opener ? `${study.title}. ${opener}` : study.title;
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/* --------------------------------------------------------------- page copy */

// EVERYTHING BELOW IS PAGE FURNITURE, NOT CLIENT CONTENT: the headings and
// labels that describe the collection rather than words taken from inside it.
// Nothing here makes a claim about any client, and no sentence here contains a
// figure.

export const meta = {
  title: "Case Studies | ENH Marketing, Dubai",
  description:
    "Twenty-two client engagements from ENH Marketing in Dubai, each with the figures the work actually produced. Search, local, paid media and websites across industrial supply, IT, retail, healthcare and more.",
  ogTitle: "Case Studies — ENH Marketing",
  ogDescription:
    "The work, with its numbers attached: twenty-two ENH client engagements across the UAE, each recorded as the brief, the approach and what changed.",
};

export const masthead = {
  /** Solid / stroked / brand, the site's hero tri-tone. Not "Case Studies",
   *  which is the label in the menu the reader just clicked. What these
   *  twenty-two have in common is that each one ends in a figure somebody can
   *  check, so the headline is that. */
  lines: ["The Work", "And What", "It Moved"] as [string, string, string],
  sub: "Twenty-two engagements, in the order we would show them to you. Each one carries the figures its own reporting produced, the brief it started from, and the client's name against it.",
  primary: "Start a project",
  secondary: "Talk to our experts",
  /** The field's caption. Two labels, inside the three a drawing may carry. */
  fieldLabel: "Who the work was for",
  fieldHint: "Choose a sector to filter the archive",
};

export const leadStory = {
  index: "01",
  title: "The one",
  strokeTitle: "we lead with.",
  /** Factual: it says where the position comes from rather than claiming the
   *  study is the best. The archive below runs in that same published order,
   *  which is the only thing that makes this study the lead. */
  note: "The engagement our own index opens with. Everything below runs in that same order.",
};

export const archive = {
  index: "02",
  title: "Every",
  strokeTitle: "engagement.",
  lede: "All twenty-two, newest work first. Each card carries the four figures its case study publishes, and nothing that it does not.",
  sectorLabel: "Sector",
  allLabel: "Everything",
  emptyLabel: "Nothing in the archive under that yet.",
  resetLabel: "Show everything",
};

/** The interlude that breaks the archive in two. Its number is computed from
 *  the studies rather than written here: see `rankingCount`. */
export const interlude = {
  /** Reads on from the numeral beside it, which is why it starts lower case
   *  and carries no count of its own: "7 of 22 engagements" / "report a #1
   *  position for a term their buyers actually search." Writing the number
   *  into the sentence as well would be the same fact twice, and the written
   *  one would be the one that goes stale. */
  lead: "report a",
  figure: "#1",
  trail: "position for a term their buyers actually search.",
  note: "The rest report what the ranking was for: users, enquiries, calls, installs, orders. The figures on every card are the ones that client's own reporting produced.",
};

export const study = {
  briefLabel: "The brief",
  challengeLabel: "The challenge",
  approachLabel: "What we did",
  outcomeLabel: "What changed",
  sheetLabel: "The results sheet",
  sheetHint: "Open at full size",
  metricsLabel: "Published figures",
  servicesLabel: "Services on this engagement",
  evidenceLabel: "Named in this case study as",
  siteLabel: "Client site",
  sourceLabel: "Migrated from",
  navPrev: "Previous",
  navNext: "Next",
  relatedIndex: "03",
  relatedTitle: "More",
  relatedStroke: "of the work.",
};

/** The closing ask, in the shape CtaBand takes on every other page. */
export const finalCta = {
  index: "04",
  title: "Bring us",
  strokeTitle: "the next one.",
  body: "Every one of these started as a conversation about a number somebody was unhappy with. If you have one of those, put it in front of the team that did this work and we will tell you what we would actually do about it.",
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
    label: "What are you trying to move?",
    textarea: true,
    wide: true,
    required: true,
  },
];
