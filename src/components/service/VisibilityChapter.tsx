"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import { CapabilityGlyph } from "@/components/service/CapabilityGlyph";
import { BaselineDrawing } from "@/components/service/visibility/BaselineDrawing";
import { AccessDrawing } from "@/components/service/visibility/AccessDrawing";
import { ContentDrawing } from "@/components/service/visibility/ContentDrawing";
import { EntityDrawing } from "@/components/service/visibility/EntityDrawing";
import { SchemaDrawing } from "@/components/service/visibility/SchemaDrawing";
import { OffsiteDrawing } from "@/components/service/visibility/OffsiteDrawing";
import { MonitorDrawing } from "@/components/service/visibility/MonitorDrawing";
import type { Service } from "@/content/services/ai-search-visibility";

gsap.registerPlugin(ScrollTrigger);

/** One drawing per service, in the content file's order. Each draws its own
 *  service's subject: the test being run, the crawler's approach and the
 *  controls in it, a page that answers, the same details across profiles, the
 *  markup matching what is visible, the sources an answer draws on, and the
 *  searches repeated into a report that separates what it is sure of. A single
 *  drawing that changed state could not do that, which is what the last three
 *  versions of this section tried. */
const DRAWINGS = [
  BaselineDrawing,
  AccessDrawing,
  ContentDrawing,
  EntityDrawing,
  SchemaDrawing,
  OffsiteDrawing,
  MonitorDrawing,
] as const;

/** The AI Hub's flagship chapter: seven services, each taking the screen.
 *
 *  THE SHAPE. The chapter holds the viewport and the reader scrolls through the
 *  seven one after another. Each takes a full screen to itself: its own
 *  drawing, its own clause, its own paragraph. An index down the left carries
 *  all seven names the whole way, so the reader always knows how much of the
 *  offer they have seen and how much is left, and can jump.
 *
 *  WHY IT IS PINNED AND THE EARLIER PINNED VERSION WAS WRONG. Pinning was never
 *  the problem. The problem was that the pinned version showed one abstract
 *  drawing of about ten unlabelled rectangles, restated seven times, and never
 *  put the seven service names on screen together. Here the drawings are seven
 *  different pictures of seven different subjects, and the index is permanent.
 *
 *  IT DEGRADES, IT DOES NOT DEPEND. Below the large breakpoint, and under
 *  prefers-reduced-motion at any width, nothing is pinned and nothing is
 *  hidden: the same seven panels render stacked in document order with their
 *  drawings and their copy, which is also what a crawler and a reader with
 *  JavaScript off receive. The pinning is an enhancement layered on markup that
 *  is already complete.
 *
 *  NOTHING IS REORDERED. 01 outside, 02 find, 03 to 05 understand, 06
 *  reference, 07 outside: contiguous in the client's own numbering, so the
 *  numbers ascend strictly top to bottom. */
export function VisibilityChapter({ items }: { items: Service[] }) {
  const enhanced = useEnhanced("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const pinned = enhanced && !reduced;

  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* Scroll drives the chapter. One screen of travel per service, so each gets
     the same share of the scroll and none of them flicks past. The trigger is
     rebuilt whenever the pinned condition changes, and reverted with it. */
  /* `pinned` is in the dependency list and it is load-bearing. useEnhanced
     reports false on the first paint, by design, so that the server and the
     client agree; on that paint the stacked branch renders and `root` is never
     attached. An effect keyed only on items.length therefore ran once against a
     null ref, returned, and never ran again, which left the chapter mounted and
     inert: it pinned, and nothing ever advanced. */
  useEffect(() => {
    const el = root.current;
    if (!el || !pinned) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(items.length - 1, Math.floor(self.progress * items.length));
          setActive((prev) => (prev === i ? prev : i));
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [items.length, pinned]);

  /** One service. The same markup pinned and unpinned; only its positioning
   *  and whether it is the visible one differ. */
  const panel = (s: Service, i: number) => {
    const Drawing = DRAWINGS[i] ?? DRAWINGS[0];
    const on = i === active;
    return (
      <article
        key={s.no}
        id={`vis-panel-${i}`}
        aria-label={`${s.no}. ${s.title}`}
        data-on={on ? "" : undefined}
        className={cn(
          "group/panel",
          pinned
            ? cn(
                /* The seven travel through the frame rather than dissolving in
                   it: the one behind you has gone up and out, the one ahead is
                   still below, and only the current one sits on the line. A
                   plain crossfade gave no sense of direction, which on a
                   chapter whose whole point is a run through seven things is
                   the one thing the motion has to carry. */
                "absolute inset-0 flex flex-col justify-center",
                "transition-[opacity,transform,filter] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                "motion-reduce:transition-none",
                on
                  ? "translate-y-0 opacity-100 blur-0"
                  : i < active
                    ? "pointer-events-none -translate-y-10 opacity-0 blur-[3px] motion-reduce:blur-none"
                    : "pointer-events-none translate-y-10 opacity-0 blur-[3px] motion-reduce:blur-none",
              )
            : "border-t border-ash/25 pt-10 first:border-t-0 first:pt-0 [&+&]:mt-14",
        )}
      >
        {/* The clause from this service's own body that places it, printed
            rather than asserted. Verified verbatim against the source. */}
        <div
          className={cn(
            "flex gap-4",
            pinned &&
              "translate-y-3 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[on]/panel:translate-y-0 group-data-[on]/panel:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
          )}
          style={pinned ? { transitionDelay: "120ms" } : undefined}
        >
          <span aria-hidden className="mt-0.5 hidden h-8 w-8 shrink-0 text-brand sm:block">
            <CapabilityGlyph variant={s.glyph} />
          </span>
          <p className="font-display text-balance text-[1.125rem] font-extrabold uppercase leading-[1.15] tracking-[0.01em] text-brand-text sm:text-[1.375rem]">
            &ldquo;{s.evidence}&rdquo;
          </p>
        </div>

        {/* The drawings are composed at 900x340. Fitted to a phone's width
            that is a 342px strip whose internal features land at 2 to 3px,
            which is not a small drawing, it is an unreadable one. So below the
            small breakpoint the drawing keeps a legible minimum width and
            scrolls inside its own track instead of being squashed into the
            column. The track bleeds to both screen edges so the cut-off edge is
            visible and it is obvious there is more to see; the labels beneath
            it stay in the text column at full width, because they are the part
            that must never need scrolling to read. */}
        <div
          className={cn(
            "-mx-6 mt-6 overflow-x-auto px-6 [scrollbar-width:thin]",
            "sm:mx-0 sm:overflow-x-visible sm:px-0",
            // The drawing keeps a legible minimum width and scrolls; the labels
            // do not. Sticky at the left of the scrollport, sized to the
            // visible width, they stay put and wrap normally while the picture
            // moves under them. They are the part that must never need
            // scrolling to read.
            "[&_figcaption]:sticky [&_figcaption]:left-0 [&_figcaption]:w-[calc(100vw-3rem)]",
            "sm:[&_figcaption]:static sm:[&_figcaption]:w-auto",
          )}
        >
          <div className="min-w-[560px] sm:min-w-0">
            <Drawing />
          </div>
        </div>

        <div
          className={cn(
            "mt-7 gap-x-12 sm:grid sm:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)]",
            pinned &&
              "translate-y-4 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[on]/panel:translate-y-0 group-data-[on]/panel:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
          )}
          style={pinned ? { transitionDelay: "220ms" } : undefined}
        >
          <h3 className="font-display text-lg font-extrabold uppercase leading-[1.15] text-snow sm:text-xl">
            <span aria-hidden className="mr-2 text-ash">
              {s.no}
            </span>
            {s.title}
          </h3>
          <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-relaxed text-fog sm:mt-0">
            {s.body}
          </p>
        </div>
      </article>
    );
  };

  /* Unpinned: everything stacked in document order, nothing hidden. This is
     also what a crawler, a reader with JavaScript off, and anyone who has asked
     for reduced motion receives. */
  if (!pinned) {
    return <div>{items.map(panel)}</div>;
  }

  return (
    <div ref={root} style={{ height: `${items.length * 90}vh` }}>
      {/* One screen, held. `svh` rather than `vh` so a phone browser's
          retracting toolbar does not crop the last line, and top-0 with the
          padding clearing the fixed masthead. */}
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pb-10 pt-24">
        {/* Nothing here but the drawing and its words. The index that used to
            run down the left is gone: it kept the whole offer on screen, but it
            also put a second thing to read beside the thing being read, and on
            a chapter that is already one subject per screen the reader does not
            need a table of contents to know where they are. The number sits on
            the heading where it belongs. */}
        <div className="relative mx-auto w-full max-w-[62rem] self-stretch">
          {items.map(panel)}
        </div>
      </div>
    </div>
  );
}
