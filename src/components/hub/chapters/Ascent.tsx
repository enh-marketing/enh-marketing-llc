"use client";

import { ParallaxLayers } from "@/components/fx/ParallaxLayers";
import { BACK, FRONT, LAYER_IMG, MID } from "@/components/hub/parallaxAssets";

/** Chapter one: the ascent.
 *
 *  The mountain, held for the length of the chapter while its layers travel at
 *  different rates. It is the only chapter with no drawn scene of its own: the
 *  picture is the picture, and the parallax is the whole move.
 *
 *  IT MUST BE HANDED `t`. An earlier version left ParallaxLayers to scrub
 *  against its own passage past the viewport, on the reasoning that this is the
 *  same page scroll the machine is reading. It is not, inside the machine: the
 *  chapter lives in a sticky stage, so its box reads top 0 and bottom
 *  viewport-height at every scroll position and its trigger never leaves
 *  progress 0. Measured at four points down the track, all three layers held
 *  `transform: none` throughout. The machine already knows how far through the
 *  chapter we are, so it says so.
 *
 *  THE ARTWORK IS STILL A PLACEHOLDER. These are the demo photographs from
 *  @osmosupply/parallax-scrolling, served from 21st.dev's CDN. They are not
 *  ours, they are not on our origin, and they have to be replaced before this
 *  page ships. Their being a mountain is the one thing about them that is
 *  right: the page opens on the name and the name is Explore New Heights. */
export function Ascent({ t }: { t: number }) {
  return (
    <ParallaxLayers
      progress={t}
      className="h-screen w-full"
      stageClassName="bg-[#0b0f14]"
      layers={[
        { y: 22, children: <img src={BACK} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
        { y: 17, children: <img src={MID} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
        { y: 3, children: <img src={FRONT} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
      ]}
    />
  );
}
