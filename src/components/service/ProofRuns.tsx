"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { Readout, Run } from "@/content/industries/ecommerce-retail";

/** Three engagements, each with the one quantity its own sentence states.
 *
 *  WHY DRAWN AT ALL. This document is the only one on the site that supplies
 *  real before-and-after figures, and it supplies three different KINDS: a
 *  count of keywords, a count of monthly conversions, and a multiple. A four-up
 *  band of big numbers would flatten those into one shape and lose the thing
 *  that makes each of them mean something, which is the distance between the
 *  two ends. So each run gets a readout of its own quantity, at the ratio the
 *  sentence states, and nothing is averaged, totalled or compared across runs.
 *
 *  WHAT IS AND IS NOT DRAWN. 8 of 33 keyword slots filling to 33. One unit
 *  block against seven, because "around 100 to more than 700" is a sevenfold
 *  move. An impression field going to three bands, because "more than 200%"
 *  is threefold. Every "more than" in the source is drawn as an open edge —
 *  a dashed cap, a partial band — rather than rounded up into a solid figure,
 *  and the two figures the document gives with no before (a cost per conversion
 *  as low as AED 2.16, monthly impressions over 47,000) are left in the prose
 *  where they belong: a bar with only one end is not a comparison.
 *
 *  NO DIGITS ON THE DRAWINGS. Each figure is printed once, in the client's own
 *  sentence beside its readout. The drawing carries the same quantity as a
 *  shape, which is what a chart is for, and the document's own closing caveat
 *  is printed under all three rather than tucked into a footnote.
 *
 *  MOTION. One IntersectionObserver per run flips it from its "before" state to
 *  its "after", and every change is a CSS transition on colour or transform, so
 *  a reader who never sees it move gets the finished reading rather than a
 *  blank plate. */

const EASE = "cubic-bezier(0.16,1,0.3,1)";

/** Has this run been reached? The before state is what makes the after state
 *  mean anything, so it holds until the plate is actually on screen. */
function useArrived<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || arrived) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArrived(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [arrived]);
  return [ref, arrived] as const;
}

/* ------------------------------------------------------------- readouts --- */

/** Keywords holding a first-page position: one mark each, the eight that were
 *  already there kept at full weight and the twenty-five that followed drawn
 *  behind them. Two tones rather than one, so the finished frame still says
 *  "eight, then twenty-five more" to a reader who never sees it fill — and so
 *  this readout cannot be mistaken for the impression field two runs below,
 *  which is the shape it had when every mark was the same square. */
function Rankings({ from, to, on }: { from: number; to: number; on: boolean }) {
  return (
    <svg viewBox="0 0 340 160" fill="none" aria-hidden className="block w-full">
      <path d="M6 138 H334" stroke="var(--color-line)" strokeWidth="1.5" strokeLinecap="round" />
      {Array.from({ length: to }).map((_, i) => {
        const held = i < from;
        return (
          <rect
            key={i}
            /* Integer pitch, deliberately: a computed float can print its
               last digit differently on the server and in the browser, and one
               mismatched attribute costs this whole route its island. */
            x={8 + i * 10}
            y="30"
            width="5"
            height="104"
            rx="2.5"
            className={cn(held ? "fill-brand" : "fill-brand/40")}
            style={{
              transition: `transform 480ms ${EASE}, opacity 480ms ${EASE}`,
              transitionDelay: held ? "0ms" : `${(i - from) * 26}ms`,
              transformBox: "fill-box",
              transformOrigin: "bottom",
              transform: held || on ? "scaleY(1)" : "scaleY(0)",
              opacity: held || on ? 1 : 0,
            }}
          />
        );
      })}
    </svg>
  );
}

/** One unit block against seven, and an open edge on the taller one. */
function Conversions({ from, to, on }: { from: number; to: number; on: boolean }) {
  /* The ratio the sentence states, as whole unit blocks so it can be counted
     off the drawing rather than estimated. */
  const units = Math.max(1, Math.round(to / from));
  return (
    <svg viewBox="0 0 340 200" fill="none" aria-hidden className="block w-full">
      <path d="M28 190 H312" stroke="var(--color-line)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Before. */}
      <rect
        x="60"
        y="170"
        width="72"
        height="20"
        rx="4"
        className="fill-line"
      />

      {/* After. */}
      {Array.from({ length: units }).map((_, k) => (
        <rect
          key={k}
          x="208"
          y={170 - k * 24}
          width="72"
          height="20"
          rx="4"
          className="fill-brand origin-bottom"
          style={{
            transition: `transform 520ms ${EASE}, opacity 520ms ${EASE}`,
            transitionDelay: `${k * 70}ms`,
            transform: on ? "scaleY(1)" : "scaleY(0)",
            opacity: on ? 1 : 0,
            transformBox: "fill-box",
            transformOrigin: "bottom",
          }}
        />
      ))}

      {/* "More than": the column is capped open, never rounded up. */}
      <g
        stroke="var(--color-brand)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: `opacity 520ms ${EASE}`, transitionDelay: "560ms", opacity: on ? 1 : 0 }}
      >
        <path d="M208 18 H280" strokeDasharray="5 5" />
        <path d="M236 12 L244 4 L252 12" />
      </g>
    </svg>
  );
}

/** An impression field multiplied, and an audience doubled. */
function Reach({ multiple, follower, on }: { multiple: number; follower: number; on: boolean }) {
  const bands = Array.from({ length: multiple }, (_, i) => 24 + i * 32);
  return (
    <svg viewBox="0 0 340 200" fill="none" aria-hidden className="block w-full">
      {bands.map((y, band) =>
        Array.from({ length: 9 }).map((_, i) => (
          <rect
            key={`${y}-${i}`}
            x={20 + i * 34}
            y={y}
            width="24"
            height="18"
            rx="4"
            /* The band that was already there stays at full weight; the two
               the increase added sit behind it, for the same reason the
               keyword marks above carry two tones. */
            className={band === 0 ? "fill-brand" : on ? "fill-brand/45" : "fill-transparent"}
            stroke="var(--color-line)"
            strokeWidth="1.5"
            style={{
              transition: `fill 520ms ${EASE}`,
              transitionDelay: on && band > 0 ? `${(band - 1) * 160 + i * 30}ms` : "0ms",
            }}
          />
        )),
      )}

      {/* "More than": a fourth band begun and left open. */}
      <g
        style={{
          transition: `opacity 520ms ${EASE}`,
          transitionDelay: `${multiple * 170}ms`,
          opacity: on ? 1 : 0,
        }}
      >
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={20 + i * 34}
            y={24 + multiple * 32}
            width="24"
            height="18"
            rx="4"
            stroke="var(--color-brand)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        ))}
      </g>

      {/* The audience, doubled. */}
      <path
        d="M20 156 H320"
        stroke="var(--color-line)"
        strokeWidth="1"
        strokeDasharray="2 6"
      />
      {Array.from({ length: follower }).map((_, i) => (
        <rect
          key={i}
          x={20 + i * 76}
          y="168"
          width="64"
          height="24"
          rx="6"
          className={i === 0 ? "fill-line" : "fill-brand"}
          style={{
            transition: `opacity 520ms ${EASE}, transform 520ms ${EASE}`,
            transitionDelay: `${400 + i * 120}ms`,
            opacity: i === 0 || on ? 1 : 0,
            transform: i === 0 || on ? "none" : "translateX(-14px)",
          }}
        />
      ))}
    </svg>
  );
}

function Plate({ readout, on }: { readout: Readout; on: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at 80% 100%, black, transparent 70%)",
        }}
      />
      <div className="relative">
        {readout.kind === "rankings" && (
          <Rankings from={readout.from} to={readout.to} on={on} />
        )}
        {readout.kind === "conversions" && (
          <Conversions from={readout.from} to={readout.to} on={on} />
        )}
        {readout.kind === "reach" && (
          <Reach multiple={readout.multiple} follower={readout.follower} on={on} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- section --- */

function RunBand({ run, i }: { run: Run; i: number }) {
  const [ref, arrived] = useArrived<HTMLLIElement>();
  /* Alternated, so three engagements read as a run rather than as three
     identical rows. */
  const flip = i % 2 === 1;

  return (
    <li ref={ref} className="border-b border-line">
      <div
        className={cn(
          "grid items-center gap-10 py-12 lg:gap-16 lg:py-16",
          "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]",
        )}
      >
        <div className={cn(flip && "lg:order-2")}>
          <p className="font-display text-[0.7rem] font-bold tabular-nums text-brand-text">
            {run.no}
          </p>
          <h3 className="font-display mt-5 text-[clamp(1.35rem,3vw,2.3rem)] font-extrabold uppercase leading-[1.08] text-snow">
            {run.title}
          </h3>
          <div className="mt-6 space-y-5">
            {run.body.map((para) => (
              <p key={para} className="max-w-xl leading-relaxed text-fog sm:text-lg">
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className={cn(flip && "lg:order-1")}>
          <Plate readout={run.readout} on={arrived} />
        </div>
      </div>
    </li>
  );
}

export function ProofRuns({
  id,
  label,
  index,
  title,
  strokeTitle,
  runs,
  caveat,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  runs: Run[];
  /** The document's own line about what these figures do and do not promise. */
  caveat: string;
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-4" />

        <ol className="border-t border-line">
          {runs.map((run, i) => (
            <RunBand key={run.no} run={run} i={i} />
          ))}
        </ol>

        <Rise delay={0.08} className="mt-10">
          <p className="max-w-2xl text-sm leading-relaxed text-ash">{caveat}</p>
        </Rise>
      </Container>
    </section>
  );
}
