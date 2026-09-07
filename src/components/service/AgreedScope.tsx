"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** The agreed scope, drawn as the line it draws.
 *
 *  WHY THE OTHER THREE FAILED. A boxed list, a four-column index, a run-on wall
 *  of type, and then a twelve-cell band: four attempts, and every one of them
 *  was an arrangement of the same twelve strings. The section never had an
 *  object in it. This one is an object first.
 *
 *  A SCOPE IS A LINE, AND THE DOCUMENT DRAWS ITS OWN EDGE. Eleven of the twelve
 *  are things the proposal settles. The twelfth is "Work that requires a
 *  separate scope" -- the agreement naming its own limit. So there is one
 *  continuous line running the length of the run with a station on it for each
 *  clause, the line is unbroken through eleven of them, and before the twelfth
 *  it breaks and dashes out. Station twelve stands past the break, outside the
 *  boundary, marked with an arrow leaving rather than a node on the line. The
 *  best thing in this content is that the agreement states where it stops, and
 *  it is now the one moment the drawing builds to.
 *
 *  IT IS ONE OBJECT, NOT TWELVE CARDS. The stations carry no border, no plate
 *  and no fill. Each is a node on the shared line with its clause hung beneath
 *  it on a drop leader, the way a station sits on a survey line. The segments
 *  butt edge to edge with no gap, so the line is continuous across the whole
 *  travel rather than twelve rules that happen to align.
 *
 *  TRAVERSED, NOT SCROLLED PAST. The section holds while the line travels
 *  sideways, so reading the scope means moving along it: this is the run the
 *  rest of the site uses for its strongest sections, and it is the right
 *  mechanism here because the content genuinely is a sequence along a boundary.
 *  Whichever station is nearest the middle is lit and the rest recede, so there
 *  is always exactly one thing being read.
 *
 *  DEGRADES HONESTLY. Pinned only where there is width and motion is welcome.
 *  Everywhere else the rail keeps its own scrollbar and snap points, so the
 *  line is still traversed left to right, by thumb instead of by scroll. The
 *  idea survives; only the mechanics change.
 *
 *  READS AT REST. The line, every node, the break, the arrow and the closing
 *  rule are all drawn before anything moves, and brand is on the page whether
 *  or not a single transition runs. Nothing is behind an interaction. */

/** Where the line sits inside a station, and how tall a station is. */
const LINE_TOP = "9.5rem";

export function AgreedScope({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  listLead,
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
  listLead: string;
  items: string[];
  tail: string;
  /** The three parties the closing sentence names, marked inside it. */
  tailMark: string[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const last = items.length - 1;

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { pinned: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (!ctx.conditions?.pinned) return;
        const el = root.current;
        const rail = track.current;
        if (!el || !rail) return;

        // Only stop being a native scroller once the pin is really installed.
        // Under reduced motion this branch never runs and the rail keeps its
        // own scrollbar instead of overflowing the page.
        rail.style.overflow = "visible";

        // Travel far enough that the last station lands in the middle of the
        // viewport, then release. Measured from the station itself so it stays
        // correct at any width.
        const distance = () => {
          const stations = rail.querySelectorAll<HTMLElement>(":scope > div");
          const end = stations[stations.length - 1];
          if (!end) return 0;
          return Math.max(0, end.offsetLeft + end.offsetWidth / 2 - el.clientWidth / 2);
        };

        const stations = gsap.utils.toArray<HTMLElement>(":scope > div", rail);

        // Whichever station is nearest the middle is the one being read.
        // Written straight to style: a dozen direct writes a frame is cheap,
        // and the "scale" quickSetter silently no-ops without a primed cache.
        const focus = () => {
          const mid = window.innerWidth / 2;
          for (const s of stations) {
            const r = s.getBoundingClientRect();
            const offset = Math.abs(r.left + r.width / 2 - mid) / mid;
            const t = gsap.utils.clamp(0, 1, offset);
            s.style.opacity = gsap.utils.interpolate(1, 0.32, t).toFixed(3);
            const node = s.querySelector<HTMLElement>("[data-node]");
            if (node) node.style.transform = `scale(${gsap.utils.interpolate(1.5, 1, t).toFixed(3)})`;
          }
        };

        const tween = gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            pin: true,
            scrub: 0.8,
            start: "center center",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onRefresh: focus,
            onUpdate: (self) => {
              focus();
              if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          rail.style.overflow = "";
          for (const s of stations) {
            s.style.opacity = "";
            s.style.transform = "";
          }
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-12"
        />
        {/* The document's own lead-in, doing a kicker's job. */}
        <Rise>
          <p className="font-display mb-10 text-[0.62rem] font-semibold uppercase tracking-wide text-brand-text">
            {listLead}
          </p>
        </Rise>
      </Container>

      {/* --------------------------------------------------------- the run */}
      <div ref={root} className="relative">
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto px-6 sm:px-10 lg:px-[calc((100vw-1320px)/2+2.5rem)]"
        >
          {items.map((text, i) => {
            const out = i === last;
            /* The segment approaching the twelfth is the boundary running out:
               it is the only dashed one, and it is where the scope ends. */
            const breaking = i === last - 1;
            return (
              <div
                key={text}
                className="relative h-[22rem] w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-[22rem]"
              >
                {/* This station's length of the line. Segments butt edge to
                    edge, so the twelve read as one boundary. */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute left-0 right-0",
                    breaking
                      ? "border-t border-dashed border-brand/70"
                      : out
                        ? "border-t border-dashed border-brand/30"
                        : "h-px bg-line",
                  )}
                  style={{ top: LINE_TOP }}
                />

                {/* The node, or the way out. */}
                <span
                  aria-hidden
                  data-node
                  className="absolute left-1/2 z-10 -translate-x-1/2"
                  style={{ top: `calc(${LINE_TOP} - 0.4375rem)` }}
                >
                  {out ? (
                    <svg viewBox="0 0 30 14" className="h-3.5 w-[1.875rem] text-brand" fill="none">
                      <path d="M0 7h18" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                      <path
                        d="M18 2l6 5-6 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span className="block h-3.5 w-3.5 rounded-full border-2 border-brand bg-ink-3" />
                  )}
                </span>

                {/* The drop leader, and the clause hanging from it. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-1/2 w-px",
                    out ? "bg-brand/40" : "bg-line",
                  )}
                  style={{ top: `calc(${LINE_TOP} + 0.5rem)`, height: "2.25rem" }}
                />

                <div
                  className="absolute left-1/2 w-[86%] -translate-x-1/2 text-center"
                  style={{ top: `calc(${LINE_TOP} + 3.25rem)` }}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "font-display block text-[0.62rem] font-bold tabular-nums",
                      out ? "text-brand-text" : "text-ash",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={cn(
                      "font-display mt-3 text-[clamp(1.1rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.2]",
                      out ? "text-brand" : "text-snow",
                    )}
                  >
                    {text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* How far along the boundary the reader is. */}
        <Container>
          <span aria-hidden className="mt-10 block h-px w-full overflow-hidden bg-line">
            <span ref={progress} className="block h-full w-full origin-left scale-x-0 bg-brand" />
          </span>
        </Container>
      </div>

      {/* The closing rule. Always on, always brand, the three named in place. */}
      <Container>
        <Rise delay={0.1} className="mt-10">
          <p className="font-display max-w-5xl text-[clamp(1.2rem,2.5vw,2rem)] font-extrabold uppercase leading-[1.12] text-brand">
            <Marked text={tail} mark={tailMark} className="text-snow" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}
