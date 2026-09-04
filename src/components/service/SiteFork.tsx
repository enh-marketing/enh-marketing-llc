"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";
import { Crosslink } from "@/components/ui/Crosslink";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** Website changes: the fork the diagnostic ends on.
 *
 *  The section's last sentence is a decision: "The diagnostic will state
 *  whether the existing website can be improved or whether larger development
 *  work is needed." That is one path splitting into two, so that is the
 *  drawing. The solid branch continues the existing site; the dashed one leads
 *  to a new block. Both labels are the sentence's own clauses. A packet runs
 *  the trunk on a loop and the two branches draw in turn, so the fork reads as
 *  a decision being made rather than a diagram of one. */

/** The site under one outcome. Kept and corrected, or drawn again from an
 *  outline: the same block either way, which is the point the sentence makes. */
function OutcomeSketch({ rebuild, on }: { rebuild: boolean; on: boolean }) {
  const rows = rebuild ? [0, 1, 2] : [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 260 96" aria-hidden className="block w-full text-fog">
      <rect
        x="2"
        y="6"
        width="256"
        height="84"
        rx="5"
        fill={rebuild ? "none" : "var(--color-ink-2)"}
        stroke={on ? "var(--color-brand)" : "var(--color-line)"}
        strokeWidth="1.2"
        strokeDasharray={rebuild ? "5 4" : undefined}
        vectorEffect="non-scaling-stroke"
        className="transition-colors duration-500"
      />
      {rows.map((r) => (
        <rect
          key={r}
          x="16"
          y={20 + r * 16}
          width={rebuild ? [120, 86, 104][r] : [206, 168, 190, 132][r]}
          height="4"
          rx="2"
          fill="currentColor"
          opacity={rebuild ? 0.3 : 0.5}
          {...(rebuild ? { strokeDasharray: "4 3" } : {})}
        />
      ))}
      {/* On the rebuild, the rest of the page is still to be drawn. */}
      {rebuild &&
        [0, 1].map((i) => (
          <rect key={`g${i}`} x={16 + i * 92} y="70" width="76" height="12" rx="2" fill="none" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        ))}
      {/* On the improvement, one row is corrected in place. */}
      {!rebuild && (
        <rect x="16" y="68" width="94" height="4" rx="2" fill="var(--color-brand)" className="ci-grow-x" style={{ transformOrigin: "left" }} />
      )}
    </svg>
  );
}

/** One of the two futures the diagnostic chooses between. The solid one is
 *  improving what exists; the dashed one is a rebuild.
 *
 *  Declared at module scope, not inside SiteFork. Nested inside, React saw a
 *  new component type on every render and remounted both cards each time the
 *  pointer moved between them, which restarted their sketches. */
function Outcome({
  i,
  label,
  lit,
  onEnter,
  onLeave,
}: {
  i: 0 | 1;
  label: string;
  lit: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const solid = i === 0;
  return (
    <div
      data-outcome
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={cn(
        "group relative flex h-full flex-col justify-between rounded-[1.5rem] border p-7 transition-colors duration-500 motion-reduce:transition-none sm:p-9",
        solid ? "border-line bg-ink-3" : "border-dashed border-line bg-ink-2",
        lit && "border-brand/60",
      )}
    >
      <div>
        <p className={cn("font-display text-[0.6875rem] font-bold tabular-nums transition-colors duration-500", lit ? "text-brand-text" : "text-ash")}>
          {solid ? "01" : "02"}
        </p>
        <p
          className={cn(
            "font-display mt-4 text-[clamp(1.25rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.12] transition-colors duration-500",
            lit ? "text-snow" : "text-fog",
          )}
        >
          {label}
        </p>
      </div>
      {/* The site as it would be under this outcome: the same block kept and
          corrected, or drawn again from an outline. */}
      <div className="mt-9">
        <OutcomeSketch rebuild={!solid} on={lit} />
      </div>
      <span
        aria-hidden
        className={cn(
          "mt-8 block h-px transition-all duration-500 motion-reduce:transition-none",
          lit ? "w-24 bg-brand" : "w-10 bg-line group-hover:w-16",
        )}
      />
    </div>
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
  /** What the reader is standing at when the section forks. */
  diagnosticLabel: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  /** Which outcome the pointer is over. Null means neither, which is the
   *  honest resting state: the diagnostic has not been run yet. */
  const [lit, setLit] = useState<0 | 1 | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const q = gsap.utils.selector(el);
      const stem = q("[data-stem]");
      const arms = q("[data-arm]");
      const outcomes = q("[data-outcome]");
      gsap.set(stem, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(arms, { scaleX: 0 });
      gsap.set(outcomes, { opacity: 0.55, y: 16 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 74%", end: "bottom 82%", scrub: 0.7 } });
      // The stem descends to the decision point, the two arms open out of it,
      // and the outcomes arrive: the section forks as the reader reaches it.
      tl.to(stem, { scaleY: 1, duration: 0.3, ease: "power2.out" }, 0)
        .to(arms, { scaleX: 1, duration: 0.26, stagger: 0.06, ease: "power2.out" }, 0.24)
        .to(outcomes, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }, 0.34);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([stem, arms, outcomes].flat(), { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, []);

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
    <div ref={root}>
      {/* What the section is about, at full measure. */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-end lg:gap-20">
        <Rise>
          <p className="font-display max-w-2xl text-[clamp(1.2rem,2.4vw,1.85rem)] font-extrabold uppercase leading-[1.14] text-snow">
            {lead}
          </p>
        </Rise>
        <Rise delay={0.1}>
          <p className="max-w-2xl leading-relaxed text-fog sm:text-lg">{bodyNode}</p>
        </Rise>
      </div>

      {/* THE SECTION FORKS. The document ends this section on a decision with
          exactly two outcomes, so the page splits there rather than describing
          the split inside a panel. The stem descends from the copy above to the
          decision point, and the two arms open from it into the two futures.

          The connector lives in the same wrapper as the grid and is measured in
          the grid's own fractions, so an arm always lands on the centre of its
          card whatever the gap. */}
      <div className="relative mt-14">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-14 hidden h-14 lg:block">
          <span data-stem className="absolute left-1/2 top-0 h-9 w-px -translate-x-1/2 bg-line" />
          <span className="absolute left-1/2 top-9 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-void" />
          <span className="font-display absolute left-1/2 top-[2.9rem] -translate-x-1/2 whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-text">
            {diagnosticLabel}
          </span>
        </div>

        {/* The two arms, opening from the decision to each card's centre. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-6 hidden h-6 lg:block">
          <span data-arm className="absolute left-[calc(25%-10px)] right-1/2 top-0 h-px origin-right bg-line" />
          <span data-arm className="absolute left-1/2 right-[calc(25%-10px)] top-0 h-px origin-left bg-line" />
          <span className="absolute left-[calc(25%-10px)] top-0 h-6 w-px bg-line" />
          <span className="absolute right-[calc(25%-10px)] top-0 h-6 border-l border-dashed border-line" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="lg:pr-5">
            <Outcome i={0} label={branches[0]} lit={lit === 0} onEnter={() => setLit(0)} onLeave={() => setLit(null)} />
          </div>
          <div className="lg:pl-5">
            <Outcome i={1} label={branches[1]} lit={lit === 1} onEnter={() => setLit(1)} onLeave={() => setLit(null)} />
          </div>
        </div>
      </div>
    </div>
  );
}
