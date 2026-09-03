"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type TrackStage = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** Who the stage's own sentence makes the actor. Omit where every stage has
   *  the same subject; the pill is then not drawn. */
  actor?: "ENH" | "You";
};

/** Six stages as a pinned horizontal journey that crosses a launch line.
 *
 *  WHY THIS SHAPE. The stages were a four-up grid, then a brand band, then a
 *  full-width card: three stacked blocks that gave a sequence no direction. A
 *  process is travelled, so the section now holds while the track moves
 *  sideways and every stage gets a full stage of its own instead of a quarter
 *  of a grid row.
 *
 *  WHAT THE CONTENT ADDS TO THE MECHANIC. A flat run of six equal cards would
 *  just be the channel rail from the Performance Marketing page again. This
 *  journey has a threshold in it. Four stages happen before anything is
 *  switched on; the fifth is the switching on ("introduced in stages where
 *  necessary. Your team reviews the output before the process is fully
 *  activated"); the sixth has no end at all ("After launch, we monitor the
 *  automation and make agreed adjustments as the process or connected systems
 *  change"). So the fifth card is the only one carrying brand, the progress
 *  rail beneath has a marked point where the automation goes live, and the
 *  track runs off into dashes past the last card rather than stopping.
 *
 *  IMPLEMENTATION FOLLOWS ChannelScroller, the one pinned horizontal run
 *  already proven in this codebase, and keeps its hard-won details on purpose:
 *  the pin is gated to widths with room and to readers who want motion; the
 *  native scroller only gives up its own overflow once the pin is really
 *  installed; travel is measured from the last card so it lands centred rather
 *  than from a guessed width; and the per-frame focus pass writes straight to
 *  style, because gsap's "scale" quickSetter silently no-ops without a primed
 *  transform cache.
 *
 *  THE FALLBACK IS THE FEATURE. Below lg, and for anyone on reduced motion,
 *  nothing pins: the track stays a native scroll-snap rail, which is the better
 *  interaction on a touch screen anyway. Nothing is hidden in either mode, so
 *  if the pin never installs the section is still a readable set of six cards. */
export function LaunchTrack({
  items,
  launchAt,
  beforeLabel = "Before launch",
  afterLabel = "After launch",
  liveLabel = "Goes live",
  softLaunch = false,
}: {
  items: TrackStage[];
  /** Zero-based index of the stage that puts the automation live. */
  launchAt: number;
  beforeLabel?: string;
  afterLabel?: string;
  liveLabel?: string;
  /** Keep the launch card's tint, number and label in brand but set its title
   *  in the text colour like the other cards. For pages where a fully red card
   *  reads as an alarm rather than a threshold. */
  softLaunch?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { pinned: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (!ctx.conditions?.pinned) return;
        const el = root.current;
        const rail = track.current;
        if (!el || !rail) return;

        // Only stop being a native scroller once the pin is really installed.
        rail.style.overflow = "visible";

        // Travel far enough that the last stage lands centred, then release.
        // Measured from the card itself so it holds at any width.
        const distance = () => {
          const cards = rail.querySelectorAll<HTMLElement>(":scope > [data-stage]");
          const last = cards[cards.length - 1];
          if (!last) return 0;
          return Math.max(0, last.offsetLeft + last.offsetWidth / 2 - el.clientWidth / 2);
        };

        const cards = gsap.utils.toArray<HTMLElement>(":scope > [data-stage]", rail);

        // Depth of field: whichever stage is nearest the middle is fully lit,
        // the rest recede. Direct style writes, six a frame, which is cheap.
        const focus = () => {
          const mid = window.innerWidth / 2;
          for (const card of cards) {
            const r = card.getBoundingClientRect();
            const offset = Math.abs(r.left + r.width / 2 - mid) / mid;
            const t = gsap.utils.clamp(0, 1, offset);
            card.style.transform = `scale(${gsap.utils.interpolate(1, 0.94, t).toFixed(4)})`;
            card.style.opacity = gsap.utils.interpolate(1, 0.46, t).toFixed(3);
          }
        };

        const tween = gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            pin: true,
            scrub: 0.8,
            start: "center center",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onRefresh: focus,
            onUpdate: (self) => {
              focus();
              if (progress.current) {
                progress.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(rail, { x: 0 });
          for (const card of cards) {
            card.style.transform = "";
            card.style.opacity = "";
          }
          rail.style.overflow = "";
        };
      },
    );

    return () => mm.revert();
  }, []);

  /** Where the live point falls along the run, for the tick on the progress
   *  rail. Taken from the launch stage's own position, not chosen. */
  const livePoint = ((launchAt + 0.5) / items.length) * 100;

  return (
    <div>
      <div ref={root}>
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-6 pb-2 sm:px-10 lg:px-[calc((100vw-1320px)/2)]"
        >
          {items.map((stage, i) => {
            const isLaunch = i === launchAt;
            const isAfter = i > launchAt;
            return (
              <article
                key={stage.no}
                data-stage
                className={cn(
                  "group relative flex w-[84vw] shrink-0 snap-start flex-col overflow-hidden rounded-[1.5rem] border p-8 transition-colors duration-500 sm:w-[58vw] sm:p-10 lg:min-h-[28rem] lg:w-[30rem]",
                  isLaunch ? "border-brand/50 bg-ink-2" : "border-line bg-ink-2 hover:border-ash/60",
                )}
              >
                {/* The one card in brand is the one where it goes live. */}
                {isLaunch && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-brand/[0.07]"
                  />
                )}

                {/* Glyph, and who the document makes the actor at this stage.
                    The client acts twice in six, and the launch gate is one of
                    them, which is worth being able to see at a glance. */}
                <div className="relative flex items-start justify-between gap-4">
                  <span
                    aria-hidden
                    className={cn(
                      "block h-11 w-11 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                      isLaunch ? "text-brand" : "text-fog group-hover:text-brand",
                    )}
                  >
                    <CapabilityGlyph variant={stage.glyph} />
                  </span>

                  {stage.actor && (
                    <span
                      className={cn(
                        "font-display shrink-0 rounded-full border px-3 py-1 text-[0.55rem] font-semibold uppercase transition-colors duration-500",
                        stage.actor === "You"
                          ? "border-brand/50 text-brand-text"
                          : "border-line text-ash",
                      )}
                    >
                      {stage.actor}
                    </span>
                  )}
                </div>

                {/* The rule grows on hover. Motion lives on the card's children,
                    never the card: while the run is pinned the depth-of-field
                    pass writes the card's own transform every frame, so a lift
                    or a scale here would be overwritten before it painted. */}
                <span
                  aria-hidden
                  className={cn(
                    "relative mt-8 block h-px origin-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                    isLaunch ? "w-16 bg-brand" : "w-10 bg-line group-hover:w-20 group-hover:bg-brand",
                  )}
                />

                <div className="relative mt-6 flex items-baseline gap-4">
                  <span
                    aria-hidden
                    className={cn(
                      "font-display text-[clamp(2.4rem,4.5vw,3.6rem)] font-extrabold leading-none tabular-nums transition-colors duration-500",
                      isLaunch ? "text-brand" : "text-stroke",
                    )}
                  >
                    {stage.no}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[0.58rem] font-semibold uppercase",
                      isLaunch ? "text-brand-text" : "text-ash",
                    )}
                  >
                    {isLaunch ? liveLabel : isAfter ? afterLabel : beforeLabel}
                  </span>
                </div>

                <h3
                  className={cn(
                    "font-display relative mt-5 text-[clamp(1.3rem,2.4vw,1.75rem)] font-extrabold uppercase leading-[1.12]",
                    isLaunch && !softLaunch ? "text-brand" : "text-snow",
                  )}
                >
                  {stage.title}
                </h3>

                <p
                  className={cn(
                    "relative mt-auto pt-6 leading-relaxed",
                    isLaunch ? "text-snow" : "text-fog",
                  )}
                >
                  {stage.body}
                </p>
              </article>
            );
          })}

          {/* Past the last stage the track does not stop, because the last
              stage does not either. */}
          <div aria-hidden className="flex w-[40vw] shrink-0 items-center lg:w-[18rem]">
            <span className="h-px w-8 shrink-0 bg-brand" />
            <span
              className="h-px flex-1"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--color-line) 0 6px, transparent 6px 14px)",
                backgroundSize: "14px 1px",
                maskImage: "linear-gradient(90deg, #000, transparent)",
                WebkitMaskImage: "linear-gradient(90deg, #000, transparent)",
              }}
            />
          </div>
        </div>
      </div>

      {/* While the section is pinned the vertical scrollbar no longer tells the
          reader where they are in the run, so the rail does. The tick is the
          point where the automation goes live. */}
      <Container className="mt-12 hidden lg:block">
        <span className="relative block h-px w-full bg-line">
          <span
            ref={progress}
            aria-hidden
            className="block h-px w-full origin-left scale-x-0 bg-brand"
          />
          <span
            aria-hidden
            className="absolute top-1/2 h-2.5 w-px -translate-y-1/2 bg-brand"
            style={{ left: `${livePoint}%` }}
          />
          <span
            aria-hidden
            className="font-display absolute top-4 -translate-x-1/2 text-[0.55rem] font-semibold uppercase text-brand-text"
            style={{ left: `${livePoint}%` }}
          >
            {liveLabel}
          </span>
        </span>
      </Container>
    </div>
  );
}
