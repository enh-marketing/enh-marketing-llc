/** One drawing per kind of coverage: what the finished thing actually looks
 *  like, rather than a symbol standing in for it.
 *
 *  The six capabilities on this page are not disciplines or platforms, they are
 *  formats -- a quad of angles, one short cut out of a long day, a feed going
 *  out live, two chairs and a microphone, the same moment in three shapes, and
 *  a set of techniques that are priced one by one. Every one of those is a
 *  picture, and a generic capability mark is not it.
 *
 *  NOTHING HERE COUNTS ANYTHING. Four panes is what a multi-camera monitor
 *  looks like, not a recommended camera number; the document refuses to fix one
 *  and so does this. The bars, frames and marks are texture.
 *
 *  Static: the run these sit in already moves, and a card that animates while
 *  the track is scrubbing is two things competing. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export type PreviewKind =
  | "angles"
  | "cut"
  | "live"
  | "chairs"
  | "shapes"
  | "options";

export function CoveragePreview({ kind }: { kind: PreviewKind }) {
  return (
    <svg viewBox="0 0 200 104" className="h-full w-full" fill="none" aria-hidden>
      {/* 01 Several angles on one monitor. */}
      {kind === "angles" && (
        <>
          {[
            [12, 10],
            [104, 10],
            [12, 56],
            [104, 56],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="84" height="38" rx="3" {...S} opacity={i === 0 ? 1 : 0.45} />
              <circle cx={x + 42} cy={y + 19} r="7" {...S} opacity={i === 0 ? 0.9 : 0.35} />
            </g>
          ))}
          <circle cx="20" cy="18" r="2.5" fill="currentColor" />
        </>
      )}

      {/* 02 One short cut out of a long day. */}
      {kind === "cut" && (
        <>
          <rect x="12" y="30" width="176" height="26" rx="3" {...S} opacity="0.4" />
          <rect
            x="66"
            y="26"
            width="46"
            height="34"
            rx="3"
            fill="color-mix(in srgb, var(--color-brand) 20%, transparent)"
            stroke="var(--color-brand)"
            strokeWidth="1.6"
          />
          <path d="M12 74h176" {...S} opacity="0.3" />
          <path d="M66 68v12M112 68v12" stroke="var(--color-brand)" strokeWidth="1.4" strokeLinecap="round" />
        </>
      )}

      {/* 03 A feed leaving the room while it happens. */}
      {kind === "live" && (
        <>
          <rect x="12" y="18" width="112" height="68" rx="3" {...S} />
          <circle cx="68" cy="52" r="13" {...S} opacity="0.5" />
          <circle cx="26" cy="30" r="4" fill="var(--color-brand)" />
          {[16, 28, 40].map((r, i) => (
            <path
              key={r}
              d={`M140 ${52 - r * 0.62}a${r} ${r} 0 0 1 0 ${r * 1.24}`}
              stroke="var(--color-brand)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.85 - i * 0.25}
              fill="none"
            />
          ))}
        </>
      )}

      {/* 04 Two chairs and a microphone. */}
      {kind === "chairs" && (
        <>
          <circle cx="58" cy="38" r="12" {...S} />
          <path d="M38 78c2-13 10-20 20-20s18 7 20 20" {...S} />
          <circle cx="132" cy="38" r="12" {...S} opacity="0.5" />
          <path d="M112 78c2-13 10-20 20-20s18 7 20 20" {...S} opacity="0.5" />
          <rect x="92" y="30" width="7" height="16" rx="3.5" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" />
          <path d="M89 43a6.5 6.5 0 0 0 13 0M95.5 49v9" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* 05 The same moment, in three shapes. */}
      {kind === "shapes" && (
        <>
          <rect x="14" y="14" width="44" height="76" rx="3" stroke="var(--color-brand)" strokeWidth="1.6" fill="color-mix(in srgb, var(--color-brand) 14%, transparent)" />
          <rect x="72" y="24" width="56" height="56" rx="3" {...S} />
          <rect x="140" y="34" width="48" height="36" rx="3" {...S} opacity="0.6" />
        </>
      )}

      {/* 06 A set of separate things, each priced on its own. */}
      {kind === "options" && (
        <>
          {/* drone */}
          <path d="M22 34h20M26 30v8M38 30v8M28 44h12l-6 8z" {...S} />
          {/* time-lapse */}
          <circle cx="86" cy="38" r="13" {...S} />
          <path d="M86 30v8l6 4" {...S} />
          {/* frame / green screen */}
          <rect x="128" y="26" width="46" height="26" rx="3" {...S} />
          {/* 360 */}
          <circle cx="42" cy="76" r="12" {...S} opacity="0.7" />
          <path d="M30 76c0-3.5 5.4-6.3 12-6.3s12 2.8 12 6.3-5.4 6.3-12 6.3-12-2.8-12-6.3z" {...S} opacity="0.7" />
          {/* overlay */}
          <rect x="86" y="66" width="34" height="20" rx="3" {...S} opacity="0.7" />
          <path d="M92 76h20" {...S} opacity="0.5" />
          {/* separate line items */}
          <path d="M134 70h44M134 78h30" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </>
      )}
    </svg>
  );
}
