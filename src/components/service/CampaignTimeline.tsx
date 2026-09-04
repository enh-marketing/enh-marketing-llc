"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** Six covered items, laid out on the campaign they act in.
 *
 *  WHY THIS SHAPE. The first build put these six in the site's pinned
 *  explorer, which is the AI Automation page's section 01 with different words.
 *  The client asked for the same design language without the same component,
 *  so this section is a timeline read top to bottom: the three things that
 *  happen before any budget is spent sit side by side in the first row; the
 *  campaign-start line is drawn across the full width beneath them; the one
 *  thing that happens live and the one that happens after each get a
 *  full-width row with a drawing of their own beside the text; and
 *  benchmarking, which the document uses in every phase, closes the run as a
 *  band. So the layout is the argument: nothing has to be clicked to learn
 *  that forecasting happens before a dirham is spent and alerts happen while
 *  it is being spent.
 *
 *  PLACEMENT IS READ FROM THE FLAGS, not from position in the array, and the
 *  flags are cited in the content file.
 *
 *  ONE ORDER, NOT TWO. A first build placed the cards by phase with an explicit
 *  grid while numbering them in the document's order, so the page read 01, 02,
 *  04, 05, 06, 03 — the benchmarking card, which belongs to every phase and so
 *  sits last, carried the number 3. Numbers that do not ascend read as a bug,
 *  and the mismatch was worse than cosmetic: the visual order and the DOM order
 *  disagreed, so a screen reader and a sighted reader met the six in different
 *  sequences. The cards are therefore sorted into phase order once, in markup,
 *  and numbered from that order. The source document numbers none of them, so
 *  nothing is contradicted; the content file keeps the document's own order and
 *  this component decides how they are presented.
 *
 *  MOTION. On scroll each row rises as the reader reaches it and the start
 *  line draws across between the first two. Cards dim to 0.55 at most, so the
 *  section is legible at every scroll position and without script. */

export type Phase = "before" | "live" | "after";

export type TimelineItem = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  phases: Phase[];
};

const LABEL: Record<Phase, string> = { before: "Before spend", live: "Live", after: "After" };

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const PULSE = { transformBox: "fill-box" as const, transformOrigin: "center" };

/** Early alerts: five signals watched in their lanes while the budget runs,
 *  and the one that has left its band. A monitoring board, not a chart: the
 *  document names five things that may move ("rising costs, falling conversion
 *  rates, weaker lead quality, inefficient channel spend, or missing CRM
 *  conversions"), so five lanes, each with the range it is expected to stay in,
 *  and a marker per lane. One marker sits outside its band and pulses. The bar
 *  beneath is the budget, part spent: the alert fires while it is still active. */
function AlertSketch() {
  const lanes = [
    { y: 16, a: 60, b: 128, at: 92, out: false },
    { y: 32, a: 80, b: 150, at: 118, out: false },
    { y: 48, a: 50, b: 110, at: 156, out: true },
    { y: 64, a: 90, b: 170, at: 128, out: false },
    { y: 80, a: 70, b: 140, at: 96, out: false },
  ];
  return (
    <svg viewBox="0 0 220 110" aria-hidden className="block w-full text-fog">
      {lanes.map((l) => (
        <g key={l.y}>
          <path d={`M14 ${l.y}H206`} {...S} className="text-line" />
          <rect x={l.a} y={l.y - 5} width={l.b - l.a} height="10" rx="3" fill="var(--color-brand)" opacity="0.08" stroke="none" />
          <path d={`M${l.a} ${l.y - 5}v10M${l.b} ${l.y - 5}v10`} {...S} className="text-brand" opacity="0.55" />
          {l.out ? (
            // The one that leaves. It drifts out of its band on a loop and the
            // ring pulses where it lands; at rest it is already outside, which
            // is the state the section is about.
            <g className="ci-breach">
              <path d={`M${l.b} ${l.y}H${l.at}`} {...S} strokeDasharray="2 3" className="text-brand" />
              <circle cx={l.at} cy={l.y} r="4" fill="var(--color-brand)" stroke="none" />
              <circle cx={l.at} cy={l.y} r="9" {...S} className="glyph-pulse text-brand" style={PULSE} />
            </g>
          ) : (
            <circle cx={l.at} cy={l.y} r="3.2" fill="var(--color-snow)" stroke="none" />
          )}
        </g>
      ))}
      {/* The budget, part spent. */}
      <rect x="14" y="98" width="192" height="6" rx="3" fill="var(--color-line)" stroke="none" />
      <rect x="14" y="98" width="78" height="6" rx="3" fill="var(--color-snow)" stroke="none" />
      <path d="M92 92v18" {...S} className="text-brand" />
    </svg>
  );
}

/** Forecast beside actual: for each part of the campaign, the range that was
 *  forecast as a hollow bracket and the result as a solid bar next to it. Most
 *  land inside; one overshoots and one falls short, drawn in brand, which is
 *  what the report exists to show. */
function CompareSketch() {
  const groups = [
    { x: 22, lo: 62, hi: 40, act: 52, out: false },
    { x: 58, lo: 56, hi: 30, act: 22, out: true },
    { x: 94, lo: 50, hi: 26, act: 38, out: false },
    { x: 130, lo: 44, hi: 20, act: 60, out: true },
    { x: 166, lo: 38, hi: 14, act: 26, out: false },
  ];
  const base = 96;
  return (
    <svg viewBox="0 0 220 110" aria-hidden className="block w-full text-fog">
      <path d={`M14 ${base}H206`} {...S} className="text-line" />
      {groups.map((g, i) => (
        <g key={g.x}>
          {/* The forecast range, as a bracket. */}
          <rect x={g.x} y={g.hi} width="12" height={g.lo - g.hi} rx="2" fill="var(--color-brand)" opacity="0.08" stroke="none" />
          <path d={`M${g.x} ${g.hi}h12M${g.x} ${g.lo}h12M${g.x + 6} ${g.hi}v${g.lo - g.hi}`} {...S} strokeDasharray="2 3" className="text-brand" opacity="0.7" />
          {/* The actual, beside it. Each result rises to meet its forecast on
              a loop, staggered along the run. */}
          <rect
            x={g.x + 18}
            y={g.act}
            width="12"
            height={base - g.act}
            rx="2"
            fill={g.out ? "var(--color-brand)" : "var(--color-snow)"}
            opacity={g.out ? 1 : 0.9}
            stroke="none"
            className="ci-grow"
            style={{ animationDelay: `${i * 160}ms` }}
          />
          {g.out && <circle cx={g.x + 24} cy={g.act} r="7" {...S} className="glyph-pulse text-brand" style={PULSE} />}
        </g>
      ))}
    </svg>
  );
}

/** Benchmarking: which peers are allowed to count.
 *
 *  WHY THIS. The document's sentence about benchmarking is mostly a
 *  qualification: the comparison "only uses data with sufficiently similar
 *  objectives, markets, channels, and conversion definitions". That is the
 *  argument, and it is four tests, so the drawing is a matrix. Each row is a
 *  candidate peer and the four cells are the four tests. Only the rows that
 *  pass all four join the range on the right; the rest stay dim and go
 *  nowhere. On a loop, the qualifying rows draw across into the range in turn.
 *
 *  It replaces a cloud of dots, which drew a category but said nothing about
 *  how a peer gets into one. No values on any axis: this is about eligibility,
 *  not about a number. */
function BenchmarkSketch() {
  /** Candidate peers against the four tests, in the document's order:
   *  objective, market, channel, conversion definition. */
  const rows: { y: number; pass: boolean[] }[] = [
    { y: 12, pass: [true, true, true, true] },
    { y: 30, pass: [true, true, false, true] },
    { y: 48, pass: [true, true, true, true] },
    { y: 66, pass: [true, true, true, true] },
    { y: 84, pass: [false, true, true, false] },
  ];
  const CELL = [44, 56, 68, 80];
  const RAIL = 150;
  const ok = rows.filter((r) => r.pass.every(Boolean));
  const top = ok[0].y;
  const bottom = ok[ok.length - 1].y;
  return (
    <svg viewBox="0 0 220 100" aria-hidden className="block w-full text-fog">
      {rows.map((r, i) => {
        const passes = r.pass.every(Boolean);
        return (
          <g key={r.y} opacity={passes ? 1 : 0.4}>
            {/* The peer. */}
            <rect x="10" y={r.y - 2.5} width="24" height="5" rx="2.5" fill="var(--color-fog)" opacity="0.75" stroke="none" />
            {/* The four tests. */}
            {CELL.map((cx, c) =>
              r.pass[c] ? (
                <rect key={cx} x={cx} y={r.y - 4.5} width="9" height="9" rx="2" fill="var(--color-brand)" opacity="0.85" stroke="none" />
              ) : (
                <g key={cx}>
                  <rect x={cx} y={r.y - 4.5} width="9" height="9" rx="2" {...S} strokeWidth="1.1" opacity="0.7" />
                  <path d={`M${cx + 2.6} ${r.y - 1.9}l3.8 3.8M${cx + 6.4} ${r.y - 1.9}l-3.8 3.8`} {...S} strokeWidth="1.1" opacity="0.7" />
                </g>
              ),
            )}
            {/* Only a peer that passes all four reaches the range. */}
            {passes && (
              <path
                d={`M93 ${r.y}H${RAIL}`}
                {...S}
                strokeWidth={0.8}
                pathLength="100"
                className="ci-draw text-brand"
                style={{ animationDelay: `${i * 260}ms` }}
              />
            )}
          </g>
        );
      })}

      {/* The range those peers make. */}
      <rect x={RAIL - 6} y={top} width="12" height={bottom - top} fill="var(--color-brand)" opacity="0.1" stroke="none" />
      <path
        d={`M${RAIL - 7} ${top}h14M${RAIL} ${top}V${bottom}M${RAIL - 7} ${bottom}h14`}
        {...S}
        strokeWidth={0.8}
        pathLength="100"
        className="ci-draw text-brand"
        style={{ animationDelay: "780ms" }}
      />
      {ok.map((r) => (
        <circle key={r.y} cx={RAIL} cy={r.y} r="3.2" fill="var(--color-brand)" stroke="none" />
      ))}
      {/* And where the middle of it falls. */}
      <path d={`M${RAIL + 10} ${(top + bottom) / 2}h${208 - RAIL - 10}`} {...S} strokeDasharray="3 4" className="text-brand" opacity="0.6" />
      <circle cx="204" cy={(top + bottom) / 2} r="3.4" {...S} className="glyph-pulse text-brand" style={PULSE} />
    </svg>
  );
}

const SKETCH: Partial<Record<GlyphVariant, () => ReactNode>> = {
  alert: AlertSketch,
  compare: CompareSketch,
  benchmark: BenchmarkSketch,
};

/** The six, in the order they are presented: everything before the budget is
 *  spent, then live, then after, then the one that runs through all three. The
 *  display number comes from this order, so it always ascends down the page. */
function order(items: TimelineItem[]) {
  const every = (i: TimelineItem) => i.phases.length === 3;
  const inPhase = (p: Phase) => items.filter((i) => !every(i) && i.phases.includes(p));
  return {
    before: inPhase("before"),
    live: inPhase("live"),
    after: inPhase("after"),
    every: items.filter(every),
  };
}

function Card({
  item,
  no,
  wide,
  band,
}: {
  item: TimelineItem;
  no: number;
  wide?: boolean;
  band?: boolean;
}) {
  const Sketch = SKETCH[item.glyph];
  // Only the band names its own phase. Every other card sits under a heading
  // that already says it, and a chip repeating it verbatim two lines below is
  // the same word twice.
  const label = band ? "Every phase" : null;
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-[1.5rem] border p-7 sm:p-8",
        band ? "border-brand/40 bg-brand/[0.05]" : "border-line bg-ink-3",
        (wide || band) && "lg:flex-row lg:items-center lg:gap-14 lg:p-10",
      )}
    >
      <div className={cn("flex flex-col", (wide || band) && "lg:flex-1")}>
        <div className="flex items-start justify-between gap-4">
          <span className="h-10 w-10 shrink-0 text-brand">
            <CapabilityGlyph variant={item.glyph} />
          </span>
          {label && (
            <span className="font-display shrink-0 rounded-full border border-brand/50 px-3 py-1 text-[0.6875rem] font-semibold uppercase text-brand-text">
              {label}
            </span>
          )}
        </div>
        <p className="font-display mt-7 text-[0.6875rem] font-bold tabular-nums text-brand-text">
          {String(no).padStart(2, "0")}
        </p>
        <h3
          className={cn(
            "font-display mt-2 font-extrabold uppercase leading-[1.12] text-snow",
            wide || band
              ? "text-[clamp(1.3rem,2.4vw,1.9rem)]"
              : "text-[clamp(1.15rem,1.9vw,1.5rem)]",
          )}
        >
          {item.title}
        </h3>
        <p className={cn("mt-4 leading-relaxed text-fog", (wide || band) && "max-w-2xl sm:text-lg")}>
          {item.body}
        </p>
      </div>
      {Sketch && (
        <div className={cn("mt-8 lg:mt-0", band ? "lg:w-[30%] lg:shrink-0" : "lg:w-[40%] lg:shrink-0")}>
          <Sketch />
        </div>
      )}
    </article>
  );
}

function PhaseLabel({ children }: { children: string }) {
  return (
    <p aria-hidden className="font-display mb-4 text-[0.6875rem] font-semibold uppercase text-ash">
      {children}
    </p>
  );
}

export function CampaignTimeline({
  items,
  startLabel = "Campaign starts",
}: {
  items: TimelineItem[];
  startLabel?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const { before, live, after, every } = order(items);
  // The number each card carries: its position in the presented order, so the
  // numbering can never disagree with the layout.
  const presented = [...before, ...live, ...after, ...every];
  const numberOf = (item: TimelineItem) => presented.indexOf(item) + 1;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add({ motion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const q = gsap.utils.selector(el);
      const start = q("[data-start]");
      const groups = q("[data-group]");

      gsap.set(start, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(groups, { opacity: 0.55, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 72%", end: "bottom 78%", scrub: 0.7 },
      });
      tl.to(groups[0], { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0)
        .to(start, { scaleX: 1, duration: 0.2, ease: "none" }, 0.22)
        .to(groups.slice(1), { opacity: 1, y: 0, duration: 0.2, stagger: 0.22, ease: "power2.out" }, 0.44);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([start, ...groups], { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={root}>
      {/* Before the budget is spent. */}
      <div data-group>
        <PhaseLabel>{LABEL.before}</PhaseLabel>
        <div className="grid gap-5 lg:grid-cols-3">
          {before.map((item) => (
            <Card key={item.title} item={item} no={numberOf(item)} />
          ))}
        </div>
      </div>

      {/* The line the campaign goes live at, drawn across the full width. */}
      <div aria-hidden className="relative py-10">
        <span data-start className="block h-px w-full bg-brand" />
        <span className="font-display absolute left-0 top-[calc(50%+10px)] text-[0.6875rem] font-semibold uppercase text-brand-text">
          {startLabel}
        </span>
      </div>

      {/* While it runs. */}
      <div data-group>
        <PhaseLabel>{LABEL.live}</PhaseLabel>
        <div className="grid gap-5">
          {live.map((item) => (
            <Card key={item.title} item={item} no={numberOf(item)} wide />
          ))}
        </div>
      </div>

      {/* And after. */}
      <div data-group className="mt-10">
        <PhaseLabel>{LABEL.after}</PhaseLabel>
        <div className="grid gap-5">
          {after.map((item) => (
            <Card key={item.title} item={item} no={numberOf(item)} wide />
          ))}
        </div>
      </div>

      {/* What runs through all three. */}
      <div data-group className="mt-5">
        {every.map((item) => (
          <Card key={item.title} item={item} no={numberOf(item)} band />
        ))}
      </div>
    </div>
  );
}
