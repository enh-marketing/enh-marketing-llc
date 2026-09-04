// Explainer Video Production — page content.
// Copy source: "Explainer Video Production.docx" (client-supplied, 2026-09-03).
// VERBATIM. Headings are the document's own, split across lines only for
// typesetting. Do not add copy here: no invented labels, figures or CTA
// microcopy.
//
// THE ARGUMENT IS SELECTION, NOT PRODUCTION. The document's complaint is not
// that companies lack a video, it is that they try to put everything in one:
// "Trying to include every feature, benefit and company message usually
// produces a longer video that answers none of the important questions
// clearly." Everything the page does follows from that -- the hero is about
// saying one thing once, and the centrepiece is about the point at which the
// structure can still be changed.
//
// THE PROCESS SECTION IS THE ARGUMENT'S CONSEQUENCE. The document is emphatic
// about when approval happens: the storyboard "is the main opportunity to
// change the structure before detailed illustration and animation work
// begins", and the promises repeat it -- the script and storyboard are
// "reviewed early, when structural changes are still practical to make". That
// is a claim about a window closing, and it is drawn as one. No cost, no
// hours and no percentage is attached to it, because the document attaches
// none.
//
// NO DURATION IS PRESENTED AS A RULE. The document gives exactly one range,
// "many introductory explainers work within one to two minutes", and
// immediately qualifies it: "the right duration depends on the complexity of
// the subject and where the video will be used". It stays inside its FAQ
// answer and is never lifted out.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Explainer Video Production in Dubai | ENH Marketing",
  description:
    "Explain a product, service, platform or process through clear scripts, storyboards, animation, motion graphics, voiceover and channel-ready edits.",
};

export const hero = {
  lines: ["Explainer Video", "Production", "in Dubai"] as [string, string, string],
  sub: "Explain a product, service, platform or process through clear scripts, storyboards, animation, motion graphics, voiceover and channel-ready edits.",
  primary: "Plan Your Explainer Video",
  secondary: "Talk To Our Experts",
};

/** The opening. Split at the document's own sentence boundaries: the
 *  observation, then the problem it creates, then what we do about it. The
 *  agency paragraph's last sentence is set apart at display scale because it
 *  states the method in one line and would be lost inside the paragraph. */
export const narrative = {
  heading: ["Make the Complicated", "Easier to Understand"] as [string, string],
  scene:
    "If your sales team spends the first ten minutes of every meeting explaining how the product works, the same explanation probably belongs in a video.",
  sceneEmphasis: "the same explanation probably belongs in a video",
  problem:
    "The challenge is deciding what the audience needs to understand first. Trying to include every feature, benefit and company message usually produces a longer video that answers none of the important questions clearly.",
  /** Marked inside the problem: what goes wrong, and what it costs. */
  highlight: [
    "every feature, benefit and company message",
    "answers none of the important questions clearly",
  ],
  agency:
    "ENH Marketing provides explainer video production services in Dubai and across the UAE. We develop the message, write the script, plan the visuals and produce the animation, voiceover, sound and final versions required for the agreed platforms.",
  closing:
    "Each project starts with the audience, the subject they need explained and the action they should be ready to take after watching.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type Format = { no: string; title: string; body: string; glyph: GlyphVariant };

/** Six formats. The document is clear that these are chosen by subject, not by
 *  preference, which is why they are not ranked. */
export const formats = {
  title: "The Explainer",
  strokeTitle: "Videos Businesses Use",
  items: [
    {
      no: "01",
      title: "2D Animated Explainer Video",
      glyph: "creative",
      body: "Custom illustrations, characters, icons and animated scenes are used to explain an idea in a clear visual sequence. This format suits services, brand concepts and products that are difficult to demonstrate through conventional filming.",
    },
    {
      no: "02",
      title: "Motion Graphics Explainer",
      glyph: "reporting",
      body: "Text, shapes, diagrams, numbers and branded graphic elements are animated to organise information. Motion graphics work well for reports, financial subjects, business processes and other topics where structure matters more than characters.",
    },
    {
      no: "03",
      title: "Product Explainer Video",
      glyph: "catalogue",
      body: "A product explainer shows what the product does, who it is designed for and how its key features address a practical need. Animation, filmed footage or a combination can be used depending on the product.",
    },
    {
      no: "04",
      title: "Software and Platform Walkthrough",
      glyph: "tool",
      body: "Screen recordings, interface animation and voiceover guide users through a website, app or digital platform. The video can introduce the overall system or focus on one task, feature or customer journey.",
    },
    {
      no: "05",
      title: "Service and Process Explainer",
      glyph: "workflow",
      body: "A service explainer helps customers understand what happens before, during and after they work with you. It is useful for offers involving several stages, technical input or responsibilities shared between the provider and client.",
    },
    {
      no: "06",
      title: "Training and Internal Explainer",
      glyph: "support",
      body: "Animated explainers can support onboarding, policies, safety instructions, systems and recurring internal processes. Longer subjects can be divided into short modules that employees can revisit when they need a specific answer.",
    },
  ] as Format[],
};

export type Craft = { no: string; title: string; body: string; glyph: GlyphVariant };

/** Six things that go into the video. Parts of one production, not options. */
export const craft = {
  title: "What Goes Into",
  strokeTitle: "an Explainer Video",
  items: [
    {
      no: "01",
      title: "Script and Message Structure",
      glyph: "structure",
      body: "The script establishes the problem, explanation and next action in language the intended audience can understand. Technical information is checked with your subject experts before the wording is approved for production.",
    },
    {
      no: "02",
      title: "Storyboard and Visual Direction",
      glyph: "sequence",
      body: "The storyboard shows how each part of the script will appear on screen. It allows your team to review the sequence, graphics and visual examples before detailed animation begins.",
    },
    {
      no: "03",
      title: "Illustration and Graphic Design",
      glyph: "creative",
      body: "Characters, icons, diagrams, interface elements and other graphics are designed around the approved visual direction. Existing brand guidelines can be applied, or a project-specific style can be developed where required.",
    },
    {
      no: "04",
      title: "Voiceover and On-Screen Copy",
      glyph: "conversation",
      body: "Voiceover talent is selected according to the language, audience and tone of the project. Important information can also appear through labels, captions and on-screen text without repeating every spoken line.",
    },
    {
      no: "05",
      title: "Animation and Motion Graphics",
      glyph: "heartbeat",
      body: "Approved visuals are animated to demonstrate movement, sequence, comparison and cause and effect. The animation style is chosen according to the subject rather than added simply to keep the screen busy.",
    },
    {
      no: "06",
      title: "Sound, Music and Subtitles",
      glyph: "text",
      body: "Licensed music and sound design support the pace without competing with the explanation. Subtitles and separate language versions can be included according to the platforms and audiences stated in the scope.",
    },
  ] as Craft[],
};

export type Stage = { no: string; title: string; body: string };

/** THE CENTREPIECE. Six steps, and the window in which the structure can still
 *  be changed. `gate` marks the two steps the document calls out as the review
 *  points, cited against the sentence each was read from. */
export const process = {
  title: "How the Production",
  strokeTitle: "Process Moves",
  items: [
    {
      no: "1",
      title: "Define the Explanation",
      body: "We review the product, service or process with your team and identify the intended audience, main question and required outcome. Reference materials and technical details are collected at this stage.",
    },
    {
      no: "2",
      // "Your team reviews the facts, terminology and intended message before
      // production continues."
      title: "Write the Script",
      body: "The information is organised into a clear sequence and written for speech rather than copied from a brochure. Your team reviews the facts, terminology and intended message before production continues.",
    },
    {
      no: "3",
      // "This is the main opportunity to change the structure before detailed
      // illustration and animation work begins."
      title: "Approve the Storyboard",
      body: "Each scene is planned alongside the relevant voiceover or on-screen copy. This is the main opportunity to change the structure before detailed illustration and animation work begins.",
    },
    {
      no: "4",
      title: "Develop the Visual Style",
      body: "We prepare the approved illustrations, graphic elements, characters or interface assets. Style frames may be shared first when the project requires a new visual direction.",
    },
    {
      no: "5",
      title: "Animate and Add Sound",
      body: "The scenes are animated and combined with the approved voiceover, music, sound and text. Timing is refined so viewers have enough time to follow each part of the explanation.",
    },
    {
      no: "6",
      title: "Review and Deliver",
      body: "Your team reviews the video through the feedback rounds included in the proposal. The approved versions are then supplied in the required dimensions, languages and file formats.",
    },
  ] as Stage[],
  /** Steps 2 and 3, zero-indexed. Both are named as review points in the
   *  document's own wording above, and step 3 is the one it calls "the main
   *  opportunity to change the structure".
   *
   *  NO SEPARATE LABEL FOR THE WEDGE. The obvious caption for it is the
   *  promises section's "The script and storyboard are reviewed early, when
   *  structural changes are still practical to make", and step three's own body
   *  says the same thing in the document's other wording. Both are already on
   *  this page, so printing either one again beside the drawing would put the
   *  same sentence in front of the reader twice. The wedge is aligned with the
   *  steps instead, and step three's copy sits directly beside its widest
   *  part. */
  gates: [1, 2],
};

export type PlaceKind = "homepage" | "product" | "sales" | "exhibition";
export type Place = { text: string; kind: PlaceKind };

/** Where the video goes, and why that is decided first. */
export const distribution = {
  title: "Where the Explainer",
  strokeTitle: "Goes After Delivery",
  claim:
    "The video's intended location affects its script, pacing, dimensions and call to action, so distribution should be planned before production begins.",
  /** The four things the location decides. Marked inside the claim rather than
   *  listed under it: they are already a list, and repeating them would print
   *  the same four words twice. */
  claimMark: "script, pacing, dimensions and call to action",
  /** Four placements, split at the document's own sentence boundaries. Each
   *  carries the name of the screen it is drawn on: the sentence says where the
   *  video goes, and the drawing is that place. */
  places: [
    { text: "A homepage explainer may introduce the overall offer.", kind: "homepage" },
    { text: "A product page may need a more detailed demonstration.", kind: "product" },
    {
      text: "Sales teams can use concise versions during presentations and follow-ups.",
      kind: "sales",
    },
    {
      text: "Exhibitions may need a subtitled version that works without sound.",
      kind: "exhibition",
    },
  ] as Place[],
  channelsLead: "Explainer videos can also be prepared for",
  channels: [
    "YouTube",
    "social media",
    "landing pages",
    "email campaigns",
    "paid advertising",
    "training platforms",
    "internal communication channels",
  ],
  /** The discoverability sentence and the limit the document attaches to it.
   *  The two must never be separated: the second is what stops the first
   *  reading as a ranking promise. */
  discovery:
    "A descriptive title, transcript, subtitles and relevant webpage copy also make the subject easier for search engines and AI assistants to understand.",
  /** The four elements, marked as one contiguous run so the sentence is never
   *  broken up: each of these words appears elsewhere on the page, and only the
   *  run as a whole belongs to this claim. */
  discoveryMark: "A descriptive title, transcript, subtitles and relevant webpage copy",
  discoveryCaveat:
    "These elements support discoverability, although they do not guarantee rankings or views.",
  connected:
    "Because ENH also works as a digital marketing agency in Dubai, we can plan how the video connects with landing pages, campaigns and other digital marketing services. Publishing, promotion, and campaign management are stated separately when they are included in the proposal.",
};

export const industries = {
  title: "Industries We Produce",
  strokeTitle: "Explainer Videos For",
  items: [
    "Technology and software",
    "Financial and professional services",
    "Healthcare and medical services",
    "Education and training",
    "Logistics and supply chain",
    "Construction and engineering",
    "Property and real estate",
    "Manufacturing and industrial businesses",
    "Retail and ecommerce",
    "Government and corporate teams",
  ],
  caveat:
    "Technical, financial and regulated subjects may need additional review from your legal, compliance or subject-matter teams before the script is approved.",
  /** Which subjects the note is about, marked where it stands rather than
   *  lifted out into three headings: the document never says which of the ten
   *  industries above falls under which word, and deciding that here would be
   *  a claim made on the client's behalf. */
  caveatMark: "Technical, financial and regulated subjects",
};

/** `plate` names the part of the finished video the promise is about, drawn
 *  from the promise's own nouns. It is a drawing's name, never printed. */
export type PromisePlate =
  | "audience"
  | "script"
  | "storyboard"
  | "style"
  | "check"
  | "rounds"
  | "versions"
  | "language";
export type Promise = { title: string; body: string; plate: PromisePlate };

export const promises = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  items: [
    {
      title: "A defined audience before scripting",
      plate: "audience",
      body: "We establish who needs the explanation and what they should understand before deciding what the video will say.",
    },
    {
      title: "A script written for video",
      plate: "script",
      body: "The wording is developed around speech, timing and visuals instead of transferring paragraphs directly from existing marketing material.",
    },
    {
      title: "Approval before detailed animation",
      plate: "storyboard",
      body: "The script and storyboard are reviewed early, when structural changes are still practical to make.",
    },
    {
      title: "A visual style suited to the subject",
      plate: "style",
      body: "Character animation, motion graphics, screen recordings and filmed material are selected according to what needs explaining.",
    },
    {
      title: "Technical information checked with your team",
      plate: "check",
      body: "Product specifications, processes and regulated claims remain subject to approval from the people responsible for their accuracy.",
    },
    {
      title: "Feedback rounds stated in the quote",
      plate: "rounds",
      body: "The proposal explains how many review stages are included and what has already been approved at each stage.",
    },
    {
      title: "Versions planned together",
      plate: "versions",
      body: "Landscape, square, vertical, subtitled and shorter edits can be produced within the same project when included in the scope.",
    },
    {
      title: "Arabic and English production",
      plate: "language",
      body: "Voiceovers, subtitles and separate language versions can be arranged according to the intended UAE and regional audiences.",
    },
  ] as Promise[],
};

export const faqs: Faq[] = [
  {
    q: "What is an explainer video?",
    a: "An explainer video uses animation, motion graphics, screen recordings, filmed footage or a combination of formats to make a product, service or process easier to understand. It usually focuses on one audience, one main subject and one intended next step.",
  },
  {
    q: "What is included in explainer video production?",
    a: "The service can include research, message development, scriptwriting, storyboarding, illustration, animation, motion graphics, voiceover, music, sound design, subtitles and delivery in the agreed formats. Your proposal will state which elements and revision rounds are included.",
  },
  {
    q: "Are all explainer videos animated?",
    a: "No. Some subjects work best through 2D or 3D animation, while others need screen recordings, product footage, presenters or a combination of production methods. We recommend the format after understanding what needs to be shown.",
  },
  {
    q: "How long should an explainer video be?",
    a: "Many introductory explainers work within one to two minutes, but the right duration depends on the complexity of the subject and where the video will be used. Technical demonstrations, software walkthroughs and training videos may need longer or may work better as a series.",
  },
  {
    q: "Who writes the explainer video script?",
    a: "ENH Marketing can develop the script from your brief, product material and discussions with your team. Your subject experts remain responsible for checking technical information, specifications and regulated claims before the script is approved.",
  },
  {
    q: "Can you match our brand guidelines?",
    a: "Yes. Existing colours, typography, illustration styles, iconography and tone can guide the visual direction. If the brand does not have an established animation style, we can develop appropriate style frames for approval before production continues.",
  },
  {
    q: "Do you provide Arabic voiceovers and subtitles?",
    a: "Arabic and English voiceovers, subtitles and separate language versions can be included. The proposal will confirm whether the project requires translation, Arabic copy adaptation, voiceover recording or bilingual on-screen text.",
  },
  {
    q: "How long does an explainer video take to produce?",
    a: "The timeline depends on the length, animation style, technical complexity and approval process. A straightforward project may take several weeks, while detailed character animation, 3D work or multiple language versions will require a longer schedule.",
  },
  {
    q: "How many rounds of revisions are included?",
    a: "The number of revisions is stated in the proposal. Feedback is normally divided between the script, storyboard and animated draft so major changes are made at the appropriate stage rather than after the full video has been completed.",
  },
  {
    q: "How much does explainer video production cost?",
    a: "The cost depends on the duration, animation style, number of scenes, original illustrations, voiceover, languages, technical complexity and required versions. You will receive a written scope showing the production requirements and deliverables beside the fee.",
  },
  {
    q: "Do we own the finished explainer video?",
    a: "The final approved video is supplied for the uses stated in the agreement. Source files, editable project files, raw recordings and third-party licensed elements may have separate terms, which will be clarified in the proposal.",
  },
  {
    q: "Can you create shorter social media versions?",
    a: "Yes. Short edits can focus on an individual feature, question or benefit from the main explainer. These versions should be planned early so the script, composition and on-screen text work properly in vertical and square formats.",
  },
];

export const finalCta = {
  title: "Explain What Your",
  strokeTitle: "Audience Needs to Know",
  body: "Tell us what you need to explain, who needs to understand it, and where the finished video will be used.",
  note: "We will recommend the production format, realistic duration, approval stages and final versions, with the complete scope stated before scripting begins.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
