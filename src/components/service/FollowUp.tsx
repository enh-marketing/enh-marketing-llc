"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

const EASE = [0.16, 1, 0.3, 1] as const;
/** Fixed, so the hairpin that joins the two legs can be positioned exactly
 *  rather than guessed at from whatever the longest label wraps to. */
const LEG_H = 132;

/** Follow-up, drawn as the doubling back it describes.
 *
 *  WHY A SWITCHBACK. The section's subject is not eight support items, it is
 *  returning: "Multi-session programmes include follow-up at agreed stages",
 *  and the reason given is that one pass does not hold. Eight rows travelling
 *  one way would say the opposite. So the path turns. It runs out across the
 *  first four, rounds a hairpin, and comes back across the second four, which
 *  are set right to left because that is the direction the return is travelled.
 *  The stations arrive in that order too, so the turn is watched rather than
 *  inferred.
 *
 *  The rails and the hairpin are borders on positioned boxes, not a stretched
 *  viewBox: a path drawn in a viewBox with preserveAspectRatio="none" has its
 *  corner radii squashed by whatever width the container happens to be.
 *
 *  BELOW LG a switchback of one column is just a list with a bend in it, so it
 *  becomes a plain spine there and the return is carried by the copy. */
export function FollowUp({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  intro,
  items,
  closing,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  lead: string;
  intro: string;
  items: string[];
  closing: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();

  const out = items.slice(0, 4);
  /** Reversed, because the return leg is travelled the other way. */
  const back = items.slice(4).reverse();

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "ecosystem", label: "Out, and back again" }}
          className="mb-12"
        />

        <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <Rise>
            <p className="max-w-[62ch] text-base leading-relaxed text-fog sm:text-lg">{lead}</p>
          </Rise>
          <Rise delay={0.08}>
            <p className="font-display max-w-[20ch] text-[clamp(1.05rem,1.9vw,1.5rem)] font-extrabold uppercase leading-[1.15] text-snow lg:justify-self-end">
              {intro}
            </p>
          </Rise>
        </div>

        <div ref={ref} className="mt-14">
          {/* ── the switchback, at lg and up ─────────────────────────────── */}
          <div className="relative hidden pr-16 lg:block">
            {/* The hairpin: joins the end of the out leg to the end of the
                return leg. Height is exactly one leg, so it lands on both rails. */}
            <span
              aria-hidden
              className="absolute right-0 top-0 w-16 rounded-r-[2rem] border-y-2 border-r-2 border-brand"
              style={{ height: LEG_H }}
            />

            <Leg
              entries={out}
              startDelay={0}
              reduced={reduced}
              inView={inView}
              height={LEG_H}
            />
            <Leg
              entries={back}
              startDelay={0.5}
              reduced={reduced}
              inView={inView}
              height={LEG_H}
              rtl
            />
          </div>

          {/* ── one spine, below lg ──────────────────────────────────────── */}
          <ol className="border-l-2 border-brand/60 lg:hidden">
            {items.map((entry) => (
              <li key={entry} className="flex items-center gap-3 py-3">
                <span aria-hidden className="h-0.5 w-5 shrink-0 bg-brand/60" />
                <span className="text-[0.9375rem] leading-snug text-snow">{entry}</span>
              </li>
            ))}
          </ol>
        </div>

        <Rise delay={0.14} className="mt-12 border-t-2 border-line pt-8">
          <p className="max-w-[70ch] text-base leading-relaxed text-fog">{closing}</p>
        </Rise>
      </Container>
    </section>
  );
}

/** One leg of the run: a rail, and four places the programme comes back to. */
function Leg({
  entries,
  startDelay,
  reduced,
  inView,
  height,
  rtl = false,
}: {
  entries: string[];
  startDelay: number;
  reduced: boolean;
  inView: boolean;
  height: number;
  rtl?: boolean;
}) {
  return (
    <div style={{ height }} className="relative">
      {/* The rail. Open at the far end, because the run continues round it. */}
      <span
        aria-hidden
        className={`absolute top-0 block h-0.5 bg-brand ${rtl ? "left-0 right-0" : "left-0 right-0"}`}
      />
      <ol className="grid grid-cols-4 gap-x-8 pt-0" dir={rtl ? "rtl" : "ltr"}>
        {entries.map((entry, i) => (
          <motion.li
            key={entry}
            dir="ltr"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: EASE, delay: startDelay + i * 0.09 }}
            className={rtl ? "text-right" : undefined}
          >
            {/* The tick that plants the station on the rail. */}
            <span
              aria-hidden
              className={`block h-4 w-0.5 bg-brand ${rtl ? "ml-auto" : ""}`}
            />
            <span className="mt-4 block max-w-[26ch] text-[0.9375rem] font-medium leading-snug text-snow">
              {entry}
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
