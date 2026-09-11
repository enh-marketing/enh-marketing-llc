"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** The twelve industries, set inside the thing this page is about.
 *
 *  THIS IS `CatalogueGrid`'S ARRANGEMENT, ASKED FOR BY NAME, and the reasoning
 *  transfers exactly. The section is twelve names and nothing else: no size,
 *  no service, no example attached to any of them. Every typographic answer is
 *  twelve rows of words a reader has to read all of to find their own, and two
 *  earlier attempts here proved the two ways that fails -- twelve bordered
 *  cards read as a list, and an abstract instrument read as a puzzle.
 *
 *  SO THE LIST SITS INSIDE THE PAGE'S OWN NATIVE OBJECT. The ecommerce SEO
 *  page uses a category listing because that is what every other section on it
 *  is about. This page's object is the strategy document the consultation
 *  hands over -- the thing the audit, the goals, the journey and the roadmap
 *  all end up inside -- so the panel is one: a document bar across the top, a
 *  contents rail down the side, and the twelve sectors set out in it with a
 *  mark for each.
 *
 *  THE MARKS ARE ICONOGRAPHY, NOT CLAIMS. A mortarboard over education and a
 *  stethoscope over healthcare are conventional signs. Nothing here says what a
 *  business in that sector does, how large it is or how it performs, and no
 *  tile carries a figure, a service or a result.
 *
 *  THE FURNITURE IS WORDLESS ON PURPOSE. The bar and the contents rail are
 *  drawn and carry no text at all: they are what makes the panel read as a
 *  document, and putting invented labels in them would be writing copy the
 *  client never approved. They are hidden from assistive technology for the
 *  same reason.
 *
 *  THE CLOSING NOTE IS NOT SORTED INTO THE GRID. "The strategy changes
 *  according to the buying process" is a statement about all twelve, and the
 *  sentence under it names three businesses that are examples rather than
 *  entries -- reading "A restaurant" as an instance of "Hospitality and food
 *  and beverage" is an inference the document does not make. So both stay a
 *  note on the whole listing, which is where the document puts them.
 *
 *  MOTION. Tiles arrive on a stagger and then hold; pointing at one lifts its
 *  mark and inks its frame. All of it is cancelled under
 *  prefers-reduced-motion. */

const EASE = [0.16, 1, 0.3, 1] as const;

/** `non-scaling-stroke` because every mark below is scaled to a common optical
 *  size, and without it that scaling would carry the stroke with it: the
 *  stethoscope came out at 2.0 rendered pixels and the cap at 1.45, which is a
 *  visible difference across twelve marks sitting side by side with no frame
 *  to hide it. There is no `pathLength` or dash animation anywhere in this
 *  set, so the trap `docs/DESIGN.md` records for `.ci-draw` does not apply. */
const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;

/** The drawn bounds of each mark, measured off the rendered SVG.
 *
 *  THIS EXISTS BECAUSE THE FRAME CAME OFF. Boxed, a mark could be any size
 *  inside its box and the box did the aligning. Bare on the tile, these are
 *  what the eye compares, and they ran from 45 to 75 units wide and 36 to 56
 *  tall -- a stethoscope beside a cloche read as two different icon sets, and
 *  five of the twelve sat visibly low or high in their cell.
 *
 *  So each is fitted to one optical box and centred on it. Measured rather
 *  than eyeballed, and kept as data so a redrawn mark is one line to re-fit. */
const BOUNDS: [number, number, number, number][] = [
  [18, 20, 78, 68],
  [26, 20, 71, 64],
  [16, 22, 76, 74],
  [10, 18, 76, 58],
  [17, 18, 71, 68],
  [12, 26, 76, 69],
  [20, 20, 72, 72],
  [10, 20, 82, 66],
  [12, 28, 82, 65],
  [11, 18, 78, 71],
  [12, 30, 76, 66],
  [10, 16, 78, 72],
];

/** The box they are fitted into, and where its centre sits in the viewBox. */
const FIT_W = 64;
const FIT_H = 52;
const CX = 47;
const CY = 43;

/** Rounded before it reaches JSX: an unrounded double can print a different
 *  final digit on the server and in the browser, and React throws the whole
 *  island away over one attribute. See `docs/DESIGN.md`. */
const round = (n: number) => Math.round(n * 100) / 100;

const PLACE = BOUNDS.map(([x0, y0, x1, y1]) => {
  const k = Math.min(FIT_W / (x1 - x0), FIT_H / (y1 - y0));
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return `translate(${round(CX - cx * k)} ${round(CY - cy * k)}) scale(${round(k)})`;
});

/** One mark per sector, in the document's order. */
function Trade({ i }: { i: number }) {
  return (
    <g className="text-brand">
      {/* 01 Professional services — a case, and the file in it. */}
      {i === 0 && (
        <>
          <rect x="18" y="30" width="60" height="38" rx="4" {...S} />
          <path d="M38 30v-6a4 4 0 014-4h12a4 4 0 014 4v6" {...S} />
          <path d="M18 46h60" {...S} opacity="0.6" />
          <path d="M42 42h12v8H42z" {...S} opacity="0.75" />
        </>
      )}
      {/* 02 Healthcare and wellness — a stethoscope. */}
      {i === 1 && (
        <>
          <path d="M30 20v14a14 14 0 0028 0V20" {...S} />
          <path d="M26 20h8M54 20h8" {...S} />
          <path d="M44 48v6a10 10 0 0020 0v-4" {...S} />
          <circle cx="64" cy="42" r="7" {...S} />
        </>
      )}
      {/* 03 Real estate and property services — a house and its key. */}
      {i === 2 && (
        <>
          <path d="M16 44L42 22l26 22" {...S} />
          <path d="M22 40v26h40V40" {...S} />
          <path d="M36 66V52h12v14" {...S} opacity="0.65" />
          <circle cx="70" cy="58" r="6" {...S} opacity="0.8" />
          <path d="M70 64v10M70 70h5" {...S} opacity="0.8" />
        </>
      )}
      {/* 04 Hospitality and food and beverage — a cover, and one place setting
          beside it. A knife on the far side as well spread the mark to
          seventy-five units wide, and since every mark is fitted to one
          optical box that width bought itself by shrinking the cloche until it
          was the smallest thing in the set. One fork, close in. */}
      {i === 3 && (
        <>
          <path d="M26 52a22 22 0 0144 0z" {...S} />
          <path d="M20 58h56" {...S} />
          <path d="M48 30v-5" {...S} opacity="0.8" />
          <circle cx="48" cy="23" r="3.5" {...S} opacity="0.8" />
          <path d="M10 18v10M15 18v10M20 18v10" {...S} opacity="0.7" />
          <path d="M10 28h10M15 28v30" {...S} opacity="0.7" />
        </>
      )}
      {/* 05 Retail and ecommerce — a bag, carried. */}
      {i === 4 && (
        <>
          <path d="M22 32h44l5 36H17z" {...S} />
          <path d="M34 40V28a10 10 0 0120 0v12" {...S} />
          <path d="M30 54h28" {...S} opacity="0.5" />
        </>
      )}
      {/* 06 Logistics and industrial businesses — a lorry, loaded. */}
      {i === 5 && (
        <>
          <path d="M12 26h40v30H12z" {...S} />
          <path d="M52 36h14l10 12v8H52z" {...S} />
          <circle cx="28" cy="62" r="7" {...S} />
          <circle cx="64" cy="62" r="7" {...S} />
          <path d="M20 36h24M20 44h16" {...S} opacity="0.5" />
        </>
      )}
      {/* 07 Technology and B2B services — a processor, wired out. */}
      {i === 6 && (
        <>
          <rect x="28" y="28" width="36" height="36" rx="4" {...S} />
          <rect x="38" y="38" width="16" height="16" rx="2" {...S} opacity="0.7" />
          <path d="M38 28v-8M54 28v-8M38 64v8M54 64v8" {...S} opacity="0.65" />
          <path d="M28 38h-8M28 54h-8M64 38h8M64 54h8" {...S} opacity="0.65" />
        </>
      )}
      {/* 08 Education and training — a cap, and the course under it. */}
      {i === 7 && (
        <>
          <path d="M10 34l36-14 36 14-36 14z" {...S} />
          <path d="M24 40v16c0 6 10 10 22 10s22-4 22-10V40" {...S} opacity="0.75" />
          <path d="M76 37v16" {...S} opacity="0.6" />
        </>
      )}
      {/* 09 Automotive — a car, in profile. */}
      {i === 8 && (
        <>
          <path d="M12 54V44l10-16h36l12 16h12v10" {...S} />
          <path d="M12 54h70" {...S} />
          <path d="M28 28v16M58 28v16M22 44h48" {...S} opacity="0.5" />
          <circle cx="28" cy="58" r="7" {...S} />
          <circle cx="66" cy="58" r="7" {...S} />
        </>
      )}
      {/* 10 Home and trade services — the tools that turn up. */}
      {i === 9 && (
        <>
          <path d="M20 22a12 12 0 0015 15l25 25a6 6 0 01-8 8L27 45A12 12 0 0112 30z" {...S} />
          <path d="M74 22L54 42" {...S} opacity="0.75" />
          <path d="M70 18l8 8-6 6-8-8z" {...S} opacity="0.75" />
          <path d="M22 62l10-10" {...S} opacity="0.6" />
        </>
      )}
      {/* 11 Events and entertainment — a ticket, torn at its stub. */}
      {i === 10 && (
        <>
          <path d="M12 30h64v12a6 6 0 000 12v12H12V54a6 6 0 000-12z" {...S} />
          <path d="M52 30v6M52 44v6M52 58v6" {...S} opacity="0.7" />
          <path d="M24 44h18M24 52h12" {...S} opacity="0.5" />
        </>
      )}
      {/* 12 Corporate and government-related organisations — a portico. */}
      {i === 11 && (
        <>
          <path d="M12 32L44 16l32 16" {...S} />
          <path d="M10 36h68" {...S} />
          <path d="M22 40v22M36 40v22M52 40v22M66 40v22" {...S} />
          <path d="M10 66h68M14 72h60" {...S} opacity="0.75" />
        </>
      )}
    </g>
  );
}

export function SectorCatalogue({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  rule,
  note,
  noteMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  items: readonly string[];
  /** The statement the document makes about all twelve. */
  rule: string;
  /** The worked example under it, which names businesses rather than entries. */
  note: string;
  noteMark: string[];
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          lede={lead}
          className="mb-14"
          markNode={
            <svg viewBox="0 0 96 96" aria-hidden className="h-24 w-24 shrink-0 text-brand">
              <rect x="14" y="8" width="68" height="80" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M14 24h68M34 24v64" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
              <path d="M20 34h8M20 42h8M20 50h8" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
              <rect x="42" y="32" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
              <rect x="62" y="32" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
              <rect x="42" y="54" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.45" />
              <rect x="62" y="54" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.45" />
            </svg>
          }
        />

        <Rise>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink-3">
            {/* The document's own furniture. Drawn, and wordless. */}
            <div aria-hidden className="border-b border-line px-5 py-4">
              <svg viewBox="0 0 600 24" preserveAspectRatio="none" className="h-6 w-full">
                <rect x="0" y="6" width="78" height="12" rx="6" className="fill-brand/70" />
                <rect x="98" y="8" width="34" height="8" rx="4" className="fill-fog/25" />
                <rect x="144" y="8" width="44" height="8" rx="4" className="fill-fog/25" />
                <rect x="200" y="8" width="28" height="8" rx="4" className="fill-fog/25" />
                <rect x="420" y="4" width="120" height="16" rx="8" className="fill-ink-2 stroke-line" strokeWidth="1" />
                <rect x="556" y="6" width="16" height="12" rx="3" className="fill-fog/30" />
              </svg>
            </div>

            <div className="grid lg:grid-cols-[11rem_minmax(0,1fr)]">
              {/* The contents rail, drawn and wordless. */}
              <div aria-hidden className="hidden border-r border-line px-6 py-7 lg:block">
                <svg viewBox="0 0 120 300" className="w-full">
                  {[0, 1, 2].map((g) => (
                    <g key={g} transform={"translate(0," + g * 96 + ")"}>
                      <rect x="0" y="4" width="58" height="8" rx="4" className="fill-snow/35" />
                      {[0, 1, 2, 3].map((r) => (
                        <g key={r}>
                          <rect
                            x="0"
                            y={29 + r * 16}
                            width={g === 2 && r === 0 ? 14 : 8}
                            height="3"
                            rx="1.5"
                            className={g === 2 && r === 0 ? "fill-brand" : "fill-line"}
                          />
                          <rect
                            x="22"
                            y={28 + r * 16}
                            width={r % 2 ? 52 : 72}
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

              {/* The twelve. */}
              {/* Pulled a pixel past the panel on two sides so the outer cell
                  borders land under the clip instead of doubling the frame. */}
              <ul className="-mb-px -mr-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((name, i) => (
                  <motion.li
                    key={name}
                    initial={reduced ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: EASE }}
                    className="group border-b border-r border-line"
                  >
                    <div className="flex h-full flex-col px-4 pb-7 pt-8 transition-colors duration-400 group-hover:bg-brand/[0.05] motion-reduce:transition-none">
                      {/* NO FRAME ROUND THE MARK. It carried one -- a filled,
                          bordered box, the way `CatalogueGrid` draws its
                          products -- and inside a panel that is already ruled
                          into twelve cells that is a box inside a box: two
                          borders a few pixels apart, and the mark reading as a
                          sticker stuck on the tile rather than as the tile's
                          own subject. The cell is the frame.
                          
                          The viewBox is cropped to what the marks actually
                          occupy rather than to the box that used to hold them,
                          so removing the frame makes them larger instead of
                          leaving a hole where it was. */}
                      <svg
                        viewBox="9 11 76 64"
                        aria-hidden
                        className="mx-auto w-full max-w-[6.25rem] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                      >
                        <g transform={PLACE[i]}>
                          <Trade i={i} />
                        </g>
                      </svg>
                      <p className="mt-5 text-center text-sm font-semibold leading-snug text-fog transition-colors duration-400 group-hover:text-brand motion-reduce:transition-none">
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
            {/* One route in, three different ways out: the note's own sentence,
                wordless. */}
            <span aria-hidden className="mt-0.5 shrink-0 text-brand">
              <svg viewBox="0 0 30 30" className="h-7 w-7" fill="none">
                <path
                  d="M6 25V15a4 4 0 014-4h10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M15 25V19a4 4 0 014-4h1M24 5v6a4 4 0 01-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.75"
                />
                <circle cx="6" cy="27" r="2" fill="currentColor" />
                <circle cx="15" cy="27" r="2" fill="currentColor" />
                <circle cx="24" cy="27" r="2" fill="currentColor" />
              </svg>
            </span>
            <div>
              <p className="font-display text-base font-extrabold uppercase leading-snug text-snow sm:text-lg">
                {rule}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ash">
                <Marked text={note} mark={noteMark} className="font-semibold text-fog" />
              </p>
            </div>
          </div>
        </Rise>
      </Container>
    </section>
  );
}
