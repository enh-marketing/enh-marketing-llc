// Ecommerce SEO — page content.
// Copy source: "ECommerce SEO Services.docx" (client-supplied, 2026-09-03).
// VERBATIM. Headings are the document's own, split across lines only for
// typesetting. Do not add copy here: no invented labels, figures or CTA
// microcopy.
//
// NO FIGURES AT ALL. This document gives not one number: no traffic lift, no
// timeframe, no catalogue size, no conversion rate. Its opening is deliberately
// unquantified -- "thousands of products" and "a small number of pages" -- and
// it says outright that structured data "does not guarantee a higher ranking".
// So nothing on this page draws a quantity, a percentage or a trend line, and
// the catalogue visual states a shape rather than a count.
//
// THE OPENING IS THE PAGE'S ARGUMENT. A store carries a large catalogue while
// most organic traffic arrives through a handful of pages; collections are hard
// to find, descriptions repeat the manufacturer's wording, and filters create
// more URLs than the store can manage. That is a distribution problem, not a
// volume problem, which is why the document then says "Traffic alone does not
// solve this."
//
// SOURCES. The document cites Google three times, by name and without a URL:
// its ecommerce product data guidance, its Product structured data
// documentation, and its guidance for faceted navigation. Those citations are
// carried as written and not turned into links, because the document supplies
// no addresses for them.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Ecommerce SEO Services in Dubai | ENH Marketing",
  description:
    "Improve how shoppers find your categories and products through stronger store architecture, useful product content, technical SEO and accurate product data.",
};

export const hero = {
  lines: ["Ecommerce SEO", "Services", "in Dubai"] as [string, string, string],
  sub: "Improve how shoppers find your categories and products through stronger store architecture, useful product content, technical SEO and accurate product data.",
  primary: "Request an Ecommerce SEO Audit",
  secondary: "Talk To Our SEO Team",
};

/** The opening argument. A distribution problem stated without a single
 *  number, which is why the section that draws it must not invent one. */
export const narrative = {
  heading: ["Make More of Your", "Product Catalogue Searchable"] as [string, string],
  scene:
    "An online store may carry thousands of products while receiving most of its organic traffic through a small number of pages. Important collections remain difficult to find, product descriptions repeat the manufacturer's wording, and filters create more URLs than the store can manage properly.",
  sceneEmphasis: "a small number of pages",
  agency:
    "ENH Marketing provides ecommerce SEO services in Dubai for online retailers targeting customers in the UAE and wider markets. We work across store structure, category and product content, indexation, product data, internal linking and performance measurement.",
  /** The sentence that turns the scene into a claim. The document puts it
   *  immediately after the scene and before the agency paragraph, and the page
   *  keeps that order: it is the argument, not a summary of it. */
  verdict:
    "Traffic alone does not solve this. The right products need to appear for relevant searches and lead shoppers into a buying journey that works.",
  /** Marked inside the verdict, because that is the sentence the reader has to
   *  leave with. The three phrases are the claim's three conditions: the right
   *  pages, the right searches, and a route through to a purchase. */
  highlight: ["The right products", "relevant searches", "a buying journey that works"],
  closing:
    "The scope is prioritised around search demand, stock availability, margins and commercial value. This gives the store a practical SEO plan instead of treating every product and category as equally important.",
  primary: "Request an Ecommerce SEO Audit",
  secondary: "Chat on WhatsApp",
};

export type Area = { no: string; title: string; body: string; glyph: GlyphVariant };

/** Eight areas of work. */
export const areas = {
  title: "What Our Ecommerce",
  strokeTitle: "SEO Services Cover",
  items: [
    {
      no: "01",
      title: "Ecommerce Keyword Research",
      glyph: "intent",
      body: "We map how customers search across broad categories, product types, brands, specifications and individual models. The research separates early comparison searches from high-intent terms used by shoppers who are closer to purchasing.",
    },
    {
      no: "02",
      title: "Store Architecture and Navigation",
      glyph: "structure",
      body: "Categories, subcategories, collections and products are organised into a clear hierarchy. Navigation labels and internal links help shoppers move through the catalogue while showing search engines how the store's most important pages relate to one another.",
    },
    {
      no: "03",
      title: "Category Page Optimisation",
      glyph: "catalogue",
      body: "Category and collection pages are developed around meaningful product groups and buying needs. Titles, headings, introductory copy, filters and supporting information are improved without placing large blocks of repetitive SEO text above the products.",
    },
    {
      no: "04",
      title: "Product Page Optimisation",
      glyph: "text",
      body: "Product titles, descriptions, specifications, images, FAQs and metadata are reviewed according to search demand and customer questions. Priority pages receive useful original information rather than lightly rewritten manufacturer descriptions shared across several retailers.",
    },
    {
      no: "05",
      title: "Technical Ecommerce SEO",
      glyph: "crawler",
      body: "We review crawlability, indexation, canonical tags, pagination, internal links, XML sitemaps, mobile performance and broken URLs. Filters and sorting options are checked because they can create large numbers of low-value URL combinations.",
    },
    {
      no: "06",
      title: "Product Data and Structured Markup",
      glyph: "schema",
      body: "Product structured data is reviewed for details such as price, availability, ratings, variants, shipping and returns where applicable. Google Merchant Center feeds can also be assessed when product discovery across additional Google surfaces is included.",
    },
    {
      no: "07",
      title: "Ecommerce Content and Authority",
      glyph: "offsite",
      body: "Buying guides, comparisons, product-care content and detailed answers can support customers before they choose a product. Relevant publications, suppliers, partners and industry resources may also create legitimate opportunities to earn mentions and links.",
    },
    {
      no: "08",
      title: "UAE and International Targeting",
      glyph: "entity",
      body: "Stores selling across different countries or languages may need separate decisions around domains, currency, delivery information and regional content. Arabic and English pages should be planned around their audiences rather than produced as automatic copies.",
    },
  ] as Area[],
  /** Cited by name in the document, without addresses. Carried as written. */
  sources:
    "Sources: Google's ecommerce product data guidance, Product structured data documentation and Google's guidance for faceted navigation",
};

export type Platform = { name: string; body: string };

/** Five platform entries. The document treats these as different technical
 *  situations rather than as a logo wall, which is how they are set. */
export const platforms = {
  title: "Ecommerce Platforms",
  strokeTitle: "We Work With",
  items: [
    {
      name: "Shopify SEO",
      body: "Our Shopify SEO in Dubai covers collections, products, navigation, internal linking, content and platform-specific technical checks. Shopify automatically provides features such as canonical tags, sitemaps and robots files, but each store still needs review after theme, app and catalogue changes.",
    },
    {
      name: "WooCommerce SEO",
      body: "WooCommerce provides substantial control over product content, URLs and site structure, while its performance depends heavily on the wider WordPress setup. We assess the store, plugins, theme, hosting and technical configuration together.",
    },
    {
      name: "Magento and Adobe Commerce SEO",
      body: "Large Magento catalogues may involve complex product variants, layered navigation and several storefronts. The SEO scope considers crawl management, category architecture, product data, performance and the development resources required to implement changes safely.",
    },
    {
      name: "BigCommerce and OpenCart SEO",
      body: "These platforms can support effective ecommerce SEO when categories, product templates and technical settings are configured correctly. We review the actual store setup rather than relying on a standard checklist for every implementation.",
    },
    {
      name: "Custom Ecommerce Platforms",
      body: "Custom-built stores require closer coordination with the development team. We document requirements for rendering, URLs, canonicalisation, structured data, sitemaps and product updates so recommendations can be implemented without disrupting essential store functions.",
    },
  ] as Platform[],
};

/** Reporting. The document's argument here is about what a number means, not
 *  what it is, so the section carries three claims and no measurements. */
export const measure = {
  title: "What",
  strokeTitle: "We Measure",
  lead: "Ecommerce SEO reporting should connect search performance with store performance.",
  /** The two sides the lead asks to be connected, in the document's own two
   *  sentences: what is tracked in search, and what the store's analytics can
   *  then show. Split at the document's own full stop. */
  trackedSearch:
    "We track relevant organic rankings, search impressions, clicks, landing-page traffic and the categories or products receiving that visibility.",
  trackedStore:
    "Ecommerce analytics can then show transactions, revenue, conversion rate, average order value and assisted conversions where tracking is configured correctly.",
  /** The document's own split, and why it matters. */
  brandSplit:
    "Brand searches are reviewed separately from non-brand searches when possible. An increase driven mainly by people already searching for the store name tells a different story from growth in customers discovering products for the first time.",
  brandTerms: ["Brand searches", "non-brand searches"],
  limit:
    "Revenue attribution still has limits. Customers may compare products across several visits and channels before purchasing, so the report should explain direct organic revenue alongside the wider customer journey.",
};

export const sectors = {
  title: "Ecommerce Businesses",
  strokeTitle: "We Work With",
  items: [
    "Fashion and luxury retail",
    "Beauty and cosmetics",
    "Electronics and technology",
    "Health and wellness products",
    "Furniture and homeware",
    "Automotive parts and accessories",
    "Food and speciality products",
    "B2B product catalogues",
    "Multi-brand online retailers",
    "Businesses selling through online and physical stores",
  ],
  caveat:
    "Regulated products may require additional review of claims, product information and market-specific requirements before content is published.",
};

export type Promise = { no: string; title: string; body: string; glyph: GlyphVariant };

export const promises = {
  title: "What You Get",
  strokeTitle: "From ENH Marketing",
  items: [
    {
      no: "01",
      title: "A store audit before recommendations",
      glyph: "diagnose",
      body: "We review the catalogue, platform, indexation, navigation, templates, structured data, content and current organic performance.",
    },
    {
      no: "02",
      title: "Commercial prioritisation",
      glyph: "triage",
      body: "SEO work is ordered around products and categories that the business can stock, fulfil and profitably sell.",
    },
    {
      no: "03",
      title: "Recommendations suited to your platform",
      glyph: "tool",
      body: "Shopify, WooCommerce, Magento and custom stores have different technical limits and implementation requirements.",
    },
    {
      no: "04",
      title: "Original category and product content",
      glyph: "text",
      body: "Priority pages are developed around useful buying information rather than repeating descriptions already found across other retailers.",
    },
    {
      no: "05",
      title: "Clear development requirements",
      glyph: "structure",
      body: "Technical recommendations are documented for your developers, or implementation responsibilities are stated within the ENH scope.",
    },
    {
      no: "06",
      title: "Product data checks",
      glyph: "catalogue",
      body: "Website structured data and Merchant Center information can be reviewed for inconsistencies in price, availability, variants and other supported details.",
    },
    {
      no: "07",
      title: "Reporting linked to revenue",
      glyph: "reporting",
      body: "Visibility and traffic are assessed alongside transactions, organic revenue and other agreed ecommerce measures where tracking allows.",
    },
    {
      no: "08",
      title: "Connected digital support",
      glyph: "fanout",
      body: "As a digital marketing company in Dubai, ENH can align organic search with ecommerce content, paid campaigns and other digital marketing services when included separately.",
    },
  ] as Promise[],
};

export const faqs: Faq[] = [
  {
    q: "What is ecommerce SEO?",
    a: "Ecommerce SEO improves the organic visibility of an online store's categories, products and supporting content. It covers search research, store architecture, product and category optimisation, technical SEO, structured data, internal linking, content and performance measurement.",
  },
  {
    q: "How is ecommerce SEO different from normal website SEO?",
    a: "Online stores usually have larger numbers of pages, frequently changing stock, product variants, category filters and repeated template elements. These features create specific challenges around crawlability, duplicate URLs, product data and deciding which pages should be indexed.",
  },
  {
    q: "How long does ecommerce SEO take?",
    a: "Technical corrections and page updates may be completed relatively quickly, but meaningful growth usually requires ongoing work and time for search engines to recrawl and reassess the store. The timeframe depends on the catalogue size, competition, current condition and implementation speed.",
  },
  {
    q: "Do you provide Shopify SEO in Dubai?",
    a: "Yes. Shopify SEO can cover collection structure, product pages, metadata, internal linking, images, content, redirects, structured data and technical issues introduced by themes or apps. The exact scope depends on the store and the access available.",
  },
  {
    q: "Can you work with WooCommerce or Magento stores?",
    a: "Yes. We also work with WooCommerce, Magento, Adobe Commerce, BigCommerce, OpenCart and custom ecommerce platforms. Technical changes may require coordination with your developer or platform partner, which will be clarified before work begins.",
  },
  {
    q: "Do you optimise every product page?",
    a: "That depends on the size and commercial priorities of the catalogue. We normally start with categories and products that have relevant demand, reliable stock and meaningful sales potential. Templates and processes can then improve larger groups of pages efficiently.",
  },
  {
    q: "How do you handle product variants?",
    a: "Variants need a clear structure so customers and search engines can understand their relationship to the main product. The setup may involve one product page with selectable variants or separate pages where each version has enough distinct value and search demand.",
  },
  {
    q: "What happens when a product goes out of stock?",
    a: "The correct action depends on whether the product will return. A temporarily unavailable page may remain live with an accurate message and suitable alternatives. A permanently discontinued product may need a redirect or unavailable response based on whether a genuine equivalent exists.",
  },
  {
    q: "Does product structured data improve rankings?",
    a: "Structured data does not guarantee a higher ranking. It can help Google understand product information and make eligible pages available for richer search appearances that may show details such as price, availability, ratings, shipping or returns.",
  },
  {
    q: "Is Google Merchant Center included in ecommerce SEO?",
    a: "Merchant Center setup, feed optimisation and issue resolution can be included when required. The website and feed need consistent product information, particularly for prices and availability. Paid Shopping campaign management remains a separate service.",
  },
  {
    q: "Can online store SEO target customers across the UAE?",
    a: "Yes. Online store SEO in the UAE can target relevant national, city-level and regional searches where location affects demand, delivery or availability. Stores selling internationally may need a broader strategy covering countries, languages, currencies and regional website versions.",
  },
  {
    q: "How much do ecommerce SEO services in Dubai cost?",
    a: "The fee depends on catalogue size, platform, technical condition, target markets, content requirements and the amount of implementation involved. Your proposal will state the priority categories, deliverables, responsibilities, reporting and monthly fee. Development and paid media costs are shown separately where required.",
  },
];

export const finalCta = {
  title: "Give More Products",
  strokeTitle: "a Clear Route Into Search",
  body: "Tell us which platform you use, how many products you sell, where you deliver and which categories matter most commercially.",
  note: "We will review the store's structure, indexation, content, product data and current organic performance before recommending a practical scope for ecommerce SEO services in Dubai.",
  primary: "Request an Ecommerce SEO Audit",
  secondary: "Chat on WhatsApp",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
