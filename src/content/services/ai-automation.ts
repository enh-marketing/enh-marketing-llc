// AI & Automation — page content.
// Copy source: "AI & Automation.docx" (client-supplied, 2026-09-01). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
//
// LAUNCH GATE, UNRESOLVED. The document carries a section the client has left
// as an instruction rather than content:
//
//   "Builds We Have Delivered
//    [Two or three named builds with the process automated, the hours removed
//    and the outcome. GATE: if this section cannot be filled with real,
//    permissioned examples, this page does not launch.]"
//
// No builds are exported and no section is rendered for it. Case studies
// cannot be invented, and the document itself makes this a launch blocker
// rather than a nice-to-have. Supply two or three named, permissioned builds
// and the section goes in. Until then this page should not go live.
//
// FIGURES. The document's own: 15 years. Nothing else is a number and nothing
// is estimated. The document is explicit that there is no standard price and
// no standard timeline, so neither is implied anywhere on the page.
//
// PROBABLE TYPO IN THE SOURCE, NOT CORRECTED. The banner reads "custom tools
// for AI businesses", where the rest of the document and every other page on
// this site says UAE businesses. It is carried verbatim because silently
// rewriting a client's banner is worse than surfacing it. Confirm which was
// meant.
//
// HUMAN-IN-THE-LOOP. The `handover` flag on each service is a reading of the
// document, not an addition to it. Each one cites the sentence it comes from,
// and services whose description says nothing about a person are flagged
// false rather than assumed either way.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "AI Automation Agency in Dubai | ENH Marketing",
  description:
    "ENH Marketing builds AI agents, automated workflows and custom tools for UAE businesses. Every project starts with a paid diagnostic that identifies what to automate and what should stay manual.",
};

export const hero = {
  lines: ["AI Automation", "Agency", "in Dubai"] as [string, string, string],
  sub: "ENH Marketing builds AI agents, automated workflows, and custom tools for AI businesses. Every project starts with a paid diagnostic to identify which processes can be automated, which systems need to be connected, and what the project will cost.",
  primary: "Book an Automation Diagnostic",
  secondary: "Talk to the Team",
};

/** "What We Do". The document's own heading, and its own three sentences in
 *  its own order: the claim leads, the six kinds of work follow it, and the
 *  note about designing around an existing process closes.
 *
 *  Nothing here is written for the page. An earlier draft of this file carried
 *  an invented headline and an invented opening question, which is exactly what
 *  the copy rule on this project forbids. */
export const narrative = {
  heading: ["What", "We Do"] as [string, string],
  question:
    "We automate repetitive business processes and connect systems that currently require manual work.",
  questionEmphasis: "currently require manual work",
  body: "This can include processing documents, moving data between platforms, sorting enquiries, managing approvals, monitoring business events and preparing reports.",
  highlight: ["documents", "platforms", "enquiries", "approvals", "events", "reports"],
  outro: [
    "Every solution is designed around the client's existing process. We also provide ongoing monitoring and technical support after launch.",
  ],
  primary: "Book an Automation Diagnostic",
  secondary: "Talk to the Team",
};

export type Service = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** Whether the document's own description of this service puts a person in
   *  the loop. Cited per item; never inferred from the service's name. */
  handover: boolean;
  /** The sentence the flag is read from, so the claim can be checked. */
  handoverSource?: string;
};

export const services = {
  title: "Our AI",
  strokeTitle: "Automation Services",
  items: [
    {
      no: "01",
      title: "AI Agents",
      body: "AI agents can complete a defined process or a group of connected tasks. An agent can receive information, check it against approved rules, retrieve data, update systems and pass the work to a person when approval or judgement is required.",
      glyph: "agent",
      handover: true,
      handoverSource: "pass the work to a person when approval or judgement is required",
    },
    {
      no: "02",
      title: "Workflow Automation",
      body: "Workflow automation connects the systems your business already uses. Information can move between a CRM, inbox, spreadsheet, accounting platform, database or project tool without repeated manual entry.",
      glyph: "workflow",
      handover: false,
    },
    {
      no: "03",
      title: "Document Processing",
      body: "AI can read information from invoices, forms, delivery notes, contracts, statements and other business documents. The extracted information can be checked, organised and transferred into the required system. Human review can be added where accuracy or approval is important.",
      glyph: "extract",
      handover: true,
      handoverSource: "Human review can be added where accuracy or approval is important",
    },
    {
      no: "04",
      title: "Enquiry and Request Handling",
      body: "Incoming enquiries, requests and support tickets can be sorted according to their content. The automation can record the details, assign the request to the correct person, create a task, and send an approved response or notification.",
      glyph: "triage",
      handover: true,
      handoverSource: "assign the request to the correct person",
    },
    {
      no: "05",
      title: "Monitoring and Automated Actions",
      body: "Automations can monitor selected events and take an agreed action when something changes. This may include overdue payments, low stock, missed deadlines, inactive leads, booking changes, or a project status that has not moved.",
      glyph: "watch",
      handover: false,
    },
    {
      no: "06",
      title: "Reporting and Data Reconciliation",
      body: "Information can be collected from several systems and placed into one report. The automation can also compare figures, identify missing information, and flag differences for the team to review.",
      glyph: "reconcile",
      handover: true,
      handoverSource: "flag differences for the team to review",
    },
    {
      no: "07",
      title: "Custom AI Tools",
      body: "We develop custom tools when existing software cannot support the required process. The diagnostic includes a review of available software before custom development is recommended. This prevents the business from paying to build something that can already be purchased and configured.",
      glyph: "tool",
      handover: false,
    },
  ] as Service[],
};

/** The diagnostic. The document lists ten things it covers as one flat run,
 *  but the ten fall into three groups that do different work: five observe the
 *  process as it stands, two draw the line through it, three price the result.
 *  The middle pair is the page's whole argument, so it is set apart rather
 *  than buried at positions six and seven of a list. */
export const diagnostic = {
  title: "Every Project Starts With",
  strokeTitle: "an Automation Diagnostic",
  lead: "The automation diagnostic is a paid review of your current process.",
  coversLead: "It covers:",
  observe: [
    "The steps your team currently follows",
    "The people and systems involved",
    "The time spent on each stage",
    "Repeated work and manual data entry",
    "Rules, exceptions and approval requirements",
  ],
  /** The two the document puts next to each other, in its order. */
  verdict: ["Processes that are suitable for automation", "Processes that should remain manual"] as [
    string,
    string,
  ],
  proposal: [
    "Recommended automation scope",
    "Estimated development timeline and cost",
    "Expected time or cost savings",
  ],
  terms:
    "You receive the diagnostic document whether you continue with ENH Marketing or use it internally. The initial discussion is free. The detailed diagnostic is paid because it includes process mapping, technical review and a written recommendation.",
};

export type Stage = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** Who the stage's own sentence makes the actor. Read from the subject of
   *  the body, never inferred from the stage's name. The client acts at
   *  exactly two points, and one of them is the launch gate, which is the same
   *  human/machine question the rest of the page turns on. */
  actor: "ENH" | "You";
};

/** Six stages. The document's numbering is kept. Stage five is where the
 *  automation goes live, which is why the managed service exists at all, so
 *  the page marks that threshold rather than running all six as one flat set. */
export const process = {
  title: "How the",
  strokeTitle: "Automation Project Works",
  items: [
    {
      no: "1",
      title: "Initial Discussion",
      body: "We discuss the process you want to improve, the people involved and the systems currently being used.",
      glyph: "conversation",
      // Subject of this stage's own sentence: "We discuss the process you want to improve".
      actor: "ENH",
    },
    {
      no: "2",
      title: "Process Diagnostic",
      body: "We map the process, review the available data and identify where automation is suitable.",
      glyph: "diagnose",
      // Subject of this stage's own sentence: "We map the process".
      actor: "ENH",
    },
    {
      no: "3",
      title: "Scope and Recommendation",
      body: "You receive a written recommendation showing what will be automated, which systems will be connected, where human approval is required and what the project will cost.",
      glyph: "recommend",
      // Subject of this stage's own sentence: "You receive a written recommendation".
      actor: "You",
    },
    {
      no: "4",
      title: "Development and Testing",
      body: "The automation is built and tested using agreed scenarios. Common exceptions and possible failures are also tested before launch.",
      glyph: "testcase",
      // Subject of this stage's own sentence: "The automation is built and tested".
      actor: "ENH",
    },
    {
      no: "5",
      title: "Controlled Launch",
      body: "The automation is introduced in stages where necessary. Your team reviews the output before the process is fully activated.",
      glyph: "golive",
      // Subject of this stage's own sentence: "Your team reviews the output before the process is fully activated".
      actor: "You",
    },
    {
      no: "6",
      title: "Monitoring and Improvement",
      body: "After launch, we monitor the automation and make agreed adjustments as the process or connected systems change.",
      glyph: "improve",
      // Subject of this stage's own sentence: "we monitor the automation".
      actor: "ENH",
    },
  ] as Stage[],
  /** Index of the stage the automation goes live at, zero-based. Drives where
   *  the page draws the launch line, taken from stage five's own title and
   *  body rather than chosen. */
  launchAt: 4,
};

/** The managed service, which the document frames as a scope boundary: seven
 *  things covered, and a named set of things that are not. */
export const managed = {
  title: "Managed Monitoring",
  strokeTitle: "and Support",
  lead: "Every automation project includes a monthly managed service.",
  coversLead: "The service covers:",
  /** A glyph per duty, from the site's shared icon set rather than a second
   *  visual language. Chosen for what the duty is, which is why some repeat
   *  what the process section uses: "monitoring" is the same idea in both
   *  places and should not have two different icons. */
  glyphs: [
    "heartbeat", // Monitoring the automation and its system connections
    "alert",     // Reviewing errors and failed actions
    "repair",    // Fixing technical issues within the agreed scope
    "structure", // Updating rules when the approved process changes
    "reseat",    // Adjusting integrations when connected systems are updated
    "support",   // Providing technical support for the automation
    "ledger",    // Maintaining records of important changes
  ] as GlyphVariant[],
  covers: [
    "Monitoring the automation and its system connections",
    "Reviewing errors and failed actions",
    "Fixing technical issues within the agreed scope",
    "Updating rules when the approved process changes",
    "Adjusting integrations when connected systems are updated",
    "Providing technical support for the automation",
    "Maintaining records of important changes",
  ],
  fee: "The managed-service fee is stated clearly in the proposal before development begins.",
  outOfScope:
    "Larger changes, new workflows and additional system connections are quoted separately when they fall outside the original scope.",
};

/** Where the fifteen years actually buys the client something. */
export const operations = {
  title: "Automation for Marketing",
  strokeTitle: "and Business Operations",
  claim:
    "ENH Marketing has worked with UAE businesses for 15 years across marketing, lead generation, CRM systems, reporting and sales handovers.",
  /** The functions named in the claim above, and the ones the document adds as
   *  reviewable. Split because the document draws that distinction itself:
   *  the first set is where the experience is, the second is where it can be
   *  applied. */
  proven: ["marketing", "lead generation", "CRM systems", "reporting", "sales handovers"],
  reviewable: ["customer service", "administration", "finance"],
  reviewableTail: "and other business functions",
  body: "This experience helps us identify automation opportunities across marketing and revenue operations. We can also review suitable processes within customer service, administration, finance and other business functions.",
  /** The three things every automation is measured against. */
  criteria: ["time", "cost", "errors"],
  criteriaLead: "The value of each automation is assessed against the",
  criteriaTail: "within the current process.",
  cta: "Book an Automation Diagnostic",
};

export const faqs: Faq[] = [
  {
    q: "What can AI automate in my business?",
    a: "AI can support processes that follow repeatable steps and use clear rules. This may include data entry, document processing, enquiry sorting, approvals, reminders, reporting and system updates. Tasks requiring judgement or personal responsibility remain with your team.",
  },
  {
    q: "What is the difference between an AI agent and workflow automation?",
    a: "Workflow automation follows a fixed sequence of steps between systems. An AI agent can also interpret information, choose between approved actions and complete several connected tasks. The right approach depends on the process and the amount of variation involved.",
  },
  {
    q: "How is this different from the automation already included in our software?",
    a: "Built-in automation usually handles tasks within one platform. Our work can connect several platforms and manage the steps between them. If your existing software already includes the feature you need, we will recommend configuring that feature before proposing a custom build.",
  },
  {
    q: "How long does an automation project take?",
    a: "The timeline depends on the number of steps, systems, rules and exceptions involved. A simple workflow connecting two systems may take a few weeks. A larger agent or custom tool will take longer. The diagnostic provides a timeline before development begins.",
  },
  {
    q: "How much does AI automation cost in Dubai?",
    a: "There is no standard price because every process is different. The cost depends on the development work, system connections, data requirements, testing and ongoing monitoring. Each item is shown separately in the proposal.",
  },
  {
    q: "Why is the automation diagnostic paid?",
    a: "The diagnostic includes process mapping, technical review and a written recommendation. You receive the document whether you continue with ENH Marketing or use it internally. The initial discussion remains free.",
  },
  {
    q: "Why does every build include a managed service?",
    a: "Automations depend on business rules, data and third-party systems that can change after launch. The managed service monitors these connections and covers technical support within the agreed scope. It also allows the automation to be updated when the approved process changes.",
  },
  {
    q: "What happens if the automation stops working?",
    a: "Monitoring is used to identify failed connections, errors and incomplete actions. We investigate the issue and fix problems covered by the managed service. Changes caused by a new business requirement or an additional system may need a separate scope.",
  },
  {
    q: "What happens when our internal process changes?",
    a: "You should tell us when the process, rules or connected systems change. We will review the change and update the automation where it falls within the managed-service scope. Larger changes will be explained and quoted before work begins.",
  },
  {
    q: "Will automation replace our staff?",
    a: "The service focuses on repetitive administrative work and clearly defined tasks. Your team remains responsible for work that requires judgement, relationships, approval or accountability. Human review can also be included at any stage of the automation.",
  },
  {
    q: "Which systems can you connect?",
    a: "We can work with CRMs, accounting software, email platforms, spreadsheets, databases, project tools, booking systems and other business platforms. The available connections depend on the system's API, permissions and data-access options. This is checked during the diagnostic.",
  },
  {
    q: "Do we own the automation?",
    a: "Our standard position is that the custom build and its documentation belong to you after the project is completed and paid for. Third-party platforms, software and licences remain subject to their own terms. Ownership details are confirmed in the project agreement.",
  },
  {
    q: "How do you handle our business data?",
    a: "We document which data the automation will access, where it will be processed and who will be able to access it before development begins. Access is limited to what the automation requires. Security, storage and data-handling requirements are included in the project scope, with additional review for regulated or sensitive information.",
  },
];

/** The mid-page CTA band.
 *
 *  Unlike the other service documents on this project, this one carries no
 *  "Before Case Study Session" block with a heading written for a band. What it
 *  does carry is a CTA placed twice: once at line 65, straight after the
 *  marketing-and-operations section, and once at line 98 to close. Both read
 *  "Book an Automation Diagnostic".
 *
 *  So the band sits where the document puts the first one, and it carries the
 *  document's own wording. It reads the same as the closing section because the
 *  client wrote it the same way in both places; nothing here is a second
 *  heading invented to make the two look different. Supply a distinct line for
 *  the band and it goes straight in. */
export const growthCta = {
  heading: ["Book an", "Automation Diagnostic"] as [string, string],
  support:
    "Tell us which process takes the most time, which systems are involved and where manual work is still required.",
  button: "Book an Automation Diagnostic",
};

export const finalCta = {
  title: "Book an",
  strokeTitle: "Automation Diagnostic",
  body: "Tell us which process takes the most time, which systems are involved and where manual work is still required.",
  note: "We will review the process, estimate its current time and cost, and explain which parts are suitable for automation. You will receive the diagnostic document whether you continue with the build or use it internally.",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
