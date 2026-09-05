"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** The session on a timeline, and the cut that proves the copy.
 *
 *  WHAT THIS SECTION HAS TO CONVEY. Two sentences, both of them concrete and
 *  both of them about the edit room:
 *
 *    "The questions are written to encourage complete answers, so the final
 *     video can still make sense when the interviewer's voice is removed."
 *    "Pauses and repeated attempts are normal and are handled during editing.
 *     The subject does not need to deliver every answer perfectly in one take."
 *
 *  The old treatment drew two panels of grey bars and faded a row out on a
 *  timer. Bars cannot show what survives a cut, the timer meant the reader
 *  could miss the whole event, and neither claim was actually demonstrated --
 *  the drawing was decoration next to the sentence rather than proof of it.
 *
 *  SO THE DRAWING IS THE EDIT. Two lanes, which is how any editor lays this
 *  out: the interviewer above, the subject below. The subject's lane contains
 *  the things the copy promises are normal -- second attempts, a pause, a
 *  re-framed answer. Then the cut runs: the interviewer's lane lifts out, the
 *  discarded takes close to nothing, and the keepers slide together into one
 *  continuous answer. That is both sentences happening at once, and it is the
 *  literal thing the client does for a living rather than a metaphor borrowed
 *  from somewhere else.
 *
 *  NO TIME IS STATED. There is no timecode, no duration and no take count on
 *  this page, because the document gives none: the FAQ deliberately refuses to
 *  fix a camera count or a shoot length. Segment widths are proportions of a
 *  drawing, and the ruler above them is unnumbered.
 *
 *  IT RUNS ONCE, THEN IT IS YOURS. The cut plays itself the first time the
 *  section is reached, so a reader who never touches anything still sees the
 *  point; after that the control is theirs and it can be run both ways. Under
 *  reduced motion it opens on the finished cut with no movement at all.
 *
 *  All of it is CSS transitions on flex-grow, width and height -- no animation
 *  library holding a dozen tweens open, nothing that can desynchronise from the
 *  layout, and no state in which copy is hidden. */

/** One exchange: a question, then what the subject actually gave. Weights are
 *  proportions of the track, never seconds. Hand-set so the session reads as a
 *  real one -- a clean first answer here, three attempts there, a pause where
 *  somebody lost their thread. */
const EXCHANGES: { q: number; takes: { w: number; keep: boolean }[] }[] = [
  { q: 3, takes: [{ w: 2, keep: false }, { w: 6, keep: true }] },
  { q: 2, takes: [{ w: 7, keep: true }] },
  { q: 4, takes: [{ w: 3, keep: false }, { w: 2, keep: false }, { w: 8, keep: true }] },
  { q: 2, takes: [{ w: 1, keep: false }, { w: 5, keep: true }] },
  { q: 3, takes: [{ w: 6, keep: true }] },
  { q: 2, takes: [{ w: 2, keep: false }, { w: 7, keep: true }] },
];

/** Interface labels. The document has no wording for a control it never
 *  imagined, so these three name lanes and an action and claim nothing about
 *  the service that the copy beside them does not already say. */
const LABEL = {
  interviewer: "Interviewer",
  subject: "Answer used",
  discarded: "Pause or second attempt",
  cut: "Remove the interviewer",
  raw: "Show the raw session",
};

export function EditTimeline({
  test,
  filming,
  job,
}: {
  test: string;
  filming: string;
  job: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [cut, setCut] = useState(false);
  const played = useRef(false);

  useEffect(() => {
    /* Observe the track panel rather than the whole block. The block runs to
       roughly a full viewport, so a threshold on it could never be met on a
       laptop -- the first version watched the block at 0.35 and simply never
       fired. The panel is a couple of hundred pixels, so 0.6 of it means the
       timeline is genuinely on screen and worth playing. */
    const el = track.current;
    if (!el) return;

    /** Both paths land here, so the state change is always asynchronous and
     *  never a cascading render out of the effect body. */
    const run = (delay: number) => {
      if (played.current) return;
      played.current = true;
      return window.setTimeout(() => setCut(true), delay);
    };

    // Reduced motion goes straight to the finished cut. It does not animate
    // there: globals.css suppresses every transition inside the track for the
    // same reader, so the timeline is simply already cut.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = run(0);
      return () => window.clearTimeout(t);
    }

    let t: number | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || played.current) return;
        io.disconnect();
        // A beat to let the reader see the raw session before it changes.
        t = run(1100);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div ref={root}>
      {/* The claim the track is about to prove. */}
      <p className="font-display max-w-4xl text-[clamp(1.2rem,2.5vw,1.95rem)] font-extrabold uppercase leading-[1.13] text-snow">
        {test}
      </p>

      <div className="mt-12">
        <div ref={track} className="rounded-2xl border border-line bg-ink-3 p-5 sm:p-7">
        {/* Legend and control. */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            {[
              { k: "interviewer", label: LABEL.interviewer },
              { k: "subject", label: LABEL.subject },
              { k: "discarded", label: LABEL.discarded },
            ].map((l) => (
              <li key={l.k} className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className={cn(
                    "h-2.5 w-5 shrink-0 rounded-[2px] border",
                    l.k === "interviewer" && "border-brand/60 bg-brand/15",
                    l.k === "subject" && "border-brand bg-brand",
                    l.k === "discarded" && "border-dashed border-line bg-transparent",
                  )}
                />
                <span className="font-display text-[0.6875rem] font-bold uppercase tracking-wide text-ash">
                  {l.label}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setCut((v) => !v)}
            aria-pressed={cut}
            className={cn(
              "inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
              cut
                ? "border-line text-snow hover:border-brand hover:text-brand"
                : "border-brand bg-brand text-white hover:bg-brand-deep",
            )}
          >
            {/* Scissors when there is a cut to make; an undo arrow after. */}
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
              {cut ? (
                <path
                  d="M4 10a6 6 0 1 1 1.8 4.3M4 10V6m0 4h4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <>
                  <circle cx="5" cy="15" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="15" cy="15" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M6.6 13.3 15 3M13.4 13.3 5 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
            {cut ? LABEL.raw : LABEL.cut}
          </button>
        </div>

        {/* An unnumbered ruler: this is a timeline, not a stopwatch. */}
        <div aria-hidden className="mb-3 flex h-3 items-end gap-[3px] overflow-hidden">
          {Array.from({ length: 64 }, (_, i) => (
            <span
              key={i}
              className={cn("w-px flex-1 bg-line", i % 8 === 0 ? "h-3" : "h-1.5")}
            />
          ))}
        </div>

        {/* The two lanes. Each exchange is a column, so a question always sits
            above the answer it drew, and the whole column carries its own
            weight in the row. */}
        <div aria-hidden className="et-track flex items-stretch">
          {EXCHANGES.map((ex, i) => {
            const rawW = ex.q + ex.takes.reduce((s, t) => s + t.w, 0);
            const keepW = ex.takes.reduce((s, t) => s + (t.keep ? t.w : 0), 0);
            const ease = "cubic-bezier(0.16,1,0.3,1)";
            /** A question occupies its own share of the exchange, and the
             *  answers begin after it. Both lanes run on the same time axis,
             *  which is the only way the cut reads as an edit rather than as
             *  two unrelated rows changing at once. */
            const grow = (w: number, gone: boolean) => ({
              flexGrow: gone ? 0 : w,
              flexBasis: 0,
              minWidth: 0,
              transition: `flex-grow 900ms ${ease}`,
            });
            return (
              <div
                key={i}
                className={cn(
                  "min-w-0 flex-col",
                  // Six exchanges inside a phone's 285px of track would be
                  // fifteen-pixel slivers. Half of them is still a session,
                  // and it stays legible.
                  i < 3 ? "flex" : "hidden sm:flex",
                )}
                style={{
                  flexGrow: cut ? keepW : rawW,
                  flexBasis: 0,
                  transition: `flex-grow 900ms ${ease}`,
                  paddingRight: 4,
                }}
              >
                {/* Interviewer lane. The question lifts out of the timeline. */}
                <div
                  className="flex"
                  style={{
                    height: cut ? 0 : 30,
                    marginBottom: cut ? 0 : 8,
                    opacity: cut ? 0 : 1,
                    transform: cut ? "translateY(-12px)" : "none",
                    transition: `height 700ms ${ease}, opacity 460ms ease, margin-bottom 700ms ${ease}, transform 700ms ${ease}`,
                  }}
                >
                  <div
                    className="rounded-[3px] border border-brand/60 bg-brand/[0.14]"
                    style={grow(ex.q, cut)}
                  />
                  <div style={grow(rawW - ex.q, false)} />
                </div>

                {/* Subject lane. It starts where the question ends, the
                    discarded takes close to nothing, and the keepers grow into
                    the space and meet. */}
                <div className="flex h-14 items-stretch">
                  {/* The silence while the question is being asked. */}
                  <div style={{ ...grow(ex.q, cut), marginRight: cut ? 0 : 4, transition: `flex-grow 900ms ${ease}, margin-right 900ms ${ease}` }} />
                  {ex.takes.map((t, j) => (
                    <div
                      key={j}
                      className={cn(
                        "rounded-[3px] border",
                        t.keep
                          ? "border-brand bg-brand/85"
                          : "border-dashed border-line bg-line/30",
                      )}
                      style={{
                        ...grow(t.w, cut && !t.keep),
                        opacity: cut && !t.keep ? 0 : 1,
                        marginRight: cut && !t.keep ? 0 : j < ex.takes.length - 1 ? 4 : 0,
                        transition: `flex-grow 900ms ${ease}, opacity 450ms ease, margin-right 900ms ${ease}`,
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        </div>
      </div>

      {/* What that means in the room. `filming` is the sentence the discarded
          takes above are a picture of, so it sits directly under them. */}
      <div className="mt-12 grid gap-x-14 gap-y-6 border-t border-line pt-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <p className="leading-relaxed text-snow sm:text-lg">{filming}</p>
        <p className="font-display text-[clamp(1rem,1.9vw,1.32rem)] font-extrabold uppercase leading-[1.16] text-snow">
          {job}
        </p>
      </div>
    </div>
  );
}
