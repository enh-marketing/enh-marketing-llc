"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";

gsap.registerPlugin(ScrollTrigger);

/** Scope, drawn as the scale the document describes.
 *
 *  The section contrasts two ends by name: "A small marketing dashboard may
 *  connect advertising platforms, Google Analytics and a CRM. A larger
 *  reporting system may include ecommerce, finance, sales, call tracking and
 *  several user views." That is a scale with a small end and a large end, and
 *  the parts at each end are the document's own lists. A marker travels the
 *  scale on a loop, because where a given business lands on it is exactly what
 *  the diagnostic decides. Beneath, the eight things it decides, as a compact
 *  grid, and how the proposal is split. */
export function ScopeScale({
  lead,
  example,
  small,
  large,
  diagnosticLead,
  items,
  proposal,
}: {
  lead: string;
  example: string;
  small: { label: string; parts: string[] };
  large: { label: string; parts: string[] };
  diagnosticLead: string;
  items: string[];
  proposal: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const marker = el.querySelector("[data-marker]");
      const fill = el.querySelector("[data-fill]");
      const track = el.querySelector("[data-track]");
      if (!marker || !fill || !track) return;
      // The reader places the marker. The CSS loop is the resting behaviour,
      // so it is switched off only while the scrub owns the element.
      marker.classList.remove("ci-slide");
      gsap.set(marker, { left: 0, xPercent: -50 });
      gsap.set(fill, { scaleX: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: track, start: "top 88%", end: "top 34%", scrub: 0.6 },
      });
      tl.to(marker, { left: "100%", duration: 1, ease: "none" }, 0).to(fill, { scaleX: 1, duration: 1, ease: "none" }, 0);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([marker, fill], { clearProps: "all" });
        marker.classList.add("ci-slide");
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root}>
      <Rise>
        <p className="font-display max-w-3xl text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.18] text-snow">
          {lead}
        </p>
      </Rise>
      <Rise delay={0.05} className="mt-6">
        <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">{example}</p>
      </Rise>

      {/* The scale. */}
      <Rise delay={0.1} className="mt-10">
        <div className="relative rounded-[1.5rem] border border-line bg-ink-2 p-7 sm:p-9">
          <div className="grid gap-8 sm:grid-cols-2">
            {[small, large].map((end, i) => (
              <div key={end.label} className={i === 1 ? "sm:text-right" : undefined}>
                <p className="font-display text-[0.6875rem] font-semibold uppercase text-brand-text">{end.label}</p>
                <ul className={`mt-3 flex flex-wrap gap-2 ${i === 1 ? "sm:justify-end" : ""}`}>
                  {end.parts.map((p) => (
                    <li key={p} className="rounded-full border border-line bg-ink-3 px-3 py-1 text-sm text-snow transition-colors duration-500 hover:border-ash motion-reduce:transition-none">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* The track. Where a business lands on it is what the diagnostic
              decides, so the reader's own scroll places the marker: it walks
              from the small end to the large one as the section is read. The
              CSS loop stays as the fallback when the scrub cannot run. */}
          <div aria-hidden data-track className="relative mt-8 h-px w-full bg-line">
            <span data-fill className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-brand" />
            <span className="absolute left-0 top-1/2 h-3 w-px -translate-y-1/2 bg-brand" />
            <span className="absolute right-0 top-1/2 h-3 w-px -translate-y-1/2 bg-brand" />
            <span data-marker className="ci-slide absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-brand bg-ink-2" />
          </div>
        </div>
      </Rise>

      {/* What the diagnostic settles. */}
      <Rise delay={0.15} className="mt-12">
        <p className="font-display flex items-center gap-3 text-[0.6875rem] font-semibold uppercase text-brand-text">
          <span aria-hidden className="h-px w-8 bg-brand" />
          {diagnosticLead}
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <li key={it} className="group rounded-xl border border-line bg-ink-3 px-5 py-4 transition-colors duration-500 hover:border-brand/50">
              <p className="font-display text-[0.6875rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-[0.95rem] leading-snug text-fog transition-colors duration-500 group-hover:text-snow">{it}</p>
            </li>
          ))}
        </ol>
      </Rise>

      <Rise delay={0.2} className="mt-8">
        <p className="max-w-3xl border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">{proposal}</p>
      </Rise>
    </div>
  );
}
