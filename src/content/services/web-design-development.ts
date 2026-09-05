// Web Design & Development — pillar page content.
// Copy source: "Web Design & Development.docx" (client-supplied, 2026-09-03).
// VERBATIM. Do not add copy here.
//
// THE ARGUMENT IS THE LANDING, NOT THE BUILD. "A strong campaign can bring the
// right person to your website. A slow page, confusing layout or broken form
// can lose them within seconds." The heading is the fix: "Give Every Click
// Somewhere Better to Land". So the hero draws arrivals that all succeed and a
// page that loses most of them, and the page treats the website as the last
// step of somebody else's campaign rather than as a standalone artefact.
//
// THE SERVICES ARE CAPABILITIES, NOT ALL PAGES. This document lists eight
// things under "Web Design & Development Services We Offer", and only some of
// them correspond to routes in the sitemap. Responsive design, content and SEO
// setup, and analytics are parts of a build rather than separate pages, so
// their cards carry no href at all; the rest link where the page exists.
// Nothing is invented to give an unlinked card a destination.
//
// TWO GATES. "Our Work" is "[Client website case study slides and approved
// project counters]" and "FAQs" is "[same as existing]". The page renders the
// site's own Work section and FAQ set. See seo.ts; the same TODO(client)
// applies.
//
// THE ONE FIGURE. "15 years of creative web design experience in Dubai" sits
// inside the why-choose lead and stays there.

export type Signal = { track: string; tells: string; q: number };
import type { IndexEntry } from "@/components/service/ServiceIndex";
import type { TrackStage } from "@/components/service/StageTrack";
export type Sector = { label: string; parts: string[] };

export const meta = {
  title: "Website Design & Development in Dubai | ENH Marketing",
  description:
    "Build a fast, responsive website that represents your brand clearly, supports your marketing and gives visitors an easier route to enquire or buy.",
};

export const hero = {
  lines: ["Website Design", "& Development", "in Dubai"] as [string, string, string],
  sub: "Build a fast, responsive website that represents your brand clearly, supports your marketing and gives visitors an easier route to enquire or buy.",
  primary: "Plan My Website",
  secondary: "Talk to a Web Expert",
};

export const narrative = {
  heading: ["Give Every Click", "Somewhere Better to Land"] as [string, string],
  scene:
    "A strong campaign can bring the right person to your website. A slow page, confusing layout or broken form can lose them within seconds.",
  sceneEmphasis: "lose them within seconds",
  agency:
    "ENH Marketing designs and develops websites for UAE businesses, covering corporate sites, ecommerce stores, landing pages, maintenance, hosting and analytics.",
  highlight: ["corporate sites", "ecommerce stores", "landing pages", "maintenance", "hosting", "analytics"],
  closing:
    "The website is planned around the people using it and the action you want them to take. That could be sending an enquiry, buying a product, booking a service or learning enough to contact your team.",
};

/** THE TAIL IS THE SECTION'S BRIEF: businesses comparing agencies "should look
 *  at what happens before the design starts and after the website goes live".
 *  That is an instruction to look at a span, with the design sitting somewhere
 *  in the middle of it, so each position carries where on that span it belongs.
 *
 *  Each is split at the source's own full stop so the position reads at weight
 *  with its reason under it. Nothing is reworded. */
export type Reason = { stance: string; detail: string };

export const reasons = {
  title: "Why Choose ENH Marketing",
  strokeTitle: "for Web Design in Dubai",
  lead: "With 15 years of creative web design experience in Dubai, we understand how the website connects with SEO, advertising, content and the wider customer journey.",
  items: [
    {
      stance: "We begin with the business goals, audience and market.",
      detail: "The layout comes after we know what the website needs to achieve.",
    },
    {
      stance: "User experience shapes the structure.",
      detail: "Visitors should be able to understand the offer and reach the right page without working for it.",
    },
    {
      stance: "Desktop and mobile are planned together.",
      detail: "The design needs to work across different screen sizes, devices and browsing habits.",
    },
    {
      stance: "SEO requirements are considered during the build.",
      detail: "Page structure, content, speed and technical setup affect how the website performs in search.",
    },
    {
      stance: "Analytics and conversion tracking are included in the planning.",
      detail: "The website should show where visitors arrive, what they do and where they leave.",
    },
    {
      stance: "Maintenance and hosting remain available after launch.",
      detail: "Updates, backups, monitoring and fixes can continue under a separate support scope.",
    },
  ] as Reason[],
  tail: "Businesses comparing the best web design company in Dubai should look at what happens before the design starts and after the website goes live.",
  /** The two ends of the span the tail sends the reader to look at. */
  tailMark: "before the design starts and after the website goes live",
};

export const services = {
  title: "Web Design & Development",
  strokeTitle: "Services We Offer",
  items: [
    {
      no: "01",
      title: "Business Website Design and Development",
      glyph: "structure",
      body: "We create tailored websites around your brand, services and audience. The structure supports clear navigation, qualified traffic and the actions visitors need to take.",
    },
    {
      no: "02",
      title: "Ecommerce Website Development",
      glyph: "catalogue",
      href: "/services/web-design-development/ecommerce-website-development",
      body: "An online store has to load fast, look right on mobile and make checkout effortless. We build ecommerce sites on Shopify, WooCommerce and custom platforms, with payment gateways set up for the UAE market.",
    },
    {
      no: "03",
      title: "Landing Page Design",
      glyph: "form",
      href: "/services/lead-generation/landing-page-development",
      body: "Advertising traffic needs a page built around the campaign. We create landing pages with focused content, clear calls to action and fewer distractions between the click and the enquiry.",
    },
    {
      no: "04",
      title: "Responsive and Mobile-Friendly Web Design",
      glyph: "reseat",
      body: "People need the same clear experience across desktop, tablet and mobile. We build responsive layouts that adapt to different screen sizes while keeping important information and actions easy to reach.",
    },
    {
      no: "05",
      title: "Website Maintenance & Support",
      glyph: "repair",
      href: "/services/web-design-development/website-maintenance-support",
      body: "Websites break quietly. Plugins go out of date, forms stop sending and security gaps open up. We handle updates, backups, fixes and small content changes so your site stays online and secure.",
    },
    {
      no: "06",
      title: "Web Hosting Services",
      glyph: "heartbeat",
      href: "/services/web-design-development/web-hosting",
      body: "Hosting affects speed, uptime and search performance more than many businesses realise. We provide managed hosting with regional servers, SSL, daily backups and monitoring so your site stays fast and available.",
    },
    {
      no: "07",
      title: "Website Content and SEO Setup",
      glyph: "text",
      body: "Our content specialists organise website copy around the brand message, audience and SEO requirements. Titles, headings, page structure and internal links are planned alongside the design.",
    },
    {
      no: "08",
      title: "Website Analytics and Conversion Tracking",
      glyph: "tracking",
      body: "We use tools such as Google Analytics to understand traffic, engagement and conversion paths. These findings show how visitors use the website and where the experience may need improvement.",
    },
  ] as IndexEntry[],
};

/** THE LEAD IS A SORTING INSTRUCTION AND IT WAS BEING READ AS A SENTENCE.
 *  "Website analytics help us understand where visitors come from, what they do
 *  and where the journey becomes difficult" asks three questions, and every one
 *  of the nine rows answers exactly one of them -- which is the structure the
 *  section has had all along. Split at the source's own commas, the three
 *  clauses become the three columns and the nine sort themselves 2 / 4 / 3.
 *  Read the columns left to right and the lead is back, word for word.
 *
 *  `q` is read off each row's own "tells" and nothing else:
 *    traffic         "which channels bring them"                  where from
 *    landing pages   "which pages visitors reach first"           where from
 *    engagement      "how people interact"                        what they do
 *    conversion path "the steps visitors take before enquiring"   what they do
 *    form submission "which pages and campaigns generate enquiries" what they do
 *    ecommerce       "product views, basket, checkout, purchases" what they do
 *    device          "how the experience changes across devices"  where difficult
 *    page speed      "where loading time may affect the experience" where difficult
 *    exit points     "where visitors commonly leave"              where difficult
 */
export const measure = {
  title: "What",
  strokeTitle: "We Measure",
  lead: "Website analytics help us understand where visitors come from, what they do and where the journey becomes difficult.",
  /** The lead's own three clauses, split at its commas. They head the three
   *  columns; the sentence itself still runs whole above them. */
  questions: [
    "where visitors come from",
    "what they do",
    "where the journey becomes difficult",
  ],
  headTells: "What it tells you",
  rows: [
    { track: "Website traffic", tells: "How many people visit and which channels bring them", q: 0 },
    { track: "Landing pages", tells: "Which pages visitors reach first", q: 0 },
    { track: "Engagement", tells: "How people interact with the content and page", q: 1 },
    { track: "Conversion paths", tells: "The steps visitors take before enquiring or buying", q: 1 },
    { track: "Form submission", tells: "Which pages and campaigns generate enquiries", q: 1 },
    { track: "Ecommerce activity", tells: "Product views, basket activity, checkout progress and purchases", q: 1 },
    { track: "Device performance", tells: "How the experience changes across desktop and mobile", q: 2 },
    { track: "Page speed", tells: "Where loading time may affect the user experience", q: 2 },
    { track: "Exit points", tells: "Where visitors commonly leave the website", q: 2 },
  ] as Signal[],
  note: "At ENH, analytics specialists use tools such as Google Analytics to review engagement trends and conversion funnels. The findings help us make recommendations based on actual behaviour rather than assumptions.",
  /** The point of the whole section. */
  noteMark: "based on actual behaviour rather than assumptions",
};

export const process = {
  title: "How Our Web Design and",
  strokeTitle: "Development Process Works",
  stages: [
    { no: "1", title: "Research and Brief", body: "We review the business, audience, competitors, current website, and marketing goals. The brief confirms what the website needs to include and what visitors should be able to do." },
    { no: "2", title: "Structure and User Journey", body: "Pages are organised into a clear site structure. Navigation, calls to action and key user journeys are planned before the visual design begins." },
    { no: "3", title: "Content and Wireframes", body: "The team maps the information required on each page and prepares wireframes where needed. Existing content can be retained, edited, or replaced according to the agreed scope." },
    { no: "4", title: "Design", body: "The visual direction is developed around the approved brand. Desktop and mobile layouts are considered together so the experience remains consistent across devices." },
    { no: "5", title: "Development", body: "The approved designs are built on the selected platform. Forms, integrations, e-commerce functions and technical requirements are added during this stage." },
    { no: "6", title: "Testing and Launch", body: "The website is checked across common devices and screen sizes. Links, forms, page layouts, tracking and key functions are tested before launch." },
    { no: "7", title: "Support and Improvement", body: "Maintenance, hosting and ongoing improvements can continue after launch. Analytics and user behaviour can guide future changes once the website begins receiving traffic." },
  ] as TrackStage[],
};

/** The document's own argument for why the build is a marketing problem. */
export const performance = {
  title: "Websites Optimised",
  strokeTitle: "for Performance",
  /** The claim is two sentences and both of them are lists. The first names
   *  what the website is for, the second what it has to do to get there, and
   *  splitting them at the source's own commas turns the section from a
   *  paragraph into the requirement it actually states. Both read back whole. */
  goal: "The main goal of tailored web design and development is to support traffic, leads and revenue.",
  goalMark: "traffic, leads and revenue",
  needsLead: "A website needs to",
  needs: ["load quickly", "explain the offer", "guide visitors towards a useful action"],
  warning:
    "Advertising performance can also suffer when a strong ad sends people to a cluttered or confusing page.",
  body: "We optimise the user experience, page structure and conversion routes around the needs of the audience.",
  /** What that work actually is, split at the source's own commas. The lead-in
   *  and the four are one sentence in the document and read back as one here. */
  leversLead: "This may involve",
  levers: [
    "clearer navigation",
    "shorter forms",
    "stronger content hierarchy",
    "a more focused landing page",
  ],
  /** The consequence the section exists to name. */
  warningMark: "when a strong ad sends people to a cluttered or confusing page",
  connected:
    "As an experienced digital marketing agency in Dubai, we also understand how the website affects conversion rate optimisation, SEO and campaign performance.",
};

export const sectors = {
  title: "Websites Built",
  strokeTitle: "for Different Industries",
  lead: "A well-planned website is useful wherever customers need to research, enquire, book or buy online.",
  items: [
    { label: "Ecommerce and retail", parts: ["product discovery","payments","checkout"] },
    { label: "Real estate", parts: ["property listings","project information","lead forms"] },
    { label: "Healthcare", parts: ["service pages","doctor profiles","appointment enquiries"] },
    { label: "Professional services", parts: ["clear expertise","service information","qualified leads"] },
    { label: "Education and training", parts: ["courses","registrations","programme information"] },
    { label: "Hospitality and leisure", parts: ["bookings","venues","menus","experiences"] },
    { label: "Technology and B2B", parts: ["technical information","demonstrations","sales enquiries"] },
    { label: "Construction and industrial businesses", parts: ["projects","capabilities","product information"] },
    { label: "Events", parts: ["registrations","schedules","ticket links","campaign landing pages"] },
    { label: "Local service businesses", parts: ["service areas","contact routes","enquiry forms"] },
  ] as Sector[],
  tail: "The website scope changes with the business. A corporate services company may need detailed service pages and lead forms, while an online retailer needs product organisation, payments and a reliable checkout.",
};

export const finalCta = {
  title: "Tell Us What the",
  strokeTitle: "Website Needs to Do",
  body: "Send us your current website, the pages or functions you need and the action you want visitors to take.",
  note: "We will review the requirement and recommend the right scope. That may involve a new website, a redesign, e-commerce development, landing pages or ongoing support.",
  primary: "Request a Website Proposal",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
