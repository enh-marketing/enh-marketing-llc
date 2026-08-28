// Meta Ads — page content.
// Copy source: "Meta Ads.docx" (client-supplied, 2026-08-26). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.

import type { Reason, Stage, Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Meta Ads Agency in Dubai | Facebook & Instagram Ads | ENH Marketing",
  description:
    "Drive targeted traffic, generate quality leads, and grow your business with high-performing Meta Ads campaigns built for the Dubai market.",
};

export const hero = {
  lines: ["Meta Ads", "Agency", "in Dubai"] as [string, string, string],
  sub: "Drive targeted traffic, generate quality leads, and grow your business with high-performing Meta Ads campaigns built for the Dubai market. From strategy to optimisation, we turn your ad spend into measurable results.",
  primary: "Get a Free Meta Ads Strategy",
  secondary: "Talk to an Expert",
};

/** The opening argument. Split for typesetting; concatenation is the original. */
export const narrative = {
  headline: ["Know Exactly What Your", "Meta Budget Is Producing"] as [string, string],
  question:
    "Meta advertising is easy to start and easy to waste. The account gets set up, budget goes out, the dashboard fills with numbers, and a few months later nobody can say clearly which part produced customers and which part produced activity.",
  questionEmphasis: "easy to start and easy to waste",
  // `question` above is the whole sentence, kept for provenance. The page
  // typesets it in two scales rather than printing it twice: the run-up as
  // body copy, then its closing clause at display size, because the clause is
  // the argument. Concatenating lead + prefix + a + conjunction + prefix + b
  // reproduces the sentence word for word.
  questionLead:
    "Meta advertising is easy to start and easy to waste. The account gets set up, budget goes out, the dashboard fills with numbers, and a few months later nobody can say clearly",
  splitPrefix: "which part produced",
  splitA: "customers",
  splitConjunction: "and",
  splitB: "activity",
  body: "ENH Marketing is a Meta Ads agency in Dubai, managing Facebook and Instagram advertising for UAE businesses. We handle campaign strategy and structure, creative production and testing, audience and placement setup, conversion tracking, and click-to-WhatsApp campaigns.",
  highlight: ["Facebook", "Instagram", "WhatsApp"],
  oneBudget:
    "Facebook and Instagram are bought through the same platform, so we run them as one budget and allocate between them based on where your audience actually converts.",
};

export const compare = {
  title: "Meta Ads or Google Ads:",
  strokeTitle: "Which Should You Run?",
  lede:
    "As an experienced digital marketing agency in Dubai, we do get asked this question the most. The answer comes down to what each channel does rather than which one is better.",
  columns: ["Meta Ads (Facebook and Instagram)", "Google Ads"] as [string, string],
  rows: [
    {
      area: "What it does",
      performance: "Creates demand. Reaches people who are not looking for you yet",
      digital: "Captures demand. Reaches people already searching",
    },
    {
      area: "Targeted on",
      performance: "Who someone is: demographics, interests, behaviours, lookalikes",
      digital: "What someone typed",
    },
    {
      area: "Buying stage",
      performance: "Discovery and consideration",
      digital: "Intent and decision",
    },
    {
      area: "Creative dependency",
      performance: "Very high. Creative is the main performance variable",
      digital: "Lower. Copy and landing page matter more than visuals",
    },
    {
      area: "Typical cost per lead",
      performance: "Usually lower",
      digital: "Usually higher, though often better qualified",
    },
    {
      area: "Best for",
      performance: "New products, visual categories, offers, retargeting, click-to-WhatsApp",
      digital: "Established need, urgent services, branded and competitor terms",
    },
    {
      area: "Weakest for",
      performance: "Categories nobody buys on impulse",
      digital: "Products people do not know exist yet",
    },
  ],
  outro:
    "Most UAE businesses with a meaningful budget should run both. If you can only run one, the question is whether people are already searching for what you sell. If they are, start with Google. If they are not, start with Meta.",
};

export const whatsapp = {
  title: "Click-to-WhatsApp",
  strokeTitle: "Campaigns",
  claim: "The most underused Meta format in the UAE, and for many businesses here the highest-converting one.",
  body: "WhatsApp is how customers in this market actually contact businesses. A click-to-WhatsApp ad opens a conversation directly from the ad, instead of sending someone to a landing page, asking them to complete a form and waiting for a callback. That removes the step where most UAE traffic drops out.",
  fit: "It suits businesses where the sale involves a conversation: clinics and aesthetics, real estate, education and training, automotive, home services, restaurants taking bookings, and B2B services with a consultative sale.",
  // `fit` above is one sentence listing seven business types. Split at the
  // colon and the commas so the list renders as a list. Every fragment is the
  // sentence's own wording, unedited.
  fitLead: "It suits businesses where the sale involves a conversation:",
  fitItems: [
    "Clinics and aesthetics",
    "Real estate",
    "Education and training",
    "Automotive",
    "Home services",
    "Restaurants taking bookings",
    "B2B services with a consultative sale",
  ],
  setupHeading: "What we set up?",
  setup:
    "The campaign and audience, the ad creative and opening message, a greeting and quick-reply flow so enquiries do not stall, routing to the right person on your side, and tracking so you can see which ads produced which conversations.",
  // `setup` is one sentence describing five things in the order they happen.
  // Split on its commas; wording is the sentence's own.
  setupSteps: [
    "The campaign and audience",
    "The ad creative and opening message",
    "A greeting and quick-reply flow so enquiries do not stall",
    "Routing to the right person on your side",
    "Tracking so you can see which ads produced which conversations",
  ],
  // The two routes the copy contrasts. Labels are the copy's own nouns.
  slowPath: ["Ad", "Landing page", "Form", "Wait for callback"],
  fastPath: ["Ad", "Conversation"],
  caution: {
    // Split at the sentence break only: the document's own opening sentence
    // does the work of a heading, so none is written.
    label: "One caution we would raise early.",
    lead: "Click-to-WhatsApp generates volume, and",
    emphasis: "volume is worth very little if nobody answers.",
    commitment:
      "If your team cannot respond quickly during business hours, this format will cost you money and goodwill. We assess that before recommending it.",
  },
};

/** Reason plus an optional in-page target: the click-to-WhatsApp entry points
 *  at the section that explains it. */
export type Capability = Reason & {
  href?: string;
  /** Which animated mark the card carries. Presentation, not copy — the
   *  document supplies no icons, and this replaces the numerals on the cards. */
  glyph?: GlyphVariant;
};

export const capabilities: Capability[] = [
  {
    no: "01",
    title: "Account structure and strategy",
    glyph: "structure",
    body: "Campaign architecture built around your objective and your conversion values, rather than lifted from a template.",
  },
  {
    no: "02",
    title: "Creative production and testing",
    glyph: "creative",
    body: "Static, carousel, Reels and Stories formats, produced and tested systematically. Since automation handles targeting, creative volume is now the main performance lever.",
  },
  {
    no: "03",
    title: "Audience and placement setup",
    glyph: "audience",
    body: "Custom audiences, lookalikes, retargeting pools and exclusions built properly, with automation used where it earns its place.",
  },
  {
    no: "04",
    title: "Conversion tracking",
    glyph: "tracking",
    body: "Pixel and Conversions API, server-side where possible, with event configuration that matches how your business actually converts.",
  },
  {
    no: "05",
    title: "Click-to-WhatsApp and lead campaigns",
    glyph: "conversation",
    body: "Set up end to end, including the response flow.",
    href: "#click-to-whatsapp",
  },
  {
    no: "06",
    title: "Catalogue and ecommerce campaigns",
    glyph: "catalogue",
    body: "Product feeds, dynamic retargeting and shopping formats.",
  },
  {
    no: "07",
    title: "Reporting",
    glyph: "reporting",
    body: "Monthly, reconciling Meta's numbers against your actual results.",
  },
];

export const stages: Stage[] = [
  {
    no: "01",
    title: "Objective and measurement",
    body: "We agree what a conversion is worth to you, then set up the pixel, Conversions API and events to match. Getting this wrong at the start is what sends the algorithm after the wrong outcome.",
  },
  {
    no: "02",
    title: "Structure and creative",
    body: "Campaign architecture built around the objective, with the first batch of creative produced and prepared for testing.",
  },
  {
    no: "03",
    title: "Launch and learning phase",
    body: "Campaigns go live with both placements open. Early figures will look unstable, because they are.",
  },
  {
    no: "04",
    title: "Weeks 2 to 6",
    body: "Creative testing at enough volume to reach a conclusion, budget weighted toward the placements and audiences that convert, weak ad sets closed rather than nursed.",
  },
  {
    // The document calls this "Ongoing", not "Stage 5". Kept as its own word so
    // the page does not invent a numeral the source does not give it.
    no: "Ongoing",
    title: "Reconcile and scale",
    body: "Monthly reporting that shows Meta's figures alongside your own, with scaling decisions taken once the account has produced enough data to support them.",
  },
];

export const industries = {
  title: "Industries We Run",
  strokeTitle: "Meta Campaigns For",
  items: [
    { label: "Healthcare and aesthetics clinics", href: "/industries/healthcare-clinics" },
    { label: "Real estate", href: "/industries/real-estate-property" },
    { label: "Ecommerce and retail", href: "/industries/ecommerce-retail" },
    { label: "Food and beverage" },
    { label: "Education and training", href: "/industries/education-training" },
    { label: "Fitness and wellness", href: "/industries/beauty-wellness" },
    { label: "Automotive", href: "/industries/automotive" },
    { label: "Home and professional services" },
    { label: "Hospitality", href: "/industries/hospitality-hotels" },
  ],
};

export const faqs: Faq[] = [
  {
    q: "What does a Meta Ads agency in Dubai do?",
    a: "A Meta Ads agency manages your paid advertising on Facebook and Instagram: campaign structure, audience and placement setup, creative production and testing, conversion tracking, budget management and reporting. Both platforms are bought through the same Meta Ads Manager, so they are managed as one budget, with allocation based on where your audience converts.",
  },
  {
    q: "How much do Facebook and Instagram ads cost in Dubai?",
    a: "Two separate costs. Ad spend is paid directly to Meta and you control it. Our management fee is separate and depends on scope: number of campaigns, creative production requirements and account complexity. Costs per click and per lead vary widely by industry, so we model realistic figures for your category before you commit.",
  },
  {
    q: "What is the minimum budget for Meta ads?",
    a: "There is no platform minimum, but there is a practical one. Below a certain monthly spend, campaigns cannot gather enough conversion data to leave the learning phase, and results become unreliable. The threshold depends on your category and target cost per acquisition. If your budget sits below what we consider workable, we will say so.",
  },
  {
    q: "Should we advertise on Facebook or Instagram?",
    a: "Both, usually, since they are the same buy. Facebook has the larger UAE advertising audience at approximately 9.70 million adults against Instagram's 8.05 million. Facebook tends to perform for lead generation and services, Instagram for visual categories. We start with both placements open and let performance decide the split.",
  },
  {
    q: "Is Meta Ads better than Google Ads?",
    a: "They do different jobs. Meta creates demand by reaching people who are not searching yet. Google captures demand from people already looking. Most UAE businesses with meaningful budget run both. If people are already searching for what you sell, start with Google. If they are not, start with Meta.",
  },
  {
    q: "What are click-to-WhatsApp ads?",
    a: "Ads that open a WhatsApp conversation directly instead of sending someone to a landing page or form. In the UAE, where WhatsApp is the default business channel, that removes the step where most traffic drops out. It suits clinics, real estate, education, automotive and services, and it only works if your team responds quickly.",
  },
  {
    q: "Do we own the ad account and the data?",
    a: "Our standard position is that you do. Campaigns run in your Business Manager, and the pixel, Conversions API setup, custom audiences and historical data stay with you if the engagement ends. Ask every agency you shortlist this question, and get the answer in writing before you sign.",
  },
  {
    q: "Why do Meta's numbers not match our CRM?",
    a: "Because they count different things. Since the iOS privacy changes, Meta models a portion of conversions rather than observing all of them, and attribution windows differ from how your sales team records leads. We report both figures side by side and use the Conversions API to capture more conversions server-side.",
  },
  {
    q: "How long before Meta ads produce results?",
    a: "Traffic and engagement usually arrive within days. Reliable optimised performance typically takes four to six weeks, because campaigns need enough conversion data to exit the learning phase and creative needs several testing cycles. Stable results inside two weeks would be unusual, and not something to plan around.",
  },
  {
    q: "Do you produce the ad creative?",
    a: "Creative is now the largest performance variable in Meta advertising, because the platform's automation handles most of the targeting. We produce static, carousel and short-form video creative and test it systematically. Campaigns running unadapted brand assets or stock imagery generally underperform regardless of how well the account is set up.",
  },
  {
    q: "Do you use Advantage+ campaigns?",
    a: "Where they earn their place. Meta's automation is genuinely good at finding audiences and allocating budget once it has conversion data. It does not write your offer, produce your creative, structure your account or set up your tracking. We use automation where it performs and keep manual control where it does not.",
  },
  {
    q: "Do you run Meta ads alongside organic social?",
    a: "Yes, and they work better together. Organic content shows which creative resonates before you pay to distribute it, and content that performs organically usually performs as advertising. See our Instagram and Facebook marketing pages for the organic side.",
  },
];

/** FAQ 4 publishes reach figures as fact, so they carry a citation. Same
 *  DataReportal report already cited on the Performance Marketing page. */
// NOT RENDERED. The client asked for the Sources section to be removed from the
// page (2026-08-26). Kept here so the provenance of the 9.70m / 8.05m audience
// figures quoted in FAQ 4 stays on record — those figures are now published
// without a visible citation.
export const sources = [
  {
    label: "DataReportal, Digital 2026: The United Arab Emirates",
    href: "https://datareportal.com/reports/digital-2026-united-arab-emirates",
    published: "5 November 2025",
    note: "Data as of October 2025. Facebook 9.70m and Instagram 8.05m are the platforms' own self-reported advertising reach, republished unmodified; they count accounts reached rather than unique people.",
  },
];

// NOT RENDERED. The client asked for the Organic section to be removed from the
// page (2026-08-26). FAQ 12 still refers to running Meta ads alongside organic
// social, but the page no longer links to those pages.
export const organicNote = {
  body: "See our",
  links: [
    { label: "Instagram marketing", href: "/services/social-media-marketing/instagram-marketing" },
    { label: "Facebook marketing", href: "/services/social-media-marketing/facebook-marketing" },
  ],
  suffix: "pages for the organic side.",
};

export const finalCta = {
  title: "Ready to Fix Your",
  strokeTitle: "Meta Campaigns?",
  // TODO(client): the document leaves the response time as "[X] hours".
  body: "Tell us your objective and your current monthly spend. We will come back within [X] hours with a view on what is working, what is not, and a scoped proposal.",
};

/** Form fields this page's document specifies (differs from Performance
 *  Marketing: budget range and current platforms instead of ad spend). */
export const formFields = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "industry", label: "Industry" },
  { id: "budget", label: "Monthly ad budget range" },
  { id: "platforms", label: "Current platforms" },
  { id: "referral", label: "How did you hear about us?", wide: true },
];

/** Mid-page CTA band, above the work section.
 *
 *  Supplied directly by the client on 2026-08-28 — this copy is NOT from the
 *  Meta Ads document, unlike everything else in this file. Stored in sentence
 *  case and split across two lines for typesetting; the band uppercases it and
 *  sets the second line in brand red, which is the one accent it allows itself. */
export const growthCta = {
  heading: ["Ready to turn Meta Ads", "into real results?"] as [string, string],
  support:
    "Reach Your Ideal Audience, Generate Quality Leads & Maximise Your ROI With High-Performance Meta Advertising",
  button: "Get a Free Meta Ads Audit",
};
