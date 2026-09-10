"use client";

import { Fragment } from "react";

/** `Marked`, but the marked phrases are the drawing's controls.
 *
 *  THE IDEA THIS PAGE ADDS TO THE SITE. Everywhere else a pinned drawing is
 *  driven from pins standing on the drawing itself. Two sections on the
 *  healthcare page have a drawing whose key is the client's own sentence
 *  beside it -- four research subjects, five contributions to a decision -- and
 *  in both cases the honest control is the sentence, not a row of dots. So the
 *  phrases become buttons in place: nothing is reworded, nothing is moved, and
 *  pointing at a phrase lights the part of the drawing it names.
 *
 *  THE CONTRACT IS `Marked`'s. Verbatim, contiguous substrings, longest first,
 *  and any phrase that is absent is simply not matched -- so a copy change
 *  upstream degrades to plain text rather than to a crash. Stripped of markup
 *  the parts concatenate back to the source exactly, which is what keeps the
 *  visible-copy check honest.
 *
 *  IT IS A BUTTON, NOT A HOVER TARGET. Pointer, focus and click all work, which
 *  means a keyboard reaches every key in reading order and a touch screen --
 *  where there is no hover at all -- can still light a part. Nothing is hidden
 *  behind the interaction: with no pointer, no keyboard and no JavaScript, the
 *  drawing rests with every part lit equally, which is what the sentences
 *  themselves say ("all contribute to the decision"). */
export function MarkedKeys({
  text,
  keys,
  active,
  onPick,
  className = "font-semibold text-brand-text",
  activeClassName = "font-semibold text-brand",
}: {
  text: string;
  /** The phrases, in the order the drawing's parts are numbered. */
  keys: readonly string[];
  /** Which key is lit, or null for "all of them, equally". */
  active: number | null;
  onPick: (i: number | null) => void;
  className?: string;
  activeClassName?: string;
}) {
  const present = keys.filter((k) => k && text.includes(k));
  if (!present.length) return <>{text}</>;

  const escaped = present
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    // Longest first, so a phrase that contains another is not cut in half by it.
    .sort((a, b) => b.length - a.length);
  const parts = text.split(new RegExp("(" + escaped.join("|") + ")", "g"));

  return (
    <>
      {parts.map((part, p) => {
        const i = keys.indexOf(part);
        if (i < 0) return <Fragment key={p}>{part}</Fragment>;
        const on = active === i;
        return (
          <button
            key={p}
            type="button"
            aria-pressed={on}
            onPointerEnter={() => onPick(i)}
            onPointerLeave={() => onPick(null)}
            onFocus={() => onPick(i)}
            onBlur={() => onPick(null)}
            onClick={() => onPick(on ? null : i)}
            className={`underline decoration-2 underline-offset-[6px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none ${
              on ? `${activeClassName} decoration-brand` : `${className} decoration-line hover:decoration-brand`
            }`}
          >
            {part}
          </button>
        );
      })}
    </>
  );
}
