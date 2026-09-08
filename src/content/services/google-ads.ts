// Google Ads: page content.
// Copy source: "Google Ads.docx" (client-supplied, 2026-09-07). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// THE PAGE'S ARGUMENT IS SEPARATION, AND THE DOCUMENT MAKES IT IN ITS FIRST
// PARAGRAPH: an account is "working well in some places and quietly wasting
// money in others, and the reporting does not separate the two". Almost every
// section after that is an act of telling two things apart. Brand from
// non-brand ("blending them can make acquisition results look stronger than
// they are"). Keywords from search terms ("the two drift apart over time").
// Before the click from after it ("the problem often sits after the ad"). The
// management fee from the ad spend. Your account from the agency's. Leads from
// good leads. That is the through-line, and it is why the drawings on this page
// are all divisions rather than dashboards.
//
// FIGURES: the document supplies real spans in the results section (first week,
// weeks 2 to 4, weeks 4 to 8, month 3 onwards) and those are used as given. It
// supplies no percentages, costs, counts or results anywhere, and none is
// invented or implied. The one external claim carries the document's own
// citation.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Google Ads Agency in Dubai | Search, Shopping & Performance Max | ENH Marketing",
  description:
    "ENH Marketing manages Google Ads for businesses across the UAE. Conversion tracking is built around the actions that matter to your business, and reporting leads with cost per acquisition.",
};

export const hero = {
  lines: ["Google Ads", "Agency", "in Dubai"] as [string, string, string],
  /** REVISED DOC, "Google Ads (1).docx", 2026-09-08: the banner now has a
   *  sub-line of its own. It used to borrow the first sentence of the opening
   *  paragraph, because the earlier draft gave the banner no sub at all; that
   *  sentence has gone back to the opening section where it belongs. */
  sub: "Reach people actively searching for your products or services with campaigns built around relevant traffic, qualified leads and measurable sales.",
  primary: "Get a Free Google Ads Audit",
  secondary: "Talk to a Google Ads Specialist",
};

/** The opening.
 *
 *  REVISED DOC, "Google Ads (1).docx", 2026-09-08: this stretch now has a
 *  heading of its own and a pair of calls to action after it. The earlier draft
 *  had neither, which is why the section was built headless and why its first
 *  sentence was being used as the banner's sub-line. Both are corrected. */
export const opening = {
  title: "Turn High Intent Searches",
  strokeTitle: "Into Business",
  /** The opening sentence, back from the banner where it was standing in. */
  lead: "A Google Ads account can spend steadily for months and still be difficult to judge.",
  /** The rest of the document's first paragraph. */
  statement:
    "The reports show clicks and conversions, the numbers move a little each week, and nobody can say clearly which part of the budget is producing customers.",
  /** The sentence the whole page is built on. */
  thesis:
    "Often the account is working well in some places and quietly wasting money in others, and the reporting does not separate the two.",
  thesisMark: "the reporting does not separate the two",
  /** What ENH runs. The six campaign types are marked inside the sentence
   *  rather than lifted out into chips, which would print them twice. */
  manages:
    "ENH Marketing manages Google Ads for businesses across the UAE. We plan and run Search, Shopping, Performance Max, Display, Demand Gen and remarketing campaigns. Conversion tracking is built around the actions that matter to your business, and reporting leads with cost per acquisition.",
  managesMark: [
    "Search",
    "Shopping",
    "Performance Max",
    "Display",
    "Demand Gen",
    "remarketing",
  ],
  /** Three commitments, marked in place inside the one sentence that makes
   *  them, because that is how the document writes them. */
  terms:
    "Your ad account stays in your name, and our management fee is shown separately from ad spend. Before work begins, we will also tell you whether the available budget gives the campaign a fair chance to perform.",
  /** The two the revision puts after this section. */
  primary: "Request a Quote",
  secondary: "Get a Free Account Audit",
  termsMark: [
    "stays in your name",
    "shown separately from ad spend",
    "a fair chance to perform",
  ],
};

export type CompareRow = { area: string; google: string; meta: string };

/** The document's own table, kept as a table's worth of data. Its heading asks
 *  where to START, not which is better, so the section is built as a decision
 *  rather than as a scoreboard: the closing sentence is the answer and the
 *  eight rows are the evidence behind it. */
export const compare = {
  title: "Google Ads or Meta Ads:",
  strokeTitle: "Where Should You Start?",
  columns: ["Google Ads", "Meta Ads"] as [string, string],
  rows: [
    {
      area: "Main role",
      google: "Captures demand that already exists",
      meta: "Builds interest and demand",
    },
    {
      area: "Targeting is based on",
      google: "Search terms and intent",
      meta: "Audience signals, interests and behaviour",
    },
    {
      area: "Common buying stage",
      google: "Active research and decision",
      meta: "Discovery and consideration",
    },
    {
      area: "What shapes performance",
      google: "Keywords, offer and landing page",
      meta: "Creative, audience and offer",
    },
    {
      area: "Typical cost per click",
      google: "Often higher",
      meta: "Often lower",
    },
    {
      area: "Typical lead profile",
      google: "Usually higher intent",
      meta: "Often higher volume at an earlier stage",
    },
    {
      area: "Speed to first results",
      google: "Can begin within days",
      meta: "Can begin within days",
    },
    {
      area: "A useful starting point when",
      google: "People already search for your category",
      meta: "The audience still needs to discover the offer",
    },
  ] as CompareRow[],
  /** The decision the section exists to settle. */
  verdict:
    "If the budget only covers one channel, start by checking whether people already search for what you sell. Search demand gives Google a clear starting point. When that demand is limited, Meta can help introduce the offer to the right audience.",
  verdictMark: "start by checking whether people already search for what you sell",
};

/** The section where the document turns on its own channel: the problem is
 *  after the ad, not inside the account. */
export const afterClick = {
  title: "Clicks Are Coming In",
  strokeTitle: "But Why Aren't the Leads?",
  /** Set at display scale. It is the section's whole claim. */
  statement: "Bidding cannot fix a landing page that does not convert.",
  /** Where the problem actually sits, and the five ways the document says a
   *  page loses the click. Marked in place, never restated as a list. */
  symptom:
    "If clicks are arriving at a reasonable cost but enquiries are still low, the problem often sits after the ad. The page may load slowly, send visitors to a generic homepage, ask for too much information, or make it difficult to call or use WhatsApp. Sometimes the offer on the page simply does not match the one in the ad.",
  symptomMark: "the problem often sits after the ad",
  /** The five ways the document says a page loses a click it has already paid
   *  for, as verbatim, contiguous substrings of `symptom`. The circuit lights
   *  the matching clause as the click reaches each gate, so the client's own
   *  sentence captions the drawing and the drawing is never labelled with a
   *  second copy of those words. Order is the order the visitor meets them:
   *  the page has to load, then be the right page, then not over-ask, then be
   *  contactable, and the offer has to be the one the ad promised.
   *
   *  These five are also what the research says decides a post-click
   *  experience: load speed, message match, friction, contact path and offer
   *  match. The document arrived there on its own; nothing is added to it. */
  symptomStages: [
    "load slowly",
    "send visitors to a generic homepage",
    "ask for too much information",
    "make it difficult to call or use WhatsApp",
    "the offer on the page simply does not match the one in the ad",
  ],
  /** The auction. Three inputs, one price, and the document names all three. */
  /** The sentence the document's auction paragraph opens on. It was lost when
   *  that paragraph was split into a lead, three items and a tail: the lead is
   *  set as a small label and this does not belong inside a label, so it needs
   *  a line of its own. It is why the auction is in this section at all. */
  auctionCost: "There is also a cost effect.",
  auctionLead: "Google evaluates three things in the ad auction:",
  auction: [
    "how likely your ad is to be clicked",
    "how closely it matches the search",
    "the landing page experience",
  ],
  /** The return leg of the circuit: what the page did decides what the next
   *  click costs. This is the document's own causal sentence, and it is the
   *  reason the drawing is a loop rather than a line. */
  auctionTail: "A weak page can therefore raise the price of the same click.",
  /** The document cites its source for the auction claim, so the page does too. */
  source: "Source: Google Ads Help, About Quality Score for Search campaigns.",
  /** Why the easy work is the wrong work. */
  conversation:
    "It is easy to keep adjusting bids, because that work stays inside the ad account. The harder conversation is whether the page itself needs attention. We have that conversation early. If the landing page is holding the campaign back, we will explain the problem and tell you whether it needs a small fix or a full rebuild. Any additional work is quoted separately, so you can decide.",
  conversationMark: "quoted separately",
};

export type Managed = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** The document ranks these. Search "forms the core of many Google Ads
   *  accounts"; three others are explicitly conditional ("used where it suits
   *  the account", "used when store visits ... matter", "included when the
   *  account needs a stronger destination"). `core` and `conditional` carry
   *  that, and nothing else is asserted about the remaining entries. */
  weight: "core" | "conditional" | "standard";
  /** Which parts of the account this service actually reaches. Every entry is
   *  read off the item's own sentence and nothing else: Shopping names Merchant
   *  Center, Shopping campaigns and "Performance Max for retail"; Performance
   *  Max is "managed alongside structured Search campaigns"; conversion
   *  tracking names "CRM connections that trace leads back to campaigns", so it
   *  reaches all of them; landing page work is the destination, which is the
   *  one region that sits outside the account. */
  reach: Region[];
};

/** The parts of the account the drawing is divided into. A drawing's names,
 *  never printed: the service titles beside it are the labels. */
export type Region =
  | "search"
  | "shopping"
  | "pmax"
  | "display"
  | "local"
  | "measure"
  | "destination";

export const managed = {
  title: "What",
  strokeTitle: "We Manage",
  items: [
    {
      no: "01",
      title: "Search campaigns",
      glyph: "index",
      weight: "core",
      reach: ["search"],
      body: "Keyword research, account structure, ad copy, extensions and bid strategy. This forms the core of many Google Ads accounts.",
    },
    {
      no: "02",
      title: "Google Shopping",
      glyph: "catalogue",
      weight: "standard",
      reach: ["shopping", "pmax"],
      body: "Merchant Center setup, product feed optimisation, Shopping campaigns and Performance Max for retail. Feed quality can have a major effect on Shopping results.",
    },
    {
      no: "03",
      title: "Performance Max",
      glyph: "fanout",
      weight: "conditional",
      reach: ["pmax", "search"],
      body: "Used where it suits the account, and managed alongside structured Search campaigns.",
    },
    {
      no: "04",
      title: "Display and remarketing",
      glyph: "audience",
      weight: "standard",
      reach: ["display"],
      body: "Ads that reconnect with previous website visitors, with frequency controls to limit how often they see them.",
    },
    {
      no: "05",
      title: "Local advertising and Google Business Profile integration",
      glyph: "entity",
      weight: "conditional",
      reach: ["local"],
      body: "Used when store visits, local enquiries or phone calls matter.",
    },
    {
      no: "06",
      title: "Conversion tracking and measurement",
      glyph: "tracking",
      weight: "standard",
      reach: ["search", "shopping", "pmax", "display", "local", "measure"],
      body: "Google Tag Manager, GA4 event configuration, enhanced conversions, call tracking and CRM connections that trace leads back to campaigns.",
    },
    {
      no: "07",
      title: "Landing page recommendations and builds",
      glyph: "form",
      weight: "conditional",
      reach: ["destination"],
      body: "Included when the account needs a stronger destination for paid traffic.",
    },
  ] as Managed[],
  /** The document's cross-reference. The bracketed page name is the client's
   *  own markup for a link, so it is rendered as one rather than printed. */
  youtube: {
    before: "YouTube campaigns are covered on our ",
    link: "YouTube Ads page",
    href: "/services/performance-marketing/youtube-ads",
    after: ", although they run through the same Google Ads account.",
  },
  cta: "Know More",
};

export type Principle = { no: string; title: string; body: string };

/** Six principles, each a title and the reason for it. Every one of them is a
 *  separation: brand from non-brand, intent from intent, one conversion value
 *  from another, wanted searches from unwanted, assumption from performance,
 *  and a budget that can learn from one spread too thin. */
export const build = {
  title: "How We Build",
  strokeTitle: "the Account",
  lead: "A well-organised account makes it easier to see what is working, where money is going and what needs to change.",
  items: [
    {
      no: "01",
      title: "Brand and non-brand campaigns stay separate",
      body: "Blending them can make acquisition results look stronger than they are.",
    },
    {
      no: "02",
      title: "Campaigns are grouped around intent and margin",
      body: "The structure follows how customers search and what each service or product is worth.",
    },
    {
      no: "03",
      title: "Conversion actions carry different values",
      body: "A quote request and a newsletter signup should not tell Google the same thing.",
    },
    {
      no: "04",
      title: "We maintain the negative keyword lists",
      body: "They are reviewed at account and campaign level on a set schedule.",
    },
    {
      no: "05",
      title: "Location and schedule targeting follow real performance",
      body: "In the UAE, the places and times that produce enquiries can differ from the original assumption.",
    },
    {
      no: "06",
      title: "Budget goes where it can gather enough data",
      body: "Spreading a limited budget across too many campaigns can leave each one with too little information to improve.",
    },
  ] as Principle[],
};

/** Ownership. The document's strongest trust material, and it names the thing
 *  that is at stake: the history inside the account. */
export const ownership = {
  title: "Your Account",
  strokeTitle: "Stays With You",
  opening:
    "Campaigns run in a Google Ads account owned by your business. ENH Marketing manages it through agency access.",
  /** What remains, and what happens at the end. The five kinds of history are
   *  marked inside the sentence that lists them. */
  remains:
    "Your conversion history, negative keyword lists, audience lists, tracking setup and performance data remain in the account. If the engagement ends, we remove our access and you keep the work completed during that time.",
  remainsMark: [
    "conversion history",
    "negative keyword lists",
    "audience lists",
    "tracking setup",
    "performance data",
  ],
  whyLead: "Why account ownership matters.",
  why: "A mature Google Ads account is a business asset. Years of conversion data help smart bidding learn, while negative keyword lists hold months of account knowledge. Losing that history can force the next team to rebuild information the business had already paid to develop.",
  whyMark: "a business asset",
  /** The document tells the reader to check the contract. Set apart, because it
   *  is advice about other agencies rather than a claim about this one. */
  warning:
    "Some agencies run client campaigns inside accounts they own. Ask who owns the account, and make sure the answer appears in the contract.",
  warningMark: "Ask who owns the account",
  cta: "Request a Quote",
};

export type Phase = { no: string; span: string; body: string };

/** Four stages, and the document gives each one a real span. Those spans are
 *  the only figures on this page and they are the client's own, so the drawing
 *  may use a real time axis rather than an abstract one. */
export const results = {
  title: "When Will You Start",
  strokeTitle: "Seeing Results?",
  statement: "Traffic can begin quickly. Useful performance data takes longer.",
  phases: [
    {
      no: "1",
      span: "In the first week",
      body: "the account is built or restructured, tracking is checked, and the campaigns go live. The first clicks and data begin to arrive.",
    },
    {
      no: "2",
      span: "In weeks 2 to 4",
      body: "we review search terms and add negative keywords. Early waste becomes easier to spot. The first cost-per-acquisition figure also begins to take shape, and it may still be higher than its later level.",
    },
    {
      no: "3",
      span: "From weeks 4 to 8",
      body: "the bidding system may have enough conversion data to improve. Ad copy and landing page tests are underway, which gives clearer evidence about what works.",
    },
    {
      no: "4",
      span: "Then, from month 3 onwards",
      body: "performance should be more stable, which makes budget increases and wider scaling decisions easier to judge.",
    },
  ] as Phase[],
  /** The refusal the section closes on. */
  caveat:
    "A promise of results within 24 hours usually refers to the first clicks. Building profitable and repeatable performance takes longer.",
  caveatMark: "usually refers to the first clicks",
};

/** One comma-separated sentence and no descriptions, which is exactly the shape
 *  IndustryRun was built for: it keeps the sentence a sentence and swaps the
 *  commas for brand separators. Labels are the document's own, in its order.
 *  Only the five sectors that still have a page behind them carry an href;
 *  inventing links to pages that are not built would put dead ends in the run. */
export const industries = {
  title: "Industries We",
  strokeTitle: "Run Google Ads For",
  items: [
    { label: "Real estate and property" },
    { label: "Healthcare and clinics", href: "/industries/healthcare-clinics" },
    { label: "Legal and professional services" },
    { label: "Construction and contracting" },
    { label: "Industrial and B2B businesses" },
    { label: "Education and training" },
    { label: "Logistics", href: "/industries/logistics-shipping" },
    { label: "Automotive", href: "/industries/automotive" },
    { label: "Home services" },
    { label: "Ecommerce and retail", href: "/industries/ecommerce-retail" },
    { label: "Hospitality", href: "/industries/hospitality-hotels" },
  ],
};

export const faqs: Faq[] = [
  {
    q: "What does a Google Ads agency in Dubai do?",
    a: "A Google Ads agency plans, builds and manages paid campaigns. The work can include keyword research, account structure, ad copy, bidding, Shopping feeds, conversion tracking and reporting. The management fee is charged separately from the money paid to Google. Account structure and measurement usually create the biggest difference between agencies.",
  },
  {
    q: "Is Google Ads right for my business?",
    a: "Google Ads works best when people already search for what you sell, so the demand exists before you spend anything. It suits urgent needs, repairs, professional and medical services, and products the customer already understands. It also needs margins that can carry the click costs in your category, which vary widely here.",
  },
  {
    q: "When is Google Ads a weaker fit?",
    a: "When the category is new and few people search for it yet, Meta or TikTok may introduce the idea more effectively. It is also a poor fit when the landing page receives traffic without producing enquiries, when the budget cannot cover click costs in your sector, or when the product is bought on impulse.",
  },
  {
    q: "Google Ads or Meta Ads, which should we start with?",
    a: "Start by checking whether people already search for what you sell. Google can capture that active demand. Meta can introduce the offer to people earlier, before they begin searching. Many businesses use both once the budget allows, because each channel reaches a different stage of the buying process.",
  },
  {
    q: "How much do Google Ads cost in Dubai?",
    a: "Google Ads has two costs. Ad spend is paid directly to Google, with click prices varying by industry. The agency management fee is separate. We estimate the likely cost per click, the number of clicks needed to generate a lead, and the budget required to work towards your target cost per acquisition.",
  },
  {
    q: "What is the minimum budget for Google Ads?",
    a: "Google does not set a platform minimum, but every campaign has a practical one. It needs enough conversion data for bidding to learn, and the required amount differs by category. If the available budget gives the campaign too little room to work, we will tell you before it starts.",
  },
  {
    q: "How do you decide what our budget should be?",
    a: "We work backwards from the result you need. That means estimating the likely cost per click in your category, how many clicks it usually takes to produce a lead, and how many of those leads become customers. Those three figures give a realistic budget and an expected cost per acquisition before you commit.",
  },
  {
    q: "Do you charge a percentage of ad spend?",
    a: "Agencies commonly charge a percentage of spend, a flat retainer, or a fee based on spending bands. Each model creates different incentives. Our management fee is charged separately from the ad spend paid to Google, and we explain the model and the included scope before work begins.",
  },
  {
    q: "Why do click costs vary so much between UAE categories?",
    a: "Competition differs considerably by sector. Some categories are heavily contested and priced accordingly, while others cost less than clients expect. We review the likely costs in your sector before recommending a budget, because a figure that works well in one category can be unworkable in another.",
  },
  {
    q: "Why is my Google Ads spend high but conversions low?",
    a: "The cause is often found in the search terms, negative keyword list, broad-match settings, brand reporting, conversion tracking or landing page. An account audit shows which part is wasting budget. Bid changes alone will have little effect when the problem happens after the click.",
  },
  {
    q: "Why do search terms need reviewing regularly?",
    a: "Keywords show what you chose to target. Search terms show what people actually typed, and the two drift apart over time. When nobody reviews that second list, part of the budget can go to queries with little chance of becoming a customer. This is where most wasted spend is found.",
  },
  {
    q: "What are negative keywords, and why do they matter?",
    a: "Negative keywords stop your ads appearing for searches that are not relevant to you. The list should keep growing as new search terms appear. Many accounts start with a handful at launch and receive very little attention afterwards, which is one of the more common reasons budget leaks quietly.",
  },
  {
    q: "Should we use broad match keywords?",
    a: "Broad match now reaches well beyond the original keyword. It can work when the account already has reliable conversion data and a strong negative keyword list behind it. Without those controls, spending tends to spread quickly across weak searches, so we usually introduce it later rather than at launch.",
  },
  {
    q: "Should brand searches be reported separately?",
    a: "Yes. People searching your company name already know the brand, so those conversions are cheaper and easier to win. When they sit in the same report as new customer searches, the account can look more efficient than it is. Brand campaigns still have value, but they need their own line.",
  },
  {
    q: "Why do we get plenty of leads but few good ones?",
    a: "Often the tracking treats every form submission as equally valuable. Google then optimises towards whichever action is easiest to generate, which lowers the reported cost per lead while bringing in weaker enquiries. Weighting conversion actions by value, and sending those values back to Google, usually corrects it.",
  },
  {
    q: "What is Performance Max?",
    a: "Performance Max combines Search, Shopping, Display, YouTube, Discover, Gmail and Maps within one automated campaign. You provide the creative assets, audience signals and the goal, and Google decides where the ads appear. It offers less reporting detail than standard campaign types, which is the trade-off that often goes unmentioned.",
  },
  {
    q: "Is Performance Max worth using?",
    a: "Sometimes. Performance Max can work well for ecommerce accounts with a healthy product feed and steady conversion volume. It may struggle when conversion volume is low or lead quality varies widely. We keep structured Search campaigns active alongside it and exclude brand terms, so the reporting gives a more honest view.",
  },
  {
    q: "Does Performance Max bid on our brand searches?",
    a: "It can, unless brand terms are actively excluded. That matters because brand searches convert more cheaply, so including them can make the campaign look stronger by collecting demand the business had already created. We exclude brand terms and report them separately, so the numbers show what the campaign genuinely added.",
  },
  {
    q: "How should location targeting be set up for the UAE?",
    a: "Targeting the whole UAE can waste budget when a business serves only one emirate. Some categories draw customers from further away, so targeting that is too narrow can also limit growth. We start from where enquiries actually come from, which often differs from the assumption the account was built on.",
  },
  {
    q: "Does the UAE's high expatriate turnover affect Google Ads?",
    a: "Usually in your favour. A regularly changing population means a steady stream of people searching for services they have not bought here before, from clinics and schools to movers and car servicing. For many categories that gives Google Ads a more reliable source of new demand than a settled market would.",
  },
  {
    q: "Can you audit our existing Google Ads account?",
    a: "Yes. We review the account structure, search terms, negative keywords, bidding, conversion tracking, brand and non-brand split, Performance Max setup and landing pages. You receive a clear view of where budget is being lost and what we would change. The findings remain yours if you decide not to work with us.",
  },
  {
    q: "Do you handle Google Shopping?",
    a: "Yes. This can include Merchant Center setup, product feed optimisation and Shopping campaign management. Feed quality plays a major role in how products appear and perform. Poorly structured product data can hold the campaign back, and it can often be corrected before more budget is added.",
  },
  {
    q: "Do you run YouTube ads too?",
    a: "Yes. YouTube campaigns run through the same Google Ads account, which allows them to use shared audiences, remarketing lists and conversion tracking. Our YouTube Ads page explains how the video campaigns are structured and which creative assets are needed.",
  },
  {
    q: "How long before Google Ads produces results?",
    a: "Traffic can arrive within days. Meaningful performance usually takes four to eight weeks, because bidding needs conversion data and ad copy needs time to be tested. Results often become more stable from the third month. A promise of results within 24 hours generally covers the early clicks.",
  },
];

/** The mid-page CTA band.
 *
 *  TEAM COPY, 2026-09-08: supplied directly by the team, not taken from the
 *  client document, so this page's CTA band and its source now differ on this
 *  one point. Recorded here rather than silently, because the document is
 *  otherwise the source of truth.
 *
 *  The heading is split across two lines only for typesetting: the second line
 *  is the one set in brand. Heading and button are uppercased by CSS, so the
 *  casing here does not reach the screen; the support line is not, and renders
 *  exactly as written. */
export const growthCta = {
  heading: ["Ready to turn clicks", "into customers?"] as [string, string],
  support:
    "Maximise ROI, Leads & Conversions With Our Google Ads Experts",
  button: "Connect With Dubai's Google Ads Experts",
};

export const finalCta = {
  title: "Start With",
  strokeTitle: "an Account Audit",
  /** Two routes in, and the document writes one for each. Both belong to this
   *  section: the revision keeps them together under "Start With an Account
   *  Audit" and no longer specifies button labels for it, so the submit and
   *  WhatsApp labels below are retained from the earlier draft because a form
   *  still needs one. `running` briefly moved up to the CTA band while that
   *  band had no copy of its own; the team supplied copy for it on 2026-09-08,
   *  so this sentence is back where the document puts it. */
  runningMark: "where budget is being lost",
  running:
    "Already running Google Ads? An account audit can show where budget is being lost and what should change first. You keep the findings even if you decide to stay with your current agency.",
  scratch:
    "Starting from scratch? Tell us what you sell and who you want to reach. We will model a realistic budget and expected cost per acquisition before you commit.",
  primary: "Get a Free Account Audit",
  secondary: "Request a Quote",
  tertiary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";

/** The four proof figures, in the band the Performance Marketing page carries.
 *
 *  TEAM-SUPPLIED, 2026-09-08, from "ENH updates.docx": the team asked for this
 *  page to run the same section with these numbers. They are NOT in this
 *  page's own source document, and nothing on the site can check them, so
 *  they are recorded here as given and dated.
 *
 *  Figures and labels are the document's own strings. The one edit is unit
 *  casing, which is typography rather than copy: the document is set in caps
 *  throughout, so a unit is written here in the band's own casing.
 *  The unit carries the brand accent, the value never does, which is why the
 *  two are separate fields. */
export const resultStats = [
  { figure: "4.0", unit: "x", label: "ROAS ACHIEVED" },
  { figure: "28", unit: "%", label: "LOWER COST PER LEAD" },
  { figure: "35", unit: "+", label: "ACCOUNTS MANAGED" },
  { figure: "450K", unit: "+", label: "AD SPEND MANAGED" },
];
