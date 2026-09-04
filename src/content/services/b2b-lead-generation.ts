// B2B Lead Generation — page content.
// Copy source: "B2B Lead Generation.docx" (client-supplied, 2026-09-03). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// FIGURES. The document gives exactly two numbers, and both are used once, at
// the value written: the opening scenario's "100 form submissions", and "more
// than 15 years of experience". It gives no conversion rates, no lead costs,
// no timeframes, and it explicitly refuses to guarantee lead volume — so
// nothing on this page draws a quantity or a forecast.
//
// THE LEAD STAGES ARE THE PAGE'S SPINE. The document supplies a five-row table
// (stage, what it means, what happens next) and then makes the argument that
// gives the page its point: "Leads delivered, qualified leads and meetings
// booked are three different outputs." That sentence is why the stages are
// drawn as a pipeline rather than listed as a table.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "B2B Lead Generation Services in Dubai | ENH Marketing",
  description:
    "Reach the right companies and decision-makers through LinkedIn, Google, email and focused landing pages, with qualification and sales handoff agreed before launch.",
};

export const hero = {
  lines: ["B2B Lead Generation", "Services", "in Dubai"] as [string, string, string],
  sub: "Reach the right companies and decision-makers through LinkedIn, Google, email and focused landing pages, with qualification and sales handoff agreed before launch.",
  primary: "Plan My Lead Campaign",
  secondary: "Talk to a B2B Expert",
};

/** The opening argument. The document tells it as a count that looked good and
 *  a pipeline that did not, so the scenario is the section rather than a
 *  paragraph introducing one. */
export const narrative = {
  heading: ["Build a Pipeline", "Your Sales Team Can Work"] as [string, string],
  scene:
    "A campaign generates 100 form submissions. Sales discovers that half are job seekers, several are outside the target market, and most of the remaining contacts have no buying authority. The lead count looked strong. The pipeline did not.",
  sceneEmphasis: "100 form submissions",
  agency:
    "ENH Marketing provides B2B lead generation services in Dubai for companies that need more relevant sales conversations. We help define the audience, choose the channels, create the campaign, and route each lead into the right follow-up process.",
  /** The four actions the sentence above already names, marked inside it
   *  rather than pulled out and listed a second time. */
  highlight: [
    "define the audience",
    "choose the channels",
    "create the campaign",
    "route each lead",
  ],
  closing:
    "Qualification is agreed before launch. That gives marketing and sales one definition of the lead being generated.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

/** What the service is, and the ten things a scope should state. The document
 *  writes the list as a specification, which is what it is drawn as. */
export const scope = {
  title: "What Does a B2B",
  strokeTitle: "Lead Generation Agency Actually Do?",
  lead: "A B2B lead generation agency helps a business find, reach and convert people involved in purchasing decisions at other companies. The work starts with the offer and the target account. We need to know which companies are valuable, which roles influence the purchase and what would give them a reason to respond.",
  itemsLead: "A clear B2B lead generation scope should state:",
  items: [
    "Target industries, company sizes and locations",
    "Relevant job titles and decision-making roles",
    "The offer being promoted",
    "Channels included in the campaign",
    "Landing pages, forms and campaign content required",
    "The written definition of a qualified lead",
    "How leads will reach the sales team",
    "Who handles follow-up and appointment setting",
    "Media spend and management fees",
    "Reporting and sales-feedback requirements",
  ],
  /** The boundary around the service, in the document's own three sentences:
   *  what the work does, what stays with the sales team, and the one thing that
   *  depends on the agreement. Split at the document's own full stops so each
   *  can be placed on its own side of the line. */
  limitInside: "Lead generation can create the opportunity and support nurturing.",
  limitOutside: "Closing the deal remains part of the sales process.",
  limitConditional:
    "Appointment setting can be included when it appears in the agreed scope.",
};

export type Channel = { no: string; title: string; body: string; glyph: GlyphVariant };

/** Seven channels. The glyphs are a reading of each channel's own sentence, not
 *  a claim the document makes. */
export const channels = {
  title: "The Channels We Use",
  strokeTitle: "for B2B Lead Generation",
  items: [
    {
      no: "01",
      title: "LinkedIn B2B Lead Generation",
      glyph: "audience",
      body: "LinkedIn can reach people by job title, seniority, industry, company size and named account lists. We use those filters to place relevant content and offers in front of people involved in the buying decision. LinkedIn B2B lead generation campaigns may use landing pages, Lead Gen Forms, sponsored content or direct outreach. The setup depends on the audience and the value of the offer.",
    },
    {
      no: "02",
      title: "Google Ads",
      glyph: "intent",
      body: "Google Ads can reach prospects who are already searching for the service, product or solution your business provides. We build campaigns around commercial search intent and direct the traffic to a relevant landing page. Search can introduce leads into the B2B sales pipeline while demand is active.",
    },
    {
      no: "03",
      title: "Email Lead Generation and Nurturing",
      glyph: "sequence",
      body: "Some B2B prospects need more information before they are ready to speak with sales. Email campaigns can introduce the business, share useful material and follow up according to the contact's response. The sequence, timing and next action are planned before the journey begins.",
    },
    {
      no: "04",
      title: "Landing Pages and Lead Forms",
      glyph: "form",
      body: "The landing page should continue the same message that earned the click. A general homepage can make the visitor search for information the campaign should have already provided. We create focused pages and forms around the offer, audience and qualification requirements. Form length is based on the information sales genuinely needs.",
    },
    {
      no: "05",
      title: "B2B Content and Offers",
      glyph: "creative",
      body: "A decision-maker needs a useful reason to exchange their details or agree to a conversation. Campaign content may include a consultation, audit, guide, demonstration, case study, webinar or industry-specific offer. The format depends on the buyer's problem and their stage in the decision process.",
    },
    {
      no: "06",
      title: "Marketing Automation",
      glyph: "workflow",
      body: "Marketing automation helps route, acknowledge and nurture leads without relying on someone to manually handle every step. We can connect forms, email journeys and CRM stages so new enquiries reach the right team. Automation also records how prospects respond before and after the handoff.",
    },
    {
      no: "07",
      title: "Social Media Advertising",
      glyph: "fanout",
      body: "Paid social can reach B2B audiences who are not currently searching but match the customer profile. We plan social media advertising around the campaign objective, content and audience. Paid retargeting can also bring previous website visitors back to the offer.",
    },
  ] as Channel[],
};

export type Stage = { name: string; means: string; next: string };

/** The document's own five-row table, and the sentence that gives it its point.
 *  Reconstruction: the table verbatim, then `verdict`. */
export const stages = {
  title: "Lead Stages",
  strokeTitle: "Should Be Clear",
  columns: ["Lead stage", "What it means", "What happens next"] as [string, string, string],
  rows: [
    {
      name: "New Enquiry",
      means: "A contact has submitted a form or responded to the campaign",
      next: "Details are checked and routed",
    },
    {
      name: "Marketing-Qualified Lead",
      means: "The contact matches the agreed basic audience and campaign criteria",
      next: "Marketing continues nurturing or sends the lead to sales",
    },
    {
      name: "Sales-Qualified Lead",
      means: "Sales has accepted the contact as relevant and worth pursuing",
      next: "Direct sales follow-up begins",
    },
    {
      name: "Meeting Booked",
      means: "A date and time have been confirmed with the prospect",
      next: "The sales team prepares for the meeting",
    },
    {
      name: "Opportunity",
      means: "The prospect has entered the company's active sales pipeline",
      next: "Value, stage and outcome are managed in the CRM",
    },
  ] as Stage[],
  verdict:
    "A proposal should identify which stage is being measured. Leads delivered, qualified leads and meetings booked are three different outputs.",
  /** The three the verdict names, marked inside it rather than listed again. */
  outputs: ["Leads delivered", "qualified leads", "meetings booked"],
};

/** How the channels are chosen. The document argues this as a mix that changes
 *  with the audience, so the three roles are kept as the three sentences it
 *  writes rather than turned into a table. */
export const formula = {
  title: "Our Proven Formula",
  strokeTitle: "for B2B Lead Generation in Dubai",
  lead: "Our lead generation system combines LinkedIn, Google, email, automation and online buying behaviour according to the campaign.",
  roles: [
    { channel: "Google", role: "can capture existing demand." },
    { channel: "LinkedIn", role: "can reach selected roles and companies." },
    { channel: "Email", role: "helps educate and nurture prospects who need more time." },
  ],
  depends:
    "The mix depends on the audience. A high-value service with a narrow list of target accounts may need LinkedIn and direct outreach, while a business with stronger active search demand may begin with Google Ads.",
};

export type Step = { no: string; title: string; body: string; glyph: GlyphVariant };

/** Eight steps, written "N. Title" then a sentence. */
export const process = {
  title: "How the Work",
  strokeTitle: "Moves",
  items: [
    {
      no: "01",
      title: "Understand the Offer",
      glyph: "diagnose",
      body: "We review what you sell, the average deal value, the sales cycle and the reasons clients choose you.",
    },
    {
      no: "02",
      title: "Define the Target Account",
      glyph: "entity",
      body: "The team agrees the industries, locations, company sizes and job roles worth targeting.",
    },
    {
      no: "03",
      title: "Set the Qualification Rules",
      glyph: "triage",
      body: "Marketing and sales write down what makes a lead relevant. The required lead stage and disqualification reasons are confirmed here.",
    },
    {
      no: "04",
      title: "Choose the Channels",
      glyph: "structure",
      body: "LinkedIn, Google, email and paid social are selected according to the audience, search demand and budget.",
    },
    {
      no: "05",
      title: "Build the Campaign",
      glyph: "tool",
      body: "We prepare the messaging, advertisements, landing pages, forms, content and email journeys included in the scope.",
    },
    {
      no: "06",
      title: "Connect the Handoff",
      glyph: "reseat",
      body: "Lead notifications, CRM stages, acknowledgement emails and sales responsibilities are tested before launch.",
    },
    {
      no: "07",
      title: "Launch and Monitor",
      glyph: "watch",
      body: "Campaigns go live after approval. We monitor budgets, audiences, search terms, creative and lead quality.",
    },
    {
      no: "08",
      title: "Report and Improve",
      glyph: "improve",
      body: "Monthly reporting covers campaign performance and lead movement. Sales feedback helps us refine targeting, content and budget allocation.",
    },
  ] as Step[],
};

/** Twelve sectors, and the document's own caveat that the campaign changes
 *  with the sector — carried with its two worked examples. */
export const sectors = {
  title: "B2B Sectors",
  strokeTitle: "We Generate Leads For",
  lead: "We support B2B lead generation campaigns for UAE businesses across areas such as:",
  items: [
    "Professional and corporate services",
    "Technology, software and IT services",
    "Logistics and supply chain",
    "Construction and engineering",
    "Manufacturing and industrial businesses",
    "Commercial real estate",
    "Financial and accounting services",
    "Corporate training and education",
    "Healthcare suppliers and service providers",
    "Hospitality suppliers",
    "Facilities management and maintenance",
    "Business setup and consultancy",
  ],
  /** The claim, then the two cases the document works through to prove it.
   *  Split at the document's own full stop and at its own comma; the two cases
   *  read back as the one sentence it wrote. Only these two sectors are worked
   *  through anywhere in the document, and none of the other ten is given a
   *  campaign here. */
  caveatLead: "The campaign changes with the sector.",
  cases: [
    "A software company may need demonstrations and account-level targeting,",
    "while an industrial supplier may gain more from high-intent Google searches and detailed product information.",
  ] as [string, string],
};

export type Promise = { no: string; title: string; body: string; glyph: GlyphVariant };

/** Eight commitments, each written as a short title and one sentence. */
export const promises = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  items: [
    {
      no: "01",
      title: "A written target audience",
      glyph: "audience",
      body: "Industries, company sizes, locations and job roles are agreed before the campaign begins.",
    },
    {
      no: "02",
      title: "A qualified-lead definition",
      glyph: "structure",
      body: "Marketing and sales know which contacts should count in the report.",
    },
    {
      no: "03",
      title: "Channels chosen around the buyer",
      glyph: "fanout",
      body: "LinkedIn, Google, email and paid social are added when they have a clear job.",
    },
    {
      no: "04",
      title: "Campaign content with one consistent offer",
      glyph: "creative",
      body: "Advertisements, landing pages and email follow-up are planned together.",
    },
    {
      no: "05",
      title: "A defined sales handoff",
      glyph: "workflow",
      body: "Your team knows where the leads will arrive and who needs to respond.",
    },
    {
      no: "06",
      title: "Lead quality reviewed with sales",
      glyph: "triage",
      body: "Rejection reasons and opportunity feedback help improve the next campaign decision.",
    },
    {
      no: "07",
      title: "Monthly reporting",
      glyph: "reporting",
      body: "Performance, lead quality and the movement towards meetings or opportunities are tracked.",
    },
    {
      no: "08",
      title: "Flexible campaign scope",
      glyph: "sequence",
      body: "The work can scale according to the audience, channels, budget and sales capacity.",
    },
  ] as Promise[],
  /** The one figure the document commits to, in its own sentence. */
  experience:
    "ENH Marketing has more than 15 years of experience supporting campaigns in Dubai. As a B2B lead generation agency in the UAE and a wider digital marketing agency, we can connect the campaign with paid media, content, landing pages and automation.",
  goal: "Our goal as a lead generation company in Dubai is to help create a pipeline your sales team has the capacity and information to follow up properly.",
};

export const faqs: Faq[] = [
  {
    q: "What is B2B lead generation?",
    a: "B2B lead generation is the process of identifying and reaching people who may purchase a product or service on behalf of a company. It can use paid advertising, search, LinkedIn, email, content, landing pages and direct outreach to create relevant sales opportunities.",
  },
  {
    q: "What is included in B2B lead generation services?",
    a: "The service can include audience research, target-account definition, campaign strategy, advertising, landing pages, forms, email nurturing, automation, lead routing and reporting. Your proposal will state the channels, deliverables, media budget, qualification rules and sales-handoff responsibilities.",
  },
  {
    q: "What makes a B2B lead qualified?",
    a: "A qualified lead meets the criteria agreed before the campaign. These may include industry, company size, location, job role, purchasing responsibility and a relevant business requirement. Qualification can happen through the form, automation or direct follow-up.",
  },
  {
    q: "Which channel works best for B2B lead generation in Dubai?",
    a: "The best channel depends on how the buyer looks for the service. Google Ads can capture existing search demand. LinkedIn can target selected companies and professional roles. Email can nurture prospects who require more time or information.",
  },
  {
    q: "Do LinkedIn lead generation campaigns work for every B2B company?",
    a: "LinkedIn is useful when the target audience can be identified through professional information such as job role, seniority, company or industry. The economics still need to work. A high-value sale can carry a higher lead cost more easily than a low-margin service.",
  },
  {
    q: "Can Google Ads generate B2B leads?",
    a: "Yes. Google Ads can reach decision-makers while they are actively searching for a service or solution. The campaign needs commercially relevant keywords, suitable exclusions and a landing page that matches the search.",
  },
  {
    q: "Do you provide email lead generation?",
    a: "Yes. Email outreach and nurturing can be included in the campaign. The scope will identify the audience, contact-data source, email sequence, automation and follow-up process. Mass outreach without a defined audience usually creates poor response and weak lead quality.",
  },
  {
    q: "Do you book sales meetings?",
    a: "Meeting booking can be included when it is stated in the proposal. Some campaigns deliver qualified leads to the client's sales team. Others include further follow-up until a meeting is confirmed. The expected output needs to be agreed before launch.",
  },
  {
    q: "Do you guarantee a number of B2B leads?",
    a: "No fixed lead volume or sales outcome can be guaranteed. Results depend on the audience size, offer, competition, budget, campaign content, sales response and qualification criteria. Forecasts can guide planning, but they should not be presented as guaranteed performance.",
  },
  {
    q: "How quickly can a B2B campaign generate leads?",
    a: "Google or LinkedIn campaigns may begin producing responses after launch, but a useful performance pattern takes longer to establish. Narrow audiences, long sales cycles and email nurturing can require more time. Lead quality should be reviewed alongside volume before scaling the campaign.",
  },
  {
    q: "How do you improve B2B lead quality?",
    a: "We begin with clearer targeting and a written qualification definition. Search terms, audiences, campaign content and forms are then adjusted using lead and sales feedback. A longer form can sometimes filter weak enquiries, but it may also reduce the total response. The right balance depends on what the sales team needs.",
  },
  {
    q: "How much do B2B lead generation services cost in Dubai?",
    a: "The fee depends on the channels, target audience, campaign content, landing pages, automation, reporting and level of follow-up required. Advertising spend is shown separately and paid to the relevant platforms. You receive a written proposal covering the work, budget and expected lead stage.",
  },
];

export const finalCta = {
  title: "Put Better Opportunities",
  strokeTitle: "Into the Pipeline",
  body: "Tell us what you sell, which companies you want to reach and what your sales team considers a qualified lead.",
  note: "We will recommend a channel mix, campaign offer and handoff process built around your audience and sales capacity. For sales lead generation in Dubai, the first decision should be the type of opportunity your team is ready to pursue.",
  primary: "Request a B2B Lead Plan",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
