"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { categories } from "@/content/ai-hub";
import { diagnostic, services } from "@/content/services/ai-automation";

const EASE = [0.16, 1, 0.3, 1] as const;

/** AI Hub, section 02 of eight: AI & Automation.
 *
 *  THE STRUCTURE IS FROM @monolythdev/ai-agent-pipeline ON 21ST.DEV: a stream
 *  arriving, a node that decides, and a fan-out, with marks travelling the
 *  connectors. That shape is a good one and it is what is kept.
 *
 *  NONE OF ITS CONTENT IS. That component runs a WORKFLOWS counter starting at
 *  1,247 and incrementing every 7.2 seconds to look live, alongside TOKENS
 *  4.2M, AVG LATENCY 342ms, "3 agents · 0 errors" and log lines like "avg
 *  cosine sim 0.89". It also names claude-3-sonnet and pinecone as the stack.
 *  This category's content file is explicit: "FIGURES. The document's own: 15
 *  years. Nothing else is a number and nothing is estimated." So there is not
 *  one number on this section, no vendor is named, and nothing pretends to be
 *  a live reading.
 *
 *  WHAT IT DRAWS INSTEAD, AND WHY THAT. The category's own sentence is "Every
 *  project starts with a paid diagnostic that identifies what to automate and
 *  what should stay manual." That is a fork, and the document writes both
 *  branches out: "Processes that are suitable for automation" and "Processes
 *  that should remain manual". A fan-out where everything gets automated would
 *  contradict the one thing this service promises, so the fork is the drawing:
 *  work arrives, the diagnostic decides, and only one branch carries anything.
 *
 *  THE MANUAL BRANCH HAS NO TRAVELLING MARKS. That is the honest half of the
 *  claim rather than an oversight. Work that should remain manual does not
 *  flow into a machine, so its line is drawn and still.
 *
 *  NOT A REPEAT OF THE SERVICE PAGE. That page draws AgentRun, DiagnosticSheet,
 *  LaunchTrack, ManagedWaypoints and OperationsReach. None of them is this: the
 *  fork as a flow belongs to the hub, where the question is what this service
 *  even decides.
 *
 *  ITS OWN ARRANGEMENT. Section 01 is a text column beside a panel. This one is
 *  a heading over a full-width band, so the page does not open with the same
 *  split twice. */

/* The document's own list of what the diagnostic covers, and its own two
   verdicts, in its order. Read from the content file rather than retyped. */
const COVERS = diagnostic.observe;
const [AUTOMATED, MANUAL] = diagnostic.verdict;

/* The named services, minus the section heading that shares the array. */
const BUILDS = services.items.filter((i) => i.title !== "Our AI").map((i) => i.title);

const NODE = "Automation Diagnostic";

export function AutomationFork() {
  const c = categories[1];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const show = inView || reduced;

  return (
    <section
      id="ai-automation"
      data-section={c.label}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden py-24 sm:py-28"
    >
      <Container className="relative w-full">
        {/* ---- what it is ---- */}
        <div className="max-w-[52ch]">
          <p className="font-display flex items-center gap-3 text-[0.6875rem] font-extrabold uppercase tracking-[0.18em] text-ash">
            <span className="tabular-nums text-brand-text">{c.no}</span>
            <span aria-hidden className="block h-px w-8 bg-line" />
            AI Hub
          </p>

          <h2 className="font-display mt-5 text-[clamp(2rem,5.2vw,3.75rem)] font-extrabold uppercase leading-[0.96] text-snow">
            AI &amp; <span className="text-brand">Automation</span>
          </h2>

          <p className="mt-6 text-[0.9375rem] leading-relaxed text-fog sm:text-base">{c.line}</p>

          <a
            href={c.href}
            className="group mt-8 inline-flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand-text"
          >
            See the service
            <span
              aria-hidden
              className="block h-px w-8 bg-brand transition-all duration-500 group-hover:w-14 motion-reduce:transition-none"
            />
          </a>
        </div>

        {/* ---- the fork ---- */}
        <motion.div
          ref={ref}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE }}
          /* Four columns for four children: the list, the connector, the node,
             the verdicts. Three columns left the verdicts wrapping onto a
             second row, where they sat on top of the list. */
          className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-[minmax(0,0.9fr)_auto_auto_minmax(0,1.2fr)] lg:items-center lg:gap-0"
        >
          {/* What arrives. The document's own list of what the review covers. */}
          <ul className="min-w-0 space-y-2.5">
            {COVERS.map((line, i) => (
              <li key={line} className="relative flex items-center gap-3">
                <span
                  aria-hidden
                  className="block h-1.5 w-1.5 shrink-0 rounded-full bg-ash/60"
                  style={{ opacity: 1 - i * 0.09 }}
                />
                <span className="text-[0.8125rem] leading-snug text-fog sm:text-sm">{line}</span>
              </li>
            ))}
          </ul>

          {/* Into the diagnostic. Horizontal on a wide screen, vertical on a
              phone, with the travelling mark following whichever it is. */}
          <Connector />

          {/* The node that decides. The only brand-edged thing on the left of
              the fork, because it is the only thing being claimed. */}
          <div className="relative mx-auto w-full max-w-[15rem] rounded-xl border border-brand bg-ink-2 px-4 py-4 text-center lg:mx-6 lg:w-[13rem]">
            <p className="font-display text-[0.6875rem] font-extrabold uppercase tracking-[0.16em] text-brand-text">
              {NODE}
            </p>
            <p className="mt-2 text-[0.75rem] leading-snug text-ash">{diagnostic.lead}</p>
          </div>

          {/* The two verdicts, in the document's order. */}
          <div className="min-w-0">
            <div className="relative lg:pl-10">
              {/* The bracket. Drawn with rules rather than curves so it holds
                  its shape at any width, and only on lg where there is a left
                  edge for it to come from. */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-[22%] hidden h-[56%] w-px bg-line lg:block"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-[22%] hidden h-px w-10 bg-line lg:block"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-[22%] left-0 hidden h-px w-10 bg-line lg:block"
              />

              <div className="space-y-4">
                {/* Suitable for automation: the branch that carries work. */}
                <div className="rounded-xl border border-line bg-ink-2 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    />
                    <p className="font-display text-[0.8125rem] font-extrabold uppercase leading-snug tracking-[0.04em] text-snow sm:text-sm">
                      {AUTOMATED}
                    </p>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                    {BUILDS.map((b) => (
                      <li
                        key={b}
                        className="rounded-full border border-line px-2.5 py-1 text-[0.6875rem] leading-none text-fog transition-colors duration-500 hover:border-brand hover:text-snow motion-reduce:transition-none"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Should remain manual: drawn, and still. */}
                <div className="rounded-xl border border-dashed border-line bg-transparent p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full border border-ash/70"
                    />
                    <p className="font-display text-[0.8125rem] font-extrabold uppercase leading-snug tracking-[0.04em] text-ash sm:text-sm">
                      {MANUAL}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/** The line into the diagnostic, with one mark travelling it.
 *
 *  Two elements rather than one because the run turns a corner at lg: a column
 *  on a phone and a row on a wide screen. ci-travel-x and ci-travel-y move in
 *  percentages, so each crosses its whole line whatever that line measures. */
function Connector() {
  return (
    <div aria-hidden className="relative mx-auto lg:mx-0">
      {/* Phone and tablet: down the page. */}
      <div className="relative mx-auto h-10 w-px bg-line lg:hidden">
        <span className="ci-travel-y absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
      </div>
      {/* Wide: across. */}
      <div className="relative hidden h-px w-14 bg-line lg:block xl:w-20">
        <span className="ci-travel-x absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
      </div>
    </div>
  );
}
