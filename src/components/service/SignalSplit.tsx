"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Reporting, drawn as the distinction the document insists on.
 *
 *  WHY A FORK AND NOT A CHART. Every other measurement section on this site can
 *  draw something because its source gives it something to draw. This one gives
 *  no figures at all -- the whole document contains none -- so a chart here
 *  would have to invent its own axis, and a rising line would assert exactly the
 *  growth the copy is careful not to promise.
 *
 *  What the document does give is a distinction: "An increase driven mainly by
 *  people already searching for the store name tells a different story from
 *  growth in customers discovering products for the first time." That is a fork,
 *  not a trend. So the drawing is one stem splitting into two, unlabelled and
 *  unweighted, sitting beside the sentence that names the two branches. The
 *  branches are drawn the same size on purpose: giving either one more weight
 *  would be a claim about a split this document never measures.
 *
 *  THE TERMS ARE MARKED IN PLACE. "Brand searches" and "non-brand searches" are
 *  highlighted inside the document's own sentence rather than lifted out as
 *  captions, which keeps each phrase attached to the clause that explains why it
 *  matters -- the same handling ReachNote uses for a figure and its qualifier.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver, transform only --
 *  the fork included. An earlier version drew the branches in with
 *  stroke-dashoffset and parked on its own `from` frame wherever the animation
 *  clock was slow, leaving a fork with no branches: the opposite of the point.
 *  See globals.css, "Signal split". */

/** Marks the document's own terms inside its own sentence. Longest first, so
 *  "non-brand searches" is matched before the "brand searches" inside it. */
function mark(text: string, terms: string[]) {
  const ordered = [...terms].sort((a, b) => b.length - a.length);
  const escaped = ordered.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, i) =>
    ordered.includes(part) ? (
      <span key={i} className="font-semibold text-brand">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function SignalSplit({
  lead,
  tracked,
  brandSplit,
  brandTerms,
  limit,
}: {
  lead: string;
  tracked: string;
  brandSplit: string;
  brandTerms: string[];
  limit: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div ref={root} className={cn("relative", shown && "is-in")}>
      {/* The section's premise, at display scale: reporting has to join two
          things that are usually reported apart. */}
      <p className="font-display max-w-3xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
        {lead}
      </p>

      <div className="mt-12 grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
        <p className="split-in leading-relaxed text-snow sm:text-lg">{tracked}</p>

        {/* One stem, two branches, neither weighted. */}
        <svg
          viewBox="0 0 300 150"
          className="split-in split-fig w-full max-w-sm justify-self-center text-brand lg:justify-self-end"
          aria-hidden
        >
          <path
            d="M8 75h96"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="104" cy="75" r="5" fill="currentColor" />
          <path
            d="M104 75c46 0 46-45 92-45h88"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M104 75c46 0 46 45 92 45h88"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Where each branch lands. Marks, not labels: the sentence beside
              this drawing already names them. */}
          <rect
            x="256"
            y="18"
            width="36"
            height="24"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.55"
          />
          <rect
            x="256"
            y="108"
            width="36"
            height="24"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.55"
          />
        </svg>
      </div>

      {/* The distinction, and the limit that qualifies all of it. */}
      <div className="mt-12 grid gap-x-12 gap-y-6 border-t border-line pt-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
        <p className="split-in leading-relaxed text-snow sm:text-lg">
          {mark(brandSplit, brandTerms)}
        </p>
        <p className="split-in flex gap-3 text-sm leading-relaxed text-ash" style={{ animationDelay: "120ms" }}>
          <span aria-hidden className="mt-0.5 shrink-0 text-brand">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
            </svg>
          </span>
          <span>{limit}</span>
        </p>
      </div>
    </div>
  );
}
