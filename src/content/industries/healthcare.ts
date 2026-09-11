// Healthcare (Industries) — page content.
// Copy source: "Healthcare.docx" (client-supplied, 2026-09-09). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// TWO TYPOGRAPHIC EDITS, AND NOTHING ELSE. The document numbers its FAQs
// "1." to "9." in the question text; the numerals are dropped here because
// FaqList numbers its own rows and would otherwise print "(01) 1. What are
// ...". And the results figures are stored as a hedge and a value in separate
// fields ("More than" / "18,000") so the page can set the two at different
// weights. Nothing is reworded, reordered or removed: every field below
// concatenates back to the client's own sentence exactly.
//
// WHAT THIS DOCUMENT HAS THAT ITS FOUR SIBLINGS DO NOT. Three sentences, all
// of them in "Why Is Healthcare Digital Marketing Different?", and every shape
// on this page is read from one of them:
//
//   1. "Patients may research several treatments and providers before deciding
//      who to contact."  -- the reader is holding a SHORTLIST. Not one journey
//      walked once (Automotive), not one arrival fanned out (Hospitality), not
//      several people making several passes at one supplier (Logistics): one
//      person comparing several providers against several treatments.
//
//   2. "The website must explain services clearly without creating confusion or
//      making unsupported promises."  -- a LIMIT ON WHAT MAY BE SAID. No other
//      industry document on this site constrains its own copy. It is also why
//      the services section draws an approval gate that no other drawing here
//      has, and why the "why choose" section ends on three questions rather
//      than on a claim.
//
//   3. "Treatment information, specialist profiles, reviews, locations and
//      appointment options all contribute to the decision."  -- FIVE things
//      weighed together, named by the client, in the client's order.
//
// THE CLIENT ALSO TYPED A DIAGRAM: "Search -> Research -> Trust -> Appointment".
// Logistics typed the same four words ending at "Enquiry" and that page built a
// rail with three unsynchronised markers on it. This page does not repeat that
// rail. Here the chain is set as type and the motion is given to the five
// contributions instead, because this document's own claim is about what is
// weighed, not about how many times the chain is walked.
//
// FIGURES: nine in the results section, three of which the opening paragraph
// states again in its own words. That repetition is the client's and is left
// alone rather than edited out. Every figure keeps the document's hedge
// ("More than", "Over", "Nearly", "Between ... and ...").

import type { Faq } from "@/content/services/performance-marketing";

export const meta = {
  title: "Healthcare Digital Marketing Services for Clinics & Hospitals | SEO, PPC & Social Media",
  description:
    "Partner with a leading healthcare digital marketing company. We specialize in SEO, PPC, and social media for clinics & hospitals. Contact us today for results-driven growth!",
};

/* ---------------------------------------------------------------- banner --- */

export const hero = {
  lines: ["Healthcare Digital", "Marketing Agency", "in Dubai"] as [string, string, string],
  sub: "Increase treatment visibility, patient enquiries and appointment bookings through healthcare SEO, paid advertising, social media and local search.",
  primary: "Plan My Healthcare Marketing",
  secondary: "Talk to a Healthcare Marketing Expert",
};

/* --------------------------------------------------------------- opening --- */

/** "How Does Healthcare Digital Marketing Generate Patient Enquiries?"
 *
 *  Four paragraphs doing four jobs: who is reached and at which point in their
 *  research, what the work connects to what, how the campaign is organised, and
 *  what that organisation has produced.
 *
 *  THE FOUR RESEARCH SUBJECTS ARE THE SECTION'S DRAWING. "symptoms, treatments,
 *  specialists and nearby providers" is the only place in the document that
 *  says WHEN a patient is reached, and the four are in a narrowing order the
 *  client chose: a symptom is a question, a treatment is an answer, a
 *  specialist is a person and a nearby provider is a place. Four different
 *  kinds of thing, which is why the drawing can show four stops without
 *  labelling any of them. */
export const opening = {
  title: "How Does Healthcare Digital Marketing",
  strokeTitle: "Generate Patient Enquiries?",

  lead: "Healthcare digital marketing helps clinics, hospitals and medical professionals reach people while they are researching symptoms, treatments, specialists and nearby providers.",

  /** The four research subjects, in the client's own order. The drawing has one
   *  stop per subject and nothing else, and these four phrases are marked in
   *  the lead above rather than listed anywhere: on this page the sentence is
   *  the drawing's key, so each of the four is a control where it stands. */
  subjects: ["symptoms", "treatments", "specialists", "nearby providers"] as [
    string,
    string,
    string,
    string,
  ],

  /** FIVE CHANNELS AND THREE ACTIONS, in one client sentence. Nothing pairs a
   *  channel with an action: the document never says which produces which. */
  actions:
    "ENH Marketing connects search visibility, paid advertising, educational content, social media and local search with actions such as consultation enquiries, calls and appointment requests.",
  channels: [
    "search visibility",
    "paid advertising",
    "educational content",
    "social media",
    "local search",
  ] as [string, string, string, string, string],
  outcomes: ["consultation enquiries", "calls", "appointment requests"] as [string, string, string],

  /** HOW THE CAMPAIGN IS ORGANISED. Two dimensions, not four: this document
   *  structures campaigns around what a patient needs and what a patient looks
   *  for, which is a smaller and more specific claim than the four fields the
   *  logistics document sets out. */
  structure:
    "As a digital marketing agency in Dubai, we structure healthcare campaigns around the services patients need and the information they look for before contacting a provider.",
  dimensions: [
    "the services patients need",
    "the information they look for before contacting a provider",
  ] as [string, string],

  figures:
    "Across different healthcare campaigns, this approach has generated more than 18,000 monthly search impressions, over 2,500 monthly organic treatment-page visits and 60+ patient enquiries in a month.",
  figuresMark: [
    "more than 18,000 monthly search impressions",
    "over 2,500 monthly organic treatment-page visits",
    "60+ patient enquiries in a month",
  ],
};

/* -------------------------------------------------------------- services --- */

/** "Our Healthcare Digital Marketing Services". Six, and every one of them
 *  works a different part of what a patient meets while researching a provider
 *  -- which is why the section's drawing is that presence rather than six
 *  category tiles. */
export const services = {
  title: "Our Healthcare Digital",
  strokeTitle: "Marketing Services",
  items: [
    {
      no: "1",
      title: "Healthcare SEO and Search Visibility",
      body: "We improve technical SEO, treatment pages, specialist profiles, location content and internal links around patient search intent. The objective is to help people find relevant healthcare information, understand the available service and move towards a consultation enquiry or appointment with the appropriate provider.",
    },
    {
      no: "2",
      title: "Healthcare PPC and Digital Advertising",
      body: "We manage Google Search, Meta and remarketing campaigns around defined treatments, locations and patient needs. Keywords, audiences, landing pages and conversion tracking are reviewed together so advertising reaches people looking for relevant services and provides a clear route to call, enquire or request an appointment.",
    },
    {
      no: "3",
      title: "Healthcare Content and Landing Pages",
      body: "Patients often need clear information before deciding whether to contact a healthcare provider. We create and improve treatment pages, specialist content, educational articles and campaign landing pages so people can understand the service while search engines can interpret the clinic’s expertise, locations and areas of care.",
    },
    {
      no: "4",
      title: "Healthcare Social Media Marketing",
      body: "Healthcare social media can strengthen awareness and help patients understand the people and services behind a clinic. We plan educational content, service communication and paid campaigns around the intended audience, with clear approval processes to protect accuracy and keep messaging appropriate for the healthcare setting.",
    },
    {
      no: "5",
      title: "Local SEO for Clinics and Hospitals",
      body: "Patients frequently search for clinics, specialists and services close to them. We improve Google Business Profiles, location details, service categories and local pages so healthcare providers can appear for relevant nearby searches and support calls, website visits, direction requests and appointment enquiries.",
    },
    {
      no: "6",
      title: "AI Search Visibility",
      body: "AI assistants and AI-powered search features are increasingly involved in healthcare research. We structure treatment explanations, provider information, patient FAQs and location details clearly so these systems can interpret the website accurately and retrieve relevant information when people research available healthcare services online.",
    },
  ],
};

/* ------------------------------------------------------------ difference --- */

/** "Why Is Healthcare Digital Marketing Different?"
 *
 *  THE PAGE'S SIGNATURE SECTION. Four claims and a diagram, and they are four
 *  different kinds of claim, so the section sets them as four bands rather than
 *  as four paragraphs: what the decision rests on, how many providers are in
 *  play, what the site is forbidden from doing, and what is weighed. */
export const difference = {
  title: "Why Is Healthcare Digital",
  strokeTitle: "Marketing Different?",

  /** WHAT THE DECISION RESTS ON. Three, and none of them is a feature of the
   *  treatment: all three are properties of how the provider presents itself. */
  basis: "Healthcare decisions depend heavily on trust, accuracy and relevance.",
  basisItems: ["trust", "accuracy", "relevance"] as [string, string, string],

  /** THE SHORTLIST. The one sentence that makes this journey unlike every other
   *  journey on this site's industry pages: several treatments AND several
   *  providers, held at once, by one person. */
  shortlist:
    "Patients may research several treatments and providers before deciding who to contact.",
  shortlistMark: ["several treatments and providers"],

  /** THE LIMIT. What the website must not do, in the client's own words. */
  constraint:
    "The website must explain services clearly without creating confusion or making unsupported promises.",
  constraintMark: ["without creating confusion or making unsupported promises"],

  /** WHAT IS WEIGHED. Five contributions to one decision, in the client's
   *  order. The section's drawing is these five and nothing else. */
  contribution:
    "Treatment information, specialist profiles, reviews, locations and appointment options all contribute to the decision.",
  contributors: [
    "Treatment information",
    "specialist profiles",
    "reviews",
    "locations",
    "appointment options",
  ] as [string, string, string, string, string],

  /** THE CLIENT'S OWN DIAGRAM. Printed as written, arrows and all. */
  journeyStem: "Effective healthcare internet marketing follows a clear journey:",
  journey: ["Search", "Research", "Trust", "Appointment"] as [string, string, string, string],

  verdict:
    "Each campaign should help patients find useful information and move towards the appropriate healthcare provider.",
  verdictMark: ["the appropriate healthcare provider"],
};

/* --------------------------------------------------------------- process --- */

/** "How Our Healthcare Marketing Process Works".
 *
 *  Five stages, and the hinge is Stage 2: "Each priority is connected to an
 *  appropriate page, campaign and patient action." That is three sockets per
 *  priority, filled by Stages 3 and 4 and re-read by Stage 5 -- which is why
 *  the section is a plan being written rather than five cards in a row.
 *
 *  `fills` is read from each stage's own sentence and from nothing else:
 *    priorities -- the stage at which the list itself exists
 *    page       -- "Technical SEO, treatment pages, specialist information and
 *                   local visibility are improved according to priority"
 *    campaign   -- "Paid search, Meta campaigns, social content and
 *                   remarketing are delivered according to the agreed scope"
 *    action     -- "We track patient enquiries, appointment requests, calls,
 *                   treatment-page visits and campaign costs"
 *  Stage 1 fills nothing: it is the review that happens before a priority
 *  exists, and drawing it as a partly-filled plan would claim work the client's
 *  own sentence does not describe. */
export type Stage = {
  no: string;
  title: string;
  body: string;
  /** Which sockets on the plan this stage has filled by the time it ends. */
  fills: { priorities: boolean; page: boolean; campaign: boolean; action: boolean };
  /** Stage 5 re-orders the plan: "Priorities are adjusted according to the
   *  services, searches and campaigns generating relevant activity." */
  reorders?: boolean;
};

export const process = {
  title: "How Our Healthcare",
  strokeTitle: "Marketing Process Works",
  stages: [
    {
      no: "1",
      title: "Review the Patient Journey",
      body: "We assess how patients currently find the clinic and what happens before they call, enquire or request an appointment. The review covers search visibility, treatment pages, advertising, social media, local listings and conversion tracking.",
      fills: { priorities: false, page: false, campaign: false, action: false },
    },
    {
      no: "2",
      title: "Set the Treatment Priorities",
      body: "We identify the services, specialists and locations that need marketing support. Each priority is connected to an appropriate page, campaign and patient action.",
      fills: { priorities: true, page: false, campaign: false, action: false },
    },
    {
      no: "3",
      title: "Improve Search and Content",
      body: "Technical SEO, treatment pages, specialist information and local visibility are improved according to priority. Content is structured around the questions patients ask while researching healthcare services.",
      fills: { priorities: true, page: true, campaign: false, action: false },
    },
    {
      no: "4",
      title: "Launch Focused Campaigns",
      body: "Paid search, Meta campaigns, social content and remarketing are delivered according to the agreed scope. Campaigns direct patients towards information and actions relevant to the treatment being promoted.",
      fills: { priorities: true, page: true, campaign: true, action: false },
    },
    {
      no: "5",
      title: "Measure and Adjust",
      body: "We track patient enquiries, appointment requests, calls, treatment-page visits and campaign costs. Priorities are adjusted according to the services, searches and campaigns generating relevant activity.",
      fills: { priorities: true, page: true, campaign: true, action: true },
      reorders: true,
    },
  ] as Stage[],
};

/* --------------------------------------------------------------- measure --- */

/** "What We Measure". Twelve rows, both column headers the document's own, and
 *  two closing sentences that are a contrast rather than a summary: one says
 *  what visibility shows, the other says what it does not. */
export const measure = {
  title: "What We",
  strokeTitle: "Measure",
  lead: "Healthcare marketing should be measured through patient actions as well as visibility.",
  leadMark: ["patient actions"],
  headTrack: "What we track",
  headTells: "What it tells you",
  rows: [
    {
      track: "Consultation enquiries",
      tells: "How many people request information about a treatment or service",
    },
    { track: "Appointment requests", tells: "Which campaigns and pages encourage patients to book" },
    {
      track: "Calls and form submissions",
      tells: "How patients choose to contact the healthcare provider",
    },
    {
      track: "Organic search conversions",
      tells: "Which searches and treatment pages generate enquiries",
    },
    { track: "Treatment-page visits", tells: "Which healthcare services attract relevant interest" },
    {
      track: "Local search interactions",
      tells: "How patients engage with the clinic through local listings",
    },
    { track: "Direction requests", tells: "Whether local visibility supports clinic visits" },
    {
      track: "Paid campaign conversions",
      tells: "Which advertisements and keywords produce patient enquiries",
    },
    {
      track: "Cost per enquiry",
      tells: "How efficiently the advertising budget generates opportunities",
    },
    {
      track: "Landing-page conversion rate",
      tells: "How effectively each page supports consultation enquiries",
    },
    {
      track: "Social media performance",
      tells: "How content supports reach, trust and patient awareness",
    },
    {
      track: "Returning visitors",
      tells: "Whether patients return during a longer research journey",
    },
  ],
  /** The document's two closing sentences, kept apart because they are a
   *  contrast: one names what visibility shows, the other what it does not. */
  noteFind: "Traffic and impressions show how many people find the provider.",
  noteUseful:
    "Enquiries and appointment requests show whether that visibility is producing useful results.",
  noteUsefulMark: ["Enquiries and appointment requests"],
};

/* --------------------------------------------------------------- results --- */

/** "Healthcare Campaign Results".
 *
 *  Nine figures, each stored as the client's hedge and the client's value in
 *  separate fields. The hedge is set in the stroked display face and the value
 *  solid, which prints the difference between a claim and its qualifier
 *  typographically instead of adding a notation the reader has to learn.
 *
 *  NO CELL IS LARGER THAN ANOTHER, AND THERE IS NO AXIS. The caveat directly
 *  below says these come from different healthcare providers, treatments and
 *  campaign periods, so no two of them belong on one scale and none of them
 *  outranks another. Nine equal cells is the honest arrangement here, and the
 *  reason is printed in the section itself. */
export type ResultItem = {
  /** "More than", "Over", "Nearly", "Between 300 and". Set in stroke. */
  hedge: string;
  /** The numeral the hedge qualifies. */
  value: string;
  label: string;
  /** The clause the client attached to the figure, where there is one. */
  unit: string;
};

export const results = {
  title: "Healthcare",
  strokeTitle: "Campaign Results",
  lead: "Across different healthcare campaigns, our work has contributed to:",
  items: [
    { hedge: "More than", value: "18,000", label: "monthly search impressions", unit: "" },
    {
      hedge: "Nearly",
      value: "7,000",
      label: "impressions",
      unit: "from another treatment-focused search campaign",
    },
    { hedge: "Over", value: "2,500", label: "monthly organic treatment-page visits", unit: "" },
    {
      hedge: "More than",
      value: "1,000",
      label: "organic users, representing 138% growth",
      unit: "",
    },
    {
      hedge: "Between 300 and",
      value: "600",
      label: "targeted visitors",
      unit: "researching treatment pages",
    },
    { hedge: "Between 500 and", value: "700", label: "monthly paid advertising clicks", unit: "" },
    {
      hedge: "Between 20 and",
      value: "30",
      label: "consultation enquiries",
      unit: "from structured paid campaigns",
    },
    { hedge: "More than", value: "2,500", label: "monthly social campaign impressions", unit: "" },
    { hedge: "More than", value: "60", label: "patient enquiries", unit: "in a month" },
  ] as ResultItem[],
};

/** The document's own three closing sentences on those figures, in the band
 *  this site keeps for a limit. */
export const caveat = {
  lead: "These figures come from different healthcare providers, treatments and campaign periods.",
  emphasis: "They should not be treated as a guaranteed forecast.",
  commitment:
    "Results vary according to the website, services, location, competition, budget and work completed.",
};

/* -------------------------------------------------------------- audience --- */

/** "Who We Work With".
 *
 *  THE LIST IS NOT THE POINT. Nine names is a list, and a list answers one
 *  question -- am I on it -- then stops. The section's own two closing
 *  sentences ask a second and much better one: "The strategy is adapted to the
 *  services and patient journey involved. A specialist practice needs a
 *  different search and content structure from a multi-department medical
 *  centre." That is a claim that the WORK changes shape with the provider, and
 *  a list cannot show it. So each provider carries the structure its own words
 *  license, and selecting one redraws it.
 *
 *  WHAT THE DOCUMENT ACTUALLY PLACES, AND WHAT IT DOES NOT. Four of the nine:
 *
 *    focused       "A specialist practice ..."               -- the contrast
 *    departmental  "... a multi-department medical centre."  -- the contrast
 *    located       the label's own "Multi-location", with the Local SEO
 *                  service's "local pages" saying what that produces
 *    individual    FAQ 8, which is written about this provider by name
 *
 *  The other five -- private clinics, dental, cosmetic and aesthetic,
 *  diagnostic, wellness -- get no structure ANYWHERE in the document, and none
 *  is invented for them. They take the `open` shape, whose caption is the
 *  client's own sentence saying what the shape is actually decided by. That is
 *  not a gap in the section; it is the section's argument, in the client's
 *  words: a category name does not determine a strategy.
 *
 *  EVERY SHAPE PRINTS THE SENTENCE IT WAS READ FROM. Two of those sentences
 *  live elsewhere in the document -- one in the Local SEO service, one in FAQ 8
 *  -- and are quoted here rather than paraphrased. A citation that repeats the
 *  source is the point of a citation: it is what lets a reader check that the
 *  drawing was read and not invented. */

export type PracticeShape = "focused" | "departmental" | "located" | "individual" | "open";

export type AudienceItem = {
  label: string;
  /** Which structure this provider's own words license. `open` where the
   *  document gives none, which is five of the nine. */
  shape: PracticeShape;
};

export type ShapeSource = {
  /** The client's sentence, verbatim, that the shape was read from. */
  text: string;
  /** The clause inside it that does the placing. */
  mark: string[];
  /** The other half of the contrast, offered as a way across to it. Only the
   *  two shapes the contrast sentence names carry one. */
  jump?: string;
};

export const audience = {
  title: "Who We",
  strokeTitle: "Work With",
  lead: "Our medical digital marketing services can support:",
  items: [
    { label: "Private clinics", shape: "open" },
    { label: "Specialist medical practices", shape: "focused" },
    { label: "Hospitals and medical centres", shape: "departmental" },
    { label: "Dental clinics", shape: "open" },
    { label: "Cosmetic and aesthetic clinics", shape: "open" },
    { label: "Diagnostic centres", shape: "open" },
    { label: "Wellness centres", shape: "open" },
    { label: "Multi-location healthcare providers", shape: "located" },
    { label: "Individual healthcare professionals", shape: "individual" },
  ] as AudienceItem[],

  /** The section opens on the first provider the document says anything
   *  structural about, so the resting state carries the contrast sentence --
   *  the section's thesis -- rather than an unplaced category. */
  defaultIndex: 1,

  note: "The strategy is adapted to the services and patient journey involved.",
  contrast:
    "A specialist practice needs a different search and content structure from a multi-department medical centre.",
  /** The two providers the contrast names, in the order it names them. */
  contrastMark: ["A specialist practice", "a multi-department medical centre"] as [string, string],

  sources: {
    focused: {
      text: "A specialist practice needs a different search and content structure from a multi-department medical centre.",
      mark: ["A specialist practice"],
      jump: "a multi-department medical centre",
    },
    departmental: {
      text: "A specialist practice needs a different search and content structure from a multi-department medical centre.",
      mark: ["a multi-department medical centre"],
      jump: "A specialist practice",
    },
    located: {
      text: "We improve Google Business Profiles, location details, service categories and local pages so healthcare providers can appear for relevant nearby searches and support calls, website visits, direction requests and appointment enquiries.",
      mark: ["location details, service categories and local pages"],
    },
    individual: {
      text: "Digital marketing for healthcare professionals can support specialist profiles, treatment visibility, educational content and consultation enquiries.",
      mark: ["specialist profiles, treatment visibility, educational content and consultation enquiries"],
    },
    open: {
      text: "The strategy is adapted to the services and patient journey involved.",
      mark: ["the services and patient journey involved"],
    },
  } as Record<PracticeShape, ShapeSource>,
};

/* ------------------------------------------------------------------- why --- */

export const why = {
  title: "Why Choose ENH Marketing for",
  strokeTitle: "Healthcare Marketing?",
  lead: "ENH Marketing connects healthcare SEO, paid advertising, content, social media and local search within one strategy.",
  leadMark: ["within one strategy"],

  /** Seven single assertions, each carrying one specific. The specific is what
   *  a provider is reading for, so it is marked where it stands rather than
   *  lifted into a chip, which would print the same words twice. */
  items: [
    "Treatment priorities are clarified before campaigns begin.",
    "SEO focuses on the services and searches relevant to the provider.",
    "Paid campaigns are measured through consultation enquiries and appointment actions.",
    "Healthcare content is structured clearly and reviewed for accuracy.",
    "Local visibility includes clinic information, Google Business Profiles and direction requests.",
    "Reporting shows which treatments, pages and campaigns generate patient interest.",
    "Website content is organised for traditional search engines and AI assistants.",
  ],
  itemMarks: [
    ["before campaigns begin"],
    ["relevant to the provider"],
    ["consultation enquiries and appointment actions"],
    ["reviewed for accuracy"],
    ["direction requests"],
    ["generate patient interest"],
    ["traditional search engines and AI assistants"],
  ],

  /** THE THREE CHECKS. The document does not close this section with a claim
   *  about ENH: it closes with three things a provider should ask of anyone,
   *  including us. They are set as three questions because that is what the
   *  sentence makes them, and they are the reason this section is a check
   *  register rather than a list of reasons. */
  checkStem:
    "When comparing a healthcare SEO consultant, healthcare SEO firm or full-service agency, providers should check who creates the treatment content, how it is approved and which patient actions are being measured.",
  checks: [
    "who creates the treatment content",
    "how it is approved",
    "which patient actions are being measured",
  ] as [string, string, string],

  tail: "The best digital marketing agency for healthcare should be able to explain what requires attention first and how each activity supports the provider’s objectives.",
  tailMark: ["what requires attention first"],
  scope:
    "As a Dubai digital marketing agency, ENH Marketing can manage an individual healthcare service or coordinate a broader campaign for clinics and medical professionals across the UAE.",
};

/* ------------------------------------------------------------------ faqs --- */

export const faqs: Faq[] = [
  {
    q: "What are digital marketing services for health care?",
    a: "Digital marketing services for health care use SEO, paid advertising, content, social media and local search to help patients find suitable providers. The work should support measurable actions such as consultation enquiries, calls and appointment requests.",
  },
  {
    q: "Why is SEO important for healthcare providers?",
    a: "Healthcare SEO helps providers appear when patients search for treatments, specialists and clinics. A healthcare SEO agency improves technical website performance, treatment pages, specialist information and local visibility so relevant searches can lead to patient enquiries.",
  },
  {
    q: "What does a healthcare SEO company do?",
    a: "A healthcare SEO company reviews how a provider appears in organic and local search. The work may cover keyword research, technical SEO, treatment pages, internal links, location content, Google Business Profiles and performance reporting.",
  },
  {
    q: "Which platforms work best for healthcare marketing?",
    a: "Google Search and local search are particularly useful because they reach people actively looking for treatments or nearby providers. Meta platforms can support awareness, educational content and remarketing. The right channel mix depends on the service, audience and intended patient action.",
  },
  {
    q: "What does a healthcare PPC agency manage?",
    a: "A healthcare PPC agency plans paid campaigns around relevant treatments, services and locations. It manages keywords, targeting, advertisements, landing pages, budgets and conversion tracking, with performance assessed through patient enquiries and appointment actions.",
  },
  {
    q: "How long does healthcare SEO take to deliver results?",
    a: "Healthcare SEO campaigns typically begin showing measurable improvements within three to six months. Timing depends on the website structure, competition, treatment keywords, location and existing search visibility. Technical improvements may be completed earlier, while stronger organic traffic and enquiries usually take longer to develop.",
  },
  {
    q: "Can social media help healthcare providers attract patients?",
    a: "Social media can help providers share educational content, introduce specialists and explain available services. A healthcare social media marketing agency should maintain accurate, appropriate messaging and connect relevant campaigns with a clear enquiry or appointment route.",
  },
  {
    q: "Can healthcare professionals use digital marketing individually?",
    a: "Yes. Digital marketing for healthcare professionals can support specialist profiles, treatment visibility, educational content and consultation enquiries. The strategy should accurately represent the professional’s qualifications, services, locations and approved areas of expertise.",
  },
  {
    q: "Can healthcare providers appear in AI search results?",
    a: "Clear and well-structured healthcare content can make it easier for AI assistants to understand a provider’s services and locations. Treatment explanations, specialist information, FAQs and consistent business details support this visibility. Inclusion in a particular AI-generated response cannot be guaranteed.",
  },
];

/* ------------------------------------------------------------- final cta --- */

export const finalCta = {
  title: "Tell Us Which Healthcare",
  strokeTitle: "Services You Want to Promote",
  body: "Send us your website, locations, priority treatments and the types of patient enquiries you want to increase.",
  note: "We will review how patients currently find the provider and what happens before they contact the clinic. The proposal will show whether SEO, paid advertising, social media, local visibility or the patient journey needs attention first.",
  primary: "Request a Healthcare Proposal",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
