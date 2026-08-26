"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Chars, Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { RippleEmblem } from "@/components/fx/Adornments";

type Faq = { q: string; a: string };

/** Mirrors src/components/sections/FAQ.tsx exactly: same section chrome, grid
 *  ratio, emblem, numerals, question scale, plus/cross icon and disclosure
 *  animation. Only the copy differs, and it comes from the page's own content.
 *  Emits FAQPage JSON-LD from the same array it renders. */
export function FaqList({
  label,
  index,
  title,
  brandTitle,
  lede,
  faqs,
}: {
  /** DevTools handle: names the section in data-section. */
  label: string;
  index?: string;
  title: string;
  /** Second line, set in brand red to match the homepage heading. */
  brandTitle?: string;
  lede?: string;
  faqs: Faq[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" data-section={label} className="relative border-t border-line py-24 sm:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
              {index && <span className="text-brand">({index})</span>} FAQ
            </p>
            <RippleEmblem className="mb-8">
              <span className="font-display text-4xl font-extrabold text-brand">?</span>
            </RippleEmblem>
            <h2 className="font-display display-xl font-extrabold uppercase text-snow">
              <span className="block">
                <Chars text={title} />
              </span>
              {brandTitle && (
                <span className="block text-brand">
                  <Chars text={brandTitle} delay={0.15} />
                </span>
              )}
            </h2>
            {lede && (
              <Rise delay={0.25} className="mt-6">
                <p className="max-w-sm leading-relaxed text-fog">{lede}</p>
              </Rise>
            )}
          </div>

          <div className="border-t border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-5 py-6 text-left"
                  >
                    <span className="font-display mt-1 text-sm font-bold text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display flex-1 text-lg font-bold leading-snug text-snow sm:text-xl">
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "relative mt-1.5 h-4 w-4 shrink-0 transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                      aria-hidden
                    >
                      <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-snow" />
                      <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-snow" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pl-10 leading-relaxed text-fog">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
