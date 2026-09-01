// LinkedIn Ads — page content.
// Copy source: "LinkedIn Ads.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// FIGURES. Every number on this page is the document's: AED 100,000, one in
// ten, approximately 10.0 million UAE members, weeks 2 to 8, a full quarter,
// two weeks, above 200 employees. None is rounded, restated or derived. In
// particular the arithmetic section deliberately does NOT compute an affordable
// cost per lead from the worked example: the document says only that you "can
// pay a good deal per lead", and multiplying its two figures into a headline
// number would be inventing the answer the section exists to leave open.
//
// The document's FAQ 10 points at a LinkedIn marketing page, which now exists,
// so that phrase links to it.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "LinkedIn Ads Agency in Dubai | ENH Marketing",
  description:
    "Reach UAE decision-makers by job title, seniority, company and industry with LinkedIn campaigns planned around deal value, lead quality and pipeline.",
};

export const hero = {
  lines: ["LinkedIn Ads", "Agency", "in Dubai"] as [string, string, string],
  sub: "Reach UAE decision-makers by job title, seniority, company and industry with LinkedIn campaigns planned around deal value, lead quality and pipeline.",
  primary: "Get a Free LinkedIn Ads Audit",
  secondary: "Talk to a LinkedIn Ads Expert",
};

/** The opening position, which is unusually blunt: the channel is expensive,
 *  and for some businesses it will never pay. */
export const narrative = {
  heading: ["When LinkedIn Ads", "Make Financial Sense"] as [string, string],
  thesis: "LinkedIn is usually the most expensive way to reach someone in this market.",
  thesisEmphasis: "the most expensive way",
  // A fork, not a sequence: the document offers two outcomes rather than two
  // steps. Reconstruction: body.join(" ") reproduces the sentence pair exactly.
  body: [
    "For some businesses that cost is covered easily by a single won client.",
    "For others it never will be, and no amount of campaign management changes the arithmetic.",
  ],
  agency:
    "ENH Marketing manages LinkedIn advertising for B2B brands in the UAE. We run Sponsored Content, Lead Gen Forms, Message Ads and account-based campaigns, targeting decision-makers by job title, seniority, company and industry.",
  closing:
    "Before anything goes live, our role as a Dubai digital marketing agency is to work through the numbers with you and determine whether LinkedIn is likely to earn its cost for your business.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type Step = { no: string; ask: string; note: string };

/** The page's spine. Four steps in a stated order, and the document is explicit
 *  that the order matters: "Four steps, in this order". */
export const arithmetic = {
  title: "Are LinkedIn Ads Worth It?",
  strokeTitle: "The Honest Arithmetic",
  cost: "LinkedIn costs several times what Meta costs per lead in the UAE.",
  costBody:
    "That is how the channel works rather than a fault to be optimised away, and an agency promising to make LinkedIn cheap has usually not run much of it.",
  pivotLead: "So the useful question is not whether LinkedIn is expensive.",
  pivot: "It is whether your deal value can absorb it.",
  stepsLead: "Four steps, in this order:",
  steps: [
    {
      no: "01",
      ask: "What is a closed client worth to you?",
      note: "Annual contract value, or first-year revenue.",
    },
    {
      no: "02",
      ask: "What proportion of qualified leads do you close?",
      note: "Use the honest figure rather than the optimistic one.",
    },
    {
      no: "03",
      ask: "Those two numbers give you what you can afford to pay per lead.",
      note: "If you close one in ten and a client is worth AED 100,000, you can pay a good deal per lead and still be comfortably ahead.",
    },
    {
      no: "04",
      ask: "Then compare that against what LinkedIn actually costs for your targeting.",
      note: "We provide a realistic range at proposal stage.",
    },
  ] as Step[],
  /** The two figures the document's worked example supplies, and nothing more.
   *  They are set as the inputs to step three, never multiplied out. */
  exampleCloseRate: "one in ten",
  exampleValue: "AED 100,000",
  worksLead: "LinkedIn tends to work where a single won client pays for months of advertising.",
  // Split on commas only, so sectors.join(", ") + "." reproduces the sentence
  // and the trailing compound stays whole.
  sectors: [
    "Professional services",
    "enterprise software",
    "industrial and technical B2B",
    "corporate services",
    "executive education and recruitment",
  ],
  /** The antithesis the section turns on. */
  closingA: "The channel is expensive per lead and inexpensive per client,",
  closingB: "provided the client is worth enough.",
  closingTail:
    "Where deal values are modest, or the sale is short and transactional, Meta or Google will usually serve you better, and we will say so at proposal stage.",
};

export type Format = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** The document singles two of these out in its own words. */
  standout?: string;
};

export const formats = {
  title: "What",
  strokeTitle: "We Run",
  items: [
    {
      no: "01",
      title: "Sponsored Content",
      glyph: "creative",
      body: "The main format. Single image, video, document and carousel ads in the feed. The best performance usually comes from content that already worked organically, put behind budget.",
    },
    {
      no: "02",
      title: "Lead Gen Forms",
      glyph: "structure",
      body: "Native forms that pre-fill with the user's LinkedIn profile data, removing the landing page step.",
      standout: "Consistently the strongest direct-response format on the platform.",
    },
    {
      no: "03",
      title: "Message Ads",
      glyph: "text",
      body: "Direct messages to targeted professionals. Effective when used sparingly and with a real reason to make contact. Used badly, it does more harm than good.",
    },
    {
      no: "04",
      title: "Matched Audiences and account-based targeting",
      glyph: "entity",
      body: "You provide your target account list and we serve ads to people at those specific companies.",
      standout:
        "This is LinkedIn's genuine differentiator and the reason enterprise B2B uses it. If you have a named-account list, this is usually where we would start.",
    },
    {
      no: "05",
      title: "Retargeting",
      glyph: "fanout",
      body: "Website visitors, video viewers, form openers and company page visitors.",
    },
    {
      no: "06",
      title: "Conversion tracking and CRM connection",
      glyph: "reporting",
      body: "So that LinkedIn reports against pipeline rather than form fills.",
    },
  ] as Format[],
  connect:
    "LinkedIn advertising can also connect with wider digital marketing services, including organic LinkedIn, landing pages, email nurture and Google Ads, when the sales journey requires them.",
};

/** The comparison the document draws in two sentences. */
export const targeting = {
  title: "How LinkedIn",
  strokeTitle: "Targeting Differs",
  inferred: "Meta infers who you are from your behaviour.",
  declared:
    "LinkedIn knows because people told it, and they keep it current because their careers depend on it being accurate.",
  // Reconstruction: facetsLead + " " + facets.join(", ") + " " + facetsTail
  facetsLead: "That means you can target",
  facets: [
    "job title",
    "seniority",
    "function",
    "company",
    "company size",
    "industry and skills",
  ],
  facetsTail: "with a level of confidence no other platform offers.",
  example:
    "For reaching a Head of Procurement at UAE manufacturers above 200 employees, there is no real alternative.",
  precisionLead:
    "The number that matters for your campaign is much smaller in any case: once filtered to your seniority and industry, a well-defined UAE B2B audience is often only a few thousand people.",
  precision: "That precision is the point of the channel rather than a limitation of it.",
};

export type Touch = { text: string; month?: string; at: number };
export type Remedy = { does: string; instead?: string };

/** Attribution. The document tells this as a story with dates, which is why the
 *  section is drawn as a dated trail rather than as a list of measures. */
export const measurement = {
  title: "How We",
  strokeTitle: "Measure It",
  problem:
    "B2B purchases in this market take months, and last-click reporting will tell you LinkedIn did not work when it did.",
  // Reconstruction: trail.map(t => t.text).join(", ") + "."
  //
  // `at` is a position on the axis, in per cent, taken from the document's own
  // months: March is the start, April is one month on, July is four. So March
  // sits at 0, April a quarter along, July at the end, and the stretch where
  // three emails go unanswered falls in the gap between April and July — which
  // is why that one has no month of its own. The spacing is the document's
  // dates, not a layout convenience.
  //
  // `month` names the word inside the sentence to weight. Nothing is printed
  // twice: the label is the sentence's own word, marked in place.
  trail: [
    {
      text: "Someone sees your Sponsored Content in March",
      month: "March",
      at: 0,
    },
    { text: "downloads a report in April", month: "April", at: 25 },
    { text: "ignores three emails", at: 60 },
    {
      text: "then searches your brand name in July and converts through Google",
      month: "July",
      at: 100,
    },
  ] as Touch[],
  verdictWrong: "Last-click gives Google the credit.",
  verdictRight: "LinkedIn started it.",
  remediesLead: "What we do about that:",
  // Two of the five name the weaker thing they replace, in the document's own
  // words ("rather than stopping at form submissions", "rather than counted").
  // Three do not, and those keep an empty counterpart rather than being given
  // an invented one. Reconstruction: remediesLead + " " + each rendered as
  // `does` or `does + " rather than " + instead`, joined ", " with ", and "
  // before the last, + ".".
  remedies: [
    {
      does: "conversion tracking connected to your CRM",
      instead: "stopping at form submissions",
    },
    { does: "lead quality reviewed with your sales team", instead: "counted" },
    { does: "brand search volume tracked against campaign periods" },
    { does: "a “how did you hear about us” field on your forms" },
    {
      does: "reporting that follows leads through to opportunity and closed revenue where your CRM allows it",
    },
  ] as Remedy[],
  /** The document states a hierarchy: two metrics lead, one is included but
   *  demoted. Reconstruction: reportsLead + " " + metrics[0] + " and " +
   *  metrics[1] + "." and demoted + " " + demotedTail. */
  reportsLead: "Reports lead with",
  metrics: ["cost per qualified lead", "pipeline contribution"],
  demoted: "Cost per form fill",
  demotedTail: "is included, though it tells you far less than it appears to.",
};

export type Stage = { no: string; title: string; body: string };

/** Four numbered stages and an unnumbered "Ongoing". The document writes each
 *  as "Stage N: Title. Body"; title and body recompose it exactly. */
export const process = {
  title: "How LinkedIn Ads",
  strokeTitle: "Management Works",
  stages: [
    {
      no: "01",
      title: "Arithmetic and audience",
      body: "We work through deal value, close rate and affordable cost per lead, then define the targeting by job title, seniority, industry and company size. You get a realistic cost range and an audience estimate before any budget is committed.",
    },
    {
      no: "02",
      title: "Tracking and offer",
      body: "Conversion tracking, CRM connection and the offer itself. Where the offer is weak, we say so at this point rather than after the first month of spend.",
    },
    {
      no: "03",
      title: "Launch",
      body: "Campaigns go live, usually starting with Sponsored Content and Lead Gen Forms. Where a named-account list exists, Matched Audiences runs alongside.",
    },
    {
      no: "04",
      title: "Weeks 2 to 8",
      body: "Creative and audience testing at enough volume to draw a conclusion. Early cost per lead will look worse than it eventually settles at.",
    },
    {
      no: "",
      title: "Pipeline review",
      body: "Monthly reporting against qualified leads and pipeline, with lead quality reviewed alongside your sales team rather than assumed from the platform data.",
    },
  ] as Stage[],
};

/** One sentence, eight categories, no descriptions. Split on the document's own
 *  semicolons: items.join("; ") + "." reproduces it exactly. */
export const industries = {
  title: "Industries We Run",
  strokeTitle: "LinkedIn Campaigns For",
  items: [
    "Professional services including legal, accounting and consulting",
    "technology and SaaS",
    "industrial and manufacturing B2B",
    "corporate and business setup services",
    "logistics and supply chain",
    "construction and engineering",
    "executive education",
    "financial and advisory services",
  ],
  cta: "Request a Quote",
};

export const faqs: Faq[] = [
  {
    q: "How much do LinkedIn ads cost in Dubai?",
    a: "More than Meta or Google, by a significant margin. Costs vary widely with how senior and specialised your targeting is: reaching C-suite in financial services costs considerably more than reaching SME technology managers. What matters is cost per client rather than cost per lead. We model realistic figures for your category before you commit.",
  },
  {
    q: "Are LinkedIn ads worth it for my business?",
    a: "Only if your deal values justify the cost. Work out what a closed client is worth, what proportion of leads you close, and therefore what you can afford per lead. If a won client is worth six figures, LinkedIn is inexpensive. If your average deal is a few thousand dirhams, it usually is not.",
  },
  {
    q: "What is the minimum budget for LinkedIn ads?",
    a: "Higher than the other platforms, because LinkedIn's cost per click means a small budget produces too little data to optimise against. Below a workable threshold, campaigns underperform for structural reasons rather than execution ones. If your budget is not viable, we will tell you at proposal stage.",
  },
  {
    q: "How many people can I reach on LinkedIn in the UAE?",
    a: "LinkedIn reports approximately 10.0 million members in the UAE, though that counts registered members rather than active users. Your actual campaign audience will be far smaller once filtered by seniority, industry and company size, often a few thousand people. That precision is the reason to use the channel.",
  },
  {
    q: "LinkedIn Ads or Google Ads for B2B?",
    a: "Different jobs. Google captures people already searching for a solution. LinkedIn reaches the right people before they start looking, and lets you target by job title and company in a way Google cannot. Most B2B businesses with budget run both, with Google capturing demand and LinkedIn creating it.",
  },
  {
    q: "What are Lead Gen Forms and do they work?",
    a: "Native LinkedIn forms that pre-fill with the user's profile data when they click your ad, removing the landing page step. They typically convert better than sending traffic to a website form. The trade-off is that leads arrive earlier in the buying cycle, so they need a proper nurture sequence rather than an immediate sales call.",
  },
  {
    q: "Can you target specific companies?",
    a: "Yes, through Matched Audiences. You provide a list of target accounts, LinkedIn matches them to company pages, and your ads are served to employees at those organisations. This is account-based marketing, and it is LinkedIn's strongest differentiator. If you have a named-account list, it is usually where we would start.",
  },
  {
    q: "How long before LinkedIn ads produce results?",
    a: "Leads can arrive within the first two weeks. Judging the channel properly takes longer, because B2B sales cycles mean the pipeline impact appears months after the spend. We would not draw conclusions from anything less than a full quarter, and we say that at the outset.",
  },
  {
    q: "Do we own the ad account?",
    a: "Our standard position is that you do. Campaigns run in your LinkedIn Campaign Manager account, and audiences, conversion tracking and historical data remain yours if the engagement ends. Ask this of every agency you shortlist, and get the answer written into the contract.",
  },
  {
    q: "Should we run LinkedIn ads alongside organic LinkedIn?",
    a: "Yes, and organic should usually come first. The best-performing Sponsored Content is nearly always a post that already earned engagement organically from the right people, put behind budget. Advertising content that has never been tested organically means paying to learn what you could have learned free. See our LinkedIn marketing page.",
    // Now that the page exists, the document's reference links to it.
    aLink: {
      label: "LinkedIn marketing",
      href: "/services/social-media-marketing/linkedin-marketing",
    },
  },
];

export const finalCta = {
  title: "Not Sure LinkedIn",
  strokeTitle: "Is Right for You?",
  body: "Tell us what you sell, what a client is worth, and who you need to reach.",
  note: "We will work through the arithmetic with you and give you a straight answer on whether LinkedIn earns its cost for your business.",
};

/** Form fields. The document asks for three specific things, so those are the
 *  fields rather than the generic set. */
export const formFields = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "sell", label: "What you sell" },
  { id: "value", label: "What a client is worth" },
  { id: "reach", label: "Who you need to reach", wide: true },
  { id: "referral", label: "How did you hear about us?", wide: true },
];

/** Mid-page CTA band. Supplied under "LinkedIn Ads Page CTA". Stored in
 *  sentence case and split for typesetting; the band uppercases it. */
export const growthCta = {
  heading: ["Ready to grow your", "business on LinkedIn?"] as [string, string],
  support:
    "Reach Decision-Makers, Generate High-Quality B2B Leads & Drive Measurable Business Growth With LinkedIn Ads",
  button: "Get a Free LinkedIn Ads Strategy",
};
