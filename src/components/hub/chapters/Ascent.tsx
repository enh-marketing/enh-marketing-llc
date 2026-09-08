"use client";

import { ParallaxLayers } from "@/components/fx/ParallaxLayers";
import { BACK, FRONT, LAYER_IMG, MID } from "@/components/hub/parallaxAssets";

/** Chapter one: the ascent.
 *
 *  The mountain, held for the length of the chapter while its layers travel at
 *  different rates. It is the only chapter with no drawn scene of its own: the
 *  picture is the picture, and the parallax is the whole move.
 *
 *  IT IGNORES `t`. ParallaxLayers drives itself from its own ScrollTrigger
 *  against the page, which is already the same scroll the machine is reading,
 *  so feeding it a second copy of the same number would only fight it. The
 *  chapter still fades in and out with the machine like every other one.
 *
 *  THE ARTWORK IS STILL A PLACEHOLDER. These are the demo photographs from
 *  @osmosupply/parallax-scrolling, served from 21st.dev's CDN. They are not
 *  ours, they are not on our origin, and they have to be replaced before this
 *  page ships. Their being a mountain is the one thing about them that is
 *  right: the page opens on the name and the name is Explore New Heights. */
export function Ascent() {
  return (
    <ParallaxLayers
      className="h-screen w-full"
      stageClassName="bg-[#0b0f14]"
      layers={[
        { y: 70, children: <img src={BACK} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
        { y: 55, children: <img src={MID} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
        { y: 10, children: <img src={FRONT} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
      ]}
    />
  );
}
