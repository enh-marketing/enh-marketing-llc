"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { crafts, type Craft as CraftType } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { OrbitMark } from "@/components/fx/Adornments";

function Card({ craft, index, total }: { craft: CraftType; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // As the next card scrolls over, this one recedes.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.55]);
  const isLast = index === total - 1;

  return (
    <div ref={ref} className="sticky" style={{ top: `calc(72px + ${index * 9}px)` }}>
      <Container className="mb-6">
      <motion.article
        style={isLast ? {} : { scale }}
        className="relative w-full origin-top overflow-hidden rounded-3xl border border-line bg-ink-2"
      >
        {!isLast && (
          <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-10 bg-void" />
        )}
        <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-bold text-brand">({craft.no})</span>
              <span className="rounded-full border border-line px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-fog">
                {craft.tag}
              </span>
            </div>
            <h3 className="font-display display-lg mt-10 font-extrabold uppercase text-snow">
              {craft.title.split(" ")[0]}
              <br />
              <span className="text-stroke">{craft.title.split(" ").slice(1).join(" ")}</span>
            </h3>
            <OrbitMark className="mt-8 hidden opacity-70 lg:block" />
          </div>
          <div className="flex flex-col justify-between gap-8">
            <p className="max-w-md text-base leading-relaxed text-fog sm:text-lg">{craft.body}</p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {craft.items.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-line pb-3 text-sm text-snow">
                  <span className="h-1 w-1 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
      </Container>
    </div>
  );
}

export function Craft() {
  return (
    <section id="craft" className="relative py-16 sm:py-20">
      <Container className="mb-16">
        <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
          <span className="text-brand">(02)</span> The craft
        </p>
        <h2 className="font-display display-xl font-extrabold uppercase text-snow">
          <span className="block"><Chars text="Eight services," /></span>
          <span className="block text-stroke"><Chars text="one rope team." delay={0.15} /></span>
        </h2>
        <Rise delay={0.3} className="mt-6 max-w-lg text-fog">
          Search, social, paid, campaigns, leads, web, content and film — every
          discipline of the climb, under one roof. Each card is a stage of the ascent.
        </Rise>
      </Container>

      <div>
        {crafts.map((c, i) => (
          <Card key={c.no} craft={c} index={i} total={crafts.length} />
        ))}
      </div>
    </section>
  );
}
