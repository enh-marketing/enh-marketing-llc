import { cn } from "@/lib/cn";

/** THE PLATE A NOTE GETS WHEN IT HAS NO PHOTOGRAPH.
 *
 *  WHY THIS RATHER THAN A STOCK IMAGE. The three notes in the archive carry no
 *  hero image, and src/lib/content.ts pointed them at Unsplash. On a homepage
 *  teaser that is a harmless placeholder; on the page whose whole subject is
 *  the articles it is a fabricated article image, and the brief rules it out.
 *  An empty grey box is the other option and it makes a finished design look
 *  broken. So a note without a photograph is drawn instead.
 *
 *  WHAT IT DRAWS. A range, seen in section: three ridges back to front, a
 *  dashed ascent route over them, and a marker on the summit the route reaches.
 *  It is the site's own metaphor — "Explore New Heights", "Summits reached" —
 *  at card scale, and it is the same drawing
 *  language as RouteLine and PeakDivider in fx/Adornments, which is what makes
 *  a plate read as part of this site rather than as a missing file.
 *
 *  ONE SILHOUETTE PER TOPIC, AND IT IS STABLE. `variantFor` hashes the topic
 *  name, so "SEO" is the same range on every card and on every visit, a topic
 *  nobody has invented yet still gets a plate, and no data has to be authored
 *  to make that happen. The five ranges differ in shape only: no topic's plate
 *  claims more elevation, more peaks or more of anything than another's,
 *  because the drawing is identity and not a measurement.
 *
 *  EVERY COORDINATE IS A HAND-WRITTEN LITERAL. Nothing here is computed from
 *  trigonometry or division, which is what keeps it out of the hydration trap
 *  that costs this site's islands their interactivity when the server and the
 *  browser print a double's last digit differently.
 *
 *  MOTION IS ALL CSS. `animate-dash` marches the route (the site's own class,
 *  shared with RouteLine and PeakDivider) and `ri-ping` breathes on the
 *  summit. Both are in globals.css's reduced-motion collapse, where they rest
 *  on the finished picture: a fully drawn dashed route and a lit summit. */

export type PlateVariant = 0 | 1 | 2 | 3 | 4;

/** The five ranges. Each is three ridge silhouettes (back to front), the
 *  ascent route, and where the route ends. The viewBox is 400x260 and every
 *  ridge closes on the bottom edge, so the plate fills any aspect ratio it is
 *  stretched into without leaving a gap under the range. */
const RANGES: {
  ridges: [string, string, string];
  /** The ascent, drawn over the range. */
  route: string;
  /** Where the route stops. The summit marker sits here. */
  summit: [number, number];
}[] = [
  {
    ridges: [
      "M0 288 L58 244 L108 270 L168 210 L228 256 L288 198 L348 238 L400 214 L400 400 L0 400 Z",
      "M0 316 L68 286 L128 304 L188 260 L248 296 L318 254 L400 286 L400 400 L0 400 Z",
      "M0 348 L78 328 L148 342 L218 314 L298 338 L400 320 L400 400 L0 400 Z",
    ],
    route: "M14 386 L78 330 L148 344 L168 302 L188 262 L248 296 L318 254",
    summit: [318, 254],
  },
  {
    ridges: [
      "M0 232 L52 204 L118 252 L176 222 L242 264 L308 228 L360 258 L400 236 L400 400 L0 400 Z",
      "M0 274 L64 252 L134 292 L196 266 L262 300 L330 272 L400 298 L400 400 L0 400 Z",
      "M0 330 L72 312 L146 340 L214 322 L286 346 L400 328 L400 400 L0 400 Z",
    ],
    route: "M18 384 L72 314 L146 342 L170 306 L196 268 L262 300 L330 272",
    summit: [330, 272],
  },
  {
    ridges: [
      "M0 268 L74 228 L126 258 L184 236 L232 192 L296 244 L354 216 L400 248 L400 400 L0 400 Z",
      "M0 304 L82 272 L142 296 L202 274 L252 244 L316 288 L400 270 L400 400 L0 400 Z",
      "M0 344 L88 322 L156 338 L226 318 L292 336 L400 324 L400 400 L0 400 Z",
    ],
    route: "M16 388 L88 324 L156 340 L178 306 L202 276 L252 244",
    summit: [252, 244],
  },
  {
    ridges: [
      "M0 252 L46 278 L104 236 L162 268 L226 214 L284 256 L342 224 L400 260 L400 400 L0 400 Z",
      "M0 292 L58 314 L120 278 L182 306 L244 262 L306 294 L400 268 L400 400 L0 400 Z",
      "M0 338 L66 354 L134 330 L206 348 L278 324 L400 342 L400 400 L0 400 Z",
    ],
    route: "M20 384 L66 352 L134 332 L160 318 L182 308 L244 262",
    summit: [244, 262],
  },
  {
    ridges: [
      "M0 276 L64 256 L112 282 L154 222 L214 262 L268 206 L330 246 L400 222 L400 400 L0 400 Z",
      "M0 312 L74 290 L134 312 L192 270 L246 302 L312 262 L400 292 L400 400 L0 400 Z",
      "M0 352 L84 334 L152 348 L224 326 L302 344 L400 326 L400 400 L0 400 Z",
    ],
    route: "M12 386 L84 336 L152 348 L172 312 L192 272 L246 302 L312 262",
    summit: [312, 262],
  },
];

/** A stable index for a topic name.
 *
 *  Integer arithmetic only, and the result is an index into a five-element
 *  array, so the server and the browser cannot disagree about it the way they
 *  can about a float. */
export function variantFor(key: string): PlateVariant {
  let h = 0;
  for (let i = 0; i < key.length; i += 1) h = (h * 31 + key.charCodeAt(i)) % 100003;
  return (h % RANGES.length) as PlateVariant;
}

export function NotePlate({
  topic,
  className,
  /** The lead and wide slots get the range at more of its own scale; the small
   *  square plate in a compact row would otherwise be all foreground ridge. */
  scale = "default",
}: {
  topic: string;
  className?: string;
  scale?: "default" | "compact";
}) {
  const range = RANGES[variantFor(topic)];
  const [sx, sy] = range.summit;

  return (
    <svg
      viewBox={scale === "compact" ? "70 160 260 240" : "0 0 400 400"}
      preserveAspectRatio="xMidYMax slice"
      className={cn("h-full w-full", className)}
      /* Decorative: the topic and the title are both printed beside it, so an
         alternative text here would be the third time a reader hears them. */
      aria-hidden
      focusable="false"
    >
      {/* The ground the range sits on. A flat token fill rather than a
          gradient, so the plate steps with the surface ladder in both themes
          instead of carrying its own light. */}
      <rect x="0" y="0" width="400" height="400" fill="var(--color-ink-3)" />

      {/* AIR ABOVE THE RANGE.
          The range has to stay inside the band a landscape frame shows (a
          16:10 crop of this square starts at y=150), which leaves the top
          third empty — and in the lead slot's 4:5 portrait frame, where the
          whole square is visible, empty is what it looked like: a tall white
          box with mountains along the bottom. Three altitude hairlines and one
          soft glow behind the summit give that third something to be, at a
          weight that never competes with the range. Both are cropped away
          entirely in a landscape frame, where they are not needed. */}
      <g aria-hidden>
        <defs>
          {/* A radial stop rather than a flat-opacity circle. At one flat
              opacity the disc has a visible edge, and a pale arc crossing the
              sky of a card reads as a rendering artefact. */}
          <radialGradient id="np-glow">
            <stop offset="0" stopColor="var(--color-brand)" stopOpacity="0.09" />
            <stop offset="1" stopColor="var(--color-brand)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={sx} cy={sy} r="120" fill="url(#np-glow)" />
        {/* Altitude hairlines, evenly through the sky rather than clustered in
            the middle of it: three lines in a band left the top of a portrait
            frame as bare as before. */}
        {[52, 82, 112, 142, 172].map((y, i) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="var(--color-ash)"
            strokeOpacity={0.08 + i * 0.025}
            strokeWidth="1"
            strokeDasharray="2 11"
          />
        ))}
      </g>

      {/* Back to front. The two behind the front ridge are washed back with
          fill-opacity rather than with a lighter colour, so one token drives
          all three and the depth order survives the theme flip. */}
      <path d={range.ridges[0]} fill="var(--color-line)" fillOpacity="0.3" />
      <path d={range.ridges[1]} fill="var(--color-line)" fillOpacity="0.62" />
      {/* The mid crest is inked as well as the front one. Without it the band
          between the mid and back ridges read as sky, and the route's final
          pitch looked like a spike across nothing rather than a climb over
          ground. Three tones need two edges to separate them. */}
      <path
        d={range.ridges[1]}
        fill="none"
        stroke="var(--color-ash)"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
      <path d={range.ridges[2]} fill="var(--color-line)" />

      {/* The crest of the front ridge, inked so the silhouette reads at small
          sizes where the fills flatten into one another. `ash`, not `line`:
          line is a border colour and measures 1.1:1 against these surfaces, so
          any line inside a drawing that has to be seen is inked in ash. */}
      <path
        d={range.ridges[2]}
        fill="none"
        stroke="var(--color-ash)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />

      {/* The ascent. Marching dashes, which is the same treatment RouteLine
          and PeakDivider give a route, and it rests fully drawn under
          prefers-reduced-motion. */}
      <path
        d={range.route}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-dash np-route"
      />

      {/* The summit the route reaches. The ring breathes; the dot under it is
          the finished state, so stopping the ring leaves the summit marked. */}
      <circle cx={sx} cy={sy} r="9" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" className="ri-ping" />
      <circle cx={sx} cy={sy} r="4" fill="var(--color-brand)" />
    </svg>
  );
}
