"use client";

import { Fragment, useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { PartnerBadges } from "@/components/sections/PartnerBadges";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { PartnerBadge } from "@/lib/content";
import type { Requirement } from "@/content/about-us";
import { cn } from "@/lib/cn";

/** The Google Partner chapter: the page's climax.
 *
 *  WHY IT IS THE CLIMAX. Half the source document is not about ENH's opinion of
 *  itself at all -- it is about an accreditation issued by somebody else, with
 *  the requirements listed, the renewal named, and three of its three FAQs
 *  explaining what the badge means. The page opens on a claim and this is where
 *  the claim stops being one.
 *
 *  IT IS SET APART BY SCALE, NOT BY A DARK GROUND. `py-32 sm:py-44 lg:py-52` is
 *  chapter-scale vertical rhythm, and it exists on exactly one other component
 *  on this site. docs/DESIGN.md rule 6 already ruled on the alternative: a
 *  `chapter-dark` class was tried once, made the light theme run white, cut to
 *  near-black for one section and cut back, and "read as a seam rather than a
 *  chapter". The rule names pacing as what to use instead, so that is what this
 *  uses, plus its own atmosphere behind the type.
 *
 *  THREE REQUIREMENTS, THREE DRAWINGS. docs/DESIGN.md rule 7: one drawing in
 *  three states "collapses into the one abstract shape" its subjects have in
 *  common. Certified experts, best practice inside somebody else's account, and
 *  a record a third party signed have no shape in common. Each drawing answers
 *  exactly one question:
 *
 *    Certified Experts        -> what does "consistently renewing" mean?
 *                                A certificate is re-issued. Older ones sit
 *                                behind the current one; the validity band along
 *                                its foot is what runs out.
 *    Best Practice            -> whose account is the work done in?
 *                                A boundary, with the practice reaching across
 *                                it. It is their account, not ours.
 *    Proven Results           -> what makes it a record rather than a claim?
 *                                Entries that are all the same length -- which
 *                                is what "consistent" means and carries no
 *                                quantity -- and a second column of marks made
 *                                by somebody else.
 *
 *  NO QUANTITIES ANYWHERE. docs/DESIGN.md rule 4, and the document could not
 *  support one if the rule allowed it: there is no figure in this chapter. The
 *  record's entries are deliberately identical, so there is nothing to read off
 *  and nothing to measure.
 *
 *  THE MARKED PHRASE IS THE CONTROL. Each requirement's own sentence carries the
 *  clause its drawing is about, and that clause is the button: pointing at
 *  "Search" lights the first seal, at "our clients' Google Ads accounts" lights
 *  the boundary, at "recognized by Google" lights the counter-signatures. The
 *  words are printed once, inside the sentence, and the drawing carries no
 *  labels at all.
 *
 *  THE DRAWINGS ARE THE ACCREDITATION, NEVER THE BADGE. Google's badge
 *  guidelines forbid distorting, recolouring or animating the mark. The issued
 *  artwork is carried by `sections/PartnerBadges`, which animates only the plate
 *  underneath it, and nothing drawn in this file touches it. Meta's badge is
 *  filtered out upstream: this document says nothing about Meta.
 *
 *  NOT ONE LINE IN THESE THREE DRAWINGS IS --color-line. docs/DESIGN.md rule 5:
 *  the hairline token measures 1.1:1 against the light ground and 1.4:1 against
 *  the dark one, so it is for borders and never for anything a reader has to
 *  see. Ten strokes here were on it, and in the dark theme the whole of the
 *  boundary drawing's reach and every row rule in the record were effectively
 *  invisible. Everything inside a viewBox is inked in `ash` now, with an
 *  explicit `opacity` where it should stay quiet -- which is a tone decision
 *  rather than a token doing a job it fails at in one of the two themes. */

/* ------------------------------------------------------------------ drawings */

const FRAME =
  "relative overflow-hidden rounded-[1.25rem] border border-line bg-void p-4 sm:p-5";

/** "certified Google Ads experts proficient in Search, Shopping, and Display…
 *  consistently renewing our certifications." */
function CertificateStack({ lit, reduced }: { lit: number | null; reduced: boolean }) {
  return (
    <svg viewBox="0 0 300 220" className="h-full w-full" aria-hidden fill="none">
      {/* The ones that came before. */}
      {[
        [-18, -16],
        [-9, -8],
      ].map(([dx, dy]) => (
        <rect
          key={dx}
          x={56 + dx}
          y={50 + dy}
          width="196"
          height="128"
          rx="4"
          fill="var(--color-void)"
          stroke="var(--color-ash)"
          strokeWidth="1.4"
          opacity="0.55"
        />
      ))}

      {/* The current one. */}
      <rect
        x="56"
        y="50"
        width="196"
        height="128"
        rx="4"
        fill="var(--color-void)"
        stroke="var(--color-fog)"
        strokeWidth="1.7"
      />
      <line x1="72" y1="70" x2="150" y2="70" stroke="var(--color-ash)" strokeWidth="3.4" />
      <line x1="72" y1="86" x2="236" y2="86" stroke="var(--color-ash)" strokeWidth="1" opacity="0.5" />
      <line x1="72" y1="96" x2="236" y2="96" stroke="var(--color-ash)" strokeWidth="1" opacity="0.5" />
      <line x1="72" y1="106" x2="196" y2="106" stroke="var(--color-ash)" strokeWidth="1" opacity="0.5" />

      {/* Three seals, one per proficiency the sentence names, in its order.
          Nothing is written on them: the names are in the sentence. */}
      {[94, 154, 214].map((x, i) => {
        const on = lit === i;
        return (
          <g
            key={x}
            style={{
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
              opacity: lit === null || on ? 1 : 0.45,
            }}
          >
            <circle
              cx={x}
              cy="136"
              r="11"
              fill="none"
              stroke={on ? "var(--color-brand)" : "var(--color-ash)"}
              strokeWidth={on ? 2 : 1.3}
              style={{
                transition:
                  "stroke 0.5s cubic-bezier(0.16,1,0.3,1), stroke-width 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
            <circle
              cx={x}
              cy="136"
              r="4"
              fill={on ? "var(--color-brand)" : "var(--color-ash)"}
              style={{ transition: "fill 0.5s cubic-bezier(0.16,1,0.3,1)" }}
            />
          </g>
        );
      })}

      {/* The validity band. It is what runs out, and what renewing puts back.
          A rect rather than a line because `ci-grow-x` scales about its own
          fill-box and a horizontal line's box has no height; stopped, it rests
          at full width, which is the certificate in force. */}
      <rect x="72" y="162.5" width="164" height="3" fill="var(--color-ash)" opacity="0.4" />
      <rect
        data-probe="validity"
        x="72"
        y="162.5"
        width="164"
        height="3"
        fill="var(--color-brand)"
        className={reduced ? undefined : "ci-grow-x"}
      />
    </svg>
  );
}

/** "We adhere to recommended best practices within our clients' Google Ads
 *  accounts…" The boundary is the whole point, so the boundary is the drawing. */
function AccountBoundary({ lit, reduced }: { lit: number | null; reduced: boolean }) {
  const on = lit === 0;
  return (
    <svg viewBox="0 0 300 220" className="h-full w-full" aria-hidden fill="none">
      {/* Us, outside it: the recommended practices, before they are applied. */}
      <rect
        x="12"
        y="86"
        width="52"
        height="48"
        rx="3"
        fill="var(--color-void)"
        stroke="var(--color-fog)"
        strokeWidth="1.6"
      />
      <line x1="22" y1="98" x2="54" y2="98" stroke="var(--color-ash)" strokeWidth="2.2" />
      <line x1="22" y1="108" x2="48" y2="108" stroke="var(--color-ash)" strokeWidth="1.6" opacity="0.5" />
      <line x1="22" y1="118" x2="52" y2="118" stroke="var(--color-ash)" strokeWidth="1.6" opacity="0.5" />

      {/* Their account. */}
      <rect
        x="104"
        y="30"
        width="180"
        height="160"
        rx="6"
        fill="none"
        stroke={on ? "var(--color-brand)" : "var(--color-fog)"}
        strokeWidth={on ? 2.6 : 1.8}
        style={{
          transition:
            "stroke 0.5s cubic-bezier(0.16,1,0.3,1), stroke-width 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* The reach across the boundary, and the packet that crosses it. The
          packet is dropped under reduced motion: `ci-flow` stopped rests as a
          dash at the head of the path, and the dashed reach below is the drawn
          state. */}
      <path
        d="M64 110L104 110"
        stroke="var(--color-ash)"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      {!reduced && (
        <path
          d="M64 110L104 110"
          className="ci-flow"
          pathLength="100"
          stroke="var(--color-brand)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      )}
      <circle cx="104" cy="110" r="3.4" fill="var(--color-brand)" />

      {/* Their settings, with the practice applied inside their frame. */}
      {[0, 1, 2, 3, 4].map((k) => {
        const y = 54 + k * 28;
        return (
          <g key={k}>
            <line
              x1="126"
              y1={y}
              x2="266"
              y2={y}
              stroke="var(--color-ash)"
              strokeWidth="1"
              opacity="0.5"
            />
            <path
              d={`M126 ${y - 5}l4 5l7 -9`}
              stroke="var(--color-ash)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="146"
              y1={y - 4}
              x2={200 + k * 12}
              y2={y - 4}
              stroke="var(--color-ash)"
              strokeWidth="2.2"
            />
          </g>
        );
      })}
    </svg>
  );
}

/** "Our track record of delivering consistent results… recognized by Google."
 *  Every entry the same length, because "consistent" is sameness and this page
 *  carries no quantities; and a second column of marks made by somebody else,
 *  which is the difference between a record and a claim. */
function CounterSignedRecord({ lit, reduced }: { lit: number | null; reduced: boolean }) {
  const on = lit === 0;
  const ROWS = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 300 220" className="h-full w-full" aria-hidden fill="none">
      <rect
        x="42"
        y="22"
        width="216"
        height="176"
        rx="4"
        fill="var(--color-void)"
        stroke="var(--color-fog)"
        strokeWidth="1.6"
      />
      <line x1="200" y1="22" x2="200" y2="198" stroke="var(--color-fog)" strokeWidth="1.2" />
      <line x1="56" y1="42" x2="120" y2="42" stroke="var(--color-ash)" strokeWidth="3" />
      <line x1="210" y1="42" x2="246" y2="42" stroke="var(--color-ash)" strokeWidth="3" />

      {ROWS.map((k) => {
        const y = 64 + k * 22;
        return (
          <g key={k}>
            <line x1="56" y1={y + 6} x2="186" y2={y + 6} stroke="var(--color-ash)" strokeWidth="1" opacity="0.5" />
            {/* Our entry. Identical every time, on purpose. */}
            <line x1="56" y1={y} x2="150" y2={y} stroke="var(--color-ash)" strokeWidth="2.6" />
            {/* The counter-signature. */}
            <path
              d={`M212 ${y - 2}l4 5l8 -10`}
              stroke={on ? "var(--color-brand)" : "var(--color-ash)"}
              strokeWidth={on ? 2.2 : 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition:
                  "stroke 0.5s cubic-bezier(0.16,1,0.3,1), stroke-width 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </g>
        );
      })}

      {/* A light reading down the record. `ci-blink-soft` is the tinted-wash
          form -- the tint is `fillOpacity` and the class animates the element's
          own `opacity` -- but unlike `.ci-blink` it sets no transform-box, and
          the shared keyframe also scales to 0.6. Without an origin that scale
          resolves against the SVG's own origin and the wash slides toward the
          top-left corner, so the box and origin are set here.

          Dropped entirely under reduced motion: the class rests at opacity 0,
          and the drawn state this drawing needs is the record itself, complete. */}
      {!reduced &&
        ROWS.map((k) => (
          <rect
            key={`lit-${k}`}
            x="48"
            y={64 + k * 22 - 9}
            width="144"
            height="17"
            rx="2"
            fill="var(--color-brand)"
            fillOpacity="0.12"
            className="ci-blink-soft"
            style={{
              animationDelay: `${((k * 6) / ROWS.length).toFixed(3)}s`,
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          />
        ))}
    </svg>
  );
}

/* ------------------------------------------------------------------- section */

/** The requirement's own sentences, with the clause its drawing is about turned
 *  into the control that lights it. The sentence is not reworded and the phrase
 *  is not lifted out of it -- it is the same words, in place, made pressable. */
function SentenceControls({
  text,
  marks,
  lit,
  onLit,
}: {
  text: string;
  marks: string[];
  lit: number | null;
  onLit: (i: number | null) => void;
}) {
  const found = marks.filter((m) => text.includes(m));
  if (!found.length) return <>{text}</>;

  /* Split on the marks, longest first so a phrase containing another is not cut
     in half by it. */
  const escaped = [...found]
    .sort((a, b) => b.length - a.length)
    .map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp("(" + escaped.join("|") + ")", "g"));

  return (
    <>
      {parts.map((part, i) => {
        const k = marks.indexOf(part);
        if (k < 0) return <Fragment key={i}>{part}</Fragment>;
        const on = lit === k;
        return (
          <button
            key={i}
            type="button"
            onPointerEnter={() => onLit(k)}
            onPointerLeave={() => onLit(null)}
            onFocus={() => onLit(k)}
            onBlur={() => onLit(null)}
            onClick={() => onLit(on ? null : k)}
            aria-pressed={on}
            className={cn(
              "inline font-semibold underline decoration-1 underline-offset-4 transition-colors duration-300 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              on
                ? "text-brand-text decoration-brand"
                : "text-snow decoration-line hover:text-brand-text hover:decoration-brand",
            )}
          >
            {part}
          </button>
        );
      })}
    </>
  );
}

/** One requirement: a drawing in a frame, with its words under it on the page's
 *  own ground. Not a card -- the border and the surface belong to the frame the
 *  drawing sits in, which is the treatment `CasePlate` sets for a picture. */
function RequirementPlate({
  requirement,
  drawing,
  className,
  delay,
}: {
  requirement: Requirement;
  drawing: (lit: number | null) => ReactNode;
  className?: string;
  delay?: number;
}) {
  const [lit, setLit] = useState<number | null>(null);
  return (
    <Rise delay={delay} className={cn("flex min-w-0 flex-col", className)}>
      <div className={cn(FRAME, "h-[13rem] sm:h-[15rem]")}>{drawing(lit)}</div>
      <h3 className="font-display mt-6 text-lg font-extrabold uppercase leading-[1.14] text-snow sm:text-xl">
        {requirement.title}
      </h3>
      {requirement.body.map((para, i) => (
        <p key={para} className={cn("max-w-[46ch] leading-relaxed text-fog", i === 0 ? "mt-4" : "mt-3")}>
          <SentenceControls text={para} marks={requirement.mark} lit={lit} onLit={setLit} />
        </p>
      ))}
    </Rise>
  );
}

export function PartnerChapter({
  id,
  label,
  index,
  title,
  strokeTitle,
  trust,
  harness,
  ongoing,
  showcase,
  requirements,
  access,
  badges,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  trust: string;
  harness: string;
  ongoing: string;
  showcase: string;
  requirements: Requirement[];
  access: string;
  /** Resolved by the server from what is actually in /public, filtered to the
   *  marks this document supports. Empty renders nothing. */
  badges: PartnerBadge[];
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id={id}
      data-section={label}
      className="relative overflow-x-clip py-32 sm:py-44 lg:py-52"
    >
      {/* The chapter's own atmosphere. Faint, and it reads in both themes
          because --grid-line flips with them. This is the other half of "set
          apart by scale, pacing and structure": the ground changes character
          without the section opting out of the palette. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at 50% 18%, black, transparent 74%)",
          }}
        />
        <div className="aurora-b absolute left-1/2 top-[4%] h-[32vw] w-[32vw] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[150px]" />
      </div>

      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* `trust` is two sentences and 180 characters. Set at `.statement`
              it came out as six lines of display-weight type competing with the
              h2 directly above it, which is the failure globals.css records
              against statements that drift too close to their heading. The one
              display-weight line in this chapter is the pivot below. */}
          <Rise>
            <p className="max-w-[52ch] text-base leading-relaxed text-snow sm:text-lg">{trust}</p>
          </Rise>
          <Rise delay={0.1}>
            <p className="max-w-[52ch] leading-relaxed text-fog">{harness}</p>
          </Rise>
        </div>

        {/* THE PIVOT. One sentence, and the reason the three drawings below are
            about holding something rather than earning it once. */}
        <Rise delay={0.15} className="mt-16 lg:mt-20">
          <p className="statement max-w-[30ch] border-l-2 border-brand/40 pl-6 leading-[1.28] text-snow">
            <Marked text={ongoing} mark="meticulous and ongoing process" />
          </p>
          <p className="mt-6 max-w-[62ch] leading-relaxed text-fog">{showcase}</p>
        </Rise>

        {/* THE THREE. Unequal spans, because the three are not interchangeable
            and equal thirds would say they were. */}
        <div className="mt-14 grid gap-x-10 gap-y-14 lg:mt-16 lg:grid-cols-12">
          <RequirementPlate
            requirement={requirements[0]}
            className="lg:col-span-5"
            drawing={(lit) => <CertificateStack lit={lit} reduced={reduced} />}
          />
          <RequirementPlate
            requirement={requirements[1]}
            className="lg:col-span-3"
            delay={0.08}
            drawing={(lit) => <AccountBoundary lit={lit} reduced={reduced} />}
          />
          <RequirementPlate
            requirement={requirements[2]}
            className="lg:col-span-4"
            delay={0.16}
            drawing={(lit) => <CounterSignedRecord lit={lit} reduced={reduced} />}
          />
        </div>

        {/* WHAT THE THREE OPEN. The document's own payoff sentence, and the
            issued artwork beside it -- which is the one thing on this page
            allowed to carry the Google marks. */}
        <div className="mt-20 grid gap-10 border-t border-line pt-14 lg:mt-24 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <Rise>
            <p className="max-w-[62ch] text-base leading-relaxed text-snow sm:text-lg">
              <Marked text={access} mark="exclusive access to resources from Google" />
            </p>
          </Rise>
          {badges.length > 0 && (
            <div className="lg:justify-self-end">
              <PartnerBadges badges={badges} align="start" size="compact" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
