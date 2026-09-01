// E-Commerce Website Development — page content.
// Copy source: "E-Commerce Website Development.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// TWO THINGS THE DOCUMENT LEAVES OPEN, both flagged rather than filled:
//
// 1. "Speed and Technical Health" ends "The numbers we build against are
//    below." There are no numbers anywhere in the file — not in a table, a
//    textbox or any other part of the package. Google's Core Web Vitals
//    thresholds are public, but they are not in this document, so they are not
//    invented here. See `speedNote`.
//
// 2. FAQ 4 carries a bracketed note to the client: "[List only the providers
//    you have live experience integrating.]" That is an editorial instruction,
//    not page copy, and is removed from the answer that renders. The full
//    original is kept in `faqNotes` so nothing is lost.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Ecommerce Website Development in Dubai | ENH Marketing",
  description:
    "Build a fast, mobile-first ecommerce store with clear navigation, flexible payments, reliable integrations, and tracking designed around how customers in the UAE shop.",
};

export const hero = {
  lines: ["E-Commerce", "Website", "Development"] as [string, string, string],
  sub: "Build a fast, mobile-first ecommerce store with clear navigation, flexible payments, reliable integrations, and tracking designed around how customers in the UAE shop.",
  primary: "Launch Your Ecommerce Website",
  secondary: "Talk to an Ecommerce Expert",
};

/** The opening argument. The document opens on a specific failure and then
 *  names three causes, so the section is built around those three rather than
 *  around the paragraph they arrive in. */
export const narrative = {
  heading: ["The Work Behind an Ecommerce", "Store That Converts"] as [string, string],
  scenario:
    "A store gets signed off because it looks good in the design review. Six weeks after launch the traffic is fine, the checkout works, and almost nobody buys.",
  scenarioEmphasis: "almost nobody buys",
  culpritsLead: "The usual culprits are boring:",
  // The three clauses of the document's own list, split at its commas.
  // Reconstruction: lead + " " + [0] + ", " + [1] + ", and " + [2] + "."
  // reproduces the document's sentence word for word.
  culprits: [
    "the product page loads in four seconds on a phone",
    "the search box cannot find half the catalogue",
    "the only payment option is a card form that asks for a billing address nobody wants to type",
  ],
  body: "ENH Marketing is a Dubai digital marketing agency with an in-house ecommerce development team building online stores around how people in the UAE actually shop. We handle platform selection, storefront development, catalogue structure, payments, Arabic content, speed and tracking. Our developers handle the build, and our digital marketing team stays involved on the parts that decide whether the store earns anything.",
  ownership: "You get a store you can run yourself, on code and content you own.",
};

export type BuildStage = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** Which abstract interface the card previews. Presentation, not copy. */
  preview: "catalogue" | "storefront" | "integrations" | "checkout" | "speed" | "tracking";
};

/** The six workstreams inside a build. Not sequential stages — the document
 *  presents them as the contents of one engagement, which is why the section
 *  is a set rather than a ladder. */
export const build = {
  title: "Everything",
  strokeTitle: "Inside the Build",
  items: [
    {
      no: "01",
      title: "Discovery and Structure",
      glyph: "structure",
      preview: "catalogue",
      body: "Before any design, we go through the catalogue, how people currently ask for your products, and where the current site loses them. Category structure, filters, and naming come out of that rather than out of an org chart.",
    },
    {
      no: "02",
      title: "Storefront Design",
      glyph: "creative",
      preview: "storefront",
      body: "Designed for the phone first, because that is where most of the traffic sits. Clear hierarchy, product photography given room, and trust signals where hesitation actually happens rather than only in the footer.",
    },
    {
      no: "03",
      title: "Development and Integrations",
      glyph: "offsite",
      preview: "integrations",
      body: "The build itself, plus whatever it needs to talk to. Inventory, accounting, delivery partners, CRM and email. Integrations are scoped upfront, because they are the usual reason a launch date slips.",
    },
    {
      no: "04",
      title: "Payments and Checkout",
      glyph: "catalogue",
      preview: "checkout",
      body: "Set up how people pay here. Cards through a local gateway, Apple Pay and Google Pay, buy-now-pay-later through Tabby or Tamara, and cash on delivery where your category still expects it.",
    },
    {
      no: "05",
      title: "Speed and Technical Health",
      glyph: "tracking",
      preview: "speed",
      body: "Image handling, caching, script discipline, and testing on real devices on mobile data rather than on a designer's laptop.",
    },
    {
      no: "06",
      title: "Tracking and Reporting",
      glyph: "reporting",
      preview: "tracking",
      body: "Ecommerce events, server-side tracking where the browser can no longer be relied on, and reporting that connects a sale back to what brought it. Configured before launch, because retrofitting tracking loses you months of data.",
    },
  ] as BuildStage[],
};

/** TODO(client): the "Speed and Technical Health" entry ends with "The numbers
 *  we build against are below." No numbers appear anywhere in the supplied
 *  document. Until they are provided, the sentence is held here rather than
 *  rendered, because printing a promise of figures with no figures under it
 *  reads as a broken page. Supply the thresholds and this becomes a metrics
 *  band under that card. */
export const speedNote = "The numbers we build against are below.";

/** The payment methods named in "Payments and Checkout", as their own list.
 *  Every one is lifted from that paragraph; none is added. */
export const payments = [
  "Cards through a local gateway",
  "Apple Pay",
  "Google Pay",
  "Tabby",
  "Tamara",
  "Cash on delivery",
];

/** Where the document points readers next. Hrefs resolved from the sitemap. */
export const relatedServices = {
  lead: "Hosting and ongoing maintenance sit with our other services.",
  links: [
    {
      label: "Website maintenance and support",
      href: "/services/web-design-development/website-maintenance-support",
    },
    { label: "Web hosting", href: "/services/web-design-development/web-hosting" },
  ],
};

export const audience = {
  title: "Who These",
  strokeTitle: "Builds Suit",
  lede: "An online store earns its cost when there is a real catalogue, repeat purchasing, or margin that supports paid traffic.",
  itemsLead: "That tends to mean:",
  items: [
    "Retail and fashion brands moving from marketplace-only selling to their own store",
    "Beauty, skincare and personal care",
    "Food, grocery and speciality products, including subscription boxes",
    "Home, furniture and interiors",
    "Electronics and accessories",
    "Sports, fitness and outdoor equipment",
    "B2B suppliers wanting trade pricing, account logins and reorder flows",
    "Service businesses selling packages, memberships or bookings online",
  ],
  caveat:
    "A very small catalogue with occasional sales rarely justifies a full build. In those cases, a simpler setup, or selling through a marketplace while demand is proven, is the more honest recommendation, and we will make it.",
};

export type Reason = { no: string; title: string; body: string };

/** Five reasons. Each bullet is split at its first full stop: the lead clause
 *  is the claim, the rest is the substantiation. Joining title + ". " + body
 *  reproduces each bullet exactly. The last has no second sentence, so it is
 *  carried whole in `title` with an empty body. */
export const reasons = {
  title: "Why Brands Pick",
  strokeTitle: "ENH Marketing",
  items: [
    {
      no: "01",
      title: "You own what we build",
      body: "Code, content, accounts, and documentation, in your name from the start.",
    },
    {
      no: "02",
      title: "Marketing sits in the room during the build",
      body: "The people who will later run your campaigns help decide the category structure and product page layout, which is a different conversation from a developer working off a spec.",
    },
    {
      no: "03",
      title: "Speed is measured, then reported",
      body: "Against Google's published thresholds, on real devices, before handover.",
    },
    {
      no: "04",
      title: "Ongoing costs are laid out before you commit",
      body: "Platform fees, app subscriptions, licences and hosting, written down, so the monthly number does not surprise you in month three.",
    },
    {
      no: "05",
      title: "We say no to the expensive option when the simple one fits",
      body: "",
    },
  ] as Reason[],
};

export const faqs: Faq[] = [
  {
    q: "How long does an ecommerce website take to build?",
    a: "It depends on catalogue size and how many systems the store connects to. A template-led build on Shopify with a modest catalogue moves quickly. Custom or headless work, multiple integrations or a bilingual store takes longer. Your proposal states a timeline with the dependencies that could move it.",
  },
  {
    q: "Which platform should we use?",
    a: "That comes out of two questions: who will update the store day to day, and what the catalogue looks like in three years. Shopify suits most UAE retailers. WooCommerce suits brands wanting full control. Headless suits high traffic or unusual buying flows. We recommend one and explain why.",
  },
  {
    q: "Do we own the website and the code?",
    a: "Yes. Code, content, hosting accounts, domain and platform logins are in your name, with documentation at handover. You should be able to move to another developer without asking our permission or waiting for a file transfer.",
  },
  {
    q: "Which payment methods can you set up?",
    // The client-facing bracketed note is removed here. Full original in faqNotes.
    a: "Cards through a local gateway, Apple Pay and Google Pay, buy-now-pay-later through Tabby or Tamara, and cash on delivery where your category expects it. Every method is tested end to end, refunds included, before launch.",
  },
  {
    q: "Can you move our existing store to a new platform?",
    a: "Yes. Migration covers products, customers, order history and the redirects that protect your existing search rankings. Redirects are the step most often skipped, and skipping it is how a redesign loses traffic it took years to earn.",
  },
  {
    q: "Will the new site be fast?",
    a: "We build against Google's published Core Web Vitals thresholds and report where your store lands before handover. Speed also depends on choices you make later, so adding a dozen apps and unoptimised images after launch will undo it.",
  },
  {
    q: "What are the ongoing costs after launch?",
    a: "Platform subscription, any app or plugin fees, hosting where it applies, and domain renewal. Those go to the providers directly. Maintenance and support are optional and quoted separately. All of it is written into the proposal before you sign.",
  },
  {
    q: "Do you handle product photography and descriptions?",
    a: "Yes. Product photography and descriptions can be included alongside the build through our wider digital marketing services. Many brands arrive with marketplace images that do not work well on their own product pages, so we identify those gaps during scoping instead of waiting until launch.",
  },
  {
    q: "Will the store show up in AI assistants and AI search results?",
    a: "We build the structured product data, schema, and feeds that make a catalogue readable by machines, which is what those systems draw on. Nobody can promise placement in an AI answer, and the standards for agent-led purchasing are still being written. What we can do is make sure your store is not invisible to them.",
  },
];

/** TODO(client): editorial instructions found inside the copy, kept for
 *  provenance and deliberately not rendered. */
export const faqNotes = {
  payments:
    "Cards through a local gateway, Apple Pay and Google Pay, buy-now-pay-later through Tabby or Tamara, and cash on delivery where your category expects it. [List only the providers you have live experience integrating.] Every method is tested end to end, refunds included, before launch.",
};

export const finalCta = {
  title: "See What Your Store",
  strokeTitle: "Should Cost to Build",
  body: "Tell us what you sell, how many products you have, and what you are using now. We will look at the catalogue, the platform question, and the integrations, then come back with a straight recommendation.",
  note: "If a full build is not the right move yet, we will say so and tell you what we would do instead.",
};

/** Form fields. The document names what it wants from an enquiry — what you
 *  sell, how many products, what you are using now — so those are the fields. */
export const formFields = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "sell", label: "What you sell" },
  { id: "products", label: "How many products" },
  { id: "current", label: "What you are using now", wide: true },
  { id: "referral", label: "How did you hear about us?", wide: true },
];

/** Mid-page CTA band, above the work section. Supplied in the document under
 *  "E-Commerce Website Development Page CTA". Stored in sentence case and split
 *  across two lines for typesetting; the band uppercases it. */
export const growthCta = {
  heading: ["Ready to build", "your online store?"] as [string, string],
  support:
    "Create a High-Converting E-Commerce Website Designed to Grow Your Online Sales",
  button: "Get a Free E-Commerce Quote",
};
