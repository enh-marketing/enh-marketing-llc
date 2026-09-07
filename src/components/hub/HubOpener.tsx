"use client";

import { ParallaxLayers } from "@/components/fx/ParallaxLayers";

/** The AI Hub page opener.
 *
 *  PLACEHOLDER ARTWORK, AGREED AS SUCH. The three photographs below are the
 *  demo assets shipped with @osmosupply/parallax-scrolling and they are served
 *  from 21st.dev's CDN, not from this project. They are here because the brief
 *  was to use the component as it is for now. Three things have to happen
 *  before this page can ship:
 *
 *    1. The images are hotlinked from a third-party CDN. Nothing guarantees
 *       they stay at those URLs, and they are not ours to serve.
 *    2. They are photographs of a moonlit mountain and a figure on a ridge.
 *       They say nothing about AI marketing services, and this site's language
 *       everywhere else is drawn diagrams rather than stock landscape
 *       photography.
 *    3. They are very dark, so the opener is a dark block at the top of a
 *       light page. That can be deliberate (globals.css has a "dark chapter
 *       inside a light page" pattern) but it should be a decision rather than
 *       a side effect of the placeholder.
 *
 *  THE HEADING IS THE ONE WORD THAT IS APPROVED. "AI Hub" is the site's own
 *  navigation label for this pillar. There is no document for this page yet,
 *  so nothing else is written here: no tagline, no promise, no count of
 *  services. When the document arrives the opener gets its real words.
 *
 *  The layer order and rates are the original's: the furthest layer travels
 *  most and the nearest least, which is what makes the depth read. */

/* Osmo's demo assets, on 21st.dev's CDN. Replace before launch. */
const BACK = "https://cdn.21st.dev/assets/mirror/a4/a43f4eae3459c461345ee676f12d6e1ddca65e8a5279a5af00d475b17ff83aea.webp";
const MID = "https://cdn.21st.dev/assets/mirror/50/50ca6a0d36d2780bfcb469d6db7eaec0be7e0d2961ba69a63d2a1473b040338d.webp";
const FRONT = "https://cdn.21st.dev/assets/mirror/e1/e1c8137b5f971c3b3ec1a0f9e79b9c17018767005f844a10082b890472afecfb.webp";

/* Decorative: the scene carries no information the page states in words, so it
   is hidden from assistive technology rather than given invented alt text. */
const IMG = "h-full w-full object-cover";

export function HubOpener() {
  return (
    <ParallaxLayers
      className="h-[130vh]"
      stageClassName="bg-[#0b0f14]"
      layers={[
        { y: 70, children: <img src={BACK} alt="" aria-hidden loading="eager" className={IMG} /> },
        { y: 55, children: <img src={MID} alt="" aria-hidden loading="eager" className={IMG} /> },
        {
          y: 40,
          className: "flex items-center justify-center",
          children: (
            <h1 className="font-display px-6 text-center text-[clamp(3rem,14vw,11rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] text-white">
              AI Hub
            </h1>
          ),
        },
        { y: 10, children: <img src={FRONT} alt="" aria-hidden loading="eager" className={IMG} /> },
      ]}
    />
  );
}
