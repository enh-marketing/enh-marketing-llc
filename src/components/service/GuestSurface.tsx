/** One drawing per guest-facing surface: the thing a guest actually looks at,
 *  rather than a symbol standing in for a discipline.
 *
 *  WHY THESE SIX. Read closely, none of the six hospitality services is a
 *  category — each one works on something a guest sees. Local SEO works on a
 *  listing ("Google Business Profiles, menus, offers and local signals"). Paid
 *  works on an ad. Social works on short-form video. Content works on "menus,
 *  offer pages, blogs and landing pages". Reputation works on reviews. And
 *  booking optimisation works on "reservation links, booking engines, offer
 *  pages, calls to action and mobile journeys". So the run leads with the
 *  surface, and a ring badge with an abstract glyph in it would be a worse card
 *  than a picture of the thing being worked on.
 *
 *  NOTHING HERE COUNTS OR RATES ANYTHING. The availability grid is what an
 *  availability grid looks like, not a property's occupancy; the review run
 *  shows reviews arriving rather than a score, because the document sells
 *  "review growth" and states no rating anywhere. Five lit stars would be the
 *  one invented claim in the set.
 *
 *  Static, deliberately: these sit inside a pinned horizontal run that is
 *  already moving, and a card animating while the track scrubs is two things
 *  competing for the same attention. Modelled on CoveragePreview, which does
 *  the same job for the video pillar's formats. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export type GuestSurfaceKind =
  /** A local listing: a map with a pin, and the panel beside it. */
  | "listing"
  /** A paid result: the field, the marker that says it is bought, the links. */
  | "ad"
  /** Short-form video: one frame forward, more behind it. */
  | "reel"
  /** A menu or offer page: two columns of items and a block of offer. */
  | "menu"
  /** Reviews arriving, and one of them answered. */
  | "review"
  /** The booking step itself: dates, availability, and the action. */
  | "booking";

export function GuestSurface({ kind }: { kind: GuestSurfaceKind }) {
  return (
    <svg viewBox="0 0 200 104" className="h-full w-full" fill="none" aria-hidden>
      {/* 01 The listing a nearby search returns. */}
      {kind === "listing" && (
        <>
          <rect x="8" y="8" width="84" height="88" rx="3" {...S} opacity="0.5" />
          <path d="M8 44 H92 M50 8 V96" {...S} opacity="0.25" />
          <path d="M50 62 C50 62 38 48 38 40a12 12 0 0 1 24 0c0 8-12 22-12 22Z" {...S} />
          <circle cx="50" cy="40" r="4" fill="currentColor" />
          <rect x="100" y="14" width="92" height="76" rx="3" {...S} opacity="0.5" />
          <rect x="108" y="24" width="54" height="6" rx="3" fill="currentColor" opacity="0.7" />
          <g opacity="0.6">
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={111 + i * 11} cy="44" r="2.6" {...S} />
            ))}
          </g>
          <path d="M108 60 H172 M108 70 H150" {...S} opacity="0.35" />
          <path d="M160 74 l10 6 -10 6" {...S} />
        </>
      )}

      {/* 02 The paid result, and the marker that says it was bought. */}
      {kind === "ad" && (
        <>
          <rect x="8" y="8" width="184" height="20" rx="10" {...S} opacity="0.5" />
          <circle cx="22" cy="18" r="5" {...S} />
          <path d="M26 22 l4 4" {...S} />
          <path d="M36 18 H120" {...S} opacity="0.35" />
          <rect x="8" y="40" width="18" height="9" rx="2" fill="currentColor" opacity="0.85" />
          <rect x="32" y="40" width="112" height="8" rx="4" fill="currentColor" opacity="0.55" />
          <path d="M8 60 H158 M8 70 H116" {...S} opacity="0.35" />
          <rect x="8" y="82" width="40" height="7" rx="3.5" {...S} opacity="0.6" />
          <rect x="56" y="82" width="48" height="7" rx="3.5" {...S} opacity="0.6" />
          <rect x="150" y="78" width="42" height="16" rx="8" {...S} />
          <path d="M162 86 h18" {...S} />
        </>
      )}

      {/* 03 Short-form video: one frame forward, more behind it. */}
      {kind === "reel" && (
        <>
          <rect x="18" y="20" width="34" height="64" rx="4" {...S} opacity="0.2" />
          <rect x="148" y="20" width="34" height="64" rx="4" {...S} opacity="0.2" />
          <rect x="58" y="12" width="38" height="80" rx="5" {...S} opacity="0.45" />
          <rect x="104" y="12" width="38" height="80" rx="5" {...S} opacity="0.45" />
          <rect x="76" y="6" width="48" height="92" rx="6" {...S} />
          <path d="M94 44 L110 52 L94 60 Z" fill="currentColor" opacity="0.8" />
          <path d="M84 82 H116 M84 89 H104" {...S} opacity="0.4" />
        </>
      )}

      {/* 04 The page a guest reads before deciding. */}
      {kind === "menu" && (
        <>
          <rect x="8" y="8" width="184" height="88" rx="3" {...S} opacity="0.5" />
          <rect x="20" y="18" width="52" height="7" rx="3.5" fill="currentColor" opacity="0.7" />
          {[36, 50, 64, 78].map((y) => (
            <g key={y}>
              <path d={`M20 ${y} H84`} {...S} opacity="0.35" />
              <circle cx="94" cy={y} r="2.4" fill="currentColor" opacity="0.6" />
              <circle cx="102" cy={y} r="2.4" fill="currentColor" opacity="0.35" />
            </g>
          ))}
          <rect x="118" y="30" width="60" height="52" rx="3" {...S} />
          <rect x="128" y="42" width="40" height="6" rx="3" fill="currentColor" opacity="0.55" />
          <path d="M128 58 H168 M128 68 H152" {...S} opacity="0.35" />
        </>
      )}

      {/* 05 Reviews arriving, and one of them answered. */}
      {kind === "review" && (
        <>
          {[14, 44].map((y) => (
            <g key={y}>
              <rect x="10" y={y} width="140" height="26" rx="3" {...S} opacity="0.5" />
              <circle cx="26" cy={y + 13} r="7" {...S} />
              <path d={`M42 ${y + 9} H132 M42 ${y + 18} H104`} {...S} opacity="0.35" />
            </g>
          ))}
          {/* The one that is answered: indented, because a reply is not a review. */}
          <rect x="26" y="74" width="124" height="22" rx="3" {...S} opacity="0.5" strokeDasharray="4 4" />
          <path d="M40 82 H126 M40 90 H98" {...S} opacity="0.3" />
          <path d="M18 74 v8 h6" {...S} opacity="0.5" />
          {/* More arriving. */}
          <path d="M162 92 L172 76 L182 60" {...S} />
          <path d="M175 60 h7 v7" {...S} />
        </>
      )}

      {/* 06 The step the whole run exists to reach. */}
      {kind === "booking" && (
        <>
          <rect x="10" y="8" width="180" height="88" rx="4" {...S} opacity="0.5" />
          <rect x="22" y="20" width="72" height="18" rx="3" {...S} />
          <path d="M32 29 H84" {...S} opacity="0.35" />
          <rect x="106" y="20" width="72" height="18" rx="3" {...S} />
          <path d="M116 29 H168" {...S} opacity="0.35" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={22 + i * 22}
              y="48"
              width="16"
              height="16"
              rx="2"
              {...S}
              fill={i === 1 || i === 3 || i === 4 ? "currentColor" : "none"}
              fillOpacity={i === 1 || i === 3 || i === 4 ? 0.28 : 0}
            />
          ))}
          <rect x="22" y="74" width="82" height="16" rx="8" fill="currentColor" opacity="0.8" />
          <path d="M116 82 h20 m-6 -5 l6 5 -6 5" {...S} />
        </>
      )}
    </svg>
  );
}
