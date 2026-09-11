// Intelligent Web — page content.
// Copy source: "Intelligent Web.docx" (client-supplied). VERBATIM.
//
// DEPARTURES FROM THE SOURCE:
//
//   1. The banner heading is "AI Website Development in Dubai", split across
//      three display lines for typesetting only.
//   2. "What We Build" is three short paragraphs. Narrative sets a scene, a
//      body and an outro, so they map one to one, unchanged.
//
// NO "SITES WE HAVE BUILT". The document's own instruction is a gate: "[Real
// builds, with the intelligent element specified and its measured effect. GATE
// applies: if this cannot be filled with real, permissioned examples, the
// section comes off rather than being filled with generic claims.]" Nothing is
// rendered for it and nothing is invented.
//
// NO PLACEMENT PROMISES. FAQ 5 is unusually blunt: "No agency can guarantee
// placement in ChatGPT, Google AI Overviews or another AI platform." So no
// drawing on this page shows a result, a ranking, a position or an AI answer
// containing the business. The AI-readable section draws access and structure,
// which is what is actually offered.
//
// NO SPEEDS OR SCORES. The performance element names what is tested (loading
// speed, mobile use, responsiveness, layout stability) and gives no figure for
// any of them. Nothing here carries a number.
//
// FORM. The standard site-wide set applies.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "AI Website Development Company Dubai | AI Web Services",
  // The banner's first sentence, verbatim.
  description:
    "Build smarter websites with AI website development services in Dubai. Get scalable, high-performing AI-powered websites designed for business growth.",
};

export const hero = {
  lines: ["AI Website", "Development", "in Dubai"] as [string, string, string],
  sub: "ENH Marketing designs and develops intelligent websites for UAE businesses. These websites can personalise content for different visitors, display live information from your business systems and use a clear structure that search engines and supported AI systems can understand.",
  primary: "Book a Web Diagnostic",
  secondary: "Talk to Our Web Team",
  /** The two visitors the hero draws. Both labels are personalisation rules the
   *  document lists: "location, language, industry, referral source, campaign,
   *  previous visits or client status". Nothing else about either is claimed. */
  visitors: ["First visit, from a campaign", "Returning client"] as [string, string],
};

/** "What We Build", on the site's own Narrative. */
export const narrative = {
  heading: ["Built Around What the", "Site Has to Do"] as [string, string],
  scene: "Every website is planned around what the business needs it to do.",
  sceneEmphasis: "what the business needs it to do",
  body: "We can design and build a new website, improve an existing one or connect your current website to the systems your team already uses. The features included will depend on your customers, business processes and available data.",
  bodyEmphasis: ["improve an existing one", "the systems your team already uses"],
  outro: [
    "Every intelligent website project also includes ongoing monitoring and technical support after launch.",
  ],
};

export type Capability = { no: string; title: string; body: string; glyph?: GlyphVariant };

/** One service's screen.
 *
 *  Five of the six bodies end in a list of nouns, and those nouns are what each
 *  screen is built from: the six stages of a build, the seven signals a
 *  personalisation rule may use, the seven kinds of live value, the four parts
 *  of a readable structure, the four things carried through a migration. Every
 *  label below is a verbatim clause of its own service's paragraph. Nothing is
 *  written for the screen. */
export type Screen = {
  kind: "build" | "improve" | "rules" | "live" | "readable" | "migrate";
  /** What the screen's own controls are labelled with, verbatim, in order. */
  parts: string[];
  /** The clause the drawing was read from, printed with it. */
  cite: string;
};

/** "Our AI Website Development Services". Six, each a single short paragraph in
 *  the source, which is why they run as a card set rather than a selector: there
 *  is no second paragraph to reveal. */
export const services = {
  title: "Our AI Website",
  strokeTitle: "Development Services",
  items: [
    {
      no: "01",
      title: "New Website Design and Development",
      body: "We design and develop complete websites for businesses that need a new online presence. This includes planning, design, development, content migration, testing, and launch.",
      glyph: "structure",
    },
    {
      no: "02",
      title: "Existing Website Improvements",
      body: "Some intelligent features can be added without rebuilding the entire website. We review the current setup and identify which improvements can be made within the existing platform.",
      glyph: "tracking",
    },
    {
      no: "03",
      title: "Website Personalisation",
      body: "Website content can change based on what is known about the visitor. This may include their location, language, industry, referral source, campaign, previous visits or client status.",
      glyph: "audience",
    },
    {
      no: "04",
      title: "Live Data and System Integrations",
      body: "The website can display current information from your existing systems. This may include pricing, stock, availability, bookings, project progress, course capacity or opening hours.",
      glyph: "reporting",
    },
    {
      no: "05",
      title: "AI-Readable Website Structure",
      body: "We organise the website so search engines and supported AI systems can access and understand its content. This includes clear page structures, structured data, consistent business information and access for relevant crawlers.",
      glyph: "crawler",
    },
    {
      no: "06",
      title: "Website Migration",
      body: "We can move an existing website to a new platform or rebuild it with intelligent features. Existing URLs, content, tracking and search visibility are considered during the migration.",
      glyph: "index",
    },
  ] as Capability[],
  /** One screen per service, in items order. */
  screens: [
    {
      kind: "build",
      parts: ["Planning", "Design", "Development", "Content migration", "Testing", "Launch"],
      cite: "businesses that need a new online presence",
    },
    {
      kind: "improve",
      parts: ["Within the existing platform"],
      cite: "added without rebuilding the entire website",
    },
    {
      kind: "rules",
      parts: [
        "Location",
        "Language",
        "Industry",
        "Referral source",
        "Campaign",
        "Previous visits",
        "Client status",
      ],
      cite: "based on what is known about the visitor",
    },
    {
      kind: "live",
      parts: [
        "Pricing",
        "Stock",
        "Availability",
        "Bookings",
        "Project progress",
        "Course capacity",
        "Opening hours",
      ],
      cite: "current information from your existing systems",
    },
    {
      kind: "readable",
      parts: [
        "Clear page structures",
        "Structured data",
        "Consistent business information",
        "Access for relevant crawlers",
      ],
      cite: "search engines and supported AI systems can access and understand",
    },
    {
      kind: "migrate",
      parts: ["Existing URLs", "Content", "Tracking", "Search visibility"],
      cite: "considered during the migration",
    },
  ] as Screen[],
};

/** "The Main Elements of an Intelligent Website". Six elements, and then a
 *  seventh that is not an element at all: it says which of the six you get.
 *  It is set apart for that reason, with the document's own three examples. */
export const elements = {
  title: "The Main Elements of an",
  strokeTitle: "Intelligent Website",
  items: [
    {
      no: "01",
      title: "Personalised Content",
      body: "Headlines, offers, case studies, calls to action, forms and page sections can change for different visitors. The personalisation rules are agreed during the project. They will only use information that is available through the website, campaign or connected business systems.",
    },
    {
      no: "02",
      title: "Live Data and Integrations",
      body: "The website can connect to CRMs, booking platforms, inventory systems, project tools, pricing systems and other business software. Systems with an API can usually be connected directly. Scheduled data exports may be used when a direct connection is unavailable.",
    },
    {
      no: "03",
      title: "Clear Website Structure",
      body: "Each page is organised around a clear subject and purpose. Important information is placed where visitors can find it easily. Structured data can also be added to describe the organisation, services, products, locations and frequently asked questions.",
    },
    {
      no: "04",
      title: "Search and AI Access",
      body: "The website is checked to make sure relevant search and AI crawlers can reach its public content. Business information is kept consistent across the website. This reduces confusion about the company name, location, services and other important details.",
    },
    {
      no: "05",
      title: "Website Performance",
      body: "The website is tested for loading speed, mobile use, responsiveness and layout stability before launch. Performance is also monitored after launch because updates, integrations and third-party tools can affect how the website works.",
    },
    {
      no: "06",
      title: "Analytics and Tracking",
      body: "Analytics and conversion tracking are configured before launch. This allows the business to measure visits, enquiries, purchases, bookings and other agreed actions from the first day the website is live.",
    },
  ],
  /** The seventh heading, which is the rule for the other six. */
  depends: {
    title: "Customised to Your Business",
    lead: "The features included in the website will depend on your business and its systems.",
    /** The document's own three examples, each with what it states that business
     *  may need. Nothing is added to any of them. */
    cases: [
      {
        who: "A service business",
        needs: "personalised case studies, CRM-connected forms and different calls to action for each industry.",
      },
      { who: "An ecommerce business", needs: "live stock, pricing and product information." },
      { who: "A training provider", needs: "current course dates and available places." },
    ],
    closing:
      "The web diagnostic identifies which features would be useful. The proposal then separates the design, development, integrations and managed service so you can see what each part includes.",
  },
};

export type Stage = { no: string; title: string; body: string };

/** "How the Project Works". Five steps, the last of which does not end. */
export const process = {
  title: "How the",
  strokeTitle: "Project Works",
  items: [
    {
      no: "01",
      title: "Website Diagnostic",
      body: "We review your current website, customer journey, business systems and any information that is being updated manually.",
    },
    {
      no: "02",
      title: "Scope and Recommendation",
      body: "We identify which intelligent features are suitable and whether the existing website can support them. You receive a written scope, timeline and cost.",
    },
    {
      no: "03",
      title: "Design and Development",
      body: "The approved pages, features and integrations are designed and developed. Content can be migrated from the current website where required.",
    },
    {
      no: "04",
      title: "Testing and Launch",
      body: "We test the website across devices and browsers. Personalisation rules, data feeds, integrations, forms and tracking are also checked before launch.",
    },
    {
      no: "05",
      title: "Monitoring and Support",
      body: "After launch, we monitor the website through the managed service. We also review the connected features when your systems or business requirements change.",
    },
  ] as Stage[],
  /** Zero-based index of the step that decides the shape of everything after
   *  it: "whether the existing website can support them". Improve, or rebuild.
   *  It is the same question the whole page keeps returning to. */
  forkAt: 1,
  /** The two outcomes, in the document's own words, from "We can design and
   *  build a new website, improve an existing one" and FAQ 2's "Bigger changes
   *  may require new templates or a rebuild". */
  fork: ["Improve an existing one", "New templates or a rebuild"],
};

/** "Managed Monitoring and Support". Six things covered, and then the sentence
 *  that says which side of the line routine content sits on. */
export const managed = {
  title: "Managed Monitoring",
  strokeTitle: "and Support",
  lead: "Every intelligent website includes a monthly managed service.",
  intro: "The service covers:",
  items: [
    "Monitoring website integrations and live data feeds",
    "Checking that personalisation rules are working correctly",
    "Fixing technical issues with the connected features",
    "Updating rules when agreed business requirements change",
    "Monitoring website performance after updates",
    "Providing technical support for the intelligent website features",
  ],
  /** Who does what, in the document's own words. */
  split: {
    yours: "Routine content updates can be managed by your team.",
    optional:
      "ENH Marketing can also handle them when content support is included separately in the scope.",
  },
  closing: "The managed-service fee is stated clearly in the proposal before the project begins.",
};

export const faqs: Faq[] = [
  { q: "What is an AI website?", a: "An AI website uses personalisation, automation, or connected business data after it goes live. It may change content for different visitors, display live information or connect website actions to other business systems. The exact features depend on what the business needs." },
  { q: "Can you improve our existing website?", a: "Yes, in many cases. Live data, structured information, tracking and some personalisation features can often be added to an existing website. Bigger changes may require new templates or a rebuild. We confirm this during the diagnostic." },
  { q: "What parts of the website can be personalised?", a: "Headlines, offers, case studies, calls to action, forms and page sections can be personalised. The rules can use information such as location, language, industry, referral source, advertising campaign, previous visits or client status." },
  { q: "Which systems can the website connect to?", a: "The website can connect to many CRMs, booking platforms, inventory systems, project tools, pricing systems and maintained databases or spreadsheets. The available connection will depend on whether the system provides an API or another reliable way to share its data." },
  { q: "Can this help our business appear in ChatGPT or Google AI Overviews?", a: "A clear website structure, accurate business information, structured data and crawler access can help supported AI systems understand your website. These improvements do not guarantee that the business will appear in an AI-generated answer. No agency can guarantee placement in ChatGPT, Google AI Overviews or another AI platform." },
  { q: "How long does an AI website take to build?", a: "The timeline depends on the number of pages, the design requirements and the systems being connected. A website with light personalisation will usually take less time than one with several live integrations, a large content migration or bilingual delivery. The confirmed timeline is included in the proposal." },
  { q: "How much does AI website development cost in Dubai?", a: "The cost depends on the website size, design, personalisation requirements and integration work. The proposal separates the standard website build from the intelligent features and managed service. This makes it clear what each part costs." },
  { q: "Who maintains the website after launch?", a: "ENH Marketing monitors the integrations, live data feeds and personalisation rules through the monthly managed service. Routine content updates remain with your team unless content management is included in the agreed scope." },
  { q: "Do we own the website and its code?", a: "Our standard position is that the website, original code, content and project accounts belong to you after the project is completed and paid for. Third-party platforms, software and licensed tools remain subject to their own terms. Ownership details will be confirmed in the project agreement." },
  { q: "What happens to our SEO rankings if the website is rebuilt?", a: "Existing URLs, internal links, metadata and indexation need to be handled carefully during a rebuild. We map old URLs to their new locations, retain important content and monitor Google Search Console after launch. Some short-term movement can happen while search engines process the changes." },
];

/** The closing block, split between the mid-page band and the foot. */
export const finalCta = {
  title: "Book a",
  strokeTitle: "Web Diagnostic",
  invite: "Send us your current website and tell us what it needs to achieve.",
  body: "We will review what can be personalised, which information can be connected to your systems and whether the existing website can be improved. If a rebuild is unnecessary, we will recommend the more suitable option.",
  primary: "Book a Web Diagnostic",
};

export { standardFormFields as formFields } from "@/content/forms";
