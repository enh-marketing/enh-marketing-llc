"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type DashboardKind = "marketing" | "sales" | "ecommerce" | "attribution" | "management" | "integration";

export type StratumItem = {
  no: string;
  title: string;
  body: string;
  kind: DashboardKind;
  labels: string[];
};

/** Six services, drawn as one mass cut through and seen in section.
 *
 *  WHY THIS SHAPE. Five of these are dashboards a person reads. The sixth,
 *  data integration and preparation, is not a view at all: the document says
 *  it happens "before it reaches the dashboard". It is not beside the other
 *  five, it is under them. So the section is a single block cut through, six
 *  beds of unequal thickness with no gaps between them, and the preparation
 *  bed is the deepest and darkest, carrying that phrase on the rule above it.
 *
 *  Thickness is not decoration: it follows how much the document gives each
 *  item, so the mass has an uneven grain rather than six equal rows.
 *
 *  NOT A CARD GRID. There are no cards, no gaps, no per-item borders and no
 *  radii. One outer rule holds the whole mass. Each bed's matter is drawn to
 *  run past the right edge and be cut by it, the way a section drawing cuts
 *  through whatever it meets, so nothing sits neatly inside a frame.
 *
 *  A borehole descends the mass on a loop, sampling each bed as it passes.
 *  Below the large breakpoint the beds keep their order, their rules and their
 *  uneven depths; the matter drops beneath the paragraph and still bleeds. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, vectorEffect: "non-scaling-stroke" as const };

/** Bed depth in pixels at the large breakpoint, and how far down the site's own
 *  surface scale the ground sits.
 *
 *  Depths differ by at least 16px so the grain is legible. The ground steps
 *  from the lightest surface to the deepest, which is what a section drawing
 *  does and, being neutral, is also what the theme already has tokens for:
 *  --color-ink-3 to --color-void reads as white to warm grey in the light
 *  theme and as near-black deepening in the dark one. An earlier version mixed
 *  the brand red into each bed instead, which turned the whole section pink. */
const BED: Record<DashboardKind, { h: number; depth: number }> = {
  marketing: { h: 232, depth: 0 },
  sales: { h: 196, depth: 20 },
  ecommerce: { h: 200, depth: 40 },
  attribution: { h: 216, depth: 60 },
  management: { h: 236, depth: 80 },
  integration: { h: 268, depth: 100 },
};

/* Every drawing is composed to continue past the right edge of its bed. Each
   uses a viewBox wider than it will ever be shown and `xMinYMid slice`, so the
   cut is real rather than a fade. */
const CUT = { preserveAspectRatio: "xMinYMid slice" as const };

/** Marketing: platforms ranked, spend against what it produced, running on. */
function MarketingCut() {
  const rows = [10, 30, 50, 70];
  return (
    <svg viewBox="0 0 340 88" aria-hidden {...CUT} className="block h-full w-full text-fog">
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="0" y={y - 4} width="44" height="3.4" rx="1.7" fill="currentColor" opacity="0.45" />
          <rect x="54" y={y - 7} width={[286, 232, 180, 128][i]} height="5" rx="2.5" fill="currentColor" opacity="0.4" />
          <rect x="54" y={y - 0.5} width={[214, 250, 108, 156][i]} height="5" rx="2.5" fill="var(--color-brand)" opacity="0.85" />
        </g>
      ))}
    </svg>
  );
}

/** Sales: a pipeline narrowing as it leaves the cut. */
function SalesCut() {
  return (
    <svg viewBox="0 0 340 88" aria-hidden {...CUT} className="block h-full w-full text-fog">
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M0 ${8 + i * 17} H ${300 - i * 58}`} {...S} strokeWidth={i === 4 ? 5 : 8} opacity={i === 4 ? 1 : 0.5 - i * 0.07} stroke={i === 4 ? "var(--color-brand)" : "currentColor"} />
      ))}
      <path d="M18 0 V 88" pathLength="100" stroke="var(--color-brand)" strokeWidth="1.4" strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDuration: "2.6s" }} />
    </svg>
  );
}

/** Ecommerce: revenue stacked by channel, the run continuing past the cut. */
function EcommerceCut() {
  const cols = [[14, 20, 10], [18, 14, 16], [12, 24, 12], [22, 16, 18], [16, 26, 12], [24, 18, 16], [18, 22, 14]];
  return (
    <svg viewBox="0 0 340 88" aria-hidden {...CUT} className="block h-full w-full text-fog">
      <path d="M0 82 H 340" {...S} className="text-line" />
      {cols.map((seg, c) => {
        let y = 82;
        return (
          <g key={c}>
            {seg.map((h, s) => {
              y -= h;
              return (
                <rect key={s} x={4 + c * 48} y={y} width="34" height={h - 2} rx="1.5" fill={s === 0 ? "var(--color-brand)" : "currentColor"} opacity={s === 0 ? 0.9 : 0.55 - s * 0.18} />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/** Attribution: activity converging on an outcome that is half past the cut. */
function AttributionCut() {
  const ys = [12, 34, 56, 78];
  return (
    <svg viewBox="0 0 340 88" aria-hidden {...CUT} className="block h-full w-full text-fog">
      {ys.map((y, i) => (
        <g key={y}>
          <rect x="0" y={y - 5} width="58" height="10" rx="3" {...S} strokeWidth="1.1" opacity="0.7" />
          <path d={`M58 ${y} C 150 ${y}, 180 44, 268 44`} {...S} strokeWidth="1" opacity="0.45" />
          <path d={`M58 ${y} C 150 ${y}, 180 44, 268 44`} pathLength="100" stroke="var(--color-brand)" strokeWidth={1.6 - i * 0.2} strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDelay: `${i * 480}ms` }} />
        </g>
      ))}
      <rect x="268" y="18" width="96" height="52" rx="4" fill="var(--color-brand)" opacity="0.1" />
      <rect x="268" y="18" width="96" height="52" rx="4" {...S} className="text-brand" />
      <rect x="282" y="36" width="52" height="4.5" rx="2.25" fill="currentColor" opacity="0.6" />
      <rect x="282" y="48" width="34" height="3.4" rx="1.7" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/** Management: one focused view, the rest of the desk cut away. */
function ManagementCut() {
  return (
    <svg viewBox="0 0 340 88" aria-hidden {...CUT} className="block h-full w-full text-fog">
      <rect x="0" y="8" width="150" height="72" rx="4" fill="var(--color-brand)" opacity="0.07" />
      <rect x="0" y="8" width="150" height="72" rx="4" {...S} className="text-brand" />
      <rect x="14" y="22" width="60" height="4" rx="2" fill="currentColor" opacity="0.55" />
      <rect x="14" y="38" width="104" height="14" rx="3" fill="var(--color-brand)" opacity="0.85" />
      <rect x="14" y="60" width="80" height="3.4" rx="1.7" fill="currentColor" opacity="0.4" />
      <path d="M170 66 C 210 58, 244 40, 300 26 S 336 18, 340 16" {...S} strokeWidth="1.6" opacity="0.55" />
      {[186, 224, 262, 300].map((x, i) => (
        <rect key={x} x={x} y={70 - i * 4} width="26" height={i * 4 + 10} rx="1.5" fill="currentColor" opacity="0.28" />
      ))}
      {/* Access, limited by role. */}
      <rect x="316" y="30" width="22" height="16" rx="3" {...S} className="text-brand" />
      <path d="M321 30 v-4 a6 6 0 0 1 12 0 v4" {...S} className="text-brand" />
    </svg>
  );
}

/** Integration: ragged rows arriving, resolving into aligned rows, cut. */
function IntegrationCut() {
  const raw = [
    { y: 8, x: 0, w: 62, dup: false },
    { y: 24, x: 10, w: 44, dup: false },
    { y: 40, x: 0, w: 74, dup: true },
    { y: 56, x: 14, w: 40, dup: false },
    { y: 72, x: 4, w: 58, dup: false },
  ];
  return (
    <svg viewBox="0 0 340 100" aria-hidden {...CUT} className="block h-full w-full text-fog">
      {raw.map((r, i) => (
        <g key={r.y} opacity={r.dup ? 0.45 : 1}>
          <rect x={r.x} y={r.y} width={r.w} height="6" rx="3" fill="currentColor" opacity="0.5" className="ci-twinkle" style={{ animationDelay: `${i * 240}ms` }} />
          {r.dup && <path d={`M${r.x + r.w + 6} ${r.y - 1} l6 8 M${r.x + r.w + 12} ${r.y - 1} l-6 8`} {...S} className="text-brand" />}
        </g>
      ))}
      <path d="M112 50 H 168" {...S} className="text-line" />
      <path d="M112 50 H 168" pathLength="100" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDuration: "2.2s" }} />
      {[10, 26, 42, 58].map((y) => (
        <path key={y} d={`M190 ${y + 4} H 340`} stroke="currentColor" strokeWidth="5" strokeLinecap="butt" fill="none" opacity="0.55" />
      ))}
      <path d="M190 78 H 340" {...S} className="text-brand" strokeWidth="2" />
    </svg>
  );
}

const CUTS: Record<DashboardKind, () => ReactNode> = {
  marketing: MarketingCut,
  sales: SalesCut,
  ecommerce: EcommerceCut,
  attribution: AttributionCut,
  management: ManagementCut,
  integration: IntegrationCut,
};

export function DashboardStrata({
  items,
  roles,
  beforeLabel,
}: {
  items: StratumItem[];
  /** The department views the management bed names, in the document's words. */
  roles: string[];
  /** The document's phrase for what the last bed does, set on the rule above
   *  it: "before it reaches the dashboard". */
  beforeLabel: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const probe = el.querySelector("[data-probe]");
      if (!probe) return;
      // Nothing is dimmed. Holding the beds at 0.62 and lighting them one at a
      // time put a grey film over the copy in five of the six.
      const tl = gsap.timeline({ repeat: -1, paused: true });
      tl.fromTo(probe, { yPercent: 0 }, { yPercent: 100, duration: 7, ease: "none" }, 0);
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.pause(),
        onLeaveBack: () => tl.pause(),
      });
      return () => {
        st.kill();
        tl.kill();
      };
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={root} className="relative overflow-hidden rounded border border-line">
      {/* The borehole, in the margin so it samples the mass without crossing
          any of the matter, and the sample descending it. */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-4 z-10 w-px bg-line" />
      <span aria-hidden data-probe className="pointer-events-none absolute right-4 top-0 z-10 hidden h-[calc(100%-8px)] w-0 lg:block">
        <span className="absolute -left-[3.5px] top-0 h-2 w-2 rounded-[1px] bg-brand" />
      </span>

      <ol>
        {items.map((item, i) => {
          const bed = BED[item.kind];
          const Cut = CUTS[item.kind];
          const last = i === items.length - 1;
          const caps = item.kind === "management" ? roles : item.labels;
          return (
            <li
              key={item.no}
              data-bed
              className={cn(
                "group relative grid items-center gap-x-10 bg-ink-3 px-6 py-8 sm:px-9",
                i > 0 && (last ? "border-t-2 border-brand" : "border-t border-line"),
                "lg:grid-cols-[3.5rem_minmax(0,520px)_minmax(0,1fr)]",
              )}
              style={{ minHeight: bed.h }}
            >
              {/* The ground, stepping down the surface scale. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ backgroundColor: `color-mix(in oklab, var(--color-void) ${bed.depth}%, var(--color-ink-3))` }}
              />
              {/* The phrase that puts this bed under the others. */}
              {last && (
                <span className="font-display absolute -top-[0.55rem] left-6 z-10 rounded-full border border-brand bg-ink px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase leading-none text-brand-text sm:left-9">
                  {beforeLabel}
                </span>
              )}

              <p className="font-display relative text-[0.9375rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text lg:self-start lg:pt-1">
                {item.no}
              </p>
              <div className="relative mt-2 lg:mt-0">
                <h3 className="font-display text-[clamp(1.15rem,1.9vw,1.6rem)] font-extrabold uppercase leading-[1.12] text-snow">
                  {item.title}
                </h3>
                {/* The rule that grows on hover, as on the approved pages. */}
                <span aria-hidden className="mt-3 block h-px w-8 bg-line transition-all duration-500 group-hover:w-20 group-hover:bg-brand motion-reduce:transition-none" />
                <p className="mt-3 leading-relaxed text-fog">{item.body}</p>
              </div>
              <div className="relative mt-6 h-[110px] text-fog transition-colors duration-500 group-hover:text-snow lg:mt-0 lg:h-[130px]">
                {caps.length > 0 && (
                  <p className="font-display mb-2 flex flex-wrap gap-x-4 text-[0.6875rem] font-semibold uppercase leading-none">
                    {caps.map((c, ci) => (
                      <span key={c} className={ci === 0 ? "text-brand-text" : "text-ash"}>
                        {c}
                      </span>
                    ))}
                  </p>
                )}
                <div className="h-[86px] lg:h-[104px]">
                  <Cut />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
