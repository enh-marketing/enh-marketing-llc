// SEO — pillar page content.
// Copy source: "Search Engine Optimization.docx" (client-supplied, 2026-09-03).
// VERBATIM. Headings are the document's own, split across lines only for
// typesetting. Do not add copy here.
//
// THE ARGUMENT IS RELEVANCE, NOT VOLUME. The opening is blunt about it: "A
// website can rank for hundreds of keywords and still bring in very little
// business." Everything downstream follows -- keywords are assessed "by search
// intent and commercial value", and the measuring section ends on "relevance
// matters more than exposure alone". So the hero draws a ranked list where
// almost nothing is worth having, and no section on this page presents a
// position or a traffic figure as an outcome.
//
// TWO SECTIONS OF THIS DOCUMENT ARE GATES, NOT COPY.
//   "Our Work" is "[display our work]".
//   "FAQs" is "[same as the existing ones]".
// Neither is written out here. The page renders the site's own Work section
// and the site's own FAQ set, both of which are real, permissioned content
// that already exists in src/lib/content.ts. Nothing is invented to fill
// either. TODO(client): confirm "the existing ones" means the site-wide FAQ
// set and not a per-page list held somewhere else.
//
// NO FIGURES. This document states none, and its own FAQ position is that a
// ranking cannot be promised. Nothing here charts, counts or forecasts.

import type { MeasureRow } from "@/components/service/MeasureTable";
import type { IndexEntry } from "@/components/service/ServiceIndex";
import type { TrackStage } from "@/components/service/StageTrack";
import type { Sector } from "@/components/service/SectorLedger";

export const meta = {
  title: "SEO Services in Dubai | ENH Marketing",
  description:
    "Improve your search visibility with technical SEO, content, local optimisation and search strategies built around the customers your business wants to reach.",
};

export const hero = {
  lines: ["SEO", "Services", "in Dubai"] as [string, string, string],
  sub: "Improve your search visibility with technical SEO, content, local optimisation and search strategies built around the customers your business wants to reach.",
  primary: "Improve My Search Visibility",
  secondary: "Talk to an SEO Expert",
};

export const narrative = {
  heading: ["Turn Search Visibility", "Into Business"] as [string, string],
  scene:
    "A website can rank for hundreds of keywords and still bring in very little business. The search terms may be irrelevant, the wrong pages may be ranking, or visitors may arrive without finding a clear next step.",
  sceneEmphasis: "still bring in very little business",
  agency:
    "ENH Marketing provides SEO services in Dubai for businesses that want relevant organic traffic and more opportunities to convert it. We cover technical SEO, content, local search, e-commerce, link building, AEO and GEO.",
  highlight: [
    "technical SEO",
    "content",
    "local search",
    "e-commerce",
    "link building",
    "AEO and GEO",
  ],
  closing:
    "We also report on what those rankings produce, so you can see which pages and searches are bringing useful traffic.",
};

export const reasons = {
  title: "Why Choose ENH Marketing",
  strokeTitle: "for SEO in Dubai",
  lead: "Type “SEO company Dubai”, “SEO agency Dubai” or “search engine optimisation Dubai” into Google and you will find plenty of agencies promising higher rankings. The work behind those promises matters more.",
  items: [
    "We look beyond traffic growth. Keywords are assessed by search intent and commercial value before they are added to the plan.",
    "Technical issues come first when they are holding the site back. Publishing more content will not solve poor indexing, weak site structure or pages that search engines cannot understand.",
    "Local and ecommerce SEO get their own strategies. A Google Business Profile and a product catalogue have very different problems.",
    "Content is written around what customers are searching for, with service pages, landing pages, guides and blogs each given a clear role.",
    "Link building focuses on relevant editorial placements. We avoid poor-quality links that put the website at risk.",
    "Search data is explained clearly. You can see which terms, pages and locations are improving without having to decode an SEO report.",
  ],
  tail: "The best SEO company in UAE for your business should be able to show what needs fixing, what deserves investment and what can wait.",
};

/** The nine children. Four of these pages are not built yet; their cards
 *  render in full and simply do not link. See ServiceIndex. */
export const services = {
  title: "Our Search Engine",
  strokeTitle: "Optimization Services",
  items: [
    {
      no: "01",
      title: "Local SEO Services",
      glyph: "entity",
      href: "/services/seo/local-seo-services",
      body: "Customers searching “near me” in Dubai should find you first. We optimise your Google Business Profile, local citations, reviews and location pages so you show up across the emirates you serve.",
    },
    {
      no: "02",
      title: "Ecommerce SEO",
      glyph: "catalogue",
      href: "/services/seo/ecommerce-seo",
      body: "Product and category pages are where ecommerce SEO is won or lost. We fix site structure, product schema, filters and thin descriptions so your listings rank and convert.",
    },
    {
      no: "03",
      title: "On-Page SEO",
      glyph: "text",
      href: "/services/seo/on-page-seo",
      body: "Titles, headings, internal links and page structure tell Google what each page is about. We optimise every element on the page so your content has a stronger chance of ranking for the right searches.",
    },
    {
      no: "04",
      title: "Link Building",
      glyph: "offsite",
      href: "/services/seo/link-building",
      body: "Backlinks remain one of the strongest ranking signals, but poor links can trigger penalties. We build relevant editorial links from trusted publications using outreach that keeps your site safe.",
    },
    {
      no: "05",
      title: "Keyword Research",
      glyph: "intent",
      href: "/services/seo/keyword-research",
      body: "The right keywords decide if your traffic buys or bounces. We map search demand across your services, filter it by intent and commercial value, then prioritise the terms worth targeting.",
    },
    {
      no: "06",
      title: "SEO Audit",
      glyph: "diagnose",
      href: "/services/seo/seo-audit",
      body: "Knowing what is holding your site back is the right place to start. Our audit covers technical health, content, links and rankings, with a prioritised list of fixes.",
    },
    {
      no: "07",
      title: "SEO Content Creation",
      glyph: "creative",
      href: "/services/seo/seo-content-creation",
      body: "Useful content needs to answer the search properly. We create service pages, guides and landing copy for search engines and the people reading them.",
    },
    {
      no: "08",
      title: "Blog Creation",
      glyph: "generate",
      href: "/services/seo/blog-creation",
      body: "A consistent blog can build topical authority and attract traffic long after publishing. We plan, write and optimise articles around the questions your customers already search for.",
    },
    {
      no: "09",
      title: "AEO and GEO",
      glyph: "answer",
      href: "/services/seo/aeo-and-geo",
      body: "Buyers now use ChatGPT, Gemini and Google’s AI search features during their research. We structure your content and brand information so these systems can understand what your business covers and find relevant information more easily.",
    },
  ] as IndexEntry[],
  tail: "Our local SEO services and ecommerce SEO services are also available as focused scopes.",
};

export const measure = {
  title: "What",
  strokeTitle: "We Measure",
  lead: "Search analytics reveal what people look for, which pages they find and what they do after arriving.",
  headTrack: "What we track",
  headTells: "What it tells you",
  rows: [
    { track: "Organic conversions", tells: "Which pages and searches produce enquiries, purchases or other valuable actions" },
    { track: "Search queries", tells: "The words people use before reaching the website" },
    { track: "Keyword positions", tells: "Where visibility is improving or slipping" },
    { track: "Organic landing pages", tells: "Which pages attract search traffic and which need more work" },
    { track: "Local search activity", tells: "How people find and interact with your Google Business Profile" },
    { track: "Technical health", tells: "Indexing, crawling and page issues that may restrict visibility" },
    { track: "Links and referring domains", tells: "Which websites contribute to the site’s authority" },
    { track: "Search visibility", tells: "How much of the relevant search market the website currently reaches" },
  ] as MeasureRow[],
  note: "Relevance matters more than exposure alone. Search analytics help us find valuable keyword patterns, understand customer behaviour and decide what to work on next.",
};

export const process = {
  title: "How Our SEO",
  strokeTitle: "Process Works",
  stages: [
    { no: "1", title: "Audit and Plan", body: "We review technical health, existing content, backlinks, rankings and search performance. You receive a prioritised list of problems and a plan built around the services or products that matter most." },
    { no: "2", title: "Research and Structure", body: "We map keywords by intent, commercial value and the page they should lead to. Site structure, page targeting and internal links are reviewed at the same time." },
    { no: "3", title: "Fix and Optimise", body: "Technical issues and on-page elements are addressed according to priority. Titles, headings, content, schema and internal links are improved where needed." },
    { no: "4", title: "Build the Content", body: "We create or update service pages, category pages, product content, guides and blogs. Each page is based on a real search need and has a defined place within the website." },
    { no: "5", title: "Strengthen Local and Off-Page Signals", body: "Google Business Profile optimisation, citations, reviews, location pages and editorial link building are handled according to the scope." },
    { no: "6", title: "Review and Adjust", body: "We track rankings, organic traffic, conversions and search behaviour. The next month’s priorities come from what the data shows." },
  ] as TrackStage[],
};

export const sectors = {
  title: "Industries That Benefit",
  strokeTitle: "From Search Visibility",
  lead: "SEO works best when people are already searching for the product, service or information the business provides.",
  items: [
    { label: "Ecommerce and retail", detail: "product pages, category pages, filters and product schema" },
    { label: "Local businesses", detail: "Google Business Profile, location pages, citations and reviews" },
    { label: "Real estate", detail: "project pages, community searches and location-led enquiries" },
    { label: "Healthcare", detail: "treatment pages, clinic searches and service information" },
    { label: "Professional services", detail: "legal, audit, accounting, corporate services and company formation" },
    { label: "Education and training", detail: "courses, qualifications and programme searches" },
    { label: "Technology and B2B", detail: "service pages, technical content and research-led searches" },
    { label: "Hospitality", detail: "hotels, restaurants, venues and local discovery" },
    { label: "Home and trade services", detail: "maintenance, fit-out, moving and automotive services" },
  ] as Sector[],
  /** The three paragraphs the document closes the section with, all about the
   *  local case. Kept as separate paragraphs, in order. */
  localNotes: [
    "Local search is especially important when customers need a nearby business. People searching for a service “near me” are often ready to compare options or make contact.",
    "Our local SEO services in Dubai cover Google Business Profile optimisation, local citations, reviews and location pages. We work with businesses serving customers through a physical location, a defined service area or several branches.",
    "ENH Marketing also works as a local SEO company in Dubai for B2B, B2C and healthcare companies that want to improve local visibility and attract more relevant enquiries.",
  ],
};

/** The document's closing argument, before the work and the FAQs. */
export const closing = {
  title: "Be Seen, Be Found and Drive Sales",
  strokeTitle: "With the Best SEO Services in Dubai",
  lead: "SEO helps prospective customers find your business when they search for the services, products or information you provide.",
  body: [
    "It can also improve the website itself. Clearer navigation, better page structure and more useful content make it easier for visitors to understand the business and take the next step.",
    "Good SEO takes patience, technical skill and an understanding of search behaviour. Our SEO content strategy keeps the intended audience at the centre of the work while supporting stronger organic traffic, rankings and conversions.",
  ],
};

export const finalCta = {
  title: "Tell Us What",
  strokeTitle: "You Want to Rank For",
  body: "Send us your website, the services or products you want to promote and the locations you need to reach.",
  note: "We will review the site and tell you what needs attention first. If technical work, content or local SEO should take priority, the proposal will make that clear.",
  primary: "Request an SEO Proposal",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
