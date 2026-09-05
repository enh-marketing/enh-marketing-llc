"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectorIcon } from "@/components/service/SectorIcon";

gsap.registerPlugin(ScrollTrigger);

/** Eleven sectors that travel past as you scroll.
 *
 *  FOUR THINGS WERE TRIED HERE FIRST, AND ALL FOUR WERE A DISPLAY OF ELEVEN
 *  NAMES: the house run-on sentence, a ruled index, a manifold gathering them
 *  onto a node, and a plate grid. Changing the arrangement each time never
 *  changed what the section was, which is why none of them read as anything.
 *
 *  So this one is not an arrangement. The sectors are a run that moves: the
 *  page's vertical scroll drives the column horizontally, and eleven sectors
 *  pass the reader rather than sitting in front of them. It is the only
 *  horizontal movement on the page, so the section cannot be confused with any
 *  other, and it turns a list with nothing to rank into something with a
 *  direction.
 *
 *  NOT PINNED. Pinning would take the scroll away for a full viewport to buy a
 *  marginal effect, and this content does not earn that. The track moves across
 *  its own span while the section passes normally, so the page never stops.
 *
 *  IF GSAP NEVER RUNS, or the reader is on a phone, or has asked for no motion,
 *  the track stays a horizontally scrollable row -- overflow is only taken away
 *  inside the branch that owns the scrub -- so every sector is always reachable
 *  by swiping. Nothing is hidden
 *  behind the effect, and every scrubbed property is a transform. */
export function IndustryTrack({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: string[];
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const view = viewport.current;
    const rail = track.current;
    if (!view || !rail) return;
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 1024px)",
      },
      (ctx) => {
      /* The scrub is for pointer-sized screens only. On a phone a horizontal
         track driven by vertical scroll fights the thumb doing the scrolling,
         so small screens keep the swipeable row instead -- same panels, same
         order, a gesture that belongs to the device. */
      if (!ctx.conditions?.motion || !ctx.conditions?.wide) return;

      /* The scrub owns the horizontal position, so the swipe fallback is taken
         away only now -- never in the markup, where it would strand a reader
         whose GSAP never arrived. */
      view.style.overflowX = "hidden";

      const distance = () => Math.max(0, rail.scrollWidth - view.clientWidth);

      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: view,
          start: "top 82%",
          end: "bottom 18%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(rail, { clearProps: "all" });
        view.style.overflowX = "";
      };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />
      </Container>

      {/* The track runs the width of the viewport so the travel has somewhere
          to go, but every panel keeps the page's own left margin at rest. */}
      <div
        ref={viewport}
        className="relative w-full overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul
          ref={track}
          className="flex w-max gap-5 px-[max(1rem,calc((100vw-1320px)/2))]"
        >
          {items.map((name, i) => (
            <li key={name} className="w-[15.5rem] shrink-0 sm:w-[17.5rem]">
              {/* A panel in two zones, not a rule with a label under it. The
                  mark gets a field of its own at the top -- that is the thing a
                  reader scanning a moving track actually catches -- and the
                  name sits in a caption below it. The previous version was a
                  hairline, a numeral, an icon and then four centimetres of
                  nothing above the label. */}
              <article
                tabIndex={0}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-3 outline-none transition-[transform,border-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand/55 hover:shadow-[0_22px_50px_-32px_rgba(0,0,0,0.5)] focus-visible:-translate-y-1.5 focus-visible:border-brand/55"
              >
                {/* The mark, on its own field. */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-line bg-ink-2">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.13] transition-opacity duration-700 group-hover:opacity-[0.22]"
                    style={{
                      backgroundImage:
                        "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <span
                    aria-hidden
                    className="font-display absolute left-4 top-3.5 text-[0.6875rem] font-bold tabular-nums text-brand/45 transition-colors duration-500 group-hover:text-brand"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative text-fog/50 transition-[color,transform] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:text-brand group-focus-visible:text-brand">
                    <SectorIcon i={i} className="h-16 w-16" />
                  </span>
                </div>

                {/* The caption. */}
                <div className="flex flex-1 items-end p-5">
                  <p className="font-display text-[clamp(1.02rem,1.9vw,1.22rem)] font-extrabold uppercase leading-[1.16] text-snow">
                    {name}
                  </p>
                </div>

                {/* A rule that sweeps the foot of the panel on approach. */}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-brand transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
