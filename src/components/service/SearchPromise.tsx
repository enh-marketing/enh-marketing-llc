"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The section's own lead, run as a search.
 *
 *  THE COPY IS AN INSTRUCTION AND THE PAGE FOLLOWS IT. "Type 'SEO company
 *  Dubai', 'SEO agency Dubai' or 'search engine optimisation Dubai' into Google
 *  and you will find plenty of agencies promising higher rankings. The work
 *  behind those promises matters more." So the section types those three
 *  searches, one after another, and returns the same result every time: five
 *  listings that are impossible to tell apart, each carrying the identical
 *  rising chart. Changing the search changes nothing. That is the argument, and
 *  it is made by the thing itself rather than asserted underneath it.
 *
 *  THE READER CAN DRIVE IT. The three searches are buttons, so anyone who wants
 *  to check that the results really are the same can run them in any order.
 *  Leave it alone and it cycles.
 *
 *  NOTHING IN THE RESULTS IS REAL. No agency is named, no domain, no ranking,
 *  no figure: the listings are bars, because inventing competitor names on a
 *  client's page would be defamatory nonsense and this document states no
 *  figures anywhere. The five are the same width on purpose.
 *
 *  THE TYPING IS SAFE TO STALL. The first frame the server renders is the first
 *  search complete with its results already showing, so a reader with no
 *  JavaScript, a stopped clock or reduced motion set sees a finished search
 *  rather than an empty box. The animation only ever replaces one finished
 *  state with another.
 *
 *  THE SIX POSITIONS UNDERNEATH are the document's own, each split at its own
 *  full stop -- and the fourth at its own comma, the only break it offers -- so
 *  the position reads at weight and its reason sits under it. Pointing at one
 *  lights the result it displaces, which is why there are six results and not
 *  five. */

const TYPE_MS = 58;
const HOLD_MS = 2100;
const WIPE_MS = 26;

/** Six listings, all the same, one for each position the section goes on to
 *  make: pointing at a position lights the interchangeable result it displaces,
 *  and the mapping is one to one rather than approximate. Bar widths are a
 *  texture so the block does not read as a barcode; they are not a measurement
 *  and nothing here is ranked. */
const LISTINGS = [
  { title: 88, url: 46, lines: [96, 72] },
  { title: 82, url: 52, lines: [94, 66] },
  { title: 90, url: 44, lines: [92, 74] },
  { title: 84, url: 50, lines: [96, 68] },
  { title: 86, url: 48, lines: [93, 70] },
  { title: 89, url: 45, lines: [95, 71] },
];

/** The promise every one of them makes. Drawn once, used five times, with no
 *  axis and no figure, because "higher rankings" has neither. */
function RankPromise() {
  return (
    <svg viewBox="0 0 64 34" className="h-[34px] w-16 shrink-0" fill="none" aria-hidden>
      <path d="M4 29h56" stroke="var(--color-line)" strokeWidth="1.2" strokeLinecap="round" />
      {[
        { x: 10, h: 8 },
        { x: 20, h: 14 },
        { x: 30, h: 19 },
        { x: 40, h: 25 },
      ].map((b) => (
        <path
          key={b.x}
          d={`M${b.x} 29v-${b.h}`}
          stroke="var(--color-ash)"
          strokeOpacity="0.4"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      <path
        d="M48 12l8-5-2 8"
        stroke="var(--color-ash)"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchPromise({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  queries,
  items,
  tail,
  tailMark,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  queries: string[];
  items: { stance: string; detail: string }[];
  tail: string;
  tailMark: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;
  const [hot, setHot] = useState<number | null>(null);

  /** Which search is running, and how much of it has been typed. `typed` starts
   *  at the full length so the first paint is a finished search. */
  const [q, setQ] = useState(0);
  const [typed, setTyped] = useState(queries[0]?.length ?? 0);
  /** Set when the reader picks a search themselves; the cycle stops there and
   *  leaves them with what they asked for. */
  const [held, setHeld] = useState(false);
  /** Which search the cycle is on, readable from inside the loop without
   *  restarting it. */
  const qRef = useRef(0);

  useEffect(() => {
    if (reduced || held) return;
    let cancelled = false;
    let timer = 0;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    /** One turn: hold the finished search, wipe it, type the next one. Every
     *  step ends on a complete state, so cancelling mid-run can never leave a
     *  half-typed query on the page for good -- the next mount starts whole. */
    const run = async () => {
      for (;;) {
        await wait(HOLD_MS);
        if (cancelled) return;
        const from = queries[qRef.current] ?? "";
        for (let i = from.length; i >= 0; i -= 1) {
          setTyped(i);
          await wait(WIPE_MS);
          if (cancelled) return;
        }
        const next = (qRef.current + 1) % queries.length;
        qRef.current = next;
        setQ(next);
        const to = queries[next] ?? "";
        for (let i = 1; i <= to.length; i += 1) {
          setTyped(i);
          await wait(TYPE_MS);
          if (cancelled) return;
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduced, held, queries]);

  const pick = (i: number) => {
    qRef.current = i;
    setHeld(true);
    setQ(i);
    setTyped(queries[i]?.length ?? 0);
  };

  const shown = (queries[q] ?? "").slice(0, typed);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise key="lead">
              <p className="leading-relaxed text-fog sm:text-lg">{lead}</p>
            </Rise>
          }
        />

        <div ref={ref}>
          {/* The search. */}
          <div className="rounded-[1.25rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-5 sm:p-8">
            <div className="flex items-center gap-4 rounded-full border border-line bg-ink-3 px-6 py-4">
              <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-brand" fill="none" aria-hidden>
                <circle cx="8.6" cy="8.6" r="6.1" stroke="currentColor" strokeWidth="1.7" />
                <path d="M13.2 13.2L17.5 17.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <p className="min-w-0 flex-1 truncate text-[clamp(0.95rem,2vw,1.2rem)] text-snow">
                {shown}
                <span
                  aria-hidden
                  className={cn(
                    "ml-0.5 inline-block h-[1.05em] w-px translate-y-[0.18em] bg-brand",
                    reduced ? "opacity-0" : "animate-pulse",
                  )}
                />
              </p>
            </div>

            {/* Run them in any order. */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {queries.map((query, i) => (
                <li key={query}>
                  <button
                    type="button"
                    aria-pressed={q === i}
                    onClick={() => pick(i)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[0.8125rem] leading-none transition-colors duration-300",
                      q === i
                        ? "border-brand bg-brand text-white"
                        : "border-line text-fog hover:border-brand/45 hover:text-brand",
                    )}
                  >
                    {query}
                  </button>
                </li>
              ))}
            </ul>

            {/* And the same five results, whichever one you ran. */}
            <ul aria-hidden className="mt-7 overflow-hidden rounded-xl border border-line">
              {LISTINGS.map((l, i) => (
                <motion.li
                  key={i}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={play ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: EASE }}
                  className={cn(
                    "flex items-center gap-5 border-b border-line bg-ink-3 px-5 py-4 last:border-b-0 transition-colors duration-500",
                    hot === i && "bg-[color-mix(in_srgb,var(--color-brand)_7%,transparent)]",
                  )}
                >
                  <span className="h-8 w-8 shrink-0 rounded-md border border-line bg-[color-mix(in_srgb,var(--color-brand)_6%,transparent)]" />
                  <span className="min-w-0 flex-1">
                    <span className="block h-2.5 rounded-full bg-brand/45" style={{ width: `${l.title}%` }} />
                    <span className="mt-2 block h-1.5 rounded-full bg-line" style={{ width: `${l.url}%` }} />
                    <span className="mt-3 block h-1.5 rounded-full bg-line/70" style={{ width: `${l.lines[0]}%` }} />
                    <span className="mt-1.5 block h-1.5 rounded-full bg-line/70" style={{ width: `${l.lines[1]}%` }} />
                  </span>
                  <RankPromise />
                </motion.li>
              ))}
            </ul>
          </div>

          {/* The work behind them. */}
          <ol className="mt-12 border-t border-line">
            {items.map((item, i) => {
              const on = hot === i;
              return (
                <motion.li
                  key={item.stance}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={play ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: EASE }}
                  onMouseEnter={() => setHot(i)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  tabIndex={0}
                  className="relative grid cursor-default gap-x-8 gap-y-2 border-b border-line py-6 outline-none sm:grid-cols-[3rem_minmax(0,1fr)] lg:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.1fr)]"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-center bg-brand transition-transform duration-500 ease-out",
                      on ? "scale-y-100" : "scale-y-0",
                    )}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "font-display pl-4 text-[0.6875rem] font-bold tabular-nums transition-colors duration-300 sm:pl-5",
                      on ? "text-brand" : "text-brand/35",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={cn(
                      "font-display pl-4 text-[clamp(1rem,1.7vw,1.22rem)] font-extrabold uppercase leading-[1.18] transition-colors duration-300 sm:pl-0",
                      on ? "text-brand" : "text-snow",
                    )}
                  >
                    {item.stance}
                  </p>
                  <p className="pl-4 leading-relaxed text-fog sm:pl-0">{item.detail}</p>
                </motion.li>
              );
            })}
          </ol>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.6, ease: EASE }}
            className="font-display mt-12 max-w-5xl text-[clamp(1.2rem,2.8vw,2.1rem)] font-extrabold uppercase leading-[1.12] text-snow"
          >
            <Marked text={tail} mark={tailMark} />
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
