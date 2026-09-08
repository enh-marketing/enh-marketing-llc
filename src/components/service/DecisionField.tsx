"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** How campaign intelligence changes a decision.
 *
 *  WHY A BRANCH AND NOT TWO PANELS. The section's two paragraphs are a plan and
 *  a check, and every earlier version set them as two things side by side with
 *  a rule between. Two panels are a comparison, and this is not a comparison:
 *  it is one line of work that crosses a threshold and then forks. Before the
 *  campaign there is one thing to do — set the budget, forecast the outcome,
 *  divide the spend. Once it begins there are three things that can be found,
 *  and the document names all three: "rising costs, tracking problems or weak
 *  results". Three named findings are three branches, and each is drawn as the
 *  thing it actually is rather than as a third identical card.
 *
 *  NO STRAWMAN. There is no "without us" lane, no worse-off comparison and no
 *  claimed outcome. The drawing says only what the paragraph says: after the
 *  line, these three become visible. Which way any of them would have gone
 *  otherwise is not this page's to assert.
 *
 *  THE PROMISE UNDER IT IS THE HONEST ONE, and it is drawn too: where the data
 *  will not support a benchmark, the range starts wider. So the closing
 *  sentence sits over a band that opens as it arrives, at display scale,
 *  because a page that spends four sections earning trust should end this
 *  chapter on the sentence that costs it something.
 *
 *  THE FAN IS MEASURED, not drawn at fixed coordinates: the three branch rows
 *  are ordinary flow layout whose heights depend on how their names wrap, so
 *  the connectors are plotted from where they actually landed and replotted on
 *  resize. Below the large breakpoint the fan is dropped and the three read as
 *  a stack, each keeping its own drawing. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/** The plan: a level set, a range forecast from it, and the spend divided.
 *  Three parts, because the paragraph names three. */
function PlanDrawing() {
  return (
    <svg viewBox="0 0 260 250" aria-hidden className="block w-full">
      {/* a level being set */}
      <path d="M18 34h224" {...S} strokeWidth={1.2} className="text-line" />
      <path d="M18 34h132" {...S} strokeWidth={2.4} className="text-brand" />
      <circle cx="150" cy="34" r="7" fill="var(--color-brand)" />

      {/* the range that level is forecast to produce */}
      <path d="M30 86 L232 62 L232 138 Z" fill="color-mix(in srgb, var(--color-brand) 9%, transparent)" />
      <path d="M30 86 L232 62" {...S} strokeWidth={1.2} strokeDasharray="5 4" className="text-brand" />
      <path d="M30 86 L232 138" {...S} strokeWidth={1.2} strokeDasharray="5 4" className="text-brand" />
      <path d="M232 62v76" {...S} strokeWidth={1.6} className="text-brand" />
      <circle cx="30" cy="86" r="4.5" fill="var(--color-brand)" />

      {/* the spend divided across suitable channels */}
      <path d="M18 226h224" {...S} strokeWidth={1.2} className="text-line" />
      {[
        { x: 22, h: 54 },
        { x: 74, h: 38 },
        { x: 126, h: 62 },
        { x: 178, h: 30 },
      ].map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={226 - c.h}
          width={42}
          height={c.h}
          rx={3}
          fill="currentColor"
          className={i === 2 ? "text-brand" : "text-fog"}
          opacity={i === 2 ? 0.6 : 0.3}
        />
      ))}
    </svg>
  );
}

/** The three findings, each drawn as itself. `on` is whether this one is the
 *  branch currently being read. */
function FindingDrawing({ i, on }: { i: number; on: boolean }) {
  const tone = on ? "text-brand" : "text-fog";
  if (i === 0) {
    // rising costs: a cost climbing past the level it was planned at
    return (
      <svg viewBox="0 0 200 84" aria-hidden className="block w-full">
        <path d="M8 52h184" {...S} strokeWidth={1.1} strokeDasharray="5 4" className={on ? "text-brand" : "text-line"} />
        <path
          d="M8 68 C 46 66, 78 60, 104 52 C 132 43, 158 26, 192 14"
          {...S}
          strokeWidth={2}
          pathLength={100}
          className={cn(tone, on && "ci-draw")}
        />
        <circle cx="104" cy="52" r={on ? 7 : 4} {...S} strokeWidth={1.4} className={cn("transition-all duration-300", tone)} />
        <path d="M8 76v-70" {...S} strokeWidth={1} className="text-line" />
      </svg>
    );
  }
  if (i === 1) {
    // tracking problems: a chain of recorded events with one link broken
    return (
      <svg viewBox="0 0 200 84" aria-hidden className="block w-full">
        {[0, 1, 2, 3, 4].map((k) => {
          const broken = k === 2;
          return (
            <g key={k}>
              <rect
                x={10 + k * 38}
                y={30}
                width={26}
                height={24}
                rx={6}
                {...S}
                strokeWidth={1.4}
                strokeDasharray={broken ? "4 3" : undefined}
                className={broken ? (on ? "text-brand" : "text-ash") : tone}
              />
              {k < 4 && !broken && k !== 1 && (
                <path d={`M${36 + k * 38} 42h12`} {...S} strokeWidth={1.4} className={tone} />
              )}
            </g>
          );
        })}
        {/* the two ends that no longer meet */}
        <path d="M74 42h6M116 42h-6" {...S} strokeWidth={1.4} className={on ? "text-brand" : "text-ash"} />
        <path d="M84 34l4 8-4 8M106 34l-4 8 4 8" {...S} strokeWidth={1.3} className={on ? "text-brand" : "text-ash"} opacity={0.7} />
      </svg>
    );
  }
  // weak results: a return falling short of the range it was planned against
  return (
    <svg viewBox="0 0 200 84" aria-hidden className="block w-full">
      <rect x="120" y="14" width="70" height="52" fill="color-mix(in srgb, var(--color-brand) 9%, transparent)" />
      <path d="M120 14v52M190 14v52" {...S} strokeWidth={1.2} strokeDasharray="5 4" className={on ? "text-brand" : "text-line"} />
      <path d="M8 70h184" {...S} strokeWidth={1.1} className="text-line" />
      <rect
        x="8"
        y="44"
        width={on ? 84 : 84}
        height="18"
        rx="9"
        fill="currentColor"
        className={cn(tone, on && "ci-grow-x")}
        opacity={0.5}
      />
      <path d="M96 36v34" {...S} strokeWidth={1.4} className={on ? "text-brand" : "text-ash"} />
      <path d="M100 53h16" {...S} strokeWidth={1.2} strokeDasharray="3 3" className={on ? "text-brand" : "text-ash"} />
    </svg>
  );
}

export function DecisionField({
  left,
  right,
  closing,
  plan,
  beginsLabel,
  findings,
}: {
  left: string;
  right: string;
  closing: string;
  /** The three things the plan is, in the first paragraph's own words. */
  plan: string[];
  /** The clause the second paragraph opens on. */
  beginsLabel: string;
  /** The three things the check identifies, in the second paragraph's words. */
  findings: string[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const stem = useRef<HTMLSpanElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const arms = useRef<(SVGPathElement | null)[]>([]);
  const flows = useRef<(SVGPathElement | null)[]>([]);
  /** Which branch is being read. Scroll walks them; the pointer takes over. */
  const [lit, setLit] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? lit;

  useEffect(() => {
    const el = field.current;
    const frame = svg.current;
    const line = stem.current;
    if (!el || !frame || !line) return;
    const mm = gsap.matchMedia();
    mm.add({ plot: "(min-width: 1024px)" }, (ctx) => {
      if (!ctx.conditions?.plot) return;
      const build = () => {
        const r = el.getBoundingClientRect();
        if (!r.width) return;
        frame.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
        const lb = line.getBoundingClientRect();
        const sx = lb.left - r.left + lb.width / 2;
        const sy = lb.top - r.top + lb.height / 2;
        findings.forEach((_, i) => {
          const row = rows.current[i];
          const arm = arms.current[i];
          if (!row || !arm) return;
          const b = row.getBoundingClientRect();
          const x = b.left - r.left;
          const y = b.top - r.top + b.height / 2;
          const d = `M ${sx} ${sy} C ${sx + (x - sx) * 0.45} ${sy}, ${sx + (x - sx) * 0.5} ${y}, ${x} ${y}`;
          arm.setAttribute("d", d);
          flows.current[i]?.setAttribute("d", d);
        });
      };
      build();
      const st = ScrollTrigger.create({ trigger: el, start: "top bottom", onRefresh: build });
      const ro = new ResizeObserver(build);
      ro.observe(el);
      const settle = window.setTimeout(build, 350);
      let live = true;
      document.fonts?.ready.then(() => {
        if (live) build();
      });
      return () => {
        live = false;
        window.clearTimeout(settle);
        st.kill();
        ro.disconnect();
      };
    });
    return () => mm.revert();
  }, [findings]);

  /* The three are read in turn as the reader arrives, so the branch is walked
     rather than merely present. Pointer always wins. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ walk: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.walk) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 74%",
        end: "bottom 70%",
        scrub: 0.6,
        onUpdate: (self) => {
          const i = Math.min(findings.length - 1, Math.floor(self.progress * findings.length));
          setLit((prev) => (prev === i ? prev : i));
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [findings.length]);

  return (
    <div ref={root}>
      {/* The two paragraphs, either side of the moment that separates them. */}
      <div className="grid gap-x-14 gap-y-8 lg:grid-cols-2">
        <Rise>
          <p className="max-w-[52ch] leading-relaxed text-fog sm:text-lg">{left}</p>
        </Rise>
        <Rise delay={0.08}>
          <p className="max-w-[52ch] leading-relaxed text-snow sm:text-lg lg:border-l lg:border-line lg:pl-14">
            {right}
          </p>
        </Rise>
      </div>

      {/* THE BRANCH. */}
      <div
        ref={field}
        className="relative mt-14 grid gap-y-10 lg:grid-cols-[minmax(0,0.62fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-x-12"
        onPointerLeave={() => setHover(null)}
      >
        <svg
          ref={svg}
          aria-hidden
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
        >
          {findings.map((_, i) => (
            <g key={i}>
              <path
                ref={(n) => {
                  arms.current[i] = n;
                }}
                fill="none"
                stroke={shown === i ? "var(--color-brand)" : "var(--color-line)"}
                strokeWidth="1.2"
              />
              <path
                ref={(n) => {
                  flows.current[i] = n;
                }}
                fill="none"
                pathLength={100}
                stroke="var(--color-brand)"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="ci-flow"
                style={{ animationDelay: `${i * 900}ms`, animationDuration: "2.7s" }}
              />
            </g>
          ))}
        </svg>

        {/* Before the line: the plan. */}
        <div className="relative mx-auto w-full max-w-[19rem]">
          <div className="rounded-[1.25rem] border border-line bg-ink-2 p-5">
            <PlanDrawing />
          </div>
          <ul className="mt-4 space-y-1.5">
            {plan.map((part) => (
              <li key={part} className="flex items-start gap-2.5">
                <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span className="font-display text-[0.6875rem] font-bold uppercase leading-snug tracking-[0.08em] text-fog">
                  {part}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* The line the work crosses. */}
        <div className="relative hidden self-stretch lg:flex lg:items-center lg:justify-center">
          <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-brand/60" />
          <span
            ref={stem}
            aria-hidden
            className="relative z-10 h-3 w-3 rounded-full border-2 border-brand bg-void"
          />
          <span className="font-display absolute left-1/2 top-0 origin-top-left -translate-x-1/2 rotate-90 whitespace-nowrap text-[0.625rem] font-bold uppercase tracking-[0.18em] text-brand-text">
            {beginsLabel}
          </span>
        </div>
        {/* The same clause where the drawing has turned into a stack. */}
        <p className="font-display flex items-center gap-3 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-brand-text lg:hidden">
          <span aria-hidden className="h-px w-8 bg-brand" />
          {beginsLabel}
        </p>

        {/* After it: the three things that become visible. */}
        <ul className="grid gap-4">
          {findings.map((finding, i) => {
            const on = shown === i;
            return (
              <li
                key={finding}
                ref={(n) => {
                  rows.current[i] = n;
                }}
                onPointerEnter={() => setHover(i)}
                className={cn(
                  "flex items-center gap-5 rounded-[1.25rem] border p-4 transition-colors duration-500 sm:p-5",
                  on ? "border-brand bg-brand/[0.06]" : "border-line bg-ink-2",
                )}
              >
                <span className="w-28 shrink-0 sm:w-36">
                  <FindingDrawing i={i} on={on} />
                </span>
                <span
                  className={cn(
                    "font-display text-[clamp(0.95rem,1.7vw,1.25rem)] font-extrabold uppercase leading-[1.14] transition-colors duration-500",
                    on ? "text-snow" : "text-fog",
                  )}
                >
                  {finding}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* And the sentence that costs something, over the range it describes. */}
      <div className="relative mt-16 sm:mt-20">
        <svg
          viewBox="0 0 1200 200"
          aria-hidden
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path d="M0 100 L1200 4 L1200 196 Z" fill="color-mix(in srgb, var(--color-brand) 7%, transparent)" />
          <path d="M0 100 L1200 4" {...S} strokeWidth={1.2} strokeDasharray="7 6" className="text-brand" opacity={0.6} />
          <path d="M0 100 L1200 196" {...S} strokeWidth={1.2} strokeDasharray="7 6" className="text-brand" opacity={0.6} />
        </svg>
        <Rise>
          <p className="font-display relative mx-auto max-w-[30ch] py-10 text-center text-[clamp(1.3rem,3vw,2.3rem)] font-extrabold uppercase leading-[1.1] text-snow">
            {closing}
          </p>
        </Rise>
      </div>
    </div>
  );
}
