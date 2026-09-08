"use client";

import { useRef } from "react";
import { ParallaxLayers } from "@/components/fx/ParallaxLayers";
import { BACK, FRONT, LAYER_IMG, MID } from "@/components/hub/parallaxAssets";
import { WordRevealOnMount } from "@/components/hub/WordReveal";
import { SunBridge } from "@/components/hub/SunBridge";
import { BACK_RATE } from "@/components/hub/sun";
import { ascent } from "@/content/ai-hub";

const opener = ascent[0];

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
          {
            /* THE LINE TRAVELS WITH THE SUN, which is why this is BACK_RATE and
               not the original's 40. At 40 it climbed out of the frame faster
               than the star did and the two arrived at the top separately; on
               the sun's own rate they hold station relative to each other all
               the way up, and the line leaves with the light rather than ahead
               of it. It keeps its place in the stack, so the near ground still
               rises past it: only the rate moved, not the layer. The system
               chapter picks the sentence up on the other side and finishes it
               with AI. */
            y: BACK_RATE,
            /* AND IT STARTS ABOVE CENTRE, which that rate forces. yPercent is
               how far a layer slides down over the pass, so on screen it rises
               by (100 - y): at the sun's 70 the line climbs 30 per cent of a
               viewport where the old 40 climbed 60. Left in the middle it
               arrived at the bottom of the frame, adrift in the black under the
               mountain, while the star was already at the top. Started 12vh
               higher it holds beside the sun the whole way and the two leave
               together, which is the point. */
            children: (
              <div className="flex h-full w-full flex-col items-center justify-center px-6 pb-[12vh] text-center">
                {opener.eyebrow && (
                  <p className="font-grotesk mb-6 text-[0.8rem] font-bold uppercase tracking-[0.34em] text-white/70">
                    {opener.eyebrow}
                  </p>
                )}
                {/* ALL WHITE, NO ACCENT. The rest of the page keeps the site's
                    two-tone heading, but the opener sits on a photograph rather
                    than on black: the red half landed on a lit sky and a snow
                    field and read as a fault rather than as emphasis. White on
                    the picture is the only thing that holds at every point of
                    the parallax, so AccentedTitle is deliberately not used here.

                    It lights word by word on load, the same move the home page
                    makes in sections/Manifesto.tsx. */}
                <h1 className="font-grotesk hub-display max-w-[15ch] font-bold uppercase text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.55)]">
                  <WordRevealOnMount text={opener.title} />
                </h1>
              </div>
            ),
          },
          { y: 10, children: <img src={FRONT} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
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
