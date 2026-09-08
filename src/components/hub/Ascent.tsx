"use client";

import { ParallaxLayers } from "@/components/fx/ParallaxLayers";
import { BACK, FRONT, LAYER_IMG, MID } from "@/components/hub/parallaxAssets";
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
 *  page ships. */
export function Ascent() {
  return (
    <section className="relative" data-section="AI Hub opener">
      <ParallaxLayers
        className="h-screen w-full"
        stageClassName="bg-[#0b0f14]"
        layers={[
          { y: 70, children: <img src={BACK} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
          { y: 55, children: <img src={MID} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
          {
            y: 40,
            children: (
              <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
                {opener.eyebrow && (
                  <p className="font-display mb-5 text-[0.6875rem] font-extrabold uppercase tracking-[0.24em] text-white/70">
                    {opener.eyebrow}
                  </p>
                )}
                <h1 className="max-w-[14ch] text-[2.75rem] font-light leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-[5.5rem]">
                  {opener.title}
                </h1>
              </div>
            ),
          },
          { y: 10, children: <img src={FRONT} alt="" aria-hidden loading="eager" className={LAYER_IMG} /> },
        ]}
      />

      {/* The original's `parallax__fade`: the frame is handed to the black the
          journey opens on, rather than ending on a seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[24vh] bg-gradient-to-b from-transparent to-black"
      />
    </section>
  );
}
