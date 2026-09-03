// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
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

  integrations: [react()],

  // AI Automation moved out of Services and into the AI Hub, so its old URL
  // has to keep working: it was already deployed at the address below, and a
  // bare 404 is the worst outcome for anyone holding the link. Astro emits a
  // redirect page for this in a static build.
  redirects: {
    "/services/ai/ai-automation": "/ai-hub/ai-automation",
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

  // Replaces next/font/google. Same two families, same subsets, same weights,
  // and the same two CSS variables the stylesheet and <html> class already
  // use, so nothing downstream has to change.
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
    {
      provider: fontProviders.google(),
      name: "Poppins",
      cssVariable: "--font-poppins",
      subsets: ["latin"],
      weights: [500, 600, 700, 800, 900],
      // next/font requested normal only; Poppins italics would be dead weight.
      styles: ["normal"],
    },
  ],
});
