"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MarkedKeys } from "@/components/service/MarkedKeys";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

/** Eight situations, and the migration that does not happen.
 *
 *  WHAT MAKES THIS SECTION THIS PAGE'S OWN. The eight bullets are eight kinds
 *  of business with nothing measurable attached to any of them, so they get the
 *  ruled run this site gives a list with no data behind it. The thing worth
 *  building is the paragraph after them: "Before recommending a move, we review
 *  the existing setup. If the current hosting is suitable and the problem sits
 *  elsewhere, we will identify that rather than treating migration as the
 *  automatic answer." That is a hosting company volunteering that the answer
 *  may be to change nothing, and it is the strongest commercial argument in the
 *  document. So the drawing is a move that has not been made: the existing
 *  ground with the site still standing on it, the agreed environment drawn
 *  empty on a broken outline, and the crossing held.
 *
 *  THE SENTENCE'S TWO FINDINGS ARE THE DRAWING'S TWO STATES, on MarkedKeys's
 *  contract. Point at "the current hosting is suitable" and the existing ground
 *  is marked sound. Point at "the problem sits elsewhere" and the fault appears
 *  above the surface, on the website rather than in the ground, which is the
 *  distinction the closing block of the document promises to make. With no
 *  pointer, no keyboard and no JavaScript both are shown at once, because the
 *  sentence asserts both.
 *
 *  NO VERDICT IS PUT ON ANY OF THE EIGHT. The document does not say which of
 *  the eight situations ends in a move, so nothing here marks one. Where the
 *  source places nothing, the drawing places nothing.
 *
 *  THE REVIEW ITSELF IS THE RUNNING ELEMENT: a pass over the existing setup,
 *  which is the only thing in this section that happens before anything is
 *  decided. */

const LINE = "var(--color-line)";
const ASH = "var(--color-ash)";
const BRAND = "var(--color-brand)";

/** The section's shape beside its heading: a site standing on one ground, a
 *  second ground drawn empty, and the crossing between them held. */
function HoldMark() {
  return (
    <div className="hidden shrink-0 lg:block">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label="A website on one patch of hatched ground, an empty patch drawn on a broken outline beside it, and the crossing between the two held by a bar."
        className="h-[clamp(9rem,14vw,13rem)] w-[clamp(9rem,14vw,13rem)] overflow-visible"
      >
        <rect x="14" y="112" width="76" height="54" rx="3" stroke={ASH} strokeWidth="1.4" fill="none" />
        <rect x="14" y="112" width="76" height="54" fill="url(#wh-plate-hatch)" />
        <rect x="28" y="72" width="48" height="34" rx="3" stroke={ASH} strokeWidth="1.3" fill="var(--color-ink-3)" />
        <rect x="110" y="112" width="76" height="54" rx="3" stroke={LINE} strokeWidth="1.3" strokeDasharray="6 6" fill="none" />
        <rect x="124" y="72" width="48" height="34" rx="3" stroke={LINE} strokeWidth="1.2" strokeDasharray="5 5" fill="none" />
        <path d="M92 89 H 108" stroke={ASH} strokeWidth="1.3" strokeDasharray="4 5" fill="none" />
        <line x1="100" y1="74" x2="100" y2="104" stroke={BRAND} strokeWidth="2.2" />
        <line x1="93" y1="74" x2="107" y2="74" stroke={BRAND} strokeWidth="1.5" />
        <line x1="93" y1="104" x2="107" y2="104" stroke={BRAND} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function HeldMove({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  review,
  finding,
  findingMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  items: string[];
  review: string;
  finding: string;
  findingMark: readonly string[];
}) {
  /** Null is both findings, which is what the sentence states. */
  const [pick, setPick] = useState<number | null>(null);
  const sound = pick === null || pick === 0;
  const elsewhere = pick === null || pick === 1;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} markNode={<HoldMark />} />

        <div className="mt-14 grid gap-14 lg:mt-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          {/* The eight, as claims, under their own intro. */}
          <div>
            <Rise>
              <p className="font-display text-lg font-extrabold uppercase leading-[1.2] text-snow sm:text-xl">
                {lead}
              </p>
            </Rise>
            <ul className="mt-8">
              {items.map((item, i) => (
                <li
                key={item}
                className="group flex items-start gap-5 border-b border-line py-5 transition-colors duration-500 last:border-b-0 motion-reduce:transition-none"
              >
                <span
                  aria-hidden
                  className="font-display mt-0.5 shrink-0 text-[1.25rem] font-extrabold leading-none text-stroke opacity-45 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow sm:text-base motion-reduce:transition-none">
                  {item}
                </span>
                <span
                  aria-hidden
                  className="ml-auto mt-2.5 h-px w-6 shrink-0 bg-line transition-all duration-500 group-hover:w-12 group-hover:bg-brand motion-reduce:transition-none"
                />
              </li>
              ))}
            </ul>
          </div>

          {/* The review, and the move it has not recommended. */}
          <div className="lg:sticky lg:top-32 lg:h-fit lg:self-start">
            <Rise>
              <div
                className="rounded-[1.25rem] border border-line bg-ink-2 p-5 sm:p-7"
                role="img"
                aria-label="A website standing on its existing hosting ground with a review pass sweeping that ground, and the agreed hosting environment drawn empty beside it on a broken outline. The crossing between them is drawn dashed and held. When the review finds the existing hosting sound, that ground is marked; when the problem sits elsewhere, a fault appears on the website above the surface instead."
              >
                <svg viewBox="0 0 380 206" aria-hidden className="h-auto w-full overflow-visible">
                  <defs>
                    <clipPath id="wh-held-clip">
                      <rect x="14" y="118" width="156" height="70" />
                    </clipPath>
                  </defs>

                  {/* The existing setup. */}
                  <line x1="14" y1="118" x2="170" y2="118" stroke={ASH} strokeWidth="1.4" />
                  <g clipPath="url(#wh-held-clip)">
                    <rect x="14" y="118" width="156" height="70" fill="url(#wh-plate-hatch)" />
                    <line x1="14" y1="146" x2="170" y2="146" stroke={LINE} strokeWidth="1" strokeDasharray="4 5" />
                    <line x1="14" y1="168" x2="170" y2="168" stroke={LINE} strokeWidth="1" strokeDasharray="4 5" />
                    {/* The pass. Always running: it happens before anything is
                        decided, which is the section's first sentence. */}
                    <rect x="-30" y="118" width="2.5" height="70" fill={BRAND} opacity="0.5" className="ci-scan-x" />
                  </g>
                  <rect
                    x="14"
                    y="118"
                    width="156"
                    height="70"
                    rx="3"
                    fill="none"
                    strokeWidth={sound ? 1.6 : 1.2}
                    stroke={sound ? BRAND : LINE}
                    className="transition-[stroke,stroke-width] duration-500 motion-reduce:transition-none"
                  />
                  {/* Marked sound. */}
                  <g
                    className="transition-opacity duration-500 motion-reduce:transition-none"
                    style={{ opacity: sound ? 1 : 0.12 }}
                  >
                    <circle cx="152" cy="176" r="9" fill="var(--color-ink-2)" stroke={BRAND} strokeWidth="1.3" />
                    <path d="M147 176 l3.5 4 l7 -8" stroke={BRAND} strokeWidth="1.5" fill="none" />
                  </g>

                  {/* The website, above the surface. */}
                  <rect x="40" y="72" width="104" height="42" rx="3" stroke={ASH} strokeWidth="1.3" fill="var(--color-ink-3)" />
                  <rect x="48" y="80" width="26" height="3" rx="1.5" fill={ASH} opacity="0.65" />
                  <rect x="48" y="89" width="58" height="2.4" rx="1.2" fill={LINE} />
                  <rect x="48" y="96" width="44" height="2.4" rx="1.2" fill={LINE} />
                  <path d="M78 114 V 118 M110 114 V 118" stroke={LINE} strokeWidth="1.2" />

                  {/* The problem, when it is not in the ground. */}
                  <g
                    className="transition-opacity duration-500 motion-reduce:transition-none"
                    style={{ opacity: elsewhere ? 1 : 0.12 }}
                  >
                    <rect x="116" y="78" width="20" height="20" rx="3" fill={BRAND} opacity="0.9" />
                    <circle cx="126" cy="88" r="17" stroke={BRAND} strokeWidth="1.1" fill="none" opacity="0.5" />
                    <path d="M126 36 V 64" stroke={BRAND} strokeWidth="1.3" strokeDasharray="4 4" fill="none" />
                    <circle cx="126" cy="30" r="4" fill={BRAND} />
                  </g>

                  {/* The crossing, held. */}
                  <path d="M176 94 H 230" stroke={ASH} strokeWidth="1.2" strokeDasharray="5 6" fill="none" />
                  <path d="M230 94 l -7 -5 M230 94 l -7 5" stroke={ASH} strokeWidth="1.2" fill="none" opacity="0.7" />
                  <line x1="203" y1="76" x2="203" y2="112" stroke={BRAND} strokeWidth="2" />
                  <line x1="196" y1="76" x2="210" y2="76" stroke={BRAND} strokeWidth="1.4" />
                  <line x1="196" y1="112" x2="210" y2="112" stroke={BRAND} strokeWidth="1.4" />

                  {/* The agreed environment, drawn and empty. */}
                  <line x1="240" y1="118" x2="366" y2="118" stroke={ASH} strokeWidth="1.2" strokeDasharray="6 6" />
                  <rect x="240" y="118" width="126" height="70" rx="3" stroke={LINE} strokeWidth="1.2" strokeDasharray="6 6" fill="none" />
                  <rect x="240" y="118" width="126" height="70" fill="url(#wh-plate-hatch)" opacity="0.45" />
                  <rect x="266" y="76" width="76" height="38" rx="3" stroke={LINE} strokeWidth="1.1" strokeDasharray="5 5" fill="none" />
                </svg>
              </div>
            </Rise>

            <Rise delay={0.12} className="mt-8">
              <p className="font-display text-lg font-extrabold uppercase leading-[1.2] text-snow sm:text-xl">
                {review}
              </p>
              <p
                className={cn(
                  "mt-5 max-w-xl leading-relaxed text-fog",
                  // The two findings are the drawing's key, so the sentence
                  // carrying them is the control rather than a caption.
                )}
              >
                <MarkedKeys
                  text={finding}
                  keys={findingMark}
                  active={pick}
                  onPick={setPick}
                  className="inline font-semibold text-brand-text"
                  activeClassName="inline font-semibold text-brand"
                />
              </p>
            </Rise>
          </div>
        </div>
      </Container>
    </section>
  );
}
