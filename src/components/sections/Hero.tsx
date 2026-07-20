"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SaturnCanvas } from "@/components/fx/SaturnCanvas";
import { heroWords, heroSub } from "@/lib/content";

export function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden">
      {/* Aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute left-[8%] top-[12%] h-[44vw] w-[44vw] rounded-full bg-brand/25 blur-[140px]" />
        <div className="aurora-b absolute right-[-6%] bottom-[5%] h-[36vw] w-[36vw] rounded-full bg-brand-deep/30 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(circle at 50% 40%, black, transparent 75%)",
          }}
        />
      </div>

      {/* Saturn planet — centered in the right half, fully visible, fades with the hero.
          Viewport-relative width keeps it consistently framed (with ring margin)
          across screen sizes rather than clipping past the right edge. */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute top-1/2 z-[1] left-[40%] h-[44vh] w-[58vw] -translate-y-1/2 opacity-60 sm:left-[46%] sm:h-[54vh] sm:w-[50vw] sm:opacity-90 lg:left-[48%] lg:h-[64vh] lg:w-[44vw] lg:opacity-100"
      >
        {/* Ambient red → purple glow behind the planet */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(48% 50% at 50% 46%, rgba(216,48,58,0.4), transparent 60%), radial-gradient(58% 60% at 64% 60%, rgba(126,42,138,0.45), transparent 66%)",
            filter: "blur(8px)",
          }}
        />
        <SaturnCanvas className="h-full w-full" />
      </motion.div>

      <motion.div style={{ y: yTitle, opacity: fade }} className="relative z-10">
        <Container>
        <Rise delay={0.1} className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Digital Growth Studio — Dubai, est. 15 years ago
        </Rise>

        {started && (
          <h1 className="font-display mega font-extrabold uppercase">
            <span className="block">
              <Chars text={heroWords[0]} immediate delay={0.05} />
            </span>
            <span className="block text-stroke">
              <Chars text={heroWords[1]} immediate delay={0.25} />
            </span>
            <span className="block text-brand">
              <Chars text={heroWords[2]} immediate delay={0.4} />
            </span>
          </h1>
        )}

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Rise delay={0.8} className="max-w-md text-base leading-relaxed text-fog sm:text-lg">
            {heroSub}
          </Rise>
          <Rise delay={0.95}>
            <a
              href="#story"
              data-cursor="link"
              className="group inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-snow"
            >
              Scroll to explore
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-brand group-hover:bg-brand">
                <motion.svg
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path d="M8 1v13M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </span>
            </a>
          </Rise>
        </div>
        </Container>
      </motion.div>

      {/* Bottom ticker line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ delay: 1.2 }}
        className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-line/60 py-3"
      >
        <div className="animate-marquee marquee-slow flex w-max items-center gap-10 text-xs uppercase tracking-[0.3em] text-ash">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Search", "Brand", "Film", "Performance", "Web", "AI", "Growth"].map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10">
                {w} <span className="text-brand">✦</span>
              </span>
            )),
          )}
        </div>
      </motion.div>
    </section>
  );
}
