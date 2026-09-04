"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type LaneStep = { no: string; title: string; body: string; actor: "ENH" | "You" };

/** Six steps in two lanes: who acts at each one.
 *
 *  WHY LANES. Read the six sentences and the subject changes hands twice: "We
 *  confirm", "We identify", then "shared for approval", then "We generate",
 *  then "Your team checks", then "Final assets are supplied". The client acts
 *  at two points and both are approvals, which is the fact a flat list hides
 *  and the fact a buyer most wants to know: where do I come in? So the steps
 *  are laid across two lanes and the work is seen to cross between them.
 *
 *  THE LANES RUN DOWN, NOT ACROSS. The first build ran them left to right, and
 *  a step in the lower lane then sat below a higher-numbered step in the upper
 *  one, so the numbers no longer ascended in reading order. Running the lanes
 *  down the page gives each step its own row: the order is strictly 01 to 06
 *  top to bottom, and the handover is a jog from one column to the other.
 *
 *  Actors are read from each step's own sentence and cited in the content
 *  file; nothing is inferred from a title. Below the large breakpoint the six
 *  stack in the same order with the actor as a chip. */
export function Swimlanes({ items, lanes = ["ENH", "You"] }: { items: LaneStep[]; lanes?: [string, string] }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const cards = gsap.utils.selector(el)("[data-step]");
      gsap.set(cards, { opacity: 0.55, y: 14 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 72%", end: "bottom 78%", scrub: 0.7 } });
      tl.to(cards, { opacity: 1, y: 0, duration: 0.22, stagger: 0.11, ease: "power2.out" }, 0);
      return () => { tl.scrollTrigger?.kill(); tl.kill(); gsap.set(cards, { clearProps: "all" }); };
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={root}>
      {/* Large screens: two lanes running down, one row per step. */}
      <div className="hidden lg:block">
        {/* The lane headings, over their columns. */}
        <div aria-hidden className="mb-4 grid grid-cols-2 gap-x-16">
          {lanes.map((lane, li) => (
            <span key={lane} className="flex">
              <span className={cn("font-display rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase", li === 1 ? "border-brand/50 text-brand-text" : "border-line text-ash")}>
                {lane}
              </span>
            </span>
          ))}
        </div>
        <ol className="relative grid grid-cols-2 gap-x-16">
          {items.map((s, i) => {
            const you = s.actor === "You";
            const crosses = i > 0 && items[i - 1]?.actor !== s.actor;
            const continues = i > 0 && !crosses;
            return (
              <li
                key={s.no}
                className={cn("relative pt-8", you ? "col-start-2" : "col-start-1")}
              >
                {/* The lane runs in the gaps between cards, never across one:
                    a stub when the work stays in this lane, a rule from the
                    other lane's centre when it changes hands. */}
                {continues && (
                  <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-line" />
                )}
                {crosses && (
                  <span
                    aria-hidden
                    // -50% spans this column, and the 4rem clears the 4rem column gap, so
                    // the rule lands exactly on the other lane's centre line.
                    className={cn("pointer-events-none absolute top-4 h-px bg-brand", you ? "left-[calc(-50%-4rem)] right-1/2" : "left-1/2 right-[calc(-50%-4rem)]")}
                  />
                )}
                {crosses && (
                  <span aria-hidden className="pointer-events-none absolute left-1/2 top-4 h-4 w-px -translate-x-1/2 bg-brand" />
                )}
                {i > 0 && (
                  <span aria-hidden className={cn("absolute left-1/2 top-8 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-ink-2", crosses ? "border-brand" : "border-line")} />
                )}
                <article data-step className={cn("rounded-[1.5rem] border p-6", you ? "border-brand/50 bg-brand/[0.05]" : "border-line bg-ink-3")}>
                  <span className="sr-only">{you ? lanes[1] : lanes[0]}: </span>
                  <p className={cn("font-display text-[clamp(1.6rem,2.4vw,2.1rem)] font-extrabold leading-none tabular-nums", you ? "text-brand-text" : "text-stroke")}>{s.no}</p>
                  <h3 className="font-display mt-4 text-[clamp(1.05rem,1.5vw,1.25rem)] font-extrabold uppercase leading-[1.16] text-snow">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-fog">{s.body}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Small screens: the six in order, each with its actor. */}
      <ol className="space-y-4 lg:hidden">
        {items.map((s) => (
          <li key={s.no} className={cn("rounded-[1.25rem] border p-6", s.actor === "You" ? "border-brand/50 bg-brand/[0.05]" : "border-line bg-ink-3")}>
            <div className="flex items-start justify-between gap-4">
              <p className={cn("font-display text-[2rem] font-extrabold leading-none tabular-nums", s.actor === "You" ? "text-brand-text" : "text-stroke")}>{s.no}</p>
              <span className={cn("font-display shrink-0 rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase", s.actor === "You" ? "border-brand/50 text-brand-text" : "border-line text-ash")}>
                {s.actor === "You" ? lanes[1] : lanes[0]}
              </span>
            </div>
            <h3 className="font-display mt-4 text-lg font-extrabold uppercase leading-[1.14] text-snow">{s.title}</h3>
            <p className="mt-3 leading-relaxed text-fog">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
