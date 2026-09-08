// Contact Us — page content.
//
// SOURCE: the live page, https://enhmedia.com/contact-us, read 2026-09-07.
// Every heading, every sentence and the whole field set below are that page's
// own copy, verbatim. That page is the client's, so it is treated exactly like
// the service documents: the words are not reworded, and where a heading is
// split across display lines the split is typesetting only.
//
// WHAT THE LIVE PAGE CONTAINS, IN ITS OWN ORDER:
//
//   1. "LET'S EXPLORE / NEW HEIGHTS / TOGETHER" over one paragraph.
//   2. Four contact blocks: Email Address, Phone Number, Live Chat, Location.
//   3. "Discuss Your Growth Objectives with Us" over three points.
//   4. "Book a Free Digital Marketing Consultation with Our Strategists" over a
//      form of Name, Email, Phone, Company, Requested Service, Message.
//   5. A "Thank you" state after submitting.
//
// This page keeps that structure and that copy. What changes is the design.
//
// TWO SMALL DEPARTURES, BOTH RECORDED RATHER THAN SILENT:
//
//   * The live page's Location value ends at "Dubai"; `brand.address` in
//     src/lib/content.ts ends at "Dubai, UAE" and is what every other page on
//     this site prints. The repo value wins, so the address cannot differ
//     between the footer and this page.
//   * The live hero sets its paragraph in capitals. Here it is sentence case,
//     because on this site capitals are reserved for display type and an
//     all-caps paragraph of this length is measurably slower to read.
//
// WHAT IS DELIBERATELY ABSENT:
//
//   * No budget or project-scope band. The reference design that prompted this
//     layout has one, but no price tiers for this agency exist anywhere: the
//     homepage FAQ's answer on cost is "Costs vary based on your needs, goals
//     and campaign scope... Contact us for a free consultation and a customized
//     quote." Printing bands would invent the agency's pricing. Supply real
//     bands and the pill row already built for Services takes a second one
//     unchanged.
//   * No response time and no opening hours. Neither is recorded anywhere in
//     this repo, and a contact page is the worst place to guess.
//   * No social links. Every href in `social` is still "#" (its own TODO), and
//     an inert social row on a contact page is worse than no social row.

import { brand, consultationServices } from "@/lib/content";

export const meta = {
  title: "Contact us | ENH Marketing LLC",
  description:
    "Talk to ENH Marketing in Dubai. Email, phone, live chat, or book a free digital marketing consultation with our strategists.",
};

/* -------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: "Contact",
  /** The live page's headline, split across the house hero's three display
   *  lines: snow, snow, brand. It is also the brand's own tagline, which is why
   *  it belongs at this scale and why nothing invented could improve on it. */
  lines: ["Let's explore", "new heights", "together."] as [string, string, string],
  /** Verbatim, in sentence case. See the note at the top of this file. */
  sub: "We are happy to see you reach this point! We're thrilled to connect with you and learn more about your upcoming project.",
};

export type ChannelTile = {
  /** Which glyph to draw. */
  icon: "mail" | "phone" | "chat" | "pin";
  /** The live page's own block label. */
  label: string;
  /** What the block shows. */
  value: string;
  href?: string;
  external?: boolean;
};

/** The four blocks the live page carries under its headline, in its order. */
export const channels: ChannelTile[] = [
  { icon: "mail", label: "Email Address", value: brand.email, href: `mailto:${brand.email}` },
  { icon: "phone", label: "Phone Number", value: brand.phone, href: `tel:${brand.phoneHref}` },
  {
    icon: "chat",
    label: "Live Chat",
    value: "Connect with us now",
    href: `https://wa.me/${brand.whatsapp}`,
    external: true,
  },
  // No href: an address is not a link. The live page does not link it either,
  // and a maps URL built from a string is a search result rather than a place.
  { icon: "pin", label: "Location", value: brand.address },
];

/* -------------------------------------------------------- growth objectives */

/** The live page's second section: what a conversation with ENH actually gives
 *  you, in three lines. Verbatim, and the reason this page needs no invented
 *  "what happens next" narrative of its own. */
export const objectives = {
  index: "01",
  title: "Discuss your growth",
  strokeTitle: "objectives with us",
  items: [
    "Obtain practical, actionable advice from our digital marketing experts",
    "Identify the most effective digital marketing channels for your target audience",
    "Uncover the potential speed of your growth through a partnership with ENH",
  ],
} as const;

/* -------------------------------------------------------------------- form */

export const form = {
  index: "02",
  /** The live page's form heading, whole, split into its two colour halves at
   *  the one natural break in the sentence. */
  title: "Book a free digital marketing consultation",
  strokeTitle: "with our strategists",
  /** NEW COPY, and the only new copy on this page. The live page's form has a
   *  heading and nothing else beside it, which leaves half of that band empty
   *  at this scale. One line, no promise in it, and it says the one thing that
   *  actually improves a first reply. Delete it and the layout still holds. */
  note: "Tell us what you are trying to move. The more specific you are, the more specific the first reply.",
  /** The live form's own select label, reused as the pill row's label. */
  servicesLabel: "Requested Service",
  services: consultationServices,
  /** Field labels, exactly the live form's placeholders. */
  fields: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    message: "Message",
  },
  submit: "Send",
  /** The wording every other form on this site already uses. */
  consent:
    "I agree with the terms of the Privacy Policy. Your information is 100% secure and confidential.",
  success: {
    /** The live page's own success heading. */
    title: "Thank you",
    /** And the line the homepage consultation form already shows: it promises a
     *  reply, not a time. */
    body: "Thanks for reaching out. We will get back to you soon.",
    lede: "If it is urgent, these reach a person rather than a form.",
  },
} as const;

/* --------------------------------------------------------------- the studio */

/** The closing plate. NEW COPY, and kept to four short strings, because the
 *  live page has no map section to take copy from and this one prints no
 *  address: `brand.address` is already set in full on the hero's Location card,
 *  and no line on this site is printed twice on one page. */
export const studioMap = {
  label: "Find us",
  title: "The studio",
  /* No travel times and no visiting policy: neither is recorded anywhere in
     this repo. The locality is, and so is what the button does. */
  body: "Al Garhoud, Dubai. Directions open in Google Maps from wherever you are.",
  directions: "Get directions",
  activate: "Click to explore the map",
  frameTitle: `Map showing ${brand.legal} at ${brand.address}`,
} as const;
