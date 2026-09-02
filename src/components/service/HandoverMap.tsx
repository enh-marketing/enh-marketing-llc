"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Seven services, drawn against the one line that separates them.
 *
 *  WHY THIS. The obvious drawing for a list of automation services is a network
 *  of connected systems, and it would say nothing: every service connects
 *  systems, so every selection would light the same picture. What actually
 *  differs between these seven is whether the work stops for a person. The
 *  document says so itself, service by service. An agent will "pass the work to
 *  a person when approval or judgement is required". Document processing adds
 *  "human review ... where accuracy or approval is important". Enquiry handling
 *  will "assign the request to the correct person". Reporting will "flag
 *  differences for the team to review". Workflow automation, monitoring and
 *  custom tooling say nothing of the kind.
 *
 *  So the drawing is two lanes. Every service is a station on the machine lane;
 *  the ones the document puts a person into raise a branch to the lane above.
 *  Selecting a service moves the station and either opens that branch or leaves
 *  it closed, which makes the page's argument visible in the navigation itself.
 *
 *  THE FLAGS ARE THE CONTENT FILE'S, not this component's, and each one cites
 *  the sentence it was read from. A service whose description says nothing
 *  about a person is flagged false rather than guessed either way.
 *
 *  THE PINS ARE A RAIL above the drawing, in numbered order. Placing them on
 *  the stations put the tablist into the drawing's layout order instead of the
 *  document's, which is a keyboard-navigation bug the earlier diagrams on this
 *  site had to be fixed for. */
export function HandoverMap({
  active,
  pin,
  count,
  loop,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
  /** Per service, whether the document puts a person in the loop. */
  loop: boolean[];
}) {
  const handover = loop[active] ?? false;
  const stations = Array.from({ length: count });

  return (
    <div className="rounded-[1.25rem] border border-line bg-ink-2 p-5 sm:p-6">
      {/* Pin rail. Document order, above the drawing. */}
      <div className="mb-6 flex flex-wrap gap-2">
        {stations.map((_, i) => pin(i))}
      </div>

      {/* The person lane. */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className={cn(
            "font-display w-[4.5rem] shrink-0 text-[0.55rem] font-semibold uppercase transition-colors duration-500",
            handover ? "text-brand-text" : "text-ash/50",
          )}
        >
          Person
        </span>
        <div
          className={cn(
            "flex flex-1 items-center justify-center rounded-xl border py-3 transition-colors duration-500",
            handover ? "border-brand/60 bg-brand/[0.09]" : "border-line/60 bg-void/30",
          )}
        >
          {/* Abstract, never an avatar. */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none">
            <circle
              cx="12"
              cy="8"
              r="3.4"
              className={cn("transition-colors duration-500", handover ? "fill-brand" : "fill-ash/40")}
            />
            <path
              d="M5.5 19a6.5 6.5 0 0 1 13 0"
              strokeWidth="1.8"
              strokeLinecap="round"
              className={cn(
                "transition-colors duration-500",
                handover ? "stroke-brand" : "stroke-ash/40",
              )}
            />
          </svg>
        </div>
      </div>

      {/* The branch between the lanes.
          It draws rather than recolours. The earlier version swapped the line's
          colour between the two states, which told you the answer but not the
          event: the work leaving the machine and going to a person is a
          movement, so the line grows out of the machine lane and up into the
          person lane. Closed, the dashed track stays visible underneath, so the
          route exists and is simply not taken. */}
      <div className="flex items-stretch gap-3">
        <span aria-hidden className="w-[4.5rem] shrink-0" />
        <div aria-hidden className="flex flex-1 justify-center">
          <span className="relative my-1 block h-6 w-px">
            {/* The route, always there. */}
            <span
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, var(--color-line) 0 3px, transparent 3px 6px)",
                backgroundSize: "1px 6px",
              }}
            />
            {/* The route taken. Grows upward from the machine lane, because
                that is the direction the work travels. */}
            <span
              className={cn(
                "absolute inset-0 origin-bottom bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                handover ? "scale-y-100" : "scale-y-0",
              )}
            />
          </span>
        </div>
      </div>

      {/* The machine lane: every service, always on screen. */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="font-display w-[4.5rem] shrink-0 text-[0.55rem] font-semibold uppercase text-ash"
        >
          Machine
        </span>
        <div className="relative flex flex-1 items-center rounded-xl border border-line bg-void/30 px-3 py-3">
          <span aria-hidden className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-line" />
          <div className="relative flex w-full items-center justify-between">
            {stations.map((_, i) => (
              <span
                key={i}
                aria-hidden
                className={cn(
                  "h-3 w-3 rounded-[3px] border transition-all duration-500",
                  active === i
                    ? "scale-125 border-brand bg-brand"
                    : "border-line bg-ink-2",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
