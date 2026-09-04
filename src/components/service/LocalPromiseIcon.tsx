import { cn } from "@/lib/cn";

/** One bespoke mark per commitment on the Local SEO page, and no two alike.
 *
 *  WHY NOT THE SHARED GLYPH SET, AND WHY NOT THE INTERVIEW SET EITHER.
 *  CapabilityGlyph draws disciplines. PromiseIcon draws the physical things
 *  that happen on a film set. Neither fits these seven, which are promises
 *  about how a local business is represented: an audit run before anything is
 *  touched, a profile kept inside Google's rules, pages written for real areas,
 *  reviews asked for honestly, services kept apart from each other, numbers
 *  tied back to a call. Every mark here is drawn for its own sentence.
 *
 *  Each animates the part of itself its sentence is about: the lens travels
 *  across the audit, the shield's guard draws itself, the star is drawn rather
 *  than stamped, the two lanes pull apart, the tie runs from the tallest bar to
 *  the action it is connected with. Hover and focus of the owning card, never a
 *  loop.
 *
 *  Transform and dash only, so a stalled clock still leaves every mark fully
 *  drawn. See globals.css, "Bespoke marks (Local SEO: promises)". */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export type PromiseMark =
  | "audit"
  | "operations"
  | "policy"
  | "pages"
  | "reviews"
  | "boundaries"
  | "reporting";

export function LocalPromiseIcon({ mark, className }: { mark: PromiseMark; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden>
      {/* 01 An audit before changes begin: the existing site read through a
          lens, before a single thing on it has moved. */}
      {mark === "audit" && (
        <>
          <rect x="5.5" y="7" width="21" height="26" rx="2.5" {...S} />
          <path d="M9.5 13h13M9.5 18h13M9.5 23h9" {...S} opacity="0.5" />
          <g className="lp-lens">
            <circle cx="26.5" cy="24" r="7.5" {...S} />
            <path d="M32 29.5l3.5 3.5" {...S} />
          </g>
        </>
      )}

      {/* 02 A setup based on real operations: a genuine premises, the area it
          actually reaches, and a second branch that earns its own profile. */}
      {mark === "operations" && (
        <>
          <path className="lp-radius" d="M6 22a11 11 0 0 1 19-7.4" {...S} opacity="0.45" strokeDasharray="2.5 3" />
          <path className="lp-awn" d="M8 16.5h13l-2 3.5H10z" {...S} />
          <path d="M9.5 20v13h12V20" {...S} />
          <path d="M13 33v-6h5v6" {...S} opacity="0.6" />
          <g className="lp-branch">
            <path d="M25.5 24v9h8v-9z" {...S} opacity="0.75" />
            <path d="M25.5 24l4-3.5 4 3.5" {...S} opacity="0.75" />
          </g>
        </>
      )}

      {/* 03 Policy-aware profile management: the profile behind a guard that
          draws itself, because the shortcuts are what is being kept out. */}
      {mark === "policy" && (
        <>
          <path
            className="lp-guard"
            d="M20 4.5l12 4.5v11c0 8-5.2 13.6-12 15.5C13.2 33.6 8 28 8 20V9z"
            {...S}
            pathLength={1}
          />
          <circle cx="20" cy="17" r="3.2" {...S} opacity="0.6" />
          <path d="M14.4 26c1-3 3-4.5 5.6-4.5s4.6 1.5 5.6 4.5" {...S} opacity="0.6" />
        </>
      )}

      {/* 04 Useful location content: an area divided into real districts, with
          the work going into the one that is genuinely served rather than one
          page per name on the map. */}
      {mark === "pages" && (
        <>
          <rect x="5.5" y="7.5" width="29" height="25" rx="3" {...S} />
          <path d="M20 7.5v25M5.5 20h29" {...S} opacity="0.4" />
          <rect className="lp-district" x="21.5" y="9" width="11.5" height="9.5" rx="1.5" fill="currentColor" stroke="none" opacity="0.18" />
          <path d="M24 12.5h6.5M24 15.5h4.5" {...S} opacity="0.75" />
          <path d="M9 24.5h6.5M9 27.5h4" {...S} opacity="0.3" />
        </>
      )}

      {/* 05 A responsible review process: a real review, drawn rather than
          stamped, and the reply that goes back to it. */}
      {mark === "reviews" && (
        <>
          <path d="M5.5 10.5a2.5 2.5 0 0 1 2.5-2.5h17a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5H13l-5 4.5V23h-.5A2.5 2.5 0 0 1 5.5 20.5z" {...S} />
          <path
            className="lp-star"
            d="M16.5 11.5l2 4.1 4.5.6-3.3 3.2.8 4.5-4-2.2-4 2.2.8-4.5-3.3-3.2 4.5-.6z"
            {...S}
            strokeWidth="1.4"
            pathLength={1}
          />
          <path className="lp-reply" d="M22 27.5h9a2.5 2.5 0 0 0 2.5-2.5v-7" {...S} opacity="0.6" />
          <path className="lp-reply" d="M25 24.5l-3 3 3 3" {...S} opacity="0.6" />
        </>
      )}

      {/* 06 Clear service boundaries: two scopes that stay apart, with the line
          between them shown rather than blurred. */}
      {mark === "boundaries" && (
        <>
          <rect className="lp-laneA" x="5" y="10" width="12" height="20" rx="2.5" {...S} />
          <path className="lp-laneA" d="M8.5 16h5M8.5 20h5" {...S} opacity="0.5" />
          <rect className="lp-laneB" x="23" y="10" width="12" height="20" rx="2.5" {...S} strokeDasharray="3 3" opacity="0.7" />
          <path className="lp-laneB" d="M26.5 20h5M26.5 24h5" {...S} opacity="0.35" />
          <path d="M20 5v30" {...S} opacity="0.55" strokeDasharray="2 3.5" />
        </>
      )}

      {/* 07 Reporting tied to actions: the movement on the chart, connected to
          the thing a customer actually did. */}
      {mark === "reporting" && (
        <>
          <path d="M6 34h28" {...S} opacity="0.5" />
          <path d="M10 34V25" {...S} strokeWidth="3" opacity="0.45" />
          <path d="M16 34V20" {...S} strokeWidth="3" opacity="0.7" />
          <path className="lp-bar3" d="M22 34V14" {...S} strokeWidth="3" style={{ transformOrigin: "22px 34px" }} />
          <path className="lp-tie" d="M22 12c6 0 8-2.5 8-5.5" {...S} pathLength={1} opacity="0.7" />
          <path d="M27.5 3.5h5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 26 8V5a1.5 1.5 0 0 1 1.5-1.5z" {...S} />
          <path d="M28.5 6.5h3" {...S} opacity="0.6" />
        </>
      )}
    </svg>
  );
}
