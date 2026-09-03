"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Modal } from "@/components/ui/Modal";
import { LeadForm, type FormField } from "@/components/service/LeadForm";
import { ArrowRight } from "@/components/ui/Button";

/** Mid-page CTA band.
 *
 *  Rebuilt around one idea rather than a layout: the type *is* the design.
 *  Earlier versions were the stock pattern — illustration parked on the left,
 *  copy and a button on the right — which is the most templated arrangement
 *  there is, and no amount of recolouring rescued it. Current practice argues
 *  for controlled maximalism: a single oversized headline instead of several
 *  competing elements, one accent colour, and imagery only where it reinforces
 *  rather than decorates. The climbing illustration was decoration, so it is
 *  gone and the headline carries the band alone.
 *
 *  What is left is deliberately three things: the question at display scale,
 *  one line of support, one button.
 *
 *  Surfaced on ink-2, and that choice is structural rather than taste. The
 *  page's automatic banding paints sections void or ink by odd/even position,
 *  so a band hard-coded to either tone matches its neighbours whenever the
 *  parity falls the wrong way — which is exactly what happened when this was
 *  void and it landed between two void sections, three identical tones in a
 *  row. ink-2 is the one surface the banding never assigns, so the band always
 *  separates wherever it is dropped in, and always lifts rather than recedes.
 *
 *  Motion is spent only where it moves someone toward the button: a field of
 *  dots that exists only around the pointer, and a button that leans into the
 *  cursor as it approaches. Both are pointer-driven, both collapse to a calm
 *  static state under reduced motion or with no pointer at all. */

/** How far the button leans toward the cursor, and the radius it reacts in. */
const PULL = 0.28;
const PULL_CAP = 12;

function MagneticCta({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 20, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 240, damping: 20, mass: 0.3 });

  const track = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-PULL_CAP, Math.min(PULL_CAP, dx * PULL)));
    y.set(Math.max(-PULL_CAP, Math.min(PULL_CAP, dy * PULL)));
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onPointerMove={track}
      onPointerLeave={release}
      /* ALWAYS THE MOTION VALUES, never a branch on `reduced`.
         Branching here produced a hydration mismatch on every page that mounts
         this band: the server has no media query, so it rendered the motion
         style and emitted transform:none, while a client that prefers reduced
         motion rendered no style at all, and React reported the attributes as
         unmatched. Passing them unconditionally is identical in behaviour,
         because `track` already returns early under reduced motion and both
         springs stay at zero, so the transform never leaves none. */
      style={{ x: sx, y: sy }}
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-brand px-9 py-4 text-center text-xs font-bold uppercase leading-tight text-white sm:text-sm"
    >
      {/* Fill sweep, behind the label. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-left scale-x-0 bg-brand-deep transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
      {label}
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
        <ArrowRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5" />
        <ArrowRight className="absolute -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
      </span>
    </motion.button>
  );
}

export function GrowthCta({
  id = "growth-cta",
  label = "Growth CTA",
  heading,
  support,
  button,
  formTitle,
  formFields,
  formSubmitLabel,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id?: string;
  label?: string;
  heading: [string, string];
  support: string;
  button: string;
  formTitle: string;
  formFields: FormField[];
  formSubmitLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /** Written straight to the element: the spotlight follows the pointer without
   *  a re-render per frame. */
  const move = (e: React.PointerEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const rest = () => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      data-section={label}
      onPointerMove={move}
      onPointerLeave={rest}
      className="relative overflow-hidden"
    >
      {/* Dots, revealed only around the pointer. */}
      <div aria-hidden className="dot-field spotlight-mask pointer-events-none absolute inset-0" />
      {/* The one accent wash. */}
      <div aria-hidden className="spotlight-warm pointer-events-none absolute inset-0" />

      <Container className="relative py-14 text-center sm:py-16">
        <Rise>
          <span aria-hidden className="mx-auto mb-6 block h-px w-14 bg-brand" />
        </Rise>

        {/* display-xl, matching every other H2 on the page. On display-2xl this
            heading came out larger than the section headings either side of it,
            so the band out-shouted the content instead of punctuating it. */}
        <h2 className="font-display display-xl mx-auto max-w-4xl font-extrabold uppercase text-snow">
          <span className="block">
            <Chars text={heading[0]} />
          </span>{" "}
          <span className="block text-brand">
            <Chars text={heading[1]} delay={0.12} />
          </span>
        </h2>

        <Rise delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-fog sm:text-lg">{support}</p>
        </Rise>

        <Rise delay={0.3} className="mt-8 flex justify-center">
          <MagneticCta label={button} onClick={() => setOpen(true)} />
        </Rise>
      </Container>

      <Modal open={open} onClose={() => setOpen(false)} title={formTitle}>
        <LeadForm fields={formFields} submitLabel={formSubmitLabel} />
      </Modal>
    </section>
  );
}
