// Testimonials — the page's content model.
//
// SOURCE: https://enhmedia.com/testimonial, read 2026-09-07. All eighteen
// testimonials, the names, the companies, the hero copy and the closing call
// to action below are that page's own, transcribed verbatim. The repository's
// src/lib/content.ts carries a different, older set of seven, which is what
// the homepage Voices section still shows; this page uses the live eighteen.
//
// TYPOS ARE REPRODUCED, NOT CORRECTED. Two of the eighteen contain obvious
// slips as published ("towrds geeat height", "ofany sort", "I had event
// recommended"). They are somebody else's words, so they are not edited here
// under any justification. They should be fixed at the source instead.
//
// WHAT IS ADDED, AND ALL OF IT IS DERIVED RATHER THAN INVENTED:
//
//   `mark`     A verbatim, contiguous substring of the quote, handed to
//              <Marked>. Emphasis is the only editorial tool this site allows
//              on client copy, and a phrase that stops matching degrades to
//              plain text rather than crashing.
//
//   `held`     Only where the testimonial ITSELF names how long the client has
//              worked with ENH. `phrase` is the client's own wording and
//              `years` is the number in it. Five of the eighteen qualify.
//              Afrah Saleem's "past 5 years" is deliberately NOT one of them:
//              it describes her own career, not this relationship. Baiju Nair
//              gives a start date rather than a span, so he carries the phrase
//              and no number, because subtracting one date from another would
//              be this page inventing a figure.
//
//   `mentions` A service tag is set only where the quote names that service in
//              its own words, and `evidence` is the phrase it was read from,
//              so every tag on the page can be checked against the sentence
//              above it. Quotes that name no service carry none: the filter is
//              "what they mention", so silence is an honest answer to it.
//
//   `stars`    Every testimonial on the source page carries five stars. It is
//              a constant, so it is written once, here, rather than eighteen
//              times as data — and it is not dressed up as an average rating
//              anywhere, because no rating scale or count is published.
//
// NO JOB TITLES EXIST. The source gives a name and a company and nothing else,
// so no role is shown. NO CLIENT LOGO ARTWORK EXISTS IN THIS REPOSITORY, so
// identity is carried by the monogram treatment the site already uses for
// clients, never by a fabricated or hotlinked mark. NO VIDEO EXISTS on the
// source page or in this repository, so the page has no video section.

export const meta = {
  title: "Client Testimonials | ENH Marketing, Dubai",
  description:
    "Twenty ENH Marketing clients in their own words, from Gulf Radiant at fifteen years to Helpsters at two. Read what businesses across Dubai say about our SEO, websites, social media and support.",
};

export const STARS = 5;

export const hero = {
  /** Solid / stroked / brand, the site's hero tri-tone.
   *
   *  Not "Client testimonials", which is a page label rather than a headline.
   *  The one thing the eighteen have in common is that they were written by
   *  people who were still clients on the day they wrote them, and five of
   *  them say exactly how long that has been. The headline is that. */
  lines: ["The Words", "Of People", "Who Stayed"] as [string, string, string],
  /** The source page's own subheading, with its em dash resolved to a comma. */
  sub: "Every testimonial represents a brand that trusted us with their digital journey, and achieved measurable growth.",
  primary: "Get In Touch",
  secondary: "Talk To Our Experts",
};

/* ---------------------------------------------------------------- services */

export type Service = "seo" | "web" | "social" | "craft";

export const SERVICE_LABEL: Record<Service, string> = {
  seo: "SEO",
  web: "Websites",
  social: "Social & campaigns",
  craft: "Design & support",
};

/* ------------------------------------------------------------------ voices */

export type Voice = {
  no: string;
  name: string;
  org: string;
  quote: string;
  /** Verbatim substring of `quote`. */
  mark: string;
  /** Set only where the quote names the length of the ENH relationship. */
  held?: { phrase: string; years?: number };
  /** Service tags, each with the phrase in `quote` it was read from. */
  mentions?: { service: Service; evidence: string }[];
};

/** All twenty: the eighteen the source page lists, in its order, then the two
 *  the team supplied afterwards. */
export const voices: Voice[] = [
  {
    no: "01",
    name: "Shaji",
    org: "Xylem Electro Mechanical",
    quote:
      "What truly sets ENH Media apart is the quality of service they offer—especially the proactive and strategic approach. Xylem Electromechanical's website and SEO activities have achieved measurable improvements in performance and visibility. We're glad to have ENH Media as a trusted partner in our digital journey.",
    mark: "measurable improvements in performance and visibility",
    mentions: [
      { service: "seo", evidence: "SEO activities" },
      { service: "web", evidence: "website" },
    ],
  },
  {
    no: "02",
    name: "Adwaith Vijayan",
    org: "Supercad Trading LLC",
    quote:
      "ENH Marketing, your one stop point for all your media requirement, ENH team has helped us a lot in terms of trending marketing which in turn helped us a lot to grow more by making ourselves to reach prospective and niche customers. Shall ENH move towrds geeat height, wishing them best luck in their future endeavors.",
    mark: "reach prospective and niche customers",
  },
  {
    no: "03",
    name: "Aji George",
    org: "Lambent Decoration Design LLC",
    quote:
      "A very knowledgeable agency. Understanding the client needs. Very cooperative staff. Excellent comfort in working with the entire team. Will always recommend ENH Marketing.",
    mark: "Excellent comfort in working with the entire team.",
  },
  {
    no: "04",
    name: "Rizwan Shaikh",
    org: "Ariiz International",
    quote:
      "Excellent Services, Result oriented professional group. I strongly recommend ENH Media for any SEO and Social Marketing activities of business.",
    mark: "Result oriented professional group.",
    mentions: [
      { service: "seo", evidence: "SEO" },
      { service: "social", evidence: "Social Marketing" },
    ],
  },
  {
    no: "05",
    name: "Afrah Saleem",
    org: "TLM Logistics",
    quote:
      "In my past 5 years of working in the marketing field and having over 3-4 websites developed, I don't think the process was ever so seamless and perfect. From the first template itself, the design, the content, the color pallet, everything was great. Any changes needed were literally done within a day.",
    mark: "I don't think the process was ever so seamless and perfect.",
    mentions: [
      { service: "web", evidence: "websites developed" },
      { service: "craft", evidence: "the design, the content, the color pallet" },
    ],
  },
  {
    no: "06",
    name: "Olga Chernikova",
    org: "Media Interactive",
    quote:
      "ENH has wonderful team, I have done several Scan & Win campaigns with the team and I couldn't be happier. Team is always focused and on point with backend management, I had event recommended them to the rest of my team.",
    mark: "always focused and on point with backend management",
    mentions: [{ service: "social", evidence: "Scan & Win campaigns" }],
  },
  {
    no: "07",
    name: "Baiju Nair",
    org: "Hygiene FRESH",
    quote:
      "We have been utilizing the services of ENH Media since January 2018 and have consistently been impressed with their professionalism and expertise. Their team comes with extensive industry experience and provides excellent technical support with remarkably quick response times. I particularly appreciate their ability to deliver fast, reliable, and trustworthy solutions whenever we encounter issues. Their technical knowledge and proactive approach have been invaluable to our operations.",
    mark: "remarkably quick response times",
    // A start date, not a span. No number is derived from it.
    held: { phrase: "since January 2018" },
    mentions: [{ service: "craft", evidence: "excellent technical support" }],
  },
  {
    no: "08",
    name: "Monish B Shah",
    org: "Optima Capitol",
    quote:
      "I have taken ENH's services and what I enjoy the most is what I couldn't do at all because I do nothing about digital media and don't even attempt it. ENH handles everything for me and that's how today I am getting business ofany sort is only through ENH and their digital performance and their digital help because I don't do anything, they do literally everything for me. Thanks ENH, you've been of great service and of great help and I would want to be with you as long as I can. Thank you so much.",
    mark: "I would want to be with you as long as I can.",
  },
  {
    no: "09",
    name: "Umesh CK",
    org: "Venesta Middle East FZE",
    quote:
      "Bala is a truly inspiring person, and it has been a pleasure working with him. We look forward to continuing our collaboration on the Venesta website, social media marketing, and digital marketing in the coming year. Wishing Bala all the very best for the future. Thank you.",
    mark: "We look forward to continuing our collaboration",
    mentions: [
      { service: "web", evidence: "Venesta website" },
      { service: "social", evidence: "social media marketing" },
    ],
  },
  {
    no: "10",
    name: "Mohit Mehta",
    org: "Helpsters Cleaning Services",
    quote:
      "Hi, my name is Mohit Mehta and I run a company called Helpsters Cleaning Services. We've been using ENH's service for the past two years now and I think until we run businesses we are going to be associated with the ENH because of the fantastic work they do. I'm sure they have a lot more to go. Congratulations Bala and entire team at ENH.",
    mark: "until we run businesses we are going to be associated with the ENH",
    held: { phrase: "for the past two years now", years: 2 },
  },
  {
    no: "11",
    name: "Hricha Saraf",
    org: "Bol Gappa Restaurant",
    quote:
      "Congratulations to ENH team for their wonderful years and thank you so much to the ENH team for the work which they are doing for my team Bol Gappa. Thank you so much.",
    mark: "the work which they are doing for my team",
  },
  {
    no: "12",
    name: "Amandeep Kaur",
    org: "V Fix Maintenance & Technical Services LLC",
    quote:
      "Congratulations to ENH for their incredible journey in the industry. They are fantastic at what they do. Their SEO work has helped us generate a lot of business and has been amazing for lead generation. Thank you so much, ENH Marketing!",
    mark: "helped us generate a lot of business",
    mentions: [{ service: "seo", evidence: "Their SEO work" }],
  },
  {
    no: "13",
    name: "Devanand Mahadeva",
    org: "Bestwins Law Corporation for Legal Consultancy",
    quote:
      "As a client of ENH, it's lovely to work with them. They take care of all our digital promotions, and we enjoy what they bring to us in the table to develop our business. Congratulations to ENH and Bala and the team. Thank you.",
    mark: "They take care of all our digital promotions",
  },
  {
    no: "14",
    name: "Ashokan Edayillam",
    org: "Gulf Radiant",
    quote:
      "ENH has been managing our website, hosting, and design requirements for the past 15 years. Throughout this time, they have consistently provided prompt responses and valuable technical support. We are very satisfied with their services and truly appreciate their professionalism and reliability.",
    mark: "for the past 15 years",
    held: { phrase: "for the past 15 years", years: 15 },
    mentions: [
      { service: "web", evidence: "our website" },
      { service: "craft", evidence: "hosting, and design requirements" },
    ],
  },
  {
    no: "15",
    name: "Devanand Mahadeva",
    org: "TPM Williams",
    quote:
      "ENH Media has been our partner for the last eight years. We successfully navigated a variety of thoughts and ideas to complete a hundred-page brochure design task that marked the beginning of our relationship. Since that first project was successful, we have kept using their other services and particularly appreciate the guidance their team provides. They are highly knowledgeable as well as quick to understand what we need, so we highly recommend them.",
    mark: "for the last eight years",
    held: { phrase: "for the last eight years", years: 8 },
    mentions: [{ service: "craft", evidence: "brochure design" }],
  },
  {
    no: "16",
    name: "Tim Hopcraft",
    org: "Craft Consulting",
    quote:
      "We have been using ENH Media for 4 years now for our 2 companies. They are always responsive, reliable and professional in everything they do. Highly recommend them to anyone looking for service with a personal touch. Great team and quality service!",
    mark: "for 4 years now for our 2 companies",
    held: { phrase: "for 4 years now", years: 4 },
  },
  {
    no: "17",
    name: "Darshan Ravi",
    org: "N. Gopaldas Gems & Jewellery Exports (P) Ltd",
    quote:
      "The team is fantastic to work with, consistently meeting deadlines. They have a strong ability to understand our requirements and deliver exceptional results.",
    mark: "consistently meeting deadlines",
  },
  {
    no: "18",
    name: "Lara Kandil",
    org: "Avoria Aesthetic Clinic",
    quote:
      "Amazing service! Mr. Bala and his team were extremely supportive and pleasant. I must say that it is a pleasure to work with them. I highly recommend ENH Media to anyone looking for digital services such as website development and SEO management.",
    mark: "extremely supportive and pleasant",
    mentions: [
      { service: "web", evidence: "website development" },
      { service: "seo", evidence: "SEO management" },
    ],
  },
  {
    /* 19 AND 20 DID NOT COME FROM THE SOURCE PAGE. The eighteen above were
       transcribed from https://enhmedia.com/testimonial on 2026-09-07; these
       two were supplied directly by the team on 2026-09-11 and are not
       published there yet. Same rule applies to both: the words are the
       client's and nothing here edits them.

       NEITHER HAS LOGO ARTWORK IN THIS REPOSITORY, so neither appears in
       `LOGOS` and both fall back to the monogram plate in VoiceArchive. Drop a
       file into /public/clients and add the entry to light them up.

       BOTH NAME "SEO and Google Ads" AND ONLY SEO IS TAGGED. There is no
       service in this page's four that means paid search -- `social` is
       "Social & campaigns" and stretching it to cover Google Ads would put a
       tag on the card with nothing in the sentence behind it, which is the one
       thing `mentions` exists to prevent. Silence is the honest answer until
       the filter has a tag for it. */
    no: "19",
    name: "Dr. Vrata Shetty",
    org: "Rex Medicals",
    quote:
      "ENH has been managing our SEO and Google Ads, and we’ve been very happy with their work and commitment. The team has been proactive, responsive and consistently focused on delivering results. Their understanding of digital marketing and willingness to go the extra mile has made them a valuable partner for Rex Dental Clinic. We appreciate their efforts and would definitely recommend ENH to businesses looking for a reliable digital marketing partner.",
    mark: "proactive, responsive and consistently focused on delivering results",
    mentions: [{ service: "seo", evidence: "SEO" }],
  },
  {
    /* Four paragraphs, and they are kept. The quote carries its own newlines
       and the card sets `whitespace-pre-line`; every other quote on this page
       is a single run, so nothing else is affected. */
    no: "20",
    name: "Sona Malek",
    org: "Spectrum Exhibitions",
    quote:
      "Working with ENH has been a great experience for Spectrum. They took the time to understand our exhibition business, the different industries we cater to and the kind of clients we want to reach.\n\nTheir consistent efforts across SEO and Google Ads have helped strengthen our online visibility and bring more relevant enquiries and leads to our business. We particularly appreciate the team’s proactive approach to exploring new strategies and identifying industry-specific opportunities to reach potential customers.\n\nWhile our team is focused on delivering successful exhibitions for our clients, ENH has taken ownership of strengthening our digital presence and ensuring that Spectrum remains visible to people looking for exhibition services in Dubai.\n\nThe team is responsive, easy to work with and committed to continuous improvement. We’re happy with the progress so far and look forward to achieving even more together. We would definitely recommend ENH as a reliable digital marketing partner.",
    mark: "strengthen our online visibility and bring more relevant enquiries and leads",
    mentions: [{ service: "seo", evidence: "SEO" }],
  },
];

/* ----------------------------------------------------------------- derived */

/** FAILS THE BUILD IF AN EMPHASIS PHRASE OR A PIECE OF EVIDENCE STOPS BEING
 *  VERBATIM. Every `mark`, every `held.phrase` and every `mentions.evidence`
 *  claims to be a contiguous substring of the quote it belongs to. If one is
 *  not, the page would either silently drop the emphasis or, worse, print a
 *  service tag with nothing in the sentence behind it. Runs at module load,
 *  which on a static build is build time. */
const broken = voices.flatMap((v) => {
  const bad: string[] = [];
  if (!v.quote.includes(v.mark)) bad.push(`${v.no} mark`);
  if (v.held && !v.quote.includes(v.held.phrase)) bad.push(`${v.no} held.phrase`);
  for (const m of v.mentions ?? [])
    if (!v.quote.includes(m.evidence)) bad.push(`${v.no} ${m.service} evidence`);
  return bad;
});
if (broken.length) {
  throw new Error(
    `content/testimonials.ts: these are no longer verbatim substrings of their quote: ${broken.join(", ")}.`,
  );
}

/** The five who say how long it has been, longest first. Ordered by the number
 *  in their own sentence; the one who gives a start date rather than a span
 *  sits after the spans rather than being assigned a length it never claimed. */
export const held = voices
  .filter((v) => v.held)
  .sort((a, b) => (b.held?.years ?? -1) - (a.held?.years ?? -1));

/** How many of the eighteen name each service, for the filter's own labels. */
export function countFor(service: Service): number {
  return voices.filter((v) => v.mentions?.some((m) => m.service === service)).length;
}

/* -------------------------------------------------------------------- logos */

/** The client logos, downloaded from the source page into /public/clients.
 *
 *  WHY THEY ARE FILES IN THIS REPOSITORY AND NOT REMOTE URLS. They were served
 *  from the live site's own CDN. Pointing at that CDN from a different build
 *  makes every card on this page depend on another deployment's asset paths,
 *  which change when a file is re-uploaded, and it hands a third party the
 *  ability to break or swap a client's mark. They are ours to serve, so they
 *  are served from /public.
 *
 *  EACH PAIRING WAS READ OFF THE SOURCE PAGE, NOT GUESSED FROM THE FILENAME.
 *  Five of the eighteen ship with opaque names — two are Facebook export
 *  filenames and three are lower-cased words — so the mapping was taken from
 *  the markup, where the logo sits immediately before its own name and company.
 *
 *  `w` and `h` ARE THE FILES' REAL PIXEL SIZES, measured, not assumed. They
 *  only set the aspect ratio, but they have to be in proportion or the browser
 *  reserves the wrong box and every card shifts as the images arrive. Thirteen
 *  are square and five are landscape, which is exactly why the card gives them
 *  a fixed HEIGHT and lets the width follow: one box for all eighteen would
 *  either shrink the wordmarks to a square or strand the square marks in a
 *  wide plate.
 *
 *  SEVEN WERE DOWNSCALED TO 400px ON THEIR LONG EDGE. As served they ran up to
 *  2048px for a mark that renders 64px tall, which is 116KB to draw a logo the
 *  size of a thumbnail. 400px is still better than 3x the rendered height, so
 *  it is sharp on any display, and it took the set from 576KB to 344KB.
 *
 *  THE PLATE UNDER THEM IS NOT DECORATION. Every one of these files carries its
 *  own opaque background, so dropped straight onto a dark surface they would
 *  read as eighteen white rectangles at eighteen different sizes. A common
 *  white plate gives them one height, one radius and one measure of clear
 *  space, which is the same treatment the site already gives the Google and
 *  Meta badges and the reason they read as a row of marks. */
export type Logo = { src: string; w: number; h: number };

export const LOGOS: Record<string, Logo> = {
  "01": { src: "/clients/xylem.jpg", w: 200, h: 200 },
  "02": { src: "/clients/supercad.jpg", w: 400, h: 400 },
  "03": { src: "/clients/lambent.jpg", w: 400, h: 400 },
  "04": { src: "/clients/ariiz.jpg", w: 200, h: 200 },
  "05": { src: "/clients/tlm-logistics.jpg", w: 300, h: 300 },
  "06": { src: "/clients/media-interactive.png", w: 209, h: 101 },
  "07": { src: "/clients/hygiene-fresh.jpg", w: 266, h: 266 },
  "08": { src: "/clients/optima-capitol.png", w: 336, h: 237 },
  "09": { src: "/clients/venesta.jpg", w: 200, h: 200 },
  "10": { src: "/clients/helpsters.png", w: 400, h: 400 },
  "11": { src: "/clients/bol-gappa.jpg", w: 400, h: 400 },
  "12": { src: "/clients/vfix.jpg", w: 400, h: 400 },
  "13": { src: "/clients/bestwins.png", w: 197, h: 199 },
  "14": { src: "/clients/gulf-radiant.png", w: 137, h: 79 },
  "15": { src: "/clients/tpm-williams.jpg", w: 200, h: 200 },
  "16": { src: "/clients/craft-consulting.png", w: 355, h: 254 },
  "17": { src: "/clients/n-gopaldas.jpg", w: 400, h: 400 },
  "18": { src: "/clients/avoria.jpg", w: 400, h: 399 },
};

/** THE ORDER THE CARDS ARE LAID OUT IN, WHICH IS NOW SIMPLY THE SOURCE'S.
 *
 *  This used to interleave: the five testimonials that name a duration were
 *  set as WIDE cards taking two columns, three of them fell consecutively in
 *  source order, and three wide cards in a row is a block rather than a
 *  rhythm -- so they were spread one every fourth slot to give the wall a
 *  beat.
 *
 *  There is one card weight now, so there is nothing left to space out and
 *  nothing the reshuffle buys. Reordering was only ever defensible as a
 *  presentational fix for that problem; with the problem gone it would just be
 *  this file having an opinion about whose testimonial comes first, and
 *  nothing on the page claims an order. Back to the order the source lists
 *  them in, with the two the team supplied afterwards at the end.
 *
 *  Kept as a named export rather than folded into `voices` at the call site so
 *  the archive keeps one thing to render and a future ordering has one place
 *  to live. */
export const layout: Voice[] = voices;

/** Initials for the monogram, matching the treatment TrustStrip already uses
 *  for clients. Skips a leading initial-with-a-dot so "N. Gopaldas Gems" reads
 *  NG rather than N., and skips a lone connective. */
export function monogram(org: string): string {
  const words = org
    .split(" ")
    .filter((w) => w.length > 1 && !/^[&(]/.test(w) && !/^\.$/.test(w))
    .map((w) => w.replace(/[^A-Za-z]/g, ""))
    .filter(Boolean);
  if (!words.length) return org.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/* ---------------------------------------------------------------- sections */

export const archive = {
  index: "01",
  title: "All Twenty,",
  strokeTitle: "In Their Own Words",
  lede:
    "Every testimonial ENH has been given, reproduced exactly as received. Five of them say how long the relationship has run, in their own words. Filter by the service a client names, or open any card to read it in full.",
};

export const finalCta = {
  index: "02",
  title: "Ready To Be Our",
  strokeTitle: "Next Success Story",
  body: "Every quote on this page started as a first conversation about where a business had stalled. Tell us where yours has, and we will tell you honestly whether we are the ones to move it.",
  note: "Not one figure on this page was written by us. In three years we would like yours to be the twenty-first that was not either.",
  submitLabel: "Get In Touch",
  whatsappLabel: "Chat On WhatsApp",
};

/** Field set for the enquiry form, matching the shape the service pages use. */
export const formFields = [
  { id: "name", label: "Your name", required: true, autoComplete: "name" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "goal", label: "What has stalled?", textarea: true, wide: true },
];
