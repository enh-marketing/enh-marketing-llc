import { cn } from "@/lib/cn";

/** The marks beside the AI Creative Production page's section headings. Same
 *  frame and stroke as the other page mark sets, each drawing its section:
 *
 *  - `frames`  four frames of different proportion
 *  - `relay`   one curve handing over to the next
 *  - `strip`   a filmstrip with sprockets
 *  - `lanes`   two lanes and a step crossing between them
 *  - `scope`   one chip kept, one struck
 *
 *  Decorative, so aria-hidden and desktop-only. */

export type CreativeMarkVariant = "frames" | "relay" | "strip" | "lanes" | "scope";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const delay = (i: number, step = 0.22) => ({ animationDelay: `${i * step}s` });

function Frames() {
  const f = [{ x: 8, y: 12, w: 16, h: 40 }, { x: 30, y: 18, w: 28, h: 28 }, { x: 64, y: 14, w: 22, h: 36 }, { x: 92, y: 22, w: 12, h: 20 }];
  return (
    <g className="text-fog">
      {f.map((r, i) => <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx="3" {...S} className={i === 2 ? "text-brand glyph-pulse" : "glyph-rise"} style={delay(i, 0.15)} />)}
    </g>
  );
}
function Relay() {
  return (
    <g className="text-fog">
      <path d="M8 50h96" {...S} className="text-line" />
      <path d="M10 48c8-26 16-30 30-8" {...S} />
      <path d="M36 48c8-26 16-30 30-8" {...S} className="text-brand" />
      <path d="M62 48c8-26 16-30 30-8" {...S} strokeDasharray="3 3" />
      <circle cx="40" cy="40" r="3" fill="currentColor" className="glyph-pulse text-brand" />
    </g>
  );
}
function Strip() {
  return (
    <g className="text-fog">
      <rect x="8" y="14" width="96" height="36" rx="3" {...S} />
      {[20, 44, 68].map((x, i) => <rect key={x} x={x} y="22" width="18" height="20" rx="2" {...S} className={i === 1 ? "text-brand" : undefined} />)}
      {Array.from({ length: 8 }, (_, i) => 12 + i * 12).map((x) => <rect key={x} x={x} y="8" width="4" height="3" rx="1" fill="currentColor" opacity="0.5" />)}
      <path d="M8 54h96" {...S} className="glyph-rise text-brand" />
    </g>
  );
}
function Lanes() {
  return (
    <g className="text-fog">
      <path d="M8 20h96M8 44h96" {...S} className="text-line" />
      {[20, 44, 92].map((x) => <circle key={x} cx={x} cy="20" r="3.5" fill="currentColor" />)}
      {[68].map((x) => <circle key={x} cx={x} cy="44" r="3.5" fill="currentColor" className="glyph-pulse text-brand" />)}
      <path d="M44 20c12 0 12 24 24 24M68 44c12 0 12-24 24-24" {...S} className="text-brand" />
    </g>
  );
}
function Scope() {
  return (
    <g className="text-fog">
      <rect x="8" y="22" width="42" height="20" rx="10" {...S} className="text-brand" />
      <rect x="62" y="22" width="42" height="20" rx="10" {...S} strokeDasharray="3 3" />
      <path d="M78 28l10 8M88 28l-10 8" {...S} className="glyph-rise text-brand" />
      <circle cx="29" cy="32" r="3" fill="currentColor" className="text-brand" />
    </g>
  );
}

const SHAPES: Record<CreativeMarkVariant, () => React.JSX.Element> = { frames: Frames, relay: Relay, strip: Strip, lanes: Lanes, scope: Scope };

export function CreativeMark({ variant, className }: { variant: CreativeMarkVariant; className?: string }) {
  const Shape = SHAPES[variant];
  return (
    <svg viewBox="0 0 112 64" aria-hidden className={cn("hidden h-16 w-[14rem] shrink-0 lg:block", className)}>
      <Shape />
    </svg>
  );
}
