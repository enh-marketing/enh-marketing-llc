"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Chars, Rise } from "@/components/fx/Reveal";
import { useEnhanced } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

type Benchmark = { area: string; benchmark: string; figure: string; meaning: string };

/** The benchmark readout: one entry at a time, rewritten in place as you scroll.
 *
 *  WHY THIS SHAPE. The source is a three-column table, and the section
 *  immediately after this one is the comparison table. Rendering it as supplied
 *  would put two tables back to back and read as one long spreadsheet. Checked
 *  against everything else on the page as well: cards (why-enh), a horizontal
 *  scroller (channels), a sticky rail with a scrolling list (process), a figure
 *  band (results), an accordion (faq), a drag gallery (work). So this had to be
 *  none of those.
 *
 *  WHY NOT A CHART. Every temptation here is to plot the numbers, but they
 *  carry three different units — percentages, multiples, and a ratio — with no
 *  shared baseline. Any bar or arc would encode a magnitude relationship the
 *  source does not support, which is inventing data with geometry. Keeping the
 *  figures as type is both the honest answer and the type-led one.
 *
 *  THE MECHANIC. Nothing scrolls past. The composition holds still and the
 *  *content* changes: the area, the benchmark and the commercial reading are
 *  replaced line by line behind a mask while a ghosted index counts up. That is
 *  a different motion grammar from the process timeline, where a fixed panel
 *  watches cards scroll by.
 *
 *  WHY HERE. Six entries that end on "can this absorb more spend without losing
 *  efficiency" is exactly the question the comparison section then answers, so
 *  the reader arrives at it already asking it.
 *
 *  Held on ink-3 — a step above the void/ink the page bands with and above the
 *  ink-2 two other sections use — so it reads as its own chapter without
 *  introducing a colour that is not already in the system.
 *
 *  Below the large breakpoint, and under reduced motion, none of this runs: all
 *  six entries render as a plain readable list. That is also what the server
 *  renders. Every entry is in the DOM either way, so crawlers and screen
 *  readers get the complete set, never just the visible one. */
export function BenchmarkReadout({
  id,
  label,
  columns,
  intro,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  columns: { area: string; benchmark: string; meaning: string };
  intro: { heading: [string, string]; lede: string; footnote: string };
  items: Benchmark[];
}) {
  const enhanced = useEnhanced();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pushed = useRef(0);

  const count = items.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!enhanced || !el) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate(self) {
          // Bias slightly into each entry so the first and last get a full
          // dwell rather than flicking at the very edges of the run.
          const i = Math.min(count - 1, Math.max(0, Math.floor(self.progress * count * 0.999)));
          if (i !== pushed.current) {
            pushed.current = i;
            setActive(i);
          }
        },
      });
      return () => trigger.kill();
    }, el);

    return () => ctx.revert();
  }, [enhanced, count]);

  /** Splits the sentence so the figure can take display scale in place. */
  const withFigure = (item: Benchmark) => {
    const at = item.benchmark.indexOf(item.figure);
    if (at < 0) return { before: item.benchmark, figure: "", after: "" };
    return {
      before: item.benchmark.slice(0, at),
      figure: item.figure,
      after: item.benchmark.slice(at + item.figure.length),
    };
  };

  return (
    <section
      id={id}
      data-section={label}
      className="relative overflow-x-clip"
    >
      {/* Chapter identity: a fine grid that fades out, so the surface reads as a
          different room without a new colour. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 30% 30%, black, transparent 78%)",
        }}
      />

      <Container className="relative pt-20 sm:pt-24">
        <h2 className="font-display display-xl font-extrabold uppercase text-snow">
          <span className="block">
            <Chars text={intro.heading[0]} />
          </span>{" "}
          <span className="block text-brand">
            <Chars text={intro.heading[1]} delay={0.12} />
          </span>
        </h2>
        <Rise delay={0.18}>
          <p className="mt-6  leading-relaxed text-fog sm:text-lg">{intro.lede}</p>
        </Rise>
      </Container>

      {enhanced ? (
        // Scrubbed: the section is tall, the stage inside it holds still.
        // position: sticky, not a GSAP pin — no DOM surgery, so the section
        // stays a direct child of <main> and the page banding is untouched.
        <div ref={sectionRef} style={{ height: `${count * 58}vh` }} className="relative">
          <div className="sticky top-0 flex h-svh items-center">
            <Container className="relative w-full">
              {/* Ghosted index, the only thing that counts. */}
              <span
                aria-hidden
                className="font-display text-stroke pointer-events-none absolute -top-4 right-0 select-none text-[clamp(6rem,18vw,16rem)] font-extrabold leading-none"
              >
                {String(active + 1).padStart(2, "0")}
              </span>

              <div className="relative grid gap-y-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-x-16">
                <div>
                  <p className="text-xs font-semibold uppercase text-fog">
                    {columns.area}
                  </p>
                  <div className="mt-5 overflow-hidden">
                    <p
                      key={`a-${active}`}
                      className="font-display animate-readout text-[clamp(1.6rem,3.4vw,2.9rem)] font-extrabold uppercase leading-[1.05] text-snow"
                    >
                      {items[active].area}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-fog">
                    {columns.benchmark}
                  </p>
                  <div className="mt-5 overflow-hidden">
                    <p
                      key={`b-${active}`}
                      className="animate-readout text-[clamp(1.15rem,1.9vw,1.6rem)] leading-[1.35] text-snow"
                    >
                      {(() => {
                        const { before, figure, after } = withFigure(items[active]);
                        return (
                          <>
                            {before}
                            <span className="font-display text-[1.35em] font-extrabold text-brand">
                              {figure}
                            </span>
                            {after}
                          </>
                        );
                      })()}
                    </p>
                  </div>

                  <div className="mt-9 border-t border-line pt-6">
                    <p className="text-xs font-semibold uppercase text-fog">
                      {columns.meaning}
                    </p>
                    <div className="mt-4 overflow-hidden">
                      <p
                        key={`m-${active}`}
                        className="animate-readout max-w-xl leading-relaxed text-fog"
                      >
                        {items[active].meaning}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress: one tick per entry, filling as the run advances. */}
              <ol aria-hidden className="mt-14 flex gap-2">
                {items.map((item, i) => (
                  <li key={item.area} className="flex-1">
                    <span
                      className={cn(
                        "block h-[3px] rounded-full transition-colors duration-500",
                        i <= active ? "bg-brand" : "bg-line",
                      )}
                    />
                  </li>
                ))}
              </ol>

              {/* Every entry stays in the DOM. Not aria-hidden: a screen reader
                  should be able to read the whole set in order, not just the
                  one the scroll happens to be showing. */}
              <div className="sr-only">
                <dl>
                  {items.map((item) => (
                    <div key={item.area}>
                      <dt>{item.area}</dt>
                      <dd>
                        {item.benchmark}. {item.meaning}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Container>
          </div>
        </div>
      ) : (
        // Plain readable list: mobile, reduced motion, no JS, and the server.
        <Container className="mt-14">
          <dl className="border-t border-line">
            {items.map((item) => {
              const { before, figure, after } = withFigure(item);
              return (
                <div
                  key={item.area}
                  className="grid gap-x-10 gap-y-3 border-b border-line py-7 sm:grid-cols-[minmax(0,14rem)_1fr]"
                >
                  <dt className="font-display text-lg font-extrabold uppercase leading-tight text-snow">
                    {item.area}
                  </dt>
                  <dd>
                    <p className="text-snow">
                      {before}
                      <span className="font-display font-extrabold text-brand">{figure}</span>
                      {after}
                    </p>
                    <p className="mt-2 leading-relaxed text-fog">{item.meaning}</p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </Container>
      )}

      <Container className="relative pb-20 sm:pb-24">
        <p className={cn("max-w-3xl text-sm italic leading-relaxed text-fog", enhanced ? "" : "mt-10")}>
          {intro.footnote}
        </p>
      </Container>
    </section>
  );
}
