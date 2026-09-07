"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { categories } from "@/content/ai-hub";
import { diagnostic } from "@/content/services/ai-automation";

/** AI Hub, section 02: AI & Automation.
 *
 *  THIS IS @monolythdev/ai-agent-pipeline FROM 21ST.DEV, KEPT. Its card, its
 *  header row, its SVG at the same 580x172 viewBox, its node rectangles at the
 *  same coordinates, its dashed connector paths and arrow marker, its
 *  animateMotion dots trailing along those paths in threes and twos, its
 *  pulsing dots inside the highlighted node, its rotating message line and its
 *  footer strip. The geometry is not redrawn.
 *
 *  WHAT IS CHANGED IS THE CONTENT AND THE PALETTE, which is the whole job:
 *
 *  COLOUR. #0052FF becomes our brand red, and #090909 / #141414 / #050D1C
 *  become the surface ladder. The card sets the dark theme's tokens on itself,
 *  which globals.css calls a dark chapter, so the SVG can reach for
 *  var(--color-*) and stay in the palette rather than carrying hardcoded hex.
 *
 *  FIGURES, ALL REMOVED. The original's footer runs WORKFLOWS 1,247 and
 *  increments it every 7.2 seconds to look live, beside TOKENS 4.2M and AVG
 *  LATENCY 342ms, its header claims "3 agents · 0 errors", and its log says
 *  things like "avg cosine sim 0.89" and "847 tokens". This category's content
 *  file is explicit: "FIGURES. The document's own: 15 years. Nothing else is a
 *  number and nothing is estimated." So the footer carries the document's two
 *  verdicts instead of counters, and the only digit on the section is its own
 *  number.
 *
 *  VENDORS, ALL REMOVED. The original labels its nodes pinecone and
 *  claude-3-sonnet. The client's document names no tools, so neither does this.
 *
 *  EVERY WORD IS THE DOCUMENT'S. The three stages are its own review, mapping
 *  and recommendation. The three outputs are the three things it says the
 *  proposal contains, verbatim and in its order. The ten log lines are its five
 *  covered items, its two verdicts and its three proposal items, which happens
 *  to be exactly the ten the original had.
 *
 *  ONE STRUCTURAL CHANGE, FOR PHONES. The original is a fixed w-[620px] card,
 *  which simply does not fit a 375px screen. The card is fluid here and the
 *  drawing scrolls sideways under it, so the labels keep the size they were
 *  drawn at instead of shrinking to six pixels. */

/* The document's own, in its own order: five things the review covers, the two
   verdicts it reaches, and the three things the proposal contains. Ten lines,
   which is what the original rotated through. */
const LOG = [...diagnostic.observe, ...diagnostic.verdict, ...diagnostic.proposal];

const [AUTOMATED, MANUAL] = diagnostic.verdict;

/* The three stages, and the three things the proposal contains. */
const STAGES = {
  one: { eyebrow: "REVIEW", title: "Current process" },
  two: { eyebrow: "MAPPING", title: "Process mapping" },
  three: { eyebrow: "RECOMMENDATION", title: "Written" },
};
const OUTPUTS = diagnostic.proposal;

const PATHS = {
  p1: "M116,88 L158,88",
  p2: "M268,88 L306,88",
  p3: "M411,88 C425,88 435,50 448,50",
  p4: "M411,88 L448,88",
  p5: "M411,88 C425,88 435,126 448,126",
};

/** A mark running the path, exactly as the original does it. */
function RunningDot({
  path,
  duration,
  delay,
  size,
  opacity,
}: {
  path: string;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}) {
  return (
    <circle r={size} fill="var(--color-brand)" opacity={opacity}>
      <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`} path={path} />
    </circle>
  );
}

function PulsingDot({ cx, delay }: { cx: number; delay: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={113}
      r={2.8}
      fill="var(--color-brand)"
      animate={{ opacity: [0.15, 1, 0.15] }}
      transition={{ duration: 1.2, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function AutomationPipeline() {
  const c = categories[1];
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % LOG.length), 2700);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section
      id="ai-automation"
      data-section={c.label}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden py-24 sm:py-28"
    >
      <Container className="relative w-full">
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

        {/* The card. A dark chapter, so every var(--color-*) below resolves to
            the dark set and the drawing needs no hardcoded colour. */}
        <div className="mt-12 overflow-hidden rounded-[14px] border border-line bg-void [--color-ash:#8c8c87] [--color-brand-text:#ff2e3a] [--color-fog:#a3a39e] [--color-ink-2:#171717] [--color-ink-3:#1e1e1e] [--color-ink:#101010] [--color-line:#2e2e2e] [--color-snow:#f7f7f5] [--color-void:#090909] sm:mt-14">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-[18px] py-[11px]">
            <div className="flex items-center gap-[7px]">
              <motion.span
                aria-hidden
                className="inline-block h-[6px] w-[6px] rounded-full bg-brand"
                animate={reduced ? { opacity: 1 } : { opacity: [1, 0.2, 1] }}
                transition={reduced ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-display text-[11px] uppercase tracking-[0.14em] text-ash">
                Automation Diagnostic
              </span>
            </div>
            {/* The original claims "3 agents · 0 errors" here. Counts are not
                available and not invented, so this states the terms instead. */}
            <span className="text-[11px] text-ash">Paid review</span>
          </div>

          {/* The drawing. Scrolls sideways rather than shrinking, so the labels
              hold the size they were drawn at on a phone. */}
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <svg viewBox="0 0 580 172" className="block w-full min-w-[580px]" role="img" aria-label={`${STAGES.one.title}, ${STAGES.two.title}, ${STAGES.three.title} recommendation, producing: ${OUTPUTS.join(", ")}`}>
              <defs>
                <marker id="af-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path
                    d="M2 1.5L7.5 5L2 8.5"
                    fill="none"
                    stroke="var(--color-brand)"
                    strokeOpacity="0.45"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>
              </defs>

              {[PATHS.p1, PATHS.p2].map((d) => (
                <path key={d} d={d} fill="none" stroke="var(--color-brand)" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="3 5" markerEnd="url(#af-arrow)" />
              ))}
              {[PATHS.p3, PATHS.p4, PATHS.p5].map((d) => (
                <path key={d} d={d} fill="none" stroke="var(--color-brand)" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="3 5" />
              ))}

              {/* SMIL ignores prefers-reduced-motion, so these are not rendered
                  at all rather than animated and hoped for. */}
              {!reduced && (
                <>
                  <RunningDot path={PATHS.p1} duration={1.05} delay={0} size={2.5} opacity={1} />
                  <RunningDot path={PATHS.p1} duration={1.05} delay={0.35} size={1.8} opacity={0.65} />
                  <RunningDot path={PATHS.p1} duration={1.05} delay={0.7} size={1.3} opacity={0.35} />
                  <RunningDot path={PATHS.p2} duration={0.88} delay={0.18} size={2.5} opacity={1} />
                  <RunningDot path={PATHS.p2} duration={0.88} delay={0.62} size={1.8} opacity={0.65} />
                  <RunningDot path={PATHS.p3} duration={1.3} delay={0.08} size={2.2} opacity={0.9} />
                  <RunningDot path={PATHS.p3} duration={1.3} delay={0.65} size={1.5} opacity={0.55} />
                  <RunningDot path={PATHS.p4} duration={1.15} delay={0.28} size={2.2} opacity={0.9} />
                  <RunningDot path={PATHS.p4} duration={1.15} delay={0.85} size={1.5} opacity={0.55} />
                  <RunningDot path={PATHS.p5} duration={1.4} delay={0.45} size={2.2} opacity={0.9} />
                  <RunningDot path={PATHS.p5} duration={1.4} delay={1.0} size={1.5} opacity={0.55} />
                </>
              )}

              {/* Stage one */}
              <rect x="16" y="66" width="100" height="44" rx="8" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="0.5" />
              <text x="66" y="83" textAnchor="middle" fontSize="9.5" fill="var(--color-ash)" letterSpacing=".07em">{STAGES.one.eyebrow}</text>
              <text x="66" y="100" textAnchor="middle" fontSize="12" fill="var(--color-snow)">{STAGES.one.title}</text>

              {/* Stage two */}
              <rect x="158" y="66" width="110" height="44" rx="8" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="0.5" />
              <text x="213" y="83" textAnchor="middle" fontSize="9.5" fill="var(--color-ash)" letterSpacing=".07em">{STAGES.two.eyebrow}</text>
              <text x="213" y="100" textAnchor="middle" fontSize="12" fill="var(--color-snow)">{STAGES.two.title}</text>

              {/* Stage three, the highlighted node */}
              <rect x="306" y="53" width="105" height="70" rx="10" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="1" />
              <rect x="318" y="53.5" width="80" height="1" rx="0.5" fill="var(--color-brand)" fillOpacity="0.5" />
              <text x="358" y="78" textAnchor="middle" fontSize="8" fill="var(--color-brand-text)" letterSpacing=".04em">{STAGES.three.eyebrow}</text>
              <text x="358" y="97" textAnchor="middle" fontSize="13" fill="var(--color-snow)" fontWeight="500">{STAGES.three.title}</text>
              {reduced ? (
                [346, 358, 370].map((cx) => <circle key={cx} cx={cx} cy={113} r={2.8} fill="var(--color-brand)" opacity={0.7} />)
              ) : (
                <>
                  <PulsingDot cx={346} delay={0} />
                  <PulsingDot cx={358} delay={0.4} />
                  <PulsingDot cx={370} delay={0.8} />
                </>
              )}

              {/* The three outputs: what the document says the proposal contains. */}
              {OUTPUTS.map((label, k) => {
                const y = [35, 73, 111][k];
                return (
                  <g key={label}>
                    <rect x="448" y={y} width="116" height="30" rx="7" fill="var(--color-ink)" stroke="var(--color-line)" strokeWidth="0.5" />
                    <text x="506" y={y + 14} textAnchor="middle" fontSize="8.5" fill="var(--color-fog)">
                      {label.length > 26 ? label.slice(0, label.lastIndexOf(" ", 26)) : label}
                    </text>
                    {label.length > 26 && (
                      <text x="506" y={y + 24} textAnchor="middle" fontSize="8.5" fill="var(--color-fog)">
                        {label.slice(label.lastIndexOf(" ", 26) + 1)}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* The rotating line. The document's own words, one at a time. */}
          <div className="h-[52px] border-t border-line px-[18px] py-[9px]">
            <div className="flex h-full items-start gap-2">
              <span aria-hidden className="shrink-0 text-[13px] leading-[1.5] text-brand-text/60">
                &rsaquo;
              </span>
              <div className="relative h-full flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={i}
                    initial={reduced ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 text-[11px] leading-[1.55] text-fog"
                  >
                    {LOG[i]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* The footer. The original's four counters, replaced by the two
              verdicts the diagnostic actually reaches. */}
          <div className="flex flex-wrap items-start gap-x-8 gap-y-3 border-t border-line px-[18px] py-[10px]">
            <div className="min-w-0">
              <div className="font-display mb-[3px] text-[11px] uppercase tracking-[0.12em] text-ash">Suitable</div>
              <div className="flex items-start gap-2">
                <span aria-hidden className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span className="text-[11px] leading-snug text-snow">{AUTOMATED}</span>
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-display mb-[3px] text-[11px] uppercase tracking-[0.12em] text-ash">Not suitable</div>
              <div className="flex items-start gap-2">
                <span aria-hidden className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full border border-ash/70" />
                <span className="text-[11px] leading-snug text-fog">{MANUAL}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
