// Testimonial Video Production — page content.
// Copy source: "Testimonial Video Production.docx" (client-supplied, 2026-09-03).
// VERBATIM. Do not add copy here.
//
// THE ARGUMENT IS SPECIFICITY. The opening is a scene of a testimonial that
// went fine and achieved nothing: "They are asked whether they enjoyed working
// with the company, give a polite answer, and leave. The footage looks
// professional, but it tells a prospective buyer very little." The document
// then names exactly what was missing, as four questions. Those four are the
// centrepiece; everything else on this page supports getting real answers to
// them.
//
// CONSENT AND CLAIMS ARE NOT DECORATION. This document is careful in a way the
// page must preserve: results and regulated claims "should be checked before
// publication", the customer "must also understand where the finished video may
// be used, particularly when paid advertising is included", and the edit must
// not change "what they meant". Those sentences stay together with the section
// they qualify and are never softened.
//
// THE LAST FAQ IS A REFUSAL, AND IT STAYS ONE. "No individual video can
// guarantee sales." Nothing on this page promises otherwise.
//
// FIGURES. Two, both hedged and both inside FAQ answers: "approximately 45 to
// 60 minutes" for a filming session, and "commonly runs between one and three
// minutes" for a finished testimonial. They stay in those answers.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";
import type { TrackStage } from "@/components/service/StageTrack";

export const meta = {
  title: "Testimonial Video Production in Dubai | ENH Marketing",
  description:
    "Record genuine client and customer stories through carefully prepared interviews, supporting footage and branded edits produced for your website, sales material, social media and advertising.",
};

export const hero = {
  lines: ["Testimonial Video", "Production", "in Dubai"] as [string, string, string],
  sub: "Record genuine client and customer stories through carefully prepared interviews, supporting footage and branded edits produced for your website, sales material, social media and advertising.",
  primary: "Plan Your Testimonial Project",
  secondary: "Talk To Our Experts",
};

export const narrative = {
  heading: ["Turn Customer Experience", "Into Useful Proof"] as [string, string],
  scene:
    "A satisfied customer agrees to appear on camera. They are asked whether they enjoyed working with the company, give a polite answer, and leave. The footage looks professional, but it tells a prospective buyer very little.",
  sceneEmphasis: "tells a prospective buyer very little",
  /** The four questions the document says a useful testimonial has to answer.
   *  Split into their own strings because the centrepiece is built on them. */
  needLead: "A useful testimonial needs more detail.",
  questions: [
    "What problem did the customer have?",
    "Why did they choose your business?",
    "What happened during the work, and what changed as a result?",
  ],
  agency:
    "ENH Marketing provides testimonial video production in Dubai and across the UAE. We help select the right participants, prepare the questions, conduct the interviews and turn genuine customer experiences into focused videos that support a buying decision. As a testimonial video production company in Dubai, we handle the project from the initial story discussion through to filming, editing and delivery in the formats included in your scope.",
  highlight: [
    "select the right participants",
    "prepare the questions",
    "conduct the interviews",
  ],
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type TestimonialType = { no: string; title: string; body: string; glyph: GlyphVariant };

export const types = {
  title: "The Testimonial",
  strokeTitle: "Videos Businesses Use",
  items: [
    { no: "01", title: "Customer Testimonial Video", glyph: "conversation", body: "A customer explains why they chose your product or service, what the experience was like and whether it met their expectations. These videos work well on service pages, landing pages, sales presentations and social media." },
    { no: "02", title: "Client Case Study Video", glyph: "ledger", body: "A case study goes further into the situation before the work began, the approach taken and the outcome achieved. It is particularly useful for B2B services, complex projects and purchasing decisions involving several stakeholders." },
    { no: "03", title: "Product Testimonial Video", glyph: "catalogue", body: "A customer discusses how they use a particular product and what they value about it. Supporting footage can show the product in context, helping viewers understand the experience beyond a direct recommendation." },
    { no: "04", title: "Service Experience Video", glyph: "support", body: "Service testimonials focus on communication, delivery, expertise and the customer’s overall experience. They can support businesses where prospective clients need confidence in the people and process before making an enquiry." },
    { no: "05", title: "Project Outcome Video", glyph: "structure", body: "A client describes a completed project, the challenge involved and the result delivered. These testimonial videos can be supported with footage of the location, finished work, team or process being discussed." },
    { no: "06", title: "Short Testimonial Clips", glyph: "fanout", body: "One interview can produce shorter clips built around individual questions, results or customer comments. These versions can be prepared for LinkedIn, Instagram, paid advertising, email campaigns and sales follow-ups." },
  ] as TestimonialType[],
};

/** THE CENTREPIECE. What makes an answer useful, and the limits around it. */
export const specifics = {
  title: "Specific Answers Are More",
  strokeTitle: "Useful Than General Praise",
  claim:
    "The most convincing customer testimonial videos are specific without sounding rehearsed.",
  method:
    "We prepare questions around the customer’s original situation, what influenced their decision, how the work progressed and what outcome they experienced. The speaker receives enough information to feel prepared, but we do not ask them to memorise praise or pretend that an experience happened.",
  /** The consent and claims paragraph. Never softened, never separated from
   *  the section it qualifies. */
  consent:
    "Where a testimonial refers to results, figures or regulated claims, those details should be checked before publication. The customer must also understand where the finished video may be used, particularly when paid advertising is included.",
  /** What the method refuses to do, marked where it stands rather than
   *  restated: it is the difference between a prepared answer and a scripted
   *  one, which is the whole section. */
  methodMark:
    "we do not ask them to memorise praise or pretend that an experience happened",
  aim: "The aim is to record a clear account in the customer’s own words and edit it without changing what they meant.",
};

export type PlaceFrame = "page" | "deck" | "phone" | "ad";
export type Place = { text: string; preview: PlaceFrame; spans: [number, number][] };

export const distribution = {
  title: "Where Your Testimonial",
  strokeTitle: "Videos Can Be Used",
  claim:
    "The intended placement should be decided before filming because it affects the questions, length, framing and supporting footage.",
  /** Four placements, each a different set of selections out of the same
   *  recording. `spans` are positions on an unlabelled lane and carry no
   *  duration: the document gives one length, hedged, inside a FAQ answer, and
   *  it is never lifted out. What the spans do carry is the document's own
   *  arithmetic -- one long selection, one short one, several short vertical
   *  edits, and "several openings and calls to action" for paid. `preview`
   *  names the frame the placement ends up in. */
  places: [
    {
      text: "A longer client testimonial may belong on a case study or service page.",
      preview: "page",
      spans: [[6, 62]] as [number, number][],
    },
    {
      text: "A concise result-led version may work better in a proposal or sales presentation.",
      preview: "deck",
      spans: [[31, 21]] as [number, number][],
    },
    {
      text: "Short vertical edits can be used across social media.",
      preview: "phone",
      spans: [
        [14, 11],
        [47, 10],
        [73, 12],
      ] as [number, number][],
    },
    {
      text: "Paid campaigns may need several openings and calls to action from the same interview.",
      preview: "ad",
      spans: [
        [8, 8],
        [26, 7],
        [57, 8],
        [82, 9],
      ] as [number, number][],
    },
  ] as Place[],
  wider:
    "Testimonials can also be included in email campaigns, exhibition presentations, recruitment material and direct follow-ups with prospective customers.",
  /** The four other uses, marked in place. Lifting them into chips beside the
   *  sentence would print the same four phrases on the page twice. */
  widerMark: [
    "email campaigns",
    "exhibition presentations",
    "recruitment material",
    "direct follow-ups",
  ],
  planning:
    "We plan the required landscape, square and vertical versions during production. This is more efficient than reopening the project later and avoids forcing a horizontal interview into a vertical frame.",
};

export const process = {
  title: "How the",
  strokeTitle: "Project Moves",
  stages: [
    { no: "1", title: "Choose the Right Story", body: "We discuss the audience, offer, and buying decision the video needs to support. This helps identify customers with a relevant experience and enough detail to make the interview useful." },
    { no: "2", title: "Prepare the Participant", body: "A short pre-interview or questionnaire helps us understand the customer’s story before filming. We explain the process, expected time and likely subjects without giving them lines to memorise." },
    { no: "3", title: "Plan the Production", body: "We confirm the location, schedule, questions, crew, supporting footage and final deliverables. Any filming permissions, access arrangements or brand requirements are addressed before the shoot." },
    { no: "4", title: "Record the Interview", body: "The interviewer guides the conversation while the production team manages lighting, framing and separate audio. Questions can be repeated or rephrased so the participant has time to answer comfortably." },
    { no: "5", title: "Edit and Review", body: "The strongest answers are shaped into a clear narrative and supported with relevant b-roll, graphics, subtitles and licensed music. Feedback is managed through the revision rounds stated in the proposal." },
    { no: "6", title: "Deliver the Versions", body: "Approved files are supplied in the agreed formats for your website, sales material, social channels or campaigns. Additional clips can be included when they are part of the original scope." },
  ] as TrackStage[],
};

export const industries = {
  title: "Industries We",
  strokeTitle: "Produce Testimonials For",
  items: [
    "Professional and financial services",
    "Technology and B2B companies",
    "Property and construction",
    "Logistics and industrial businesses",
    "Healthcare and wellness",
    "Education and training providers",
    "Hospitality and leisure",
    "Retail and ecommerce",
    "Home and business services",
  ],
  caveat:
    "The approach changes with the sector. Healthcare, finance and other regulated industries may require additional consent, privacy checks and internal approval before customer claims can be published.",
};

export type Promise = { title: string; body: string };

export const promises = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  items: [
    { title: "A story before a shoot", body: "We establish what the customer can credibly discuss and why that experience matters to the intended audience." },
    { title: "Prepared participants", body: "Customers know what will happen, how long filming should take and which subjects will be covered without being given scripted praise." },
    { title: "Professional interview production", body: "Lighting, framing and separate audio are handled by the production crew so the speaker can concentrate on the conversation." },
    { title: "Relevant supporting footage", body: "Products, locations, processes and project details can be filmed to support what the customer is describing." },
    { title: "Permissions addressed early", body: "The intended platforms, advertising use and approval process are discussed before publication." },
    { title: "Feedback rounds stated in the quote", body: "Your team knows how many review stages are included before editing begins." },
    { title: "Channel-ready versions", body: "Landscape, square, vertical and subtitled edits can be produced together when included in the agreed scope." },
    { title: "Arabic and English delivery", body: "Bilingual interviews, subtitles or voiceover can be arranged according to the audience and production requirements." },
  ] as Promise[],
};

export const faqs: Faq[] = [
  { q: "What is included in testimonial video production?", a: "The service can include story development, participant preparation, interview questions, production planning, filming, editing, colour grading, sound, graphics, subtitles, licensed music and delivery in the agreed formats. The proposal will state the number of participants, locations, finished videos and revision rounds included." },
  { q: "How do we choose the right customers to interview?", a: "Look for customers with a relevant experience, a clear story and enough familiarity with your business to discuss it properly. The most enthusiastic customer is not always the strongest participant. A specific account of the problem, experience and result is usually more useful than general praise." },
  { q: "Do you write a script for the customer?", a: "We prepare questions and discussion areas rather than a word-for-word endorsement. The participant may receive the subjects in advance, but their answers should remain their own. Necessary facts, names and figures can be confirmed before filming." },
  { q: "What happens if the customer is nervous on camera?", a: "Most participants are not professional presenters, so the interview is conducted as a conversation rather than a performance. We explain the process, allow time for repeated answers and remove the interviewer’s questions during editing when that suits the chosen format." },
  { q: "How long does a testimonial interview take?", a: "Most testimonial filming sessions allow approximately 45 to 60 minutes for the interview, in addition to equipment setup and any supporting footage. The schedule may be longer when several locations, products or project details need to be filmed." },
  { q: "How long should a customer testimonial video be?", a: "A main testimonial commonly runs between one and three minutes, depending on the complexity of the story and where the video will be used. Shorter clips can be created for social media and advertising, while a detailed client case study may need more time." },
  { q: "Where can the interview be filmed?", a: "Filming can take place at the customer’s workplace, your premises, a completed project, a suitable hired location or another agreed setting. The location should support the story without creating unnecessary noise, access problems or distractions." },
  { q: "Do we need permission from the customer?", a: "Yes. Participants should understand how their name, image, company and comments will be used. The intended channels and any paid advertising use should be agreed before publication. Your organisation may also require its own release form or approval process." },
  { q: "Can the customer approve the video before it is published?", a: "A customer approval stage can be included where required, particularly when the participant represents another company. The approval chain should be agreed before production because additional reviewers can affect both the timeline and number of revisions." },
  { q: "Can one interview produce several videos?", a: "Yes. One interview can supply a main testimonial, shorter subject-based clips, vertical social edits and concise versions for advertising or sales follow-ups. The required outputs should be planned before filming so the questions and framing support every version." },
  { q: "How much does testimonial video production cost?", a: "The cost depends on the number of participants, filming locations, shoot duration, crew, supporting footage, editing requirements and number of finished versions. You will receive a written quote showing the production scope and deliverables beside the fee." },
  { q: "Will a testimonial video increase sales?", a: "A strong testimonial can help prospective customers understand an experience and feel more confident about a decision, but no individual video can guarantee sales. Its value also depends on the customer’s story, the offer, the placement of the video and how effectively it is used across your marketing." },
];

export const finalCta = {
  title: "Give Prospective Customers",
  strokeTitle: "a Real Experience to Consider",
  body: "Tell us which customer stories you want to record, what those customers can discuss and where the finished videos will be used.",
  note: "We will recommend the interview approach, filming requirements and mix of full-length and short-form edits, with the scope and approval process agreed before production begins.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
