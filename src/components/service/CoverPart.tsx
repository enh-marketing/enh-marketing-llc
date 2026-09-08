"use client";

import { cn } from "@/lib/cn";
import type { Cover } from "@/content/services/website-maintenance-support";

/** Nine parts of a maintained website, each drawn as the thing it is.
 *
 *  WHY NINE DRAWINGS AND NOT NINE ICONS. The document's nine entries are not
 *  nine variations on "we look after your site" — a plugin update, a broken
 *  layout, a form whose notification never fires and a backup you can restore
 *  from are four unrelated objects, and a set of glyphs in circles would flatten
 *  them into one texture. Each drawing here shows its own subsystem in the state
 *  the copy beside it describes.
 *
 *  EVERY DRAWING CARRIES ITS LIMIT. Six of the nine entries end by naming where
 *  the work stops, so six of the drawings end on a dashed edge: the thing that
 *  is not inside the scope is drawn, and drawn as outside. The security shield
 *  is deliberately not a closed shape, because the document says in as many
 *  words that "Security monitoring does not make any website completely
 *  risk-free" — a sealed shield would contradict the sentence printed under it.
 *
 *  NOTHING IS COUNTED, EVER. No versions, no scores, no load times, no uptime.
 *  This document contains no figure of any kind and the marks here are shapes,
 *  not values.
 *
 *  `on` raises the drawing when its card is the one being read. Every drawing is
 *  complete at rest, so the unlit state is never a half-picture. */

const LINE = "var(--color-line)";

/** Shared shorthands. `ink` is the resting fill, `hot` the lit one. */
function Bar({ w, on, dim = false }: { w: number; on: boolean; dim?: boolean }) {
  return (
    <span
      className={cn(
        "block h-1.5 rounded-full transition-colors duration-500 motion-reduce:transition-none",
        dim ? "bg-line/60" : on ? "bg-brand/55" : "bg-line",
      )}
      style={{ width: `${w}%` }}
    />
  );
}

/* 01 — CMS and Plugin Updates. Components with their supported state, and the
   update standing off the stack until it has been checked. */
function Platform({ on }: { on: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex items-center gap-2.5">
          <span
            className={cn(
              "h-3.5 w-3.5 shrink-0 rounded-[3px] transition-colors duration-500 motion-reduce:transition-none",
              on ? "bg-brand/70" : "bg-snow/25",
            )}
          />
          <span className="flex-1">
            <Bar w={[84, 62, 74][row]} on={on} />
          </span>
          {/* Its supported state: ticks, not dots. Three dots on the end of a
              row reads as a menu button. */}
          <span className="flex shrink-0 items-center gap-[3px]">
            {[0, 1, 2].map((k) => (
              <span
                key={k}
                className={cn(
                  "block w-[2px] rounded-full transition-colors duration-500 motion-reduce:transition-none",
                  row === 1 && k === 2
                    ? "h-2 bg-ash/45"
                    : on
                      ? "h-3.5 bg-brand/70"
                      : "h-3.5 bg-line",
                )}
              />
            ))}
          </span>
        </div>
      ))}
      {/* The update, held outside the stack while its impact is checked. */}
      <div className="mt-1 flex items-center gap-2.5">
        <span
          className={cn(
            "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border border-dashed transition-colors duration-500 motion-reduce:transition-none",
            on ? "border-brand" : "border-ash/70",
          )}
        />
        <span className="h-px flex-1 border-t border-dashed border-line" />
        <svg
          viewBox="0 0 16 16"
          className={cn("h-3.5 w-3.5 transition-colors duration-500", on ? "text-brand" : "text-ash")}
          fill="none"
        >
          <path
            d="M8 13V3M4 7l4-4 4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* 02 — Bug Fixes and Technical Support. A layout with one cell out of place,
   and the check that closes the request. */
function Repair({ on }: { on: boolean }) {
  return (
    <div className="flex h-full items-center gap-3">
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((cell) => {
          const broken = cell === 4;
          return (
            <span
              key={cell}
              className={cn(
                "block h-7 rounded transition-all duration-500 motion-reduce:transition-none",
                broken
                  ? "translate-x-1.5 border border-dashed border-ash/70 bg-transparent"
                  : on
                    ? "bg-brand/20"
                    : "bg-line/70",
              )}
            />
          );
        })}
      </div>
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 motion-reduce:transition-none",
          on ? "border-brand bg-brand/10" : "border-line",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={cn("h-4 w-4 transition-colors duration-500", on ? "text-brand" : "text-ash")}
          fill="none"
        >
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

/* 03 — Content and Page Updates. An existing section being replaced in place,
   with the new page it would take to go further drawn outside the frame. */
function Content({ on }: { on: boolean }) {
  return (
    <div className="flex h-full items-center gap-3">
      <div className="relative flex-1 rounded-md border border-line bg-ink-3 p-2.5">
        <span className="block h-1.5 w-2/5 rounded-full bg-snow/25" />
        <div className="mt-2 flex gap-2">
          <span
            className={cn(
              "block h-9 w-11 shrink-0 rounded transition-colors duration-500 motion-reduce:transition-none",
              on ? "bg-brand/20" : "bg-line/70",
            )}
          />
          <span className="flex-1 space-y-1.5 pt-0.5">
            <Bar w={100} on={on} />
            <Bar w={82} on={on} />
            {/* The section being changed, drawn as the swap it is. */}
            <span
              className={cn(
                "relative block h-2 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                on ? "bg-brand/70" : "bg-snow/25",
              )}
              style={{ width: "64%" }}
            >
              <span className="absolute -bottom-1 left-1.5 h-2 w-full rounded-full border border-dashed border-ash/60" />
            </span>
          </span>
        </div>
      </div>
      {/* A new page: outside the frame, on a broken edge. */}
      <span
        className={cn(
          "flex h-12 w-9 shrink-0 flex-col gap-1 rounded border border-dashed p-1.5 transition-colors duration-500 motion-reduce:transition-none",
          on ? "border-brand/70" : "border-line",
        )}
      >
        <span className="block h-1 w-full rounded-full bg-line/60" />
        <span className="block h-1 w-3/4 rounded-full bg-line/60" />
      </span>
    </div>
  );
}

/* 04 — Forms and Enquiry Checks. The whole route, checked end to end: the
   submission, the confirmation, the notification and the system behind it. */
function FormRoute({ on }: { on: boolean }) {
  return (
    <div className="flex h-full items-center gap-2">
      <div className="w-[38%] shrink-0 rounded-md border border-line bg-ink-3 p-2">
        <span className="block h-1.5 w-full rounded-full bg-line" />
        <span className="mt-1.5 block h-1.5 w-4/5 rounded-full bg-line" />
        <span
          className={cn(
            "mt-2 block h-3.5 w-11 rounded-full transition-colors duration-500 motion-reduce:transition-none",
            on ? "bg-brand" : "bg-snow/25",
          )}
        />
      </div>

      {[0, 1].map((leg) => (
        <span key={leg} className="flex flex-1 items-center gap-1.5">
          <span className={cn("h-px flex-1 transition-colors duration-500", on ? "bg-brand/60" : "bg-line")} />
          <span
            className={cn(
              "h-2 w-2 shrink-0 rotate-45 transition-colors duration-500 motion-reduce:transition-none",
              on ? "bg-brand" : "bg-line",
            )}
          />
        </span>
      ))}

      <span className={cn("h-px w-3 transition-colors duration-500", on ? "bg-brand/60" : "bg-line")} />

      <span
        className={cn(
          "flex h-10 w-11 shrink-0 flex-col justify-end gap-1 rounded-md border p-1.5 transition-colors duration-500 motion-reduce:transition-none",
          on ? "border-brand" : "border-line",
        )}
      >
        <span className={cn("block h-1 w-full rounded-full", on ? "bg-brand/60" : "bg-line/60")} />
        <span className={cn("block h-1 w-full rounded-full", on ? "bg-brand/60" : "bg-line/60")} />
      </span>
    </div>
  );
}

/* 05 — Website Performance Checks. Weight coming off the page, and the layer
   underneath it that is somebody else's to change. */
function Performance({ on }: { on: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      <div className="flex items-end gap-1.5">
        {[26, 20, 14, 10, 8].map((h, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-t transition-colors duration-500 motion-reduce:transition-none",
              on ? "bg-brand/45" : "bg-line",
            )}
            style={{ height: `${h}px` }}
          />
        ))}
        <span
          className="flex-1 rounded-t border border-dashed border-ash/70"
          style={{ height: "8px" }}
        />
      </div>
      <span className={cn("h-px w-full transition-colors duration-500", on ? "bg-brand/60" : "bg-line")} />
      {/* The server and hosting layer: drawn, and drawn as separate. */}
      <div className="flex items-center gap-2">
        <span className="h-3 flex-1 rounded border border-dashed border-line" />
        <span className="h-3 w-3 shrink-0 rounded-full border border-dashed border-line" />
      </div>
    </div>
  );
}

/* 06 — Security Monitoring. A shield that is deliberately open at one edge,
   because the copy under it says monitoring is not a guarantee. */
function Security({ on }: { on: boolean }) {
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <svg viewBox="0 0 64 72" className="h-[68px] w-[60px] shrink-0" fill="none" aria-hidden>
        {/* Left half: closed. */}
        <path
          d="M32 4 8 12v22c0 15 10 27.5 24 34"
          stroke={on ? "var(--color-brand)" : LINE}
          strokeWidth="1.6"
          strokeLinejoin="round"
          className="transition-[stroke] duration-500"
        />
        {/* Right half: broken, and it stays broken. */}
        <path
          d="M32 4l24 8v22c0 15-10 27.5-24 34"
          stroke="var(--color-ash)"
          strokeWidth="1.6"
          strokeDasharray="5 5"
          strokeLinejoin="round"
          opacity="0.75"
        />
        {/* The watch across it. */}
        <path
          d="M14 38h13l5-8 5 14 4-6h9"
          stroke={on ? "var(--color-brand)" : LINE}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-[stroke] duration-500"
        />
      </svg>
      <div className="flex-1 space-y-2">
        <Bar w={78} on={on} />
        <Bar w={58} on={on} dim />
        <span className="flex items-center gap-2">
          <span
            className={cn(
              "h-2 w-2 shrink-0 rotate-45 transition-colors duration-500 motion-reduce:transition-none",
              on ? "bg-brand" : "bg-ash/70",
            )}
          />
          <span className="h-px flex-1 border-t border-dashed border-line" />
        </span>
      </div>
    </div>
  );
}

/* 07 — Backup and Recovery Coordination. Recovery points, and the way back
   from one of them. */
function Backup({ on }: { on: boolean }) {
  return (
    <div className="flex h-full items-center gap-4">
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2].map((slab) => (
          <span
            key={slab}
            className={cn(
              "block h-3 rounded-sm transition-colors duration-500 motion-reduce:transition-none",
              slab === 0 && on ? "bg-brand/70" : "bg-line",
            )}
            style={{ width: `${52 - slab * 8}px` }}
          />
        ))}
      </div>

      <svg
        viewBox="0 0 40 40"
        className={cn("h-10 w-10 shrink-0 transition-colors duration-500", on ? "text-brand" : "text-ash")}
        fill="none"
        aria-hidden
      >
        <path
          d="M6 26a14 14 0 1 0 4-16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M4 4v8h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="flex-1 rounded-md border border-line bg-ink-3 p-2">
        <span className="block h-1.5 w-1/2 rounded-full bg-snow/25" />
        <span className="mt-1.5 flex gap-1.5">
          {[0, 1, 2].map((k) => (
            <span
              key={k}
              className={cn(
                "h-5 flex-1 rounded transition-colors duration-500 motion-reduce:transition-none",
                on ? "bg-brand/20" : "bg-line/70",
              )}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

/* 08 — Integration Support. Four services on the site's edge, and one of them
   past the boundary of what we can reach. */
function Integrations({ on }: { on: boolean }) {
  return (
    <div className="flex h-full items-center gap-3">
      <span
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-md border transition-colors duration-500 motion-reduce:transition-none",
          on ? "border-brand bg-brand/[0.07]" : "border-line bg-ink-3",
        )}
      >
        <span className={cn("h-3 w-3 rounded-[3px] transition-colors duration-500", on ? "bg-brand" : "bg-snow/25")} />
      </span>

      <div className="flex flex-1 flex-col gap-1.5">
        {[0, 1, 2].map((leg) => (
          <span key={leg} className="flex items-center gap-2">
            <span className={cn("h-px flex-1 transition-colors duration-500", on ? "bg-brand/60" : "bg-line")} />
            <span
              className={cn(
                "h-2.5 w-2.5 shrink-0 rounded-full border transition-colors duration-500 motion-reduce:transition-none",
                on ? "border-brand" : "border-line",
              )}
            />
          </span>
        ))}
        {/* The one that is not ours to fix. */}
        <span className="flex items-center gap-2">
          <span className="h-px flex-1 border-t border-dashed border-ash/70" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-dashed border-ash/70" />
        </span>
      </div>

      {/* The boundary the last leg crosses. */}
      <span className="h-full w-px shrink-0 border-l border-dashed border-line" />
      <span className="h-6 w-3 shrink-0 rounded-sm border border-dashed border-ash/60" />
    </div>
  );
}

/* 09 — New Features and Improvements. What the maintenance record points at,
   drawn outside the site's current edge. */
function Beyond({ on }: { on: boolean }) {
  return (
    <div className="flex h-full items-center gap-3">
      <div className="w-[44%] shrink-0 rounded-md border border-line bg-ink-3 p-2">
        <span className="block h-1.5 w-3/5 rounded-full bg-snow/25" />
        <span className="mt-2 flex gap-1.5">
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="h-4 flex-1 rounded bg-line/70" />
          ))}
        </span>
        <span className="mt-1.5 flex gap-1.5">
          {[0, 1].map((k) => (
            <span key={k} className="h-4 flex-1 rounded bg-line/70" />
          ))}
        </span>
      </div>

      <svg
        viewBox="0 0 32 24"
        className={cn("h-6 w-8 shrink-0 transition-colors duration-500", on ? "text-brand" : "text-ash")}
        fill="none"
        aria-hidden
      >
        <path d="M2 12h26" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M22 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Scoped, not yet built. */}
      <div
        className={cn(
          "flex-1 rounded-md border border-dashed p-2 transition-colors duration-500 motion-reduce:transition-none",
          on ? "border-brand bg-brand/[0.05]" : "border-line",
        )}
      >
        <span
          className={cn(
            "block h-1.5 w-2/3 rounded-full transition-colors duration-500",
            on ? "bg-brand/70" : "bg-line",
          )}
        />
        <span className="mt-2 flex items-center gap-1.5">
          <span className={cn("h-5 w-8 rounded transition-colors duration-500", on ? "bg-brand/25" : "bg-line/50")} />
          <span className="h-5 flex-1 rounded border border-dashed border-line" />
        </span>
      </div>
    </div>
  );
}

const PARTS: Record<Cover["zone"], (p: { on: boolean }) => React.ReactElement> = {
  platform: Platform,
  repair: Repair,
  content: Content,
  form: FormRoute,
  performance: Performance,
  security: Security,
  backup: Backup,
  integrations: Integrations,
  beyond: Beyond,
};

export function CoverPart({ zone, on }: { zone: Cover["zone"]; on: boolean }) {
  const Part = PARTS[zone];
  return (
    <div aria-hidden className="h-full w-full">
      <Part on={on} />
    </div>
  );
}
