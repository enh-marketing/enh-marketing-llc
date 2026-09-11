// Logistics (Industries) — page content.
// Copy source: "Logistics.docx" (client-supplied, 2026-09-09). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// ONE TYPO CORRECTED, AND ONLY ONE. The measurement table's second row reads
// "Requests fro quotation" in the source. It is printed here as "Requests for
// quotation", which is the spelling the same document uses in FAQ 1 ("requests
// for quotation") and in FAQ 5. Nothing else is touched: the document's own
// grammar, hedges and repetitions are left exactly as written, including
// "Effective logistics digital marketing follows a clear journey".
//
// THE DOCUMENT DRAWS ITS OWN PICTURE, AND THE PAGE USES IT. Nothing else in
// this file is as specific as this one line:
//
//     Search → Research → Trust → Enquiry
//
// The client typed those four words with arrows between them. That chain is
// the page's spine: the banner drawing shows what arrives at the end of it,
// the "Why Is Logistics Digital Marketing Different?" section sets the chain
// itself at display scale, and the process section is the work done to it.
//
// THE SECOND IDEA, WHICH IS WHY THE CHAIN IS NOT DRAWN AS A ROUTE. "The buying
// process may involve procurement teams, operations managers and several
// rounds of evaluation before an enquiry becomes a contract." One person does
// not walk this journey once. Several people walk it several times, which is a
// different shape from the single approach the automotive page draws and from
// the single arrival the hospitality page fans out.
//
// FIGURES: the results section supplies ten, three of which the opening
// paragraph states again in its own words. That repetition is the client's and
// is left alone rather than edited out. Every figure keeps the document's hedge
// ("More than", "Over", "Nearly", "Between ... and ..."), and the three ranges
// stay ranges — a range is a different claim from a floor and this page prints
// the difference rather than flattening it.

import type { Faq } from "@/content/services/performance-marketing";

export const meta = {
  title: "Logistics Digital Marketing in Dubai | SEO, PPC & Social Media for Freight Company",
  description:
    "Generate qualified shipment enquiries with professional logistics digital marketing services. Expert logistics SEO, freight PPC management, and B2B social media strategies designed to increase visibility and freight requests.",
};

/* ---------------------------------------------------------------- banner --- */

export const hero = {
  lines: ["Logistics Digital", "Marketing Agency", "in Dubai"] as [string, string, string],
  sub: "Generate qualified freight enquiries, requests for quotations and B2B opportunities through logistics SEO, paid advertising, content and LinkedIn marketing.",
  primary: "Plan My Logistics Marketing",
  secondary: "Talk to a B2B Marketing Expert",
};

/* --------------------------------------------------------------- opening --- */

/** "How Digital Marketing Helps Logistics Companies Generate Enquiries".
 *
 *  Three paragraphs doing three jobs: who is reached and when, what the work
 *  connects to what, and how the campaign is organised — with the figures that
 *  organisation has produced in the client's own closing sentence.
 *
 *  THE FOUR DIMENSIONS ARE THE SECTION'S DRAWING. "specific services, markets,
 *  routes and customer requirements" is the only place in the document that
 *  says how a logistics campaign is structured, and four fields on a docket is
 *  what that sentence describes. */
export const opening = {
  title: "How Digital Marketing Helps",
  strokeTitle: "Logistics Companies Generate Enquiries",

  lead: "Digital marketing for logistics companies helps freight forwarders, shipping providers, warehousing businesses and supply chain companies reach decision-makers while they are researching potential partners.",
  leadMark: ["reach decision-makers while they are researching potential partners"],

  /** THE FOUR CHANNELS AND THE THREE ENDINGS, in one client sentence. The
   *  banner drawing is this sentence and nothing else. */
  actions:
    "ENH Marketing connects search visibility, paid advertising, industry content and LinkedIn activity with measurable actions such as shipment enquiries, RFQs and partnership discussions.",
  channels: ["search visibility", "paid advertising", "industry content", "LinkedIn activity"] as [
    string,
    string,
    string,
    string,
  ],
  outcomes: ["shipment enquiries", "RFQs", "partnership discussions"] as [string, string, string],
  actionsMark: ["shipment enquiries", "RFQs", "partnership discussions"],

  /** HOW THE CAMPAIGN IS ORGANISED. Four fields, the document's own four
   *  words, in the order the sentence writes them. */
  structure:
    "As a digital marketing agency in Dubai, we structure logistics campaigns around specific services, markets, routes and customer requirements.",
  dimensions: ["services", "markets", "routes", "customer requirements"] as [
    string,
    string,
    string,
    string,
  ],

  figures:
    "Across different campaigns, this approach has generated more than 20,000 monthly search impressions, over 3,000 monthly organic visits and more than 60 enquiries during peak periods.",
  figuresMark: [
    "more than 20,000 monthly search impressions",
    "over 3,000 monthly organic visits",
    "more than 60 enquiries during peak periods",
  ],
};

/* -------------------------------------------------------------- services --- */

/** "Our Logistics Digital Marketing Services". Six, and every one of them ends
 *  at the same place — an RFQ, a shipment enquiry or a supplier shortlist — but
 *  reaches it from a different surface. */
export const services = {
  title: "Our Logistics Digital",
  strokeTitle: "Marketing Services",
  items: [
    {
      no: "1",
      title: "Logistics SEO and Search Visibility",
      body: "We improve technical SEO, freight and cargo service pages, route content, internal links and search targeting. The objective is to help procurement teams find the right capability, understand what the company handles and move towards an RFQ, shipment enquiry or partnership discussion.",
    },
    {
      no: "2",
      title: "B2B Lead Generation and Paid Advertising",
      body: "We manage Google Search, LinkedIn and remarketing campaigns around defined services, routes and business audiences. Keywords, targeting, landing pages and conversion tracking are reviewed together so advertising reaches organisations with a relevant requirement and gives them a clear way to request information or pricing.",
    },
    {
      no: "3",
      title: "Logistics Content and Landing Pages",
      body: "Logistics buyers need specific information before contacting a provider. We create and improve service pages, route pages, landing pages, industry content and case studies so visitors can assess capabilities, coverage and experience while search engines can understand how the business fits relevant logistics searches.",
    },
    {
      no: "4",
      title: "LinkedIn and B2B Social Media Marketing",
      body: "LinkedIn can help logistics businesses build visibility with procurement teams, supply chain managers and operations professionals. We plan industry content and targeted campaigns around expertise, routes and service capabilities, giving decision-makers useful reasons to recognise the company and consider it during supplier research.",
    },
    {
      no: "5",
      title: "International Search and Market Expansion",
      body: "Freight and logistics providers may need visibility across several countries, routes or trade corridors. We organise services, destinations and market-specific content clearly so the website can address relevant international searches without creating repetitive pages that add little value for buyers in different markets.",
    },
    {
      no: "6",
      title: "AI Search Visibility",
      body: "AI assistants and AI-powered search features are becoming part of supplier research. We structure service explanations, industry FAQs, location information and route content clearly so these systems can interpret the company accurately and retrieve relevant information when businesses research logistics providers online.",
    },
  ],
};

/* ------------------------------------------------------------ difference --- */

/** "Why Is Logistics Digital Marketing Different?"
 *
 *  THE PAGE'S SIGNATURE SECTION, because the document hands it a diagram. Four
 *  words and three arrows, written by the client:
 *
 *      Search → Research → Trust → Enquiry
 *
 *  Everything else in this section is what happens on that chain: what is being
 *  weighed while it runs (four things), who walks it and how many times
 *  (three claims in one sentence), what a visitor should find when they arrive
 *  (three cargo requirements, named), and what the site has to answer by the
 *  end of it (three questions). */
export const difference = {
  title: "Why Is Logistics Digital",
  strokeTitle: "Marketing Different?",

  /** WHAT IS BEING WEIGHED. Four bases, and the fourth is not a property of the
   *  provider at all — it is a fit with one shipment, which is why the chain
   *  below has to be walked per requirement rather than once. */
  basis:
    "Logistics decisions are usually based on capability, coverage, reliability and suitability for a specific shipment.",
  basisItems: ["capability", "coverage", "reliability", "suitability for a specific shipment"],

  /** WHO WALKS IT, AND HOW OFTEN. The one sentence that makes this journey
   *  unlike every other journey on this site's industry pages. */
  rounds:
    "The buying process may involve procurement teams, operations managers and several rounds of evaluation before an enquiry becomes a contract.",
  roundsMark: ["procurement teams", "operations managers", "several rounds of evaluation"],

  generic: "Generic traffic is unlikely to produce useful leads.",
  requirement:
    "A visitor searching for air freight, cross-trade logistics or temperature-controlled cargo should reach information that directly addresses that requirement.",
  requirements: ["air freight", "cross-trade logistics", "temperature-controlled cargo"] as [
    string,
    string,
    string,
  ],

  /** THE CLIENT'S OWN DIAGRAM. Printed as written, arrows and all. */
  journeyStem: "Effective logistics digital marketing follows a clear journey:",
  journey: ["Search", "Research", "Trust", "Enquiry"] as [string, string, string, string],

  verdict:
    "The website and campaigns must help buyers understand what the company handles, where it operates and how to request a quotation.",
  verdictMark: [
    "what the company handles",
    "where it operates",
    "how to request a quotation",
  ],
};

/* --------------------------------------------------------------- process --- */

/** "How Our Logistics Marketing Process Works". Five stages, and they are not
 *  five equal steps: Stage 1 looks at everything, Stage 2 chooses from it,
 *  Stages 3 and 4 work on what was chosen, and Stage 5 re-chooses. The same
 *  population runs through all five. */
export const process = {
  title: "How Our Logistics",
  strokeTitle: "Marketing Process Works",
  stages: [
    {
      no: "1",
      title: "Review the Existing Position",
      body: "We assess the website, service pages, search visibility, paid campaigns, LinkedIn presence and enquiry tracking. This shows where potential customers are being lost or where important services are difficult to find.",
    },
    {
      no: "2",
      title: "Define Services and Target Markets",
      body: "We identify the freight services, cargo types, locations, routes and customer segments that deserve priority. Each area is connected to a relevant page, campaign and enquiry action.",
    },
    {
      no: "3",
      title: "Build Search and Campaign Visibility",
      body: "SEO, paid search, LinkedIn and content are planned around how procurement teams research logistics providers. Landing pages are developed or improved where the existing website does not answer the buyer’s requirements clearly.",
    },
    {
      no: "4",
      title: "Strengthen Trust and Conversion",
      body: "Service details, industry expertise, case studies and calls to action are reviewed. Visitors should be able to assess the company’s capabilities and request a quotation without searching through unrelated information.",
    },
    {
      no: "5",
      title: "Measure and Adjust",
      body: "We track search visibility, relevant website visits, RFQs, shipment enquiries and campaign costs. Priorities are adjusted according to the services, routes and audiences producing qualified opportunities.",
    },
  ],
};

/* --------------------------------------------------------------- measure --- */

/** "What We Measure". Eleven rows, both column headers the document's own, and
 *  a closing note that is not a twelfth row: it is the reading of the other
 *  eleven, so it takes the twelfth place on the board and is inked. */
export const measure = {
  title: "What We",
  strokeTitle: "Measure",
  lead: "Logistics marketing should be measured by the quality of the business enquiries it produces.",
  headTrack: "What we track",
  headTells: "What it tells you",
  rows: [
    {
      track: "Shipment enquiries",
      tells: "How many prospects request support for a specific shipment",
    },
    {
      track: "Requests for quotation",
      tells: "Which services and campaigns generate commercial opportunities",
    },
    {
      track: "Qualified leads",
      tells: "Whether enquiries match the company’s capabilities and target markets",
    },
    { track: "Organic search conversions", tells: "Which searches and pages produce enquiries" },
    {
      track: "Service page visits",
      tells: "Which logistics solutions attract the most relevant interest",
    },
    {
      track: "Search impressions",
      tells: "How often the company appears for targeted logistics searches",
    },
    {
      track: "Paid campaign conversions",
      tells: "Which advertisements and keywords generate enquiries",
    },
    { track: "Cost per lead", tells: "How efficiently the advertising budget produces opportunities" },
    { track: "LinkedIn performance", tells: "How content and campaigns reach relevant B2B audiences" },
    {
      track: "Returning visitors",
      tells: "Whether buyers return during a longer evaluation process",
    },
    {
      track: "Landing page conversion rate",
      tells: "How effectively each page turns interest into an enquiry",
    },
  ],
  /** The document's two closing sentences, kept apart because they are a
   *  contrast: one names what visibility is worth, the other what commercial
   *  usefulness is. */
  noteVisibility: "Traffic and impressions show visibility.",
  noteUseful:
    "RFQs, shipment details and qualified conversations show whether that visibility is commercially useful.",
  noteUsefulMark: ["RFQs, shipment details and qualified conversations"],
};

/* --------------------------------------------------------------- results --- */

/** "Logistics Campaign Results".
 *
 *  Ten figures, and they are not all the same kind of claim. Seven are floors
 *  ("More than", "Over"), one is a ceiling ("Nearly"), and three are ranges
 *  ("Between 400 and 700"). The page prints that difference instead of
 *  flattening ten hedged claims into ten numerals, because a range and a floor
 *  answer different questions and the client wrote both on purpose.
 *
 *  `bound` is read from the client's own hedge and nothing else:
 *    "More than" / "Over"  -> floor    (at least this)
 *    "Nearly"              -> ceiling  (approaching this)
 *    "Between ... and ..." -> span     (this much to this much)
 *
 *  NO SHARED AXIS. The caveat immediately below says these come from different
 *  logistics businesses, services, markets and campaign periods, so no two of
 *  them belong on one scale. */
export type ResultItem = {
  figure: string;
  label: string;
  unit: string;
  bound: "floor" | "ceiling" | "span";
};

export const results = {
  title: "Logistics",
  strokeTitle: "Campaign Results",
  lead: "Across different logistics campaigns, our work has contributed to:",
  items: [
    {
      figure: "More than 20,000",
      label: "monthly organic search impressions",
      unit: "",
      bound: "floor",
    },
    {
      figure: "Over 20,000",
      label: "paid search impressions",
      unit: "during a monthly campaign period",
      bound: "floor",
    },
    {
      figure: "Nearly 8,000",
      label: "impressions",
      unit: "from another freight-focused campaign",
      bound: "ceiling",
    },
    {
      figure: "More than 3,000",
      label: "monthly organic website visits",
      unit: "",
      bound: "floor",
    },
    {
      figure: "Between 400 and 700",
      label: "targeted monthly visitors",
      unit: "on logistics service pages",
      bound: "span",
    },
    {
      figure: "Between 700 and 900",
      label: "monthly paid advertising clicks",
      unit: "",
      bound: "span",
    },
    {
      figure: "More than 80",
      label: "qualified shipment enquiries",
      unit: "from structured paid campaigns",
      bound: "floor",
    },
    {
      figure: "Between 20 and 25",
      label: "qualified RFQs and shipment leads",
      unit: "in a month",
      bound: "span",
    },
    {
      figure: "Over 3,000",
      label: "monthly LinkedIn impressions",
      unit: "among relevant B2B audiences",
      bound: "floor",
    },
    {
      figure: "More than 60",
      label: "enquiries",
      unit: "during a peak logistics campaign period",
      bound: "floor",
    },
  ] as ResultItem[],
};

/** The document's own three closing sentences on those figures, in the band
 *  this site keeps for a limit. */
export const caveat = {
  lead: "These figures come from different logistics businesses, services, markets and campaign periods.",
  emphasis: "They should not be treated as a guaranteed forecast.",
  commitment:
    "Results vary according to the website, target market, services, competition, budget and work completed.",
};

/* -------------------------------------------------------------- audience --- */

/** "Who We Work With". Nine kinds of operator, and a closing note that does
 *  something the other two lists on this site's industry pages do not: it names
 *  two of the nine and says they need different work. That contrast is the
 *  section's drawing. */
export const audience = {
  title: "Who We",
  strokeTitle: "Work With",
  lead: "Our logistics digital marketing services can support:",
  items: [
    { label: "Freight forwarding companies" },
    { label: "Air, sea and road freight providers" },
    { label: "Shipping and cargo businesses" },
    { label: "Warehousing and distribution companies" },
    { label: "Supply chain service providers" },
    { label: "Cross-trade logistics companies" },
    { label: "Project and specialised cargo providers" },
    { label: "Transportation and last-mile businesses" },
    { label: "Third-party logistics providers" },
  ],
  note: "The marketing strategy is adapted to the services and markets involved.",
  /** The two things the strategy is adapted to. They are the only two
   *  variables the section names, so they are what the field is read on. */
  noteMark: ["the services and markets involved"],

  contrast:
    "A local warehousing company requires a different search and content structure from an international freight forwarder targeting several trade routes.",
  /** The two operators the contrast names, in the order it names them. */
  contrastMark: [
    "A local warehousing company",
    "an international freight forwarder targeting several trade routes",
  ] as [string, string],

  /** WHICH TWO OF THE NINE THE CONTRAST IS TALKING ABOUT, and the words that
   *  say so. Both are on the list above, in the client's own wording, so this
   *  is read rather than decided:
   *
   *    "A local WAREHOUSING company"          -> items[3] "Warehousing and
   *                                              distribution companies"
   *    "an international FREIGHT FORWARDER"   -> items[0] "Freight forwarding
   *                                              companies"
   *
   *  In the order `contrastMark` names them, so key 0 is the local operator
   *  and key 1 is the one reaching several trade routes. */
  contrastRows: [3, 0] as [number, number],
};

/* ------------------------------------------------------------------- why --- */

export const why = {
  title: "Why Choose ENH Marketing for",
  strokeTitle: "Logistics Digital Marketing?",
  lead: "ENH Marketing builds logistics campaigns around qualified B2B demand rather than general website traffic.",
  /** Both halves of the opposition, because the sentence is an opposition:
   *  marking only the first prints a claim, marking both prints the choice. */
  leadMark: ["qualified B2B demand", "general website traffic"],

  /** Seven single assertions. Each carries one specific, and the specific is
   *  what a buyer is reading for, so it is marked where it stands rather than
   *  lifted into a chip — which would print the same words twice. */
  items: [
    "Services, routes, and target markets are clarified before campaigns begin.",
    "SEO focuses on searches connected to real freight and supply chain requirements.",
    "Paid campaigns are measured through enquiries and RFQs alongside clicks.",
    "Content supports the longer research and supplier-evaluation process.",
    "LinkedIn activity can target procurement and operations audiences.",
    "Reporting shows which services, pages and campaigns generate useful opportunities.",
    "Website content is structured for search engines and AI assistants.",
  ],
  itemMarks: [
    ["before campaigns begin"],
    ["real freight and supply chain requirements"],
    ["enquiries and RFQs"],
    ["longer research and supplier-evaluation process"],
    ["procurement and operations audiences"],
    ["useful opportunities"],
    ["search engines and AI assistants"],
  ],

  /** The comparison sentence — what to ask any agency on this list — and the
   *  scope sentence under it. */
  tail: "Businesses comparing options should choose a digital marketing agency for logistics companies that understands how freight enquiries differ from ordinary consumer leads.",
  tailMark: ["how freight enquiries differ from ordinary consumer leads"],
  scope:
    "As a Dubai digital marketing agency, ENH Marketing can manage one priority channel or coordinate SEO, advertising, content and LinkedIn under a wider logistics marketing plan.",
  /** THE CLAUSE THE SEVEN ARE SORTED ON, and the reason the "why" section is a
   *  plan rather than a list. Read the seven claims against this sentence and
   *  they stop being seven features:
   *
   *    items[0]   "clarified BEFORE campaigns begin"        -> before
   *    items[1-4] SEO, paid, content, LinkedIn              -> the four this
   *                                                           sentence names
   *    items[5]   reporting "shows which ... generate"      -> after
   *    items[6]   "Website content is structured for ..."   -> underneath
   *
   *  Four of the seven are one per channel, and the channels are the client's
   *  own four, named here and again in the opening section. The other three are
   *  what holds them: what happens first, what reads them afterwards, and what
   *  the whole thing stands on. */
  scopeMark: ["one priority channel", "SEO, advertising, content and LinkedIn"],
};

/* ------------------------------------------------------------------ faqs --- */

export const faqs: Faq[] = [
  {
    q: "What is digital marketing for logistics companies?",
    a: "Digital marketing for logistics companies uses SEO, paid advertising, content and B2B social media to reach businesses researching freight, shipping and supply chain providers. Its purpose is to generate measurable actions such as RFQs, shipment enquiries and partnership discussions.",
  },
  {
    q: "Why is SEO important for logistics companies?",
    a: "SEO helps logistics companies appear when potential customers search for freight services, cargo solutions, shipping routes or supply chain support. A logistics SEO agency improves technical performance, service pages, route content and website structure so relevant buyers can find and assess the company.",
  },
  {
    q: "Which platforms work best for logistics marketing?",
    a: "Google Search and LinkedIn usually serve different but complementary purposes. Google Search captures people actively researching a logistics service. LinkedIn helps build visibility with procurement teams, supply chain managers and other B2B decision-makers. The right combination depends on the target audience and service.",
  },
  {
    q: "How long does logistics SEO take to produce results?",
    a: "Many logistics SEO campaigns begin showing measurable improvements within three to six months, but timing depends on the website, competition, target markets and existing search visibility. Technical improvements may be completed earlier, while stronger rankings and consistent organic enquiries usually require ongoing work.",
  },
  {
    q: "What does a digital marketing agency for logistics companies do?",
    a: "A digital marketing agency for logistics companies plans and manages the channels used to attract relevant business enquiries. This may include SEO, Google Ads, LinkedIn campaigns, content, landing pages, remarketing and conversion tracking. The scope should reflect the company’s services, routes and commercial priorities.",
  },
  {
    q: "Can logistics marketing target specific freight services or routes?",
    a: "Yes. SEO pages and paid campaigns can be structured around specific freight modes, cargo types, destinations, trade routes and logistics solutions. Each area should have enough useful information to answer the buyer’s requirements and support an RFQ.",
  },
  {
    q: "How is the quality of a logistics lead assessed?",
    a: "A qualified lead should match the provider’s services, geographic coverage and shipment capabilities. Useful enquiry forms may capture the freight type, origin, destination, cargo details and required service. This helps the sales team distinguish genuine opportunities from general or irrelevant enquiries.",
  },
];

/* ------------------------------------------------------------- final cta --- */

export const finalCta = {
  title: "Tell Us Which Logistics",
  strokeTitle: "Services You Want to Promote",
  body: "Send us your website, priority services, target markets and the types of enquiries you want to generate.",
  note: "We will review how procurement teams currently find the business and what happens before they submit an RFQ. The proposal will show whether SEO, paid advertising, LinkedIn, content or conversion tracking needs attention first.",
  primary: "Request a Logistics Proposal",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
