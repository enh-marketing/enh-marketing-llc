import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { splitFigure } from "@/lib/figure";

type Item = {
  figure: string;
  label: string;
  unit: string;
  bound: "floor" | "ceiling" | "span";
};

/** "Logistics Campaign Results" — ten figures, and three kinds of claim.
 *
 *  WHAT THIS PAGE DOES THAT THE OTHER RESULTS SECTIONS DO NOT. The automotive
 *  page sets nine figures on a flat board; the hospitality page plots nine on a
 *  shared scale; the ecommerce page pairs three engagements with their own
 *  quantities. All three treat every figure as the same kind of statement. This
 *  document does not write them that way. Seven of its ten are floors ("More
 *  than 20,000", "Over 3,000"), one is a ceiling ("Nearly 8,000"), and three
 *  are ranges ("Between 400 and 700"). A range is a different claim from a
 *  floor -- it has a top -- and flattening ten hedged claims into ten numerals
 *  throws that away.
 *
 *  ONE NOTATION, GLOSSED BY THE CLIENT'S OWN WORDS EVERY TIME. Each figure
 *  carries a rule with ends: a tick at the near end and an arrow running away
 *  from it means the number is a floor; an arrow running into a tick at the far
 *  end means it is approached; ticks at both ends mean a range. Nobody has to
 *  learn that, because the client's own hedge -- "More than", "Nearly",
 *  "Between" -- is printed directly beside its own mark, in every cell. The
 *  mark states the shape of the claim and the words state it too.
 *
 *  NO SHARED AXIS, AND NO RULE IS LONGER THAN ANOTHER. The caveat immediately
 *  below says these come from different logistics businesses, services, markets
 *  and campaign periods. Nothing here may be compared with anything else here,
 *  so the marks are all the same length and none of them is a measurement.
 *
 *  THE HEDGE IS TYPESET, NOT DELETED. Each figure is split so the qualifier
 *  sits above the numeral at label size instead of competing with it, and a
 *  range keeps its own "and" between its two numerals. Stripped of tags, every
 *  cell concatenates back to the client's string exactly. */

/** A range's own three parts. "Between 400 and 700" -> "Between", "400", "700",
 *  which reassemble to the source string with the "and" printed between them.
 *  Anything that does not match falls back to the two-part split, so a copy
 *  change upstream degrades to a plain figure rather than to a crash. */
function splitSpan(figure: string): { hedge: string; low: string; high: string } | null {
  const m = /^(.*)\s(\S+)\s+and\s+(\S+)$/.exec(figure.trim());
  if (!m) return null;
  return { hedge: m[1], low: m[2], high: m[3] };
}

/** The bound mark. 56 by 16, stroke widths in viewBox units because `ci-draw`
 *  switches off non-scaling-stroke. */
function BoundMark({ bound, delay }: { bound: Item["bound"]; delay: number }) {
  const ASH = "var(--color-ash)";
  const BRAND = "var(--color-brand)";
  return (
    <svg viewBox="0 0 56 16" aria-hidden focusable="false" className="block h-4 w-14" fill="none">
      {/* The run, drawn in full underneath and then drawn again on top, so a
          browser that never animates still shows a complete mark. */}
      <path d="M8 8 H48" stroke={ASH} strokeWidth="1.2" strokeOpacity="0.45" strokeLinecap="round" />
      <path
        d={bound === "ceiling" ? "M48 8 H8" : "M8 8 H48"}
        pathLength="100"
        stroke={BRAND}
        strokeWidth="1.8"
        strokeLinecap="round"
        className="ci-draw"
        style={{ animationDelay: `${delay}ms` }}
      />

      {/* A tick is a stated number. An arrow is the side the truth lies on. */}
      {bound !== "ceiling" && (
        <path d="M8 2 V14" stroke={BRAND} strokeWidth="2" strokeLinecap="round" />
      )}
      {bound === "span" && (
        <path d="M48 2 V14" stroke={BRAND} strokeWidth="2" strokeLinecap="round" />
      )}
      {bound === "floor" && (
        <path
          d="M43 3.5 L49.5 8 L43 12.5"
          stroke={BRAND}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {bound === "ceiling" && (
        <>
          <path
            d="M38 3.5 L44.5 8 L38 12.5"
            stroke={BRAND}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M50 2 V14" stroke={BRAND} strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function FigureManifest({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  /** Ends in a colon in the source, so it sits directly above the manifest. */
  lead: string;
  items: Item[];
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-14"
        />

        <Rise>
          <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line lg:grid-cols-2">
            {items.map((item, i) => {
              const span = item.bound === "span" ? splitSpan(item.figure) : null;
              const flat = splitFigure(item.figure);
              const delay = (i * 5000) / items.length;

              return (
                <li
                  key={`${item.figure} ${item.label}`}
                  className="group flex items-start gap-6 bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none sm:gap-8 sm:p-7"
                >
                  <span className="mt-3 shrink-0">
                    <BoundMark bound={item.bound} delay={delay} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                      {span ? span.hedge : flat.hedge}
                    </p>

                    <p className="font-display mt-1 flex flex-wrap items-baseline gap-x-2 text-[clamp(1.9rem,3.4vw,2.75rem)] font-extrabold uppercase leading-none text-snow">
                      {span ? (
                        /* The whitespace between these three is real, not
                           decorative: the flex gap is what lays them out, but
                           without the spaces textContent concatenates and a
                           range reads as "400and700" to a screen reader and to
                           anything that copies the page. Same rule the section
                           heading follows. */
                        <>
                          <span>{span.low}</span>{" "}
                          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash">
                            and
                          </span>{" "}
                          <span>{span.high}</span>
                        </>
                      ) : (
                        <span>{flat.numeral}</span>
                      )}
                    </p>

                    <span
                      aria-hidden
                      className="mt-5 block h-px w-8 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none"
                    />

                    <p className="mt-4 text-sm leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                      {item.label}
                    </p>
                    {item.unit && (
                      <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ash">
                        {item.unit}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Rise>
      </Container>
    </section>
  );
}
