// Landing Page Development — page content.
// Copy source: "Landing Page Development.docx" (client-supplied, 2026-08-31). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
// Do not add copy here: no invented labels, figures or CTA microcopy.
//
// The only figures on this page are the document's own: twenty conversions a
// month, and Google's three auction factors. Neither is rounded or restated.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Landing Page Development in Dubai | ENH Marketing",
  description:
    "Give every paid click a focused, mobile-first destination built around your offer, campaign message and the action you want visitors to take.",
};

export const hero = {
  lines: ["Landing Page", "Development", "in Dubai"] as [string, string, string],
  sub: "Give every paid click a focused, mobile-first destination built around your offer, campaign message and the action you want visitors to take.",
  primary: "Get a Landing Page Quote",
  secondary: "Talk to an Expert",
};

/** The opening argument. The document stages it as a meeting: two people
 *  diagnose it wrongly, and the third line is the answer. Those three are set
 *  as three, because that sequence is the whole point. */
export const narrative = {
  heading: ["How We Build Pages", "Around One Clear Action"] as [string, string],
  scene:
    "The campaign is live. Clicks are arriving, the cost per click looks reasonable, and the enquiries are not.",
  sceneEmphasis: "the enquiries are not",
  // Three consecutive sentences from the document, kept in order. The third is
  // the answer to the first two.
  diagnoses: [
    "Someone in the meeting says the ads need work.",
    "Someone else says the traffic is poor quality.",
    "Usually the problem sits one step later, on the page people land on after the click.",
  ],
  body: "ENH Marketing builds landing pages for UAE businesses running paid campaigns. As a digital marketing company in Dubai, we also run the campaigns pointing at them, so the page and the ad get written by people who actually speak to each other.",
  promise:
    "What you get is a page built around one action, live in days rather than weeks, that your own team can edit without raising a ticket.",
  primary: "Request a Quote",
  secondary: "Chat on WhatsApp",
};

export type BuildStage = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** Which part of the page this stage produces. Presentation only — the
   *  document names no such regions; this is how the diagram anchors each
   *  stage to the thing it adds. */
  anchor: "offer" | "copy" | "form" | "test" | "live";
};

/** Five stages. Each is written "Stage N. Title. Body" in the source; title and
 *  body reconstruct it exactly. */
export const build = {
  title: "How a Page",
  strokeTitle: "Gets Built",
  items: [
    {
      no: "01",
      title: "Work out the offer",
      anchor: "offer",
      glyph: "structure",
      body: "What the visitor gets, why it is worth their details, and what happens after they submit. Weak offers cannot be designed around.",
    },
    {
      no: "02",
      title: "Write it before designing it",
      anchor: "copy",
      glyph: "text",
      body: "Headline, proof, objections and the button wording, agreed as copy. Design decisions get easier once the words exist.",
    },
    {
      no: "03",
      title: "Build",
      anchor: "form",
      glyph: "creative",
      body: "Mobile layout first, then desktop. Form, routing, notifications and thank-you page wired up.",
    },
    {
      no: "04",
      title: "Test before spending",
      anchor: "test",
      glyph: "schema",
      body: "Real devices, real submissions, speed checked, tracking confirmed firing. We would rather find the broken form ourselves than have your budget find it.",
    },
    {
      no: "05",
      title: "Go live and watch",
      anchor: "live",
      glyph: "reporting",
      body: "The first week tells you a lot. Where people stop scrolling, which field they abandon, whether the enquiries are the kind your team wants.",
    },
  ] as BuildStage[],
};

/** Testing. The document's position is that the method depends on traffic, and
 *  it says so bluntly before offering either. */
export const testing = {
  title: "Finding Out",
  strokeTitle: "What Actually Works",
  threshold: "Split testing needs volume.",
  thresholdBody:
    "A page producing twenty conversions a month cannot reliably tell you whether the green button beat the blue one, and anyone claiming otherwise is reading noise and charging for it.",
  thresholdFigure: "twenty",
  lede: "So the method depends on your traffic.",
  /** Which sample each method is drawn against. Presentation only: "dense" and
   *  "sparse" are how the diagram renders, not claims. The sparse field is drawn
   *  as exactly twenty dots because that is the figure the document names, and
   *  no count is drawn on the dense one because the document names none. */
  samples: ["dense", "sparse"] as const,
  modes: [
    {
      label: "With high volume",
      body: "we run proper A/B tests, one change at a time, and let them reach a real conclusion before calling it.",
    },
    {
      label: "With lower volume",
      body: "we change the things most likely to matter, watch the direction of travel, and use session recordings and scroll data to see where people stall. That is less tidy than a statistical result, and considerably more useful than waiting six months for one.",
    },
  ],
  closingLead: "Either way, the page keeps getting worked on.",
  closing:
    "A landing page that has not changed in a year is not finished; it is abandoned.",
};

export const cases = {
  title: "When a Landing Page",
  strokeTitle: "Earns Its Cost",
  lede: "A dedicated page is worth building whenever you are paying for the traffic, or asking for something specific.",
  itemsLead: "That tends to mean:",
  // The first case names five platforms. Reconstruction: lead + " " + [0..3]
  // joined ", " + " or " + [4] reproduces the bullet word for word, so the
  // section can set the platforms as marks without repeating the sentence.
  platformsLead: "Any paid campaign on",
  platforms: ["Google", "Meta", "TikTok", "Snapchat", "LinkedIn"],
  items: [
    "Any paid campaign on Google, Meta, TikTok, Snapchat or LinkedIn",
    "A single service you want enquiries for, separate from everything else you sell",
    "Seasonal offers and promotions",
    "Property launches and off-plan releases",
    "Clinic and salon treatments with a booking action",
    "Event, webinar and course registration",
    "B2B guides, price lists and quote requests",
    "Testing a new service before committing to a full website section",
  ],
  caveat:
    "If your paid traffic currently goes to a homepage or a general service page, that is usually the cheapest improvement available to you.",
};

/** Where the document points readers next. Both routes are in the sitemap. */
export const relatedServices = {
  lead: "Landing pages work hardest alongside the rest of your digital marketing services.",
  // Reconstruction: lead + " The campaigns driving the traffic sit under
  // [performance marketing], and the follow-up after someone enquires sits
  // under [lead generation]."
  sentenceLead: "The campaigns driving the traffic sit under",
  sentenceMid: ", and the follow-up after someone enquires sits under",
  links: [
    { label: "performance marketing", href: "/services/performance-marketing" },
    { label: "lead generation", href: "/services/lead-generation" },
  ],
};

export type Reason = { no: string; title: string; body: string };

/** Six reasons. Split at the first full stop where the document writes two
 *  sentences; carried whole where it writes one. */
export const why = {
  title: "Why Clients Come",
  strokeTitle: "to Us for This",
  items: [
    {
      no: "01",
      title: "The people writing your ads write your page",
      body: "Which removes the most common cause of a mismatch between the two.",
    },
    {
      no: "02",
      title: "Built in days",
      body: "Campaigns wait for pages more often than pages wait for campaigns.",
    },
    {
      no: "03",
      title: "You can edit it yourself",
      body: "Change the offer, the headline or the form without booking developer time.",
    },
    {
      no: "04",
      title: "Tracking is configured before launch",
      body: "Not retrofitted after the first month of spend has already gone.",
    },
    {
      no: "05",
      title: "Speed checked on a real phone, on mobile data, against Google's published thresholds.",
      body: "",
    },
    {
      no: "06",
      title: "We say when the page is not the problem",
      body: "Sometimes the offer is wrong, or the enquiries are fine, and nobody is calling them back. Rebuilding the page would not have fixed either.",
    },
  ] as Reason[],
};

export const faqs: Faq[] = [
  {
    q: "What is a landing page?",
    a: "A single page built for one action, with no navigation to pull people elsewhere. Visitors usually arrive from an ad, an email or a QR code. Everything on it works towards one thing, whether that is an enquiry, a booking, a registration or a sale.",
  },
  {
    q: "Why not just send ads to our website?",
    a: "A website page offers choices, which is what it is for. A landing page removes them. Paid traffic sent to a homepage has to work out where to go next, and a proportion of it leaves instead. You also paid for every one of those clicks.",
  },
  {
    q: "How long does a landing page take to build?",
    a: "Usually days rather than weeks once the offer and copy are agreed. Extra time goes on booking or payment functionality, Arabic versions, and CRM connections. Your quote will state the timeline and what could move it.",
  },
  {
    q: "Can we edit the page ourselves afterwards?",
    a: "Yes. Pages are built so your team can change headlines, images, offers, and form fields without developer help. Anything structural we are happy to handle, but you should not need us for a price change.",
  },
  {
    q: "Does the landing page affect our ad costs?",
    a: "On Google Ads, yes. Landing page experience is one of three things Google evaluates in the ad auction, alongside expected click-through rate and ad relevance. A weak page can make the same click more expensive.",
  },
  {
    q: "How many form fields should we ask for?",
    a: "As few as your sales team can work with. Each additional field reduces the number of people who finish. Name and one contact method is often enough for a first conversation, and qualifying questions can be asked on the call instead.",
  },
  {
    q: "Will you write the copy?",
    a: "Yes, and we would rather write it before the design. The words determine the layout, so designing first and fitting copy in afterwards tends to produce a page that looks good and argues badly.",
  },
  {
    q: "Can you test different versions?",
    a: "Yes, where your traffic supports it. Proper A/B testing needs enough conversions to reach a real conclusion. On lower-traffic pages we make considered changes and use session recordings and scroll data instead of pretending a small sample means something.",
  },
  {
    q: "What if the page still does not convert?",
    a: "Then we work out which part is failing, using the tracking set up before launch. Sometimes it is the page. Sometimes the offer needs changing, the traffic is wrong, or the enquiries are arriving and not being called back. We will tell you which, including when the answer means less work for us.",
  },
];

export const finalCta = {
  title: "Tell Us What You're",
  strokeTitle: "Driving Traffic To",
  body: "Send us the campaign you are running, or planning, and where the clicks currently land. We will tell you what we would change, whether a new page is worth building, and what it would cost.",
  note: "If your current page is fine and something else is the problem, you will hear that too.",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";

/** Mid-page CTA band, above the work section. Supplied in the document under
 *  "Landing Page Development Page CTA". Stored in sentence case and split
 *  across two lines for typesetting; the band uppercases it. */
export const growthCta = {
  heading: ["Ready to turn clicks", "into customers?"] as [string, string],
  support:
    "Build High-Converting Landing Pages That Attract Visitors, Generate Leads & Drive Business Growth",
  button: "Get a Free Landing Page Quote",
};
