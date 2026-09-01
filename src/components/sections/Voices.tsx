"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

/** Giant marquee divider + auto-rotating testimonial spotlight. */
export function Voices() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5200);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[active];

  return (
    <section className="relative overflow-hidden border-y border-line py-16 sm:py-20">
      {/* Giant marquee */}
      <div className="pointer-events-none absolute inset-x-0 top-10 select-none opacity-[0.07]">
        <div className="animate-marquee flex w-max items-center gap-12">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            Array.from({ length: 3 }).map((_, i) => (
              <span key={`${k}-${i}`} className="font-display whitespace-nowrap text-[8rem] font-extrabold uppercase leading-none text-snow">
                Explore New Heights ✦
              </span>
            )),
          )}
        </div>
      </div>

      <Container className="relative text-center">
        <p className="mb-10 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
          <span className="text-brand">(07)</span> The voices — don&apos;t take our word
        </p>

        {/* Animated quote emblem */}
        <div className="mb-8 flex justify-center" aria-hidden>
          <div className="relative flex h-20 w-20 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border border-brand/50"
              animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border border-brand/30"
              animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 1.3 }}
            />
            <motion.svg
              width="44"
              height="36"
              viewBox="0 0 40 32"
              fill="none"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M0 32V18.4C0 8.8 5.2 2 14.4 0l2 4.8c-4.8 1.6-7.6 5.2-8 10h7.2V32H0Zm22.4 0V18.4C22.4 8.8 27.6 2 36.8 0l2 4.8c-4.8 1.6-7.6 5.2-8 10H38V32H22.4Z"
                fill="var(--color-brand)"
              />
            </motion.svg>
          </div>
        </div>

        <div className="min-h-[14rem] sm:min-h-[12rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-3xl"
            >
              <blockquote className="font-display text-[clamp(1.2rem,2.2vw,1.85rem)] font-bold leading-snug tracking-tight text-snow">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
                <span className="h-px w-10 bg-brand" />
                <span className="font-semibold text-snow">{t.name}</span>
                <span className="text-fog">— {t.org}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                // The bar stays 6px; py-2.5 lifts the pointer target to 26px
                // tall without changing what is drawn. background-clip keeps the
                // padding transparent so the bar does not visually grow.
                "h-1.5 box-content rounded-full bg-clip-content px-0.5 py-2.5 transition-all duration-400",
                i === active ? "w-10 bg-brand" : "w-5 bg-line hover:bg-fog",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
