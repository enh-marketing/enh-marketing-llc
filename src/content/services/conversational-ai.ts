// Conversational AI — page content.
// Copy source: "Conversational AI.docx" (client-supplied). VERBATIM.
//
// DEPARTURES FROM THE SOURCE:
//
//   1. The banner is one heading and one paragraph, both set unchanged. The
//      heading is split across three display lines for typesetting only.
//   2. Each of the six services has two paragraphs. PinnedExplorer sets a body
//      and a note, so the first paragraph is the body and the second the note.
//      No word is moved between them.
//
// NO "BUILDS WE HAVE DELIVERED". The document's own instruction is a gate:
// "[Add two or three named builds showing the communication channel,
// conversations handled, connected systems and measured outcome. GATE: if real,
// permissioned examples are unavailable, this section should not be published.]"
// Nothing is rendered for it and nothing is invented. Supply approved builds
// and the section goes in above the FAQs.
//
// NO NUMBERS. The document gives no accuracy rate, no volume, no deflection
// figure and no timeline beyond "a few weeks" for one narrow case, which is
// hedged. FAQ 12 goes further: "No generative AI system should be presented as
// incapable of producing an incorrect response." So no drawing on this page
// counts conversations, scores a confidence or charts a success rate.
//
// FORM. The standard site-wide set applies.

import type { Faq } from "@/content/services/performance-marketing";
import type { PinnedItem } from "@/components/service/PinnedExplorer";

export const meta = {
  title: "Conversational AI Services in Dubai | ENH Marketing",
  // The banner's first sentence, verbatim.
  description:
    "ENH Marketing builds AI chatbots, voice agents and customer service systems for UAE businesses. Every project starts with a paid diagnostic.",
};

export const hero = {
  lines: ["Conversational AI", "Services", "in Dubai"] as [string, string, string],
  sub: "ENH Marketing builds AI chatbots, voice agents and customer service systems for UAE businesses. Every project starts with a paid diagnostic to define which conversations the agent should handle, what information it can access and when a person needs to take over.",
  primary: "Book a Conversational AI Diagnostic",
  secondary: "Talk to the Team",
  /** The two parties the hero thread draws. The document names the boundary
   *  between them as the thing the diagnostic exists to define. */
  parties: ["Agent", "Your team"] as [string, string],
};

/** "What We Do", on the site's own Narrative. */
export const narrative = {
  heading: ["Agents That Know", "Where to Stop"] as [string, string],
  scene:
    "We develop conversational AI systems that communicate with customers through websites, phone calls, and messaging platforms. These systems can answer routine questions, collect customer information, qualify enquiries, book appointments and direct requests to the correct team.",
  sceneEmphasis: "direct requests to the correct team",
  body: "Each agent is built around approved business information and clearly defined responsibilities. Where required, it can connect to a CRM, calendar, customer service platform or another business system to retrieve information and complete agreed actions.",
  bodyEmphasis: ["approved business information", "clearly defined responsibilities"],
  outro: [
    "We also provide ongoing monitoring and technical support after launch. This allows us to review conversations, update the agent’s knowledge, and fix issues caused by changes to connected systems.",
  ],
};

/** The six services.
 *
 *  Each carries the labels its own screen is built from. Every one of them is a
 *  verbatim clause of that service's own two paragraphs, lifted out and set as
 *  interface text: the chips a chatbot offers, the routine enquiries a service
 *  agent takes, the sources a knowledge base is built from. Nothing is written
 *  for the screen and no conversation is scripted, because the document scripts
 *  none. If a label is not in the paragraph above it, it does not belong here. */
export type Screen = {
  /** Which screen to draw. */
  kind: "chat" | "voice" | "console" | "knowledge" | "booking" | "messaging";
  /** What the screen's own controls are labelled with. Verbatim, in order. */
  does: string[];
  /** The second group, where the service's paragraph names one: what is handed
   *  to a person, what is checked, what the rules cover. */
  aside?: { label: string; items: string[] };
};

export const services = {
  title: "Our Conversational",
  strokeTitle: "AI Services",
  items: [
    {
      no: "01",
      title: "AI Chatbot Development",
      body: "We develop AI chatbots for websites, customer portals and other digital platforms. They understand questions written in different ways, use approved business information and guide customers towards the right answer or next action.",
      note: "The chatbot can answer service questions, collect customer details, qualify enquiries, check available information and create a lead or support request. Its knowledge, system access, response limits and human handover rules are agreed before development begins.",
      glyph: "conversation",
    },
    {
      no: "02",
      title: "AI Voice Agents",
      body: "We develop AI voice agents for businesses that receive regular calls and repeatable customer enquiries. They use spoken conversation to answer questions, collect caller details, book appointments and direct calls to the correct person or department.",
      note: "The voice agent can connect to a CRM, calendar or support platform when suitable access is available. Its script, tone, permitted actions, escalation points and handling of unclear responses are agreed and tested before launch.",
      glyph: "answer",
    },
    {
      no: "03",
      title: "AI Customer Service Agents",
      body: "We develop AI customer service agents for chat, messaging and other supported service channels. They identify what the customer needs, retrieve an approved answer and collect any information required to resolve or route the request.",
      note: "The agent can handle routine product, delivery, account, cancellation, and support enquiries while creating tickets or updating connected systems where required. Complaints, exceptions, sensitive matters and requests needing judgement are transferred to the customer service team.",
      glyph: "audience",
    },
    {
      no: "04",
      title: "Knowledge Base for AI Agents",
      body: "We build structured knowledge bases that give AI agents access to approved information about the business. This may include website content, service details, product catalogues, price lists, policies, procedures and existing customer service responses.",
      note: "The information is reviewed for gaps, conflicts, and outdated material before it is added. Each source receives an owner and update process, while the agent is instructed to ask for clarification or escalate when a reliable answer is unavailable.",
      glyph: "catalogue",
    },
    {
      no: "05",
      title: "Appointment Booking Agents",
      body: "We develop AI appointment booking agents that guide customers from their initial enquiry to a confirmed time slot. They can identify the required service, collect booking information, check availability, and connect with an approved calendar or appointment platform.",
      note: "The agent can also support confirmations, rescheduling, and cancellations according to the business\u2019s rules. Service duration, staff availability, locations, qualification questions, and requests requiring human approval are defined before the booking process is automated.",
      glyph: "tracking",
    },
    {
      no: "06",
      title: "Messaging App Automation",
      body: "We develop messaging app automation for approved customer communication channels, including WhatsApp Business where the required access is available. The agent can respond to questions, collect customer details, qualify enquiries, and provide approved updates.",
      note: "It can also support booking requests, reminders, confirmations, and human handovers through the selected channel. Available features, message templates, account permissions, provider charges and platform restrictions are reviewed before development begins and included clearly in the project scope.",
      glyph: "fanout",
    },
  ] as PinnedItem[],
  /** One screen per service, in items order. */
  screens: [
    {
      kind: "chat",
      does: [
        "Answer service questions",
        "Collect customer details",
        "Qualify enquiries",
        "Check available information",
        "Create a lead or support request",
      ],
      aside: {
        label: "Agreed before development begins",
        items: ["Knowledge", "System access", "Response limits", "Human handover rules"],
      },
    },
    {
      kind: "voice",
      does: [
        "Answer questions",
        "Collect caller details",
        "Book appointments",
        "Direct calls to the correct person or department",
      ],
      aside: {
        label: "Agreed and tested before launch",
        items: ["Script", "Tone", "Permitted actions", "Escalation points"],
      },
    },
    {
      kind: "console",
      does: ["Product", "Delivery", "Account", "Cancellation", "Support"],
      aside: {
        label: "Transferred to the customer service team",
        items: ["Complaints", "Exceptions", "Sensitive matters", "Requests needing judgement"],
      },
    },
    {
      kind: "knowledge",
      does: [
        "Website content",
        "Service details",
        "Product catalogues",
        "Price lists",
        "Policies",
        "Procedures",
        "Existing customer service responses",
      ],
      aside: { label: "Reviewed before it is added", items: ["Gaps", "Conflicts", "Outdated material"] },
    },
    {
      kind: "booking",
      does: [
        "Identify the required service",
        "Collect booking information",
        "Check availability",
      ],
      aside: {
        label: "According to the business\u2019s rules",
        items: ["Confirmations", "Rescheduling", "Cancellations"],
      },
    },
    {
      kind: "messaging",
      does: [
        "Respond to questions",
        "Collect customer details",
        "Qualify enquiries",
        "Provide approved updates",
      ],
      aside: {
        label: "Reviewed before development begins",
        items: ["Message templates", "Account permissions", "Provider charges", "Platform restrictions"],
      },
    },
  ] as Screen[],
};

/** "Every Project Starts With a Conversational AI Diagnostic". Thirteen things
 *  the paid review covers, and the two paragraphs that say why it is paid. */
export const diagnostic = {
  title: "Every Project Starts With a",
  strokeTitle: "Conversational AI Diagnostic",
  lead: "The conversational AI diagnostic is a paid review of your customer communication process.",
  intro: "It covers:",
  items: [
    "The channels customers currently use",
    "The questions and requests received most often",
    "Existing response and handling processes",
    "The people and systems involved",
    "Information used to answer customers",
    "Conversations suitable for AI",
    "Conversations that should remain with people",
    "Required CRM, booking or support integrations",
    "Human handover requirements",
    "Language requirements",
    "Estimated conversation volume",
    "Recommended conversational AI scope",
    "Estimated development timeline and cost",
  ],
  /** What the review produces, and the clause that makes it worth paying for. */
  output:
    "You receive a written diagnostic showing what the agent should handle, which information it needs, and what should happen when a person takes over.",
  yours: "The document is yours whether you continue with ENH Marketing or use it internally.",
  paid: "The initial discussion is free. The detailed diagnostic is paid because it includes conversation mapping, technical review, and a written recommendation.",
};

/** One step of the project.
 *
 *  Every step in this document ends in a list, and the list is the step: what is
 *  discussed, what is reviewed, what the recommendation states, what testing
 *  covers, what early conversations are checked for, what monitoring does. So
 *  each step carries `coversLabel` plus `covers`, and the two of them
 *  reconstruct that sentence word for word. `body` holds only the sentences the
 *  list is not part of, which is why four of the six have none: their whole
 *  content is the list. */
export type Stage = {
  no: string;
  title: string;
  /** Sentences that are not part of the step's list. Often none. */
  body?: string;
  /** The clause that introduces the list, verbatim. */
  coversLabel: string;
  /** The list itself, verbatim, in the document's order. */
  covers: string[];
};

/** "How the Conversational AI Project Works". Six steps, and one fact the run
 *  is drawn around: the agent carries nothing at all until the fifth. */
export const process = {
  title: "How the Conversational",
  strokeTitle: "AI Project Works",
  items: [
    {
      no: "01",
      title: "Initial Discussion",
      coversLabel: "We discuss",
      covers: [
        "the conversations you want to improve",
        "the channels being used",
        "the team members currently responsible for them",
      ],
    },
    {
      no: "02",
      title: "Conversation Diagnostic",
      coversLabel: "We review",
      covers: [
        "common questions",
        "existing chat or call records",
        "available business information",
        "the systems involved in each request",
      ],
    },
    {
      no: "03",
      title: "Scope and Recommendation",
      coversLabel: "You receive a written recommendation explaining",
      covers: [
        "what the agent will handle",
        "which channels and systems will be connected",
        "when human handover is required",
        "what the project will cost",
      ],
    },
    {
      no: "04",
      title: "Development and Testing",
      body: "The agent, knowledge base, and required integrations are developed.",
      coversLabel: "Testing covers",
      covers: [
        "common questions",
        "unclear requests",
        "missing information",
        "unusual wording",
        "conversations that should be escalated",
      ],
    },
    {
      no: "05",
      title: "Controlled Launch",
      body: "The agent is introduced gradually where necessary.",
      coversLabel: "Early conversations are reviewed to identify",
      covers: [
        "missing knowledge",
        "incorrect routing",
        "areas where the response needs adjustment",
      ],
    },
    {
      no: "06",
      title: "Monitoring and Improvement",
      coversLabel: "After launch, we",
      covers: [
        "monitor the agent",
        "review failed or escalated conversations",
        "update its knowledge as the business changes",
      ],
    },
  ] as Stage[],
  /** Zero-based index of the step at which the agent first carries live
   *  conversations. Its own sentence is the reason: "The agent is introduced
   *  gradually where necessary." Everything before it is agreement and testing,
   *  and nothing before it is live. */
  liveAt: 4,
};

/** "Ongoing AI Agent Management". Ten things the monthly service covers, and
 *  the reason the document gives for needing it at all. */
export const managed = {
  title: "Ongoing AI",
  strokeTitle: "Agent Management",
  lead: "Every conversational AI project includes a monthly managed service.",
  intro: "The service covers:",
  items: [
    "Monitoring live conversations and system connections",
    "Reviewing unanswered and incorrectly handled questions",
    "Checking failed actions and incomplete requests",
    "Updating approved business information",
    "Adjusting conversation rules when processes change",
    "Maintaining human handover routes",
    "Fixing technical issues within the agreed scope",
    "Retesting important conversations after platform updates",
    "Providing technical support for the agent",
    "Maintaining records of significant changes",
  ],
  /** Why any of it is needed: the ground moves on both sides. Both sentences are
   *  set whole and face each other, because a sentence broken into chips and a
   *  trailing "can change after launch." reads as a fragment, not as a claim. */
  drift: {
    yours: "Customer questions, services, prices and internal responsibilities can change after launch.",
    theirs: "Messaging platforms, AI models and connected systems can also be updated.",
    why: "Ongoing monitoring helps identify these changes before they affect a large number of customer conversations.",
  },
  closing:
    "The managed-service fee is included in the proposal before development begins. New channels, major functions and additional system integrations are quoted separately when they fall outside the original scope.",
};

/** "Conversational AI for Customer Service and Lead Handling". The section's
 *  argument is that a conversation has a before and an after, and the document
 *  gives three concrete examples of each join. */
export const joins = {
  title: "Conversational AI for Customer",
  strokeTitle: "Service and Lead Handling",
  lead: "ENH Marketing has worked with UAE businesses for 15 years across websites, digital marketing, lead generation, CRM systems and customer communication.",
  claim:
    "This experience helps us understand what should happen before and after an AI conversation.",
  /** The document's own three, each a conversation with something attached to
   *  one side of it. */
  items: [
    { agent: "A chatbot", join: "may need to identify the campaign that generated the enquiry." },
    { agent: "A booking agent", join: "may need to update the CRM." },
    {
      agent: "A customer service agent",
      join: "may need to transfer the conversation with the correct information already attached.",
    },
  ],
  closing:
    "We can develop conversational AI solutions for customer service, sales enquiries, appointment booking, and other business communication processes. The purpose of the diagnostic is to identify which conversations can be handled reliably and where your team should remain involved.",
};

export const faqs: Faq[] = [
  { q: "What is conversational AI?", a: "Conversational AI is software that understands questions expressed through text or speech and provides an appropriate response. It can use approved business information, connect to other systems, and complete defined actions such as creating an enquiry or booking an appointment." },
  { q: "How is conversational AI different from a traditional chatbot?", a: "Traditional chatbots usually follow fixed buttons, keywords or decision trees. Conversational AI can understand more varied questions and use information from earlier parts of the discussion. Both approaches require clear boundaries. The diagnostic determines which type of system is suitable for the conversations your business receives." },
  { q: "Which channels can conversational AI work on?", a: "Conversational AI can be developed for websites, customer portals, phone systems and supported messaging applications. The available features depend on the technical access and permissions provided by each channel." },
  { q: "Can the agent use information from our website and documents?", a: "Yes. Approved website content, FAQs, service information, catalogues, policies and internal documents can be organised into a knowledge base. We review the information before it is added and define what the agent should do when an answer is missing or unclear." },
  { q: "Can conversational AI connect to our existing systems?", a: "It can connect to CRMs, booking systems, customer service platforms, product catalogues and other business software where suitable integration options are available. The diagnostic confirms which information the agent can access and which actions it can complete." },
  { q: "What can an AI voice agent handle?", a: "An AI voice agent can answer routine calls, collect caller details, respond to approved questions, book appointments and transfer calls. The agent’s responsibilities and handover requirements are agreed before development begins." },
  { q: "Can you build a WhatsApp chatbot for our business?", a: "Yes, when the required WhatsApp Business account and API access are available. A WhatsApp chatbot can answer enquiries, qualify leads, handle booking requests, provide approved updates and transfer conversations to your team. Platform rules and provider charges are reviewed during the diagnostic." },
  { q: "Can an AI agent book, reschedule and cancel appointments?", a: "Yes, if those actions are supported by the connected booking or calendar system. The agent follows the approved availability, service and cancellation rules. Requests outside those rules can be passed to a team member." },
  { q: "Can conversational AI communicate in Arabic and English?", a: "Arabic, English and bilingual conversations can be included in the scope. The knowledge base and responses need to be reviewed in each language. Voice projects also require testing for the selected language, terminology and audience." },
  { q: "What happens when the agent cannot answer a question?", a: "The agent can ask for clarification or transfer the conversation to a person. The handover can include the conversation history and information already collected. These escalation rules are agreed during the diagnostic and tested before launch." },
  { q: "Will conversational AI replace our customer service team?", a: "The service is designed to handle routine questions and clearly defined actions. Staff remain responsible for complaints, exceptions, sensitive matters and conversations requiring judgement or accountability. Human review can also be included at selected points in the process." },
  { q: "How accurate are AI customer service agents?", a: "Accuracy depends on the quality of the knowledge base, the clarity of the instructions and the actions the agent is permitted to take. Testing, response restrictions and ongoing monitoring reduce errors. No generative AI system should be presented as incapable of producing an incorrect response." },
  { q: "How long does a conversational AI project take?", a: "The timeline depends on the number of channels, conversations, languages and system integrations involved. A focused appointment booking chatbot may take a few weeks. A larger customer service or voice agent connected to several systems will take longer. The diagnostic provides a timeline before development begins." },
  { q: "How much do conversational AI services cost in Dubai?", a: "There is no standard price because each agent has different knowledge, channel and integration requirements. The proposal separates the diagnostic, development, system connections, testing, managed service and third-party usage charges." },
  { q: "Who owns the conversational AI system?", a: "Our standard position is that the custom build and its documentation belong to you after the project is completed and paid for. Third-party AI models, messaging platforms, telephony systems and licences remain subject to their own terms. Ownership details are confirmed in the project agreement." },
  { q: "How do you handle customer and business data?", a: "We document which information the agent will access, where it will be processed and who can view it before development begins. Access is limited to what the agent requires. Security, storage, retention and data-handling requirements are included in the project scope, with additional review for sensitive or regulated information." },
];

/** The closing block, split between the mid-page band and the foot, so no
 *  sentence prints twice. */
export const finalCta = {
  title: "Book a Conversational",
  strokeTitle: "AI Diagnostic",
  invite:
    "Tell us which channels your customers use, which questions take the most time and what should happen after each conversation.",
  body: "We will review the conversations, systems and knowledge involved. You will receive a written recommendation showing what the AI agent should handle, where human involvement is required and what the project will cost.",
  note: "You will receive the diagnostic document whether you continue with the build or use it internally.",
  primary: "Book a Conversational AI Diagnostic",
};

export { standardFormFields as formFields } from "@/content/forms";
