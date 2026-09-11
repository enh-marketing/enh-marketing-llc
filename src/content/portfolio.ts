// Portfolio — the content model for /portfolio and /portfolio/[slug].
//
// THE PROJECTS THEMSELVES live one file per client in src/content/portfolio/,
// collected by src/content/portfolio/projects.ts. Same convention as
// src/content/case-studies, src/content/insights and src/content/services.
//
// NOTHING IN A MIGRATED PROJECT IS INVENTED. Each was converted from its live
// enhmedia.com/portfolio page: the title is that page's <h1> and the profile
// is its COMPANY PROFILE rich text. Every project carries a `source` URL so
// any sentence can be checked against the page it came from, and
// scripts/migrate-portfolio/verify.py compares the two word for word.
//
// A PORTFOLIO ENTRY PUBLISHES NO FIGURES, so this file computes none and none
// appear on the pages. That is the difference between this archive and the
// case studies: a case study ends in four numbers somebody's reporting
// produced, and a portfolio entry ends in the thing that was made — a film, a
// website, a set of artwork. Where a project has both, its page links to the
// case study rather than repeating its numbers without its evidence.
//
// THE BLOCK MODEL IS THE CASE STUDIES' MODEL, imported as types only. Both
// archives were migrated out of the same Webflow rich text with the same
// converter, and `Prose` renders either. The import is deliberately type-only:
// pulling a value out of @/content/case-studies would drag all twenty-two
// studies into this section's client bundle.

import type { Block, Figure, Inline } from "@/content/case-studies";
import { projects as migrated } from "@/content/portfolio/projects";

export type { Block, Figure, Inline };

/* ------------------------------------------------------------ categories */

/** The three tabs the live index files its work under. Not a taxonomy
 *  invented here: `categories` on each project is read out of those tab panes
 *  by the migration, and nine projects sit in two of them. */
export type Category = "digital-marketing" | "video-production" | "web-design";

/** In the order the site lists them, which is the order the live index's tabs
 *  run in. Everything that walks categories walks this, so the rail, the
 *  tally, the cards and the structured data cannot disagree about the order. */
export const CATEGORY_ORDER: Category[] = [
  "digital-marketing",
  "video-production",
  "web-design",
];

export const CATEGORIES: Record<Category, { label: string }> = {
  "digital-marketing": { label: "Digital Marketing" },
  "video-production": { label: "Video Production" },
  "web-design": { label: "Web Design" },
};

/* ---------------------------------------------------------------- pieces */

/** A hosted film. The id and the provider, never a file: eleven Vimeo videos
 *  are not this repository's to carry, and the live pages embed the player. */
export type Film = { provider: "vimeo"; id: string; title: string };

export type Project = {
  slug: string;
  /** The live page's <h1>, which is also the label on its index card. The two
   *  are identical on all thirty-five, so there is one name and no second
   *  "client" field assigned on top of it. */
  title: string;
  categories: Category[];
  /** Position on the live index, walking its tabs in CATEGORY_ORDER. */
  order: number;
  profile: Block[];
  thumb: Figure;
  /** The lightbox strip: the work published on the project's own page. Ten of
   *  the thirty-five have one. */
  gallery?: Figure[];
  /** The screenshot of the client's site the live page frames in its monitor
   *  mockup. Six pages publish one; the rest frame the site live instead, and
   *  that URL migrates as `projectUrl`. */
  siteShot?: Figure;
  projectUrl?: string;
  film?: Film;
  /** The slug of this client's case study, where the live page links to one.
   *  Resolved against src/content/case-studies in the route rather than here,
   *  so the studies stay out of this section's bundle. */
  caseStudy?: string;
  source: string;
};

/* --------------------------------------------------------------- archive */

export const projects: Project[] = migrated;

/* --------------------------------------------------------------- helpers */

/** All of them, in the source's order. */
export function all(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function bySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Whether a project publishes anything beyond its profile: a film, a site, or
 *  artwork. Every one of the thirty-five does, and the check is here so a
 *  project added without any of them renders its brief and no empty chapter
 *  rather than a heading over nothing. */
export function hasWork(project: Project): boolean {
  return Boolean(project.film || project.siteShot || project.projectUrl || project.gallery?.length);
}

/** The categories a project is filed under, resolved to their labels and kept
 *  in CATEGORY_ORDER whatever order the source listed them in. */
export function categoriesOf(project: Project): { key: Category; label: string }[] {
  return CATEGORY_ORDER.filter((key) => project.categories.includes(key)).map((key) => ({
    key,
    label: CATEGORIES[key].label,
  }));
}

/** Every category with work in it, in CATEGORY_ORDER with its count.
 *
 *  THE COUNTS SUM TO MORE THAN THE ARCHIVE, and that is the honest answer: a
 *  project in two categories is counted in both, because it genuinely is in
 *  both. Nothing on the page adds them up. */
export function categoryCounts(
  list: Project[] = all(),
): { key: Category; label: string; count: number }[] {
  return CATEGORY_ORDER.map((key) => ({
    key,
    label: CATEGORIES[key].label,
    count: list.filter((p) => p.categories.includes(key)).length,
  })).filter((row) => row.count > 0);
}

export function inCategory(category: Category, list: Project[] = all()): Project[] {
  return list.filter((p) => p.categories.includes(category));
}

/** The project before and after this one, wrapping at the ends.
 *
 *  Wrapping for the same reason the case studies wrap: this is a fixed set the
 *  reader is being invited to walk, not a dated feed, so the last entry
 *  offering the first one back is a continuation rather than a dead end. */
export function neighbours(project: Project): { prev: Project; next: Project } {
  const list = all();
  const i = list.findIndex((p) => p.slug === project.slug);
  const at = (n: number) => list[(n + list.length) % list.length];
  return { prev: at(i - 1), next: at(i + 1) };
}

/** What to offer at the end of a project: work in a category it shares, then
 *  the rest in the source's order, so the set is always full and every entry
 *  is a real relation rather than a random pick. */
export function relatedTo(project: Project, count = 3): Project[] {
  const pool = all().filter((p) => p.slug !== project.slug);
  const shared = pool.filter((p) => p.categories.some((c) => project.categories.includes(c)));
  const rest = pool.filter((p) => !p.categories.some((c) => project.categories.includes(c)));
  return [...shared, ...rest].slice(0, count);
}

/** WHETHER AN IMAGE IS WORTH OPENING AT FULL SIZE.
 *
 *  Thirteen of the forty-nine gallery files are 219px square upstream — that
 *  is the whole file, not a thumbnail of one — and the grid already shows them
 *  at about that size. Offering a viewer for those would upscale a small file
 *  and present it as detail it does not have, and it would put a hover state
 *  on something with nothing behind it, which this site treats as a lie. So
 *  the viewer is offered only where the file is materially larger than the
 *  tile, and the rest are set as plain figures. */
export function canOpen(figure: Figure): boolean {
  return figure.w >= 700;
}

/** The client's site, as a hostname. "https://www.supercadonline.com/" is a
 *  URL; "supercadonline.com" is what a reader wants printed.
 *
 *  Duplicated from @/content/case-studies rather than imported for the reason
 *  given at the top of this file: importing a value from there would bundle
 *  all twenty-two studies into the portfolio island. Four lines is the cheaper
 *  of the two costs. */
export function siteLabel(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

/** Plain text of an inline tree. For meta descriptions and JSON-LD, which
 *  cannot carry marks. Duplicated for the same reason as `siteLabel`. */
export function plain(nodes: Inline[]): string {
  return nodes
    .map((n) =>
      typeof n === "string" ? n : "b" in n ? plain(n.b) : "i" in n ? plain(n.i) : plain(n.children),
    )
    .join("");
}

/** The project's first paragraph as plain text. */
export function opener(project: Project): string {
  const p = project.profile.find((b) => b.type === "p");
  return p && p.type === "p" ? plain(p.text) : "";
}

/** THE PAGE DESCRIPTION, DERIVED RATHER THAN COPIED.
 *
 *  All thirty-five live pages set their meta description to the project's name
 *  and nothing else, which search engines treat as no description at all. So
 *  the description here is the name followed by the opening of its own COMPANY
 *  PROFILE, cut at a word boundary. Every word still comes from the page; only
 *  the joining is ours. Same arrangement `describe` makes for a case study. */
export function describe(project: Project, limit = 155): string {
  const text = opener(project) || project.title;
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** The first sentence of a project's profile, for the card.
 *
 *  A CARD CANNOT CARRY FIGURES HERE. The case study card's lower half is the
 *  four numbers that study publishes; a portfolio entry publishes none, so
 *  what goes in that space is the opening of the client's own description of
 *  themselves. It is their words, it is different on every card, and the rest
 *  of it is one click away. */
export function blurb(project: Project): string {
  const text = opener(project);
  const stop = text.search(/\.\s/);
  return stop > 0 ? text.slice(0, stop + 1) : text;
}

/** WHAT A PROJECT'S PAGE ACTUALLY HOLDS, named in the order the page sets it.
 *
 *  Counted from the project rather than written per entry, so the line on the
 *  card cannot claim a film the page does not have. "5 images" is countable
 *  against the grid on the page it describes, which is the test every figure
 *  on this site has to pass. */
export function holdings(project: Project): string[] {
  const out: string[] = [];
  if (project.film) out.push("Film");
  if (project.gallery?.length) {
    out.push(`${project.gallery.length} image${project.gallery.length === 1 ? "" : "s"}`);
  }
  if (project.siteShot || project.projectUrl) out.push("Website");
  return out;
}

/* --------------------------------------------------------------- page copy */

// EVERYTHING BELOW IS PAGE FURNITURE, NOT CLIENT CONTENT: the headings and
// labels that describe the collection rather than words taken from inside it.
// Nothing here makes a claim about any client.

export const meta = {
  title: "Digital Marketing Portfolio Dubai | ENH Marketing",
  description:
    "Explore ENH Marketing’s portfolio of digital marketing, web design and video production projects, showcasing creative solutions and business results.",
  ogTitle: "Portfolio — ENH Marketing",
  ogDescription:
    "The work itself: thirty-five UAE projects across digital marketing, video production and web design, each with the film, the site or the artwork it produced.",
};

export const masthead = {
  /** Solid / stroked / brand, the site's hero tri-tone. Not "Portfolio",
   *  which is the label in the menu the reader just clicked. What these
   *  thirty-five have in common is the thing each one left behind, so the
   *  headline names the three kinds. */
  lines: ["Every Site,", "Every Film,", "Every Frame."] as [string, string, string],
  sub: "Thirty-five projects for businesses in the UAE and beyond, filed under the three disciplines that made them. Nine sit in two at once, and each of those keeps one page.",
  primary: "Start a project",
  secondary: "Talk to our experts",
  /** The field's caption. Two labels, inside the three a drawing may carry. */
  fieldLabel: "What the work was",
  fieldHint: "Choose a discipline to filter the archive",
};

export const archive = {
  index: "01",
  title: "Every",
  strokeTitle: "project.",
  lede: "All thirty-five, in the order our own index lists them. Each card carries the client's own opening line and what its page holds, and nothing that it does not.",
  categoryLabel: "Discipline",
  allLabel: "Everything",
  emptyLabel: "Nothing in the archive under that yet.",
  resetLabel: "Show everything",
};

export const project = {
  briefLabel: "Company profile",
  workLabel: "The work",
  filmLabel: "The film",
  galleryLabel: "The artwork",
  galleryHint: "Open at full size",
  siteLabel: "The site",
  liveSiteLabel: "Client site",
  categoriesLabel: "Filed under",
  caseStudyLabel: "The numbers behind it",
  caseStudyAction: "Read the case study",
  sourceLabel: "Migrated from",
  navPrev: "Previous",
  navNext: "Next",
  relatedIndex: "03",
  relatedTitle: "More",
  relatedStroke: "of the work.",
};

/** The closing ask, in the shape CtaBand takes on every other page. */
export const finalCta = {
  index: "04",
  title: "Bring us",
  strokeTitle: "the next one.",
  body: "Every project on this page started with somebody describing what they wanted made and who it had to reach. If you have one of those, put it in front of the team that made these and we will tell you what we would actually do about it.",
  note: "No deck, no discovery fee. One conversation, and a straight answer about whether we are the right agency for it.",
  submitLabel: "Start the conversation",
  whatsappLabel: "Message us on WhatsApp",
};

/** The enquiry form's fields, matching the set the contact page uses. */
export const formFields = [
  { id: "name", label: "Your name", required: true, autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  {
    id: "message",
    label: "What are you looking to make?",
    textarea: true,
    wide: true,
    required: true,
  },
];
