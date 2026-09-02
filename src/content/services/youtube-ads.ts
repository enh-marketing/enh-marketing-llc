// YouTube Ads — page content.
// Copy source: "YouTube Ads.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
//
// FIGURES. The document's own: approximately 8.37 million adults aged 18 and
// above, fourth by platform audience, six seconds, first five seconds, 3 hours.
//
// The document references a Google Ads page. That route is in the sitemap but
// has no page yet, so the sentence is carried as plain text and nothing links.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "YouTube Ads Agency in Dubai | ENH Marketing",
  description:
    "Run YouTube campaigns through Google Ads with shared audiences, conversion tracking, creative guidance and a clear assessment of whether your existing video is ready.",
};

export const hero = {
  lines: ["YouTube Ads", "Agency", "in Dubai"] as [string, string, string],
  sub: "Run YouTube campaigns through Google Ads with shared audiences, conversion tracking, creative guidance and a clear assessment of whether your existing video is ready.",
  primary: "Get YouTube Ads Quote",
  secondary: "Call Our Ads Experts",
};

/** The opening: the question nobody asks first. */
export const narrative = {
  heading: ["One Account Connects Search,", "Video and Conversion Data"] as [string, string],
  thesis: "Most YouTube advertising conversations in this market stall on the same point.",
  thesisEmphasis: "stall on the same point",
  body: "Not targeting, not budget, but whether the business has a video worth putting money behind. It is the first thing to settle and usually the last thing anyone asks.",
  agency:
    "ENH Marketing runs YouTube advertising for UAE brands. YouTube ads are bought inside Google Ads rather than on a separate platform, which means your video campaigns share targeting, audiences and conversion tracking with your search activity.",
  closing:
    "As a Dubai digital marketing agency, we handle campaign setup, targeting, creative specifications and reporting, while giving you a straight view on whether your existing assets make the channel worthwhile.",
};

/** The structural fact the page turns on, and its four consequences. */
export const account = {
  title: "YouTube Ads Are Bought",
  strokeTitle: "Inside Google Ads",
  lead: "YouTube campaigns run through Google Ads rather than a separate advertising platform.",
  ledeTail: "In practice:",
  items: [
    "Your video and search activity live in the same account, sharing audiences, remarketing lists and conversion tracking.",
    "Anyone already running your Google Ads can add YouTube without a new platform relationship or a new account.",
    "Attribution is shared. Someone who watches your video and later searches your brand is trackable in one place, which is unusual and useful.",
    "Budget can move between search and video, which matters while you are testing.",
  ],
  /** The document volunteers this against its own interest. */
  implication:
    "The practical implication is that if you already have a Google Ads agency, adding YouTube is an incremental decision rather than a new engagement.",
  against: "We would say that even where it means a smaller brief for us.",
  /** The referenced page is unbuilt, so this stays prose. */
  reference: "See our Google Ads page.",
  connect:
    "YouTube campaigns can also connect with wider digital marketing services, including video production, landing pages, remarketing and search advertising.",
};

export type Capability = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** Which part of the account or the session this touches. Presentation only:
   *  the document names no such zones. */
  zone: "setup" | "formats" | "shorts" | "targeting" | "creative" | "tracking";
  /** How the title rejoins its body. Five of the six are written with a comma;
   *  the sixth is not, and assuming otherwise silently misquotes it. */
  sep?: ", " | " ";
};

/** Six things, written as one sentence each. Titles are the opening clause and
 *  bodies the remainder, so each pair recomposes the source line — using that
 *  item's own separator, which is not the same for all six. */
export const run = {
  title: "What",
  strokeTitle: "We Run",
  lead: "As your partner and experienced digital marketing agency, we lay down all the specifics of how everything works before you get started.",
  items: [
    {
      no: "01",
      title: "Campaign setup inside your Google Ads account",
      zone: "setup",
      glyph: "structure",
      // Reconstruction: title + ", " + body
      body: "structured around your objective.",
    },
    {
      no: "02",
      title: "Skippable in-stream, non-skippable, bumper and in-feed video ads",
      zone: "formats",
      glyph: "creative",
      body: "matched to whether you are building awareness or driving action.",
    },
    {
      no: "03",
      title: "YouTube Shorts placements",
      zone: "shorts",
      glyph: "generate",
      body: "where short vertical creative already exists or can be cut from longer assets.",
    },
    {
      no: "04",
      title: "Targeting by demographics, in-market and affinity audiences, keywords, topics, specific channels and placements",
      zone: "targeting",
      glyph: "audience",
      body: "plus remarketing to your existing audiences.",
    },
    {
      no: "05",
      title: "Creative specification and adaptation",
      zone: "creative",
      glyph: "text",
      body: "including versions cut for different lengths and placements.",
    },
    {
      no: "06",
      title: "Conversion tracking and reporting",
      zone: "tracking",
      glyph: "tracking",
      sep: " ",
      body: "connected to the rest of your Google Ads activity.",
    },
  ] as Capability[],
};

export type Situation = { no: string; title: string; body: string };

/** The audience figure, and the three situations where the channel earns it. */
export const earns = {
  title: "Where YouTube",
  strokeTitle: "Earns Its Budget",
  // Reconstruction: audienceLead + " " + figure + " " + audienceTail
  audienceLead: "YouTube in the UAE reaches approximately",
  figure: "8.37 million",
  audienceTail:
    "adults aged 18 and above, placing it fourth by platform ad audience, ahead of Instagram and behind Facebook.",
  lead: "It is strongest in three situations.",
  items: [
    {
      no: "01",
      title: "When your product needs explaining.",
      body: "Anything requiring more than a few seconds of understanding: services, technical products, education, healthcare, property.",
    },
    {
      no: "02",
      title: "When you want to reach people around a topic rather than a profile.",
      body: "Targeting by what people are watching and searching sits closer to intent than interest-based social targeting.",
    },
    {
      no: "03",
      title: "When you already have video and it is doing nothing.",
      body: "The cheapest campaign to justify is one where the assets already exist.",
    },
  ] as Situation[],
  compound:
    "It is also worth remembering that YouTube functions as a search engine, so paid activity and any organic channel work compound rather than run in parallel.",
};

/** Four disqualifiers. Two are a single sentence; two carry a reason. */
export const notFor = {
  title: "Who Should Not",
  strokeTitle: "Run YouTube Ads",
  items: [
    { title: "Businesses with no video and no budget to make any." },
    { title: "Very small budgets where production would consume most of the total." },
    {
      title: "Advertisers who need leads this month.",
      body: "YouTube typically builds consideration before it converts, and Meta or Google Search will move faster.",
    },
    {
      title: "Anyone measuring on last-click only.",
      body: "YouTube's contribution is systematically undercounted by that model.",
    },
  ] as { title: string; body?: string }[],
};

export const faqs: Faq[] = [
  {
    q: "How much do YouTube ads cost in Dubai?",
    a: "Two costs, and the second is the one people forget. Media is auction-based and you generally pay only when someone watches a meaningful portion or interacts. Video production is separate and at small budgets can exceed the media. We quote both so you can see the real number.",
  },
  {
    q: "Do we need to make a video first?",
    a: "Usually you need video, though not necessarily a new one. Existing product footage, brand film, testimonials or event material can often be adapted. If nothing usable exists and production cannot be funded, YouTube is probably not your next channel and we will say so.",
  },
  {
    q: "Are YouTube ads bought through Google Ads?",
    a: "Yes. YouTube campaigns run inside Google Ads rather than a separate platform, sharing audiences, remarketing lists and conversion tracking with your search activity. If you already run Google Ads, adding YouTube is an extension of that account rather than a new engagement.",
  },
  {
    q: "How many people can we reach on YouTube in the UAE?",
    a: "YouTube's advertising audience in the UAE is approximately 8.37 million adults aged 18 and above, fourth by platform audience, ahead of Instagram and behind Facebook. Your actual reach depends on targeting and budget.",
  },
  {
    q: "What is the minimum budget for YouTube ads?",
    a: "Higher in practice than other platforms once video production is counted. Media alone can start small, but a campaign that includes making the video needs a realistic combined budget. We give you a straight figure rather than a headline media minimum.",
  },
  {
    q: "How long should a YouTube ad be?",
    a: "It depends on the format and the job. Bumper ads are six seconds and built for recall. Skippable in-stream ads need to earn attention in the first five seconds and can then run longer for products that need explaining. We specify length against objective rather than defaulting to one cut.",
  },
  {
    q: "Do YouTube ads work for lead generation?",
    a: "They can, though usually as part of a sequence rather than as a direct-response channel. YouTube builds consideration and then feeds remarketing and search. If you need leads this month, Meta or Google Search will move faster. If you are building demand over quarters, YouTube compounds.",
  },
];

export const finalCta = {
  title: "See Whether Your Assets",
  strokeTitle: "Are Ready for YouTube",
  body: "Tell us what you sell and what video you already have, even if it was made for something else.",
  note: "We will come back within 3 hours with a view on whether it is usable, what it would cost to adapt, and whether YouTube is the right next channel.",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";

export const growthCta = {
  heading: ["Ready to turn YouTube views", "into real results?"] as [string, string],
  support:
    "Reach Your Ideal Audience, Drive More Video Engagement & Generate Quality Leads With High-Performance YouTube Ads",
  button: "Get Your YouTube Ads Plan",
};
