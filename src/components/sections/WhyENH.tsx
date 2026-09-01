"use client";

import { whyENH } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { OrbitMark } from "@/components/fx/Adornments";

export function WhyENH() {
  return (
    <section id="why" className="relative py-16 sm:py-20">
      <Container>
      <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
        <span className="text-brand">(04)</span> {whyENH.heading}
      </p>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <h2 className="font-display display-xl font-extrabold uppercase text-snow">
            <span className="block"><Chars text="Fifteen years" /></span>
            <span className="block text-stroke"><Chars text="of receipts." delay={0.15} /></span>
          </h2>
          <div className="mt-8 space-y-5">
            {whyENH.about.map((p, i) => (
              <Rise key={i} delay={i * 0.1}>
                <p className="max-w-xl leading-relaxed text-fog">{p}</p>
              </Rise>
            ))}
          </div>
        </div>

        <div className="grid gap-px self-start overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {whyENH.pillars.map((p) => (
            <div key={p.no} className="group bg-ink-2 p-7 transition-colors duration-500 hover:bg-ink-3">
              <span className="font-display text-2xl font-extrabold text-stroke transition-colors duration-500 group-hover:text-brand group-hover:[-webkit-text-stroke:0px]">
                {p.no}
              </span>
              <h3 className="font-display mt-5 text-lg font-bold text-snow">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Google Partner band */}
      <Rise className="mt-14">
        <div className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-ink-2 p-8 sm:flex-row sm:items-center sm:gap-10 sm:p-10">
          <div className="flex shrink-0 items-center gap-4">
            <span className="relative flex h-14 w-14 items-center justify-center">
              <OrbitMark size={72} className="absolute -inset-[8px]" />
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand">
                <span className="font-display text-2xl font-extrabold text-white">G</span>
              </span>
            </span>
            <span className="font-display text-lg font-bold leading-tight text-snow">
              {whyENH.googlePartner.heading}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-fog">{whyENH.googlePartner.body}</p>
        </div>
      </Rise>
      </Container>
    </section>
  );
}
