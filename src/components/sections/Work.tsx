"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useMotionValue, animate } from "motion/react";
import { work, workImages } from "@/lib/content";
import Image from "next/image";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { RouteLine } from "@/components/fx/Adornments";

const CARD_GAP = 20;

/** Drag carousel of all 22 live case studies — 3–4 visible, drag or arrows for the rest. */
/** Reused on service pages, so the section index and DevTools label are
 *  parameterised. Defaults are the homepage's own values. */
export function Work({
  index = "03",
  label = "Summits Reached",
}: {
  index?: string;
  label?: string;
} = {}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [progress, setProgress] = useState(0);

  const maxDrag = () => {
    const vp = viewportRef.current?.clientWidth ?? 0;
    const tw = trackRef.current?.scrollWidth ?? 0;
    return Math.min(0, vp - tw);
  };

  useMotionValueEvent(x, "change", (v) => {
    const m = maxDrag();
    setProgress(m === 0 ? 0 : Math.min(1, Math.max(0, v / m)));
  });

  const step = (dir: 1 | -1) => {
    const card = trackRef.current?.querySelector("article");
    const w = (card?.clientWidth ?? 320) + CARD_GAP;
    const target = Math.max(maxDrag(), Math.min(0, x.get() - dir * w * 2));
    animate(x, target, { type: "spring", stiffness: 120, damping: 22 });
  };

  return (
    <section id="work" data-section={label} className="relative overflow-hidden py-24 sm:py-32">
      <Container className="mb-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
              <span className="text-brand">({index})</span> The proof — {work.length} client stories
            </p>
            <h2 className="font-display display-xl font-extrabold uppercase text-snow">
              <Chars text="Summits reached." />
            </h2>
          </div>
          <Rise className="flex items-center gap-3">
            <ArrowBtn dir={-1} onClick={() => step(-1)} label="Previous case studies" />
            <ArrowBtn dir={1} onClick={() => step(1)} label="Next case studies" />
          </Rise>
        </div>
        <RouteLine className="mt-8" />
      </Container>

      <Container>
        <div ref={viewportRef} className="overflow-visible">
          <motion.div
            ref={trackRef}
            drag="x"
            style={{ x }}
            dragConstraints={viewportRef}
            dragElastic={0.06}
            data-cursor="drag"
            className="flex w-max cursor-grab items-stretch gap-5 active:cursor-grabbing"
          >
            {work.map((w, i) => (
              <article
                key={w.client}
                className="group relative flex w-[280px] shrink-0 flex-col overflow-hidden rounded-3xl border border-line bg-ink-2 transition-colors duration-500 hover:border-brand/60 sm:w-[300px]"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  {workImages[w.client] ? (
                    <Image
                      src={workImages[w.client]}
                      alt={w.client}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-ink-3" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/40 to-transparent" />
                  <span className="font-display absolute right-4 top-4 rounded-full bg-void/60 px-2.5 py-1 text-[10px] font-bold tracking-wider text-ash backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-4">
                  <h3 className="font-display text-lg font-bold text-snow">{w.client}</h3>
                  <p className="mt-2 min-h-[3.75rem] text-[13px] leading-snug text-fog">{w.title}</p>

                  <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-line pt-5">
                    {w.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="font-display text-2xl font-extrabold leading-none text-brand">
                          {m.value}
                        </div>
                        <div className="mt-1 text-[10.5px] leading-snug text-fog">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* End card */}
            <a
              href="#contact"
              data-cursor="link"
              className="group flex w-[280px] shrink-0 flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-line p-6 text-center transition-colors duration-500 hover:border-brand sm:w-[300px]"
            >
              <span className="font-display text-2xl font-extrabold uppercase leading-tight text-stroke transition-all duration-500 group-hover:text-brand group-hover:[-webkit-text-stroke:0px]">
                Your story
                <br />
                next?
              </span>
              <span className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
                Start the climb
              </span>
            </a>
          </motion.div>
        </div>

        {/* Progress rail */}
        <div className="mt-10 flex items-center gap-5">
          <div className="h-px flex-1 bg-line">
            <div
              className="h-px origin-left bg-brand transition-transform duration-200"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-ash">Drag to explore</span>
        </div>
      </Container>
    </section>
  );
}

function ArrowBtn({
  dir,
  onClick,
  label,
}: {
  dir: 1 | -1;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-snow transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ transform: dir === -1 ? "rotate(180deg)" : undefined }}
      >
        <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
