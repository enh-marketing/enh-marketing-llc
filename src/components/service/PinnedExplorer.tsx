"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";
import { useEnhanced } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import { AnswerAnatomy } from "@/components/service/AnswerAnatomy";
import { StoreShelf } from "@/components/service/StoreShelf";
import { StoreArchitecture } from "@/components/service/StoreArchitecture";
import { VenueFloor } from "@/components/service/VenueFloor";
import { CampaignBoard } from "@/components/service/CampaignBoard";
import { ProcessTrack } from "@/components/service/ProcessTrack";
import { ProfileAnatomy } from "@/components/service/ProfileAnatomy";
import { PageBuild, type BuildAnchor } from "@/components/service/PageBuild";
import { LeadSystem } from "@/components/service/LeadSystem";
import { AdFormatPreview } from "@/components/service/AdFormatPreview";
import { SetupMap } from "@/components/service/SetupMap";
import { PageSet } from "@/components/service/PageSet";
import { AuditMap } from "@/components/service/AuditMap";
import { SnapSurfaces } from "@/components/service/SnapSurfaces";
import { AdsAccount } from "@/components/service/AdsAccount";
import { CycleTrack } from "@/components/service/CycleTrack";
import { OutputBoard } from "@/components/service/OutputBoard";
import { HandoverMap } from "@/components/service/HandoverMap";
import { CreativeOutputs } from "@/components/service/CreativeOutputs";
import type { ServiceAnchor } from "@/content/services/instagram-marketing";

const EASE = [0.16, 1, 0.3, 1] as const;

export type PinnedItem = {
  /** Stable key; the pin's accessible name comes from `title`. */
  no: string;
  title: string;
  body: string;
  glyph?: GlyphVariant;
  /** Set where the item is an acronym: the panel then prints the short form at
   *  display scale with the expansion beneath it, dimming whatever tail it
   *  shares with the other items. */
  expansion?: string;
  /** A sentence the source singles the item out with, set apart from the body
   *  rather than folded into it. Distinct from `expansion`, which is the
   *  acronym treatment: that one replaces the title with the decoded phrase,
   *  so passing emphasis through it silently loses the item's name. */
  note?: string;
};

/** Which drawing the section uses. Plain data, not a render function: these
 *  sections are Server Components, and a function prop cannot cross into a
 *  Client Component — passing one is a runtime error, not a type error, which
 *  is exactly how it got shipped the first time. */
export type DiagramSpec =
  | { kind: "answer" }
  | { kind: "shelf" }
  | { kind: "storearch" }
  | { kind: "venue" }
  | { kind: "board" }
  | { kind: "track"; axis?: [string, string]; openEnded?: boolean }
  | { kind: "profile"; anchors: ServiceAnchor[] }
  | { kind: "pagebuild"; anchors: BuildAnchor[] }
  | { kind: "leadsystem" }
  | { kind: "adformat" }
  | { kind: "setup" }
  | { kind: "pageset" }
  | { kind: "audit" }
  | { kind: "snap" }
  | { kind: "adsaccount" }
  | { kind: "cycle" }
  | { kind: "outputs" }
  /** The four AI creative outputs, each drawn as the thing it is. */
  | { kind: "creative" }
  /** Seven automation services against the one thing that separates them:
   *  whether the work stops for a person. `loop` is per item, in item order,
   *  and each flag is cited in the content file against the sentence it was
   *  read from. */
  | { kind: "handover"; loop: boolean[] };

/** Renders one pin. The diagram calls this where its own region sits, so pin
 *  placement is markup rather than a set of magic percentages maintained
 *  separately from the drawing they belong to. */
export type PinRenderer = (i: number, className?: string) => ReactNode;

/** A drawing that is also the navigation.
 *
 *  THE IDEA, ONCE. This started on the Instagram page: rather than listing
 *  services beside a picture — which leaves the picture as decoration and the
 *  list as the interface — the pins sit on the drawing's own regions, so
 *  choosing an item and pointing at the thing it changes are the same gesture.
 *  Five sections across the site now want that behaviour, so the behaviour
 *  lives here once and each section supplies only its own drawing.
 *
 *  WHAT IS SHARED AND WHAT IS NOT. Shared: the tab semantics, the pin
 *  placement, the featured panel, the overview strip, the small-screen
 *  fallback. Not shared: the diagram. A generic diagram reused five times would
 *  be exactly the decoration this pattern exists to avoid — each section draws
 *  the thing it is actually about, and the pin coordinates come from its own
 *  content because only that content knows where its regions are.
 *
 *  EVERY BODY STAYS MOUNTED. Rendering only the open panel drops the rest out
 *  of the DOM after hydration — the defect FaqList shipped with, where only the
 *  open answer was ever served. Inactive panels are collapsed and `inert`,
 *  never unmounted, so crawlers and assistive tech always get the whole set.
 *
 *  ACCESSIBILITY. Roving tabindex, arrow keys, Home and End, and every pin
 *  carries its item's title as its accessible name — a numbered dot on a
 *  drawing is meaningless to a screen reader otherwise. Below the large
 *  breakpoint the diagram is dropped entirely and all items render stacked,
 *  because hotspots on a small drawing are not a tap target. */
export function PinnedExplorer({
  id,
  label,
  index,
  title,
  strokeTitle,
  mark,
  markNode,
  aside,
  bodyLabel,
  noteLabel,
  items,
  diagram,
  tone = "ink-2",
  interval = 3000,
  diagramSide = "left",
  children,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  mark?: { variant: "growth" | "network" | "progression" | "contrast" | "ecosystem"; label: string };
  /** A page's own mark, where the shared set has nothing that fits. Takes
   *  precedence over `mark`, exactly as it does on SectionHeader. */
  markNode?: ReactNode;
  aside?: ReactNode;
  /** Labels for the body and note, where the source names them — a table's
   *  column headers, for instance, which would otherwise be lost when the table
   *  becomes a panel. */
  bodyLabel?: string;
  noteLabel?: string;
  items: PinnedItem[];
  /** The section's own drawing, named rather than passed. */
  diagram: DiagramSpec;
  tone?: "ink-2" | "ink-3" | "none";
  /** Milliseconds between automatic advances. Set to 0 to disable. */
  interval?: number;
  /** Which side the drawing sits on. Alternated across pages so two of these
   *  in a row never read as the same section twice. */
  diagramSide?: "left" | "right";
  children?: ReactNode;
}) {
  const enhanced = useEnhanced("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  /** The selector's tab buttons, for roving focus. */
  const pinRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* ---------------------------------------------------------- autoplay ----
   *
   *  The set advances on its own so a reader who never touches it still sees
   *  every item and every region of the drawing. Four things stop it, and all
   *  four matter:
   *
   *  - Choosing an item stops it for good. Once someone has taken control,
   *    yanking the panel out from under them three seconds later is hostile.
   *  - Pointer over the section, or focus inside it, pauses it. Reading and
   *    having the thing you are reading replaced are incompatible.
   *  - `prefers-reduced-motion` disables it outright. Content that changes by
   *    itself is motion, whatever it is made of.
   *  - The explicit control below can pause and resume it. WCAG 2.2.2 requires
   *    a mechanism to pause anything that auto-updates indefinitely, and
   *    hover-to-pause does not cover keyboard or touch.
   *
   *  It also never runs below the large breakpoint, where the diagram is not
   *  rendered and there is nothing to advance. */
  const [taken, setTaken] = useState(false);
  const [held, setHeld] = useState(false);
  const [paused, setPaused] = useState(false);

  const autoplaying = enhanced && !reduced && interval > 0 && !taken && !paused && !held;

  useEffect(() => {
    if (!autoplaying || items.length < 2) return;
    const t = window.setInterval(
      () => setActive((a) => (a + 1) % items.length),
      interval,
    );
    return () => window.clearInterval(t);
  }, [autoplaying, interval, items.length]);

  /** A pin was chosen: hand control over permanently. */
  const choose = (i: number) => {
    setActive(i);
    setTaken(true);
  };

  /** Pointing at a segment previews it without seizing control, so the set
   *  picks up again where the reader left it once they move away. Clicking is
   *  what commits.
   *
   *  Only the selector does this. Hover feedback on something that cannot be
   *  clicked is worse than no feedback at all, which is why the indicators on
   *  the drawing are inert. */
  const preview = (i: number) => {
    if (!taken) setActive(i);
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
    setActive(next);
    pinRefs.current[next]?.focus();
  }

  const diagramFirst = diagramSide === "left";

  const renderDiagram = (pin: PinRenderer) => {
    switch (diagram.kind) {
      case "answer":
        return <AnswerAnatomy active={active} pin={pin} />;
      case "shelf":
        return <StoreShelf count={items.length} active={active} pin={pin} />;
      case "storearch":
        return <StoreArchitecture count={items.length} active={active} pin={pin} />;
      case "venue":
        return <VenueFloor count={items.length} active={active} pin={pin} />;
      case "board":
        return <CampaignBoard active={active} pin={pin} />;
      case "profile":
        return <ProfileAnatomy anchors={diagram.anchors} active={active} pin={pin} />;
      case "pagebuild":
        return <PageBuild anchors={diagram.anchors} active={active} pin={pin} />;
      case "leadsystem":
        return <LeadSystem active={active} pin={pin} count={items.length} />;
      case "adformat":
        return <AdFormatPreview active={active} pin={pin} count={items.length} />;
      case "setup":
        return <SetupMap active={active} pin={pin} count={items.length} />;
      case "pageset":
        return <PageSet active={active} pin={pin} count={items.length} />;
      case "audit":
        return <AuditMap active={active} pin={pin} count={items.length} />;
      case "snap":
        return <SnapSurfaces active={active} pin={pin} count={items.length} />;
      case "adsaccount":
        return <AdsAccount active={active} pin={pin} count={items.length} />;
      case "cycle":
        return <CycleTrack active={active} pin={pin} count={items.length} />;
      case "outputs":
        return <OutputBoard active={active} pin={pin} count={items.length} />;
      case "creative":
        return <CreativeOutputs active={active} pin={pin} count={items.length} />;
      case "handover":
        return (
          <HandoverMap active={active} pin={pin} count={items.length} loop={diagram.loop} />
        );
      case "track":
        return (
          <ProcessTrack
            count={items.length}
            active={active}
            pin={pin}
            axis={diagram.axis}
            openEnded={diagram.openEnded}
          />
        );
    }
  };

  /** Longest run of trailing words every expansion shares. Computed rather than
   *  authored, so the dimming follows the copy if the copy changes. */
  const sharedTail = (() => {
    const words = items.filter((i) => i.expansion).map((i) => i.expansion!.split(" "));
    if (words.length < 2) return 0;
    const min = Math.min(...words.map((w) => w.length));
    let n = 0;
    while (n < min) {
      const w = words[0][words[0].length - 1 - n];
      if (!words.every((ws) => ws[ws.length - 1 - n] === w)) break;
      n += 1;
    }
    return n;
  })();

  return (
    <section
      id={id}
      data-section={label}
      className={cn(
        "relative overflow-x-clip py-14 sm:py-16",
        tone !== "none" && "",
        tone === "ink-2" && "",
        tone === "ink-3" && "",
      )}
    >
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={aside || markNode ? undefined : mark}
          markNode={markNode}
          aside={aside}
          className="mb-12"
        />

        {enhanced ? (
          <>
            {/* THE SELECTOR, and there is now only one.
                The set used to carry two navigations: seven numbered pins on
                the drawing, which were the real tablist, and a labelled rail
                underneath, which was aria-hidden and decorative. So the thing
                that looked like a control had no words on it, the thing with
                the words was hidden from assistive tech, and a reader had to
                guess which of the two to press. A hint reading "select any of
                the seven" was a label papering over that.

                One control instead, above the content where a selector belongs,
                carrying the names rather than numbers. A row of named segments
                is the most universally understood "pick one" there is, and it
                needs no instruction. The pins on the drawing go back to being
                what they always looked like: indicators. */}
            <div
              role="tablist"
              aria-label={`${title} ${strokeTitle}`}
              onKeyDown={onKeyDown}
              onPointerEnter={() => setHeld(true)}
              onPointerLeave={() => setHeld(false)}
              onFocusCapture={() => setHeld(true)}
              onBlurCapture={() => setHeld(false)}
              className="mb-14 grid gap-2.5"
              style={{ gridTemplateColumns: `repeat(${Math.min(items.length, 8)}, minmax(0, 1fr))` }}
            >
              {items.map((item, i) => {
                const on = i === active;
                return (
                  <button
                    key={item.no}
                    ref={(el) => {
                      pinRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${id}-pin-${i}`}
                    aria-selected={on}
                    aria-controls={`${id}-panel-${i}`}
                    tabIndex={on ? 0 : -1}
                    onMouseEnter={() => preview(i)}
                    onClick={() => choose(i)}
                    className={cn(
                      // A resting surface, a full border and a radius, because
                      // the previous treatment was grey text under a hairline
                      // rule, which is what a table's column headings look
                      // like. A thing meant to be pressed has to look like an
                      // object at rest, not only once the pointer finds it.
                      "group relative flex flex-col gap-2 overflow-hidden rounded-lg border px-3.5 py-3 text-left transition-all duration-300",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                      "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                      on
                        ? "border-brand bg-brand/[0.09]"
                        : "border-line bg-ink-3 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-[0_6px_16px_-8px_rgba(0,0,0,0.28)] active:translate-y-0 active:duration-75",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-[0.7rem] font-bold tabular-nums transition-colors duration-300",
                        on ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                      )}
                    >
                      {item.no}
                    </span>
                    <span
                      className={cn(
                        "text-[0.68rem] font-semibold uppercase leading-snug transition-colors duration-300",
                        on ? "text-snow" : "text-fog group-hover:text-snow",
                      )}
                    >
                      {item.title}
                    </span>

                    {/* How long this one has left, run along the bottom edge.
                        Keyed on the active index so it restarts with each
                        advance, and absent rather than frozen once the reader
                        has taken over, since there is nothing left to count. */}
                    {on && autoplaying && (
                      <span
                        key={active}
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand"
                        style={{ animation: `pin-progress ${interval}ms linear forwards` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div
              onPointerEnter={() => setHeld(true)}
              onPointerLeave={() => setHeld(false)}
              onFocusCapture={() => setHeld(true)}
              onBlurCapture={() => setHeld(false)}
              className={cn(
                "grid items-center gap-x-16 gap-y-10",
                diagramFirst
                  ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                  : "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
              )}
            >
              {/* The drawing, with the pins on it.
                  The invitation sits inside this column rather than beside it:
                  the grid has exactly two children and a third would open a
                  second row. */}
              <div className={cn("relative", !diagramFirst && "lg:order-2")}>
                {/* No hint here any more, and no second tablist. The selector
                    above is the control; this is the picture it drives. */}
                <div className="relative">
                {renderDiagram((i, className) => {
                  const item = items[i];
                  if (!item) return null;
                  const on = i === active;
                  // An indicator, and inert. It deliberately does not answer
                  // the pointer either: something that lights up on hover and
                  // then does nothing on click is a worse affordance than
                  // something that never moved. The selector is the control.
                  return (
                    <span
                      key={item.no}
                      aria-hidden
                      className={cn(
                        "z-10 flex h-7 w-7 items-center justify-center rounded-full text-[0.58rem] font-bold tabular-nums transition-all duration-300 motion-reduce:transition-none",
                        // The inactive marks are kept deliberately quiet. A
                        // solid two-pixel chip reads as a row of buttons, and
                        // these cannot be pressed, so only the active one is
                        // drawn as an object: the rest are marks on a drawing.
                        on
                          ? "scale-110 border-2 border-brand bg-brand text-white"
                          : "border border-line bg-void/60 text-ash",
                        className,
                      )}
                    >
                      {item.no}
                    </span>
                  );
                })}
                </div>
              </div>

              {/* The selected item, given the room of one thing. */}
              <div className={cn("relative", !diagramFirst && "lg:order-1")}>
                {items.map((item, i) => {
                  const on = i === active;
                  return (
                    <motion.div
                      key={item.no}
                      id={`${id}-panel-${i}`}
                      role="tabpanel"
                      aria-labelledby={`${id}-pin-${i}`}
                      inert={!on}
                      initial={false}
                      animate={{ opacity: on ? 1 : 0, height: on ? "auto" : 0 }}
                      transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      {item.expansion ? (
                        // An acronym: short form at scale, expansion beneath
                        // with the shared tail dimmed.
                        <div>
                          <p className="font-display text-[clamp(2.6rem,5.5vw,4rem)] font-extrabold uppercase leading-[0.85] text-brand">
                            {item.no}
                          </p>
                          <p className="font-display mt-5 text-[clamp(1.1rem,2.1vw,1.6rem)] font-extrabold uppercase leading-tight">
                            {(() => {
                              const words = item.expansion.split(" ");
                              const split = words.length - sharedTail;
                              return (
                                <>
                                  <span className="text-snow">{words.slice(0, split).join(" ")}</span>{" "}
                                  <span className="text-ash underline decoration-line decoration-dotted decoration-2 underline-offset-[0.3em]">
                                    {words.slice(split).join(" ")}
                                  </span>
                                </>
                              );
                            })()}
                          </p>
                          <p className="mt-6 max-w-xl leading-relaxed text-fog sm:text-lg">
                            {item.body}
                          </p>
                        </div>
                      ) : !item.body ? (
                        // A label with nothing under it: the title is the whole
                        // item, so it takes the panel at display scale rather
                        // than sitting above an empty paragraph.
                        <div>
                          <p className="font-display text-sm font-bold tabular-nums text-brand-text">
                            {item.no}
                          </p>
                          <p className="font-display mt-4 text-[clamp(1.3rem,2.6vw,2.1rem)] font-extrabold uppercase leading-[1.12] text-snow">
                            {item.title}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-start gap-6">
                          {item.glyph && (
                            <span className="mt-1 h-11 w-11 shrink-0 text-brand">
                              <CapabilityGlyph variant={item.glyph} />
                            </span>
                          )}
                          <div>
                            <p className="font-display text-sm font-bold tabular-nums text-brand-text">
                              {item.no}
                            </p>
                            <h3 className="font-display mt-3 text-[clamp(1.3rem,2.5vw,2rem)] font-extrabold uppercase leading-[1.1] text-snow">
                              {item.title}
                            </h3>
                            {bodyLabel && (
                              <p className="mt-6 text-[0.6rem] font-semibold uppercase text-ash">
                                {bodyLabel}
                              </p>
                            )}
                            <p
                              className={cn(
                                "max-w-xl leading-relaxed text-fog sm:text-lg",
                                bodyLabel ? "mt-2.5" : "mt-5",
                              )}
                            >
                              {item.body}
                            </p>
                            {item.note && (
                              <>
                                {noteLabel && (
                                  <p className="mt-6 text-[0.6rem] font-semibold uppercase text-brand-text">
                                    {noteLabel}
                                  </p>
                                )}
                                <p
                                  className={cn(
                                    "max-w-xl leading-relaxed text-snow sm:text-lg",
                                    noteLabel ? "mt-2.5" : "mt-5 border-l-2 border-brand pl-5",
                                  )}
                                >
                                  {item.note}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>


            {/* The required mechanism to stop it. Hover and focus already pause
                the timer, but neither is available to every reader. */}
            {interval > 0 && !reduced && items.length > 1 && (
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => (taken ? (setTaken(false), setPaused(false)) : setPaused((v) => !v))}
                  aria-pressed={!autoplaying}
                  className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-[0.65rem] font-semibold uppercase text-fog transition-colors duration-300 hover:border-brand/50 hover:text-snow"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                      autoplaying ? "bg-brand" : "bg-ash",
                    )}
                  />
                  {autoplaying ? "Pause" : "Play"}
                </button>
              </div>
            )}
          </>
        ) : (
          <ol className="border-t border-line">
            {items.map((item) => (
              <li
                key={item.no}
                className="grid gap-x-6 gap-y-3 border-b border-line py-6 sm:grid-cols-[auto_1fr]"
              >
                <span className="flex items-start gap-4">
                  <span className="font-display pt-0.5 text-sm font-bold tabular-nums text-ash">
                    {item.no}
                  </span>
                  {item.glyph && (
                    <span className="h-7 w-7 shrink-0 text-ash">
                      <CapabilityGlyph variant={item.glyph} />
                    </span>
                  )}
                </span>
                <div>
                  <h3 className="font-display text-base font-extrabold uppercase leading-tight text-snow sm:text-lg">
                    {item.title}
                  </h3>
                  {/* Everything the panel can show has to survive here too.
                      This branch is what the server renders, what a crawler
                      reads and what every reader below the large breakpoint
                      gets, so an expansion or a note that only existed in the
                      panel would simply be missing for most of them. A caller
                      that has already folded the expansion into the title —
                      the acronym page does — must not get it printed twice. */}
                  {item.expansion && !item.title.includes(item.expansion) && (
                    <p className="font-display mt-2 text-sm font-bold uppercase text-ash">
                      {item.expansion}
                    </p>
                  )}
                  {bodyLabel && (
                    <p className="mt-4 text-[0.6rem] font-semibold uppercase text-ash">
                      {bodyLabel}
                    </p>
                  )}
                  <p className={cn("leading-relaxed text-fog", bodyLabel ? "mt-1.5" : "mt-3")}>
                    {item.body}
                  </p>
                  {item.note && (
                    <>
                      {noteLabel && (
                        <p className="mt-4 text-[0.6rem] font-semibold uppercase text-brand-text">
                          {noteLabel}
                        </p>
                      )}
                      <p
                        className={cn(
                          "leading-relaxed text-snow",
                          noteLabel ? "mt-1.5" : "mt-3 border-l-2 border-brand pl-4",
                        )}
                      >
                        {item.note}
                      </p>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}

        {children}
      </Container>
    </section>
  );
}
