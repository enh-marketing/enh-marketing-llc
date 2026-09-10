"use client";

import { useRef } from "react";
import { ParallaxLayers } from "@/components/fx/ParallaxLayers";
import { OpeningLine, OpeningStandfirst } from "@/components/hub/OpeningLine";
import { BACK, FRONT, LAYER_IMG } from "@/components/hub/parallaxAssets";
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
/** How far the opening line lags the page, as the stack's own yPercent. The
 *  page climbs 100 per cent of a viewport across this block and the line slides
 *  45 back down it, so it travels at 0.55 of the scroll. */
const LINE_RATE = 45;

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
          /* THE NEAR GROUND, AND IT IS TAGGED because a second copy of it is
             drawn over the opening line in hub/ForegroundEcho, and that copy
             finds this layer by class in order to measure it. The line itself
             is not in this stack: it has to outlive the block and leave through
             the top of the next section, which nothing inside a stage that
             clips can do. See the note in hub/OpeningLine. */
          /* THE OPENING LINE, UNDER THE FOREGROUND AND OVER THE MOUNTAIN, which
             is where it always belonged and where it could not be until it
             stopped having to outlive this block. It was fixed to the window
             with a second copy of the near ground drawn over it to fake the
             occlusion; there is one copy of the photograph again.

             45 IS THE PARALLAX AND IT IS NOT A NEW NUMBER. A layer is the
             stage's own box, so yPercent 45 slides it down 45 per cent of a
             viewport across the block while the page climbs a whole one: the
             line lags by 55, which is the rate it was already using. What is
             new is that the stack's ScrollTrigger writes it, on the frame it
             writes the mountain, so the two can no longer disagree. */
          { y: LINE_RATE, children: <OpeningLine /> },
          {
            y: 10,
            className: "hub-foreground",
            children: <img src={FRONT} alt="" aria-hidden loading="eager" className={LAYER_IMG} />,
          },
          /* AND THE STANDFIRST OVER THE TOP OF IT, on the same rate so the two
             travel together. The heading wants the man in front of it; a
             paragraph with a shoulder through the middle is just words the
             reader cannot have. */
          { y: LINE_RATE, children: <OpeningStandfirst /> },
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
