"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import type { Output } from "@/content/services/ai-creative-production";

gsap.registerPlugin(ScrollTrigger);

/** What we produce, set as four specimens.
 *
 *  THE MISTAKE EVERY EARLIER VERSION MADE. All of them, from the bento grid to
 *  the dark stage, drew a fake picture of an ad: a mock player, a mock phone, a
 *  mock product shot, mock thumbnails, all built from gradients and rounded
 *  rectangles. That can never look good, because it is pretending to be
 *  something it is not and failing at it. Rearranging the fakes was never going
 *  to fix it.
 *
 *  WHAT THIS DOES INSTEAD. Nothing here pretends to be finished creative. Each
 *  output is shown as what we genuinely have: an artboard at its true aspect
 *  ratio, with crop marks at its corners and its format written on it. An empty
 *  artboard is honest, it is the actual object a production studio works from,
 *  and it is a piece of print craft rather than a bad imitation of a video.
 *
 *  THE DESIGN IS THE TYPOGRAPHY AND THE RHYTHM. The reference is how studios
 *  with no imagery on screen still read as designed: generous space, an offset
 *  column rhythm so nothing sits in a flat row, large editorial names, small
 *  precise labels, and one red mark. Take the pictures away from that kind of
 *  layout and it still stands up. Take the pictures away from a wall of fake
 *  thumbnails and there is nothing left, which is what kept happening here.
 *
 *  Ratios are the honest fact about each output and they are the only thing
 *  that differs between the four plates: 16:9 for the video ad, 9:16 for the
 *  vertical creator ad, 1:1 for product imagery, and for variants a plate that
 *  carries all four ratios at once, because that is what its copy says it is. */

const RATIO: Record<Output["kind"], string> = {
  video: "16 / 9",
  ugc: "9 / 16",
  imagery: "1 / 1",
  variants: "4 / 5",
};
const RATIO_LABEL: Record<Output["kind"], string> = {
  video: "16:9",
  ugc: "9:16",
  imagery: "1:1",
  variants: "16:9 · 9:16 · 1:1 · 4:5",
};

/** The offsets that give the run its rhythm. Nothing sits in a flat row. */
const OFFSET = ["lg:mt-0", "lg:mt-24", "lg:mt-8", "lg:mt-32"];

export function ProduceSpecimens({ items }: { items: Output[] }) {
  const root = useRef<HTMLDivElement>(null);

  /* The specimens rise as they are reached, in reading order. immediateRender
     false so a trigger that never fires leaves everything readable. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 640px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.selector(el)("[data-specimen]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 78%", once: true } });
      tl.from(cards, {
        opacity: 0,
        y: 34,
        duration: 0.75,
        stagger: 0.09,
        ease: "expo.out",
        immediateRender: false,
      });
      /* The columns drift against each other as the section passes. Real
         motion, and none of it pretends to be content: the offsets that give
         the run its rhythm simply widen and close as you scroll. */
      const drift = gsap.to(cards, {
        y: (i: number) => [-26, 22, -14, 30][i % 4],
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        drift.scrollTrigger?.kill();
        drift.kill();
        gsap.set(cards, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={root} className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
      {items.map((it, i) => (
        <article key={it.no} data-specimen className={cn("flex flex-col", OFFSET[i])}>
          {/* The artboard. Empty on purpose, and labelled as what it is. */}
          <Artboard kind={it.kind} />

          <div className="mt-7">
            <span className="font-display block text-[0.6875rem] font-bold tabular-nums text-brand-text">
              {it.no}
            </span>
            <h3 className="font-display mt-2 text-[clamp(1.15rem,1.5vw,1.4rem)] font-extrabold uppercase leading-[1.08] text-snow">
              {it.title}
            </h3>
            <span aria-hidden className="mt-4 block h-px w-10 bg-brand" />
            <p className="mt-5 text-[0.875rem] leading-relaxed text-fog">{it.body}</p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
              {it.labels.map((l) => (
                <span
                  key={l}
                  className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ash"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/** An artboard: crop marks, its format, and nothing pretending to be content.
 *  The variants plate carries three more artboards nested inside it, because
 *  its copy is about one idea becoming several formats. */
function Artboard({ kind }: { kind: Output["kind"] }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: RATIO[kind] }}>
      {/* crop marks, one per corner */}
      {(
        [
          ["left-0 top-0", "left-0 top-0 h-px w-4", "left-0 top-0 h-4 w-px"],
          ["right-0 top-0", "right-0 top-0 h-px w-4", "right-0 top-0 h-4 w-px"],
          ["left-0 bottom-0", "left-0 bottom-0 h-px w-4", "left-0 bottom-0 h-4 w-px"],
          ["right-0 bottom-0", "right-0 bottom-0 h-px w-4", "right-0 bottom-0 h-4 w-px"],
        ] as const
      ).map(([key, h, v]) => (
        <span key={key} aria-hidden>
          <span className={cn("absolute bg-ash/55", h)} />
          <span className={cn("absolute bg-ash/55", v)} />
        </span>
      ))}

      {/* the plate itself */}
      <div className="absolute inset-[10px] border border-line bg-ink-2">
        {kind === "variants" ? (
          /* one idea, several formats: nested plates at the other three ratios */
          <div className="absolute inset-4 flex items-center justify-center gap-2">
            <span className="block h-[46%] w-[30%] border border-brand/60" />
            <span className="block h-[72%] w-[16%] border border-line" />
            <span className="block h-[34%] w-[24%] border border-line" />
          </div>
        ) : null}

        <span className="font-display absolute bottom-2.5 left-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ash">
          {RATIO_LABEL[kind]}
        </span>
      </div>
    </div>
  );
}
