"use client";

import { ParallaxLayers } from "@/components/fx/ParallaxLayers";
import { categories } from "@/content/ai-hub";

/** A category section, as an empty parallax block.
 *
 *  SCAFFOLDING, ON PURPOSE. Seven of these stand in for categories 02 to 08
 *  until each gets its own design. They carry the section's number and name
 *  and nothing else, so the page can be scrolled end to end and each block can
 *  be pointed at, without any of them pretending to be finished.
 *
 *  THE SAME PARALLAX AS THE OPENER, as asked: the same three layers at the
 *  same four rates, with the category's name where "AI Hub" sits. That means
 *  eight blocks currently share one photograph, which is the right thing for
 *  scaffolding and the wrong thing to ship. Both facts are worth keeping in
 *  view: the placeholder caveats on HubOpener.tsx apply here eight times over,
 *  because the images are hotlinked from 21st.dev's CDN, they are landscape
 *  photography on a site that draws everything else, and repeating one picture
 *  down a page is not art direction.
 *
 *  THE WORDS ARE THE APPROVED ONES. The label is the site's own navigation
 *  label for that page. Nothing else is written, because no document for this
 *  page exists yet. */

/* Osmo's demo assets, on 21st.dev's CDN. Replace before launch. */
const BACK = "https://cdn.21st.dev/assets/mirror/a4/a43f4eae3459c461345ee676f12d6e1ddca65e8a5279a5af00d475b17ff83aea.webp";
const MID = "https://cdn.21st.dev/assets/mirror/50/50ca6a0d36d2780bfcb469d6db7eaec0be7e0d2961ba69a63d2a1473b040338d.webp";
const FRONT = "https://cdn.21st.dev/assets/mirror/e1/e1c8137b5f971c3b3ec1a0f9e79b9c17018767005f844a10082b890472afecfb.webp";

const IMG = "h-full w-full object-cover";

export function CategoryParallax({ index }: { index: number }) {
  const c = categories[index];
  /* The page's own anchor, taken from the route it points at rather than
     written twice: /ai-hub/ai-automation becomes #ai-automation. */
  const id = c.href.split("/").pop();

  return (
    <section id={id} data-section={c.label}>
      <ParallaxLayers
        className="h-[130vh]"
        stageClassName="bg-[#0b0f14]"
        layers={[
          /* Layers below the title are decorative and repeated on every block,
             so only the first block on the page needs them announced. They are
             hidden from assistive technology everywhere. */
          { y: 70, children: <img src={BACK} alt="" aria-hidden loading="lazy" className={IMG} /> },
          { y: 55, children: <img src={MID} alt="" aria-hidden loading="lazy" className={IMG} /> },
          {
            y: 40,
            children: (
              <div className="absolute inset-x-0 top-0 flex h-screen flex-col items-center justify-center px-6 text-center">
                <p className="font-display flex items-center gap-3 text-[0.6875rem] font-extrabold uppercase tracking-[0.2em] text-white/60">
                  <span className="tabular-nums">{c.no}</span>
                  <span aria-hidden className="block h-px w-8 bg-white/30" />
                  AI Hub
                </p>
                <h2 className="font-display mt-4 max-w-[16ch] text-[clamp(2rem,7vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-white">
                  {c.label}
                </h2>
                <a
                  href={c.href}
                  className="group mt-7 inline-flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white"
                >
                  See the service
                  <span
                    aria-hidden
                    className="block h-px w-8 bg-brand transition-all duration-500 group-hover:w-14 motion-reduce:transition-none"
                  />
                </a>
              </div>
            ),
          },
          { y: 10, children: <img src={FRONT} alt="" aria-hidden loading="lazy" className={IMG} /> },
        ]}
      />
    </section>
  );
}
