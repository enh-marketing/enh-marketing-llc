"use client";

import { useRef } from "react";
import { ParallaxLayers } from "@/components/fx/ParallaxLayers";
import { BACK, FRONT, LAYER_IMG, MID } from "@/components/hub/parallaxAssets";
import { SunBridge } from "@/components/hub/SunBridge";
import { BACK_RATE } from "@/components/hub/sun";

/** The page opener: the mountain, with the name in the middle of it.
 *
 *  THE FOUR LAYERS AND THEIR RATES ARE THE ORIGINAL'S. 70 and 55 for the two
 *  far images, 40 for the title, 10 for the foreground. The title being a
 *  parallax layer rather than something laid over the top is the whole point of
 *  the effect: it sits between the middle distance and the foreground, travels
 *  at its own rate, and the near ground rises past it. Only the pictures and
 *  the words are ours.
 *
 *  IT IS NOT A CHAPTER OF THE JOURNEY, and it cannot be. The machine holds its
 *  chapters in a sticky stage, and this effect is built on the block travelling
 *  past the viewport: the frame rises a full viewport while the layers slide
 *  down by less, and that difference is what you see. Pinned, the trigger never
 *  moves and the timeline never advances, which is exactly what happened when
 *  it was a chapter, measured as `transform: none` on every layer at every
 *  scroll position. So the mountain is the page's opening block and the journey
 *  begins after it. That also keeps it smooth: GSAP scrubs it on the same
 *  ticker as Lenis, with no React render in the loop.
 *
 *  THE ARTWORK IS STILL A PLACEHOLDER. These are the demo photographs from
 *  @osmosupply/parallax-scrolling, served from 21st.dev's CDN. They are not
 *  ours, they are not on our origin, and they have to be replaced before this
 *  page ships. Whatever replaces them needs a sun in it, near enough to where
 *  this one is that hub/sun.ts stays true, because the page turns on it.
 *
 *  THE SUN IS THE HINGE, AND IT IS THE SECOND LAYER. SunBridge is stacked
 *  immediately above the back layer, at the back layer's own rate, so it holds
 *  the picture's sun exactly and the mountain and the man in front of it cut
 *  into it as it grows. Painted on top instead, it lit the figure through his
 *  own body. It goes out behind them as the frame leaves, and the orbital
 *  chapter brings the same star down from the top of the next scene, so the two
 *  are never on screen together. */
export function Ascent() {
  const frame = useRef<HTMLElement>(null);

  return (
    <section ref={frame} className="relative" data-section="AI Hub opener">
      <ParallaxLayers
        className="h-screen w-full"
        stageClassName="bg-[#0b0f14]"
        layers={[
          { y: BACK_RATE, children: <img src={BACK} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
          // The sun's own light, at the sun's own rate, behind everything the
          // photograph puts in front of it.
          { y: BACK_RATE, children: <SunBridge frame={frame} /> },
          { y: 55, children: <img src={MID} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
          /* THE NEAR GROUND, AND IT IS TAGGED because a second copy of it is
             drawn over the opening line in hub/ForegroundEcho, and that copy
             finds this layer by class in order to measure it. The line itself
             is not in this stack: it has to outlive the block and leave through
             the top of the next section, which nothing inside a stage that
             clips can do. See the note in hub/OpeningLine. */
          {
            y: 10,
            className: "hub-foreground",
            children: <img src={FRONT} alt="" aria-hidden loading="eager" className={LAYER_IMG} />,
          },
        ]}
      />

      {/* The original's `parallax__fade`: the frame is handed to the black the
          journey opens on, rather than ending on a seam.

          SHORTER THAN THE ORIGINAL'S 24vh. That was drawn for a fade into
          nothing, and it put close to a quarter of the opening screen under a
          black wash before the journey had anything in it: the reader crossed a
          long dead band between the man and the first star. The journey now
          draws its sky from its own first pixel, so the fade only has to cover
          the seam where the photograph's ground ends, not manufacture the dark
          on its own. At 10vh the space starts just under the figure. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[10vh] bg-gradient-to-b from-transparent to-black"
      />
    </section>
  );
}
