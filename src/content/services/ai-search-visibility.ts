// AI Search Visibility — page content.
// Copy source: "AI Search Visibility.docx" (client-supplied). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
//
// DEPARTURES FROM THE SOURCE, agreed with the client on 2026-09-03:
//
//   1. "Run a Free Visibility Check" is the document's secondary call to action
//      in the banner and the closing block. No check tool exists. The client
//      chose to point it at the contact page. That page is not built either, and
//      this site's rule (see ui/Crosslink) is that a link to an unbuilt route is
//      worse than no link, so until /contact joins BUILT the label sends the
//      reader to the closing form, whose copy is the free check in prose: "Send
//      us your website ... We will check whether your brand currently appears".
//      The moment /contact ships, the link goes there instead, with no edit.
//
// NO RESULTS SECTION. "AI Search Visibility Results" is an instruction in the
// document, not content: "[Add real, permissioned examples ...]". Nothing is
// rendered for it and nothing is invented. Work and Insights on the page are
// the site's shared sections.
//
// NO FIGURES. The document says "No guaranteed placements and no general AI
// score", and every drawing on the page follows it: no counts, no scores, no
// before-and-after that could read as a promised result.
//
// THIRD-PARTY STATEMENTS. FAQs 3, 4 and 8 attribute positions to OpenAI, Google
// and Microsoft in the document's own words. They are carried verbatim and not
// extended. Sourcing them with dated links is the client's call; see the review
// note delivered with the page.
//
// FORM. The standard site-wide set applies (team direction 2026-09-02).

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "AI Search Visibility Services in Dubai | ENH Marketing",
  // The banner's first sentence, verbatim.
  description:
    "ENH Marketing helps UAE brands improve how they appear in AI-generated search results.",
};

export const hero = {
  lines: ["AI Search Visibility", "Services", "in Dubai"] as [string, string, string],
  sub: "ENH Marketing helps UAE brands improve how they appear in AI-generated search results. We work on the website, content, technical access, business information, and external references that help AI systems understand a business. This service covers ChatGPT search, Google AI Overviews and AI Mode, Gemini, Perplexity, Microsoft Copilot and other AI search experiences. Our role is to identify what can be improved, implement the work, and monitor the results.",
  primary: "Book an AI Visibility Diagnostic",
  secondary: "Run a Free Visibility Check",
  /** The platforms the banner names, in its order, for the hero drawing's
   *  caption row. Names only, as the document writes them. */
  platforms: ["ChatGPT search", "Google AI Overviews and AI Mode", "Gemini", "Perplexity", "Microsoft Copilot"],
  /** The three verbs the "What We Do" sentence hangs on, which the hero draws
   *  as three stations. Its own words. */
  stations: ["Find", "Understand", "Reference"] as [string, string, string],
};

/** "What We Do". The first sentence leads as the question; the second, with
 *  the names this work goes by, is decoded word by word; the third closes. */
export const narrative = {
  heading: ["What", "We Do"] as [string, string],
  question:
    "AI search visibility is about making accurate information about your business easier for AI search systems to find, understand, and reference.",
  questionEmphasis: "find, understand, and reference",
  body: "This work is also described as AI SEO, answer engine optimisation, generative engine optimisation, AEO, GEO or LLM SEO. These terms have different uses, but they are all connected to the same goal.",
  highlight: ["SEO", "AEO", "GEO", "optimisation", "LLM"],
  outro: [
    "ENH Marketing reviews your current visibility, finds the gaps and prepares a plan based on the questions your customers ask. The scope is customised to your business, market and website.",
  ],
  primary: "Book an AI Visibility Diagnostic",
  secondary: "Run a Free Visibility Check",
};

export type ServiceRole = "baseline" | "lever" | "monitor";

export type Service = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** Read from the document: the first service "creates a baseline that can be
   *  used to measure future changes", the last one "repeat[s] the agreed
   *  searches and record[s] changes". Those two measure; the five between them
   *  change things. The section is laid out as exactly that. */
  role: ServiceRole;
};

export const services = {
  title: "Our AI Search",
  strokeTitle: "Visibility Services",
  items: [
    {
      no: "01",
      title: "AI Visibility Baseline",
      body: "We start with an agreed list of questions related to your services, products and market. We test those questions across the included AI platforms and record whether your brand appears, which pages are cited and which competitors are mentioned. This creates a baseline that can be used to measure future changes.",
      glyph: "baseline",
      role: "baseline",
      labels: ["Questions", "Platforms"],
    },
    {
      no: "02",
      title: "Technical Access",
      body: "AI search systems cannot use a page if their search crawler cannot reach or process it. We review indexing, crawler access, robots.txt rules, noindex settings, canonical tags, sitemaps and other technical controls. We also check whether important content depends on scripts that make it difficult to access. Only public pages that you want people and search systems to find should be made accessible.",
      glyph: "crawler",
      role: "lever",
    },
    {
      no: "03",
      title: "Clear, Answer-Led Content",
      body: "We review whether your website gives clear answers to the questions people ask about your business. This may involve improving service pages, location pages, product information, FAQs, comparisons and educational content. Important information should appear clearly on the page and be supported by accurate details. The aim is to make the content useful to people while also making its meaning easier for search and AI systems to understand.",
      glyph: "text",
      role: "lever",
    },
    {
      no: "04",
      title: "Business and Entity Consistency",
      body: "Your company name, services, locations, contact information, and other important details should remain consistent across the web. We review your website and relevant external profiles to find missing, outdated, or conflicting information. We then identify which details need correcting. This is particularly important for UAE businesses serving specific locations or operating under several brand names.",
      glyph: "entity",
      role: "lever",
    },
    {
      no: "05",
      title: "Structured Data",
      body: "Structured data gives search engines clear information about the content and organisations shown on a page. We implement relevant schema markup for areas such as your organisation, services, locations, products, people and articles. The markup must match the information people can see on the page. There is no special AI schema that guarantees inclusion in an AI-generated answer. Structured data remains one part of the wider technical setup.",
      glyph: "schema",
      role: "lever",
    },
    {
      no: "06",
      title: "External References and Brand Mentions",
      body: "AI-generated answers may use information from sources beyond your website. We review relevant business listings, reviews, partner websites, industry publications, news coverage and other public sources. The aim is to build accurate and credible information around the brand. We do not create false reviews, manufactured mentions or paid links presented as independent coverage.",
      glyph: "offsite",
      role: "lever",
    },
    {
      no: "07",
      title: "Visibility Monitoring and Reporting",
      body: "We repeat the agreed searches and record changes in mentions, citations and competitor visibility. Where platforms provide reporting, we also review cited pages, referral traffic and available search performance data. The report separates confirmed results from estimates and manual observations.",
      glyph: "watch",
      role: "monitor",
      labels: ["Questions", "Each month"],
    },
  ] as Service[],
};

/** "Website Changes and Development". Two paragraphs, and a fork: the existing
 *  website is improved, or a rebuild is scoped. The second paragraph names the
 *  AI Website Development service, which links once that page is built. */
export const website = {
  title: "Website Changes",
  strokeTitle: "and Development",
  lead: "AI search visibility often requires changes to the website. Existing pages may need clearer information, stronger structure or corrected technical settings. New service, product, location or educational pages may also be required.",
  body: "ENH Marketing can implement these changes on a suitable existing website. If the current website cannot support the required work, a rebuild can be scoped through our AI Website Development service. The diagnostic will state whether the existing website can be improved or whether larger development work is needed.",
  link: { label: "AI Website Development service", href: "/ai-hub/intelligent-web" },
  /** The two outcomes the last sentence names, as the drawing's two labels. */
  /** The drawing's heading; the sentence calls the check "the diagnostic". */
  diagnosticLabel: "The diagnostic",
  branches: ["Existing website can be improved", "Larger development work is needed"] as [string, string],
};

export type Step = { no: string; title: string; body: string };

/** "How the Work Moves". Five steps. The last one returns to the first: step 5
 *  "repeat[s] the agreed searches" that step 1 ran, so the run is drawn as a
 *  ladder whose foot loops back to its head. */
export const process = {
  title: "How the",
  strokeTitle: "Work Moves",
  items: [
    { no: "1", title: "Run the Initial Check", body: "We test a small selection of relevant questions to see whether the business currently appears." },
    { no: "2", title: "Complete the Diagnostic", body: "We review the agreed platforms, website, content, technical access and external information in greater detail." },
    { no: "3", title: "Set the Priorities", body: "You receive a clear plan showing what needs to change, why it matters and who will handle it." },
    { no: "4", title: "Implement the Work", body: "We complete the agreed technical, content and external visibility work. Items that need support from your team are stated in advance." },
    { no: "5", title: "Monitor the Results", body: "We repeat the agreed searches, review available platform data and report changes over time." },
  ] as Step[],
  /** The return, in step five's own words. */
  returnLabel: "repeat the agreed searches",
};

/** "Ongoing AI Visibility Support". Nine duties on a monthly rhythm: the lead
 *  says the inputs "change regularly", the first duty is "each month", and the
 *  closing line scopes "the monthly scope". */
export const support = {
  title: "Ongoing AI",
  strokeTitle: "Visibility Support",
  lead: "AI search results, website content and external sources change regularly. Ongoing support can include:",
  items: [
    { text: "Testing the agreed questions each month", glyph: "answer" },
    { text: "Recording brand mentions and website citations", glyph: "ledger" },
    { text: "Monitoring selected competitors", glyph: "audience" },
    { text: "Reviewing crawler access", glyph: "crawler" },
    { text: "Updating important pages", glyph: "text" },
    { text: "Correcting outdated business information", glyph: "entity" },
    { text: "Identifying new content requirements", glyph: "generate" },
    { text: "Reporting confirmed AI referral traffic where available", glyph: "tracking" },
    { text: "Recommending the next priorities", glyph: "recommend" },
  ] as { text: string; glyph: GlyphVariant }[],
  scope: "The monthly scope will state which platforms, questions, competitors, and website changes are included.",
};

export const faqs: Faq[] = [
  {
    q: "What is AI SEO?",
    a: "AI SEO is a broad term for improving how a brand or website appears in AI-assisted search. It can include technical SEO, clear website content, crawler access, structured data, consistent business information, external references, and ongoing measurement.",
  },
  {
    q: "What is the difference between SEO, AEO and GEO?",
    a: "SEO focuses mainly on visibility in traditional search results. AEO focuses on making direct answers easy to understand. GEO focuses on improving the chance that content or a brand is referenced in generative answers. The work overlaps, and none of these services can guarantee placement.",
  },
  {
    q: "Can you make my business appear in ChatGPT?",
    // Two paragraphs in the source, kept as two.
    a: [
      "We can improve the factors that may support visibility in ChatGPT search, including website access, content quality, and external references.",
      "OpenAI confirms that websites that opt out of OAI-SearchBot will not be shown as sources in ChatGPT search answers, although they may still appear as navigational links. Allowing the crawler does not guarantee inclusion.",
    ],
  },
  {
    q: "Can you make us appear in Google AI Overviews?",
    a: "We can improve whether your pages are accessible, indexed, useful and eligible to appear in Google Search. Google states that there are no additional technical requirements or special optimisations needed for AI Overviews or AI Mode. Normal SEO requirements and helpful content still apply.",
  },
  {
    q: "Does AI search visibility replace SEO?",
    a: "No. Traditional SEO remains part of the foundation. Search engines and AI search features still need to find, process and understand your website. Technical health, content quality and credible external signals remain important.",
  },
  {
    q: "Can you guarantee a citation or mention?",
    a: "No. ENH Marketing cannot guarantee that an AI platform will mention, cite or rank a business. We can improve the information available to these systems and measure changes across an agreed set of questions.",
  },
  {
    q: "How long does AI visibility work take?",
    a: "There is no fixed timeline. Technical corrections may be processed after a search system crawls the website again. Content changes, external recognition, and authority may take longer to influence results. The diagnostic will set realistic review periods for the work included.",
  },
  {
    q: "How do you measure AI search visibility?",
    a: "We use an agreed set of questions and record brand mentions, citations, cited pages and competitor appearances. We also review referral traffic and native platform data where it is available. Microsoft, for example, provides citation reporting for supported AI experiences through Bing Webmaster Tools.",
  },
  {
    q: "Which AI platforms do you monitor?",
    a: "The scope can cover ChatGPT search, Google AI Overviews and AI Mode, Gemini, Perplexity, and Microsoft Copilot. The proposal will state the platforms and number of questions included.",
  },
  {
    q: "Should we allow every AI crawler to access our website?",
    a: "Not automatically. We review which pages are public, which crawlers support search visibility, and whether your business has any legal, privacy or content licensing requirements. Access should match your business policy.",
  },
  {
    q: "Can this help with local visibility in Dubai?",
    a: "It can improve how clearly your location, services and business information are presented across your website and relevant external sources. This may support location-based AI and search results, but local inclusion cannot be guaranteed.",
  },
  {
    q: "Will we need to change our website?",
    a: "Most businesses need at least some changes. These may involve technical settings, page structure, service information, location details, FAQs, or structured data. The diagnostic will show whether small updates are enough or whether development work is required.",
  },
  {
    q: "What does AI SEO cost in Dubai?",
    a: "The cost depends on the size of the website, number of markets, platforms monitored, content requirements, and amount of technical or external visibility work needed. Your proposal will separate the diagnostic, implementation, and ongoing monitoring costs.",
  },
];

export const finalCta = {
  title: "Find Out How AI Search",
  strokeTitle: "Systems See Your Brand",
  body: "Send us your website and the services or products you want to be found for. We will check whether your brand currently appears, which sources are being used and what may need improvement.",
  note: "No guaranteed placements and no general AI score. You receive a clear assessment based on the platforms and questions included in the scope.",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
