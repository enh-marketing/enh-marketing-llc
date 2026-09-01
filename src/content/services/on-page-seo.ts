// On-Page SEO — page content.
// Copy source: "On-Page SEO.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// FIGURES. The document gives exactly one: a page sitting at position
// fourteen. It is used once, in the hero drawing, at that value. It gives no
// timeframes beyond "a few weeks" for small sites and "longer" for large ones,
// and it explicitly refuses to promise a position by a date — so nothing on
// this page draws a ranking improving.
//
// The document references a keyword research page and an SEO content creation
// page. Both routes are in the sitemap but neither is built, so those phrases
// are carried as plain text and nothing links to them.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "On-Page SEO Services in Dubai | ENH Marketing",
  description:
    "Strengthen existing pages with clearer titles, headings, content structure, internal links and schema, guided by a page-by-page action plan.",
};

export const hero = {
  lines: ["On-Page SEO", "Services", "in Dubai"] as [string, string, string],
  sub: "Strengthen existing pages with clearer titles, headings, content structure, internal links and schema, guided by a page-by-page action plan.",
  primary: "Get a Free SEO Consultation",
  secondary: "Talk to an SEO Expert",
};

/** The opening is a small case study: a page nobody looks at, and the three
 *  ordinary faults behind it. */
export const narrative = {
  heading: ["The Search Signals", "Already Within Your Control"] as [string, string],
  scene:
    "A page sits at position fourteen for a term worth having. Nobody looks at it for a year.",
  sceneEmphasis: "position fourteen",
  /** The one figure the document gives. */
  position: "fourteen",
  // Reconstruction: faultsLead + " " + faults[0] + ", " + faults[1] + ", and "
  // + faults[2] + "."
  faultsLead: "The fix turns out to be",
  faults: [
    "a heading that describes nothing",
    "a title tag written for the CMS rather than a human",
    "three paragraphs of introduction before the page says what the company actually does",
  ],
  agency:
    "ENH Marketing handles on-page SEO for UAE businesses: the titles, headings, content structure, internal links and markup that tell a search engine what a page is about. As a Dubai digital marketing agency, we usually find the same handful of problems, and most of them are fixable in an afternoon once someone has actually looked.",
  closing:
    "You get a page-by-page list of what to change, and the changes made if you want us to make them.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type Part = { what: string; control?: string };

/** Search visibility in three parts, one of which needs nobody's permission. */
export const control = {
  title: "The Part of SEO",
  strokeTitle: "You Control Completely",
  lead: "Search visibility splits roughly into three.",
  // Reconstruction: lead + " " + parts[0].what + ", " + parts[0].control + ". "
  // + parts[1].what + ", " + parts[1].control + ". " + parts[2].what + "."
  parts: [
    { what: "What other sites say about you", control: "which you influence slowly" },
    { what: "How your site is built", control: "which needs developer time" },
    { what: "And what is on the page itself" },
  ] as Part[],
  yours: "The third one is entirely yours.",
  // Reconstruction: nos[0] + ", " + nos[1] + ", " + nos[2] + "."
  nos: [
    "No permission needed",
    "no waiting for someone else to link to you",
    "no infrastructure project",
  ],
  neglect:
    "It is also the part most often left alone for years, because nothing visibly breaks when a title tag is wrong.",
};

/** Drift. Five small events, none of them dramatic, which is the point. */
export const drift = {
  title: "Where Pages Lose",
  strokeTitle: "Rankings They Already Had",
  notOne: "Sites rarely fall because of one dramatic thing.",
  they: "They drift.",
  events: [
    "A redesign changes headings, and nobody checks the old ones.",
    "Two pages get written about the same topic and start competing with each other.",
    "A CMS update strips the schema.",
    "Someone adds a category page that duplicates an existing one.",
    "A product gets renamed everywhere except in the title tag.",
  ],
  closing:
    "Fixing drift is usually faster and cheaper than chasing new rankings, which is why we start there.",
};

/** Two literal strings for the same service. The document supplies both. */
export const words = {
  title: "Words Your Customer",
  strokeTitle: "Would Actually Use",
  tension: "Search terms and marketing language pull in different directions.",
  internalLead: "Internally, a service becomes",
  internal: "integrated facilities solutions",
  searcherLead: "The person searching types",
  searcher: "office cleaning company Dubai",
  // Reconstruction: usageLead + " " + placements[0] + ", " + placements[1]
  // + ", and " + placements[2] + ", " + usageTail
  usageLead: "On-page work uses the second one, in",
  placements: ["the title", "the heading", "the first sentence"],
  usageTail: "without turning the page into a keyword list.",
  /** Both referenced pages are unbuilt, so this stays prose. */
  related:
    "If you need the underlying research first, that sits with keyword research. If the pages need writing rather than improving, that is SEO content creation.",
  wider:
    "These improvements can also support wider digital marketing services by giving paid campaigns, content and AI-search work clearer and more useful destination pages.",
};

export type Stage = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** What this stage does to the set of pages. Presentation only: the drawing
   *  needs to know whether a stage filters, merges, rewrites, ships or watches.
   *  The document names no such categories; these are how each stage's own
   *  sentence is drawn. */
  act: "select" | "merge" | "rewrite" | "ship" | "watch";
};

/** Five stages, written "Stage N. Title. Body" in the source. */
export const process = {
  title: "How We Work",
  strokeTitle: "Through a Site",
  items: [
    {
      no: "01",
      title: "Find the pages worth the effort.",
      act: "select",
      glyph: "index",
      body: "Not every page deserves attention. We start with the ones already getting impressions and no clicks, because those are closest to paying out.",
    },
    {
      no: "02",
      title: "Fix what is competing.",
      act: "merge",
      glyph: "fanout",
      body: "Two pages after the same term is a common and quiet problem. One gets strengthened, the other gets merged or pointed elsewhere.",
    },
    {
      no: "03",
      title: "Rewrite the signals.",
      act: "rewrite",
      glyph: "text",
      body: "Titles, headings, opening paragraphs, internal links and schema, page by page, with the reasoning recorded so your team can carry on the same way.",
    },
    {
      no: "04",
      title: "Implement.",
      act: "ship",
      glyph: "structure",
      body: "In your CMS by us, or handed over as a list your developer can work through.",
    },
    {
      no: "05",
      title: "Watch and adjust.",
      act: "watch",
      glyph: "reporting",
      body: "Impressions and average position move first, usually well before traffic does.",
    },
  ] as Stage[],
};

/** Timing, and the promise the document refuses to make. */
export const timing = {
  title: "What Changes",
  strokeTitle: "and When You See It",
  notInstant: "Nothing here is instant.",
  recrawl:
    "Google has to recrawl before a change counts, and how long that takes depends on how often your site gets visited.",
  small: "Small sites often see movement within a few weeks.",
  large: "Larger sites take longer, because the crawl works through in stages.",
  refusal:
    "Anyone promising you a specific position by a specific date is selling something they cannot control.",
  // Reconstruction: canTellLead + " " + canTell[0] + ", " + canTell[1] + ", and "
  // + canTell[2] + "."
  canTellLead: "What we can tell you is",
  canTell: ["which pages moved", "in which direction", "what we changed to cause it"],
};

/** Five qualifying situations. Any one of them is enough, unlike the
 *  all-three gates on other pages, so nothing here implies a conjunction. */
export const benefit = {
  title: "Sites That",
  strokeTitle: "Benefit Most",
  items: [
    {
      text: "Sites with plenty of pages getting impressions and almost no clicks",
    },
    {
      text: "Businesses that redesigned recently and lost traffic afterwards",
    },
    {
      text: "Ecommerce catalogues where product and category pages were auto-generated",
    },
    {
      text: "Service companies with one page trying to rank for six different services",
    },
    {
      text: "Anyone who has never had page titles written deliberately",
    },
  ],
};

export type Promise_ = { title: string; body: string };

/** Four undertakings. The last is a refusal. */
export const deliver = {
  title: "What You Get",
  strokeTitle: "From Us",
  items: [
    {
      title: "A list, not a lecture.",
      body: "Page by page, what to change and why, in priority order.",
    },
    {
      title: "The reasoning written down.",
      body: "So your team can apply the same thinking to new pages without calling us.",
    },
    {
      title: "Changes made, if you want them made.",
      body: "We can work in your CMS or hand the list to your developer.",
    },
    {
      title: "No keyword stuffing.",
      body: "Pages that read badly to humans eventually stop working for machines too.",
    },
  ] as Promise_[],
  cta: "Request a Quote",
};

export const faqs: Faq[] = [
  {
    q: "What is on-page SEO?",
    a: "Everything on the page itself that helps search engines understand it: title tag, headings, content, internal links, image attributes, URL and schema markup. It sits apart from technical SEO, which covers how the site is built, and off-page SEO, which covers links from elsewhere.",
  },
  {
    q: "How is this different from an SEO audit?",
    a: "An audit diagnoses the whole site and hands you a prioritised list. On-page work is the doing. Many clients start with an audit, then have us implement the on-page portion of it.",
  },
  {
    q: "Do meta descriptions affect rankings?",
    a: "Not directly. They affect whether someone clicks your result instead of the one above it, which matters plenty. Left blank, Google writes its own from text on the page, and it often picks badly.",
  },
  {
    q: "How many keywords should a page target?",
    a: "One main topic, plus the natural variations people actually type. Pages built around six unrelated terms tend to rank for none of them properly.",
  },
  {
    q: "Will you change our page copy?",
    a: "Only with approval, and we show you before and after. Sometimes restructuring the existing words is enough, which is faster and cheaper than a rewrite.",
  },
  {
    q: "How long before we see results?",
    a: "Google has to recrawl before a change counts. Small sites often move within weeks; larger ones take longer. Impressions and average position usually shift before traffic does.",
  },
  {
    q: "Can you work in our CMS?",
    a: "Yes, for most common platforms. If access is restricted, we deliver a change list your developer can implement, written so it needs no interpretation.",
  },
];

export const finalCta = {
  title: "Send Us a Page, and We Will",
  strokeTitle: "Tell You What Is Wrong With It",
  body: "Pick a page that should be performing better than it is. Send us the link.",
  note: "You will get a straight read on what is holding it back, whether or not you hire us for the fix.",
};

/** Form fields. The document asks for a page link and nothing else, so the
 *  page link is the field that matters here. */
export const formFields = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "page", label: "The page you want us to read", wide: true },
  { id: "term", label: "The term it should be performing for" },
  { id: "cms", label: "Your CMS" },
  { id: "referral", label: "How did you hear about us?", wide: true },
];

/** Mid-page CTA band. Supplied under "On-Page SEO Services Page CTA". Stored in
 *  sentence case; the band uppercases it. */
export const growthCta = {
  heading: ["Ready to make your", "website rank higher?"] as [string, string],
  support:
    "Optimise Your Website Content, Improve Search Visibility & Create a Stronger SEO Foundation That Drives Organic Traffic",
  button: "Get a Free On-Page SEO Audit",
};
