"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type SupportDuty = { no: string; title: string };

/** Nine duties, set as nine lines of type with the shape they make drawn round
 *  them.
 *
 *  WHY THIS SHAPE. The document introduces these as what ongoing support "can
 *  include", and then lists nine short phrases of very different lengths:
 *  "Reviewing crawler access" against "Reporting confirmed AI referral traffic
 *  where available". Set as nine tiles they all became the same size and the
 *  list said nothing. Set as nine unwrapped lines, the ragged right edge is
 *  itself the answer to "how much is included", so the section draws that edge:
 *  a single hard-cornered outline measured from the type at runtime.
 *
 *  NOT A TILE GRID. There are no tiles, no cards, no columns of items and no
 *  glyphs. Nine numbered lines and one outline around them. The lead sits at
 *  the head of the prose column and the sentence about scope at its foot, so
 *  the two paragraphs bracket the run without boxing it.
 *
 *  The outline is measured, not guessed: it is rebuilt once the display font
 *  has loaded, on resize and on every ScrollTrigger refresh. If measurement is
 *  not possible the outline simply does not draw, and nine numbered lines of
 *  display type still stand on their own. */
export function SupportOutline({
  items,
  lead,
  scope,
}: {
  items: SupportDuty[];
  lead: string;
  scope: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const spans = useRef<(HTMLSpanElement | null)[]>([]);
  const [path, setPath] = useState<string | null>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  /** The silhouette of the block of type: straight down the left, and stepping
   *  in and out on the right to each line's own measured end. */
  const build = useCallback(() => {
    const el = root.current;
    const list = spans.current.filter(Boolean) as HTMLSpanElement[];
    if (!el || list.length !== items.length) return;
    const r = el.getBoundingClientRect();
    if (r.width < 2) return;
    const pad = 18;
    const pts: string[] = [];
    // Down the right-hand rag.
    list.forEach((sp, i) => {
      const b = sp.getBoundingClientRect();
      const top = b.top - r.top - (i === 0 ? 14 : 6);
      const bottom = b.bottom - r.top + (i === list.length - 1 ? 14 : 6);
      const x = Math.min(b.right - r.left + pad, r.width - 1);
      if (i === 0) pts.push(`M 0 ${top.toFixed(1)}`, `L ${x.toFixed(1)} ${top.toFixed(1)}`);
      else pts.push(`L ${x.toFixed(1)} ${top.toFixed(1)}`);
      pts.push(`L ${x.toFixed(1)} ${bottom.toFixed(1)}`);
    });
    const lastB = list[list.length - 1].getBoundingClientRect();
    pts.push(`L 0 ${(lastB.bottom - r.top + 14).toFixed(1)}`, "Z");
    setPath(pts.join(" "));
    setBox({ w: r.width, h: r.height });
  }, [items.length]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let ro: ResizeObserver | null = null;
    let st: ScrollTrigger | null = null;
    const run = () => build();
    // The rag depends on the display font, so wait for it before measuring.
    if (typeof document !== "undefined" && document.fonts) document.fonts.ready.then(run).catch(run);
    else run();
    ro = new ResizeObserver(run);
    ro.observe(el);
    st = ScrollTrigger.create({ trigger: el, start: "top bottom", onRefresh: run });
    return () => {
      ro?.disconnect();
      st?.kill();
    };
  }, [build]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const lines = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-line]"));
      const outline = el.querySelector<SVGPathElement>("[data-outline]");
      gsap.set(lines, { opacity: 0.55 });
      const len = outline?.getTotalLength?.() ?? 0;
      if (outline && len) gsap.set(outline, { strokeDasharray: len, strokeDashoffset: len });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 85%", scrub: 0.6 } });
      if (outline && len) tl.to(outline, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);
      lines.forEach((l, i) => tl.to(l, { opacity: 1, duration: 0.6 / lines.length, ease: "none" }, i / lines.length));
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(lines, { clearProps: "all" });
        if (outline) gsap.set(outline, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length, path]);

  return (
    <div>
      {/* What changes, and therefore what recurs. */}
      <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">{lead}</p>

      {/* The nine, and the shape they make. Given the full measure, because the
          rag is the point: the shortest duty is a third the length of the
          longest, and that difference is what "can include" means here. */}
      <div ref={root} className="relative mt-10">
        {path && box && (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden overflow-visible lg:block"
            width={box.w}
            height={box.h}
            viewBox={`0 0 ${box.w} ${box.h}`}
          >
            {/* The silhouette draws itself as the reader goes down the run,
                so the shape is arrived at rather than simply present. */}
            <path data-outline d={path} fill="none" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            {/* One bright segment circulating the perimeter for ever. Under
                reduced motion the outline itself is the finished state. */}
            <path
              d={path}
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
              pathLength="100"
              className="ci-flow"
              style={{ animationDuration: "16s" }}
            />
          </svg>
        )}
        <ol className="relative">
          {items.map((d, i) => (
            <li key={d.no} data-line className="group grid grid-cols-[2.5rem_auto] items-baseline py-[0.55rem] lg:grid-cols-[3.5rem_auto]">
              <span className="font-display text-[0.8125rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text">{d.no}</span>
              <span
                ref={(n) => {
                  spans.current[i] = n;
                }}
                className="font-display justify-self-start font-extrabold uppercase leading-[1.16] text-snow transition-colors duration-500 hover:text-brand text-[clamp(1.05rem,2.55vw,2.25rem)] lg:whitespace-nowrap"
              >
                {d.title}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* What the scope will actually say. */}
      <p className="mt-10 max-w-2xl border-t border-line pt-6 leading-relaxed text-ash">{scope}</p>
    </div>
  );
}
