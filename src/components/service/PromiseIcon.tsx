import { cn } from "@/lib/cn";

/** One bespoke mark per commitment, and no two alike.
 *
 *  WHY NOT THE SHARED GLYPH SET. CapabilityGlyph carries thirty-seven marks for
 *  abstract capabilities -- structure, intent, reporting -- and they are right
 *  where a page lists disciplines. These nine are not disciplines. Each one is a
 *  specific, physical thing that happens on a production: a brief written before
 *  the shoot, a separate microphone, a second angle, a set of finished versions.
 *  Reaching for the generic set here would put the same drawing on two cards
 *  that describe completely different work.
 *
 *  So each mark is drawn for its own sentence, and each animates the part of
 *  itself that its sentence is about -- the brief gets ticked, the level meter
 *  moves, the playhead crosses the edit, the versions fan out. The animation
 *  runs on hover and focus of the card that owns it, never on a loop: nine
 *  looping icons in one section is a fairground.
 *
 *  Transform and dash only, so a stalled clock leaves every mark drawn. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export type PromiseMark =
  | "brief"
  | "questions"
  | "speaker"
  | "setup"
  | "audio"
  | "broll"
  | "post"
  | "versions"
  | "language";

export function PromiseIcon({ mark, className }: { mark: PromiseMark; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden>
      {/* 01 A brief agreed before filming: a sheet, and the point that gets
          settled on it. */}
      {mark === "brief" && (
        <>
          <path d="M11 6h13l5 5v23H11z" {...S} />
          <path d="M24 6v5h5" {...S} />
          <path d="M15 18h11M15 23h8" {...S} opacity="0.55" />
          <path className="pm-tick" d="M15 28.5l3 3 6.5-6.5" {...S} pathLength={1} />
        </>
      )}

      {/* 02 Questions built around the objective: the mark lands on centre. */}
      {mark === "questions" && (
        <>
          <circle cx="20" cy="20" r="13" {...S} opacity="0.5" />
          <circle cx="20" cy="20" r="7.5" {...S} opacity="0.75" />
          <circle className="pm-hit" cx="20" cy="20" r="2.6" fill="currentColor" stroke="none" />
          <path d="M20 4v3M20 33v3M4 20h3M33 20h3" {...S} opacity="0.5" />
        </>
      )}

      {/* 03 Speaker preparation: a person, and what they were told beforehand. */}
      {mark === "speaker" && (
        <>
          <circle cx="16" cy="14" r="6" {...S} />
          <path d="M6 33c0-6.2 4.5-10 10-10s10 3.8 10 10" {...S} />
          <g className="pm-brief-lines">
            <path d="M28 10h8M28 15h6M28 20h8" {...S} opacity="0.7" />
          </g>
        </>
      )}

      {/* 04 The setup: a light, and the beam it throws at the chair. */}
      {mark === "setup" && (
        <>
          <path d="M7 9l9-4v14l-9-4z" {...S} />
          <path d="M11.5 19v14M6 33h11" {...S} />
          <path className="pm-beam" d="M17 8l16 6-16 6z" {...S} opacity="0.45" />
          <path d="M27 33h9" {...S} opacity="0.6" />
        </>
      )}

      {/* 05 Separate microphones: a capsule, and the level it is taking. */}
      {mark === "audio" && (
        <>
          <rect x="15" y="4" width="10" height="17" rx="5" {...S} />
          <path d="M10 17a10 10 0 0 0 20 0" {...S} />
          <path d="M20 27v8M15 35h10" {...S} />
          <g className="pm-level">
            <path d="M5 14v6M8.5 12v10" {...S} opacity="0.7" />
            <path d="M35 14v6M31.5 12v10" {...S} opacity="0.7" />
          </g>
        </>
      )}

      {/* 06 Supporting footage: a second frame cut in behind the first. */}
      {mark === "broll" && (
        <>
          <rect className="pm-behind" x="15" y="7" width="21" height="15" rx="2.5" {...S} opacity="0.5" />
          <rect x="5" y="17" width="23" height="16" rx="2.5" {...S} />
          <path d="M5 22h23" {...S} opacity="0.5" />
          <circle cx="10" cy="19.5" r="0.9" fill="currentColor" stroke="none" />
        </>
      )}

      {/* 07 Post-production: the edit, and the playhead crossing it. */}
      {mark === "post" && (
        <>
          <rect x="4" y="11" width="14" height="7" rx="1.6" {...S} />
          <rect x="21" y="11" width="15" height="7" rx="1.6" {...S} opacity="0.55" />
          <rect x="4" y="23" width="19" height="7" rx="1.6" {...S} opacity="0.55" />
          <rect x="26" y="23" width="10" height="7" rx="1.6" {...S} />
          <path className="pm-playhead" d="M13 6v29" {...S} strokeWidth="1.8" />
        </>
      )}

      {/* 08 Several final versions: one cut, three shapes out of it. */}
      {mark === "versions" && (
        <>
          <rect className="pm-v1" x="4" y="12" width="16" height="10" rx="2" {...S} />
          <rect className="pm-v2" x="23" y="8" width="13" height="9" rx="2" {...S} opacity="0.75" />
          <rect className="pm-v3" x="25" y="21" width="9" height="13" rx="2" {...S} opacity="0.75" />
          <path d="M20 17h3M20 22.5l5 5" {...S} opacity="0.45" />
        </>
      )}

      {/* 09 Two languages: the same line, delivered twice. */}
      {mark === "language" && (
        <>
          <rect x="4" y="7" width="22" height="17" rx="2.5" {...S} />
          <path d="M9 13h12M9 18h8" {...S} opacity="0.6" />
          <rect className="pm-second" x="14" y="16" width="22" height="17" rx="2.5" {...S} />
          <path d="M19 22h12M19 27h8" {...S} opacity="0.6" />
        </>
      )}
    </svg>
  );
}
