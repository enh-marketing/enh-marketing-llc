"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

/** The businesses, set inside the thing this service works on.
 *
 *  WHY A CATEGORY PAGE. The section is ten names and nothing else. Every
 *  typographic answer is ten rows of words, and a reader looking for their own
 *  catalogue has to read all ten to find it. Ecommerce SEO has one native
 *  object -- the category listing, with its facets down one side and its
 *  products in a grid -- and it is the exact thing every other section on this
 *  page is about: templates, navigation, product data, the route into search.
 *  So the ten sit in one, each with the product it sells drawn on it.
 *
 *  THE MARKS ARE ICONOGRAPHY, NOT CLAIMS. A hanger over fashion and a jar over
 *  food are conventional signs. Nothing here says what a store in that category
 *  sells, how large it is or how it performs, and no tile carries a price, a
 *  rating or a count.
 *
 *  THE FURNITURE IS WORDLESS ON PURPOSE. The header bar and the facet rail are
 *  drawn and carry no text at all: they are what makes the panel read as a store
 *  page, and putting invented labels in them would be writing copy the client
 *  never approved. They are hidden from assistive technology for the same
 *  reason.
 *
 *  THE CAVEAT IS NOT SORTED INTO THE GRID. It says regulated products may need
 *  extra review before content is published. Which of the ten counts as
 *  regulated is nowhere in the document, so it stays a note on the whole
 *  listing.
 *
 *  MOTION. Tiles arrive on a stagger and then hold; pointing at one lifts it.
 *  All of it is cancelled under prefers-reduced-motion. */

const EASE = [0.16, 1, 0.3, 1] as const;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** One product per category, in the document's order. */
function Product({ i }: { i: number }) {
  return (
    <g className="text-brand">
      {/* 01 Fashion and luxury retail — a garment on its hanger. */}
      {i === 0 && (
        <>
          <path d="M40 22a4 4 0 118 0c0 3-4 3-4 6" {...S} />
          <path d="M44 28l-18 9 4 7 6-3v25h16V41l6 3 4-7z" {...S} />
        </>
      )}
      {/* 02 Beauty and cosmetics — a bottle and its pump. */}
      {i === 1 && (
        <>
          <rect x="30" y="30" width="28" height="36" rx="4" {...S} />
          <path d="M38 30v-6h12v6" {...S} />
          <path d="M50 20h8v6" {...S} opacity="0.7" />
          <path d="M36 44h16" {...S} opacity="0.6" />
        </>
      )}
      {/* 03 Electronics and technology — a device. */}
      {i === 2 && (
        <>
          <rect x="30" y="16" width="30" height="52" rx="5" {...S} />
          <path d="M40 24h10" {...S} opacity="0.7" />
          <rect x="36" y="32" width="18" height="24" rx="2" {...S} opacity="0.55" />
          <path d="M66 34h8M66 44h8M66 54h8" {...S} opacity="0.45" />
        </>
      )}
      {/* 04 Health and wellness products — a jar, and what is in it. */}
      {i === 3 && (
        <>
          <rect x="28" y="28" width="34" height="38" rx="4" {...S} />
          <path d="M34 28v-6h22v6" {...S} />
          <path d="M45 56c-6 0-9-4-9-9 6 0 9 4 9 9zm0 0c6 0 9-4 9-9-6 0-9 4-9 9z" {...S} opacity="0.75" />
        </>
      )}
      {/* 05 Furniture and homeware — a chair. */}
      {i === 4 && (
        <>
          <path d="M30 20v30M60 20v30" {...S} />
          <path d="M26 50h38l-4 18M26 50l4 18" {...S} />
          <path d="M32 34h26" {...S} opacity="0.6" />
        </>
      )}
      {/* 06 Automotive parts and accessories — a wheel and a tool. */}
      {i === 5 && (
        <>
          <circle cx="40" cy="44" r="18" {...S} />
          <circle cx="40" cy="44" r="6" {...S} />
          <path d="M40 26v6M40 56v6M22 44h6M52 44h6" {...S} opacity="0.65" />
          <path d="M62 26l10 10-4 4-10-10a6 6 0 014-4z" {...S} opacity="0.7" />
        </>
      )}
      {/* 07 Food and speciality products — a tin and its seal. */}
      {i === 6 && (
        <>
          <rect x="28" y="26" width="34" height="42" rx="4" {...S} />
          <path d="M28 36h34" {...S} opacity="0.6" />
          <path d="M36 26v-4h18v4" {...S} opacity="0.7" />
          <path d="M36 48h18M36 56h12" {...S} opacity="0.5" />
        </>
      )}
      {/* 08 B2B product catalogues — a stack, and the sheet that lists it. */}
      {i === 7 && (
        <>
          <rect x="22" y="44" width="24" height="22" rx="2" {...S} />
          <rect x="22" y="26" width="24" height="16" rx="2" {...S} opacity="0.7" />
          <rect x="52" y="22" width="26" height="44" rx="3" {...S} />
          <path d="M58 32h14M58 40h14M58 48h9" {...S} opacity="0.6" />
        </>
      )}
      {/* 09 Multi-brand online retailers — several tags on one rail. */}
      {i === 8 && (
        <>
          <path d="M18 24h60" {...S} opacity="0.5" />
          <path d="M28 24v8l12 12-8 8-12-12v-8" {...S} />
          <path d="M50 24v10l12 12-8 8-12-12" {...S} opacity="0.7" />
          <path d="M70 24v14l8 8" {...S} opacity="0.45" />
        </>
      )}
      {/* 10 Online and physical stores — a front, and a parcel leaving it. */}
      {i === 9 && (
        <>
          <path d="M20 66V38h34v28" {...S} />
          <path d="M16 38h42l-6-12H22z" {...S} />
          <path d="M32 66V52h10v14" {...S} opacity="0.65" />
          <rect x="60" y="44" width="22" height="20" rx="2" {...S} />
          <path d="M60 52h22M71 44v20" {...S} opacity="0.55" />
        </>
      )}
    </g>
  );
}

export function CatalogueGrid({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
  note,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: string[];
  /** The qualifier the document attaches to the list rather than to any entry. */
  note: string;
}) {
  const reduced = useReducedMotion();

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-14"
          markNode={
            <svg viewBox="0 0 96 96" aria-hidden className="h-24 w-24 text-brand">
              <rect x="8" y="14" width="80" height="68" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 28h80M30 28v54" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
              <rect x="38" y="36" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
              <rect x="62" y="36" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
              <rect x="38" y="60" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.45" />
              <rect x="62" y="60" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.45" />
              <path d="M16 40h8M16 48h8M16 56h8" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
            </svg>
          }
        />

        <Rise>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink-3">
            {/* The store's own furniture. Drawn, and wordless. */}
            <div aria-hidden className="border-b border-line px-5 py-4">
              <svg viewBox="0 0 600 24" preserveAspectRatio="none" className="h-6 w-full">
                <rect x="0" y="6" width="64" height="12" rx="6" className="fill-brand/70" />
                <rect x="88" y="8" width="40" height="8" rx="4" className="fill-fog/25" />
                <rect x="140" y="8" width="52" height="8" rx="4" className="fill-fog/25" />
                <rect x="204" y="8" width="34" height="8" rx="4" className="fill-fog/25" />
                <rect x="380" y="4" width="150" height="16" rx="8" className="fill-ink-2 stroke-line" strokeWidth="1" />
                <rect x="556" y="6" width="16" height="12" rx="3" className="fill-fog/30" />
              </svg>
            </div>

            <div className="grid lg:grid-cols-[11rem_minmax(0,1fr)]">
              {/* The facets, drawn and wordless. */}
              <div aria-hidden className="hidden border-r border-line px-6 py-7 lg:block">
                <svg viewBox="0 0 120 300" className="w-full">
                  {[0, 1, 2].map((g) => (
                    <g key={g} transform={"translate(0," + g * 96 + ")"}>
                      <rect x="0" y="4" width="62" height="8" rx="4" className="fill-snow/35" />
                      {[0, 1, 2, 3].map((r) => (
                        <g key={r}>
                          <rect
                            x="0"
                            y={26 + r * 16}
                            width="9"
                            height="9"
                            rx="2"
                            className={g === 0 && r === 1 ? "fill-brand" : "fill-none stroke-line"}
                            strokeWidth="1.2"
                          />
                          <rect
                            x="16"
                            y={28 + r * 16}
                            width={r % 2 ? 54 : 74}
                            height="6"
                            rx="3"
                            className="fill-fog/22"
                          />
                        </g>
                      ))}
                    </g>
                  ))}
                </svg>
              </div>

              {/* The catalogue. */}
              {/* Pulled a pixel past the panel on two sides so the outer cell
                  borders land under the clip instead of doubling the frame. */}
              <ul className="-mb-px -mr-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {items.map((name, i) => (
                  <motion.li
                    key={name}
                    initial={reduced ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    transition={{ duration: 0.5, delay: (i % 5) * 0.06, ease: EASE }}
                    className="group border-b border-r border-line"
                  >
                    <div className="flex h-full flex-col px-4 pb-6 pt-5 transition-colors duration-400 group-hover:bg-brand/[0.05] motion-reduce:transition-none">
                      <svg
                        viewBox="0 0 96 88"
                        aria-hidden
                        className="mx-auto w-full max-w-[7rem] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                      >
                        <rect
                          x="4"
                          y="4"
                          width="88"
                          height="80"
                          rx="6"
                          className="fill-ink-2 stroke-line transition-colors duration-500 group-hover:stroke-brand/70 motion-reduce:transition-none"
                          strokeWidth="1.2"
                        />
                        <Product i={i} />
                      </svg>
                      <p className="mt-4 text-center text-sm font-semibold leading-snug text-fog transition-colors duration-400 group-hover:text-brand motion-reduce:transition-none">
                        {name}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Rise>

        <Rise delay={0.1} className="mt-8">
          <div className="flex max-w-3xl gap-5 rounded-2xl border border-line bg-ink-3 px-6 py-6">
            <span aria-hidden className="mt-0.5 shrink-0 text-brand">
              <svg viewBox="0 0 30 30" className="h-7 w-7" fill="none">
                <path d="M15 3l11 5v7c0 7-4.6 10.8-11 12C8.6 25.8 4 22 4 15V8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M10.5 15.2l3 3 6.2-6.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="text-sm leading-relaxed text-ash">{note}</p>
          </div>
        </Rise>
      </Container>
    </section>
  );
}
