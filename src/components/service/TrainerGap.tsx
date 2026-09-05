"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

const EASE = [0.16, 1, 0.3, 1] as const;
/** Where the explaining ends and the implementing would have begun. Both runs
 *  are measured against the same point so the extra distance is the only thing
 *  the section claims. */
const STOP = 0.54;

/** The difference the section claims, drawn as how far each one gets.
 *
 *  THE DOCUMENT DRAWS THIS ITSELF. "They may explain the tools clearly, but the
 *  programme often ends with recommendations that the trainer cannot implement."
 *  That is a track with a buffer on it. And the reply is not that ENH explains
 *  better, it is that the same track keeps going: "our team can assess the
 *  technical requirements and build the solution." So the section is two runs of
 *  unequal length and the whole argument is the length.
 *
 *  WHY THEY ARE CHANNELS AND NOT HAIRLINES. The first version drew two 2px rules
 *  and set the labels beside them. It was accurate and weightless. A track you
 *  can see something moving along, with a buffer at the end of one and no right
 *  edge at all on the other, is the same claim with a body: the second run
 *  leaves the container, which is the point.
 *
 *  NO ONE IS DISPARAGED. The upper run is neutral and stops at a plain buffer,
 *  not a cross or a warning. The document says these courses "may explain the
 *  tools clearly", so the run reaches its point intact and simply ends. The four
 *  things the lower run continues into are the document's own four. */
export function TrainerGap({
  id,
  label,
  index,
  title,
  strokeTitle,
  trainer,
  ours,
  closing,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  trainer: { label: string; body: string; stop: string };
  ours: { label: string; body: string; work: string[] };
  closing: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const show = inView || reduced;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "contrast", label: "One run stops, one continues" }}
          className="mb-12"
        />

        <div ref={ref} className="space-y-14">
          {/* ── the run that stops ─────────────────────────────────────── */}
          <div>
            <Head name={trainer.label} tone="ash" />
            {/* Drawn at every width. The comparison is the section, and hiding
                it below lg left a phone with two paragraphs and no argument. */}
            <div className="relative mt-5 h-12 sm:h-16" aria-hidden>
              <Channel reach={STOP} tone="ash" show={show} reduced={reduced} delay={0} />
              <motion.span
                className="absolute top-0 h-12 w-1 bg-ash sm:h-16"
                style={{ left: `calc(${STOP * 100}% - 2px)` }}
                initial={reduced ? false : { scaleY: 0 }}
                animate={show ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.85 }}
              />
              {/* On a wide screen the clause labels the buffer where it stands.
                  On a phone there is no room beside it, so it sits under the
                  track instead, still as the thing the run ends on. */}
              <motion.p
                className="font-display absolute top-1/2 hidden max-w-[30ch] -translate-y-1/2 pl-6 text-[0.9375rem] font-bold uppercase leading-tight text-ash lg:block"
                style={{ left: `${STOP * 100}%` }}
                initial={reduced ? false : { opacity: 0 }}
                animate={show ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 1 }}
              >
                {trainer.stop}
              </motion.p>
            </div>
            <p className="font-display mt-4 max-w-[34ch] text-[0.9375rem] font-bold uppercase leading-tight text-ash lg:hidden">
              {trainer.stop}
            </p>
            <p className="mt-6 max-w-[68ch] text-base leading-relaxed text-fog sm:text-lg">
              {trainer.body}
            </p>
          </div>

          {/* ── the run that keeps going ───────────────────────────────── */}
          <div>
            <Head name={ours.label} tone="brand" />
            {/* Bleeds past the container on purpose: this one does not end
                where the page does. */}
            <div
              aria-hidden
              className="relative mt-5 h-12 sm:h-16"
              style={{ marginRight: "calc((100vw - 100%) / -2)" }}
            >
              <Channel reach={1} tone="brand" show={show} reduced={reduced} delay={0.45} />
              {ours.work.map((w, i) => {
                const at = STOP + ((1 - STOP) * (i + 0.5)) / ours.work.length;
                return (
                  <motion.span
                    key={w}
                    className="absolute top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                    style={{ left: `${at * 88}%` }}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.45, ease: EASE, delay: 1.05 + i * 0.09 }}
                  >
                    <span className="font-display block max-w-[13ch] cursor-default rounded-md bg-void/70 px-2 py-1 text-center text-[0.6875rem] font-bold uppercase leading-[1.25] text-snow transition-colors duration-300 hover:text-brand-text motion-reduce:transition-none">
                      {w}
                    </span>
                  </motion.span>
                );
              })}
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 lg:hidden">
              {ours.work.map((w) => (
                <li
                  key={w}
                  className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-snow transition-colors duration-300 hover:text-brand-text motion-reduce:transition-none"
                >
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[68ch] text-base leading-relaxed text-fog sm:text-lg">
              {ours.body}
            </p>
          </div>
        </div>

        <Rise delay={0.1} className="mt-14 border-t-2 border-line pt-8">
          <p className="max-w-[74ch] text-base leading-relaxed text-fog sm:text-lg">{closing}</p>
        </Rise>
      </Container>
    </section>
  );
}

function Head({ name, tone }: { name: string; tone: "ash" | "brand" }) {
  return (
    <p
      className={`font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${
        tone === "brand" ? "text-brand-text" : "text-ash"
      }`}
    >
      {name}
    </p>
  );
}

/** A run: a channel with two rails, and something moving along inside it. */
function Channel({
  reach,
  tone,
  show,
  reduced,
  delay,
}: {
  reach: number;
  tone: "ash" | "brand";
  show: boolean;
  reduced: boolean;
  delay: number;
}) {
  const rail = tone === "brand" ? "var(--color-brand)" : "var(--color-ash)";
  return (
    <>
      {/* The full extent, faint, so the shortfall is visible rather than merely
          absent. */}
      <span className="absolute inset-y-0 left-0 right-0 border-y border-line" />
      <motion.div
        className="absolute inset-y-0 left-0 origin-left overflow-hidden bg-ink-2"
        style={{ width: `${reach * 100}%`, borderTop: `2px solid ${rail}`, borderBottom: `2px solid ${rail}` }}
        initial={reduced ? false : { scaleX: 0 }}
        animate={show ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {/* Something travelling the track. ci-flow's dash is 14% of the path,
            which at this width reads as a loading bar rather than as a thing in
            motion, so this is a block on ci-scan-x instead: its travel is in
            user units, so a 200-wide stretched viewBox spans the channel
            whatever the container does. */}
        <svg
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <rect className="ci-scan-x" x="-14" y="0" width="14" height="20" fill={rail} fillOpacity="0.14" />
          <rect className="ci-scan-x" x="-2" y="0" width="2" height="20" fill={rail} fillOpacity="0.7" />
        </svg>
      </motion.div>
    </>
  );
}
