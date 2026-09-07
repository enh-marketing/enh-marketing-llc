"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** What happens after the click, followed all the way, and back again.
 *
 *  THE SECTION IS A CIRCUIT, NOT A LIST, AND THE DOCUMENT MAKES IT ONE. It
 *  states a cause and an effect that close on each other: the problem "sits
 *  after the ad", and "a weak page can therefore raise the price of the same
 *  click". So the drawing is a loop. A click leaves the account, crosses the
 *  line the account cannot reach past, meets five gates on the page, either
 *  becomes an enquiry or does not, and the result returns to the auction and
 *  sets the price of the next one. Drawn as a line, the section would lose the
 *  only claim in it that costs the reader money.
 *
 *  THE COPY CAPTIONS THE DRAWING AND THE DRAWING NEVER REPEATS THE COPY. The
 *  five gates are the five ways the document says a page loses a click, and
 *  those words appear exactly once on the page: inside the client's own
 *  sentence. As the click reaches a gate, the matching clause in that sentence
 *  lights. No gate carries a label, because the label is already on the page
 *  and printing it twice is what the copy rule here forbids. It also means the
 *  interaction has something to say rather than something to decorate.
 *
 *  THE GATES ARE THE RESEARCH AND THE DOCUMENT AGREEING. Load speed, message
 *  match, how much is asked, whether the visitor can make contact, and whether
 *  the offer is the one the ad promised: that is what decides a post-click
 *  experience, and it is what the client's sentence already lists. Nothing was
 *  added to it to fit a diagram.
 *
 *  NOTHING IS COUNTED. No cost, no rate, no score. The price on the return leg
 *  is a bar with no scale, because the document gives no figure and its one
 *  external claim is a citation rather than a statistic.
 *
 *  MECHANICS. Sticky, never a pinned scroll hijack: the house rule, and it
 *  keeps the page's own scrollbar honest. Scroll position drives one index;
 *  ScrollTrigger writes the travelling head straight to the DOM so there is no
 *  React work per frame. Under reduced motion the whole circuit renders
 *  complete and every clause is lit, which is the state that explains the most.
 *
 *  RESPONSIVE. The circuit is a desktop reading. Below the large breakpoint it
 *  becomes a vertical run of the same six stops with the same lit clause, so
 *  the story survives without a loop that would be illegible at 375px. */

/** The six stops, in order, and where each sits on the circuit. Labels live in
 *  the client's sentence, never on the drawing. Coordinates are explicit rather
 *  than sampled off the path: a deterministic position per stop is testable,
 *  and it moves with a transform, which is the cheapest thing to animate. */
const STOPS = ["query", "auction", "cross", "page", "action", "return"] as const;
const STOP_AT: [number, number][] = [
  [64, 109],
  [64, 160],
  [226, 109],
  [378, 109],
  [475, 120],
  [260, 259],
];

export function ClickCircuit({
  id,
  label,
  index,
  title,
  strokeTitle,
  statement,
  symptom,
  symptomStages,
  auctionLead,
  auction,
  auctionTail,
  source,
  conversation,
  conversationMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  statement: string;
  symptom: string;
  /** Verbatim substrings of `symptom`, one per gate on the page. */
  symptomStages: string[];
  auctionLead: string;
  auction: string[];
  auctionTail: string;
  source: string;
  conversation: string;
  conversationMark: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  /** Which stop the click has reached. -1 before the section is entered. */
  const [at, setAt] = useState(0);
  const lastPushed = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: track,
        start: "top top+=120",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;
          const i = Math.min(STOPS.length - 1, Math.max(0, Math.floor(p * STOPS.length)));
          if (i !== lastPushed.current) {
            lastPushed.current = i;
            setAt(i);
          }
        },
      });
      return () => trigger.kill();
    }, track);

    return () => ctx.revert();
  }, []);

  /** The gates are only reached once the click is on the page. */
  const onPage = reduced || at >= 3;
  const litClause = reduced ? -1 : Math.max(0, Math.min(symptomStages.length - 1, at - 1));

  /** The client's sentence, with the clause the click has reached lit. */
  const captioned = () => {
    const parts: React.ReactNode[] = [];
    let rest = symptom;
    symptomStages.forEach((clause, i) => {
      const k = rest.indexOf(clause);
      if (k < 0) return;
      parts.push(<Fragment key={`t${i}`}>{rest.slice(0, k)}</Fragment>);
      parts.push(
        <span
          key={`c${i}`}
          className={cn(
            "transition-colors duration-500 motion-reduce:transition-none",
            reduced || i === litClause ? "font-semibold text-brand" : "text-fog",
          )}
        >
          {clause}
        </span>,
      );
      rest = rest.slice(k + clause.length);
    });
    parts.push(<Fragment key="tail">{rest}</Fragment>);
    return parts;
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="font-display text-[clamp(1.3rem,2.7vw,2.15rem)] font-extrabold uppercase leading-[1.1] text-brand">
              {statement}
            </p>
          }
          className="mb-14"
        />
      </Container>

      {/* The track. Its height is the scroll the circuit is read over; the
          composition inside it holds while the click travels. */}
      <div ref={trackRef} className="relative lg:h-[300vh]">
        {/* Full viewport height and centred. Held at top-24 the composition was
            520px in a 900px viewport, so it sat against the header with a third
            of the screen empty beneath it. */}
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14">
              {/* ------------------------------------------- the circuit --- */}
              <div className="relative">
                <svg
                  viewBox="0 0 520 300"
                  className="h-auto w-full"
                  role="img"
                  aria-label={statement}
                >
                  {/* The account's own territory: everything bidding reaches. */}
                  <rect
                    x="8"
                    y="34"
                    width="188"
                    height="150"
                    rx="12"
                    className="fill-none stroke-line"
                    strokeWidth="1"
                  />
                  {/* The page: everything it cannot. */}
                  <rect
                    x="256"
                    y="34"
                    width="256"
                    height="150"
                    rx="12"
                    className="fill-none stroke-line"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />

                  {/* The line the click crosses and the account does not. */}
                  <line
                    x1="226"
                    y1="14"
                    x2="226"
                    y2="286"
                    className="stroke-brand/50"
                    strokeWidth="1"
                    strokeDasharray="5 5"
                  />

                  {/* The circuit itself: out along the top, back along the
                      bottom. One closed path, because the result of the page
                      decides the price of the next click. */}
                  <path
                    id="gads-circuit"
                    d="M64 109 H196 Q226 109 256 109 H452 Q492 109 492 149 V219 Q492 259 452 259 H104 Q64 259 64 219 V139 Q64 109 64 109 Z"
                    className="fill-none stroke-line"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M64 109 H196 Q226 109 256 109 H452 Q492 109 492 149 V219 Q492 259 452 259 H104 Q64 259 64 219 V139 Q64 109 64 109 Z"
                    className="fill-none stroke-brand"
                    strokeWidth="1.5"
                    pathLength={100}
                    strokeDasharray="100"
                    style={{
                      strokeDashoffset: reduced ? 0 : 100 - ((at + 1) / STOPS.length) * 100,
                      transition: reduced ? undefined : "stroke-dashoffset 600ms ease-out",
                    }}
                  />

                  {/* The query that starts it. */}
                  <g style={{ opacity: reduced || at >= 0 ? 1 : 0.35 }}>
                    <rect x="24" y="60" width="150" height="26" rx="13" className="fill-ink-3 stroke-line" strokeWidth="1" />
                    <circle cx="42" cy="73" r="5" className="fill-none stroke-brand" strokeWidth="1.6" />
                    <line x1="46" y1="77" x2="51" y2="82" className="stroke-brand" strokeWidth="1.6" strokeLinecap="round" />
                    <rect x="58" y="69" width="82" height="7" rx="3.5" className="fill-fog/30" />
                  </g>

                  {/* The auction: three inputs, one price. */}
                  <g style={{ opacity: reduced || at >= 1 ? 1 : 0.3 }}>
                    {[0, 1, 2].map((k) => (
                      <Fragment key={k}>
                        <line
                          x1="30"
                          y1={132 + k * 15}
                          x2={k === 2 ? "104" : "150"}
                          y2={132 + k * 15}
                          className={k === 2 ? "stroke-brand/50" : "stroke-ash/50"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="24"
                          cy={132 + k * 15}
                          r="3"
                          className={k === 2 ? "fill-brand" : "fill-line"}
                        />
                      </Fragment>
                    ))}
                    <rect x="24" y="170" width="150" height="6" rx="3" className="fill-line/60" />
                    <rect x="24" y="170" width="112" height="6" rx="3" className="fill-brand" />
                  </g>

                  {/* The five gates on the page. Unlabelled: the client's
                      sentence beside the drawing names them. */}
                  {[0, 1, 2, 3, 4].map((k) => {
                    const x = 286 + k * 46;
                    const active = !reduced && litClause === k && at >= 1;
                    return (
                      <g key={k} style={{ opacity: onPage || active ? 1 : 0.35 }}>
                        <line
                          x1={x}
                          y1="58"
                          x2={x}
                          y2="160"
                          className={active ? "stroke-brand" : "stroke-line"}
                          strokeWidth={active ? 2 : 1}
                          strokeDasharray={active ? undefined : "3 4"}
                          style={{ transition: reduced ? undefined : "stroke-width 300ms ease-out" }}
                        />
                        <circle
                          cx={x}
                          cy="109"
                          r={active ? 5.5 : 4}
                          className={active ? "fill-brand" : "fill-ink-3 stroke-line"}
                          strokeWidth="1.4"
                          style={{ transition: reduced ? undefined : "r 300ms ease-out" }}
                        />
                      </g>
                    );
                  })}

                  {/* The action at the end of the page, if it is reached. */}
                  <g style={{ opacity: reduced || at >= 4 ? 1 : 0.3 }}>
                    <rect
                      x="452"
                      y="94"
                      width="46"
                      height="30"
                      rx="15"
                      className={reduced || at >= 4 ? "fill-brand" : "fill-none stroke-line"}
                      strokeWidth="1.4"
                    />
                  </g>

                  {/* The return leg: what the page did sets the next price. */}
                  <g style={{ opacity: reduced || at >= 5 ? 1 : 0.25 }}>
                    <rect x="150" y="246" width="220" height="26" rx="6" className="fill-ink-2 stroke-line" strokeWidth="1" />
                    <rect x="160" y="256" width="120" height="6" rx="3" className="fill-brand" />
                    <path
                      d="M300 259 l-8 -5 v10 z"
                      className="fill-brand"
                    />
                  </g>

                  {/* The click itself, moved from stop to stop. */}
                  <circle
                    r="5.5"
                    cx="0"
                    cy="0"
                    className="fill-brand"
                    style={{
                      transform: `translate(${STOP_AT[at][0]}px, ${STOP_AT[at][1]}px)`,
                      transition: reduced ? undefined : "transform 700ms cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </svg>
              </div>

              {/* ------------------------------------------- the caption --- */}
              <div>
                {/* The client's sentence, whole and once. The clause the click
                    has reached lights; nothing is printed a second time. */}
                <p className="text-base leading-relaxed text-fog sm:text-lg">{captioned()}</p>

                <div className="mt-8 border-t border-line pt-7">
                  <p className="font-display text-sm font-extrabold uppercase tracking-wide text-snow">
                    {auctionLead}
                  </p>
                  <ol className="mt-4">
                    {auction.map((factor, i) => (
                      <li
                        key={factor}
                        className="flex items-baseline gap-3.5 border-b border-line py-3 last:border-b-0"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "font-display shrink-0 text-[0.6rem] font-bold tabular-nums",
                            i === auction.length - 1 ? "text-brand-text" : "text-ash",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "text-sm leading-relaxed",
                            i === auction.length - 1 ? "text-snow" : "text-fog",
                          )}
                        >
                          {factor}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p className="font-display mt-6 text-[clamp(1rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.2] text-brand">
                    {auctionTail}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-ash">{source}</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* The conversation the document says it has early. */}
      <Container>
        <Rise delay={0.1} className="mt-14">
          <p className="max-w-4xl border-l-2 border-brand pl-6 leading-relaxed text-fog sm:pl-8 sm:text-lg">
            <Marked text={conversation} mark={conversationMark} className="font-semibold text-snow" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}
