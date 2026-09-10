// Hospitality & Hotels (Industries) — page content.
// Copy source: "Hospitality.docx" (client-supplied, 2026-09-09). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// TWO IDEAS RUN THROUGH THIS DOCUMENT AND EVERY DRAWING ON THE PAGE COMES FROM
// ONE OF THEM.
//
// FIRST, THERE IS NO SINGLE CHECKOUT. "These may include completed bookings,
// table reservations, calls, WhatsApp enquiries, direction requests and visits
// to a booking engine" — six different endings — and then: "It also needs to
// consider where the final action takes place, whether that is a website,
// booking engine, reservation platform, phone call or WhatsApp conversation" —
// five different places. A hospitality page drawn as one funnel into one
// checkout would contradict its own source, so the hero fans instead of
// narrowing.
//
// SECOND, TWO CLOCKS. "Hospitality decisions can happen quickly. A guest may
// compare several restaurants on Google Maps before choosing one nearby, while
// a traveller may research hotels for days before completing a booking." That
// is one sentence containing two journeys on wildly different timescales, and
// it is the most specific claim in the file. Note what it does NOT say: it
// gives "for days" for the traveller and only "quickly" for the guest, so
// nothing on this page puts a unit or a number on either. The drawing shows
// relative extent, which is all the document supports.
//
// FIGURES: the results section supplies nine, and the opening paragraph
// summarises three of them again — that repetition is the client's own and is
// left alone rather than edited out. Every figure keeps the document's hedge
// ("more than", "over", "fewer than", "above"). The click-through rate is a
// rate and is deliberately kept off the count scale in `ResultsLadder`: a
// percentage has no place on an axis of totals.

import type { Faq } from "@/content/services/performance-marketing";
import type { GuestSurfaceKind } from "@/components/service/GuestSurface";

export const meta = {
  title: "Hospitality Digital Marketing Agency in Dubai | ENH Marketing",
  description:
    "Increase direct bookings, restaurant reservations and guest enquiries through hospitality SEO, paid advertising, social media and conversion-focused digital campaigns.",
};

/* ---------------------------------------------------------------- banner --- */

export const hero = {
  lines: ["Hospitality Digital", "Marketing Agency", "in Dubai"] as [string, string, string],
  sub: "Increase direct bookings, restaurant reservations and guest enquiries through hospitality SEO, paid advertising, social media and conversion-focused digital campaigns.",
  primary: "Plan My Hospitality Marketing",
  secondary: "Talk to a Hospitality Expert",
};

/* --------------------------------------------------------------- opening --- */

/** "How Hospitality Digital Marketing Turns Interest Into Bookings".
 *
 *  Four paragraphs doing four jobs: when the guest is reached, what counts as
 *  an outcome, what is connected to what, and what that has produced. The six
 *  actions and the five channels are marked inside the document's own
 *  sentences rather than lifted into chips, which would print them twice. */
export const opening = {
  title: "How Hospitality Digital Marketing",
  strokeTitle: "Turns Interest Into Bookings",
  lead: "Hospitality digital marketing helps hotels, restaurants and resorts reach people while they are deciding where to stay, dine, celebrate or spend their time.",
  /** The six endings. There is no single checkout on this page because this
   *  sentence says there is not. */
  actions:
    "ENH Marketing builds hospitality campaigns around the actions that matter to the business. These may include completed bookings, table reservations, calls, WhatsApp enquiries, direction requests and visits to a booking engine.",
  actionsMark: [
    "completed bookings",
    "table reservations",
    "calls",
    "WhatsApp enquiries",
    "direction requests",
    "visits to a booking engine",
  ],
  /** The five channels, and the word the section is built on: route. */
  connects:
    "As a digital marketing agency in Dubai, we connect search visibility, paid advertising, social media, content and online reputation with the guest journey. This gives the business a clearer route from online discovery to a measurable booking or reservation action.",
  /** In the order the sentence writes them: the route's segments are indexed
   *  against this array. */
  connectsMark: [
    "search visibility",
    "paid advertising",
    "social media",
    "content",
    "online reputation",
  ] as [string, string, string, string, string],
  figures:
    "Across different hospitality campaigns, our work has supported more than 50 monthly SEO-driven conversions, over 1,300 monthly organic users and social campaigns reaching more than six million people during peak periods.",
  figuresMark: [
    "more than 50 monthly SEO-driven conversions",
    "over 1,300 monthly organic users",
    "more than six million people",
  ],
};

/* -------------------------------------------------------------- strategy --- */

/** "Why Hospitality Marketing Need Its Own Strategy".
 *
 *  The heading's grammar is the document's and is left exactly as written.
 *
 *  The first paragraph is the page's signature section: two guest journeys on
 *  timescales that do not fit each other. `clockKeys` are the two openers, used
 *  as the control that rescales the drawing's axis. */
export const strategy = {
  title: "Why Hospitality Marketing",
  strokeTitle: "Need Its Own Strategy",
  quick: "Hospitality decisions can happen quickly.",

  /** THE TWO DECISIONS, AS TWO PROFILES.
   *
   *  The source writes them as one compound sentence: "A guest may compare
   *  several restaurants on Google Maps before choosing one nearby, while a
   *  traveller may research hotels for days before completing a booking." Set
   *  as prose the contrast is a subordinate clause; set as two profiles it is
   *  the thing the section is about. The split drops ", while" and capitalises
   *  the second opener, which is typesetting a compound sentence, not
   *  rewriting it — every other word is the document's.
   *
   *  `extent` is the document's own claim about length and nothing more: it
   *  says "quickly" for one and "for days" for the other, so one measure is
   *  short and the other runs past the end of its panel. There is no unit
   *  anywhere because the source gives none. */
  journeys: [
    {
      who: "A guest",
      rest: "may compare several restaurants on Google Maps before choosing one nearby",
      extent: "short" as const,
    },
    {
      who: "A traveller",
      rest: "may research hotels for days before completing a booking",
      extent: "long" as const,
    },
  ],

  /** WHAT THE STRATEGY HAS TO ACCOUNT FOR — seven things, and the source puts
   *  all seven inside one sentence with the five below it. Buried in prose at
   *  the foot of the section they were the twelve most concrete pieces of
   *  information on the page and nobody would ever have read them, which is
   *  the same mistake the reporting note made. The stem is the sentence's own
   *  opening; the items are its own list, set as one. */
  factorsStem: "The marketing strategy must account for",
  factorsItems: [
    "location",
    "availability",
    "reviews",
    "pricing",
    "menus",
    "experiences",
    "seasonal demand",
  ],

  /** AND WHERE THE ACTION ACTUALLY LANDS — five different places, which is the
   *  reason a single conversion goal cannot describe this industry. */
  venuesStem:
    "It also needs to consider where the final action takes place, whether that is",
  venuesItems: [
    "a website",
    "booking engine",
    "reservation platform",
    "phone call",
    "WhatsApp conversation",
  ],

  verdict:
    "A digital marketing agency for hospitality should therefore understand more than reach and website traffic. It should be able to connect each channel with the decisions guests make before reserving a table or booking a stay.",
  verdictMark: "more than reach and website traffic",
};

/* -------------------------------------------------------------- services --- */

export type Service = {
  no: string;
  title: string;
  body: string;
  /** Which guest-facing surface the service works on. Every one of these six
   *  services acts on something a guest actually looks at, which is why the run
   *  leads with the surface rather than with a symbol. */
  surface: GuestSurfaceKind;
};

/** "Our Hospitality Digital Marketing Services". */
export const services = {
  title: "Our Hospitality Digital",
  strokeTitle: "Marketing Services",
  items: [
    {
      no: "01",
      title: "Hospitality SEO and Local SEO",
      surface: "listing",
      body: "Guests often begin with searches for a stay, meal, brunch or venue nearby. We improve technical SEO, service and location pages, Google Business Profiles, menus, offers and local signals so hotels, restaurants and resorts can appear for relevant searches and turn organic discovery into booking or reservation actions.",
    },
    {
      no: "02",
      title: "Paid Advertising for Hospitality Brands",
      surface: "ad",
      body: "We manage Google Search, Bing, Meta and retargeting campaigns around booking intent. Search terms, audiences, offers, landing pages and conversion tracking are reviewed together so advertising supports hotel bookings, restaurant reservations, calls, WhatsApp enquiries and other valuable guest actions instead of producing traffic without a clear outcome.",
    },
    {
      no: "03",
      title: "Hospitality Social Media Marketing",
      surface: "reel",
      body: "We plan organic content, paid social campaigns and short-form video around the experiences, offers and moments guests care about. Content and promotion work together to build recognition, strengthen booking intent and reconnect with people who engaged with the brand but did not reserve a table or complete a booking.",
    },
    {
      no: "04",
      title: "Hospitality Content Marketing",
      surface: "menu",
      body: "Menus, offer pages, blogs and landing pages need to answer practical guest questions and support a decision. We create and improve hospitality content around real search intent, giving people clearer information about stays, dining, events and experiences while strengthening the website for search engines and AI assistants.",
    },
    {
      no: "05",
      title: "Reputation and Review Growth",
      surface: "review",
      body: "Reviews influence where people stay, eat and spend their time. We support review growth, response planning, Google Business Profile optimisation and stronger local trust signals so prospective guests can assess the brand more confidently and take the next step through a booking, reservation, call or direction request.",
    },
    {
      no: "06",
      title: "Booking and Reservation Optimisation",
      surface: "booking",
      body: "Interest is valuable only when the booking path works. We review reservation links, booking engines, offer pages, calls to action and mobile journeys to identify friction between discovery and conversion. Improvements focus on making it easier for guests to check details, choose an option and complete the intended action.",
    },
  ] satisfies Service[],
};

/* --------------------------------------------------------------- process --- */

export type Stage = { stage: string; title: string; body: string };

/** "How Our Hospitality Marketing Process Works".
 *
 *  Stage 4 carries the argument the whole run is ordered around: "Friction is
 *  addressed before more traffic is directed towards the website." So the six
 *  stages are drawn as work done to one booking path — surveyed, prioritised,
 *  approached, repaired, opened, then measured — rather than as six steps in a
 *  list, because the sequence is the claim. */
export const process = {
  title: "How Our Hospitality",
  strokeTitle: "Marketing Process Works",
  stages: [
    {
      stage: "Stage 1",
      title: "Review the Guest Journey",
      body: "We assess how people currently discover the business and what happens before they book, reserve, call or request directions. The review covers the website, search visibility, social channels, reviews, advertising and conversion tracking.",
    },
    {
      stage: "Stage 2",
      title: "Set the Commercial Priorities",
      body: "We identify which locations, rooms, dining experiences, offers or events need support. This prevents the campaign from spreading its budget across too many disconnected objectives.",
    },
    {
      stage: "Stage 3",
      title: "Build the Search and Campaign Structure",
      body: "Keywords, audiences, locations, landing pages and offers are matched to the intended guest action. Organic and paid channels are planned around their roles within the decision journey.",
    },
    {
      stage: "Stage 4",
      title: "Improve the Booking Path",
      body: "Booking engines, reservation links, menus, offer pages, mobile experiences and calls to action are reviewed. Friction is addressed before more traffic is directed towards the website.",
    },
    {
      stage: "Stage 5",
      title: "Launch and Coordinate the Channels",
      body: "SEO, paid advertising, social media, content and review activity are delivered according to the agreed scope. Seasonal campaigns are planned around the dates when guests are most likely to research and book.",
    },
    {
      stage: "Stage 6",
      title: "Measure and Adjust",
      body: "We track booking-related actions, reservations, calls, messages, direction requests and campaign costs. Priorities are adjusted according to the searches, audiences, content and offers producing useful activity.",
    },
  ] satisfies Stage[],
};

/* -------------------------------------------------------------------- ai --- */

/** "Can Hospitality Brands Appear in AI Search Results?"
 *
 *  A question the document answers carefully, and the section is built to keep
 *  the care: the six supports are marked in the sentence that lists them, and
 *  the fourth paragraph — the limit — is given its own weight rather than being
 *  set as a fourth grey paragraph nobody reaches. */
export const ai = {
  title: "Can Hospitality Brands Appear",
  strokeTitle: "in AI Search Results?",
  lead: "AI tools such as ChatGPT, Gemini and Google’s AI search features are becoming part of how people research hotels, restaurants, resorts and destinations.",
  supports:
    "Hospitality brands need clear, consistent and well-structured information across their websites and important third-party profiles. We support this through direct service descriptions, useful question-based content, location information, structured FAQs, strong internal linking and clear details about relevant stays, dining experiences and offers.",
  supportsMark: [
    "direct service descriptions",
    "useful question-based content",
    "location information",
    "structured FAQs",
    "strong internal linking",
    "clear details about relevant stays, dining experiences and offers",
  ],
  foundations:
    "AI search optimisation builds on the same foundations as effective SEO. Search engines and AI assistants need to understand what the business provides, where it operates and which guest questions its content answers.",
  limit:
    "Visibility cannot be guaranteed within a particular AI response. The objective is to make accurate information easier for search and AI systems to find, interpret and use when it is relevant.",
  limitMark: "cannot be guaranteed",
};

/* --------------------------------------------------------------- measure --- */

export type MeasureRow = { track: string; tells: string };

/** "What We Measure" — the document's own two-column table, kept as a table's
 *  worth of data with its own column headers. */
export const measure = {
  title: "What",
  strokeTitle: "We Measure",
  lead: "Hospitality reporting should connect marketing activity with the actions guests take.",
  headTrack: "What we track",
  headTells: "What it tells you",
  rows: [
    {
      track: "Direct bookings",
      tells: "How many completed bookings can be attributed to the measured journey",
    },
    {
      track: "Reservation actions",
      tells: "How often guests start or complete a table reservation",
    },
    {
      track: "Booking-engine visits",
      tells: "Which channels send interested guests towards room availability and rates",
    },
    {
      track: "Calls and WhatsApp enquiries",
      tells: "How often marketing leads to a direct conversation",
    },
    { track: "Direction requests", tells: "Whether local visibility is supporting physical visits" },
    {
      track: "Organic search conversions",
      tells: "Which searches and pages produce valuable guest actions",
    },
    {
      track: "Google Business Profile interactions",
      tells: "How guests engage with listings across Maps and local search",
    },
    {
      track: "Paid campaign conversions",
      tells: "Which campaigns, audiences and offers generate measurable actions",
    },
    {
      track: "Cost per booking or enquiry",
      tells: "How efficiently the advertising budget produces results",
    },
    {
      track: "Social reach and engagement",
      tells: "How effectively content reaches and interests the intended audience",
    },
    {
      track: "Reviews and ratings",
      tells: "How online reputation and guest feedback change over time",
    },
    {
      track: "Returning visitors",
      tells: "Whether people come back after their first interaction with the brand",
    },
  ] satisfies MeasureRow[],
  note: "The most useful measures depend on the business model. A restaurant may prioritise reservations and direction requests, while a hotel may focus on booking-engine visits and completed direct bookings.",
};

/* --------------------------------------------------------------- results --- */

/** One result, and the quantity it can honestly be plotted at.
 *
 *  `value` is a total, so it goes on the count scale. `from`/`to` is a total
 *  that moved, drawn as the distance between two heights. `rate` is a
 *  percentage and is kept off that scale entirely — an axis of totals has
 *  nothing to say about a click-through rate, and putting one on it would be
 *  the only dishonest mark on the page. */
export type Result =
  | { text: string; mark: string[]; value: number }
  | { text: string; mark: string[]; from: number; to: number }
  | { text: string; mark: string[]; rate: number };

/** "Hospitality Campaign Results".
 *
 *  Nine figures spanning five orders of magnitude — 50 to six million — which
 *  is the interesting fact about them and the one a row of four big numbers
 *  would destroy. They are plotted on a scale of decades instead, in magnitude
 *  order rather than the document's list order, so the climb is visible. The
 *  document's own two closing sentences carry the section's limits and are
 *  printed with it. */
export const results = {
  title: "Hospitality",
  strokeTitle: "Campaign Results",
  lead: "Across different hospitality campaigns, our work has contributed to:",
  items: [
    {
      text: "More than 50 SEO-driven conversions in a month",
      mark: ["More than 50"],
      value: 50,
    },
    {
      text: "Organic traffic increasing from fewer than 600 monthly users to more than 1,300",
      mark: ["fewer than 600", "more than 1,300"],
      from: 600,
      to: 1300,
    },
    {
      text: "Over 9,700 Google Maps impressions for multi-location restaurant activity",
      mark: ["Over 9,700"],
      value: 9700,
    },
    {
      text: "More than 2,500 Google Business Profile interactions in a single month",
      mark: ["More than 2,500"],
      value: 2500,
    },
    {
      text: "Over six million people reached during a peak social campaign",
      mark: ["Over six million"],
      value: 6_000_000,
    },
    {
      text: "More than 293,000 social engagement interactions",
      mark: ["More than 293,000"],
      value: 293_000,
    },
    {
      text: "Over 7,800 new followers within a 30-day peak campaign period",
      mark: ["Over 7,800"],
      value: 7800,
    },
    {
      text: "More than 340,000 Meta advertising impressions in one month",
      mark: ["More than 340,000"],
      value: 340_000,
    },
    {
      text: "Search campaign click-through rates above 7%",
      mark: ["above 7%"],
      rate: 7,
    },
  ] satisfies Result[],
};

/** The document's three closing sentences about what these figures are not.
 *  Split across the section's own caveat band: two sentences of scope and one
 *  of variance, which is exactly the shape that band takes. */
export const caveat = {
  lead: "These figures come from different campaigns, periods, and hospitality businesses.",
  emphasis: "They should not be treated as a forecast for every hotel, restaurant or resort.",
  commitment:
    "Results vary according to the brand, location, season, offer, competition, budget and work completed.",
};

/* -------------------------------------------------------------- audience --- */

/** "Who We Work With". Eight kinds of hospitality business and nothing else
 *  known about any of them, so nothing is described. The closing sentence names
 *  three of them specifically to say they should not be treated alike. */
export const audience = {
  title: "Who",
  strokeTitle: "We Work With",
  lead: "ENH Marketing supports hospitality businesses across Dubai and the UAE, including:",
  items: [
    { label: "Hotels and serviced apartments" },
    { label: "Restaurant groups and independent restaurants" },
    { label: "Resorts and destination venues" },
    { label: "Premium and casual dining brands" },
    { label: "Cafes and coffee shops" },
    { label: "Cloud kitchens and food delivery businesses" },
    { label: "Brunches, events and seasonal hospitality concepts" },
    { label: "Multi-location hospitality groups" },
  ],
  note: "The strategy is adjusted to the way each business earns revenue. A destination resort, neighbourhood restaurant and multi-location cafe should not be marketed through the same channel mix or measured against the same guest actions.",
  /** The three the sentence singles out to say they are not alike. Marked
   *  where they stand rather than lifted out. */
  noteMark: [
    "A destination resort",
    "neighbourhood restaurant",
    "multi-location cafe",
  ],
};

/* ------------------------------------------------------------------- why --- */

export const why = {
  title: "Why Choose ENH Marketing for",
  strokeTitle: "Hospitality Digital Marketing?",
  lead: "ENH Marketing brings SEO, paid advertising, social media, content and conversion tracking into one hospitality strategy.",
  /** The five the lead brings into one. */
  leadMark: [
    "SEO",
    "paid advertising",
    "social media",
    "content",
    "conversion tracking",
  ],
  /** Every one of the seven claims carries its own list, and those lists are
   *  the substance: "a booking, reservation, call, message or visit" is five
   *  concrete outcomes, and "Google Business Profiles, reviews, location
   *  information and Maps activity" is four concrete surfaces. Marked in place
   *  rather than lifted out, because unlike the two registers above these are
   *  short enough to read inside their own sentence. */
  itemMarks: [
    ["booking", "reservation", "call", "message", "visit"],
    ["reviewed together", "somewhere useful to go"],
    ["Hotels, restaurants and resorts", "sales cycle, location and customer behaviour"],
    ["Organic content", "paid social campaigns", "retargeting", "one connected system"],
    ["Google Business Profiles", "reviews", "location information", "Maps activity"],
    ["commercial actions"],
    ["clear, structured and useful"],
  ],
  items: [
    "We begin with the guest action the business needs, whether that is a booking, reservation, call, message or visit.",
    "Search visibility and booking journeys are reviewed together so additional traffic has somewhere useful to go.",
    "Hotels, restaurants and resorts receive different strategies based on their sales cycle, location and customer behaviour.",
    "Organic content, paid social campaigns and retargeting can be planned as one connected system.",
    "Local visibility includes Google Business Profiles, reviews, location information and Maps activity.",
    "Reporting focuses on commercial actions alongside traffic, reach and engagement.",
    "Search and AI visibility are supported through clear, structured and useful hospitality content.",
  ],
  tail: "As a Dubai digital marketing agency, we can manage individual channels or build a broader campaign around the business’s priorities. The proposal will state what needs attention first, what can follow later and how each area will be measured.",
  /** The three things the proposal states, which is the closest this section
   *  comes to a deliverable. */
  tailMark: [
    "what needs attention first",
    "what can follow later",
    "how each area will be measured",
  ],
};

/* ------------------------------------------------------------------ faqs --- */

export const faqs: Faq[] = [
  {
    q: "What does a hospitality digital marketing agency do?",
    a: "A hospitality digital marketing agency helps hotels, restaurants and resorts attract guests and generate more booking-related actions. The work may include SEO, local search, paid advertising, social media, content, online reputation and conversion optimisation. Each channel should support actions such as direct bookings, table reservations, calls, messages or direction requests.",
  },
  {
    q: "How is digital marketing for restaurants different from other industries?",
    a: "Restaurant marketing is strongly influenced by location, reviews, menus, opening hours and immediate availability. Local SEO, Google Maps visibility, social content and nearby audience targeting are especially important. Campaigns should make it easy for guests to view the menu, find the restaurant, call, request directions or reserve a table.",
  },
  {
    q: "What do hospitality SEO services include?",
    a: "Hospitality SEO services can cover technical website improvements, keyword research, service and location pages, offer content, internal links and Google Business Profile optimisation. A hospitality SEO company should also review whether the organic traffic reaches a clear booking or reservation path. Rankings alone do not show whether the strategy is producing useful guest activity.",
  },
  {
    q: "Can hospitality marketing help reduce dependence on OTAs?",
    a: "Hospitality marketing can give hotels and resorts more opportunities to generate direct bookings through their own websites and booking engines. SEO, branded paid search, retargeting, useful offer pages and a clearer booking journey can support this goal. OTAs may remain part of the distribution strategy, but they do not have to be the only route to guests.",
  },
  {
    q: "Do paid advertisements work for hotels and resorts?",
    a: "Paid advertising can work when campaigns target relevant booking demand and measure actions beyond website visits. Google Search, Google Hotel Ads, Bing and Meta can support different stages of the guest journey. The right channel mix depends on the property, location, audience, offer and booking system.",
  },
  {
    q: "Can social media marketing generate restaurant reservations?",
    a: "Yes, but the content needs a clear route to action. Organic posts can introduce the dining experience, while paid promotion and retargeting can extend the reach of important offers. Reservation links, calls to action and conversion tracking should be included so the business can see what happens after engagement.",
  },
  {
    q: "How long does hospitality digital marketing take to produce results?",
    a: "Paid campaigns can begin generating enquiries or booking activity within the first few weeks, depending on the offer, budget and booking journey. SEO and local search usually require several months of consistent work. The existing page suggested a typical period of three to six months for measurable improvement, although timing varies according to the website and competition.",
  },
  {
    q: "How should hospitality marketing performance be measured?",
    a: "Performance should be measured using the actions closest to revenue. For hotels, this may include direct bookings, booking-engine visits and cost per booking. Restaurants may prioritise reservations, calls, messages and direction requests. Traffic, reach and engagement provide context, but they should not be reported as the final result.",
  },
];

/* ------------------------------------------------------------- final cta --- */

export const finalCta = {
  title: "Tell Us Where You",
  strokeTitle: "Need More Bookings",
  body: "Send us your website, locations, current marketing activity and the bookings or reservations you want to increase.",
  note: "We will review how guests currently find the business and what happens before they convert. The proposal will show whether search visibility, paid campaigns, social media, reputation or the booking journey needs attention first.",
  primary: "Request a Hospitality Proposal",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
