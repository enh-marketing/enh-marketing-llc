"use client";

import { Fragment, useState } from "react";
import { motion } from "motion/react";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import type { Stage } from "@/content/services/b2b-lead-generation";

/** The five lead stages, drawn as a chain that changes hands.
 *
 *  WHAT THE TABLE HIDES. The document supplies three columns, and the third one
 *  is not a property of its row: "Details are checked and routed" is what
 *  carries New Enquiry into the next stage. Set as a table the reader has to
 *  assemble the sequence themselves, and set as a single column of blocks the
 *  sequence is there but the most important thing about it is not.
 *
 *  THE MOST IMPORTANT THING IS THAT IT CHANGES HANDS. The document says so in
 *  its own words: the hand-off after a Marketing-Qualified Lead is "Marketing
 *  continues nurturing or sends the lead to sales", and the next stage is
 *  defined by sales having accepted the contact. So the chain does not run
 *  straight down. It runs down one side, crosses at exactly that hand-off, and
 *  continues down the other. Nobody has to be told that something changed; the
 *  line does it.
 *
 *  THE CROSSING IS READ FROM THE COPY. The side a stage sits on is decided by
 *  finding the hand-off that mentions sending the lead onward, not by a number
 *  written in here, so the drawing follows the document if the document moves.
 *
 *  NOTHING NARROWS AND NOTHING IS COUNTED. The chain keeps its width the whole
 *  way and no stage carries a volume or a rate: the document gives none, and a
 *  funnel that tapers would assert attrition it never states. The reader can
 *  run the chain to any stage, which is the section's own point -- a proposal
 *  should say which one it is measuring.
 *
 *  MOTION. Stages arrive on a stagger and then hold. The run of the rail is
 *  driven by the reader, not by a timer, and every transition is cancelled
 *  under prefers-reduced-motion. */

const EASE = [0.16, 1, 0.3, 1] as const;

export function StageTravel({
  columns,
  rows,
  verdict,
  outputs,
}: {
  columns: [string, string, string];
  rows: Stage[];
  verdict: string;
  outputs: string[];
}) {
  const [at, setAt] = useState(0);

  /** Where the lead leaves one team for the other: the first hand-off whose own
   *  wording says it is sent onward. Everything after it sits on the far side. */
  const crossing = Math.max(
    0,
    rows.findIndex((r) => /sends the lead|sent to|hands? (?:it )?(?:over|to)/i.test(r.next)),
  );
  const sideOf = (i: number) => (i <= crossing ? "near" : "far");

  /* A reader who asked for no motion gets the list where it already is. */
  const reduced = usePrefersReducedMotion();

  const marked = (() => {
    if (!outputs.length) return verdict;
    const escaped = outputs.map((o) => o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const re = new RegExp("(" + escaped.join("|") + ")", "g");
    return verdict.split(re).map((part, i) =>
      outputs.includes(part) ? (
        <span key={i} className="text-brand">
          {part}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
  })();

  return (
    <div>
      {/* The two column headings the chain still uses; the third names the
          hand-offs, which sit between stages and so have no column. */}
      <div aria-hidden className="mb-8 flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-line pb-3">
        <span className="text-[0.62rem] font-semibold uppercase text-ash">{columns[0]}</span>
        <span className="text-[0.62rem] font-semibold uppercase text-ash">{columns[1]}</span>
        <span className="ml-auto flex items-center gap-2 text-[0.62rem] font-semibold uppercase text-brand-text">
          <svg viewBox="0 0 22 10" className="h-2.5 w-6" fill="none">
            <path d="M0 5h18m-5-4l5 4-5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {columns[2]}
        </span>
      </div>

      <div className="relative">
        {/* The two runs. Held at the outer edges so the crossing between them
            is the full width of the section and cannot be missed. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="absolute inset-y-0 left-6 w-px bg-line" />
          <div className="absolute inset-y-0 right-6 w-px bg-line" />
        </div>

        <ol className="relative">
          {rows.map((row, i) => {
            const far = sideOf(i) === "far";
            const on = i <= at;
            const isLast = i === rows.length - 1;
            const isCross = i === crossing && !isLast;
            return (
              <li key={row.name}>
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
                  className={cn(far ? "lg:ml-[38%] lg:mr-16" : "lg:ml-16 lg:mr-[38%]")}
                >
                  <button
                    type="button"
                    onClick={() => setAt(i)}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setAt(i);
                    }}
                    aria-pressed={i === at}
                    className={cn(
                      "group relative block w-full rounded-2xl border px-6 py-6 text-left transition-colors duration-400 motion-reduce:transition-none sm:px-8",
                      i === at
                        ? "border-brand bg-brand/[0.07]"
                        : on
                          ? "border-brand/35 bg-ink-3"
                          : "border-line bg-ink-3 hover:border-brand/50",
                    )}
                  >
                    {/* The stub out to the run, and the node on it. */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-1/2 hidden h-px w-10 -translate-y-1/2 transition-colors duration-400 motion-reduce:transition-none lg:block",
                        on ? "bg-brand" : "bg-line",
                        far ? "left-full" : "right-full",
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 transition-colors duration-400 motion-reduce:transition-none lg:block",
                        on ? "border-brand bg-brand" : "border-ash bg-ink-2",
                        far
                          ? "left-[calc(100%+2.5rem)] -translate-x-1/2"
                          : "right-[calc(100%+2.5rem)] translate-x-1/2",
                      )}
                    />

                    <span className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="text-[0.62rem] font-semibold tabular-nums text-brand-text"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "font-display text-[clamp(1.05rem,2vw,1.4rem)] font-extrabold uppercase leading-[1.15] transition-colors duration-300 motion-reduce:transition-none",
                          i === at ? "text-brand" : "text-snow",
                        )}
                      >
                        {row.name}
                      </span>
                    </span>
                    <span className="mt-3 block leading-relaxed text-fog">{row.means}</span>
                  </button>
                </motion.div>

                {/* The hand-off, sitting on the run between the two stages it
                    joins -- and, once, spanning the gap between the two runs.
                    The last row's entry is not a hand-off at all: nothing comes
                    after Opportunity, so it is drawn as the end of the run. */}
                {(
                  <div
                    className={cn(
                      "relative flex py-6",
                      isCross ? "lg:justify-center" : far ? "lg:justify-end" : "lg:justify-start",
                    )}
                  >
                    {isCross && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-6 right-6 top-1/2 hidden h-px -translate-y-1/2 bg-brand lg:block"
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 flex max-w-md items-start gap-3 rounded-full px-5 py-2.5 text-sm leading-snug",
                        isCross
                          ? "border border-brand bg-brand/[0.1] text-snow"
                          : "border border-line bg-ink-2 text-fog",
                        !isCross && (far ? "lg:mr-16" : "lg:ml-16"),
                      )}
                    >
                      <svg viewBox="0 0 22 10" className="mt-1.5 h-2.5 w-5 shrink-0 text-brand" fill="none">
                        {isLast ? (
                          <path d="M0 5h14m0-4v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        ) : (
                          <path d="M0 5h18m-5-4l5 4-5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                      </svg>
                      {row.next}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* The point of the whole section. */}
      <Rise delay={0.1} className="mt-12 border-t border-line pt-9">
        <p className="font-display max-w-4xl text-[clamp(1.15rem,2.3vw,1.75rem)] font-extrabold uppercase leading-[1.18] text-snow">
          {marked}
        </p>
      </Rise>
    </div>
  );
}
