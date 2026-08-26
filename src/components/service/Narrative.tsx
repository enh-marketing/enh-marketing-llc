"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** The bridge between the hero and the reasons.
 *
 *  Concept: the paragraph is DECODED. It arrives blurred and near-invisible,
 *  then resolves word by word as you scroll, with the six channel names lighting
 *  up as they clear. That enacts the copy's own promise — "reported clearly...
 *  without having to decode a media report" — so the interaction carries the
 *  message rather than decorating it.
 *
 *  Deliberately NOT pinned. Pinning would trap the scroll for a full viewport
 *  to buy a marginal effect; scrubbing across the section's own height gives the
 *  same cinematic resolve without taking the scroll away from the reader.
 *
 *  Blur is animated on the paragraph container (one element) while opacity
 *  staggers per word, rather than filtering sixty elements a frame. */
export function Narrative({
  id,
  label,
  headline,
  question,
  questionEmphasis,
  body,
  highlight,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  headline: [string, string];
  question: string;
  questionEmphasis: string;
  body: string;
  highlight: string[];
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const q = gsap.utils.selector(el);

      const headWords = q("[data-head] > span");
      const askWords = q("[data-ask]");
      const bodyWords = q("[data-body-word]");
      const veil = q("[data-veil]");
      const marks = q("[data-mark]");

      gsap.set(headWords, { yPercent: 112 });
      gsap.set(askWords, { opacity: 0.14 });
      gsap.set(bodyWords, { opacity: 0.08 });
      // Blur on a container holding ~50 word spans is the costly part of this
      // effect. Large screens only; small screens get the word-by-word decode
      // on its own, which tells the same story for a fraction of the work.
      const useBlur = window.matchMedia("(min-width: 1024px)").matches;
      if (useBlur) gsap.set(veil, { filter: "blur(7px)" });
      gsap.set(marks, { color: "var(--color-fog)" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 62%", scrub: 0.7 },
      });

      tl.to(headWords, { yPercent: 0, duration: 0.22, stagger: 0.012, ease: "power2.out" }, 0)
        .to(askWords, { opacity: 1, duration: 0.2, stagger: 0.02, ease: "none" }, 0.14);

      if (useBlur) {
        tl.to(veil, { filter: "blur(0px)", duration: 0.4, ease: "none" }, 0.3);
      }
      tl
        .to(bodyWords, { opacity: 1, duration: 0.32, stagger: 0.006, ease: "none" }, 0.3)
        .to(marks, { color: "var(--color-brand)", duration: 0.18, stagger: 0.03, ease: "none" }, 0.66);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([headWords, askWords, bodyWords, veil, marks], { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  // Words carry their own trailing space so selection and screen readers get
  // the sentence unchanged.
  const words = (text: string, attr: string, markable = false) =>
    text.split(" ").map((w, i) => {
      const bare = w.replace(/[^A-Za-z]/g, "");
      const isMark = markable && highlight.includes(bare);
      return (
        <Fragment key={i}>
          <span {...{ [attr]: "" }} className={cn("inline-block", isMark && "font-semibold")} data-mark={isMark ? "" : undefined}>
            {w}
          </span>{" "}
        </Fragment>
      );
    });

  return (
    <section
      id={id}
      data-section={label}
      ref={root}
      className="relative isolate overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            maskImage: "radial-gradient(ellipse at 30% 40%, black, transparent 78%)",
          }}
        />
        <div className="aurora-b absolute right-[-6%] top-[12%] h-[34vw] w-[34vw] rounded-full bg-brand/[0.09] blur-[150px]" />
      </div>

      <Container>
        {/* The claim */}
        <h2 className="font-display display-xl max-w-4xl font-extrabold uppercase leading-[1.02]">
          <span className="block text-snow">
            {headline[0].split(" ").map((w, i) => (
              <span key={i} data-head className="inline-block overflow-hidden align-bottom">
                <span className="inline-block">{w}</span>
                {" "}
              </span>
            ))}
          </span>
          <span className="block text-brand">
            {headline[1].split(" ").map((w, i) => (
              <span key={i} data-head className="inline-block overflow-hidden align-bottom">
                <span className="inline-block">{w}</span>
                {" "}
              </span>
            ))}
          </span>
        </h2>

        {/* The question, offset right */}
        <p className="font-display mt-14 max-w-2xl text-[clamp(1.15rem,2.2vw,1.85rem)] font-bold leading-[1.3] text-snow lg:ml-auto lg:mr-0 lg:text-right">
          {question.split(new RegExp(`(${questionEmphasis})`)).map((part, i) =>
            part === questionEmphasis ? (
              <span key={i} className="text-brand">
                {words(part, "data-ask")}
              </span>
            ) : (
              <Fragment key={i}>{words(part, "data-ask")}</Fragment>
            ),
          )}
        </p>

        {/* The report, decoded */}
        <div
          data-veil
          className="mt-16 max-w-3xl border-t border-line pt-10 will-change-[filter] sm:mt-20"
        >
          <p className="text-base leading-[1.85] text-snow sm:text-lg">
            {words(body, "data-body-word", true)}
          </p>
        </div>
      </Container>
    </section>
  );
}
