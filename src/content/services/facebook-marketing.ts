// Facebook Marketing — page content.
// Copy source: "Facebook Marketing.docx" (client-supplied, 2026-09-03).
// VERBATIM. Headings are the document's own, split across lines only for
// typesetting. Do not add copy here: no invented labels, figures or CTA
// microcopy.
//
// THE ARGUMENT IS DRIFT. The opening is not about posting more, it is about a
// Page and a business slowly separating: a company "publishes regularly for a
// few months", then "posting becomes less consistent, opening hours change,
// customer questions remain unanswered and the page gradually stops reflecting
// the actual business". The sting is the sentence after it, which the document
// gives a paragraph of its own: "People may still check it before calling,
// visiting or buying." That is why the hero draws two lines coming apart and
// why the page treats upkeep as the service rather than as housekeeping.
//
// THE SECOND ARGUMENT IS SEPARATION. The document refuses to let organic and
// paid results be added together: they "answer different questions", and the
// promises put it plainly -- "Advertising results are not blended with ordinary
// Page activity to make overall performance appear stronger." So the measuring
// section is drawn as two ledgers that never join, and nothing on this page
// totals them.
//
// NO FIGURES AT ALL. This document gives no number: no reach, no budget, no
// posting frequency, no timeframe. It says so repeatedly and on purpose --
// "There is no posting frequency that suits every business", "Improvements
// within 30 days cannot be guaranteed" -- so nothing here charts, counts or
// forecasts.
//
// TWO CROSSLINKS, BOTH REAL. The document brackets "[social media content
// creation]" and "[Meta Ads services]". Both destinations are built, so both
// render as links; neither sentence is reworded to accommodate one.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Facebook Marketing Agency in Dubai | ENH Marketing",
  description:
    "Keep your Facebook presence accurate and active through content planning, page management, community support, reporting and paid campaign coordination where required.",
};

export const hero = {
  lines: ["Facebook Marketing", "Agency", "in Dubai"] as [string, string, string],
  sub: "Keep your Facebook presence accurate and active through content planning, page management, community support, reporting and paid campaign coordination where required.",
  primary: "Request a Facebook Marketing Plan",
  secondary: "Talk To Our Social Team",
};

/** The opening, in the document's order: the drift, then the reason it
 *  matters, then the service. The one-line paragraph is the document's own
 *  and keeps its own line here. */
export const narrative = {
  heading: ["Keep Your Facebook Page", "Useful Between Campaigns"] as [string, string],
  scene:
    "A business creates a Facebook Page, adds its contact details and publishes regularly for a few months. Posting becomes less consistent, opening hours change, customer questions remain unanswered and the page gradually stops reflecting the actual business.",
  sceneEmphasis: "gradually stops reflecting the actual business",
  /** The sting. A paragraph of one sentence in the source, and the reason the
   *  whole page exists. */
  pivot: "People may still check it before calling, visiting or buying.",
  pivotEmphasis: ["before calling, visiting or buying"],
  agency:
    "ENH Marketing manages Facebook Pages for UAE businesses that need a reliable presence without handling every post and interaction internally. We plan the content, prepare the agreed assets, schedule posts, monitor responses and report on what happened.",
  scope:
    "Our Facebook marketing services in Dubai can cover organic page management alone or work alongside paid Facebook advertising. The exact division between content creation, page management and advertising is stated before the work begins.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type Service = { no: string; title: string; body: string; glyph: GlyphVariant };

/** Seven areas of the management scope. */
export const services = {
  title: "What Our Facebook Marketing",
  strokeTitle: "Services in Dubai Cover",
  items: [
    {
      no: "01",
      title: "Facebook Page Setup and Upkeep",
      glyph: "structure",
      body: "We review the Page name, category, description, contact details, opening hours, location, action button and connected accounts. Updates are made when approved information changes so customers do not rely on outdated details.",
    },
    {
      no: "02",
      title: "Monthly Content Planning",
      glyph: "sequence",
      body: "The monthly plan is developed around business priorities, customer questions, campaigns, seasonal dates and available material. Each post should have a clear purpose rather than filling the calendar with unrelated awareness content.",
    },
    {
      no: "03",
      // The document's second sentence here carries a bracketed crosslink, so
      // it is rendered once beneath the section as a real link rather than
      // flattened into this body. See `reference` below.
      title: "Copy, Design and Video Coordination",
      glyph: "creative",
      body: "We prepare the captions, graphics and edited videos included in the agreed scope.",
    },
    {
      no: "04",
      title: "Scheduling and Publishing",
      glyph: "index",
      body: "Approved Facebook posts are scheduled according to the content calendar. Publishing dates can be adjusted around offers, events, stock availability and operational changes when the required information reaches us in time.",
    },
    {
      no: "05",
      title: "Comment and Message Monitoring",
      glyph: "conversation",
      body: "We monitor the interactions included in the management scope and respond using agreed brand guidelines. Enquiries requiring prices, availability, complaints or specialist advice are passed to the appropriate person within your business.",
    },
    {
      no: "06",
      title: "Community and Reputation Support",
      glyph: "triage",
      body: "Comments, recommendations and recurring questions can reveal what customers need to know. We use those patterns to improve future content while escalating sensitive or potentially harmful conversations rather than improvising a public response.",
    },
    {
      no: "07",
      title: "Monthly Performance Reporting",
      glyph: "reporting",
      body: "Reports cover the published content, audience response, reach, engagement, clicks and other available Page actions. The findings are used to identify useful formats and subjects for the next month without treating every reaction as a business result.",
    },
  ] as Service[],
  /** The document's bracketed link, split so the destination is a real link.
   *  The page exists, so Crosslink renders it as one. */
  referenceLead:
    "Original filming, photography, animation or presenter-led production can be added through our",
  referenceLabel: "social media content creation",
  referenceHref: "/services/social-media-marketing/content-creation",
  referenceTail: "service when required.",
};

/** Where paid comes in, and the two things the document is careful about:
 *  matching the objective to the outcome, and not overclaiming tracking. */
export const advertising = {
  title: "When Facebook",
  strokeTitle: "Advertising Is Included",
  /** One sentence about reach that happens and one about reach that is bought.
   *  Split at the document's own full stop: they describe two different states
   *  of the same field and are drawn as two. */
  contrastOrganic:
    "Organic posting reaches people who already follow or encounter the Page through normal platform activity.",
  contrastPaid:
    "Paid campaigns distribute selected content to a defined audience using an allocated advertising budget.",
  scope:
    "Our Facebook advertising services in Dubai can include media planning, campaign setup, audience selection, creative testing, lead forms, website tracking and monthly optimisation. Forecasts may be prepared when sufficient historical or category data is available, with the assumptions stated clearly.",
  objectivesLead: "Meta's current campaign objectives cover",
  objectives: [
    "awareness",
    "traffic",
    "engagement",
    "leads",
    "app promotion",
    "sales",
  ],
  /** The rule and the worked failure, which the document states together. */
  objectivesRule: "The objective should match the business outcome being measured.",
  objectivesWarning:
    "A traffic campaign should not be reported as though every website visit were a qualified lead.",
  /** What goes wrong, marked inside the warning rather than restated. */
  objectivesWarningMark: "every website visit were a qualified lead",
  /** Tracking, and the limit stated in the same breath. */
  tracking:
    "Meta Pixel, Conversions API and other tracking components may be included when relevant and technically possible.",
  trackingCaveat:
    "Tracking improves the information available for Facebook ad optimisation, but it does not create perfect attribution across every device, browser and customer journey.",
  /** The document's second bracketed link. The page exists. */
  referenceLead:
    "Detailed paid strategy, advertising budgets and campaign management are covered on our",
  referenceLabel: "Meta Ads services",
  referenceHref: "/services/performance-marketing/meta-ads",
  referenceTail: "page.",
};

/** THE SECOND CENTREPIECE. Two ledgers that answer different questions, and
 *  which the document will not let anyone add together. */
export const measure = {
  title: "What",
  strokeTitle: "We Measure",
  claim:
    "Organic Facebook reporting and paid advertising reporting answer different questions.",
  /** Each column opens by naming itself, which is why neither needs a heading
   *  invented for it. The opening phrase is marked inside its own paragraph. */
  organic:
    "Page-management reports can show publishing consistency, reach, video views, engagement, link clicks and the types of questions received. These figures help us understand which content earns attention and whether the Page is supporting customers properly.",
  organicTerm: "Page-management reports",
  paid: "Paid reports may cover impressions, reach, clicks, landing-page views, leads, purchases, cost per result and return on ad spend where the required tracking is available. Lead quality and confirmed sales may need information from your CRM or sales team because the advertising platform cannot judge them alone.",
  paidTerm: "Paid reports",
  /** The rule, and the worked case that shows why it matters. */
  agreement: "We agree the important measures before reporting begins.",
  /** The same reading, judged twice. Split at the document's own "but": the
   *  two halves are the two verdicts, and they read back as one sentence. */
  caseUseful: "A large number of reactions may be useful for an awareness campaign",
  caseInsufficient: "but insufficient for a campaign expected to generate enquiries.",
};

export const sectors = {
  title: "Businesses We",
  strokeTitle: "Manage Facebook For",
  items: [
    "Retail and ecommerce businesses",
    "Restaurants and hospitality brands",
    "Property and home services",
    "Healthcare and wellness providers",
    "Education and training companies",
    "Automotive businesses",
    "Events and entertainment",
    "Professional services",
    "Logistics and industrial companies",
    "Community and consumer-focused organisations",
  ],
  /** The claim the wall of names is under, and the checkpoint attached to it.
   *  Split at the document's own full stop. */
  caveatLead: "The content and response process change with the industry.",
  caveatGate:
    "Healthcare, finance and other regulated sectors may require additional approval before claims, advice or promotional material can be published.",
  caveatGateMark: "Healthcare, finance and other regulated sectors",
};

export type Promise = { no: string; title: string; body: string; glyph: GlyphVariant };

export const promises = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  items: [
    {
      no: "01",
      title: "A defined scope for Facebook",
      glyph: "structure",
      body: "We establish whether the work includes page management, content production, community responses, advertising or a combination.",
    },
    {
      no: "02",
      title: "A monthly plan built around the business",
      glyph: "sequence",
      body: "Content is connected to current services, customer questions, campaigns and available material rather than generic engagement dates.",
    },
    {
      no: "03",
      title: "Approval before publishing",
      glyph: "golive",
      body: "The content calendar and posts follow the review process agreed with your team.",
    },
    {
      no: "04",
      title: "Clear escalation rules",
      glyph: "triage",
      body: "We define which comments and messages can be answered by ENH and which require information or approval from your business.",
    },
    {
      no: "05",
      title: "Platform-appropriate versions",
      glyph: "creative",
      body: "Facebook copy and creative can be adjusted without automatically duplicating the Instagram version.",
    },
    {
      no: "06",
      title: "Paid and organic reporting kept separate",
      glyph: "reporting",
      body: "Advertising results are not blended with ordinary Page activity to make overall performance appear stronger.",
    },
    {
      no: "07",
      title: "Access handled through business tools",
      glyph: "tool",
      body: "Your company should retain ownership of its Facebook Page, business portfolio and advertising account while providing ENH with the access needed for the agreed work.",
    },
    {
      no: "08",
      title: "Connected marketing support",
      glyph: "fanout",
      body: "As a digital marketing agency in UAE, ENH can align Facebook with content production, website activity and other digital marketing services when included in the wider scope.",
    },
  ] as Promise[],
};

export const faqs: Faq[] = [
  {
    q: "What does a Facebook marketing agency do?",
    a: "A Facebook marketing agency can manage the business Page, plan content, create posts, schedule publishing, monitor interactions and report on performance. Paid advertising, original production and extensive community management may be included or quoted separately.",
  },
  {
    q: "Do you provide Facebook page management in the UAE?",
    a: "Yes. Our Facebook page management in the UAE can cover profile updates, monthly planning, post preparation, scheduling, publishing, monitoring and reporting. The exact monthly output and response responsibilities are stated in the proposal.",
  },
  {
    q: "Is Facebook marketing the same as Facebook advertising?",
    a: "Facebook marketing is broader. It can include organic content, Page upkeep, community management and paid promotion. Facebook advertising refers specifically to campaigns that use an allocated media budget through Meta's advertising system.",
  },
  {
    q: "Is content creation included?",
    a: "Design, copywriting and video editing can be included according to the agreed monthly deliverables. New photography, filming, animation, presenters or larger productions are scoped separately when they require dedicated production time.",
  },
  {
    q: "How often should a business post on Facebook?",
    a: "There is no posting frequency that suits every business. The right schedule depends on the audience, available content, campaign activity and how customers use the Page. Your proposal will state a realistic monthly output.",
  },
  {
    q: "Do you respond to comments and messages?",
    a: "Yes, when community management is included. We work from agreed response guidelines and pass enquiries, complaints or technical questions to your team when they require information that ENH should not provide independently.",
  },
  {
    q: "Can you manage Facebook and Instagram together?",
    a: "Yes. Both platforms can be managed within one wider social media scope. Some source material can be shared, but the format, caption and publishing approach may be adjusted so the same post is not copied everywhere without context.",
  },
  {
    q: "Do you run Facebook ads?",
    a: "Yes. ENH provides Facebook advertising services covering campaign planning, setup, creative testing, budget management and reporting. The management fee, media spend and tracking requirements are shown separately in the proposal.",
  },
  {
    q: "How much should we spend on Facebook ads?",
    a: "The budget depends on the campaign objective, audience size, location, expected cost per result and the amount of creative available for testing. We recommend a starting budget after reviewing the business and state which assumptions support it.",
  },
  {
    q: "Can Facebook ads generate leads?",
    a: "Facebook lead campaigns can collect enquiries through forms, calls, messages or website actions. The definition of a qualified lead should be agreed before launch. Lead quality also depends on the offer, questions, targeting and follow-up process.",
  },
  {
    q: "How quickly will we see results?",
    a: "Organic Facebook management builds consistency over time and should not be sold with a fixed results deadline. Paid campaigns can produce data sooner, but reliable conclusions require enough delivery, conversions and creative variation. Improvements within 30 days cannot be guaranteed.",
  },
  {
    q: "How much do Facebook marketing services cost?",
    a: "The fee depends on monthly content volume, design and video requirements, publishing frequency, community-management hours, reporting and whether paid advertising is included. You will receive a written proposal showing the deliverables, management fee and advertising budget separately.",
  },
];

export const finalCta = {
  title: "Give Your Facebook",
  strokeTitle: "Page a Clear Role",
  body: "Tell us how your Page is currently managed, what content you have available and whether you need organic management, paid campaigns or both.",
  note: "We will recommend a practical monthly scope with the content output, approval process, response responsibilities and reporting stated before work begins.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
