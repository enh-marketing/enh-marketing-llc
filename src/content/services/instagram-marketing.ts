// Instagram Marketing — page content.
// Copy source: "Instagram Marketing .docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// TWO THINGS WORTH KNOWING:
//
// 1. The services section ends "see our [Instagram Ads page]". There is no
//    Instagram Ads route in the sitemap. The nearest real page is Meta Ads,
//    which the Meta Ads copy itself describes as buying Facebook and Instagram
//    through the same platform, and which the sitemap already cross-lists under
//    Social Media Marketing as "Meta Advertising". The link points there. See
//    `adsLink` — repoint it if a dedicated Instagram Ads page is built.
//
// 2. Every figure on this page is the document's own: 15 years, 90 days, weeks
//    3-4, month 2, twelve to twenty pieces, 12.5 million and 8.05 million,
//    1 February 2026, 2-3 hours. Nothing is rounded, restated or added.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Instagram Marketing Agency in Dubai | ENH Marketing",
  description:
    "Build a consistent Instagram presence with clear strategy, original content, active community management and reporting focused on qualified enquiries.",
};

export const hero = {
  lines: ["Instagram Marketing", "Agency", "in Dubai"] as [string, string, string],
  sub: "Build a consistent Instagram presence with clear strategy, original content, active community management and reporting focused on qualified enquiries.",
  primary: "Get a Free Instagram Strategy",
  secondary: "Talk to Our Instagram Strategist",
};

/** The opening argument. Three paragraphs doing three different jobs: the
 *  effort-without-result problem, the fact that the UAE is several markets, and
 *  who is speaking. The middle one names three specific businesses, which is
 *  the most concrete thing on the page and is treated as such. */
export const narrative = {
  heading: ["How We Turn Instagram", "Attention Into Enquiries"] as [string, string],
  problem:
    "A business can put real effort into its Instagram account and still feel that nothing is happening. The photos look good, the posts go out, and the enquiries stay roughly where they were.",
  // The same paragraph's diagnosis, split at its own commas. Reconstruction:
  // "Often the problem is not effort. The account " + [0] + ", " + [1] + ", and
  // " + [2] + "." reproduces it word for word.
  diagnosisLead: "Often the problem is not effort.",
  diagnosisSubject: "The account",
  diagnosis: [
    "has no clear direction",
    "content arrives in bursts",
    "nobody is watching the comments and messages closely enough to notice when someone is ready to buy",
  ],
  marketLead: "The UAE also holds several different audiences inside one market.",
  // The document's own three examples, split from its sentence. Reconstruction:
  // "A restaurant in Jumeirah, a law firm in DIFC and a furniture showroom in
  // Sharjah are speaking to different people…"
  examples: [
    { business: "A restaurant", place: "Jumeirah" },
    { business: "A law firm", place: "DIFC" },
    { business: "A furniture showroom", place: "Sharjah" },
  ],
  marketTail:
    "are speaking to different people, sometimes in different languages, and for different reasons. What works well for one may do very little for another.",
  body: "ENH Marketing has worked in this market for 15 years as a Dubai digital marketing agency, giving us a clear view of how audiences, industries and buying behaviour differ across the UAE. Since we handle everything from strategy and production to the replies in your inbox, fewer opportunities get lost between teams.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type ServiceAnchor =
  | "look"
  | "posts"
  | "profile"
  | "inbox"
  | "creators"
  | "insights";

export type Service = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** Which part of an account this service acts on. Presentation only — the
   *  document names no such regions; this is how the section anchors each
   *  service to the interface it changes. */
  anchor: ServiceAnchor;
  /** The document calls one of these "the core of the service"; that one gets
   *  the large cell. Not a ranking we assigned. */
  core?: boolean;
};

export const services = {
  title: "Our Instagram Marketing",
  strokeTitle: "Services in Dubai",
  items: [
    {
      no: "01",
      title: "Instagram Strategy and Visual Direction",
      anchor: "look",
      glyph: "creative",
      body: "We agree who the account is speaking to, what it posts about and how it looks. That covers colour, photography style, how Reels are edited, typography and tone of voice. In a busy feed, a consistent and recognisable look is usually what earns the follow and the save. Accounts without one tend to be passed over.",
    },
    {
      no: "02",
      title: "Content Production: Reels, Photography and Design",
      anchor: "posts",
      glyph: "catalogue",
      core: true,
      body: "This is the core of the service. We shoot and edit at your venue, showroom, clinic or site, produce Reels made for the format itself, and design carousels and static assets. Content created for another purpose and reformatted for Instagram usually performs less well, and audiences tend to notice.",
    },
    {
      no: "03",
      title: "Account and Grid Management",
      anchor: "profile",
      glyph: "structure",
      body: "We publish to an agreed calendar, write the captions and give each Story a purpose. The profile itself also gets attention: highlights, bio, links and wording, so that someone landing on the account can understand what you sell within a few seconds.",
    },
    {
      no: "04",
      title: "Community Management",
      anchor: "inbox",
      glyph: "conversation",
      body: "Comments and direct messages are often where an enquiry begins. Someone asking about price in the evening is a genuine lead, and a slow reply can lose it. We also use automated first replies so nobody is left waiting, then a member of the team continues the conversation in your brand voice. Genuine enquiries are passed to your team while the interest is still there.",
    },
    {
      no: "05",
      title: "Creator and Influencer Partnerships",
      anchor: "creators",
      glyph: "audience",
      body: "We select creators on whether their audience matches yours and on the quality of their content, instead of follower count alone. We brief them, review the content before it publishes, and measure what the campaign produced. We also check that every creator holds a valid UAE Advertiser Permit before work begins.",
    },
    {
      no: "06",
      title: "Reporting and Attribution",
      anchor: "insights",
      glyph: "reporting",
      body: "You receive a monthly report covering reach, saves, shares, profile visits, direct message enquiries and what converted. It also sets out what we are changing next month and why. We track AI referral traffic and ask new enquiries how they found you, because a growing number of buyers now ask an AI assistant before they search.",
    },
  ] as Service[],
  outro:
    "Instagram management can also connect with our wider digital marketing services when paid campaigns form part of the plan.",
};

/** The document points at an "Instagram Ads page" that does not exist in the
 *  sitemap. Meta Ads is the real page that covers Instagram advertising. */
export const adsLink = {
  lead: "If you want ads running alongside your organic content, see our",
  label: "Instagram Ads page",
  href: "/services/performance-marketing/meta-ads",
};

export type ProgrammeStage = {
  no: string;
  title: string;
  body: string;
  /** Only where the document states one. Stages one and two carry no date of
   *  their own; what the document says is that content goes live inside week
   *  two, which is the milestone below, not a span we assigned to them. */
  when?: string;
  /** What the stage hands over. The document states one for every stage except
   *  the ongoing phase, which by definition does not close. */
  deliverable?: string;
};

/** The 90-day programme. Every stage names what it produces, and that column
 *  is the reason this is not another timeline: the deliverable is the point. */
export const programme = {
  title: "How Our Instagram",
  strokeTitle: "Management Works",
  lede: "A 90-day structure, with content going live inside week two.",
  deliverableLabel: "Deliverable",
  // The frame and the one dated commitment, both from the lede sentence above.
  frame: "90-day structure",
  milestone: "content going live inside week two",
  stages: [
    {
      no: "01",
      title: "Audit and direction",
      body: "We review your account, your competitors and any existing content, agree the visual direction and content themes, and build the first month's calendar.",
      deliverable: "audit and content plan",
    },
    {
      no: "02",
      title: "Production and launch",
      body: "First shoot completed, profile and bio rebuilt, highlights structured, publishing begins.",
      deliverable: "first batch of content live",
    },
    {
      no: "03",
      title: "In weeks 3-4, we establish cadence",
      when: "Weeks 3-4",
      body: "Consistent publishing across Reels, carousels and Stories. Community management running daily.",
      deliverable: "Agreed-upon pieces of content per month.",
    },
    {
      no: "04",
      title: "From month 2 onward, we test and refine",
      when: "From month 2",
      body: "We work out which formats and topics earn saves and shares, and shift the calendar toward them. Creator partnerships begin where relevant.",
      deliverable: "monthly report and revised plan",
    },
    {
      no: "Ongoing",
      when: "Ongoing",
      title: "Scale what works",
      body: "Content that performs organically is the content worth putting budget behind, which is where the paid programme picks up.",
    },
  ] as ProgrammeStage[],
};

export type Sector = { name: string; examples: string[] };

/** Seven categories, most with their own examples after a colon. Reconstruction:
 *  name + ": " + examples joined with ", " reproduces each bullet. */
export const sectors = {
  title: "Who We Run",
  strokeTitle: "Instagram For",
  lede: "We work with UAE businesses where the buying decision is visual, and the customer checks your account before contacting you:",
  items: [
    { name: "Food and beverage", examples: ["restaurants", "cafés", "cloud kitchens", "catering"] },
    { name: "Retail and ecommerce", examples: ["fashion", "homeware", "speciality goods"] },
    { name: "Healthcare and aesthetics", examples: ["clinics", "dental", "dermatology", "wellness"] },
    { name: "Beauty and personal care", examples: ["salons", "spas", "grooming"] },
    {
      name: "Real estate and interiors",
      examples: ["brokerages", "developers", "fit-out and design studios"],
    },
    { name: "Hospitality", examples: ["hotels", "venues", "events"] },
    { name: "Professional and B2B services where the brand is customer-facing", examples: [] },
  ] as Sector[],
};

export type Choice = { title: string; body: string };

/** Six reasons. Split at the first full stop where the document writes two
 *  sentences; carried whole where it writes one. */
export const why = {
  title: "Why Choose",
  strokeTitle: "ENH Marketing",
  items: [
    {
      title: "We produce the agreed-upon pieces of content monthly, not just plan.",
      body: "",
    },
    {
      title: "We report on enquiries, not followers",
      body: "Every monthly report ties activity to DMs, saves, profile visits, and enquiries. Follower count is context, not a KPI.",
    },
    {
      title: "Compliant creator campaigns",
      body: "We verify Advertiser Permit status before any creator campaign runs.",
    },
    {
      title: "We build for AI search as well as Google",
      body: "Your content, and ours, is structured so it can be cited by ChatGPT, Gemini, Perplexity, and Google AI Overviews.",
    },
    {
      title: "Arabic content through vetted regional partners where your audience warrants it.",
      body: "",
    },
    { title: "15 years in the UAE market.", body: "" },
  ] as Choice[],
  /** The line the document sets against the usual vanity metric. A substring of
   *  the second item's body, weighted in place. */
  emphasis: "Follower count is context, not a KPI.",
  // The four things the monthly report ties activity to, split from that same
  // item. Reconstruction: "Every monthly report ties activity to " + [0] + ", "
  // + [1] + ", " + [2] + ", and " + [3] + "." reproduces the sentence exactly.
  reportsOn: ["DMs", "saves", "profile visits", "enquiries"],
  reportsOnLead: "Every monthly report ties activity to",
  /** The metric the document declines to lead on, from the same item. */
  refuses: "Follower count",
  // The four systems named in "We build for AI search as well as Google".
  // Reconstruction: "Your content, and ours, is structured so it can be cited
  // by " + [0] + ", " + [1] + ", " + [2] + ", and " + [3] + "."
  citedByLead: "structured so it can be cited by",
  citedBy: ["ChatGPT", "Gemini", "Perplexity", "Google AI Overviews"],
  /** The tenure claim, as its own figure. A substring of the last item, which
   *  the ledger enlarges in place: the item already reads "15 years in the UAE
   *  market.", so the unit needs no second field and the sentence is never
   *  printed twice. */
  tenureFigure: "15",
};

export const faqs: Faq[] = [
  {
    q: "What does an Instagram marketing agency in Dubai do?",
    a: "An Instagram marketing agency in Dubai manages your presence on the platform: content strategy and visual direction, producing Reels, photography and carousels, publishing to a calendar, managing comments and DMs, running creator partnerships, and reporting on enquiries generated. The goal is qualified customer enquiries, not follower growth.",
  },
  {
    q: "How much does Instagram management cost in Dubai?",
    a: "It depends mainly on production volume: how many pieces of content are produced monthly, whether shoot days are included, the level of community management required, and whether creator partnerships are in scope. Ad spend is paid to Meta separately. We scope each engagement individually and send a written proposal with deliverables, output volume, KPIs, and a fee.",
  },
  {
    q: "How many posts should a business in Dubai publish per month?",
    a: "There is no universal number, and consistency matters more than volume. A typical UAE brand programme runs somewhere between twelve and twenty pieces per month across Reels, carousels and static posts, plus Stories on most days. The right figure depends on your production capacity and how competitive your category is.",
  },
  {
    q: "Do you shoot content in Dubai, or do we provide it?",
    a: "Yes, we have an in-house video production team that handles shoots at planned locations across the UAE. The exact shoot requirements will depend on the scope of the project and will be discussed with you in advance.",
  },
  {
    q: "Do we own the content you produce for us?",
    a: "Yes. Once the project is completed and paid for, you own the final approved content produced for your brand and can use it across your marketing channels. Raw footage and editable project files are not included unless agreed upon as part of the project scope. Any third-party assets, such as licensed music, stock footage or fonts, remain subject to their respective licensing terms.",
  },
  {
    q: "Is Instagram or TikTok better for a business in the UAE?",
    a: "It depends on your customer. TikTok has the larger UAE ad audience, at roughly 12.5 million adults against Instagram’s 8.05 million. Instagram tends to carry more weight at the consideration stage, when customers are sizing up your credibility before enquiring. Many UAE brands run both, with content produced once and adapted for each.",
  },
  {
    q: "Do I need a licence for influencer marketing in the UAE?",
    a: "Creators do. Since 1 February 2026, publishing advertising content online from within the UAE requires an Advertiser Permit issued by the National Media Authority, covering paid and unpaid promotion regardless of follower count. Compliance obligations extend to the brands and agencies commissioning the work, so permit status should be verified before contracting.",
  },
  {
    q: "How long before Instagram produces results?",
    a: "Profile and content improvements are visible within the first two to three weeks. Meaningful growth in reach and saved content typically builds over 60 to 90 days as the account establishes a consistent posting pattern. Enquiry volume follows reach, usually with a lag of a month or so.",
  },
  {
    q: "Which industries get the best results from Instagram in Dubai?",
    a: "Businesses where the buying decision is visual, and the customer checks your account before contacting you: food and beverage, retail and ecommerce, clinics and aesthetics, beauty, fitness, hospitality, real estate and interiors. If your customer would want to see your work or your space before enquiring, Instagram usually earns its budget.",
  },
  {
    q: "Do you manage Instagram Ads as well?",
    a: "Yes, as a separate service. Organic management builds the content library and the credibility; paid campaigns put that content in front of a defined audience at scale. Most clients run both, and the content produced for organic feeds directly into the ad account. See our Instagram Ads page for how paid campaigns are structured.",
  },
  {
    q: "Do you work with businesses outside Dubai?",
    a: "Yes. We work with clients across the UAE including Abu Dhabi and Sharjah, and with GCC brands targeting UAE audiences. Account management, strategy and reporting run remotely without any trouble. Content production is the part that needs a conversation, since shoots are location-dependent.",
  },
  {
    q: "What does the UAE Advertiser Permit mean for our brand?",
    a: "Brands must check that every creator has the required UAE Advertiser Permit before promotional content is published. We verify each creator’s permit before contracting and include the requirement in the agreement. Visiting creators must apply through an accredited UAE-based agency.",
  },
  {
    q: "How much does Instagram marketing cost, and when will I receive a quote?",
    a: "Pricing depends mainly on the amount of content required. After an initial call, we send a proposal within 2 to 3 working hours covering the deliverables, monthly output, timeline, KPIs and fee. We will also tell you if Instagram is unlikely to suit your business.",
  },
];

export const finalCta = {
  title: "Ready to Make Instagram",
  strokeTitle: "Work Properly?",
  body: "Tell us about your business and who you are trying to reach.",
  note: "We will come back within 2-3 hours with a straight answer on whether Instagram is the right channel for you, and if it is, a scoped proposal with clear deliverables.",
};

/** Form fields. The document asks for the business and the audience, so those
 *  are the fields rather than the ad-spend set the paid-media pages use. */
export const formFields = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "business", label: "About your business" },
  { id: "audience", label: "Who you are trying to reach" },
  { id: "handle", label: "Instagram handle" },
  { id: "referral", label: "How did you hear about us?", wide: true },
];

/** Mid-page CTA band, above the work section. Supplied in the document under
 *  "Instagram Marketing Agency Page CTA". Stored in sentence case and split
 *  across two lines for typesetting; the band uppercases it. */
export const growthCta = {
  heading: ["Ready to grow your", "brand on Instagram?"] as [string, string],
  support: "Boost Engagement, Reach & Conversions With Our Instagram Marketing Experts",
  button: "Connect With Instagram Experts",
};
