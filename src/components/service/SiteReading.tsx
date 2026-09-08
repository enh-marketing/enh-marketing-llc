"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";
import { Crosslink } from "@/components/ui/Crosslink";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** The website, read the way a search system reads it — and the one verdict
 *  that reading ends on.
 *
 *  WHY THIS SHAPE. The section has two jobs and the old drawing only did the
 *  second. Its lead names four kinds of change ("clearer information, stronger
 *  structure or corrected technical settings ... New service, product, location
 *  or educational pages"), and its last sentence is a decision with two
 *  outcomes. A fork on its own draws the decision and says nothing about what
 *  the decision is made from.
 *
 *  So the section is ONE OBJECT, READ, AND THEN ONE OF TWO FUTURES. A site is
 *  drawn once: the surface a person sees, the technical layer underneath it
 *  that a crawler meets first, and the pages that do not exist yet standing
 *  outside it as outlines. A read passes down it continuously. Each of the four
 *  changes points at the region it would happen in, so "stronger structure" is
 *  a heading tree and "corrected technical settings" is the layer beneath the
 *  page, not two grey words in a list.
 *
 *  THE VERDICT IS A SWITCH ON THE SAME DRAWING, not two sketches side by side.
 *  Two cards showing two small pictures make the outcomes look like two
 *  products. They are not: they are two futures for the one site the reader has
 *  just watched being read. Choosing one changes that site — patched where the
 *  findings landed, or struck out and redrawn from an outline. One object, two
 *  futures, and the reader flips between them.
 *
 *  NOTHING IS DECIDED BY DEFAULT. At rest neither outcome is selected, because
 *  the diagnostic has not been run. That is the honest resting state and it is
 *  also what the server renders.
 *
 *  EVERY WORD IS THE DOCUMENT'S. The four findings are its own phrases, the two
 *  outcomes are its own clauses, and the drawing carries no text of its own. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

type Verdict = 0 | 1 | null;

/** The site. `lit` is which finding is being pointed at, `verdict` which future
 *  has been chosen. Wordless throughout: the labels live in HTML beside it. */
function SiteDrawing({ lit, verdict }: { lit: number | null; verdict: Verdict }) {
  const rebuild = verdict === 1;
  const patched = verdict === 0;
  const on = (i: number) => lit === i;

  /* Content rows. Ragged and short while the page is unclear; full and even
     once "clearer information" is the finding being pointed at, or once the
     site has been patched. */
  const clear = on(0) || patched;
  const rows = clear
    ? [188, 168, 180, 152, 174, 160]
    : [96, 148, 62, 120, 84, 110];

  return (
    <svg viewBox="0 0 330 402" aria-hidden className="block w-full overflow-visible">
      {/* --- the structure: a heading tree down the outside of the page --- */}
      <g
        className={cn("transition-opacity duration-500", on(1) || patched ? "text-brand" : "text-line")}
        opacity={on(1) || patched ? 1 : 0.45}
      >
        <path d="M10 46V262" {...S} strokeWidth={1.1} strokeDasharray={on(1) || patched ? undefined : "3 4"} />
        {[46, 96, 146, 196, 246].map((y, i) => (
          <g key={y}>
            <path d={`M10 ${y}h${i % 2 ? 12 : 7}`} {...S} strokeWidth={1.1} />
            <circle cx="10" cy={y} r={i % 2 ? 1.8 : 2.8} fill="currentColor" />
          </g>
        ))}
      </g>

      {/* --------------------------- the page a person sees --------------- */}
      <g className={cn("transition-opacity duration-500", rebuild ? "opacity-25" : "opacity-100")}>
        <rect
          x="28"
          y="16"
          width="222"
          height="272"
          rx="7"
          fill="var(--color-ink-3)"
          stroke={patched ? "var(--color-brand)" : "var(--color-line)"}
          strokeWidth="1.2"
          className="transition-colors duration-500"
          vectorEffect="non-scaling-stroke"
        />
        {/* header */}
        <path d="M28 40h222" {...S} strokeWidth={1} className="text-line" />
        <rect x="40" y="25" width="34" height="7" rx="3.5" fill="currentColor" className="text-fog" opacity="0.5" />
        {[150, 176, 202, 228].map((x) => (
          <circle key={x} cx={x} cy="28.5" r="2.4" fill="currentColor" className="text-line" />
        ))}

        {/* the answer the page gives, in rows */}
        {rows.map((w, i) => (
          <rect
            key={i}
            x="40"
            y={58 + i * 20}
            width={w}
            height="6"
            rx="3"
            fill="currentColor"
            className={cn("transition-all duration-700", clear ? "text-snow" : "text-fog")}
            opacity={clear ? 0.55 : 0.3}
          />
        ))}

        {/* a block of information that has to be on the page, not implied */}
        <rect
          x="40"
          y="192"
          width="198"
          height="80"
          rx="5"
          {...S}
          strokeWidth={1}
          className={clear ? "text-brand" : "text-line"}
          strokeDasharray={clear ? undefined : "4 4"}
        />
        {[204, 222, 240, 258].map((y, i) => (
          <rect
            key={y}
            x="52"
            y={y}
            width={clear ? [172, 150, 164, 138][i] : [70, 96, 58, 84][i]}
            height="5"
            rx="2.5"
            fill="currentColor"
            className={cn("transition-all duration-700", clear ? "text-brand" : "text-fog")}
            opacity={clear ? 0.6 : 0.25}
          />
        ))}

        {/* the read, passing down the page */}
        <rect
          x="28"
          y="16"
          width="222"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          className="text-brand ah-read"
          opacity={verdict === null ? 1 : 0}
        />
      </g>

      {/* --- the technical layer a crawler meets before any of that --- */}
      <g>
        <path d="M28 306h222" {...S} strokeWidth={1} className="text-line" opacity="0.6" />
        {[0, 1, 2, 3, 4].map((i) => {
          const bad = i === 2;
          const fixed = on(2) || patched;
          return (
            <g key={i}>
              <rect
                x={28 + i * 45}
                y="318"
                width="38"
                height="26"
                rx="4"
                {...S}
                strokeWidth={1.1}
                className={cn(
                  "transition-colors duration-500",
                  bad && !fixed ? "text-line" : on(2) || patched ? "text-brand" : "text-line",
                )}
                strokeDasharray={bad && !fixed ? "4 3" : undefined}
              />
              {bad && !fixed ? (
                <path
                  d={`M${38 + i * 45} 326l18 10M${56 + i * 45} 326l-18 10`}
                  {...S}
                  strokeWidth={1.4}
                  className="text-ash"
                />
              ) : (
                <path
                  d={`M${39 + i * 45} 331l5 5 9-10`}
                  {...S}
                  strokeWidth={1.5}
                  className={on(2) || patched ? "text-brand" : "text-fog"}
                  opacity={on(2) || patched ? 1 : 0.45}
                />
              )}
            </g>
          );
        })}
        {/* the crawler's approach: it arrives here first */}
        <path
          d="M6 331h18"
          {...S}
          strokeWidth={1.3}
          className={on(2) ? "text-brand" : "text-line"}
        />
        <path d="M18 327l6 4-6 4" {...S} strokeWidth={1.3} className={on(2) ? "text-brand" : "text-line"} />
      </g>

      {/* ------------- pages that do not exist yet, standing outside -------- */}
      <g>
        {[24, 118, 212].map((y, i) => {
          const made = on(3) || patched;
          return (
            <g key={y}>
              <rect
                x="266"
                y={y}
                width="56"
                height="76"
                rx="5"
                fill={made ? "var(--color-ink-3)" : "none"}
                stroke={made ? "var(--color-brand)" : "var(--color-line)"}
                strokeWidth="1.1"
                strokeDasharray={made ? undefined : "4 4"}
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-500"
                style={{ transitionDelay: made ? `${i * 90}ms` : "0ms" }}
              />
              {[0, 1, 2].map((r) => (
                <rect
                  key={r}
                  x="276"
                  y={y + 16 + r * 14}
                  width={[34, 26, 30][r]}
                  height="4"
                  rx="2"
                  fill="currentColor"
                  className={made ? "text-brand" : "text-line"}
                  opacity={made ? 0.55 : 0.35}
                  style={{ transitionDelay: made ? `${i * 90}ms` : "0ms" }}
                />
              ))}
              <path
                d={`M250 ${y + 38}h16`}
                {...S}
                strokeWidth={1}
                strokeDasharray="3 3"
                className={made ? "text-brand" : "text-line"}
                opacity={made ? 0.9 : 0.4}
              />
            </g>
          );
        })}
      </g>

      {/* ------------------------------ the rebuild ------------------------ */}
      {/* The site cannot carry the work: it is struck out and drawn again from
          an outline. Same footprint, nothing inside it yet. */}
      <g className={cn("transition-opacity duration-500", rebuild ? "opacity-100" : "opacity-0")}>
        <rect
          x="28"
          y="16"
          width="222"
          height="272"
          rx="7"
          {...S}
          strokeWidth={1.4}
          strokeDasharray="6 5"
          className="text-brand"
        />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="46"
            y={44 + i * 62}
            width={[186, 150, 168, 132][i]}
            height="38"
            rx="4"
            {...S}
            strokeWidth={1.1}
            strokeDasharray="4 4"
            className="text-brand"
            opacity="0.55"
          />
        ))}
      </g>
    </svg>
  );
}

export function SiteReading({
  lead,
  body,
  link,
  changes,
  branches,
  diagnosticLabel,
}: {
  lead: string;
  body: string;
  link: { label: string; href: string };
  /** The four kinds of change the lead names, in its own words. */
  changes: string[];
  branches: [string, string];
  diagnosticLabel: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  /** Which change is being pointed at. Scroll advances it, the pointer
   *  previews, and a click holds — so a touch reader, who gets no hover and no
   *  leave, can still pin one open. Preview beats hold beats scroll. */
  const [lit, setLit] = useState<number | null>(null);
  const [hoverChange, setHoverChange] = useState<number | null>(null);
  const [heldChange, setHeldChange] = useState<number | null>(null);
  /** The same three-way arrangement for the verdict, and the same reason. */
  const [hoverVerdict, setHoverVerdict] = useState<Verdict>(null);
  const [heldVerdict, setHeldVerdict] = useState<Verdict>(null);
  const verdict: Verdict = hoverVerdict ?? heldVerdict;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ scan: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.scan) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 72%",
        end: "bottom 68%",
        scrub: 0.6,
        onUpdate: (self) => {
          const i = Math.min(changes.length - 1, Math.floor(self.progress * changes.length));
          setLit((prev) => (prev === i ? prev : i));
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [changes.length]);

  const shown =
    hoverChange ?? heldChange ?? (verdict === null ? lit : null);

  // The named service links only once its page is built (see Crosslink).
  const at = body.indexOf(link.label);
  const bodyNode: ReactNode =
    at < 0 ? (
      body
    ) : (
      <>
        {body.slice(0, at)}
        <Crosslink
          href={link.href}
          className="text-snow underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand hover:decoration-brand"
          pendingClassName="text-snow"
        >
          {link.label}
        </Crosslink>
        {body.slice(at + link.label.length)}
      </>
    );

  return (
    <div ref={root}>
      <Rise>
        <p className="font-display max-w-3xl text-[clamp(1.2rem,2.4vw,1.85rem)] font-extrabold uppercase leading-[1.14] text-snow">
          {lead}
        </p>
      </Rise>

      <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        {/* What the read finds, and then what the diagnostic decides. */}
        <div>
          {/* The lead's own opening clause, used as the list's heading rather
              than an interface label written for the purpose. */}
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ash">
            Changes to the website
          </p>
          <ul className="mt-5 border-t border-line">
            {changes.map((change, i) => {
              const active = shown === i;
              return (
                <li key={change} className="border-b border-line">
                  <button
                    type="button"
                    onPointerEnter={() => setHoverChange(i)}
                    onPointerLeave={() => setHoverChange(null)}
                    onFocus={() => setHoverChange(i)}
                    onBlur={() => setHoverChange(null)}
                    onClick={() => setHeldChange((v) => (v === i ? null : i))}
                    aria-pressed={active}
                    className="group flex w-full items-center gap-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "font-display shrink-0 text-[0.6875rem] font-bold tabular-nums transition-colors duration-300",
                        active ? "text-brand-text" : "text-ash",
                      )}
                    >
                      {`0${i + 1}`}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[clamp(0.95rem,1.5vw,1.15rem)] font-extrabold uppercase leading-[1.16] transition-colors duration-300",
                        active ? "text-snow" : "text-fog group-hover:text-snow",
                      )}
                    >
                      {change}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "ml-auto h-px shrink-0 bg-brand transition-all duration-500",
                        active ? "w-10" : "w-0",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* The decision the section ends on, made against the same drawing. */}
          <div className="mt-10">
            <p className="flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-text">
              <span aria-hidden className="h-2 w-2 rounded-full border-2 border-brand" />
              {diagnosticLabel}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {branches.map((branch, i) => {
                const chosen = verdict === i;
                return (
                  <button
                    key={branch}
                    type="button"
                    aria-pressed={chosen}
                    onClick={() => setHeldVerdict((v) => (v === i ? null : (i as Verdict)))}
                    onPointerEnter={() => setHoverVerdict(i as Verdict)}
                    onPointerLeave={() => setHoverVerdict(null)}
                    onFocus={() => setHoverVerdict(i as Verdict)}
                    onBlur={() => setHoverVerdict(null)}
                    className={cn(
                      "rounded-xl border px-5 py-4 text-left transition-all duration-300",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                      i === 1 && "border-dashed",
                      chosen
                        ? "border-brand bg-brand/[0.07]"
                        : "border-line bg-ink-2 hover:border-brand/60",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display block text-[0.9375rem] font-extrabold uppercase leading-[1.16] transition-colors duration-300",
                        chosen ? "text-snow" : "text-fog",
                      )}
                    >
                      {branch}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <Rise delay={0.08}>
            <p className="mt-9 max-w-xl leading-relaxed text-fog sm:text-lg">{bodyNode}</p>
          </Rise>
        </div>

        {/* The site itself. */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:sticky lg:top-28">
          <div className="rounded-[1.5rem] border border-line bg-ink-2 p-6 sm:p-8">
            <SiteDrawing lit={shown} verdict={verdict} />
          </div>
        </div>
      </div>
    </div>
  );
}
