"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ai } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { NodeWeb } from "@/components/fx/Adornments";

export function AISection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [90, -90]);

  return (
    <section id="ai" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.div style={{ y }} className="pointer-events-none absolute -right-1/4 top-0 h-[70vh] w-[70vw]">
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(circle at center, rgba(232,0,13,0.22), transparent 62%)" }}
        />
      </motion.div>

      <Container className="relative">
        <NodeWeb className="absolute -top-6 right-0 hidden opacity-80 lg:block" />
        <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
          <span className="text-brand">(05)</span> Explore New Heights
        </p>

        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <h2 className="font-display display-xl font-extrabold uppercase text-snow">
              <span className="block"><Chars text="Step into the" /></span>
              <span className="block text-brand"><Chars text="AI digital world." delay={0.15} /></span>
            </h2>
            <Rise delay={0.25} className="mt-6">
              <p className="font-display text-xl font-semibold text-fog">{ai.sub}</p>
            </Rise>
            <div className="mt-7 space-y-5">
              {ai.paragraphs.map((p, i) => (
                <Rise key={i} delay={0.1 + i * 0.1}>
                  <p className="max-w-xl leading-relaxed text-fog">{p}</p>
                </Rise>
              ))}
            </div>
            <Rise delay={0.35} className="mt-9">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
              >
                {ai.cta}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Rise>
          </div>

          <div className="grid gap-px self-center overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {ai.capabilities.map((c, i) => (
              <div key={c.title} className="group bg-ink-2 p-7 transition-colors duration-500 hover:bg-ink-3">
                <span className="font-display text-2xl font-extrabold text-brand">0{i + 1}</span>
                <h3 className="font-display mt-5 text-lg font-bold text-snow">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
