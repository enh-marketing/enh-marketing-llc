"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type LadderStep = { no: string; title: string; body: string };

/** Five steps that end where they began.
 *
 *  WHY A LADDER WITH A RETURN. The document's fifth step is "We repeat the
 *  agreed searches", which is what the first step ran. So the process is not a
 *  line with an end but a run that comes back to its own start, and that is the
 *  one structural fact a plain numbered list would lose. The steps descend a
 *  spine on the left; from the foot of the last one a path curves back up to
 *  the head of the first, labelled with the fifth step's own words.
 *
 *  NOT THE OTHER RUNS. AI Automation and Campaign Intelligence draw their
 *  processes as pinned horizontal tracks with a threshold; the Content Creation
 *  page draws a loop of services as a ring. This is a vertical descent with one
 *  return, which is what these five steps are.
 *
 *  MEASURED, NOT GUESSED. Step rows are ordinary flow layout with variable
 *  height, so the spine and the return path are plotted from the rungs' real
 *  positions on every refresh. With no script the rows still read in order;
 *  the drawing is desktop-only and decorative. A packet runs the whole circuit
 *  on a loop: down the spine, round the return, and down again. */
export function ReturnLadder({
  items,
  returnLabel,
}: {
  items: LadderStep[];
  returnLabel: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const rungs = useRef<(HTMLSpanElement | null)[]>([]);
  const spine = useRef<SVGPathElement>(null);
  const flow = useRef<SVGPathElement>(null);
  const tag = useRef<SVGTextElement>(null);
  /** Which rung the reader has reached. Drives the rung marker only; every
   *  card stays fully readable whatever this is. */
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = root.current;
    const frame = svg.current;
    if (!el || !frame) return;
    const mm = gsap.matchMedia();

    // The geometry is plotted whenever the drawing is on screen, motion or not.
    // Gating it on no-preference left the spine, the return and the label
    // unplotted under prefers-reduced-motion: the label then rendered at the
    // SVG origin, unrotated, out in the page gutter.
    mm.add({ plot: "(min-width: 1024px)" }, (ctx) => {
      if (!ctx.conditions?.plot) return;
      const pts = rungs.current.filter(Boolean) as HTMLSpanElement[];
      const line = spine.current;
      const run = flow.current;
      const label = tag.current;
      if (pts.length < 2 || !line || !run || !label) return;

      const build = () => {
        const r = el.getBoundingClientRect();
        frame.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
        const c = pts.map((p) => {
          const b = p.getBoundingClientRect();
          return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2 };
        });
        const head = c[0];
        const foot = c[c.length - 1];
        // How far the return swings out to the left of the spine. It has to
        // clear the rung circles (44px wide, centred on the spine) AND leave
        // room for the label beside it, so it is derived from the rung rather
        // than guessed: half a rung, plus the label's own height, plus air.
        const out = head.x >= 44 ? 44 : 40;
        const d =
          `M ${head.x} ${head.y} V ${foot.y}` +
          ` C ${head.x} ${foot.y + 40}, ${head.x - out} ${foot.y + 40}, ${head.x - out} ${foot.y}` +
          ` V ${head.y}` +
          ` C ${head.x - out} ${head.y - 40}, ${head.x} ${head.y - 40}, ${head.x} ${head.y}`;
        line.setAttribute("d", d);
        run.setAttribute("d", d);
        // The return's label, upright, beside the outer leg.
        //
        // OUTSIDE the leg, not inside it. Inside left only `out - 22` pixels
        // between the leg and the rung circles, so an 11px label centred there
        // ran straight across rungs 1 to 4. Outside, the leg itself separates
        // the label from the numbers and the clearance is explicit.
        const midY = (head.y + foot.y) / 2;
        const lx = Math.max(7, head.x - out - 11);
        label.setAttribute("x", `${lx}`);
        label.setAttribute("y", `${midY}`);
        label.setAttribute("transform", `rotate(-90 ${lx} ${midY})`);
      };
      build();
      const st = ScrollTrigger.create({ trigger: el, start: "top bottom", onRefresh: build });
      const ro = new ResizeObserver(build);
      ro.observe(el);
      return () => {
        st.kill();
        ro.disconnect();
      };
    });

    // The reveal, which is motion and therefore gated.
    mm.add({ motion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const cards = gsap.utils.selector(el)("[data-step]");
      gsap.set(cards, { opacity: 0.55, x: 14 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 74%",
          end: "bottom 76%",
          scrub: 0.7,
          onUpdate: (self) => {
            const i = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
            setActive((prev) => (prev === i ? prev : i));
          },
        },
      });
      tl.to(cards, { opacity: 1, x: 0, duration: 0.22, stagger: 0.12, ease: "power2.out" }, 0);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(cards, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={root} className="relative lg:pl-48">
      {/* The spine and its return, plotted from the rungs. */}
      <svg
        ref={svg}
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
        preserveAspectRatio="none"
      >
        <path ref={spine} fill="none" stroke="var(--color-line)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        <path
          ref={flow}
          fill="none"
          pathLength="100"
          stroke="var(--color-brand)"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="ci-flow"
          style={{ animationDuration: "5.2s" }}
        />
        <text
          ref={tag}
          textAnchor="middle"
          className="font-display"
          fill="var(--color-brand-text)"
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.8"
        >
          {returnLabel.toUpperCase()}
        </text>
      </svg>

      <ol className="relative space-y-4">
        {items.map((s, i) => (
          <li key={s.no} data-step className="group relative">
            {/* The rung: the number, on the spine. */}
            <span
              ref={(n) => {
                rungs.current[i] = n;
              }}
              aria-hidden
              className={cn(
                "font-display absolute -left-36 top-7 hidden h-11 w-11 items-center justify-center rounded-full border bg-ink-2 text-base font-extrabold tabular-nums transition-all duration-500 group-hover:scale-110 group-hover:border-brand group-hover:text-brand-text motion-reduce:transition-none motion-reduce:group-hover:scale-100 lg:flex",
                i <= active ? "scale-110 border-brand text-brand-text" : "border-line text-ash",
              )}
            >
              {s.no}
            </span>
            <div
              className={cn(
                "group grid gap-x-10 gap-y-3 rounded-[1.5rem] border border-line bg-ink-3 p-7 transition-colors duration-500 hover:border-ash/50 motion-reduce:transition-none sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:items-baseline",
              )}
            >
              <div className="flex items-baseline gap-4">
                <span aria-hidden className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-none tabular-nums text-stroke lg:hidden">
                  {s.no}
                </span>
                <h3 className="font-display text-[clamp(1.1rem,1.9vw,1.5rem)] font-extrabold uppercase leading-[1.14] text-snow">
                  {s.title}
                </h3>
              </div>
              <p className="leading-relaxed text-fog sm:text-lg">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
