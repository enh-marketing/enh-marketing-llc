"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Three operating models, and the shortcut that gets a profile suspended.
 *
 *  WHY THIS IS THE CENTREPIECE. Most of this document's work is ordinary local
 *  SEO. The part a business genuinely cannot get elsewhere is the eligibility
 *  reasoning: Google "permits one profile for the central location and does not
 *  treat virtual offices as genuine operating locations", each branch needs "a
 *  real operating presence", and extra profiles or copied pages "can confuse
 *  customers, weaken the website and place the Business Profile at risk of
 *  suspension". That is the section that stops a client doing something
 *  expensive and irreversible.
 *
 *  THE WARNING IS NOT AN ASIDE. It is given its own band at the foot of the
 *  section, marked, at reading size. Tucking a suspension risk into small grey
 *  text under three cards would be the wrong call on a page whose whole subject
 *  is that inaccurate information costs you the enquiry.
 *
 *  EACH MODEL CARRIES ITS OWN DIAGRAM, drawn from the same two primitives -- a
 *  premises and a coverage area -- arranged the way that model actually works:
 *  one place customers come to, one place that travels out, several real places.
 *  Nothing is labelled and nothing is counted; the copy beside each does that.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver, transform only: every
 *  card carries a name and a paragraph. See globals.css, "Setup model". */

function ModelGlyph({ i }: { i: number }) {
  const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;
  return (
    <svg viewBox="0 0 72 48" className="h-12 w-[4.5rem] text-brand" aria-hidden>
      {i === 0 && (
        <>
          {/* Storefront: one place, and customers arriving at it. */}
          <rect x="26" y="18" width="20" height="18" rx="3" {...line} />
          <path d="M26 18l10-8 10 8" {...line} strokeLinejoin="round" />
          <path d="M8 40h12M52 40h12" {...line} opacity="0.5" strokeLinecap="round" />
          <path d="M14 36l6 4-6 4M58 36l-6 4 6 4" {...line} opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {i === 1 && (
        <>
          {/* Service area: one central point, travelling out. */}
          <circle cx="36" cy="24" r="4" fill="currentColor" />
          <circle cx="36" cy="24" r="13" {...line} opacity="0.7" strokeDasharray="3 4" />
          <circle cx="36" cy="24" r="21" {...line} opacity="0.4" strokeDasharray="3 4" />
          <path d="M36 24l14-8M36 24l-15 7M36 24l9 14" {...line} opacity="0.6" strokeLinecap="round" />
        </>
      )}
      {i === 2 && (
        <>
          {/* Multi-location: several real places, consistent with each other. */}
          {[10, 30, 50].map((x) => (
            <g key={x}>
              <rect x={x} y="22" width="14" height="14" rx="2.5" {...line} />
              <path d={`M${x} 22l7-6 7 6`} {...line} strokeLinejoin="round" />
            </g>
          ))}
          <path d="M17 42h38" {...line} opacity="0.5" strokeDasharray="3 4" />
        </>
      )}
    </svg>
  );
}

export function SetupModel({
  models,
  warning,
}: {
  models: { name: string; body: string }[];
  warning: string;
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
      <div className="grid gap-5 lg:grid-cols-3">
        {models.map((model, i) => (
          <article
            key={model.name}
            className="sm-card flex flex-col rounded-2xl border border-line bg-ink-3 p-7 transition-colors duration-500 hover:border-brand/60"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <ModelGlyph i={i} />
            <h3 className="font-display mt-6 text-[clamp(1.05rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.16] text-snow">
              {model.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fog">{model.body}</p>
          </article>
        ))}
      </div>

      {/* The warning, at reading size and marked. A suspension risk does not go
          in small grey text. */}
      <div
        className="sm-card mt-8 flex gap-4 rounded-2xl border border-brand/45 bg-brand/[0.05] p-7"
        style={{ animationDelay: "320ms" }}
      >
        <span aria-hidden className="mt-0.5 shrink-0 text-brand">
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
            <path
              d="M10 2.6 18.4 17H1.6L10 2.6Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M10 8v3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="10" cy="14.2" r="1" fill="currentColor" />
          </svg>
        </span>
        <p className="leading-relaxed text-snow sm:text-lg">{warning}</p>
      </div>
    </div>
  );
}
