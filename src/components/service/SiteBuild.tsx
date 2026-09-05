"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Stage } from "@/content/services/intelligent-web";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;
const FW = 240;
const FH = 176;

/** The project, drawn as the five things it puts in front of you.
 *
 *  WHY NOT A TIMELINE. The version before this was a hairline down the left with
 *  five circles on it and five paragraphs beside it. It was accurate and it was
 *  thin line art: a rule and some text, with no object anywhere in the section.
 *
 *  Every step of this run produces something a client actually sees, and the
 *  document says so: a review of the current site, "a written scope, timeline
 *  and cost", the built pages, the site tested "across devices and browsers",
 *  and the live site under the managed service. So the section is those five
 *  artifacts at size, in a row, with the same site visibly changing from the
 *  first frame to the last. The fork stays, but it is on the scope document
 *  where it belongs rather than being a kink in a line: the recommendation is
 *  where "whether the existing website can support them" is answered, and the
 *  document's own two outcomes are printed on it.
 *
 *  NO CONTENT, NO FIGURES, NO DATES. Copy is bars. The scope sheet carries a
 *  timeline and a cost line with nothing written on them, because the document
 *  states neither, and FAQ 6 and 7 both refuse to. */
export function SiteBuild({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
  forkAt,
  fork,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  stages: Stage[];
  /** Zero-based index of the step that decides the shape of the rest. */
  forkAt: number;
  /** The two outcomes, verbatim. */
  fork: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const reduced = usePrefersReducedMotion();
  const show = inView || reduced;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "contrast", label: "Five things you are handed" }}
          className="mb-12"
        />

        <div ref={ref}>
          {/* The run of artifacts. Scrolls sideways on a phone rather than
              shrinking to five unreadable thumbnails. */}
          <div className="-mx-6 overflow-x-auto px-6 pb-4 sm:mx-0 sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max gap-4 sm:min-w-0 sm:grid sm:grid-cols-5 sm:gap-3 lg:gap-4">
              {stages.map((s, i) => (
                <motion.div
                  key={s.no}
                  initial={reduced ? false : { opacity: 0, y: 22 }}
                  animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.09 }}
                  className="w-[240px] shrink-0 sm:w-auto"
                >
                  <div
                    className={cn(
                      "overflow-hidden rounded-xl border-2 bg-ink-3 transition-colors duration-500 motion-reduce:transition-none",
                      i === forkAt ? "border-brand/55" : "border-line",
                    )}
                  >
                    <svg viewBox={`0 0 ${FW} ${FH}`} className="block h-auto w-full">
                      <rect x="0" y="0" width={FW} height={FH} fill="var(--color-ink-3)" />
                      {i === 0 && <Reviewed />}
                      {i === 1 && <Scope />}
                      {i === 2 && <Built />}
                      {i === 3 && <Tested />}
                      {i === 4 && <Watched />}
                    </svg>
                  </div>
                  <p
                    className={cn(
                      "font-display mt-4 text-[0.625rem] font-bold tabular-nums",
                      i === forkAt ? "text-brand-text" : "text-ash",
                    )}
                  >
                    {s.no}
                  </p>
                  <p className="font-display mt-1.5 text-[0.9375rem] font-bold uppercase leading-tight text-snow">
                    {s.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* The rail the run sits on, so the five read as one project rather
              than five pictures. */}
          <div aria-hidden className="relative mt-8 hidden h-0.5 w-full bg-line sm:block">
            <motion.span
              className="absolute inset-y-0 left-0 origin-left bg-brand"
              style={{ width: "100%" }}
              initial={reduced ? false : { scaleX: 0 }}
              animate={show ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
            />
            <svg viewBox="0 0 200 2" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <rect className="ci-scan-x" x="-20" y="0" width="20" height="2" fill="var(--color-brand-hot)" />
            </svg>
            {stages.map((s, i) => (
              <span
                key={s.no}
                className={cn(
                  "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand",
                  i === forkAt ? "h-4 w-4 bg-brand" : "h-3 w-3 bg-void",
                )}
                style={{ left: `${((i + 0.5) / stages.length) * 100}%` }}
              />
            ))}
          </div>

          {/* What each one is. */}
          <ol className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {stages.map((s, i) => (
              <motion.li
                key={s.no}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.35 + i * 0.06 }}
                className="group border-t border-line py-5"
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className={cn(
                      "font-display shrink-0 text-[0.625rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                      i === forkAt ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                    )}
                  >
                    {s.no}
                  </span>
                  <p className="font-display text-[0.875rem] font-bold uppercase leading-tight text-snow">
                    {s.title}
                  </p>
                </div>
                <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                  {s.body}
                </p>
                {i === forkAt && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {fork.map((f) => (
                      <li
                        key={f}
                        className="font-display cursor-default rounded-full border border-brand/50 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase leading-none tracking-[0.04em] text-brand-text transition-colors duration-300 hover:border-brand hover:bg-brand/[0.06] motion-reduce:transition-none"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------- the artifacts -- */

function Page({ marks = false }: { marks?: boolean }) {
  return (
    <>
      <rect x="24" y="20" width={FW - 48} height="18" rx="6" fill="var(--color-ink-2)" />
      <rect x="34" y="26" width="52" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.3" />
      <rect x="24" y="50" width="118" height="11" rx="5.5" fill="var(--color-ash)" fillOpacity={marks ? 0.3 : 0.24} />
      <rect x="24" y="70" width={FW - 62} height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.2" />
      <rect x="24" y="84" width={FW - 96} height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.2" />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={24 + k * 66} y="108" width="56" height="44" rx="5" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.2" />
      ))}
    </>
  );
}

/** 01. The site that is already there, and what the review finds on it. */
function Reviewed() {
  return (
    <>
      <Page marks />
      {[
        [24, 46, 118, 19],
        [24, 66, 154, 15],
        [90, 104, 56, 52],
      ].map(([x, y, w, h], k) => (
        <g key={k}>
          <rect x={x} y={y} width={w} height={h} rx="4" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeDasharray="4 4" />
          <circle cx={(x as number) + (w as number) + 8} cy={(y as number) + (h as number) / 2} r="5" fill="none" stroke="var(--color-brand)" strokeWidth="1.6" />
          <circle
            className="ci-blink"
            cx={(x as number) + (w as number) + 8}
            cy={(y as number) + (h as number) / 2}
            r="3"
            fill="var(--color-brand)"
            style={{ animationDelay: `${(k * 2).toFixed(2)}s` }}
          />
        </g>
      ))}
    </>
  );
}

/** 02. The written scope, timeline and cost, and the question it answers. */
function Scope() {
  return (
    <>
      <rect x="34" y="14" width={FW - 68} height={FH - 28} rx="8" fill="var(--color-ink-2)" stroke="var(--color-brand)" strokeWidth="2" />
      <rect x="52" y="34" width="86" height="9" rx="4.5" fill="var(--color-brand)" fillOpacity="0.6" />
      <line x1="52" y1="56" x2={FW - 52} y2="56" stroke="var(--color-line)" strokeWidth="1.2" />
      {/* Scope, timeline and cost: three lines with nothing written on them,
          because the document states no duration and no price. */}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x="52" y={70 + k * 22} width="44" height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.32" />
          <rect x="106" y={70 + k * 22} width={FW - 158} height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.18" />
        </g>
      ))}
      {/* The two answers the recommendation can come back with. */}
      <line x1="52" y1="144" x2={FW - 52} y2="144" stroke="var(--color-line)" strokeWidth="1.2" />
      {[0, 1].map((k) => (
        <g key={k}>
          <rect
            x={52 + k * 70}
            y="152"
            width="60"
            height="14"
            rx="7"
            fill={k === 0 ? "var(--color-brand)" : "none"}
            fillOpacity={k === 0 ? 0.16 : 1}
            stroke="var(--color-brand)"
            strokeWidth="1.6"
            strokeOpacity={k === 0 ? 1 : 0.4}
          />
          {k === 0 && (
            <path className="ci-draw" d="M64 159 l5 5 l10 -11" pathLength={100} stroke="var(--color-brand)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </g>
      ))}
    </>
  );
}

/** 03. The pages being made: some placed, some still outlines. */
function Built() {
  return (
    <>
      <rect x="24" y="20" width={FW - 48} height="18" rx="6" fill="var(--color-ink-2)" />
      <rect x="34" y="26" width="52" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.3" />
      <rect x="24" y="50" width="118" height="11" rx="5.5" fill="var(--color-ash)" fillOpacity="0.34" />
      <rect x="24" y="70" width={FW - 62} height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.24" />
      <rect x="24" y="84" width={FW - 96} height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.24" />
      {[0, 1, 2].map((k) => (
        <rect
          key={k}
          x={24 + k * 66}
          y="108"
          width="56"
          height="44"
          rx="5"
          fill={k < 2 ? "var(--color-ink-2)" : "none"}
          stroke={k < 2 ? "var(--color-line)" : "var(--color-brand)"}
          strokeWidth={k < 2 ? 1.2 : 1.8}
          strokeDasharray={k < 2 ? undefined : "5 5"}
        />
      ))}
      <rect x="24" y="164" width="92" height="4" rx="2" fill="var(--color-ash)" fillOpacity="0.2" />
      <rect className="ci-grow-x" x="24" y="164" width="92" height="4" rx="2" fill="var(--color-brand)" />
    </>
  );
}

/** 04. The same site at three widths, checked. */
function Tested() {
  return (
    <>
      <rect x="18" y="34" width="112" height="86" rx="6" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.5" />
      <rect x="28" y="46" width="60" height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.28" />
      <rect x="28" y="62" width="92" height="5" rx="2.5" fill="var(--color-ash)" fillOpacity="0.18" />

      <rect x="142" y="46" width="56" height="74" rx="6" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.5" />
      <rect x="150" y="58" width="34" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.28" />

      <rect x="206" y="58" width="30" height="62" rx="5" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.5" />
      <rect x="212" y="68" width="18" height="5" rx="2.5" fill="var(--color-ash)" fillOpacity="0.28" />

      {/* Checked, one after another. */}
      {[62, 144, 208].map((x, k) => (
        <g key={x}>
          <circle cx={x + 12} cy="146" r="9" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" />
          <path
            className="ci-draw"
            d={`M${x + 7} 146 l4 4 l8 -9`}
            pathLength={100}
            stroke="var(--color-brand)"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: `${(k * 1.4).toFixed(2)}s` }}
          />
        </g>
      ))}
    </>
  );
}

/** 05. Live, and watched, which does not end. */
function Watched() {
  return (
    <>
      <Page />
      <rect x="24" y="20" width={FW - 48} height="18" rx="6" fill="var(--color-brand)" fillOpacity="0.1" />
      <circle cx="34" cy="29" r="4" fill="none" stroke="var(--color-brand)" strokeWidth="1.4" />
      <circle className="ci-blink" cx="34" cy="29" r="3" fill="var(--color-brand)" />
      {/* The sweep that keeps going over it. */}
      <svg x="0" y="0" width={FW} height={FH} viewBox="0 0 200 176" preserveAspectRatio="none">
        <rect className="ci-scan-x" x="-16" y="0" width="16" height="176" fill="var(--color-brand)" fillOpacity="0.09" />
        <rect className="ci-scan-x" x="-2" y="0" width="2" height="176" fill="var(--color-brand)" fillOpacity="0.4" />
      </svg>
    </>
  );
}
