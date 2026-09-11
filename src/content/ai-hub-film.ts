// AI Hub — the film version of the landing page.
//
// An experiment sitting beside src/content/ai-hub.ts, not a replacement. The
// drawn page moves a camera through a scene it renders; this one scrubs a
// generated film. The story is the same and so are the rules: every string is
// quoted, the titles from the AI Hub group in src/lib/sitemap.ts and the bodies
// from each service page's own meta.description, and `npm run check:copy` reads
// this file and the files it quotes as text and fails if they ever differ.
//
// GENERATED, NOT TYPED. This file was written by reading those sources, so the
// strings are exact rather than transcribed. One of them carries a curly
// apostrophe that a retype would have quietly straightened.
//
// All eight categories are here, in the site's own order, because the film runs
// the whole journey rather than the first third of it. Their `at` values are
// spaced so that both of the film's hard cuts land between two of them, with
// nothing on screen; see hub/chapters/Film.tsx.

import type { Beat } from "@/content/ai-hub";

/** The opener, over the mountain, before the first cut. */
export const filmOpener: Beat[] = [
  {
    at: 0.02,
    eyebrow: "AI Hub",
    title: "Explore New Heights",
  },
];

/** The eight categories, one to each stop of the film. */
export const filmCategories: Beat[] = [
  {
    at: 0.13,
    eyebrow: "01",
    title: "AI Search Visibility",
    body: "ENH Marketing helps UAE brands improve how they appear in AI-generated search results.",
    quotes: "ai-search-visibility",
    href: "/ai-search-visibility-dubai",
  },
  {
    at: 0.26,
    eyebrow: "02",
    title: "AI & Automation",
    body: "ENH Marketing builds AI agents, automated workflows and custom tools for UAE businesses. Every project starts with a paid diagnostic that identifies what to automate and what should stay manual.",
    quotes: "ai-automation",
    href: "/ai-automation-agency-dubai",
  },
  {
    at: 0.37,
    eyebrow: "03",
    title: "AI Creative Production",
    body: "ENH Marketing produces AI-generated videos, UGC-style ads, product imagery, and creative variants for UAE brands.",
    quotes: "ai-creative-production",
    href: "/ai-creative-production-uae",
  },
  {
    at: 0.48,
    eyebrow: "04",
    title: "Conversational AI",
    body: "ENH Marketing builds AI chatbots, voice agents and customer service systems for UAE businesses. Every project starts with a paid diagnostic.",
    quotes: "conversational-ai",
    href: "/conversational-ai-services",
  },
  {
    at: 0.61,
    eyebrow: "05",
    title: "Campaign Intelligence",
    body: "ENH Marketing helps UAE businesses plan campaign budgets using historical performance, relevant benchmarks and forecast ranges.",
    quotes: "campaign-intelligence",
    href: "/ai-campaign-intelligence-dubai",
  },
  {
    at: 0.72,
    eyebrow: "06",
    title: "Intelligent Web",
    body: "ENH Marketing designs and develops intelligent websites for UAE businesses that personalise content, display live information and use a clear structure.",
    quotes: "intelligent-web",
    href: "/ai-website-development-dubai",
  },
  {
    at: 0.83,
    eyebrow: "07",
    title: "Data & Dashboards",
    body: "ENH Marketing builds live reporting dashboards and marketing attribution systems for UAE businesses.",
    quotes: "data-and-dashboards",
    href: "/ai-data-dashboard-services-dubai",
  },
  {
    at: 0.94,
    eyebrow: "08",
    title: "AI Workshops & Training",
    body: "ENH Marketing runs practical corporate AI training in Dubai and across the UAE. Each session is built around the team’s actual workflows, tools and responsibilities.",
    quotes: "ai-workshops-and-training",
    href: "/ai-training-workshops-dubai",
  },
];

/** Everything the film shows, in order. */
export const filmBeats: Beat[] = [...filmOpener, ...filmCategories];
