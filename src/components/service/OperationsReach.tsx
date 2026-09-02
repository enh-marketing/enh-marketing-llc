"use client";

import { Fragment, useMemo } from "react";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

/** Fifteen years, and how far they reach.
 *
 *  WHY THIS SHAPE. The section had the claim tucked into the heading's aside,
 *  two columns of prose and a closing triple. Which meant the only figure on
 *  the entire page — fifteen years — was set at the same size as everything
 *  around it, in the middle of a sentence, where nobody would ever see it. This
 *  page names no prices, no timelines and no percentages, on purpose, and the
 *  document is explicit about why. So the one number it does commit to should
 *  be the thing this section is built around.
 *
 *  It is also the page's typographic breather. The two sections before it are a
 *  pinned horizontal run and a scroll-plotted motion path; a third interactive
 *  diagram here would be exhausting. This one is monumental type and nothing
 *  animating at all.
 *
 *  THE DOCUMENT'S OWN DISTINCTION, KEPT. It names five functions the experience
 *  is in, and three more it can be applied to. Those are different claims, so
 *  they get different treatments: the five are marked inside the sentence that
 *  earns them, and the three stand outside as outlined, unproven ground. That
 *  also stops either set being printed twice, which is what listing both under
 *  the sentence would have done.
 *
 *  NOTHING INVENTED. Every word is the document's, including the unit on the
 *  number: the split is read out of the sentence rather than retyped. */

/** Pulls the figure out of the claim so it can be set at scale, keeping the
 *  words either side of it intact. Null if the sentence ever loses its number,
 *  in which case the caller prints it whole. */
function splitFigure(claim: string) {
  const m = /^(.*?)(\d+)\s+(years?)\s+(.*)$/.exec(claim);
  if (!m) return null;
  return { prefix: m[1].trim(), figure: Number(m[2]), unit: m[3], suffix: m[4] };
}

/** Marks the functions the sentence already names, in place. Longest first so
 *  "lead generation" cannot be half-matched by a shorter entry. */
function mark(sentence: string, terms: string[]) {
  const sorted = [...terms].sort((a, b) => b.length - a.length);
  const re = new RegExp(
    `(${sorted.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );
  return sentence.split(re).map((part, i) =>
    terms.includes(part) ? (
      <span key={i} className="text-snow">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Splits "... within A, B, C and other business functions." so the three can
 *  be set as three without the sentence being retyped. */
function splitReviewable(body: string) {
  const parts = body.split(/(?<=\.)\s+(?=We can also)/);
  if (parts.length < 2) return null;
  const k = " within ";
  const at = parts[1].indexOf(k);
  if (at < 0) return null;
  const rest = parts[1].slice(at + k.length);
  const cut = rest.indexOf(" and other");
  if (cut < 0) return null;
  return {
    first: parts[0],
    lead: parts[1].slice(0, at + k.length),
    items: rest.slice(0, cut).split(/,\s/).filter(Boolean),
    tail: rest.slice(cut + 1),
  };
}

export function OperationsReach({
  claim,
  proven,
  body,
  criteriaLead,
  criteria,
  criteriaTail,
}: {
  claim: string;
  proven: string[];
  body: string;
  criteriaLead: string;
  criteria: string[];
  criteriaTail: string;
}) {
  const fig = useMemo(() => splitFigure(claim), [claim]);
  const rev = useMemo(() => splitReviewable(body), [body]);

  return (
    <div>
      {/* The figure, and the sentence it belongs to. */}
      {fig ? (
        <Rise>
          <p className="font-display text-[0.7rem] font-semibold uppercase text-brand-text">
            {fig.prefix}
          </p>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            {/* Set, not counted. The shared Counter seeds its state at zero
                and animates up when it scrolls into view, which means a page
                where that animation never runs reads "0 years". For the only
                figure this document commits to, being correct without
                JavaScript beats the count. */}
            <span className="font-display text-[clamp(4.5rem,13vw,11rem)] font-extrabold leading-[0.82] tabular-nums text-snow">
              {fig.figure}
            </span>
            <span className="font-display text-[clamp(1.6rem,4vw,3rem)] font-extrabold uppercase leading-none text-brand">
              {fig.unit}
            </span>
          </div>

          {/* The five the experience is actually in, marked where the sentence
              already names them. */}
          <p className="font-display mt-8 max-w-4xl text-[clamp(1.15rem,2.4vw,1.85rem)] font-extrabold uppercase leading-[1.2] text-fog">
            {mark(fig.suffix, proven)}
          </p>
        </Rise>
      ) : (
        <Rise>
          <p className="font-display max-w-4xl text-[clamp(1.15rem,2.4vw,1.85rem)] font-extrabold uppercase leading-[1.2] text-snow">
            {claim}
          </p>
        </Rise>
      )}

      {/* What that experience does, and the ground it has not proven yet. */}
      <Rise delay={0.1} className="mt-16 border-t border-line pt-12">
        {rev ? (
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
            <p className="leading-relaxed text-snow sm:text-lg">{rev.first}</p>
            <div>
              <p className="leading-relaxed text-fog sm:text-lg">{rev.lead}</p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {rev.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-dashed border-line px-5 py-2.5 transition-colors duration-500 hover:border-ash"
                  >
                    <span className="font-display text-[0.95rem] font-bold uppercase leading-none text-fog">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 leading-relaxed text-fog">{rev.tail}</p>
            </div>
          </div>
        ) : (
          <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">{body}</p>
        )}
      </Rise>

      {/* And the three things every automation is judged on. */}
      <Rise delay={0.16} className="mt-16 border-t border-line pt-12">
        <p className="leading-relaxed text-fog sm:text-lg">{criteriaLead}</p>

        <ul className="mt-7 flex flex-wrap items-baseline gap-x-7 gap-y-3 sm:gap-x-12">
          {criteria.map((k, i) => (
            <li key={k} className="group flex items-baseline gap-7 sm:gap-12">
              <span
                className={cn(
                  "font-display display-xl font-extrabold uppercase leading-[0.95] transition-colors duration-500",
                  "text-snow hover:text-brand",
                )}
              >
                {k}
              </span>
              {i < criteria.length - 1 && (
                <span
                  aria-hidden
                  className="font-display text-[clamp(1.4rem,3vw,2.6rem)] font-extrabold leading-none text-brand"
                >
                  /
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-2xl leading-relaxed text-fog sm:text-lg">{criteriaTail}</p>

      </Rise>
    </div>
  );
}
