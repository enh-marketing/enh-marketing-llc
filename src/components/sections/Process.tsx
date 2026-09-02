"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { process } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { PulseDot } from "@/components/fx/Adornments";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative py-16 sm:py-20">
      <Container>
      <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
        <span className="text-brand">(06)</span> The route
      </p>
      <h2 className="font-display display-xl mb-20 font-extrabold uppercase text-snow">
        <span className="block"><Chars text="How the" /></span>
        <span className="block text-stroke"><Chars text="climb works." delay={0.15} /></span>
      </h2>

      <div ref={ref} className="relative">
        {/* Drawing line */}
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-[7px] top-0 hidden h-full w-px origin-top bg-brand sm:block"
        />
        <ol className="space-y-16 sm:space-y-20">
          {process.map((step, i) => (
            <li key={step.no} className="relative grid gap-5 sm:grid-cols-[40px_180px_1fr] sm:gap-10">
              <PulseDot className="hidden sm:flex" />
              <Rise delay={i * 0.05}>
                <span className="font-display text-5xl font-extrabold text-stroke sm:text-6xl">{step.no}</span>
              </Rise>
              <Rise delay={i * 0.05 + 0.1}>
                <h3 className="font-display text-2xl font-bold text-snow sm:text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-fog">{step.body}</p>
              </Rise>
            </li>
          ))}
        </ol>
      </div>
      </Container>
    </section>
  );
}
