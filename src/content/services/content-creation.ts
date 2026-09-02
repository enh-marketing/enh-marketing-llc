// Social Media Content Creation — page content.
// Copy source: "Social Media Content Creation.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
//
// The document links to an influencer marketing service. That route IS built,
// so the phrase links to it.
//
// NO FIGURES. This document gives none, and says so: "There is no monthly
// number that suits every brand." Nothing on this page draws a quantity.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Social Media Content Creation in Dubai | ENH Marketing",
  description:
    "Plan, film, photograph, design, and write original social content through one connected production process, with clear deliverables and platform-ready edits.",
};

export const hero = {
  lines: ["Social Media", "Content", "Creation"] as [string, string, string],
  sub: "Plan, film, photograph, design, and write original social content through one connected production process, with clear deliverables and platform-ready edits.",
  primary: "Get Free Content Plan",
  secondary: "Talk to a Content Expert",
};

export const narrative = {
  heading: ["The Work Behind", "Consistent Social Content"] as [string, string],
  definition:
    "Social media content creation covers the planning, filming, photography, design and writing needed to produce original posts for a brand. ENH Marketing creates platform-ready content for UAE businesses, with in-house shoots, agreed monthly deliverables and separate edits for the channels included in your scope.",
  thesis: "Your business already gives you plenty to work with.",
  thesisEmphasis: "already gives you plenty to work with",
  sources:
    "Products, projects, customer questions, team knowledge and everyday moments can all become useful content.",
  hard: "The difficult part is finding the ideas worth developing and producing them regularly without making every post look or sound the same.",
  agency:
    "As a Dubai digital marketing agency, we create content across Instagram, TikTok, LinkedIn, Facebook and YouTube, with production connected to the wider digital marketing services each brief requires. We plan the ideas, organise the shoots and adapt the finished work to the way each platform is used.",
  cta: "Request a Quote",
};

export type Service = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** Which deliverable this service produces, for the drawing. Presentation
   *  only: the document names no such categories. */
  output: "themes" | "video" | "photo" | "design" | "copy" | "creator" | "ai";
};

export const handle = {
  title: "What",
  strokeTitle: "We Handle",
  lead: "Producing content consistently takes more than a camera and a calendar. Someone has to decide what deserves filming, book the day, direct whoever is in front of the lens, cut it properly and get it back before the moment has passed.",
  ledeTail: "Our service covers that production work.",
  items: [
    {
      no: "01",
      title: "Content Direction",
      output: "themes",
      glyph: "structure",
      body: "The first job is finding the parts of your business people would actually stop for. A process, a space, someone who knows something worth knowing, a question customers keep asking. Those become a small set of themes that can carry regular content without every post looking like the last one.",
    },
    {
      no: "02",
      title: "Short-Form Video Production",
      output: "video",
      glyph: "creative",
      body: "Filming is done for vertical viewing, with a clear opening, readable on-screen text and pacing suited to a fast feed. The finished videos can still look considered. They also need to feel like they belong where they are posted.",
    },
    {
      no: "03",
      title: "Photography",
      output: "photo",
      glyph: "generate",
      body: "One well-planned day can supply months of posts. Product, space, food, team and detail images are captured together where possible, then delivered edited and sized for social, your website and your ad accounts.",
    },
    {
      no: "04",
      title: "Design and Carousels",
      output: "design",
      glyph: "catalogue",
      body: "Some things are easier to read than to watch. Carousels handle explanations, comparisons and before-and-after. Static posts carry offers, announcements and the quieter days. Both are built from a template set so the account holds together when volume rises.",
    },
    {
      no: "05",
      title: "Captions and Copy",
      output: "copy",
      glyph: "text",
      body: "Captions carry more weight than people expect. They set up the video, hold the words people search for, and on a saved post they are the part someone comes back to read. Written in your voice, in English or Arabic where that suits your audience.",
    },
    {
      no: "06",
      title: "UGC-Style and Creator Content",
      output: "creator",
      glyph: "entity",
      body: "We produce this kind of content and commission it where it suits. Picking the wrong creator is a common mistake, so selection starts with where their audience actually sits. Briefs, content review and permissions are settled before anything is filmed, and UAE Advertiser Permit status is checked before a partnership begins.",
    },
    {
      no: "07",
      title: "AI-Enhanced Visuals and Video",
      output: "ai",
      glyph: "answer",
      body: "When an idea is difficult to capture through a regular shoot, we can use AI to create supporting visuals, product environments, scene extensions and short video elements. This can help place a product in a new setting, expand a simple shot or give the concept more visual impact. Every asset is developed using approved brand and product references, then reviewed for accuracy before delivery.",
    },
  ] as Service[],
  /** The referenced page exists, so this phrase links. */
  reference: "Explore our influencer marketing service",
  referenceHref: "/services/social-media-marketing/influencer-marketing",
};

/** The volume question, which the document refuses to answer with a number. */
export const howMuch = {
  title: "How Much Content",
  strokeTitle: "Do You Actually Need?",
  noNumber: "There is no monthly number that suits every brand.",
  restaurant:
    "A restaurant with new dishes, regular offers and easy access to its kitchen may be able to support frequent filming.",
  professional:
    "A legal, medical or technical business may need more time for expert input, claim checks and internal approval.",
  platforms:
    "The platforms also affect the amount required. Short-form video usually needs more variation, while a detailed LinkedIn post or educational carousel may take longer to research and approve.",
  factorsLead: "Before recommending an output, we look at:",
  factors: [
    "The platforms you want to use",
    "How often your team can support a shoot",
    "The number of locations involved",
    "Access to products, staff and subject experts",
    "The time needed for internal approval",
    "The mix of video, photography and design",
    "Any legal or industry-specific review requirements",
  ],
  proposal:
    "The final proposal states the exact monthly output. You will know how many videos, photographs, carousels or other assets are included before production starts.",
};

export type Stage = { no: string; title: string; body: string };

export const stages = {
  title: "How the",
  strokeTitle: "Work Moves",
  items: [
    {
      no: "01",
      title: "Find What Is Worth Showing",
      body: "We look at your business, your audience and whatever social content already exists. The aim is to identify things people could watch repeatedly without the account becoming predictable.",
    },
    {
      no: "02",
      title: "Plan the First Batch",
      body: "The agreed ideas turn into a practical plan: what gets filmed, where, with whom, on what date, and when it needs approving.",
    },
    {
      no: "03",
      title: "Film and Design",
      body: "Our production team captures the footage at the planned location. Photography, design and copy are produced alongside it so a single day supplies more than one format.",
    },
    {
      no: "04",
      title: "Review and Deliver",
      body: "Your team reviews the work before anything is used. Approved files arrive edited, sized and ready to publish, with captions supplied.",
    },
    {
      no: "05",
      title: "Learn From the Response",
      body: "We look at watch time, saves, shares, comments and what people did next. Strong ideas get developed further. Weaker ones still tell us something useful about the following shoot.",
    },
  ] as Stage[],
  point:
    "The point is for each round to be better informed than the last, instead of repeating one format for a year.",
};

export type Claim = { no: string; title: string; body: string };

export const whyEnh = {
  title: "Why Choose ENH Marketing",
  strokeTitle: "For Your Social Media Content Creation",
  items: [
    {
      no: "01",
      title: "Ideas grounded in your business",
      body: "We build content around your products, services, customer questions and team knowledge, giving every shoot a clear purpose.",
    },
    {
      no: "02",
      title: "One connected production process",
      body: "Planning, filming, photography, editing, design and copy are managed through one workflow, with shoots carried out at agreed locations across the UAE.",
    },
    {
      no: "03",
      title: "More creative range from every production",
      body: "We plan content for your selected platforms and can use AI to create product environments, scene extensions or short visual elements that would be difficult to film. Every AI-assisted asset is built from approved brand and product references.",
    },
    {
      no: "04",
      title: "A clearly defined scope",
      body: "The proposal confirms the finished assets, shoot requirements, platform versions and revision rounds before production begins.",
    },
  ] as Claim[],
  cta: "Request a Quote",
};

export const faqs: Faq[] = [
  {
    q: "What is included in social media content creation?",
    a: "The service can include content planning, filming, photography, editing, graphic design, captions and on-screen copy. Your proposal will state the number of finished assets, platforms, shoots and revisions included.",
  },
  {
    q: "Is content creation the same as social media management?",
    a: "Content creation produces the posts, videos and images. Social media management covers the ongoing running of the account, including scheduling, publishing, monitoring, replies and reporting. Both services can be combined.",
  },
  {
    q: "Do you film the content?",
    a: "Yes. Our in-house production team carries out shoots at planned locations across the UAE. The shot list, people, products and production requirements are agreed before the shoot.",
  },
  {
    q: "How much content does my business need each month?",
    a: "The right amount depends on your platforms, available subject matter, shoot access and approval process. We recommend a realistic output after reviewing the business and state the exact number of assets in the proposal.",
  },
  {
    q: "Can we use the same content on every platform?",
    a: "The same source material can often be used across several platforms. The final version may need changes to its dimensions, opening, pacing, text placement or caption. Your scope will show which platform-specific versions are included.",
  },
  {
    q: "Do you write the captions?",
    a: "Yes, when copywriting is included in the agreed scope. We can prepare captions, video hooks, on-screen text and calls to action in the brand's approved tone.",
  },
  {
    q: "Do we receive the raw footage?",
    a: "Raw footage is supplied only when it is included in the proposal. The agreement will state which edited files, source files and usage rights you receive, avoiding confusion after production.",
  },
  {
    q: "Can one shoot provide content for a full month?",
    a: "It can, depending on the number of finished assets required and the variety available during the shoot. We confirm the planned monthly output before production, so you know exactly what one shoot is expected to provide.",
  },
  {
    q: "Can you edit footage we already have?",
    a: "Yes, if the footage has suitable quality, dimensions and usage rights. We review the available files first and confirm which content can realistically be created from them.",
  },
  {
    q: "Can you create content for a one-off launch or event?",
    a: "Yes. Content creation can be scoped around a single shoot, launch, event or product release. The proposal will state the required production time, finished assets and delivery schedule.",
  },
  {
    q: "Do you provide Arabic content?",
    a: "Arabic or bilingual content can be included when required. The scope will confirm whether translation, Arabic copywriting, presenters or regional creative support are needed.",
  },
  {
    q: "How much does social media content creation cost?",
    a: "The fee depends on the content volume, shoot requirements, locations, editing, design, talent and number of final versions. You will receive a written breakdown showing the deliverables beside the fee.",
  },
  {
    q: "Do you create AI-generated visuals and videos?",
    a: "Yes. We use AI when it adds something useful to the concept, such as building a product setting, extending a scene or creating a visual that would be difficult to film. The scope will state what is AI-generated, and every asset is reviewed against approved references before delivery.",
  },
];

export const finalCta = {
  title: "Turn What Your Business",
  strokeTitle: "Does Into Content",
  body: "Tell us which platforms you use, what you want to show and how often your team can support a shoot.",
  note: "We will recommend a practical mix of video, photography, design and copy, with the monthly output and production requirements stated clearly before work begins.",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";

export const growthCta = {
  heading: ["Ready to create content", "that gets noticed?"] as [string, string],
  support:
    "Create Engaging, On-Brand Social Media Content That Captures Attention, Builds Your Audience & Drives Meaningful Engagement",
  button: "Get a Free Content Strategy",
};
