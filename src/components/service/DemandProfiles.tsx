import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import type { Demand } from "@/content/services/web-hosting";

/** Four websites, four different demands on the same ground.
 *
 *  THE DOCUMENT DRAWS THIS SECTION ITSELF, in four consecutive sentences: "An
 *  ecommerce store needs to process transactions reliably. A campaign landing
 *  page may receive a sudden rise in traffic. A lead-generation website needs
 *  working forms and dependable integrations. A content-heavy website must
 *  deliver pages and media without unnecessary delays." Four kinds of site, and
 *  for each of them exactly one thing the hosting has to do. That is a claim
 *  about variation, and a section that makes a claim about variation has to
 *  vary: four cards saying the same thing four times would contradict the copy
 *  inside them.
 *
 *  SO THE FOUR ARE FOUR DIFFERENT SHAPES OF LOAD. A circuit that has to close.
 *  A crowd arriving at once. Two ties that have to hold. A weight that has to
 *  be lifted. None of them is a version of another and none is labelled: the
 *  sentence under each plate is its only caption, and it is the document's.
 *
 *  THESE ARE PLATES, NOT CARDS. No fill and no shadow: a drawing in a bordered
 *  frame with type set under it on the page's own ground, which is the
 *  treatment the case-study mosaic uses. The section above this one is built
 *  from the house card, and running two card sections back to back is how a
 *  page starts looking like a template.
 *
 *  THE CLOSING PARAGRAPH IS NOT A FIFTH DEMAND. It is the page refusing to
 *  oversell: good hosting "does not replace website optimisation, maintenance,
 *  security procedures or campaign management". It sits under a rule, at its
 *  own weight, because it answers a different question from the four above it.
 *
 *  Every plate keeps one thing running, and in lockstep where more than one
 *  path carries a packet: nine arrivals on nine staggered delays would be nine
 *  positions to compare, which is a figure this document does not give. */

const LINE = "var(--color-line)";
const ASH = "var(--color-ash)";
const BRAND = "var(--color-brand)";

/** A transaction that has to complete: one packet leaves the store, passes the
 *  point where it is taken, and comes back. One path, so the round trip is
 *  visibly a round trip rather than two separate journeys. */
function Transactions() {
  return (
    <svg viewBox="0 0 200 124" role="img" aria-label="A store on the surface with a single circuit leaving it, passing through a gate set into the ground and returning to the same store." className="h-full w-full">
      <rect x="62" y="8" width="76" height="34" rx="3" stroke={LINE} strokeWidth="1.2" fill="var(--color-ink-3)" />
      <rect x="69" y="15" width="22" height="3" rx="1.5" fill={ASH} opacity="0.65" />
      <rect x="69" y="24" width="44" height="2.4" rx="1.2" fill={LINE} />
      <rect x="69" y="32" width="26" height="6" rx="3" fill={BRAND} opacity="0.8" />
      <line x1="10" y1="56" x2="190" y2="56" stroke={ASH} strokeWidth="1.3" />
      <rect x="10" y="56" width="180" height="60" fill="url(#wh-plate-hatch)" />
      <path
        d="M84 42 C 84 76, 34 76, 34 100 H 166 C 166 76, 116 76, 116 42"
        pathLength="100"
        stroke={ASH}
        strokeWidth="1.1"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M84 42 C 84 76, 34 76, 34 100 H 166 C 166 76, 116 76, 116 42"
        pathLength="100"
        stroke={BRAND}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        className="ci-flow"
      />
      <rect x="84" y="92" width="32" height="16" rx="3" stroke={BRAND} strokeWidth="1.3" fill="var(--color-ink-2)" />
      <path d="M92 100 l4 4 l8 -8" stroke={BRAND} strokeWidth="1.4" fill="none" />
    </svg>
  );
}

/** A crowd arriving at once. Every arrival moves on the same delay, so the
 *  picture is a crowd rather than nine values at nine heights. */
function Surge() {
  const lanes = [16, 38, 60, 82, 104, 126, 148, 170, 188];
  return (
    <svg viewBox="0 0 200 124" role="img" aria-label="Nine lanes of traffic arriving together on one landing page, which stands on the surface above hatched ground." className="h-full w-full">
      {lanes.map((x) => (
        <path key={x} d={`M${x} 4 L 100 54`} pathLength="100" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" fill="none" className="ci-flow" />
      ))}
      {lanes.map((x) => (
        <path key={`g${x}`} d={`M${x} 4 L 100 54`} stroke={LINE} strokeWidth="0.8" fill="none" opacity="0.6" />
      ))}
      <rect x="64" y="56" width="72" height="30" rx="3" stroke={ASH} strokeWidth="1.3" fill="var(--color-ink-3)" />
      <rect x="71" y="63" width="30" height="3" rx="1.5" fill={ASH} opacity="0.65" />
      <rect x="71" y="72" width="24" height="7" rx="3.5" fill={BRAND} opacity="0.8" />
      <line x1="10" y1="90" x2="190" y2="90" stroke={ASH} strokeWidth="1.3" />
      <rect x="10" y="90" width="180" height="26" fill="url(#wh-plate-hatch)" />
    </svg>
  );
}

/** A form that reaches its destinations. Both ties are drawn solid and both
 *  carry a packet, because the sentence's word is "dependable": a drawing with
 *  one tie broken would be describing the failure, not the requirement. */
function Forms() {
  return (
    <svg viewBox="0 0 200 124" role="img" aria-label="An enquiry form on the surface with two solid ties leaving it to two external services, both carrying traffic." className="h-full w-full">
      <rect x="16" y="16" width="76" height="72" rx="3" stroke={ASH} strokeWidth="1.3" fill="var(--color-ink-3)" />
      <rect x="24" y="24" width="26" height="3" rx="1.5" fill={ASH} opacity="0.65" />
      <rect x="24" y="34" width="60" height="9" rx="2" stroke={LINE} strokeWidth="1" fill="none" />
      <rect x="24" y="47" width="60" height="9" rx="2" stroke={LINE} strokeWidth="1" fill="none" />
      <rect x="24" y="60" width="60" height="9" rx="2" stroke={LINE} strokeWidth="1" fill="none" />
      <rect x="24" y="74" width="28" height="8" rx="4" fill={BRAND} opacity="0.85" />

      {[38, 74].map((y) => (
        <g key={y}>
          <path d={`M92 ${y === 38 ? 40 : 66} C 124 ${y === 38 ? 40 : 66}, 128 ${y}, 156 ${y}`} stroke={ASH} strokeWidth="1.1" fill="none" opacity="0.6" />
          <path d={`M92 ${y === 38 ? 40 : 66} C 124 ${y === 38 ? 40 : 66}, 128 ${y}, 156 ${y}`} pathLength="100" stroke={BRAND} strokeWidth="2.2" strokeLinecap="round" fill="none" className="ci-flow" />
          <rect x="156" y={y - 12} width="30" height="24" rx="3" stroke={ASH} strokeWidth="1.2" fill="var(--color-ink-2)" />
          <rect x="162" y={y - 4} width="18" height="2.6" rx="1.3" fill={LINE} />
        </g>
      ))}
      <line x1="10" y1="100" x2="190" y2="100" stroke={ASH} strokeWidth="1.3" />
      <rect x="10" y="100" width="180" height="16" fill="url(#wh-plate-hatch)" />
    </svg>
  );
}

/** A weight that has to be lifted. The payloads in the ground are large and
 *  the strokes carrying them are the heaviest on the four plates, which is the
 *  only difference this sentence actually claims. */
function Media() {
  return (
    <svg viewBox="0 0 200 124" role="img" aria-label="A content-heavy page on the surface, with large blocks of media stored in the ground below being carried up into it on heavy lines." className="h-full w-full">
      <rect x="44" y="6" width="112" height="40" rx="3" stroke={ASH} strokeWidth="1.3" fill="var(--color-ink-3)" />
      <rect x="51" y="13" width="30" height="10" rx="2" fill={LINE} />
      <rect x="86" y="13" width="30" height="10" rx="2" fill={LINE} />
      <rect x="121" y="13" width="28" height="10" rx="2" fill={BRAND} opacity="0.4" />
      <rect x="51" y="28" width="70" height="2.6" rx="1.3" fill={LINE} />
      <rect x="51" y="35" width="54" height="2.6" rx="1.3" fill={LINE} />

      <line x1="10" y1="58" x2="190" y2="58" stroke={ASH} strokeWidth="1.3" />
      <rect x="10" y="58" width="180" height="58" fill="url(#wh-plate-hatch)" />
      {[66, 100, 134].map((x) => (
        <g key={x}>
          <path d={`M${x} 96 V 48`} pathLength="100" stroke={ASH} strokeWidth="1.1" fill="none" opacity="0.55" />
          <path d={`M${x} 96 V 48`} pathLength="100" stroke={BRAND} strokeWidth="3.4" strokeLinecap="round" fill="none" className="ci-flow" />
        </g>
      ))}
      {[46, 80, 114].map((x) => (
        <rect key={x} x={x} y="92" width="40" height="22" rx="3" stroke={ASH} strokeWidth="1.2" fill="var(--color-ink-2)" />
      ))}
      <rect x="148" y="92" width="34" height="22" rx="3" stroke={LINE} strokeWidth="1.1" strokeDasharray="4 4" fill="none" />
    </svg>
  );
}

const PLATES: Record<Demand["plate"], () => React.ReactElement> = {
  transactions: Transactions,
  surge: Surge,
  forms: Forms,
  media: Media,
};

export function DemandProfiles({
  id,
  label,
  index,
  title,
  strokeTitle,
  lede,
  demands,
  considerLead,
  consider,
  limit,
  limitMark,
  scoped,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lede: string;
  demands: Demand[];
  considerLead: string;
  consider: string[];
  limit: string;
  limitMark: string[];
  scoped: string;
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} lede={lede} />

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 xl:grid-cols-4">
          {demands.map((d, i) => {
            const Shape = PLATES[d.plate];
            return (
              <Rise key={d.no} delay={i * 0.08} className="group">
                <div className="rounded-[1.25rem] border border-line p-4 transition-colors duration-500 group-hover:border-ash/60 motion-reduce:transition-none">
                  <div className="h-[150px] w-full">
                    <Shape />
                  </div>
                </div>
                <div className="mt-5 flex items-start gap-4">
                  <span className="font-display shrink-0 text-[1.5rem] font-extrabold leading-none text-stroke opacity-45 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none">
                    {d.no}
                  </span>
                  <p className="leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    {d.demand}
                  </p>
                </div>
              </Rise>
            );
          })}
        </div>

        {/* What a hosting recommendation can account for, as the ruled run this
            site gives a list with no data behind it. */}
        <div className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Rise>
            <p className="max-w-md text-base leading-relaxed text-fog sm:text-lg">{considerLead}</p>
          </Rise>

          <Rise delay={0.1}>
            <ul className="grid sm:grid-cols-2 sm:gap-x-10">
              {consider.map((item, i) => (
                <li
                  key={item}
                  className="group flex items-center gap-4 border-b border-line py-4 transition-colors duration-500 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0 motion-reduce:transition-none"
                >
                  <span
                    aria-hidden
                    className="h-px w-8 shrink-0 bg-line transition-all duration-500 group-hover:w-14 group-hover:bg-brand motion-reduce:transition-none"
                  />
                  <span className="text-sm font-semibold uppercase leading-snug text-fog transition-colors duration-500 group-hover:text-snow sm:text-[0.9375rem] motion-reduce:transition-none">
                    {item}
                  </span>
                  <span className="ml-auto font-display text-xs font-extrabold text-ash opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </Rise>
        </div>

        {/* The limit of the claim, in the document's own words. */}
        <Rise delay={0.15} className="mt-12">
          <div className="max-w-4xl border-l-2 border-brand/45 pl-6 sm:pl-8">
            <p className="font-display text-lg font-extrabold uppercase leading-[1.25] text-snow sm:text-xl">
              <Marked text={limit} mark={limitMark} className="text-brand" />
            </p>
            <p className="mt-4 leading-relaxed text-fog">{scoped}</p>
          </div>
        </Rise>
      </Container>
    </section>
  );
}
