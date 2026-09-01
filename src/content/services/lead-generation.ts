// Lead Generation — page content.
// Copy source: "Lead Generation.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// TWO READINGS OF THE SOURCE, both recorded where they apply:
//
//  1. "Six Things Most Agencies Leave Out That We Don't" is followed by seven
//     paragraphs. The first is separated by a blank line and the remaining six
//     run consecutively, so the first is taken as the section's opening claim
//     and the six as the six the heading counts. Nothing is dropped either way.
//
//  2. The document numbers its FAQs 1-6 then 9-11. The list renders its own
//     numbering, so the gap closes on its own and no question is lost.
//
// The only figures on this page are the document's own: 90 days, month 2,
// two to three weeks, 60 to 90 days, 3 to 4 hours. None is rounded or restated.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Lead Generation Company in Dubai | ENH Marketing",
  description:
    "Data-driven lead generation services that help UAE businesses attract qualified prospects, increase conversions, and drive consistent growth.",
};

export const hero = {
  lines: ["Lead Generation", "Company", "in Dubai"] as [string, string, string],
  sub: "Looking for a reliable lead generation company in Dubai, UAE? Our data-driven lead generation services help businesses attract qualified prospects, increase conversions, and drive consistent growth.",
  primary: "Boost Your Lead Generation",
  secondary: "Talk to a Lead Generation Expert",
};

/** The opening argument. The document's second line is the whole thesis of the
 *  page, and it is a two-part sentence: the easy half, and the half with the
 *  money in it. The emphasis falls on the second. */
export const narrative = {
  heading: ["Ready to Boost", "Your Lead Generation?"] as [string, string],
  thesis:
    "Getting more enquiries is the easy half. Not wasting the ones you already get is where the money is.",
  thesisEmphasis: "where the money is",
  body: "That is why our approach to lead generation goes beyond simply collecting form fills. As a digital marketing company in Dubai, we run B2B and B2C lead generation for UAE businesses across paid campaigns, email and WhatsApp marketing, local search and landing pages, while also making better use of the channels and audiences you already have.",
  definition:
    "Before anything goes live, we agree on what a qualified lead actually looks like for your business. From there, reporting stays focused on the numbers that matter: what it costs to generate a qualified enquiry, and how many of those enquiries turn into booked meetings.",
};

export type Route = {
  no: string;
  title: string;
  /** The sentences before any list the document gives for this route. */
  lead: string;
  /** A list named inside the route's own copy, lifted out so it can be set as
   *  marks. Every one reconstructs its sentence exactly; see each note. */
  chipsLead?: string;
  chips?: string[];
  chipsTail?: string;
  /** Sentences after the list. */
  tail?: string;
  glyph: GlyphVariant;
  /** Only Landing Page Development is built. The other five are declared in the
   *  sitemap but have no page yet, so they are not linked from here. */
  href?: string;
};

/** Six routes. The document states their structure outright: two are end-to-end
 *  and shaped around who you sell to, four are the channels and assets those
 *  two run on. It also says every other route "eventually lands" on landing
 *  pages, which is why that one is drawn as the point they converge on. */
export const routes = {
  title: "The Six Routes We Run",
  strokeTitle: "for Lead Generation",
  lede: "Six routes to qualified enquiries.",
  structure:
    "The first two are end-to-end and shaped around who you sell to. The other four are the channels and assets they run on, and each works on its own too.",
  endToEnd: [
    {
      no: "01",
      title: "B2B Lead Generation",
      glyph: "structure",
      lead: "You know exactly who you are selling to, often down to the job title. We work across several channels to reach those decision-makers and report on meetings booked with someone who can sign.",
      // Reconstruction: lead + " " + [0] + ", " + [1] + ", " + [2] + ", or "
      // + [3] + ". " + tail
      chips: ["Managing Director", "CFO", "Head of Procurement", "Country Manager"],
      tail: "Downloads and connection requests do not pay salaries.",
    },
    {
      no: "02",
      title: "B2C Lead Generation",
      glyph: "reporting",
      // Reconstruction: chipsLead + " " + [0] + ", " + [1] + ", and " + [2]
      // + ". " + tail
      chipsLead: "B2C lead generation is built around",
      chips: ["volume", "speed", "follow-up"],
      lead: "We shape the offer, create the capture journey and build the response process around it.",
      tail: "In this market, the supplier who replies first often wins the sale, regardless of who spent the most money or made the loudest advertising claim.",
    },
  ] as Route[],
  channels: [
    {
      no: "03",
      title: "Email Marketing",
      glyph: "text",
      lead: "You already own a contact list, and it may be the cheapest source of revenue in the business. We build welcome and nurture sequences, re-engage people who have gone quiet, and create retention flows for existing customers.",
      tail: "Every message is sent using consent that your business can properly evidence.",
    },
    {
      no: "04",
      title: "WhatsApp Marketing",
      glyph: "creative",
      lead: "Nothing in this market gets replies quite like WhatsApp, but few channels are watched more closely. We use the official Business API, work only with opted-in contacts, and document the consent trail.",
      tail: "Handled properly, it creates useful conversations with prospects and customers. Handled badly, it becomes spam carrying your logo.",
    },
    {
      no: "05",
      title: "Local Lead Generation and Google Business Profile",
      glyph: "index",
      lead: "We improve your chances of appearing in the map pack and staying visible there. That includes fixing categories, building review velocity, setting service areas correctly, and keeping the profile active.",
      tail: "It works best when customers search nearby and buy quickly. Paid local campaigns are managed separately through Google Ads.",
    },
    {
      no: "06",
      title: "Landing Page Development",
      glyph: "schema",
      href: "/services/lead-generation/landing-page-development",
      lead: "Every other lead generation route on this list eventually lands here. We build each page around one action, connect it to the campaign, and keep testing until it performs better.",
      tail: "Sending paid traffic to a general homepage is one of the costliest mistakes in lead generation, and one of the easiest to fix.",
    },
  ] as Route[],
  /** The document's own sentence for why the last route is drawn as a terminus. */
  convergence: "Every other lead generation route on this list eventually lands here.",
};

export type Stage = { no: string; title: string; body: string; glyph: GlyphVariant };

/** The programme. Stages 1 and 2 carry the document's own titles. Stages 3 and 4
 *  are written without one, so the title is the stage's opening clause and the
 *  body is the remainder: each pair recomposes the paragraph word for word. */
export const process = {
  title: "How Our Lead Generation",
  strokeTitle: "Process Works",
  span: "A 90-day structure.",
  threshold: "Nothing gets spent until the lead definition is signed.",
  items: [
    {
      no: "01",
      title: "Audit and definition",
      glyph: "structure",
      body: "We map where your enquiries come from now, how fast you answer them, and where they drop out. Then we agree in writing what counts as a qualified lead. You get an audit document and a signed definition.",
    },
    {
      no: "02",
      title: "Foundations",
      glyph: "schema",
      body: "We brief or rebuild the landing pages, cut the forms down, set up routing and notifications, and connect your CRM and tracking. Capture and measurement working before any traffic arrives.",
    },
    {
      no: "03",
      title: "The agreed routes switch on",
      glyph: "fanout",
      // Reconstruction: title + ", " + body
      body: "whether that is paid traffic, email, WhatsApp or local search. First qualified enquiries land.",
    },
    {
      no: "04",
      title: "Month 2 onward, we qualify and refine",
      glyph: "reporting",
      // Reconstruction: title + ". " + body
      body: "We check which sources produce leads your sales team actually calls back, then move budget and effort toward them. Monthly report against qualified leads and meetings booked.",
    },
  ] as Stage[],
  /** The document leaves this phase unnumbered, so it closes the section rather
   *  than joining the run of stages. */
  closingLead: "Then all we need to do is nurture and recover.",
  closing:
    "Sequences for the majority who were not ready first time, and re-engagement of the list you already hold. That last one is almost always the cheapest revenue in the business.",
};

export type Claim = { title: string; body?: string };

/** Six claims, under the document's own count. See the note at the top of this
 *  file for why the opening paragraph is the section's lede and not a seventh. */
export const differentiators = {
  title: "Six Things Most Agencies",
  strokeTitle: "Leave Out That We Don't",
  lede: "Your sales team signs the definition off. It sounds like a formality. It is the reason our reports and your CRM end up agreeing with each other.",
  items: [
    {
      title: "No bought lists, ever.",
      body: "Purchased data converts badly, damages your sender reputation, and creates consent problems under UAE rules. An agency selling you a database is selling you a liability.",
    },
    {
      title: "Response time is on every report.",
      body: "In this market, it usually decides the sale, and almost nobody measures it.",
    },
    {
      title: "Every consent record is retrievable.",
      body: "Opt-in only on email and WhatsApp, documented well enough to produce if a regulator ever asks.",
    },
    {
      title: "Landing pages are built here.",
      body: "Your paid traffic lands on a page built to do one job. A homepage makes people guess where to go, and most of them guess wrong.",
    },
    {
      title: "You get told when traffic is not your problem.",
      body: "Sometimes the offer or the follow-up is the constraint, and more traffic only makes the leak bigger. That conversation costs us a retainer now and then, and saves you a year.",
    },
    {
      title: "We build for AI search as well as Google.",
      body: "Your brand shows up when buyers ask ChatGPT or Perplexity who to hire.",
    },
  ] as Claim[],
};

export type Sector = { name: string; examples: string[] };

/** Eight sectors. Examples are split on commas only, never on "and", so
 *  examples.join(", ") reproduces the document's list exactly and no compound
 *  ("corporate services and company formation", "customs and port services")
 *  is silently torn in half. */
export const sectors = {
  title: "Where This",
  strokeTitle: "Works Best",
  lede: "We work with UAE businesses where an enquiry starts a conversation instead of completing a sale, and where the speed and quality of that call decides the revenue.",
  items: [
    {
      name: "Professional services",
      examples: ["legal", "audit", "tax", "consulting", "corporate services and company formation"],
    },
    {
      name: "Technology",
      examples: ["SaaS", "fintech", "enterprise software and managed IT services"],
    },
    {
      name: "Real estate",
      examples: ["brokerages", "developers", "commercial agency", "property management"],
    },
    {
      name: "Healthcare and aesthetics",
      examples: ["clinics", "dental", "dermatology", "wellness"],
    },
    {
      name: "Education and training",
      examples: ["schools", "universities", "corporate training providers"],
    },
    {
      name: "Financial services",
      examples: ["insurance brokers", "wealth management", "payments"],
    },
    {
      name: "Logistics and trade",
      examples: ["freight forwarding", "3PL", "customs and port services"],
    },
    {
      name: "Home and trade services",
      examples: ["fit-out", "maintenance", "moving", "automotive"],
    },
  ] as Sector[],
  closingLead: "The common factor is not the sector.",
  closing:
    "It is that the enquiry is the start of a conversation rather than a completed sale, which means everything after the form matters as much as everything before it.",
};

export const faqs: Faq[] = [
  {
    q: "What does a lead generation company do?",
    a: "A lead generation company builds and runs the system that turns interest into qualified enquiries: the offer, the traffic source, the landing page, the capture and routing, the qualification step and the follow-up. What you should end up with is enquiries your sales team recognises as worth calling, at a known cost.",
  },
  {
    q: "What counts as a qualified lead?",
    a: "Whatever we agree with you before any work starts. We use four stages: enquiry, marketing qualified, sales qualified, and booked meeting. We report against the last two, because those are the ones your own sales team would count.",
  },
  {
    q: "How much does lead generation cost in Dubai?",
    a: "It comes down to how many routes we run, whether we are building landing pages, your email and messaging volume, and whether paid media is involved. Ad spend and tooling are billed separately from our fee. Every engagement gets a written proposal with the lead definition included.",
  },
  {
    q: "Do you work with B2B and B2C businesses?",
    a: "Both, and they run differently. On the B2B side, we measure booked meetings with named decision-makers, and the nurture runs longer. B2C lives or dies on offer clarity and response speed. The channel mix, the lead definition and the reporting all change accordingly.",
  },
  {
    q: "Do you buy or sell lead lists?",
    a: "No. Purchased lists convert badly, damage your sender reputation and create consent problems under UAE rules. We build lists and pipelines from your own activity. Slower to start, considerably better afterwards. An agency selling you a database is selling you a liability.",
  },
  {
    q: "How long before lead generation produces results?",
    a: "Landing page and routing fixes can move conversion rates in the first two to three weeks, because you are converting traffic you already have. Building an audience or a list takes 60 to 90 days. Response time fixes produce the fastest gains of all.",
  },
  {
    q: "What is the difference between lead generation and performance marketing?",
    a: "Performance marketing is where you buy attention: the paid channels and the media budget. Lead generation is what happens to that attention, plus the channels you own, meaning your list, WhatsApp, local search, and your landing pages. Most businesses need both. See our performance marketing page.",
    // The document writes this reference in brackets. The answer above carries
    // the sentence unbracketed so the FAQ schema stays clean, and the list
    // links this phrase where it occurs.
    aLink: { label: "performance marketing", href: "/services/performance-marketing" },
  },
  {
    q: "Do UAE rules restrict marketing emails and WhatsApp messages?",
    a: "Yes. Under the UAE Personal Data Protection Law, you need prior opt-in consent before marketing by email, phone or text, and an existing customer relationship does not count as a legal basis on its own. WhatsApp layers Meta's own rule on top: opt-in before the first message, and your business name at the point of consent. People can withdraw at any time.",
  },
  {
    q: "Can we send marketing emails or WhatsApp messages to a list we already have?",
    a: "Only if those people opted in to hear from you and you can show it. Consent has to be specific and recorded, so a list gathered for one purpose rarely covers marketing. We audit what you hold before anything sends. Where the consent record is thin, we rebuild the list instead of gambling your sender reputation on it.",
  },
];

export const finalCta = {
  title: "Tell Us Where Your",
  strokeTitle: "Enquiries Are Leaking",
  body: "Tell us what you sell, where your enquiries come from now, and what happens to them after they arrive.",
  note: "You will hear back within 3 to 4 hours with a straight answer on where you are losing money, and a scoped proposal if we can fix it.",
};

/** Form fields. The document asks for three specific things, so those are the
 *  fields rather than the generic ad-spend set. */
export const formFields = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "sell", label: "What you sell" },
  { id: "sources", label: "Where your enquiries come from now" },
  { id: "after", label: "What happens to them after they arrive", wide: true },
  { id: "referral", label: "How did you hear about us?", wide: true },
];

/** Mid-page CTA band, above the work section. Supplied in the document under
 *  "Lead Generation Company Page CTA". Stored in sentence case and split across
 *  two lines for typesetting; the band uppercases it. */
export const growthCta = {
  heading: ["Ready to generate", "more quality leads?"] as [string, string],
  support:
    "Reach the Right Audience, Capture High-Intent Prospects & Turn More Leads Into Customers",
  button: "Get a Free Lead Generation Strategy",
};
