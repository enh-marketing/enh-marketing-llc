"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Marked } from "@/components/service/Marked";
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
  bodyLead,
  bodyVariant = "lines",
  highlight,
  outro,
  closing,
  closingMark,
  children,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  /** The section's number in the page's run. Optional, because the page this
   *  component was written for opens on it and numbers nothing; a page that
   *  numbers every other section has to be able to number this one too, or its
   *  run starts at 02. */
  /** Accepted and ignored: the red section counter it used to print is gone
   *  sitewide. Every page body still passes one, so the prop stays rather than
   *  forcing a rename across fifty-odd files, and putting the numbering back
   *  stays a one-line change. */
  index?: string;
  headline: [string, string];
  question: string;
  questionEmphasis: string;
  /** One paragraph, or several. An array is the case where the source lists
   *  causes: they render as separate numbered lines inside the veil, so the
   *  decode resolves them one after another instead of flattening three
   *  distinct failures into a single run-on sentence. */
  body: string | string[];
  /** The clause that introduces an array body, where the source has one. Its
   *  three faults read as bare noun phrases without "The fix turns out to be"
   *  in front of them, so the lead is part of the sentence rather than a label. */
  bodyLead?: string;
  /** How an array body is set. "lines" numbers them, which is right where the
   *  source lists causes or steps. "fork" sets them as branches off a single
   *  stem, for a source that writes alternatives rather than a sequence —
   *  numbering "for some businesses / for others" would assert an order the
   *  document does not have. Ignored for a string body. */
  bodyVariant?: "lines" | "fork";
  highlight: string[];
  /** Paragraphs that follow the decoded block. Some pages close this section on
   *  a claim the decode should not swallow — an ownership promise, a note about
   *  one shared budget — and those read better after the effect has resolved
   *  than inside it. */
  outro?: string[];
  /** A closing statement, set at display scale. For the page whose section ends
   *  on a promise rather than an explanation — printing that as another fog
   *  paragraph throws away the one line the reader should leave with. */
  closing?: string;
  /** Phrases inside `closing` to carry brand. Where a document's closing
   *  sentence lists what it produces and one of those is the page's whole
   *  argument, setting the lot in one colour flattens it. Absent phrases are
   *  simply not marked, which is `Marked`'s contract. */
  closingMark?: string[];
  /** Anything the page needs under the section: calls to action, a set of
   *  examples. Kept as a slot rather than more props, because what goes here
   *  differs on every page that uses one. */
  children?: ReactNode;
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
      gsap.set(bodyWords, { opacity: 0.5 });
      // Blur on a container holding ~50 word spans is the costly part of this
      // effect. Large screens only; small screens get the word-by-word decode
      // on its own, which tells the same story for a fraction of the work.
      const useBlur = window.matchMedia("(min-width: 1024px)").matches;
      if (useBlur) gsap.set(veil, { filter: "blur(2px)" });
      gsap.set(marks, { color: "var(--color-fog)" });

      /* TEAM COMMENT, 2026-09-08: the decode finished far too late. It was
         scrubbed from "top 82%" to "bottom 62%", which is the section's whole
         height plus a bit -- 1143px on a 963px section -- and the question's
         own word stagger stretched the timeline past the point where the
         paragraph was still on screen. Measured: the sentence only reached full
         contrast at the very end of the scrub, with its top 134px ABOVE the
         viewport. A reader saw a half-resolved paragraph the entire time it was
         in front of them.

         Both ends are now measured from the section's top, so the window is a
         fixed slice of viewport travel rather than something that grows with
         the section. Every Narrative on the site therefore resolves at the same
         point on screen, whatever its own height.

         The window is deliberately short. One trigger drives the heading, the
         question and the body, and those sit at different depths in the
         section, so there is no setting that decodes all three exactly as each
         one crosses the middle. It is tuned on the question, which is the
         longest block and the one the comment was about: it now reaches full
         contrast with its top around two thirds down the screen, and is
         readable well before that. The body paragraph, further down the
         section, is consequently resolved by the time it appears -- which is
         the right way round for the one that has to be read rather than
         watched. */
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 88%", end: "top 35%", scrub: 0.6 },
      });

      tl.to(headWords, { yPercent: 0, duration: 0.22, stagger: 0.012, ease: "power2.out" }, 0)
        .to(askWords, { opacity: 1, duration: 0.2, stagger: 0.009, ease: "none" }, 0.06);

      if (useBlur) {
        tl.to(veil, { filter: "blur(0px)", duration: 0.4, ease: "none" }, 0.3);
      }
      tl
        .to(bodyWords, { opacity: 1, duration: 0.32, stagger: 0.006, ease: "none" }, 0.3)
        .to(marks, { color: "var(--color-brand)", duration: 0.01, stagger: 0.03, ease: "none" }, 0.66);

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
  const words = (text: string, attr: string, markable = false) => {
    const parts = text.split(" ");
    return parts.map((w, i) => {
      const bare = w.replace(/[^A-Za-z]/g, "");
      // Exact match first, then a suffix match for compounds: the Meta Ads copy
      // writes "click-to-WhatsApp", which strips to "clicktoWhatsApp" and so
      // never equalled the highlight "WhatsApp" — the word simply failed to
      // light, silently. The suffix path is length-guarded so short tokens
      // cannot start matching the tails of unrelated words.
      const isMark =
        markable &&
        highlight.some(
          (h) => bare === h || (h.length >= 4 && bare.toLowerCase().endsWith(h.toLowerCase())),
        );
      // The separator belongs between words, not after the last one. A
      // sentence split around its emphasis arrives here in fragments, and a
      // trailing space on the final word of a fragment pushed the punctuation
      // that follows it off on its own: "the enquiries are not ." Where a space
      // genuinely is needed between fragments, the split already supplies it as
      // an empty trailing token, which still renders its own separator.
      const last = i === parts.length - 1;
      return (
        <Fragment key={i}>
          <span {...{ [attr]: "" }} className={cn("inline-block", isMark && "font-semibold")} data-mark={isMark ? "" : undefined}>
            {w}
          </span>
          {last ? null : " "}
        </Fragment>
      );
    });
  };

  return (
    <section
      id={id}
      data-section={label}
      ref={root}
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28"
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
        {/* NO SECTION COUNTER. Team direction: the red "(01)", "(02)"
            ... that ran down the side of every section is gone sitewide. The
            `index` prop stays in the signature and stays unused: every page
            body passes one, so removing it would be a rename across fifty-odd
            files to delete a value nobody reads, and keeping it means putting
            the numbering back is one line here rather than fifty. */}

        {/* The claim */}
        {/* One continuous heading. The two halves were `block`, which broke the
            line between them whatever room was left, so "What We Do" came out
            as "WHAT" over "WE DO". The colour change still separates them. */}
        <h2 className="font-display display-xl max-w-4xl font-extrabold uppercase leading-[1.02]">
          <span className="text-snow">
            {headline[0].split(" ").map((w, i) => (
              <span key={i} data-head className="inline-block overflow-hidden align-bottom">
                <span className="inline-block">{w}</span>
                {" "}
              </span>
            ))}
          </span>
          {" "}
          <span className="text-brand">
            {headline[1].split(" ").map((w, i) => (
              <span key={i} data-head className="inline-block overflow-hidden align-bottom">
                <span className="inline-block">{w}</span>
                {" "}
              </span>
            ))}
          </span>
        </h2>

        {/* The question, offset right */}
        <p className="font-display mt-10 max-w-2xl text-[clamp(1.15rem,2.2vw,1.85rem)] font-bold leading-[1.3] text-snow lg:ml-auto lg:mr-0 lg:text-right">
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
          className="mt-11  border-t border-line pt-8 will-change-[filter] sm:mt-14"
        >
          {/* Rendered whatever shape the body is. Gating this on an array body
              silently dropped a caller's opening sentence, which is exactly the
              failure this slot exists to prevent. */}
          {bodyLead && (
            <p className="mb-6 text-xs font-semibold uppercase text-brand-text">
              {bodyLead}
            </p>
          )}

          {Array.isArray(body) && bodyVariant === "fork" ? (
            <div>
              {/* The stem, and where it divides. Hidden once the branches
                  stack, where the drawing would describe a layout that is no
                  longer on screen. */}
              <svg
                aria-hidden
                viewBox="0 0 100 34"
                preserveAspectRatio="none"
                className="hidden h-7 w-full lg:block"
              >
                <line x1="50" y1="0" x2="50" y2="17" stroke="var(--color-line)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
                <line x1="25" y1="17" x2="75" y2="17" stroke="var(--color-line)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
                <line x1="25" y1="17" x2="25" y2="34" stroke="var(--color-brand)" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
                <line x1="75" y1="17" x2="75" y2="34" stroke="var(--color-line)" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
              </svg>

              <ul className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                {body.map((branch, i) => (
                  <li
                    key={branch}
                    className={cn(
                      "rounded-2xl border p-5 sm:p-6",
                      // The first branch is the one the channel works for. The
                      // document's own order, weighted its way.
                      i === 0
                        ? "border-brand/45 bg-brand/[0.06]"
                        : "border-line bg-ink-3/50",
                    )}
                  >
                    <p
                      className={cn(
                        "text-base leading-[1.75] sm:text-lg",
                        i === 0 ? "text-snow" : "text-fog",
                      )}
                    >
                      {words(branch, "data-body-word", true)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : Array.isArray(body) ? (
            <ol className="space-y-6">
              {body.map((line, i) => (
                <li key={line} className="flex gap-5">
                  <span
                    aria-hidden
                    className="font-display mt-1 shrink-0 text-xs font-bold tabular-nums text-brand-text"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-[1.85] text-snow sm:text-lg">
                    {words(line, "data-body-word", true)}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-base leading-[1.85] text-snow sm:text-lg">
              {words(body, "data-body-word", true)}
            </p>
          )}
        </div>

        {/* After the decode has resolved. Deliberately outside the veil: these
            are statements, not the thing being decoded. */}
        {outro && outro.length > 0 && (
          <div className="mt-8 space-y-4">
            {outro.map((p) => (
              <p key={p} className="leading-relaxed text-fog sm:text-lg">
                {p}
              </p>
            ))}
          </div>
        )}

        {closing && (
          <p className="font-display mt-10 text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.16] text-snow">
            <Marked text={closing} mark={closingMark} className="text-brand" />
          </p>
        )}

        {children}
      </Container>
    </section>
  );
}
