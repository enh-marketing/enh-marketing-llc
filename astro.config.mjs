// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

/** Migrated from next.config.ts.
 *
 *  `site` replaces Next's `metadataBase`: it is what turns the per-page
 *  `canonical` path into an absolute URL, which is the only thing metadataBase
 *  was doing here.
 *
 *  Turbopack's `root` pin has no equivalent and needs none. Astro resolves its
 *  root from this config file's location, so a stray lockfile in the home
 *  directory cannot confuse it the way it could confuse Turbopack.
 *
 *  `images.remotePatterns` for images.unsplash.com is gone with it. The four
 *  next/image call sites all live inside React components, where astro:assets
 *  cannot reach, so they are plain <img> now. See the note in each. */
export default defineConfig({
  site: "https://enhmedia.com",

  /** THE SITE IS STILL STATIC. `output` is left at its default of 'static',
   *  which prerenders every page unless a page opts out, and exactly one file
   *  opts out: src/pages/api/enquiry.ts. So all fifty-four pages still build to
   *  flat HTML and deploy the way they always did, and the adapter's only job
   *  is to turn that one route into a Vercel function.
   *
   *  WHY THERE HAD TO BE ONE. The forms needed to send mail through an SMTP
   *  app password, verify a reCAPTCHA secret, read the visitor's IP and sign a
   *  Google Sheets webhook. Every one of those is a secret or a server fact,
   *  and a static page has nowhere to put either.
   *
   *  IT ALSO FIXED THE REDIRECTS, FOR FREE. The block below was written when
   *  this was an adapter-less static build, where Astro can only emit a
   *  <meta http-equiv="refresh"> page, which search treats as a soft redirect
   *  that passes less signal than a 301. It says so, and flags the seventy-two
   *  ranking /blog URLs as the reason to fix it at the host.
   *
   *  That is now done and needs nothing at the host. With an adapter present
   *  Astro hands its redirects to the adapter instead of prerendering them, so
   *  `astro build` writes all ten into .vercel/output/config.json as real 301s
   *  -- including the `/blog/[slug]` pattern covering every one of the
   *  seventy-two posts. Verified in the build output: those routes now emit no
   *  HTML file at all, because there is no longer a page to emit.
   *
   *  So do NOT also add these to a vercel.json. Two sources of redirects for
   *  the same URLs is how they start disagreeing. */
  adapter: vercel(),

  integrations: [react()],

  // EVERY URL BELOW 301s IN EXACTLY ONE HOP.
  //
  // The SEO team flattened the whole URL tree on 2026-09-11: every page moved
  // from its section path to the site root, so /services/seo/local-seo-services
  // is now /local-seo-services. The pages did NOT move -- src/lib/sitemap.ts
  // still models the same Services / AI Hub / Industries hierarchy, the menus
  // and breadcrumbs still nest the same way, and no page changed its content,
  // design or parent. Only the public URL is flatter.
  //
  // THE ONE RULE THIS BLOCK EXISTS TO KEEP: no chains. A redirect whose target
  // is itself a redirect source costs a hop, leaks a little equity every time,
  // and is invisible until someone crawls the site. So where a legacy redirect
  // already pointed at a URL that has now moved, it was REPOINTED at the final
  // destination rather than left to fall through the new one. Anything added
  // here later must be checked the same way.
  redirects: {

    /* ---------------------------------------------------------- SERVICES */
    "/services/lead-generation": "/lead-generation-company-dubai",
    "/services/lead-generation/b2b-lead-generation": "/b2b-lead-generation-dubai",
    "/services/lead-generation/landing-page-development": "/landing-page-development-services",
    "/services/performance-marketing": "/performance-marketing-agency-dubai",
    "/services/performance-marketing/google-ads": "/google-adwords-company-dubai",
    "/services/performance-marketing/linkedin-ads": "/linkedin-advertising-dubai",
    "/services/performance-marketing/meta-ads": "/meta-ads-agency-dubai",
    "/services/performance-marketing/snapchat-ads": "/snapchat-advertising-dubai",
    "/services/performance-marketing/tiktok-ads": "/tiktok-advertising-agency-dubai",
    "/services/performance-marketing/youtube-ads": "/youtube-advertising-agency-dubai",
    "/services/seo": "/seo-company-in-dubai",
    "/services/seo/aeo-and-geo": "/aeo-geo-optimization",
    "/services/seo/ecommerce-seo": "/ecommerce-seo-agency-dubai",
    "/services/seo/local-seo-services": "/local-seo-services",
    "/services/seo/on-page-seo": "/on-page-seo-audit",
    "/services/seo/seo-audit": "/seo-audit-services-dubai",
    "/services/seo/seo-content-creation": "/content-creation-in-dubai",
    "/services/social-media-marketing": "/social-media-agency-in-dubai",
    "/services/social-media-marketing/content-creation": "/social-media-content-creation-agency",
    "/services/social-media-marketing/facebook-marketing": "/facebook-marketing-agency-in-dubai",
    "/services/social-media-marketing/influencer-marketing": "/influencer-marketing-agency-dubai",
    "/services/social-media-marketing/instagram-marketing": "/instagram-marketing-agency-dubai",
    "/services/social-media-marketing/linkedin-marketing": "/linkedin-marketing-agency-dubai",
    "/services/social-media-marketing/tiktok-marketing": "/tiktok-marketing-agency",
    "/services/video-marketing": "/video-production-services-dubai",
    "/services/video-marketing/corporate-video": "/corporate-video-production",
    "/services/video-marketing/event-video": "/event-video-production",
    "/services/video-marketing/explainer-video": "/explainer-video-production",
    "/services/video-marketing/interview-video": "/interview-video-production",
    "/services/video-marketing/testimonial-video": "/testimonial-video-production",
    "/services/web-design-development": "/web-design-company-dubai",
    "/services/web-design-development/ecommerce-website-development": "/ecommerce-web-development-dubai",
    "/services/web-design-development/web-hosting": "/web-hosting-services",
    "/services/web-design-development/website-maintenance-support": "/web-support-services-dubai",

    /* ------------------------------------------------------------ AI HUB */
    "/ai-hub/ai-automation": "/ai-automation-agency-dubai",
    "/ai-hub/ai-creative-production": "/ai-creative-production-uae",
    "/ai-hub/ai-search-visibility": "/ai-search-visibility-dubai",
    "/ai-hub/ai-workshops-and-training": "/ai-training-workshops-dubai",
    "/ai-hub/campaign-intelligence": "/ai-campaign-intelligence-dubai",
    "/ai-hub/conversational-ai": "/conversational-ai-services",
    "/ai-hub/data-and-dashboards": "/ai-data-dashboard-services-dubai",
    "/ai-hub/intelligent-web": "/ai-website-development-dubai",

    /* -------------------------------------------------------- INDUSTRIES */
    "/industries/automotive": "/automotive-digital-marketing-agency",
    "/industries/ecommerce-retail": "/e-commerce-marketing-agency",
    "/industries/healthcare": "/healthcare-marketing-agency",
    "/industries/hospitality-hotels": "/hospitality-marketing-agency",
    "/industries/logistics": "/logistics-marketing-agency",

    /* --------------------------------------------------------- TOP LEVEL */
    "/insights": "/blog",
    "/testimonials": "/testimonial",

    // The blog and testimonials pages move BACK to the slugs the live site
    // already ranks on. enhmedia.com serves /blog and /testimonial with a 200
    // today and 404s /insights and /testimonials, so the earlier rename to
    // /insights would have abandoned seventy-three ranking post URLs. The two
    // redirects that used to point the other way (/blog -> /insights and
    // /testimonial -> /testimonials) are deleted, not kept: keeping either
    // alongside its reverse is an infinite loop that takes both URLs down.
    "/insights/[slug]": "/blog/[slug]",

    // Added 2026-09-11, hours after the flattening: the meta sheet spells
    // these two with an "ai-" prefix and the team confirmed it. The
    // /ai-hub/... redirects above were repointed at the prefixed URLs in the
    // same edit, so neither of these is a second hop.
    "/campaign-intelligence-dubai": "/ai-campaign-intelligence-dubai",
    "/data-dashboard-services-dubai": "/ai-data-dashboard-services-dubai",

    /* ------------------------------------------------------ LEGACY, REPOINTED */
    // These predate the flattening. Each one's old target has just moved, so
    // each now names the final URL directly -- see the no-chains rule above.
    "/about": "/about-us",
    "/industries/ecommerce-and-retail": "/e-commerce-marketing-agency",
    "/industries/healthcare-clinics": "/healthcare-marketing-agency",
    "/industries/hospitality-and-hotels": "/hospitality-marketing-agency",
    "/industries/logistics-shipping": "/logistics-marketing-agency",
    "/marketing-consultation": "/marketing-consultations-strategies-dubai",
    "/services/ai/ai-automation": "/ai-automation-agency-dubai",
    "/services/web-design-development/web-hosting-services": "/web-hosting-services",
    "/services/web-design-development/website-maintenance-and-support": "/web-support-services-dubai",

    /* ------------------------------------------- LEGACY enhmedia.com URLS */
    // 104 URLs from the SEO team's redirection sheet, 2026-09-11. These are
    // paths from the OLD enhmedia.com site, so they do nothing until that
    // domain is pointed at this deployment -- they are in place ready for it.
    //
    // FOUR OF THE SHEET'S TARGETS NAMED PAGES THAT DO NOT EXIST, and are
    // repointed at the page each plainly meant. A 301 into a 404 spends the
    // signal and dead-ends the visitor, which is worse than no redirect:
    //   /video-production-company-dubai   -> /video-production-services-dubai  (26)
    //   /best-seo-company-in-dubai        -> /seo-company-in-dubai              (8)
    //   /e-commerce-marketing             -> /e-commerce-marketing-agency       (1)
    //   /digital-marketing-campaign-dubai -> /performance-marketing-agency-dubai (2)
    // The last has no obvious match; campaign work here is Performance
    // Marketing, so that is where it points. Change it if the team disagrees.
    "/services/digital-marketing-dubai/search-engine-marketing": "/google-adwords-company-dubai",
    "/services/graphic-design-dubai/brochure-design-dubai": "/",
    "/services/graphic-design-dubai/corporate-branding-dubai": "/",
    "/digital-marketing/digital-content-strategy": "/content-creation-in-dubai",
    "/search-engine-optimization/search-engine-marketing": "/google-adwords-company-dubai",
    "/services/digital-marketing-dubai/google-advertising-dubai": "/google-adwords-company-dubai",
    "/services/digital-marketing-dubai/inbound-marketing-dubai": "/",
    "/services/digital-marketing-dubai/email-marketing-dubai": "/",
    "/services/web-strategy-dubai": "/web-design-company-dubai",
    "/services/web-strategy-dubai/content-management-system-dubai": "/web-design-company-dubai",
    "/services/web-strategy-dubai/domain-and-hosting": "/web-design-company-dubai",
    "/services/video-production-dubai/corporate-video-presentation": "/video-production-services-dubai",
    "/services/video-production-dubai/info-graphics-design": "/video-production-services-dubai",
    "/services/video-production-dubai/event-videography-dubai": "/video-production-services-dubai",
    "/services/graphic-design-dubai": "/video-production-services-dubai",
    "/services/graphic-design-dubai/corporate-identity-design": "/video-production-services-dubai",
    "/services/photography/food-photography": "/video-production-services-dubai",
    "/services/online-services": "/",
    "/services/digital-films-and-presentations": "/video-production-services-dubai",
    "/services/integrated-marketing": "/seo-company-in-dubai",
    "/services/web-strategy-dubai/content-development": "/content-creation-in-dubai",
    "/web-strategy-development/content-development": "/content-creation-in-dubai",
    "/social-media-marketing/tiktok-and-snapchat-advertising": "/social-media-agency-in-dubai",
    "/social-media-marketing/youtube-marketing": "/social-media-agency-in-dubai",
    "/social-media-marketing/linkedin-marketing": "/social-media-agency-in-dubai",
    "/search-engine-optimization/keyword-research-analysis": "/seo-company-in-dubai",
    "/search-engine-optimization/seo-audit": "/seo-company-in-dubai",
    "/services/best-seo-company-in-dubai": "/seo-company-in-dubai",
    "/digital-marketing/lead-generation": "/b2b-lead-generation-dubai",
    "/digital-marketing/influencer-pr-marketing": "/",
    "/digital-marketing/programmatic-advertising": "/google-adwords-company-dubai",
    "/digital-marketing/digital-campaigns-optimization": "/performance-marketing-agency-dubai",
    "/services/digital-marketing-agency-dubai": "/",
    "/digital-marketing/google-advertising": "/google-adwords-company-dubai",
    "/web-strategy-development/e-commerce-development": "/web-design-company-dubai",
    "/web-strategy-development/domain-web-hosting": "/web-design-company-dubai",
    "/web-strategy-development/content-management-system": "/content-creation-in-dubai",
    "/web-design-and-development-dubai": "/web-design-company-dubai",
    "/services/web-strategy-development": "/web-design-company-dubai",
    "/social-media-marketing": "/social-media-agency-in-dubai",
    "/video-production": "/video-production-services-dubai",
    "/branding-and-identity": "/",
    "/services/b2b-lead-generation": "/b2b-lead-generation-dubai",
    "/services/digital-marketing-agency": "/",
    "/services/search-engine-marketing": "/google-adwords-company-dubai",
    "/services/influencer-pr-marketing": "/",
    "/services/digital-marketing-agency/search-engine-marketing": "/",
    "/services/digital-marketing-agency/digital-campaigns": "/performance-marketing-agency-dubai",
    "/services/digital-marketing-agency/social-media-marketing": "/social-media-agency-in-dubai",
    "/services/digital-marketing-agency/inbound-marketing": "/",
    "/services/digital-marketing-agency/email-marketing": "/",
    "/services/search-engine-optimization": "/seo-company-in-dubai",
    "/web-strategy-development": "/web-design-company-dubai",
    "/digital-marketing": "/",
    "/services/video-production": "/video-production-services-dubai",
    "/video-production/infographics-and-animation": "/video-production-services-dubai",
    "/video-production/corporate-video-production": "/video-production-services-dubai",
    "/video-production/event-videography": "/video-production-services-dubai",
    "/video-production/promos-and-training-videos": "/video-production-services-dubai",
    "/branding-and-identity/marketing-collaterals-and-design": "/",
    "/branding-and-identity/corporate-photography": "/",
    "/search-engine-optimization": "/seo-company-in-dubai",
    "/services/digital-marketing-agency/search-engine-optimization": "/seo-company-in-dubai",
    "/services/branding-and-identity": "/",
    "/services/branding-and-identity/corporate-identity": "/video-production-services-dubai",
    "/services/branding-and-identity/communication-collaterals": "/video-production-services-dubai",
    "/services/photography": "/video-production-services-dubai",
    "/services/photography/commercial-and-industrial-photography": "/video-production-services-dubai",
    "/services/photography/food-event-photography": "/video-production-services-dubai",
    "/services/photography/event-photography": "/video-production-services-dubai",
    "/services/digital-marketing": "/",
    "/web-strategy-development/web-design-and-development": "/web-design-company-dubai",
    "/services/digital-marketing-dubai/social-media-marketing": "/social-media-agency-in-dubai",
    "/services/digital-marketing-dubai": "/",
    "/services/web-strategy-dubai/website-design-and-development": "/web-design-company-dubai",
    "/services/digital-marketing-dubai/search-engine-optimization": "/seo-company-in-dubai",
    "/services/corporate-video-production/infographics": "/video-production-services-dubai",
    "/services/corporate-video-production/brand-corporate-films": "/video-production-services-dubai",
    "/services/corporate-video-production": "/video-production-services-dubai",
    "/services/web-strategy/ecommerce-website-development": "/web-design-company-dubai",
    "/services/web-strategy/domain-hosting": "/web-design-company-dubai",
    "/services/web-strategy/content-development": "/web-design-company-dubai",
    "/services/web-strategy/content-management-system": "/content-creation-in-dubai",
    "/services/web-strategy/web-designing-and-development": "/web-design-company-dubai",
    "/services/web-strategy": "/web-design-company-dubai",
    "/services/digital-marketing-agency/influencer-and-pr": "/",
    "/services/corporate-video-production/event-videography": "/video-production-services-dubai",
    "/services/corporate-video-prod": "/video-production-services-dubai",
    "/portfolios": "/portfolio",
    "/services/video-production-dubai": "/video-production-services-dubai",
    "/services/photography/commercial-industrial-photography": "/video-production-services-dubai",
    "/digital-marketing-services-dubai": "/",
    "/social-media-marketing/facebook-instagram-advertising": "/facebook-marketing-agency-in-dubai",
    "/video-production-company-dubai": "/corporate-video-production",
    "/best-seo-company-in-dubai": "/local-seo-services",
    "/instagram-marketing-agency": "/instagram-marketing-agency-dubai",
    "/e-commerce-marketing-copy": "/e-commerce-marketing-agency",
    "/facebook-marketing-agency": "/facebook-marketing-agency-in-dubai",
    "/healthcare": "/healthcare-marketing-agency",
    "/logistics": "/logistics-marketing-agency",
    "/automotive": "/automotive-digital-marketing-agency",
    "/hospitality": "/hospitality-marketing-agency",
    "/e-commerce-marketing": "/e-commerce-marketing-agency",
  },

  // Tailwind v4 through the Vite plugin rather than PostCSS. The stylesheet
  // itself is untouched: it still starts with @import "tailwindcss" and keeps
  // its @theme block.
  vite: {
    plugins: [tailwindcss()],

    /** THE BUILD GETS ITS OWN DEPENDENCY CACHE, so it cannot pull the rug out
     *  from under a running dev server.
     *
     *  Vite pre-bundles dependencies into `node_modules/.vite`, and `astro
     *  build` and `astro dev` both default to that one directory. So a build
     *  run while the dev server is up rewrites the very files that server's
     *  browser clients are still fetching by hash: the client then loads a dep
     *  whose exports no longer match the module graph the server transformed
     *  against, and every React island on the page dies at hydration with
     *  `TypeError: _jsxDEV is not a function`.
     *
     *  What that looks like is not an error page. The server HTML is complete
     *  and correct, React discards the island, and since <main> is inside the
     *  island and the footer is not, the whole site renders as a bare footer.
     *  It hit every page at once, including ones nobody had touched, which is
     *  the tell that it is the server and not a component. Diagnosed twice
     *  before the cause was found, because "only the footer shows" reads
     *  exactly like a broken new section.
     *
     *  Splitting the two directories means a build is invisible to a running
     *  dev server. Keyed off argv because the commands share this file and
     *  Astro gives the config no other way to tell them apart.
     *
     *  `astro check` NEEDS THE SAME TREATMENT, AND FINDING THAT OUT COST A DEV
     *  SERVER. On 2026-09-11 a plain `npx astro check` alongside a running
     *  server printed "[vite] Re-optimizing dependencies because vite config
     *  has changed" and rewrote `node_modules/.vite` -- and every page on 4321
     *  immediately died at hydration with `TypeError: _jsxDEV is not a
     *  function`, footer-only, exactly the symptom this comment describes for
     *  builds. `astro check` runs its own Vite server to get diagnostics, so it
     *  is a third writer to the one cache; it now gets a directory of its own
     *  and a type check is invisible to a running dev server too. */
    cacheDir: process.argv.includes("build")
      ? "node_modules/.vite-build"
      : process.argv.includes("check")
        ? "node_modules/.vite-check"
        : "node_modules/.vite",

    // WHY THIS LIST EXISTS. Vite pre-bundles dependencies when the dev server
    // starts, from what its scanner can reach. Anything it misses is
    // discovered on the first request that needs it, which triggers a
    // re-optimise and invalidates the module graph already in flight: the
    // in-flight island script answers 504 "Outdated Optimize Dep" and that
    // island never hydrates. The page renders its server HTML and then sits
    // there dead.
    //
    // That is not hypothetical. It hit exactly three pages, and only in dev:
    //   gsap/MotionPathPlugin  ManagedWaypoints    /services/ai/ai-automation
    //   gsap/Draggable         CapabilityCarousel  /services/seo/aeo-and-geo
    //                                              /services/performance-marketing/meta-ads
    // Those are the only two rare GSAP subpath imports in the codebase, and
    // they are behind the only three pages that broke. Turbopack did not
    // pre-bundle this way, so nothing like this existed before the migration.
    //
    // Declaring every bare and subpath package import up front means the
    // optimiser never has to discover one late. Add to this list whenever a
    // new package subpath is imported anywhere under src.
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "motion/react",
        "lenis",
        "gsap",
        "gsap/ScrollTrigger",
        "gsap/MotionPathPlugin",
        "gsap/Draggable",
        "three",
        "three/examples/jsm/environments/RoomEnvironment.js",
        // Lazily imported by hub/SplineScene, so the scanner cannot see it at
        // start-up at all: it is behind a dynamic import inside a Suspense
        // boundary on one route. Discovered late it re-optimises mid-flight and
        // the island hydrates against a second copy of React, which shows as
        // "Invalid hook call ... more than one copy of React in the same app".
        "@splinetool/react-spline",
      ],
    },

    // ONE REACT, WHICH IS NOT THE DEFAULT ONCE A PACKAGE IS PRE-BUNDLED
    // SEPARATELY. npm has these deduped to a single 19.2.4 - checked - but the
    // optimiser can still hand a late-discovered package its own copy, and two
    // Reacts in one tree means every hook in the island throws. Naming them
    // here makes the resolver collapse them whatever order things load in.
    resolve: {
      dedupe: ["react", "react-dom"],
    },
  },

  // Replaces next/font/google. Two families, and only two.
  //
  // POPPINS IS GONE, AND IT WAS NEVER REACHABLE. It was carried as the second
  // name in --font-display, behind Cabinet Grotesk. But <Font> emits a complete
  // stack per variable, generic included, so --font-cabinet already ended in
  // `sans-serif`: expanded, the display stack read
  //   "Cabinet Grotesk", <its Arial fallbacks>, sans-serif, Poppins, ...
  // and a generic family always resolves, so the browser could never get past
  // it to Poppins. Ten font faces and a Google Fonts stylesheet were being
  // shipped on every page for a family that was unreachable by construction.
  // The site is Cabinet Grotesk for display and Inter for body copy.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      subsets: ["latin"],
    },
    {
      // Was a render-blocking <link> to api.fontshare.com in <head>. That is
      // the first font in --font-display, so every heading on the site waited
      // on a third-party stylesheet before it could paint, and a slow response
      // stalls first paint on Safari specifically. Astro 7 ships a fontshare
      // provider, so it is self-hosted from our own origin now, with generated
      // fallback metrics and a preload, and the third-party request is gone.
      provider: fontProviders.fontshare(),
      name: "Cabinet Grotesk",
      cssVariable: "--font-cabinet",
      weights: [500, 700, 800, 900],
      styles: ["normal"],
    },
  ],
});
