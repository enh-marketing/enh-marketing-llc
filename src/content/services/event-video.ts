// Event Video Production — page content.
// Copy source: "Event Video Production.docx" (client-supplied, 2026-09-03).
// VERBATIM. Headings are the document's own, split across lines only for
// typesetting. Do not add copy here: no invented labels, figures or CTA
// microcopy.
//
// THE ARGUMENT IS SIMULTANEITY, NOT EQUIPMENT. The opening is precise about
// this: a conference "may have a keynote on stage, demonstrations in the
// exhibition area, interviews with speakers, and conversations between
// attendees happening at the same time. One camera with no coverage plan will
// miss something important." The problem is that an event runs in parallel and
// a camera cannot. That is why the page draws concurrent tracks rather than a
// list of kit, and why the section that matters most is the one about deciding
// deliverables before the day.
//
// NO CAMERA COUNT IS EVER STATED. The document refuses to fix one: the number
// "is based on the venue, programme and required deliverables", and the FAQ
// says a single camera may be enough for a short presentation while
// conferences "usually need more than one". So no drawing on this page counts
// cameras, crew or days, and the venue plan shows positions as a shape rather
// than as a quantity.
//
// THE ONE SOURCED CLAIM. FAQ 7 cites a named authority: "The Dubai Film and TV
// Commission states that a UAE-licensed production company must apply for the
// filming permit." It is carried exactly as written, in the FAQ where the
// document puts it, and it is not repeated elsewhere on the page or restated
// in looser words.
//
// THE ONE TIMEFRAME. "Booking four to six weeks before an average event" is
// the document's only interval, and it is hedged ("usually gives enough time")
// and immediately qualified for large events. It stays inside its FAQ answer
// and is never lifted out as a headline promise.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Event Video Production in Dubai | ENH Marketing",
  description:
    "Plan professional coverage for conferences, exhibitions, product launches, seminars, workshops, and corporate events, with every required video agreed before the event begins.",
};

export const hero = {
  lines: ["Event Video", "Production", "in Dubai"] as [string, string, string],
  sub: "Plan professional coverage for conferences, exhibitions, product launches, seminars, workshops, and corporate events, with every required video agreed before the event begins.",
  primary: "Plan Your Event Video",
  /** The document's own second button. It says portfolio, so it goes to the
   *  portfolio: this page's Work section, which draws on real client entries.
   *  It must not dial a phone number, which is what the default second button
   *  does. See ServiceHero's secondaryHref. */
  secondary: "View Our Portfolio",
  secondaryHref: "#work",
};

/** The opening. A simultaneity problem, stated without a single number. */
export const narrative = {
  heading: ["Plan the Coverage", "Before the Event Begins"] as [string, string],
  scene:
    "A conference may have a keynote on stage, demonstrations in the exhibition area, interviews with speakers, and conversations between attendees happening at the same time. One camera with no coverage plan will miss something important.",
  sceneEmphasis: "at the same time",
  agency:
    "ENH Marketing provides event video production in Dubai for conferences, trade shows, exhibitions, product launches, seminars, workshops and corporate occasions. We plan the schedule, camera positions, sound, interviews and final deliverables before the event begins. Our event video production company in Dubai can produce full recordings, highlight films, speaker clips, testimonials, social media edits and live streams from the same event.",
  /** Marked inside the agency paragraph: the five things settled in advance.
   *  They are the whole service, and the section beneath expands them. */
  highlight: [
    "the schedule",
    "camera positions",
    "sound",
    "interviews",
    "final deliverables",
  ],
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type EventType = { no: string; title: string; body: string; glyph: GlyphVariant };

/** Six kinds of event, each with its own coverage problem. */
export const events = {
  title: "The Events Businesses",
  strokeTitle: "Usually Need Filmed",
  items: [
    {
      no: "01",
      title: "Conference Video Production",
      glyph: "audience",
      body: "Conference coverage can include keynote speeches, panel discussions, audience questions, and speaker interviews. For conference video in Dubai, we agree which sessions need full recordings and which moments should appear in the highlights. This ensures the camera and sound setup matches the event schedule.",
    },
    {
      no: "02",
      title: "Trade Show Video Production",
      glyph: "catalogue",
      body: "Trade show videos can cover stands, product demonstrations, interviews and conversations across the exhibition floor. The footage can be used to promote the current event, support exhibitors and attract attendees to the next edition. Short daily edits can also be included when fast delivery is required.",
    },
    {
      no: "03",
      title: "Exhibition Video Production",
      glyph: "structure",
      body: "An exhibition video in Dubai can document the space, featured work, visitors, speakers and participating organisations. The coverage may include a main event film, interviews and short platform-specific edits. We coordinate with the organiser and venue so the filming does not interrupt visitor movement.",
    },
    {
      no: "04",
      title: "Product Launch Video Production",
      glyph: "generate",
      body: "A product launch video in Dubai records the presentation, demonstration and audience response while giving the product enough visual attention. The same footage can support launch coverage, sales presentations and future campaigns. Product details and approved claims are confirmed before the event.",
    },
    {
      no: "05",
      title: "Seminar and Workshop Video Production",
      glyph: "sequence",
      body: "Seminars and workshops often need both documentation and useful learning content. A seminar video in Dubai may focus on the speaker and presentation, while a workshop video may need close views of demonstrations and participant activity. Longer sessions can be divided into individual topics after the event.",
    },
    {
      no: "06",
      title: "Awards and Corporate Event Video",
      glyph: "creative",
      body: "Awards ceremonies, company celebrations and corporate gatherings usually require stage coverage, attendee footage and planned interviews. We coordinate with the event team to understand the programme and key people. The final content can include a highlights film, complete speeches and short internal or social media edits.",
    },
  ] as EventType[],
};

export type Capability = {
  title: string;
  body: string;
  before: string;
  /** Which drawing the run leads the card with. A drawing choice, not a claim:
   *  none of them counts cameras, crew or days. */
  preview: "angles" | "cut" | "live" | "chairs" | "shapes" | "options";
};

/** Six things the coverage itself can include. Set apart from the six event
 *  types above, which are occasions rather than capabilities.
 *
 *  EVERY ONE OF THE SIX CARRIES A PRECONDITION, and `before` is the clause that
 *  states it, verbatim and in place. That is not a coincidence in the copy: the
 *  page is called "Plan the Coverage Before the Event Begins", and each
 *  capability names the thing that has to be settled for it to be possible on
 *  the day -- audio feeds planned, length and delivery agreed, venue internet
 *  checked, questions written, vertical framing planned during filming, each
 *  specialist item priced separately. Marked rather than extracted, so the
 *  paragraph still reads exactly as written. */
export const coverage = {
  title: "What Event Video",
  strokeTitle: "Coverage Can Include",
  items: [
    {
      title: "Multi-Camera Event Recording",
      preview: "angles",
      body: "Multiple cameras can cover the stage, speakers, audience and other activity without depending on one fixed view. The number of cameras is based on the venue, programme and required deliverables. Separate audio feeds are planned for speeches, panels and presentations.",
      before: "Separate audio feeds are planned for speeches, panels and presentations.",
    },
    {
      title: "Event Highlights Reel",
      preview: "cut",
      body: "An event highlights reel is usually a short edit covering the most useful moments, people and activity. It can be prepared for websites, YouTube, LinkedIn and future event promotion. The required length, style and delivery date are agreed before filming.",
      before: "The required length, style and delivery date are agreed before filming.",
    },
    {
      title: "Live Streaming and Hybrid Events",
      preview: "live",
      body: "Live streaming allows remote viewers to follow the event through an approved platform or website. The setup may include multiple cameras, presentation feeds, graphics and separate audio. Venue internet, technical access, platform requirements and backup arrangements must be checked in advance.",
      before: "Venue internet, technical access, platform requirements and backup arrangements must be checked in advance.",
    },
    {
      title: "Interviews and Testimonials",
      preview: "chairs",
      body: "Speakers, organisers, sponsors and attendees can be interviewed during the event. We prepare a question set and identify a suitable filming area with controlled sound. Interviews can appear in the main event film or be delivered as separate case study and social media videos.",
      before: "We prepare a question set and identify a suitable filming area with controlled sound.",
    },
    {
      title: "Social Media Video Edits",
      preview: "shapes",
      body: "One event can supply several short videos for Instagram, LinkedIn, TikTok, Facebook and YouTube. Vertical and square framing is planned during filming so the final content does not rely on cropping landscape footage. Same-day or next-day edits can be scoped when required.",
      before: "Vertical and square framing is planned during filming so the final content does not rely on cropping landscape footage.",
    },
    {
      title: "Specialist Production Options",
      preview: "options",
      body: "Drone videography, time-lapse, stop motion, green screen, 360 video, VR capture, graphic overlays and screen management can be added when suitable. These services depend on the venue, event programme, technical requirements and necessary permissions. Each specialist item will be shown separately in the quote.",
      before: "Each specialist item will be shown separately in the quote.",
    },
  ] as Capability[],
};

/** THE CENTREPIECE. The document's argument that the deliverables decide the
 *  shoot, not the other way round, plus the three worked examples it gives and
 *  the eight outputs one event can produce. */
export const plan = {
  title: "Decide the Deliverables",
  strokeTitle: "Before Event Day",
  claim:
    "The event coverage plan should state what needs to be delivered, rather than simply asking the crew to film everything.",
  /** Three events, three different answers, each split at its own commas so
   *  the section can show that the same day produces different lists. Read a
   *  case's lead and its items in order and the sentence is back as written. */
  cases: [
    {
      lead: "A conference may need",
      items: ["complete recordings of each session", "a three-minute highlights film", "individual speaker clips"],
    },
    {
      lead: "An exhibition may need",
      items: ["daily social content", "exhibitor interviews", "a promotional video for next year"],
    },
    {
      lead: "A product launch may need",
      items: ["a fast media edit", "a longer campaign version"],
    },
  ] as { lead: string; items: string[] }[],
  /** And what those choices change, at the document's own commas. */
  consequenceLead: "These decisions affect",
  affects: ["the number of cameras", "crew positions", "audio sources", "footage required"],
  consequenceAlso:
    "They also determine whether interviews need to happen during the event and how quickly the first edits must be delivered.",
  outputsLead: "ENH can prepare the following from one event:",
  outputs: [
    "Full session or presentation recordings",
    "A main event highlights video",
    "Individual speaker and panel clips",
    "Interviews and testimonials",
    "Vertical and square social media edits",
    "Sponsor or partner versions",
    "Videos for internal communication",
    "Promotional edits for the next event",
  ],
  outputsTail:
    "The exact number, length and format of the videos will be stated before the event.",
};

/** Where the finished videos go, and the limit on what can be measured. */
export const distribution = {
  title: "Where Your Event",
  strokeTitle: "Videos Can Be Used",
  /** THE LEAD IS A MAP, NOT A PARAGRAPH. It pairs four kinds of video with
   *  where each one goes, and reading a row's three parts in order gives the
   *  sentence back word for word. The verbs differ between rows and are kept:
   *  a highlights film sits somewhere, sessions are shared with people, clips
   *  support something. */
  routes: [
    {
      what: "The main highlights film",
      verb: "can sit on",
      where: ["the website", "company YouTube channel", "event page"],
    },
    {
      what: "Full sessions",
      verb: "can be shared with",
      where: ["attendees", "employees", "people who could not attend"],
    },
    { what: "Speaker clips", verb: "can support", where: ["LinkedIn content"] },
    { what: "short vertical videos", verb: "can be used across", where: ["social platforms"] },
  ] as { what: string; verb: string; where: string[] }[],
  supportLead: "Footage can also support",
  supportUses: ["email campaigns", "sales presentations", "sponsor reporting", "paid promotion"],
  supportTail:
    "When ENH's digital marketing services are included, the production team can plan the video formats around the campaigns that will use them.",
  /** The measurement sentence and its limit, kept together. */
  measure:
    "Views, watch time, engagement and website activity can then be monitored through the relevant platforms. The measurement available will depend on where the video is published and whether campaign tracking is included.",
  /** The limit the section will not go past. */
  measureMark:
    "will depend on where the video is published and whether campaign tracking is included",
};

export const sectors = {
  title: "Events and",
  strokeTitle: "Sectors We Cover",
  items: [
    "Business conferences and summits",
    "Trade shows and exhibitions",
    "Product and service launches",
    "Seminars and workshops",
    "Awards ceremonies",
    "Corporate celebrations",
    "Retail and hospitality events",
    "Healthcare and educational events",
    "Industry demonstrations",
    "CSR and community initiatives",
    "Virtual and hybrid events",
  ],
};

/** THE LEAD SORTS THIS SECTION AND IT HAD BEEN READ AS A SENTENCE: the scope
 *  "covers what needs to happen before, during and after the event". The event
 *  itself is a point, not a phase -- arriving with a camera is the one part
 *  everybody already assumes -- so `side` records which side of that point each
 *  promise falls on, off its own verb:
 *    1 "before deciding the crew and equipment"        before
 *    2 "checked before event day"                      before
 *    3 "confirm access times ... loading arrangements" before
 *    4 permits and approvals coordinated               before
 *    5 "agreed with the event team"                    before
 *    6 "confirmed before production begins"            before
 *    7 "prepared while the project is active"          after
 *    8 separate edits and subtitles delivered          after
 *  Six on one side of the day and two on the other is the section's own point,
 *  and the shape says it without a word being added. */
export type Promise = { title: string; body: string; side: "before" | "after" };

export const promises = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  lead: "Professional event videography services in Dubai require more than arriving with a camera. Our scope covers what needs to happen before, during and after the event.",
  /** The claim the shape of the section is there to prove. */
  leadMark: "more than arriving with a camera",
  /** The point the promises sit either side of, in the lead's own words. */
  eventLabel: "the event",
  items: [
    {
      title: "A coverage plan based on the programme",
      body: "We review the event schedule, venue and required videos before deciding the crew and equipment.",
      side: "before",
    },
    {
      title: "Camera and audio requirements agreed early",
      body: "Stage feeds, microphones, presentations and audience coverage are checked before event day.",
      side: "before",
    },
    {
      title: "Coordination with the organiser and venue",
      body: "We confirm access times, camera positions, power, internet, loading arrangements and filming restrictions.",
      side: "before",
    },
    {
      title: "Permits and location approvals",
      body: "We coordinate the filming permissions included in the scope and identify when the venue or specialist filming requires additional approval.",
      side: "before",
    },
    {
      title: "Interview planning",
      body: "The speakers, questions, filming location and available time are agreed with the event team.",
      side: "before",
    },
    {
      title: "Editing and feedback stated in the quote",
      body: "The deliverables, turnaround and revision rounds are confirmed before production begins.",
      side: "before",
    },
    {
      title: "Every version produced together",
      body: "Full recordings, highlights, social edits and subtitled versions are prepared while the project is active.",
      side: "after",
    },
    {
      title: "Arabic and English delivery",
      body: "Separate edits, subtitles, graphics or voiceovers can be included when required.",
      side: "after",
    },
  ] as Promise[],
};

export const faqs: Faq[] = [
  {
    q: "What is included in event video production services?",
    a: "Our event video production Dubai service can include planning, venue coordination, camera and sound setup, filming, interviews, editing, colour correction, licensed music, graphics, subtitles and delivery in the agreed formats. Live streaming, drone filming, same-day edits, additional cameras and specialist equipment are included only when shown in the proposal.",
  },
  {
    q: "What affects event videography pricing in Dubai?",
    a: "Event videography pricing depends on the event duration, venue, crew size, number of cameras, audio requirements and final deliverables. Live streaming, rapid delivery, animation, drone filming, travel and specialist production can also affect the fee. The quote will show each major requirement beside its cost.",
  },
  {
    q: "How far in advance should we book an event videographer?",
    a: "Booking four to six weeks before an average event usually gives enough time for planning, venue coordination and equipment preparation. Large conferences, exhibitions and international events may need to be booked several months ahead, particularly when multiple crews, live streaming or specialist permissions are required.",
  },
  {
    q: "How many cameras will our event need?",
    a: "A single camera may be enough for a short presentation with one fixed speaker. Conferences, panel discussions and live performances usually need more than one camera to cover the stage, speakers and audience properly. We recommend the camera setup after reviewing the venue layout, programme and required videos.",
  },
  {
    q: "What is the difference between a highlights video and a full event recording?",
    a: "A highlights video is a short, edited summary showing selected moments, speakers, attendees and event activity. It is usually used for promotion and social media. A full event recording preserves complete speeches, presentations or sessions. Both versions can be produced from the same event when they are planned in advance.",
  },
  {
    q: "Can you live-stream our event?",
    a: "Yes. Live streaming can be included for conferences, seminars, launches and hybrid events. The platform, venue internet, camera setup, audio feeds, presentation content and backup requirements must be confirmed before the event. A technical test may be required.",
  },
  {
    q: "Do we need a filming permit for an event in Dubai?",
    a: "Commercial filming in Dubai generally requires a permit. The Dubai Film and TV Commission states that a UAE-licensed production company must apply for the filming permit. The venue may also require an approval or no-objection letter, and additional permission may be needed for drones or certain locations.",
  },
  {
    q: "How quickly will we receive the event video?",
    a: "The delivery schedule depends on the number and complexity of the required edits. Same-day or next-day social media videos can be arranged when planned in advance. The main highlights film and full recordings will follow the delivery timeline stated in the quote.",
  },
  {
    q: "Which video formats will we receive?",
    a: "Most finished event videos are supplied as MP4 files in the required resolution and aspect ratio. Other formats can be provided when a platform, archive or editing workflow requires them. The proposal will state the resolution, orientation and versions included.",
  },
  {
    q: "Can we get social media clips from the same event?",
    a: "Yes. Short vertical, square and landscape edits can be created from the event footage. Planning these before filming helps the camera team capture suitable close-ups, interviews and vertical compositions rather than relying on unsuitable cropped footage later.",
  },
  {
    q: "Can you add subtitles, names and presentation graphics?",
    a: "Yes. The scope can include subtitles, speaker names, job titles, logos, presentation slides and other approved graphics. The event team will need to provide accurate names, titles, brand files and presentation content within the agreed schedule.",
  },
  {
    q: "Do we receive the raw event footage?",
    a: "Raw footage is supplied only when it is included in the proposal. The agreement will state whether you receive finished videos, raw footage or editable project files. Music, stock content and other licensed elements remain subject to their own usage terms.",
  },
];

export const finalCta = {
  title: "Plan the Videos",
  strokeTitle: "Your Event Needs",
  body: "Tell us the event date, venue, programme and the videos you need after it ends.",
  note: "We will recommend the crew, camera setup, audio requirements and editing plan, then provide a quote showing the deliverables and turnaround clearly. If the requested coverage cannot be completed properly within the available setup or budget, we will explain what needs to change.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
