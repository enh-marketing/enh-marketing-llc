"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { FOLD } from "@/components/about/fold";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** The team chapter: a carpenter's folding rule, opened by the reader.
 *
 *  THE DOCUMENT HANDS OVER A PROPORTION, NOT A LIST. "Though small in size, our
 *  team is powerful" against "a vast range of knowledge and experience spanning
 *  every facet of the customer retail journey" -- that is one claim about ratio,
 *  and a folding rule is the object that makes it: bundled it fits in a pocket,
 *  open it measures the length of a room. Nothing else in this chapter can be
 *  drawn. There are no names, no roles, no headcount and no portraits anywhere
 *  in the source, so there is no directory here and none is invented; the site's
 *  own rule against a stock portrait standing in for a person applies with more
 *  force to a whole team.
 *
 *  WHAT IT SAYS THAT THE WORDS DO NOT. It shows the ratio. "Small" and
 *  "spanning" are both adjectives on the page; on the rule they are the same
 *  object at two extents, and the reader is the one who takes it from one to
 *  the other.
 *
 *  THE COPY OPERATES THE OBJECT. The two controls under the rule are the
 *  document's own two sentences, whole and unedited. Pointing at "though small
 *  in size" bundles the rule; pointing at the span sentence opens it to full
 *  extent. Between them the scroll drives it. That is the house precedence --
 *  preview beats hold beats scroll -- and it is why a touch reader, who gets no
 *  hover and no pointer leave, can still work it: a tap holds.
 *
 *  THE GRADUATIONS ARE A DASH PATTERN, NOT TICK MARKS. Drawing real ticks would
 *  need the normal to the rule at every vertex, which is trigonometry at render
 *  time and the hydration trap this file's data exists to avoid. A second
 *  polyline over the same points, stroked at the rule's own width with
 *  `stroke-dasharray="0.8 12"` and a butt cap, puts a tick across the face every
 *  twelve units and follows every state for free. No `pathLength` and no
 *  `non-scaling-stroke`, so neither half of that trap applies.
 *
 *  THE WORKING TIP IS MARKED, AND THE MARK RE-PINGS AS IT ADVANCES. `ri-ping`
 *  is the site's own summit ring; keyed on the state, it restarts each time the
 *  rule reaches further, which is the one thing in this section that is still
 *  running when the reader stops scrolling. Its resting state is a ring around
 *  the tip, which is what a stopped animation leaves and what the still needs
 *  to show anyway.
 *
 *  Below 1024px and under prefers-reduced-motion the rule renders fully open.
 *  A bundled rule is not an explanatory still: the span is the claim. */

const LAST = FOLD.length - 1;
const OPEN = LAST;
const SHUT = 0;

function Rule({ at }: { at: number }) {
  const state = FOLD[Math.max(0, Math.min(LAST, at))];
  const points = state.map(([x, y]) => `${x},${y}`).join(" ");
  const tip = state[state.length - 1];
  const hinges = state.slice(1, -1);

  return (
    <svg viewBox="0 96 1200 200" className="h-auto w-full" aria-hidden fill="none">
      {/* The rule's edge, then its face. */}
      <polyline
        points={points}
        stroke="var(--color-fog)"
        strokeWidth="15"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polyline
        points={points}
        stroke="var(--color-void)"
        strokeWidth="11.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Graduations. */}
      <polyline
        points={points}
        stroke="var(--color-ash)"
        strokeWidth="11.5"
        strokeDasharray="0.8 12"
        strokeLinecap="butt"
      />

      {/* Hinge pins. */}
      {hinges.map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="3.2"
          fill="var(--color-void)"
          stroke="var(--color-fog)"
          strokeWidth="1.4"
        />
      ))}

      {/* The working tip. Keyed on the state so the ring restarts each time the
          rule reaches further. */}
      <g key={at}>
        <circle
          className="ri-ping"
          cx={tip[0]}
          cy={tip[1]}
          r="11"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1.4"
          opacity="0.4"
        />
        <circle cx={tip[0]} cy={tip[1]} r="4.2" fill="var(--color-brand)" />
      </g>
    </svg>
  );
}

export function FoldingRule({
  id,
  label,
  index,
  title,
  strokeTitle,
  collaborate,
  essence,
  talented,
  small,
  span,
  spanMark,
  aside,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  collaborate: string;
  essence: string;
  talented: string;
  /** The proportion claim. Bundles the rule. */
  small: string;
  /** The span claim. Opens it. */
  span: string;
  spanMark: string;
  aside: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  /** Where the scroll has the rule. null everywhere the scrub does not run, and
   *  null means open. */
  const [scrolled, setScrolled] = useState<number | null>(null);
  const [hover, setHover] = useState<0 | 1 | null>(null);
  const [held, setHeld] = useState<0 | 1 | null>(null);
  const lastPushed = useRef(-1);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      { open: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (!ctx.conditions?.open) return;
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 82%",
          end: "bottom 62%",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const i = Math.round(self.progress * LAST);
            if (i !== lastPushed.current) {
              lastPushed.current = i;
              setScrolled(i);
            }
          },
        });
        return () => {
          st.kill();
          lastPushed.current = -1;
          setScrolled(null);
        };
      },
    );
    return () => mm.revert();
  }, []);

  /** Preview beats hold beats scroll, and "no scroll state" means open. */
  const picked = hover ?? held;
  const at = picked === null ? (scrolled ?? OPEN) : picked === 0 ? SHUT : OPEN;

  /** Which control is being honoured, for its own active styling. */
  const activeControl =
    picked !== null ? picked : scrolled === null || scrolled > LAST * 0.6 ? 1 : scrolled < LAST * 0.15 ? 0 : null;

  const control = (
    which: 0 | 1,
    text: string,
    mark: string | undefined,
    align: "left" | "right",
  ) => {
    const active = activeControl === which;
    return (
      <button
        type="button"
        onPointerEnter={() => setHover(which)}
        onPointerLeave={() => setHover(null)}
        onFocus={() => setHover(which)}
        onBlur={() => setHover(null)}
        onClick={() => setHeld((v) => (v === which ? null : which))}
        aria-pressed={active}
        className={cn(
          "group flex max-w-[34ch] flex-col gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          align === "right" ? "items-end text-right lg:justify-self-end" : "items-start text-left",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "h-px transition-all duration-500 motion-reduce:transition-none",
            active ? "w-20 bg-brand" : "w-8 bg-line group-hover:w-14",
          )}
        />
        <span
          className={cn(
            "text-base leading-snug transition-colors duration-500 motion-reduce:transition-none sm:text-lg",
            active ? "text-snow" : "text-fog group-hover:text-snow",
          )}
        >
          {mark ? <Marked text={text} mark={mark} /> : text}
        </span>
      </button>
    );
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-12" />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Rise>
            {/* The one sentence in this chapter that is a claim about the team
                rather than about its work, at the one display weight a section
                may set a paragraph at. */}
            <p className="statement text-balance leading-[1.25] text-snow">{essence}</p>
          </Rise>
          <Rise delay={0.1}>
            <p className="max-w-[60ch] leading-relaxed text-fog">{collaborate}</p>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-fog">{talented}</p>
          </Rise>
        </div>

        {/* THE RULE. Full container width, because the width is the argument. */}
        <div ref={trackRef} className="mt-12 lg:mt-14">
          <Rule at={at} />

          {/* The two controls, at the two extents they set. */}
          <div className="mt-6 grid gap-8 lg:mt-2 lg:grid-cols-2 lg:gap-16">
            {control(0, small, undefined, "left")}
            {control(1, span, spanMark, "right")}
          </div>
        </div>

        {/* The document's own closing aside, exclamation mark included. It is
            the only sentence in the file with a joke in it, so it is set on its
            own and not folded into a paragraph. */}
        <Rise delay={0.15} className="mt-14 lg:mt-16">
          <p className="max-w-[52ch] border-l-2 border-brand/40 pl-6 text-base leading-relaxed text-snow sm:text-lg">
            {aside}
          </p>
        </Rise>
      </Container>
    </section>
  );
}
