// ENH — the single source of truth for site structure.
//
// Every page, menu and breadcrumb reads from here. Nothing hardcodes a route.
// Note: this is the IA model. The sitemap.xml route is a separate file
// (src/app/sitemap.ts) and should be generated from this one.
//
// Source: "ENH New sitemap Structure.docx", resolved 2026-08-24.

export type NavNode = {
  label: string;
  href: string;
  /** Points off-site, so it is never a page we build. Renders with
   *  rel="noopener" and target="_blank" once the href is a real URL.
   *  Guard with isPending() first: destinations can still be "#". */
  external?: boolean;
  /** The canonical page lives under a different pillar; this is a second
   *  menu placement of the same URL, not a second page. */
  crossLink?: boolean;
  children?: NavNode[];
};

// Every AI Hub child is now a page on this site; only the hub's own landing
// page is missing, so AI_HUB_HREF is the one placeholder left here. It stays
// IT IS A REAL PAGE NOW, AND IT WAS UNREACHABLE UNTIL IT WAS. This was "#" with
// a TODO asking whether the AI Hub would ever get a landing page of its own. It
// got one, the pillar was built and shipped, and this was never changed, so the
// navigation and the footer went on rendering "AI Hub" as a heading rather than
// a link. Measured on the build before this change: `grep -rl 'href="/ai-hub"'
// dist` returned zero. Not one of 142 pages linked to it. A page nothing links
// to is a page search engines have almost no reason to crawl and no signal to
// rank, which made every other thing done to this page's structured data and
// head tags worth very little.
const AI_HUB_HREF = "/ai-hub";

/* ------------------------------------------------------------------ services */

const services: NavNode = {
  label: "Services",
  href: "/services",
  children: [
    {
      label: "Search Engine Optimisation",
      href: "/seo-company-in-dubai",
      children: [
        { label: "Local SEO Services", href: "/local-seo-services" },
        { label: "Ecommerce SEO", href: "/ecommerce-seo-agency-dubai" },
        { label: "On-Page SEO", href: "/on-page-seo-audit" },
        { label: "SEO Audit", href: "/seo-audit-services-dubai" },
        { label: "SEO Content Creation", href: "/content-creation-in-dubai" },
        { label: "AEO & GEO", href: "/aeo-geo-optimization" },
      ],
    },
    {
      label: "Performance Marketing",
      href: "/performance-marketing-agency-dubai",
      children: [
        { label: "Google Ads", href: "/google-adwords-company-dubai" },
        { label: "Meta Ads", href: "/meta-ads-agency-dubai" },
        { label: "LinkedIn Ads", href: "/linkedin-advertising-dubai" },
        { label: "TikTok Ads", href: "/tiktok-advertising-agency-dubai" },
        { label: "Snapchat Ads", href: "/snapchat-advertising-dubai" },
        { label: "YouTube Ads", href: "/youtube-advertising-agency-dubai" },
      ],
    },
    {
      label: "Social Media Marketing",
      href: "/social-media-agency-in-dubai",
      children: [
        { label: "Social Media Content Creation", href: "/social-media-content-creation-agency" },
        { label: "Influencer Marketing", href: "/influencer-marketing-agency-dubai" },
        { label: "Facebook Marketing", href: "/facebook-marketing-agency-in-dubai" },
        { label: "Instagram Marketing", href: "/instagram-marketing-agency-dubai" },
        // Organic-only pages. Distinct from the paid "X Ads" pages under
        // Performance Marketing, which run the same channels as paid media.
        { label: "LinkedIn Marketing", href: "/linkedin-marketing-agency-dubai" },
        { label: "TikTok Marketing", href: "/tiktok-marketing-agency" },
      ],
    },
    {
      label: "Web Design & Development",
      href: "/web-design-company-dubai",
      children: [
        { label: "Ecommerce Website Development", href: "/ecommerce-web-development-dubai" },
        { label: "Website Maintenance & Support", href: "/web-support-services-dubai" },
        { label: "Web Hosting", href: "/web-hosting-services" },
      ],
    },
    {
      label: "Lead Generation",
      href: "/lead-generation-company-dubai",
      children: [
        { label: "B2B Lead Generation", href: "/b2b-lead-generation-dubai" },
        { label: "Landing Page Development", href: "/landing-page-development-services" },
      ],
    },
    {
      label: "Video Marketing",
      href: "/video-production-services-dubai",
      children: [
        { label: "Corporate Video", href: "/corporate-video-production" },
        { label: "Event Video", href: "/event-video-production" },
        { label: "Explainer Video", href: "/explainer-video-production" },
        { label: "Testimonial Video", href: "/testimonial-video-production" },
        { label: "Interview Video", href: "/interview-video-production" },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- industries */

const industries: NavNode = {
  label: "Industries",
  href: "/industries",
  children: [
    // The page is served at /industries/healthcare, which is the route the
    // team asked for; the label is the nav's own and is left as it was
    // written. Same arrangement as Logistics & Shipping below.
    { label: "Healthcare & Clinics", href: "/healthcare-marketing-agency" },
    // The page is served at /industries/logistics, which is the route the team
    // asked for; the label is the nav's own and is left as it was written.
    { label: "Logistics & Shipping", href: "/logistics-marketing-agency" },
    { label: "Automotive", href: "/automotive-digital-marketing-agency" },
    { label: "Hospitality & Hotels", href: "/hospitality-marketing-agency" },
    { label: "Ecommerce & Retail", href: "/e-commerce-marketing-agency" },
  ],
};

/* -------------------------------------------------------------------- ai hub */

// Almost every node here leaves the site, and AI_HUB_HREF is a placeholder the
// AI Hub property has not been wired to yet. The exceptions are
// "AI & Automation" and "Campaign Intelligence", which are real pages on this
// site and belong to this pillar rather than to Services: they are the AI Hub's
// own subpages, so they are plain internal nodes here and Services does not
// list them at all.
//
// Because this branch owns a built page, `aiHub` has to appear in the root
// lists that buildablePages() and trailFor() walk. It did not before, when
// every node under it was external, and leaving it out would have cost this
// page its breadcrumbs and its BreadcrumbList JSON-LD without any error.
const aiHub: NavNode = {
  label: "AI Hub",
  href: AI_HUB_HREF,
  children: [
    { label: "AI Search Visibility (AEO & GEO)", href: "/ai-search-visibility-dubai" },
    { label: "AI & Automation", href: "/ai-automation-agency-dubai" },
    { label: "AI Creative Production", href: "/ai-creative-production-uae" },
    { label: "Conversational AI", href: "/conversational-ai-services" },
    { label: "Campaign Intelligence", href: "/campaign-intelligence-dubai" },
    { label: "Intelligent Web", href: "/ai-website-development-dubai" },
    { label: "Data & Dashboards", href: "/data-dashboard-services-dubai" },
    { label: "AI Workshops & Training", href: "/ai-training-workshops-dubai" },
  ],
};

/** The eight AI Hub services, in the order the navigation lists them.
 *
 *  EXPORTED SO THE PILLAR PAGE'S STRUCTURED DATA CANNOT DRIFT FROM THE MENU.
 *  /ai-hub emits an ItemList naming all eight, and an answer engine reading it
 *  is being told what this agency sells. If that list were retyped there it
 *  would be one edit away from disagreeing with the navigation, the breadcrumbs
 *  and the eight pages themselves. It is this array or nothing. */
export const aiHubServices: NavNode[] = aiHub.children ?? [];


/* ------------------------------------------------------------------ top-level */

const home: NavNode = { label: "Home", href: "/" };
// Was "/about", which no page ever served, and which the menus of all 49 pages
// presented as a live link. The page that serves it is src/pages/about-us.astro,
// so the node points there — exactly the correction the contact node needed
// below, for the same reason. "/about" itself is caught by a redirect in
// astro.config.mjs, because it is short enough to be typed and sent by hand.
//
// WORTH KNOWING: scripts/check-routes.mjs compares BUILT against the
// filesystem only, so shipping the page and adding it to BUILT without editing
// this line would have PASSED the check and still been broken — isPending()
// would stay true and About would render as inert text in every navbar and as a
// grey span in every footer. Nothing in the repo catches that.
const about: NavNode = { label: "About", href: "/about-us" };
const caseStudies: NavNode = { label: "Case Studies", href: "/case-studies" };
const portfolio: NavNode = { label: "Portfolio", href: "/portfolio" };
const testimonials: NavNode = { label: "Testimonials", href: "/testimonial" };
const insights: NavNode = { label: "Insights", href: "/blog" };
// The route the team asked for, and the one the page is served at. The IA
// document named "/marketing-consultation" while the page was unbuilt, so no
// link ever pointed at it -- `Crosslink` and `routeExists` rendered it as
// plain text and nothing 404'd. The shorter slug is still what a reader types
// after seeing the nav label, so astro.config.mjs redirects it here. Same
// arrangement as the logistics slug.
const consultation: NavNode = {
  label: "Marketing Consultation",
  href: "/marketing-consultations-strategies-dubai",
};
// Was "/contact", which no page ever served: the sitemap named it, every
// menu presented it, and it 404'd from all 38 pages. The page that now serves
// it is src/pages/contact-us.astro, so the node points there.
const contact: NavNode = { label: "Contact Us", href: "/contact-us" };

const legal: NavNode[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
];

/** Named access to any branch. Grouped so `pages.insights` (a route) never
 *  collides with `insights` in content.ts (the blog post list). */
export const pages = {
  home,
  about,
  services,
  industries,
  aiHub,
  caseStudies,
  portfolio,
  testimonials,
  insights,
  consultation,
  contact,
  legal,
} as const;

/* ------------------------------------------------------------------ menus */

/** Header. Ten items, Services and Industries expand. */
export const topNav: NavNode[] = [
  home,
  about,
  services,
  industries,
  aiHub,
  // TEAM DIRECTION, 2026-09-11: below AI Hub and above Case Studies. It was
  // in the footer only, which is where a page nothing links to goes to be
  // uncrawled -- the same failure the AI Hub landing page had.
  consultation,
  caseStudies,
  // TEAM DIRECTION: between Case Studies and Testimonials, and nowhere else.
  // It was in the footer only, which is where a page nothing links to goes to
  // be uncrawled -- the same failure the AI Hub landing page and the
  // consultation page both had before they were promoted here.
  portfolio,
  testimonials,
  insights,
  contact,
];

/** Footer. Flat list of eleven, plus the service and industry columns. */
export const footerNav: NavNode[] = [
  home,
  about,
  services,
  industries,
  aiHub,
  caseStudies,
  portfolio,
  testimonials,
  consultation,
  insights,
  contact,
];

/* ------------------------------------------------------------------ helpers */

/** The internal routes that actually exist under src/app. Every other node in
 *  this file is a page still to be built.
 *
 *  This list is the reason isPending is not just an `href === "#"` check. The
 *  sitemap is the plan for the finished site, so it names all 69 destinations,
 *  and for most of the build only a minority of them resolve. Measured against
 *  the dev server, 52 of the 69 returned 404 while the navbar and footer went
 *  on presenting every one of them as a live link: a visitor clicking About or
 *  Contact from any page landed on an error. Marking the unbuilt ones pending
 *  keeps the menus honest without hiding what the agency offers, and both the
 *  navbar and the footer already know how to render a pending node.
 *
 *  INVARIANT: one entry per page.tsx under src/app. Adding a route here is what
 *  turns its menu entries back into links, so add the path when the page ships.
 *  `npm run check:routes` fails the build if the two ever drift apart. */
const BUILT = new Set([
  "/",
  "/about-us",
  "/contact-us",
  "/lead-generation-company-dubai",
  "/seo-company-in-dubai",
  "/social-media-agency-in-dubai",
  "/video-production-services-dubai",
  "/web-design-company-dubai",
  "/landing-page-development-services",
  "/ai-hub",
  "/ai-hub/film",
  "/ai-hub/hero-robot",
  "/ai-hub/hero-rockets",
  "/ai-automation-agency-dubai",
  "/campaign-intelligence-dubai",
  "/ai-search-visibility-dubai",
  "/data-dashboard-services-dubai",
  "/ai-creative-production-uae",
  "/ai-training-workshops-dubai",
  "/conversational-ai-services",
  "/ai-website-development-dubai",
  "/b2b-lead-generation-dubai",
  "/corporate-video-production",
  "/event-video-production",
  "/explainer-video-production",
  "/interview-video-production",
  "/testimonial-video-production",
  "/performance-marketing-agency-dubai",
  "/google-adwords-company-dubai",
  "/linkedin-advertising-dubai",
  "/meta-ads-agency-dubai",
  "/snapchat-advertising-dubai",
  "/tiktok-advertising-agency-dubai",
  "/youtube-advertising-agency-dubai",
  "/aeo-geo-optimization",
  "/ecommerce-seo-agency-dubai",
  "/local-seo-services",
  "/on-page-seo-audit",
  "/seo-audit-services-dubai",
  "/content-creation-in-dubai",
  "/social-media-content-creation-agency",
  "/facebook-marketing-agency-in-dubai",
  "/influencer-marketing-agency-dubai",
  "/instagram-marketing-agency-dubai",
  "/linkedin-marketing-agency-dubai",
  "/tiktok-marketing-agency",
  "/ecommerce-web-development-dubai",
  "/web-support-services-dubai",
  "/web-hosting-services",
  "/e-commerce-marketing-agency",
  "/hospitality-marketing-agency",
  "/automotive-digital-marketing-agency",
  "/logistics-marketing-agency",
  "/healthcare-marketing-agency",
  "/testimonial",
  "/blog",
  "/case-studies",
  "/portfolio",
  "/marketing-consultations-strategies-dubai",
]);

/** Whether an internal path is served by a page that exists.
 *
 *  The link-rendering counterpart to isPending, for the places that hold a bare
 *  href rather than a NavNode: breadcrumb trails, and the cross-links the
 *  content files write into body copy. Both used to render every href as a
 *  live link regardless, which is how sixteen distinct 404s were still reachable
 *  from page content after the menus were fixed. */
export function routeExists(href: string): boolean {
  return BUILT.has(href);
}

/** No destination yet: either the node has no href at all, or it names a page
 *  that has not been built. Render as a plain link, never with target="_blank".
 *
 *  Off-site nodes are never pending. Their destination lives on another host,
 *  so BUILT has nothing to say about it. */
export function isPending(node: NavNode): boolean {
  // A placeholder destination is pending whether it points off-site or not.
  // This used to return early for external nodes, which meant the one node
  // still sitting on "#" -- AI Hub itself -- rendered in the navbar and the
  // footer of all 38 pages as a live link to nowhere, opening a blank tab. The
  // `external` field's own comment says to guard with isPending() first; that
  // guard could not work while isPending() exempted externals.
  if (node.href === "#") return true;
  if (node.external) return false;
  return !BUILT.has(node.href);
}

/** Routes named in this file that no page satisfies yet. */
export function pendingPages(): string[] {
  return buildablePages().filter((href) => !BUILT.has(href));
}

/** Every internal URL that needs a page built, deduped and depth-first. */
export function buildablePages(): string[] {
  const seen = new Set<string>();
  const walk = (n: NavNode) => {
    if (!n.external && !n.crossLink) seen.add(n.href);
    n.children?.forEach(walk);
  };
  [home, about, services, industries, aiHub, caseStudies, portfolio, testimonials, consultation, insights, contact].forEach(walk);
  legal.forEach(walk);
  return [...seen];
}

/** Walks up from a URL to build a breadcrumb trail. */
export function trailFor(href: string): NavNode[] {
  const trail: NavNode[] = [];
  const walk = (n: NavNode, path: NavNode[]): boolean => {
    const next = [...path, n];
    if (n.href === href && !n.crossLink) {
      trail.push(...next);
      return true;
    }
    return (n.children ?? []).some((c) => walk(c, next));
  };
  [services, industries, aiHub, caseStudies, portfolio, testimonials, consultation, insights, about, contact].some((r) =>
    walk(r, [home]),
  );
  return trail;
}
