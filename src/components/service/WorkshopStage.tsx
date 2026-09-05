"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Format } from "@/content/services/ai-workshops-and-training";
import { cn } from "@/lib/cn";

/** Scroll length per format. The stage holds for the rest of the track. */
const VH_PER = 95;

/** The four workshop formats, each drawn as what happens in it, travelled
 *  through sideways while the section holds.
 *
 *  WHY NOT FOUR ROOMS. The version before this drew all four as the same room in
 *  perspective with the furniture rearranged. The room had presence, but it was
 *  the constant and the differences between the four were a few tables moved
 *  around: cover the titles and you could not tell them apart, which is the
 *  whole test. The formats do not differ by where they are held. They differ by
 *  what happens.
 *
 *  So each gets its own object, its own camera and its own composition. A half
 *  day is a demonstration, seen head on: an output on a board with the fault in
 *  it marked, because the session is about "what current AI tools can do and
 *  where they commonly fail". A full day is hands on a table, seen from
 *  overhead, producing the shortlist. A leadership session is a judgement on
 *  proposals, seen as the proposals themselves, because that session reviews
 *  "costs, operational requirements and risks" and exists to "challenge
 *  unrealistic claims". A multi-session programme is a period, seen as the
 *  schedule, because its subject is the working gaps between sittings.
 *
 *  NO PEOPLE, NO HEADCOUNT, NO CONTENT. The document declines to give a number:
 *  FAQ 8 says only that "hands-on workshops work best with smaller groups". And
 *  no drawing writes an AI output, names a use case or scores a proposal, since
 *  the document writes none. Text is bars, marks are marks. The clause each
 *  drawing was read from is printed with it.
 *
 *  THE STAGE HOLDS, THE PAGE DOES NOT STOP. A tall track with a sticky stage and
 *  a track that travels sideways, not a GSAP pin: the reader keeps their scroll.
 *  Below lg, and under prefers-reduced-motion, and before hydration, the four
 *  render as a plain stacked run, which is what the server sends. */
export function WorkshopStage({
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
  index?: string;
  title: string;
  strokeTitle?: string;
  items: Format[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const enhanced = useEnhanced("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  /** The track travels one panel width per room, so room i is centred at
   *  progress i/(n-1). */
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(items.length - 1) * 100}vw`]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(items.length - 1, Math.max(0, Math.round(p * (items.length - 1))));
    setActive((prev) => (prev === i ? prev : i));
  });

  const staged = enhanced && !reduced;

  /** Jump the scroll to a room's own slice of the track. Four viewports is a
   *  lot to ask of someone who wants the leadership session, and it also makes
   *  the header's hover states honest: they now respond to something a reader
   *  can actually do. */
  const jump = (i: number) => {
    const el = track.current;
    if (!el) return;
    /* getBoundingClientRect, not offsetTop: the section is position:relative and
       is therefore the track's offsetParent. */
    const start = el.getBoundingClientRect().top + window.scrollY;
    const run = el.getBoundingClientRect().height - window.innerHeight;
    window.scrollTo({ top: start + (i / (items.length - 1)) * run, behavior: "smooth" });
  };

  return (
    <section id={id} data-section={label} className="relative">
      <Container className="relative pt-14 sm:pt-16">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "contrast", label: "Four rooms, one subject" }}
          className="mb-10"
        />
      </Container>

      {staged ? (
        <div ref={track} style={{ height: `${items.length * VH_PER + 100}vh` }} className="relative">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            {/* Which room, and how far along. */}
            <Container className="w-full">
              <div className="flex items-end gap-2">
                {items.map((f, i) => (
                  <button
                    key={f.no}
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === active ? "true" : undefined}
                    className="group min-w-0 flex-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <p
                      className={cn(
                        "font-display truncate text-[0.6875rem] font-bold uppercase tracking-[0.08em] transition-colors duration-500 motion-reduce:transition-none",
                        i === active ? "text-brand-text" : "text-ash group-hover:text-snow",
                      )}
                    >
                      <span className="tabular-nums">{f.no}</span>
                      <span className="ml-2">{f.title}</span>
                    </p>
                    <span
                      className={cn(
                        "mt-2 block h-[3px] w-full transition-colors duration-500 motion-reduce:transition-none",
                        i === active
                          ? "bg-brand"
                          : i < active
                            ? "bg-brand/30"
                            : "bg-line group-hover:bg-ash",
                      )}
                    />
                  </button>
                ))}
              </div>
            </Container>

            {/* The rooms, travelling sideways. */}
            <motion.div className="mt-8 flex" style={{ x }}>
              {items.map((f, i) => (
                <div key={f.no} className="w-screen shrink-0 px-6 sm:px-10">
                  <div className="mx-auto grid max-w-[1320px] items-center gap-x-14 lg:grid-cols-[minmax(0,1.32fr)_minmax(0,0.85fr)]">
                    <Scene kind={f.scene} on={i === active} />
                    <div>
                      <p className="text-[0.9375rem] leading-relaxed text-fog">{f.body}</p>
                      <p className="mt-4 border-l-2 border-brand/40 pl-4 text-[0.9375rem] leading-relaxed text-fog">
                        {f.note}
                      </p>
                      <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ash">
                          Read from
                        </span>
                        <span className="font-display text-[0.9375rem] font-bold uppercase leading-tight text-brand-text">
                          {f.cite}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      ) : (
        <Container className="pb-14 sm:pb-16">
          <ol className="space-y-16">
            {items.map((f) => (
              <li key={f.no}>
                <p className="font-display text-[0.625rem] font-bold tabular-nums text-brand-text">
                  {f.no}
                </p>
                <h3 className="font-display mt-2 text-[clamp(1.25rem,4.5vw,1.8rem)] font-extrabold uppercase leading-[1.1] text-snow">
                  {f.title}
                </h3>
                <div className="mt-6">
                  <Scene kind={f.scene} on />
                </div>
                <p className="mt-6 text-[0.9375rem] leading-relaxed text-fog">{f.body}</p>
                <p className="mt-4 border-l-2 border-brand/40 pl-4 text-[0.9375rem] leading-relaxed text-fog">
                  {f.note}
                </p>
                <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ash">
                    Read from
                  </span>
                  <span className="font-display text-[0.9375rem] font-bold uppercase leading-tight text-brand-text">
                    {f.cite}
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </Container>
      )}
    </section>
  );
}


/* -------------------------------------------------------------- the scenes -- */

const W = 720;
const H = 440;

/** One format, drawn as its own thing. The frame is shared so the four read as
 *  a set; nothing inside it is. */
function Scene({ kind, on }: { kind: Format["scene"]; on: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-ink-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden>
        <rect x="0" y="0" width={W} height={H} fill="var(--color-ink-3)" />
        {kind === "fail" && <Fail on={on} />}
        {kind === "work" && <Work on={on} />}
        {kind === "judge" && <Judge on={on} />}
        {kind === "period" && <Period on={on} />}
      </svg>
    </div>
  );
}

/** A run of text on a surface. Bars, never words. */
function Lines({
  x,
  y,
  w,
  gap = 16,
  widths,
  fill = "var(--color-ash)",
  opacity = 0.42,
  h = 7,
}: {
  x: number;
  y: number;
  w: number;
  gap?: number;
  widths: number[];
  fill?: string;
  opacity?: number;
  h?: number;
}) {
  return (
    <>
      {widths.map((f, i) => (
        <rect
          key={i}
          x={x}
          y={y + i * gap}
          width={w * f}
          height={h}
          rx={h / 2}
          fill={fill}
          fillOpacity={opacity}
        />
      ))}
    </>
  );
}

/* -- 01 ---------------------------------------------------------------------- */

/** THE DEMONSTRATION. Head on at the board, because everyone in the room is.
 *  One output, and the line in it that is wrong: the session is about what the
 *  tools do and where they commonly fail, and the failure is the subject. */
function Fail({ on }: { on: boolean }) {
  const mark = on ? "var(--color-brand)" : "var(--color-ash)";
  const BAD = 3;
  const ROWS = [0.92, 0.74, 0.86, 0.7, 0.8, 0.56];
  return (
    <>
      {/* The board. */}
      <rect x="72" y="44" width="576" height="300" rx="10" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="2" />
      {/* What is on it: a prompt, then what came back. */}
      <rect x="104" y="76" width="240" height="12" rx="6" fill="var(--color-snow)" fillOpacity="0.28" />
      <line x1="104" y1="108" x2="616" y2="108" stroke="var(--color-line)" strokeWidth="1.5" />

      {ROWS.map((f, i) => (
        <rect
          key={i}
          x="104"
          y={132 + i * 30}
          width={512 * f}
          height="10"
          rx="5"
          fill="var(--color-ash)"
          fillOpacity={i === BAD ? 0.5 : 0.34}
        />
      ))}

      {/* The one that is wrong, and the mark a person leaves on it. The mark is
          drawn statically and the animated stroke traces over it: ci-draw is
          invisible for part of every cycle, and the fault is the whole subject
          of this format, so it may not blink out of existence. */}
      <rect x="80" y={132 + BAD * 30 - 6} width="8" height="22" rx="4" fill={mark} />
      <rect
        x="100"
        y={132 + BAD * 30 + 14}
        width={512 * ROWS[BAD] + 12}
        height="4"
        rx="2"
        fill={mark}
        fillOpacity="0.35"
      />
      <path
        className="ci-draw"
        d={`M100 ${132 + BAD * 30 + 16} H${104 + 512 * ROWS[BAD] + 8}`}
        pathLength={100}
        stroke={mark}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* The room, implied at the very front: bench tops, nothing to count. */}
      <rect x="8" y="382" width="300" height="18" rx="9" fill="var(--color-void)" fillOpacity="0.16" />
      <rect x="330" y="382" width="382" height="18" rx="9" fill="var(--color-void)" fillOpacity="0.16" />
      <rect x="56" y="414" width="250" height="16" rx="8" fill="var(--color-void)" fillOpacity="0.09" />
      <rect x="332" y="414" width="330" height="16" rx="8" fill="var(--color-void)" fillOpacity="0.09" />
    </>
  );
}

/* -- 02 ---------------------------------------------------------------------- */

/** HANDS ON THE TABLE, from overhead. The camera changes completely, because
 *  what changes is that people are working rather than watching. Their own
 *  tasks are on the table, and the shortlist is forming in the middle of it. */
function Work({ on }: { on: boolean }) {
  const mark = on ? "var(--color-brand)" : "var(--color-ash)";
  return (
    <>
      {/* The table, seen from directly above. */}
      <rect x="26" y="26" width="668" height="388" rx="18" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="2" />

      {/* Four places, each with a machine and the task that belongs to it. */}
      {[
        { x: 58, y: 58, r: -4 },
        { x: 470, y: 52, r: 5 },
        { x: 52, y: 250, r: 3 },
        { x: 476, y: 254, r: -6 },
      ].map((s, i) => (
        <g key={i} transform={`rotate(${s.r} ${s.x + 90} ${s.y + 60})`}>
          <rect x={s.x} y={s.y} width="180" height="118" rx="8" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1.5" />
          <rect x={s.x + 10} y={s.y + 10} width="160" height="78" rx="4" fill="var(--color-void)" fillOpacity="0.1" />
          <Lines x={s.x + 20} y={s.y + 22} w={140} gap={13} widths={[0.9, 0.66, 0.8]} h={6} />
          <rect x={s.x + 62} y={s.y + 96} width="56" height="8" rx="4" fill="var(--color-ash)" fillOpacity="0.3" />
        </g>
      ))}

      {/* Paper: their own tasks, brought to the day. */}
      <g transform="rotate(-7 300 150)">
        <rect x="266" y="96" width="120" height="150" rx="5" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1.5" />
        <Lines x={280} y={112} w={92} gap={13} widths={[0.94, 0.7, 0.86, 0.6, 0.9, 0.5]} h={5} />
      </g>

      {/* What the day ends with, forming in the middle of the table. */}
      <g transform="rotate(4 372 300)">
        <rect x="292" y="238" width="160" height="150" rx="5" fill="var(--color-ink-3)" stroke={mark} strokeWidth="2" />
        <rect x="306" y="252" width="76" height="8" rx="4" fill={mark} fillOpacity="0.75" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <circle cx="312" cy={280 + i * 21} r="4.5" fill="none" stroke={mark} strokeWidth="1.6" />
            <circle
              className="ci-blink"
              cx="312"
              cy={280 + i * 21}
              r="4.5"
              fill={mark}
              style={{ animationDelay: `${(i * 1.2).toFixed(2)}s` }}
            />
            <rect x="324" y={276 + i * 21} width={112 * [0.92, 0.74, 0.86, 0.6, 0.78][i]} height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.36" />
          </g>
        ))}
      </g>
    </>
  );
}

/* -- 03 ---------------------------------------------------------------------- */

/** THE JUDGEMENT. Not a room at all: the proposals themselves, and what this
 *  session reviews them against. One is taken forward and one is set aside,
 *  because the session exists to "evaluate proposed AI projects, challenge
 *  unrealistic claims and make informed decisions". Nothing is scored: the rows
 *  on each card are the three things the document names, unfilled. */
function Judge({ on }: { on: boolean }) {
  const mark = on ? "var(--color-brand)" : "var(--color-ash)";
  const CARDS = [
    { x: 44, y: 118, rot: -6, state: "aside" },
    { x: 262, y: 74, rot: 0, state: "up" },
    { x: 480, y: 122, rot: 6, state: "held" },
  ] as const;
  return (
    <>
      {[...CARDS].map((c) => {
        const up = c.state === "up";
        const aside = c.state === "aside";
        return (
          <g key={c.x} transform={`rotate(${c.rot} ${c.x + 98} ${c.y + 110})`} opacity={aside ? 0.45 : 1}>
            <rect
              x={c.x}
              y={c.y}
              width="196"
              height="222"
              rx="10"
              fill="var(--color-ink-3)"
              stroke={up ? mark : "var(--color-line)"}
              strokeWidth={up ? 3 : 2}
            />
            {/* What is being proposed. */}
            <rect x={c.x + 20} y={c.y + 22} width="120" height="10" rx="5" fill="var(--color-snow)" fillOpacity="0.3" />
            <line x1={c.x + 20} y1={c.y + 50} x2={c.x + 176} y2={c.y + 50} stroke="var(--color-line)" strokeWidth="1.5" />
            {/* The three the session reviews it against. */}
            {[0, 1, 2].map((r) => (
              <g key={r}>
                <rect x={c.x + 20} y={c.y + 66 + r * 34} width="52" height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.4" />
                <rect x={c.x + 84} y={c.y + 64 + r * 34} width="92" height="12" rx="6" fill="var(--color-void)" fillOpacity="0.07" />
                <rect
                  x={c.x + 84}
                  y={c.y + 64 + r * 34}
                  width={92 * [0.72, 0.44, 0.86][r]}
                  height="12"
                  rx="6"
                  fill={up ? mark : "var(--color-ash)"}
                  fillOpacity={up ? 0.5 : 0.24}
                />
              </g>
            ))}
            {/* Taken forward, or set aside. */}
            {up && (
              <path
                className="ci-draw"
                d={`M${c.x + 66} ${c.y + 190} l16 16 l32 -38`}
                pathLength={100}
                stroke={mark}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            )}
            {aside && (
              <path
                d={`M${c.x + 74} ${c.y + 178} L${c.x + 122} ${c.y + 210} M${c.x + 122} ${c.y + 178} L${c.x + 74} ${c.y + 210}`}
                stroke="var(--color-ash)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>
        );
      })}

      {/* The one that is taken forward stands proud of the other two. */}
      <rect x="262" y="308" width="196" height="6" rx="3" fill={mark} fillOpacity="0.25" />
    </>
  );
}

/* -- 04 ---------------------------------------------------------------------- */

/** THE PERIOD. Also not a room: the schedule, because this format's subject is
 *  the time between sittings. Departments run down, the agreed period runs
 *  across, sessions are the marks on it and the spans between them are where
 *  the applying happens. Nothing is dated and nothing is counted in weeks: the
 *  document names no duration. */
function Period({ on }: { on: boolean }) {
  const mark = on ? "var(--color-brand)" : "var(--color-ash)";
  const ROWS = [96, 174, 252, 330];
  const SESSIONS = [140, 300, 460, 620];
  return (
    <>
      {/* The period. */}
      <line x1="112" y1="56" x2="656" y2="56" stroke="var(--color-line)" strokeWidth="2" />
      {SESSIONS.map((x, i) => (
        <g key={x}>
          <line x1={x} y1="46" x2={x} y2="366" stroke="var(--color-line)" strokeWidth="1.5" strokeDasharray="5 7" />
          <circle
            className="ci-blink"
            cx={x}
            cy="56"
            r="7"
            fill={mark}
            style={{ animationDelay: `${(i * 1.5).toFixed(2)}s` }}
          />
          <circle cx={x} cy="56" r="7" fill="none" stroke={mark} strokeWidth="2" />
        </g>
      ))}

      {/* Each department's own run through it. */}
      {ROWS.map((y) => (
        <g key={y}>
          <rect x="40" y={y - 9} width="52" height="18" rx="9" fill="var(--color-ash)" fillOpacity="0.22" />
          <line x1="112" y1={y} x2="656" y2={y} stroke="var(--color-line)" strokeWidth="1.5" />
          {/* Every department sits every session. Fading the later ones by row
              would say some get fewer, which the document does not. */}
          {SESSIONS.map((x) => (
            <rect
              key={x}
              x={x - 13}
              y={y - 13}
              width="26"
              height="26"
              rx="6"
              fill="var(--color-ink-3)"
              stroke={mark}
              strokeWidth="2"
            />
          ))}
          {/* The gap between sittings, where what was learned gets applied. */}
          {SESSIONS.slice(0, -1).map((x, i) => (
            <rect
              key={x}
              x={x + 17}
              y={y - 3}
              width={SESSIONS[i + 1] - x - 34}
              height="6"
              rx="3"
              fill="var(--color-ash)"
              fillOpacity="0.3"
            />
          ))}
        </g>
      ))}

      {/* Coming back with what the gap produced. */}
      <path
        className="ci-draw"
        d="M300 392 H448 a14 14 0 0 0 14 -14 V72"
        pathLength={100}
        stroke={mark}
        strokeWidth="2"
        strokeOpacity="0.75"
        fill="none"
      />
      <path
        d="M456 84 L462 71 L468 84"
        stroke={mark}
        strokeWidth="2"
        strokeOpacity="0.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}
