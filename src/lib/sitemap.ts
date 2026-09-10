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
// `external` so buildablePages() does not start demanding a page for "#", and
// isPending() renders it as a heading rather than as a link.
// TODO(client): confirm whether the AI Hub gets a landing page of its own or
// keeps pointing at a separate property, then replace this.
const AI_HUB_HREF = "#";

/* ------------------------------------------------------------------ services */

const services: NavNode = {
  label: "Services",
  href: "/services",
  children: [
    {
      label: "Search Engine Optimisation",
      href: "/services/seo",
      children: [
        { label: "Local SEO Services", href: "/services/seo/local-seo-services" },
        { label: "Ecommerce SEO", href: "/services/seo/ecommerce-seo" },
        { label: "On-Page SEO", href: "/services/seo/on-page-seo" },
        { label: "SEO Audit", href: "/services/seo/seo-audit" },
        { label: "SEO Content Creation", href: "/services/seo/seo-content-creation" },
        { label: "AEO & GEO", href: "/services/seo/aeo-and-geo" },
      ],
    },
    {
      label: "Performance Marketing",
      href: "/services/performance-marketing",
      children: [
        { label: "Google Ads", href: "/services/performance-marketing/google-ads" },
        { label: "Meta Ads", href: "/services/performance-marketing/meta-ads" },
        { label: "LinkedIn Ads", href: "/services/performance-marketing/linkedin-ads" },
        { label: "TikTok Ads", href: "/services/performance-marketing/tiktok-ads" },
        { label: "Snapchat Ads", href: "/services/performance-marketing/snapchat-ads" },
        { label: "YouTube Ads", href: "/services/performance-marketing/youtube-ads" },
      ],
    },
    {
      label: "Social Media Marketing",
      href: "/services/social-media-marketing",
      children: [
        { label: "Social Media Content Creation", href: "/services/social-media-marketing/content-creation" },
        { label: "Influencer Marketing", href: "/services/social-media-marketing/influencer-marketing" },
        { label: "Facebook Marketing", href: "/services/social-media-marketing/facebook-marketing" },
        { label: "Instagram Marketing", href: "/services/social-media-marketing/instagram-marketing" },
        // Organic-only pages. Distinct from the paid "X Ads" pages under
        // Performance Marketing, which run the same channels as paid media.
        { label: "LinkedIn Marketing", href: "/services/social-media-marketing/linkedin-marketing" },
        { label: "TikTok Marketing", href: "/services/social-media-marketing/tiktok-marketing" },
      ],
    },
    {
      label: "Web Design & Development",
      href: "/services/web-design-development",
      children: [
        { label: "Ecommerce Website Development", href: "/services/web-design-development/ecommerce-website-development" },
        { label: "Website Maintenance & Support", href: "/services/web-design-development/website-maintenance-support" },
        { label: "Web Hosting", href: "/services/web-design-development/web-hosting" },
      ],
    },
    {
      label: "Lead Generation",
      href: "/services/lead-generation",
      children: [
        { label: "B2B Lead Generation", href: "/services/lead-generation/b2b-lead-generation" },
        { label: "Landing Page Development", href: "/services/lead-generation/landing-page-development" },
      ],
    },
    {
      label: "Video Marketing",
      href: "/services/video-marketing",
      children: [
        { label: "Corporate Video", href: "/services/video-marketing/corporate-video" },
        { label: "Event Video", href: "/services/video-marketing/event-video" },
        { label: "Explainer Video", href: "/services/video-marketing/explainer-video" },
        { label: "Testimonial Video", href: "/services/video-marketing/testimonial-video" },
        { label: "Interview Video", href: "/services/video-marketing/interview-video" },
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
    { label: "Healthcare & Clinics", href: "/industries/healthcare" },
    // The page is served at /industries/logistics, which is the route the team
    // asked for; the label is the nav's own and is left as it was written.
    { label: "Logistics & Shipping", href: "/industries/logistics" },
    { label: "Automotive", href: "/industries/automotive" },
    { label: "Hospitality & Hotels", href: "/industries/hospitality-hotels" },
    { label: "Ecommerce & Retail", href: "/industries/ecommerce-retail" },
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
  external: true,
  children: [
    { label: "AI Search Visibility (AEO & GEO)", href: "/ai-hub/ai-search-visibility" },
    { label: "AI & Automation", href: "/ai-hub/ai-automation" },
    { label: "AI Creative Production", href: "/ai-hub/ai-creative-production" },
    { label: "Conversational AI", href: "/ai-hub/conversational-ai" },
    { label: "Campaign Intelligence", href: "/ai-hub/campaign-intelligence" },
    { label: "Intelligent Web", href: "/ai-hub/intelligent-web" },
    { label: "Data & Dashboards", href: "/ai-hub/data-and-dashboards" },
    { label: "AI Workshops & Training", href: "/ai-hub/ai-workshops-and-training" },
  ],
};

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
const testimonials: NavNode = { label: "Testimonials", href: "/testimonials" };
const insights: NavNode = { label: "Insights", href: "/insights" };
const consultation: NavNode = { label: "Marketing Consultation", href: "/marketing-consultation" };
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

/** Header. Nine items, Services and Industries expand. */
export const topNav: NavNode[] = [
  home,
  about,
  services,
  industries,
  aiHub,
  caseStudies,
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
  "/services/lead-generation",
  "/services/seo",
  "/services/social-media-marketing",
  "/services/video-marketing",
  "/services/web-design-development",
  "/services/lead-generation/landing-page-development",
  "/ai-hub/ai-automation",
  "/ai-hub/campaign-intelligence",
  "/ai-hub/ai-search-visibility",
  "/ai-hub/data-and-dashboards",
  "/ai-hub/ai-creative-production",
  "/ai-hub/conversational-ai",
  "/ai-hub/ai-workshops-and-training",
  "/ai-hub/intelligent-web",
  "/services/lead-generation/b2b-lead-generation",
  "/services/video-marketing/corporate-video",
  "/services/video-marketing/event-video",
  "/services/video-marketing/explainer-video",
  "/services/video-marketing/interview-video",
  "/services/video-marketing/testimonial-video",
  "/services/performance-marketing",
  "/services/performance-marketing/google-ads",
  "/services/performance-marketing/linkedin-ads",
  "/services/performance-marketing/meta-ads",
  "/services/performance-marketing/snapchat-ads",
  "/services/performance-marketing/tiktok-ads",
  "/services/performance-marketing/youtube-ads",
  "/services/seo/aeo-and-geo",
  "/services/seo/ecommerce-seo",
  "/services/seo/local-seo-services",
  "/services/seo/on-page-seo",
  "/services/seo/seo-audit",
  "/services/seo/seo-content-creation",
  "/services/social-media-marketing/content-creation",
  "/services/social-media-marketing/facebook-marketing",
  "/services/social-media-marketing/influencer-marketing",
  "/services/social-media-marketing/instagram-marketing",
  "/services/social-media-marketing/linkedin-marketing",
  "/services/social-media-marketing/tiktok-marketing",
  "/services/web-design-development/ecommerce-website-development",
  "/services/web-design-development/website-maintenance-support",
  "/industries/ecommerce-retail",
  "/industries/hospitality-hotels",
  "/industries/automotive",
  "/industries/logistics",
  "/industries/healthcare",
  "/testimonials",
  "/insights",
  "/case-studies",
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
