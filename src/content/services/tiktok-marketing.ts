// TikTok Marketing — page content.
// Copy source: "TikTok Marketing.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
//
// The document links to a TikTok Ads management service. That route is in the
// sitemap but has no page yet, so the sentence is carried as plain text.
//
// NO FIGURES. This document gives none — no audience size, no timeline, no
// posting number. It says so explicitly ("There is no universal number that
// suits every account"), so nothing on this page draws a quantity.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "TikTok Marketing Agency in Dubai | ENH Marketing",
  description:
    "Plan, film, publish and improve platform-native TikTok content through search-led ideas, community management and reporting shaped around audience response.",
};

export const hero = {
  // Split so no line wraps at 375px, as on the LinkedIn Marketing page.
  lines: ["TikTok", "Marketing", "Agency in Dubai"] as [string, string, string],
  sub: "Plan, film, publish and improve platform-native TikTok content through search-led ideas, community management and reporting shaped around audience response.",
  primary: "Get More TikTok Leads",
  secondary: "Talk to a TikTok Expert",
};

export const narrative = {
  heading: ["The Work Behind", "Consistent TikTok Content"] as [string, string],
  thesis:
    "A brand can spend half a day filming one polished video, post it, and then wait for TikTok to do something with it.",
  thesisEmphasis: "wait for TikTok to do something with it",
  blame: "When the views stay low, the platform gets blamed.",
  // Reconstruction: needsLead + " " + needs[0] + ", " + needs[1] + ", and "
  // + needs[2] + "."
  needsLead: "Usually, the account needs more than one good-looking video. It needs",
  needs: [
    "a steady flow of ideas",
    "strong reasons to keep watching",
    "enough variation to learn what gets a response",
  ],
  agency:
    "ENH Marketing plans, films and manages TikTok content for UAE brands. Our in-house production team handles shoots at planned locations across the UAE, while our marketing team takes care of content direction, editing, publishing, community management and reporting.",
  closing:
    "As a digital marketing agency in Dubai, we connect TikTok production with strategy, publishing and reporting, giving your team a consistent presence without scrambling for a new idea every week.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type Service = { no: string; title: string; body: string; glyph: GlyphVariant };

/** Seven services. The document frames them as the day-to-day work. */
export const handle = {
  title: "What",
  strokeTitle: "We Handle",
  lead: "Keeping a TikTok account active takes more than a list of trends. Someone has to decide what deserves a video, organise the shoot, turn the footage around quickly and stay close to how people respond.",
  ledeTail: "Our service covers that day-to-day work.",
  items: [
    {
      no: "01",
      title: "Content Direction",
      glyph: "structure",
      body: "We start by finding the parts of your business that people would genuinely want to watch, learn about or share. Those ideas are shaped into clear content themes that can support regular videos without making every post feel the same.",
    },
    {
      no: "02",
      title: "Short-Form Video Production",
      glyph: "creative",
      body: "Our production team films specifically for TikTok. That means vertical framing, strong openings, readable on-screen text, and pacing suited to short-form viewing. The finished videos can still look polished. They also need to feel immediate and natural within the feed.",
    },
    {
      no: "03",
      title: "UGC-Style and Creator Content",
      glyph: "entity",
      body: "Some ideas work better when they are delivered by a customer, team member or creator in a more conversational style. We produce and commission this type of content where it suits the brand. For creator partnerships, we handle selection, briefs, content review and the required permissions. UAE Advertiser Permit status is also checked before work begins.",
    },
    {
      no: "04",
      title: "Account Management and Publishing",
      glyph: "catalogue",
      body: "We prepare captions, schedule approved content and keep the profile organised. Keywords, hashtags and sounds are selected according to the topic and audience, without forcing every video into a passing trend.",
    },
    {
      no: "05",
      title: "Community Management",
      glyph: "conversation",
      body: "Comments often reveal what people are interested in, confused about or ready to ask next. We respond in your brand voice, flag genuine enquiries for your team and use recurring questions as ideas for future videos.",
    },
    {
      no: "06",
      title: "Search-Led Content",
      glyph: "index",
      body: "People use TikTok to look for places, products, services and answers. We research the questions connected to your category and turn suitable ones into useful short videos.",
    },
    {
      no: "07",
      title: "Reporting",
      glyph: "reporting",
      body: "You will see which topics held attention, which videos people shared or saved and what actions followed. We also explain what we are changing in the next round of content and why.",
    },
  ] as Service[],
  connect:
    "TikTok can also connect with wider digital marketing services, including influencer marketing, landing pages and paid advertising, when the broader campaign requires them.",
};

export type AdFormat = { no: string; name: string; does: string; when: string; know: string };

/** A four-column table in the source, kept as four columns. */
export const formats = {
  title: "Which TikTok Ad Format",
  strokeTitle: "Fits the Job?",
  lead: "TikTok offers several advertising formats, but a brand rarely needs to use all of them.",
  ledeTail:
    "The right choice depends on what you want people to do, what content is available and how much you are prepared to spend. Availability and minimum budgets can also vary by market and advertising account.",
  columns: ["Format", "What it does", "Useful when", "What to know"] as [
    string,
    string,
    string,
    string,
  ],
  items: [
    {
      no: "01",
      name: "In-Feed Ads",
      does: "Places a video advertisement within the For You feed",
      when: "Reach, traffic, leads, app installs or sales",
      know: "The opening needs to earn attention quickly",
    },
    {
      no: "02",
      name: "Spark Ads",
      does: "Promotes an existing post from your account or an authorised creator",
      when: "Extending the reach of organic or creator content",
      know: "Requires the correct account permissions and usage rights",
    },
    {
      no: "03",
      name: "TopView",
      does: "Gives a video prominent placement near the beginning of a user's app session",
      when: "Large launches and broad awareness",
      know: "Availability and investment should be confirmed directly with TikTok",
    },
    {
      no: "04",
      name: "Search Ads",
      does: "Places advertisements within relevant TikTok search results",
      when: "Reaching people already searching for a related subject",
      know: "Keyword selection and suitable search-focused creative are important",
    },
    {
      no: "05",
      name: "Smart+ Catalog Ads",
      does: "Uses a product catalogue to show relevant items to potential customers",
      when: "Ecommerce and product-led advertising",
      know: "Requires a working product feed and suitable tracking",
    },
    {
      no: "06",
      name: "Branded Mission",
      does: "Invites creators to respond to a brand brief, with selected content available for amplification",
      when: "Creator participation and larger awareness activity",
      know: "Scope, creator terms and availability need to be confirmed",
    },
    {
      no: "07",
      name: "Branded Effects",
      does: "Gives people a custom effect they can use in their own TikTok videos",
      when: "Events, launches and interactive brand activity",
      know: "Requires specialist production and usually suits larger activations",
    },
  ] as AdFormat[],
  closing:
    "For many businesses, In-Feed Ads, Spark Ads or Search Ads provide enough room to begin. Larger formats should have a clear reason behind them before they are added to the media plan.",
  /** The referenced page is unbuilt, so this stays prose. */
  reference: "Explore our TikTok Ads management service",
};

/** The posting-rhythm argument, which is a refusal to name a number. */
export const rhythm = {
  title: "A Posting Rhythm",
  strokeTitle: "You Can Sustain",
  notMore: "Posting more videos does not automatically produce better results.",
  bothWays:
    "A rushed stream of repetitive content can be just as unhelpful as an account that stays quiet for weeks.",
  depends:
    "The right volume depends on what your business can show, how often we can film and how quickly your team can approve content.",
  /** Two accounts the document says should not share a schedule. */
  restaurant:
    "A restaurant may have regular access to dishes, staff and everyday kitchen moments.",
  professional:
    "A professional service may need more planning around experts, scripts and compliance.",
  notSame: "Those two accounts should not be forced into the same schedule.",
  agree:
    "We agree on a realistic monthly output before work starts. The early videos help us understand which topics, openings and formats hold attention. That response then shapes the next batch.",
  cycle:
    "This creates a steady cycle of filming, publishing and learning without chasing an arbitrary posting number.",
};

export type Stage = { no: string; title: string; body: string };

/** Five stages, written "Stage N. Title" then the body. */
export const stages = {
  title: "How the",
  strokeTitle: "Work Moves",
  items: [
    {
      no: "01",
      title: "Find the Strongest Angles",
      body: "We review your business, audience and existing social content. Then we decide what people could watch repeatedly without the account becoming predictable.",
    },
    {
      no: "02",
      title: "Plan the First Batch",
      body: "The agreed ideas are turned into a practical content plan with shoot requirements, locations, people and approval dates.",
    },
    {
      no: "03",
      title: "Film and Edit",
      body: "Our production team captures the required footage at the planned location. Each video is edited for vertical viewing, with its own opening, pacing and on-screen copy.",
    },
    {
      no: "04",
      title: "Review and Publish",
      body: "Your team reviews the content before it goes live. Once approved, we publish according to the agreed schedule and manage the supporting captions and profile details.",
    },
    {
      no: "05",
      title: "Learn From the Response",
      body: "We review watch time, completion, shares, saves, comments and profile activity. Strong ideas can be developed further, while weaker ones give us useful direction for the next shoot.",
    },
  ] as Stage[],
  aim: "The aim is to improve the content with every round instead of repeating the same format for an entire year.",
};

/** TikTok used as a search engine, with the document's own worked scene. */
export const search = {
  title: "People in Dubai Are",
  strokeTitle: "Searching on TikTok Too",
  scene:
    "Someone planning brunch in Jumeirah may open TikTok, type in what they are looking for and watch several videos before choosing a place.",
  same: "The same behaviour can appear when people compare salons, gyms, hotels, attractions, products and local services. They want to see the place, understand the experience and hear what other people think.",
  google: "Google remains important.",
  adds: "TikTok adds another point of discovery, especially for subjects that are easier to understand through video.",
  method:
    "We use TikTok search suggestions, available search insights and common customer questions to find useful content ideas. The topic is then made clear through the video itself, the spoken language, on-screen text and caption.",
  examplesLead: "That could mean:",
  examples: [
    "Showing a dish people are actively looking for",
    "Explaining a treatment and who it may suit",
    "Demonstrating how a product works",
    "Answering practical questions about a hotel stay",
    "Breaking down a common concern around a service",
    "Comparing options that customers regularly ask about",
  ],
  profile:
    "The profile is also organised so someone discovering one useful video can easily explore the rest of your content.",
  caveat:
    "Search behaviour varies by audience and category. We check whether it has a meaningful role in your content plan before building videos around it.",
};

export const works = {
  title: "Where TikTok",
  strokeTitle: "Tends to Work Best",
  lead: "TikTok is easier to use when a business has something people can see, experience, compare or learn.",
  ledeTail: "That can include:",
  items: [
    "Restaurants, cafés and food brands",
    "Retail and ecommerce",
    "Fashion, beauty and personal care",
    "Hotels, venues and attractions",
    "Fitness and wellness businesses",
    "Property and home services",
    "Professional services with useful expertise to share",
    "B2B brands that can turn complex subjects into practical content",
  ],
  limitOne:
    "A highly controlled approval process can make regular production difficult.",
  limitTwo:
    "The same applies when a business has very little it can show or explain on camera.",
  limitThree:
    "We look at those limits before recommending a monthly scope. If TikTok is unlikely to justify the time and budget required, we will say so.",
};

export type Claim = { title: string; body?: string };

/** Six claims. Three are a bare statement in the source and stay that way;
 *  ClaimWeights sets those at display scale rather than padding them out. */
export const whyEnh = {
  title: "Why Choose",
  strokeTitle: "ENH Marketing",
  items: [
    { title: "We produce at volume." },
    {
      title: "We shoot in Dubai.",
      body: "Content production is location-bound and would need regular access to your space, product, and people.",
    },
    {
      title: "Compliant creator campaigns.",
      body: "We verify Advertiser Permit status before any creator campaign runs.",
    },
    {
      title: "We will tell you if TikTok is wrong for you.",
      body: "That conversation costs us a retainer occasionally and saves you a wasted year.",
    },
    { title: "We build for AI search as well as Google." },
    {
      title: "Arabic content through vetted regional partners where your audience warrants it.",
    },
  ] as Claim[],
  cta: "Request a Quote",
};

export const faqs: Faq[] = [
  {
    q: "What does a TikTok marketing agency do?",
    a: "A TikTok marketing agency helps a brand decide what to create and keeps the work moving. Our service can include content planning, filming, editing, publishing, community management, creator partnerships and reporting. TikTok advertising is available separately when paid reach is required.",
  },
  {
    q: "Does TikTok work for businesses in Dubai?",
    a: "It can work well when the target audience uses the platform and the business has something useful, interesting or visually clear to share. We look at your audience, category, approval process and production access before recommending TikTok.",
  },
  {
    q: "Is TikTok only for younger audiences?",
    a: "TikTok is strongly associated with younger users, but its audience includes adults across different age groups. The more useful question is whether your customers use TikTok and what they look for when they are there.",
  },
  {
    q: "How often should a business post?",
    a: "There is no universal number that suits every account. The schedule should give us enough content to learn from while remaining realistic for your business. Some brands can support several videos each week. Others need a more focused schedule because filming or approvals take longer.",
  },
  {
    q: "How much does TikTok marketing cost in Dubai?",
    a: "The fee depends on the monthly number of videos, shoot requirements, editing, creator involvement and community management. You will receive a written proposal showing the production and management fee. TikTok advertising spend is listed separately when paid activity is included.",
  },
  {
    q: "Should we post the same video on TikTok and Instagram Reels?",
    a: "The same shoot can supply content for both platforms. The final edit may need changes to the opening, pacing, text placement, caption or audio. Videos should be exported cleanly without another platform's visible watermark. We prepare the required versions as part of the agreed content scope.",
  },
  {
    q: "Do creators need an advertiser permit in the UAE?",
    a: "Current National Media Authority guidance requires individuals publishing paid or unpaid promotional content through social media and other digital platforms to hold the relevant Advertiser Permit. We check permit status before a creator partnership begins. Requirements should also be confirmed at the time of the work, as regulations can change.",
  },
  {
    q: "How long does TikTok take to produce results?",
    a: "A single video can sometimes gain attention quickly, but there is no reliable timeline that applies to every account. Consistent publishing gives us enough information to identify useful patterns. The time needed depends on the content, category, audience and business goal.",
  },
  {
    q: "Do you film the content?",
    a: "Yes. Our in-house production team films at the agreed location across the UAE. The shoot is planned around the approved content ideas, business requirements and production schedule.",
  },
  {
    q: "Do you manage TikTok Ads?",
    a: "Yes, as a separate service. Regular content helps build your account and provides useful creative insights. Paid advertising can extend the reach of selected content or support goals such as website visits, enquiries and sales.",
  },
];

export const finalCta = {
  title: "See Whether TikTok",
  strokeTitle: "Fits Your Brand",
  body: "Tell us about your business, the people you want to reach and what you want TikTok to help you achieve. We will look at what can realistically be filmed, how much content your business can support and whether the platform deserves a place in your marketing plan.",
  note: "If it makes sense, you will receive a scoped proposal with the recommended monthly output, production requirements and fees.",
};

export const formFields = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "business", label: "About your business" },
  { id: "reach", label: "The people you want to reach" },
  { id: "goal", label: "What you want TikTok to achieve", wide: true },
  { id: "referral", label: "How did you hear about us?", wide: true },
];

export const growthCta = {
  heading: ["Ready to make your brand", "go viral on TikTok?"] as [string, string],
  support:
    "Create Scroll-Stopping Content, Reach the Right Audience & Turn TikTok Engagement Into Real Business Growth",
  button: "Get a TikTok Marketing Quote",
};
