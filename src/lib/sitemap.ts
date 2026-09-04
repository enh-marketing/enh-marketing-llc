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

// AI Hub and every child redirect to a separate ENH property, so none of them
// are pages we build. Destinations are not confirmed yet, so they sit on "#".
// TODO(client): swap in the real URLs, then flip these to absolute links.
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
        { label: "Link Building", href: "/services/seo/link-building" },
        { label: "Keyword Research", href: "/services/seo/keyword-research" },
        { label: "SEO Audit", href: "/services/seo/seo-audit" },
        { label: "SEO Content Creation", href: "/services/seo/seo-content-creation" },
        { label: "Blog Creation", href: "/services/seo/blog-creation" },
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
        { label: "Social Media Management", href: "/services/social-media-marketing/management" },
        { label: "Social Media Campaigns", href: "/services/social-media-marketing/campaigns" },
        { label: "Influencer Marketing", href: "/services/social-media-marketing/influencer-marketing" },
        { label: "Facebook Marketing", href: "/services/social-media-marketing/facebook-marketing" },
        { label: "Instagram Marketing", href: "/services/social-media-marketing/instagram-marketing" },
        // Organic-only pages. Distinct from the paid "X Ads" pages under
        // Performance Marketing, which run the same channels as paid media.
        { label: "LinkedIn Marketing", href: "/services/social-media-marketing/linkedin-marketing" },
        { label: "TikTok Marketing", href: "/services/social-media-marketing/tiktok-marketing" },
        // Same page, second placement. Canonical lives under Performance Marketing.
        { label: "Meta Advertising", href: "/services/performance-marketing/meta-ads", crossLink: true },
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
        { label: "B2C Lead Generation", href: "/services/lead-generation/b2c-lead-generation" },
        { label: "Email Marketing", href: "/services/lead-generation/email-marketing" },
        { label: "WhatsApp Marketing", href: "/services/lead-generation/whatsapp-marketing" },
        { label: "Local Lead Generation / GMB", href: "/services/lead-generation/local-lead-generation-gmb" },
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
        { label: "Animation & Motion Graphics", href: "/services/video-marketing/animation-motion-graphics" },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- industries */

const industries: NavNode = {
  label: "Industries",
  href: "/industries",
  children: [
    { label: "Real Estate & Property", href: "/industries/real-estate-property" },
    { label: "Construction & Contracting", href: "/industries/construction-contracting" },
    { label: "Industrial & Manufacturing", href: "/industries/industrial-manufacturing" },
    { label: "IT & Technology", href: "/industries/it-technology" },
    { label: "Healthcare & Clinics", href: "/industries/healthcare-clinics" },
    { label: "Logistics & Shipping", href: "/industries/logistics-shipping" },
    { label: "Automotive", href: "/industries/automotive" },
    { label: "Hospitality & Hotels", href: "/industries/hospitality-hotels" },
    { label: "Ecommerce & Retail", href: "/industries/ecommerce-retail" },
    { label: "Education & Training", href: "/industries/education-training" },
    { label: "Facilities Management", href: "/industries/facilities-management" },
    { label: "Oil, Gas & Energy", href: "/industries/oil-gas-energy" },
    { label: "Beauty & Wellness", href: "/industries/beauty-wellness" },
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
    { label: "AI Creative Production", href: AI_HUB_HREF, external: true },
    { label: "Campaign Intelligence", href: "/ai-hub/campaign-intelligence" },
    { label: "Intelligent Web", href: AI_HUB_HREF, external: true },
    { label: "Data & Dashboards", href: "/ai-hub/data-and-dashboards" },
    { label: "AI Workshops & Training", href: AI_HUB_HREF, external: true },
  ],
};

/* ------------------------------------------------------------------ top-level */

const home: NavNode = { label: "Home", href: "/" };
const about: NavNode = { label: "About", href: "/about" };
const caseStudies: NavNode = { label: "Case Studies", href: "/case-studies" };
const portfolio: NavNode = { label: "Portfolio", href: "/portfolio" };
const testimonials: NavNode = { label: "Testimonials", href: "/testimonials" };
const insights: NavNode = { label: "Insights", href: "/insights" };
const consultation: NavNode = { label: "Marketing Consultation", href: "/marketing-consultation" };
const contact: NavNode = { label: "Contact Us", href: "/contact" };

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
  "/services/lead-generation",
  "/services/lead-generation/landing-page-development",
  "/ai-hub/ai-automation",
  "/ai-hub/campaign-intelligence",
  "/ai-hub/ai-search-visibility",
  "/ai-hub/data-and-dashboards",
  "/services/lead-generation/b2b-lead-generation",
  "/services/video-marketing/corporate-video",
  "/services/performance-marketing",
  "/services/performance-marketing/linkedin-ads",
  "/services/performance-marketing/meta-ads",
  "/services/performance-marketing/snapchat-ads",
  "/services/performance-marketing/youtube-ads",
  "/services/seo/aeo-and-geo",
  "/services/seo/ecommerce-seo",
  "/services/seo/on-page-seo",
  "/services/seo/seo-audit",
  "/services/social-media-marketing/content-creation",
  "/services/social-media-marketing/influencer-marketing",
  "/services/social-media-marketing/instagram-marketing",
  "/services/social-media-marketing/linkedin-marketing",
  "/services/social-media-marketing/tiktok-marketing",
  "/services/web-design-development/ecommerce-website-development",
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
  if (node.external) return false;
  return node.href === "#" || !BUILT.has(node.href);
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
