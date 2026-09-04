"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The closing sentence, drawn.
 *
 *  THE SENTENCE IS A PICTURE ALREADY: "SEO helps prospective customers find
 *  your business when they search for the services, products or information you
 *  provide." Many people, each searching for something slightly different, all
 *  arriving at one business. Three earlier versions of this section set that as
 *  large type over an empty band and hoped the reader would supply the image.
 *  This one draws it: a field of separate searches, a line from every one of
 *  them, and a single business at the point they meet.
 *
 *  IT IS THE ONLY THING ON THE PAGE THAT RUNS ON ITS OWN. Everything above it
 *  waits to be scrolled at or pointed at. The closing does not: packets travel
 *  the inbound lines and the business pulses continuously, so the last thing on
 *  the page before the form is alive rather than parked. That is a deliberate
 *  contrast with the process section directly above, which the reader drives
 *  frame by frame.
 *
 *  NOTHING IS COUNTED AND NO ONE IS NAMED. Twenty-six marks is a texture, not
 *  an audience size; no query is written out, no competitor appears, no
 *  position is plotted. This document states no figures and its own FAQ
 *  position is that a ranking cannot be promised.
 *
 *  THE COMPOSITION IS CENTRED, and it is the only centred section on the page.
 *  Everything else runs off the container's left margin. A finale that sits on
 *  the same axis as the twelve sections before it is not a finale.
 *
 *  PARAGRAPHS ARE CARRIED WHOLE. An earlier version split them at their commas
 *  into named threes; a closing argument is the one place where the sentences
 *  should be left exactly as written.
 *
 *  MOTION SAFETY. Every animated element is wordless: the packets, the rings
 *  and the marks. The type moves on transform alone and rests visible, so a
 *  stopped clock leaves the whole argument readable and the drawing complete
 *  minus its travel. See globals.css, "Closing beacon". */

/** The field. Positions are a deterministic function of the index so the server
 *  and the browser draw the same picture, and they mean nothing beyond spread. */
const MARKS = Array.from({ length: 26 }, (_, i) => ({
  x: 62 + i * 42.5,
  y: 40 + ((i * 53) % 132),
  w: 9 + ((i * 7) % 4) * 3,
}));

/** Which of them are being answered right now. */
const LIVE = [2, 6, 11, 15, 20, 24];

export function ClosingBeacon({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  body,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  leadMark: string;
  body: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const play = reduced || inView;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip pt-14 sm:pt-16">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-12" />
      </Container>

      {/* Edge to edge, on its own ground, and centred. */}
      <div className="relative border-y border-line bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] py-16 sm:py-20">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(110% 100% at 50% 0%, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(110% 100% at 50% 0%, black, transparent 80%)",
          }}
        />

        <Container className="relative">
          <div ref={ref}>
            <motion.p
              initial={reduced ? false : { y: 26 }}
              animate={play ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display mx-auto max-w-[22ch] text-center statement font-extrabold uppercase leading-[1.02] text-snow sm:max-w-[26ch]"
            >
              <Marked text={lead} mark={leadMark} />
            </motion.p>

            {/* Many searches, one business. */}
            <div aria-hidden className="relative mx-auto mt-12 w-full max-w-[1200px] sm:mt-16">
              <svg viewBox="0 0 1200 330" className="h-[190px] w-full sm:h-[300px]" fill="none">
                {/* Every search runs to the same place. */}
                {MARKS.map((m, i) => (
                  <motion.path
                    key={`l${i}`}
                    d={`M${m.x + m.w / 2} ${m.y + 7}L600 292`}
                    stroke="var(--color-brand)"
                    strokeWidth="1"
                    initial={reduced ? false : { opacity: 0 }}
                    animate={play ? { opacity: LIVE.includes(i) ? 0.3 : 0.14 } : {}}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.02, ease: EASE }}
                  />
                ))}

                {/* The ones being answered as you read. */}
                {LIVE.map((i, k) => (
                  <path
                    key={`s${i}`}
                    className="cb-signal"
                    d={`M${MARKS[i].x + MARKS[i].w / 2} ${MARKS[i].y + 7}L600 292`}
                    pathLength={100}
                    stroke="var(--color-brand)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ animationDelay: `${k * 430}ms` }}
                  />
                ))}

                {/* The searches themselves. Nothing is written in them, because
                    nobody's search is ours to put words into. */}
                {MARKS.map((m, i) => (
                  <motion.g
                    key={`m${i}`}
                    initial={reduced ? false : { opacity: 0, y: -8 }}
                    animate={play ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.02, ease: EASE }}
                  >
                    <rect
                      x={m.x}
                      y={m.y}
                      width={m.w}
                      height="14"
                      rx="7"
                      fill={LIVE.includes(i) ? "color-mix(in srgb, var(--color-brand) 16%, transparent)" : "none"}
                      stroke="var(--color-brand)"
                      strokeOpacity={LIVE.includes(i) ? 0.75 : 0.35}
                      strokeWidth="1.2"
                    />
                  </motion.g>
                ))}

                {/* The ground it stands on. */}
                <path d="M0 292h1200" stroke="var(--color-line)" strokeWidth="1" />

                {/* And the business they all arrive at. */}
                <circle className="cb-ring" cx="600" cy="292" r="54" stroke="var(--color-brand)" strokeWidth="1.4" />
                <circle
                  className="cb-ring"
                  cx="600"
                  cy="292"
                  r="54"
                  stroke="var(--color-brand)"
                  strokeWidth="1.4"
                  style={{ animationDelay: "1100ms" }}
                />
                <circle
                  className="cb-ring"
                  cx="600"
                  cy="292"
                  r="54"
                  stroke="var(--color-brand)"
                  strokeWidth="1.4"
                  style={{ animationDelay: "2200ms" }}
                />
                <circle cx="600" cy="292" r="19" fill="var(--color-brand)" />
                <path
                  d="M592 292l6 6 11-12"
                  stroke="var(--color-ink-3)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* What that takes, and what it changes. Whole, and in order. */}
            <div className="mx-auto mt-14 grid max-w-5xl gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-14">
              {body.map((para, i) => (
                <motion.p
                  key={para}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={play ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.12, ease: EASE }}
                  className="border-t-2 border-brand/40 pt-6 text-[clamp(1rem,1.8vw,1.15rem)] leading-relaxed text-fog lg:border-t-0 lg:border-l-2 lg:pl-7 lg:pt-0"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
