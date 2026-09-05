import { Fragment } from "react";

/** One or more phrases inside a client sentence, coloured where they stand.
 *
 *  The whole site's rule is that copy is the document's and is never reworded,
 *  which leaves emphasis as the only editorial tool available. This takes a
 *  sentence and verbatim, contiguous substrings of it, and splits the sentence
 *  around them so the phrases can carry brand weight without a single word
 *  moving. If a substring is absent the sentence renders whole, so a copy
 *  change upstream degrades to plain text rather than to a crash.
 *
 *  Stripped of tags the parts concatenate back to the source exactly, which is
 *  what keeps the visible-copy check honest -- and it is also why a list of
 *  phrases is marked in place rather than lifted out into chips beside the
 *  sentence: chips would print the same words on the page twice. */
export function Marked({
  text,
  mark,
  className = "font-semibold text-brand",
}: {
  text: string;
  /** A phrase, or several. Order does not matter: they are matched where they
   *  occur, and any that is not found is simply not marked. */
  mark?: string | string[];
  className?: string;
}) {
  const marks = (Array.isArray(mark) ? mark : mark ? [mark] : []).filter(
    (m) => m && text.includes(m),
  );
  if (!marks.length) return <>{text}</>;

  const escaped = marks.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  // Longest first, so a phrase that contains another is not cut in half by it.
  escaped.sort((a, b) => b.length - a.length);
  const parts = text.split(new RegExp("(" + escaped.join("|") + ")", "g"));

  return (
    <>
      {parts.map((part, i) =>
        marks.includes(part) ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
