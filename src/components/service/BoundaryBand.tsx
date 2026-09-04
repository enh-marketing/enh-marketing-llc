"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Crosslink } from "@/components/ui/Crosslink";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Where this service stops, drawn as the edge of the same radius.
 *
 *  THE DOCUMENT SAYS IT PLAINLY AND THE PAGE SHOULD TOO: "Local SEO is most
 *  useful when location affects the buying decision. A business serving
 *  customers across the UAE without a local component may need a broader SEO
 *  services strategy instead." That is an agency telling a reader not to buy
 *  this, and burying it in a paragraph of body copy would waste the one moment
 *  on the page where the honesty is the argument.
 *
 *  SO IT IS A BOUNDARY, AND IT IS THE PREVIOUS SECTION'S BOUNDARY. The sector
 *  field above sets ten businesses inside a search radius. This is the same
 *  dashed arc, seen from its edge: the claim sits inside it at display scale,
 *  and the reader whose business does not fit is walked out through a marked
 *  exit rather than left to work it out. The two sections are one idea in two
 *  frames, which is why neither carries a section number of its own here.
 *
 *
 *  ONE NOTE ON SURFACE. The section banding alternates ink-2 and ink-3 by
 *  position, so a panel hard-coded to either tone vanishes into its own section
 *  whenever the parity falls the wrong way. The plates here are a brand tint
 *  over whatever is behind them instead, which darkens both tones by the same
 *  amount and survives a section being inserted above.
 *
 *  MOTION. The arc scales in, the exit slides in from beyond it, and a packet
 *  crosses the line once. Everything that carries a word moves on transform
 *  alone; the arc and the packet carry none. */

export function BoundaryBand({
  id,
  label,
  claim,
  lead,
  linkLabel,
  linkHref,
  tail,
}: {
  id: string;
  label: string;
  claim: string;
  lead: string;
  linkLabel: string;
  linkHref: string;
  tail: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const play = reduced || inView;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <div
          ref={ref}
          className="relative isolate overflow-hidden rounded-[1.75rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] px-6 py-12 sm:px-10 sm:py-14 lg:px-14"
        >
          {/* The edge of the radius the sectors sit inside. Desktop only: at
              narrow widths there is no room for an arc to read as one, and the
              rule below does the same job. */}
          <motion.span
            aria-hidden
            initial={reduced ? false : { scale: 0.94, opacity: 0 }}
            animate={play ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: EASE }}
            className="pointer-events-none absolute right-[46%] top-1/2 hidden aspect-square h-[260%] -translate-y-1/2 rounded-full border border-dashed border-brand/30 lg:block"
          />

          <div className="relative grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center">
            {/* Inside. */}
            <motion.p
              initial={reduced ? false : { y: 18 }}
              animate={play ? { y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display max-w-[22ch] text-[clamp(1.35rem,3.2vw,2.4rem)] font-extrabold uppercase leading-[1.08] text-snow lg:pr-10"
            >
              {claim}
            </motion.p>

            {/* Outside. The pin that does not sit in the radius, and the
                sentence that sends it somewhere else. The link keeps its place
                inside the source sentence rather than being lifted out into a
                button, because the sentence is the recommendation. */}
            <motion.div
              initial={reduced ? false : { y: 18 }}
              animate={play ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
              className="border-l-2 border-brand pl-6 lg:pl-8"
            >
              <svg aria-hidden viewBox="0 0 54 22" className="mb-5 h-5 w-[54px] text-brand" fill="none">
                <path
                  d="M11 20c3.6-5.4 5.9-8.3 5.9-11.4a5.9 5.9 0 1 0-11.8 0C5.1 11.7 7.4 14.6 11 20Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  opacity="0.6"
                />
                <circle cx="11" cy="8.4" r="2.1" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
                <path d="M22 11h24" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3.5" opacity="0.55" />
                <path d="M42.5 7.5L46 11l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <p className="leading-relaxed text-fog sm:text-lg">
                {lead}{" "}
                <Crosslink
                  href={linkHref}
                  className="font-semibold text-brand underline decoration-brand/40 underline-offset-4 transition-colors duration-300 hover:decoration-brand"
                >
                  {linkLabel}
                  <svg
                    viewBox="0 0 16 16"
                    className="ml-1 inline h-3.5 w-3.5 -translate-y-px"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 11L11 5M6 5h5v5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Crosslink>{" "}
                {tail}
              </p>
            </motion.div>
          </div>

          {/* The crossing, along the base. A faint rule is the permanent
              structure; the packet that leaves the radius and keeps going is
              the only part that moves, and it carries no words. */}
          <svg
            aria-hidden
            viewBox="0 0 100 6"
            preserveAspectRatio="none"
            className="mt-12 h-1.5 w-full"
          >
            <path d="M0 3h100" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path d="M50 0v6" stroke="var(--color-brand)" strokeWidth="1" opacity="0.6" vectorEffect="non-scaling-stroke" />
            <path
              className="bb-cross"
              d="M0 3h100"
              pathLength={100}
              stroke="var(--color-brand)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </Container>
    </section>
  );
}
