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
export function VisibilityChapter({
  items,
  readingLabel,
}: {
  items: Service[];
  /** What the two readings are taken against; the caption 01 and 07 share. */
  readingLabel: string;
}) {
  const enhanced = useEnhanced("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const pinned = enhanced && !reduced;

  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
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

  /** Jump to a service by scrolling the chapter to its share of the travel. */
  const goTo = (i: number) => {
    const el = root.current;
    if (!el || !pinned) {
      setActive(i);
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    /* Land in the middle of the service's band rather than on its edge, so a
       jump does not sit on the boundary and immediately read as the next one. */
    window.scrollTo({ top: top + ((i + 0.5) / items.length) * travel, behavior: "smooth" });
  };

  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    goTo(next);
    tabs.current[next]?.focus();
  }

  const index = (
    <div
      role="tablist"
      aria-label="AI Search Visibility services"
      aria-orientation="vertical"
      onKeyDown={onKeyDown}
      className="shrink-0"
    >
      {items.map((s, i) => {
        const on = i === active;
        /* A caption at every change of stage, not only at the three bays. Bay
           captions alone put 07 under REFERENCE, because it follows 06 and
           nothing closed the bay: a monitoring service filed as an
           external-references one. */
        const opens = i === 0 || items[i - 1].stage !== s.stage;
        const caption = s.stage === "reading" ? readingLabel : s.stage;
        return (
          <div key={s.no}>
            {opens && (
              <span
                aria-hidden
                className={cn(
                  // Not border-line: on this dark chapter --color-line is
                  // #2e2e2e against #101010, 1.4:1, and does not appear.
                  "font-display block border-b pb-1.5 text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] transition-colors duration-500 motion-reduce:transition-none",
                  i === 0 ? "mb-0.5 mt-0" : "mb-0.5 mt-5",
                  items[active].stage === s.stage
                    ? "border-brand text-brand-text"
                    : "border-ash/35 text-ash",
                )}
              >
                {caption}
              </span>
            )}
            <button
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`vis-tab-${i}`}
              aria-selected={on}
              aria-controls={`vis-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => goTo(i)}
              className="group relative flex w-full items-baseline gap-3 py-1.5 pl-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-1 left-0 top-1 w-[2px] origin-top transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  on ? "scale-y-100 bg-brand" : "scale-y-0 bg-ash/50 group-hover:scale-y-100",
                )}
              />
              <span
                className={cn(
                  "font-display w-5 shrink-0 text-[0.6875rem] font-bold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                  on ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                )}
              >
                {s.no}
              </span>
              <span
                className={cn(
                  "font-display text-[0.75rem] font-bold uppercase leading-[1.3] transition-colors duration-300 motion-reduce:transition-none",
                  on ? "text-snow" : "text-fog group-hover:text-snow",
                )}
              >
                {s.title}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );

  /** One service. The same markup pinned and unpinned; only its positioning
   *  and whether it is the visible one differ. */
  const panel = (s: Service, i: number) => {
    const Drawing = DRAWINGS[i] ?? DRAWINGS[0];
    const on = i === active;
    return (
      <div
        key={s.no}
        id={`vis-panel-${i}`}
        role={pinned ? "tabpanel" : undefined}
        aria-labelledby={pinned ? `vis-tab-${i}` : undefined}
        aria-hidden={pinned && !on ? true : undefined}
        className={cn(
          pinned
            ? cn(
                "absolute inset-0 flex flex-col justify-center transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                on ? "opacity-100" : "pointer-events-none opacity-0",
              )
            : "border-t border-ash/25 pt-10 first:border-t-0 first:pt-0 [&+&]:mt-14",
        )}
      >
        {/* The clause from this service's own body that places it, printed
            rather than asserted. Verified verbatim against the source. */}
        <div className="flex gap-4">
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

        <div className="mt-7 gap-x-12 sm:grid sm:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)]">
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
      </div>
    );
  };

  /* Unpinned: everything stacked in document order, nothing hidden. This is
     also what a crawler, a reader with JavaScript off, and anyone who has asked
     for reduced motion receives. */
  if (!pinned) {
    return (
      <div>
        <div className="mb-12">{index}</div>
        <div>{items.map(panel)}</div>
      </div>
    );
  }

  return (
    <div ref={root} style={{ height: `${items.length * 90}vh` }}>
      {/* One screen, held. `svh` rather than `vh` so a phone browser's
          retracting toolbar does not crop the last line, and top-0 with the
          padding clearing the fixed masthead. */}
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pb-10 pt-24">
        <div className="flex w-full items-start gap-10 xl:gap-16">
          {/* The index, permanent, so the whole offer stays on screen while any
              one part of it is being read. */}
          <div className="w-[13.5rem] shrink-0 xl:w-[15rem]">
            {index}

            {/* How far through the chapter the reader is. */}
            <div aria-hidden className="mt-7 h-[2px] w-full bg-ash/25">
              <div
                className="h-full origin-left bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `scaleX(${(active + 1) / items.length})` }}
              />
            </div>
          </div>

          <div className="relative min-w-0 flex-1 self-stretch">{items.map(panel)}</div>
        </div>
      </div>
    </div>
  );
}
