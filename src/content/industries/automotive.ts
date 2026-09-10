// Automotive (Industries) — page content.
// Copy source: "Automotive.docx" (client-supplied, 2026-09-09). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// ONE IDEA RUNS THROUGH THIS DOCUMENT AND EVERY DRAWING ON THE PAGE COMES OUT
// OF IT: THERE ARE TWO CUSTOMERS ON OPPOSITE CLOCKS, AND THEY NEED DIFFERENT
// EQUIPMENT.
//
// The document states it four times, in four different sections, which is more
// than it says about anything else:
//
//   1. "A prospective buyer may compare vehicles, prices, specifications and
//      dealerships for weeks before making contact. Someone with an urgent
//      repair requirement may choose a workshop within minutes based on
//      location, availability and reviews."
//   2. "These journeys require different keywords, landing pages,
//      advertisements and calls to action."
//   3. Two whole chapters, one for dealerships and one for repair shops, with
//      a different argument in each.
//   4. "A dealership promoting specific vehicles needs a different campaign
//      structure from a repair shop targeting urgent local searches."
//
// So this page is not built on a single journey the way its two siblings are.
// Ecommerce & Retail runs one route with three leaks; Hospitality & Hotels
// fans one arrival into six endings. Here the two journeys are the subject,
// they are drawn at their real relative lengths in the banner, and the two
// chapters that follow are deliberately NOT mirror images of each other: the
// dealership chapter is a long run and the workshop chapter is a local cluster,
// because that is the difference the document is describing.
//
// WEEKS AND MINUTES ARE THE ONLY DURATIONS ON THIS PAGE. The source gives
// exactly those two words and no others, so nothing here carries an axis, a
// scale or a unit. The drawing shows relative extent, which is all the
// document supports.
//
// FIGURES: the results section supplies nine, the opening paragraph summarises
// three of them again, and the PPC section states two more. That repetition is
// the client's own and is left alone rather than edited out. Every figure keeps
// the document's hedge ("more than", "over", "nearly", "approximately").

import type { Faq } from "@/content/services/performance-marketing";

export const meta = {
  title: "Automotive Digital Marketing Agency in Dubai | ENH Marketing",
  description:
    "Generate qualified enquiries, test-drive requests, showroom visits and service bookings through automotive SEO, paid advertising, social media and local search.",
};

/* ---------------------------------------------------------------- banner --- */

export const hero = {
  lines: ["Automotive Digital", "Marketing Agency", "in Dubai"] as [string, string, string],
  sub: "Generate qualified enquiries, test-drive requests, showroom visits and service bookings through automotive SEO, paid advertising, social media and local search.",
  primary: "Plan My Automotive Marketing",
  secondary: "Talk to an Automotive Marketing Expert",
};

/* --------------------------------------------------------------- opening --- */

/** "How Digital Marketing Support Automotive Sales and Service".
 *
 *  The heading's grammar is the document's and is left exactly as written.
 *
 *  Four paragraphs doing four jobs: when the customer is reached, what counts
 *  as an outcome, how the campaign is structured, and what that has produced.
 *  The six actions are marked inside the client's own sentence rather than
 *  lifted into chips, which would print them twice. */
export const opening = {
  title: "How Digital Marketing Support",
  strokeTitle: "Automotive Sales and Service",

  /** THE THREE MOMENTS. This is the sentence the section is built on: it names
   *  three different states a person can be in, and two of the three belong to
   *  the buyer's clock while the third belongs to the driver's. */
  lead: "Digital marketing for the automotive industry helps dealerships, vehicle brands and service centres reach people while they are comparing models, searching for offers or looking for a nearby workshop.",
  leadMark: [
    "comparing models",
    "searching for offers",
    "looking for a nearby workshop",
  ] as [string, string, string],

  /** THE SIX ENDINGS, and the four channels that feed them. */
  actions:
    "ENH Marketing connects search visibility, automotive digital advertising, social media and conversion-focused pages with the actions that matter. These may include test-drive requests, calls, enquiry forms, WhatsApp conversations, showroom direction requests and service appointments.",
  actionsMark: [
    "test-drive requests",
    "calls",
    "enquiry forms",
    "WhatsApp conversations",
    "showroom direction requests",
    "service appointments",
  ],
  /** The four channels, in the order the sentence writes them. */
  channelsMark: [
    "search visibility",
    "automotive digital advertising",
    "social media",
    "conversion-focused pages",
  ] as [string, string, string, string],

  /** THE FOUR STAGES. "the normal customer journey from search and
   *  consideration to enquiry and visit" — the document's own four words, and
   *  the reason the page ends at a physical place rather than at a checkout. */
  journey:
    "As a digital marketing agency in Dubai, we structure each campaign around the normal customer journey from search and consideration to enquiry and visit.",
  journeyStages: ["search", "consideration", "enquiry", "visit"] as [
    string,
    string,
    string,
    string,
  ],

  figures:
    "Across different automotive campaigns, our work has generated more than 45,000 monthly advertising impressions, over 6,800 organic page views in peak months and nearly 50 SEO-driven enquiry conversions.",
  figuresMark: [
    "more than 45,000 monthly advertising impressions",
    "over 6,800 organic page views in peak months",
    "nearly 50 SEO-driven enquiry conversions",
  ],
};

/* -------------------------------------------------------------- strategy --- */

/** "Why Automotive Marketing Needs Its Own Strategy".
 *
 *  THE PAGE'S SIGNATURE SECTION. One sentence holds two journeys whose
 *  timescales do not fit each other — weeks against minutes — and the paragraph
 *  under it says in as many words that they need different equipment. Both
 *  halves are the document's own; the only editing is the split, which drops
 *  nothing and capitalises nothing that was not already capitalised. */
export const strategy = {
  title: "Why Automotive Marketing",
  strokeTitle: "Needs Its Own Strategy",

  /** THE TWO JOURNEYS.
   *
   *  `extent` is the document's own claim about length and nothing more: it
   *  says "for weeks" for one and "within minutes" for the other. There is no
   *  axis, no unit and no number anywhere in the drawing, because the source
   *  gives none — only the two words, and the fact that one is very much
   *  longer than the other.
   *
   *  `carries` is what each journey is comparing while it runs, again the
   *  document's own list. The buyer weighs four things; the driver weighs
   *  three. That asymmetry is the whole argument and it is why the two are not
   *  drawn as mirror images. */
  journeys: [
    {
      who: "A prospective buyer",
      rest: "may compare vehicles, prices, specifications and dealerships for weeks before making contact",
      duration: "for weeks",
      extent: "long" as const,
      carries: ["vehicles", "prices", "specifications", "dealerships"],
    },
    {
      who: "Someone with an urgent repair requirement",
      rest: "may choose a workshop within minutes based on location, availability and reviews",
      duration: "within minutes",
      extent: "short" as const,
      carries: ["location", "availability", "reviews"],
    },
  ],

  /** WHAT THEREFORE HAS TO DIFFER. Four pieces of equipment, named in the
   *  document's own sentence, each of which has to exist twice. */
  requiresStem: "These journeys require different",
  requiresItems: ["keywords", "landing pages", "advertisements", "calls to action"],

  /** AND THE COST OF GETTING IT WRONG — three failures, in the document's own
   *  words, one for each thing a visitor might not manage to do. */
  broad:
    "Broad traffic offers little value if visitors cannot find the relevant model, understand the offer or book the service they need.",
  broadMark: [
    "find the relevant model",
    "understand the offer",
    "book the service they need",
  ],

  /** SIX THINGS THE AGENCY MUST ACCOUNT FOR. The document buries all six in one
   *  sentence at the foot of the section; they are the most concrete piece of
   *  scope on the page and nobody would have read them there. The stem is the
   *  sentence's own opening and the items are its own list. */
  accountStem:
    "An automotive digital marketing agency should account for",
  accountItems: [
    "vehicle research",
    "local intent",
    "changing inventory",
    "model launches",
    "service demand",
    "the steps between an online search and an in-person visit",
  ],
};

/* -------------------------------------------------------------- services --- */

export type Service = {
  no: string;
  title: string;
  body: string;
};

/** "Our Automotive Digital Marketing Services". Six, and every name is on
 *  screen at once in the selector above the drawing: nothing here hides five
 *  services behind a selected sixth. */
export const services = {
  title: "Our Automotive Digital",
  strokeTitle: "Marketing Services",
  items: [
    {
      no: "01",
      title: "Automotive SEO and Dealer SEO",
      body: "Buyers and vehicle owners often search for a specific model, dealership, repair or maintenance service. We improve technical SEO, model pages, service pages, location content and internal links so relevant searches lead to useful information and a clear route towards an enquiry, test drive or service appointment.",
    },
    {
      no: "02",
      title: "Automotive PPC and Digital Advertising",
      body: "We manage Google Search, Display, Bing and Meta campaigns around model interest and service demand. Keywords, audiences, locations, offers, landing pages and conversion tracking are reviewed together so the budget supports test-drive requests, calls, enquiry forms and workshop bookings instead of producing clicks with no clear next step.",
    },
    {
      no: "03",
      title: "Automotive Social Media Marketing",
      body: "Automotive social media marketing can introduce vehicles, strengthen brand perception and keep offers visible during a longer decision process. We plan organic content, launch campaigns, paid promotion, lead forms and retargeting so social activity supports enquiries while giving prospective customers useful reasons to continue considering the business.",
    },
    {
      no: "04",
      title: "Automotive Content and Landing Pages",
      body: "Model pages, comparison content, service pages and campaign landing pages must answer the questions behind each search. We create and improve content around specifications, offers, locations and customer intent, giving visitors clearer information while helping search engines and AI assistants understand the business and its automotive services.",
    },
    {
      no: "05",
      title: "AI Search Visibility",
      body: "AI-powered search features are becoming part of how people compare vehicles and find nearby automotive services. We structure model information, service descriptions, location details, comparison content and FAQs clearly so search engines and AI assistants can interpret the business accurately and retrieve relevant information more easily.",
    },
    {
      no: "06",
      title: "Google Maps and Local Visibility",
      body: "Local search matters when someone needs a nearby dealership, workshop or service centre. We optimise Google Business Profiles, location information, service categories and local landing pages to improve visibility for relevant “near me” searches and support calls, website visits, direction requests and service bookings from nearby customers.",
    },
  ] as Service[],
};

/* ------------------------------------------------------------ what stops --- */

/** "What Prevents Automotive Marketing From Generating More Enquiries?"
 *
 *  A seven-row, three-column table in the source, and the only section on any
 *  of the three industry pages that diagnoses rather than describes. The three
 *  column headers are the document's own and are kept as the register's own
 *  headings, because a symptom, a cause and a remedy are three different kinds
 *  of statement and flattening them into a paragraph loses which is which. */
export const stops = {
  title: "What Prevents Automotive Marketing",
  strokeTitle: "From Generating More Enquiries?",
  headChallenge: "Common challenge",
  headHappening: "What may be happening",
  headAttention: "What needs attention",
  rows: [
    {
      challenge: "Website traffic produces few enquiries",
      happening: "Visitors arrive through broad searches or cannot find a relevant call to action",
      attention: "Stronger model pages, service pages and conversion paths",
    },
    {
      challenge: "Test-drive requests remain low",
      happening: "Vehicle information and booking forms are unclear or difficult to use",
      attention: "Dedicated model landing pages and simpler test-drive forms",
    },
    {
      challenge: "Paid search costs are increasing",
      happening: "Campaigns target broad or irrelevant keywords",
      attention: "Search-term control, clearer campaign structure and better landing pages",
    },
    {
      challenge: "Service centres have weak organic visibility",
      happening: "Repair and maintenance services do not have dedicated pages",
      attention: "Service-specific SEO, local content and technical optimisation",
    },
    {
      challenge: "Google Maps produces limited activity",
      happening: "Business profiles are incomplete or poorly maintained",
      attention: "Accurate listings, relevant categories, reviews and location information",
    },
    {
      challenge: "Social activity generates little action",
      happening: "Content is disconnected from offers, lead forms or retargeting",
      attention: "Campaign planning, paid support and clearer calls to action",
    },
    {
      challenge: "Prospective buyers do not return",
      happening: "Website visitors are not grouped or retargeted according to their interests",
      attention: "Model-specific audiences and follow-up advertising",
    },
  ],
  /** The section's verdict, and the sentence that stops the table reading as
   *  seven separate complaints. */
  verdict:
    "Visibility creates the opportunity. The website, offer and follow-up process determine whether that opportunity becomes an enquiry or appointment.",
  verdictMark: ["The website, offer and follow-up process"],
};

/* ------------------------------------------------------------- dealership --- */

/** "Digital Marketing for Car Dealerships and Automotive Brands".
 *
 *  The long clock. Four paragraphs, and each one is a move further along the
 *  same run: customers start general and narrow, so the section is drawn as a
 *  run that narrows, with one return loop for the people who left. */
export const dealers = {
  title: "Digital Marketing for Car Dealerships",
  strokeTitle: "and Automotive Brands",
  lead: "Dealership marketing needs to support several points in the buying process. Customers may begin with general comparisons before moving towards a particular model, offer, or showroom.",
  /** The narrowing, in the document's own order. */
  narrowing: ["general comparisons", "a particular model", "offer", "showroom"] as [
    string,
    string,
    string,
    string,
  ],
  moves: [
    {
      key: "pages",
      title: "Model pages",
      body: "Model pages should provide useful information and a clear next step.",
    },
    {
      key: "campaigns",
      title: "Paid campaigns",
      body: "Paid campaigns should send people to the most relevant vehicle or offer rather than a general homepage.",
    },
    {
      key: "retargeting",
      title: "Retargeting",
      body: "Retargeting can reconnect the dealership with people who viewed a model without submitting an enquiry.",
    },
  ],
  /** What the search side has to cover. Four areas, the document's own list. */
  searchStem:
    "An automotive dealer SEO marketing agency should also consider",
  searchItems: [
    "branded searches",
    "model searches",
    "dealership locations",
    "comparison-led content",
  ],
  searchTail: "These areas help a dealership remain visible while customers narrow their options.",
  social:
    "Social media can support model launches, promotional offers, vehicle videos and brand recognition. Paid lead campaigns can then reach suitable audiences and direct interested customers towards an enquiry or test-drive action.",
  socialMark: [
    "model launches",
    "promotional offers",
    "vehicle videos",
    "brand recognition",
  ],
};

/* -------------------------------------------------------------- workshop --- */

/** "Digital Marketing for Auto Repair Shops and Service Centres".
 *
 *  The short clock, and composed as the opposite of the section above it on
 *  purpose. Nothing here is a run: the argument is local, immediate and
 *  per-branch, so it is drawn as a place with things around it rather than as
 *  a journey with stages along it. */
export const workshop = {
  title: "Digital Marketing for Auto Repair",
  strokeTitle: "Shops and Service Centres",
  lead: "Auto repair shop digital marketing is driven heavily by immediate need and location. Drivers usually search for a specific service, repair or nearby workshop rather than browsing general automotive content.",
  leadMark: ["immediate need and location"],

  /** What each service needs, as the document's own three questions. */
  pageStem: "Each important service should have a clear page explaining",
  pageItems: ["what is available", "where it is provided", "how to request an appointment"],
  pageTail:
    "Local SEO and Google Business Profile optimisation can help the workshop appear when nearby customers search for maintenance or repairs.",

  paid:
    "Paid search can support high-intent service queries, while retargeting can remind previous visitors about an unfinished booking or relevant offer.",
  paidMark: ["high-intent service queries", "an unfinished booking"],

  /** THE BRANCH. Five things every location needs, and four ways the
   *  visibility is measured. Both are the document's own lists, and they are
   *  the reason this section is a cluster rather than a track. */
  branchStem: "For multi-location service centres, each branch needs accurate",
  branchItems: ["opening hours", "contact information", "categories", "reviews", "directions"],
  measuredStem: "Local visibility should be measured through",
  measuredItems: [
    "calls",
    "website visits",
    "direction requests",
    "completed service appointments",
  ],
};

/* --------------------------------------------------------------- process --- */

/** "How Our Automotive Marketing Process Works". Six stages, each with the
 *  document's own stage number, title and paragraph. */
export const process = {
  title: "How Our Automotive",
  strokeTitle: "Marketing Process Works",
  stages: [
    {
      no: "1",
      title: "Review the Customer Journey",
      body: "We examine how buyers and vehicle owners currently find the business. The review covers search visibility, model and service pages, advertisements, social media, Google Business Profiles and conversion tracking.",
    },
    {
      no: "2",
      title: "Set the Priorities",
      body: "We identify the models, offers, services and locations that need marketing support. Each priority is connected to a specific action such as a test drive, enquiry, call or appointment.",
    },
    {
      no: "3",
      title: "Map Search and Audience Intent",
      body: "Keywords and audiences are grouped according to research, comparison, purchase and service intent. This determines which pages, campaigns and messages should be used.",
    },
    {
      no: "4",
      title: "Improve the Conversion Journey",
      body: "We review landing pages, forms, calls to action, mobile performance and contact options. Visitors should be able to move from a relevant advertisement or search result to the intended action without unnecessary friction.",
    },
    {
      no: "5",
      title: "Launch and Connect the Channels",
      body: "SEO, paid search, social media, local marketing and retargeting are delivered according to the agreed scope. Campaign messages are aligned with the relevant models, services and locations.",
    },
    {
      no: "6",
      title: "Measure and Adjust",
      body: "We track enquiries, test-drive requests, service bookings, calls, cost per lead and local search activity. Budgets and priorities are adjusted according to the campaigns and searches producing useful results.",
    },
  ],
};

/* ------------------------------------------------------------------- ppc --- */

/** "How Do Automotive PPC Campaigns Generate Qualified Leads?"
 *
 *  Eight things a campaign can be structured around, and the document's own
 *  two figures for one campaign. The closing sentence is the section's own
 *  limit and is kept next to the figures rather than filed with the caveat
 *  later on, because it is about these two numbers specifically. */
export const ppc = {
  title: "How Do Automotive PPC Campaigns",
  strokeTitle: "Generate Qualified Leads?",
  lead: "Automotive PPC campaigns reach people who are actively searching for a vehicle, dealership, repair, or service.",
  approach:
    "As an automotive PPC agency, we build campaigns around specific actions rather than treating every website visit as equal. Google Search can capture model and service demand, while Display and Meta can reconnect with visitors who have already shown interest.",
  approachMark: ["specific actions", "rather than treating every website visit as equal"],
  structuredStem: "Campaigns may be structured around:",
  structures: [
    "Specific vehicle models",
    "New or used vehicle offers",
    "Test-drive requests",
    "Dealership locations",
    "Repair and maintenance services",
    "Calls and WhatsApp enquiries",
    "Service appointment bookings",
    "Retargeting and lead generation",
  ],
  /** One campaign, two figures, in the document's own sentence. */
  proof:
    "In one automotive campaign, paid advertising produced more than 1,000 clicks and over 70 enquiry conversions.",
  proofFigures: [
    { figure: "more than 1,000", label: "clicks" },
    { figure: "over 70", label: "enquiry conversions" },
  ],
  limit:
    "The value of an automotive PPC campaign should still be judged by lead quality and cost per enquiry, not the number of impressions alone.",
  limitMark: ["lead quality and cost per enquiry"],
};

/* -------------------------------------------------------------------- ai --- */

/** "Can Automotive Businesses Appear in AI Search Results?"
 *
 *  The document answers its own question with a qualified yes and then spends
 *  two paragraphs on the qualification, so the section leads with the limit
 *  rather than burying it. */
export const ai = {
  title: "Can Automotive Businesses",
  strokeTitle: "Appear in AI Search Results?",
  lead: "Automotive businesses can improve how clearly their information is understood by AI-powered search tools, although placement in a specific answer cannot be guaranteed.",
  leadMark: ["placement in a specific answer cannot be guaranteed"],

  /** THE FIVE THINGS ORGANISED, and what they are organised around. */
  organiseStem: "We organise",
  organiseItems: [
    "vehicle comparisons",
    "model details",
    "service information",
    "FAQs",
    "location data",
  ],
  organiseTail: "around the questions customers ask.",
  consistency:
    "Consistent business information and clear page structures also help search engines and AI assistants understand which models, services and locations are relevant.",

  /** THE FOUR FOUNDATIONS IT DOES NOT REPLACE. The document is explicit that
   *  this is an addition, not a substitution, so the four are named as the
   *  things underneath rather than as four more features. */
  foundationStem:
    "AI search optimisation builds on effective SEO. It does not replace",
  foundationItems: [
    "technical website improvements",
    "useful content",
    "local signals",
    "established search visibility",
  ],
};

/* --------------------------------------------------------------- measure --- */

/** "What We Measure". Eleven rows, two columns, both headers the document's
 *  own. The lead and the closing note are the two sentences that say why the
 *  eleven are the eleven. */
export const measure = {
  title: "What We",
  strokeTitle: "Measure",
  lead: "Automotive marketing should be assessed by the actions that move a customer closer to a sale or service visit.",
  headTrack: "What we track",
  headTells: "What it tells you",
  rows: [
    { track: "Qualified enquiries", tells: "How many relevant prospects contact the business" },
    { track: "Service appointments", tells: "How effectively marketing supports workshop demand" },
    { track: "Calls and WhatsApp enquiries", tells: "Which channels lead to direct conversations" },
    { track: "Form completion rate", tells: "How many visitors complete the intended enquiry form" },
    { track: "Cost per lead", tells: "How efficiently paid campaigns generate enquiries" },
    { track: "Organic conversions", tells: "Which searches and pages produce valuable actions" },
    { track: "Model-page performance", tells: "Which vehicles attract interest and enquiries" },
    { track: "Local search interactions", tells: "How customers use Google Maps and business listings" },
    { track: "Direction requests", tells: "Whether online visibility supports physical visits" },
    { track: "Retargeting conversions", tells: "How often returning visitors complete an action" },
    { track: "Lead quality", tells: "Whether enquiries match the vehicles or services being promoted" },
  ],
  note: "Traffic and reach provide useful context, but consistent qualified enquiries are more valuable than short-lived visibility spikes.",
  noteMark: ["consistent qualified enquiries"],
};

/* --------------------------------------------------------------- results --- */

/** "Automotive Campaign Results".
 *
 *  Nine figures spanning four orders of magnitude, every one keeping the
 *  document's own hedge. `unit` is the rest of the client's phrase and is never
 *  rewritten: "in a month" and "during peak months" are different claims and
 *  both are printed as written. */
export const results = {
  title: "Automotive",
  strokeTitle: "Campaign Results",
  lead: "Across different automotive campaigns, our work has contributed to:",
  items: [
    { figure: "More than 45,000", label: "advertising impressions", unit: "in a month" },
    { figure: "Nearly 20,000", label: "impressions", unit: "in another structured search campaign" },
    { figure: "Over 1,000", label: "paid campaign clicks", unit: "" },
    { figure: "More than 70", label: "paid enquiry conversions", unit: "" },
    { figure: "Over 6,800", label: "organic page views", unit: "during peak months" },
    { figure: "More than 1,100", label: "monthly organic users", unit: "" },
    { figure: "Nearly 50", label: "SEO-driven enquiry conversions", unit: "" },
    { figure: "Over 9,000", label: "Google Business Profile impressions", unit: "" },
    { figure: "Approximately 4,700", label: "Google Maps impressions", unit: "" },
  ],
};

/** The document's own two closing sentences on those figures, in the band this
 *  site keeps for a limit. */
export const caveat = {
  lead: "These figures come from different automotive businesses, campaign periods and scopes.",
  emphasis: "They should not be treated as a guaranteed forecast for every dealership or service centre.",
  commitment:
    "Results vary according to the business, inventory, services, location, competition, budget and work completed.",
};

/* -------------------------------------------------------------- audience --- */

export const audience = {
  title: "Who We",
  strokeTitle: "Work With",
  lead: "Our automotive digital marketing services can support:",
  items: [
    { label: "New vehicle dealerships" },
    { label: "Used car dealers" },
    { label: "Luxury automotive brands" },
    { label: "Auto repair shops" },
    { label: "Vehicle maintenance centres" },
    { label: "Multi-location service centres" },
    { label: "Car rental businesses" },
    { label: "Automotive product and service providers" },
  ],
  /** The note that closes the list, and the page's own thesis stated one last
   *  time: the two clocks need two campaign structures. */
  note: "The strategy is adjusted to the business model. A dealership promoting specific vehicles needs a different campaign structure from a repair shop targeting urgent local searches.",
  noteMark: [
    "A dealership promoting specific vehicles",
    "a repair shop targeting urgent local searches",
  ],
};

/* ------------------------------------------------------------------- why --- */

export const why = {
  title: "Why Choose ENH Marketing for",
  strokeTitle: "Automotive Digital Marketing?",
  lead: "ENH Marketing connects automotive SEO, paid advertising, social media, local search and conversion tracking within one strategy.",
  leadMark: [
    "automotive SEO",
    "paid advertising",
    "social media",
    "local search",
    "conversion tracking",
  ],
  /** Eight single assertions. Each carries its own short list and those lists
   *  are the substance, so they are marked where they stand rather than lifted
   *  out — they are short enough to read inside their own sentence. */
  items: [
    "We separate vehicle research, buying intent and service demand before building campaigns.",
    "Model and service pages are matched with the searches they need to answer.",
    "Paid campaigns are assessed through enquiries and bookings alongside clicks and impressions.",
    "Google Maps activity is tracked through calls, website visits and direction requests.",
    "Social media can combine content, paid lead generation and retargeting.",
    "Campaigns can be planned around individual models, offers, services and locations.",
    "Website and landing-page problems are identified when they restrict conversions.",
    "Search content is structured for both traditional search engines and AI assistants.",
  ],
  itemMarks: [
    ["vehicle research", "buying intent", "service demand"],
    ["the searches they need to answer"],
    ["enquiries and bookings"],
    ["calls", "website visits", "direction requests"],
    ["content", "paid lead generation", "retargeting"],
    ["individual models", "offers", "services", "locations"],
    ["when they restrict conversions"],
    ["traditional search engines and AI assistants"],
  ],
  /** The comparison sentence — what to ask any agency on this list — and the
   *  scope sentence under it. */
  tail: "Businesses comparing automotive digital marketing companies should look at how each agency defines a qualified lead, tracks customer actions and connects campaigns with dealership or workshop objectives.",
  tailMark: [
    "defines a qualified lead",
    "tracks customer actions",
    "connects campaigns with dealership or workshop objectives",
  ],
  scope:
    "As a Dubai digital marketing agency, ENH Marketing can manage a focused automotive digital marketing service or coordinate several channels under a wider campaign.",
};

/* ------------------------------------------------------------------ faqs --- */

export const faqs: Faq[] = [
  {
    q: "What does an automotive digital marketing agency do?",
    a: "An automotive digital marketing agency helps dealerships, repair shops and vehicle brands attract relevant customers through SEO, paid advertising, social media and local search. The work should support measurable actions such as enquiries, calls, test-drive requests, showroom visits and service appointments.",
  },
  {
    q: "How does automotive SEO differ from SEO for other industries?",
    a: "Automotive SEO needs to account for model-level searches, vehicle comparisons, dealership locations and service-specific demand. A specialist SEO agency for automotive businesses should match these searches with relevant model, location and service pages while giving visitors a clear way to enquire or book.",
  },
  {
    q: "Do PPC campaigns work for car dealerships?",
    a: "Yes. PPC can help dealerships appear for competitive model, offer and location searches. Campaigns work best when keywords, advertisements and landing pages are aligned with a specific action. Broad traffic is less useful than test-drive requests, qualified enquiries and calls from people interested in the promoted vehicles.",
  },
  {
    q: "How can social media generate automotive leads?",
    a: "Automotive social media can generate leads through paid forms, retargeting, model campaigns and offer-led advertisements. An automotive social media agency should connect content with a practical next step. Prospective customers may be directed towards a model page, enquiry form, test-drive request, call or WhatsApp conversation.",
  },
  {
    q: "Is digital marketing effective for auto repair shops?",
    a: "Yes. Local SEO, Google Business Profile optimisation, service pages and paid search can help repair shops reach nearby drivers searching for specific services. The strongest campaigns provide accurate location information and make it easy to call, request directions or book a service appointment.",
  },
  {
    q: "What should an automotive PPC company measure?",
    a: "An automotive PPC company should track qualified enquiries, test-drive requests, calls, service bookings, conversion rates, and cost per lead. Clicks and impressions show campaign activity, but they do not confirm whether the advertising is attracting suitable customers.",
  },
  {
    q: "Can you market individual vehicle models or automotive services?",
    a: "Yes. Campaigns can be structured around specific models, offers, repairs, maintenance services and dealership locations. Each campaign should lead to a relevant page containing the information and action the customer expects to find.",
  },
  {
    q: "How is automotive marketing performance reported?",
    a: "Reporting can show search visibility, advertising results, enquiries, calls, bookings, local interactions and conversion rates. The exact measures depend on whether the campaign supports vehicle sales, test drives, dealership visits, repairs or ongoing service demand.",
  },
];

/* ------------------------------------------------------------- final cta --- */

export const finalCta = {
  title: "Tell Us What You Want to",
  strokeTitle: "Generate More Enquiries For",
  body: "Send us your website, locations, priority models or services and the types of enquiries you want to increase.",
  note: "We will review how prospective customers currently find the business and what happens before they contact or visit. The proposal will show whether SEO, paid advertising, social media, local visibility or the conversion journey needs attention first.",
  primary: "Request an Automotive Proposal",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
