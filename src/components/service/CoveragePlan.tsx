"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** The page's argument: the deliverables decide the shoot, not the other way round.
 *
 *  WHY THIS SHAPE. The document leads with a correction: "The event coverage
 *  plan should state what needs to be delivered, rather than simply asking the
 *  crew to film everything." The obvious layout is a list of things you get,
 *  which puts the outputs after the shoot and loses the argument. So the
 *  section runs backwards from the outputs: three events that need three
 *  different answers, then the consequence for the crew, then the eight things
 *  one event can produce.
 *
 *  THE THREE CASES ARE THE PROOF. The document supplies them itself -- a
 *  conference, an exhibition and a product launch, each wanting something
 *  different from the same kind of day. Set side by side, they make the case
 *  that no standard package exists, which is why the page never prints one.
 *
 *  THE FAN IS ONE EVENT, NOT ONE CAMERA. Eight outputs leave a single node,
 *  because that is what the copy says: "ENH can prepare the following from one
 *  event". The lines carry no order and no priority; a numbered list would
 *  assert a sequence the document does not have.
 *
 *  NOTHING IS COUNTED except the eight outputs the document itself lists. No
 *  camera count, no crew size, no turnaround and no duration appears here --
 *  the one number in the whole document, "a three-minute highlights film", is
 *  inside a case sentence and stays there as written.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver, transform only for
 *  anything carrying words. See globals.css, "Coverage plan". */

export function CoveragePlan({
  claim,
  cases,
  consequence,
  outputsLead,
  outputs,
  outputsTail,
}: {
  claim: string;
  cases: string[];
  consequence: string;
  outputsLead: string;
  outputs: string[];
  outputsTail: string;
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
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div ref={root} className={cn("relative", shown && "is-in")}>
      {/* The correction, at display scale, because the rest of the section is
          its consequence. */}
      <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
        {claim}
      </p>

      {/* Three events, three different answers. Deliberately unnumbered: they
          are alternatives, not steps. */}
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {cases.map((text, i) => (
          <li
            key={text}
            className="cov-in relative flex rounded-2xl border border-line bg-ink-3 p-6"
            style={{ animationDelay: `${i * 110}ms` }}
          >
            <span
              aria-hidden
              className="mr-4 mt-1 h-9 w-1 shrink-0 rounded-full bg-brand/70"
            />
            <p className="leading-relaxed text-snow">{text}</p>
          </li>
        ))}
      </ul>

      <p
        className="cov-in mt-10 max-w-3xl border-l-2 border-brand pl-6 leading-relaxed text-fog"
        style={{ animationDelay: "180ms" }}
      >
        {consequence}
      </p>

      {/* ---- One event, eight outputs ---- */}
      <div className="mt-14 grid gap-x-12 gap-y-8 border-t border-line pt-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] lg:items-center">
        <div>
          <p className="cov-in font-display text-[clamp(1.05rem,2vw,1.4rem)] font-extrabold uppercase leading-[1.16] text-snow">
            {outputsLead}
          </p>
          <p
            className="cov-in mt-5 text-sm leading-relaxed text-ash"
            style={{ animationDelay: "120ms" }}
          >
            {outputsTail}
          </p>
        </div>

        {/* The fan. One node on the left, the outputs on the right, joined by
            rules that carry no order. Drawn with borders rather than an SVG so
            the labels stay real text at real size and wrap like text. */}
        <ul className="relative grid gap-2.5 sm:grid-cols-2">
          {outputs.map((out, i) => (
            <li
              key={out}
              className="cov-out group relative flex items-center gap-3 rounded-xl border border-line bg-ink-3 px-4 py-3 transition-colors duration-500 hover:border-brand/60"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand transition-transform duration-500 group-hover:scale-150"
              />
              <span className="text-sm leading-snug text-snow">{out}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
