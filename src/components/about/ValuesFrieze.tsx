"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { CoreValue } from "@/content/about-us";
import { cn } from "@/lib/cn";

/** The three core values, as three drawings standing on one ground.
 *
 *  WHY THREE DRAWINGS AND NOT ONE IN THREE STATES. docs/DESIGN.md rule 7: a
 *  single drawing that only changes state "collapses into the one abstract
 *  shape" its subjects have in common. Handling a client's business exactly as
 *  you would your own, a deep-rooted enthusiasm, and being the vigilant eyes
 *  and ears have no shape in common, so each value gets its own picture, drawn
 *  from the object in its own sentence.
 *
 *  WHY A FRIEZE AND NOT A ROW OF CARDS. Three equal cards say the three values
 *  are interchangeable, and this document does not. So there are no cards: no
 *  panel, no radius, no shadow -- three drawings at three deliberately unequal
 *  widths, sitting on one continuous ground line, with type set beneath them on
 *  the page's own ground. That is the treatment `CasePlate` uses for pictures
 *  and the reason it is "not a card".
 *
 *  THE ALIGNMENT IS FREE, NOT MEASURED. All three drawings share a 400-unit
 *  viewBox height with the ground at y=250, and the three columns are sized
 *  520fr / 420fr / 620fr -- exactly their viewBox widths. Proportional columns
 *  give identical rendered heights, so the three ground lines land on the same
 *  row with no effect, no ref and nothing to re-measure when the copy reflows.
 *
 *  ONE DRAWING BREAKS THE GROUND, ON PURPOSE. The middle value's own word is
 *  "deep-rooted", so it is the only one that goes below the line, and the
 *  hatching -- the notation a geological section uses -- runs the full depth in
 *  its column and only a band deep in the other two. The ground is drawn deep
 *  where something is actually in it.
 *
 *  EVERY DRAWING ANSWERS ONE QUESTION AND CARRIES ONE INTERACTION. The sheets
 *  take an entry on whichever row the pointer is on -- on both sheets, at the
 *  same instant, at the same length, which is the sentence. The root thickens
 *  the tap belonging to whichever half of its sentence is being pointed at. The
 *  eye follows the pointer, because that is what "vigilant" means and it is the
 *  one thing a drawing can say that the word cannot.
 *
 *  NOTHING IS SET IN SVG <text>. The two sheet labels are HTML, at the site's
 *  11px floor: text inside a viewBox scales with the box and lands at 6px on a
 *  phone. */

const EYE = { cx: 326, cy: 150 };

/** Entry lengths, one per row. The same array draws both sheets, which is the
 *  point of the drawing: the two are identical, not merely similar. */
const ENTRIES = [122, 96, 138, 110, 84, 130, 104] as const;
const ROW_Y = ENTRIES.map((_, k) => 108 + k * 20);
const SHEET_X = [44, 286] as const;

/** Diagonal hatch under the ground line -- the notation a geological section
 *  uses, and the thing that stops a line over a fade reading as an area chart.
 *
 *  INKED IN ASH, NOT --color-line. docs/DESIGN.md rule 5: the hairline token is
 *  1.1:1 against the light ground and 1.4:1 against the dark one, so it is for
 *  borders and never for anything a reader has to see. The hatch says "this is
 *  below the surface", which is meaning. It is kept quiet with opacity at the
 *  call site instead, which is a tone decision rather than a token misuse. */
function Hatch({ id }: { id: string }) {
  return (
    <pattern
      id={id}
      width="9"
      height="9"
      patternTransform="rotate(45)"
      patternUnits="userSpaceOnUse"
    >
      <line x1="0" y1="0" x2="0" y2="9" stroke="var(--color-ash)" strokeWidth="1" />
    </pattern>
  );
}

/** Ground line plus its hatch. `deep` runs the hatch to the foot of the box. */
function Ground({ w, hatchId, deep = false }: { w: number; hatchId: string; deep?: boolean }) {
  return (
    <>
      <rect
        x="0"
        y="250"
        width={w}
        height={deep ? 150 : 30}
        fill={`url(#${hatchId})`}
        opacity={deep ? 0.34 : 0.5}
      />
      <line x1="0" y1="250" x2={w} y2="250" stroke="var(--color-ash)" strokeWidth="1.4" />
    </>
  );
}

/* ------------------------------------------------------------- 01 twin sheets */

/** "We handle our clients' businesses with the same care and integrity as we
 *  would our own." Two sheets, and one entry that lands on both at once. */
function TwinSheets({ row, reduced }: { row: number | null; reduced: boolean }) {
  /* WHAT THE STILL HAS TO SHOW. `ci-blink` rests at `opacity: 0` -- it is a
     travelling light, and what it travels over is the drawn state. So the
     entries are drawn unconditionally and only the MARK blinks; under reduced
     motion the mark simply sits on one row. Two identical filled sheets with
     the same row marked on both is the most explanatory state this drawing
     has, and it is now also its resting one. */
  return (
    <svg viewBox="0 0 520 400" className="h-auto w-full" aria-hidden fill="none">
      <defs>
        <Hatch id="ab-h-sheets" />
      </defs>
      <Ground w={520} hatchId="ab-h-sheets" />

      {SHEET_X.map((ox) => (
        <g key={ox}>
          <rect
            x={ox}
            y="62"
            width="190"
            height="188"
            fill="var(--color-void)"
            stroke="var(--color-fog)"
            strokeWidth="1.6"
          />
          {/* The sheet's own heading rule. */}
          <line
            x1={ox + 16}
            y1="84"
            x2={ox + 90}
            y2="84"
            stroke="var(--color-ash)"
            strokeWidth="3"
          />
          {ROW_Y.map((y, k) => {
            /* Under reduced motion the middle row is the marked one. Otherwise
               the pointer's row is, and with no pointer the mark walks the rows
               on `ci-blink`. */
            const marked = reduced ? k === 3 : row === k;
            const walking = !reduced && row === null;
            return (
              <g key={y}>
                <line
                  x1={ox + 16}
                  y1={y}
                  x2={ox + 174}
                  y2={y}
                  stroke="var(--color-ash)"
                  strokeWidth="1"
                  opacity="0.5"
                />
                {/* THE ENTRIES ARE ALWAYS THERE. The first build drew nothing
                    but the marked entry and let `ci-blink` carry the rest,
                    which meant that for five of every six seconds the two
                    sheets were blank ruled paper: the drawing spent most of its
                    life failing to make the only claim it exists to make. Both
                    sheets now carry every entry, at lengths from ENTRIES, so
                    the two are visibly identical at rest -- and what moves is
                    which row is MARKED. */}
                <rect
                  x={ox + 16}
                  y={y - 5.3}
                  width={ENTRIES[k]}
                  height="2.6"
                  rx="1.3"
                  fill="var(--color-ash)"
                />
                {/* The mark: the same row, on both sheets, at the same instant.
                    A rect rather than a line because `ci-blink` scales about its
                    own fill-box and a horizontal line's box has no height. */}
                <rect
                  x={ox + 16}
                  y={y - 5.3}
                  width={ENTRIES[k]}
                  height="2.6"
                  rx="1.3"
                  fill="var(--color-brand)"
                  className={walking ? "ci-blink" : undefined}
                  style={
                    walking
                      ? { animationDelay: `${((k * 6) / ROW_Y.length).toFixed(3)}s` }
                      : {
                          opacity: marked ? 1 : 0,
                          transition: "opacity 0.3s cubic-bezier(0.16,1,0.3,1)",
                        }
                  }
                />
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------- 02 the root */

/** "a deep-rooted enthusiasm for our work and a genuine passion for both our
 *  craft and the partners we collaborate with." A small crown, a deep root,
 *  and it forks into the two things the sentence says it feeds. */
/** WHY 420 UNITS WIDE AND NOT 300. The frieze sizes its columns to the
 *  drawings' own viewBox widths, so a narrow drawing gets a narrow column --
 *  and at 300 this one's copy column came out 240px, about twenty-eight
 *  characters, which is below anything readable on this site. Widening the root
 *  (and spreading its laterals to match) buys the column back without touching
 *  the other two. */
const TAPS = [
  "M210 283C200 308 172 326 138 388",
  "M210 283C222 308 250 324 282 386",
] as const;

function DeepRoot({ tap, reduced }: { tap: number | null; reduced: boolean }) {
  return (
    <svg viewBox="0 0 420 400" className="h-auto w-full" aria-hidden fill="none">
      <defs>
        <Hatch id="ab-h-root" />
      </defs>
      <Ground w={420} hatchId="ab-h-root" deep />

      {/* Above ground: a small crown, deliberately smaller than what is under
          it. The sentence says deep-rooted, not tall. */}
      <path d="M210 250L210 204" stroke="var(--color-fog)" strokeWidth="2.4" />
      <path
        d="M210 226C192 221 182 208 182 193C200 195 210 208 210 223Z"
        fill="var(--color-void)"
        stroke="var(--color-fog)"
        strokeWidth="1.5"
      />
      <path
        d="M210 218C228 213 238 200 238 185C220 187 210 200 210 215Z"
        fill="var(--color-void)"
        stroke="var(--color-fog)"
        strokeWidth="1.5"
      />

      {/* The taproot, down to the fork. */}
      <path d="M210 250L210 283" stroke="var(--color-fog)" strokeWidth="2.8" />

      {TAPS.map((d, i) => {
        const on = tap === i;
        return (
          <g key={d}>
            <path
              d={d}
              stroke={on ? "var(--color-brand)" : "var(--color-fog)"}
              strokeWidth={on ? 3.4 : 2.2}
              strokeLinecap="round"
              style={{
                transition:
                  "stroke 0.5s cubic-bezier(0.16,1,0.3,1), stroke-width 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
            {/* The packet travelling down the tap. `ci-flow` is drawn against
                pathLength="100" and switches its own vector-effect off, which
                is why it may not sit on the base path — a dash pattern on the
                base path would render the root itself dotted.

                It is dropped entirely under reduced motion rather than left to
                the global duration collapse: stopped, `ci-flow` rests as a
                14-unit dash at the head of the path and a gap after it, which
                reads as a broken root. The base path above is the drawn state. */}
            {!reduced && (
              <path
                d={d}
                className="ci-flow"
                pathLength="100"
                stroke="var(--color-brand)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ animationDelay: `${i * 1.4}s` }}
              />
            )}
          </g>
        );
      })}

      {/* Fine laterals. Ash, not line: they carry the reading. */}
      {[
        "M194 308L160 314",
        "M180 330L144 332",
        "M164 354L128 352",
        "M228 308L264 312",
        "M242 328L280 328",
        "M260 352L296 348",
        "M138 388L126 398",
        "M282 386L294 397",
      ].map((d) => (
        <path key={d} d={d} stroke="var(--color-ash)" strokeWidth="1.3" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/* --------------------------------------------------------------- 03 the watch */

/** "being alert and proactive is essential… the vigilant eyes and ears for our
 *  clients." An eye over a landscape, already turned toward what is arriving. */
function WatchPost() {
  return (
    <svg viewBox="0 0 620 400" className="h-auto w-full" aria-hidden fill="none">
      <defs>
        <Hatch id="ab-h-watch" />
      </defs>
      <Ground w={620} hatchId="ab-h-watch" />

      {/* Three signals crossing the landscape toward the watch. They travel in
          user units inside the viewBox, which is what `ab-approach` is written
          for; at rest they stand where they are drawn. */}
      {[
        { x: 548, s: 1 },
        { x: 470, s: 0.82 },
        { x: 414, s: 0.66 },
      ].map(({ x, s }, i) => {
        const h = 26 * s;
        return (
          <g
            key={x}
            className="ab-approach"
            style={{ animationDelay: `${(i * 5.2) / 3}s` }}
          >
            <path
              d={`M${x} 250L${x} ${250 - h}`}
              stroke="var(--color-fog)"
              strokeWidth={1.8 * s}
            />
            <circle cx={x} cy={250 - h} r={3.4 * s} fill="var(--color-fog)" />
            {/* Arcs opening toward the eye: the thing is heard before it lands. */}
            {[14, 24, 34].map((r) => (
              <path
                key={r}
                d={`M${x - r * 0.72} ${250 - h - r * 0.7}A${r} ${r} 0 0 0 ${x - r * 0.72} ${250 - h + r * 0.7}`}
                stroke="var(--color-ash)"
                strokeWidth="1"
                opacity="0.75"
              />
            ))}
          </g>
        );
      })}

      {/* The eye. */}
      <path
        d="M212 150C246 96 354 96 388 150C354 204 246 204 212 150Z"
        fill="var(--color-void)"
        stroke="var(--color-fog)"
        strokeWidth="1.8"
      />
      <path d="M206 128C240 88 360 88 394 128" stroke="var(--color-ash)" strokeWidth="1.3" />
      {/* The iris travels with the pointer, clamped, through two custom
          properties written straight to the section. No state, no re-render,
          and it rests dead centre where there is no pointer at all. */}
      <g
        style={{
          transform: "translate(var(--ex, 0px), var(--ey, 0px))",
          transition: "transform 0.18s linear",
        }}
      >
        <circle
          cx={EYE.cx}
          cy={EYE.cy}
          r="23"
          fill="none"
          stroke="var(--color-fog)"
          strokeWidth="1.6"
        />
        <circle cx={EYE.cx} cy={EYE.cy} r="9" fill="var(--color-brand)" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------- section */

export function ValuesFrieze({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
  /** The two halves of the middle value's sentence, verbatim, in its order.
   *  Pointing at one thickens its own tap on the root. */
  rootMarks,
  /** The two sheet labels, verbatim from the first value's sentence. */
  sheetLabels,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: CoreValue[];
  rootMarks: readonly [string, string];
  sheetLabels: readonly [string, string];
}) {
  const reduced = usePrefersReducedMotion();
  const [row, setRow] = useState<number | null>(null);
  const [tap, setTap] = useState<number | null>(null);
  const watchRef = useRef<HTMLDivElement>(null);

  /* Which ledger row the pointer is on. Only pushed when it changes, so a
     sweep across the drawing costs seven renders at most. */
  const trackRow = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    /* The rows occupy y=108..228 of a 400-unit box. */
    const y = ((e.clientY - r.top) / r.height) * 400;
    const k = Math.round((y - 108) / 20);
    const next = k < 0 || k >= ROW_Y.length ? null : k;
    setRow((prev) => (prev === next ? prev : next));
  };

  /* The eye. Two custom properties, clamped to the iris's travel. */
  const trackEye = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = watchRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
    const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    el.style.setProperty("--ex", `${(nx * 30).toFixed(1)}px`);
    el.style.setProperty("--ey", `${(ny * 14).toFixed(1)}px`);
  };

  const restEye = () => {
    const el = watchRef.current;
    if (!el) return;
    el.style.removeProperty("--ex");
    el.style.removeProperty("--ey");
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />

        {/* THE FRIEZE. Columns sized to the drawings' own viBoxes, so the three
            ground lines land on one row without a single measurement. */}
        <div className="grid gap-x-10 gap-y-16 lg:gap-y-0 lg:[grid-template-columns:520fr_420fr_620fr]">
          {/* ------------------------------------------- 01 transparency */}
          <div className="flex min-w-0 flex-col">
            <div className="relative" onPointerMove={trackRow} onPointerLeave={() => setRow(null)}>
              <TwinSheets row={row} reduced={reduced} />
              {/* The two labels, HTML at the 11px floor, sitting in the band the
                  drawing leaves under its ground line. Each is a phrase from
                  the value's own sentence, so nothing here is written by us. */}
              <div className="absolute inset-x-0 bottom-0 top-[74%] flex items-start">
                {sheetLabels.map((text, i) => (
                  <span
                    key={text}
                    className={cn(
                      "flex-1 text-center text-[0.6875rem] font-semibold uppercase leading-tight",
                      i === 0 ? "text-ash" : "text-brand-text",
                    )}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
            <ValueCopy value={items[0]} className="mt-8" />
          </div>

          {/* ---------------------------------------------- 02 passion */}
          <div className="flex min-w-0 flex-col">
            <DeepRoot tap={tap} reduced={reduced} />
            <ValueCopy value={items[1]} className="mt-8">
              <ul className="mt-5 space-y-px">
                {rootMarks.map((text, i) => (
                  <li key={text}>
                    <button
                      type="button"
                      onPointerEnter={() => setTap(i)}
                      onPointerLeave={() => setTap(null)}
                      onFocus={() => setTap(i)}
                      onBlur={() => setTap(null)}
                      onClick={() => setTap((v) => (v === i ? null : i))}
                      aria-pressed={tap === i}
                      className="group flex w-full items-center gap-3 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-px shrink-0 transition-all duration-500 motion-reduce:transition-none",
                          tap === i ? "w-12 bg-brand" : "w-6 bg-line group-hover:w-9",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm leading-snug transition-colors duration-500 motion-reduce:transition-none",
                          tap === i ? "font-semibold text-brand-text" : "text-fog group-hover:text-snow",
                        )}
                      >
                        {text}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </ValueCopy>
          </div>

          {/* ------------------------------------------ 03 proactiveness */}
          <div className="flex min-w-0 flex-col">
            <div ref={watchRef} onPointerMove={trackEye} onPointerLeave={restEye}>
              <WatchPost />
            </div>
            <ValueCopy value={items[2]} className="mt-8" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** One value's words. `h3`, then the document's own sentences, one `<p>` each.
 *  No panel and no border: the frieze's drawings are the only objects in this
 *  section, and a card around the copy would put them back in a grid. */
function ValueCopy({
  value,
  className,
  children,
}: {
  value: CoreValue;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Rise className={cn("min-w-0", className)}>
      <h3 className="font-display text-xl font-extrabold uppercase leading-[1.12] text-snow sm:text-2xl">
        {value.title}
      </h3>
      {value.body.map((para) => (
        <p key={para} className="mt-4 max-w-[46ch] leading-relaxed text-fog">
          <Marked text={para} mark="deep-rooted" />
        </p>
      ))}
      {children}
    </Rise>
  );
}
