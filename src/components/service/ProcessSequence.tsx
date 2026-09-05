"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** The six stages as one drawing that is worked on, not six drawings in boxes.
 *
 *  WHAT WAS WRONG WITH EVERY EARLIER ATTEMPT. A process is a thing that happens
 *  to something. Six panels in a grid, or six nodes on a rule, describe the
 *  order of the work and show nothing of the work itself: the reader is told
 *  there are six stages and shown six rectangles. So there is one site here,
 *  drawn as the graph a search engine actually sees -- a site with pages hanging
 *  off it and other sites pointing at it -- and the six stages are six things
 *  that happen to that graph while the reader holds still and scrolls.
 *
 *  THE SECTION HOLDS WHILE THE WORK HAPPENS. It pins, the way the channels run
 *  on the paid pillar pins, and the reader's scroll drives the stage rather
 *  than the page position. Faults are found, then repaired. Targets appear
 *  outside the site and are drawn in. Pages fill. Two more pages are built.
 *  Other sites connect. Then the whole thing is swept and the cycle is marked
 *  as running again, because the sixth stage says next month's priorities come
 *  out of this month's data.
 *
 *  NOTHING IN THE GRAPH IS A MEASUREMENT. No page is named, no link is counted,
 *  no position is plotted. It is a shape, and this document states no figures
 *  and promises no ranking anywhere.
 *
 *  IT DEGRADES TO A LIST, AND THE LIST IS THE DEFAULT. The pin is installed
 *  only at desktop widths and only where motion is welcome; everywhere else --
 *  and before a single line of script runs -- the six stages are a plain
 *  vertical run with every word present, and the graph is drawn once in its
 *  finished state. That is the state the markup ships in.
 *
 *  COST. One ScrollTrigger, and a React state change six times across the whole
 *  pin. The graph itself is SVG with CSS transitions, so the per-frame work is
 *  the compositor's. */

export type Stage = { no: string; title: string; body: string };

const TAU = Math.PI * 2;

/** The site's own pages, on a ring around it. Six exist from the start; the
 *  last two are built at stage four, which is the stage that says so. */
const PAGES = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * TAU - Math.PI / 2;
  return { x: 160 + 78 * Math.cos(a), y: 160 + 78 * Math.sin(a), builtAt: i < 6 ? 0 : 3 };
});

/** Which of them the audit finds a fault on, and which stage repairs it. */
const FAULTS = [1, 4, 6];

/** What the research finds outside the site: demand that has no page yet. */
const TARGETS = Array.from({ length: 6 }, (_, i) => {
  const a = ((i + 0.5) / 6) * TAU - Math.PI / 2;
  return { x: 160 + 126 * Math.cos(a), y: 160 + 126 * Math.sin(a) };
});

/** And what points at the site from outside it. */
const OFFSITE = Array.from({ length: 4 }, (_, i) => {
  const a = ((i + 0.5) / 4) * TAU - Math.PI / 2;
  return { x: 160 + 148 * Math.cos(a), y: 160 + 148 * Math.sin(a) };
});

function SiteGraph({ stage }: { stage: number }) {
  const found = stage >= 0;
  const researched = stage >= 1;
  const fixed = stage >= 2;
  const filled = stage >= 3;
  const connected = stage >= 4;
  const reviewed = stage >= 5;

  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" fill="none" aria-hidden>
      {/* The ring the pages sit on, and the reach beyond it. */}
      <circle cx="160" cy="160" r="78" stroke="var(--color-line)" strokeWidth="1" />
      <circle
        cx="160"
        cy="160"
        r="126"
        stroke="var(--color-line)"
        strokeWidth="1"
        strokeDasharray="3 5"
        className="transition-opacity duration-700"
        opacity={researched ? 0.9 : 0}
      />

      {/* Other sites, pointing in. */}
      {OFFSITE.map((n, i) => (
        <g
          key={`o${i}`}
          className="transition-opacity duration-700"
          opacity={connected ? 1 : 0}
          style={{ transitionDelay: `${i * 90}ms` }}
        >
          <path
            d={`M${n.x} ${n.y}L160 160`}
            stroke="var(--color-brand)"
            strokeWidth="1.1"
            opacity="0.28"
          />
          {connected && (
            <path
              key={`sig${stage}-${i}`}
              className="agent-signal"
              d={`M${n.x} ${n.y}L160 160`}
              pathLength={100}
              stroke="var(--color-brand)"
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{ animationDelay: `${i * 220}ms` }}
            />
          )}
          <circle cx={n.x} cy={n.y} r="5" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="1.4" />
        </g>
      ))}

      {/* Demand with no page yet, and the line drawn from it to the page that
          will answer it. */}
      {TARGETS.map((t, i) => (
        <g
          key={`t${i}`}
          className="transition-opacity duration-700"
          opacity={researched ? 1 : 0}
          style={{ transitionDelay: `${i * 70}ms` }}
        >
          <path
            d={`M${t.x} ${t.y}L${PAGES[i].x} ${PAGES[i].y}`}
            stroke="var(--color-brand)"
            strokeWidth="1"
            strokeDasharray="2.5 3.5"
            opacity={filled ? 0.5 : 0.25}
            className="transition-opacity duration-700"
          />
          <rect
            x={t.x - 6}
            y={t.y - 4}
            width="12"
            height="8"
            rx="2"
            fill={filled ? "var(--color-brand)" : "none"}
            stroke="var(--color-brand)"
            strokeWidth="1.2"
            className="transition-[fill] duration-700"
          />
        </g>
      ))}

      {/* The site's own pages. */}
      {PAGES.map((p, i) => {
        const exists = stage >= p.builtAt;
        const faulty = FAULTS.includes(i) && !fixed;
        return (
          <g
            key={`p${i}`}
            className="transition-opacity duration-700"
            opacity={exists ? 1 : 0}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <path
              d={`M160 160L${p.x} ${p.y}`}
              stroke={faulty ? "var(--color-ash)" : "var(--color-brand)"}
              strokeWidth={faulty ? 1 : 1.4}
              strokeDasharray={faulty ? "3 4" : undefined}
              opacity={faulty ? 0.55 : 0.75}
              className="transition-[stroke,stroke-width,opacity] duration-700"
            />
            <rect
              x={p.x - 9}
              y={p.y - 11}
              width="18"
              height="22"
              rx="3"
              fill={filled ? "color-mix(in srgb, var(--color-brand) 22%, transparent)" : "var(--color-ink-3)"}
              stroke={faulty ? "var(--color-ash)" : "var(--color-brand)"}
              strokeWidth="1.3"
              className="transition-[fill,stroke] duration-700"
            />
            <path
              d={`M${p.x - 4} ${p.y - 4}h8M${p.x - 4} ${p.y}h8M${p.x - 4} ${p.y + 4}h5`}
              stroke="var(--color-brand)"
              strokeWidth="1"
              opacity={filled ? 0.85 : 0.35}
              className="transition-opacity duration-700"
            />
            {/* What the audit found. It is on the page until the stage that
                says it is fixed. */}
            {faulty && found && (
              <g>
                <circle cx={p.x + 11} cy={p.y - 13} r="6" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="1.3" />
                <path
                  d={`M${p.x + 8.5} ${p.y - 15.5}l5 5M${p.x + 13.5} ${p.y - 15.5}l-5 5`}
                  stroke="var(--color-brand)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </g>
            )}
          </g>
        );
      })}

      {/* The review, swept once round the whole thing. */}
      {reviewed && (
        <circle
          key={`sweep${stage}`}
          className="agent-sweep"
          cx="160"
          cy="160"
          r="126"
          stroke="var(--color-brand)"
          strokeWidth="1.6"
          pathLength={100}
          style={{ animationDuration: "1400ms" }}
        />
      )}

      {/* The site. */}
      <circle
        cx="160"
        cy="160"
        r="30"
        fill="var(--color-ink-3)"
        stroke="var(--color-brand)"
        strokeWidth="1.6"
      />
      <rect x="146" y="149" width="28" height="22" rx="3" stroke="var(--color-brand)" strokeWidth="1.3" />
      <path d="M146 156h28" stroke="var(--color-brand)" strokeWidth="1.3" />
      <circle cx="150" cy="152.5" r="1.2" fill="var(--color-brand)" />
      <circle cx="154" cy="152.5" r="1.2" fill="var(--color-brand)" />
    </svg>
  );
}

export function ProcessSequence({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  stages: Stage[];
}) {
  const root = useRef<HTMLDivElement>(null);
  /** Final stage by default: that is what a reader with no script, no pin or
   *  reduced motion is left holding, and it is the finished drawing. */
  const [stage, setStage] = useState(stages.length - 1);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { run: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (!ctx.conditions?.run) return;
        const el = root.current;
        if (!el) return;

        setPinned(true);
        setStage(0);

        let current = 0;
        const trigger = ScrollTrigger.create({
          trigger: el,
          pin: true,
          scrub: true,
          start: "center center",
          // One viewport height of scroll per stage after the first, which is
          // enough to read a stage without turning the section into a tunnel.
          end: () => `+=${(stages.length - 1) * window.innerHeight * 0.72}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(stages.length - 1, Math.floor(self.progress * stages.length));
            if (next !== current) {
              current = next;
              setStage(next);
            }
          },
        });

        return () => {
          trigger.kill();
          setPinned(false);
          setStage(stages.length - 1);
        };
      },
    );

    return () => mm.revert();
  }, [stages.length]);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "Six stages, reviewed every month" }}
          className="mb-12"
        />

        <div ref={root}>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
            {/* The site being worked on. */}
            <div className="relative mx-auto aspect-square w-full max-w-[440px]">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in srgb, var(--color-brand) 9%, transparent), transparent 72%)",
                }}
              />
              <SiteGraph stage={stage} />
            </div>

            {/* What is being done to it. */}
            <div className={cn(pinned ? "grid" : "space-y-12")}>
              {stages.map((s, i) => {
                const on = !pinned || stage === i;
                return (
                  <div
                    key={s.no}
                    aria-hidden={pinned && !on}
                    /* VISIBILITY, NOT JUST OPACITY.

                       Hiding the five inactive stages with opacity alone made
                       the hidden state something the browser had to transition
                       INTO: measured with the pin installed, all six paragraphs
                       computed to opacity 1 and sat on top of one another,
                       because the transition had not run. Opacity is the fade;
                       visibility is the fact, and it lands on the same frame as
                       the class. A clock that never starts now leaves one stage
                       readable instead of six overlaid.

                       They stay in the grid rather than being unmounted, so the
                       cell keeps the height of the longest stage and the pinned
                       row does not jump as the reader scrolls through it. */
                    className={cn(
                      pinned && "col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-out",
                      pinned && !on && "pointer-events-none invisible translate-y-3 opacity-0",
                      pinned && on && "visible translate-y-0 opacity-100",
                    )}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="font-display text-[0.6875rem] font-bold tabular-nums text-brand"
                      >
                        {s.no}
                      </span>
                      <p className="font-display text-[clamp(1.25rem,2.8vw,2rem)] font-extrabold uppercase leading-[1.1] text-snow">
                        {s.title}
                      </p>
                    </div>
                    <p className="mt-5 max-w-[48ch] text-[clamp(1rem,1.8vw,1.15rem)] leading-relaxed text-fog">
                      {s.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Where the reader is in the run. While the section is pinned the
              scrollbar no longer answers that. */}
          <div aria-hidden className="mt-12 grid grid-cols-6 gap-2">
            {stages.map((s, i) => (
              <span key={s.no} className="block h-px w-full bg-line">
                <span
                  className={cn(
                    "block h-px w-full origin-left bg-brand transition-transform duration-500 ease-out",
                    i <= stage ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
