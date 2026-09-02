// Performance Marketing — page content.
// Copy source: "Performance Marketing.docx" (client-supplied, 2026-08-24).
// VERBATIM. Every string below is the client's own text. Headings are the
// document's own H2s, split across two lines only for typesetting. Do not add
// copy here: no invented labels, eyebrows, CTA microcopy or figures.

export type Reason = { no: string; title: string; body: string };
export type Channel = { name: string; href: string; body: string };
export type Stage = { no: string; title: string; body: string };
export type CompareRow = { area: string; performance: string; digital: string };
export type Faq = {
  q: string;
  a: string;
  /** A phrase inside `a` to render as a link. The answer text stays complete
   *  and unbracketed either way, so the FAQ structured data is unaffected and a
   *  page that omits this simply gets prose. */
  aLink?: { label: string; href: string };
};

export const meta = {
  title: "Performance Marketing Agency in Dubai | ENH Marketing",
  description:
    "Drive measurable growth with data-driven performance marketing campaigns designed to increase leads, conversions, and revenue for your Dubai business.",
};

export const hero = {
  // H1 split across three lines for typesetting only.
  lines: ["Performance", "Marketing", "in Dubai"] as [string, string, string],
  sub: "Drive measurable growth with data-driven performance marketing campaigns designed to increase leads, conversions, and revenue for your Dubai business.",
  primary: "Boost My Ad Performance",
  secondary: "Talk to a Performance Expert",
};

/** The transition between the hero and the reasons. Copy is the client's
 *  original hero text, reused verbatim.
 *  `emphasis` marks the phrase the headline turns on; `highlight` marks words
 *  the resolving paragraph picks out. Both are substrings of the text itself. */
export const narrative = {
  headline: ["Making Every Paid Channel", "Earn Its Budget"] as [string, string],
  question: "If you are putting money into paid media, you should know what that money is doing.",
  questionEmphasis: "what that money is doing",
  body: "We manage performance campaigns across Google, Meta, LinkedIn, TikTok, Snapchat and YouTube for businesses in the UAE, covering everything from campaign setup and optimisation to creative production and testing. Everything is reported clearly, so you can understand where the budget is going without having to decode a media report.",
  highlight: ["Google", "Meta", "LinkedIn", "TikTok", "Snapchat", "YouTube"],
};

export const reasons: Reason[] = [
  {
    no: "01",
    title: "We build for AI search as well as Google",
    body: "Your content is structured so it can be surfaced and cited by ChatGPT, Gemini, Perplexity and Google AI Overviews, which is increasingly where buyer research starts.",
  },
  {
    no: "02",
    title: "We report on cost per qualified lead",
    body: "Impressions and click-through rates are diagnostic. They are not the score, and they do not open a monthly report.",
  },
  {
    no: "03",
    title: "Creative testing is part of the service",
    body: "On paid social, the creative decides the result more than the targeting does, so testing it is not optional.",
  },
  {
    no: "04",
    title: "Fee and ad spend quoted as two numbers. Always",
    body: "If an agency hands you one combined figure, you cannot judge the media or the management, and that is usually the point.",
  },
  {
    no: "05",
    title: "We cut what is not working",
    body: "If a channel is not earning its budget, we say so in the report and move the money, rather than reporting the volume and hoping you do not ask.",
  },
  {
    no: "06",
    title: "Local market fluency",
    body: "Bilingual creative where it earns better results, and an understanding of how Ramadan, summer travel, and UAE buying seasons move performance.",
  },
];

export const channelsIntro =
  "As a 360° digital marketing agency in Dubai, we do all six in-house. Most clients run two or three. Start with one and add the next when it earns its place.";

export const channels: Channel[] = [
  {
    name: "Google Ads",
    href: "/services/performance-marketing/google-ads",
    body: "People are already searching for what you sell. This is how you get in front of them before a competitor does. Search, Shopping, Performance Max, and Display, built on the words your buyers type, not the ones that look good in a report.",
  },
  {
    name: "Meta Ads",
    href: "/services/performance-marketing/meta-ads",
    body: "Facebook and Instagram together reach the biggest combined audience in the country. Nobody scrolling it was looking for you, and that is the point. This is where you create demand, and where you win back the people who left without buying. On Meta, the ad itself decides the result more than the targeting does, so we test creative every week.",
  },
  {
    name: "LinkedIn Ads",
    href: "/services/performance-marketing/linkedin-ads",
    body: "B2B only. Target by job title, seniority, company size, industry or a named list of accounts, with Lead Gen Forms where the offer suits them. Clicks cost more here than anywhere else, which works when one deal pays for a hundred of them.",
  },
  {
    name: "TikTok Ads",
    href: "/services/performance-marketing/tiktok-ads",
    body: "Still written off as a teenagers' app but it has the largest adult audience of any platform in the UAE. Vertical, sound-on, hook in the first second, tested in volume. Recut TV ads die here, and fast.",
  },
  {
    name: "Snapchat Ads",
    href: "/services/performance-marketing/snapchat-ads",
    body: "Most Dubai agencies skip it. That is precisely why attention costs less on it. Strong with younger adults and across the wider Gulf, and useful when you need reach without Meta's floor price.",
  },
  {
    name: "YouTube Ads",
    href: "/services/performance-marketing/youtube-ads",
    body: "For anything that needs showing instead of saying. It sits inside Google, so search history and intent feed the targeting. Give it thirty seconds of something worth watching, and it will outwork a six-second logo every time.",
  },
];

export const organicNote = {
  body: "Organic social is a separate service. If you want the accounts run alongside the paid campaigns, see our",
  links: [
    { label: "Instagram marketing", href: "/services/social-media-marketing/instagram-marketing" },
    { label: "TikTok marketing", href: "/services/social-media-marketing/tiktok-marketing" },
    { label: "LinkedIn marketing", href: "/services/social-media-marketing/linkedin-marketing" },
  ],
  suffix: "pages.",
};

export const processIntro = "A 90-day structure, with campaigns live inside week two.";

export const stages: Stage[] = [
  {
    no: "01",
    title: "Audit and plan",
    body: "We go through your existing accounts, tracking and creative, agree the audiences and the offer, and map a channel plan with a budget split. You get an audit document and a media plan.",
  },
  {
    no: "02",
    title: "Tracking and launch",
    body: "Conversion events, server-side tracking where you need it, CRM connected. All of it before a dirham goes out. First campaigns live.",
  },
  {
    no: "03",
    title: "Testing phase from weeks 3-6",
    body: "Structured creative and audience tests, run at enough volume to give you a real answer instead of a hunch. You get your first performance read and a shortlist of what works.",
  },
  {
    no: "04",
    title: "Month 2 onward, we consolidate and scale",
    body: "Money moves to the campaigns earning the lowest cost per qualified lead. Weak campaigns get cut, not nursed. Monthly report and a revised plan.",
  },
];

export const processOutro =
  "Then we expand. Once one channel turns a profit, we add the next, because a second channel usually lowers the cost of the first.";

export const compare = {
  title: "Performance marketing and digital marketing: what's the difference?",
  lede: "Digital marketing covers every way a brand reaches people online, including SEO, content, email, social media and paid advertising. Performance marketing focuses more closely on measurable actions and the return generated from the budget.",
  rows: [
    {
      area: "Main focus",
      performance: "Driving specific actions that can be tracked",
      digital: "Building awareness, visibility, engagement and demand online",
    },
    {
      area: "Common goals",
      performance: "Leads, purchases, bookings, enquiries and app installs",
      digital: "Brand awareness, website traffic, search visibility, engagement, leads and sales",
    },
    {
      area: "Key metrics",
      performance: "Cost per lead, cost per acquisition, conversion rate, ROAS and LTV",
      digital: "Reach, impressions, engagement, organic traffic, rankings, share of voice, leads and revenue",
    },
    {
      area: "Review period",
      performance: "Monitored regularly and adjusted based on results",
      digital: "Reviewed over different periods depending on the channel and goal",
    },
    {
      area: "Typical activity",
      performance: "Paid search, paid social, shopping ads, retargeting, affiliate marketing and app acquisition",
      digital: "Performance channels, SEO, content, email, organic social and digital PR",
    },
    {
      area: "Main challenge",
      performance: "A strong focus on immediate results can leave less room for long-term brand building",
      digital: "Some results take longer to appear and can be harder to connect to one channel",
    },
  ] as CompareRow[],
  // The closing passage is a synthesis, not a contrast: it says the two work
  // together. Split into premise + the two roles it names + the outcome, so the
  // layout can show convergence. Substrings only, nothing added or reordered.
  synthesis: {
    premise: "Performance marketing works best as part of a wider digital strategy.",
    roleA: "It helps capture people who are already searching or ready to act.",
    roleB: "Brand, content and organic activity give more people a reason to notice and remember the business.",
    outcome:
      "When these efforts support each other, paid campaigns have a larger audience to reach and the business becomes less dependent on continually increasing its advertising spend.",
  },
};

export const fit = {
  title: "Where paid media pays off",
  lede: "Paid media works when the numbers behind it work: a margin that can carry acquisition cost, and an offer someone can understand inside a single ad.",
  // href links to the matching Industries page where one exists. Two entries
  // are deliberately unlinked: "Professional services" and "Home and trade
  // services" have no single counterpart in the sitemap, and sending them to an
  // approximate page would be worse than leaving them as plain text.
  industries: [
    { label: "Ecommerce and retail", detail: "fashion, beauty, homeware, speciality goods", href: "/industries/ecommerce-retail" },
    { label: "Real estate", detail: "brokerages, developers, off-plan sales, holiday homes", href: "/industries/real-estate-property" },
    { label: "Healthcare and aesthetics", detail: "clinics, dental, dermatology, cosmetic surgery", href: "/industries/healthcare-clinics" },
    { label: "Education and training", detail: "schools, universities, professional certification", href: "/industries/education-training" },
    { label: "Professional services", detail: "legal, audit, corporate services, company formation" },
    { label: "Technology", detail: "SaaS, fintech, IT services and managed service providers", href: "/industries/it-technology" },
    { label: "Hospitality and leisure", detail: "hotels, restaurants, venues, attractions", href: "/industries/hospitality-hotels" },
    { label: "Home and trade services", detail: "fit-out, maintenance, moving, automotive" },
  ],
};

/** The document's caveat, split for typesetting only. Concatenating lead +
 *  emphasis + commitment reproduces the original sentence exactly. */
export const caveat = {
  lead: "If your sale is long, relationship-led and has no clear trigger, paid media can support it,",
  emphasis: "but it will not lead it.",
  commitment: "We will tell you that at the proposal stage, not three months in.",
};

export const faqs: Faq[] = [
  {
    q: "What is performance marketing?",
    a: "Paid advertising bought against a measurable outcome, where every dirham traces back to what it produced. It covers paid search, paid social and paid video, and it is judged on cost per lead, cost per acquisition or return on ad spend. Reach and impressions are not the measure.",
  },
  {
    q: "What does a performance marketing agency in Dubai do?",
    a: "Plans and runs your paid campaigns on the platforms where your buyers are, produces and tests the creative, manages the budget week to week, and reports on what each channel produced commercially. What you should be buying is qualified leads or sales at a known cost.",
  },
  {
    q: "How much does performance marketing cost in Dubai?",
    a: "It comes down to four things: how many channels we run, how much creative we produce each month, how complex your tracking is, and your ad budget. Our fee and your ad spend are quoted separately, and ad spend goes to the platforms directly. Every engagement gets a written proposal.",
  },
  {
    q: "Which paid channel works best in the UAE?",
    a: "There is no best channel, only a best fit. TikTok reports the largest adult advertising audience in the UAE at 12.5 million, while LinkedIn reports 10.0 million registered members, where seniority sits rather than raw volume. Google Ads captures demand that already exists. Your buyer and your deal value decide it.",
  },
  {
    q: "Is ad spend included in your fee?",
    a: "No. Ad spend is paid to Google, Meta, LinkedIn, TikTok, Snapchat or YouTube directly, and our management fee is stated separately. Quote them as one number, and you can no longer tell whether the media or the management is working.",
  },
  {
    q: "How soon will we see results from paid campaigns?",
    a: "Search can produce leads in the first week, because the demand is already there. Paid social usually needs four to six weeks of creative testing before cost per lead settles. Scaling decisions need a full quarter of data, and we will say so instead of promising you a fortnight.",
  },
  {
    q: "What is the difference between performance marketing and lead generation?",
    a: "Performance marketing is where you buy attention: the paid channels and the media budget. Lead generation is what happens to that attention, plus the channels you already own, such as your list, WhatsApp, local search and your landing pages. Most programmes need both. See our lead generation page.",
  },
  {
    q: "Can we start with just one channel?",
    a: "Yes, and plenty do. Just know the ceiling. Google Ads is capped by how many people type your keywords this month, and once you have taken your share, growth means bidding higher for the same clicks. Paid social has the reverse problem: it creates interest in people who then go and search, and if nothing is waiting on Google, a competitor takes the sale. Run both, and each one makes the other cheaper.",
  },
  {
    q: "What can paid media not fix?",
    a: "Paid media accelerates whatever is already true about your business. It will not fix an offer people do not want, pricing that makes no sense, or a sales team that takes two days to reply. It will not fix paid traffic pointed at a homepage instead of a landing page either. If your margin cannot carry UAE acquisition costs, we will say so before you commit.",
  },
];

/** Cited because the FAQ publishes them as fact. Figures are ad-reach numbers
 *  the platforms self-report; DataReportal republishes them unmodified. */
// NOT RENDERED. Sources section removed from the page at the client's request
// (2026-08-26); kept for provenance of the figures quoted on the page.
export const sources = [
  {
    claim: "TikTok 12.5m adult ad audience; LinkedIn 10.0m members, UAE",
    label: "DataReportal, Digital 2026: The United Arab Emirates",
    href: "https://datareportal.com/reports/digital-2026-united-arab-emirates",
    published: "5 November 2025",
    note: "Data as of October 2025. LinkedIn's figure counts registered members, not monthly active users, so it is not directly comparable with TikTok's ad reach. TikTok's figure equates to 134.6% of the UAE's 18+ population, which reflects accounts reached rather than unique people.",
  },
];

export const finalCta = {
  title: "Tell us what you sell. We will tell you where to spend.",
  body: "Send us what you sell, who buys it, and what you are spending now. You will hear back within 3 to 4 hours with an honest answer on which channels are worth testing. If none of them are, we will tell you that too.",
};

/** The document's own H2s. Split across two lines for typesetting only:
 *  no word is added, removed or reordered. */
export const headings = {
  reasons: ["Why Choose ENH Marketing", "for Performance Marketing in Dubai"],
  channels: ["The Six Channels", "We Run For Your Business"],
  process: ["The First 90 Days of How Our", "Performance Marketing Process Works"],
  compare: ["Performance marketing and digital marketing:", "what\u2019s the difference?"],
  fit: ["Where Paid Media", "Pays Off"],
  // Two-line form taken from the homepage FAQ so the sections match.
  faqs: ["Questions,", "answered."],
  cta: ["Tell Us What You Sell.", "We Will Tell You Where to Spend."],
} as const;

/** Reused verbatim from src/components/sections/FAQ.tsx. Not new copy: it is
 *  the homepage's existing FAQ intro, carried over for consistency. */
export const faqLede =
  "Everything you need to know about working with Dubai\u2019s result-driven digital marketing agency.";

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";

/** Mid-page CTA strip, above the work section.
 *
 *  Supplied directly by the client on 2026-08-28 — this copy is NOT from the
 *  Performance Marketing document, unlike everything else in this file. Stored
 *  in sentence case and split across two lines for typesetting; the page
 *  uppercases it, which is how every other heading on the site is handled. */
export const growthCta = {
  heading: ["Ready to scale your", "business growth?"] as [string, string],
  support: "Drive More Leads, Sales & ROI With Our Performance Marketing Experts",
  button: "Get a Free Performance Marketing Strategy",
};

/** Results strip. Supplied directly by the client on 2026-08-28 — NOT from the
 *  Performance Marketing document. These are the agency's own first-party
 *  claims about its own results, so they carry no external citation.
 *
 *  Supplied as "ROAs Achieved", "Conversation Rate", "Ad Spent", "50000+" and
 *  "12-15%". The client approved correcting all five on 2026-08-28: ROAS is the
 *  standard casing for Return On Ad Spend, "Conversation" was a misspelling of
 *  "Conversion", "Spent" of "Spend", plus a thousands separator and an en dash
 *  for the range. The figures themselves are unchanged.
 *
 *  `figure` and `unit` are split so the unit can take the brand colour without
 *  the value being re-typed anywhere. */
export const results = [
  { figure: "3.5", unit: "x", label: "ROAS Achieved" },
  { figure: "12–15", unit: "%", label: "Conversion Rate" },
  { figure: "50,000", unit: "+", label: "Qualified Leads" },
  { figure: "1M", unit: "+", label: "Ad Spend" },
];

/** Benchmark readout — the six things optimisation actually moves.
 *
 *  Client-supplied on 2026-08-28, verbatim, including the em-dash ranges and
 *  "AED". NOT from the Performance Marketing document.
 *
 *  Supplied as a three-column table. It is deliberately not rendered as one:
 *  the very next section on the page is a comparison table, and two tables back
 *  to back would read as one long spreadsheet.
 *
 *  `figure` names the substring of `benchmark` to lift to display scale. It is
 *  a pointer into the sentence, not a second copy of the number, so the two can
 *  never drift apart. */
export const benchmarkColumns = {
  area: "What improved",
  benchmark: "Performance benchmark",
  meaning: "What it means commercially",
};

export const benchmarkIntro = {
  heading: ["The Numbers Behind Our", "Performance Marketing Results"] as [string, string],
  lede: "Headline figures show scale. This table goes deeper into what changed after optimisation from our experts.",
  footnote:
    "Results vary according to the industry, offer, budget, sales process and attribution setup.",
};

export const benchmarks = [
  {
    area: "Acquisition cost",
    benchmark: "15–25% reduction in qualified CPL or CPA",
    figure: "15–25%",
    meaning: "More qualified opportunities or customers from the same budget",
  },
  {
    area: "Qualified lead or sales volume",
    benchmark: "20–30% increase at a comparable level of ad spend",
    figure: "20–30%",
    meaning:
      "More enquiries, purchases or bookings without relying on clicks and impressions",
  },
  {
    area: "Lead quality",
    benchmark: "25–35% of paid leads becoming marketing-qualified leads",
    figure: "25–35%",
    meaning: "A greater proportion of leads fit the agreed customer profile",
  },
  {
    area: "Sales qualification",
    benchmark: "13–26% of marketing-qualified leads progressing to sales-qualified leads",
    figure: "13–26%",
    meaning: "More leads become genuine opportunities for the sales team",
  },
  {
    area: "Revenue efficiency",
    benchmark: "Customer lifetime value of at least 3× the acquisition cost",
    figure: "3×",
    meaning:
      "Every AED 1 spent acquiring a customer produces at least AED 3 in customer value",
  },
  {
    area: "Profitable budget scaling",
    benchmark: "1.5–2× budget growth while CPL, CPA or ROAS remains within 10–15% of target",
    figure: "1.5–2×",
    meaning: "Campaigns can absorb more spend without losing commercial efficiency",
  },
];
