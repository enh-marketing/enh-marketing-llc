// ENH V3 — flagship narrative copy + the complete live content of enhmedia.com.
// All 22 case studies, 8 services, 7 testimonials, 6 FAQs, 30 clients,
// partner badges and footer links are included.

export const brand = {
  name: "ENH",
  legal: "ENH Marketing LLC",
  tagline: "Explore New Heights",
  growthLine: "Your Digital Growth Experts",
  city: "Dubai",
  email: "info@enhmedia.com",
  phone: "+971 4 239 0828",
  phoneHref: "+97142390828",
  whatsapp: "97142390828",
  address: "#207, Arcade Building, Al Garhoud, Dubai, UAE",
};

// Site structure lives in @/lib/sitemap. This file is content only.

// TODO(client): swap in the real profile URLs.
export const social = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];

/** The hero H1, split across the three treatments the design gives it:
 *  [0] plain and [1] stroked share the first line, [2] takes the second in
 *  brand. Read together they are the headline the homepage document supplies,
 *  "Explore New Heights with Smarter Digital Marketing", unaltered — the split
 *  is where the line breaks fall, not an edit to the words. */
export const heroWords = ["Explore", "New Heights", "with Smarter Digital Marketing"];

/** THE HOMEPAGE H1. The document sets this line as its own H4, under the
 *  headline; the design's only slot for it is the eyebrow above, and team
 *  direction made it the page's H1 while leaving the display headline below it
 *  at its own size as the H2.
 *
 *  "ENH Marketing," CAME OFF THE FRONT at the team's request, so the H1 leads
 *  on what the page is trying to rank for rather than on the brand. "The" is
 *  capitalised because the line now opens a heading instead of sitting in the
 *  middle of one; it renders uppercase either way, so this is about the text a
 *  crawler and a screen reader get, not about what is on screen. */
export const heroEyebrow = "The Best Digital Marketing Agency in Dubai, UAE";

export const heroSub =
  "For more than 15 years, we have helped startups, SMEs, and enterprises across the UAE turn digital visibility into qualified leads and sales, supported by practical AI where it adds value.";

/** Partner and certification badges shown in the homepage hero.
 *
 *  `src` points at the official artwork issued by Meta and Google. These are
 *  deliberately NOT drawn by hand: they are third-party trademarks and, more to
 *  the point, credentials. Google's badge guidelines require approved files
 *  only and forbid distorting, recolouring or animating the mark, so a
 *  redrawn approximation would be both off-brand and a fabricated credential.
 *
 *  Drop the four files into /public/badges and fill in `src` below. A badge
 *  with an empty `src` is skipped, so the hero stays clean until the artwork
 *  is in place. PNG is safest — next/image needs an extra config flag to serve
 *  SVG. `w`/`h` are the file's intrinsic pixel size and only set the aspect
 *  ratio, so they need to be in proportion rather than exact.
 *
 *  Full colour on a white plate is the compliant treatment on a dark page:
 *  Meta allows full colour on white and monochrome white on dark, and the
 *  plate keeps the required clear space around each mark. */
export type PartnerBadge = { src: string; alt: string; w: number; h: number };

/** Issued partner and certification badges. Alt text is the wording printed on
 *  each mark, not a paraphrase — these are credentials, so the accessible name
 *  has to match what the badge actually says. */
export const partnerBadges: PartnerBadge[] = [
  { src: "/badges/google-partner.jpg", alt: "Google Partner", w: 500, h: 274 },
  { src: "/badges/meta-business-partner.webp", alt: "Meta Business Partner", w: 500, h: 286 },
  { src: "/badges/google-ads.png", alt: "Google Ads AI-Powered Performance Certified", w: 380, h: 379 },
  { src: "/badges/shopping-ads.png", alt: "Shopping Ads Certified", w: 500, h: 500 },
];

export const manifesto =
  "Every brand has a height it hasn't reached yet. A market it hasn't moved. A story it hasn't told loudly enough. We exist for that gap — between where you are and where you refuse to stop short of. We are ENH. And we climb with you.";

export const stats = [
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 4200, suffix: "+", label: "Successful projects" },
  { value: 95, suffix: "%", label: "Client retention" },
  { value: 22, suffix: "+", label: "Team of experts" },
];

export type ClientLogo = {
  src: string;
  /** The client's name as its own artwork spells it. */
  alt: string;
  /** Intrinsic pixel size. Only the ratio matters -- it is what stops the row
   *  reflowing as each logo loads. */
  w: number;
  h: number;
};

/** The client wall.
 *
 *  IT WAS THIRTY NAMES IN A TYPEFACE. This list used to be `string[]`, and
 *  TrustStrip drew each entry as a chip with a two-letter monogram and the name
 *  set in Cabinet Grotesk. So a section whose entire job is "these companies
 *  hired us" showed no company's actual mark, and every one of them appeared in
 *  ENH's own brand font -- which is the one thing a logo wall must not do. The
 *  real marks are in /public/trust now, supplied by the team.
 *
 *  ORDER IS THE TEAM'S, exactly as the files were handed over.
 *
 *  ALT TEXT IS READ OFF THE ARTWORK, NOT OFF THE FILENAME, and every one of
 *  the thirty-one was opened to check. That was not ceremony -- ten of them
 *  disagreed with the old name list, and one filename is simply wrong:
 *
 *    ekx.webp          the mark reads EKC, "Most Trusted Gas Cylinder". So the
 *                      list's "EKC" is this file and its "EKX" is the name with
 *                      no logo, which is the opposite of what the filename says
 *    comply.webp       COMPLYFIN, not "Comply"
 *    chs.webp          CHS Community Pharmacy, not "CHS Pharmacy"
 *    ttc.webp          The Travel Collection; the mark is Arabic calligraphy
 *                      over those three words and never prints "TTC"
 *    all-day.webp      allday retail, not "Allday"
 *    top-shelf.webp    Top Shelf Technical Services, not "Top Shelf"
 *    fapinex.webp      FAPINEX, not "Fabinex"
 *    altas-cop-co.webp Atlas Copco, not "Atlas"
 *    axcl.webp         AXCL, set in caps
 *    manipal.webp      Manipal Academy of Higher Education, not "Manipal"
 *
 *  THE RULE, where a mark prints more than a name: the brand, without taglines
 *  or legal suffixes. So Procat rather than "Procat Professional Catering &
 *  Beyond", Saifee Computers rather than "saifee -- Making ERP & IT work for
 *  you", Blue Bell Shipping rather than "Blue Bell Shipping L.L.C.".
 *
 *  TWO MARKS HAD NO NAME IN THE LIST AT ALL and are named from their own
 *  artwork rather than guessed: `aao.png` reads "Abdullah Al Othaim Leisure
 *  Co." and the file delivered as "download-removebg-preview (1).png" reads
 *  "desertcart" -- renamed to desertcart.png here, since a build asset should
 *  not be called that.
 *
 *  ONE NAME LOST ITS PLACE. "EKX" was in the old list and no logo was supplied
 *  for it, so it is not on the wall. Nothing was invented to fill the gap; drop
 *  a file in /public/trust and add a line here. */
export const clients: ClientLogo[] = [
  { src: "/trust/aao.png", alt: "Abdullah Al Othaim Leisure Co.", w: 531, h: 145 },
  { src: "/trust/ekx.webp", alt: "EKC", w: 651, h: 378 },
  { src: "/trust/ariiz.webp", alt: "Ariiz International", w: 297, h: 57 },
  { src: "/trust/desertcart.png", alt: "desertcart", w: 482, h: 104 },
  { src: "/trust/blue-bell.webp", alt: "Blue Bell Shipping", w: 300, h: 117 },
  { src: "/trust/axcl.webp", alt: "AXCL", w: 100, h: 120 },
  { src: "/trust/chs.webp", alt: "CHS Community Pharmacy", w: 741, h: 249 },
  { src: "/trust/bw.webp", alt: "BW Interiors", w: 200, h: 75 },
  { src: "/trust/comply.webp", alt: "Complyfin", w: 335, h: 35 },
  { src: "/trust/masterkraft.webp", alt: "Masterkraft", w: 300, h: 39 },
  { src: "/trust/manipal.webp", alt: "Manipal Academy of Higher Education", w: 197, h: 57 },
  { src: "/trust/fapinex.webp", alt: "FAPINEX", w: 1293, h: 1337 },
  { src: "/trust/nalsoft.webp", alt: "Nalsoft", w: 1956, h: 416 },
  { src: "/trust/matrix.webp", alt: "Matrix Finishes", w: 2560, h: 1254 },
  { src: "/trust/pkf.webp", alt: "PKF UAE", w: 238, h: 91 },
  { src: "/trust/new-east.webp", alt: "NewEast", w: 180, h: 30 },
  { src: "/trust/supercad.webp", alt: "Supercad", w: 200, h: 71 },
  { src: "/trust/taxol.webp", alt: "Texol", w: 1553, h: 696 },
  { src: "/trust/saifee.webp", alt: "Saifee Computers", w: 1021, h: 467 },
  { src: "/trust/top-shelf.webp", alt: "Top Shelf Technical Services", w: 250, h: 65 },
  { src: "/trust/trosten.webp", alt: "Trosten", w: 300, h: 62 },
  { src: "/trust/ttc.webp", alt: "The Travel Collection", w: 226, h: 184 },
  { src: "/trust/all-day.webp", alt: "Allday Retail", w: 530, h: 194 },
  { src: "/trust/trc.webp", alt: "TRCpamco", w: 2011, h: 394 },
  { src: "/trust/altas-cop-co.webp", alt: "Atlas Copco", w: 582, h: 280 },
  { src: "/trust/bin-dasmal-group.webp", alt: "Bin Dasmal Group", w: 412, h: 324 },
  { src: "/trust/dubai-duty-free.webp", alt: "Dubai Duty Free", w: 340, h: 335 },
  { src: "/trust/dubai-lslamic-bank.webp", alt: "Dubai Islamic Bank", w: 621, h: 202 },
  { src: "/trust/procat.webp", alt: "Procat", w: 668, h: 190 },
  { src: "/trust/rhs-logistic.webp", alt: "RHS Logistics", w: 453, h: 329 },
  { src: "/trust/venesta.webp", alt: "Venesta", w: 564, h: 135 },
];

export type Craft = {
  no: string;
  title: string;
  tag: string;
  body: string;
  items: string[];
  /** The service pillar this card is the homepage's summary of, so the card can
   *  offer a way in. A path rather than a sitemap import because this file is
   *  content and `@/lib/sitemap` owns structure -- the same split the service
   *  content files already use for `ChannelScroller`'s channels. The section
   *  guards every one with `routeExists`, and `npm run check:craft-links`
   *  fails on a path the sitemap does not contain, so a typo cannot quietly
   *  cost a card its link.
   *
   *  Absent on AI Hub: `AI_HUB_HREF` in the sitemap is still "#" because the
   *  hub has no landing page of its own yet, and there is no honest single
   *  destination among its eight children. That card carries no link until the
   *  hub ships, at which point adding the path here lights it up. */
  href?: string;
};

/** The seven service lines the homepage document lists, in its order, with its
 *  titles and its descriptions verbatim.
 *
 *  `tag` and `items` are the card's own furniture and the document supplies
 *  neither, so nothing here is invented to fill them: the tags are the ones
 *  these cards already carried, and the item lists are the service's real child
 *  pages as named in src/lib/sitemap.ts. Two cards had no predecessor to borrow
 *  from — Performance Marketing, which replaces the old "Search Advertising"
 *  card, and AI Hub, which is new — so both take their items from the sitemap.
 *
 *  What went: the standalone "Content Creation" card. The document's list does
 *  not carry one, and the site's content pages live under SEO ("SEO Content
 *  Creation") and Social Media Marketing ("Social Media Content Creation")
 *  rather than as a service of their own. */
export const crafts: Craft[] = [
  {
    no: "01",
    title: "Search Engine Optimization",
    href: "/seo-company-in-dubai",
    tag: "Organic Growth",
    body: "Improve your search visibility with technical SEO, content and local optimisation that attract relevant traffic and turn searches into qualified business opportunities.",
    items: ["Technical & on-page SEO", "Local SEO services", "Ecommerce SEO", "Authority building"],
  },
  {
    no: "02",
    title: "Performance Marketing",
    href: "/performance-marketing-agency-dubai",
    tag: "PPC & Performance",
    body: "Connect paid media, landing pages and analytics through performance marketing campaigns designed to generate measurable leads, sales and returns from every channel.",
    items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "YouTube Ads"],
  },
  {
    no: "03",
    title: "Social Media Marketing",
    href: "/social-media-agency-in-dubai",
    tag: "Community & Content",
    body: "Build an active social presence with platform-specific content, community management and paid campaigns that grow reach, engagement and meaningful customer action online.",
    items: ["Facebook marketing", "Instagram marketing", "Community management", "Paid social"],
  },
  {
    no: "04",
    title: "Web Design & Development",
    href: "/web-design-company-dubai",
    tag: "Web & Experience",
    body: "Create a fast, user-friendly website shaped around your business, your audience and the actions you want visitors to take on every device.",
    items: ["UX & UI design", "Development", "E-commerce builds", "Website support services"],
  },
  {
    no: "05",
    title: "Lead Generation",
    href: "/lead-generation-company-dubai",
    tag: "Pipeline & Demand",
    body: "Reach decision-makers with focused lead generation campaigns designed to build a pipeline and create more valuable, qualified sales conversations for your business.",
    items: ["Demand generation", "Funnel design", "Marketing automation", "Sales enablement"],
  },
  {
    no: "06",
    title: "Video Marketing",
    href: "/video-production-services-dubai",
    tag: "Film & Motion",
    body: "Use strategic video content across websites, social media and paid campaigns to attract attention, explain your offer and move viewers towards action.",
    items: ["Corporate & brand films", "Event videos", "Explainer & testimonial", "Social video"],
  },
  {
    no: "07",
    title: "AI Hub",
    tag: "Applied AI",
    body: "Explore AI solutions for marketing, automation and search visibility that improve efficiency, connect systems and support smarter business growth across your organisation.",
    items: ["AI Search Visibility", "AI & Automation", "Conversational AI", "Campaign Intelligence"],
  },
];

// THE CASE STUDIES MOVED, AND THE STOCK PHOTOGRAPHS WENT WITH THEM.
//
// `WorkItem`, `work` and `workImages` used to live here: twenty-two clients
// with their figures, and a map of Unsplash URLs chosen to suggest each one's
// industry. Both are gone.
//
// The studies are now migrated content, one file per client in
// src/content/case-studies/, taken from the live enhmedia.com/case-studies
// pages with their captions verbatim, their four figures unchanged, and their
// own result-card artwork downloaded into public/case-studies/. Read them
// through src/content/case-studies.ts; `all()` is what the homepage carousel,
// the archive and every service page now render.
//
// The Unsplash map is not coming back. A stock photograph standing in for a
// piece of client work, on a section selling that work, is the same mistake as
// a stock photograph on an article hero, and the real artwork exists.

/* The document gives this section seven sentences and a partner band, and they
   are named here so the run below can be read against the source. A1..A3 are
   its first paragraph, B1..B4 its second, G the band. B2 is the coverage
   sentence and is split across the four network panels: `COVER_LEAD`, the four
   `beats`, and `COVER_TAIL` rejoin with single spaces into B2 exactly, which is
   what lets a horizontal run BE the sentence rather than describe it. */
const A1 =
  "With over 15 years of digital marketing experience and hundreds of happy customers, we are a reliable digital marketing company in Dubai, UAE, delivering value and ROI.";
const A2 =
  "As a certified partner of Google Business, we have received special recognition from Google for providing exceptional customized digital marketing services in Dubai, UAE.";
const A3 =
  "We use a method focused on data and intelligent analysis of information to manage pay-per-click advertising campaigns.";
const B1 =
  "This helps guide our digital marketing decisions and maximize sales and return on investment in digital marketing.";
const B3 =
  "We strongly believe in the steady growth of Google Ads accounts through constant digital marketing supervision.";
const B4 =
  "This allows businesses to achieve the best possible results from their digital marketing efforts.";
const G_BODY =
  "Gain trust in your digital marketing agency in Dubai, UAE through the Google Partner network. Being an official Google Partner agency, we hold the esteemed recognition of being an elite business partner acknowledged by Google. Collaborate with us to harness the digital marketing expertise of proven digital marketers dedicated to advancing your online business digital marketing growth.";
const COVER_LEAD =
  "We fully use Google's different advertising options, creating ads on digital marketing";
const COVER_TAIL =
  "networks to engage users at various stages as they move toward making their final decision.";

export const whyENH = {
  heading: "Why ENH Marketing",
  /** The section's H2, split across the two lines the design sets it on. */
  title: ["Why ENH Is Among the Best", "Digital Marketing Agencies in Dubai"],

  /** THE CREDENTIAL THE WHOLE SECTION HANGS OFF, AND THE REASON IT IS BUILT
   *  THE WAY IT IS.
   *
   *  Read the document's seven sentences for this section together and every
   *  one of them is Google: a certified partner of Google Business, special
   *  recognition from Google, pay-per-click campaigns, Google's four ad
   *  networks, the steady growth of Google Ads accounts, the Google Partner
   *  network. It is not a general "why us" list, it is one credential with
   *  facets. So the credential is held in place and the case moves past it,
   *  rather than being the last box in a row of peers. */
  credential: {
    title: "We are a certified Google Partner",
    body: G_BODY,
  },

  /** The case, in the document's order. One entry carries the four networks;
   *  its `lead`, `beats` and `tail` rejoin into the document's coverage
   *  sentence character for character, so promoting the four buried names to
   *  display scale costs no rewording and prints nothing twice. */
  case: [
    { body: [A1] },
    { body: [A2] },
    { body: [A3, B1] },
    {
      networks: {
        lead: COVER_LEAD,
        beats: ["search,", "shopping,", "display,", "and YouTube"],
        tail: COVER_TAIL,
      },
    },
    { body: [B3, B4] },
  ] as { body?: string[]; networks?: { lead: string; beats: string[]; tail: string } }[],
};

export const ai = {
  heading: "Make AI Useful for Your Business",
  /** The H2, split across the two lines the design sets it on: the first
   *  plain, the second in brand. */
  title: ["Make AI Useful", "for Your Business"],
  /** The document gives this section one paragraph of two sentences and the
   *  design has two slots for it — a statement line and the body beneath. The
   *  sentences take one slot each, so both are filled and no word is dropped
   *  or added. */
  sub: "AI works best when it solves a clear business problem.",
  paragraphs: [
    "ENH Marketing helps you apply it across marketing, search, automation, and customer journeys to improve efficiency and support better decisions.",
  ],
  /** THE FOUR NOUNS IN `paragraphs[0]` ARE THESE FOUR CARDS.
   *
   *  "apply it across marketing, search, automation, and customer journeys" is
   *  the section's own contents page, and nothing on the page used to connect
   *  it to the grid underneath -- so the sentence read as filler and the cards
   *  read as four unrelated features. `domain` is a verbatim substring of that
   *  paragraph: the section marks it there, once, and the register below is in
   *  the card order, so the list and the register are visibly the same four
   *  things without either being reprinted.
   *
   *  The two orders differ -- the sentence puts search second, the card list
   *  puts automation second -- and neither is rearranged to agree with the
   *  other, because both are the document's. */
  capabilities: [
    { domain: "marketing", title: "AI-Powered Marketing", body: "Use AI to improve targeting, content planning, and campaign decisions, helping your team move faster while keeping people in control." },
    { domain: "automation", title: "Intelligent Automation", body: "Automate repetitive marketing and operational tasks, connect systems, and give your team more time for work that needs human attention." },
    { domain: "search", title: "AI Search Visibility", body: "Structure and strengthen your content so search engines and AI assistants can understand your business, services, and expertise more clearly." },
    { domain: "customer journeys", title: "AI Customer Experience", body: "Use intelligent chatbots and personalised digital journeys to answer questions, guide prospects and make every online interaction more relevant and useful." },
  ],
  cta: "Explore Our AI Hub",
};

export const process = [
  { no: "01", title: "Base Camp", body: "We listen harder than anyone you've hired. Audit, market mapping, and the honest conversation about where you actually stand." },
  { no: "02", title: "The Route", body: "Strategy is choosing what not to do. We chart the channels, creative and budget that reach your summit — and kill everything else." },
  { no: "03", title: "The Climb", body: "Sprints, not slogs. Campaigns ship in weeks, learnings ship in days, and you see every move on a live dashboard." },
  { no: "04", title: "The Summit", body: "Results, recorded. Then we look up — because every summit is base camp for the next one." },
];

export type Testimonial = { quote: string; name: string; org: string };

// All 7 live testimonials.
export const testimonials: Testimonial[] = [
  {
    quote: "A reliable agency providing accurate, effective and best SEO services to increase visibility, engagement and traffic. It has helped our business immensely — looking forward to many more years together.",
    name: "Kevin Sebi",
    org: "Autobahn Car Rental",
  },
  {
    quote: "We've done business with ENH for many years — extremely co-operative even with last-minute requests. Rankings improved, and the quality of inbound leads improved too. Highly recommended.",
    name: "Yusuf Sabir",
    org: "Director — ERP Solutions, Saifee Computers",
  },
  {
    quote: "They built our network online incredibly quickly — a high-value client within the first three weeks. Highly recommend ENH if you want to build your presence aggressively.",
    name: "Murali Krishnan N",
    org: "Division Manager, CMS Printing Press LLC",
  },
  {
    quote: "Very impressed with the team's customer-centric approach, dedication and level of communication. No hesitation recommending team ENH as a reliable partner.",
    name: "Aravindakshan Variath",
    org: "General Manager, UB Emirates LLC",
  },
  {
    quote: "Their dedicated team gives personal attention to our website and SEO, with encouraging results. We continue to receive very good inquiries and promising leads.",
    name: "Rajesh Iyer",
    org: "Top Shelf Technical Services LLC",
  },
  {
    quote: "Their intelligence and hard work pushed our website to a better ranking position and generated far more serious customers. A young, talented team full of enthusiasm.",
    name: "Vijayan",
    org: "Director, Supercad Trading LLC",
  },
  {
    quote: "Creative, proactive, responsive — working with us constantly over the last few years. Very happy to have ENH as our partner for web, SEO and social media.",
    name: "S.D. Pereira",
    org: "Managing Partner, PKF UAE",
  },
];

// The three-item `insights` placeholder list that used to live here is gone.
// The real archive is src/content/insights (72 posts migrated from
// enhmedia.com/blog), and the homepage Insights section reads that. This list
// held Unsplash URLs, so leaving it exported was an invitation to render stock
// photography as an article image again.

/** The twelve questions the homepage document carries, in its order, with its
 *  wording. The numbering it prints on each one ("1.", "2.", ...) is not part
 *  of a question: the accordion sets its own two-digit index beside every row,
 *  so carrying the document's numbers here would print them twice. */
export const faqs = [
  {
    q: "What makes ENH the best digital marketing agency in Dubai?",
    a: "We pair 15+ years of UAE market experience with a data-driven, results-first approach. As a certified Google Partner with an in-house team across SEO, paid media, social and creative, we build tailored strategies that drive measurable revenue growth, which is why our client retention sits at 95%.",
  },
  {
    q: "How can digital marketing help my business grow in the UAE?",
    a: "Digital marketing boosts your visibility on platforms where UAE consumers spend most of their time, such as Instagram, Google, and TikTok. Through localized SEO, social media campaigns, and Arabic-English bilingual content, ENH Marketing ensures your brand connects with diverse audiences, driving traffic, leads, and sales specific to your business goals.",
  },
  {
    q: "How much do digital marketing services in Dubai cost?",
    a: "It depends on your goals, channels and campaign scope. We offer flexible packages, from focused plans for small businesses to full strategies for enterprises. Contact us for a free consultation and a tailored quote.",
  },
  {
    q: "How long does it take to see results from digital marketing campaigns?",
    a: "Results depend on the strategy—PPC ads can drive traffic within days, while SEO may take 3-6 months for significant organic growth. At ENH Marketing, we prioritize quick wins alongside long-term growth, providing detailed timelines and regular performance reports to keep you informed every step of the way.",
  },
  {
    q: "How does ENH Marketing measure the success of digital campaigns?",
    a: "We use advanced analytics to track key performance indicators (KPIs) like website traffic, conversion rates, click-through rates (CTR), and return on ad spend (ROAS). Our team provides transparent, real-time reports so you can see exactly how your investment is driving business growth in Dubai and beyond.",
  },
  {
    q: "What industries does ENH Marketing specialize in for digital marketing?",
    a: "We have delivered results across e-commerce, real estate, hospitality, healthcare, automotive, logistics and professional services, and we tailor every strategy to your sector.",
  },
  {
    q: "What makes ENH one of the best social media marketing companies in Dubai?",
    a: "We manage the full social stack in-house: strategy, content, community management and paid social. Our team builds Arabic and English content calendars suited to UAE audiences, runs paid campaigns across Instagram, Facebook, LinkedIn and TikTok, and reports on leads and sales rather than vanity metrics. As a Meta Business Partner we get direct platform support and early access to ad features.",
  },
  {
    q: "Do you work with businesses outside Dubai?",
    a: "Yes. We work with clients across the UAE including Abu Dhabi, Sharjah, Ajman and Ras Al Khaimah, and with GCC clients in Saudi Arabia, Qatar and Oman. Our office is in Al Garhoud, Dubai, and most work runs remotely with in-person meetings when useful.",
  },
  {
    q: "Why hire a Dubai-based digital agency instead of an overseas one?",
    a: "A local agency understands UAE search behaviour, the Arabic and English language split, free zone and mainland business realities, Ramadan and seasonal demand cycles, and regional platform preferences. It also means same time zone communication, VAT-compliant local invoicing, and a team you can meet.",
  },
  {
    q: "How do I choose the right digital marketing agency in Dubai?",
    a: "Ask for case studies in your industry with real numbers, check certifications (Google Partner and Meta Business Partner status are verifiable), confirm whether work is done in-house or outsourced, ask who your day-to-day contact is, and check that you keep full ownership of your ad accounts, analytics and website. Be cautious of anyone guaranteeing a specific ranking position.",
  },
  {
    q: "Should I hire an agency or build an in-house marketing team?",
    a: "An in-house hire covers one skill set. An agency gives you SEO, paid media, design, content and analytics specialists for roughly the cost of one mid-level salary, plus tool licences and platform partnerships already in place. Many UAE companies run a hybrid: an internal marketing manager coordinating an agency delivery team.",
  },
  {
    q: "What's included in the free digital marketing audit?",
    a: "A review of your website's technical SEO health, keyword rankings against your main competitors, backlink profile, Google Business Profile, current paid campaign performance if you run ads, and social presence, delivered with a prioritised list of the fixes likely to move the needle first.",
  },
];

/** THE INDUSTRIES SECTION'S CONTENT, WHICH THE HOMEPAGE DOCUMENT DOES NOT
 *  SUPPLY.
 *
 *  That document gives this section a heading and then "[card of all
 *  industries pages]" -- an instruction, not copy. It names no sector and
 *  describes none, which is why the first build of the section was five bare
 *  names in five boxes and read as basic: it was.
 *
 *  All five industry pages exist now, and each one opens by saying what its
 *  sector is trying to WIN. Set side by side, the five say something none of
 *  them says alone and the homepage never said at all:
 *
 *    healthcare   appointment bookings
 *    logistics    requests for quotations
 *    automotive   test-drive requests, showroom visits
 *    hospitality  direct bookings, restaurant reservations
 *    ecommerce    sales and repeat business
 *
 *  ...while the channels underneath barely move -- "SEO, paid advertising,
 *  social media and local search" turns up almost word for word in four of the
 *  five. The disciplines are shared; the finish line is not. That is what
 *  "Digital Marketing Built Around Your Business" actually means, and it is the
 *  thing the section now has to convey.
 *
 *  `description` is each page's own `meta.description` from
 *  src/content/industries/<slug>.ts, verbatim. COPIED, NOT IMPORTED: pulling
 *  five content modules into the homepage island would drag their figures,
 *  FAQs and drawings along for one sentence each. `mark` is the contiguous
 *  outcome phrase inside that sentence, so the emphasis is applied in place and
 *  no word is printed twice. Both are checked against the source files by
 *  scripts/check-industry-copy.mjs, which fails if either drifts. */
export const industries = {
  byHref: {
    "/healthcare-marketing-agency": {
      description:
        "Increase treatment visibility, patient enquiries and appointment bookings through healthcare SEO, paid advertising, social media and local search.",
      mark: "treatment visibility, patient enquiries and appointment bookings",
    },
    "/logistics-marketing-agency": {
      description:
        "Generate qualified freight enquiries, requests for quotations and B2B opportunities through logistics SEO, paid advertising, content and LinkedIn marketing.",
      mark: "qualified freight enquiries, requests for quotations and B2B opportunities",
    },
    "/automotive-digital-marketing-agency": {
      description:
        "Generate qualified enquiries, test-drive requests, showroom visits and service bookings through automotive SEO, paid advertising, social media and local search.",
      mark: "qualified enquiries, test-drive requests, showroom visits and service bookings",
    },
    "/hospitality-marketing-agency": {
      description:
        "Increase direct bookings, restaurant reservations and guest enquiries through hospitality SEO, paid advertising, social media and conversion-focused digital campaigns.",
      mark: "direct bookings, restaurant reservations and guest enquiries",
    },
    "/e-commerce-marketing-agency": {
      description:
        "Build stronger visibility, attract customers with genuine buying intent and turn more of your ecommerce traffic into sales, enquiries and repeat business.",
      mark: "sales, enquiries and repeat business",
    },
  } as Record<string, { description: string; mark: string }>,
};

export const consultationServices = [
  "Search Engine Optimization",
  "Social Media Marketing",
  "Web Design & Development",
  "B2B Lead Generation",
  "Search Advertising",
  "Video Production",
  "Others",
];

export const workImages: Record<string, string> = {
  "Healthy Farm": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format&q=80",
  "Shass Gifts": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=400&fit=crop&auto=format&q=80",
  "ACC Gulf": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop&auto=format&q=80",
  "Helpsters": "https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?w=600&h=400&fit=crop&auto=format&q=80",
  "Wafes": "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&h=400&fit=crop&auto=format&q=80",
  "NeoData": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format&q=80",
  "Ariiz": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop&auto=format&q=80",
  "Onyx": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&h=400&fit=crop&auto=format&q=80",
  "DGR Aviation": "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=600&h=400&fit=crop&auto=format&q=80",
  "Masterkraft": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80",
  "Ultracare": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format&q=80",
  "PKF UAE": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&auto=format&q=80",
  "Autobahn": "https://images.unsplash.com/photo-1489686995744-f47e995ffe61?w=600&h=400&fit=crop&auto=format&q=80",
  "AllDay Supermarket": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop&auto=format&q=80",
  "Datagram": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format&q=80",
  "Supercad": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format&q=80",
  "TopShelf": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop&auto=format&q=80",
  "Arbrit Safety": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop&auto=format&q=80",
  "Saifee Computers": "https://images.unsplash.com/photo-1599658880436-c61792e70672?w=600&h=400&fit=crop&auto=format&q=80",
  "Royal Caviar": "https://images.unsplash.com/photo-1559588482-69774768212a?w=600&h=400&fit=crop&auto=format&q=80",
  "Lotus Dental Clinic": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&auto=format&q=80",
  "Venesta": "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=600&h=400&fit=crop&auto=format&q=80",
};

