"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type DashboardKind = "marketing" | "sales" | "ecommerce" | "attribution" | "management" | "integration";

export type GalleryItem = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  kind: DashboardKind;
  /** The drawing's captions, in the document's words. The management card
   *  takes the role names instead, so its list may be empty. */
  labels: string[];
};

/** Six services, five of which are dashboards a person reads and one of which
 *  is the work underneath all of them.
 *
 *  WHY THIS SHAPE. A dashboard is a thing you look at, so each of the five is
 *  drawn as the view it would be, and the drawings differ because the views
 *  do: marketing ranks platforms, sales is a pipeline that narrows, ecommerce
 *  stacks revenue by channel over time, attribution splits credit from activity
 *  to outcome, management shows one focused view behind a role. Data
 *  Integration is not a view at all ("before it reaches the dashboard"), so it
 *  runs as a band under the five, drawn as rows arriving ragged and leaving
 *  aligned.
 *
 *  THE GRID IS UNEVEN ON PURPOSE. The marketing dashboard is the one the
 *  document describes first and at most length, so it takes two columns; the
 *  other four are single. Five cards in a 3-3 grid would leave a hole; 2-1 over
 *  1-1-1 does not. Display numbers still ascend left to right, top to bottom,
 *  matching the document's order exactly.
 *
 *  NO FIGURES ANYWHERE. Bars have no scale, tiles have no values, the only text
 *  in a drawing is a metric's name as the document writes it. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/** Marketing: platforms ranked, spend against what it produced. */
function MarketingSketch() {
  const rows = [
    { y: 26, spend: 120, out: 92 },
    { y: 40, spend: 96, out: 100 },
    { y: 54, spend: 70, out: 44 },
    { y: 68, spend: 50, out: 62 },
  ];
  return (
    <svg viewBox="0 0 220 88" aria-hidden className="block w-full text-fog">
      {rows.map((r, i) => (
        <g key={r.y}>
          <rect x="12" y={r.y - 1} width="40" height="3" rx="1.5" fill="var(--color-fog)" opacity="0.5" />
          <rect x="60" y={r.y - 5} width={r.spend} height="4.5" rx="2" fill="var(--color-fog)" opacity="0.5" className="ci-grow-x" style={{ animationDelay: `${i * 160}ms` }} />
          <rect x="60" y={r.y + 1} width={r.out} height="4.5" rx="2" fill="var(--color-brand)" opacity="0.9" className="ci-grow-x" style={{ animationDelay: `${i * 160 + 80}ms` }} />
        </g>
      ))}
      <path d="M60 78 H 208" {...S} className="text-line" />
    </svg>
  );
}

/** Sales: a pipeline that narrows from enquiry to sale. */
function SalesSketch() {
  const stages = [180, 140, 104, 72, 44];
  return (
    <svg viewBox="0 0 220 88" aria-hidden className="block w-full text-fog">
      {stages.map((w, i) => (
        <rect
          key={i}
          x={110 - w / 2}
          y={16 + i * 13}
          width={w}
          height="9"
          rx="3"
          fill={i === stages.length - 1 ? "var(--color-brand)" : "var(--color-fog)"}
          opacity={i === stages.length - 1 ? 0.9 : 0.75 - i * 0.1}
        />
      ))}
      {/* Enquiries moving down through it. The static twin keeps the route
          visible when the packet is switched off under reduced motion. */}
      <path d="M110 12 V 84" {...S} className="text-line" />
      <path d="M110 12 V 84" pathLength="100" stroke="var(--color-brand)" strokeWidth="0.9" strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDuration: "2.2s" }} />
    </svg>
  );
}

/** Ecommerce: revenue stacked by channel across periods. */
function EcommerceSketch() {
  const cols = [
    [10, 14, 8], [14, 10, 12], [9, 16, 10], [16, 12, 14], [12, 18, 9], [18, 14, 12],
  ];
  return (
    <svg viewBox="0 0 220 88" aria-hidden className="block w-full text-fog">
      <path d="M12 78 H 208" {...S} className="text-line" />
      {cols.map((seg, c) => {
        let y = 78;
        return (
          <g key={c}>
            {seg.map((h, s) => {
              y -= h;
              return (
                <rect
                  key={s}
                  x={22 + c * 30}
                  y={y}
                  width="18"
                  height={h - 1}
                  rx="1.5"
                  fill={s === 0 ? "var(--color-brand)" : s === 1 ? "var(--color-fog)" : "var(--color-fog)"}
                  opacity={s === 0 ? 0.9 : s === 1 ? 0.6 : 0.35}
                  className="ci-grow"
                  style={{ animationDelay: `${c * 120}ms` }}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/** Attribution: activity on the left, the recorded outcome on the right, and
 *  credit split between them. */
function AttributionSketch() {
  const acts = [
    { y: 24, w: 3.4 },
    { y: 44, w: 1.8 },
    { y: 64, w: 1.2 },
  ];
  return (
    <svg viewBox="0 0 220 88" aria-hidden className="block w-full text-fog">
      {acts.map((a, i) => (
        <g key={a.y}>
          <rect x="12" y={a.y - 6} width="44" height="12" rx="3" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <rect x="18" y={a.y - 1.2} width="26" height="2.4" rx="1.2" fill="var(--color-fog)" opacity="0.6" />
          <path d={`M56 ${a.y} C 100 ${a.y}, 110 44, 150 44`} fill="none" stroke="var(--color-brand)" strokeWidth={a.w} strokeLinecap="round" opacity={0.35 + i * 0.05} vectorEffect="non-scaling-stroke" />
          <path d={`M56 ${a.y} C 100 ${a.y}, 110 44, 150 44`} pathLength="100" stroke="var(--color-brand)" strokeWidth={a.w} strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDelay: `${i * 600}ms` }} />
        </g>
      ))}
      <rect x="150" y="30" width="58" height="28" rx="4" fill="var(--color-brand)" opacity="0.1" />
      <rect x="150" y="30" width="58" height="28" rx="4" {...S} className="text-brand" />
      <rect x="158" y="41" width="30" height="3" rx="1.5" fill="var(--color-snow)" opacity="0.85" />
      <rect x="158" y="48" width="18" height="2.4" rx="1.2" fill="var(--color-fog)" opacity="0.5" />
    </svg>
  );
}

/** Management: one focused view, behind a role. */
function ManagementSketch({ roles }: { roles: string[] }) {
  return (
    <svg viewBox="0 0 220 88" aria-hidden className="block w-full text-fog">
      {/* One underline lit at a time, under the role chips set above in HTML. */}
      {roles.map((r, i) => (
        <g key={r} {...(i === 0 ? { "data-first-tick": "" } : {})}>
          <rect x={8 + i * 52} y="12" width="46" height="1.6" fill="var(--color-brand)" className="ci-blink" style={{ animationDelay: `${i * 1500}ms` }} />
        </g>
      ))}
      <rect x="12" y="22" width="196" height="58" rx="4" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {/* One focused tile, at the scale a senior team reads at. */}
      <rect x="22" y="32" width="70" height="38" rx="3" fill="var(--color-brand)" opacity="0.08" />
      <rect x="22" y="32" width="70" height="38" rx="3" {...S} className="text-brand" />
      <rect x="30" y="40" width="26" height="2.4" rx="1.2" fill="var(--color-fog)" opacity="0.6" />
      <rect x="30" y="50" width="52" height="8" rx="2" fill="var(--color-snow)" opacity="0.85" />
      <path d="M104 40 C 130 38, 150 30, 196 28" fill="none" stroke="var(--color-fog)" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" vectorEffect="non-scaling-stroke" />
      <path d="M104 60 H 196" {...S} className="text-line" />
      <path d="M104 68 H 170" {...S} className="text-line" />
      {/* Access, limited by role. */}
      <rect x="182" y="66" width="18" height="12" rx="3" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <path d="M187 66 v-3 a4 4 0 0 1 8 0 v3" {...S} className="text-brand" />
      <circle cx="191" cy="72" r="1.6" fill="var(--color-brand)" />
    </svg>
  );
}

/** Integration: rows arriving ragged from different systems, leaving aligned. */
function IntegrationSketch() {
  const raw = [
    { y: 22, x: 14, w: 30, dup: false },
    { y: 32, x: 20, w: 22, dup: false },
    { y: 42, x: 12, w: 36, dup: false },
    { y: 52, x: 20, w: 22, dup: true },
    { y: 62, x: 16, w: 28, dup: false },
  ];
  return (
    <svg viewBox="0 0 220 88" aria-hidden className="block w-full text-fog">
      {raw.map((r, i) => (
        <g key={r.y} opacity={r.dup ? 0.45 : 1}>
          <rect x={r.x} y={r.y} width={r.w} height="4" rx="2" fill="var(--color-fog)" opacity="0.6" className="ci-twinkle" style={{ animationDelay: `${i * 260}ms` }} />
          {r.dup && <path d={`M${r.x + r.w + 4} ${r.y - 1} l4 6 M${r.x + r.w + 8} ${r.y - 1} l-4 6`} {...S} className="text-brand" />}
        </g>
      ))}
      <path d="M78 44 H 116" {...S} className="text-line" />
      <path d="M78 44 H 116" pathLength="100" stroke="var(--color-brand)" strokeWidth="0.9" strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDuration: "2s" }} />
      {[22, 32, 42, 52].map((y, i) => (
        <path key={y} d={`M130 ${y + 2} h60`} pathLength="100" stroke="var(--color-snow)" strokeWidth="1.8" strokeLinecap="round" fill="none" className="ci-draw" style={{ animationDelay: `${i * 300}ms` }} />
      ))}
      <path d="M130 66 h60" {...S} className="text-brand" />
    </svg>
  );
}

/** A drawing's captions, set in HTML rather than as SVG <text>.
 *
 *  Text inside a viewBox scales with the box, so a label sized to read at 1440
 *  renders at 7px on a 320-wide phone, and two labels sized to fit at one width
 *  collide at another. HTML at 0.6875rem is 11px at every width and wraps
 *  instead of overprinting. */
function Caption({ labels, spread }: { labels: string[]; spread?: boolean }) {
  if (!labels.length) return null;
  if (spread) {
    return (
      <p className="font-display mb-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.6875rem] font-semibold uppercase leading-none">
        {labels.map((l, i) => (
          <span key={l} className={i === 0 ? "text-brand-text" : "text-ash"}>{l}</span>
        ))}
      </p>
    );
  }
  return (
    <p className="font-display mb-3 flex items-baseline justify-between gap-3 text-[0.6875rem] font-semibold uppercase leading-none">
      <span className="text-ash">{labels[0]}</span>
      {labels[1] && <span className="text-right text-brand-text">{labels[1]}</span>}
    </p>
  );
}

export function DashboardGallery({
  items,
  roles,
}: {
  items: GalleryItem[];
  /** The department views the management dashboard names, in its words. */
  roles: string[];
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const cards = gsap.utils.selector(el)("[data-card]");
      gsap.set(cards, { opacity: 0.55, y: 18 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 72%", end: "bottom 78%", scrub: 0.7 } });
      tl.to(cards, { opacity: 1, y: 0, duration: 0.22, stagger: 0.1, ease: "power2.out" }, 0);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(cards, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length]);

  const sketch = (k: DashboardKind): ReactNode => {
    switch (k) {
      case "marketing": return <MarketingSketch />;
      case "sales": return <SalesSketch />;
      case "ecommerce": return <EcommerceSketch />;
      case "attribution": return <AttributionSketch />;
      case "management": return <ManagementSketch roles={roles} />;
      case "integration": return <IntegrationSketch />;
    }
  };

  return (
    <div ref={root} className="grid gap-5 lg:grid-cols-3">
      {items.map((item) => {
        const band = item.kind === "integration";
        const wide = item.kind === "marketing";
        return (
          <article
            key={item.no}
            data-card
            className={cn(
              "relative flex flex-col rounded-[1.5rem] border p-7 sm:p-8",
              band ? "border-brand/40 bg-brand/[0.05] lg:col-span-3 lg:flex-row lg:items-center lg:gap-14 lg:p-10" : "border-line bg-ink-3",
              // items-start, not items-center: the wide card sits beside a normal one, and
              // centring its text pushed its number below the neighbour's.
              wide && "lg:col-span-2 lg:flex-row lg:items-start lg:gap-12",
            )}
          >
            <div className={cn("flex flex-col", (band || wide) && "lg:flex-1")}>
              <span className="h-10 w-10 shrink-0 text-brand">
                <CapabilityGlyph variant={item.glyph} />
              </span>
              <p className="font-display mt-7 text-[0.6875rem] font-bold tabular-nums text-brand-text">{item.no}</p>
              <h3 className={cn("font-display mt-2 font-extrabold uppercase leading-[1.12] text-snow", band || wide ? "text-[clamp(1.3rem,2.4vw,1.9rem)]" : "text-[clamp(1.1rem,1.8vw,1.4rem)]")}>
                {item.title}
              </h3>
              <p className={cn("mt-4 leading-relaxed text-fog", (band || wide) && "max-w-2xl sm:text-lg")}>{item.body}</p>
            </div>
            <div className={cn("mt-8", band ? "lg:mt-0 lg:w-[36%] lg:shrink-0" : wide ? "lg:mt-0 lg:w-[42%] lg:shrink-0 lg:self-center" : "mt-auto pt-8")}>
              <div className="rounded-xl border border-line bg-ink-2 p-3">
                <Caption labels={item.kind === "management" ? roles : item.labels} spread={item.kind === "management"} />
                {sketch(item.kind)}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
