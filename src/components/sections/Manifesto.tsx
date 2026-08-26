"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/lib/content";
import { Counter } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { Sparkline } from "@/components/fx/Adornments";
import { BoltCanvas, type BoltHandle } from "@/components/fx/BoltCanvas";

gsap.registerPlugin(ScrollTrigger);

/** Each statement reveals word-by-word; accent words glow brand-red. */
const STATEMENTS: { text: string; accent: string[] }[] = [
  {
    text: "Your brand has a height it hasn't reached — a market it hasn't moved, a story it hasn't told loudly enough.",
    accent: [],
  },
  {
    text: "For fifteen years, ENH has turned ambition into market share for the UAE's boldest brands.",
    accent: ["ENH"],
  },
  {
    text: "Ready to climb to New Heights?",
    accent: ["New", "Heights?"],
  },
];

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

/**
 * "The Story" — Ignite-style 3D scrub intro.
 *
 * A pinned stage holds a glossy 3D lightning bolt (Three.js) that spins on its
 * axis as you scroll. Over the top, three statements fade in one after another,
 * each illuminating word-by-word from dim to bright. One scrubbed ScrollTrigger
 * drives the bolt's rotation and all the text — buttery, in lockstep with Lenis.
 */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const runway = useRef<HTMLDivElement>(null);
  const boltRef = useRef<BoltHandle>(null);

  useEffect(() => {
    const el = root.current;
    const track = runway.current;
    if (!el || !track) return;

    const lines = gsap.utils.toArray<HTMLElement>(".story-line", el);
    const words = lines.map((l) => Array.from(l.querySelectorAll<HTMLElement>(".story-word")));
    const N = lines.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (p: number) => {
      boltRef.current?.setProgress(p);
      for (let si = 0; si < N; si++) {
        const lp = clamp((p - si / N) / (1 / N));
        const fin = clamp(lp / 0.16);
        const fout = si === N - 1 ? 1 : 1 - clamp((lp - 0.84) / 0.16);
        lines[si].style.opacity = String(Math.min(fin, fout));
        lines[si].style.transform = `translateY(${(1 - fin) * 26 + (1 - fout) * -26}px)`;
        const wl = words[si];
        for (let wi = 0; wi < wl.length; wi++) {
          const ws = 0.14 + (wi / Math.max(1, wl.length - 1)) * 0.66;
          wl[wi].style.opacity = String(0.16 + 0.84 * clamp((lp - ws) / 0.06));
        }
      }
    };

    if (reduce) {
      // Static, readable fallback: first statement lit, bolt parked.
      lines.forEach((l, i) => {
        l.style.opacity = i === 0 ? "1" : "0";
        l.style.transform = "none";
      });
      words.flat().forEach((w) => (w.style.opacity = "1"));
      boltRef.current?.setProgress(0);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => reveal(self.progress),
    });
    reveal(0);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      st.kill();
    };
  }, []);

  return (
    <section ref={root} id="story" className="relative">
      {/* Tall runway; the stage inside pins while the scene plays */}
      <div ref={runway} className="relative h-[340vh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          {/* 3D bolt + soft halo behind the words */}
          <BoltCanvas className="pointer-events-none absolute inset-0 z-0" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[42vh] w-[42vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,0,13,0.28) 0%, rgba(232,0,13,0.05) 45%, transparent 70%)",
            }}
          />

          <p className="absolute left-1/2 top-10 z-10 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
            <span className="text-brand">(01)</span> The story
          </p>

          {/* Statements stacked, revealed one at a time */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
            {STATEMENTS.map((s, si) => {
              const accent = new Set(s.accent);
              return (
                <p
                  key={si}
                  className="story-line pointer-events-none absolute mx-auto max-w-4xl text-center font-display text-[clamp(1.5rem,3.4vw,2.9rem)] font-bold leading-[1.25] tracking-tight text-snow will-change-[opacity,transform]"
                  style={{ opacity: 0 }}
                >
                  {s.text.split(" ").map((w, wi) => (
                    <span
                      key={wi}
                      className={`story-word mr-[0.28em] inline-block ${accent.has(w) ? "text-brand" : ""}`}
                      style={{ opacity: 0.16 }}
                    >
                      {w}
                    </span>
                  ))}
                </p>
              );
            })}
          </div>

          {/* Decorative pulse dot, as in the reference */}
          <span className="absolute bottom-[16%] left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_12px_rgba(232,0,13,0.9)]" />
        </div>
      </div>

      {/* Stats land the chapter */}
      <div className="border-y border-line">
        <Container className="px-0 sm:px-0">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`group px-6 py-12 sm:px-10 ${i < stats.length - 1 ? "lg:border-r lg:border-line" : ""} ${i % 2 === 0 ? "border-r border-line lg:border-r" : ""} ${i < 2 ? "border-b border-line lg:border-b-0" : ""}`}
              >
                <Sparkline className="mb-4" />
                <dt className="font-display text-[clamp(2.1rem,3.6vw,3.2rem)] font-extrabold leading-none text-snow transition-colors duration-500 group-hover:text-brand">
                  <Counter value={s.value} suffix={s.suffix} />
                </dt>
                <dd className="mt-3 text-sm text-fog">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
