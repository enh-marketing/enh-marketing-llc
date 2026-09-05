"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: a conversation, and the line it crosses.
 *
 *  WHAT IT HAS TO SAY. The banner's second sentence is the entire proposition:
 *  the diagnostic exists "to define which conversations the agent should handle,
 *  what information it can access and when a person needs to take over". Two of
 *  those three are a boundary, so the boundary is drawn: one rule down the
 *  middle, the agent's side and your team's side, and a thread that runs on the
 *  agent's side until one message crosses.
 *
 *  WHY THE CROSSING IS THE PICTURE. Every competitor drawing of a chatbot is a
 *  speech bubble, which says only "it talks". What this page is selling is where
 *  it stops talking. The handover is therefore the one element in brand, the one
 *  thing that moves across, and the last thing the loop does before it restarts.
 *
 *  NOTHING IS SCRIPTED. Messages are bars. The document does not write a single
 *  line of customer or agent dialogue, and putting words in either mouth on a
 *  page that promises approved information only would be the one unforgivable
 *  error here. Nothing is counted or timed either.
 *
 *  Same shell as every other hero visual on the site: 356/396 wide, panel on
 *  border-line over bg-ink-2, grid backdrop at 10%. See MissedCall. */

/** Each message: how wide, and which side answers it. The last one is the one
 *  that crosses. */
const THREAD = [
  { w: 74, from: "them" },
  { w: 58, from: "agent" },
  { w: 82, from: "them" },
  { w: 66, from: "agent" },
  { w: 70, from: "them" },
] as const;
const STEP_MS = 900;
/** One beat per message, then a long hold on the handover before it restarts. */
const TOTAL = THREAD.length + 3;

export function HandoverThread({
  parties,
  className,
}: {
  /** The two sides of the rule, in order: the agent, and your team. */
  parties: [string, string];
  className?: string;
}) {
  /** Starts on the last frame, which is the finished, readable state: every
   *  message landed and the handover made. That is what the server renders and
   *  what a reader who has asked for no motion keeps. The first tick wraps to
   *  zero and the thread runs from the beginning. */
  const [at, setAt] = useState(TOTAL - 1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setAt((a) => (a + 1) % TOTAL), STEP_MS);
    return () => window.clearInterval(id);
  }, []);

  /** The crossing happens once every message has landed. */
  const handing = at >= THREAD.length;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="A customer conversation running on the agent's side of a defined boundary, until one request crosses the line and is taken over by your team."
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-6 xl:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div aria-hidden className="relative">
          {/* The two sides. */}
          <div className="flex items-baseline">
            <p
              className={cn(
                "font-display flex-1 text-[0.625rem] font-bold uppercase tracking-[0.1em] transition-colors duration-500",
                handing ? "text-ash" : "text-brand-text",
              )}
            >
              {parties[0]}
            </p>
            <p
              className={cn(
                "font-display flex-1 text-right text-[0.625rem] font-bold uppercase tracking-[0.1em] transition-colors duration-500",
                handing ? "text-brand-text" : "text-ash",
              )}
            >
              {parties[1]}
            </p>
          </div>

          {/* The boundary the diagnostic defines. */}
          <div className="relative mt-4">
            <span
              className={cn(
                "absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-colors duration-500",
                handing ? "bg-brand/60" : "bg-ash/45",
              )}
            />

            <div className="space-y-2.5 py-1">
              {THREAD.map((m, i) => {
                const shown = at >= i;
                return (
                  <div key={i} className="flex">
                    {/* Everything sits on the agent's half. */}
                    <div className="w-1/2 pr-3">
                      <span
                        className={cn(
                          "block h-5 rounded-md transition-all duration-500",
                          m.from === "them"
                            ? "rounded-bl-sm bg-snow/14"
                            : "ml-auto rounded-br-sm bg-snow/26",
                          shown ? "opacity-100" : "opacity-0",
                        )}
                        style={{ width: `${m.w}%` }}
                      />
                    </div>
                    <div className="w-1/2" />
                  </div>
                );
              })}

              {/* The one that crosses. */}
              <div className="flex items-center pt-1">
                <div className="flex w-1/2 items-center pr-3">
                  <span
                    className={cn(
                      "h-5 flex-1 rounded-md rounded-bl-sm bg-brand/18 transition-opacity duration-500",
                      handing ? "opacity-100" : "opacity-0",
                    )}
                  />
                </div>
                <div className="flex w-1/2 items-center gap-2 pl-3">
                  <svg
                    viewBox="0 0 26 14"
                    className={cn(
                      "h-3.5 w-6 shrink-0 -translate-x-[1.35rem] transition-opacity duration-500",
                      handing ? "opacity-100" : "opacity-0",
                    )}
                    fill="none"
                  >
                    <path
                      d="M1 7h20m-5-5 5 5-5 5"
                      stroke="var(--color-brand)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className={cn(
                      "-ml-4 h-5 flex-1 rounded-md rounded-br-sm bg-brand transition-opacity duration-500",
                      handing ? "opacity-100" : "opacity-0",
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* What the crossing carries with it, per the document: the history
              and whatever has already been collected. */}
          <div
            className={cn(
              "mt-4 flex items-center gap-2 border-t border-line pt-4 transition-opacity duration-500",
              handing ? "opacity-100" : "opacity-30",
            )}
          >
            <span className="h-6 w-6 shrink-0 rounded-full border-2 border-brand" />
            <div className="flex-1 space-y-1.5">
              <span className="block h-1 w-[68%] rounded-full bg-snow/28" />
              <span className="block h-1 w-[44%] rounded-full bg-snow/18" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
