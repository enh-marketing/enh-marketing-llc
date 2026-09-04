"use client";

import { cn } from "@/lib/cn";

/** The hero visual: generated material passing under review before it is
 *  delivered.
 *
 *  WHY THIS SHAPE. Every other AI creative page leads with the output. This
 *  document leads with the control: "Each video is reviewed for visual errors,
 *  brand accuracy and suitability before delivery", and the banner's last
 *  sentence is a promise about honesty, not volume. So the drawing is a line of
 *  frames moving left to right through a lens. Before the lens the frames carry
 *  a fault, a block sitting out of register; under the lens a beam sweeps the
 *  frame; after the lens the frames are clean and each carries a small tag on
 *  its corner, the disclosure the document says depends on the platform.
 *
 *  NOT THE CONTENT CREATION PICTURE. That page draws one shoot fanning out into
 *  formats; the Content Creation hero draws a batch and the batch after it.
 *  This is a single line with a gate in it, read left to right.
 *
 *  NO FACES, NO FIGURES, NO WORDS ON THE FRAMES. The only text is the three
 *  verbs from the banner. A tag with letters in it would be inventing a
 *  disclosure standard the document does not state. */
export function ReviewLine({
  stages,
  className,
}: {
  stages: [string, string, string];
  className?: string;
}) {
  const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" as const };
  const label = { // 6.6 units, not 6.4: at lg the panel is 440px wide, so the svg is 374px
  // and 6.4 would render at 10.88px, just under the 11px floor.
  fontSize: 6.6, fontWeight: 600, letterSpacing: 0.7 } as const;
  const frames = [14, 54, 95, 136, 176]; // x of each 30-wide frame
  const FY = 30;
  const FH = 44;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[440px] -translate-y-1/2 select-none lg:block xl:w-[500px]",
        className,
      )}
      role="img"
      aria-label="A diagram: a line of generated frames moving through a review lens. Frames before the lens carry a fault; the frame under the lens is being checked; frames after it are clean and tagged as reviewed before delivery."
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <svg viewBox="0 0 220 104" className="relative block w-full text-fog" aria-hidden>
          {/* Stage labels over their frames. */}
          <text x="14" y="10" className="font-display" fill="var(--color-ash)" {...label}>{stages[0].toUpperCase()}</text>
          <text x="110" y="10" textAnchor="middle" className="font-display" fill="var(--color-brand-text)" {...label}>{stages[1].toUpperCase()}</text>
          <text x="206" y="10" textAnchor="end" className="font-display" fill="var(--color-ash)" {...label}>{stages[2].toUpperCase()}</text>

          {/* The line the frames travel, and the flow along it. */}
          <path d={`M8 ${FY + FH + 12} H212`} {...S} className="text-line" />
          <path d={`M8 ${FY + FH + 12} H212`} pathLength="100" stroke="var(--color-brand)" strokeWidth="0.9" strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDuration: "3.4s" }} />

          {frames.map((x, i) => {
            const before = i < 2;
            const under = i === 2;
            return (
              <g key={x}>
                <rect x={x} y={FY} width="30" height={FH} rx="3" fill="var(--color-ink-3)" stroke={under ? "var(--color-brand)" : "var(--color-line)"} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                {/* The picture: a headline bar, a subject block, a caption. */}
                <rect x={x + 5} y={FY + 6} width="14" height="2.4" rx="1.2" fill="var(--color-fog)" opacity="0.6" />
                <rect
                  x={x + (before ? 9 : 6)}
                  y={FY + (before ? 14 : 12)}
                  width="18"
                  height="16"
                  rx="2"
                  fill="var(--color-fog)"
                  opacity={before ? 0.35 : 0.55}
                  transform={before ? `rotate(${i === 0 ? -7 : 6} ${x + 15} ${FY + 20})` : undefined}
                  className={before ? "ci-twinkle" : undefined}
                  style={before ? { animationDelay: `${i * 500}ms` } : undefined}
                />
                <rect x={x + 5} y={FY + 34} width="20" height="2.4" rx="1.2" fill="var(--color-fog)" opacity="0.6" />
                {/* Before review: the fault, a block out of register. */}
                {before && <path d={`M${x + 22} ${FY + 10} l4 4 M${x + 26} ${FY + 10} l-4 4`} stroke="var(--color-brand)" strokeWidth="1.2" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />}
                {/* After review: the tag on the corner. */}
                {i > 2 && (
                  <>
                    <rect x={x + 18} y={FY + FH - 10} width="9" height="6" rx="1.5" fill="var(--color-brand)" opacity="0.15" />
                    <rect x={x + 18} y={FY + FH - 10} width="9" height="6" rx="1.5" {...S} className="text-brand" />
                    <rect x={x + 20} y={FY + FH - 7.6} width="5" height="1.4" rx="0.7" fill="var(--color-brand)" />
                  </>
                )}
              </g>
            );
          })}

          {/* The lens over the middle frame, and its beam. */}
          <clipPath id="rl-frame">
            <rect x={frames[2]} y={FY} width="30" height={FH} rx="3" />
          </clipPath>
          <g clipPath="url(#rl-frame)">
            <rect x={frames[2]} y={FY} width="30" height="6" fill="var(--color-brand)" opacity="0.22" className="ci-scan-y" style={{ animationDuration: "2.6s" }} />
          </g>
          <circle cx={frames[2] + 15} cy={FY + FH / 2} r="24" {...S} className="text-brand" opacity="0.55" />
          <path d={`M${frames[2] + 32} ${FY + FH / 2 + 17} l8 8`} stroke="var(--color-brand)" strokeWidth="2.2" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
          <circle cx={frames[2] + 15} cy={FY + FH / 2} r="28" {...S} className="glyph-pulse text-brand" style={{ transformBox: "fill-box", transformOrigin: "center" }} opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
