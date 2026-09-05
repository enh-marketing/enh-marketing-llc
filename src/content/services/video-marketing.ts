// Video Marketing — pillar page content.
// Copy source: "Video Marketing Services.docx" (client-supplied, 2026-09-03).
// VERBATIM. Do not add copy here.
//
// THE ARGUMENT IS THE MISSING DECISION. "A video can look excellent and still
// produce very little value. The audience may be unclear, the format may be
// wrong for the platform, or nobody may have decided where the finished film
// will be used." The problem is never production quality, so the hero gives the
// film everything and leaves its destination empty.
//
// TWO GATES, NOT COPY. "Our Work" is "[Client video case study slides and
// approved production counters]" and "FAQs" is "[same as the existing ones]".
// The page renders the site's own Work section and the site's own FAQ set. See
// the note in seo.ts; the same TODO(client) applies.
//
// THE ONE FIGURE. "More than 15 years of experience" sits inside the
// why-choose lead and stays in that sentence. Nothing else on this page is
// quantified: the measuring table names what can be reported and never a
// result.

import type { MeasureRow } from "@/components/service/MeasureTable";
import type { IndexEntry } from "@/components/service/ServiceIndex";
import type { TrackStage } from "@/components/service/StageTrack";
export type Sector = { label: string; parts: string[] };

export const meta = {
  title: "Video Production Services in Dubai | ENH Marketing",
  description:
    "Create corporate films, event coverage, explainers, testimonials, interviews, animation and social videos planned around where they will be watched.",
};

export const hero = {
  lines: ["Leading Video", "Production Services", "in Dubai"] as [string, string, string],
  sub: "Create corporate films, event coverage, explainers, testimonials, interviews, animation and social videos planned around where they will be watched.",
  primary: "Plan My Video Project",
  secondary: "Talk to a Production Expert",
};

export const narrative = {
  heading: ["Decide What the", "Video Needs to Do"] as [string, string],
  scene:
    "A video can look excellent and still produce very little value. The audience may be unclear, the format may be wrong for the platform, or nobody may have decided where the finished film will be used.",
  sceneEmphasis: "still produce very little value",
  agency:
    "ENH Marketing handles video production in Dubai for businesses across the UAE. We develop the idea, plan the shoot, film, edit, and prepare the final versions for websites, presentations, events, advertising, and social media.",
  highlight: ["develop the idea", "plan the shoot", "film", "edit", "prepare the final versions"],
  closing:
    "As a digital marketing agency, we can also help plan how the video will be distributed after delivery.",
};

/** Each is a position, and four of the seven carry the reason for it in a
 *  second sentence. Split at the source's own full stop -- and the third at its
 *  own "when" -- so the position reads at weight with its reason under it. The
 *  three that are a single sentence simply have no second half. Nothing is
 *  reworded. */
/** Each is a position, and four of the seven carry the reason for it in a
 *  second sentence. Split at the source's own full stop -- and the third at its
 *  own "when" -- so the position reads at weight with its reason under it. The
 *  three that are a single sentence simply have no second half. Nothing is
 *  reworded.
 *
 *  `covers` IS A COUNT OF THE POSITION'S OWN LIST, not an estimate of anything.
 *  Six of the seven sentences enumerate what they cover, separated by the
 *  document's own commas, and the page draws that count as discrete blocks so
 *  the breadth of the scope is visible before a word of it is read -- which is
 *  precisely what the section's closing sentence asks the reader to check. The
 *  words being counted, in order:
 *    1  script, framing, length, final versions                            (4)
 *    2  concept, scriptwriting, filming, editing, colour grading,
 *       sound, graphics                                                   (7)
 *    3  landscape, vertical, square                                       (3)
 *    4  corporate films, social videos                                    (2)
 *    5  what will be filmed, which final versions are included,
 *       how feedback will be handled                                      (3)
 *    6  no list                                                           (0)
 *    7  the scale of the shoot, the production support required,
 *       what needs to happen after filming                                (3)
 *  Nothing is added to a list and nothing is dropped from one. */
export type Reason = { stance: string; detail?: string; covers: number };

export const reasons = {
  title: "Why Choose ENH Marketing",
  strokeTitle: "for Video Production in Dubai",
  lead: "We have more than 15 years of experience creating corporate videos, event coverage, interviews, animation, product content and commercial films in Dubai and across the UAE.",
  items: [
    {
      stance: "We ask where the video will be used before planning the shoot.",
      detail: "The answer affects the script, framing, length and final versions.",
      covers: 4,
    },
    {
      stance: "Concept, scriptwriting, filming, editing, colour grading, sound and graphics can be handled by one production team.",
      covers: 7,
    },
    {
      stance: "Landscape, vertical and square versions can be planned together",
      detail: "when the content needs to work across several channels.",
      covers: 3,
    },
    {
      stance: "Corporate films and social videos are treated differently.",
      detail: "A website film needs a different pace and structure from a Reel or paid advertisement.",
      covers: 2,
    },
    {
      stance: "The quote states what will be filmed, which final versions are included and how feedback will be handled.",
      covers: 3,
    },
    {
      stance: "Distribution and performance tracking can be added when the video forms part of a wider campaign.",
      covers: 0,
    },
    {
      stance: "Businesses searching “video production company Dubai” or “videographer Dubai” may find the same suppliers appearing for very different jobs.",
      detail: "The right choice depends on the scale of the shoot, the production support required and what needs to happen after filming.",
      covers: 3,
    },
  ] as Reason[],
  tail: "Businesses comparing “video production services Dubai” or “video production agency UAE” providers should check the full scope rather than the camera list alone.",
  /** The comparison the whole section is arguing against. */
  tailMark: "rather than the camera list alone",
};

export const services = {
  title: "Video Production",
  strokeTitle: "Services We Offer",
  items: [
    {
      no: "01",
      title: "Corporate Video",
      glyph: "structure",
      href: "/services/video-marketing/corporate-video",
      body: "A corporate video is often the first detailed introduction a potential client gets to your business. We handle the concept, script, shoot and edit to produce company profiles and brand films for websites, presentations, tenders and campaigns.",
    },
    {
      no: "02",
      title: "Event Video",
      glyph: "audience",
      href: "/services/video-marketing/event-video",
      body: "Events happen once, so the production plan needs to cover the moments that matter. We film conferences, launches and exhibitions across the UAE, with highlight edits prepared for websites and social media.",
    },
    {
      no: "03",
      title: "Explainer Video",
      glyph: "answer",
      href: "/services/video-marketing/explainer-video",
      body: "A complicated product or service can lose attention before the explanation is finished. We turn the key information into a clear video using live action, animation, demonstrations, screen recordings or a suitable combination.",
    },
    {
      no: "04",
      title: "Testimonial Video",
      glyph: "ledger",
      href: "/services/video-marketing/testimonial-video",
      body: "Customer experiences can provide useful proof for people considering your business. Our testimonial video production in Dubai covers interview planning, filming and editing, with shorter clips prepared for websites, presentations and social media.",
    },
    {
      no: "05",
      title: "Interview Video",
      glyph: "conversation",
      href: "/services/video-marketing/interview-video",
      body: "Interviews help founders, specialists and team members share their knowledge on camera. We handle the studio or on-site setup, question direction and editing, then prepare long and short versions for LinkedIn, Instagram, YouTube and other channels.",
    },
    {
      no: "06",
      title: "Animation and Motion Graphics",
      glyph: "generate",
      href: "/services/video-marketing/animation-motion-graphics",
      body: "Some ideas need to be visualised rather than filmed. We use 2D and 3D animation, motion graphics, infographic animation and kinetic text to explain data, processes and abstract concepts or add movement to existing footage.",
    },
  ] as IndexEntry[],
};

export const measure = {
  title: "What",
  strokeTitle: "We Measure",
  lead: "Viewer data helps show how the finished video performs after publishing.",
  headTrack: "What we track",
  headTells: "What it tells you",
  rows: [
    { track: "Views and Reach", tells: "How many people had an opportunity to watch" },
    { track: "Watch Time", tells: "How long viewers stayed with the video" },
    { track: "Audience Retention", tells: "The points where viewers continued or left" },
    { track: "Completion Rate", tells: "How many viewers reached the end" },
    { track: "Clicks", tells: "How often the video led people to another page or action" },
    { track: "Enquiries and Conversions", tells: "Which valuable actions followed the video" },
    { track: "Social Engagement", tells: "Comments, shares, saves and other responses" },
    { track: "Platform Performance", tells: "How each version performed in its intended placement" },
    { track: "Paid Campaign Results", tells: "Cost per view, lead or conversion where advertising is included" },
  ] as MeasureRow[],
  note: "Video analytics need context. A short social clip and a detailed corporate film serve different purposes and should be measured accordingly.",
  /** The sentence the section exists to protect: no measure means anything
   *  without knowing which film it belongs to. */
  noteMark: "serve different purposes and should be measured accordingly",
};

export const process = {
  title: "How Our Video",
  strokeTitle: "Production Process Works",
  stages: [
    { no: "1", title: "Brief and Purpose", body: "We discuss the audience, message, objective and where the video will be used. This establishes the type of production and the final files required." },
    { no: "2", title: "Concept and Script", body: "The team develops the creative direction, script, interview questions or storyboard. The approach is reviewed before shoot planning begins." },
    { no: "3", title: "Pre-Production", body: "Locations, schedules, people, props, equipment and shot lists are confirmed. The team also plans the framing needed for each agreed video format." },
    { no: "4", title: "Filming", body: "Our production crew records the planned scenes, interviews, demonstrations and supporting footage at the approved locations." },
    { no: "5", title: "Editing and Post-Production", body: "The footage is edited with the required graphics, colour grading, music, sound design, animation and subtitles." },
    { no: "6", title: "Review and Delivery", body: "Your team reviews the video within the feedback rounds stated in the quote. Approved files are supplied in the formats included in the scope." },
    { no: "7", title: "Distribution and Measurement", body: "Video hosting, publishing, paid promotion and performance analysis can be added when the project includes video marketing support." },
  ] as TrackStage[],
};

export const sectors = {
  title: "Industries",
  strokeTitle: "We Film For",
  lead: "Video is useful when the audience needs to see, hear or understand something that static content cannot explain as clearly.",
  items: [
    { label: "Corporate communications", parts: ["company profiles","leadership messages","internal updates"] },
    { label: "Events", parts: ["conferences","launches","exhibitions","panel discussions"] },
    { label: "Products and services", parts: ["demonstrations","explainers","promotional films"] },
    { label: "Client proof", parts: ["testimonials","case studies"] },
    { label: "Hospitality", parts: ["hotels","restaurants","venues","destination content"] },
    { label: "Real estate", parts: ["property tours","developments","community videos"] },
    { label: "Healthcare", parts: ["service explanations","doctor interviews","patient information"] },
    { label: "Education", parts: ["training","courses","instructional videos"] },
    { label: "Industrial businesses", parts: ["facilities","processes","safety","equipment"] },
    { label: "Social media", parts: ["Reels","Shorts","TikTok videos","paid creative"] },
  ] as Sector[],
};

export const finalCta = {
  title: "Tell Us What the",
  strokeTitle: "Video Needs to Do",
  body: "Send us the type of video, the intended audience, the locations involved and where the finished content will be used.",
  note: "We will recommend a practical production scope covering the crew, filming, editing and final versions. Distribution and paid promotion can be added if the video forms part of a wider campaign. Businesses looking for a top video production company in Dubai should know exactly what will be delivered before the cameras arrive.",
  primary: "Request a Video Proposal",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
