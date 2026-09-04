"use client";

import { type ReactNode } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Crosslink } from "@/components/ui/Crosslink";

/** Website changes: the fork the diagnostic ends on.
 *
 *  The section's last sentence is a decision: "The diagnostic will state
 *  whether the existing website can be improved or whether larger development
 *  work is needed." That is one path splitting into two, so that is the
 *  drawing. The solid branch continues the existing site; the dashed one leads
 *  to a new block. Both labels are the sentence's own clauses. A packet runs
 *  the trunk on a loop and the two branches draw in turn, so the fork reads as
 *  a decision being made rather than a diagram of one. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

function ForkSketch() {
  return (
    <svg viewBox="0 0 220 116" aria-hidden className="block w-full text-fog">
      {/* The existing site, as it stands. */}
      <rect x="12" y="40" width="44" height="36" rx="3" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {[48, 55, 62].map((y) => (
        <rect key={y} x="18" y={y} width={y === 62 ? 18 : 30} height="2.4" rx="1.2" fill="var(--color-fog)" opacity="0.45" />
      ))}
      {/* The trunk, and the decision point. */}
      <path d="M56 58 H96" {...S} className="text-line" />
      <path d="M56 58 H96" pathLength="100" stroke="var(--color-brand)" strokeWidth="0.9" strokeLinecap="round" fill="none" className="ci-flow" />
      <circle cx="96" cy="58" r="4" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />

      {/* Branch one: improve what is there. Solid, and the same block again,
          now with its rows aligned and complete. */}
      <path d="M100 56 C 118 56, 122 28, 140 28" {...S} strokeWidth={0.8} pathLength="100" className="ci-draw text-brand" />
      <rect x="140" y="12" width="66" height="32" rx="3" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {[20, 27, 34].map((y) => (
        <rect key={y} x="148" y={y} width="50" height="2.4" rx="1.2" fill="var(--color-snow)" opacity="0.8" />
      ))}

      {/* Branch two: a rebuild. Dashed, and a new block drawn from its outline. */}
      <path d="M100 60 C 118 60, 122 88, 140 88" {...S} strokeWidth={0.8} strokeDasharray="2.5 2.5" className="text-fog" opacity="0.7" />
      <rect x="140" y="72" width="66" height="32" rx="3" fill="none" stroke="var(--color-fog)" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      <path d="M148 80h50M148 87h36M148 94h44" {...S} strokeDasharray="2 3" opacity="0.6" />
    </svg>
  );
}

export function SiteFork({
  lead,
  body,
  link,
  branches,
  diagnosticLabel,
}: {
  lead: string;
  body: string;
  link: { label: string; href: string };
  branches: [string, string];
  /** The drawing's heading, the document's own noun. */
  diagnosticLabel: string;
}) {
  // The named service links only once its page is built (see Crosslink).
  const at = body.indexOf(link.label);
  const bodyNode: ReactNode =
    at < 0 ? (
      body
    ) : (
      <>
        {body.slice(0, at)}
        <Crosslink
          href={link.href}
          className="text-snow underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand hover:decoration-brand"
          pendingClassName="text-snow"
        >
          {link.label}
        </Crosslink>
        {body.slice(at + link.label.length)}
      </>
    );

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20">
      <div>
        <Rise>
          <p className="font-display max-w-2xl text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.18] text-snow">
            {lead}
          </p>
        </Rise>
        <Rise delay={0.1} className="mt-8">
          <p className="max-w-2xl leading-relaxed text-fog sm:text-lg">{bodyNode}</p>
        </Rise>
      </div>
      <Rise delay={0.15}>
        <div className="relative overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative">
            <p className="font-display mb-3 text-[0.6875rem] font-semibold uppercase leading-none text-ash">{diagnosticLabel}</p>
            <ForkSketch />
            {/* The two outcomes, named in the document's words. The order
                matches the branches: the solid one first. */}
            <ul className="mt-4 space-y-2">
              {branches.map((b, i) => (
                <li key={b} className="flex items-start gap-3">
                  <span aria-hidden className={`mt-[0.45rem] h-2 w-2 shrink-0 rounded-full ${i === 0 ? "bg-brand" : "border border-dashed border-fog"}`} />
                  <span className={`font-display text-[0.6875rem] font-semibold uppercase leading-tight ${i === 0 ? "text-brand-text" : "text-ash"}`}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Rise>
    </div>
  );
}
