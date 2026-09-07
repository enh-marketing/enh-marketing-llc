// SEO Content Creation: page content.
// Copy source: "SEO Content Creation.docx" (client-supplied, 2026-09-07).
// VERBATIM. Headings are the document's own, split across lines only for
// typesetting. Do not add copy here: no invented labels, figures or CTA
// microcopy.
//
// THE ARGUMENT IS PURPOSE, NOT KEYWORDS. The document states it in one
// sentence and the whole page follows from it: "Adding keywords to an existing
// page will not automatically make it useful or competitive. The page still
// needs to answer the search properly, explain the offer and guide the reader
// towards a sensible next step." Three requirements, and keywords are none of
// them. The section heading says the same thing another way -- give every page
// a clear purpose -- and the homepage entry says what happens without it: the
// website "does not repeat the same company introduction everywhere".
//
// THE FIVE COVERS ARE NOT EQUAL, AND THE DOCUMENT SAYS SO. Blog creation
// "remains a supporting part of this service, with the main focus placed on
// commercially important website pages". A flat row of five equal cards would
// contradict its own copy, so the five are drawn where they sit on a website.
//
// NO FIGURES ANYWHERE. This document contains no number of any kind: no page
// counts, no word counts, no timelines, no prices. "Approximate content depth"
// is a line in the proposal, not a figure, and FAQ 6 explicitly refuses a date:
// performance "develops at different rates" and is monitored "rather than
// promising a fixed ranking date". Nothing on this page states or implies one.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "SEO Content Creation Services in Dubai | ENH Marketing",
  description:
    "Create useful website content built around what your customers search for and what they need before taking action.",
};

export const hero = {
  lines: ["SEO Content", "Creation Services", "in Dubai"] as [string, string, string],
  sub: "Create useful website content built around what your customers search for and what they need before taking action.",
  primary: "Request a Content Review",
  secondary: "Talk to an SEO Specialist",
};

/** The opening. The document's order: what the service is, the thing it refuses
 *  to pretend, what we settle before writing, and who does it. */
export const narrative = {
  heading: ["Give Every Website Page", "a Clear Purpose"] as [string, string],

  /* Field names describe what each string IS, and the page body maps them onto
     Narrative's prop names. The two sets deliberately do not match: `agency` is
     this page's closing line, and calling the field `closing` said where it
     goes rather than what it says. */

  /** What the service is. Opens the section. -> Narrative `question`. */
  definition:
    "SEO content creation combines search research, page planning and copywriting to help the right pages appear for relevant searches.",
  /** A verbatim, contiguous substring of `definition`. */
  definitionEmphasis:
    "page planning and copywriting to help the right pages appear for relevant searches.",

  /** What ENH actually produces. -> Narrative `body`. */
  services:
    "ENH Marketing creates and improves service pages, landing pages, category content, product copy and selected blog articles for businesses across Dubai and the UAE.",
  /** SINGLE WORDS, NOT PHRASES. Narrative splits the body on spaces and
   *  compares word by word (see its `words()` helper), so a multi-word entry
   *  here matches nothing at all and fails silently: the sentence just renders
   *  flat. These are the words of the service list itself, minus the
   *  conjunctions, which is the emphasis the phrase form was reaching for. */
  servicesHighlight: [
    "improves",
    "service",
    "pages",
    "landing",
    "category",
    "content",
    "product",
    "copy",
    "selected",
    "blog",
    "articles",
  ],

  /** The refusal, and the three requirements it leaves standing. The hero
   *  drawing depicts this sentence. -> Narrative `outro`, first paragraph. */
  requirements:
    "Adding keywords to an existing page will not automatically make it useful or competitive. The page still needs to answer the search properly, explain the offer and guide the reader towards a sensible next step.",
  /** What is settled before a word is written. -> `outro`, second paragraph. */
  beforeWriting:
    "Before writing, we determine what the searcher wants, which page should target that need and how the content fits within the rest of the website.",
  /** Who does the work. Set at display scale. -> Narrative `closing`. */
  agency:
    "As a digital marketing company in Dubai, ENH Marketing brings SEO specialists, writers, developers and campaign teams into the same process. This helps us create content that supports search visibility without losing sight of the business behind it.",

  primary: "Request a Content Review",
  secondary: "Chat on WhatsApp",
};

export type Cover = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** The sentence the document singles an entry out with, lifted out of the
   *  body rather than marked inside it. Only the last entry has one: the
   *  document ends it by demoting it, and that sentence is the reason the
   *  drawing sets its region apart. Contiguous and unedited; only its position
   *  changes, and it is never also left in the body. */
  standout?: string;
};

/** Five kinds of content. The drawing puts each where it sits on a website
 *  rather than in a row of five equal cards: the document places the homepage
 *  above everything, puts the commercial pages at the centre of the work, and
 *  says outright that blog creation is the supporting part. */
export const covers = {
  title: "What Our SEO Content",
  strokeTitle: "Creation Covers",
  items: [
    {
      no: "01",
      title: "Service Page Content",
      glyph: "structure",
      body: "Service pages need to explain what the business provides, who it helps and why someone should make contact. We research relevant searches and structure each page around the service, customer questions, buying considerations and required calls to action. The content is written to fit its place within the wider website.",
    },
    {
      no: "02",
      title: "Landing Page Copy",
      glyph: "form",
      body: "Landing pages support a specific campaign, offer, audience or location. We write focused copy that connects the advertisement or search with the action expected on the page. The scope can include headings, supporting content, form copy, calls to action and recommendations for page structure.",
    },
    {
      no: "03",
      title: "Homepage and Core Website Content",
      glyph: "index",
      body: "A homepage needs to introduce the business clearly and direct visitors towards the most relevant services, products or information. We develop or rewrite homepage content alongside about, contact and other core pages. Each page is given a clear role so the website does not repeat the same company introduction everywhere.",
    },
    {
      no: "04",
      title: "Product and Category Content",
      glyph: "catalogue",
      body: "Ecommerce content needs to help shoppers understand products while giving search engines enough useful information to interpret each category. We can write category introductions, product descriptions, buying guidance and supporting copy. Large catalogues are planned according to priority rather than filling every page with repeated text.",
    },
    {
      no: "05",
      title: "Blog Creation",
      glyph: "text",
      body: "Blog content can support subjects that need more explanation than a service page should carry. We plan selected articles around genuine customer questions, informational searches and related business expertise.",
      standout:
        "Blog creation remains a supporting part of this service, with the main focus placed on commercially important website pages.",
    },
  ] as Cover[],
};

export type Stage = { no: string; title: string; body: string };

/** Seven stages. The document numbers them itself and calls them stages, so
 *  they keep its numbering and its words. Nothing here carries a duration:
 *  the document gives none, and its last FAQ refuses to. */
export const process = {
  title: "How Our SEO",
  strokeTitle: "Content Process Works",
  stages: [
    {
      no: "1",
      title: "Understand the Business",
      body: "We review the services, products, customers, locations and commercial priorities. Existing brand materials, sales information and customer questions help us understand what the content needs to communicate accurately.",
    },
    {
      no: "2",
      title: "Audit the Website",
      body: "Current pages are reviewed for quality, relevance, duplication, structure and performance. We identify which pages should remain, which need rewriting and where new content may be required.",
    },
    {
      no: "3",
      title: "Research Searches and Competitors",
      body: "We research the language customers use, the intent behind relevant searches and the types of pages currently appearing. Competitor research helps us understand the information customers expect. It is used for context rather than copying another company’s structure or wording.",
    },
    {
      no: "4",
      title: "Map Topics to Pages",
      body: "Each priority keyword or subject is assigned to the most suitable page. The content map also identifies internal links, supporting articles and pages that may be competing with one another.",
    },
    {
      no: "5",
      title: "Prepare the Content Brief",
      body: "The brief defines the page purpose, audience, main subject, supporting questions, structure and call to action. Required business information is identified before drafting so the writer does not fill gaps with assumptions.",
    },
    {
      no: "6",
      title: "Write and Review",
      body: "The content is written in the agreed brand voice and reviewed for clarity, accuracy, search intent and unnecessary repetition. Your team checks service details, claims, prices and regulated information before approving the final version.",
    },
    {
      no: "7",
      title: "Monitor and Improve",
      body: "Published pages are reviewed using search and website data. Content may need refinement when searches change, business information is updated or performance reveals a clearer opportunity.",
    },
  ] as Stage[],
};

/** THE PROPOSAL. Twelve lines the document commits to stating, and the reason
 *  it gives for stating them: three parties reading the same page. */
export const promises = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  lead: "Our content process connects search research with the information the business genuinely needs to communicate.",
  listLead: "Your proposal will state:",
  items: [
    "Which pages are being created or rewritten",
    "The purpose of each page",
    "Target subjects and searches",
    "Approximate content depth",
    "Information required from your team",
    "Review and approval responsibilities",
    "Revision allowance",
    "Upload and formatting responsibilities",
    "Included on-page SEO work",
    "Delivery schedule",
    "Performance review arrangements",
    "Work that requires a separate scope",
  ],
  tail: "This gives the writing team, SEO team and client a shared understanding of what each page is meant to achieve.",
  /** The three the tail names, marked inside it rather than listed again. */
  tailMark: ["writing team", "SEO team", "client"],
};

/** The document gives this section a real sentence rather than the bracketed
 *  instruction the other pages carry, so it is set above the site's own Work
 *  section instead of being dropped. */
export const work = {
  lead: "We are proud of the search and content projects we deliver for UAE businesses.",
};

export const faqs: Faq[] = [
  {
    q: "What is SEO content creation?",
    a: "SEO content creation is the process of researching, planning and writing website content around relevant searches and customer needs. It can include service pages, landing pages, product content, category pages, guides, FAQs and blog articles.",
  },
  {
    q: "Is SEO content only written for search engines?",
    a: "No. Search research helps identify what people want to know, but the finished content still needs to help the person reading it. A page that includes keywords without providing useful information is unlikely to support enquiries or sales.",
  },
  {
    q: "Can you rewrite our existing website content?",
    a: "Yes. We can audit and rewrite existing pages while retaining useful information and relevant search targeting. Pages with established performance are handled carefully so valuable content is not removed without a reason.",
  },
  {
    q: "Do you write content for new websites?",
    a: "Yes. We can plan and write content for a new website using its proposed structure, services, audience and search opportunities. The website sitemap should be reviewed before writing begins so each page has a defined purpose.",
  },
  {
    q: "Do you provide blog creation?",
    a: "Yes, when blog content supports the wider search strategy. We prioritise useful topics connected to customer questions and business expertise. Publishing frequent generic articles is not recommended simply to keep a blog active.",
  },
  {
    q: "How long does SEO content take to produce results?",
    a: "Search performance develops at different rates depending on the website, competition, technical condition and page being targeted. We monitor relevant queries, visibility, traffic and conversions rather than promising a fixed ranking date.",
  },
];

export const finalCta = {
  title: "Build Website Content",
  strokeTitle: "Around What Customers Need",
  body: "Tell us which services, products or locations you want the website to support.",
  note: "We will review the existing content, identify the pages that need attention and recommend a practical writing scope.",
  primary: "Request a Content Review",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
