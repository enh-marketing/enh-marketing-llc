// AI Hub — landing page content.
//
// COPY SOURCE. Every line below is already approved. The labels are the site's
// own navigation labels for these eight pages (src/lib/sitemap.ts), and each
// `line` is the verbatim `meta.description` of that page's content file, which
// is itself the opening sentence of the client's document for that service.
// Nothing here is written for this page, because no document for this page
// exists yet. When one arrives, the headings and any connecting prose come
// from it and this file grows; until then the page says only what the eight
// documents already say.
//
// THE `field` VALUE IS NOT COPY. It names which arrangement the drawing takes
// for that category, and each one is chosen from that category's own sentence.
// See CategoryField.tsx, where every arrangement is justified against the line
// it is drawn from.

/** Which arrangement the field takes. One per category, never reused. */
export type FieldState =
  | "converge"
  | "route"
  | "frames"
  | "thread"
  | "range"
  | "layout"
  | "bars"
  | "room";

export type Category = {
  /** Two digits, shown on the rail. */
  no: string;
  label: string;
  href: string;
  /** Verbatim, from that page's own document. */
  line: string;
  field: FieldState;
};

export const categories: Category[] = [
  {
    no: "01",
    label: "AI Search Visibility (AEO & GEO)",
    href: "/ai-hub/ai-search-visibility",
    line: "ENH Marketing helps UAE brands improve how they appear in AI-generated search results.",
    // One answer, many places it could be drawn from.
    field: "converge",
  },
  {
    no: "02",
    label: "AI & Automation",
    href: "/ai-hub/ai-automation",
    line: "ENH Marketing builds AI agents, automated workflows and custom tools for UAE businesses. Every project starts with a paid diagnostic that identifies what to automate and what should stay manual.",
    // A route that repeats, and the work that stays where it is.
    field: "route",
  },
  {
    no: "03",
    label: "AI Creative Production",
    href: "/ai-hub/ai-creative-production",
    line: "ENH Marketing produces AI-generated videos, UGC-style ads, product imagery, and creative variants for UAE brands.",
    // Variants: one subject, several frames.
    field: "frames",
  },
  {
    no: "04",
    label: "Conversational AI",
    href: "/ai-hub/conversational-ai",
    line: "ENH Marketing builds AI chatbots, voice agents and customer service systems for UAE businesses. Every project starts with a paid diagnostic.",
    // Two sides, taking turns.
    field: "thread",
  },
  {
    no: "05",
    label: "Campaign Intelligence",
    href: "/ai-hub/campaign-intelligence",
    line: "ENH Marketing helps UAE businesses plan campaign budgets using historical performance, relevant benchmarks and forecast ranges.",
    // What happened is a line. What is ahead is a range.
    field: "range",
  },
  {
    no: "06",
    label: "Intelligent Web",
    href: "/ai-hub/intelligent-web",
    line: "ENH Marketing designs and develops intelligent websites for UAE businesses that personalise content, display live information and use a clear structure.",
    // "a clear structure", so the field becomes one.
    field: "layout",
  },
  {
    no: "07",
    label: "Data & Dashboards",
    href: "/ai-hub/data-and-dashboards",
    line: "ENH Marketing builds live reporting dashboards and marketing attribution systems for UAE businesses.",
    // Reporting stands things up; attribution joins them back.
    field: "bars",
  },
  {
    no: "08",
    label: "AI Workshops & Training",
    href: "/ai-hub/ai-workshops-and-training",
    line: "ENH Marketing runs practical corporate AI training in Dubai and across the UAE. Each session is built around the team’s actual workflows, tools and responsibilities.",
    // A room, facing the front.
    field: "room",
  },
];
