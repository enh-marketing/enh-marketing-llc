// Social Media Marketing — pillar page content.
// Copy source: "Social Media Marketing.docx" (client-supplied, 2026-09-03).
// VERBATIM. Do not add copy here.
//
// THE ARGUMENT IS ROLE, NOT ACTIVITY. The opening describes accounts that are
// technically alive and useless: the same artwork on three platforms, a
// two-week silence, another sales post. "The accounts are active, but they give
// people little reason to follow or respond." The heading is the correction --
// "Give Every Platform a Clear Role" -- so the hero draws three frames
// resolving out of one duplicated post, and the page never treats posting
// volume as an outcome.
//
// THE SECOND ARGUMENT IS SEPARATION, AGAIN. As on the Facebook page, this
// document refuses to blend paid into organic: results are "reported
// separately", and a campaign built for enquiries "should not be judged mainly
// on likes". Nothing here totals the two.
//
// THIS DOCUMENT HAS NO FAQ SECTION AT ALL, and its "Our Work" section is a
// gate: "[Client case study slides and approved social media counters]". The
// page renders the site's own Work section and the site's own FAQ set, both
// real and already published. Nothing is invented for either.
// TODO(client): confirm the site-wide FAQ set is the right one for this page.
//
// NO FIGURES. The only number in the document is "more than a decade", inside a
// sentence about experience, and it stays in that sentence.

import type { MeasureRow } from "@/components/service/MeasureTable";
import type { IndexEntry } from "@/components/service/ServiceIndex";
import type { TrackStage } from "@/components/service/StageTrack";
import type { Sector } from "@/components/service/SectorLedger";

export const meta = {
  title: "Social Media Marketing Agency in Dubai | ENH Marketing",
  description:
    "Build a consistent presence with social media marketing services in Dubai covering strategy, content, account management, campaigns, influencers and paid advertising.",
};

export const hero = {
  lines: ["Social Media", "Marketing Agency", "in Dubai"] as [string, string, string],
  sub: "Build a consistent presence with social media marketing services in Dubai covering strategy, content, account management, campaigns, influencers and paid advertising.",
  primary: "Plan My Social Media",
  secondary: "Talk to Our Social Team",
};

export const narrative = {
  heading: ["Give Every Platform", "a Clear Role"] as [string, string],
  scene:
    "A business posts the same artwork on Instagram, Facebook and LinkedIn, disappears for two weeks, then returns with another sales post. The accounts are active, but they give people little reason to follow or respond.",
  sceneEmphasis: "little reason to follow or respond",
  agency:
    "ENH Marketing is a social media agency in Dubai, UAE that helps businesses plan what to publish, create the material and manage the work after it goes live. We handle organic content and paid campaigns across Instagram, Facebook, LinkedIn and TikTok, with reporting that shows what each platform contributed.",
  highlight: ["plan what to publish", "create the material", "manage the work after it goes live"],
};

export const reasons = {
  title: "Why Choose ENH Marketing for",
  strokeTitle: "Social Media Marketing in Dubai",
  lead: "We have spent more than a decade helping businesses build and manage their social media presence. The work covers the full process, so strategy, production, publishing and advertising do not need to sit with separate teams.",
  items: [
    "We start with the business. Its audience, goals, products and available material shape the content plan.",
    "Each platform gets its own role. Instagram may lead with visual content, while LinkedIn may need expert commentary and business context.",
    "Photo, video, design and copy can be produced through one team. The scope states the monthly output before work begins.",
    "Publishing and community replies are handled when social media management is included.",
    "Organic activity and paid advertising are reported separately. You can see what the content achieved and what the media budget produced.",
    "Content performance guides the next plan. Useful topics and formats are developed further instead of filling the calendar with unrelated ideas.",
  ],
};

export const services = {
  title: "Social Media",
  strokeTitle: "Services We Offer",
  items: [
    {
      no: "01",
      title: "Social Content Creation",
      glyph: "creative",
      href: "/services/social-media-marketing/content-creation",
      body: "Good content is the difference between being scrolled past and being followed. We produce photo, video and graphic content for your brand and prepare it for the way each platform is used.",
    },
    {
      no: "02",
      title: "Social Media Management",
      glyph: "sequence",
      href: "/services/social-media-marketing/management",
      body: "Consistency builds an audience, and it is often the first thing a busy team drops. We handle planning, scheduling, publishing and community replies so your channels stay active and on brand.",
    },
    {
      no: "03",
      title: "Social Media Campaigns",
      glyph: "workflow",
      href: "/services/social-media-marketing/campaigns",
      body: "Campaigns give your channels a clear subject and purpose. We plan the concept, creative, rollout and paid support around a launch, offer, event or awareness objective.",
    },
    {
      no: "04",
      title: "Influencer Marketing",
      glyph: "audience",
      href: "/services/social-media-marketing/influencer-marketing",
      body: "The right creator can introduce your business through a voice people already recognise. We identify UAE and regional influencers who fit the brand, then handle briefing, negotiation, approvals and performance tracking.",
    },
    {
      no: "05",
      title: "Facebook Marketing",
      glyph: "conversation",
      href: "/services/social-media-marketing/facebook-marketing",
      body: "Facebook continues to give UAE businesses access to a broad audience. We manage pages, publish relevant content and run paid campaigns designed to turn attention into enquiries.",
    },
    {
      no: "06",
      title: "Instagram Marketing",
      glyph: "catalogue",
      href: "/services/social-media-marketing/instagram-marketing",
      body: "Reels, Stories, carousels and grid posts all serve different purposes. We build a content mix that supports reach, keeps followers engaged and gives profile visitors a clear route to enquire, book or buy.",
    },
    {
      no: "07",
      title: "LinkedIn Marketing",
      glyph: "entity",
      href: "/services/social-media-marketing/linkedin-marketing",
      body: "LinkedIn is where many B2B buyers, employers and professionals assess a business. We create company and founder content that reaches decision-makers and gives your team useful subjects to talk about.",
    },
    {
      no: "08",
      title: "TikTok Marketing",
      glyph: "generate",
      href: "/services/social-media-marketing/tiktok-marketing",
      body: "Brands need a more natural content style on TikTok. We develop platform-ready videos, maintain a workable publishing pace and use relevant trends without forcing the brand into content that does not suit it.",
    },
    {
      no: "09",
      title: "Meta Advertising",
      glyph: "tracking",
      href: "/services/performance-marketing/meta-ads",
      body: "Organic reach has a limit. We put budget behind selected content and manage campaigns across Facebook and Instagram for awareness, traffic, leads or sales.",
    },
  ] as IndexEntry[],
  tail: "Content creation, account management, paid campaigns and influencer marketing can be booked separately or combined within one scope.",
};

export const measure = {
  title: "What",
  strokeTitle: "We Measure",
  lead: "It is essential to understand how the intended audience interacts with the business across social media. Those patterns help us improve the content plan, campaign activity and platform mix.",
  headTrack: "What we track",
  headTells: "What it tells you",
  rows: [
    { track: "Content output", tells: "What was created and published during the reporting period" },
    { track: "Reach and views", tells: "How many accounts had an opportunity to see the content" },
    { track: "Engagement", tells: "Which subjects encouraged reactions or comments" },
    { track: "Shares and saves", tells: "Which content people considered useful enough to keep or pass on" },
    { track: "Video performance", tells: "How people watched and where attention dropped" },
    { track: "Profile activity", tells: "Visits, follows, link taps and other profile actions" },
    { track: "Community activity", tells: "The volume and type of comments, messages and enquiries" },
    { track: "Paid campaign results", tells: "Leads, conversions, acquisition cost and return where tracking allows" },
    { track: "Audience sentiment", tells: "How people respond to the brand and the subjects being discussed" },
  ] as MeasureRow[],
  note: "The report connects these measures with the original goal. A campaign built for enquiries should not be judged mainly on likes, and an awareness campaign needs more context than the number of direct sales it produced.",
};

export const process = {
  title: "How Our Social",
  strokeTitle: "Media Process Works",
  stages: [
    { no: "1", title: "Review and Plan", body: "We review the business, audience, existing accounts, competitors and approval process. The team then agrees which platforms deserve attention and what each one needs to achieve." },
    { no: "2", title: "Build the Content Calendar", body: "Content themes are developed around products, services, customer questions, campaigns and useful moments inside the business. Each idea is assigned to a suitable format and platform." },
    { no: "3", title: "Create the Content", body: "Our team prepares the required photography, video, design, captions and on-screen copy. Shoot days and production requirements are organised in advance." },
    { no: "4", title: "Review and Approve", body: "Your team receives the content before publishing. Feedback is collected and handled within the revision allowance stated in the proposal." },
    { no: "5", title: "Publish and Manage", body: "Approved content is scheduled and published. Comments and messages are monitored when community management forms part of the service." },
    { no: "6", title: "Promote and Measure", body: "Paid support is added when included in the plan. We track performance and use the findings to shape the next content calendar or campaign." },
  ] as TrackStage[],
};

export const sectors = {
  title: "Sectors We Support",
  strokeTitle: "Across Social Media",
  lead: "Social media works best when the business has something useful, visual or timely to share and can support a consistent production process.",
  items: [
    { label: "Food and beverage", detail: "dishes, menus, offers, atmosphere and behind-the-scenes content" },
    { label: "Retail and ecommerce", detail: "products, demonstrations, launches and promotions" },
    { label: "Hospitality and leisure", detail: "properties, experiences, events and seasonal activity" },
    { label: "Healthcare and wellness", detail: "services, expert explanations and patient information" },
    { label: "Real estate", detail: "properties, developments, communities and agent-led content" },
    { label: "Professional services", detail: "advice, commentary, company updates and team expertise" },
    { label: "Education and training", detail: "courses, events, student activity and useful guidance" },
    { label: "Technology and B2B", detail: "demonstrations, case studies, expert content and industry topics" },
    { label: "Construction and industrial businesses", detail: "projects, processes, teams and technical knowledge" },
    { label: "Events and entertainment", detail: "announcements, artist content, live coverage and recap material" },
  ] as Sector[],
  tail: "Some businesses have a constant supply of visual material. Others need expert interviews, planned production days or design-led content. The monthly output should reflect what the business can realistically sustain.",
};

/** Paid, kept in its own section and never merged into the organic reporting. */
export const paid = {
  title: "Reach a Larger Audience",
  strokeTitle: "With Paid Social Campaigns",
  claim:
    "Paid social campaigns can place the brand in front of people who do not currently follow its accounts.",
  body: "We plan the objective, audience, creative, budget and tracking before the campaign begins. Facebook, Instagram, LinkedIn and other suitable platforms are selected according to the audience and the action the campaign needs to generate.",
  separation:
    "The advertising fee and media budget are shown separately. Campaign results can then be reviewed against the agreed KPIs without mixing paid performance with organic account activity.",
  scope:
    "ENH Marketing provides social media marketing in Dubai for businesses that need organic management, paid promotion or both under one coordinated plan.",
};

export const finalCta = {
  title: "Tell Us What Your",
  strokeTitle: "Social Media Needs to Do",
  body: "Send us the platforms you use, the audience you want to reach and the type of content your business can support.",
  note: "We will recommend a practical mix of content creation, management, campaigns and paid advertising. The proposal will show the monthly output, production requirements and separate advertising budget.",
  primary: "Request a Social Media Proposal",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
