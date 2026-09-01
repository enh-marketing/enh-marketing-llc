"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { useEnhanced } from "@/lib/useEnhanced";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { cn } from "@/lib/cn";
import type { Assistant } from "@/content/services/aeo-geo";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The five assistants, one at a time.
 *
 *  WHY NOT THE TABLE THE DOCUMENT SUPPLIED. It is five rows of three dense
 *  prose cells. Printed as a table it is a spreadsheet nobody finishes, and the
 *  Performance Marketing and Meta Ads pages have both already spent their
 *  table on a genuine two-column comparison. This content is not a comparison
 *  — the five assistants are not competing on shared criteria, they simply
 *  work differently — so a switcher is the honest shape: pick one, read it.
 *
 *  WHY TABS AND NOT SCROLL. The benchmark section on the Performance Marketing
 *  page already advances one entry at a time on scroll. Doing it again here
 *  would read as the same section twice. This one is driven by the reader
 *  instead, which also suits content people arrive at with a specific
 *  assistant in mind.
 *
 *  Real tab semantics: roving tabindex, arrow keys, Home and End, and
 *  aria-selected. Below the large breakpoint the tabs are dropped entirely and
 *  all five render stacked, because a vertical tablist beside a panel does not
 *  survive a phone. Every assistant is in the DOM either way — visibly when
 *  stacked, and in a screen-reader-only list when switched — so crawlers and
 *  assistive tech always get the complete table, never just the open tab. */
export function AssistantMatrix({
  id,
  label,
  index,
  title,
  strokeTitle,
  columns,
  rows,
  closing,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  columns: { name: string; finds: string; means: string };
  rows: Assistant[];
  closing: string[];
}) {
  // Width only. Tabs are not motion, so reduced-motion users keep them.
  const enhanced = useEnhanced("(min-width: 1024px)");
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    const last = rows.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const row = rows[active];

  return (
    <section
      id={id}
      data-section={label}
      className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
    >
      {/* Chapter identity: a fine grid, masked away, so the surface reads as
          its own room without introducing a colour the system does not have. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 75% 20%, black, transparent 78%)",
        }}
      />

      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "ecosystem", label: "Five assistants, five routes to an answer" }}
          className="mb-14"
        />

        {enhanced ? (
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,20rem)_1fr]">
            <div
              role="tablist"
              aria-label={columns.name}
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="flex flex-col border-l border-line"
            >
              {rows.map((r, i) => {
                const on = i === active;
                return (
                  <button
                    key={r.name}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`${id}-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`${id}-panel-${i}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative -ml-px border-l-2 py-4 pl-6 pr-4 text-left transition-colors duration-300",
                      on
                        ? "border-brand text-snow"
                        : "border-transparent text-fog hover:border-line hover:text-snow",
                    )}
                  >
                    <span className="font-display block text-base font-bold leading-snug tracking-tight sm:text-lg">
                      {r.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div>
              {/* Keyed, but deliberately not wrapped in AnimatePresence with
                  mode="wait". A tab is a control, and a control has to answer
                  immediately: waiting out an exit animation before mounting the
                  next panel puts a third of a second between the click and the
                  content, and leaves the panel showing the *previous*
                  assistant for the whole of it. Keying the element swaps the
                  content on the same frame as the click; the fade is then
                  decoration on top of an already-correct panel rather than a
                  gate in front of it. */}
              <motion.div
                key={active}
                id={`${id}-panel-${active}`}
                role="tabpanel"
                aria-labelledby={`${id}-tab-${active}`}
                tabIndex={0}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="h-full"
              >
                <div className="grid h-full gap-8 rounded-2xl border border-line bg-ink-2 p-8 sm:grid-cols-2 sm:p-10">
                  <Field label={columns.finds} value={row.finds} />
                  <Field label={columns.means} value={row.means} accent />
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <ol className="grid gap-4 sm:grid-cols-2">
            {rows.map((r, i) => (
              <li key={r.name}>
                <SurfaceCard index={String(i + 1).padStart(2, "0")} delay={(i % 2) * 0.06} padding="tight">
                  <h3 className="font-display text-lg font-extrabold leading-tight tracking-tight text-snow">
                    {r.name}
                  </h3>
                  <div className="mt-5 space-y-5">
                    <Field label={columns.finds} value={r.finds} />
                    <Field label={columns.means} value={r.means} accent />
                  </div>
                </SurfaceCard>
              </li>
            ))}
          </ol>
        )}

        {/* The complete table stays available to anything that does not run the
            tabs. Not aria-hidden: a screen reader should be able to read all
            five in order, not only whichever tab happens to be open. */}
        {enhanced && (
          <div className="sr-only">
            <dl>
              {rows.map((r) => (
                <div key={r.name}>
                  <dt>{r.name}</dt>
                  <dd>
                    {columns.finds}: {r.finds}. {columns.means}: {r.means}.
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="mt-16 grid gap-8 border-t border-line pt-12 sm:grid-cols-2 sm:gap-14">
          {closing.map((p, i) => (
            <Rise key={i} delay={0.08 * i}>
              <p className="leading-relaxed text-fog sm:text-lg">{p}</p>
            </Rise>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** One labelled cell. `accent` marks the column that is about the reader's own
 *  site, which is the half of the table they can act on. */
function Field({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p
        className={cn(
          "text-[0.68rem] font-semibold uppercase tracking-[0.18em]",
          accent ? "text-brand-text" : "text-fog",
        )}
      >
        {label}
      </p>
      <p className="mt-3 leading-relaxed text-snow">{value}</p>
    </div>
  );
}
