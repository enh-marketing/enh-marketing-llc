// AI Creative Production — page content.
// Copy source: "AI Creative Production.docx" (client-supplied). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
//
// DEPARTURES FROM THE SOURCE, agreed with the client on 2026-09-03:
//
//   1. The document's primary call to action is "See Our AI Creative Work" and
//      it places a portfolio directly below the banner. No portfolio exists,
//      and the document itself requires each example to state what was
//      AI-generated and whether it was approved for public use. The client
//      chose to lead with the working call to action instead: "Book a Creative
//      Diagnostic" is primary in the banner and the closing block, and "See Our
//      AI Creative Work" is withheld on both until the portfolio is real. When
//      it is, the label goes back in and links to it.
//   2. The banner has two paragraphs. ServiceHero sets one, so they are set as
//      one paragraph here, in order, with no word changed.
//
// NO PORTFOLIO SECTION. "See the Work" is an instruction in the document
// ("[Place the AI creative portfolio directly below the banner.]" plus what
// each example must state). Nothing is rendered for it and nothing is invented:
// putting a stock video in a section whose brief says every example must be
// approved for public use would be exactly the misrepresentation the page
// warns against. Work and Insights are the site's shared sections.
//
// NO FIGURES, NO FACES. Every drawing is abstract frames and bars. The document
// says "Synthetic presenters are never presented as genuine customers", so the
// presenter in the UGC drawing is a silhouette, never a face.
//
// ACTORS. Each step of "How the Work Moves" carries who its own sentence makes
// the actor, cited. The client acts at two points; both are approvals.
//
// FORM. The standard site-wide set applies (team direction 2026-09-02).

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "AI Creative Production for UAE Brands | ENH Marketing",
  // The banner's first sentence, verbatim.
  description:
    "ENH Marketing produces AI-generated videos, UGC-style ads, product imagery, and creative variants for UAE brands.",
};

export const hero = {
  lines: ["AI Creative", "Production", "for UAE Brands"] as [string, string, string],
  // Departure 2: the banner's two paragraphs, as one.
  sub: "ENH Marketing produces AI-generated videos, UGC-style ads, product imagery, and creative variants for UAE brands. The service is designed for campaigns that need regular new content without arranging a full production shoot for every asset. We manage the concept, AI production, editing, brand review and final platform versions. We are clear about where AI is used and when conventional production would be more suitable.",
  // Departure 1: the diagnostic leads; the portfolio label is withheld.
  primary: "Book a Creative Diagnostic",
  withheld: "See Our AI Creative Work",
  /** The three states the hero draws, in the banner's own verbs: material is
   *  generated, reviewed, and delivered. */
  stages: ["Generated", "Reviewed", "Delivered"] as [string, string, string],
};

export type Output = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  kind: "video" | "ugc" | "imagery" | "variants";
  /** The drawing's two captions. Both are fragments of this item's own
   *  paragraph, so the page says nothing the document does not. */
  labels: [string, string];
};

export const produce = {
  title: "What",
  strokeTitle: "We Produce",
  items: [
    {
      no: "01",
      title: "AI Video Ads",
      body: "We produce short-form AI-generated videos for paid social campaigns, product promotions and brand communication. The scope can include concept development, scenes, voiceovers, motion, captions and platform editing. Each video is reviewed for visual errors, brand accuracy and suitability before delivery.",
      glyph: "creative",
      kind: "video",
      labels: ["Short-form", "Platform editing"],
    },
    {
      no: "02",
      title: "AI UGC-Style Ads",
      body: "We create presenter-led and creator-style ads using approved AI production methods. These assets can be used to test different hooks, scripts, offers and calls to action without booking a creator for every version. Synthetic presenters are never presented as genuine customers or independent reviewers.",
      glyph: "conversation",
      kind: "ugc",
      labels: ["Presenter-led", "Hooks, scripts, offers"],
    },
    {
      no: "03",
      title: "AI Brand and Product Imagery",
      body: "We create product, lifestyle and campaign imagery using approved brand references and existing assets. This can include new settings, seasonal concepts, background variations and localisation for different audiences. Product details are checked carefully, and inaccurate representations are removed before delivery.",
      glyph: "picture",
      kind: "imagery",
      labels: ["Product details", "Background variations"],
    },
    {
      no: "04",
      title: "Creative Variants at Scale",
      body: "We develop multiple versions from one approved campaign idea. Variations may include different openings, headlines, scenes, formats, languages, offers and calls to action. This gives paid media teams more creative options to test without repeating the complete production process each time.",
      glyph: "generate",
      kind: "variants",
      labels: ["One approved campaign idea", "Multiple versions"],
    },
  ] as Output[],
};

/** "Built for Campaign Volume". Two paragraphs; the first is the argument, the
 *  second the caveat. The drawing is the first paragraph's claim: audiences
 *  tire of an ad, the next version takes over. */
export const volume = {
  title: "Built for",
  strokeTitle: "Campaign Volume",
  lead: "Paid campaigns need new creative as audiences become familiar with existing ads. AI production makes it practical to create and test more versions within an agreed budget. One approved direction can be adapted into different hooks, formats, audiences and platform placements.",
  caveat:
    "The proposal will state the exact number of finished assets and variations included. AI production is recommended only when it offers a practical advantage for the required content.",
  /** Labels for the drawing, the paragraph's own nouns. */
  labels: { direction: "One approved direction", adapted: ["hooks", "formats", "audiences", "platform placements"] },
};

export type ReviewStage = { no: string; title: string; body: string };

/** "Quality and Human Review". Five stages, each of which changes what the
 *  frame contains, so they are drawn as a strip of five frames. */
export const review = {
  title: "Quality and",
  strokeTitle: "Human Review",
  items: [
    { no: "01", title: "Start With an Approved Direction", body: "We agree on the audience, message, visual style, platform and campaign purpose before production begins. Brand references and existing assets are collected at this stage." },
    { no: "02", title: "Create the Initial Version", body: "The team produces the scenes, imagery, voice and motion required for the approved concept. Several internal versions may be tested before one is selected." },
    { no: "03", title: "Edit the Output", body: "Generated material is edited for pacing, continuity, colour, sound, text placement and platform format. Visible errors and unsuitable scenes are removed." },
    { no: "04", title: "Check Brand and Product Accuracy", body: "We review logos, packaging, colours, product details, claims and business information. Anything that does not represent the brand accurately is corrected or replaced." },
    { no: "05", title: "Prepare the Final Variants", body: "The approved concept is adapted into the formats, hooks, languages and calls to action included in the scope. Final files are supplied for the agreed platforms." },
  ] as ReviewStage[],
};

export type Step = {
  no: string;
  title: string;
  body: string;
  /** Who the step's own sentence makes the actor. Read from the subject, never
   *  inferred from the title. Cited beside each. */
  actor: "ENH" | "You";
};

export const process = {
  title: "How the",
  strokeTitle: "Work Moves",
  items: [
    // "We confirm the platform, audience, message ..."
    { no: "1", title: "Review the Requirement", body: "We confirm the platform, audience, message, output volume, formats and campaign objective. Existing brand assets and guidelines are reviewed at this stage.", actor: "ENH" },
    // "We identify which assets suit AI production ..."
    { no: "2", title: "Choose the Production Method", body: "We identify which assets suit AI production and which would be better produced through filming, photography or conventional animation.", actor: "ENH" },
    // "... are shared for approval": the approval is the client's.
    { no: "3", title: "Approve the Direction", body: "The scripts, visual references, presenters, products and key messages are shared for approval before the full set of assets is produced.", actor: "You" },
    // "We generate the required material ..."
    { no: "4", title: "Produce and Edit", body: "We generate the required material and complete the editing, motion, sound, captions and platform formatting included in the scope.", actor: "ENH" },
    // "Your team checks the content ..."
    { no: "5", title: "Review the Assets", body: "Your team checks the content for brand accuracy, product representation and message approval. Revisions are managed within the agreed allowance.", actor: "You" },
    // "Final assets are supplied ..."
    { no: "6", title: "Deliver and Test", body: "Final assets are supplied in the agreed formats. When campaign management is included, the creative versions can be tested against the same audience and objective.", actor: "ENH" },
  ] as Step[],
};

/** "Monthly AI Creative Production". Two paragraphs: how it can be scoped, and
 *  what it does not include.
 *
 *  Both paragraphs are set in full, but split across the drawing instead of
 *  printed as prose. `shape` is the first sentence. `includedLabel` and
 *  `included` reconstruct the second sentence word for word, and `commitment`
 *  is the third. `excludedLabel`, `excluded` and `excludedTail` reconstruct the
 *  second paragraph word for word. Nothing is dropped and nothing is added. */
export const monthly = {
  title: "Monthly AI",
  strokeTitle: "Creative Production",
  shape: "AI creative production can be scoped as a one-off project or a monthly service.",
  includedLabel: "An ongoing scope may include",
  included: ["new concepts", "videos", "images", "platform versions", "language adaptations", "revisions"],
  /** The commitment the section exists to make. Set at display scale rather
   *  than left as the tail of a paragraph. */
  commitment: "The number of finished assets is agreed before production starts.",
  excludedLabel: "The service does not include",
  excluded: ["media spend", "campaign management", "influencer fees", "conventional filming"],
  excludedTail: "unless these are added separately.",
};

export const faqs: Faq[] = [
  { q: "What is AI creative production?", a: "AI creative production uses generative AI as part of the process for creating video, imagery, voice, motion or campaign variations. The output is still planned, edited and reviewed by a creative team before it is delivered." },
  { q: "Does AI-generated content look obviously AI-generated?", a: "Poorly produced AI content often contains visible errors, inconsistent movement or inaccurate product details. Careful direction, suitable tools and detailed editing can improve the result. Some concepts will still be better suited to conventional production, and we will state that before work begins." },
  { q: "Is it legal to use AI-generated content in advertisements?", a: "AI-generated advertising is still subject to UAE media, advertising, consumer protection, intellectual property and sector-specific rules. The content must not mislead people, misuse someone’s identity or make unsupported claims. Sensitive and regulated campaigns may require additional review." },
  { q: "Do AI-generated advertisements need a disclosure?", a: "It depends on the platform, type of content and how significantly the material was generated or altered. Some platforms require or provide AI-generated content labels in specific situations. We review the applicable publishing requirements when the asset and placement are confirmed." },
  { q: "Is AI-generated content suitable for paid advertising?", a: "It can be suitable for testing hooks, offers, visual directions and multiple campaign versions. Its performance depends on the message, offer, audience, editing and media strategy. AI production alone does not make an advertisement effective." },
  { q: "How does AI production compare with conventional production?", a: "AI production can reduce the time and cost required for certain types of campaign content, especially when several versions are needed. Conventional production remains more suitable for flagship films, real testimonials, events, team videos and content requiring physical proof." },
  { q: "What can AI production not do well?", a: "AI can struggle with exact product details, natural human movement, consistent characters and complex physical demonstrations. It should not be used when an inaccurate scene could mislead the audience or create a false impression about a person, product or event." },
  { q: "How much AI video can you produce each month?", a: "The output depends on the video length, visual complexity, number of concepts, platform versions, languages and revision requirements. Your proposal will state the exact number and type of finished assets included each month." },
  { q: "How much does AI video production cost in Dubai?", a: "The fee depends on the output volume, concept complexity, editing, voice requirements, languages, licensing and number of final versions. AI Creative Production is available as a one-off project or an agreed monthly service." },
  { q: "Do we own the finished content?", a: "The agreement will state the usage rights attached to the finished files. Rights may also be affected by the terms of the AI tools, stock assets, voices, music or licensed materials used. Any restrictions will be stated before production." },
  { q: "Can you follow our brand guidelines?", a: "Yes. We use your approved colours, fonts, tone, product references and visual guidelines during production. Every asset is reviewed before delivery, although additional approval may be needed for products with strict packaging, technical or regulatory requirements." },
  { q: "Does AI creative perform better than conventional creative?", a: "There is no general rule. AI creative can make it easier to test more ideas and replace weak assets quickly. The result still depends on the concept, message, offer, audience and campaign setup." },
  { q: "Can you create Arabic AI content?", a: "Arabic or bilingual content can be included in the scope. The scripts, on-screen text, pronunciation and final message will be reviewed by an Arabic-language specialist before publishing." },
];

export const finalCta = {
  title: "See What AI Production Can",
  strokeTitle: "Create for Your Campaign",
  body: "Tell us what you need to promote, where the content will be used and how many versions the campaign requires. We will recommend which assets suit AI production, which need conventional production and what can be delivered within the proposed budget and timeline.",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
