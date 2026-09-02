"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

/** "The line."
 *
 *  The sentence names a limit, so the section is built around one. Seven
 *  full-bleed hairlines fan across the viewport and draw in sequence as you
 *  scroll; exactly one is brand red and runs edge to edge, landing under the
 *  clause that states the limit. Hairlines are already the page's material
 *  (table marker, card rules, link underlines), so this is the same system
 *  speaking at scale rather than a new idiom.
 *
 *  Depth comes from three layers moving at different rates: rules furthest
 *  back, statement mid, commitment nearest, offset by both scroll and cursor. */

const RULES = [
  { top: "18%", width: "62%", tone: "bg-line/70" },
  { top: "27%", width: "84%", tone: "bg-line/50" },
  { top: "36%", width: "47%", tone: "bg-line/60" },
  { top: "52%", width: "100%", tone: "bg-brand", accent: true },
  { top: "66%", width: "73%", tone: "bg-line/50" },
  { top: "76%", width: "38%", tone: "bg-line/40" },
  { top: "85%", width: "56%", tone: "bg-line/30" },
];

export function Caveat({
  id,
  label,
  lead,
  emphasis,
  commitment,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  lead: string;
  emphasis: string;
  commitment: string;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;

      const q = gsap.utils.selector(el);
      const words = q("[data-word] > span");
      const rules = q("[data-rule]");

      // from() with immediateRender:false, never set() + to().
      // The text must never depend on a trigger firing to become visible: if
      // ScrollTrigger misses for any reason, the worst case is "no animation",
      // not "no content". Nothing is hidden until playback actually starts.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
        defaults: { immediateRender: false },
      });

      tl.from(rules, {
        scaleX: 0,
        duration: 1.1,
        stagger: 0.07,
        ease: "power3.out",
      }).from(
        words,
        { yPercent: 115, duration: 0.9, stagger: 0.018, ease: "power3.out" },
        0.25,
      );

      // Layers drift at different rates through the section.
      const drift = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
      drift
        .fromTo(q("[data-layer='rules']"), { yPercent: -4 }, { yPercent: 4, ease: "none" }, 0)
        .fromTo(q("[data-layer='commitment']"), { yPercent: 10 }, { yPercent: -6, ease: "none" }, 0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        drift.scrollTrigger?.kill();
        drift.kill();
        gsap.set([words, rules], { clearProps: "all" });
      };
    });

    // Cursor parallax, fine pointers only. Written through quickTo so the
    // pointer handler never touches layout.
    mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
      const statement = el.querySelector<HTMLElement>("[data-layer='statement']");
      const rules = el.querySelector<HTMLElement>("[data-layer='rules']");
      if (!statement || !rules) return;

      const sx = gsap.quickTo(statement, "x", { duration: 0.9, ease: "power3.out" });
      const sy = gsap.quickTo(statement, "y", { duration: 0.9, ease: "power3.out" });
      const rx = gsap.quickTo(rules, "x", { duration: 1.3, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        sx(px * 18);
        sy(py * 10);
        rx(px * -26);
      };

      el.addEventListener("pointermove", onMove);
      return () => {
        el.removeEventListener("pointermove", onMove);
        gsap.set([statement, rules], { clearProps: "x,y" });
      };
    });

    return () => mm.revert();
  }, []);

  const words = (text: string) =>
    text.split(" ").map((w, i) => (
      <span key={i} data-word className="inline-block overflow-hidden align-bottom">
        <span className="inline-block">{w}</span>
        {" "}
      </span>
    ));

  return (
    <section
      id={id}
      data-section={label}
      ref={root}
      className="relative isolate overflow-hidden py-32 sm:py-44 lg:py-52"
    >
      {/* Layer 1 — the rules */}
      <div data-layer="rules" className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {RULES.map((r) => (
          <span
            key={r.top}
            data-rule
            style={{ top: r.top, width: r.width }}
            className={`absolute left-0 block h-px origin-left ${r.tone} ${
              r.accent ? "shadow-[0_0_24px_rgba(232,0,13,0.45)]" : ""
            }`}
          />
        ))}
        <div className="absolute left-[52%] top-1/2 h-[38vw] w-[38vw] -translate-y-1/2 rounded-full bg-brand/[0.07] blur-[130px]" />
      </div>

      <Container>
        {/* Layer 2 — the statement */}
        <div data-layer="statement" className="max-w-4xl">
          <p className="font-display text-[clamp(1.25rem,2.9vw,2.4rem)] font-extrabold uppercase leading-[1.15] text-snow">
            {words(lead)}
          </p>
          <p className="font-display mt-3 text-[clamp(1.75rem,4vw,3.4rem)] font-extrabold uppercase leading-[1.05] text-brand">
            {words(emphasis)}
          </p>
        </div>

        {/* Layer 3 — the commitment */}
        <div
          data-layer="commitment"
          className="mt-14 flex max-w-md gap-5 sm:mt-20 lg:ml-auto lg:mr-0 lg:mt-24"
        >
          <span aria-hidden className="mt-1 w-px shrink-0 self-stretch bg-brand" />
          <p className="text-base leading-relaxed text-fog sm:text-lg">{commitment}</p>
        </div>
      </Container>
    </section>
  );
}
