// AEO and GEO — page content.
// Copy source: "AEO and GEO Services.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// This document is unusually careful about what it claims, and the page has to
// stay that careful. It quotes Google directly, it names the terms AEO and GEO
// as industry coinages, and it refuses to promise placement. Nothing in this
// file may soften any of that.

import type { Faq, Stage } from "@/content/services/performance-marketing";
import type { Capability } from "@/content/services/meta-ads";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "AEO & GEO Services in Dubai | AI Search Visibility | ENH Marketing",
  description:
    "See how your brand appears across Google AI Overviews, ChatGPT, Perplexity, Gemini, and Copilot, then strengthen the content, technical access, and third-party signals that influence those answers.",
};

export const hero = {
  lines: ["AEO and GEO", "Services", "in Dubai"] as [string, string, string],
  sub: "See how your brand appears across Google AI Overviews, ChatGPT, Perplexity, Gemini, and Copilot, then strengthen the content, technical access, and third-party signals that influence those answers.",
  primary: "Request an AI Visibility Check",
  secondary: "Talk to an AI Search Expert",
};

/** The opening argument. The scenario sentence is the page's whole thesis, so
 *  the layout gives it display scale rather than burying it in body copy. */
export const narrative = {
  heading: ["Strengthening Your Presence", "in AI Answers"] as [string, string],
  scenario:
    "Someone asks ChatGPT for a recommendation in your category. Three companies get named. You are not one of them, and there is no dashboard anywhere that will tell you it happened.",
  // The clause the section sets at display size. It is a substring of
  // `scenario` above, printed once, not repeated.
  scenarioLead:
    "Someone asks ChatGPT for a recommendation in your category. Three companies get named.",
  scenarioEmphasis: "You are not one of them,",
  scenarioTail: "and there is no dashboard anywhere that will tell you it happened.",
  body: "ENH Marketing works on how brands appear in AI answers, across Google's AI Overviews and AI Mode, ChatGPT, Perplexity, Gemini, and Copilot. Plenty of what is currently sold as this work does nothing, and we are going to tell you which parts on this page rather than in the proposal. As a Dubai digital marketing agency, we focus on work businesses can actually check, and this is a field where checking matters.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

/** Two industry coinages, decoded — and the document's warning about who
 *  invented them, which is the point of the section. */
export const acronyms = {
  title: "What These Acronyms",
  strokeTitle: "Actually Mean",
  terms: [
    {
      short: "AEO",
      glyph: "answer" as GlyphVariant,
      expansion: "answer engine optimisation",
      body: "means being the source an AI assistant draws on when it answers a question.",
    },
    {
      short: "GEO",
      glyph: "generate" as GlyphVariant,
      expansion: "generative engine optimisation",
      body: "means much the same thing, aimed at systems that generate an answer rather than list links.",
    },
  ],
  caveat:
    "Neither term comes from Google, OpenAI or anyone else who runs these systems. They are industry coinages, invented by people selling the service, which is worth knowing before anyone quotes you for it.",
  question:
    "The underlying question is real, though: when a machine answers on your behalf, does your business get mentioned?",
};

/** Google's own words. Both quotes are verbatim from the document, which took
 *  them from Google's AI features documentation. They are set as quotations
 *  with the source named, because a page about being cited should show what
 *  citing something properly looks like. */
export const google = {
  title: "What Google",
  strokeTitle: "Says About This",
  intro: "Worth reading before you buy anything, because it is unusually direct.",
  quotes: [
    {
      lead: "Google's documentation on AI features states:",
      quote:
        "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary.",
    },
    {
      lead: "It goes further.",
      quote:
        "You don't need to create new machine-readable files, AI text files, or markup to appear in these features. There's also no special schema.org structured data that you need to add.",
    },
  ],
  eligibility:
    "To be eligible as a supporting link, a page needs to be indexed and eligible to appear with a snippet. That is the whole technical requirement.",
  // The eligibility sentence, split where it lists its two conditions. Both
  // strings are lifted from it verbatim; the section sets them as the two
  // items they are, because two is the argument.
  eligibilityLead: "To be eligible as a supporting link, a page needs to be",
  conditions: ["indexed", "eligible to appear with a snippet"],
  eligibilityVerdict: "That is the whole technical requirement.",
  fanout:
    "Google also describes AI Overviews and AI Mode using a “query fan-out” technique, running multiple related searches across subtopics to build one answer. Which has a practical consequence: content that answers the neighbouring questions, not only the headline one, has more chances to be picked up.",
  // The clause the section sets at display scale. A substring of `closing`.
  closingEmphasis: "good SEO is the work",
  closing:
    "So for Google's AI surfaces, the honest answer is that good SEO is the work. Anyone charging you separately for Google GEO should be asked what they are doing that ordinary SEO would not. The work also connects with SEO, content, and the technical foundations used across broader digital marketing services.",
};

export type Assistant = {
  name: string;
  /** Column 2: how it finds current information. */
  finds: string;
  /** Column 3: what this means for your website. */
  means: string;
};

/** The document's three-column table, kept as data. The page renders it as a
 *  switcher rather than a table: five rows of dense prose is a spreadsheet, and
 *  the reader only needs one assistant at a time. */
export const assistants = {
  title: "Where the Other Assistants",
  strokeTitle: "Get Their Answers",
  columns: {
    name: "Assistant",
    finds: "How it finds current information",
    means: "What this means for your website",
  },
  rows: [
    {
      name: "Google AI Overviews and AI Mode",
      finds: "Uses Google’s Search index, ranking systems and related searches to build responses",
      means: "Standard SEO remains the starting point. Pages must be indexed and eligible to appear in Google Search. No AI-specific file or markup is required",
    },
    {
      name: "ChatGPT",
      finds: "Can search the web using OpenAI’s crawlers and results from search partners. It may also answer from model knowledge when web search is not used",
      means: "Allow OAI-SearchBot to access your website. Keep important business information clear on your own site and consistent across credible third-party sources",
    },
    {
      name: "Perplexity",
      finds: "Searches the web in real time and includes numbered citations linking to the sources used",
      means: "You can review which pages are being cited, check whether they support the answer and identify subjects your website has yet to cover properly",
    },
    {
      name: "Gemini",
      finds: "Uses its model knowledge and can access public information from Google Search, Maps, YouTube and other Google services",
      means: "Google Search visibility matters, along with accurate and consistent information across the Google services relevant to your business",
    },
    {
      name: "Microsoft Copilot",
      finds: "Uses Bing search results when web search is enabled. Microsoft 365 versions may also use authorised work data",
      means: "Make sure your website can be crawled and indexed by Bing. Bing visibility can directly affect web-grounded Copilot answers",
    },
  ] as Assistant[],
  closing: [
    "A crawlable website gives these systems reliable information from the business itself. They may also find reviews, directories, press coverage, videos, forum discussions and other third-party sources.",
    "Your website remains the main source you control. Keeping the same core information accurate across the wider web gives AI assistants more evidence to understand and reference your brand.",
  ],
};

// The levers are typed as Capability so this page can hand them straight to
// CapabilityCarousel, the coverflow the Meta Ads page uses for "What We
// Actually Do". Same component, same card, same interaction — no second
// implementation of a list of seven things.

/** Seven bullets from the document, split at the first full stop. The lead
 *  phrase is the lever; the rest is why. Concatenating title + ". " + body
 *  reproduces each bullet word for word. */
export const levers = {
  title: "What Actually",
  strokeTitle: "Moves the Needle",
  items: [
    {
      no: "01",
      title: "Being crawlable by the right bots",
      glyph: "crawler",
      body: "GPTBot, OAI-SearchBot, PerplexityBot, and ClaudeBot are controlled through robots.txt. Some sites block them by accident and then wonder about the silence.",
    },
    {
      no: "02",
      title: "Being indexed in Bing, not only Google",
      glyph: "index",
      body: "Frequently overlooked, and it feeds Copilot.",
    },
    {
      no: "03",
      title: "Content in text",
      glyph: "text",
      body: "Answers buried in images, PDFs or video with no transcript are invisible to the systems doing the summarising.",
    },
    {
      no: "04",
      title: "Answering the neighbouring questions",
      glyph: "fanout",
      body: "The fan-out point above. Cover the sub-questions someone would ask next.",
    },
    {
      no: "05",
      title: "Third-party presence",
      glyph: "offsite",
      body: "Being listed, reviewed, compared and mentioned on sites that are not yours. This is the heaviest lever for the non-Google assistants and the one nobody wants to sell, because it is slow.",
    },
    {
      no: "06",
      title: "Entity consistency",
      glyph: "entity",
      body: "Same business name, address, and description everywhere. Assistants get confused by contradictions and tend to skip what they cannot resolve.",
    },
    {
      no: "07",
      title: "Structured data that matches the page",
      glyph: "schema",
      body: "Not because Google requires it for AI features, but because it helps machines parse you correctly and it earns rich results in ordinary search anyway.",
    },
  ] as Capability[],
};

/** Five stages. Stage 5 sends you back to stage 1 — "same prompts, same
 *  intervals" — so the page draws this as a loop rather than a ladder. */
export const stages: Stage[] = [
  {
    no: "01",
    title: "Find out where you stand",
    body: "We run your category's real questions across the main assistants and record what comes back, including who is being named instead of you.",
  },
  {
    no: "02",
    title: "Clear the blockers",
    body: "Crawler access, Bing indexing, text availability, entity consistency across your listings.",
  },
  {
    no: "03",
    title: "Fill the answer gaps",
    body: "Content built around the questions that came up in stage one, including the neighbouring ones.",
  },
  {
    no: "04",
    title: "Work the third-party surface",
    body: "Directories, listings, roundups and review platforms, because that is what the non-Google systems read.",
  },
  {
    no: "05",
    title: "Re-test on a schedule",
    body: "Same prompts, same intervals, so movement is visible rather than claimed.",
  },
];

export const audience = {
  title: "Who Needs",
  strokeTitle: "This Now",
  items: [
    "Categories where buyers research before contacting anyone: professional services, clinics, B2B suppliers, education",
    "Businesses already seeing enquiries mention an AI assistant",
    "Anyone whose competitors get named in AI answers when they do not",
    "Brands with an entity problem: several name variations, inconsistent listings, or an old address still circulating",
  ],
  caveat:
    "If your customers buy on impulse from a Reels ad, this is not your priority yet, and we will tell you so.",
};

export const promise = {
  title: "What We Will and",
  strokeTitle: "Will Not Promise",
  willNotLabel: "We will not promise",
  willNot: [
    "placement in an AI answer",
    "a specific mention rate",
    "a score that goes up every month",
  ],
  willLabel: "We will show you",
  will: [
    "which questions you currently appear for and which you do not",
    "what changed after we worked on it",
    "what we would do next",
  ],
  method:
    "Tested with the same prompts each time, so the comparison means something.",
  cta: "Request a Quote",
};

export const faqs: Faq[] = [
  {
    q: "What is the difference between AEO, GEO and SEO?",
    a: "SEO covers visibility in search results generally. AEO and GEO are industry terms for being cited inside AI-generated answers. For Google's AI features, the work overlaps almost entirely with SEO. For ChatGPT and Perplexity, third-party mentions and crawler access matter more.",
  },
  {
    q: "Do we need an llms.txt file?",
    a: "Google's guidance says AI text files are not required for its AI features, and reports on whether other assistants use it disagree. It is cheap to add and unlikely to do much. Treat anyone selling it as a main deliverable with caution.",
  },
  {
    q: "Can you guarantee we appear in ChatGPT answers?",
    a: "No, and nobody can. These systems produce different answers to the same question at different times. What we can do is test where you currently stand, work on the inputs that influence it, and show you what changed.",
  },
  {
    q: "How do we know if AI assistants mention us now?",
    a: "Prompt testing. We run the questions your buyers would ask across the main assistants and record who gets named. That is the only reliable method, and it needs repeating on a schedule to be worth anything.",
  },
  {
    q: "Does AI search traffic show in Google Analytics?",
    a: "Partly. Referrals from AI domains appear as traffic sources, and Google reports AI Overviews and AI Mode inside Search Console under the Web search type. Neither gives you a clean separate number, which is why we also use self-reported attribution on forms.",
  },
  {
    q: "Is schema markup necessary for AI visibility?",
    a: "Google states there is no special structured data required for its AI features. We still recommend schema, because it helps machines parse your pages correctly and it earns rich results in ordinary search. Just not on the basis that it unlocks AI Overviews.",
  },
  {
    q: "Should we block AI crawlers?",
    a: "That is a business decision, not a technical one. Blocking protects your content from being used for training but removes you from answers that could send buyers. Most businesses selling something want to be found. Publishers often decide otherwise.",
  },
];

export const finalCta = {
  title: "Find Out If AI",
  strokeTitle: "Assistants Mention You",
  body: "Tell us your category and the questions your customers ask before they buy. We will run them across the main assistants and send you what comes back, including which competitors get named.",
  note: "No charge for the first read. If you are already showing up well, we will tell you that and leave you alone.",
};

/** Form fields. The document names what it wants from an enquiry — "your
 *  category and the questions your customers ask before they buy" — so those
 *  two are here rather than the ad-spend fields the paid-media pages use. */
export const formFields = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "category", label: "Your category" },
  { id: "questions", label: "Questions your customers ask", wide: true },
  { id: "referral", label: "How did you hear about us?", wide: true },
];

/** Mid-page CTA band, above the work section. Supplied in the document under
 *  "AEO & GEO Services in Dubai Page CTA". Stored in sentence case and split
 *  across two lines for typesetting; the band uppercases it and sets the
 *  second line in brand red. */
export const growthCta = {
  heading: ["Ready to get found", "in AI search?"] as [string, string],
  support: "Boost Your Brand’s Visibility Across Google, ChatGPT & AI-Powered Search",
  button: "Get a Free AEO & GEO Strategy",
};
