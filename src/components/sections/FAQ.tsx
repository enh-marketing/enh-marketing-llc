"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { faqs } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { RippleEmblem } from "@/components/fx/Adornments";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const panelBase = "home-faq";

  return (
    <section id="faq" className="relative py-16 sm:py-20">
      <Container>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
            <span className="text-brand">(09)</span> FAQ
          </p>
          <RippleEmblem className="mb-8">
            <span className="font-display text-4xl font-extrabold text-brand">?</span>
          </RippleEmblem>
          <h2 className="font-display display-xl font-extrabold uppercase text-snow">
            <span className="block"><Chars text="Questions," /></span>
            <span className="block text-brand"><Chars text="answered." delay={0.15} /></span>
          </h2>
          <Rise delay={0.25} className="mt-6">
            <p className="max-w-sm leading-relaxed text-fog">
              Everything you need to know about working with Dubai&apos;s result-driven
              digital marketing agency.
            </p>
          </Rise>
        </div>

        <div className="border-t border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`${panelBase}-${i}`}
                  id={`${panelBase}-q-${i}`}
                  className="flex w-full items-start gap-5 py-6 text-left"
                >
                  <span className="font-display mt-1 text-sm font-bold text-brand">
                    0{i + 1}
                  </span>
                  <span className="font-display flex-1 text-lg font-bold leading-snug text-snow sm:text-xl">
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "relative mt-1.5 h-4 w-4 shrink-0 transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                  >
                    <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-snow" />
                    <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 bg-snow" />
                  </span>
                </button>
                {/* Kept mounted while collapsed, so every answer is in the
                    served HTML rather than only the open one. Mirrors
                    service/FaqList.tsx exactly. */}
                <motion.div
                  id={`${panelBase}-${i}`}
                  role="region"
                  aria-labelledby={`${panelBase}-q-${i}`}
                  inert={!isOpen}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-10 leading-relaxed text-fog">{f.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
      </Container>
    </section>
  );
}
