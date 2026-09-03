// Corporate Video Production — page content.
// Copy source: "Corporate Video Production.docx" (client-supplied, 2026-09-03).
// VERBATIM. Headings are the document's own, split across lines only for
// typesetting. Do not add copy here: no invented labels, figures or CTA
// microcopy.
//
// THE ONE FIGURE, AND ITS CAVEAT. The document gives a single audience number
// and immediately qualifies it: YouTube "could reach approximately 8.37 million
// users in the UAE in late 2025", followed by "This is advertising reach data
// and should not be treated as a confirmed count of monthly active users." The
// caveat travels with the figure everywhere it appears. It is reach, not users,
// and the page must not round it, restate it as a user count, or print it
// without the qualifier.
//
// The other numbers are timeframes the document hedges: four to six weeks for a
// company profile film, one to two weeks for something straightforward, three
// to ten minutes for a training video, two revision rounds. Each is written
// with its own condition and none is used as a promise.
//
// PORTFOLIO IS A GATE, NOT CONTENT. The document's "Corporate Videos We Have
// Produced" section contains only an instruction: "[Portfolio section using
// existing, permissioned ENH work.]" No portfolio is exported here and no
// section invents one. The page uses the site's existing Work section, which
// draws on real client entries, and nothing else claims a production credit.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Corporate Video Production in Dubai | ENH Marketing",
  description:
    "Create company profile films, training videos, brand stories, explainers, testimonials and event videos with every shoot planned around its audience, purpose and distribution.",
};

export const hero = {
  lines: ["Corporate Video", "Production", "in Dubai"] as [string, string, string],
  sub: "Create company profile films, training videos, brand stories, explainers, testimonials and event videos with every shoot planned around its audience, purpose and distribution.",
  primary: "Plan Your Video Project",
  secondary: "Talk To Our Experts",
};

/** The opening argument: a good film with no decision behind it. */
export const narrative = {
  heading: ["Give Every Corporate Video", "a Clear Job"] as [string, string],
  scene:
    "A company profile video gets commissioned, filmed over two days, delivered, posted once on LinkedIn, and then sits on a drive. The production itself may be good. What was missing was a clear decision about who it was for and where it would be used.",
  sceneEmphasis: "sits on a drive",
  agency:
    "ENH Marketing handles corporate video production in Dubai for UAE businesses. We produce company profile films, training videos, internal communications, brand films, product explainers, testimonials and event content from the first concept through to the final files.",
  /** The seven formats the sentence above already names, marked inside it
   *  rather than listed again above the section that expands them. */
  highlight: [
    "company profile films",
    "training videos",
    "internal communications",
    "brand films",
    "product explainers",
    "testimonials",
    "event content",
  ],
  closing:
    "As a corporate video company in Dubai with more than 15 years of experience, we plan the distribution alongside the production. This helps each video support a clear business purpose after delivery.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type VideoType = { no: string; title: string; body: string; glyph: GlyphVariant };

/** Eight formats. The glyphs are a reading of each format's own sentence. */
export const formats = {
  title: "The Video Companies",
  strokeTitle: "in Dubai Usually Need",
  items: [
    {
      no: "01",
      title: "Company Profile Video",
      glyph: "structure",
      body: "A company profile video in Dubai introduces your business, services, people and capabilities. It can be used on your website, in sales presentations, at exhibitions and within tenders. The content is planned around the information your customers, partners or investors need to understand.",
    },
    {
      no: "02",
      title: "Training Video Production",
      glyph: "sequence",
      body: "Training video production in Dubai can cover onboarding, safety, systems, equipment and internal processes. It gives employees consistent information and reduces the need to repeat the same sessions. Longer subjects can be divided into short modules that are easier to watch and revisit.",
    },
    {
      no: "03",
      title: "Internal Communications Video",
      glyph: "support",
      body: "An internal communications video in Dubai can deliver leadership updates, policy changes, company announcements and culture messages. It is particularly useful for organisations working across different locations, departments or shifts. The format can include interviews, presentations, demonstrations and supporting graphics.",
    },
    {
      no: "04",
      title: "Brand Video Production",
      glyph: "creative",
      body: "Brand video production in Dubai focuses on the company's purpose, values and wider story. It can support recruitment, brand awareness and campaigns where businesses need to show what makes them different. The concept, script, visuals and music are developed around the approved brand direction.",
    },
    {
      no: "05",
      title: "Product and Explainer Video",
      glyph: "catalogue",
      body: "Product videos demonstrate features, benefits and practical use before someone buys, recommends or specifies the product. Explainer videos can combine filmed demonstrations, interviews, graphics and animation to simplify detailed information. Separate edits can also be prepared for websites, exhibitions and paid campaigns.",
    },
    {
      no: "06",
      title: "Testimonial and Case Study Video",
      glyph: "conversation",
      body: "Testimonial and interview videos allow clients, employees and subject experts to explain their experiences in their own words. We prepare the questions, organise the setup and guide the conversation without giving participants scripted claims. These videos can support sales pages, case studies, recruitment and company communications.",
    },
    {
      no: "07",
      title: "Event and Exhibition Video",
      glyph: "fanout",
      body: "Event and exhibition videos capture presentations, interviews, demonstrations and activity throughout the day. The footage can be edited into a main event film, short highlights and social media content. Planning the required versions before filming ensures the crew captures the material needed for each format.",
    },
    {
      no: "08",
      title: "CSR and Corporate Initiative Video",
      glyph: "ledger",
      body: "CSR videos cover sustainability, community programmes, charitable work and other corporate initiatives. They can document what took place, explain the purpose and include the people involved. The production should use accurate information and avoid presenting an initiative as larger or more effective than the available evidence supports.",
    },
  ] as VideoType[],
};

export type Destination = { name: string; body: string };
export type Version = { name: string; ratio: [number, number]; subtitled?: boolean };

/** The page's argument. The document's claim is causal and it comes first:
 *  distribution decided before the shoot, because it changes what gets filmed. */
export const distribution = {
  title: "Where the Video Goes",
  strokeTitle: "After Delivery",
  claim:
    "Distribution should be decided before the shoot because it affects the script, framing, duration, and footage required.",
  /** The five destinations, split out of the document's single paragraph. Each
   *  keeps its own sentence; nothing is summarised or re-worded. */
  destinations: [
    {
      name: "Your website",
      body: "may need a main company film and shorter videos for individual service pages.",
    },
    {
      name: "YouTube",
      body: "can host the full version and help people find it through search.",
    },
    {
      name: "LinkedIn",
      body: "can support B2B marketing, recruitment and company updates.",
    },
    {
      name: "Internal systems",
      body: "may need training or communications versions,",
    },
    {
      name: "Paid campaigns",
      body: "usually require shorter edits with faster openings.",
    },
  ] as Destination[],
  /** The one audience figure, and the qualifier that must never be separated
   *  from it. Reconstruction: reach + " " + reachCaveat. */
  reach:
    "Google's advertising resources indicated that YouTube could reach approximately 8.37 million users in the UAE in late 2025.",
  reachFigure: "8.37 million",
  reachCaveat:
    "This is advertising reach data and should not be treated as a confirmed count of monthly active users.",
  discoveryLead:
    "There is also a discoverability layer. A descriptive title, transcript, chapters and relevant video schema can help search engines and AI assistants understand the subject.",
  /** The four the sentence above names, marked in place. */
  discoveryItems: ["descriptive title", "transcript", "chapters", "relevant video schema"],
  /** The document points at another ENH page here. That page is built. */
  discoveryLink: { label: "AEO and GEO services", href: "/services/seo/aeo-and-geo" },
  discoveryTail: "cover this work in more detail.",
  /** Four versions from one shoot. The ratios are the standard frames those
   *  names refer to; the document names the versions, not the numbers, so the
   *  ratios are presentation only and never printed as a claim. */
  versionsLead:
    "We plan the landscape, vertical, square and subtitled versions before filming.",
  versions: [
    { name: "Landscape", ratio: [16, 9] },
    { name: "Vertical", ratio: [9, 16] },
    { name: "Square", ratio: [1, 1] },
    { name: "Subtitled", ratio: [16, 9], subtitled: true },
  ] as Version[],
  versionsTail:
    "Producing these while the project is still open is more efficient than returning to the footage months later.",
};

export const industries = {
  title: "Industries",
  strokeTitle: "We Film For",
  items: [
    "Oil, gas and energy",
    "Construction and engineering",
    "Logistics and supply chain",
    "Healthcare and clinics",
    "Education and training providers",
    "Real estate and development",
    "Manufacturing and industrial",
    "Financial and professional services",
    "Hospitality and retail",
    "Technology and corporate services",
    "Events and exhibitions",
  ],
};

export type Promise = { title: string; body: string };

export const promises = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  lead: "Business video production across the UAE can involve several locations, approval teams, languages and final formats. Our proposal sets these requirements out before production begins.",
  items: [
    {
      title: "A clear brief before the camera",
      body: "We confirm the purpose, audience, message and distribution before quoting because these decisions affect the concept and production requirements.",
    },
    {
      title: "Concept, script and storyboard support",
      body: "We develop the creative direction and obtain approval before filming, reducing the risk of avoidable changes during post-production.",
    },
    {
      title: "Permits and location clearances",
      body: "We coordinate the filming permit application and relevant location permissions included in the agreed production scope.",
    },
    {
      title: "Professional filming and sound",
      body: "The camera, lighting, stabilisation and audio setup are selected according to the location, subject and final use of the video.",
    },
    {
      title: "Revision rounds stated in the quote",
      body: "The approval process is agreed before work begins so the project does not enter an undefined editing cycle.",
    },
    {
      title: "Every required version planned together",
      body: "Landscape, vertical, square and subtitled edits are produced according to the deliverables listed in the proposal.",
    },
    {
      title: "Marketing specialists involved in the brief",
      body: "ENH is also a digital marketing agency in Dubai, so the team can consider how the footage will support your campaigns and other digital marketing services.",
    },
    {
      title: "Arabic and English delivery",
      body: "Separate versions, subtitles, or voiceovers can be included according to the audience and distribution channels.",
    },
  ] as Promise[],
};

export const faqs: Faq[] = [
  {
    q: "What is included in corporate video production?",
    a: "Our corporate video production Dubai service can include consultation, concept development, scriptwriting, storyboarding, production planning, filming, editing, colour grading, sound, graphics, licensed music and delivery in the agreed formats. Permits, location clearances, travel, presenters and specialist equipment will be stated separately in the proposal where required.",
  },
  {
    q: "How long does a company profile video take to produce?",
    a: "A standard company profile video usually takes around four to six weeks from the approved brief to final delivery. This includes planning, scripting, filming, editing and feedback. A one-to-two-week turnaround may be possible for a straightforward project. The final timeline depends on the locations, permit requirements, production complexity and approval speed.",
  },
  {
    q: "Do we need a filming permit in Dubai?",
    a: "Commercial filming in Dubai generally requires a filming permit. The Dubai Film and TV Commission states that individuals and businesses wishing to film in Dubai must appoint a UAE-licensed production company to obtain the permit. Permits apply across government-operated and private locations, and private locations require approval from the location owner. Additional permissions may be needed for certain locations or aerial filming.",
  },
  {
    q: "What equipment do you use for corporate video shoots?",
    a: "We use professional cinema cameras, lenses, lighting, stabilisers and separate audio equipment. The exact setup is chosen according to the location, concept and final delivery requirements. Drone filming, additional cameras and specialist production equipment can be included when the project requires them and the necessary permissions are available.",
  },
  {
    q: "How long should a training video be?",
    a: "Most training videos work well between three and ten minutes, although the right length depends on the subject. Detailed training is usually easier to follow when divided into shorter modules. The structure should give employees enough information to complete the task without adding content that does not support the learning objective.",
  },
  {
    q: "Who writes the video script?",
    a: "We can prepare the concept, script and storyboard as part of the production scope. Your team reviews and approves them before filming. Interviews are usually handled through an approved question set rather than a word-for-word script. This helps participants give complete answers while sounding natural.",
  },
  {
    q: "How many rounds of revisions are included?",
    a: "Two revision rounds are normally included, with the exact allowance stated in the quote. Additional rounds can be added when the project has a longer internal approval chain. Consolidated feedback from the client helps keep the project within the agreed timeline.",
  },
  {
    q: "Do we own the finished video and raw footage?",
    a: "The final approved video is supplied with the usage rights stated in the agreement. Raw footage and editable project files are included only when listed in the proposal. Music, stock footage, fonts and other licensed elements remain subject to their individual terms. Wider paid advertising or international use may require suitable licences.",
  },
  {
    q: "Can you produce videos in Arabic and English?",
    a: "Yes. Bilingual business video production in the UAE can be delivered as separate Arabic and English versions, subtitles or voiceovers. The right approach depends on the audience, speaker, platform and amount of on-screen information. The required language versions will be agreed before production.",
  },
  {
    q: "Can we get social media versions from the same shoot?",
    a: "Yes. We can produce vertical, square and shorter social media versions from the same shoot when they are included in the original brief. Planning them before filming allows the crew to frame and capture suitable footage for each format instead of cropping a completed landscape video afterwards.",
  },
];

export const finalCta = {
  title: "Tell Us What",
  strokeTitle: "the Video Needs to Do",
  body: "Tell us what you want to achieve, who needs to watch the video, and where it will be used.",
  note: "We will prepare a suitable production approach, a realistic timeline that includes permit requirements and a quote with the deliverables written clearly. If another content format would suit the objective better, we will explain that before the project begins.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
