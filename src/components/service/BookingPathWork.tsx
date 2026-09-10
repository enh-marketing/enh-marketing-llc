"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useEnhanced } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import type { Stage } from "@/content/industries/hospitality-hotels";

/** Six stages, drawn as work done to one booking path.
 *
 *  THE ORDER IS THE ARGUMENT, AND STAGE 4 SAYS SO OUT LOUD: "Friction is
 *  addressed before more traffic is directed towards the website." That is the
 *  only stage in the run that constrains another one, and a numbered list
 *  cannot show it — the reader is told there are six stages and shown six
 *  paragraphs. So the section draws the path a guest has to get down, breaks it
 *  where the document says friction lives, and then does the six things to it:
 *
 *    1  the path is surveyed end to end, and the break is found
 *    2  the stretches that matter commercially are marked; the rest go quiet
 *    3  the approaches are built onto it, still closed
 *    4  the break is repaired
 *    5  the approaches open, and flow reaches the booking
 *    6  what arrived is counted
 *
 *  The break is visible from the first stage and stays open until the fourth,
 *  so a reader who scrolls stage 5 can see that the flow has somewhere to get
 *  to. That is the document's sentence, drawn.
 *
 *  THE DRAWING HOLDS AT THE TOP AND THE STAGES PASS UNDER IT. Deliberately not
 *  the side-by-side arrangement the ecommerce industry page uses: this path is
 *  a wide, horizontal object and a column half the page wide would render it at
 *  a third of the size it needs. The plate sits on the page's own ground rather
 *  than on a raised surface, both because a recessed panel reads as something
 *  being looked into and because it has to be opaque — the stage blocks slide
 *  behind it as they scroll.
 *
 *  NOTHING IS COUNTED. The survey ticks are marks at regular intervals, not
 *  measurements; the tally at the end is a set of arrivals, not a figure. This
 *  document's numbers all live in its results section and none of them is about
 *  this.
 *
 *  BELOW THE LARGE BREAKPOINT the hold is dropped, the path renders finished,
 *  and the six read as a plain ordered list — which is also the state the
 *  markup ships in, so a crawler and a reader without scripting get all six. */

const S = { REVIEW: 0, PRIORITY: 1, STRUCTURE: 2, REPAIR: 3, LAUNCH: 4, MEASURE: 5 };

/** Where the path is surveyed. Regular, because a survey is regular. */
const TICKS = [130, 210, 290, 370, 450, 530, 700, 750];
/** The stretches the second stage picks out. */
const PRIORITY = [
  [186, 334],
  [538, 620],
];
/** Where the approaches meet the path. */
const FEEDERS = [200, 330, 460, 560];
/** The break: open from the first stage, closed by the fourth. */
const BREAK = [620, 672];

/* THE SAME PATH, TURNED. Measured on a 375px phone the wide box came out
   285 x 79, which puts the whole booking path under eighty pixels tall and the
   break at fourteen pixels across — the one thing this drawing exists to show,
   invisible. So below the small breakpoint the path runs down instead of
   across, the approaches come in from the side, and the survey ticks go out the
   other way so the two never cross. */
const P_TICKS = [80, 120, 160, 200, 240, 280];
const P_PRIORITY = [
  [96, 156],
  [236, 292],
];
const P_FEEDERS = [110, 160, 210, 260];
const P_BREAK = [300, 340];

export function BookingPathWork({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  stages: Stage[];
}) {
  const enhanced = useEnhanced("(min-width: 1024px)");
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!enhanced) return;
    const live = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.i);
          if (e.isIntersecting) live.add(i);
          else live.delete(i);
        }
        if (live.size) setActive(Math.max(...live));
      },
      // A band below the held drawing, which is where the stage being read is.
      { rootMargin: "-58% 0px -28% 0px", threshold: 0 },
    );
    for (const row of rows.current) if (row) io.observe(row);
    return () => io.disconnect();
  }, [enhanced]);

  /** Off the hold, everything is done: the path renders repaired and running. */
  const at = enhanced ? active : stages.length - 1;
  const has = (s: number) => at >= s;
  const ease = "cubic-bezier(0.16,1,0.3,1)";
  const fade = `opacity 600ms ${ease}`;

  const wide = (
    <svg viewBox="0 0 900 250" fill="none" aria-hidden className="block w-full">
      {/* Online discovery, where the path starts. */}
      <g stroke="var(--color-ash)" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round">
        {[104, 122, 140].map((y) => (
          <path key={y} d={`M24 ${y} H68`} />
        ))}
        <path d="M68 104 C86 104 82 116 84 122" />
        <path d="M68 140 C86 140 82 128 84 122" />
      </g>

      {/* THE PATH, IN TWO PIECES. The gap is the friction the document names,
          and it is drawn from the first stage rather than introduced at the
          fourth: stage 1 is the stage that finds it. */}
      <path
        d={`M84 122 H${BREAK[0]}`}
        stroke="var(--color-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d={`M${BREAK[1]} 122 H772`}
        stroke="var(--color-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* What the break looks like before it is closed. */}
      <g style={{ opacity: has(S.REPAIR) ? 0 : 1, transition: fade }}>
        <path
          d={`M${BREAK[0]} 108 l-8 28 M${BREAK[1]} 108 l-8 28`}
          stroke="var(--color-ash)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* ---- 1  Surveyed end to end ---- */}
      <g style={{ opacity: has(S.REVIEW) ? 1 : 0, transition: fade }}>
        {TICKS.map((x) => (
          <path
            key={x}
            d={`M${x} 122 V140`}
            stroke="var(--color-ash)"
            strokeWidth="1.25"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />
        ))}
        {/* And what the survey is looking at. */}
        <circle
          cx={(BREAK[0] + BREAK[1]) / 2}
          cy="122"
          r="20"
          stroke="var(--color-ash)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          style={{ opacity: has(S.REPAIR) ? 0 : 1, transition: fade }}
        />
      </g>

      {/* ---- 2  The stretches that matter commercially ---- */}
      <g style={{ opacity: has(S.PRIORITY) ? 1 : 0, transition: fade }}>
        {PRIORITY.map(([a, b]) => (
          <path
            key={a}
            d={`M${a} 122 H${b}`}
            stroke="var(--color-brand)"
            strokeWidth="6"
            strokeOpacity="0.22"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* ---- 3  The approaches, built but not yet open ---- */}
      {FEEDERS.map((x, i) => (
        <g
          key={x}
          style={{
            opacity: has(S.STRUCTURE) ? 1 : 0,
            transition: fade,
            transitionDelay: has(S.STRUCTURE) ? `${i * 80}ms` : "0ms",
          }}
        >
          <rect
            x={x - 20}
            y="30"
            width="40"
            height="18"
            rx="5"
            className="fill-brand/[0.12]"
            stroke="var(--color-ash)"
            strokeWidth="1.5"
          />
          <path
            d={`M${x} 48 V112`}
            stroke="var(--color-ash)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="5 5"
          />
          {/* ---- 5  ...and opened. ---- */}
          <path
            d={`M${x} 48 V112`}
            pathLength="100"
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinecap="round"
            className={has(S.LAUNCH) ? "bp-feed" : undefined}
            style={{
              opacity: has(S.LAUNCH) ? 1 : 0,
              transition: fade,
              animationDelay: `${i * 260}ms`,
            }}
          />
          <circle cx={x} cy="122" r="5" className="fill-ash" />
        </g>
      ))}

      {/* ---- 4  The break, repaired ---- */}
      <path
        d={`M${BREAK[0] - 6} 122 H${BREAK[1] + 6}`}
        stroke="var(--color-brand)"
        strokeWidth="4"
        strokeLinecap="round"
        style={{ opacity: has(S.REPAIR) ? 1 : 0, transition: fade }}
      />

      {/* ---- 5  Flow, all the way to the booking ---- */}
      <path
        d="M84 122 H772"
        pathLength="100"
        stroke="var(--color-brand)"
        strokeWidth="3"
        strokeLinecap="round"
        className={has(S.LAUNCH) ? "bp-flow" : undefined}
        style={{ opacity: has(S.LAUNCH) ? 1 : 0, transition: fade }}
      />

      {/* The booking at the end of it. */}
      <rect
        x="786"
        y="96"
        width="66"
        height="52"
        rx="10"
        className="fill-brand/15"
        stroke="var(--color-brand)"
        strokeWidth="1.75"
      />
      <rect x="802" y="112" width="34" height="8" rx="4" className="fill-brand" />
      <rect x="802" y="128" width="20" height="6" rx="3" className="fill-brand/55" />

      {/* ---- 6  What arrived, counted ---- */}
      <g
        style={{ opacity: has(S.MEASURE) ? 1 : 0, transition: fade }}
        stroke="var(--color-brand)"
        strokeWidth="2"
        strokeLinecap="round"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${792 + i * 13} 172 V${190 - (i % 3) * 5}`} />
        ))}
        <path d="M786 200 H852" strokeWidth="1.25" strokeOpacity="0.5" />
      </g>

      {/* The ground it all stands on. */}
      <path d="M24 226 H852" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 7" />
    </svg>
  );

  const portrait = (
    <svg viewBox="0 0 320 450" fill="none" aria-hidden className="block w-full">
      {/* Online discovery, where the path starts. */}
      <g stroke="var(--color-ash)" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round">
        {[128, 160, 192].map((x) => (
          <path key={x} d={`M${x} 14 V38`} />
        ))}
        <path d="M128 38 C128 50 146 48 160 56" />
        <path d="M192 38 C192 50 174 48 160 56" />
      </g>

      {/* The path, in two pieces, with the friction between them. */}
      <path d={`M160 56 V${P_BREAK[0]}`} stroke="var(--color-line)" strokeWidth="2.5" strokeLinecap="round" />
      <path d={`M160 ${P_BREAK[1]} V356`} stroke="var(--color-line)" strokeWidth="2.5" strokeLinecap="round" />
      <g style={{ opacity: has(S.REPAIR) ? 0 : 1, transition: fade }}>
        <path
          d={`M146 ${P_BREAK[0]} l28 -8 M146 ${P_BREAK[1]} l28 -8`}
          stroke="var(--color-ash)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* 1  Surveyed, and the break found. */}
      <g style={{ opacity: has(S.REVIEW) ? 1 : 0, transition: fade }}>
        {P_TICKS.map((y) => (
          <path
            key={y}
            d={`M160 ${y} H182`}
            stroke="var(--color-ash)"
            strokeWidth="1.25"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />
        ))}
        <circle
          cx="160"
          cy={(P_BREAK[0] + P_BREAK[1]) / 2}
          r="24"
          stroke="var(--color-ash)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          style={{ opacity: has(S.REPAIR) ? 0 : 1, transition: fade }}
        />
      </g>

      {/* 2  The stretches that matter. */}
      <g style={{ opacity: has(S.PRIORITY) ? 1 : 0, transition: fade }}>
        {P_PRIORITY.map(([a, b]) => (
          <path
            key={a}
            d={`M160 ${a} V${b}`}
            stroke="var(--color-brand)"
            strokeWidth="7"
            strokeOpacity="0.22"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* 3  The approaches, built — and 5, opened. */}
      {P_FEEDERS.map((y, i) => (
        <g
          key={y}
          style={{
            opacity: has(S.STRUCTURE) ? 1 : 0,
            transition: fade,
            transitionDelay: has(S.STRUCTURE) ? `${i * 80}ms` : "0ms",
          }}
        >
          <rect
            x="14"
            y={y - 10}
            width="38"
            height="20"
            rx="5"
            className="fill-brand/[0.12]"
            stroke="var(--color-ash)"
            strokeWidth="1.5"
          />
          <path
            d={`M52 ${y} H150`}
            stroke="var(--color-ash)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="5 5"
          />
          <path
            d={`M52 ${y} H150`}
            pathLength="100"
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinecap="round"
            className={has(S.LAUNCH) ? "bp-feed" : undefined}
            style={{
              opacity: has(S.LAUNCH) ? 1 : 0,
              transition: fade,
              animationDelay: `${i * 260}ms`,
            }}
          />
          <circle cx="160" cy={y} r="5" className="fill-ash" />
        </g>
      ))}

      {/* 4  Repaired. */}
      <path
        d={`M160 ${P_BREAK[0] - 6} V${P_BREAK[1] + 6}`}
        stroke="var(--color-brand)"
        strokeWidth="4"
        strokeLinecap="round"
        style={{ opacity: has(S.REPAIR) ? 1 : 0, transition: fade }}
      />

      {/* 5  Flow, all the way down. */}
      <path
        d="M160 56 V356"
        pathLength="100"
        stroke="var(--color-brand)"
        strokeWidth="3"
        strokeLinecap="round"
        className={has(S.LAUNCH) ? "bp-flow" : undefined}
        style={{ opacity: has(S.LAUNCH) ? 1 : 0, transition: fade }}
      />

      {/* The booking at the end of it. */}
      <rect
        x="128"
        y="360"
        width="64"
        height="52"
        rx="10"
        className="fill-brand/15"
        stroke="var(--color-brand)"
        strokeWidth="1.75"
      />
      <rect x="144" y="376" width="32" height="8" rx="4" className="fill-brand" />
      <rect x="144" y="392" width="18" height="6" rx="3" className="fill-brand/55" />

      {/* 6  Counted. */}
      <g
        style={{ opacity: has(S.MEASURE) ? 1 : 0, transition: fade }}
        stroke="var(--color-brand)"
        strokeWidth="2"
        strokeLinecap="round"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${212 + i * 13} 404 V${386 + (i % 3) * 5}`} />
        ))}
        <path d="M206 412 H272" strokeWidth="1.25" strokeOpacity="0.5" />
      </g>

      <path d="M24 434 H296" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 7" />
    </svg>
  );

  const plate = (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-void p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.55)] sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse at 15% 10%, black, transparent 72%)",
        }}
      />
      <div className="relative hidden sm:block">{wide}</div>
      <div className="relative mx-auto block w-full max-w-[20rem] sm:hidden">{portrait}</div>
    </div>
  );

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-12" />
      </Container>

      {/* The path holds at the top; the stages pass beneath it. */}
      <div className="relative">
        <Container className={cn("relative z-10", enhanced && "sticky top-24")}>{plate}</Container>

        <Container className="relative">
          <ol className={cn("mt-10", enhanced && "mt-14")}>
            {stages.map((stage, i) => {
              const on = enhanced && i === at;
              const past = enhanced && i < at;
              return (
                <li
                  key={stage.stage}
                  data-i={i}
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  className="border-b border-line first:border-t"
                >
                  <div className="relative grid gap-x-10 gap-y-3 py-9 pl-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-12">
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-0 top-0 h-full w-[2px] origin-top transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                        on
                          ? "scale-y-100 bg-brand"
                          : past
                            ? "scale-y-100 bg-brand/30"
                            : "scale-y-0 bg-line",
                      )}
                    />
                    <div>
                      <p
                        className={cn(
                          "font-display text-[0.7rem] font-bold uppercase tracking-[0.12em] transition-colors duration-500 motion-reduce:transition-none",
                          on ? "text-brand-text" : "text-ash",
                        )}
                      >
                        {stage.stage}
                      </p>
                      <h3
                        className={cn(
                          "font-display mt-4 text-[clamp(1.15rem,2.3vw,1.7rem)] font-extrabold uppercase leading-[1.12] transition-colors duration-500 motion-reduce:transition-none",
                          on || !enhanced ? "text-snow" : past ? "text-fog" : "text-ash",
                        )}
                      >
                        {stage.title}
                      </h3>
                    </div>
                    <p className="max-w-xl leading-relaxed text-fog lg:pt-7">{stage.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </div>
    </section>
  );
}
