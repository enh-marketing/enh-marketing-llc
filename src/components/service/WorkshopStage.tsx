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
        {kind === "consistency" && <Consistency on={on} />}
        {kind === "work" && <Work on={on} />}
        {kind === "judge" && <Judge on={on} />}
        {kind === "foundation" && <Foundation on={on} />}
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

/** WHAT THE HALF DAY IS FOR. Not a demonstration of failure: that is what the
 *  hero of this page already draws, and it is only one of the four things this
 *  session covers. The sentence that belongs to this format and to no other is
 *  "have experimented with tools such as ChatGPT without developing a
 *  consistent way to use them". The subject is inconsistency.
 *
 *  So the drawing is the same task attempted four ways by four people, each at
 *  its own angle and its own length with nothing shared, and then the same four
 *  after the session: one shape, one order, aligned. The session's own contents
 *  are what makes them line up, and the document names them: everyday work
 *  applications, basic prompting, output checking and safe usage.
 *
 *  NOTHING IS TRANSCRIBED. The attempts are bars. No prompt is written, no
 *  output is invented, and neither side is scored: the left is not wrong, it is
 *  unaligned, which is exactly what the document says. */
function Consistency({ on }: { on: boolean }) {
  const mark = on ? "var(--color-brand)" : "var(--color-ash)";
  /** Four attempts at one task. Every one a different size, angle and shape,
   *  because that is the state the session finds them in. */
  const LOOSE = [
    { x: 44, y: 62, w: 168, h: 96, rot: -8, rows: [0.86, 0.5] },
    { x: 176, y: 176, w: 132, h: 118, rot: 6, rows: [0.7, 0.9, 0.44] },
    { x: 30, y: 236, w: 150, h: 78, rot: 4, rows: [0.92] },
    { x: 152, y: 322, w: 176, h: 84, rot: -5, rows: [0.6, 0.8] },
  ];
  return (
    <>
      {/* Four people, four ways, nothing shared. */}
      {LOOSE.map((c, i) => (
        <g key={i} transform={`rotate(${c.rot} ${c.x + c.w / 2} ${c.y + c.h / 2})`}>
          <rect
            x={c.x}
            y={c.y}
            width={c.w}
            height={c.h}
            rx="8"
            fill="var(--color-ink-2)"
            stroke="var(--color-line)"
            strokeWidth="2"
          />
          <rect x={c.x + 14} y={c.y + 14} width={c.w * 0.42} height="8" rx="4" fill="var(--color-ash)" fillOpacity="0.55" />
          {c.rows.map((f, r) => (
            <rect
              key={r}
              x={c.x + 14}
              y={c.y + 36 + r * 18}
              width={(c.w - 28) * f}
              height="7"
              rx="3.5"
              fill="var(--color-ash)"
              fillOpacity="0.3"
            />
          ))}
        </g>
      ))}

      {/* What the session puts between them. */}
      <line x1="368" y1="40" x2="368" y2="400" stroke="var(--color-line)" strokeWidth="2" strokeDasharray="6 8" />
      <g>
        <circle cx="368" cy="220" r="22" fill="var(--color-ink-3)" stroke={mark} strokeWidth="2.5" />
        <path
          className="ci-draw"
          d="M356 220 H380 M372 212 L380 220 L372 228"
          pathLength={100}
          stroke={mark}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M356 220 H380 M372 212 L380 220 L372 228"
          stroke={mark}
          strokeWidth="2.5"
          strokeOpacity="0.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* The same four, one way. */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x="428"
            y={62 + i * 86}
            width="248"
            height="70"
            rx="8"
            fill="var(--color-ink-2)"
            stroke={mark}
            strokeWidth="2"
            strokeOpacity={0.55}
          />
          <rect x="444" y={78 + i * 86} width="104" height="8" rx="4" fill={mark} fillOpacity="0.55" />
          <rect x="444" y={100 + i * 86} width="216" height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.32" />
          <rect x="444" y={114 + i * 86} width="164" height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.32" />
          {/* The light walks the aligned set, because it is one method now. */}
          <circle cx="666" cy={97 + i * 86} r="4" fill="none" stroke={mark} strokeWidth="1.6" />
          <circle
            className="ci-blink"
            cx="666"
            cy={97 + i * 86}
            r="4"
            fill={mark}
            style={{ animationDelay: `${(i * 1.5).toFixed(2)}s` }}
          />
        </g>
      ))}
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

/** WHAT THE MULTI-SESSION PROGRAMME IS FOR. Not a schedule: departments across
 *  and sittings down is a Gantt chart, and every programme in every industry
 *  looks like one. The sentence that belongs to this format and to no other is
 *  "develop more advanced applications once the team has established a reliable
 *  foundation". It builds.
 *
 *  So it is drawn as courses laid one on another. The foundation runs the full
 *  width and is shared, because the basics are the same for everyone. Above it,
 *  each department's courses are its own: "Each department can receive
 *  role-specific exercises, prompts and use cases", so no two columns are laid
 *  the same way. The advanced course sits on top and only where the courses
 *  under it are complete, which is the document's own condition.
 *
 *  NOTHING IS COUNTED OR DATED. No weeks, no session count, no department
 *  names: the document gives none. The number of courses is a structure, not a
 *  measurement. */
function Foundation({ on }: { on: boolean }) {
  const mark = on ? "var(--color-brand)" : "var(--color-ash)";
  const L = 56;
  const R = 664;
  const GAP = 10;
  const COLS = 3;
  const colW = (R - L - GAP * (COLS - 1)) / COLS;
  /** Each department's own courses. Different bonds, because the material is
   *  role-specific; same heights, because it is the same programme. */
  const BONDS = [
    [[0.46, 0.54], [0.62, 0.38], [1]],
    [[0.34, 0.66], [1], [0.5, 0.5]],
    [[0.7, 0.3], [0.4, 0.6], [0.55, 0.45]],
  ];
  const courseH = 46;
  const baseY = 336;

  return (
    <>
      {/* The foundation. One course, full width, shared. */}
      <rect x={L} y={baseY} width={R - L} height={courseH} rx="4" fill="var(--color-ink-2)" stroke={mark} strokeWidth="2.5" />
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={L + (R - L) * f}
          y1={baseY}
          x2={L + (R - L) * f}
          y2={baseY + courseH}
          stroke={mark}
          strokeWidth="1.5"
          strokeOpacity="0.35"
        />
      ))}
      <rect x={L} y={baseY} width={R - L} height={courseH} rx="4" fill={mark} fillOpacity="0.08" />

      {/* Each department's courses, laid on it. */}
      {BONDS.map((col, c) => {
        const x0 = L + c * (colW + GAP);
        return (
          <g key={c}>
            {col.map((course, k) => {
              const y = baseY - (k + 1) * (courseH + 8);
              let cursor = x0;
              return course.map((f, b) => {
                const w = colW * f - (b < course.length - 1 ? 6 : 0);
                const rect = (
                  <rect
                    key={`${k}-${b}`}
                    x={cursor}
                    y={y}
                    width={w}
                    height={courseH}
                    rx="4"
                    fill="var(--color-ink-2)"
                    stroke="var(--color-line)"
                    strokeWidth="2"
                  />
                );
                cursor += colW * f;
                return rect;
              });
            })}

            {/* The advanced course, on top, only where what is under it is
                complete. */}
            <rect
              x={x0}
              y={baseY - 4 * (courseH + 8)}
              width={colW}
              height={courseH}
              rx="4"
              fill="var(--color-ink-3)"
              stroke={mark}
              strokeWidth="2.5"
            />
            <rect
              x={x0 + 16}
              y={baseY - 4 * (courseH + 8) + 18}
              width={colW - 32}
              height="10"
              rx="5"
              fill={mark}
              fillOpacity="0.4"
            />
            <circle cx={x0 + colW / 2} cy={baseY - 4 * (courseH + 8) - 18} r="5" fill="none" stroke={mark} strokeWidth="1.8" />
            <circle
              className="ci-blink"
              cx={x0 + colW / 2}
              cy={baseY - 4 * (courseH + 8) - 18}
              r="5"
              fill={mark}
              style={{ animationDelay: `${(c * 2).toFixed(2)}s` }}
            />
          </g>
        );
      })}

      {/* The ground it all stands on. */}
      <line x1="30" y1={baseY + courseH + 6} x2="690" y2={baseY + courseH + 6} stroke="var(--color-ash)" strokeWidth="2" strokeOpacity="0.5" />
    </>
  );
}
