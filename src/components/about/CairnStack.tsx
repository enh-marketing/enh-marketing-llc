"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** The cairn: what has been built is what you stand on to build higher.
 *
 *  WHY A CAIRN. This chapter's copy carries no object at all -- "we continue to
 *  strive for growth", "thrive on curiosity", "pushing boundaries" -- and the
 *  house rule is that a section either draws a real thing or it has structure,
 *  never a diagram invented to fill the space. A cairn is the one physical
 *  object that belongs to this copy without being imported into it: it is what
 *  people build at a height, one stone per party that reaches it, and the whole
 *  point of it is that what is already there is what the next climber stands on.
 *  The company is called Explore New Heights.
 *
 *  WHAT IT SAYS THAT THE WORDS DO NOT. The sentence beside it lists four things
 *  the company does. It does not say that they accumulate, that each rests on
 *  the last, or that the founding year is the stone underneath all of them. The
 *  drawing says all three, and removing it loses all three.
 *
 *  THE ARRANGEMENT IS THE POINT, NOT THE ORNAMENT. docs/DESIGN.md withdrew four
 *  sections for being "just a list", and named the reason: "each changed the
 *  ornament and kept the skeleton: one item per row, copy on one side, a
 *  picture on the other". So the copy is not in a column beside the drawing. It
 *  is set at the height of the stone it belongs to, alternating sides, each with
 *  a leader in to its own stone -- an annotated survey drawing rather than a
 *  two-up. The clause positions are read off the stones' own coordinates, which
 *  is the same thing the approved Launch profile does with its stations.
 *
 *  NOTHING IS LABELLED ON THE DRAWING. Not one word sits inside the viewBox.
 *  The four clauses are verbatim substrings of the client's own sentence, and
 *  that sentence is printed once, whole, below the drawing on small screens and
 *  distributed across it on large ones. No word appears twice.
 *
 *  WHY IT LOOKS LIKE THIS, AFTER THREE PASSES. Outlined domes stacked
 *  symmetrically read as a wedding cake, which is what the first two were. What
 *  makes a pile of rock read as a cairn is angular slabs at unequal heights,
 *  offset left and right so the silhouette zig-zags, one thin stone laid across
 *  that overhangs the wrong way, a cap set to one side, and fill -- a hairline
 *  outline will not carry it. Stones are filled with `--color-void`, the page's
 *  own ground and the one surface the section banding never assigns, so they
 *  read as solid against both ink-2 and ink-3 and in both themes.
 *
 *  MOTION. The scroll only decides which index the stack has reached; each
 *  stone's arrival is a CSS transition, so no animation frame runs per stone.
 *  Pointing at a clause previews its stone and clicking holds it -- preview
 *  beats hold beats scroll, which is the house precedence and what lets a touch
 *  reader, who gets no hover and no leave, still work the drawing. Below 1024px
 *  or under prefers-reduced-motion the cairn renders complete, because a
 *  half-built cairn is not an explanatory still.
 *
 *  Vertices are hand-authored. Nothing is computed, so nothing can print a
 *  different final digit in Node than in V8 and cost the route its hydration. */

/** Base first. Stone 0 is the founding slab and is always placed; stones 1-4
 *  arrive one per clause of the client's sentence. */
const STONES = [
  "M78 540L86 486L122 468L252 464L374 470L430 486L446 540Z",
  "M152 468L164 410L198 396L308 394L378 404L414 422L406 466Z",
  "M114 398L142 374L252 364L356 368L396 382L368 396L198 402Z",
  "M184 364L194 302L218 286L282 284L314 298L324 330L316 360Z",
  "M248 286L262 242L288 228L320 244L338 270L326 285L290 290Z",
] as const;

/** Chips at the foot, so the base sits in the ground rather than on it. */
const CHIPS = [
  "M38 540L48 522L70 518L80 530L76 540Z",
  "M446 540L454 524L476 520L492 532L488 540Z",
  "M492 540L502 530L520 530L528 540Z",
  "M12 540L22 530L36 532L38 540Z",
] as const;

/** Where each clause's stone sits vertically, as a percentage of the drawing
 *  box. Read off the stones above against the viewBox's 200-548 range and
 *  written out, so the annotation layer needs no measurement and no effect. */
const CLAUSE_AT = [
  { top: "66.4%", side: "left" },
  { top: "52.6%", side: "right" },
  { top: "35.6%", side: "left" },
  { top: "17.0%", side: "right" },
] as const;

/** The cap's own coordinates, for the summit marker that sits on it. */
const CAP = { cx: 292, cy: 250 };

function Cairn({ placedTo, focus }: { placedTo: number; focus: number | null }) {
  return (
    <svg viewBox="0 200 560 348" className="h-auto w-full" aria-hidden fill="none">
      {/* The ground. Inked in ash, not line: docs/DESIGN.md rule 5 -- a line
          inside a drawing that carries meaning is never --color-line. */}
      <line x1="0" y1="540" x2="560" y2="540" stroke="var(--color-ash)" strokeWidth="1.4" />

      {CHIPS.map((d, i) => (
        <path
          key={`chip-${i}`}
          d={d}
          fill="var(--color-void)"
          stroke="var(--color-ash)"
          strokeWidth="1.2"
        />
      ))}

      {STONES.map((d, i) => {
        /* Stone 0 is the founding slab and is never held back. */
        const placed = i === 0 || placedTo >= i;
        /* The stone the reader is pointing at, or the one just placed. */
        const lit = placed && (focus === null ? i === placedTo && i > 0 : focus === i - 1);
        return (
          <g
            key={`stone-${i}`}
            style={{
              opacity: placed ? 1 : 0,
              transform: placed ? "translateY(0)" : "translateY(-14px)",
              transition:
                "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <path
              d={d}
              fill="var(--color-void)"
              stroke={lit ? "var(--color-brand)" : "var(--color-fog)"}
              strokeWidth={lit ? 2.2 : 1.6}
              strokeLinejoin="miter"
              style={{
                transition:
                  "stroke 0.5s cubic-bezier(0.16,1,0.3,1), stroke-width 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </g>
        );
      })}

      {/* The summit marker, once the cap is on. `ri-ping` is the Insights
          route's own summit ring: already correct about transform-box, already
          in the reduced-motion collapse, and this is the thing it was drawn
          for. Its resting state is a faint ring around the marked point, which
          is what a stopped animation leaves. */}
      {placedTo >= STONES.length - 1 && (
        <g>
          <circle
            className="ri-ping"
            cx={CAP.cx}
            cy={CAP.cy}
            r="13"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="1.4"
            opacity="0.35"
          />
          <circle cx={CAP.cx} cy={CAP.cy} r="3.2" fill="var(--color-brand)" />
        </g>
      )}
    </svg>
  );
}

export function CairnStack({
  id,
  label,
  index,
  title,
  strokeTitle,
  established,
  establishedMark,
  strive,
  striveMark,
  mission,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  established: string;
  /** The founding phrase inside `established`, marked where it stands. */
  establishedMark: string;
  strive: string;
  /** Four verbatim substrings of `strive`, in the order it writes them. */
  striveMark: readonly [string, string, string, string];
  mission: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  /** How far the scroll has built the stack. null on a small screen and under
   *  reduced motion, where the cairn is simply complete rather than frozen at
   *  its start. */
  const [reached, setReached] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [held, setHeld] = useState<number | null>(null);
  const lastPushed = useRef(-1);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      { build: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (!ctx.conditions?.build) return;
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 78%",
          end: "bottom 72%",
          invalidateOnRefresh: true,
          onUpdate(self) {
            /* Four clauses, so four bands; the base stone is already down. */
            const i = Math.min(4, Math.max(0, Math.floor(self.progress * 5)));
            if (i !== lastPushed.current) {
              lastPushed.current = i;
              setReached(i);
            }
          },
        });
        return () => {
          st.kill();
          /* Back to complete, which is the resting state this section renders
             everywhere the scrubbed version does not run. */
          lastPushed.current = -1;
          setReached(null);
        };
      },
    );
    return () => mm.revert();
  }, []);

  /** Preview beats hold beats scroll. `reached` null means "complete". */
  const focus = hover ?? held;
  const placedTo = focus !== null ? focus + 1 : (reached ?? STONES.length - 1);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-12" />

        {/* THE FOUNDING SENTENCE IS A LEDE, NOT A STATEMENT. It was set at
            `.statement` first and that was wrong twice over: at 180 characters
            it ran to seven lines of display-weight type, which reads as a
            second heading rather than as a sentence -- the exact failure
            globals.css records for the six statements that had drifted to
            within 95% of the heading above them -- and `text-wrap: balance`
            squeezed the measure to about half the column on top of it.
            `.statement` is for ONE short load-bearing line, and in this chapter
            that line is the mission, below. */}
        <Rise className="mb-12 lg:mb-16">
          <p className="max-w-[64ch] text-base leading-relaxed text-fog sm:text-lg">
            <Marked text={established} mark={establishedMark} />
          </p>
        </Rise>

        <div ref={trackRef} className="relative mx-auto max-w-[68rem]">
          {/* The drawing, centred, with the annotations in the gutters it
              leaves. */}
          <div className="mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem]">
            <Cairn placedTo={placedTo} focus={focus} />
          </div>

          {/* THE ANNOTATION LAYER. Desktop only: at 375px there is no gutter to
              annotate into, and a leader rule pointing at nothing is worse than
              the register the small screen gets below. */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {striveMark.map((clause, i) => {
              const at = CLAUSE_AT[i];
              const active = focus === i || (focus === null && placedTo === i + 1);
              const onLeft = at.side === "left";
              return (
                <button
                  key={clause}
                  type="button"
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  onClick={() => setHeld((v) => (v === i ? null : i))}
                  aria-pressed={active}
                  style={{ top: at.top }}
                  className={cn(
                    "group pointer-events-auto absolute flex w-[19rem] -translate-y-1/2 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand xl:w-[21rem]",
                    onLeft ? "left-0 flex-row text-right" : "right-0 flex-row-reverse text-left",
                  )}
                >
                  <span
                    className={cn(
                      "flex-1 text-sm leading-snug transition-colors duration-500 motion-reduce:transition-none sm:text-[0.95rem]",
                      active ? "font-semibold text-brand-text" : "text-fog group-hover:text-snow",
                    )}
                  >
                    {clause}
                  </span>
                  {/* The leader in to the stone. It lengthens on the active
                      clause, which is the house rule treatment. */}
                  <span
                    aria-hidden
                    className={cn(
                      "h-px shrink-0 transition-all duration-500 motion-reduce:transition-none",
                      active ? "w-20 bg-brand" : "w-10 bg-line group-hover:w-16",
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* THE SMALL-SCREEN READING. The same four clauses as a register under
              the complete cairn, and the sentence they came from is still one
              sentence: the opener carries them in order and nothing is
              reworded. No leader rules, because there is nothing to lead to. */}
          <ol className="mt-10 grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:hidden">
            {striveMark.map((clause, i) => (
              <li key={clause} className="flex items-start gap-4 bg-void px-5 py-5">
                <span
                  aria-hidden
                  className="font-display text-sm font-extrabold leading-none text-brand-text"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-snug text-fog">{clause}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* The sentence the clauses were read out of, whole, and the mission
            under it. Printing the sentence here is what lets the annotations
            above be fragments without any word going missing from the page. */}
        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Rise>
            <p className="max-w-[62ch] text-base leading-relaxed text-fog sm:text-lg">
              <Marked text={strive} mark={[...striveMark]} className="font-semibold text-snow" />
            </p>
          </Rise>
          {/* The mission takes the chapter's one display-weight paragraph: it
              is short enough for it, and it is the sentence the whole chapter
              is arguing toward. */}
          <Rise delay={0.1}>
            <p className="statement max-w-[34ch] border-l-2 border-brand/40 pl-6 leading-[1.28] text-snow">
              {mission}
            </p>
          </Rise>
        </div>
      </Container>
    </section>
  );
}
