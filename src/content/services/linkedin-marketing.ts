// LinkedIn Marketing — page content.
// Copy source: "LinkedIn Marketing.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// FIGURES. Every number is the document's: 90 days, week two, 60 to 90 days,
// two to three weeks, four to six weeks, 2 hours, and the one cited statistic —
// DataReportal's Digital 2026 report, 10.0 million UAE members in late 2025.
// The citation travels with the figure wherever it appears.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "LinkedIn Marketing Agency in Dubai | ENH Marketing",
  description:
    "Build a stronger B2B presence through company page management, founder-led content, targeted LinkedIn Ads, personalised outreach and reporting tied to meetings and pipeline.",
};

export const hero = {
  // Split so no line wraps at 375px: "LinkedIn Marketing" needs more than the
  // 327px available there and broke onto a second line, which pushed the hero
  // past the viewport and the trust strip below the fold. "in Dubai" stays the
  // brand line where it can be; here the third line has to carry "Agency in
  // Dubai", because that is the only three-way split on word boundaries where
  // no line exceeds the width available at 375px.
  lines: ["LinkedIn", "Marketing", "Agency in Dubai"] as [string, string, string],
  sub: "Build a stronger B2B presence through company page management, founder-led content, targeted LinkedIn Ads, personalised outreach and reporting tied to meetings and pipeline.",
  primary: "Get My LinkedIn B2B Plan",
  secondary: "Talk to Our LinkedIn Team",
};

/** The opening, which is a complaint about how the channel is usually sold. */
export const narrative = {
  heading: ["Where UAE Decision-Makers", "Are Already Paying Attention"] as [string, string],
  thesis: "Most agencies here sell LinkedIn as one tile in a social media package.",
  thesisEmphasis: "one tile in a social media package",
  body: "It gets the same treatment as Instagram, and it produces about as much B2B pipeline as you would expect from that.",
  agency:
    "ENH Marketing is a Dubai digital marketing agency with a dedicated LinkedIn team. We manage company pages, develop founder and executive profiles, write content people stop to read, run LinkedIn Ads and handle personalised outreach. The work is measured against meetings with decision-makers and pipeline generated.",
  closing: "We work with B2B companies across Dubai, Abu Dhabi and the wider GCC.",
};

/** Why the channel works here, and what that costs. The document gives three
 *  workforce traits and then the bill that comes with them. */
export const why = {
  title: "Why LinkedIn Is the Strongest",
  strokeTitle: "B2B Channel in the UAE",
  workforceLead: "The UAE has an unusual workforce.",
  // Reconstruction: traits[0] + ", " + traits[1] + ", and " + traits[2] + "."
  traits: ["Senior", "international", "mostly with half an eye on the next role"],
  reason: "People keep their profiles current here because their careers depend on it.",
  reach:
    "Almost every decision-maker you want to reach is on there, and a good number check it regularly.",
  noOther: "No other channel in this market can say that.",
  busy: "It also means the place is busy.",
  cost: "Attention costs money here, which is how a neglected company page and a loosely targeted ad account quietly get through a budget.",
};

export type Service = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** A sentence the document sets apart: a foundation claim, a failure mode, or
   *  the method that answers it. */
  note?: string;
  chipsLead?: string;
  chips?: string[];
};

/** Six services. The document is explicit that they are one setup rather than a
 *  menu, and that the first is the thing the rest stand on. */
export const services = {
  title: "Our LinkedIn Marketing",
  strokeTitle: "Services in Dubai",
  lede: "Six services that work as one setup.",
  ledeTail: "You can start with any of them, though they pull much harder together.",
  items: [
    {
      no: "01",
      title: "LinkedIn Company Page Management",
      glyph: "structure",
      body: "Your company page is the first place a buyer checks before a meeting. We make it worth checking. That means a tagline and about section written around what people actually search for, product and service tabs set up properly, posting often enough to stay in the feed, and someone watching the comments and messages so nothing sits there for three days.",
      note: "Everything else we do builds on this.",
    },
    {
      no: "02",
      title: "Executive and Founder Personal Branding",
      glyph: "entity",
      body: "People follow people. A founder's post will almost always beat the same message from the company page, and in this market it is the quickest route to warm inbound. Where it usually falls apart is the writing. Ghostwritten posts read like a brochure, and audiences work that out in about two seconds.",
      note: "So we start with how the leader actually talks. How they open a thought, the words they reach for, the stories and opinions they keep coming back to. Every post gets built around that, using structures we know hold attention and get people into the comments. Nothing publishes without your approval, so what your audience reads sounds like you.",
    },
    {
      no: "03",
      title: "LinkedIn Ads Management",
      glyph: "creative",
      // Reconstruction: chipsLead + " " + chips[0..3].join(", ") + " and "
      // + chips[4] + "." + " " + body
      chipsLead: "We run the full set:",
      chips: [
        "Sponsored Content",
        "Message Ads",
        "Document Ads",
        "Conversation Ads",
        "Lead Gen Forms",
      ],
      body: "Audiences get built by job title, seniority, company size, industry and named account lists. Creative gets tested properly rather than swapped out whenever someone tires of it. Conversions connect back to your CRM, so the number in front of you is what a qualified meeting actually cost.",
    },
    {
      no: "04",
      title: "LinkedIn Lead Generation and Outreach",
      glyph: "fanout",
      body: "A clear picture of who you are trying to reach, target lists built by hand, and connection and message sequences written by people. No automation that risks your account.",
      note: "The measure that matters is booked meetings with people who can actually sign, not connection counts.",
    },
    {
      no: "05",
      title: "Content and Thought Leadership",
      glyph: "text",
      body: "Posts, carousels, documents, native video, and longer articles, built around what your buyers are already asking. Most of those questions already exist in your sales calls and support conversations, so that is where we go looking.",
      note: "Each piece is written to earn a reply rather than fill a slot in the calendar.",
    },
    {
      no: "06",
      title: "Analytics, Attribution and Reporting",
      glyph: "reporting",
      body: "A monthly report covering reach, engagement, leads, meetings booked and pipeline value. Alongside it, what we are changing next month and why. We also track AI referral traffic and ask every enquiry how they found us, because more and more B2B buyers ask an AI assistant before they get anywhere near Google.",
    },
  ] as Service[],
  connect:
    "LinkedIn can also connect with wider digital marketing services, including landing pages, email nurture and Google Ads, when the B2B journey extends beyond the platform.",
};

export type StartOption = {
  label: string;
  fits: string;
  expect: string;
  /** Indices into `axis`: which stated moments this route begins at. */
  bands: number[];
  recommended?: boolean;
};

/** The document supplies this as a table: three routes, and the same two
 *  questions asked of each. The recommendation sits inside the third route's
 *  own "when it fits" cell, in its words. */
export const start = {
  title: "LinkedIn Ads or Organic LinkedIn Content:",
  strokeTitle: "Which Should You Start With?",
  lede: "It comes down to your timeline and your budget.",
  ledeTail: "Here is how we usually advise UAE clients.",
  columns: ["Start here", "When it fits", "What to expect"] as [string, string, string],
  /** The two moments the document names, in its own words. They are the only
   *  timings it gives, so they are the only ones drawn: `bands` says where each
   *  route STARTS producing, never how much it produces. No curve, no volume,
   *  no comparison of size — the document offers none of that and a shape would
   *  be inventing it. */
  axis: ["the first week", "60 to 90 days"] as [string, string],
  options: [
    {
      label: "Organic content and founder branding",
      bands: [1],
      fits: "You want lasting authority and warmer inbound, and you can give it a little time",
      expect:
        "Momentum builds over 60 to 90 days, and the trust it earns keeps paying back long after",
    },
    {
      label: "LinkedIn Ads",
      bands: [0],
      fits: "You need pipeline quickly and have budget to put in front of a defined audience",
      expect:
        "Leads can arrive within the first week, though cost per lead takes a few weeks of testing to settle",
    },
    {
      label: "Both together",
      bands: [0, 1],
      recommended: true,
      fits: "You want speed now and compounding authority later, and this is what we usually recommend",
      expect:
        "Ads buy reach now, and organic builds the credibility that makes those ads convert better",
    },
  ] as StartOption[],
};

export type Stage = { no: string; title: string; body: string; deliverable: string };

/** Four numbered stages and an unnumbered "Ongoing". Every one of them names
 *  what lands in the client's hands, which is why the run is drawn as work
 *  beside deliverable rather than as another timeline. */
export const process = {
  title: "How Our LinkedIn",
  strokeTitle: "Management Process Works",
  span: "A 90-day structure,",
  promise: "with something meaningful in your hands inside week two.",
  stages: [
    {
      no: "01",
      title: "Audit and strategy",
      body: "We go through your current page, profiles and ad account, agree who you are trying to reach by job title and industry, and map out the 90 days.",
      deliverable: "You get an audit document and a roadmap.",
    },
    {
      no: "02",
      title: "Foundations",
      body: "Company page and executive profiles rebuilt. Tracking, conversion events and CRM connection set up. For founder profiles, this is where we pin down the voice we will be writing in.",
      deliverable: "You get conversion-ready profiles and measurement that works.",
    },
    {
      no: "03",
      title: "Content engine live",
      body: "Editorial calendar approved, publishing starts across the company page and leadership profiles.",
      deliverable: "You get your first month of published content.",
    },
    {
      no: "04",
      title: "Paid and outreach",
      body: "Ads go live against the agreed audiences. Outreach sequences begin.",
      deliverable: "You get your first qualified conversations.",
    },
    {
      no: "",
      title: "Measure and scale",
      body: "Monthly reporting against pipeline. We cut what is not working and move the budget behind what is.",
      deliverable: "You get a monthly report and a revised plan.",
    },
  ] as Stage[],
  /** The document's own word for the unnumbered final phase. */
  ongoingLabel: "Ongoing",
};

export type Sector = { name: string; examples: string[] };

export const audience = {
  title: "Who We Run",
  strokeTitle: "LinkedIn Campaigns For",
  // Three conditions, and the document requires all of them. Reconstruction:
  // criteriaLead + " " + conditions[0] + ", " + conditions[1] + ", and "
  // + conditions[2] + "."
  criteriaLead: "We work with B2B companies in the UAE where",
  conditions: [
    "the sale takes some thinking about",
    "the deal size justifies spending on marketing",
    "you can name the buyer by job title",
  ],
  lede: "In practice that looks like:",
  // Examples split on commas only, so name + ": " + examples.join(", ")
  // reproduces each line and no trailing compound is torn in half.
  sectors: [
    {
      name: "Professional services",
      examples: ["legal", "audit", "tax", "management consulting", "corporate services and company formation"],
    },
    {
      name: "Technology",
      examples: ["SaaS", "fintech", "enterprise software", "IT services and managed service providers"],
    },
    {
      name: "Logistics, trade and supply chain",
      examples: ["freight forwarding", "3PL", "port and customs services"],
    },
  ] as Sector[],
  // Reconstruction: titlesLead + " " + titles[0..6].join(", ") + " and "
  // + titles[7] + "."
  titlesLead: "The job titles we usually target for UAE clients include",
  titles: [
    "Managing Director",
    "General Manager",
    "Chief Executive Officer",
    "Chief Financial Officer",
    "Chief Technology Officer",
    "Head of Procurement",
    "Country Manager",
    "Regional Director",
  ],
};

export type Claim = { title: string; body?: string };

/** Six claims. The fourth is a refusal and the fifth names four systems. */
export const whyEnh = {
  title: "Why Choose ENH Marketing Over",
  strokeTitle: "Other Digital Marketing Agencies in Dubai",
  items: [
    {
      title: "LinkedIn gets its own team here.",
      body: "Most Dubai agencies treat it as one tile in a social package and staff it accordingly. We run it as a channel in its own right.",
    },
    {
      title: "Founder content that sounds like the founder.",
      body: "We build around each leader's real voice and structures we know work, with a proper editing pass on everything, so your presence reads as authority earned by a person.",
    },
    {
      title: "Reports open with meetings booked and deal value.",
      body: "Every month, activity gets tied back to pipeline. If something is not producing meetings, we say so and change it.",
    },
    {
      title: "Outreach done by people.",
      body: "No automation tools, no bulk connection software, no risk to your account or your executives' profiles.",
    },
    {
      title: "We build for AI search as well as Google.",
      body: "Your content is structured so ChatGPT, Gemini, Perplexity and Google AI Overviews can pick it up, which is increasingly where B2B research starts.",
    },
    {
      title: "Local market fluency.",
      body: "Bilingual content where it earns engagement, an ear for how business runs here, and a working understanding of how decisions get made in family-owned groups compared with multinational regional offices.",
    },
  ] as Claim[],
  // The fifth claim names ChatGPT, Gemini, Perplexity and Google AI Overviews.
  // They are deliberately NOT lifted out into ledger chips: that slot replaces
  // the claim's body, which would have dropped "Your content is" and, more
  // importantly, "which is increasingly where B2B research starts" — the clause
  // that says why the four matter. They stay in the sentence.
  cta: "Request a Quote",
};

export const faqs: Faq[] = [
  {
    q: "What does a LinkedIn marketing agency in Dubai do?",
    a: "It looks after your whole presence on the platform: the company page, executive profiles, content planning and publishing, LinkedIn Ads, personalised outreach, and reporting tied to pipeline. The goal is qualified B2B meetings with UAE decision-makers rather than a bigger follower count.",
  },
  {
    q: "How much does LinkedIn marketing cost in Dubai?",
    a: "It depends on how many profiles we manage, how much content you need monthly, your outbound volume, and your ad budget, which goes to LinkedIn separately from our fee. Every engagement gets scoped individually, with a written proposal covering deliverables, KPIs and fees within a day of a first call.",
  },
  {
    q: "What is the difference between LinkedIn management and LinkedIn advertising?",
    a: "Management is the always-on organic work: your page, profiles, content calendar, engagement and inbound conversations. Advertising is the paid layer that puts a specific offer in front of specific job titles. Management builds credibility over months. Ads buy reach straight away. Anything that reliably produces meetings runs both.",
  },
  {
    q: "How do you make founder and executive content sound authentic?",
    a: "We spend time on how the leader genuinely thinks and speaks, then build every post around that voice using structures we know earn engagement. Each piece gets a proper editing pass and your approval before it goes live, so it reads as the real person and builds authority over time.",
  },
  {
    q: "Is LinkedIn worth it for B2B companies in the UAE?",
    a: "For most considered B2B sales here, yes. DataReportal's Digital 2026 report put LinkedIn at 10.0 million members in the UAE in late 2025, which is more than the adult population once you account for expatriate profiles and multiple accounts. Almost every decision-maker in this market holds one.",
  },
  {
    q: "How long does it take to get leads from LinkedIn?",
    a: "Profile and page work shows measurable improvement in the first two to three weeks. Organic reach and inbound enquiries usually build over 60 to 90 days. Ads can produce leads in the first week, though cost per lead normally needs four to six weeks of testing before it settles.",
  },
  {
    q: "Do you manage company pages or personal profiles?",
    a: "Both, and we recommend both. Company pages give you credibility and are what buyers check before a meeting. Personal profiles, especially founder and executive ones, earn far higher reach and warmer inbound, because people engage with people. Running the company page alone leaves most of the opportunity sitting there.",
  },
  {
    q: "Can you target specific job titles and companies in Dubai?",
    a: "Yes. LinkedIn lets you build audiences by job title, seniority, function, company size, industry, years of experience, skills and named account lists. For UAE clients that usually means reaching titles like Managing Director, CFO, Head of Procurement or Country Manager at a defined list of companies.",
  },
  {
    q: "What is the minimum budget for LinkedIn Ads in the UAE?",
    a: "LinkedIn sets a platform minimum daily spend per campaign, and realistic testing needs meaningfully more than that to gather enough data. It is a premium channel with higher click costs than Meta or Google, so it suits businesses whose deal value can carry them. If your budget is not viable yet, we will say so.",
  },
  {
    q: "Which industries in Dubai get the best results from LinkedIn?",
    a: "Sectors with considered, high-value sales and buyers you can identify: professional services, technology and SaaS, commercial real estate and construction, logistics and trade, financial services, healthcare, and energy and industrial suppliers. If your buyer can be found by job title and your deal size justifies the spend, LinkedIn generally works.",
  },
  {
    q: "How do you measure LinkedIn marketing results?",
    a: "Reach and engagement are in the report, but what decides whether the work continues is leads, meetings booked, pipeline value and cost per qualified meeting. We also track AI referral traffic and ask every enquiry how they found us, because plenty of B2B buyers now research through an AI assistant before they reach Google.",
  },
  {
    q: "Do you work with companies outside Dubai?",
    a: "Yes. We work with clients across the UAE including Abu Dhabi, Sharjah and Ras Al Khaimah, and with companies across the wider GCC and overseas who are targeting UAE buyers. Everything can run remotely, though we are happy to meet in person in Dubai.",
  },
];

export const finalCta = {
  title: "Ready to Make LinkedIn",
  strokeTitle: "Your Best B2B Channel?",
  body: "Tell us about your business and who you need to reach.",
  note: "We will come back within 2 hours with a straight answer on whether LinkedIn is the right channel for you, and if it is, a scoped proposal with clear deliverables and pricing.",
};

/** Form fields. The document asks for the business and who you need to reach. */
export const formFields = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "business", label: "About your business" },
  { id: "reach", label: "Who you need to reach" },
  { id: "profiles", label: "Profiles you want managed", wide: true },
  { id: "referral", label: "How did you hear about us?", wide: true },
];

/** Mid-page CTA band. Supplied under "LinkedIn Marketing Agency Page CTA".
 *  Stored in sentence case; the band uppercases it. */
export const growthCta = {
  heading: ["Ready to make your brand", "stand out on LinkedIn?"] as [string, string],
  support:
    "Build Your Professional Presence, Reach the Right Audience & Generate Quality B2B Opportunities With LinkedIn Marketing",
  button: "Get a Free LinkedIn Audit",
};
