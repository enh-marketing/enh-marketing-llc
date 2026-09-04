"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Chars, Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { RippleEmblem } from "@/components/fx/Adornments";

import { Crosslink } from "@/components/ui/Crosslink";

import type { Faq } from "@/content/services/performance-marketing";

/** Mirrors src/components/sections/FAQ.tsx exactly: same section chrome, grid
 *  ratio, emblem, numerals, question scale, plus/cross icon and disclosure
 *  animation. Only the copy differs, and it comes from the page's own content.
 *  Emits FAQPage JSON-LD from the same array it renders. */
/** The homepage FAQ heading, which is the one every page should carry: the
 *  question mark emblem, "Questions," over "answered." in brand, and the same
 *  standing line underneath. Performance Marketing was passing all three from
 *  its content file; the other sixteen pages passed title="FAQs" and got a
 *  bare word where the heading should be. Defaults live here so the treatment
 *  is defined once and a new page gets it without being told. */
const FAQ_TITLE = "Questions,";
const FAQ_BRAND = "answered.";
const FAQ_LEDE =
  "Everything you need to know about working with Dubai\u2019s result-driven digital marketing agency.";

export function FaqList({
  label,
  index,
  title = FAQ_TITLE,
  brandTitle = FAQ_BRAND,
  lede = FAQ_LEDE,
  faqs,
}: {
  /** DevTools handle: names the section in data-section. */
  label: string;
  index?: string;
  title?: string;
  /** Second line, set in brand red to match the homepage heading. */
  brandTitle?: string;
  lede?: string;
  faqs: Faq[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  const panelBase = "faq";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: Array.isArray(f.a) ? f.a.join(" ") : f.a },
    })),
  };

  return (
    <section id="faq" data-section={label} className="relative py-16 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
              {index && <span className="text-brand">({index})</span>} FAQ
            </p>
            <RippleEmblem className="mb-8">
              <span className="font-display text-4xl font-extrabold text-brand">?</span>
            </RippleEmblem>
            <h2 className="font-display display-xl font-extrabold uppercase text-snow">
              <span className="block">
                <Chars text={title} />
              </span>
              {/* Real space, not decoration: without it the two spans
                  concatenate in textContent and the accessible name reads
                  "Questions,answered." */}
              {brandTitle && " "}
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
                    aria-controls={`${panelBase}-${i}`}
                    id={`${panelBase}-q-${i}`}
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
                  {/* The answer stays in the DOM when collapsed, and only its
                      height animates. Mounting it on open — which is what
                      AnimatePresence was doing — kept every closed answer out
                      of the served HTML, so crawlers and the assistants that
                      read rendered text only ever saw the one open answer.
                      `inert` keeps the hidden copy out of the tab order and
                      off the accessibility tree while it is closed. */}
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
                    {/* One paragraph, or several where the source writes more
                        than one; each gets its own <p>. */}
                    {(Array.isArray(f.a) ? f.a : [f.a]).map((para, pi, all) => (
                      <p
                        key={pi}
                        className={cn(
                          "max-w-2xl pl-10 leading-relaxed text-fog",
                          pi === all.length - 1 ? "pb-7" : "pb-4",
                        )}
                      >
                        {/* Where the source names another page, the phrase links.
                            The surrounding sentence is untouched, so the answer
                            reads the same with or without the link. */}
                        {f.aLink && para.includes(f.aLink.label)
                          ? (() => {
                              const link = f.aLink!;
                              const at = para.indexOf(link.label);
                              return (
                                <>
                                  {para.slice(0, at)}
                                  <Crosslink
                                    href={link.href}
                                    className="text-snow underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand hover:decoration-brand"
                                    pendingClassName="text-snow"
                                  >
                                    {link.label}
                                  </Crosslink>
                                  {para.slice(at + link.label.length)}
                                </>
                              );
                            })()
                          : para}
                      </p>
                    ))}
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
