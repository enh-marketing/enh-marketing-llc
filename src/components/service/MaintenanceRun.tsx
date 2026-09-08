"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { CoverPart } from "@/components/service/CoverPart";
import { cn } from "@/lib/cn";
import type { Cover } from "@/content/services/website-maintenance-support";

gsap.registerPlugin(ScrollTrigger);

/** The nine covered areas, run as one boundary rather than nine cards.
 *
 *  WHY A RUN AND NOT A GRID. Nine entries in a three-by-three grid say "nine
 *  services". The document is not describing nine services, it is describing
 *  the edge of one arrangement: eight kinds of work that keep an existing site
 *  running, and a ninth that the copy itself puts outside — "treated as
 *  development work so the cost and delivery requirements remain clear". A grid
 *  cannot say that. One continuous line threading every station can, and the
 *  break in that line before the last station is the whole point of the
 *  section.
 *
 *  WHY EACH ENTRY GETS A FULL STAGE. Six of the nine carry three separate
 *  sentences: the failure the work prevents, the work itself, and where the work
 *  stops. That is not card copy. Pinned, each entry has the room to be read as
 *  what it is — a scope clause with a drawing of the thing it governs.
 *
 *  THE LIMIT IS NOT SMALL PRINT. It is set apart on a brand rule, at the same
 *  size as the body. A reader choosing a maintenance company is buying the
 *  boundary as much as the work, and this document is unusually direct about it.
 *
 *  Pinned only where there is width and motion is welcome; elsewhere it degrades
 *  to a native snap-scroll rail with every station drawn and every sentence
 *  present. Same mechanic as ChannelScroller on the Performance Marketing
 *  pillar, which is the house pattern for a run of this length. */

/** The section's mark: the arrangement's own shape, before the run draws it in
 *  full. Eight inside a closed edge, one beyond a break in it. */
function ScopeEdgeMark() {
  return (
    <div className="hidden shrink-0 lg:block">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label="Eight kinds of work inside one closed boundary, and a ninth outside a break in it."
        className="h-[clamp(9rem,14vw,13rem)] w-[clamp(9rem,14vw,13rem)] overflow-visible"
      >
        {/* The closed edge, open on its right side. */}
        <path
          d="M126 30H34a10 10 0 0 0-10 10v120a10 10 0 0 0 10 10h92"
          stroke="var(--color-line)"
          strokeWidth="1.4"
          fill="none"
        />
        {/* The break. */}
        <path
          d="M126 30h30a10 10 0 0 1 10 10v40"
          stroke="var(--color-ash)"
          strokeWidth="1.4"
          strokeDasharray="5 6"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M126 170h30a10 10 0 0 0 10-10v-40"
          stroke="var(--color-ash)"
          strokeWidth="1.4"
          strokeDasharray="5 6"
          fill="none"
          opacity="0.8"
        />
        {/* The eight inside. */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={44 + (i % 2) * 44}
            y={50 + Math.floor(i / 2) * 28}
            width={30}
            height={12}
            rx={3}
            fill="var(--color-line)"
          />
        ))}
        {/* The ninth, outside. */}
        <rect
          x={150}
          y={92}
          width={34}
          height={16}
          rx={4}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1.4"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}

export function MaintenanceRun({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: Cover[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  /** Which station is under the reader's eye. Null until the pin installs, so
   *  the rail version lights nothing and every drawing shows its resting state. */
  const [near, setNear] = useState<number | null>(null);

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

        const cards = gsap.utils.toArray<HTMLElement>(":scope > div", rail);

        const distance = () => {
          const last = cards[cards.length - 1];
          if (!last) return 0;
          return Math.max(0, last.offsetLeft + last.offsetWidth / 2 - el.clientWidth / 2);
        };

        /** Depth of field, and which station is being read. Written straight to
         *  style; the lit index goes through state, which only changes nine
         *  times across the whole run. */
        let lit = -1;
        const focus = () => {
          const mid = window.innerWidth / 2;
          let best = 0;
          let bestOffset = Infinity;
          cards.forEach((card, i) => {
            const r = card.getBoundingClientRect();
            const offset = Math.abs(r.left + r.width / 2 - mid);
            if (offset < bestOffset) {
              bestOffset = offset;
              best = i;
            }
            const t = gsap.utils.clamp(0, 1, offset / mid);
            card.style.opacity = gsap.utils.interpolate(1, 0.4, t).toFixed(3);
          });
          if (best !== lit) {
            lit = best;
            setNear(best);
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
          for (const card of cards) card.style.opacity = "";
          rail.style.overflow = "";
          setNear(null);
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id={id} data-section={label} className="relative overflow-hidden py-16 sm:py-20">
      <Container className="mb-16">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          markNode={<ScopeEdgeMark />}
        />
      </Container>

      <div ref={root}>
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:px-10 lg:px-[calc((100vw-1320px)/2+2.5rem)]"
        >
          {items.map((item, i) => {
            const on = near === i;
            // The last station stands outside a break in the line, because the
            // document puts it outside the maintenance scope in as many words.
            const outside = i === items.length - 1;
            return (
              <div
                key={item.no}
                className="relative flex w-[80vw] shrink-0 snap-start flex-col sm:w-[60vw] lg:h-[27rem] lg:w-[31rem]"
              >
                {/* The boundary, threading every station. Each card carries the
                    segment to its own left, so the line is continuous across
                    the gaps — except before the last one, where the gap is left
                    empty and the segment turns broken. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-[8.5rem] h-px",
                    outside
                      ? "left-0 right-0 border-t border-dashed border-line"
                      : i === 0
                        ? "left-0 right-0 bg-line"
                        : "-left-5 right-0 bg-line",
                  )}
                />

                {/* The part itself, standing on the line. Capped well short of
                    the card so it reads as an object on the boundary rather
                    than as a set of bars stretched to fill a column. */}
                <div className="relative h-[8.5rem] max-w-[15.5rem] pb-6 pt-1">
                  <CoverPart zone={item.zone} on={on} />
                </div>

                {/* The station. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-[8.5rem] z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[0.55rem] font-bold tabular-nums transition-all duration-500 motion-reduce:transition-none",
                    on
                      ? "border-2 border-brand bg-brand text-white"
                      : outside
                        ? "border border-dashed border-ash bg-void text-ash"
                        : "border border-line bg-void text-ash",
                  )}
                >
                  {item.no}
                </span>

                <div className="pt-8">
                  <h3
                    className={cn(
                      "font-display text-[clamp(1.15rem,2vw,1.5rem)] font-extrabold uppercase leading-[1.14] transition-colors duration-500 motion-reduce:transition-none",
                      on ? "text-brand" : "text-snow",
                    )}
                  >
                    {item.title}
                  </h3>

                  {item.why && (
                    <p className="mt-4 max-w-md text-[0.8125rem] leading-relaxed text-ash">
                      {item.why}
                    </p>
                  )}

                  <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-fog">
                    {item.body}
                  </p>

                  {/* Where it stops. */}
                  {item.limit && (
                    <p
                      className={cn(
                        "mt-5 max-w-md border-l-2 pl-4 text-[0.9375rem] leading-relaxed transition-colors duration-500 motion-reduce:transition-none",
                        on ? "border-brand text-snow" : "border-line text-fog",
                      )}
                    >
                      {item.limit}
                    </p>
                  )}

                  {item.note && (
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-ash">{item.note}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Where the reader is in the run, while the vertical scrollbar is held. */}
      <Container className="mt-12 hidden lg:block">
        <span className="block h-px w-full bg-line">
          <span
            ref={progress}
            className="block h-px w-full origin-left scale-x-0 bg-brand"
            aria-hidden
          />
        </span>
      </Container>

      <Container className="mt-10 lg:hidden">
        <Rise>
          <span className="block h-px w-full bg-line" />
        </Rise>
      </Container>
    </section>
  );
}
