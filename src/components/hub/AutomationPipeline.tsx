"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ParallaxLayers } from "@/components/fx/ParallaxLayers";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { categories } from "@/content/ai-hub";
import { BACK, FRONT, LAYER_IMG, MID } from "@/components/hub/parallaxAssets";

/** AI Hub, section 02: AI & Automation.
 *
 *  @monolythdev/ai-agent-pipeline FROM 21ST.DEV, AS IT IS. Its nodes, its
 *  labels, its log lines, its status indicators and its footer counters are the
 *  component's own and are left alone. The one change is the accent colour:
 *  every #0052FF becomes the brand red, so the travelling dots, the pulsing
 *  trio, the connector paths, the arrow marker and the highlighted node's edge
 *  are ours. The green and amber status dots are left as they are, because they
 *  are states rather than accent.
 *
 *  THE CONTENT IS THE COMPONENT'S DEMO CONTENT AND HAS TO GO BEFORE LAUNCH.
 *  WORKFLOWS counts up from 1,247 every 7.2 seconds, TOKENS reads 4.2M, AVG
 *  LATENCY reads 342ms, the header claims "3 agents · 0 errors", and the nodes
 *  and footer name pinecone and claude-3-sonnet as the stack. None of that is
 *  the client's and this category's content file says "Nothing else is a number
 *  and nothing is estimated". It is here because the brief was to use the
 *  component as it is; it is recorded here so it is replaced rather than
 *  forgotten.
 *
 *  FULL BLEED, ONE VIEWPORT, WITH THE PARALLAX. The section is the page's own
 *  parallax block at 100vh rather than a card inside the content column, so it
 *  matches the opener and the six scaffolding sections. The three photographic
 *  layers travel at 70, 55 and 10 as everywhere else; the pipeline rides a
 *  fourth layer at 28, which puts it in front of the figure and gives it a
 *  little travel of its own. */

const messages = [
  'Received: "Summarize Q3 performance for stakeholder report..."',
  "Chunking input → 847 tokens → 6 embeddings generated",
  "Vector search complete: 5 chunks, avg cosine sim 0.89",
  "Injecting context into prompt template (1,204 tokens)",
  "LLM inference: 3 tool calls dispatched in parallel",
  "Tool: send_email → draft created, 312 words, pending approval",
  "Tool: update_crm → record Q3_2024 flagged as reviewed",
  "Tool: generate_report → PDF queued for 17:00 dispatch",
  "Workflow complete. 3 actions dispatched in 342ms.",
  "Idle. Listening for next trigger event...",
];

/** The accent. The component's single blue, swapped for ours. */
const ACCENT = "var(--color-brand)";

const PATHS = {
  p1: "M116,88 L158,88",
  p2: "M268,88 L306,88",
  p3: "M411,88 C425,88 435,50 448,50",
  p4: "M411,88 L448,88",
  p5: "M411,88 C425,88 435,126 448,126",
};

function AnimatedDot({
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
    <circle r={size} fill={ACCENT} opacity={opacity}>
      <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`} path={path} />
    </circle>
  );
}

function PulsingDot({ cx, cy, duration, delay = 0 }: { cx: number; cy: number; duration: number; delay?: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={2.8}
      fill={ACCENT}
      animate={{ opacity: [0.15, 1, 0.15] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function StatusIndicator({
  cx,
  cy,
  color,
  pulsing = false,
  duration = 1.9,
  delay = 0,
  reduced,
}: {
  cx: number;
  cy: number;
  color: string;
  pulsing?: boolean;
  duration?: number;
  delay?: number;
  reduced: boolean;
}) {
  if (pulsing && !reduced) {
    return (
      <motion.circle
        cx={cx}
        cy={cy}
        r={3}
        fill={color}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      />
    );
  }
  return <circle cx={cx} cy={cy} r={3} fill={color} opacity={0.95} />;
}

/** The component itself. */
function Pipeline() {
  const reduced = usePrefersReducedMotion();
  const [messageIndex, setMessageIndex] = useState(0);
  const [workflows, setWorkflows] = useState(1247);

  useEffect(() => {
    if (reduced) return;
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2700);
    const workflowInterval = setInterval(() => {
      setWorkflows((prev) => prev + 1);
    }, 7200);
    return () => {
      clearInterval(messageInterval);
      clearInterval(workflowInterval);
    };
  }, [reduced]);

  return (
    <div className="mx-auto w-full max-w-[620px] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#090909] font-sans shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-[18px] py-[11px]">
        <div className="flex items-center gap-[7px]">
          <motion.span
            className="inline-block h-[6px] w-[6px] rounded-full bg-green-500"
            animate={reduced ? { opacity: 1 } : { opacity: [1, 0.2, 1] }}
            transition={reduced ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-mono text-[10px] tracking-[0.1em] text-white/30">AGENT PIPELINE · LIVE</span>
        </div>
        <span className="font-mono text-[10px] text-white/[0.18]">3 agents · 0 errors</span>
      </div>

      {/* The drawing keeps its designed size and scrolls sideways on a phone,
          rather than shrinking its 8.5 to 13 unit labels into illegibility. */}
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <svg viewBox="0 0 580 172" className="block w-full min-w-[580px]">
          <defs>
            <marker id="ap-ma" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path
                d="M2 1.5L7.5 5L2 8.5"
                fill="none"
                stroke={ACCENT}
                strokeOpacity="0.45"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          <path d={PATHS.p1} fill="none" stroke={ACCENT} strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="3 5" markerEnd="url(#ap-ma)" />
          <path d={PATHS.p2} fill="none" stroke={ACCENT} strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="3 5" markerEnd="url(#ap-ma)" />
          <path d={PATHS.p3} fill="none" stroke={ACCENT} strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="3 5" />
          <path d={PATHS.p4} fill="none" stroke={ACCENT} strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="3 5" />
          <path d={PATHS.p5} fill="none" stroke={ACCENT} strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="3 5" />

          {/* SMIL does not honour prefers-reduced-motion, so these are simply
              not rendered for a reader who has asked for none. */}
          {!reduced && (
            <>
              <AnimatedDot path={PATHS.p1} duration={1.05} delay={0} size={2.5} opacity={1} />
              <AnimatedDot path={PATHS.p1} duration={1.05} delay={0.35} size={1.8} opacity={0.65} />
              <AnimatedDot path={PATHS.p1} duration={1.05} delay={0.7} size={1.3} opacity={0.35} />
              <AnimatedDot path={PATHS.p2} duration={0.88} delay={0.18} size={2.5} opacity={1} />
              <AnimatedDot path={PATHS.p2} duration={0.88} delay={0.62} size={1.8} opacity={0.65} />
              <AnimatedDot path={PATHS.p3} duration={1.3} delay={0.08} size={2.2} opacity={0.9} />
              <AnimatedDot path={PATHS.p3} duration={1.3} delay={0.65} size={1.5} opacity={0.55} />
              <AnimatedDot path={PATHS.p4} duration={1.15} delay={0.28} size={2.2} opacity={0.9} />
              <AnimatedDot path={PATHS.p4} duration={1.15} delay={0.85} size={1.5} opacity={0.55} />
              <AnimatedDot path={PATHS.p5} duration={1.4} delay={0.45} size={2.2} opacity={0.9} />
              <AnimatedDot path={PATHS.p5} duration={1.4} delay={1.0} size={1.5} opacity={0.55} />
            </>
          )}

          {/* Trigger */}
          <rect x="16" y="66" width="100" height="44" rx="8" fill="#141414" stroke="rgba(255,255,255,0.09)" strokeWidth="0.5" />
          <text x="66" y="83" textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,0.28)" fontFamily="system-ui" letterSpacing=".07em">TRIGGER</text>
          <text x="66" y="100" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.82)" fontFamily="system-ui">User Query</text>
          <text x="66" y="122" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.18)" fontFamily="monospace">node-01</text>

          {/* Vector DB */}
          <rect x="158" y="66" width="110" height="44" rx="8" fill="#141414" stroke="rgba(255,255,255,0.09)" strokeWidth="0.5" />
          <text x="213" y="83" textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,0.28)" fontFamily="system-ui" letterSpacing=".07em">VECTOR DB</text>
          <text x="213" y="100" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.82)" fontFamily="system-ui">Semantic Search</text>
          <text x="213" y="122" textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.18)" fontFamily="monospace">pinecone</text>

          {/* LLM Agent */}
          <rect x="306" y="53" width="105" height="70" rx="10" fill="#12060a" stroke={ACCENT} strokeWidth="1" />
          <rect x="318" y="53.5" width="80" height="1" rx="0.5" fill={ACCENT} fillOpacity="0.5" />
          <text x="358" y="78" textAnchor="middle" fontSize="9.5" fill="var(--color-brand-text)" fontFamily="system-ui" letterSpacing=".07em">LLM AGENT</text>
          <text x="358" y="97" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="system-ui" fontWeight="500">Processing</text>
          {reduced ? (
            [346, 358, 370].map((cx) => <circle key={cx} cx={cx} cy={113} r={2.8} fill={ACCENT} opacity={0.7} />)
          ) : (
            <>
              <PulsingDot cx={346} cy={113} duration={1.2} delay={0} />
              <PulsingDot cx={358} cy={113} duration={1.2} delay={0.4} />
              <PulsingDot cx={370} cy={113} duration={1.2} delay={0.8} />
            </>
          )}
          <text x="358" y="139" textAnchor="middle" fontSize="8.5" fill="var(--color-brand-text)" fillOpacity="0.5" fontFamily="monospace">claude-3-sonnet</text>

          {/* Outputs */}
          <rect x="448" y="35" width="116" height="30" rx="7" fill="#111" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
          <text x="500" y="53.5" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.62)" fontFamily="system-ui">Email Draft</text>
          <StatusIndicator cx={550} cy={43} color="#22c55e" reduced={reduced} />

          <rect x="448" y="73" width="116" height="30" rx="7" fill="#111" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
          <text x="500" y="91.5" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.62)" fontFamily="system-ui">CRM Update</text>
          <StatusIndicator cx={550} cy={81} color="#f59e0b" pulsing duration={1.9} reduced={reduced} />

          <rect x="448" y="111" width="116" height="30" rx="7" fill="#111" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
          <text x="500" y="129.5" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.62)" fontFamily="system-ui">Report Gen</text>
          <StatusIndicator cx={550} cy={119} color="#f59e0b" pulsing duration={2.2} delay={0.35} reduced={reduced} />
        </svg>
      </div>

      {/* Message */}
      <div className="h-[52px] border-t border-white/[0.06] px-[18px] py-[9px]">
        <div className="flex h-full items-start gap-2">
          <span className="shrink-0 font-mono text-[13px] leading-[1.5] text-brand-text/60">›</span>
          <div className="relative h-full flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                initial={reduced ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 font-mono text-[11px] leading-[1.55] text-white/[0.42]"
              >
                {messages[messageIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-[22px] border-t border-white/[0.06] px-[18px] py-[10px]">
        <div>
          <div className="mb-[3px] text-[9px] tracking-[0.09em] text-white/20">WORKFLOWS</div>
          <motion.div key={workflows} initial={{ scale: 1.05 }} animate={{ scale: 1 }} className="font-mono text-[16px] text-white/[0.72]">
            {workflows.toLocaleString()}
          </motion.div>
        </div>
        <div>
          <div className="mb-[3px] text-[9px] tracking-[0.09em] text-white/20">TOKENS</div>
          <div className="font-mono text-[16px] text-white/[0.72]">4.2M</div>
        </div>
        <div>
          <div className="mb-[3px] text-[9px] tracking-[0.09em] text-white/20">AVG LATENCY</div>
          <div className="font-mono text-[16px] text-white/[0.72]">342ms</div>
        </div>
        <div className="ml-auto text-right">
          <div className="mb-[3px] text-[9px] tracking-[0.09em] text-white/[0.18]">STACK</div>
          <div className="font-mono text-[10px] text-brand-text/70">Claude · Pinecone</div>
        </div>
      </div>
    </div>
  );
}

export function AutomationPipeline() {
  const c = categories[1];

  return (
    <section id="ai-automation" data-section={c.label} className="relative w-full">
      <ParallaxLayers
        className="h-screen w-full"
        stageClassName="bg-[#0b0f14]"
        layers={[
          { y: 70, children: <img src={BACK} alt="" aria-hidden loading="lazy" className={LAYER_IMG} /> },
          { y: 55, children: <img src={MID} alt="" aria-hidden loading="lazy" className={LAYER_IMG} /> },
          { y: 10, children: <img src={FRONT} alt="" aria-hidden loading="lazy" className={LAYER_IMG} /> },
          {
            /* In front of the figure, and travelling a little itself. */
            y: 28,
            children: (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 py-10 sm:gap-8 sm:px-8">
                <div className="text-center">
                  <p className="font-display flex items-center justify-center gap-3 text-[0.6875rem] font-extrabold uppercase tracking-[0.2em] text-white/60">
                    <span className="tabular-nums">{c.no}</span>
                    <span aria-hidden className="block h-px w-8 bg-white/30" />
                    AI Hub
                  </p>
                  <h2 className="font-display mt-3 text-[clamp(1.75rem,5vw,3.25rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.02em] text-white">
                    AI &amp; Automation
                  </h2>
                </div>

                <Pipeline />

                <a
                  href={c.href}
                  className="group inline-flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white"
                >
                  See the service
                  <span
                    aria-hidden
                    className="block h-px w-8 bg-brand transition-all duration-500 group-hover:w-14 motion-reduce:transition-none"
                  />
                </a>
              </div>
            ),
          },
        ]}
      />
    </section>
  );
}
