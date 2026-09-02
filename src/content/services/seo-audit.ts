// SEO Audit — page content.
// Copy source: "SEO Audit.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// FIGURES. All the document's own: a 60-page PDF, 400 issues, the three that
// matter, the other 399, one to two weeks, over a year. The hero draws exactly
// 400 marks because 400 is the number the document gives; nothing is rounded,
// and no severity, score or percentage is invented anywhere on this page.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "SEO Audit Services in Dubai | ENH Marketing",
  description:
    "Get a prioritised review of your website's technical health, on-page signals, content, authority and AI visibility, with clear owners and effort estimates for every fix.",
};

export const hero = {
  lines: ["SEO Audit", "Services", "in Dubai"] as [string, string, string],
  sub: "Get a prioritised review of your website's technical health, on-page signals, content, authority and AI visibility, with clear owners and effort estimates for every fix.",
  primary: "Get a Free SEO Audit",
  secondary: "Talk to an SEO Expert",
};

/** The opening complaint: the audit nobody reads twice. */
export const narrative = {
  heading: ["When Your Website Needs", "an Independent SEO Review"] as [string, string],
  scene:
    "Most audits arrive as a 60-page PDF exported from a tool, with 400 issues listed and no indication which three matter.",
  sceneEmphasis: "no indication which three matter",
  body: "It gets read once, forwarded to a developer, and never opened again.",
  agency:
    "ENH Marketing runs SEO audits for UAE businesses and delivers something shorter and more useful: what is wrong, what it is costing you and what to do first. As a Dubai digital marketing agency, we audit sites we did not build, including those built by other agencies, and say exactly what we find.",
  closing:
    "You get a prioritised list with an owner and an effort estimate against each item.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

/** Four situations, and one answer to all of them. */
export const reasons = {
  title: "Why Sites",
  strokeTitle: "Get Audited",
  lead: "Four situations bring people here.",
  items: [
    "Traffic dropped and nobody knows why.",
    "A site was rebuilt and rankings went with it.",
    "An agency has been paid for a year and the reports look busy while the numbers do not move.",
    "Or a business is about to spend on SEO and wants to know what it is buying first.",
  ],
  // Reconstruction: convergeLead + " " + converge
  convergeLead: "All four need the same thing:",
  converge: "an outside read from someone with no stake in the previous decisions.",
};

export type Area = { no: string; area: string; check: string; matters: string; glyph: GlyphVariant };

/** The document supplies this as a three-column table, so it stays one. */
export const areas = {
  title: "The Five Areas",
  strokeTitle: "We Check",
  lead: "An SEO audit should show where visibility is being lost and which fixes matter most.",
  ledeTail: "We review five connected areas:",
  columns: ["Area", "What we check", "Why it matters"] as [string, string, string],
  items: [
    {
      no: "01",
      area: "Technical health",
      glyph: "schema",
      check:
        "Crawling, indexing, redirects, broken pages, sitemaps, site speed and mobile usability",
      matters:
        "Search engines need to access and understand a page before it can appear in results",
    },
    {
      no: "02",
      area: "On-page signals",
      glyph: "text",
      check:
        "Page titles, headings, content structure, search intent, internal links and structured data",
      matters:
        "These signals help search engines understand each page and help visitors find answers quickly",
    },
    {
      no: "03",
      area: "Content quality and overlap",
      glyph: "structure",
      check:
        "Thin or outdated content, missing topics and pages competing for the same searches",
      matters:
        "Overlapping pages can split ranking signals, while content gaps leave relevant searches unanswered",
    },
    {
      no: "04",
      area: "Off-site authority",
      glyph: "offsite",
      check:
        "Backlinks, brand mentions, directory listings and business information across the web",
      matters:
        "These external signals can strengthen the website's credibility and support its ability to compete",
    },
    {
      no: "05",
      area: "AI and answer visibility",
      glyph: "answer",
      check:
        "Access for AI search crawlers, brand mentions, citations and current appearances in AI-generated answers",
      matters:
        "This shows whether AI tools can find enough clear and credible information to reference the brand",
    },
  ] as Area[],
};

/** The page's signature argument: the tool's list against the judgement. */
export const judgement = {
  title: "A Real Audit and a Tool Report",
  strokeTitle: "Are Different Things",
  crawler: "Anyone can run a crawler.",
  output:
    "The output is a list of everything technically imperfect on your site, sorted by the tool's own severity rating, which knows nothing about your business.",
  turn: "The work is in the judgement afterwards.",
  /** Three questions the document sets as three sentences. */
  questions: [
    "Which of those 400 issues affect pages that make money.",
    "Which are theoretical.",
    "Which one thing, fixed on Tuesday, would change more than the other 399 combined.",
  ],
  /** The figures inside those questions, weighted where they occur. */
  figures: ["400", "399"],
  closing: "We run the tools too.",
  closingTail: "We just do not send you their output and call it a strategy.",
};

export const receive = {
  title: "What You",
  strokeTitle: "Actually Receive",
  items: [
    "A short summary you could read before a meeting, in plain language",
    "The prioritised list: high, medium and low, each with the reasoning",
    "An effort estimate against every item, so you can plan resource",
    "Who should own each fix: developer, content, marketing or us",
    "Screenshots and examples, so nothing needs taking on faith",
    "A walkthrough call, with your developer invited",
  ],
  plain: "Everything is written for someone who does not do this for a living.",
  test: "If your finance director cannot follow it, we have written it badly.",
};

export const timing = {
  title: "How Long",
  strokeTitle: "It Takes",
  // The figure inside the sentence, so the section can set it at scale without
  // restating it. Reconstruction: spanLead + " " + figure + ", " + spanTail
  spanLead: "Usually",
  figure: "one to two weeks",
  span: "Usually one to two weeks,",
  spanTail: "depending on site size and how quickly we get access to Search Console and Analytics.",
  access: "Access matters more than you would expect.",
  accessBody:
    "An audit without Search Console data is guesswork about half of the picture that actually shows what people searched before they found you.",
};

export const worth = {
  title: "When an Audit",
  strokeTitle: "Is Worth Doing",
  items: [
    "Before you commit budget to ongoing SEO, so you know the starting point",
    "After a redesign, migration, or platform change",
    "When traffic or rankings fall without an obvious cause",
    "Before or after changing agency, as a baseline",
    "When you have a large site nobody has reviewed in over a year",
  ],
  // Reconstruction: notLead + " " + notBody
  notLead: "An audit is less useful on a brand-new site with almost no content.",
  notBody: "There is nothing to diagnose yet, and the money is better spent building the pages.",
};

export const fixing = {
  title: "Fixing What",
  strokeTitle: "the Audit Finds",
  standalone: "The audit is deliberately sold on its own.",
  options:
    "You can take the list to your existing agency, hand it to an in-house developer, or work through it yourself.",
  quoted:
    "The findings may involve development, content or other digital marketing services. If you would rather we implement them, that work is quoted separately once we know what is actually on the list.",
  refusal:
    "Quoting the fix before diagnosing the problem is how audits end up recommending exactly what the auditor already sells.",
};

export type Claim = { title: string; body: string; not?: string };

/** Five claims. Three of them are written as "X, not Y" in the source, so the
 *  thing being rejected is kept and set against the thing that replaces it.
 *  The other two have no counterpart and are not given an invented one. */
export const approach = {
  title: "How We Approach",
  strokeTitle: "It Differently",
  items: [
    {
      title: "The audit is a product",
      not: "a sales pitch",
      body: "You can take it and walk away, and some clients do.",
    },
    {
      title: "Priority is based on money",
      not: "tool severity",
      body: "A critical warning on a page nobody visits is not critical.",
    },
    {
      title: "Findings are shown",
      not: "asserted",
      body: "Every item comes with the evidence.",
    },
    {
      title: "Your developer is invited to the call.",
      body: "Audits that never reach the person doing the fixing achieve very little.",
    },
    {
      title: "We include AI visibility.",
      body: "Most audit templates in this market predate it entirely.",
    },
  ] as Claim[],
  cta: "Request a Quote",
};

export const faqs: Faq[] = [
  {
    q: "What is an SEO audit?",
    a: "A structured review of everything affecting your visibility in search: technical setup, on-page signals, content, off-site profile and, increasingly, whether AI assistants can read and cite you. It produces a prioritised list of what to fix and in what order.",
  },
  {
    q: "How long does an audit take?",
    a: "Usually one to two weeks, depending on site size and how quickly we get access to your Search Console and Analytics. Larger ecommerce catalogues take longer because the crawl and the sampling take longer.",
  },
  {
    q: "What do you need from us?",
    a: "Read access to Google Search Console and Analytics, and ideally a look at the CMS. We can audit without them, but Search Console is where the honest data lives, so the audit is weaker without it.",
  },
  {
    q: "Do we have to buy the fixes from you?",
    a: "No. Plenty of clients take the list to their own developer or existing agency. The audit is priced as a standalone piece of work for exactly that reason.",
  },
  {
    q: "Will you tell us if our current agency is doing a bad job?",
    a: "Yes, and we will show you the evidence rather than just the opinion. We will also say when the work looks sound, and the problem is elsewhere, which happens more often than you might think.",
  },
  {
    q: "How is this different from a free SEO report?",
    a: "Free reports are tool exports with a sales call attached. They list problems without weighting them, and the recommendations reliably match whatever the sender sells. Ours is judged output with priorities, effort estimates and owners.",
  },
  {
    q: "How often should a site be audited?",
    a: "Once a year for most businesses, and after any redesign, migration or unexplained traffic drop. Large ecommerce sites benefit from a lighter check more often.",
  },
];

export const finalCta = {
  title: "Get a Straight Read",
  strokeTitle: "on Your Site",
  body: "Tell us your website, roughly how many pages it has, and what made you look into this. We will tell you whether an audit is worth doing and what it would cost.",
  note: "If your problem is obvious enough that you do not need one, we will say that instead.",
};

/** The two SEO pages carry the site field; see content/forms.ts. */
export { seoFormFields as formFields } from "@/content/forms";

/** Mid-page CTA band. Supplied under "SEO Audit Services Page CTA". Stored in
 *  sentence case; the band uppercases it. */
export const growthCta = {
  heading: ["Ready to find what's holding", "your SEO back?"] as [string, string],
  support:
    "Uncover Technical Issues, Identify Ranking Opportunities & Get Actionable Insights to Improve Your Website's Search Performance",
  button: "Get a Free SEO Audit",
};
