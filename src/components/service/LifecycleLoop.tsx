"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion, useEnhanced } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import type { Stage } from "@/content/industries/ecommerce-retail";

/** Six stages, drawn as a spiral rather than as a ladder or a ring.
 *
 *  WHY A SPIRAL, AND IT IS THE DOCUMENT'S OWN SHAPE. Stage 6 does not end the
 *  work: "We report on sales, enquiries, costs and customer behaviour. The next
 *  priorities come from the products, pages and campaigns producing useful
 *  commercial results." So the run comes back round. A ladder would assert an
 *  end the document does not give it, and a closed ring would say the sixth
 *  stage returns to exactly where the first one started — which is the opposite
 *  of what that sentence says. A spiral returns, and returns further out. That
 *  is the whole argument of the section in one line.
 *
 *  HOW IT IS READ. The spiral is sticky and the reader scrubs it with the
 *  scroll: the drawn line extends station by station, the marker travels to the
 *  stage in play, and that stage's copy holds the panel beside it. The last
 *  stretch — from the sixth station round to where the first one stood — is
 *  drawn dashed and only lights on the sixth stage, so the reader sees the run
 *  close.
 *
 *  ALL SIX PANELS STAY MOUNTED and the inactive ones are inert, never
 *  unmounted: a crawler and a screen reader get all six stages of the process
 *  whatever the scroll has done. Below the large breakpoint the scrub is
 *  dropped entirely, the spiral renders complete, and the six read as a plain
 *  ordered list — a 400-unit spiral driven by hidden scroll steps is not
 *  something a phone should be asked to do.
 *
 *  COORDINATES ARE ROUNDED AT THE POINT THEY ARE GENERATED. Every station and
 *  every sample of the curve comes out of a cosine, and Node and V8 do not
 *  always print the same final digit of an unrounded double. This page is one
 *  React island, so a single mismatched attribute would cost the whole route
 *  its interactivity rather than one circle. */

const CX = 180;
const CY = 180;
/** Rotation of the whole figure, in degrees. -90 puts the first station due
 *  north, which lines the six up on the vertical and horizontal axes at a
 *  quarter turn apart and reads as a compass rose; -70 keeps stations one and
 *  five on the same ray, which is the point being made, without any of them
 *  sitting exactly on an axis. */
const PHASE = -70;

/** The curve runs from a little before the first station to a little past the
 *  sixth, so the first station is already on a drawn line and the last stretch
 *  has somewhere to come back to. Degrees, 0 at the top, clockwise. */
const START = -50;
const END = 540;
/** One station per stage, a quarter turn apart, which puts the six across one
 *  and a half turns rather than one. The document gives the six an order, not a
 *  duration, so the spacing is even and none is drawn as the long one.
 *
 *  A QUARTER TURN, NOT A SIXTH, AND THAT IS THE FIX THIS DRAWING NEEDED. Six
 *  stations over a single turn put consecutive radii 17 units apart on a ring
 *  about 90 units across: measurably a spiral, and to the eye an off-centre
 *  circle — which reads as the sixth stage returning to exactly where the first
 *  one started, the one claim this section exists to contradict. At 90 degrees
 *  apart the fifth station stands at the same angle as the first and more than
 *  twice its distance from the centre, so the curve is seen to pass outside its
 *  own beginning. There is no subtler way to say "it comes back round, and it
 *  comes back further out". */
const STEP = 90;

const round = (n: number) => Math.round(n * 100) / 100;

/** Radius grows linearly with angle, which is what makes it a spiral rather
 *  than a circle drawn twice.
 *
 *  THE GROWTH RATE IS THE WHOLE DRAWING. At the first rate tried the six
 *  stations ran from r=64 to r=138 and the thing read as a circle with a wobble
 *  — which says the sixth stage returns to exactly where the first one started,
 *  the one claim this section exists to contradict. From 51 to 137 across a
 *  single turn the outward drift is legible at a glance, and the closing
 *  stretch passes visibly OUTSIDE the first two stations rather than through
 *  them. */
const radius = (deg: number) => 30 + (deg - START) * 0.2203;

const point = (deg: number): [number, number] => {
  const a = ((deg + PHASE) * Math.PI) / 180;
  const r = radius(deg);
  return [round(CX + r * Math.cos(a)), round(CY + r * Math.sin(a))];
};

/** A stretch of the curve as a polyline path, sampled every two degrees. */
const curve = (from: number, to: number) => {
  const pts: string[] = [];
  for (let d = from; d <= to; d += 2) {
    const [x, y] = point(d);
    pts.push(`${x} ${y}`);
  }
  return "M" + pts.join(" L");
};

const STATIONS = Array.from({ length: 6 }, (_, i) => point(i * STEP));
/** The run up to the sixth station, and the stretch that closes it. */
const SPIRAL = curve(START, 5 * STEP);
const CLOSE = curve(5 * STEP, END);

/** How much of SPIRAL is drawn at each stage, as a percentage of its length.
 *  The path carries pathLength="100", so these are the dash numbers directly. */
const REACH = Array.from({ length: 6 }, (_, i) =>
  round(((i * STEP - START) / (5 * STEP - START)) * 100),
);

export function LifecycleLoop({
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
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);

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
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    for (const step of steps.current) if (step) io.observe(step);
    return () => io.disconnect();
  }, [enhanced]);

  /** Off the scrub, the drawing is finished rather than empty. */
  const at = enhanced ? active : stages.length - 1;
  const [mx, my] = STATIONS[at] ?? STATIONS[0];
  const ease = "cubic-bezier(0.16,1,0.3,1)";
  const glide = reduced ? "none" : `all 800ms ${ease}`;

  const drawing = (
    <div className="relative">
      {/* THE VIEWBOX IS CROPPED TO THE FIGURE. At 0 0 400 400 the curve
          occupied the middle 60% of the box and the plate was mostly padding;
          this is its measured bounding box plus a margin of about 23 units on
          every side. */}
      <svg viewBox="60 40 280 320" fill="none" aria-hidden className="block w-full">
        {/* NO OUTER RING. There was one, drawn as the reach of a finished
            cycle, and it was the single thing stopping the drawing from reading
            as a spiral: a dashed circle round a curve that is nearly circular
            makes the curve look circular too. The origin mark below does the
            work it was meant to do — it gives the spiral a centre to be
            travelling away from. */}
        <circle cx={CX} cy={CY} r="3" className="fill-ash/50" />

        {/* The whole run, drawn in a text tone rather than a hairline: this is
            the object the section is about, and at --color-line it measured
            1.27 against the page and vanished. */}
        <path
          d={SPIRAL}
          stroke="var(--color-ash)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />

        {/* And the stretch that closes it, drawn dashed because it is a return
            rather than another stage. */}
        <path
          d={CLOSE}
          stroke="var(--color-ash)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeLinecap="round"
          strokeDasharray="6 6"
        />
        <path
          d={CLOSE}
          stroke="var(--color-brand)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 6"
          style={{
            transition: reduced ? "none" : `opacity 700ms ${ease}`,
            opacity: at === stages.length - 1 ? 1 : 0,
          }}
        />

        {/* How far the run has got. */}
        <path
          d={SPIRAL}
          pathLength="100"
          stroke="var(--color-brand)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="100"
          style={{ strokeDashoffset: 100 - (REACH[at] ?? 0), transition: glide }}
        />

        {/* The six stations. */}
        {STATIONS.map(([x, y], i) => {
          const done = i <= at;
          return (
            <g key={`${x}-${y}`}>
              <circle
                cx={x}
                cy={y}
                r="11"
                className="fill-void"
                stroke={done ? "var(--color-brand)" : "var(--color-ash)"}
                strokeWidth="1.75"
                style={{ transition: reduced ? "none" : `stroke 600ms ${ease}` }}
              />
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={done ? "var(--color-brand)" : "var(--color-ash)"}
                style={{ transition: reduced ? "none" : `fill 600ms ${ease}` }}
              />
            </g>
          );
        })}

        {/* Where the run is now. */}
        <g style={{ transform: `translate(${mx}px, ${my}px)`, transition: glide }}>
          <circle r="22" className="fill-brand/12" />
          <circle r="13" className="fill-brand/20" />
          <circle r="6.5" className="fill-brand" />
        </g>
      </svg>
    </div>
  );

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />
      </Container>

      {/* Small screens: the finished spiral, then the six in order. */}
      {!enhanced && (
        <Container className="relative">
          <div className="rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-6 sm:p-8">
            <div className="mx-auto max-w-sm">{drawing}</div>
          </div>
          <ol className="mt-10 border-t border-line">
            {stages.map((stage) => (
              <li key={stage.stage} className="border-b border-line py-8">
                <p className="font-display text-[0.7rem] font-bold uppercase text-brand-text">
                  {stage.stage}
                </p>
                <h3 className="font-display mt-4 text-[clamp(1.2rem,4.4vw,1.6rem)] font-extrabold uppercase leading-[1.12] text-snow">
                  {stage.title}
                </h3>
                <p className="mt-4 leading-relaxed text-fog">{stage.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      )}

      {/* Wide screens: the spiral holds while the six stages pass through it. */}
      {enhanced && (
        <div className="relative">
          <div className="sticky top-24 flex h-[calc(100svh-7rem)] items-center">
            <Container>
              <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                {/* The stage in play. Every panel stays mounted, and all six
                    share one grid cell so the column never resizes as the
                    reader scrubs past a longer paragraph. */}
                <div>
                  <div className="grid">
                  {stages.map((stage, i) => {
                    const on = i === at;
                    return (
                      <motion.div
                        key={stage.stage}
                        inert={!on}
                        initial={false}
                        animate={{ opacity: on ? 1 : 0, y: on ? 0 : 14 }}
                        transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className={cn("col-start-1 row-start-1", !on && "pointer-events-none")}
                      >
                        <p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand-text">
                          {stage.stage}
                        </p>
                        <h3 className="font-display mt-6 text-[clamp(1.6rem,3.4vw,2.7rem)] font-extrabold uppercase leading-[1.06] text-snow">
                          {stage.title}
                        </h3>
                        <p className="mt-7 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
                          {stage.body}
                        </p>
                      </motion.div>
                    );
                  })}
                  </div>

                  {/* Which of the six, drawn rather than written. */}
                  <div aria-hidden className="mt-12 flex items-center gap-2">
                    {stages.map((stage, i) => (
                      <span
                        key={stage.stage}
                        className={cn(
                          "h-[3px] flex-1 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                          i <= at ? "bg-brand" : "bg-line",
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* The same plate the small-screen branch gives it: on the
                    bare page the spiral floated in the middle of an empty
                    half-section with nothing holding it. */}
                <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-6 sm:p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
                      backgroundSize: "26px 26px",
                      maskImage: "radial-gradient(ellipse at 70% 20%, black, transparent 74%)",
                    }}
                  />
                  <div className="relative mx-auto w-full max-w-[26rem]">{drawing}</div>
                </div>
              </div>
            </Container>
          </div>

          {/* The scroll the spiral is scrubbed with. One step per stage; the
              first is short because the first stage is already on screen when
              the section arrives. */}
          <div aria-hidden>
            {stages.map((stage, i) => (
              <div
                key={stage.stage}
                data-i={i}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                className={i === 0 ? "h-[30vh]" : "h-[58vh]"}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
