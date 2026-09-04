// Interview Video Production — page content.
// Copy source: "Interview Video Production.docx" (client-supplied, 2026-09-03).
// VERBATIM. Do not add copy here.
//
// THE ARGUMENT IS THE ANSWER, NOT THE CAMERA. "The person you want to
// interview may explain their subject perfectly in a meeting. Once the camera
// starts, their answers can become formal, rushed or too detailed to edit into
// a useful video." Everything on this page is about getting a usable answer out
// of someone who already knows the subject.
//
// THE ONE TECHNICAL TEST THE DOCUMENT NAMES. "The questions are written to
// encourage complete answers, so the final video can still make sense when the
// interviewer's voice is removed." That is a pass/fail test on a sentence, and
// it is what the centrepiece draws.
//
// THE PORTFOLIO SECTION IS A GATE, NOT CONTENT: "[Portfolio section using real,
// permissioned ENH interview work.]" Nothing is invented for it; the page
// renders the site's own Work section instead.
//
// FIGURES. The document gives editing ranges -- "approximately five to seven
// working days", "ten to fifteen working days" -- inside one FAQ answer, hedged
// and qualified. They stay in that answer and are never lifted out as a
// promise. No camera count is stated anywhere, because the document declines to
// fix one.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Interview Video Production in Dubai | ENH Marketing",
  description:
    "Film leadership interviews, expert insights, employee stories, training content and video podcasts with every speaker prepared to give clear, natural answers on camera.",
};

export const hero = {
  lines: ["Interview Video", "Production", "in Dubai"] as [string, string, string],
  sub: "Film leadership interviews, expert insights, employee stories, training content and video podcasts with every speaker prepared to give clear, natural answers on camera.",
  primary: "Plan Your Interview Video",
  /** The document's second button says work, so it goes to the work. */
  secondary: "View Our Work",
  secondaryHref: "#work",
};

export const narrative = {
  heading: ["Help People Speak", "Clearly on Camera"] as [string, string],
  scene:
    "The person you want to interview may explain their subject perfectly in a meeting. Once the camera starts, their answers can become formal, rushed or too detailed to edit into a useful video.",
  sceneEmphasis: "too detailed to edit into a useful video",
  agency:
    "ENH Marketing provides interview video production in Dubai for business leaders, subject experts, employees, customers and event speakers. We prepare the subjects, questions, filming setup and final formats before the interview takes place.",
  highlight: ["the subjects", "questions", "filming setup", "final formats"],
  closing:
    "As an interview video production company in Dubai, we guide the conversation without forcing people to memorise a script. The aim is to capture complete answers that sound natural and support the purpose of the video.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type InterviewType = { no: string; title: string; body: string; glyph: GlyphVariant };

/** Seven kinds of interview. */
export const types = {
  title: "The Interview Videos",
  strokeTitle: "Businesses Usually Need",
  items: [
    {
      no: "01",
      title: "Corporate and Leadership Interviews",
      glyph: "structure",
      body: "Corporate interview videos allow founders, executives and spokespeople to explain the company’s direction, decisions and experience. They can support company profiles, leadership updates, investor communication and recruitment. The questions are prepared around the information the audience needs rather than a list of general talking points.",
    },
    {
      no: "02",
      title: "Expert and Thought Leadership Interviews",
      glyph: "answer",
      body: "Subject matter experts can use interviews to explain complex topics, answer common questions and share practical knowledge. The footage can be developed into a full interview, individual answers and short educational clips. This format works well for LinkedIn, YouTube, websites and industry communication.",
    },
    {
      no: "03",
      title: "Training and Tutorial Interviews",
      glyph: "support",
      body: "Training and tutorial videos use internal specialists to explain systems, processes and technical subjects. The interview can be combined with demonstrations, screen recordings, diagrams or workplace footage. Longer subjects can be divided into short modules that employees can watch and revisit when required.",
    },
    {
      no: "04",
      // The document points this one at the testimonial page, which exists.
      title: "Customer and Stakeholder Interviews",
      glyph: "ledger",
      body: "Customers, partners and other stakeholders can explain their experience in their own words. We prepare questions that explore the situation, work completed and result without giving the participant scripted claims.",
    },
    {
      no: "05",
      title: "Employee and Culture Interviews",
      glyph: "audience",
      body: "Employee interviews can support recruitment, onboarding, internal communication and employer branding. The questions may cover roles, working experiences, team culture and career development. Several interviews can be edited together to show different perspectives without making every participant answer the same questions.",
    },
    {
      no: "06",
      title: "Conference and Event Interviews",
      glyph: "catalogue",
      body: "Speakers, exhibitors, organisers and attendees can be interviewed during conferences, exhibitions and corporate events. The schedule and filming location are agreed with the event team in advance. Post-event interview video production can also be arranged when the event programme does not leave enough time for proper conversations.",
    },
    {
      no: "07",
      title: "Video Podcast Production",
      glyph: "conversation",
      body: "Video podcast production can include the filming of hosts, guests and recurring interview episodes. We plan the camera setup, sound, background, episode structure and final formats. Full episodes and short promotional clips can be produced from the same recording session.",
    },
  ] as InterviewType[],
  /** The document's sentence pointing at the testimonial page, which is built. */
  referenceLead:
    "When customer proof is the main objective, the project can also be scoped through our",
  referenceLabel: "Testimonial Video Production",
  referenceHref: "/services/video-marketing/testimonial-video",
  referenceTail: "service.",
};

/** THE CENTREPIECE. How a question is written, and the test it has to pass. */
export const natural = {
  title: "How We Help People",
  strokeTitle: "Give Natural Answers",
  opening:
    "Interview subjects do not usually need a full script. They need to know the subject, purpose, and audience before they sit in front of the camera.",
  prep:
    "We prepare a question set and discuss the main topics with each participant.",
  /** The pass/fail test the whole section turns on. */
  test:
    "The questions are written to encourage complete answers, so the final video can still make sense when the interviewer’s voice is removed.",
  filming:
    "During filming, the interviewer can repeat or reframe a question when an answer is unclear, too long, or missing an important point. Pauses and repeated attempts are normal and are handled during editing. The subject does not need to deliver every answer perfectly in one take.",
  job: "Our job is to create a calm filming environment and collect enough useful material to build a clear final interview.",
};

/** What the edit needs besides the conversation. */
export const around = {
  title: "What Happens",
  strokeTitle: "Around the Interview",
  lead: "The interview is only one part of the finished video. Supporting footage can show the workplace, products, services, team or subject being discussed. This footage helps the edit explain what the speaker is referring to and reduces the amount of time the viewer spends looking at one fixed shot.",
  itemsLead: "The production may also include:",
  items: [
    "A second camera angle",
    "Workplace and process footage",
    "Product demonstrations",
    "Screen recordings",
    "Presentation slides",
    "Photographs and archive material",
    "Titles and lower-third graphics",
    "Subtitles and transcripts",
    "Licensed music",
    "Animation and infographic elements",
  ],
  tail: "Each supporting element will be agreed before filming or added separately to the post-production scope.",
};

/** One session, several videos. */
export const versions = {
  title: "One Interview Can",
  strokeTitle: "Produce Several Videos",
  claim: "A recorded conversation does not need to become one long video.",
  /** The document's four, split at its own commas so the drawing labels each
   *  branch with the client's wording rather than ours. Only two of the four
   *  are ranked by the document -- the long-form interview against the short
   *  social video -- so nothing on the page orders the middle two. */
  outputsLead: "The same session can produce",
  outputs: [
    "a full interview",
    "a shorter highlights edit",
    "separate answers",
    "vertical clips for social media",
  ],
  /** Six destinations, split the same way. The document never says which
   *  version goes where, so nothing maps them to each other. */
  placesLead: "Different versions can be prepared for",
  places: [
    "a website",
    "YouTube",
    "LinkedIn",
    "internal communication",
    "recruitment",
    "paid campaigns",
  ],
  consequence:
    "Planning these outputs before filming changes the questions and camera framing. A short social video needs a more direct answer than a detailed long-form interview.",
  support:
    "Our interview video editing and distribution support can also include titles, captions, transcripts, platform descriptions and delivery in the required dimensions. Publishing and promotion are included when relevant digital marketing services are added to the scope.",
};

export const industries = {
  title: "Industries We",
  strokeTitle: "Produce Interviews For",
  items: [
    "Corporate and professional services",
    "Healthcare and medical organisations",
    "Education and training providers",
    "Technology and B2B companies",
    "Oil, gas and energy",
    "Construction and engineering",
    "Logistics and supply chain",
    "Real estate and development",
    "Hospitality and retail",
    "Conferences and exhibitions",
    "Public and community organisations",
  ],
};

export type Promise = { title: string; body: string };

export const promises = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  lead: "Our interview video production services cover the preparation, filming and editing needed to turn a conversation into usable content.",
  items: [
    { title: "An interview brief before filming", body: "We confirm the audience, subject, purpose and final platforms before preparing the questions." },
    { title: "Questions developed around the objective", body: "Each question is designed to produce an answer that can be understood and edited clearly." },
    { title: "Speaker preparation", body: "Participants receive guidance on the filming process, clothing, timing and how to approach their answers without memorising lines." },
    { title: "A suitable interview setup", body: "We plan the location, background, lighting, camera angles and sound according to the speaker and visual style." },
    { title: "Professional audio recording", body: "Separate microphones are used so the interview does not depend on sound recorded by the camera." },
    { title: "Relevant supporting footage", body: "Workplace, product, process or event footage can be included when it helps explain the interview." },
    { title: "Full-service video post-production", body: "Editing, colour correction, sound, graphics, subtitles, transcripts and licensed music are included according to the proposal." },
    { title: "Multiple final versions", body: "Full interviews, highlights and social media clips can be delivered from the same filming session." },
    { title: "Arabic and English production", body: "Interviews can be filmed and delivered in either language, with subtitles or translated versions where required." },
  ] as Promise[],
};

export const faqs: Faq[] = [
  { q: "What is included in interview video production?", a: "Interview video production can include the brief, research, question development, speaker preparation, location planning, filming, sound recording, supporting footage, editing, graphics, music, subtitles, transcripts and final delivery. The exact number of interviews, filming hours and finished videos will be stated in the proposal." },
  { q: "Do interview subjects need to memorise a script?", a: "No. Most interviews work better with an approved topic and question set rather than memorised answers. We prepare the speaker beforehand and guide the conversation during filming. Scripts may still be used for formal announcements or information that must be delivered exactly." },
  { q: "How do you prepare someone who is nervous on camera?", a: "We explain the process before filming and allow the participant time to become comfortable with the setup. Questions can be repeated, and answers can be recorded more than once. The speaker does not need to complete the entire interview without stopping." },
  { q: "Where can the interview be filmed?", a: "Interviews can be filmed at your office, workplace, event venue or another approved location. A studio can also be arranged when the project needs a controlled background and sound environment. The location is reviewed for space, noise, lighting, access and filming permissions before the shoot." },
  { q: "How long does interview video production take?", a: "A straightforward interview can usually be filmed within one day. The existing project scope allows approximately five to seven working days for editing, while larger productions may require ten to fifteen working days. The confirmed timeline depends on the number of speakers, supporting footage, graphics, final versions, and the approval process." },
  { q: "Do you use one camera or multiple cameras?", a: "A single-camera setup may suit a short, direct interview. Two or more cameras allow the edit to move between angles and can help remove pauses or repeated answers more smoothly. The recommended setup will depend on the interview style, location and budget." },
  { q: "Can you film supporting footage as well?", a: "Yes. Supporting footage can show the speaker working, the business location, employees, products, services or processes being discussed. The required footage is planned before the shoot so enough time and access can be arranged." },
  { q: "Can you record remote or hybrid interviews?", a: "Yes. Remote interviews and hybrid productions can be included when participants are in different locations. The final quality will depend on the participant’s camera, microphone, internet connection and filming environment. We will explain the expected limitations before recording." },
  { q: "Do we need a filming permit for an interview in Dubai?", a: "Commercial filming in Dubai generally requires a filming permit, including work completed at private locations. A UAE-licensed production company must apply, and the location owner may need to provide approval. Additional permissions may be required for certain venues, outdoor locations or drone filming." },
  { q: "How much does interview video production cost?", a: "Pricing depends on the number of interviewees, filming location, crew, camera setup, supporting footage, video length, graphics, subtitles and turnaround. Your quote will show the filming and post-production deliverables clearly. Additional locations and versions will be listed separately." },
  { q: "Can one interview be turned into social media videos?", a: "Yes. A long interview can be edited into individual answers, short highlights and vertical social media clips. The required versions should be agreed before filming so the questions and framing work for both long-form and short-form content." },
  { q: "Do we own the finished interview and raw footage?", a: "The final approved videos are supplied with the usage rights stated in the agreement. Raw footage and editable project files are provided only when included in the proposal. Music, stock footage and other licensed elements remain subject to their own usage terms." },
];

/** The document's closing block. It now feeds BOTH calls to action on the
 *  page and is split so no sentence is printed twice: the mid-page GrowthCta
 *  takes the heading and `body`, the closing CtaBand takes the heading and
 *  `note`. Only the heading appears in both, which is what a heading on two
 *  calls to action is for. */
export const finalCta = {
  title: "Plan Your",
  strokeTitle: "Interview Video",
  body: "Tell us who needs to be interviewed, what they need to discuss and where the video will be used.",
  note: "We will recommend the questions, location, camera setup and final formats, then provide a timeline and quote with the scope written clearly. If an interview is not the right format for the message, we will recommend a better production approach.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
