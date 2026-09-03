"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

/** The hero visual: one run of an agent, drawn as the mechanism the document
 *  describes rather than as a picture of a robot.
 *
 *  WHY THIS SHAPE. The document's own sentence for AI Agents is already a
 *  machine: an agent "can receive information, check it against approved rules,
 *  retrieve data, update systems and pass the work to a person when approval or
 *  judgement is required". That is five actions, two dependencies and one
 *  condition, so it is a graph, not a queue. The previous visual drew a list
 *  clearing top to bottom with one gate in it, which showed the boundary but
 *  said nothing about how anything got decided. This draws the deciding:
 *
 *    work arrives  ->  the agent  ->  it completes, or a person is asked
 *                       ^     ^
 *                   rules     systems
 *
 *  The two flanks are the sentence's two dependencies, and they are the reason
 *  this reads as automation rather than as a flowchart: the core does not just
 *  pass work along, it consults something on either side before it routes.
 *
 *  THE CONDITION IS SHOWN AS A CONDITION. Most runs complete; every third one
 *  is handed to a person. That alternation exists so the branch can be seen at
 *  all, and no proportion is claimed by it: the document states no figure for
 *  how often judgement is required, and neither does this. The same editorial
 *  call, made the same way, as the single gate in the visual it replaces.
 *
 *  COLOUR CARRIES ONE MEANING. Brand marks the agent, the live signal and the
 *  person, and nothing else. The machine's own parts, the intake, the rules and
 *  the systems, resolve to snow as they clear. The first cut lit every part in
 *  brand, which looked busy and said nothing: if everything is emphasised then
 *  the handover, which is the page's actual argument, is not.
 *
 *  NOT ONE WORD OF TEXT, AND NO FAKE DATA. The person is an abstract mark, the
 *  rules are unlabelled ticks and the systems are unlabelled chips. Inventing
 *  plausible-looking invoice rows or rule names would be inventing client data.
 *
 *  HOW IT MOVES, AND WHY IT IS BUILT THIS WAY. Position is never animated. Two
 *  earlier hero visuals on this site broke because they animated transforms
 *  whose units did not mean what they looked like inside a scaled viewBox, so
 *  the travelling signal is a dash running along each edge instead: the paths
 *  carry pathLength="100", which makes the dash a percentage of the edge and
 *  removes the measuring step entirely. Everything else is opacity.
 *
 *  All of it is CSS, driven by one interval that advances the run and re-keys
 *  the animated layer. That is deliberate: CSS animations run whether or not
 *  the main thread is busy, they cost nothing when the tab is hidden, and each
 *  one's final keyframe is the finished picture, so a browser that never
 *  animates still renders something whole. See globals.css, "Agent run". */

/** One pass. Long enough to read the sequence, short enough that the branch
 *  comes round while the reader is still in the hero. */
const RUN_MS = 2900;

/** Where each run ends. Three entries, one of them the handover. */
const ROUTE = ["done", "done", "person"] as const;

/* Geometry. The viewBox is 220x250 to match the panel the other hero visuals
   use, and every coordinate below is derived from these so the parts stay
   attached to each other if any one of them moves. */
const CORE = { x: 110, y: 110, r: 24 };
const INTAKE = [62, 110, 158];
const INTAKE_Y = 22;
const RULES = [96, 106, 116, 126];
const SYSTEMS = [95, 107, 119];
const OUT_Y = 210;
const DONE_X = 70;
const PERSON_X = 150;

const TOP = CORE.y - CORE.r; // where the intake edges land
const BOTTOM = CORE.y + CORE.r; // where the outcome edges leave

/** The three intake edges, curving in to the top of the core. */
const IN_EDGES = INTAKE.map((x) =>
  x === CORE.x
    ? `M ${x} ${INTAKE_Y + 9} V ${TOP}`
    : `M ${x} ${INTAKE_Y + 9} C ${x} ${TOP - 28}, ${CORE.x} ${TOP - 26}, ${CORE.x} ${TOP}`,
);

/** The two outcome edges, diverging from the bottom of the core. */
const OUT_EDGE = (x: number) =>
  `M ${CORE.x} ${BOTTOM} C ${CORE.x} ${BOTTOM + 32}, ${x} ${BOTTOM + 36}, ${x} ${OUT_Y - 15}`;

/** Timing inside one run, in ms. Read top to bottom: work arrives, the edges
 *  carry it in, the core consults both flanks, then it routes. */
const T = {
  intake: 0,
  inEdge: 260,
  core: 900,
  rules: 1000,
  systems: 1120,
  outEdge: 1720,
  outcome: 2180,
};

export function AgentRun({ className }: { className?: string }) {
  // Hydration-safe: see usePrefersReducedMotion. This component renders a
  // different tree under reduced motion, so reading the query during the first
  // client render used to fail hydration on this page.
  const reduced = usePrefersReducedMotion();
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const route = ROUTE[run % ROUTE.length];
  const person = route === "person";

  /** Reduced motion gets the finished frame with both routes drawn, since the
   *  point of the picture is that there are two. */
  const lit = (delay: number) =>
    reduced ? { className: undefined, style: undefined } : { className: "agent-lit", style: { animationDelay: `${delay}ms` } };

  const signal = (delay: number) =>
    reduced ? null : { className: "agent-signal", style: { animationDelay: `${delay}ms` } };

  return (
    <div
      className={cn(
        // The house placement for a hero visual, matching GeoLens, AnswerStream
        // and the rest: anchored to the right gutter, centred, out of the flow,
        // and not rendered below the large breakpoint. In the flow it would add
        // its own height to the hero and push the trust strip below the fold.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="Work arriving at an AI agent, which checks it against a set of rules and retrieves from connected systems before routing it. Most runs complete without anyone; one branches to a person for approval."
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-7">
        {/* Faint grid, the same treatment the other hero panels use. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <svg viewBox="0 0 220 250" className="relative block w-full" aria-hidden>
          <defs>
            {/* A soft wash under the core, so the focal point of the graph is
                lit rather than flat. It reads strongest on the dark theme,
                which is where an unlit core looked like a hole. */}
            <radialGradient id="agent-core-glow">
              <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.22" />
              <stop offset="55%" stopColor="var(--color-brand)" stopOpacity="0.07" />
              <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={CORE.x} cy={CORE.y} r="58" fill="url(#agent-core-glow)" />

          {/* ---- The permanent structure. Never animated, never hidden, so the
                  graph is legible in a still frame and before hydration. ---- */}
          <g fill="none" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {IN_EDGES.map((d, i) => (
              <path key={i} d={d} />
            ))}
            <path d={OUT_EDGE(DONE_X)} />
            <path d={OUT_EDGE(PERSON_X)} strokeDasharray="3 3" stroke="var(--color-brand)" opacity="0.4" />
            {/* The two consultations, drawn as ties rather than arrows: the
                agent reads from both flanks and writes back to one. */}
            <path d={`M ${CORE.x - CORE.r - 2} ${CORE.y} H 46`} strokeDasharray="2 4" opacity="0.7" />
            <path d={`M ${CORE.x + CORE.r + 2} ${CORE.y} H 174`} strokeDasharray="2 4" opacity="0.7" />
          </g>

          {/* Resting states for every node, so nothing starts invisible. */}
          <g opacity="0.16">
            {INTAKE.map((x) => (
              <rect key={x} x={x - 4.5} y={INTAKE_Y} width="9" height="9" rx="2" fill="var(--color-fog)" />
            ))}
            {/* A rule is a box and a line, so the flank reads as a list being
                checked rather than as an icon. */}
            {RULES.map((y) => (
              <g key={y} fill="var(--color-fog)">
                <rect x="16" y={y - 2} width="4.5" height="4.5" rx="1" />
                <rect x="25" y={y - 1.5} width="17" height="3" rx="1.5" />
              </g>
            ))}
            {/* A system is an outlined chip with a port. Filled, it read as a
                stack of heavy black bars; outlined, it reads as a thing the
                agent connects to. */}
            {SYSTEMS.map((y) => (
              <rect
                key={y}
                x="176"
                y={y}
                width="28"
                height="8"
                rx="2"
                fill="none"
                stroke="var(--color-fog)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {/* The core, always present. A ring inside a ring rather than a
              filled disc: the first version was a heavy dark dot that read as
              a full stop in the middle of the graph. */}
          <circle cx={CORE.x} cy={CORE.y} r={CORE.r} fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <circle cx={CORE.x} cy={CORE.y} r="16" fill="none" stroke="var(--color-brand)" strokeWidth="1" opacity="0.22" vectorEffect="non-scaling-stroke" />

          {/* ---- One run. Re-keyed so every CSS animation restarts. ---- */}
          <g key={run}>
            {/* The halo: the core consulting its rules and its systems. */}
            <circle
              cx={CORE.x}
              cy={CORE.y}
              r="30"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              opacity="0.12"
              {...(reduced
                ? {}
                : { className: "agent-halo", style: { animationDelay: `${T.core}ms` } })}
            />

            {/* Work arriving, and the edges carrying it in. */}
            {INTAKE.map((x, i) => (
              <rect
                key={x}
                x={x - 4.5}
                y={INTAKE_Y}
                width="9"
                height="9"
                rx="2"
                fill="var(--color-snow)"
                {...lit(T.intake + i * 110)}
              />
            ))}
            {!reduced &&
              IN_EDGES.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  pathLength="100"
                  fill="none"
                  stroke="var(--color-brand)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  {...signal(T.inEdge + i * 110)!}
                />
              ))}

            {/* Checked against approved rules. The box takes the brand, the
                line stays neutral: a rule that passed, not an alarm. */}
            {RULES.map((y, i) => (
              <g key={y} {...lit(T.rules + i * 90)}>
                <rect x="16" y={y - 2} width="4.5" height="4.5" rx="1" fill="var(--color-brand)" />
                <rect x="25" y={y - 1.5} width="17" height="3" rx="1.5" fill="var(--color-fog)" />
              </g>
            ))}

            {/* Data retrieved, systems updated. */}
            {SYSTEMS.map((y, i) => (
              <g key={y} {...lit(T.systems + i * 110)}>
                <rect
                  x="176"
                  y={y}
                  width="28"
                  height="8"
                  rx="2"
                  fill="none"
                  stroke="var(--color-snow)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx="180.5" cy={y + 4} r="1.6" fill="var(--color-brand)" />
              </g>
            ))}

            {/* And the route it takes. */}
            {!reduced && (
              <path
                d={OUT_EDGE(person ? PERSON_X : DONE_X)}
                pathLength="100"
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.6"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                {...signal(T.outEdge)!}
              />
            )}

            {/* The run's clock, swept once around the core over the whole
                pass. This is what gives the picture a pulse: it is not
                decoration, it is the duration of the run made visible. */}
            {!reduced && (
              <circle
                cx={CORE.x}
                cy={CORE.y}
                r="28"
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.55"
                pathLength="100"
                vectorEffect="non-scaling-stroke"
                transform={`rotate(-90 ${CORE.x} ${CORE.y})`}
                className="agent-sweep"
                style={{ animationDuration: `${RUN_MS}ms` }}
              />
            )}

            {/* The agent itself. Brand always, because it is the one thing in
                the picture doing the deciding. */}
            <circle cx={CORE.x} cy={CORE.y} r="7" fill="var(--color-brand)" {...lit(T.core)} />

            {/* Completed without anyone. */}
            <g
              transform={`translate(${DONE_X - 15}, ${OUT_Y - 15})`}
              {...(reduced || !person ? lit(T.outcome) : { className: undefined, style: undefined })}
              opacity={reduced || !person ? undefined : 0.16}
            >
              <rect width="30" height="30" rx="8" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              <path d="M 9 15.5 l 4.5 4.5 L 22 11" fill="none" stroke="var(--color-fog)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </g>

            {/* Passed to a person, when approval or judgement is required. */}
            <g
              transform={`translate(${PERSON_X - 15}, ${OUT_Y - 15})`}
              {...(reduced || person ? lit(T.outcome) : { className: undefined, style: undefined })}
              opacity={reduced || person ? undefined : 0.16}
            >
              <rect width="30" height="30" rx="8" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              <circle cx="15" cy="11" r="4" fill="var(--color-brand)" />
              <path d="M 7 24 a 8 8 0 0 1 16 0" fill="none" stroke="var(--color-brand)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
