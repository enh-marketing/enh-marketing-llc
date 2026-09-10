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

  // AI Automation moved out of Services and into the AI Hub, so its old URL
  // has to keep working: it was already deployed at the address below, and a
  // bare 404 is the worst outcome for anyone holding the link. Astro emits a
  // redirect page for this in a static build.
  redirects: {
    "/services/ai/ai-automation": "/ai-hub/ai-automation",

    // The maintenance page's canonical slug is the one src/lib/sitemap.ts has
    // named since the IA was resolved, and the one the pillar and ecommerce
    // pages link to. The "and" variant reads naturally enough that it gets
    // typed and sent by hand, so it lands rather than 404s.
    "/services/web-design-development/website-maintenance-and-support":
      "/services/web-design-development/website-maintenance-support",

    // The Industries slug for this page is "ecommerce-retail" in
    // src/lib/sitemap.ts, which is where the IA was resolved and what the
    // navbar and footer of every page link to. "ecommerce-and-retail" reads
    // naturally enough that it gets typed and sent by hand, exactly like the
    // maintenance slug above, so it lands rather than 404s.
    "/industries/ecommerce-and-retail": "/industries/ecommerce-retail",

    // Same reason as the industry slug above: "hospitality-hotels" is what
    // src/lib/sitemap.ts resolved and what every menu links to, and the "and"
    // variant gets typed by hand.
    "/industries/hospitality-and-hotels": "/industries/hospitality-hotels",

    // The logistics page is served at "/industries/logistics", which is the
    // route the team asked for. src/lib/sitemap.ts named the menu entry
    // "/industries/logistics-shipping" while the page was unbuilt -- so no
    // link ever pointed at it, `Crosslink` and `routeExists` rendered it as
    // plain text, and nothing 404'd. The nav label is still "Logistics &
    // Shipping", though, which is what a reader types, so the slug it implies
    // lands rather than 404s. Same reasoning as the two slugs above.
    "/industries/logistics-shipping": "/industries/logistics",

    // And the same for Healthcare, for the same reason and by the same route:
    // the page is served at "/industries/healthcare", which is what the team
    // asked for, while src/lib/sitemap.ts named the menu entry
    // "/industries/healthcare-clinics" for as long as the page was unbuilt --
    // so nothing ever linked to it. The nav label is still "Healthcare &
    // Clinics", which is what a reader types, so the slug it implies lands
    // rather than 404s.
    "/industries/healthcare-clinics": "/industries/healthcare",

    // The About page's canonical slug is "/about-us", which is what
    // src/lib/sitemap.ts now names and what the navbar and footer of every page
    // link to. "/about" is what the sitemap said before the page existed, and
    // it is short enough that it gets typed by hand and pasted into decks, so
    // it lands rather than 404s. Same reasoning as the four slugs below.
    "/about": "/about-us",

    // Testimonials is plural in src/lib/sitemap.ts, which is where the IA is
    // resolved and what the navbar and footer of every page link to, so the
    // plural is the canonical URL and the only one with a page behind it. The
    // singular gets typed and sent by hand often enough to be worth catching,
    // for exactly the reason the redirect above exists.
    "/testimonial": "/testimonials",

    // THE BLOG MOVED TO /insights, AND ITS URLS ARE LIVE AND RANKING. All
    // seventy-two posts are served today at enhmedia.com/blog/<slug> and the
    // migrated notes keep those slugs exactly, so one pattern covers every one
    // of them and any post added later. /blog itself goes to the archive.
    //
    // THESE ARE REAL 301s NOW. This used to carry a caveat: with no adapter,
    // Astro could only emit a <meta http-equiv="refresh"> page, which search
    // treats as a soft redirect, and the note said seventy-two ranking URLs
    // deserved better and should be configured at the host by hand.
    //
    // Adding the Vercel adapter settled it. Astro hands its redirects to the
    // adapter rather than prerendering them, so every entry in this block --
    // this pattern included -- is written into .vercel/output/config.json as a
    // 301. Nothing needs adding at the host, and nothing should be: see the
    // note on `adapter` above.
    "/blog": "/insights",
    "/blog/[slug]": "/insights/[slug]",
  },

  // Tailwind v4 through the Vite plugin rather than PostCSS. The stylesheet
  // itself is untouched: it still starts with @import "tailwindcss" and keeps
  // its @theme block.
  vite: {
    plugins: [tailwindcss()],

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
      ],
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
