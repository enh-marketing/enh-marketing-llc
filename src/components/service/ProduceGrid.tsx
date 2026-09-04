"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";

gsap.registerPlugin(ScrollTrigger);

export type OutputKind = "video" | "ugc" | "imagery" | "variants";
export type OutputItem = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  kind: OutputKind;
  /** The two phrases the drawing is captioned with, both from the document. */
  labels: [string, string];
};

/** Four kinds of output, each drawn as the thing it is.
 *
 *  WHY THIS. "What We Produce" is four different objects, and a reader who
 *  buys ads knows the shape of each: a vertical video with a caption bar; a
 *  presenter frame with the hooks that get tested against it; a product held
 *  still while the setting behind it changes; and one idea multiplied into a
 *  grid. So each card carries a preview of its own object rather than a shared
 *  icon, and the previews move the way the object does: the video's progress
 *  line runs, the hooks cycle, the backgrounds cycle, the variants fill in.
 *
 *  CAPTIONS ARE HTML, NOT SVG TEXT. Text inside a viewBox scales with the box,
 *  so a label sized to read at 1440 renders at 6.5px on a 320-wide phone. The
 *  two captions above each drawing are therefore HTML at the house minimum of
 *  0.6875rem, which is 11px at every width, and they come from the content
 *  file so they can be checked against the document.
 *
 *  NO FACES. The UGC presenter is a silhouette, because the document says
 *  synthetic presenters "are never presented as genuine customers", and a drawn
 *  face on a page about that would be a small version of the thing it warns
 *  against. No words appear inside any frame. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, vectorEffect: "non-scaling-stroke" as const };

function VideoSketch() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden className="block w-full text-fog">
      {/* The phone frame, 9:16. */}
      <rect x="86" y="8" width="48" height="80" rx="6" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <rect x="92" y="16" width="36" height="46" rx="3" fill="var(--color-fog)" opacity="0.28" />
      <path d="M107 35 l8 5 -8 5 z" fill="var(--color-brand)" />
      {/* Captions burnt into the cut. */}
      <rect x="94" y="68" width="30" height="2.6" rx="1.3" fill="var(--color-snow)" opacity="0.8" />
      <rect x="94" y="73" width="20" height="2.6" rx="1.3" fill="var(--color-snow)" opacity="0.6" />
      {/* Progress. */}
      <path d="M92 82 H128" {...S} className="text-line" />
      <path d="M92 82 H128" pathLength="100" stroke="var(--color-brand)" strokeWidth="0.8" strokeLinecap="round" fill="none" className="ci-draw" />
      {/* Voice and motion, either side. */}
      {[32, 40, 48].map((y, i) => <path key={y} d={`M56 ${y} h${[14, 20, 10][i]}`} {...S} className="ci-twinkle" style={{ animationDelay: `${i * 300}ms` }} />)}
      {[32, 40, 48].map((y, i) => <path key={y} d={`M${164 - [14, 20, 10][i]} ${y} h${[14, 20, 10][i]}`} {...S} className="ci-twinkle" style={{ animationDelay: `${i * 300 + 150}ms` }} />)}
    </svg>
  );
}

function UgcSketch() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden className="block w-full text-fog">
      {/* The frame, 4:5, and a silhouette: never a face. */}
      <rect x="12" y="8" width="64" height="80" rx="4" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <circle cx="44" cy="38" r="11" fill="var(--color-fog)" opacity="0.55" />
      <path d="M22 88 c0-16 10-24 22-24 s22 8 22 24" fill="var(--color-fog)" opacity="0.55" />
      <rect x="18" y="14" width="22" height="2.4" rx="1.2" fill="var(--color-fog)" opacity="0.6" />
      {/* The hooks, scripts and offers tried against the same presenter.
          fill-opacity, not opacity: .ci-blink-soft drives element opacity, so a
          tint set with the opacity attribute would flash solid brand red. */}
      {[16, 38, 60].map((y, i) => (
        <g key={y} {...(i === 0 ? { "data-first-tick": "" } : {})}>
          <rect x="96" y={y} width="112" height="16" rx="4" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <rect x="96" y={y} width="112" height="16" rx="4" fill="var(--color-brand)" fillOpacity="0.12" className="ci-blink-soft" style={{ animationDelay: `${i * 2000}ms` }} />
          <rect x="104" y={y + 5} width={[60, 44, 72][i]} height="2.6" rx="1.3" fill="var(--color-snow)" opacity="0.75" />
          <rect x="104" y={y + 10} width={[30, 52, 24][i]} height="2" rx="1" fill="var(--color-fog)" opacity="0.5" />
        </g>
      ))}
      <path d="M76 46 H 96" {...S} strokeDasharray="2 3" className="text-brand" />
    </svg>
  );
}

function ImagerySketch() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden className="block w-full text-fog">
      {/* Three settings behind, one product in front that never changes. */}
      {[0, 1, 2].map((i) => (
        <g key={i} {...(i === 0 ? { "data-first-tick": "" } : {})}>
          <rect x={22 + i * 8} y={12 + i * 5} width="176" height="70" rx="5" fill="var(--color-fog)" opacity={0.12 + i * 0.08} />
          <rect x={22 + i * 8} y={12 + i * 5} width="176" height="70" rx="5" fill="var(--color-brand)" fillOpacity="0.16" className="ci-blink-soft" style={{ animationDelay: `${i * 2000}ms` }} />
        </g>
      ))}
      <path d="M40 70 h130" {...S} className="text-line" />
      {/* The product: held still, checked carefully. */}
      {/* ink-2 is a surface token, so the product reads as a pale card in the
          light theme and a dark one in the dark theme. --color-snow is a
          foreground token and rendered this block black on white. */}
      <rect x="92" y="26" width="36" height="44" rx="4" fill="var(--color-ink-2)" stroke="var(--color-brand)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <rect x="99" y="34" width="22" height="3" rx="1.5" fill="var(--color-brand)" />
      <rect x="99" y="42" width="16" height="2.2" rx="1.1" fill="var(--color-fog)" opacity="0.7" />
      <rect x="99" y="47" width="20" height="2.2" rx="1.1" fill="var(--color-fog)" opacity="0.7" />
      <circle cx="128" cy="26" r="5" fill="var(--color-brand)" />
      <path d="M125.6 26 l1.8 1.8 l3.2 -3.6" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function VariantsSketch() {
  const cells = Array.from({ length: 8 }, (_, i) => i);
  return (
    <svg viewBox="0 0 220 92" aria-hidden className="block w-full text-fog">
      {/* The master. */}
      <rect x="12" y="12" width="52" height="70" rx="4" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <rect x="20" y="22" width="36" height="34" rx="2" fill="var(--color-fog)" opacity="0.35" />
      <rect x="20" y="62" width="28" height="2.6" rx="1.3" fill="var(--color-snow)" opacity="0.8" />
      <rect x="20" y="68" width="18" height="2.2" rx="1.1" fill="var(--color-brand)" />
      <path d="M64 47 H 82" {...S} className="text-line" />
      <path d="M64 47 H 82" pathLength="100" stroke="var(--color-brand)" strokeWidth="0.9" strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDuration: "1.8s" }} />
      {/* The versions: same bones, a different opening, headline or format each. */}
      {cells.map((i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 86 + col * 31;
        const y = 12 + row * 37;
        const tall = i % 3 === 0;
        return (
          <g key={i} className="ci-grow" style={{ animationDelay: `${i * 140}ms`, transformOrigin: "bottom" }}>
            <rect x={x} y={y + (tall ? 0 : 4)} width="26" height={tall ? 32 : 24} rx="3" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <rect x={x + 4} y={y + (tall ? 4 : 8)} width="18" height={tall ? 14 : 8} rx="1.5" fill="var(--color-fog)" opacity="0.35" />
            <rect x={x + 4} y={y + (tall ? 22 : 20)} width={[14, 10, 16, 12][col]} height="2" rx="1" fill={i % 2 ? "var(--color-brand)" : "var(--color-snow)"} opacity="0.85" />
          </g>
        );
      })}
    </svg>
  );
}

export function ProduceGrid({ items }: { items: OutputItem[] }) {
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
      tl.to(cards, { opacity: 1, y: 0, duration: 0.25, stagger: 0.12, ease: "power2.out" }, 0);
      return () => { tl.scrollTrigger?.kill(); tl.kill(); gsap.set(cards, { clearProps: "all" }); };
    });
    return () => mm.revert();
  }, [items.length]);

  const sketch = (k: OutputKind): ReactNode =>
    k === "video" ? <VideoSketch /> : k === "ugc" ? <UgcSketch /> : k === "imagery" ? <ImagerySketch /> : <VariantsSketch />;

  return (
    <div ref={root} className="grid gap-5 lg:grid-cols-2">
      {items.map((item) => (
        <article key={item.no} data-card className="flex flex-col rounded-[1.5rem] border border-line bg-ink-3 p-7 sm:p-8">
          <div className="rounded-xl border border-line bg-ink-2 p-3">
            <p className="font-display mb-3 flex items-baseline justify-between gap-3 text-[0.6875rem] font-semibold uppercase leading-none">
              <span className="text-ash">{item.labels[0]}</span>
              <span className="text-right text-brand-text">{item.labels[1]}</span>
            </p>
            {sketch(item.kind)}
          </div>
          <div className="mt-7 flex items-start gap-4">
            <span className="h-9 w-9 shrink-0 text-brand"><CapabilityGlyph variant={item.glyph} /></span>
            <div>
              <p className="font-display text-[0.6875rem] font-bold tabular-nums text-brand-text">{item.no}</p>
              <h3 className="font-display mt-1.5 text-[clamp(1.15rem,1.9vw,1.5rem)] font-extrabold uppercase leading-[1.12] text-snow">{item.title}</h3>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-fog">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
