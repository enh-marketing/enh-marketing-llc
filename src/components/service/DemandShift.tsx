"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { useEnhanced } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

/** Six statements, and one picture that is assembled out of them.
 *
 *  WHY NOT A LIST. Every one of the six describes something MOVING — customers
 *  moving from offline discovery to online research, retailers connecting two
 *  channels, businesses reaching further markets, three advertising channels
 *  acting at several points. Six bullets can state that; nothing about six
 *  bullets can show it, and a run of numbered rules with copy beside them is
 *  the shape this site has already rejected repeatedly.
 *
 *  SO THE SECTION DRAWS THE MARKET AND BUILDS IT AS YOU READ. The picture
 *  starts as a shop and a screen with nothing between them, and each statement
 *  adds the one element it describes:
 *
 *    1  the stream leaving the shop for the screen
 *    2  the category structure and the product information inside the screen
 *    3  the return path, and a quantity that repeats
 *    4  the two-way link back to the physical store
 *    5  markets further out than the one the shop stands in
 *    6  three channels attaching along the journey rather than at its end
 *
 *  By the sixth the reader is looking at the whole shift in one frame, and every
 *  part of it arrived attached to the sentence that justifies it.
 *
 *  NOTHING IS LABELLED ON THE DRAWING. The statements are the legend, printed
 *  once, beside it.
 *
 *  HOW IT ADVANCES. One IntersectionObserver over a thin band across the middle
 *  of the viewport; whichever statement is crossing it is the one in play, and
 *  the picture holds every element up to that point. Scrolling back takes them
 *  away again, so the section can be read in either direction. No pin: pinning
 *  would take the scroll away from the reader for a full viewport to buy an
 *  effect this does not need.
 *
 *  BELOW THE LARGE BREAKPOINT the picture is not sticky and is rendered
 *  complete, above a plain list. A 460-unit diagram assembling itself beside a
 *  column too narrow to hold it is worse than the finished drawing. */

/** Which statement each element of the picture belongs to. */
const STAGE = { STREAM: 0, STRUCTURE: 1, REPEAT: 2, LINK: 3, REACH: 4, CHANNELS: 5 };

/** The stream the shop's demand leaves along, and the three points the channels
 *  attach to it. Hand-written literals rather than computed points: a coordinate
 *  produced by trig has to be rounded before it reaches JSX or the server and
 *  the browser can disagree on its last digit, and this page is one island. */
const STREAM = "M84 318 C84 250 130 200 232 172";

const CHANNELS = [
  { x: 132, y: 274, stub: "M132 285 L90 292" },
  { x: 172, y: 228, stub: "M172 239 L98 244" },
  { x: 200, y: 184, stub: "M200 195 L152 200" },
];

export function DemandShift({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  intro,
  items,
  tail,
  tailMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  /** The clause that introduces the six, which ends in a colon in the source. */
  intro: string;
  items: string[];
  tail: string;
  tailMark: string;
}) {
  const enhanced = useEnhanced("(min-width: 1024px)");
  /* Starts on the first statement, not before it. At -1 the picture is a shop
     and a screen with nothing between them, which is a coherent frame but
     reads as an unfinished one for as long as it takes the reader to scroll the
     heading past the reading line. */
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!enhanced) return;
    const live = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.i);
          if (e.isIntersecting) live.add(i);
          else live.delete(i);
        }
        // The furthest statement currently crossing the band. Nothing crossing
        // it means the reader is between two, so the last one holds.
        if (live.size) setActive(Math.max(...live));
      },
      // A thin band across the middle of the viewport: the reading line.
      { rootMargin: "-46% 0px -46% 0px", threshold: 0 },
    );
    for (const row of rows.current) if (row) io.observe(row);
    return () => io.disconnect();
  }, [enhanced]);

  /** Complete where the picture is not being driven — small screens, and before
   *  the first statement has reached the band. */
  const shown = (s: number) => !enhanced || s <= active;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-14"
        />

        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* ---- The picture ---- */}
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-5 sm:p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                  maskImage: "radial-gradient(ellipse at 30% 20%, black, transparent 74%)",
                }}
              />

              <svg viewBox="0 0 460 470" fill="none" aria-hidden className="relative block w-full">
                {/* ------------------------------------- always present ---- */}
                {/* The shop it starts in. */}
                <g stroke="var(--color-line)" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="28" y="318" width="112" height="120" rx="8" />
                  <path d="M40 346 H128" />
                  <path d="M40 372 H128" />
                  <path d="M40 398 H128" />
                  <rect x="72" y="410" width="24" height="28" rx="3" />
                </g>

                {/* The screen it is moving to. */}
                <g stroke="var(--color-line)" strokeWidth="1.5">
                  <rect x="232" y="52" width="196" height="152" rx="10" />
                  <path d="M232 76 H428" />
                </g>
                <g className="fill-line">
                  <circle cx="246" cy="64" r="3" />
                  <circle cx="258" cy="64" r="3" />
                  <circle cx="270" cy="64" r="3" />
                </g>

                {/* ---- 5. Markets further out. Drawn first so everything
                        else sits over it. ---- */}
                <g
                  className={cn("shift-part", shown(STAGE.REACH) && "shift-on")}
                  style={{ transitionDelay: "40ms" }}
                >
                  <path
                    d="M232 96 C190 56 128 40 40 58"
                    stroke="var(--color-line)"
                    strokeWidth="1.5"
                    strokeDasharray="5 6"
                    strokeLinecap="round"
                  />
                  <circle cx="40" cy="58" r="10" stroke="var(--color-brand)" strokeWidth="1.5" />
                  <circle cx="40" cy="58" r="3" className="fill-brand" />
                  <circle cx="128" cy="42" r="8" stroke="var(--color-brand)" strokeWidth="1.5" />
                  <circle cx="128" cy="42" r="2.5" className="fill-brand/70" />
                  <circle cx="190" cy="58" r="6" stroke="var(--color-brand)" strokeWidth="1.5" />
                  <circle cx="190" cy="58" r="2" className="fill-brand/50" />
                </g>

                {/* ---- 1. The stream out of the shop. ---- */}
                <g className={cn("shift-part", shown(STAGE.STREAM) && "shift-on")}>
                  <path
                    d={STREAM}
                    stroke="var(--color-line)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d={STREAM}
                    pathLength="100"
                    stroke="var(--color-brand)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className={shown(STAGE.STREAM) ? "shift-stream" : undefined}
                  />
                </g>

                {/* ---- 2. Category structure, and the information on it. ---- */}
                <g className={cn("shift-part", shown(STAGE.STRUCTURE) && "shift-on")}>
                  <rect x="246" y="88" width="18" height="12" rx="3" className="fill-brand" />
                  <g stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M255 100 V164" />
                    <path d="M255 112 H278" />
                    <path d="M255 138 H278" />
                    <path d="M255 164 H278" />
                  </g>
                  {[105, 131, 157].map((y) => (
                    <g key={y}>
                      <rect
                        x="278"
                        y={y}
                        width="46"
                        height="14"
                        rx="4"
                        className="fill-brand/18"
                        stroke="var(--color-brand)"
                        strokeWidth="1"
                      />
                      <rect x="334" y={y + 3} width="70" height="4" rx="2" className="fill-snow/30" />
                      <rect x="334" y={y + 11} width="44" height="4" rx="2" className="fill-snow/18" />
                    </g>
                  ))}
                </g>

                {/* ---- 3. The return path, and a quantity that repeats. ---- */}
                <g className={cn("shift-part", shown(STAGE.REPEAT) && "shift-on")}>
                  <path
                    d="M420 204 C448 216 446 250 408 250 L300 250 C272 250 268 226 274 212"
                    stroke="var(--color-line)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M420 204 C448 216 446 250 408 250 L300 250 C272 250 268 226 274 212"
                    pathLength="100"
                    stroke="var(--color-brand)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={shown(STAGE.REPEAT) ? "shift-return" : undefined}
                  />
                  <g stroke="var(--color-brand)" strokeWidth="1.5">
                    <rect x="336" y="270" width="30" height="10" rx="3" className="fill-brand/10" />
                    <rect x="341" y="264" width="30" height="10" rx="3" className="fill-brand/16" />
                    <rect x="346" y="258" width="30" height="10" rx="3" className="fill-brand/22" />
                  </g>
                </g>

                {/* ---- 4. The physical store, wired to the online one. ---- */}
                <g className={cn("shift-part", shown(STAGE.LINK) && "shift-on")}>
                  <path
                    d="M140 424 H370 C388 424 398 412 398 392 V212"
                    stroke="var(--color-brand)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="6 5"
                  />
                  {/* Two-way, said with two chevrons rather than a word. */}
                  <g
                    stroke="var(--color-brand)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M238 417 L246 424 L238 431" />
                    <path d="M296 431 L288 424 L296 417" />
                  </g>
                </g>

                {/* ---- 6. Three channels, acting along the journey. The
                        class sits on each mark rather than on the set, which is
                        what lets the three arrive in sequence. ---- */}
                <g>
                  {CHANNELS.map((ch, i) => (
                    <g
                      key={ch.stub}
                      className={cn("shift-part", shown(STAGE.CHANNELS) && "shift-on")}
                      style={{ transitionDelay: `${i * 90}ms` }}
                    >
                      <path
                        d={ch.stub}
                        stroke="var(--color-line)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <rect
                        x={ch.x - 11}
                        y={ch.y - 11}
                        width="22"
                        height="22"
                        rx="6"
                        className="fill-void"
                        stroke="var(--color-brand)"
                        strokeWidth="1.5"
                      />
                      <rect
                        x={ch.x - 4}
                        y={ch.y - 4}
                        width="8"
                        height="8"
                        rx="2"
                        className="fill-brand"
                      />
                    </g>
                  ))}
                </g>
              </svg>
            </div>
          </div>

          {/* ---- The six statements ---- */}
          <div>
            <Rise>
              <p className="max-w-xl leading-relaxed text-fog sm:text-lg">{intro}</p>
            </Rise>

            <ol className="mt-8 border-t border-line">
              {items.map((item, i) => {
                const on = enhanced && i === active;
                const past = enhanced && i < active;
                return (
                  <li
                    key={item}
                    data-i={i}
                    ref={(el) => {
                      rows.current[i] = el;
                    }}
                    className="border-b border-line"
                  >
                    <div className="relative flex gap-5 py-9 pl-6 lg:py-11">
                      {/* The rule marks which statement the picture is on. */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-0 top-0 h-full w-[2px] origin-top transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                          on ? "scale-y-100 bg-brand" : past ? "scale-y-100 bg-brand/30" : "scale-y-0 bg-line",
                        )}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "font-display mt-1 shrink-0 text-[0.62rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                          on ? "text-brand-text" : "text-ash",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        className={cn(
                          "font-display text-[clamp(1.05rem,2vw,1.5rem)] font-extrabold uppercase leading-[1.16] transition-colors duration-500 motion-reduce:transition-none",
                          on || !enhanced ? "text-snow" : past ? "text-fog" : "text-ash",
                        )}
                      >
                        {item}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <Rise delay={0.1} className="mt-10">
              <p className="max-w-xl border-l-2 border-brand pl-6 leading-relaxed text-fog sm:text-lg">
                <Marked text={tail} mark={tailMark} className="font-semibold text-snow" />
              </p>
            </Rise>
          </div>
        </div>
      </Container>
    </section>
  );
}
