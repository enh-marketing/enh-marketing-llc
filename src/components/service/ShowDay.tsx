"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";
import type { Promise as Commitment } from "@/content/services/event-video";

/** Eight commitments, and the moment everybody already imagines.
 *
 *  THE LEAD NAMES THE SHAPE. Event videography "requires more than arriving
 *  with a camera", and the scope "covers what needs to happen before, during
 *  and after the event". Arriving with a camera is the during. It is the part
 *  every supplier has and the part a client pictures when they think about this
 *  service, and on this page it is one moment -- not a third of the work.
 *
 *  SO THE DAY IS AN INTERRUPTION AND THE MEASURE IS DRAWN. Six commitments run
 *  down before the band and two continue after it, and a bracket beside each
 *  group states the split without a word being added. Pointing at the day
 *  itself lights the six above it, which is the lead's claim made operable: the
 *  band on its own is the thing being dismissed, and the six are what it is
 *  being measured against.
 *
 *  EVERY COMMITMENT IS DRAWN. A programme, a camera and its microphone, the
 *  access route, a stamped permit, the interview chairs, the quote with its
 *  revision rounds, the delivered frames, the two languages. Eight marks, one
 *  per promise, so the section is scannable by eye rather than only by reading
 *  -- which is what the earlier version, all type on a rail, could not do.
 *
 *  NOTHING IS TIMED. No dates, no durations, no order within a side, and no
 *  camera or crew count: the document refuses to fix one anywhere.
 *
 *  MOTION. Entries arrive down the rail toward the day and the band draws
 *  across when it is reached. Transform and opacity only, every entry rests
 *  readable, and all of it is cancelled under prefers-reduced-motion. */

const EASE = [0.16, 1, 0.3, 1] as const;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** One mark per commitment, in the document's order. */
function Commit({ i }: { i: number }) {
  return (
    <g className="text-brand">
      {/* 01 A coverage plan based on the programme. */}
      {i === 0 && (
        <>
          <rect x="8" y="6" width="32" height="36" rx="3" {...S} />
          <path d="M8 15h32" {...S} />
          <path d="M15 20h6M15 27h6M15 34h6" {...S} opacity="0.55" />
          <path d="M26 20h9M26 27h9M26 34h5" {...S} opacity="0.75" />
        </>
      )}
      {/* 02 Camera and audio requirements agreed early. */}
      {i === 1 && (
        <>
          <rect x="5" y="16" width="22" height="16" rx="3" {...S} />
          <path d="M27 22l8-5v14l-8-5z" {...S} />
          <path d="M39 12v10a4 4 0 01-8 0" {...S} opacity="0" />
          <rect x="36" y="10" width="7" height="14" rx="3.5" {...S} opacity="0.85" />
          <path d="M33 22a6.5 6.5 0 0013 0M39.5 28v6M36 34h7" {...S} opacity="0.7" />
        </>
      )}
      {/* 03 Coordination with the organiser and venue. */}
      {i === 2 && (
        <>
          <rect x="6" y="8" width="36" height="32" rx="3" {...S} />
          <path d="M6 24h12M30 24h12M24 8v8M24 32v8" {...S} opacity="0.45" />
          <path d="M14 30l10-10 10 10" {...S} />
          <circle cx="24" cy="20" r="2.6" {...S} />
        </>
      )}
      {/* 04 Permits and location approvals. */}
      {i === 3 && (
        <>
          <path d="M10 4h18l8 8v22a3 3 0 01-3 3H10a3 3 0 01-3-3V7a3 3 0 013-3z" {...S} />
          <path d="M28 4v8h8" {...S} />
          <circle cx="30" cy="32" r="9" {...S} opacity="0.85" />
          <path d="M26 32l3 3 6-6" {...S} />
        </>
      )}
      {/* 05 Interview planning. */}
      {i === 4 && (
        <>
          <path d="M8 40V26a5 5 0 0110 0v14M12 40h2M40 40V26a5 5 0 00-10 0v14M36 40h2" {...S} />
          <circle cx="13" cy="14" r="5" {...S} opacity="0.75" />
          <circle cx="35" cy="14" r="5" {...S} opacity="0.75" />
          <path d="M20 20h8M20 26h8" {...S} opacity="0.5" />
        </>
      )}
      {/* 06 Editing and feedback stated in the quote. */}
      {i === 5 && (
        <>
          <rect x="8" y="5" width="32" height="38" rx="3" {...S} />
          <path d="M15 14h18M15 21h12" {...S} opacity="0.6" />
          <path d="M15 32a7 7 0 1114 0h-3l3 4 3-4h-3" {...S} />
        </>
      )}
      {/* 07 Every version produced together. */}
      {i === 6 && (
        <>
          <rect x="4" y="14" width="20" height="12" rx="2" {...S} />
          <rect x="27" y="12" width="16" height="16" rx="2" {...S} opacity="0.8" />
          <rect x="14" y="30" width="10" height="14" rx="2" {...S} opacity="0.6" />
          <path d="M30 34h12M30 40h8" {...S} opacity="0.5" />
        </>
      )}
      {/* 08 Arabic and English delivery. */}
      {i === 7 && (
        <>
          <path d="M6 10h20a3 3 0 013 3v10a3 3 0 01-3 3H14l-6 5v-5H6a3 3 0 01-3-3V13a3 3 0 013-3z" {...S} />
          <path d="M9 16h12M9 21h8" {...S} opacity="0.6" />
          <path d="M45 22H29a3 3 0 00-3 3v10a3 3 0 003 3h9l6 5v-5h1a3 3 0 003-3V25a3 3 0 00-3-3z" {...S} opacity="0.75" />
          <path d="M31 28h11M35 33h7" {...S} opacity="0.5" />
        </>
      )}
    </g>
  );
}

function Entry({
  item,
  n,
  lit,
  delay,
  reduced,
}: {
  item: Commitment;
  n: number;
  lit: boolean;
  delay: number;
  reduced: boolean | null;
}) {
  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={cn(
        "group relative flex gap-5 py-6 transition-opacity duration-500 motion-reduce:transition-none sm:gap-8",
      )}
    >
      {/* The mark, sitting on the rail. */}
      <span
        aria-hidden
        className={cn(
          "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-ink-2 transition-colors duration-500 motion-reduce:transition-none sm:h-16 sm:w-16",
          lit
            ? "border-brand bg-brand/[0.1]"
            : "border-line group-hover:border-brand/70",
        )}
      >
        <svg viewBox="0 0 48 48" className="h-7 w-7 sm:h-8 sm:w-8">
          <Commit i={n} />
        </svg>
      </span>

      <div className="min-w-0 grid flex-1 gap-x-10 gap-y-2 pt-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-baseline">
        <h3
          className={cn(
            "font-display text-[clamp(1.02rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.14] transition-colors duration-400 motion-reduce:transition-none",
            lit ? "text-brand" : "text-snow group-hover:text-brand",
          )}
        >
          {item.title}
        </h3>
        <p className="leading-relaxed text-fog">{item.body}</p>
      </div>
    </motion.li>
  );
}

export function ShowDay({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  eventLabel,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  leadMark: string;
  /** The point the commitments sit either side of, in the lead's own words. */
  eventLabel: string;
  items: Commitment[];
}) {
  const reduced = useReducedMotion();
  const [litBefore, setLitBefore] = useState(false);

  const before = items.filter((p) => p.side === "before");
  const after = items.filter((p) => p.side === "after");

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
              <p className="leading-relaxed text-fog sm:text-lg">
                <Marked text={lead} mark={leadMark} className="font-display font-extrabold uppercase text-snow" />
              </p>
            </Rise>
          }
        />

        <div className="relative">
          {/* The rail everything hangs on. */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-8 left-7 top-8 w-px bg-line sm:left-8"
          />

          {/* Before the day. */}
          <div className="relative">
            {/* The measure: how much of the work sits on this side. */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-y-6 -left-4 hidden w-3 rounded-l-md border-y border-l transition-colors duration-500 motion-reduce:transition-none lg:block",
                litBefore ? "border-brand" : "border-line",
              )}
            />
            <ul>
              {before.map((p, i) => (
                <Entry
                  key={p.title}
                  item={p}
                  n={items.indexOf(p)}
                  lit={litBefore}
                  delay={i * 0.05}
                  reduced={reduced}
                />
              ))}
            </ul>
          </div>

          {/* The day. One moment, and the only thing here that cuts the width. */}
          {/* A real control, not a hover trick: it has to work on a touch
              screen and from a keyboard, because what it does -- showing how
              much had to be settled before this moment -- is the lead's claim
              rather than an ornament. */}
          <motion.button
            type="button"
            initial={reduced ? false : { opacity: 0, scaleX: 0.9 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            onClick={() => setLitBefore((v) => !v)}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setLitBefore(true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setLitBefore(false);
            }}
            aria-pressed={litBefore}
            aria-label={"Show what is agreed before " + eventLabel}
            className="relative my-4 flex w-full items-center gap-5 rounded-2xl border border-brand/45 bg-[color-mix(in_srgb,var(--color-brand)_9%,transparent)] px-5 py-5 text-left outline-none ring-brand/40 focus-visible:ring-2 sm:gap-7 sm:px-7"
          >
            <span
              aria-hidden
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand sm:h-16 sm:w-16"
            >
              <svg viewBox="0 0 32 32" className="h-7 w-7 text-white sm:h-8 sm:w-8" fill="none">
                <rect x="3" y="10" width="17" height="13" rx="3" stroke="currentColor" strokeWidth="1.9" />
                <path d="M20 15l8-4v10l-8-4z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-display statement font-extrabold uppercase leading-none text-brand">
              {eventLabel}
            </span>
            <span aria-hidden className="ml-auto hidden h-px flex-1 bg-brand/40 sm:block" />
            <span
              aria-hidden
              className={cn(
                "hidden shrink-0 rounded-full border px-3 py-1 text-[0.6rem] font-bold uppercase tabular-nums transition-colors duration-400 motion-reduce:transition-none sm:block",
                litBefore ? "border-brand bg-brand text-white" : "border-brand/50 text-brand",
              )}
            >
              {before.length}
            </span>
          </motion.button>

          {/* After it. */}
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-6 -left-4 hidden w-3 rounded-l-md border-y border-l border-line lg:block"
            />
            <ul
              className={cn(
                "transition-opacity duration-500 motion-reduce:transition-none",
                litBefore && "opacity-40",
              )}
            >
              {after.map((p, i) => (
                <Entry
                  key={p.title}
                  item={p}
                  n={items.indexOf(p)}
                  lit={false}
                  delay={i * 0.05}
                  reduced={reduced}
                />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
