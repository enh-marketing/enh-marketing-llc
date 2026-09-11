// Marketing Consultation — page content.
// Copy source: "Marketing Consultation.docx" (client-supplied, 2026-09-11). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// WHAT THIS DOCUMENT IS ABOUT, AND WHY THE PAGE IS SHAPED THE WAY IT IS.
// Every other page on this site sells a channel. This one sells a DECISION.
// Its opening sentence is explicit about it: "Businesses rarely struggle
// because they have no marketing options. The problem is deciding which
// options deserve their time and budget." So the page is built around the two
// halves of that sentence -- four questions nobody has answered, and the
// ordered plan that answering them produces.
//
// THE ONE CLAIM THAT IS THIS DOCUMENT'S ALONE:
//
//     "You receive a realistic order of work instead of a list where
//      everything appears equally important."
//
// An ORDER, not a list. That is what the banner drawing shows (a plan cut to
// fit four stated limits, with one entry first), and it is why the "why
// choose" section closes on the document's own comparison rather than on a
// seventh claim.
//
// FOUR QUESTIONS, FOUR DIFFERENT SHAPES OF QUESTION. The second paragraph
// asks four things, and read against each other they are not four of the same
// question: one is a choice between two, one is a question of order, one is a
// selection from many, and one is a fault somewhere along a chain of four.
// The section draws all four and answers none of them, because the document
// answers none of them.
//
// THE ENUMERATIONS ARE THE SUBSTANCE, AND THEY ARE BURIED IN PROSE. Each of
// the nine coverage areas hides a list inside a sentence -- eight channels
// audited, seven possible priorities, seven things assessed on a website,
// seven tools. Those lists are what a buyer is actually reading for, so each
// paragraph is split at the document's own colonless comma run into a stem,
// the register itself, and whatever the paragraph says afterwards. Nothing is
// reworded and no word is printed twice: where a register is lifted out, the
// prose around it no longer repeats it.
//
// NO FIGURES ANYWHERE. The document supplies exactly one number -- "more than
// 15 years of experience" -- and no results, percentages or client outcomes.
// Nothing is invented to fill a results band, so the page has none.

import type { Faq } from "@/content/services/performance-marketing";

export const meta = {
  // Both fields are the document's own H1 and banner sentence, with only the
  // site's standard title suffix added. No meta copy is written here.
  title: "Digital Marketing Consulting Services Dubai | Strategy",
  description:
    "Grow your business with digital marketing consulting services in Dubai. Get expert marketing strategies, insights and actionable plans to drive growth.",
};

/* ---------------------------------------------------------------- banner --- */

export const hero = {
  lines: ["Digital Marketing", "Consultant", "in Dubai"] as [string, string, string],
  sub: "Get a clear digital marketing strategy based on your business goals, current performance, audience and available budget.",
  primary: "Book a Marketing Consultation",
  secondary: "Talk to a Strategist",
  /** The four limits the banner sentence says the strategy is based on. They
   *  are the four edge stops in the banner drawing and they are named once,
   *  in the sentence above, never on the drawing itself. */
  basis: ["business goals", "current performance", "audience", "available budget"] as [
    string,
    string,
    string,
    string,
  ],
};

/* --------------------------------------------------------------- opening --- */

/** "Stop Spending Without a Clear Marketing Priority".
 *
 *  The four questions arrive as one paragraph in the source and stay one
 *  paragraph here: they are the drawing's key, marked in place, so no question
 *  is printed twice. `questions` holds each as a verbatim, contiguous
 *  substring of `asks`, which is `MarkedKeys`' contract. */
export const opening = {
  title: "Stop Spending Without",
  strokeTitle: "a Clear Marketing Priority",

  lede: "Businesses rarely struggle because they have no marketing options. The problem is deciding which options deserve their time and budget.",
  ledeMark: ["deciding which options deserve their time and budget"],

  asks: "Should you invest in SEO or paid advertising? Does the website need improvement before more traffic is sent to it? Which social media platforms matter? Is weak performance caused by the campaign, the offer, the content or the follow-up process?",
  questions: [
    "Should you invest in SEO or paid advertising?",
    "Does the website need improvement before more traffic is sent to it?",
    "Which social media platforms matter?",
    "Is weak performance caused by the campaign, the offer, the content or the follow-up process?",
  ] as const,

  consultant:
    "A digital marketing consultant helps answer those questions before more money is committed.",
  consultantMark: ["before more money is committed"],

  /** What is reviewed, and what the review produces. Two sentences in the
   *  source and two here, because they are two different lists doing two
   *  different jobs and one marked colour across both would flatten them.
   *  Both keep their lists inline and marked rather than lifted into chips:
   *  they read as sentences, and lifting them would print the same words
   *  twice. */
  reviews:
    "ENH Marketing reviews your current activity, customer journey, data, competitors and commercial goals.",
  reviewsMark: [
    "current activity",
    "customer journey",
    "data",
    "competitors",
    "commercial goals",
  ],

  strategy:
    "We then develop a prioritised strategy showing what to improve, which channels to use, what to measure and what should happen first.",
  strategyMark: ["what to improve", "which channels to use", "what to measure"],
  /** Marked apart from the other three, and this is the whole page's thesis:
   *  an order, not a list. It is the one thing the banner drawing draws. */
  first: "what should happen first",

  modes:
    "The consultation can support a new marketing plan, fix an existing one or give an internal team clearer direction.",
  modesMark: [
    "support a new marketing plan",
    "fix an existing one",
    "give an internal team clearer direction",
  ],
};

/* -------------------------------------------------------------- coverage --- */

/** "What Our Marketing Consultation Covers". Nine areas.
 *
 *  EACH AREA IS SPLIT, NOT REWRITTEN. `stem` is the clause the document runs
 *  its list off, `items` are that list's members verbatim and in the source's
 *  order, and `tail` is whatever the paragraph says after the list closes.
 *  Read stem + items + tail back together with the source's own commas and
 *  the paragraph is intact. Where the document qualifies a list -- "This may
 *  include ... according to the business" -- the qualifier is kept as its own
 *  conditional register rather than flattened into the first one, because a
 *  "may" is a different promise from a "we do".
 * */
export const coverage = {
  title: "What Our Marketing",
  strokeTitle: "Consultation Covers",
  items: [
    {
      no: "01",
      title: "Current Marketing Audit",
      stem: "We review the work already being done across",
      items: [
        "your website",
        "search visibility",
        "advertising",
        "social media",
        "content",
        "email",
        "analytics",
        "other active channels",
      ],
      tail: "The audit identifies what is working, where money or effort is being lost and which gaps need attention first.",
      tailMark: ["which gaps need attention first"],
    },
    {
      no: "02",
      title: "Business and Commercial Goals",
      lead: "Marketing goals need to connect to something the business values.",
      stem: "We clarify whether the priority is",
      items: [
        "generating enquiries",
        "increasing sales",
        "entering a market",
        "improving customer retention",
        "building awareness",
        "supporting a launch",
        "reducing dependence on one acquisition channel",
      ],
    },
    {
      no: "03",
      title: "Audience and Customer Journey",
      lead: "We examine who the business needs to reach, what influences their decision and which steps they take before contacting or buying.",
      stem: "This helps determine the",
      items: ["messages", "content", "platforms", "conversion points"],
      tail: "required at each stage of the journey.",
    },
    {
      no: "04",
      title: "Competitor and Market Review",
      stem: "Competitor activity can reveal",
      items: [
        "where the market is crowded",
        "where expectations are changing",
        "where the business has room to position itself differently",
      ],
      tail: "We review relevant competitors without treating imitation as a strategy. The purpose is to understand the market and find a clearer place within it.",
      tailMark: ["without treating imitation as a strategy"],
    },
    {
      no: "05",
      title: "Brand Positioning and Messaging",
      lead: "Unclear positioning weakens every channel built around it.",
      stem: "We review how the business explains its value, which audiences it addresses and whether its",
      items: ["website", "campaigns", "content"],
      tail: "communicate a consistent reason to choose it.",
    },
    {
      no: "06",
      title: "Website and Conversion Review",
      lead: "Sending more traffic to a weak website usually increases the cost of the same problem.",
      leadMark: ["increases the cost of the same problem"],
      stem: "We assess the",
      items: [
        "website structure",
        "service or product pages",
        "calls to action",
        "forms",
        "mobile experience",
        "tracking",
        "key conversion journeys",
      ],
      tail: "before recommending additional traffic.",
    },
    {
      no: "07",
      title: "Search and Content Strategy",
      stem: "We identify the subjects and searches that matter to the business, then decide which content belongs on",
      items: ["service pages", "landing pages", "blogs", "videos", "social platforms"],
      /** The document's own "may", kept as a "may". */
      mayStem: "This may include",
      may: ["SEO", "local search", "ecommerce optimisation", "AEO", "AI search visibility"],
      mayTail: "according to the business.",
    },
    {
      no: "08",
      title: "Social Media Strategy",
      lead: "The consultation defines what role social media should play and which platforms are relevant.",
      stem: "We review",
      items: [
        "content themes",
        "formats",
        "posting requirements",
        "production needs",
        "paid distribution",
        "the connection between social activity and wider business goals",
      ],
    },
    {
      no: "09",
      title: "Marketing Technology and Automation",
      lead: "The consultation can also review the tools supporting marketing and sales.",
      mayStem: "This may include",
      may: [
        "analytics",
        "CRM systems",
        "lead routing",
        "dashboards",
        "email automation",
        "conversational AI",
        "repetitive processes that could be connected or simplified",
      ],
    },
  ],
};

/* ------------------------------------------------------------------- why --- */

/** "Why Choose ENH Marketing for Marketing Consultation in Dubai?"
 *
 *  Six claims, each a position plus the reason for it. The source numbers them
 *  across six separate Word lists, so the numbering in the file is meaningless
 *  and the ORDER is what is kept -- these are the document's own six, in the
 *  document's own sequence.
 *
 *  THE SECTION OPENS AND CLOSES ON SOMETHING THAT IS NOT A CLAIM. The first
 *  sentence is a test any strategy has to pass ("survive budgets, deadlines,
 *  internal approvals and the everyday realities of running a business") and
 *  the last two are a test to apply to everybody on the shortlist, this agency
 *  included. Both are set apart from the run rather than folded into it. */
export const why = {
  title: "Why Choose ENH Marketing for",
  strokeTitle: "Marketing Consultation in Dubai?",

  survive:
    "A strategy is only useful when it can survive budgets, deadlines, internal approvals and the everyday realities of running a business.",
  surviveMark: [
    "budgets",
    "deadlines",
    "internal approvals",
    "the everyday realities of running a business",
  ],

  experience:
    "ENH Marketing has more than 15 years of experience delivering websites, SEO, social media, content, advertising, lead generation, video and digital campaigns across the UAE.",
  experienceMark: [
    "more than 15 years",
    "websites",
    "SEO",
    "social media",
    "content",
    "advertising",
    "lead generation",
    "video",
    "digital campaigns",
  ],

  items: [
    {
      no: "01",
      claim: "We review the existing work before recommending new activity",
      reason: "The answer may be to fix what you already have rather than add another channel.",
      reasonMark: ["fix what you already have"],
    },
    {
      no: "02",
      claim: "Recommendations are prioritised by business value, effort and urgency",
      reason:
        "You receive a realistic order of work instead of a list where everything appears equally important.",
      reasonMark: ["a realistic order of work"],
    },
    {
      no: "03",
      claim: "Marketing and sales are reviewed together",
      reason:
        "Generating more leads will not solve slow follow-up, poor qualification or an unclear sales process.",
      reasonMark: ["slow follow-up", "poor qualification", "an unclear sales process"],
    },
    {
      no: "04",
      claim: "Channel recommendations are based on the audience and objective",
      reason:
        "We do not force every business into the same combination of SEO, social media and paid advertising.",
      reasonMark: ["We do not force every business into the same combination"],
    },
    {
      no: "05",
      claim: "Budgets are considered while the strategy is being developed",
      reason: "The plan needs to reflect what the business can realistically implement.",
      reasonMark: ["can realistically implement"],
    },
    {
      no: "06",
      claim: "Our specialists work across strategy and delivery",
      reason:
        "This allows us to test whether a recommendation is practical before placing it in the roadmap.",
      reasonMark: ["before placing it in the roadmap"],
    },
  ],

  /** The closing comparison, which is the section's argument rather than a
   *  seventh claim: four things to ask any consultant for, and the thing that
   *  is not a strategy. */
  ask: "Businesses comparing a digital marketing consultant in Dubai should ask what research, analysis, deliverables and implementation guidance are included.",
  askMark: ["research", "analysis", "deliverables", "implementation guidance"],
  verdict: "A meeting followed by general advice is not a marketing strategy.",
};

/* ------------------------------------------------------------ industries --- */

/** "Industries We Work With". Twelve names, and nothing attached to any of
 *  them -- no size, market or service.
 *
 *  SO THE SECTION IS NOT ABOUT THE TWELVE. Read the block again and the list
 *  is not the information: "such as" says it is not even complete. The
 *  information is the two sentences under it, and between them they make one
 *  argument -- the same three deliverables, twelve businesses, and they must
 *  not come out the same, because what decides them is the buying process and
 *  not the wish for growth that all of them share.
 *
 *  THAT IS WHAT THE SECTION HAS TO LET A READER RUN, and it is why nothing
 *  here is drawn per sector. `contrastWhat` are the three columns of the
 *  instrument; `contrastHold` is the phrase inside the client's own sentence
 *  that pulls every row onto the template so a reader can see what "the same"
 *  would actually look like, and let go. */
export const industries = {
  title: "Industries",
  strokeTitle: "We Work With",
  lead: "Our consultation and strategy work can support businesses across areas such as:",
  items: [
    "Professional services",
    "Healthcare and wellness",
    "Real estate and property services",
    "Hospitality and food and beverage",
    "Retail and ecommerce",
    "Logistics and industrial businesses",
    "Technology and B2B services",
    "Education and training",
    "Automotive",
    "Home and trade services",
    "Events and entertainment",
    "Corporate and government-related organisations",
  ],

  /** Two sentences, kept apart because they do two different jobs: the first
   *  states the rule, the second is the worked example of it. */
  rule: "The strategy changes according to the buying process.",

  contrast:
    "A restaurant, medical centre and B2B technology company should not receive the same channel mix, content plan or measurement framework simply because all three want growth.",
  /** The three businesses the sentence names as examples, and the three things
   *  it says should differ between them. Marked apart from each other because
   *  they are the two halves of the comparison, and marking all six one colour
   *  would flatten it. NO SECTOR IS WIRED TO AN EXAMPLE: reading "A
   *  restaurant" as an instance of "Hospitality and food and beverage" is an
   *  inference, and the document does not make it. */
  contrastWho: ["A restaurant", "medical centre", "B2B technology company"],
  /** The three deliverables, and the instrument's three columns. */
  contrastWhat: ["channel mix", "content plan", "measurement framework"],
  /** The phrase the whole section turns on, and its only control. Holding it
   *  aligns every row on the template; releasing it returns them. Nothing is
   *  reworded to make a button: the button is two words the client wrote. */
  contrastHold: "the same",
};

/* ------------------------------------------------------------------ faqs --- */

export const faqs: Faq[] = [
  {
    q: "What does a digital marketing consultant do?",
    a: "A digital marketing consultant reviews the business, audience, current marketing, competitors and performance data before recommending what should happen next. The work may cover positioning, websites, search, social media, advertising, content, lead generation, analytics and marketing technology.",
  },
  {
    q: "How is a marketing consultant different from a digital agency?",
    a: "A consultant primarily provides analysis, direction and strategic guidance. A digital agency usually implements marketing activity through specialist teams. ENH Marketing provides both services, so you can request a standalone consultation or continue into implementation.",
  },
  {
    q: "What is included in a digital marketing consultation?",
    a: "The exact scope depends on the business and the decisions that need to be made. It can include discovery meetings, audits, competitor research, audience analysis, channel recommendations, content direction, budget guidance, KPIs and a prioritised implementation roadmap.",
  },
  {
    q: "Do you need access to our marketing accounts?",
    a: "Access to analytics, advertising platforms, social accounts, CRM reports and previous campaign data can make the review more accurate. We confirm which accounts and reports are required before the audit begins. The strategy can still proceed with limited data, but those limitations will be stated.",
  },
  {
    q: "Can you review work completed by our current agency?",
    a: "Yes. We can review the strategy, campaigns, reports and results produced by an existing agency or supplier. The purpose is to identify what is working, what needs improvement and whether the current activity supports the business goals.",
  },
  {
    q: "Can you work with our internal marketing team?",
    a: "Yes. The consultation can provide research, strategic direction and a roadmap for an internal team to implement. We can also join planning or review meetings when the team needs ongoing strategic support.",
  },
  {
    q: "Do you also implement the marketing strategy?",
    a: "Yes. ENH Marketing can deliver websites, SEO, content, social media, paid advertising, video, lead generation, analytics and other agreed services. Implementation is optional and is quoted separately unless it forms part of the original engagement.",
  },
  {
    q: "How long does a marketing consultation take?",
    a: "The timeframe depends on the size of the business, number of channels, availability of data and depth of research required. A focused consultation may take less time than a complete strategy covering several markets, departments or business units. The schedule is confirmed in the proposal.",
  },
  {
    q: "How much does a digital marketing consultant in Dubai cost?",
    a: "The fee depends on the scope, research required, number of stakeholders, channels being reviewed and the detail expected in the final strategy. You will receive a proposal listing the meetings, audit areas, deliverables, timeframe and fee before work begins.",
  },
  {
    q: "Can you help us prepare an annual marketing budget?",
    a: "Yes. We can help organise the budget around priorities, channels, production needs, technology and media spend. Budget recommendations are based on the available information and assumptions agreed during the consultation. They are planning guidance rather than guaranteed performance forecasts.",
  },
];

/* -------------------------------------------------------------- final cta --- */

export const finalCta = {
  title: "Get a Clearer Direction",
  strokeTitle: "for Your Marketing",
  body: "Tell us what the business wants to achieve, what marketing is already being done and where the uncertainty sits.",
  note: "We will recommend the right consultation scope, from a focused review of one problem to a complete digital marketing strategy.",
  primary: "Book a Marketing Consultation",
  secondary: "Chat on WhatsApp",
};

export { standardFormFields as formFields } from "@/content/forms";
