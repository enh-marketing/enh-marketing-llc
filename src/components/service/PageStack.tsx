"use client";

import { useState } from "react";
import { useEnhanced } from "@/lib/useEnhanced";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

/** The businesses, as the thing this service actually manages.
 *
 *  WHY PAGES. Every entry here is a business with a Facebook Page behind it,
 *  and the whole service is running those Pages. A list of ten names, however
 *  it is set, is a list of names; ten Pages side by side is the work. So the
 *  section is ten Pages standing closed, and opening one is what a reader does
 *  all day on this platform: the panel widens, the cover comes up, the feed
 *  underneath it is there.
 *
 *  ONLY ONE IS OPEN, WHICH IS THE POINT. Ten open Pages would be ten cards
 *  again. Closed, a Page is a spine with its name turned on its side; open, it
 *  is a surface with a cover, a profile mark and activity on it. Attention is
 *  the thing this page sells, and the section behaves like it: giving it to one
 *  takes it from the other nine.
 *
 *  NOTHING ON A PAGE IS DATA. The cover, the mark and the activity are drawn
 *  texture -- no counts, no follower numbers, no engagement figures, nothing
 *  the document does not state. Each Page's mark is its own trade, which is
 *  iconography rather than a claim.
 *
 *  THE CAVEAT IS A CHECKPOINT. Its second sentence is the only place on the
 *  page where something has to be approved before it can be published, so it is
 *  drawn as a gate rather than set as small print.
 *
 *  RESPONSIVE. Panels standing on their spines need width. At reading width the
 *  same ten open downward instead, one at a time, which is the same behaviour
 *  in the axis that is actually available. */

const EASE = [0.16, 1, 0.3, 1] as const;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** One mark per trade, in the document's order. */
function Trade({ i }: { i: number }) {
  return (
    <g className="text-brand">
      {i === 0 && (
        <>
          <path d="M12 18h24l-3 22H15z" {...S} />
          <path d="M18 18v-4a6 6 0 0112 0v4" {...S} />
        </>
      )}
      {i === 1 && (
        <>
          <path d="M10 12h12l-2 14a4 4 0 01-8 0z" {...S} />
          <path d="M16 26v14M12 40h8" {...S} />
          <path d="M30 12c6 4 6 10 0 14s-6 10 0 14" {...S} opacity="0.7" />
        </>
      )}
      {i === 2 && (
        <>
          <path d="M8 24l16-14 16 14" {...S} />
          <path d="M13 22v18h22V22" {...S} />
          <path d="M20 40v-10h8v10" {...S} opacity="0.7" />
        </>
      )}
      {i === 3 && (
        <>
          <path d="M24 12v18M15 21h18" {...S} />
          <path d="M8 34h6l3-6 5 12 4-8h14" {...S} opacity="0.75" />
        </>
      )}
      {i === 4 && (
        <>
          <path d="M8 20l16-8 16 8-16 8z" {...S} />
          <path d="M14 24v10c0 3 5 5 10 5s10-2 10-5V24" {...S} opacity="0.7" />
        </>
      )}
      {i === 5 && (
        <>
          <circle cx="24" cy="26" r="12" {...S} />
          <circle cx="24" cy="26" r="4" {...S} />
          <path d="M24 14v-4M24 42v-4M12 26h-4M40 26h-4" {...S} opacity="0.65" />
        </>
      )}
      {i === 6 && (
        <>
          <path d="M10 16h28v22H10z" {...S} />
          <path d="M10 16l14-6 14 6" {...S} opacity="0.7" />
          <circle cx="18" cy="27" r="3" {...S} />
          <circle cx="30" cy="27" r="3" {...S} />
        </>
      )}
      {i === 7 && (
        <>
          <rect x="10" y="10" width="28" height="28" rx="3" {...S} />
          <path d="M17 20h14M17 28h9" {...S} opacity="0.7" />
        </>
      )}
      {i === 8 && (
        <>
          <rect x="8" y="18" width="22" height="14" rx="2" {...S} />
          <path d="M30 22h6l4 6v4h-10z" {...S} />
          <circle cx="16" cy="36" r="4" {...S} />
          <circle cx="34" cy="36" r="4" {...S} />
        </>
      )}
      {i === 9 && (
        <>
          <circle cx="17" cy="18" r="5" {...S} />
          <path d="M9 32a8 8 0 0116 0" {...S} />
          <circle cx="32" cy="18" r="5" {...S} opacity="0.7" />
          <path d="M24 32a8 8 0 0116 0" {...S} opacity="0.7" />
          <path d="M12 40h24" {...S} opacity="0.5" />
        </>
      )}
    </g>
  );
}

/** The open Page. Drawn texture only: a cover, a mark and activity. */
function Surface({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 300 220" aria-hidden className="block h-full w-full">
      <rect width="300" height="78" rx="4" className="fill-brand/[0.16]" />
      <path d="M0 78h300" className="stroke-brand/40" strokeWidth="1.2" />
      <circle cx="52" cy="78" r="26" className="fill-ink-2 stroke-brand" strokeWidth="1.6" />
      <g transform="translate(28 54)">
        <Trade i={i} />
      </g>
      <rect x="88" y="92" width="96" height="8" rx="4" className="fill-snow/45" />
      <rect x="88" y="106" width="62" height="6" rx="3" className="fill-fog/25" />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x="18" y={130 + k * 30} width="264" height="20" rx="4" className="fill-ink-2" />
          <circle cx="32" cy={140 + k * 30} r="6" className="fill-ash/40" />
          <rect x="46" y={136 + k * 30} width={k % 2 ? 120 : 176} height="6" rx="3" className="fill-fog/25" />
          <rect x="252" y={136 + k * 30} width="18" height="6" rx="3" className="fill-brand/50" />
        </g>
      ))}
    </svg>
  );
}

export function PageStack({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
  caveatLead,
  caveatGate,
  caveatGateMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: string[];
  /** The first sentence of the caveat: what changes with the industry. */
  caveatLead: string;
  /** The second: what has to be approved before it can be published. */
  caveatGate: string;
  caveatGateMark: string;
}) {
  const reduced = useReducedMotion();
  /* Only above this width can a Page stand on its spine. Below it every Page
     is open and the row is swiped instead, which is why the names exist once
     in the markup rather than once per layout. */
  const wide = useEnhanced("(min-width: 1024px)");
  const [open, setOpen] = useState(0);

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
              <p className="statement font-display font-extrabold uppercase leading-[1.16] text-snow">
                {caveatLead}
              </p>
            </Rise>
          }
        />

        {/* Ten Pages. Above the large breakpoint they stand closed and opening
            one closes the others; below it each Page is open at its own width
            and the row is swiped. One list either way. */}
        <motion.ul
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
          data-lenis-prevent=""
          className="no-scrollbar flex snap-x snap-mandatory gap-px overflow-x-auto rounded-2xl border border-line bg-line lg:h-[27rem] lg:snap-none lg:overflow-hidden"
        >
          {items.map((name, i) => {
            const shown = !wide || i === open;
            return (
              <li
                key={name}
                style={wide ? { flex: shown ? "5 1 0%" : "1 1 0%" } : undefined}
                className="w-[15rem] shrink-0 snap-center transition-[flex] duration-500 ease-out motion-reduce:transition-none lg:w-auto lg:min-w-0 lg:shrink"
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setOpen(i);
                  }}
                  onFocus={() => setOpen(i)}
                  aria-pressed={shown}
                  className={cn(
                    "flex h-full w-full flex-col overflow-hidden p-4 text-left transition-colors duration-400 motion-reduce:transition-none lg:p-5",
                    shown ? "bg-ink-2" : "bg-ink-3 hover:bg-[color-mix(in_srgb,var(--color-brand)_5%,var(--color-ink-3))]",
                  )}
                >
                  {/* The name. On its side while the Page is closed, and only
                      then: it is the same element either way. */}
                  <span
                    className={cn(
                      "flex min-w-0 items-center gap-3",
                      wide && !shown && "flex-col justify-start gap-4",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "shrink-0 text-[0.58rem] font-bold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                        shown ? "text-brand" : "text-ash",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <svg viewBox="0 0 48 48" aria-hidden className="h-6 w-6 shrink-0">
                      <Trade i={i} />
                    </svg>
                    <span
                      style={wide && !shown ? { writingMode: "vertical-rl" } : undefined}
                      className={cn(
                        "min-w-0 text-[0.82rem] font-semibold leading-snug transition-colors duration-300 motion-reduce:transition-none",
                        shown ? "text-snow" : "whitespace-nowrap text-fog",
                      )}
                    >
                      {name}
                    </span>
                  </span>

                  {/* The Page itself, once it is open. */}
                  <span
                    className={cn(
                      "mt-4 min-h-0 flex-1 transition-opacity duration-400 motion-reduce:transition-none",
                      shown ? "opacity-100 delay-150" : "pointer-events-none h-0 opacity-0",
                    )}
                  >
                    <span className="block h-full w-[13rem] lg:w-[24rem]">
                      <Surface i={i} />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </motion.ul>

        {/* The checkpoint. */}
        <Rise delay={0.1} className="mt-10">
          <div className="flex flex-col gap-6 rounded-2xl border border-brand/40 bg-brand/[0.05] px-6 py-7 sm:flex-row sm:items-center sm:gap-10 sm:px-9">
            <svg
              viewBox="0 0 150 64"
              role="img"
              aria-label="Work moving along a line, stopped at a checkpoint before it continues."
              className="h-14 w-36 shrink-0"
            >
              <path d="M4 32h44" className="stroke-ash" strokeWidth="1.6" strokeLinecap="round" />
              <rect x="10" y="24" width="16" height="16" rx="3" className="fill-brand/60" />
              <rect x="56" y="8" width="34" height="48" rx="6" fill="none" className="stroke-brand" strokeWidth="1.8" />
              <path d="M65 32l5 6 11-13" fill="none" className="stroke-brand" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M98 32h44" className="stroke-brand" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="6 6" />
              <path d="M132 26l8 6-8 6" fill="none" className="stroke-brand" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="leading-relaxed text-fog sm:text-lg">
              <Marked text={caveatGate} mark={caveatGateMark} className="font-semibold text-snow" />
            </p>
          </div>
        </Rise>
      </Container>
    </section>
  );
}
