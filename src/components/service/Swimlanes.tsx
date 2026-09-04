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
      const q = gsap.utils.selector(el);
      const cards = q("[data-step]");
      // The wiring between the steps is the route the work takes, so it is
      // drawn as the reader descends rather than being simply present.
      const links = q("[data-link]");
      const dots = q("[data-node]");
      gsap.set(cards, { opacity: 0.55, y: 14 });
      links.forEach((l) => {
        const cross = (l as HTMLElement).dataset.cross;
        gsap.set(l, cross ? { scaleX: 0, transformOrigin: cross === "left" ? "right center" : "left center" } : { scaleY: 0 });
      });
      gsap.set(dots, { scale: 0.6, opacity: 0.5 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 76%", end: "bottom 72%", scrub: 0.7 } });
      const n = cards.length;
      // A step can own two connectors (the rule across and the stub down), so
      // they are grouped by the step they belong to rather than by position.
      const linksFor = (i: number) => links.filter((l) => (l as HTMLElement).dataset.link === String(i));
      cards.forEach((c, i) => {
        const at = i / n;
        linksFor(i).forEach((l) => {
          const cross = (l as HTMLElement).dataset.cross;
          tl.to(l, cross ? { scaleX: 1, duration: 0.5 / n, ease: "power2.out" } : { scaleY: 1, duration: 0.5 / n, ease: "power2.out" }, at);
        });
        if (dots[i - 1]) tl.to(dots[i - 1], { scale: 1, opacity: 1, duration: 0.3 / n, ease: "back.out(2)" }, at + 0.25 / n);
        tl.to(c, { opacity: 1, y: 0, duration: 0.5 / n, ease: "power2.out" }, at + 0.2 / n);
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([cards, links, dots].flat(), { clearProps: "all" });
      };
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
                className={cn("group relative pt-8", you ? "col-start-2" : "col-start-1")}
              >
                {/* The lane runs in the gaps between cards, never across one:
                    a stub when the work stays in this lane, a rule from the
                    other lane's centre when it changes hands. */}
                {continues && (
                  <span data-link={String(i)} aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-8 w-px origin-top -translate-x-1/2 bg-line transition-colors duration-500 group-hover:bg-ash" />
                )}
                {crosses && (
                  <span
                    aria-hidden
                    // -50% spans this column, and the 4rem clears the 4rem column gap, so
                    // the rule lands exactly on the other lane's centre line.
                    data-link={String(i)}
                    data-cross={you ? "left" : "right"}
                    className={cn("pointer-events-none absolute top-4 h-px bg-brand", you ? "left-[calc(-50%-4rem)] right-1/2" : "left-1/2 right-[calc(-50%-4rem)]")}
                  />
                )}
                {crosses && (
                  <span data-link={String(i)} aria-hidden className="pointer-events-none absolute left-1/2 top-4 h-4 w-px origin-top -translate-x-1/2 bg-brand" />
                )}
                {i > 0 && (
                  <span data-node aria-hidden className={cn("absolute left-1/2 top-8 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-ink-2 transition-colors duration-500", crosses ? "border-brand" : "border-line group-hover:border-ash")} />
                )}
                <article
                  data-step
                  className={cn(
                    "group rounded-[1.5rem] border p-6 transition-colors duration-500 motion-reduce:transition-none",
                    you ? "border-brand/50 bg-brand/[0.05] hover:border-brand" : "border-line bg-ink-3 hover:border-ash/50",
                  )}
                >
                  <span className="sr-only">{you ? lanes[1] : lanes[0]}: </span>
                  <p className={cn("font-display text-[clamp(1.6rem,2.4vw,2.1rem)] font-extrabold leading-none tabular-nums transition-colors duration-500", you ? "text-brand-text" : "text-stroke group-hover:text-brand-text")}>{s.no}</p>
                  <h3 className="font-display mt-4 text-[clamp(1.05rem,1.5vw,1.25rem)] font-extrabold uppercase leading-[1.16] text-snow">{s.title}</h3>
                  <span aria-hidden className="mt-3 block h-px w-8 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none" />
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
          <li key={s.no} className={cn("group rounded-[1.25rem] border p-6 transition-colors duration-500 motion-reduce:transition-none", s.actor === "You" ? "border-brand/50 bg-brand/[0.05] hover:border-brand" : "border-line bg-ink-3 hover:border-ash/50")}>
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
