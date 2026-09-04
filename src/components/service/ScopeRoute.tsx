"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

/** The scope, drawn as the campaign it is specifying.
 *
 *  TWO THINGS WERE WRONG WITH EVERY EARLIER VERSION OF THIS SECTION. The first
 *  is that ten ruled rows throw away the only structure the copy has: read in
 *  order, the ten are not a list, they are a route. Who is being reached and
 *  which roles inside them; what is offered; the channels it runs on; the pages
 *  and forms it runs to; the written definition of a qualified lead; where that
 *  lead goes and who picks it up. That is a campaign end to end, and every box
 *  on it is a line the proposal has to fill in.
 *
 *  The second is scale. The card runs this site is proud of use a
 *  forty-eight-pixel mark, a twenty-four-pixel title and thirty-two pixels of
 *  padding on a lit surface. Every version of this section used fifteen-pixel
 *  text in a fourteen-pixel box, which is why it read as a set of bullets no
 *  matter what shape they were arranged in. These are cards at the site's own
 *  spec, and each of the ten finally has a mark of its own.
 *
 *  THE ARRANGEMENT IS THE DOCUMENT'S OWN ORDER. Nothing is re-sequenced, merged
 *  or renamed. Two of the ten sit outside the run because their own wording puts
 *  them there: media spend and management fees are not a step, they are what the
 *  whole thing costs, so they run under it; reporting and sales-feedback
 *  requirements are what comes back, so they return to the start.
 *
 *  THE SIXTH IS A GATE. It is the only item in the ten that decides whether
 *  anything continues, and the page's centrepiece further down is the argument
 *  that leads delivered, qualified leads and meetings booked are three different
 *  outputs. It gets the full width and the brand.
 *
 *  NOTHING IS COUNTED, TIMED OR PRICED. No card carries a volume, a rate, a
 *  budget or a duration: the document gives none, and the spend card is a line
 *  item, never a figure.
 *
 *  MOTION. A dot runs the joints, because a campaign runs. It carries no words
 *  and stops under prefers-reduced-motion. */

const EASE = [0.16, 1, 0.3, 1] as const;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** One mark per requirement, in the document's order. */
function Mark({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="h-12 w-12">
      <g className="text-brand">
        {/* 01 Target industries, company sizes and locations. */}
        {i === 0 && (
          <>
            <path d="M6 14h36M6 26h36M6 38h36M14 6v36M26 6v36M38 6v36" {...S} opacity="0.3" />
            <path d="M26 40c-6-8-10-12-10-17a10 10 0 0120 0c0 5-4 9-10 17z" {...S} />
            <circle cx="26" cy="23" r="4" {...S} />
          </>
        )}
        {/* 02 Relevant job titles and decision-making roles. */}
        {i === 1 && (
          <>
            <circle cx="12" cy="17" r="5" {...S} opacity="0.55" />
            <path d="M5 31a7 7 0 0114 0" {...S} opacity="0.55" />
            <circle cx="36" cy="17" r="5" {...S} opacity="0.55" />
            <path d="M29 31a7 7 0 0114 0" {...S} opacity="0.55" />
            <circle cx="24" cy="20" r="7" {...S} />
            <path d="M14 40a10 10 0 0120 0" {...S} />
            <circle cx="24" cy="20" r="12" {...S} strokeDasharray="4 5" opacity="0.7" />
          </>
        )}
        {/* 03 The offer being promoted. */}
        {i === 2 && (
          <>
            <path d="M24 6l4 8 9 1-6.5 6.5L32 30l-8-4-8 4 1.5-8.5L11 15l9-1z" {...S} />
            <path d="M14 38h20M18 44h12" {...S} opacity="0.6" />
          </>
        )}
        {/* 04 Channels included in the campaign. */}
        {i === 3 && (
          <>
            <circle cx="9" cy="24" r="4" {...S} />
            <path d="M13 24h8M21 24c8 0 6-14 14-14M21 24h14M21 24c8 0 6 14 14 14" {...S} />
            <circle cx="39" cy="10" r="4" {...S} opacity="0.75" />
            <circle cx="39" cy="24" r="4" {...S} opacity="0.75" />
            <circle cx="39" cy="38" r="4" {...S} opacity="0.75" />
          </>
        )}
        {/* 05 Landing pages, forms and campaign content required. */}
        {i === 4 && (
          <>
            <rect x="7" y="6" width="34" height="36" rx="3" {...S} />
            <path d="M7 15h34" {...S} opacity="0.5" />
            <rect x="13" y="21" width="22" height="5" rx="2.5" {...S} opacity="0.6" />
            <rect x="13" y="31" width="14" height="6" rx="2" {...S} />
            <path d="M31 34h6" {...S} opacity="0.6" />
          </>
        )}
        {/* 06 The written definition of a qualified lead. */}
        {i === 5 && (
          <>
            <path d="M11 5h16l10 10v28a2 2 0 01-2 2H11a2 2 0 01-2-2V7a2 2 0 012-2z" {...S} />
            <path d="M27 5v10h10" {...S} />
            <path d="M16 24h12M16 31h8" {...S} opacity="0.55" />
            <circle cx="32" cy="33" r="9" className="fill-ink-2" {...S} />
            <path d="M28 33l3 3 6-6" {...S} strokeWidth="2" />
          </>
        )}
        {/* 07 How leads will reach the sales team. */}
        {i === 6 && (
          <>
            <path d="M6 18h20m-6-6l6 6-6 6" {...S} />
            <rect x="30" y="10" width="14" height="28" rx="3" {...S} />
            <path d="M30 24h14" {...S} opacity="0.5" />
            <path d="M34 31h6" {...S} opacity="0.6" />
          </>
        )}
        {/* 08 Who handles follow-up and appointment setting. */}
        {i === 7 && (
          <>
            <rect x="7" y="10" width="34" height="32" rx="3" {...S} />
            <path d="M7 19h34M16 6v8M32 6v8" {...S} opacity="0.6" />
            <path d="M17 30l4 4 10-10" {...S} strokeWidth="2" />
          </>
        )}
        {/* 09 Media spend and management fees. */}
        {i === 8 && (
          <>
            <circle cx="16" cy="18" r="9" {...S} />
            <circle cx="32" cy="30" r="9" {...S} opacity="0.7" />
            <path d="M6 42h36" {...S} opacity="0.5" />
            <path d="M13 18h6M16 14v8" {...S} opacity="0.7" />
          </>
        )}
        {/* 10 Reporting and sales-feedback requirements. */}
        {i === 9 && (
          <>
            <path d="M8 34V22M18 34V14M28 34V26M38 34V10" {...S} />
            <path d="M6 40h36" {...S} opacity="0.5" />
            <path d="M40 6a18 18 0 00-31 5" {...S} opacity="0.7" />
            <path d="M9 4v7h7" {...S} opacity="0.7" />
          </>
        )}
      </g>
    </svg>
  );
}

function Card({
  n,
  text,
  hot,
  onHot,
  tone = "step",
  wide = false,
}: {
  n: number;
  text: string;
  hot: number | null;
  onHot: (i: number | null) => void;
  tone?: "step" | "gate" | "aside";
  wide?: boolean;
}) {
  const on = hot === n;
  return (
    <button
      type="button"
      onPointerEnter={() => onHot(n)}
      onFocus={() => onHot(n)}
      onBlur={() => onHot(null)}
      onClick={() => onHot(on ? null : n)}
      aria-pressed={on}
      className={cn(
        "group flex h-full w-full rounded-3xl border p-7 text-left transition-colors duration-500 motion-reduce:transition-none sm:p-8",
        wide ? "flex-row items-center gap-7" : "flex-col sm:min-h-[14.5rem]",
        tone === "gate" && "border-brand/60 bg-[color-mix(in_srgb,var(--color-brand)_8%,var(--color-ink-2))]",
        tone === "aside" && "border-dashed border-line bg-transparent",
        tone === "step" && "border-line bg-ink-2",
        on && "border-brand bg-[color-mix(in_srgb,var(--color-brand)_11%,var(--color-ink-2))]",
      )}
    >
      <span
        className={cn(
          "shrink-0 transition-transform duration-500 motion-reduce:transition-none",
          !wide && "group-hover:-translate-y-1",
        )}
      >
        <Mark i={n} />
      </span>

      <span className={cn("flex min-w-0 flex-1 flex-col", wide ? "" : "mt-6")}>
        <span
          aria-hidden
          className={cn(
            "text-[0.62rem] font-semibold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
            on || tone === "gate" ? "text-brand" : "text-ash",
          )}
        >
          {String(n + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "font-display mt-2 text-2xl font-extrabold uppercase leading-[1.1] transition-colors duration-300 motion-reduce:transition-none",
            on ? "text-brand" : "text-snow",
          )}
        >
          {text}
        </span>
      </span>
    </button>
  );
}

/** The joint between two bands. The dot is the campaign running. */
function Joint({ lit, delay }: { lit: boolean; delay: number }) {
  return (
    <span aria-hidden className="relative flex h-12 w-full items-center justify-center">
      <span
        className={cn(
          "h-full w-px transition-colors duration-400 motion-reduce:transition-none",
          lit ? "bg-brand" : "bg-line",
        )}
      />
      <span
        className="route-run absolute h-2.5 w-2.5 rounded-full bg-brand"
        style={{ animationDelay: delay + "ms" }}
      />
    </span>
  );
}

/** A band of the route. Declared here and not inside the component: a
 *  component created during render is a new type on every render, and React
 *  unmounts and rebuilds everything under it. */
function Band({
  children,
  delay,
  reduced,
}: {
  children: ReactNode;
  delay: number;
  reduced: boolean | null;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function ScopeRoute({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  itemsLead,
  items,
  limitInside,
  limitOutside,
  limitConditional,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  itemsLead: string;
  items: string[];
  /** What the service can do, what stays with sales, and what is negotiable. */
  limitInside: string;
  limitOutside: string;
  limitConditional: string;
}) {
  const reduced = useReducedMotion();
  const [hot, setHot] = useState<number | null>(null);
  const lit = (...n: number[]) => n.some((k) => k === hot);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise key="lead">
              <p className="leading-relaxed text-fog sm:text-lg">{lead}</p>
            </Rise>
          }
        />

        <Rise>
          <p className="text-xs font-semibold uppercase text-brand-text">{itemsLead}</p>
        </Rise>

        <div className="relative mt-8 lg:pl-24" onPointerLeave={() => setHot(null)}>
          {/* What comes back. Drawn up the left because the tenth item is a
              return, not a step: bottom is the middle of the return card and
              top the middle of the first band, so the loop joins both. */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute bottom-[3.6rem] left-8 top-[7rem] hidden w-16 rounded-l-2xl border-b border-l border-t transition-colors duration-400 motion-reduce:transition-none lg:block",
              lit(9) ? "border-brand" : "border-line",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-[5.2rem] top-[6.5rem] hidden transition-colors duration-400 motion-reduce:transition-none lg:block",
              lit(9) ? "text-brand" : "text-line",
            )}
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
              <path d="M6 3l6 5-6 5z" fill="currentColor" />
            </svg>
          </span>

          {/* Who is being reached, and which roles inside them. */}
          <Band delay={0} reduced={reduced}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card n={0} text={items[0]} hot={hot} onHot={setHot} />
              <Card n={1} text={items[1]} hot={hot} onHot={setHot} />
            </div>
          </Band>

          <Joint lit={lit(0, 1, 2)} delay={0} />

          {/* What is offered, where it runs, and what it runs to. */}
          <Band delay={0.05} reduced={reduced}>
            <div className="grid gap-4 lg:grid-cols-3">
              <Card n={2} text={items[2]} hot={hot} onHot={setHot} />
              <Card n={3} text={items[3]} hot={hot} onHot={setHot} />
              <Card n={4} text={items[4]} hot={hot} onHot={setHot} />
            </div>
          </Band>

          <Joint lit={lit(4, 5)} delay={300} />

          {/* The gate. The one item that decides whether anything continues. */}
          <Band delay={0.1} reduced={reduced}>
            <div className="relative">
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-6 -left-2 w-1.5 rounded-full transition-colors duration-400 motion-reduce:transition-none",
                  lit(5) ? "bg-brand" : "bg-brand/45",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-6 -right-2 w-1.5 rounded-full transition-colors duration-400 motion-reduce:transition-none",
                  lit(5) ? "bg-brand" : "bg-brand/45",
                )}
              />
              <Card n={5} text={items[5]} hot={hot} onHot={setHot} tone="gate" wide />
            </div>
          </Band>

          <Joint lit={lit(5, 6)} delay={600} />

          {/* Where a qualified lead goes, and who picks it up. */}
          <Band delay={0.15} reduced={reduced}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card n={6} text={items[6]} hot={hot} onHot={setHot} />
              <Card n={7} text={items[7]} hot={hot} onHot={setHot} />
            </div>
          </Band>

          {/* What the whole thing costs, under the whole thing. */}
          <Band delay={0.2} reduced={reduced}>
            <div className="mt-6">
              <Card n={8} text={items[8]} hot={hot} onHot={setHot} tone="aside" wide />
            </div>
          </Band>

          {/* And what comes back. */}
          <Band delay={0.25} reduced={reduced}>
            <div className="mt-4">
              <Card n={9} text={items[9]} hot={hot} onHot={setHot} tone="aside" wide />
            </div>
          </Band>
        </div>

        {/* Where the work stops. One run, three different kinds of line. */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.26fr)_minmax(0,0.34fr)] lg:gap-0">
          <div>
            <svg viewBox="0 0 200 22" preserveAspectRatio="none" aria-hidden className="hidden h-5 w-full lg:block">
              <path d="M7 11H200" className="stroke-brand" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              <circle cx="7" cy="11" r="5" className="fill-brand" />
            </svg>
            <p className="border-l-2 border-brand pl-5 leading-relaxed text-snow sm:text-lg lg:mt-5 lg:border-l-0 lg:pl-0 lg:pr-8">
              {limitInside}
            </p>
          </div>

          <div>
            <svg viewBox="0 0 200 22" preserveAspectRatio="none" aria-hidden className="hidden h-5 w-full lg:block">
              <path d="M0 11h200" className="stroke-brand" strokeWidth="3" strokeDasharray="7 8" vectorEffect="non-scaling-stroke" />
              <circle cx="4" cy="11" r="5" className="fill-ink-2 stroke-brand" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <p className="border-l-2 border-dashed border-brand pl-5 leading-relaxed text-snow sm:text-lg lg:mt-5 lg:border-l-0 lg:pl-0 lg:pr-8">
              {limitConditional}
            </p>
          </div>

          <div>
            <svg viewBox="0 0 200 22" preserveAspectRatio="none" aria-hidden className="hidden h-5 w-full lg:block">
              <path d="M0 11h182" className="stroke-line" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              <circle cx="4" cy="11" r="5" className="fill-ink-2 stroke-line" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M186 5l10 6-10 6" fill="none" className="stroke-ash" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <p className="border-l-2 border-line pl-5 leading-relaxed text-fog sm:text-lg lg:mt-5 lg:border-l-0 lg:pl-0">
              {limitOutside}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
