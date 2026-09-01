// Snapchat Ads — page content.
// Copy source: "Snapchat Ads Agency in Dubai.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
//
// UNRESOLVED IN THE SOURCE. The closing CTA reads "We will come back within
// [X] hours" — a placeholder the client has not filled in. Rather than invent a
// number or print the bracket, the clause is dropped and the rest of the
// sentence carried whole. Supply the figure and it goes back in.
//
// FIGURES. The document's own: approximately 5.13 million, under 35, over 45,
// three to ten seconds. Nothing is rounded or restated.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Snapchat Ads Agency in Dubai | ENH Marketing",
  description:
    "Reach younger audiences across the UAE and Saudi Arabia through full-screen video, AR Lenses, geofilters and campaigns measured with Snap Pixel tracking.",
};

export const hero = {
  lines: ["Snapchat Ads", "Agency", "in Dubai"] as [string, string, string],
  sub: "Reach younger audiences across the UAE and Saudi Arabia through full-screen video, AR Lenses, geofilters and campaigns measured with Snap Pixel tracking.",
  primary: "Start Your Snapchat Campaign",
  secondary: "Talk to a Snapchat Ads Expert",
};

/** The opening is a fork: for some brands skipping Snapchat is right, for
 *  others it means passing on the cheapest reach they have. */
export const narrative = {
  heading: ["The Case for Snapchat", "in the UAE and Saudi Arabia"] as [string, string],
  thesis: "Snapchat is the platform most UAE brands skip without ever looking at the numbers.",
  thesisEmphasis: "without ever looking at the numbers",
  smallest:
    "It has the smallest audience of the major platforms here, which is usually where the conversation ends.",
  // A fork, not a sequence. Reconstruction: body.join(" ")
  body: [
    "For some businesses that is the right call.",
    "For others it means passing on the cheapest reach available to them.",
  ],
  agency:
    "ENH Marketing is a Dubai digital marketing agency running Snapchat campaigns for UAE brands. We manage Snap Ads, Story and Collection Ads, AR Lenses and geofilters, along with audience setup, Snap Pixel tracking and reporting.",
  closing:
    "Snapchat suits a specific kind of advertiser, and as your trusted digital marketing agency we will tell you plainly whether you are one.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type Reason = { no: string; title: string; body: string };

/** The smallest audience of the majors, and the three things that make it
 *  worth the budget anyway. */
export const fit = {
  title: "Where Snapchat",
  strokeTitle: "Actually Fits",
  // Reconstruction: audienceLead + " " + figure + audienceTail
  audienceLead: "Snapchat's advertising audience in the UAE is approximately",
  figure: "5.13 million",
  audienceTail: ", the smallest of the major platforms and well behind TikTok.",
  lead: "Three things make it worth the budget.",
  reasons: [
    {
      no: "01",
      title: "Cost.",
      body: "Reaching younger audiences on Snapchat is typically cheaper than on Meta or TikTok. For brands with modest budgets and a young customer base, that difference compounds quickly.",
    },
    {
      no: "02",
      title: "Depth among young Gulf audiences.",
      body: "Usage is concentrated rather than casual. If your customer is under 35 and in this region, Snapchat is likely to be a regular part of their day.",
    },
    {
      no: "03",
      title: "Saudi Arabia.",
      body: "This is the argument almost nobody makes. Snapchat's position in KSA is materially stronger than in the UAE, where it functions closer to a reach channel. If your growth plan includes Saudi, Snapchat stops being optional and becomes one of the primary channels. Building the account and the creative approach on UAE campaigns first is the cheaper way to learn.",
    },
  ] as Reason[],
};

export type Format = {
  no: string;
  name: string;
  does: string;
  bestFor: string;
  glyph: GlyphVariant;
  /** Where the format lives, for the drawing. Presentation only: the document
   *  names no such zones, these are how each format's own sentence is placed. */
  zone: "between" | "discover" | "camera" | "map";
};

/** The document supplies this as a three-column table. */
export const formats = {
  title: "Snap Ads, Lenses and Geofilters:",
  strokeTitle: "What Each One Is For",
  columns: ["Format", "What it does", "Best for"] as [string, string, string],
  items: [
    {
      no: "01",
      name: "Snap Ads",
      zone: "between",
      glyph: "creative",
      does: "Full-screen vertical video between Stories, with swipe-up to site, app or product",
      bestFor: "Direct response, traffic, app installs",
    },
    {
      no: "02",
      name: "Story and Collection Ads",
      zone: "discover",
      glyph: "catalogue",
      does: "Ads in the Discover feed, with Collection showing a product row",
      bestFor: "Ecommerce, catalogue, multi-product",
    },
    {
      no: "03",
      name: "AR Lenses",
      zone: "camera",
      glyph: "generate",
      does: "Branded augmented reality users interact with through the camera",
      bestFor: "Launches, brand moments, high engagement time",
    },
    {
      no: "04",
      name: "Geofilters",
      zone: "map",
      glyph: "index",
      does: "Location-based overlays users add to their own Snaps within a defined area",
      bestFor: "Store openings, mall activations, events, Ramadan, seasonal moments",
    },
  ] as Format[],
  argumentLead: "The last two are why Snapchat is worth a look even for brands that would not otherwise consider it.",
  argument:
    "A geofilter attaches your brand to a physical place and a moment in a way no other paid social format does.",
  argumentTail:
    "For a mall activation, an event, a store opening or a seasonal campaign, it puts your brand inside content people are already sending to each other.",
  connect:
    "These formats can also connect with wider digital marketing services, including content production, landing pages and Meta or TikTok campaigns, when Snapchat forms part of a broader media plan.",
};

export type Disqualifier = { title: string; body: string };

/** Four disqualifiers, each written as a label and its reason. */
export const notFor = {
  title: "Who Should Not",
  strokeTitle: "Run Snapchat Ads",
  lead: "A straight answer, since it is rarely offered here.",
  items: [
    { title: "B2B.", body: "Almost always. Use LinkedIn." },
    {
      title: "Older target audiences.",
      body: "If your customer is over 45, your budget belongs elsewhere.",
    },
    {
      title: "Brands with no video capability.",
      body: "Snapchat is full-screen vertical video, and static assets do not work.",
    },
    {
      title: "Anyone expecting it to replace Meta.",
      body: "In the UAE, Snapchat is a complement. In Saudi the calculation changes.",
    },
  ] as Disqualifier[],
  rule: "If two or more of those apply, you will hear it from us before you spend anything.",
};

export const faqs: Faq[] = [
  {
    q: "Is Snapchat worth advertising on in the UAE?",
    a: "For the right business, yes. It has the smallest audience of the major UAE platforms at approximately 5.13 million, but reaching younger audiences is typically cheaper than on Meta or TikTok. It suits retail, food and beverage, beauty, events and entertainment, and is rarely right for B2B.",
  },
  {
    q: "How much do Snapchat ads cost in Dubai?",
    a: "Generally less than the equivalent reach on Meta or TikTok, particularly for under-35 audiences. Costs vary by format: standard Snap Ads are auction-based, geofilters are priced by area and duration, and AR Lenses carry custom pricing. We model realistic figures for your objective before you commit.",
  },
  {
    q: "What is a Snapchat geofilter and when should we use one?",
    a: "A location-based overlay users add to their own Snaps within an area you define. It works for store openings, mall activations, events, exhibitions and seasonal moments. It is one of the few paid formats that ties a brand to a physical place, and users apply it voluntarily to content they are already sending.",
  },
  {
    q: "Should we run Snapchat if we are expanding into Saudi Arabia?",
    a: "Almost certainly. Snapchat's position in KSA is considerably stronger than in the UAE, where it functions more as a reach channel. Building the account structure and creative approach on UAE campaigns first is a cheaper way to learn before Saudi budgets are committed.",
  },
  {
    q: "Snapchat or TikTok?",
    a: "TikTok reaches far more UAE adults and suits broad discovery. Snapchat is cheaper for young audiences, stronger in Saudi, and owns location formats TikTok does not have. If you can only run one in the UAE, it is usually TikTok. If Saudi is in scope, that changes.",
  },
  {
    q: "Do we need video for Snapchat ads?",
    a: "Yes. Snapchat is a full-screen vertical video environment and static creative underperforms badly. Ads are typically short, three to ten seconds, and need to work with sound on. We produce Snapchat-native creative rather than reformatting assets built for other platforms.",
  },
];

export const finalCta = {
  title: "Find Out Whether",
  strokeTitle: "Snapchat Earns a Place",
  body: "Tell us who your customer is, how old they are, and whether Saudi is on your roadmap.",
  /** The source reads "We will come back within [X] hours with a straight
   *  view..." — see the note at the top of this file. */
  note: "We will come back with a straight view on whether Snapchat deserves budget, and where it should sit if it does.",
};

export const formFields = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "customer", label: "Who your customer is" },
  { id: "age", label: "How old they are" },
  { id: "saudi", label: "Whether Saudi is on your roadmap", wide: true },
  { id: "referral", label: "How did you hear about us?", wide: true },
];

export const growthCta = {
  heading: ["Ready to reach the next", "generation of customers?"] as [string, string],
  support:
    "Connect With Your Target Audience, Drive More Engagement & Generate Quality Leads With High-Performance Snapchat Ads",
  button: "Get Your Snapchat Ads Plan",
};
