// Ecommerce & Retail (Industries) — page content.
// Copy source: "E-Commerce.docx" (client-supplied, 2026-09-09). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// THE PAGE'S ARGUMENT IS THE GAP BETWEEN TRAFFIC AND REVENUE, AND THE DOCUMENT
// MAKES IT IN ITS FIRST TWO SENTENCES: a store "can attract thousands of
// visitors without producing enough sales or qualified enquiries", and then it
// names three places the demand is lost -- the search terms, the paid budget,
// the product and category pages. Everything after that is a variation on the
// same shape: a route through the store, the places it leaks, and the fact that
// it does not end in one place but two. "Retail purchases, quote requests and
// bulk-order enquiries require different journeys and should not be measured as
// the same conversion" is the sentence the drawings on this page are built
// around, which is why the retail and B2B endings are drawn as separate routes
// rather than as one funnel with a single mouth.
//
// FIGURES: this document is unusually specific and every number below is its
// own -- 8 to 33 first-page keywords over four months, around 100 to more than
// 700 monthly conversions in the first month, a cost per conversion as low as
// AED 2.16, monthly impressions over 47,000, impressions up more than 200% in
// one month, and follower growth doubled. Those are used as given, including
// the document's own hedges ("as low as", "more than", "around"), and the
// document's own closing caveat is printed with them. The drawings quantify
// only those figures; nothing is scaled to a number the document does not
// contain, and no percentage, cost or count is derived from another.

import type { Faq } from "@/content/services/performance-marketing";

export const meta = {
  title: "E-commerce Digital Marketing Services in Dubai | SEO, PPC & Social Media Advertising",
  description:
    "Turn clicks into customers with a performance-driven ecommerce digital marketing services in Dubai. Expert SEO, ecommerce PPC management, and paid social built to scale B2B & B2C brands.",
};

/* ---------------------------------------------------------------- banner --- */

export const hero = {
  /** The document's H1, across the three lines the hero sets. */
  lines: ["Ecommerce Growth", "Marketing Agency", "in Dubai"] as [string, string, string],
  sub: "Build stronger visibility, attract customers with genuine buying intent and turn more of your ecommerce traffic into sales, enquiries and repeat business.",
  primary: "Improve My Ecommerce Performance",
  secondary: "Talk to an Ecommerce Strategist",
};

/* --------------------------------------------------------------- opening --- */

/** "Turn Ecommerce Demand Into Revenue".
 *
 *  Three paragraphs doing three different jobs, so the section is built as
 *  three movements rather than as a column of prose: the failure, the three
 *  named causes of it, and the two endings that failure is measured against.
 *  The causes are marked inside the document's own sentence rather than lifted
 *  into chips, which would print them on the page twice. */
export const opening = {
  title: "Turn Ecommerce Demand",
  strokeTitle: "Into Revenue",
  lead: "An ecommerce website can attract thousands of visitors without producing enough sales or qualified enquiries.",
  /** The three places the demand is lost, in the sentence that names them. */
  causes:
    "The wrong search terms may be bringing people in, paid campaigns may be wasting budget, or product and category pages may not give customers enough information to buy.",
  causesMark: [
    "The wrong search terms may be bringing people in",
    "paid campaigns may be wasting budget",
    "product and category pages may not give customers enough information to buy",
  ],
  /** What ENH connects, and around what. */
  connects:
    "ENH Marketing provides ecommerce digital marketing services for online retailers, manufacturers, distributors and sellers across the UAE. We connect SEO, paid media, social content, conversion improvements and performance tracking around the way your customers make decisions.",
  connectsMark: [
    "SEO",
    "paid media",
    "social content",
    "conversion improvements",
    "performance tracking",
  ],
  /** The two endings. Printed as one sentence, with the two openers acting as
   *  the drawing's legend: choosing one routes the drawn journey to its end. */
  journeys:
    "For retail stores, that may mean increasing online purchases and repeat orders. For B2B ecommerce businesses, it may mean attracting procurement teams, supporting longer evaluations and generating bulk-order enquiries.",
  journeyKeys: ["For retail stores", "For B2B ecommerce businesses"] as [string, string],
};

/* ----------------------------------------------------------------- shift --- */

/** "What Is Changing in Ecommerce Across the UAE?"
 *
 *  Six statements, and every one of them describes something moving rather
 *  than something being. That is why the section is built as one picture that
 *  accumulates a piece per statement instead of as six bullets: the shift is
 *  the content, and a list cannot show accumulation. */
export const shift = {
  title: "What Is Changing in Ecommerce",
  strokeTitle: "Across the UAE?",
  lead: "Customers increasingly research products, compare suppliers and assess prices online before contacting a business or completing an order.",
  intro:
    "This shift is creating new opportunities for ecommerce businesses in Dubai and across the UAE:",
  items: [
    "Customers are moving from offline product discovery to online research",
    "Buyers expect useful product information and clear category structures",
    "Repeat and bulk ordering is becoming more common online",
    "Retailers are connecting physical stores with ecommerce activity",
    "UAE businesses are using digital channels to reach wider GCC markets",
    "Search, social media and paid advertising influence several stages of the buying journey",
  ],
  tail: "For businesses looking for online store marketing in the UAE, visibility is only the beginning. The website and marketing channels must also help customers compare, decide and complete the next step.",
  tailMark: "visibility is only the beginning",
};

/* -------------------------------------------------------------- services --- */

export type Service = { no: string; title: string; body: string };

/** "Our Ecommerce Digital Marketing Services".
 *
 *  Six services, and the document places each of them at a different point in
 *  the same store: the plan under everything, the search surface, the paid
 *  shelf, the social feed, the checkout column, and the return path. So the
 *  section is one drawn store with six regions rather than six cards. */
export const services = {
  title: "Our Ecommerce Digital",
  strokeTitle: "Marketing Services",
  items: [
    {
      no: "01",
      title: "Ecommerce Strategy and Measurement",
      body: "We review your website, products, customers, sales cycle and current marketing performance before building the plan. This establishes which products deserve priority, who the business needs to reach, which channels should support them and how sales, enquiries and other valuable actions will be measured.",
    },
    {
      no: "02",
      title: "Ecommerce SEO Services",
      body: "We improve technical SEO, product and category structures, internal links and buyer-focused content so search engines and AI assistants can understand the store clearly. Keyword targeting covers branded and non-branded demand, helping relevant customers find the business while researching, comparing and preparing to buy.",
    },
    {
      no: "03",
      title: "Ecommerce PPC and Shopping Campaigns",
      body: "We manage Google Search, Shopping, Display, YouTube, Meta and LinkedIn campaigns according to the audience and sales model. Product feeds, search terms, targeting, landing pages and conversion tracking are reviewed together so the budget reaches customers with stronger intent and produces measurable commercial results.",
    },
    {
      no: "04",
      title: "Ecommerce Social Media Marketing",
      body: "Social media helps ecommerce brands introduce products, build credibility and bring interested customers back to the website. We plan organic content, paid campaigns, catalogue activity and retargeting around each platform’s role, with performance assessed through customer actions, overall sales contribution and sustained audience quality.",
    },
    {
      no: "05",
      title: "Conversion and Customer Journey Improvements",
      body: "We review how customers move through product pages, categories, forms, carts and checkout. Mobile usability, calls to action, product information, delivery details and website performance are improved where needed so visitors can understand their options more easily and complete the intended action with confidence.",
    },
    {
      no: "06",
      title: "Retargeting and Repeat Purchase Support",
      body: "Retargeting reconnects the business with people who viewed products, visited key pages, started checkout or purchased previously. Audiences and follow-up campaigns are structured around the normal decision period, helping retail customers return to buy and giving B2B buyers more time to evaluate their options.",
    },
  ] satisfies Service[],
};

/* --------------------------------------------------------------- results --- */

/** Which quantity a run's readout draws. Every value below is the document's
 *  own; the readout charts those figures and nothing else. */
export type Readout =
  /** First-page keywords, before and after. */
  | { kind: "rankings"; from: number; to: number }
  /** Monthly conversions, before and after. */
  | { kind: "conversions"; from: number; to: number }
  /** Impressions multiplied, and audience doubled. */
  | { kind: "reach"; multiple: number; follower: number };

export type Run = { no: string; title: string; body: string[]; readout: Readout };

/** "What Results Has This Approach Produced?"
 *
 *  Three engagements, each with its own measure, so nothing here is averaged,
 *  totalled or compared across the three. The readout beside each run charts
 *  that run's own figures at the ratio the document states -- 8 of 33, 100
 *  against more than 700, impressions up more than 200% -- and the document's
 *  closing caveat is printed underneath all three rather than tucked away. */
export const results = {
  title: "What Results Has This",
  strokeTitle: "Approach Produced?",
  runs: [
    {
      no: "01",
      title: "Ecommerce SEO Growth",
      body: [
        "In one ecommerce SEO engagement, first-page rankings increased from 8 to 33 keywords. During the same four-month period, enquiry-related actions such as calls, WhatsApp clicks and orders rose consistently. The change showed that broader non-branded visibility was bringing more customers to the website.",
      ],
      readout: { kind: "rankings", from: 8, to: 33 },
    },
    {
      no: "02",
      title: "PPC Conversion Growth",
      body: [
        "After restructuring paid search for an ecommerce business in the pharmacy and wellness sector, monthly conversions increased from around 100 to more than 700 within the first month.",
        "The campaign maintained a cost per conversion as low as AED 2.16 while monthly impressions exceeded 47,000.",
      ],
      readout: { kind: "conversions", from: 100, to: 700 },
    },
    {
      no: "03",
      title: "Social Media Growth",
      body: [
        "In ecommerce social campaigns for retail and lifestyle businesses, impressions increased by more than 200% within one month, while engagement and profile activity also improved. Another campaign doubled follower growth within weeks, creating a larger audience for retargeting and future paid activity.",
      ],
      readout: { kind: "reach", multiple: 3, follower: 2 },
    },
  ] satisfies Run[],
  caveat:
    "Results vary according to the business, market, website, competition, budget and work completed.",
};

/* --------------------------------------------------------------- process --- */

export type Stage = { stage: string; title: string; body: string };

/** "How Our Ecommerce Marketing Process Works".
 *
 *  Six stages, and the sixth returns to the first: "The next priorities come
 *  from the products, pages and campaigns producing useful commercial
 *  results." A ladder would assert an end the document does not give it, so
 *  the stages are drawn as a closed circuit instead. */
export const process = {
  title: "How Our Ecommerce",
  strokeTitle: "Marketing Process Works",
  stages: [
    {
      stage: "Stage 1",
      title: "Audit the Current Setup",
      body: "We review the ecommerce platform, technical health, product structure, traffic sources, paid campaigns, social activity and conversion tracking. The audit identifies what is restricting performance and which issues should be addressed first.",
    },
    {
      stage: "Stage 2",
      title: "Map the Customer Journey",
      body: "We identify how customers discover products, what they compare and which actions indicate genuine intent. Retail purchases, quote requests and bulk-order enquiries require different journeys and should not be measured as the same conversion.",
    },
    {
      stage: "Stage 3",
      title: "Build the Channel Plan",
      body: "SEO, paid media, social content and retargeting are assigned clear roles. Budgets and priorities are based on the products, audiences and markets that matter most to the business.",
    },
    {
      stage: "Stage 4",
      title: "Improve the Website and Content",
      body: "We optimise technical elements, category pages, product information, internal links, landing pages and calls to action where required. The purpose is to make the store easier to find, understand and use.",
    },
    {
      stage: "Stage 5",
      title: "Launch and Refine Campaigns",
      body: "Search, Shopping, social and retargeting campaigns are launched or restructured according to the agreed scope. Search terms, audiences, placements and conversion behaviour are reviewed regularly.",
    },
    {
      stage: "Stage 6",
      title: "Measure and Adjust",
      body: "We report on sales, enquiries, costs and customer behaviour. The next priorities come from the products, pages and campaigns producing useful commercial results.",
    },
  ] satisfies Stage[],
};

/* --------------------------------------------------------------- measure --- */

export type Signal = { track: string; tells: string };

/** "What Do We Measure" — the document's own two-column table, kept as a
 *  table's worth of data with its own column headers. */
export const measure = {
  title: "What Do",
  strokeTitle: "We Measure",
  lead: "Ecommerce reporting should show more than traffic and impressions.",
  headTrack: "What we track",
  headTells: "What it tells you",
  rows: [
    { track: "Ecommerce revenue", tells: "How much tracked revenue the website generates" },
    { track: "Online purchases", tells: "The number of completed transactions" },
    {
      track: "Qualified inquiries",
      tells: "Calls, forms, WhatsApp actions and quote requests with commercial value",
    },
    { track: "Conversion rate", tells: "How often visitors complete the intended action" },
    { track: "Cost per conversion", tells: "What the business pays for each tracked result" },
    { track: "Return on ad spend", tells: "How much tracked revenue is generated by paid media" },
    {
      track: "Product performance",
      tells: "Which products and categories attract demand and produce sales",
    },
    {
      track: "Channel contribution",
      tells: "How SEO, paid media and social support conversions",
    },
    { track: "Repeat purchase activity", tells: "How often customers return and buy again" },
    {
      track: "Assisted conversions",
      tells: "Which channels influence a sale before the final visit",
    },
  ] satisfies Signal[],
  note: "The most useful measures depend on the sales model. A retailer may prioritise purchases and revenue, while a distributor may focus on qualified enquiries and bulk orders.",
  noteMark: "depend on the sales model",
};

/* ------------------------------------------------------------- platforms --- */

/** "Ecommerce Platforms and Marketing Tools".
 *
 *  The closing sentence is the section: the platform is the floor, and four
 *  named things standing on it are what decide whether it carries any weight.
 *  The eleven tools go into the floor; the four are marked in the sentence and
 *  raise their own column when pointed at, so no word is printed twice. */
export const platforms = {
  title: "Ecommerce Platforms",
  strokeTitle: "and Marketing Tools",
  lead: "We work with platforms and tools commonly used by ecommerce businesses, including:",
  items: [
    "Shopify",
    "WooCommerce",
    "Magento",
    "Custom ecommerce platforms",
    "Google Ads",
    "Google Shopping",
    "Google Analytics and conversion tracking",
    "Meta Ads",
    "LinkedIn Ads",
    "SEO and performance tracking tools",
    "Reporting and attribution systems",
  ],
  verdict:
    "The platform provides the infrastructure. Strategy, product information, tracking and ongoing execution determine how effectively it supports growth.",
  /** The four that stand on the floor, in the order the sentence writes them.
   *  Order matters: the drawing's columns are indexed against this array. */
  verdictMark: ["Strategy", "product information", "tracking", "ongoing execution"] as [
    string,
    string,
    string,
    string,
  ],
};

/* -------------------------------------------------------------- audience --- */

/** "Who Do We Work With". Eight kinds of business and nothing else known about
 *  any of them, so the section adds no description to a single one. The
 *  closing sentence names four steps, and those are marked where they stand. */
export const audience = {
  title: "Who Do",
  strokeTitle: "We Work With",
  lead: "Our ecommerce marketing approach can support:",
  items: [
    { label: "Online retailers" },
    { label: "Manufacturers selling directly online" },
    { label: "Wholesale and distribution businesses" },
    { label: "Retailers connecting physical and online sales" },
    { label: "Brands with large or complex product ranges" },
    { label: "Businesses targeting repeat customers" },
    { label: "Companies selling through bulk orders or quote requests" },
    { label: "UAE ecommerce businesses expanding into GCC markets" },
  ],
  tail: "If the customer needs to research, compare, purchase or request approval, the marketing plan should support each of those steps.",
  tailMark: ["research", "compare", "purchase", "request approval"],
};

/* ------------------------------------------------------------------- why --- */

export const why = {
  title: "Why Choose ENH Marketing",
  strokeTitle: "for Ecommerce?",
  lead: "The best digital marketing agency for ecommerce should understand how the website, campaigns and sales process work together.",
  opening:
    "ENH Marketing brings SEO, PPC, social media, content, website support and reporting into one ecommerce strategy.",
  items: [
    "We prioritise customer intent over traffic volume",
    "SEO and paid campaigns are planned around product and category priorities",
    "Retail and B2B ecommerce journeys are treated differently",
    "Conversion tracking is connected to meaningful actions",
    "Reporting focuses on sales, qualified enquiries and efficiency",
    "UAE and GCC customer behaviour is considered during planning",
    "Website problems are identified alongside marketing issues",
    "Priorities are adjusted according to performance data",
  ],
  tail: "Businesses comparing ecommerce marketing agencies should ask how success will be measured, what access they will retain and how each channel contributes to the commercial goal.",
};

/* ------------------------------------------------------------------ faqs --- */

export const faqs: Faq[] = [
  {
    q: "What does an ecommerce marketing agency do?",
    a: "An ecommerce marketing agency helps online stores attract relevant customers and convert more of that demand into purchases, enquiries or repeat orders. The work may include ecommerce SEO, Google Ads, Shopping campaigns, social media, content, retargeting, conversion tracking and website improvements.",
  },
  {
    q: "Do you work with both retail and B2B ecommerce businesses?",
    a: "Yes. We work with online retailers, manufacturers, wholesalers, distributors and businesses selling through bulk orders or quote requests. The strategy is adapted to the customer journey, sales cycle and type of conversion involved.",
  },
  {
    q: "Do you provide ecommerce SEO and PPC together?",
    a: "Yes. Ecommerce SEO builds organic visibility over time, while PPC captures active demand through paid campaigns. The two can be managed together or provided separately according to the website’s priorities and existing internal resources.",
  },
  {
    q: "How long does ecommerce SEO take to show results?",
    a: "Most ecommerce SEO campaigns need approximately three to six months to show meaningful progress. The timeline depends on the website’s technical condition, current authority, competition, product range and the amount of work required.",
  },
  {
    q: "Which ecommerce platforms do you support?",
    a: "We work with Shopify, WooCommerce, Magento and custom ecommerce platforms. The initial review confirms what access is available, how the website is structured and whether any platform limitations affect the proposed work.",
  },
  {
    q: "Can you manage Google Shopping and paid social campaigns?",
    a: "Yes. We can manage Google Search, Shopping, Display, YouTube, Meta and LinkedIn campaigns according to the audience and type of ecommerce business. The proposal will confirm which platforms are included and how conversions will be tracked.",
  },
  {
    q: "How do you measure ecommerce marketing performance?",
    a: "We measure the actions that matter to the business, such as revenue, online purchases, qualified enquiries, cost per conversion, return on ad spend and repeat purchases. The reporting scope is agreed before campaigns begin.",
  },
  {
    q: "Do you work with ecommerce businesses outside Dubai?",
    a: "Yes. ENH Marketing supports ecommerce businesses across the UAE and can plan campaigns for wider GCC markets. Target locations, languages, delivery coverage and customer behaviour are considered when building the strategy.",
  },
  {
    q: "How much does ecommerce marketing in Dubai cost?",
    a: "The cost depends on the website, product range, target markets, required channels, content needs and advertising budget. We review the current setup before providing a proposal showing the management scope, recommended media spend and any separate development work.",
  },
  {
    q: "What should we prepare before contacting an ecommerce marketing agency?",
    a: "Share your website, ecommerce platform, priority products, target markets, current marketing activity and the main performance problems you want to solve. Access to existing analytics and advertising data helps the team assess the opportunity more accurately.",
  },
];

/* -------------------------------------------------------------- final cta --- */

export const finalCta = {
  title: "Tell Us Where Your Ecommerce",
  strokeTitle: "Business Needs to Grow",
  body: "Send us your website, ecommerce platform, priority products, target markets and the challenges affecting current performance.",
  note: "We will review the setup and recommend where SEO, paid media, social content, conversion work or tracking should take priority.",
  primary: "Request an Ecommerce Marketing Proposal",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
