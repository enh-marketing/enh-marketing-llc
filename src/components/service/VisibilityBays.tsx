"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import { CapabilityGlyph } from "@/components/service/CapabilityGlyph";
import type { Service } from "@/content/services/ai-search-visibility";

gsap.registerPlugin(ScrollTrigger);

/** The seven services, sorted by the sentence the whole page turns on.
 *
 *  WHAT WENT WRONG FOUR TIMES. Every previous version of this section drew the
 *  system: questions travelling to platforms, platforms hitting gates, gates
 *  reading a page and its markup and its off-site sources. Ten unlabelled grey
 *  rectangles per drawing. The client's verdict was "same random diagram with
 *  no meaning ... even as a dev i couldnt understand and how normal people
 *  can???", and they were right. A picture that has to be taught is not a
 *  picture, and none of those versions ever put the seven service names on
 *  screen at the same time: you had to scroll four thousand pixels to find out
 *  what was being sold.
 *
 *  WHAT THIS DOES INSTEAD. The names are the composition. All seven stand in
 *  one row, in one glance, sorted into three bays captioned with the document's
 *  own three words — "find, understand, and reference", which is
 *  `narrative.questionEmphasis` verbatim and which the reader has already met
 *  twice, in the hero's three stations and in the sentence that defines the
 *  service. Where a name sits IS its answer to the section's question, so the
 *  selector and the drawing are one object. There is no picture pinned beside a
 *  list, so there is no dead column and no list to recognise.
 *
 *  NOTHING IS REORDERED TO MAKE THE SORT WORK. 01 outside, 02 find, 03 to 05
 *  understand, 06 reference, 07 outside. The bays are contiguous in the
 *  client's own numbering, so the numbers still ascend strictly left to right,
 *  which is the one thing this client has raised twice and angrily.
 *
 *  THE GROUPING SHOWS ITS WORKING. Selecting a service prints the clause from
 *  that service's own body that puts it in its bay. The reader is never asked
 *  to trust the arrangement; they are shown the sentence it was read from. That
 *  is also what makes three services in the same bay feel different from each
 *  other, which is the trap a bay-only drawing would have fallen into.
 *
 *  NO FIGURES. An earlier model carried a `boundary` percentage per service.
 *  Percentages are quantities, this page promises "no counts, no scores", and
 *  nobody can see 84 against 75 anyway. Position among named bays is the only
 *  quantification here, and it is categorical. */
export function VisibilityBays({
  items,
  stages,
  readingLabel,
}: {
  items: Service[];
  /** The three bay captions, the document's own words in its own order. */
  stages: [string, string, string];
  /** What the two readings are taken against. */
  readingLabel: string;
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
    const t = window.setInterval(() => setActive((a) => (a + 1) % items.length), 4200);
    return () => window.clearInterval(t);
  }, [rotating, items.length]);

  /* The entrance. The row assembles the way it is read: the tie that holds the
     questions, then the three bay captions, then the names left to right, then
     each name's rule drawing outward. Nothing scales from zero anywhere —
     every reveal is a clip or a shift, because scaleX(0.04) → 1 reads as a
     rendering fault and has been rejected here once already. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      const tie = q("[data-tie]");
      const caps = q("[data-cap]");
      const names = q("[data-name]");
      const rules = q("[data-rule]");
      /* immediateRender: false on every one of these, and it is load-bearing.
         A `from` tween renders its start state the moment it is created, so a
         timeline waiting on a ScrollTrigger that never fires — a deep link
         straight to #services, a restored scroll position, a refresh that
         lands mid-page — leaves the row at scaleX(0) and opacity 0 for good.
         That shipped once: the rule under all seven names measured 0px wide.
         With immediateRender off, a trigger that never fires leaves everything
         in its natural, readable state, which is the same rule this codebase
         already holds for reduced motion. */
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      tl.from(tie, { clipPath: "inset(0 100% 0 0)", duration: 0.7, ease: "expo.out", immediateRender: false }, 0)
        .from(caps, { opacity: 0, y: 10, duration: 0.5, stagger: 0.08, ease: "power2.out", immediateRender: false }, 0.15)
        .from(names, { opacity: 0, y: 12, duration: 0.5, stagger: 0.055, ease: "power2.out", immediateRender: false }, 0.25)
        .from(rules, { scaleX: 0, duration: 0.45, stagger: 0.055, ease: "expo.out", immediateRender: false }, 0.32);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([tie, caps, names, rules], { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length]);

  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
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

  /* Where each bay starts and how wide it is, derived from the data rather
     than authored, so the row follows the content file if the sort ever
     changes. Reading services are not in a bay; they stand outside them. */
  const bays = stages.map((caption) => {
    const idx = items.map((s, i) => (s.stage === caption ? i : -1)).filter((i) => i >= 0);
    return { caption, start: idx[0], span: idx.length };
  });

  const current = items[active];

  return (
    <div ref={root} className="relative">
      {/* ------------------------------------------------------- the row ---
          Desktop only. Below the large breakpoint the same seven transpose
          into a column, because seven names across a phone is four-line wraps
          at 40px a column and nothing is legible. */}
      <div className="hidden lg:block">
        {/* The tie. One labelled convention, in words: everything here is
            measured against the same agreed questions, which is why 01 and 07
            stand at the ends and the three bays sit between them. */}
        <div className="relative mb-3 flex items-center gap-4">
          <span data-tie aria-hidden className="h-px flex-1 origin-left bg-ash/30" />
          <span className="font-display shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ash">
            {readingLabel}
          </span>
          <span data-tie aria-hidden className="h-px flex-1 origin-right bg-ash/30" />
        </div>

        {/* The three bay captions, each spanning exactly its own services. The
            two readings sit under the tie with no caption: they are not a
            fourth thing to do, they are the measurement the other five are
            made inside. */}
        <div
          aria-hidden
          className="grid items-end gap-x-5"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {bays.map((b) => (
            <div
              key={b.caption}
              data-cap
              className="flex flex-col gap-2"
              style={{ gridColumn: `${b.start + 1} / span ${b.span}` }}
            >
              <span
                className={cn(
                  "font-display text-[0.8125rem] font-extrabold uppercase tracking-[0.1em] transition-colors duration-500 motion-reduce:transition-none",
                  current.stage === b.caption ? "text-brand-text" : "text-ash",
                )}
              >
                {b.caption}
              </span>
              <span
                className={cn(
                  // NOT bg-line. On the dark chapter --color-line is #2e2e2e
                  // against #101010, which is 1.4:1 and simply does not appear.
                  // Any line that carries meaning here is inked in ash.
                  "h-px w-full transition-colors duration-500 motion-reduce:transition-none",
                  current.stage === b.caption ? "bg-brand" : "bg-ash/45",
                )}
              />
            </div>
          ))}
        </div>

        {/* The seven. Number over name over a rule, and nothing else: no card,
            no border, no radius, no fill, no glyph. That is what makes seven
            across legible at 1024, and it is the cleanest refusal there is of
            the bento grid this client rejected by name. */}
        <div
          role="tablist"
          aria-label="AI Search Visibility services"
          onKeyDown={onKeyDown}
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocusCapture={() => setHeld(true)}
          onBlurCapture={() => setHeld(false)}
          className="mt-4 grid gap-x-5"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.no}
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
                className="group flex flex-col gap-2.5 pb-3 pt-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span
                  data-name
                  className={cn(
                    "font-display text-[0.7rem] font-bold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                    on ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                  )}
                >
                  {s.no}
                </span>
                <span
                  data-name
                  className={cn(
                    "font-display min-h-[3.25rem] text-[0.8125rem] font-extrabold uppercase leading-[1.25] tracking-[0.01em] transition-colors duration-300 motion-reduce:transition-none xl:text-[0.875rem]",
                    on ? "text-snow" : "text-fog group-hover:text-snow",
                  )}
                >
                  {s.title}
                </span>
                {/* The rule under each name carries the selection. It grows
                    rather than only recolouring, which is this site's vocabulary
                    for an active item. */}
                <span
                  data-rule
                  aria-hidden
                  className={cn(
                    "h-[2px] origin-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                    on ? "w-full bg-brand" : "w-7 bg-ash/55 group-hover:w-14 group-hover:bg-ash",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------ the same, small ---
          One column, still grouped, still in order, still one tablist. */}
      <div
        role="tablist"
        aria-label="AI Search Visibility services"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="lg:hidden"
      >
        {items.map((s, i) => {
          const on = i === active;
          /* A caption at every change of stage, not only at the three bays.
             Emitting bay captions alone put 07 under REFERENCE, because it
             follows 06 and nothing closed the bay: a monitoring service filed
             as an external-references service, which is simply wrong. Reading
             stages get the same label the desktop tie carries, so 01 opens on
             the agreed questions and 07 returns to them, which is the bookend
             the desktop row draws with position. */
          const opens = i === 0 || items[i - 1].stage !== s.stage;
          const caption = s.stage === "reading" ? readingLabel : s.stage;
          return (
            <div key={s.no}>
              {opens && (
                <span
                  aria-hidden
                  className={cn(
                    "font-display mb-2 block border-b pb-1.5 text-[0.75rem] font-extrabold uppercase tracking-[0.1em] transition-colors duration-500 motion-reduce:transition-none",
                    i === 0 ? "mt-0" : "mt-7",
                    current.stage === s.stage
                      ? "border-brand text-brand-text"
                      : "border-ash/35 text-ash",
                  )}
                >
                  {caption}
                </span>
              )}
              <button
                ref={(el) => {
                  if (!enhanced) tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`bay-panel-${i}`}
                tabIndex={on ? 0 : -1}
                onClick={() => choose(i)}
                className="group flex w-full items-baseline gap-3 py-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span
                  className={cn(
                    "font-display w-6 shrink-0 text-[0.7rem] font-bold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                    on ? "text-brand-text" : "text-ash",
                  )}
                >
                  {s.no}
                </span>
                <span
                  className={cn(
                    "font-display text-[0.8125rem] font-bold uppercase leading-snug transition-colors duration-300 motion-reduce:transition-none",
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

      {/* -------------------------------------------------- the panels ------
          Every one stays mounted and in document order; the six that are not
          open are collapsed and inert. Rendering only the open one drops the
          rest out of the DOM after hydration, which is the defect FaqList
          shipped with. */}
      <div className="mt-8 lg:mt-10">
        {items.map((s, i) => {
          const on = i === active;
          return (
            <div
              key={s.no}
              id={`bay-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`bay-tab-${i}`}
              hidden={!on}
              className="grid gap-x-12 gap-y-7 border-t border-ash/25 pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            >
              {/* The left half is the reason this service sits where it sits,
                  in its own words. It is set at display scale because it is the
                  most interesting thing on the panel: the reader is shown the
                  sentence the grouping was read from rather than asked to trust
                  it. The glyph is small, like the glyphs on the page this
                  client approved; it sizes itself h-full w-full, so it gets a
                  box rather than utility classes it would win against. */}
              <div className="flex gap-5">
                <span aria-hidden className="mt-1 hidden h-9 w-9 shrink-0 text-brand sm:block">
                  <CapabilityGlyph variant={s.glyph} />
                </span>
                <p className="font-display text-balance text-[1.375rem] font-extrabold uppercase leading-[1.15] tracking-[0.01em] text-brand-text sm:text-[1.625rem]">
                  &ldquo;{s.evidence}&rdquo;
                </p>
              </div>

              <div>
                <h3 className="font-display mb-3 text-xl font-extrabold uppercase leading-[1.15] text-snow sm:text-2xl">
                  {s.title}
                </h3>
                <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-fog">{s.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* The pause control. Present only while there is something to pause. */}
      {enhanced && !reduced && !taken && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="font-display inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash transition-colors duration-300 hover:border-brand hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none"
          >
            <span
              aria-hidden
              className={cn("h-1.5 w-1.5 rounded-full", paused ? "bg-ash" : "bg-brand")}
            />
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      )}
    </div>
  );
}
