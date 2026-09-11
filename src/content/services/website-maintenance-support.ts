// Website Maintenance & Support — page content.
// Copy source: "Website Maintenance & Support.docx" (client-supplied, 2026-09-07). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// WHAT THIS DOCUMENT IS ABOUT, AND IT IS NOT "WE FIX WEBSITES".
// Nine of the ten capability blocks name where the work stops as well as what
// it covers: "assessed separately before work begins", "scoped separately",
// "recommended separately when required", "may require their support team",
// "treated as development work". The comparison table exists to separate four
// neighbouring responsibilities. The proposal section exists so the reader gets
// "a clear support arrangement rather than an open-ended promise". Even the
// suitability section volunteers the case for buying less.
//
// So the page's subject is the EDGE OF THE SCOPE, and every drawing on it is a
// boundary: what is inside the plan, what sits beyond it, and who holds which
// part. That is why the capability entries carry `limit` as a field of their
// own rather than folded into the body — the limit is not small print here, it
// is half of what is being sold.
//
// NO FIGURE OF ANY KIND APPEARS IN THIS DOCUMENT. No response times, no uptime,
// no hours, no prices, no percentages. Every one of those is explicitly
// deferred to the proposal ("The proposal will state the response arrangements
// that apply to your plan"). Nothing on this page may draw a number, a gauge
// reading, a score or a status percentage.

import type { Faq } from "@/content/services/performance-marketing";

export const meta = {
  title: "Website Maintenance Services in Dubai | ENH Marketing",
  description:
    "Keep your website updated, secure and working properly with ongoing technical support from ENH Marketing.",
};

export const hero = {
  // "Website Maintenance Services in Dubai", set over the three lines the hero
  // takes. No word is added or dropped.
  lines: ["Website", "Maintenance", "Services in Dubai"] as [string, string, string],
  sub: "Keep your website updated, secure and working properly with ongoing technical support from ENH Marketing.",
  primary: "Request a Maintenance Review",
  secondary: "Talk to Our Web Team",
};

/** The opening argument. Three paragraphs in the document, and the middle one
 *  contains the page's most drawable sentence: three faults that "may go
 *  unnoticed". Those three are marked inside the sentence they arrive in rather
 *  than lifted out into chips, which would print them twice. */
export const opening = {
  heading: ["Keep Your Website", "Working After Launch"] as [string, string],

  /** The document's first paragraph, split at its last full stop: the two
   *  sentences saying what is handled, then the sentence saying how it is
   *  bought. Joining `handles + " " + arrangements` reproduces the paragraph
   *  word for word. They are separate because they carry different emphasis —
   *  a list of work, and a fork in how the work is arranged. */
  handles:
    "ENH Marketing provides website maintenance and support for UAE businesses. Our team handles technical problems, CMS and plugin updates, content changes, performance checks, security monitoring and planned website improvements.",
  arrangements:
    "Support can be arranged as an ongoing maintenance plan or a defined one-off scope.",
  /** The six things handled. Every entry is a verbatim, contiguous substring of
   *  `handles`. */
  handlesMark: [
    "technical problems",
    "CMS and plugin updates",
    "content changes",
    "performance checks",
    "security monitoring",
    "planned website improvements",
  ],
  /** The two ways the work can be bought, verbatim inside `arrangements`. */
  arrangementsMark: ["an ongoing maintenance plan", "a defined one-off scope"],

  /** The statement the section is headed by. */
  unfinished:
    "Launching a website does not mean the work is finished. Software needs updating, forms need checking and new content must be added without breaking existing pages.",

  /** The three silent faults, and what they eventually cost. Split at the
   *  document's own full stop; joining the two with a space reproduces the
   *  paragraph exactly. */
  buildUp: "Small issues also build up.",
  unnoticed:
    "A slow page, expired integration or broken enquiry form may go unnoticed until it affects customers or interrupts a campaign.",
  /** Verbatim substrings of `unnoticed`, in the order they occur. The drawing
   *  has three states and these are its legend. */
  faultsMark: ["A slow page", "expired integration", "broken enquiry form"],
  consequenceMark: "until it affects customers or interrupts a campaign",

  team:
    "Our website support services in Dubai are handled by the same team that builds and markets websites for clients across the UAE. This gives us a wider view of how technical issues can affect search visibility, advertising, customer experience and lead generation.",
  teamMark: ["search visibility", "advertising", "customer experience", "lead generation"],
};

/** One covered area of the maintenance scope.
 *
 *  `why` is the document's opening sentence for the entry — the failure the
 *  work exists to prevent. `body` is what is actually done. `limit` is where it
 *  stops, and `note` is a remaining sentence that is neither. Every field is
 *  verbatim and every entry's fields concatenate back to its paragraphs. */
export type Cover = {
  no: string;
  title: string;
  why?: string;
  body: string;
  /** Where the scope ends. Present on six of the nine, and cited per entry. */
  limit?: string;
  note?: string;
  /** Which part of the drawn site this entry acts on. Presentation, not copy. */
  zone:
    | "platform"
    | "repair"
    | "content"
    | "form"
    | "performance"
    | "security"
    | "backup"
    | "integrations"
    | "beyond";
};

export const covers = {
  title: "What Our Website Maintenance",
  strokeTitle: "Services Cover",
  items: [
    {
      no: "01",
      title: "CMS and Plugin Updates",
      why: "Content management systems, plugins and website components need regular updates to remain compatible and address known technical issues.",
      body: "We review available updates, check their likely impact and test the website after implementation.",
      limit:
        "Major version changes or updates requiring redevelopment are assessed separately before work begins.",
      zone: "platform",
    },
    {
      no: "02",
      title: "Bug Fixes and Technical Support",
      why: "Broken layouts, error messages, missing images and features that suddenly stop working can make a website difficult to use.",
      body: "Our technical support team investigates the source of the problem, completes the agreed fix and checks the affected pages or functions before closing the request.",
      zone: "repair",
    },
    {
      no: "03",
      title: "Content and Page Updates",
      why: "Your website needs to reflect current services, products, teams, locations and business information.",
      body: "We can update text, images, documents, banners, contact details and existing page sections.",
      limit:
        "New pages or structural changes are scoped separately when additional design or development is required.",
      zone: "content",
    },
    {
      no: "04",
      title: "Forms and Enquiry Checks",
      why: "A contact form can appear normal while enquiries fail to reach the correct person or system.",
      body: "We check form submissions, confirmation messages, notification settings and agreed integrations.",
      note: "This helps identify problems that may otherwise remain hidden until someone reports a missing lead.",
      zone: "form",
    },
    {
      no: "05",
      title: "Website Performance Checks",
      why: "Large images, outdated components and technical conflicts can gradually affect page performance.",
      body: "We review common performance issues and carry out the improvements included in the maintenance scope.",
      limit:
        "Server changes, major code optimisation or hosting upgrades are recommended separately when required.",
      zone: "performance",
    },
    {
      no: "06",
      title: "Security Monitoring",
      body: "Website maintenance can reduce avoidable risks by keeping supported software current and identifying suspicious changes or technical warnings.",
      limit: "Security monitoring does not make any website completely risk-free.",
      note: "If a problem is detected, we investigate the affected area and explain the recovery or specialist work required.",
      zone: "security",
    },
    {
      no: "07",
      title: "Backup and Recovery Coordination",
      why: "Backups provide a recovery point when website files or data are damaged, deleted or compromised.",
      body: "We confirm where backups are stored, how often they are created and what restoration options are available.",
      limit:
        "Backup frequency and retention depend on the hosting and maintenance arrangements in place.",
      zone: "backup",
    },
    {
      no: "08",
      title: "Integration Support",
      why: "Websites often connect to payment gateways, booking systems, analytics platforms, CRM tools, maps and other external services.",
      body: "We can investigate issues involving existing integrations and coordinate the technical work within our access and scope.",
      limit: "Problems originating with an external provider may require their support team.",
      zone: "integrations",
    },
    {
      no: "09",
      title: "New Features and Improvements",
      why: "Maintenance data often reveals opportunities to improve the website rather than simply repair it.",
      body: "We can scope new forms, landing pages, conversion features, integrations and other functionality.",
      limit:
        "Larger additions are treated as development work so the cost and delivery requirements remain clear.",
      zone: "beyond",
    },
  ] as Cover[],
};

/** The six stages, with the document's own "Stage n" prefix kept as a field so
 *  it is never re-typed into the title.
 *
 *  THE SHAPE IS IN THE COPY. Stages 1 to 3 happen once — the review, the scope,
 *  the overdue work cleared "before routine maintenance begins". Stages 4 to 6
 *  are what then repeats: requests arrive, changes are tested and published,
 *  work is reported and anything outside the scope is recommended separately.
 *  The drawing says that with an approach and a ring; no label is added to say
 *  it, because the document does not use those words. */
export type Stage = { no: string; stage: string; title: string; body: string };

export const process = {
  title: "How Our Website Maintenance",
  strokeTitle: "Process Works",
  items: [
    {
      no: "01",
      stage: "Stage 1",
      title: "Website and Access Review",
      body: "We review the website platform, hosting, active components, existing problems and access available. This establishes what can be supported and whether any critical issues need attention before routine maintenance begins.",
    },
    {
      no: "02",
      stage: "Stage 2",
      title: "Define the Maintenance Scope",
      body: "We agree which websites, services and types of requests are covered. The scope also confirms the included support time, request process, reporting and work that requires separate approval.",
    },
    {
      no: "03",
      stage: "Stage 3",
      title: "Complete Priority Updates",
      body: "Critical errors, overdue updates and immediate technical concerns are addressed according to the agreed order. The website is checked after each significant change to identify compatibility or display problems.",
    },
    {
      no: "04",
      stage: "Stage 4",
      title: "Handle Ongoing Requests",
      body: "Your team can submit approved content changes, technical issues and routine update requests through the agreed contact process. Each request is reviewed, scheduled and assigned to the appropriate team member.",
    },
    {
      no: "05",
      stage: "Stage 5",
      title: "Test and Publish",
      body: "Changes are tested before or immediately after publishing, depending on the website and work involved. We check the affected pages, devices, forms or functions rather than assuming a completed update is working correctly.",
    },
    {
      no: "06",
      stage: "Stage 6",
      title: "Report and Recommend",
      body: "Completed work and outstanding issues are recorded according to the reporting scope. When the website requires hosting changes, new development or specialist support, we explain the issue and provide a separate recommendation.",
    },
  ] as Stage[],
};

/** The document's table, unchanged: five services and what each covers. Its own
 *  column headers are kept, because a table's headers are copy too.
 *
 *  `zone` says which part of the one drawn setup each row is responsible for.
 *  Presentation, not copy. */
export type Responsibility = {
  no: string;
  service: string;
  covers: string;
  zone: "site" | "support" | "server" | "mail" | "build";
};

export const boundaries = {
  title: "Website Maintenance, Web Hosting",
  strokeTitle: "and Email Support",
  lede: "These services affect the same digital setup, but they cover different responsibilities.",
  columns: ["Service", "What it covers"] as [string, string],
  rows: [
    {
      no: "01",
      service: "Website Maintenance",
      covers:
        "CMS updates, plugin updates, content changes, bug fixes, testing and website improvements",
      zone: "site",
    },
    {
      no: "02",
      service: "Technical Support",
      covers: "Investigation and resolution of website-level problems within the agreed support scope",
      zone: "support",
    },
    {
      no: "03",
      service: "Web Hosting",
      covers: "Server environment, storage, SSL, backups, monitoring and hosting-level support",
      zone: "server",
    },
    {
      no: "04",
      service: "Email Support",
      covers: "Mailbox setup, delivery issues, spam filtering and email account administration",
      zone: "mail",
    },
    {
      no: "05",
      service: "Website Development",
      covers: "New pages, features, integrations, redesigns and structural changes",
      zone: "build",
    },
  ] as Responsibility[],
};

/** What the proposal states. Thirteen clauses, and the sentence that explains
 *  why they are printed at all: the alternative is "an open-ended promise to
 *  handle anything connected to the website". */
export const proposal = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  lead: "Choosing a website maintenance company in the UAE should give you a clear support arrangement rather than an open-ended promise to handle anything connected to the website.",
  leadMark: "an open-ended promise to handle anything connected to the website",
  statesLead: "Your proposal will state:",
  items: [
    "The website or websites covered",
    "Included maintenance tasks",
    "Support request process",
    "Included hours or request allowance",
    "Response arrangements",
    "CMS and plugin update responsibilities",
    "Testing and approval process",
    "Backup and restoration responsibilities",
    "Reporting frequency",
    "Hosting and email responsibilities",
    "Third-party software costs",
    "Work requiring a separate quotation",
    "Website access and ownership arrangements",
  ],
  wider:
    "As a full-service digital marketing agency in Dubai, ENH can also connect website maintenance with SEO, content, paid campaigns and conversion requirements when those services are included.",
  /** The four disciplines named in `wider`, matched to the pages that hold
   *  them. Rendered through Crosslink, so an unbuilt destination keeps the word
   *  and loses only the link. */
  widerLinks: [
    { label: "SEO", href: "/seo-company-in-dubai" },
    { label: "content", href: "/content-creation-in-dubai" },
    { label: "paid campaigns", href: "/performance-marketing-agency-dubai" },
    { label: "conversion", href: "/landing-page-development-services" },
  ],
  useful:
    "This is particularly useful when a campaign needs a new landing page, a tracking issue affects reporting or a website problem interrupts lead generation.",
  usefulMark: [
    "a campaign needs a new landing page",
    "a tracking issue affects reporting",
    "a website problem interrupts lead generation",
  ],
};

/** Who an ongoing plan suits, and the case against one. The nine are the
 *  document's own bullets and the two closing sentences are its own too. */
export const fit = {
  title: "When Ongoing Website",
  strokeTitle: "Maintenance Makes Sense",
  lead: "An ongoing maintenance plan can be useful for:",
  items: [
    "Business websites that generate enquiries",
    "Ecommerce websites processing orders",
    "Websites running paid advertising campaigns",
    "Companies without an internal website team",
    "Websites using several plugins or integrations",
    "Businesses that update services or content regularly",
    "Multilingual websites",
    "Websites with booking, payment or CRM connections",
    "Organisations that need a documented support process",
  ],
  caveat:
    "A smaller website with few changes may only need scheduled reviews or one-off support.",
  caveatMark: "scheduled reviews or one-off support",
  recommend:
    "We recommend the arrangement that matches the actual workload rather than adding unnecessary monthly work.",
  recommendMark: "matches the actual workload",
};

/** The document's own paragraph under "Our Work", which most pages do not
 *  supply. It goes above the carousel rather than being dropped. */
export const work = {
  lede: "We are proud of the digital marketing and website projects we deliver. Explore our approved client success stories and examples of work completed across the UAE.",
};

export const faqs: Faq[] = [
  {
    q: "What is included in website maintenance?",
    a: "Website maintenance can include CMS and plugin updates, technical fixes, content changes, form checks, performance reviews, security monitoring and routine testing. Your proposal will list the websites, tasks, support allowance and reporting included in the plan.",
  },
  {
    q: "Do you offer website support services in Dubai?",
    a: "Yes. ENH provides website support services Dubai businesses can use for ongoing maintenance or specific technical issues. We support companies across the UAE, with the exact service depending on the website platform, condition, access and work required.",
  },
  {
    q: "Can you maintain a website built by another company?",
    a: "Yes, subject to an initial technical review. We first check the website platform, code, plugins, hosting and access available. If the website contains unsupported software or serious structural problems, these will be explained before support begins.",
  },
  {
    q: "Can we request one-off website support?",
    a: "Yes. One-off support can be provided for a defined problem, update or group of changes. The website is reviewed before the work is confirmed so the likely cause, access requirements and cost can be assessed.",
  },
  {
    q: "How quickly do you respond to website problems?",
    a: "Response time depends on the maintenance agreement, support hours and priority of the issue. Critical website problems are treated differently from routine content requests. The proposal will state the response arrangements that apply to your plan.",
  },
  {
    q: "Does website maintenance include new pages?",
    a: "Updates to existing pages may be included within the agreed maintenance allowance. A new page that requires design, copywriting, functionality or structural changes may be quoted separately as development work.",
  },
  {
    q: "Does maintenance protect the website from hacking?",
    a: "Regular updates and monitoring can reduce avoidable security risks, but no provider can guarantee that a website will never be attacked or compromised. The maintenance scope will explain the preventive checks, backups and recovery support included.",
  },
  {
    q: "Are web hosting and email support included?",
    a: "Hosting and email support are separate unless they are specifically listed in the maintenance agreement. The proposal will clarify responsibility for the website server, backups, SSL, domain settings, email accounts and third-party providers.",
  },
  {
    q: "How much do website maintenance services in Dubai cost?",
    a: "The cost depends on the website platform, number of websites, update frequency, support allowance, integrations and technical condition. We review the website before recommending a monthly plan or one-off maintenance scope.",
  },
  {
    q: "What access do you need?",
    a: "Access may be required to the CMS, hosting account, domain settings, analytics, relevant integrations and existing backup system. We confirm the required accounts before work begins and recommend individual user access instead of shared credentials where the platform allows it.",
  },
];

/** Mid-page CTA band, above the work section.
 *
 *  THE DOCUMENT SUPPLIES ONE CLOSING BLOCK AND THIS PAGE HAS TWO DOORS, so the
 *  block is split rather than reprinted: the band here takes the instruction to
 *  the reader, and the form band at the foot takes what we do with it. Neither
 *  sentence appears twice, and no sentence is invented to fill either.
 *
 *  TEAM COPY, 2026-09-08: replaced by copy the team supplied directly, so this
 *  band and the client document now differ. It previously reused the
 *  document's own primary CTA label as the heading, which meant the heading and
 *  the button read identically; they no longer do. */
export const growthCta = {
  heading: ["Is your website", "overdue for a check-up?"] as [string, string],
  support:
    "Prevent Downtime, Security Risks & Slow Load Times With Ongoing Support",
  button: "Get a Website Maintenance Plan",
};

export const finalCta = {
  title: "Give Your Website",
  strokeTitle: "the Support It Needs",
  // The second sentence of the document's closing block; the first is carried
  // by `growthCta.support` above.
  body: "We will review the current setup and recommend a practical scope for ongoing maintenance, one-off technical support or planned website improvements.",
  primary: "Request a Maintenance Review",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";

/** The four proof figures, in the band the Performance Marketing page carries.
 *
 *  TEAM-SUPPLIED, 2026-09-08, from "ENH updates.docx": the team asked for this
 *  page to run the same section with these numbers. They are NOT in this
 *  page's own source document, and nothing on the site can check them, so
 *  they are recorded here as given and dated.
 *
 *  Figures and labels are the document's own strings. The one edit is unit
 *  casing, which is typography rather than copy: the document is set in caps
 *  throughout, so "2 HRS" is written here as the band already sets its units.
 *  The unit carries the brand accent, the value never does, which is why the
 *  two are separate fields. */
export const resultStats = [
  { figure: "99.9", unit: "%", label: "UPTIME MAINTAINED" },
  { figure: "2", unit: " Hrs", label: "AVERAGE RESPONSE TIME" },
  { figure: "120", unit: "+", label: "SITES UNDER MANAGEMENT" },
  { figure: "300", unit: "+", label: "UPDATES DEPLOYED MONTHLY" },
];
