"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import { CapabilityGlyph } from "@/components/service/CapabilityGlyph";
import { VisibilityReach } from "@/components/service/VisibilityReach";
import type { Service } from "@/content/services/ai-search-visibility";

gsap.registerPlugin(ScrollTrigger);

/** The seven services as an index and a stage.
 *
 *  THE SHAPE. A narrow index runs down the left with all seven names on it at
 *  once, grouped under the document's own three words. The rest of the width is
 *  one stage: a large drawing, then the clause that places the service, then
 *  its title and its paragraph. Choosing a name changes the stage; the index
 *  never moves, so the whole offer stays readable while any one part of it is
 *  being read.
 *
 *  WHY NOT A ROW ACROSS THE TOP. That was the previous version. Seven columns
 *  across a 1240px measure leaves 160px a name and about 400px for the drawing,
 *  which is what made the section feel thin: the approved page carries 28 to 36
 *  drawn shapes a section, and a 400px panel cannot hold them. Down the side,
 *  the names take a fixed 17rem and the drawing gets the remaining two thirds,
 *  which is roughly three times the room. The index is also the natural reading
 *  order for a list of seven at any width, so the same markup serves the phone
 *  with no second tablist.
 *
 *  NOTHING IS REORDERED. 01 outside, 02 find, 03 to 05 understand, 06
 *  reference, 07 outside. The bays are contiguous in the client's own
 *  numbering, so the numbers ascend strictly top to bottom and no item moves to
 *  make the grouping work. Captions break at every change of stage, so 07
 *  returns to the agreed questions rather than being filed under reference.
 *
 *  THE GROUPING SHOWS ITS WORKING. The stage prints the clause from the
 *  service's own body that puts it in its bay, verified verbatim against the
 *  source. The reader is shown the sentence rather than asked to trust the
 *  arrangement.
 *
 *  ONE TABLIST. An earlier version rendered a desktop row and a phone column,
 *  which put fourteen role="tab" elements in the DOM for seven services and
 *  duplicated every ref. */
export function VisibilityBays({
  items,
  stages,
  readingLabel,
  territories,
}: {
  items: Service[];
  /** The three bay captions, the document's own words in its own order. Read
   *  from the items themselves; kept in the signature so the section fails
   *  loudly if the content file's order and the items ever disagree. */
  stages: [string, string, string];
  /** What the two readings are taken against. */
  readingLabel: string;
  /** The drawing's two sides, the document's own words. */
  territories: [string, string];
}) {
  const enhanced = useEnhanced("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  /* The same four brakes PinnedExplorer runs, for the same reasons: choosing
     stops the rotation for good, pointer or focus inside pauses it, reduced
     motion kills it, and the explicit control covers keyboard and touch, which
     hover does not. WCAG 2.2.2. */
  const [taken, setTaken] = useState(false);
  const [held, setHeld] = useState(false);
  const [paused, setPaused] = useState(false);
  const rotating = enhanced && !reduced && !taken && !paused && !held;

  useEffect(() => {
    if (!rotating || items.length < 2) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % items.length), 4600);
    return () => window.clearInterval(t);
  }, [rotating, items.length]);

  /* The entrance. The index assembles top to bottom, then the stage arrives.
     Nothing scales from zero: every reveal is a clip or a shift, because
     scaleX(0.04) -> 1 reads as a rendering fault and was rejected here once.

     immediateRender: false on every tween, and it is load-bearing. A `from`
     renders its start state the moment it is created, so a timeline waiting on
     a ScrollTrigger that never fires — a deep link straight to #services, a
     restored scroll position, a refresh landing mid-page — leaves its targets
     invisible for good. That shipped once: all seven rules measured 0px wide. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      const caps = q("[data-cap]");
      const rows = q("[data-row]");
      const stage = q("[data-stage]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      tl.from(
        caps,
        { opacity: 0, x: -10, duration: 0.5, stagger: 0.07, ease: "power2.out", immediateRender: false },
        0,
      )
        .from(
          rows,
          { opacity: 0, x: -14, duration: 0.5, stagger: 0.05, ease: "power2.out", immediateRender: false },
          0.08,
        )
        .from(
          stage,
          { opacity: 0, y: 18, duration: 0.7, ease: "expo.out", immediateRender: false },
          0.2,
        );
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([caps, rows, stage], { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length]);

  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    setTaken(true);
    tabs.current[next]?.focus();
  }

  const choose = (i: number) => {
    setActive(i);
    setTaken(true);
  };
  const preview = (i: number) => {
    if (!taken) setActive(i);
  };

  const currentStage = items[active].stage;

  return (
    <div
      ref={root}
      className="relative lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-x-14 xl:gap-x-20"
    >
      {/* --------------------------------------------------------- index ---
          All seven, always. One tablist at every width. */}
      <div
        role="tablist"
        aria-label={`${stages.join(", ")} services`}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onFocusCapture={() => setHeld(true)}
        onBlurCapture={() => setHeld(false)}
        className="lg:sticky lg:top-28 lg:self-start"
      >
        {items.map((s, i) => {
          const on = i === active;
          /* A caption at every change of stage, not only at the three bays.
             Bay captions alone put 07 under REFERENCE, because it follows 06
             and nothing closed the bay: a monitoring service filed as an
             external-references one. Readings carry the same label the two
             ends share, so 01 opens on the agreed questions and 07 returns to
             them. */
          const opens = i === 0 || items[i - 1].stage !== s.stage;
          const caption = s.stage === "reading" ? readingLabel : s.stage;
          return (
            <div key={s.no}>
              {opens && (
                <span
                  data-cap
                  aria-hidden
                  className={cn(
                    // Not border-line: on the dark chapter --color-line is
                    // #2e2e2e against #101010, 1.4:1, and does not appear.
                    "font-display block border-b pb-2 text-[0.75rem] font-extrabold uppercase tracking-[0.12em] transition-colors duration-500 motion-reduce:transition-none",
                    i === 0 ? "mb-1 mt-0" : "mb-1 mt-8",
                    currentStage === s.stage
                      ? "border-brand text-brand-text"
                      : "border-ash/35 text-ash",
                  )}
                >
                  {caption}
                </span>
              )}
              <button
                data-row
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`bay-tab-${i}`}
                aria-selected={on}
                aria-controls={`bay-panel-${i}`}
                tabIndex={on ? 0 : -1}
                onMouseEnter={() => preview(i)}
                onClick={() => choose(i)}
                className="group relative flex w-full items-baseline gap-3.5 py-2.5 pl-3.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {/* The marker: it grows down the edge of the chosen name rather
                    than only recolouring it, which is this site's vocabulary
                    for an active item. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-1.5 left-0 top-1.5 w-[2px] origin-top transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                    on ? "scale-y-100 bg-brand" : "scale-y-0 bg-ash/50 group-hover:scale-y-100",
                  )}
                />
                <span
                  className={cn(
                    "font-display w-6 shrink-0 text-[0.7rem] font-bold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                    on ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                  )}
                >
                  {s.no}
                </span>
                <span
                  className={cn(
                    "font-display text-[0.8125rem] font-bold uppercase leading-[1.3] transition-colors duration-300 motion-reduce:transition-none xl:text-[0.875rem]",
                    on ? "text-snow" : "text-fog group-hover:text-snow",
                  )}
                >
                  {s.title}
                </span>
              </button>
            </div>
          );
        })}

        {/* The pause control, present only while there is something to pause. */}
        {enhanced && !reduced && !taken && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="font-display mt-9 inline-flex items-center gap-2 rounded-full border border-ash/40 px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash transition-colors duration-300 hover:border-brand hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none"
          >
            <span
              aria-hidden
              className={cn("h-1.5 w-1.5 rounded-full", paused ? "bg-ash" : "bg-brand")}
            />
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>

      {/* --------------------------------------------------------- stage ---
          Every panel stays mounted and in document order; the six that are not
          open are hidden, never unmounted. Rendering only the open one drops
          the rest out of the DOM after hydration, which is the defect FaqList
          shipped with, and it would take six of the seven service descriptions
          off the page for a crawler. */}
      <div data-stage className="mt-12 lg:mt-0">
        {items.map((s, i) => {
          const on = i === active;
          return (
            <div
              key={s.no}
              id={`bay-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`bay-tab-${i}`}
              hidden={!on}
            >
              <VisibilityReach reach={s.reach} territories={territories} />

              <div className="mt-9 border-t border-ash/25 pt-8">
                <div className="flex gap-5">
                  <span aria-hidden className="mt-0.5 hidden h-9 w-9 shrink-0 text-brand sm:block">
                    <CapabilityGlyph variant={s.glyph} />
                  </span>
                  {/* The reason this service sits where it sits, in its own
                      words. The evidence, not an assertion. */}
                  <p className="font-display text-balance text-[1.25rem] font-extrabold uppercase leading-[1.15] tracking-[0.01em] text-brand-text sm:text-[1.5rem]">
                    &ldquo;{s.evidence}&rdquo;
                  </p>
                </div>

                <div className="mt-8 gap-x-14 sm:grid sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
                  <h3 className="font-display text-xl font-extrabold uppercase leading-[1.15] text-snow sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-[0.9375rem] leading-relaxed text-fog sm:mt-0">
                    {s.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
