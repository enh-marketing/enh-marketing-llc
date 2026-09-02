// Influencer Marketing — page content.
// Copy source: "Influencer Marketing.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// ONE NUMBER APPEARS ON THIS PAGE AND IT IS THE DOCUMENT'S OWN: the 200,000
// followers in the shortlist section, used there as a hypothetical. The
// document deliberately never states what share of such an audience sits in the
// UAE — "only a small share" is as far as it goes — so nothing here or in the
// components turns that into a percentage, a ratio or a drawn proportion.

import type { Faq, Stage } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Influencer Marketing Agency in Dubai | ENH Marketing",
  description:
    "Reach the right UAE audiences through carefully selected creators, compliant contracts, clear briefs, content approvals and reporting focused on genuine campaign response.",
};

export const hero = {
  lines: ["Influencer Marketing", "Agency", "in Dubai"] as [string, string, string],
  sub: "Reach the right UAE audiences through carefully selected creators, compliant contracts, clear briefs, content approvals and reporting focused on genuine campaign response.",
  primary: "Find the Right Influencers",
  secondary: "Talk to Our Creator Strategist",
};

/** The opening argument: a following can look convincing and still be the wrong
 *  audience. The turn — "who is actually watching" — is the page's thesis and
 *  the reason the shortlist section exists at all. */
export const narrative = {
  heading: ["How We Keep Influencer", "Campaigns on Track"] as [string, string],
  scenario:
    "A large following can look convincing. But if most of that audience lives outside the UAE, or rarely responds to sponsored content, your campaign can burn through its budget without reaching the people you need.",
  scenarioEmphasis: "burn through its budget",
  turn: "That’s why we look closely at who is actually watching before recommending a creator.",
  body: "ENH Marketing is a Dubai digital marketing agency managing influencer campaigns across the UAE. We handle everything from creator selection and contracts to content reviews, permit checks and reporting. Usage rights are agreed early, allowing strong content to keep working across your ads, website and social channels.",
};

export type Handled = { no: string; title: string; body: string; glyph: GlyphVariant };

/** The seven things the agency runs. The document frames these as detail that
 *  otherwise goes missing — "rates need to be negotiated, briefs need approval,
 *  contracts, permits, deadlines and feedback all have to stay on track" — so
 *  the section is built as a board of tracked work rather than a feature grid. */
export const handled = {
  title: "What",
  strokeTitle: "We Handle",
  lede: "Influencer marketing can become messy before the first post is even filmed. Rates need to be negotiated. Briefs need approval. Contracts, permits, deadlines and feedback all have to stay on track.",
  body: "Our team manages those details in one place and connects the campaign with wider digital marketing services when paid media, landing pages or email support are required.",
  items: [
    {
      no: "01",
      title: "Strategy and planning",
      glyph: "structure",
      body: "Before contacting influencers, we agree on who you need to reach, which platforms suit the idea and what you want the activity to achieve.",
    },
    {
      no: "02",
      title: "Influencer selection",
      glyph: "audience",
      body: "You receive a focused shortlist with a clear reason behind every recommendation.",
    },
    {
      no: "03",
      title: "Briefing",
      glyph: "text",
      body: "Influencers need enough direction to understand the brand while keeping the style their audience already knows. Our briefs cover the message, required shots, deliverables and brand guidelines, with room for a natural delivery.",
    },
    {
      no: "04",
      title: "Contracts and compliance",
      glyph: "schema",
      body: "Fees, deadlines, disclosure requirements, permit status, exclusivity and usage rights are agreed before production starts.",
    },
    {
      no: "05",
      title: "Content review",
      glyph: "creative",
      body: "Every submission is checked against the approved brief. We collect your feedback and manage any required changes before publication.",
    },
    {
      no: "06",
      title: "Paid amplification",
      glyph: "offsite",
      body: "Strong influencer content can reach a wider audience through Meta partnership ads or TikTok Spark Ads when the required permissions are in place.",
    },
    {
      no: "07",
      title: "Reporting",
      glyph: "reporting",
      body: "You receive a clear view of how the influencer activity performed and what response the content generated.",
    },
  ] as Handled[],
};

export type Criterion = { no: string; title: string; body: string; glyph: GlyphVariant };

/** The four checks behind a shortlist. The document's hypothetical — 200,000
 *  followers, a Dubai restaurant — is its own, including the number. */
export const shortlist = {
  title: "How We Make a Shortlist",
  strokeTitle: "Built Around Your Audience",
  lede: "Follower count is easy to notice. It is also easy to misread.",
  example:
    "An influencer with 200,000 followers may look ideal for a Dubai restaurant. If only a small share of those followers lives in the UAE, those numbers may have very little effect on bookings or footfall. We look more closely at four areas before putting a name forward.",
  exampleFigure: "200,000",
  items: [
    {
      no: "01",
      title: "Where Their Followers Are Based",
      glyph: "entity",
      body: "We check how much of the audience sits within your target market. For local brands, that may mean focusing on Dubai, a particular emirate or the UAE as a whole.",
    },
    {
      no: "02",
      title: "How People Respond",
      glyph: "tracking",
      body: "Likes alone can give a misleading picture. We review reach, comments, engagement patterns and follower growth to understand how active the audience really is.",
    },
    {
      no: "03",
      title: "How Your Brand Would Fit",
      glyph: "creative",
      body: "The influencer’s usual tone and presentation matter. Their content should give your brand a natural place within the feed without making the partnership feel forced.",
    },
    {
      no: "04",
      title: "How Often They Advertise",
      glyph: "catalogue",
      body: "A feed filled with back-to-back promotions can weaken audience response. We look at recent partnerships, competing brands and how sponsored posts perform compared with the influencer’s usual content.",
    },
  ] as Criterion[],
  closing:
    "The final shortlist stays focused on people who suit your audience, category and business goal. You will also see the thinking behind every name, so the selection never feels like guesswork.",
};

export type Tier = { name: string; use: string; tradeoff: string };

/** The document's four-row table. These are an ordered scale by audience size,
 *  which is why the page draws them as a scale rather than as a grid: the
 *  trade-off column exists precisely because moving up it costs something. */
export const tiers = {
  title: "Match the Influencer",
  strokeTitle: "to the Job",
  columns: { name: "Tier", use: "Typical use", tradeoff: "Trade-off" },
  rows: [
    {
      name: "Nano",
      use: "Community credibility, local footfall, high volume seeding",
      tradeoff: "More influencers may be needed to build wider reach",
    },
    {
      name: "Micro",
      use: "Niche audiences, ongoing brand activity and stronger interaction",
      tradeoff: "Several influencers may be needed at the same time",
    },
    {
      name: "Macro",
      use: "Launches, events and broad awareness",
      tradeoff: "Higher fees and varying engagement levels",
    },
    {
      name: "Celebrity and mega",
      use: "Prestige, national reach and major brand moments",
      tradeoff: "Significant budget, and the audience knows it is an advertisement",
    },
  ] as Tier[],
  closing: [
    "For many UAE brands, micro and nano influencers provide a strong starting point. Macro influencers can add wider visibility around a launch or major event.",
    "Luxury brands may need a different mix. In those cases, much of the value comes from being associated with a smaller number of carefully selected high-profile names. With our 15 years of experience as a digital marketing firm in Dubai, we have the know-how to guide you better.",
  ],
};

/** Usage rights. The section's shape is a loss then a remedy, so the page sets
 *  the loss first and the five destinations as what is recovered. */
export const usage = {
  title: "How We Give Every Post",
  strokeTitle: "a Longer Life",
  problemLead: "Brands often budget for the influencer’s post and overlook the content itself.",
  problem:
    "Then a strong video performs well, but the contract only covers its original publication. The brand cannot use it in an ad, place it on a product page, or share it again several months later.",
  // The clause that defines the short life, lifted from `problem` above. The
  // section sets it as the label on the truncated track.
  originalOnly: "the contract only covers its original publication",
  remedy:
    "We agree on usage rights while the contract is being prepared. This gives everyone a clear understanding of how the content can be used and for how long.",
  destinationsLead: "Depending on the agreement, approved content can be:",
  destinations: [
    "Promoted through Meta partnership ads or TikTok Spark Ads",
    "Shared across your brand’s social channels",
    "Added to future social content",
    "Used on landing pages or product pages",
    "Included in email marketing",
  ],
  // The four things the contract fixes, lifted from the closing sentence.
  // Reconstruction: "The contract sets out the approved " + terms joined with
  // ", " and ", " before the last + "." reproduces it word for word.
  termsLead: "The contract sets out the approved",
  terms: ["channels", "duration", "territory", "paid media permissions"],
  closing:
    "This protects both sides and helps your brand get more value from content that has already been produced.",
};

export const process = {
  title: "Planning a",
  strokeTitle: "Creator Campaign?",
  lede: "A product launch, event or new service usually comes with a fixed date and a lot of moving parts. Influencers need time to review the brief, produce the content and make changes before anything goes live.",
  intro: "This is how we keep the work moving.",
  stages: [
    {
      no: "01",
      title: "Start with the brief",
      body: "We agree on the audience, platforms, creator level, budget and the result you want to achieve. You receive a clear plan and working timeline before outreach begins.",
    },
    {
      no: "02",
      title: "Build the shortlist",
      body: "We research creators, review their audiences and check how well they suit the brief. Each recommendation includes supporting information and a clear explanation.",
    },
    {
      no: "03",
      title: "Confirm the creators",
      body: "Rates are negotiated, and contracts are prepared. We also confirm permit status, disclosure requirements, usage rights and exclusivity before production starts.",
    },
    {
      no: "04",
      title: "Prepare the content",
      body: "Every creator receives an approved brief covering the message, deliverables, deadlines and brand guidelines.",
    },
    {
      no: "05",
      title: "Review and publish",
      body: "We coordinate submissions, collect your feedback and manage revisions. Once the final content is approved, publishing dates and disclosures are checked.",
    },
    {
      no: "06",
      title: "Review the response",
      body: "After the content goes live, we show you how it performed and which creators generated the strongest response. These findings can guide future influencer activity and paid amplification.",
    },
  ] as Stage[],
};

/** Measurement. The document is unusually candid that part of the journey
 *  cannot be followed, and the section is built on that split rather than on
 *  the metric list alone. */
export const measurement = {
  title: "Read the",
  strokeTitle: "Results Properly",
  lede: "Views and likes are easy to report. They do not always answer the question a brand really has: did the influencer activity make a difference?",
  visibleLabel: "Visible",
  visible:
    "Some actions can be tracked clearly. A person clicks a unique link, uses an influencer’s code, or completes an enquiry form. The connection is visible.",
  // The same sentence, split into its three actions so the connected path can
  // be drawn. Reconstruction: lead + " A person " + [0] + ", " + [1] + ", or "
  // + [2] + ". " + tail reproduces `visible` word for word.
  visibleLead: "Some actions can be tracked clearly.",
  // The sentence's subject, kept so the split loses no words.
  visibleActor: "A person",
  visibleActions: [
    "clicks a unique link",
    "uses an influencer’s code",
    "completes an enquiry form",
  ],
  visibleTail: "The connection is visible.",
  hiddenLabel: "Harder to follow",
  hidden:
    "Other journeys are harder to follow. Someone may watch an Instagram Story on Monday, remember the brand and search for it on Thursday. Most platform reports will never connect those two actions.",
  // And the same for the journey that cannot be joined up. Reconstruction:
  // lead + " Someone may " + [0] + ", " + [1] + ". " + tail.
  hiddenLead: "Other journeys are harder to follow.",
  hiddenActor: "Someone may",
  hiddenPath: [
    "watch an Instagram Story on Monday",
    "remember the brand and search for it on Thursday",
  ],
  hiddenTail: "Most platform reports will never connect those two actions.",
  verdict: "That does not make influencer marketing impossible to measure. It means the results need context.",
  signalsLead: "Depending on the activity, we can track:",
  signals: [
    "Reach and impressions",
    "Video views and completion rates",
    "Engagement",
    "Link clicks",
    "Referral traffic",
    "Unique code usage",
    "Enquiries or purchases",
    "Paid media performance",
  ],
  closing:
    "We can also assign a unique link or code to each influencer, and track changes in brand searches. Together, these signals give a clearer picture of how people discovered the brand, how they responded and which content deserves further investment.",
};

export const faqs: Faq[] = [
  {
    q: "Do influencers need an advertiser permit in the UAE?",
    a: "Current National Media Authority guidance requires individuals publishing promotional content through social media and other digital platforms to hold the relevant Advertiser Permit. This applies to paid and unpaid promotional work. We verify permit status before contracts are signed. Requirements should also be confirmed before the work begins, as regulations can change.",
  },
  {
    q: "What happens when an influencer is visiting the UAE?",
    a: "Influencers entering on a visit visa need a Visitor Advertiser Permit. The application is handled through a licensed UAE advertising agency, so this should be arranged before travel or production dates are confirmed.",
  },
  {
    q: "How do you decide which influencers to recommend?",
    a: "We look at audience location, engagement patterns, content style, recent brand partnerships and overall fit. Every recommendation comes with a clear explanation.",
  },
  {
    q: "Can we reuse influencer content on our own channels?",
    a: "Yes, when the required usage rights are included in the contract. The agreement will state where the content can appear, how long it can be used and whether paid advertising is included.",
  },
  {
    q: "How much do influencers charge in Dubai?",
    a: "Rates vary based on audience size, category, deliverables, exclusivity, production requirements and usage rights. Influencer fees and our management fee are shown separately, giving you a clearer view of where the budget is going.",
  },
  {
    q: "Should we work with micro or macro influencers?",
    a: "That depends on what you want to achieve. Micro and nano influencers work well for local reach, niche audiences and ongoing activity. Macro influencers can bring wider visibility to launches, events and major brand moments. Some brands benefit from a combination of both.",
  },
  {
    q: "How do you measure influencer marketing results?",
    a: "We track the numbers that connect to your business goal. These may include reach, views, engagement, website visits, code usage, enquiries or sales. We also explain where the customer journey cannot be fully tracked, so the report gives you a realistic view of the results.",
  },
  {
    q: "Do you have a fixed influencer database?",
    a: "Each brief gets a fresh shortlist based on the target audience, location, category and budget. This keeps the recommendations relevant to what your brand needs now.",
  },
  {
    q: "How long does influencer marketing take to set up?",
    a: "Most influencer activity needs around two to four weeks between the initial brief and the first post going live. Influencer availability, negotiations, contracts, permits and approval rounds can affect the timing. Working with visiting influencers may require additional time.",
  },
  {
    q: "Can influencer content run alongside paid social advertising?",
    a: "Yes. With the correct usage rights and permissions, suitable content can run through Meta partnership ads or TikTok Spark Ads. This allows a strong organic post to reach a larger, more targeted audience.",
  },
];

export const finalCta = {
  title: "Talk to Us About",
  strokeTitle: "Influencer Marketing",
  body: "Tell us what you want to promote, who you need to reach, and the budget you have in mind.",
  note: "We will review the brief and outline how we can help. Influencer fees and our management fee will be shown separately, so you can see exactly how the proposed budget is structured.",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";

/** Mid-page CTA band, above the work section. Supplied in the document under
 *  "Influencer Marketing Agency in Dubai Page CTA". Stored in sentence case and
 *  split across two lines for typesetting; the band uppercases it. */
export const growthCta = {
  heading: ["Ready to make", "your brand influence?"] as [string, string],
  support:
    "Connect With the Right Influencers to Reach More People, Build Trust & Drive Results",
  button: "Get a Free Influencer Strategy",
};
