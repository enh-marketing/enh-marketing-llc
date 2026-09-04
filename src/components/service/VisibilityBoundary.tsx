"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type ServiceRole = "baseline" | "lever" | "monitor";

export type BoundaryItem = {
  no: string;
  title: string;
  body: string;
  role: ServiceRole;
  /** Where the boundary falls on this row, as a percentage of the content
   *  width. Decided by the item's own sentence and cited in the content file. */
  boundary?: number;
  labels?: [string, string];
};

/** Seven services, sorted by where the work actually lives.
 *
 *  WHY THIS SHAPE. Read the seven and they sort themselves by territory, in
 *  the document's own words. 03 says important information should appear
 *  clearly "on the page". 05 says the markup "must match the information
 *  people can see on the page". 04 says the details "should remain consistent
 *  across the web" and names external profiles. 06 says answers "may use
 *  information from sources beyond your website". So the argument the section
 *  makes is not a sequence, it is a map: some of this work is on your site,
 *  some of it is not, and one item is both.
 *
 *  So the section is divided by a single hairline that steps left and right as
 *  it descends. Each service sits on the side its own sentence names. 04's
 *  drawing straddles the line, because it is the one item that exists on both
 *  sides at once. 06 inverts the row entirely: the line steps back to the near
 *  edge and almost everything sits beyond it.
 *
 *  NOT A CARD GRID. There are no cards, no columns of items and no tinted
 *  bands. One item per row, so the numbers can only read 01 to 07 downward.
 *  The baseline and the monitoring reading are the two ends of the same rule
 *  rather than two matching blocks, because the document makes them the same
 *  act at two moments.
 *
 *  Below the large breakpoint the line cannot migrate, so the argument moves
 *  to the left edge of each entry: solid where the work is on the page, solid
 *  then dashed where it is both, dashed and indented where it is beyond. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, vectorEffect: "non-scaling-stroke" as const };

/* ---------------------------------------------------------------- drawings */

/** 02 The crawler is outside and has to get through. It arrives from the far
 *  edge, meets the controls standing on the boundary, and passes only where
 *  one is open. The pages themselves are not drawn: they are behind the line,
 *  where the copy is. */
function AccessDraw() {
  const lanes = [16, 46, 76, 106];
  const open = [true, false, true, false];
  return (
    <svg viewBox="0 0 300 124" aria-hidden className="block w-full text-fog">
      {lanes.map((y, i) => (
        <g key={y}>
          {/* A request, out beyond the site. */}
          <rect x="252" y={y - 9} width="44" height="18" rx="4" {...S} strokeWidth="1.1" opacity="0.75" />
          <rect x="260" y={y - 1.6} width="24" height="3.2" rx="1.6" fill="currentColor" opacity="0.45" />
          {/* Its approach to the boundary. */}
          <path d={`M250 ${y} H 26`} {...S} className="text-line" strokeDasharray="3 4" />
          <path
            d={`M250 ${y} H ${open[i] ? 8 : 40}`}
            pathLength="100"
            stroke="var(--color-brand)"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            className="ci-flow"
            style={{ animationDelay: `${i * 420}ms`, animationDuration: "3.4s" }}
          />
          {/* The control standing on the boundary: open, or shut. */}
          {open[i] ? (
            <>
              <path d={`M22 ${y - 16} V ${y - 7}`} {...S} className="text-brand" />
              <path d={`M22 ${y + 7} V ${y + 16}`} {...S} className="text-brand" />
              <path d={`M14 ${y - 4.5} l-6 4.5 l6 4.5`} {...S} className="text-brand" />
            </>
          ) : (
            <>
              <path d={`M22 ${y - 16} V ${y + 16}`} {...S} strokeWidth="2.6" className="text-fog" />
              <path d={`M34 ${y - 5} l10 10 M44 ${y - 5} l-10 10`} {...S} className="text-brand" />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

/** 03 A question, and the page answering it clearly. */
function AnswerDraw() {
  return (
    <svg viewBox="0 0 240 132" aria-hidden className="block w-full text-fog">
      {/* The question people ask. */}
      <rect x="6" y="6" width="122" height="24" rx="12" {...S} className="text-brand" />
      <rect x="18" y="15" width="78" height="3.4" rx="1.7" fill="var(--color-brand)" opacity="0.85" />
      <circle cx="112" cy="18" r="3" fill="var(--color-brand)" />
      <path d="M34 30 V 42" {...S} strokeDasharray="2 3" className="text-brand" />
      {/* The page, answering at the head and supporting it beneath. */}
      <rect x="6" y="42" width="228" height="86" rx="4" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <rect x="18" y="52" width="150" height="6" rx="3" fill="var(--color-brand)" className="ci-grow-x" />
      {[66, 74, 82].map((y, i) => (
        <rect key={y} x="18" y={y} width={[204, 178, 192][i]} height="3" rx="1.5" fill="currentColor" opacity="0.42" className="ci-grow-x" style={{ animationDelay: `${i * 220}ms` }} />
      ))}
      {/* Supported by accurate details. */}
      {[0, 1, 2].map((c) => (
        <g key={c}>
          <rect x={18 + c * 72} y="94" width="62" height="26" rx="3" {...S} strokeWidth="1.1" opacity="0.7" />
          <rect x={25 + c * 72} y="101" width="34" height="2.8" rx="1.4" fill="currentColor" opacity="0.45" />
          <rect x={25 + c * 72} y="108" width={[44, 28, 38][c]} height="2.4" rx="1.2" fill="currentColor" opacity="0.3" />
        </g>
      ))}
    </svg>
  );
}

/** 04 The same record, held once on the site and once off it, with the details
 *  tied across. One field is out of register until it is corrected. */
function EntityDraw() {
  const rows = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 260 130" aria-hidden className="block w-full text-fog">
      {/* The record as your site states it. */}
      <rect x="4" y="14" width="92" height="102" rx="4" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {rows.map((i) => (
        <rect key={i} x="14" y={28 + i * 22} width={[62, 48, 68, 40][i]} height="3.2" rx="1.6" fill="currentColor" opacity="0.55" />
      ))}
      {/* The record as the rest of the web states it. */}
      <rect x="164" y="14" width="92" height="102" rx="4" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 3" />
      {rows.map((i) => (
        <rect
          key={i}
          x={174 + (i === 2 ? 10 : 0)}
          y={28 + i * 22}
          width={[62, 48, 44, 40][i]}
          height="3.2"
          rx="1.6"
          fill={i === 2 ? "var(--color-brand)" : "currentColor"}
          opacity={i === 2 ? 0.9 : 0.4}
          className={i === 2 ? "ci-slide-x" : undefined}
        />
      ))}
      {/* The details tied across. */}
      {rows.map((i) => (
        <path
          key={i}
          d={`M96 ${29.6 + i * 22} H 164`}
          {...S}
          strokeDasharray="2 3"
          opacity={i === 2 ? 1 : 0.5}
          className={i === 2 ? "text-brand" : undefined}
        />
      ))}
    </svg>
  );
}

/** 05 The markup layer over the page, each tag tied to the row a reader can
 *  actually see, and one tie that runs to the boundary and stops. */
function SchemaDraw() {
  return (
    <svg viewBox="0 0 200 130" aria-hidden className="block w-full text-fog">
      {/* What people can see. */}
      <rect x="6" y="54" width="132" height="70" rx="4" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {[66, 82, 98, 112].map((y, i) => (
        <rect key={y} x="16" y={y} width={[104, 78, 92, 62][i]} height="3.2" rx="1.6" fill="currentColor" opacity="0.5" />
      ))}
      {/* The markup, above it. */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={10 + i * 34} y="10" width="28" height="14" rx="3" {...S} className="text-brand" />
          <rect x={15 + i * 34} y="16" width="18" height="2.4" rx="1.2" fill="var(--color-brand)" opacity="0.7" />
          <path
            d={`M${24 + i * 34} 24 V ${[66, 82, 98, 112][i] + 1.6}`}
            {...S}
            pathLength="100"
            className="ci-draw text-brand"
            strokeWidth="0.9"
            style={{ animationDelay: `${i * 300}ms` }}
          />
        </g>
      ))}
      {/* No special schema guarantees inclusion: one tie runs on and stops. */}
      <path d="M152 10 V 40" {...S} strokeDasharray="3 3" className="text-line" />
      <circle cx="152" cy="44" r="3" {...S} className="text-line" />
    </svg>
  );
}

/** 06 Sources out beyond the site. Each is a different kind of thing, and each
 *  returns a reference back across the boundary toward the brand. */
function OffsiteDraw() {
  const marks = [
    { x: 92, y: 8, w: 62, h: 22, r: 3 },
    { x: 178, y: 4, w: 48, h: 28, r: 14 },
    { x: 244, y: 14, w: 52, h: 20, r: 3 },
    { x: 120, y: 58, w: 54, h: 26, r: 13 },
    { x: 196, y: 62, w: 74, h: 22, r: 3 },
  ];
  return (
    <svg viewBox="0 0 300 132" aria-hidden className="block w-full text-fog">
      {marks.map((m, i) => (
        <g key={i}>
          <rect x={m.x} y={m.y} width={m.w} height={m.h} rx={m.r} {...S} strokeDasharray={i % 2 ? "3 3" : undefined} />
          <rect x={m.x + 9} y={m.y + m.h / 2 - 1.6} width={m.w - 22} height="3.2" rx="1.6" fill="currentColor" opacity="0.5" />
          <path d={`M${m.x} ${m.y + m.h / 2} C ${m.x - 34} ${m.y + m.h / 2}, 46 ${m.y + m.h / 2}, 26 108`} {...S} strokeWidth="1" opacity="0.45" />
          <path
            d={`M${m.x} ${m.y + m.h / 2} C ${m.x - 34} ${m.y + m.h / 2}, 46 ${m.y + m.h / 2}, 26 108`}
            pathLength="100"
            stroke="var(--color-brand)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            className="ci-flow"
            style={{ animationDelay: `${i * 560}ms`, animationDuration: "3.4s" }}
          />
        </g>
      ))}
      {/* The brand the references come back to, at the boundary. */}
      <circle cx="22" cy="112" r="9" fill="var(--color-brand)" opacity="0.12" />
      <circle cx="22" cy="112" r="9" {...S} className="text-brand" />
      <circle cx="22" cy="112" r="3.2" fill="var(--color-brand)" />
    </svg>
  );
}

const DRAW: Record<string, () => ReactNode> = {
  "02": AccessDraw,
  "03": AnswerDraw,
  "04": EntityDraw,
  "05": SchemaDraw,
  "06": OffsiteDraw,
};

/* -------------------------------------------------------- the two readings */

/** The reading taken at the start and the reading repeated: the same strip of
 *  agreed questions, once and then again. */
function ReadingStrip({ item, repeat }: { item: BoundaryItem; repeat?: boolean }) {
  const cols = 9;
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
      <div>
        <p className="font-display text-[0.6875rem] font-bold tabular-nums text-brand-text">{item.no}</p>
        <h3 className="font-display mt-2 text-[clamp(1.3rem,2.2vw,1.75rem)] font-extrabold uppercase leading-[1.14] text-snow">{item.title}</h3>
        <p className="mt-4 max-w-2xl leading-relaxed text-fog">{item.body}</p>
      </div>
      <div>
        {item.labels && (
          <p className="font-display mb-3 flex items-baseline justify-between gap-3 text-[0.6875rem] font-semibold uppercase leading-none">
            <span className="text-ash">{item.labels[0]}</span>
            <span className="text-brand-text">{item.labels[1]}</span>
          </p>
        )}
        {/* One column per agreed question; a filled cell is an appearance.
            Repeated, the same strip is read again rather than replaced. */}
        <div className="space-y-1.5">
          {[0, 1, 2].map((r) => (
            <div key={r} className="flex gap-1.5">
              {Array.from({ length: cols }, (_, c) => {
                const lit = (r * 4 + c * 3) % 7 < 2;
                return (
                  <span
                    key={c}
                    className={cn(
                      "h-4 flex-1 rounded-[3px] border",
                      lit ? "border-brand bg-brand/80" : "border-line bg-ink-3",
                      repeat && lit && "ci-twinkle",
                    )}
                    style={repeat && lit ? { animationDelay: `${(r * cols + c) * 90}ms` } : undefined}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div aria-hidden className="mt-3 flex items-center gap-2">
          <span className="h-px flex-1 bg-line" />
          <span className={cn("h-2 w-2 rounded-full", repeat ? "bg-brand ci-blink" : "bg-brand")} {...(repeat ? { "data-first-tick": "" } : {})} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ layout */

export function VisibilityBoundary({
  items,
  territories,
}: {
  items: BoundaryItem[];
  territories: [string, string];
}) {
  const root = useRef<HTMLDivElement>(null);
  const baseline = items.find((i) => i.role === "baseline");
  const levers = items.filter((i) => i.role === "lever");
  const monitor = items.find((i) => i.role === "monitor");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const q = gsap.utils.selector(el);
      const blocks = q("[data-entry]");
      gsap.set(blocks, { opacity: 0.55 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 80%", scrub: 0.7 } });
      blocks.forEach((b, i) => tl.to(b, { opacity: 1, duration: 0.6 / blocks.length, ease: "none" }, i / blocks.length));
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(blocks, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length]);

  /** The columns of a row, in percentages that add to 100. The boundary always
   *  falls on a column edge, except on 04 where it deliberately passes through
   *  the drawing, because that item lives on both sides at once. */
  const ROW: Record<string, string> = {
    "02": "44% 6% 50%",
    "03": "40% 4% 40% 16%",
    "04": "38% 4% 58%",
    "05": "40% 4% 40% 16%",
    "06": "11% 6% 35% 5% 43%",
  };

  /** The label that names a territory, standing along the boundary. */
  const Standing = ({ text, tone }: { text: string; tone: "in" | "out" }) => (
    <span
      aria-hidden
      className={cn(
        "font-display text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.16em]",
        tone === "in" ? "text-ash" : "text-brand-text",
      )}
      style={{ writingMode: "vertical-rl" }}
    >
      {text}
    </span>
  );

  /** Graduation running the height of the strip beyond the line, so the space
   *  past the boundary reads as labelled territory rather than as a hole. */
  const Graduation = () => (
    <span aria-hidden className="pointer-events-none absolute inset-y-0 left-3 w-6" style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--color-line) 0 1px, transparent 1px 7px)" }} />
  );

  return (
    <div ref={root}>
      {/* The first reading, before the boundary begins. */}
      {baseline && (
        <div data-entry className="pb-10">
          <ReadingStrip item={baseline} />
        </div>
      )}

      {/* The five levers, each on the side its own sentence names. */}
      <ol className="relative">
        {levers.map((item, i) => {
          const x = item.boundary ?? 50;
          const prev = i > 0 ? (levers[i - 1].boundary ?? 50) : x;
          const Draw = DRAW[item.no] ?? AccessDraw;
          const inverted = x < 30;
          const strip = item.no === "03" || item.no === "05";
          const showLabels = item.no === "02" || item.no === "05";

          const Text = (
            <div>
              <p className="font-display text-[0.6875rem] font-bold tabular-nums text-brand-text">{item.no}</p>
              <h3 className="font-display mt-2 text-[clamp(1.15rem,1.9vw,1.5rem)] font-extrabold uppercase leading-[1.14] text-snow">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-fog">{item.body}</p>
            </div>
          );

          return (
            <li key={item.no} data-entry className="relative py-8">
              {/* The boundary on this row, and the step down from the row above. */}
              <span aria-hidden className="pointer-events-none absolute inset-y-0 hidden w-px bg-line lg:block" style={{ left: `${x}%` }} />
              {i > 0 && (
                <span
                  aria-hidden
                  className={cn("pointer-events-none absolute top-0 hidden h-px lg:block", inverted ? "bg-brand" : "bg-line")}
                  style={{ left: `${Math.min(x, prev)}%`, width: `${Math.abs(x - prev)}%` }}
                />
              )}
              {inverted && (
                <span
                  aria-hidden
                  className="font-display absolute -top-[0.4rem] hidden bg-ink px-2 text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.16em] text-brand-text lg:block"
                  style={{ left: `${x}%` }}
                >
                  {territories[1]}
                </span>
              )}

              {/* Below lg the line cannot migrate, so the argument moves to the
                  entry's own left edge and is carried by the rule's pattern. */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-6 left-0 w-0.5 lg:hidden",
                  inverted ? "bg-brand/50" : item.no === "04" ? "bg-gradient-to-b from-line to-brand/50" : "bg-line",
                )}
              />

              <div className={cn("pl-6 lg:grid lg:items-center lg:pl-0", inverted && "pl-8")} style={{ gridTemplateColumns: ROW[item.no] }}>
                {inverted ? (
                  <>
                    {/* What is left inside the boundary: the site itself. */}
                    <span aria-hidden className="hidden self-center lg:block">
                      <span className="block rounded-[0.35rem] border border-line bg-ink-3 p-2.5">
                        <span className="block h-1.5 w-full rounded-full bg-fog/55" />
                        <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-fog/40" />
                        <span className="mt-1.5 block h-1.5 w-4/5 rounded-full bg-fog/40" />
                      </span>
                    </span>
                    <span aria-hidden className="hidden lg:block" />
                    {Text}
                    <span aria-hidden className="hidden lg:block" />
                    <div className="mt-6 lg:mt-0">
                      <Draw />
                    </div>
                  </>
                ) : (
                  <>
                    {Text}
                    <span aria-hidden className="hidden lg:block" />
                    <div className="mt-6 lg:mt-0">
                      <Draw />
                    </div>
                    {strip && (
                      <div aria-hidden className="relative hidden self-stretch pl-3 lg:flex lg:items-center">
                        <Graduation />
                        <span className="relative ml-12">
                          <Standing text={territories[1]} tone="out" />
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* The two territories named, twice down the run. */}
              {showLabels && (
                <span aria-hidden className="absolute top-8 hidden lg:block" style={{ left: `${x}%`, transform: "translateX(-1.4rem)" }}>
                  <Standing text={territories[0]} tone="in" />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* The same reading, repeated. */}
      {monitor && (
        <div data-entry className="pt-10">
          <ReadingStrip item={monitor} repeat />
        </div>
      )}
    </div>
  );
}
