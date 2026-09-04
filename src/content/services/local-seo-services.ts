// Local SEO Services — page content.
// Copy source: "Local SEO Services.docx" (client-supplied, 2026-09-03).
// VERBATIM. Do not add copy here.
//
// THE ARGUMENT IS INCOMPLETE INFORMATION. Someone searches, Google shows
// several businesses, "but the information is incomplete. One has the wrong
// opening hours, another links to a generic homepage, and a third does not
// clearly explain whether it serves the customer's area." Then the line the
// document gives a paragraph of its own: "The business offering the best
// service may never receive the call." The hero draws exactly that.
//
// THIS DOCUMENT IS UNUSUALLY CAREFUL ABOUT POLICY, AND THE PAGE MUST STAY THAT
// WAY. It states outright what Google permits and prohibits: honest reviews are
// allowed but "incentives, selective positive-review requests and content that
// does not reflect a real experience" are prohibited; Google "does not treat
// virtual offices as genuine operating locations"; extra profiles and copied
// location pages "can confuse customers, weaken the website and place the
// Business Profile at risk of suspension". None of that is softened, and the
// setup section is built around it rather than hiding it in an FAQ.
//
// NO RANKING IS PROMISED, ANYWHERE. "Rankings and leads cannot be guaranteed,
// but every part of the work can be planned, implemented and measured." The FAQ
// repeats it: Google "does not allow businesses or agencies to pay for a better
// organic local ranking". Nothing on this page charts a position.
//
// TWO CROSSLINKS, BOTH BRACKETED IN THE SOURCE, BOTH REAL:
//   [AEO and GEO services] -> /services/seo/aeo-and-geo
//   [SEO services]         -> /services/seo
//
// ONE ATTRIBUTED CLAIM. FAQ 9 says "Google states that review quantity and
// positive ratings can contribute to prominence". It is carried as written,
// with its attribution intact.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Local SEO Services in Dubai | ENH Marketing",
  description:
    "Improve how your business appears across Google Search and Maps through an accurate Business Profile, relevant location pages, local content, reviews and measurable conversion tracking.",
};

export const hero = {
  lines: ["Local SEO", "Services", "in Dubai"] as [string, string, string],
  sub: "Improve how your business appears across Google Search and Maps through an accurate Business Profile, relevant location pages, local content, reviews and measurable conversion tracking.",
  primary: "Request a Local SEO Audit",
  secondary: "Talk To Our SEO Team",
};

export const narrative = {
  heading: ["Be Easier to Find When Nearby", "Customers Are Ready to Act"] as [string, string],
  scene:
    "Someone searches for a clinic, contractor, restaurant or professional service near them. Google shows several businesses, but the information is incomplete. One has the wrong opening hours, another links to a generic homepage, and a third does not clearly explain whether it serves the customer’s area.",
  sceneEmphasis: "the information is incomplete",
  /** The document gives this its own paragraph. It is the page's thesis. */
  pivot: "The business offering the best service may never receive the call.",
  pivotEmphasis: ["may never receive the call"],
  agency:
    "ENH Marketing is a local SEO company in Dubai, supporting businesses that need to be found within specific locations and service areas. Based in Al Garhoud, our team works on the connection between your website, Google Business Profile, customer reviews and business information across the web.",
  /** The goal and the refusal to promise, stated in one sentence by the source
   *  and kept in one sentence here. */
  goal: "The goal is stronger visibility for relevant local searches and clearer routes to call, request directions, visit the website or make an enquiry. Rankings and leads cannot be guaranteed, but every part of the work can be planned, implemented and measured.",
  primary: "Request a Local SEO Audit",
  secondary: "Chat on WhatsApp",
};

export type Service = { no: string; title: string; body: string; glyph: GlyphVariant };

export const services = {
  title: "What Our Local",
  strokeTitle: "SEO Services Cover",
  items: [
    { no: "01", title: "Google Business Profile Optimisation", glyph: "entity", body: "Our Google Business Profile optimisation in Dubai covers your business name, category, address or service area, contact details, opening hours, services, images and website link. The profile is kept accurate and updated without adding unsupported keywords or creating locations that do not exist." },
    { no: "02", title: "Local Keyword Research", glyph: "intent", body: "We examine how people search for your services across Dubai and the locations you genuinely cover. The research separates informational searches from high-intent searches that may lead to calls, visits, bookings or enquiries." },
    { no: "03", title: "Location and Service Pages", glyph: "structure", body: "We develop or improve pages around real services and locations, with useful information for someone considering the business. Each page needs a distinct purpose rather than repeating the same content with a different area name." },
    { no: "04", title: "On-Page and Technical SEO", glyph: "crawler", body: "Titles, headings, internal links, mobile usability, page speed and crawlability are reviewed alongside local relevance. LocalBusiness structured data can also help Google understand details such as the business name, location and opening hours." },
    { no: "05", title: "Business Listings and Citations", glyph: "reconcile", body: "We check how the company’s name, address, phone number and website appear across relevant directories and business platforms. Incorrect, duplicated or outdated listings are identified so customers and search engines receive more consistent information." },
    { no: "06", title: "Review and Reputation Support", glyph: "conversation", body: "We help establish a practical process for requesting genuine reviews and responding to customer feedback. Google allows businesses to encourage honest reviews, but prohibits incentives, selective positive-review requests and content that does not reflect a real experience." },
    { no: "07", title: "Local Content and Authority", glyph: "offsite", body: "Useful local content may cover service questions, projects, events, neighbourhood requirements or industry issues relevant to UAE customers. We also identify legitimate local publications, associations, partners and directories that may strengthen the business’s wider presence." },
  ] as Service[],
};

/** THE CENTREPIECE. Three operating models, and the shortcut that gets a
 *  profile suspended. */
export const setup = {
  title: "The Right Setup Depends on",
  strokeTitle: "How Your Business Operates",
  lead: "Effective local SEO in the UAE needs to reflect how the business actually operates, including whether it serves customers from a storefront, across a service area or through several branches.",
  models: [
    {
      name: "Storefront Businesses",
      body: "A shop, clinic, restaurant or office that receives customers should use its genuine public location and accurate customer-facing hours. Website pages should make the address, services, contact details and visiting information easy to confirm.",
    },
    {
      name: "Service-Area Businesses",
      body: "A company that visits customers may define the areas it serves without displaying a residential or unstaffed address. Google permits one profile for the central location and does not treat virtual offices as genuine operating locations.",
    },
    {
      name: "Multi-Location Businesses",
      body: "Each eligible branch may need its own profile and location page when it has a real operating presence and serves customers there. Names, categories and core business information should remain consistent across branches providing the same service.",
    },
  ],
  /** The warning the section ends on. Two sentences, both kept. */
  warning:
    "Creating extra profiles or copied location pages does not create genuine coverage. It can confuse customers, weaken the website and place the Business Profile at risk of suspension.",
};

export const measure = {
  title: "What",
  strokeTitle: "We Measure",
  claim: "Local SEO reporting should show more than ranking screenshots.",
  available:
    "Google Business Profile performance can report the searches used to find the business, profile views, direction requests, call-button clicks and website clicks. Website analytics can then show organic visits, form submissions, bookings and other agreed actions.",
  /** The two things a click does not prove. The document states them as a pair
   *  and they are set as one. */
  limit:
    "A call-button click does not confirm that a qualified conversation happened. A direction request does not prove that someone arrived. We therefore define the important conversion actions at the beginning and connect the available data where possible.",
  reporting:
    "Reports explain what changed, which locations or services gained visibility and what needs attention next. Local performance is assessed over a meaningful period rather than judged through one week of movement.",
};

/** Voice and AI search, with the limit and the crosslink the document gives. */
export const discovery = {
  title: "Where Voice and",
  strokeTitle: "AI Search Fit",
  lead: "People increasingly phrase local searches as complete questions, including requests for opening hours, nearby services, availability and directions. Clear website content, accurate business details and concise answers make that information easier for search systems to understand.",
  limit:
    "Local SEO can support this wider discoverability, but it cannot guarantee that a business will be selected for a voice response or mentioned in an AI-generated answer.",
  referenceLead: "Our",
  referenceLabel: "AEO and GEO services",
  referenceHref: "/services/seo/aeo-and-geo",
  referenceTail: "cover the broader work involved in AI search visibility.",
};

export const sectors = {
  title: "Businesses That",
  strokeTitle: "Benefit From Local SEO",
  items: [
    "Clinics and healthcare providers",
    "Restaurants, cafés and hospitality businesses",
    "Retail stores and showrooms",
    "Property and home services",
    "Automotive businesses",
    "Education and training providers",
    "Legal and professional services",
    "Gyms, salons and wellness providers",
    "Contractors and maintenance companies",
    "Multi-location and franchise businesses",
  ],
  /** Where local SEO is the wrong purchase, with the document's own crosslink. */
  boundaryLead:
    "Local SEO is most useful when location affects the buying decision. A business serving customers across the UAE without a local component may need a broader",
  boundaryLabel: "SEO services",
  boundaryHref: "/services/seo",
  boundaryTail: "strategy instead.",
};

export type Promise = { title: string; body: string };

export const promises = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  items: [
    { title: "An audit before changes begin", body: "We review the website, Business Profile, current rankings, listings, reviews and tracking to understand what is helping or limiting local visibility." },
    { title: "A setup based on real operations", body: "Storefronts, service-area businesses and multi-location companies are handled according to how they actually receive or visit customers." },
    { title: "Policy-aware Business Profile management", body: "We avoid keyword-stuffed names, false addresses, unnecessary profiles and other shortcuts that can create suspension risks." },
    { title: "Useful location content", body: "Pages are developed around genuine services, areas and customer needs rather than producing near-identical pages for every Dubai neighbourhood." },
    { title: "A responsible review process", body: "We help your team request honest feedback and respond professionally without buying reviews or filtering requests only towards satisfied customers." },
    { title: "Clear service boundaries", body: "Local PPC, social media and other digital marketing services are shown separately when they are required rather than being presented as part of organic local SEO." },
    { title: "Reporting tied to actions", body: "Rankings, profile activity and website traffic are connected with calls, directions, forms, bookings or other agreed conversion points where tracking allows." },
  ] as Promise[],
  tail: "As a digital marketing agency in UAE, ENH can also connect local SEO with content, paid campaigns and conversion improvements when the wider scope requires it.",
};

export const faqs: Faq[] = [
  { q: "What is local SEO?", a: "Local SEO improves how a business appears when people search for products or services within a particular area. The work commonly covers Google Business Profile optimisation, location and service pages, business listings, reviews, local content, technical SEO and performance tracking." },
  { q: "How is local SEO different from general SEO?", a: "General SEO may target audiences nationally or internationally. Local SEO gives greater attention to physical locations, service areas, Google Maps, local search terms and business information across relevant platforms. Many businesses need both rather than treating them as completely separate activities." },
  { q: "Can you guarantee the first position on Google Maps?", a: "No. Google does not allow businesses or agencies to pay for a better organic local ranking, and results can vary according to relevance, distance and prominence. We can improve the factors within the business’s control, but a fixed number-one position cannot be guaranteed." },
  { q: "Is Google My Business still used?", a: "Google My Business is now called Google Business Profile. Many people still search for “GMB optimisation,” but the current service and dashboard use the Google Business Profile name. We can review, optimise and manage an eligible existing profile." },
  { q: "Can local SEO work if we do not have a website?", a: "An eligible business can still appear through its Google Business Profile without a website. However, a website gives customers more information, supports a wider range of searches and provides better opportunities to track enquiries. Profile optimisation alone has clear limitations." },
  { q: "How long does local SEO take?", a: "Some profile corrections may be visible quickly, while website improvements, listing updates and ranking changes usually need more time. The timeline depends on competition, location, website condition, profile history and how quickly content and technical changes can be approved." },
  { q: "Can you optimise several business locations?", a: "Yes, provided each location is eligible and genuinely operates as described. Each branch may require its own Business Profile, location page, business information and performance tracking. Creating profiles for virtual or unstaffed locations is not a valid multi-location strategy." },
  { q: "Can service-area businesses use local SEO?", a: "Yes. Contractors, mobile services and companies that travel to customers can use a service-area Business Profile when they meet Google’s eligibility requirements. The address and service area must reflect the company’s real operating setup." },
  { q: "Do reviews improve local rankings?", a: "Google states that review quantity and positive ratings can contribute to prominence, while helpful replies can help the business stand out. Reviews also influence customer decisions. They must come from genuine experiences and cannot be bought, incentivised or selectively requested only from happy customers." },
  { q: "Does voice search require a separate SEO service?", a: "Usually not. Voice searches often use more conversational wording, but they still depend on understandable content, accurate business details and technically accessible pages. Relevant questions and direct answers can be included within the local SEO content plan." },
  { q: "What access do you need?", a: "We may require authorised access to your Google Business Profile, website, Google Search Console, analytics platform and any existing reporting or call-tracking system. Access requirements are confirmed before work begins, and ownership should remain with the business." },
  { q: "How much do local SEO services in Dubai cost?", a: "The fee depends on the number of locations, target services, competition, website condition, content requirements and amount of ongoing management required. Your proposal will show the locations, deliverables, reporting and monthly fee clearly. Paid media budgets and separate digital marketing services are listed independently." },
];

export const finalCta = {
  title: "Let Customers Find the",
  strokeTitle: "Right Business Information",
  body: "Tell us where your business operates, which services you want to promote and how customers normally contact you.",
  note: "We will review your website, Google Business Profile and current local visibility before recommending a practical scope. The proposal will state the locations, work required, reporting and fee before the campaign begins.",
  primary: "Request a Local SEO Audit",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
