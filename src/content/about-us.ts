// About Us — page content.
// Copy source: "About Us.docx" (client-supplied, 2026-09-09). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures, people or CTA microcopy.
//
// WHAT THIS DOCUMENT ACTUALLY IS, AND WHY THE PAGE IS SHAPED THE WAY IT IS.
//
// It opens on the boldest possible claim -- "WE ARE YOUR DIGITAL GROWTH
// SPECIALISTS" -- and then spends the rest of its length earning it. Half the
// file is not about ENH's opinion of itself at all: it is about an
// accreditation issued by somebody else, with the requirements listed, the
// renewal named, and three FAQs explaining what the badge means. So the page is
// a claim being progressively substantiated, and the Google Partner chapter is
// its climax rather than a badge row near the footer.
//
// THERE ARE EXACTLY TWO NUMBERS IN THE WHOLE DOCUMENT: "established in 2011"
// and "more than 15 years of experience". Nothing else is counted anywhere.
// There is no project count, no retention rate, no headcount and no award. The
// site's own `stats` in lib/content.ts carry four such figures and NONE of them
// appear on this page, because this document does not support them. For the
// same reason there is no team section with names or portraits: the document
// describes the team at length and never names a single person.
//
// THE DOCUMENT HABITUALLY BURIES LISTS INSIDE SENTENCES, and every drawing on
// this page is built on one of them rather than on a diagram invented to fill
// space. The four `*Mark` arrays below are verbatim substrings of the sentence
// immediately above them, and they exist so a drawing can light the clause it
// has reached without printing the words a second time:
//
//   "We thrive on curiosity, perpetually challenging expectations, pushing
//    boundaries, and seeking out new opportunities."                    -> 4
//   "certified Google Ads experts proficient in Search, Shopping, and
//    Display"                                                           -> 3
//   "campaign performance, advertising spend, and professional
//    certification"                                                     -> 3
//   "ethical marketing methods, ongoing optimisation, and insights from
//    Google"                                                            -> 3
//
// SPELLING IS THE DOCUMENT'S, INCONSISTENCIES INCLUDED. The body copy is US
// ("maximize", "optimize", "recognized") and the FAQ answers are UK
// ("optimisation", "recognises"). That is how the client wrote it and it is
// left alone rather than harmonised, because harmonising is editing.

import type { Faq } from "@/content/services/performance-marketing";

/** Neither line is in the document, because a document about the company does
 *  not carry its own <title>. Both are assembled from the document's own
 *  sentences rather than written: the title from "a respected digital agency in
 *  Dubai" plus the legal name, the description from the banner paragraph and
 *  the founding year. Nothing is claimed here that the page does not say. */
export const meta = {
  title: "About ENH Marketing | 15 Years of Digital Expertise",
  description:
    "Discover ENH Marketing with 15 years of experience delivering digital growth, SEO, and performance-driven strategies for businesses across industries.",
};

/* ---------------------------------------------------------------- banner --- */

/** "WE ARE YOUR DIGITAL GROWTH SPECIALISTS", split across three lines for the
 *  masthead. The break points are typesetting; the words are the document's.
 *
 *  ONE CALL TO ACTION, NOT TWO. Every other hero on this site carries a
 *  primary button and a phone link beside it. This document's banner has a
 *  single button, "Reach Out to Discover", so that is all the hero renders. A
 *  second label would have to be written by us. */
export const hero = {
  lines: ["We Are Your", "Digital Growth", "Specialists"] as [string, string, string],
  sub: "At ENH Marketing, we are dedicated to empowering ambitious brands like yours to challenge norms and drive significant impact. By employing cutting-edge digital marketing techniques and leveraging data-driven insights, we craft strategies that unlock your business's growth potential.",
  /** The document's own button label. */
  primary: "Reach Out to Discover",
};

/* ------------------------------------------------------- explore new heights */

/** The company's own H2, and the brand's tagline: ENH is Explore New Heights.
 *
 *  `striveMark` are the four clauses of the sentence above it, in the order the
 *  document writes them. They are what the frontier drawing advances through,
 *  and they are printed exactly once -- inside the sentence. */
export const story = {
  title: "Explore New",
  strokeTitle: "Heights",
  /** The only hard date in the document. */
  founded: "2011",
  established:
    "ENH Marketing was established in 2011 and today stands as a respected digital agency in Dubai with a multi-disciplined team collaborating and serving a diverse range of national and global brands.",
  strive:
    "We continue to strive for growth. We thrive on curiosity, perpetually challenging expectations, pushing boundaries, and seeking out new opportunities.",
  striveMark: [
    "curiosity",
    "perpetually challenging expectations",
    "pushing boundaries",
    "seeking out new opportunities",
  ] as [string, string, string, string],
  mission:
    "Our mission is to be your trusted agency partner, delivering measurable results and exploring ways to foster your business growth.",
  invitation:
    "Reach out to discover more about how we can drive growth for your business through industry with strategic digital marketing solutions. We are a full-service digital marketing agency in Dubai, fully committed to helping you explore new heights.",
};

/* ------------------------------------------------------------ core values --- */

export type CoreValue = {
  /** The document's own H3, kept as one string including the ampersand. */
  title: string;
  /** Split only where the document itself uses two sentences. */
  body: string[];
  /** Which drawing carries this value. One per value, no repeats. */
  drawing: "ledgers" | "root" | "watch";
};

/** "Our Core Values" — three, each a compound of two words.
 *
 *  EACH VALUE IS DRAWN AS THE OBJECT ITS OWN SENTENCE NAMES, at a deliberately
 *  different size, because three equal cards would say the three are
 *  interchangeable and the document does not:
 *
 *   - "the same care and integrity as we would our own" -> two sheets kept in
 *     lockstep, ours and yours, one mark landing on both at once.
 *   - "a deep-rooted enthusiasm" -> a root, drawn deep, splitting into the two
 *     things the sentence says it feeds: the craft and the partners.
 *   - "the vigilant eyes and ears for our clients" -> a watch that is already
 *     looking, and already hearing something arrive. */
export const values = {
  title: "Our Core",
  strokeTitle: "Values",
  items: [
    {
      title: "Transparency & Flexibility",
      body: [
        "We're a reliable marketing ally that brands can rely on.",
        "We handle our clients' businesses with the same care and integrity as we would our own.",
      ],
      drawing: "ledgers",
    },
    {
      title: "Passion & Commitment",
      body: [
        "We have a deep-rooted enthusiasm for our work and a genuine passion for both our craft and the partners we collaborate with.",
      ],
      drawing: "root",
    },
    {
      title: "Proactiveness & Service Excellence",
      body: [
        "In the swiftly evolving digital landscape, being alert and proactive is essential.",
        "We pride ourselves on being the vigilant eyes and ears for our clients.",
      ],
      drawing: "watch",
    },
  ] satisfies CoreValue[] as CoreValue[],

  /** The two sheets in the first value's drawing, labelled with the two things
   *  its own sentence says are handled alike. Verbatim substrings of "We handle
   *  our clients' businesses with the same care and integrity as we would our
   *  own." Two labels is inside the three docs/DESIGN.md rule 2 allows, and
   *  without them two identical sheets say nothing. */
  sheetLabels: ["our clients' businesses", "our own"] as [string, string],

  /** The two taps the root forks into, in the order the second value's sentence
   *  writes them: "a genuine passion for both our craft and the partners we
   *  collaborate with." */
  rootMarks: ["our craft", "the partners we collaborate with"] as [string, string],
};

/* ------------------------------------------------------------------ team --- */

/** "Our Team".
 *
 *  NO NAMES, NO ROLES, NO PORTRAITS, NO HEADCOUNT. The document writes four
 *  sentences about this team and names nobody, so the section cannot be a
 *  directory and does not pretend to be one. What it does give is a claim about
 *  proportion -- "Though small in size, our team is powerful" against
 *  "spanning every facet of the customer retail journey" -- and that is the
 *  thing the drawing shows.
 *
 *  `spanMark` is the clause the folding rule reaches at full extension. */
export const team = {
  title: "Our",
  strokeTitle: "Team",
  collaborate:
    "We passionately collaborate with brands to create cutting-edge digital solutions that offer deeper insights and maximize growth potential.",
  essence: "Our team is the essence of what sets ENH apart.",
  talented:
    "We are talented, brimming with enthusiasm, and always eager to collaborate on any challenge.",
  /** The proportion claim. The drawing is folded when this is the lit clause. */
  small: "Though small in size, our team is powerful.",
  span: "Collectively, we possess a vast range of knowledge and experience spanning every facet of the customer retail journey.",
  spanMark: "spanning every facet of the customer retail journey",
  /** The document's own closing aside, exclamation mark included. */
  aside: "And, without boasting too much, we're a delightful group to collaborate with!",
};

/* -------------------------------------------------------- google partner --- */

export type Requirement = {
  /** The document's own H3. */
  title: string;
  body: string[];
  /** Verbatim substrings of the requirement's own body, set as a register
   *  rather than left inside the prose. Empty where the document buries no
   *  list in that requirement. */
  mark: string[];
};

/** "We Are A Certified Google Partner" — the document's centre of gravity and
 *  this page's climax.
 *
 *  IT IS SET APART BY SCALE, NOT BY A DARK GROUND. The first plan for this
 *  chapter was a near-black band, and docs/DESIGN.md rule 6 has already ruled
 *  on exactly that: a `chapter-dark` class was tried once, made the light theme
 *  run white, cut to #101010 for one section and cut back, and read "as a seam
 *  rather than a chapter". So this chapter gets the one thing that rule names
 *  as the alternative — pacing. It is the only section on the page at
 *  chapter-scale vertical rhythm.
 *
 *  THREE REQUIREMENTS MEAN THREE DRAWINGS, NOT ONE DRAWING IN THREE STATES.
 *  DESIGN.md rule 7: a single drawing that only changes state "collapses into
 *  the one abstract shape" its subjects have in common. Certified experts,
 *  best-practice implementation and a track record recognised by somebody else
 *  have no shape in common, so each gets its own.
 *
 *  THE DRAWINGS ARE THE ACCREDITATION, NEVER THE BADGE. Google's badge
 *  guidelines forbid distorting, recolouring or animating the mark, so the
 *  issued artwork is carried unaltered by `sections/PartnerBadges` and nothing
 *  drawn here touches it. */
export const partner = {
  title: "We Are A Certified",
  strokeTitle: "Google Partner",
  trust:
    "Gain trust in your digital agency through the Google Partner network. Being an official Google Partner agency, we hold the esteemed recognition of being an elite business partner acknowledged by Google.",
  harness:
    "Collaborate with us to harness the expertise of proven digital marketers dedicated to advancing your online business growth.",
  /** The sentence the whole drawing exists to make felt. */
  ongoing: "Accreditation as a Google Partner is a meticulous and ongoing process.",
  showcase:
    "In order to attain Google Partner agency status, we must showcase the following:",
  requirements: [
    {
      title: "Certified Experts",
      body: [
        "Our team comprises certified Google Ads experts proficient in Search, Shopping, and Display.",
        "We continuously update our knowledge with new tools and techniques, consistently renewing our certifications.",
      ],
      mark: ["Search", "Shopping", "Display"],
    },
    {
      title: "Best Practice Implementation",
      body: [
        "We adhere to recommended best practices within our clients’ Google Ads accounts to optimize their investments in paid search advertising.",
      ],
      /** The whole point of this requirement is WHOSE account the work happens
       *  in, which is what its drawing draws. Note the curly apostrophe: it is
       *  the document's, and the substring has to match it exactly or the mark
       *  is silently not found. */
      mark: ["our clients’ Google Ads accounts"],
    },
    {
      title: "Proven Results",
      body: [
        "Our track record of delivering consistent results to clients is well-established and recognized by Google.",
        "This ensures our clients achieve the desired return on investment they seek and rightfully deserve.",
      ],
      /** The clause that turns a claim into a record: somebody else signed it. */
      mark: ["recognized by Google"],
    },
  ] satisfies Requirement[] as Requirement[],
  /** What the three demonstrations open, in the document's own words. */
  access:
    "As a Google Partner, we receive exclusive access to resources from Google. This advantage enables us to identify opportunities for your business and assist you in staying ahead in the digital landscape.",
};

/* ------------------------------------------------------------------ faqs --- */

/** The document's three questions, verbatim, in its order. Its own numbering
 *  ("1.", "2.", "3.") is dropped because FaqList numbers them itself. */
export const faqs: Faq[] = [
  {
    q: "What is a Google Partner agency?",
    a: "A Google Partner agency has met Google’s requirements for campaign performance, advertising spend, and professional certification. The badge recognises agencies that have demonstrated the skills needed to manage Google Ads campaigns and support client growth.",
  },
  {
    q: "Why work with a Google Partner agency?",
    a: "Working with a Google Partner agency gives you access to certified professionals who follow Google’s recommended practices. ENH uses ethical marketing methods, ongoing optimisation, and insights from Google to improve campaign performance while protecting your website and brand.",
  },
  {
    q: "Why choose ENH Marketing?",
    a: "ENH combines more than 15 years of experience with a data-driven approach and a team of certified Google Ads specialists. We manage campaigns across Search, Shopping, Display, and YouTube, using consistent monitoring to improve sales and return on investment.",
  },
];

/* ------------------------------------------------------------- final cta --- */

/** Built from the document's own invitation paragraph and its one button
 *  label. The heading is that paragraph's opening words, split for the house
 *  two-line treatment; nothing is written for it. */
export const finalCta = {
  title: "Reach Out",
  strokeTitle: "To Discover",
  body: "Reach out to discover more about how we can drive growth for your business through industry with strategic digital marketing solutions.",
  note: "We are a full-service digital marketing agency in Dubai, fully committed to helping you explore new heights.",
  primary: "Reach Out to Discover",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
