import { cn } from "@/lib/cn";

/** One mark per sector, drawn for that sector and nothing else.
 *
 *  These are conventional sector marks -- a tower, a pulse, a crane, a container
 *  -- which is iconography rather than a claim: the document names eleven
 *  sectors and says nothing about what interviews in them involve, and none of
 *  these drawings says otherwise. What they do is give a reader scanning for
 *  their own industry something to find it by, which eleven identical rows of
 *  type cannot.
 *
 *  Each animates one part of itself on hover of the tile that owns it, and the
 *  part is chosen from the thing the sector actually does: the pulse traces,
 *  the crane slews, the container moves down the line, the stage lights.
 *
 *  Transform and dash only, so a stalled clock leaves every mark drawn. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function SectorIcon({ i, className }: { i: number; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-8 w-8", className)} aria-hidden>
      {/* 01 Corporate and professional services — a tower and its floors. */}
      {i === 0 && (
        <>
          <path d="M11 34V9l11-4v29" {...S} />
          <path d="M22 34V16l8 3v15" {...S} opacity="0.7" />
          <path d="M5 34h30" {...S} opacity="0.5" />
          <g className="sc-floors">
            <path d="M15 13h3M15 19h3M15 25h3M26 22h1.5M26 27h1.5" {...S} opacity="0.6" />
          </g>
        </>
      )}

      {/* 02 Healthcare — the trace running across the monitor. */}
      {i === 1 && (
        <>
          <rect x="4" y="9" width="32" height="22" rx="3" {...S} />
          <path className="sc-trace" d="M8 21h5l3-6 4 12 3-7h9" {...S} pathLength={1} />
        </>
      )}

      {/* 03 Education and training — a board and what is being taught on it. */}
      {i === 2 && (
        <>
          <rect x="5" y="6" width="30" height="21" rx="2.5" {...S} />
          <path d="M20 27v7M14 34h12" {...S} opacity="0.7" />
          <g className="sc-chalk">
            <path d="M10 13h13M10 18h9" {...S} opacity="0.65" />
          </g>
        </>
      )}

      {/* 04 Technology and B2B — a die and its pins. */}
      {i === 3 && (
        <>
          <rect x="12" y="12" width="16" height="16" rx="2.5" {...S} />
          <rect className="sc-core" x="17" y="17" width="6" height="6" rx="1.2" {...S} opacity="0.75" />
          <path d="M17 12V7M23 12V7M17 33v-5M23 33v-5M12 17H7M12 23H7M33 17h-5M33 23h-5" {...S} opacity="0.6" />
        </>
      )}

      {/* 05 Oil, gas and energy — a derrick over the line. */}
      {i === 4 && (
        <>
          <path d="M10 34L20 7l10 27" {...S} />
          <path d="M14 24h12M12 29h16" {...S} opacity="0.6" />
          <path d="M4 34h32" {...S} opacity="0.5" />
          <circle className="sc-drill" cx="20" cy="18" r="2.2" fill="currentColor" stroke="none" />
        </>
      )}

      {/* 06 Construction and engineering — the crane, and its slew. */}
      {i === 5 && (
        <>
          <path d="M10 34V8M6 34h8" {...S} />
          <g className="sc-jib" style={{ transformOrigin: "10px 8px" }}>
            <path d="M10 8h22M10 8L18 3" {...S} />
            <path d="M28 8v7" {...S} opacity="0.75" />
            <rect x="25" y="15" width="6" height="5" rx="1" {...S} opacity="0.75" />
          </g>
        </>
      )}

      {/* 07 Logistics and supply chain — a container moving down the line. */}
      {i === 6 && (
        <>
          <path d="M4 30h32" {...S} opacity="0.5" />
          <g className="sc-move">
            <rect x="8" y="14" width="17" height="12" rx="1.6" {...S} />
            <path d="M13 14v12M18 14v12" {...S} opacity="0.55" />
          </g>
          <circle cx="12" cy="29" r="2.4" {...S} opacity="0.7" />
          <circle cx="22" cy="29" r="2.4" {...S} opacity="0.7" />
        </>
      )}

      {/* 08 Real estate and development — a plot, and the block that rises on it. */}
      {i === 7 && (
        <>
          <path d="M4 34h32" {...S} opacity="0.5" />
          <path d="M6 22l14-11 14 11" {...S} />
          <g className="sc-rise">
            <rect x="13" y="22" width="14" height="12" rx="1.4" {...S} />
            <path d="M18 34v-6h4v6" {...S} opacity="0.65" />
          </g>
        </>
      )}

      {/* 09 Hospitality and retail — a front, and its awning. */}
      {i === 8 && (
        <>
          <path d="M7 18v16h26V18" {...S} />
          <path className="sc-awning" d="M4 18l4-8h24l4 8z" {...S} />
          <path d="M16 34V24h8v10" {...S} opacity="0.7" />
        </>
      )}

      {/* 10 Conferences and exhibitions — a stage, and the room in front of it. */}
      {i === 9 && (
        <>
          <rect x="9" y="6" width="22" height="13" rx="1.8" {...S} />
          <path className="sc-stage" d="M13 11h14M13 15h9" {...S} opacity="0.7" />
          <path d="M4 24h32" {...S} opacity="0.5" />
          <g className="sc-seats">
            <circle cx="11" cy="30" r="2" {...S} opacity="0.65" />
            <circle cx="20" cy="30" r="2" {...S} opacity="0.65" />
            <circle cx="29" cy="30" r="2" {...S} opacity="0.65" />
          </g>
        </>
      )}

      {/* 11 Public and community organisations — a civic front. */}
      {i === 10 && (
        <>
          <path d="M4 15L20 6l16 9" {...S} />
          <path d="M4 34h32" {...S} opacity="0.5" />
          <g className="sc-columns">
            <path d="M10 18v13M17 18v13M23 18v13M30 18v13" {...S} opacity="0.75" />
          </g>
          <path d="M6 18h28" {...S} opacity="0.6" />
        </>
      )}
    </svg>
  );
}
