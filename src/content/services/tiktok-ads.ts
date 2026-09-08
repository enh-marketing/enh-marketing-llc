// TikTok Ads: page content.
// Copy source: "TikTok Ads.docx" (client-supplied, 2026-09-07). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// THE PAGE HAS ONE ARGUMENT AND THE DOCUMENT MAKES IT IN FOUR WORDS: "The
// account is usually fine. What ran out was content." Every later section
// restates it — "creative volume rather than targeting is what determines
// whether campaigns work", "the constraint is usually creative supply rather
// than audience or targeting", "TikTok exhausts ads faster than other platforms",
// "this is the part that decides whether the account keeps working", and the
// disqualifier "anyone unable to sustain creative supply". So the drawings on
// this page are all about supply and depletion, not dashboards: a batch of
// creative running down in the hero, an account whose creative queue never
// stops feeding it, and a bed of ads that is refilled as it fatigues.
//
// FIGURES. The document's own, and only where it puts them: approximately 12.5
// million (FAQ 1), four to six weeks and the first fortnight (Stage 3, Stage 4,
// FAQ 8), three weeks of sign-off (a disqualifier), and 1 February 2026 for the
// Advertiser Permit. Nothing is rounded, restated or moved to another section,
// which is why the audience figure appears once, in the FAQ that gives it.
//
// UNRESOLVED IN THE SOURCE. The closing CTA reads "We will come back within
// [X] hours" — a placeholder the client has not filled in. As on the Snapchat
// page, the clause is dropped rather than invented or printed as a bracket, and
// the rest of the sentence is carried whole. Supply the figure and it goes back.
//
// THE GROWTH CTA BAND IS THE ONE PLACE THIS FILE IS NOT THE DOCUMENT. Every
// performance page carries that band, and on Meta, LinkedIn, YouTube, Snapchat
// and TikTok Marketing its copy was supplied by the client separately from the
// service document ("Supplied directly by the client on 2026-08-28 - this copy
// is NOT from the Meta Ads document"). No such line has been supplied for this
// page. The band is built to the house formula from the document's own claims
// and nothing else, and its button is the document's own mid-page CTA. See
// `growthCta` at the foot of this file: the heading and support line there are
// the only two strings on the page the client has not written, and they are
// meant to be replaced the moment the real CTA copy arrives.

import type { Faq } from "@/content/services/performance-marketing";

export const meta = {
  title: "TikTok Ads Agency in Dubai | Spark Ads & Creative Production | ENH Marketing",
  // Assembled from the document's own second paragraph.
  description:
    "ENH Marketing manages TikTok advertising for UAE brands. Campaign structure, creative production at the volume TikTok requires, Spark Ads, audience setup, pixel and Events API tracking, and reporting.",
};

export const hero = {
  // Split so no line wraps at 375px, as on the Snapchat and Google Ads pages.
  lines: ["TikTok Ads", "Agency", "in Dubai"] as [string, string, string],
  /** The document's opening, and the whole problem the page answers. */
  sub: "TikTok advertising tends to start well and then stall. The first few ads perform, the numbers look encouraging, and six weeks later the same creative is delivering a fraction of what it did.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

/** The opening. The document gives this stretch no heading, so the section
 *  carries none and the verdict is the heading. */
export const opening = {
  /** The two sentences the rest of the page is built on. */
  verdict: "The account is usually fine. What ran out was content.",
  verdictMark: "What ran out was content.",
  /** Who runs it. The seven things named here are the section below, which is
   *  how the document itself writes it, so nothing is marked in this sentence
   *  except the one clause that is the page's argument rather than a service. */
  agency:
    "ENH Marketing manages TikTok advertising for UAE brands. We handle campaign structure, creative production at the volume TikTok requires, Spark Ads through your own and creator accounts, audience setup, pixel and Events API tracking, and reporting.",
  agencyMark: "creative production at the volume TikTok requires",
  /** The claim the page rests on. The audience is described, not counted: the
   *  document's figure belongs to FAQ 1 and stays there. */
  claim:
    "TikTok has the largest adult advertising audience in the UAE, and creative volume rather than targeting is what determines whether campaigns work.",
  claimMark: "creative volume rather than targeting",
};

/** Where each sentence sits on the drawing of a running account. Presentation
 *  only: the document names no regions, these are where its own sentences are
 *  placed. See RunningAccount. */
export type RunRegion =
  | "structure"
  | "creative"
  | "spark"
  | "audience"
  | "tracking"
  | "catalogue"
  | "reporting";

export type RunItem = { no: string; region: RunRegion; body: string };

/** Seven bullets, each carried whole. The document gives them no headings, so
 *  none is written: the sentences are the legend and the drawing is labelled
 *  nowhere. */
export const run = {
  title: "What",
  strokeTitle: "We Run",
  items: [
    {
      no: "01",
      region: "structure",
      body: "Campaign structure and strategy built around your objective and conversion values.",
    },
    {
      no: "02",
      region: "creative",
      body: "Creative production at volume. In-feed video, Spark Ads and UGC-style variants, tested systematically.",
    },
    {
      no: "03",
      region: "spark",
      body: "Spark Ads through your account and creator accounts, with permissions handled.",
    },
    {
      no: "04",
      region: "audience",
      body: "Audience and placement setup, using TikTok's automation where it earns its place.",
    },
    {
      no: "05",
      region: "tracking",
      body: "Pixel and Events API tracking, server-side where possible.",
    },
    { no: "06", region: "catalogue", body: "Catalogue and commerce campaigns." },
    {
      no: "07",
      region: "reporting",
      body: "Reporting that reconciles TikTok's figures against your actual results.",
    },
  ] as RunItem[],
};

/** Which part of the post each of the three purchases contributes. Presentation
 *  only, and the coupling the section is built on: the document's three
 *  sentences are the legend and the drawing carries no labels of its own. */
export type SparkSource = { no: string; body: string };

export const spark = {
  title: "Spark Ads:",
  strokeTitle: "The Format Most Brands Miss",
  /** What one is. The three things it keeps are marked where they stand. */
  definition:
    "A Spark Ad runs as paid media through an organic account, either yours or a creator's, rather than from a brand ad account. It keeps the original handle, the comments and the engagement, so it reads as a post rather than an advertisement.",
  definitionMark: ["the original handle", "the comments", "the engagement"],
  /** Why the format matters here more than elsewhere. */
  why: "That matters more on TikTok than anywhere else, because the audience there is unusually quick to dismiss anything that looks like advertising.",
  whyMark: "unusually quick to dismiss anything that looks like advertising",
  /** The section's argument, and the three sentences that carry it. */
  connectsLead: "It also connects three things you may currently be buying separately.",
  sources: [
    { no: "01", body: "Organic content shows which videos work." },
    { no: "02", body: "Creator campaigns produce content with a third-party voice." },
    {
      no: "03",
      body: "Spark Ads put the winners behind budget without rebuilding them as ads.",
    },
  ] as SparkSource[],
  /** The conclusion, at display scale. */
  conclusion:
    "Content that already earned attention organically is nearly always the strongest paid creative you have.",
  conclusionMark: "already earned attention organically",
  /** The permit requirement. Kept inside this section because that is where the
   *  document puts it: it qualifies creator campaigns, not the whole page. */
  permit: {
    body: "If your campaign uses creator content, note that since 1 February 2026 creators publishing advertising content from within the UAE require an Advertiser Permit from the National Media Authority. We verify permit status before any creator campaign runs.",
    mark: "We verify permit status before any creator campaign runs.",
  },
};

export type Stage = { no: string; title: string; body: string };

/** Five stages. The document labels the first four "Stage 1" to "Stage 4" and
 *  the last "Ongoing", and that distinction is the point of the section, so the
 *  numerals are the document's own wording rather than 01 to 05. */
export const process = {
  title: "How TikTok Ads",
  strokeTitle: "Management Works",
  stages: [
    {
      no: "Stage 1",
      title: "Objective and tracking",
      body: "We agree what a conversion is worth, then set up the pixel and Events API to match before any budget goes out.",
    },
    {
      no: "Stage 2",
      title: "First creative batch",
      body: "Enough variants to test properly rather than enough to launch. Spark Ads set up where organic or creator content already exists.",
    },
    {
      no: "Stage 3",
      title: "Launch and learning",
      body: "Campaigns go live. Early figures move a great deal, and we would not read much into the first fortnight.",
    },
    {
      no: "Stage 4",
      title: "Weeks 2 to 6",
      body: "Creative testing cycles complete, budget moves toward what holds attention, and fatigued ads are replaced rather than left running.",
    },
    {
      no: "Ongoing",
      title: "Creative supply",
      body: "A steady production rhythm, because this is the part that decides whether the account keeps working.",
    },
  ] as Stage[],
};

export type Disqualifier = { title: string; body: string };

/** Four disqualifiers. Three are written as a label and its reason; the third is
 *  one sentence joined by a comma, split at that comma so the band's shape
 *  holds. Nothing is added and the sentence reconstructs. */
export const notFor = {
  title: "Who Should Not",
  strokeTitle: "Run TikTok Ads",
  items: [
    {
      title: "Businesses with nothing to show visually.",
      body: "TikTok is a demonstration medium.",
    },
    {
      title: "Organisations with slow creative approval.",
      body: "Where sign-off takes three weeks, the format tends to move faster than you can.",
    },
    {
      title: "Anyone unable to sustain creative supply.",
      body: "Whether through us or in-house.",
    },
    {
      title: "Very high-consideration B2B with narrow job-title targeting.",
      body: "LinkedIn does that better.",
    },
  ] as Disqualifier[],
};

export const faqs: Faq[] = [
  {
    q: "Do TikTok ads work for businesses in the UAE?",
    a: "Yes, for businesses that can show something on camera. TikTok has the largest adult advertising audience in the UAE at approximately 12.5 million, and media costs are typically lower than Meta's. The constraint is usually creative supply rather than audience or targeting.",
  },
  {
    q: "How much do TikTok ads cost in Dubai?",
    a: "Two costs: ad spend paid to TikTok, which you control, and our management fee. The variable most people underestimate is creative production, because TikTok exhausts ads faster than other platforms and campaigns need a steady supply of new ones. We model both before you commit.",
  },
  {
    q: "What is the minimum budget for TikTok ads?",
    a: "There is no platform minimum, but there is a practical one, because campaigns need enough conversion data to leave the learning phase. Budget also has to cover ongoing creative rather than media alone. If your total sits below what we consider workable, we will say so.",
  },
  {
    q: "What are Spark Ads?",
    a: "Ads that run through an organic TikTok account, yours or a creator's, keeping the original handle, comments and engagement. They read as posts rather than advertising and typically outperform brand-account ads. They are also how organic and creator content becomes paid media without being rebuilt.",
  },
  {
    q: "Do you produce the ad creative?",
    a: "Creative is the main performance variable on TikTok, and volume matters as much as quality. We produce native vertical video and UGC-style variants and test systematically. Repurposed brand films and polished commercials consistently underperform on this platform.",
  },
  {
    q: "TikTok Ads or Meta Ads?",
    a: "Different strengths. TikTok reaches more UAE adults, usually at lower media cost, and suits discovery and demonstration. Meta has deeper conversion tooling and formats such as click-to-WhatsApp. Many brands run both, producing once and cutting separately for each. See our Meta Ads page.",
    aLink: { label: "Meta Ads page", href: "/services/performance-marketing/meta-ads" },
  },
  {
    q: "Do we own the ad account?",
    a: "Our standard position is that you do. Campaigns run in your TikTok Ads Manager account, and the pixel, audiences and historical data stay with you if the engagement ends. Ask this of every agency and get the answer in writing.",
  },
  {
    q: "How long before TikTok ads produce results?",
    a: "Individual ads can reach scale within days. Reliable performance typically takes four to six weeks, as campaigns exit the learning phase and creative testing cycles complete. Stable returns inside the first fortnight would be a good run rather than something to plan around.",
  },
];

export const finalCta = {
  title: "Find Out Whether",
  strokeTitle: "TikTok Suits Your Brand",
  body: "Tell us what you sell, what you can put on camera, and how quickly your team can approve content.",
  /** The source reads "We will come back within [X] hours with a view..." — see
   *  the note at the top of this file. */
  note: "We will come back with a view on whether TikTok is worth your budget, and a realistic monthly creative output figure if it is.",
};

/** One standard set across the site; see content/forms.ts. The document
 *  specifies its own eight fields, and the 2026-09-02 team direction overrides
 *  them, as it does on every other page. */
export { standardFormFields as formFields } from "@/content/forms";

/** Mid-page CTA band, in the position the document's own CTA occupies: directly
 *  after "Who Should Not Run TikTok Ads".
 *
 *  PROVENANCE, PLAINLY. `button` is the document's own line, verbatim, and it is
 *  printed nowhere else on the page. `heading` and `support` are NOT the
 *  client's words - this document supplies no growth heading, and every other
 *  page's band was filled from CTA copy the client sent separately. They are
 *  written to the house formula the sibling pages already use, and every claim
 *  inside them is one the document makes elsewhere: the largest adult
 *  advertising audience in the UAE, Spark Ads through your own and creator
 *  accounts, and creative production at the volume TikTok requires. The heading
 *  echoes the document's own test of a working account - "this is the part that
 *  decides whether the account keeps working" - and is deliberately unlike the
 *  TikTok Marketing page's band, which is the nearest neighbour.
 *
 *  Stored in sentence case and split across two lines for typesetting; the band
 *  uppercases it and sets the second line in brand red. */
export const growthCta = {
  heading: ["Ready to keep your TikTok", "ads working?"] as [string, string],
  support:
    "Reach the UAE's Largest Adult Audience, Run Spark Ads Through Your Own and Creator Accounts & Sustain the Creative Volume TikTok Requires",
  button: "See Which Suits Your Business",
};
