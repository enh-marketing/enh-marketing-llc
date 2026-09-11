// Web Hosting Services — page content.
// Copy source: "Web Hosting.docx" (client-supplied, 2026-09-11). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// WHAT THIS DOCUMENT IS ABOUT, AND IT IS NOT "FAST SERVERS".
// Read the whole thing and two claims run through every section.
//
// 1. THE ENVIRONMENT IS FITTED BEFORE IT IS SOLD. "A basic hosting package may
//    be enough for a small website. As the site grows, adds integrations or
//    begins supporting marketing campaigns, it needs an environment suited to
//    the way the business actually uses it." The first capability entry says
//    the same thing again: "rather than placing every project onto the same
//    standard package". The wider-work section makes it concrete with four
//    website types that each stress a different part of the setup.
//
// 2. THE FAULT IS NOT ALWAYS IN THE LAYER YOU ARE BUYING. The monitoring entry
//    names four places a problem can live: "the hosting environment, website,
//    domain configuration or an external service". FAQ 7 names them again. The
//    suitability section refuses the easy sale on the strength of it ("If the
//    current hosting is suitable and the problem sits elsewhere, we will
//    identify that rather than treating migration as the automatic answer"),
//    and so does the closing block.
//
// So the page's subject is THE GROUND A WEBSITE STANDS ON: what the layer is,
// what it carries, where it stops, and which layer a problem is actually in.
// Every drawing on the page is a section through that ground.
//
// NO FIGURE OF ANY KIND APPEARS IN THIS DOCUMENT. No uptime percentage, no
// response time, no storage allowance, no retention period, no price. Every one
// of them is deferred to the proposal ("The proposal will state the backup
// retention period, storage arrangement and restoration process"). Nothing on
// this page may draw a number, a gauge reading, a score or a status percentage,
// and no ResultStats band is carried here: the four figures the maintenance
// page runs were team-supplied for that page, and inventing four for this one
// would be four fabrications.

import type { Faq } from "@/content/services/performance-marketing";

export const meta = {
  title: "Web Hosting Services UAE | Web Hosting Company Dubai",
  description:
    "Get reliable web hosting services in the UAE with fast, secure hosting solutions from a trusted web hosting company in Dubai for your business website.",
};

export const hero = {
  // "Web Hosting Services in Dubai", set over the three lines the hero takes.
  // No word is added or dropped.
  lines: ["Web Hosting", "Services", "in Dubai"] as [string, string, string],
  sub: "Managed website hosting with regional servers, SSL, daily backups, monitoring and technical support from a team that understands your website.",
  primary: "Request a Hosting Review",
  secondary: "Talk to Our Web Team",
};

/** The opening argument, in the document's four paragraphs.
 *
 *  THE SECOND PARAGRAPH IS THE DRAWABLE ONE. It names a fixed thing (a basic
 *  package), three changes that happen to the site, and the answer. The three
 *  changes are marked inside the sentence they arrive in rather than lifted out
 *  into chips, which would print them twice. */
export const opening = {
  heading: ["Keep Your Website Running", "Without Managing the Server"] as [string, string],

  /** The three things hosting affects, in one sentence, and the three phrases
   *  inside it. Verbatim, contiguous substrings, in the order they occur. */
  affects:
    "Hosting affects how quickly your website loads, how reliably it stays available and how well it handles visitors when traffic increases.",
  affectsMark: [
    "how quickly your website loads",
    "how reliably it stays available",
    "how well it handles visitors when traffic increases",
  ],

  /** The fixed starting point. */
  basic: "A basic hosting package may be enough for a small website.",

  /** The sentence the drawing is driven from. Joining `basic + " " + change`
   *  reproduces the document's paragraph word for word. */
  change:
    "As the site grows, adds integrations or begins supporting marketing campaigns, it needs an environment suited to the way the business actually uses it.",
  /** The three changes, verbatim inside `change` and in its own order. They are
   *  cumulative, which is what the sentence's "as" says. */
  changeMark: ["the site grows", "adds integrations", "begins supporting marketing campaigns"],
  /** The answer, verbatim inside `change`. */
  fittedMark: "an environment suited to the way the business actually uses it",

  review:
    "ENH Marketing provides managed website hosting for Dubai and UAE businesses. We review your website, platform, expected traffic and technical requirements before recommending a hosting setup.",
  reviewMark: "before recommending a hosting setup",

  beyond:
    "As a digital agency in Dubai, we can also look beyond the server. Our team understands how hosting performance affects websites, ecommerce stores, landing pages, lead forms, search visibility and paid campaigns.",
  beyondMark: "look beyond the server",
};

/** One covered area of the managed hosting scope.
 *
 *  `body` is the document's paragraph, whole. `plate` names which drawing the
 *  card carries, and `span` is the column width it takes on the twelve-column
 *  run: presentation, not copy. Seven entries, seven drawings, seven widths, so
 *  the section is never a three-by-three grid of the same tile. */
export type Cover = {
  no: string;
  title: string;
  body: string;
  plate: "setup" | "migration" | "ssl" | "backup" | "monitor" | "resources" | "support";
  /** Columns out of twelve, at lg and up. */
  span: 4 | 5 | 7 | 8;
};

export const covers = {
  title: "What Our Managed",
  strokeTitle: "Website Hosting Covers",
  items: [
    {
      no: "01",
      title: "Hosting Environment and Setup",
      body: "We configure a hosting environment around your website rather than placing every project onto the same standard package. The recommended setup considers the platform, storage requirements, expected traffic, integrations and whether the website supports enquiries, ecommerce or active campaigns.",
      plate: "setup",
      span: 7,
    },
    {
      no: "02",
      title: "Website Migration",
      body: "We can move an existing website from its current provider to the agreed hosting environment. Before migration, we review the website files, database, domain settings and other technical dependencies. The move is planned to reduce disruption and includes checks after the website is transferred.",
      plate: "migration",
      span: 5,
    },
    {
      no: "03",
      title: "SSL Certificate Management",
      body: "An SSL certificate encrypts information exchanged between the website and its visitors. It also allows the site to load securely using HTTPS. SSL setup and renewal management are included according to the hosting scope, helping prevent expired certificates and avoidable browser security warnings.",
      plate: "ssl",
      span: 4,
    },
    {
      no: "04",
      title: "Daily Website Backups",
      body: "Regular backups provide a recovery point if website files or data become damaged, deleted or compromised. We maintain daily backups as part of the managed hosting service. The proposal will state the backup retention period, storage arrangement and restoration process for your website.",
      plate: "backup",
      span: 4,
    },
    {
      // The page's spine: the one entry that names all four places a problem
      // can live. It gets a third of the row rather than a card of its own,
      // because the sentence does the work and the drawing only has to hold
      // four bands and a watch.
      no: "05",
      title: "Uptime and Technical Monitoring",
      body: "Monitoring helps identify availability and server-level problems without relying on a customer or employee to notice them first. When an issue is detected, our team investigates whether it comes from the hosting environment, website, domain configuration or an external service and responds according to the agreed support scope.",
      plate: "monitor",
      span: 4,
    },
    {
      no: "06",
      title: "Performance and Resource Management",
      body: "A website needs enough resources for its normal traffic and for predictable increases caused by promotions, campaigns, launches or seasonal demand. We review usage and hosting requirements so the environment can be adjusted when the website outgrows its existing allocation.",
      plate: "resources",
      span: 5,
    },
    {
      no: "07",
      title: "Technical Hosting Support",
      body: "Managed hosting gives your business a technical contact when there is a hosting-related problem. Our support covers the hosting environment and the services listed in your agreement. Website edits, plugin updates, new functionality and development work are handled through a website maintenance or development scope.",
      plate: "support",
      span: 7,
    },
  ] as Cover[],
};

/** The document's table, unchanged: five services and what each covers. Its own
 *  column headers are kept, because a table's headers are copy too.
 *
 *  `plate` names the artefact drawn for each row. Presentation, not copy. */
export type Scope = {
  no: string;
  service: string;
  covers: string;
  plate: "hosting" | "maintenance" | "domain" | "email" | "development";
};

export const scopes = {
  title: "What Hosting Covers",
  strokeTitle: "and What Sits Outside It",
  lede: "Hosting, website maintenance and domain management are connected, but they are not the same service.",
  columns: ["Service", "What it covers"] as [string, string],
  rows: [
    {
      no: "01",
      service: "Web Hosting",
      covers:
        "Server environment, storage, SSL, backups, monitoring and hosting-level support",
      plate: "hosting",
    },
    {
      no: "02",
      service: "Website Maintenance",
      covers:
        "CMS updates, plugin updates, content changes, bug fixes, form checks and website improvements",
      plate: "maintenance",
    },
    {
      no: "03",
      service: "Domain Management",
      covers: "Domain registration, renewal, DNS records and ownership details",
      plate: "domain",
    },
    {
      no: "04",
      service: "Business Email",
      covers: "Mailboxes, email storage, spam filtering and account administration",
      plate: "email",
    },
    {
      no: "05",
      service: "Website Development",
      covers: "New pages, features, integrations, redesigns and structural changes",
      plate: "development",
    },
  ] as Scope[],
  /** The two closing sentences, split at the document's own full stop. Joining
   *  them with a space reproduces the paragraph exactly. The first is what the
   *  section's control does; the second is what it produces. */
  combine: "These services can be combined when required.",
  states:
    "Your proposal will state what is included, who manages each part and which third-party fees are charged separately.",
  statesMark: [
    "what is included",
    "who manages each part",
    "which third-party fees are charged separately",
  ],
  /** The one label the drawing carries, verbatim from `states`. */
  anchor: "Your proposal",
};

/** Four websites, four different demands on the same ground.
 *
 *  THE DOCUMENT DRAWS THIS SECTION ITSELF. One paragraph, four sentences, each
 *  naming a kind of website and the single thing its hosting has to do. Joining
 *  the four `demand` strings with spaces reproduces that paragraph word for
 *  word, which is why they are stored as sentences rather than as a table of
 *  invented attributes. */
export type Demand = {
  no: string;
  demand: string;
  plate: "transactions" | "surge" | "forms" | "media";
};

export const wider = {
  title: "Hosting That Supports",
  strokeTitle: "Your Wider Digital Work",
  lede: "A hosting decision should account for what the website is expected to do.",
  demands: [
    { no: "01", demand: "An ecommerce store needs to process transactions reliably.", plate: "transactions" },
    { no: "02", demand: "A campaign landing page may receive a sudden rise in traffic.", plate: "surge" },
    {
      no: "03",
      demand: "A lead-generation website needs working forms and dependable integrations.",
      plate: "forms",
    },
    {
      no: "04",
      demand: "A content-heavy website must deliver pages and media without unnecessary delays.",
      plate: "media",
    },
  ] as Demand[],

  considerLead:
    "Because ENH Marketing is also a Dubai digital marketing agency, our hosting recommendations can consider:",
  consider: [
    "Website performance and user experience",
    "Search engine crawling and technical SEO",
    "Paid campaign traffic",
    "Ecommerce activity",
    "Lead forms and third-party integrations",
    "Website updates and future development",
    "Analytics and conversion tracking",
    "Seasonal or launch-related traffic",
  ],

  /** The caution that closes the section, split at the document's own full
   *  stop. Joining the two with a space reproduces the paragraph exactly. */
  limit:
    "Good hosting supports these activities, but it does not replace website optimisation, maintenance, security procedures or campaign management.",
  limitMark: [
    "website optimisation",
    "maintenance",
    "security procedures",
    "campaign management",
  ],
  scoped: "Those requirements are scoped separately when needed.",
};

/** Who managed hosting suits, and the case for not moving at all.
 *
 *  THE CLOSING PARAGRAPH IS THE SECTION. Eight bullets are eight situations; the
 *  thing that makes this page's version its own is the sentence after them,
 *  which is a hosting company volunteering that the answer may be to stay where
 *  you are. Its two findings are the drawing's two states. */
export const fit = {
  title: "When Managed",
  strokeTitle: "Hosting Makes Sense",
  lead: "Managed web hosting can be useful for:",
  items: [
    "Businesses without an internal website or server team",
    "Websites that generate enquiries or sales",
    "Ecommerce stores processing customer orders",
    "Companies running regular advertising campaigns",
    "Websites with booking, payment or CRM integrations",
    "Organisations moving away from an unsupported hosting account",
    "Businesses that want one team to manage their website and hosting",
    "Websites that have outgrown a low-cost shared hosting package",
  ],
  review: "Before recommending a move, we review the existing setup.",
  finding:
    "If the current hosting is suitable and the problem sits elsewhere, we will identify that rather than treating migration as the automatic answer.",
  /** The two findings the review can reach, verbatim inside `finding` and in
   *  the order they occur. They are the drawing's two states. */
  findingMark: ["the current hosting is suitable", "the problem sits elsewhere"],
};

/** What the proposal states, and the three questions the record answers.
 *
 *  THE SORT IS THE DOCUMENT'S OWN AND IT IS PRINTED. The closing sentence names
 *  three things the record gives you: "where the website is hosted, what is
 *  being managed and who to contact when something needs attention". Each of
 *  the twelve clauses answers exactly one of them, so the three clauses are the
 *  column heads and the sentence they came from is set above the columns. That
 *  is what makes the arrangement checkable rather than a taste decision. */
export type Clause = { no: string; text: string; answers: "where" | "what" | "who" };

export const proposal = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  lead: "Choosing a web hosting company in the UAE should give you more than server space.",
  leadMark: "more than server space",
  statesLead: "Your hosting proposal will state:",
  items: [
    { no: "01", text: "The recommended hosting environment", answers: "where" },
    { no: "02", text: "Included storage and resources", answers: "where" },
    { no: "03", text: "The websites covered by the plan", answers: "where" },
    { no: "04", text: "SSL certificate arrangements", answers: "what" },
    { no: "05", text: "Backup frequency and retention", answers: "what" },
    { no: "06", text: "Monitoring and technical support", answers: "what" },
    { no: "07", text: "The migration process, if required", answers: "what" },
    { no: "08", text: "Hosting renewal terms", answers: "what" },
    { no: "09", text: "Any separate domain, email or software fees", answers: "what" },
    { no: "10", text: "Access and ownership arrangements", answers: "who" },
    { no: "11", text: "What is covered by hosting support", answers: "who" },
    { no: "12", text: "What requires a maintenance or development scope", answers: "who" },
  ] as Clause[],
  record:
    "This gives your business a clear record of where the website is hosted, what is being managed and who to contact when something needs attention.",
  /** The three question clauses, verbatim inside `record`, in the order the
   *  columns stand. They are the column heads and the section's control. */
  recordMark: [
    "where the website is hosted",
    "what is being managed",
    "who to contact when something needs attention",
  ],
};

export const faqs: Faq[] = [
  {
    q: "What is managed web hosting?",
    a: "Managed web hosting combines server space with technical oversight. The provider handles the hosting setup, SSL, backups, monitoring and agreed server-level support. This reduces the amount of hosting administration your internal team needs to manage.",
  },
  {
    q: "Do you provide website hosting in Dubai?",
    a: "Yes. ENH Marketing provides managed website hosting for businesses in Dubai and across the UAE. We assess the website platform, traffic, storage, integrations and support requirements before recommending the hosting environment.",
  },
  {
    q: "Can you move our existing website to your hosting?",
    a: "Yes. We can migrate an existing website from another hosting provider. The migration scope will state what is being transferred, which access details are required and whether domain, email or other third-party services need separate coordination.",
  },
  {
    q: "Will our website go offline during migration?",
    a: "We plan migrations to reduce disruption, but the exact process depends on the current host, website platform, DNS settings and access available. We review these requirements before confirming the migration plan and expected changeover window.",
  },
  {
    q: "Is an SSL certificate included?",
    a: "SSL setup and management can be included in the hosting service. The proposal will confirm the type of certificate provided, its renewal arrangement and whether the website has any specialist certificate requirements.",
  },
  {
    q: "How often is the website backed up?",
    a: "Managed hosting includes daily backups. The retention period and available recovery points depend on the agreed plan. These details will be included in the proposal so you know what can be restored and how the process works.",
  },
  {
    q: "What happens if the website goes down?",
    a: "Monitoring helps us identify website availability and hosting-level problems. Our team investigates the cause and responds within the support terms stated in your agreement. Resolution time depends on the issue and whether it involves the server, website, domain or an external provider.",
  },
  {
    q: "Is website maintenance included with hosting?",
    a: "Hosting support and website maintenance are separate unless both are included in your agreement. Hosting covers the server environment, backups, SSL and monitoring. Maintenance can cover CMS and plugin updates, bug fixes, content changes, form testing and ongoing improvements.",
  },
  {
    q: "Are domain registration and business email included?",
    a: "Domains and business email are separate services unless they are specifically listed in the proposal. We can help coordinate domain settings and confirm whether email should remain with its current provider or be managed under a separate service.",
  },
  {
    q: "How much do web hosting services in Dubai cost?",
    a: "The cost depends on the website platform, traffic, storage, resources, backup requirements, migration work and level of support required. We review the existing website before providing a proposal with the hosting fee, included services and any separate third-party costs clearly shown.",
  },
];

/** The mid-page door.
 *
 *  THE DOCUMENT SUPPLIES ONE CLOSING BLOCK AND THIS PAGE HAS TWO DOORS, so the
 *  block is split rather than reprinted, exactly as the maintenance page splits
 *  its own: this band takes the document's closing heading and the sentence
 *  that asks the reader for something, and the form band at the foot takes the
 *  sentence saying what we do with it. Neither sentence appears twice, and no
 *  sentence is invented to fill either.
 *
 *  If the team wants bespoke copy here, as they supplied for the maintenance
 *  page on 2026-09-08, it replaces these three fields and nothing else. */
export const growthCta = {
  heading: ["Give Your Website", "a Better Hosting Setup"] as [string, string],
  support:
    "Send us your website address, current hosting provider and any performance, availability or support problems you are experiencing.",
  button: "Request a Hosting Proposal",
};

/** The form band at the foot.
 *
 *  Its heading is the document's own second banner action, which is the only
 *  phrase in the document that addresses the reader without repeating the
 *  heading already spent on the band above. The band's own button is
 *  "Request a Hosting Proposal", so the heading and the button do not read
 *  identically, which is the fault the maintenance page's band was corrected
 *  for. */
export const finalCta = {
  title: "Talk to Our",
  strokeTitle: "Web Team",
  body: "We will review the setup and recommend a practical hosting scope.",
  note: "If the issue comes from the website itself rather than the server, we will make that distinction clear.",
  primary: "Request a Hosting Proposal",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
