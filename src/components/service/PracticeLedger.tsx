"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

gsap.registerPlugin(ScrollTrigger);

/** "Why Choose ENH Marketing for Marketing Consultation in Dubai?"
 *
 *  WHAT THE DOCUMENT GIVES, AND WHAT IT DOES NOT. Six claims, and every one of
 *  them is a position followed by the reason for it -- "Marketing and sales
 *  are reviewed together" / "Generating more leads will not solve slow
 *  follow-up, poor qualification or an unclear sales process." There is no
 *  figure attached to any of them, no ordering between them and no shared
 *  structure to draw, so nothing is drawn: six invented diagrams beside six
 *  single assertions is the shape this site has already rejected outright.
 *  What there IS is a consistent two-part shape, so the ledger is split at
 *  that seam -- the position on the left of the rule, the reason on the right
 *  -- and the rule between them is the section's only ornament.
 *
 *  THE SECTION OPENS AND CLOSES ON SOMETHING THAT IS NOT A CLAIM, and both are
 *  set apart from the run rather than folded into it as a seventh and eighth
 *  row:
 *
 *  · The opening sentence is a TEST, not a boast: "A strategy is only useful
 *    when it can survive budgets, deadlines, internal approvals and the
 *    everyday realities of running a business." It sits beside the heading, at
 *    statement scale, with its four pressures marked where they stand.
 *
 *  · The closing two sentences are a test to apply to everybody on the
 *    shortlist, this agency included. They get the only drawing in the
 *    section, and the drawing is the client's own comparison: four things to
 *    ask for, against a meeting and some advice. It is drawn because the
 *    document draws it -- "A meeting followed by general advice is not a
 *    marketing strategy" is the client's sentence, not a strawman invented
 *    here -- and the four bands on the right are the four things their own
 *    previous sentence names, countable by eye, with nothing inside them that
 *    claims a size.
 *
 *  MOTION IS TWO LAYERS AT DIFFERENT RATES, the same device `Caveat` uses:
 *  the opening test drifts against the ledger as the section passes. The
 *  ledger's own life is the hover vocabulary on every row, which is most of
 *  the transition count on every approved page on this site. */

/** The closing comparison. No words inside the viewBox: the four bands are the
 *  four things the sentence beside it names, and naming them twice would be
 *  printing the same words twice. */
function MeetingAndStrategy() {
  const ASH = "var(--color-ash)";
  const BRAND = "var(--color-brand)";
  const BANDS = [62, 98, 134, 170];

  return (
    <svg viewBox="0 0 420 220" className="block w-full" fill="none" aria-hidden>
      <defs>
        <clipPath id="ms-sheet">
          <rect x="230" y="20" width="170" height="180" />
        </clipPath>
      </defs>
      {/* A meeting, and some advice. One rule where the meeting was, a line
          that never settles under it, and the rest of the sheet empty. */}
      <rect x="20" y="20" width="170" height="180" rx="3" stroke={ASH} strokeWidth="1.4" />
      <path d="M42 58 H168" stroke={ASH} strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M42 98 C62 84 82 112 102 98 C122 84 148 112 168 98"
        stroke={ASH}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="5 6"
        className="ci-twinkle"
      />
      {/* What leaves the room: an open end, a short way out and no further. */}
      <path d="M105 200 V214" stroke={ASH} strokeWidth="1.2" strokeDasharray="3 5" />
      <circle cx="105" cy="216" r="2.6" stroke={ASH} strokeWidth="1.2" />

      {/* What is included instead. Four bands, identical in every dimension,
          because the sentence ranks none of them. They draw in lockstep: on a
          stagger, four rules at four lengths at every instant would be a chart
          of a weighting the document does not give. */}
      <rect x="230" y="20" width="170" height="180" rx="3" stroke={ASH} strokeWidth="1.4" />
      {BANDS.map((y) => (
        <g key={y}>
          <rect x="248" y={y - 3} width="6" height="6" rx="1.5" fill={BRAND} />
          <path
            d={`M264 ${y} H382`}
            pathLength="100"
            stroke={BRAND}
            strokeWidth="1.8"
            strokeLinecap="round"
            className="ci-draw"
          />
          <path
            d={`M264 ${y + 11} H344`}
            stroke={ASH}
            strokeWidth="1.2"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* The sheet being read, clipped to itself. ci-scan-x rather than
          ci-scan-y: both travel a fixed distance in USER units, and y only
          covers 54 of this sheet's 180, where x covers the whole 170. */}
      <g clipPath="url(#ms-sheet)">
        <rect x="230" y="20" width="20" height="180" className="ci-scan-x fill-brand/[0.14]" />
      </g>
    </svg>
  );
}

export function PracticeLedger({
  id,
  label,
  index,
  title,
  strokeTitle,
  survive,
  surviveMark,
  experience,
  experienceMark,
  items,
  ask,
  askMark,
  verdict,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle: string;
  survive: string;
  surviveMark: string[];
  experience: string;
  experienceMark: string[];
  items: readonly { no: string; claim: string; reason: string; reasonMark?: string[] }[];
  ask: string;
  askMark: string[];
  verdict: string;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      const drift = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
      drift
        .fromTo(q("[data-layer='test']"), { yPercent: -6 }, { yPercent: 6, ease: "none" }, 0)
        .fromTo(q("[data-layer='plate']"), { yPercent: 7 }, { yPercent: -5, ease: "none" }, 0);

      return () => {
        drift.scrollTrigger?.kill();
        drift.kill();
        gsap.set(q("[data-layer='test'], [data-layer='plate']"), { clearProps: "y,yPercent" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id={id}
      data-section={label}
      ref={root}
      className="relative overflow-x-clip py-14 sm:py-16"
    >
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <div data-layer="test">
              <Rise>
                <p className="font-display statement font-extrabold uppercase leading-[1.22] text-snow">
                  <Marked text={survive} mark={surviveMark} className="text-brand" />
                </p>
              </Rise>
            </div>
          }
        />

        <Rise delay={0.2} className="mt-10">
          <p className="flex max-w-4xl gap-5 leading-relaxed text-fog">
            <span aria-hidden className="mt-1.5 w-px shrink-0 self-stretch bg-brand" />
            <span>
              <Marked
                text={experience}
                mark={experienceMark}
                className="font-semibold text-snow"
              />
            </span>
          </p>
        </Rise>

        {/* The ledger. The position on the left of the rule, the reason on the
            right, six times; the seam is where the document's own sentences
            split. */}
        <div className="mt-14 border-t border-line">
          {items.map((item, i) => (
            <div
              key={item.no}
              {...(i === 0 ? { "data-first-tick": "" } : {})}
              className="group grid items-start gap-x-10 gap-y-4 border-b border-line py-8 lg:grid-cols-[3.5rem_1fr_1fr] lg:gap-x-12"
            >
              <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-3">
                <span className="font-display text-[2.6rem] font-extrabold leading-none text-stroke opacity-40 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none">
                  {item.no}
                </span>
                {/* One light walks the six positions in turn: same duration, a
                    delay of duration/count, so only one is ever lit and
                    nothing is being compared against anything. */}
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-ash/60 transition-colors duration-500 group-hover:border-brand motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden
                    className="ci-blink absolute inset-0 rounded-full bg-brand"
                    style={{ animationDelay: `${(i * 6) / 6}s` }}
                  />
                </span>
              </div>

              <div className="lg:border-r lg:border-line lg:pr-12">
                <h3 className="font-display text-xl font-extrabold uppercase leading-[1.16] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none sm:text-2xl">
                  {item.claim}
                </h3>
                <span
                  aria-hidden
                  className="mt-5 block h-px w-10 bg-line transition-all duration-500 group-hover:w-24 group-hover:bg-brand motion-reduce:transition-none"
                />
              </div>

              <p className="leading-relaxed text-ash transition-colors duration-500 group-hover:text-fog motion-reduce:transition-none lg:pt-2">
                <Marked
                  text={item.reason}
                  mark={item.reasonMark}
                  className="font-semibold text-snow"
                />
              </p>
            </div>
          ))}
        </div>

        {/* What to ask anybody on the shortlist, and the thing that is not a
            strategy. The client's own comparison, drawn. */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div>
            <Rise>
              <p className="max-w-xl text-base leading-relaxed text-fog sm:text-lg">
                <Marked text={ask} mark={askMark} className="font-semibold text-snow" />
              </p>
            </Rise>
            <Rise delay={0.12} className="mt-8">
              <p className="font-display max-w-xl text-[clamp(1.5rem,3.4vw,2.6rem)] font-extrabold uppercase leading-[1.08] text-brand">
                {verdict}
              </p>
            </Rise>
          </div>

          <div data-layer="plate">
            <Rise delay={0.18}>
              <div className="rounded-[1.25rem] border border-line bg-void p-6 sm:p-8">
                <MeetingAndStrategy />
              </div>
            </Rise>
          </div>
        </div>
      </Container>
    </section>
  );
}
