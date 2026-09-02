"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/** The managed service as a route plotted through its own duties.
 *
 *  THE MECHANIC, from the reference: the waypoints are ordinary flow layout,
 *  their real positions are measured, and MotionPath plots a curve through the
 *  measured points. The layout leads and the motion follows it. A signal then
 *  runs that curve on scroll, calling at each duty in turn.
 *
 *  THE COMPOSITION. The duties alternate sides and interlock vertically, and
 *  each one carries its waypoint on its *inner* edge, so the plotted curve
 *  serpentines down the channel between the two columns. That makes the route
 *  the spine of the section rather than a line wandering behind it. An earlier
 *  version scattered narrow cards at percentage offsets, which left the middle
 *  of the section empty and cramped every duty into four short lines.
 *
 *  THE ROUTE IS VISIBLE AT REST. It is drawn twice: a full, faint line that is
 *  always there, and a brand line over it that draws on the scrub. Drawing only
 *  the animated one meant a reader who had not scrolled saw disconnected boxes
 *  with nothing joining them, which is exactly how this looked before.
 *
 *  ONE PROGRESS, ONE PATH. The signal's position and the line's draw-on are
 *  both read from a single progress value against a single cached rawPath. An
 *  earlier build ran them as two tweens on one timeline, and they visibly
 *  disagreed: the dot led or lagged the end of the drawn line. The cause was
 *  invalidateOnRefresh, which made the motionPath tween re-record its start
 *  from wherever the signal happened to be sitting mid-path, so every refresh
 *  shifted the dot's route while the line stayed put. SmoothScroll refreshes
 *  ScrollTrigger whenever content height changes, which on this page happens
 *  every time an FAQ opens, so it drifted further the longer you stayed.
 *
 *  MEASURED, THEREFORE REBUILT. build() runs on every refresh, and resets the
 *  signal to the origin first, because getRelativePosition measures from where
 *  the element currently is.
 *
 *  NOTHING DEPENDS ON IT. The duties are real flow layout: with no script at
 *  all they render in place, full width, every word legible. */

/** Which side each duty sits on. Alternating, so the route has a channel to
 *  weave down and neither column runs long. */
const side = (i: number) => (i % 2 === 0 ? "left" : "right");

/** Vertical interlock: each duty rises into the gap left by the one before, so
 *  the column reads as a woven run rather than a stack of rows. */
const RISE = [0, -56, -40, -56, -40, -56, -40];

function splitExclusions(sentence: string) {
  const k = " are quoted separately";
  const at = sentence.indexOf(k);
  if (at < 0) return null;
  const items = sentence.slice(0, at).split(/,\s|\sand\s/).filter(Boolean);
  if (items.length < 2) return null;
  return { items, tail: sentence.slice(at).trim() };
}

export function ManagedWaypoints({
  lead,
  coversLead,
  covers,
  glyphs,
  fee,
  outOfScope,
}: {
  lead: string;
  coversLead: string;
  covers: string[];
  /** One per duty, in the same order. */
  glyphs: GlyphVariant[];
  fee: string;
  outOfScope: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const frame = useRef<SVGSVGElement>(null);
  const ghost = useRef<SVGPathElement>(null);
  const route = useRef<SVGPathElement>(null);
  const signal = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const out = useMemo(() => splitExclusions(outOfScope), [outOfScope]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { plot: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (!ctx.conditions?.plot) return;
        const el = root.current;
        const box = canvas.current;
        const svg = frame.current;
        const faint = ghost.current;
        const line = route.current;
        const pulse = signal.current;
        if (!el || !box || !svg || !faint || !line || !pulse) return;

        const markers = dots.current.filter(Boolean) as HTMLSpanElement[];
        if (markers.length < 2) return;

        pulse.style.opacity = "1";

        const curviness = 1.25;
        /** One progress value, read by everything. */
        const state = { p: 0 };
        let raw: ReturnType<typeof MotionPathPlugin.arrayToRawPath>;
        let len = 0;

        /** Measure and plot. Called on every refresh, because the positions
         *  come from getBoundingClientRect and a resize invalidates them. */
        const build = () => {
          // Back to the origin before measuring. getRelativePosition measures
          // from where the signal currently *is*, so re-measuring while it sat
          // mid-path shifted the whole route — which is what made the signal
          // and the line disagree after any refresh.
          gsap.set(pulse, { x: 0, y: 0 });

          const points = markers.map((m) =>
            MotionPathPlugin.getRelativePosition(pulse, m, [0.5, 0.5], [0.5, 0.5]),
          );

          raw = MotionPathPlugin.arrayToRawPath(points, { curviness });
          // Required before getPositionOnPath can treat progress as distance
          // along the path rather than as a raw segment parameter.
          MotionPathPlugin.cacheRawPathMeasurements(raw);
          const d = MotionPathPlugin.rawPathToString(raw);

          const boxRect = box.getBoundingClientRect();
          const pulseRect = pulse.getBoundingClientRect();
          const shift = `translate(${pulseRect.left + pulseRect.width / 2 - boxRect.left} ${
            pulseRect.top + pulseRect.height / 2 - boxRect.top
          })`;

          svg.setAttribute("viewBox", `0 0 ${boxRect.width} ${boxRect.height}`);
          for (const path of [faint, line]) {
            path.setAttribute("d", d);
            path.setAttribute("transform", shift);
          }

          len = line.getTotalLength();
          line.style.strokeDasharray = `${len}`;
        };

        /** Both the signal and the drawn line read the same progress against
         *  the same path, so they cannot drift. Two tweens on one timeline
         *  could: the dash is parameterised by the browser's arc length and
         *  motionPath by its own, and the two only agree approximately. */
        const apply = () => {
          const p = gsap.utils.clamp(0, 1, state.p);
          const at = MotionPathPlugin.getPositionOnPath(raw, p);
          // Through gsap, not a raw style write: gsap keeps a transform cache,
          // and writing style.transform behind it would let the reset in
          // build() be skipped as a no-op and corrupt the next measurement.
          gsap.set(pulse, { x: at.x, y: at.y });
          line.style.strokeDashoffset = `${len * (1 - p)}`;

          const i = Math.round(p * (markers.length - 1));
          setActive((prev) => (prev === i ? prev : i));
        };

        build();
        apply();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 80%",
            // Numeric scrub smooths the timeline's own playhead, so reading
            // state.p keeps the smoothing while staying perfectly in step.
            scrub: 0.75,
            onRefresh: () => {
              build();
              apply();
            },
          },
        });

        tl.to(state, { p: 1, duration: 1, ease: "none", onUpdate: apply }, 0);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          gsap.set(pulse, { clearProps: "all" });
          pulse.style.opacity = "0";
          line.style.strokeDasharray = "";
          line.style.strokeDashoffset = "";
          setActive(-1);
        };
      },
    );

    return () => mm.revert();
  }, [covers.length]);

  return (
    <div ref={root}>
      {/* The ask, and the label the document gives the list. */}
      <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <p className="font-display max-w-2xl text-[clamp(1.3rem,2.8vw,2.2rem)] font-extrabold uppercase leading-[1.14] text-snow">
          {lead}
        </p>
        <p className="font-display flex items-center gap-3 text-[0.62rem] font-semibold uppercase text-brand-text">
          <span aria-hidden className="h-px w-8 bg-brand" />
          {coversLead}
        </p>
      </div>

      {/* The canvas. Duties are flow layout, which is what makes them
          measurable and what makes this readable with no script at all. */}
      <div ref={canvas} className="relative mt-16">
        <svg
          ref={frame}
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
          preserveAspectRatio="none"
        >
          {/* Always there, so the duties are never disconnected. */}
          <path
            ref={ghost}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="1.4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Draws as the signal travels. */}
          <path
            ref={route}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="1.8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          ref={signal}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 hidden h-3.5 w-3.5 opacity-0 lg:block"
          style={{ marginLeft: "-0.4375rem", marginTop: "-0.4375rem" }}
        >
          <span className="absolute inset-0 rounded-full bg-brand" />
          <span className="absolute -inset-2.5 rounded-full border border-brand/45" />
          <span className="absolute -inset-5 rounded-full bg-brand/10 blur-md" />
        </div>

        <ol className="relative">
          {covers.map((item, i) => {
            const on = i === active;
            const right = side(i) === "right";
            return (
              <li
                key={item}
                className={cn("relative lg:w-[47%]", right ? "lg:ml-auto" : "lg:mr-auto")}
                style={{ marginTop: i === 0 ? 0 : 28 }}
              >
                <div className="lg:[margin-top:var(--rise)]" style={{ ["--rise" as string]: `${RISE[i] ?? -40}px` }}>
                  <div
                    className={cn(
                      "group relative z-10 rounded-[1.5rem] border p-7 transition-colors duration-500 motion-reduce:transition-none sm:p-9",
                      on ? "border-brand/55 bg-ink-3" : "border-line bg-ink-2 hover:border-ash/50",
                    )}
                  >
                    {on && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-brand/[0.07]"
                      />
                    )}

                    {/* Index and the rule that grows on hover. */}
                    <div className="relative flex items-baseline justify-between gap-6">
                      <span
                        aria-hidden
                        className={cn(
                          "font-display text-[0.62rem] font-bold tabular-nums transition-colors duration-500",
                          on ? "text-brand" : "text-ash group-hover:text-brand-text",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "h-px transition-all duration-500 motion-reduce:transition-none",
                          on ? "w-20 bg-brand" : "w-8 bg-line group-hover:w-14",
                        )}
                      />
                    </div>

                    {/* The duty is the heading. Each one is a single sentence in
                        the document, so it is set as the card's title rather
                        than as a paragraph under an invented one. */}
                    <h3
                      className={cn(
                        "font-display relative mt-6 text-[clamp(1.05rem,2vw,1.4rem)] font-extrabold uppercase leading-[1.16] transition-colors duration-500",
                        on ? "text-snow" : "text-fog group-hover:text-snow",
                      )}
                    >
                      {item}
                    </h3>

                    {/* The icon. The set's glyphs animate themselves, and
                        re-keying on arrival restarts them from the first frame,
                        so the icon visibly comes alive as the signal calls
                        rather than looping quietly in the background. Under
                        reduced motion globals.css stops all of them. */}
                    <span
                      aria-hidden
                      className={cn(
                        "relative mt-8 block h-[4.25rem] w-[4.25rem] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                        on ? "scale-110 text-brand" : "text-ash group-hover:text-fog",
                      )}
                    >
                      <CapabilityGlyph key={on ? "on" : "off"} variant={glyphs[i] ?? "structure"} />
                    </span>
                  </div>

                  {/* The waypoint, on the card's inner edge, so the plotted
                      curve serpentines down the channel between the columns
                      rather than wandering behind them. */}
                  <span
                    ref={(node) => {
                      dots.current[i] = node;
                    }}
                    aria-hidden
                    className={cn(
                      "absolute top-1/2 z-20 hidden h-4 w-4 -translate-y-1/2 rounded-full border-2 transition-all duration-500 motion-reduce:transition-none lg:block",
                      right ? "-left-2" : "-right-2",
                      on ? "scale-125 border-brand bg-brand" : "border-line bg-ink-3",
                    )}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* What the round costs. */}
      <p className="mt-20 max-w-3xl border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
        {fee}
      </p>

      {/* And what the route does not call at. */}
      {out ? (
        <div className="mt-10 border-t border-line pt-9">
          <ul className="flex flex-wrap gap-3">
            {out.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-full border border-dashed border-line px-5 py-2.5 transition-colors duration-500 hover:border-ash"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-3 w-3 shrink-0 text-ash"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
                <span className="font-display text-[0.95rem] font-bold uppercase leading-none text-snow">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl leading-relaxed text-fog">{out.tail}</p>
        </div>
      ) : (
        <p className="mt-10 max-w-3xl border-t border-line pt-9 leading-relaxed text-fog sm:text-lg">
          {outOfScope}
        </p>
      )}
    </div>
  );
}
