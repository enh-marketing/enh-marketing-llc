"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { crafts } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { ChannelIcon } from "@/components/service/ChannelIcon";
import { cn } from "@/lib/cn";

/** THE HOMEPAGE HERO VISUAL: the six services, demonstrated one at a time.
 *
 *  WHAT IT IS. One stage, six scenes, and a pointer. Each scene is the SCREEN a
 *  service is actually done on — a results listing, a campaign across four ad
 *  platforms, a feed, a page being built, an enquiry form, a player and the
 *  three places a cut goes — and a cursor crosses it, stops, and clicks. What it
 *  clicks then appears. When the demonstration finishes the scene hands over to
 *  the next service, so a reader who does nothing is shown all six, in order,
 *  continuously. Team direction: it should feel like a product demo rather than
 *  a diagram, and the difference is the pause before the click.
 *
 *  WHY A REEL RATHER THAN ONE DIAGRAM. `docs/DESIGN.md` rule 7: seven services
 *  need seven pictures, because one drawing that only changes state collapses
 *  into the single abstract shape they all share, which is what "same random
 *  diagram with no meaning" named. A reel gives each service its own drawing in
 *  a hero with room for one at a time.
 *
 *  WHAT WAS TRIED BEFORE THIS, because the reasons are the useful part:
 *
 *  - A WebGL Saturn (what shipped). Measured at 1440x900 it painted a 634x576
 *    canvas centred at x=691 — directly under the headline's right half — so it
 *    had to be carried at reduced opacity and read as a pink blur. A ringed
 *    planet is also not a claim a marketing agency can make.
 *  - The hub with six nodes the brief suggested. That drawing already ships:
 *    `service/ChannelOrbit` is six channels orbiting one budget on the
 *    Performance Marketing hero. A second radial fan is one page repeating
 *    another, and "six cards in a circle" is on the brief's own avoid-list.
 *  - A lay diagram: the six as strands plied into one rope. It drew the
 *    relationship between the services well and the services themselves hardly
 *    at all — six marks at the head of six curves is six icons with a good
 *    reason, which is exactly what rule 7 is about.
 *  - This reel inside a bordered `bg-ink-2` panel, with a playlist of all six
 *    names under it and a "Know more" link in its corner. All three removed on
 *    team direction: in the light theme the panel is a near-white slab dropped
 *    into an open hero, and a playlist asks the reader to choose from a list
 *    instead of being shown one thing at a time, which was the point.
 *
 *  THE PLATFORM MARKS ARE REAL ONES, through `service/ChannelIcon` — Simple
 *  Icons v13, CC0, already used on the Performance Marketing page. Redrawing a
 *  platform logo by hand gets it wrong, and inventing six plausible ones on the
 *  homepage of an agency that is a Google and Meta partner would be worse. Which
 *  platforms appear is not a free choice either: they are the ones the service's
 *  own card lists in `crafts[].items`, or the ones with a built page under that
 *  pillar, so the screen cannot claim a channel the site does not sell.
 *
 *  RULE 4, NO QUANTITIES. Nothing in any scene can be read off. No axis, no
 *  figure, no bar whose height means anything, no position in a ranked list.
 *  The SEO scene lights an entry in a listing rather than numbering it, because
 *  "improve your search visibility" is what the copy promises and "#1" is not,
 *  and the analytics panel is ruled lines with a tick rather than a reading.
 *
 *  RULE 13. Travelling packets on comparable routes share one delay; where a
 *  scene walks a light along a strip it is one strip of one service's own
 *  parts, which is what `ci-blink` is documented for. No two services are ever
 *  on screen together, so nothing invites a comparison between them.
 *
 *  RULE 1, AND THE ONE PLACE THIS BENDS IT. That rule asks for every service
 *  name legible at once, and a reel shows one. The six are set together in
 *  `sections/Craft` immediately below the fold — the services section proper —
 *  and here the trade buys what a static list of six cannot: each service gets
 *  its own picture, moving. The rail keeps all six reachable without waiting,
 *  so nothing sits behind a timer.
 *
 *  EVERYTHING RESTS FINISHED. The loops are the `ci-*` set and the `reel-*` set
 *  in globals.css, all of them collapsed under `prefers-reduced-motion` in one
 *  place, all of them resting on their drawn state: pointer on its last target,
 *  ripple gone, every reveal revealed. With motion refused the reel does not
 *  advance, scene one is the completed screen, and all six segments stay
 *  selectable. */

/** How long each service holds the stage — and, through `--reel-dwell`, exactly
 *  how long its pointer has to cross the screen and make its three clicks. The
 *  two are the same number on purpose: a demonstration that is still going when
 *  the stage changes reads as a glitch. */
const DWELL = 6400;

/** One scene leaves as the next arrives rather than the stage going empty
 *  between them, which is what makes it read as one continuous run instead of
 *  six slides. */
const FADE = 0.5;
const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------- the scenes
   PORTRAIT, 300x360. Team direction is that the visual stands as tall as the
   copy column, and at 1440 that column is about 500 wide by 590 tall, so a
   landscape frame would have left the drawing a shallow band with page ground
   above and below it. Each scene is laid out for the tall frame instead.

   Stroked in the language `service/CapabilityGlyph` sets for the site:
   currentColor, one weight, no fills except a brand mark that means something.
   They are drawings of a mechanism, never of a metaphor, so none of them has to
   be taught (rule 2). */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
/** Hairlines: the parts of a screen that are furniture rather than argument. */
const T = { ...S, strokeWidth: 1.5 };

/** Ash for anything in a drawing that carries meaning: `--color-line` is 1.4:1
 *  on the dark ground and 1.1:1 on the light one, so it is for borders only
 *  (rule 5). */
const ASH = "var(--color-ash)";
const BRAND = "var(--color-brand)";

/** A shared duration with a delay of duration/count walks ONE light along a
 *  strip — the documented use of `ci-blink`, and the reason it is only ever
 *  applied to the parts of a single service here, never across services. */
const walk = (i: number, count: number) => ({ animationDelay: `${(6 / count) * i}s` });

/** Where the pointer goes in this scene, as the four waypoints globals.css
 *  interpolates between. The first is off the content, so the pointer arrives
 *  from outside rather than materialising on a target. */
type Route = [number, number][];

const routeVars = (r: Route): CSSProperties =>
  ({
    "--p1x": `${r[0][0]}px`,
    "--p1y": `${r[0][1]}px`,
    "--p2x": `${r[1][0]}px`,
    "--p2y": `${r[1][1]}px`,
    "--p3x": `${r[2][0]}px`,
    "--p3y": `${r[2][1]}px`,
    "--p4x": `${r[3][0]}px`,
    "--p4y": `${r[3][1]}px`,
  }) as CSSProperties;

/** THE POINTER. Tip at its own origin, so a waypoint is where the tip lands
 *  rather than where the arrow's box happens to sit. Cased in the topmost
 *  surface colour so it stays visible over a ruled panel, which is the same
 *  reason a real cursor has a white outline. */
function Pointer({ route }: { route: Route }) {
  const vars = routeVars(route);
  return (
    <g aria-hidden>
      <circle
        className="reel-press"
        cx="0"
        cy="0"
        r="13"
        fill="none"
        stroke={BRAND}
        strokeWidth="2"
        style={vars}
      />
      <g className="reel-pointer" style={vars}>
        <path
          d="M0 0v19l5-4.6 3.4 7.2 3.6-1.7-3.4-7.2 6.4-.4z"
          fill="var(--color-snow)"
          stroke="var(--color-ink-3)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

/** SEARCH ENGINE OPTIMIZATION — a search made, the listing it returns, and the
 *  page the searcher lands on. Click the field, the query and the results
 *  arrive; click your entry, it is the one that is visible; and the page you
 *  were found on opens underneath.
 *
 *  Lit, never numbered: the copy promises visibility, and a rank nobody can
 *  check is a figure this site does not give. */
function SceneSeo() {
  const rows = [
    { w: 138, sub: 178 },
    { w: 176, sub: 196, mine: true },
    { w: 120, sub: 164 },
    { w: 152, sub: 186 },
  ];
  return (
    <g stroke={ASH} color={ASH}>
      {/* The field. */}
      <rect x="14" y="14" width="272" height="40" rx="20" {...S} opacity="0.78" />
      <circle cx="42" cy="34" r="7.5" {...T} />
      <path d="M47 39l6.5 6.5" {...T} />
      <g className="reel-after-1">
        <path d="M66 34h122" {...S} strokeWidth="2.2" pathLength="100" className="ci-draw" />
      </g>

      {/* What comes back. */}
      <g className="reel-after-1">
        {rows.map((r, i) => {
          const y = 84 + i * 44;
          return (
            <g key={i}>
              <path
                d={`M40 ${y}h${r.w}`}
                {...S}
                strokeWidth={r.mine ? 2.6 : 1.8}
                opacity={r.mine ? 0.9 : 0.62}
              />
              <path d={`M40 ${y + 13}h${r.sub}`} {...T} opacity="0.34" />
            </g>
          );
        })}
      </g>

      {/* Yours, once it has been clicked: the only marked entry on the page. */}
      <g className="reel-after-2">
        <path d="M40 128h176" {...S} stroke={BRAND} strokeWidth="2.8" />
        <path d="M24 128v-11M24 128h7" {...S} stroke={BRAND} strokeWidth="2.6" />
      </g>

      {/* The listing being read. `ci-scan-y` travels 54 user units, so the beam
          is placed to cross the head of the listing and reach the marked entry
          rather than to sweep the whole frame. */}
      <g className="reel-after-1">
        <g className="ci-scan-y">
          <path d="M18 74h264" stroke={BRAND} strokeWidth="1.6" opacity="0.65" />
        </g>
      </g>

      {/* And the page they land on. */}
      <g className="reel-after-3">
        <rect x="24" y="264" width="252" height="88" rx="10" {...S} />
        <path d="M24 288h252" {...T} opacity="0.65" />
        <circle cx="40" cy="276" r="3.4" {...T} opacity="0.72" />
        <circle cx="52" cy="276" r="3.4" {...T} opacity="0.72" />
        <path d="M44 308h96M44 326h64" {...T} opacity="0.6" />
        <rect x="186" y="304" width="70" height="24" rx="12" {...S} stroke={BRAND} strokeWidth="2.2" />
      </g>
    </g>
  );
}

/** PERFORMANCE MARKETING — the copy's own three things, connected: "paid media,
 *  landing pages and analytics". Pick the platform, the route opens; click the
 *  page's one action; the measurement arrives at the foot.
 *
 *  The four marks are the four the card itself lists. */
function ScenePerformance({ platforms }: { platforms: string[] }) {
  return (
    <g stroke={ASH} color={ASH}>
      {/* The media, bought on four platforms. Brackets are the slot. */}
      <rect x="22" y="18" width="256" height="76" rx="10" {...S} />
      <path d="M22 10v-6h10M278 10v-6h-10" {...T} opacity="0.78" />
      {platforms.slice(0, 4).map((p, i) => (
        <g key={p} transform={`translate(${44 + i * 62} 44)`}>
          <rect
            x="-19"
            y="-19"
            width="38"
            height="38"
            rx="10"
            {...T}
            opacity={i === 1 ? 0 : 0.56}
          />
          {/* The one that was picked. */}
          {i === 1 && (
            <g className="reel-after-1">
              <rect x="-19" y="-19" width="38" height="38" rx="10" {...S} stroke={BRAND} strokeWidth="2.2" />
            </g>
          )}
          <g transform="translate(-11 -11)" className={i === 1 ? "reel-after-1" : undefined}>
            <ChannelIcon
              name={p}
              size={22}
              className={i === 1 ? "text-brand" : "text-ash opacity-75"}
            />
          </g>
        </g>
      ))}

      {/* The page it sends to, and the one action on it. */}
      <rect x="22" y="126" width="256" height="122" rx="10" {...S} />
      <path d="M22 150h256" {...T} opacity="0.65" />
      <path d="M44 174h128M44 192h88" {...T} opacity="0.6" />
      <g className="reel-after-2">
        <rect x="44" y="212" width="94" height="24" rx="12" {...S} stroke={BRAND} strokeWidth="2.2" />
      </g>

      {/* Analytics. Ruled lines and a tick, never a reading. */}
      <rect x="22" y="280" width="256" height="66" rx="10" {...S} />
      <path d="M44 302h140M44 324h96" {...T} opacity="0.65" />
      <g className="reel-after-3">
        <path d="M224 318l7 7 15-17" {...S} stroke={BRAND} strokeWidth="2.6" />
      </g>

      {/* The route through all three — the "connect" the copy sells. It opens
          when the platform is chosen. */}
      <g className="reel-after-1">
        <path d="M106 94v32M106 248v32" {...T} opacity="0.55" strokeDasharray="3 5" />
        <path
          d="M106 94v32"
          pathLength="100"
          stroke={BRAND}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className="ci-flow"
        />
        <path
          d="M106 248v32"
          pathLength="100"
          stroke={BRAND}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className="ci-flow"
        />
      </g>
    </g>
  );
}

/** SOCIAL MEDIA MARKETING — a feed, and what comes back off it. The copy sells
 *  "platform-specific content, community management and paid campaigns that
 *  grow reach, engagement": pick the platform, the feed is that platform's; the
 *  posts are the content and the returns are the engagement. Both drawn,
 *  neither counted.
 *
 *  The four marks are the four platforms with their own built page under this
 *  pillar. */
function SceneSocial({ platforms }: { platforms: string[] }) {
  return (
    <g stroke={ASH} color={ASH}>
      {/* The platforms, as the tabs they are in any scheduler. */}
      {platforms.slice(0, 4).map((p, i) => (
        <g key={p} transform={`translate(${40 + i * 58} 22)`}>
          <circle r="17" {...T} opacity={i === 2 ? 0 : 0.55} />
          {i === 2 && (
            <g className="reel-after-1">
              <circle r="17" {...S} stroke={BRAND} strokeWidth="2.2" />
            </g>
          )}
          <g transform="translate(-10 -10)" className={i === 2 ? "reel-after-1" : undefined}>
            <ChannelIcon
              name={p}
              size={20}
              className={i === 2 ? "text-brand" : "text-ash opacity-75"}
            />
          </g>
        </g>
      ))}

      {/* The surface. */}
      <rect x="20" y="58" width="172" height="286" rx="18" {...S} opacity="0.9" />
      <path d="M20 96h172" {...T} opacity="0.6" />
      <circle cx="42" cy="77" r="8" {...T} opacity="0.72" />
      <path d="M60 77h52" {...T} opacity="0.6" />

      {/* The posts, clipped to the surface so the feed reads as continuing past
          the frame rather than as cards sitting on a card.

          THE POSTS DO NOT SCROLL, and the first pass had them scrolling with
          `ci-slide-x`, which moves on the wrong axis — a feed drifting
          sideways. The classes that do travel vertically are the HTML marquees,
          and their seamless trick does not carry over to SVG: a percentage
          translate on a group resolves against the viewBox, not the group,
          without `transform-box`. What the feed gets instead is the refresh
          sweeping down it, which is the gesture every reader of a feed already
          knows, on a class written for exactly that. */}
      <clipPath id="reel-feed">
        <rect x="20" y="96" width="172" height="248" rx="16" />
      </clipPath>
      <g clipPath="url(#reel-feed)" className="reel-after-1">
        {[0, 1, 2, 3].map((p) => (
          <g key={p} transform={`translate(0 ${p * 70})`}>
            <rect x="36" y="112" width="140" height="54" rx="8" {...T} opacity="0.72" />
            <path
              d="M52 130h92M52 150h54"
              {...T}
              opacity="0.6"
              pathLength="100"
              className="ci-draw"
            />
          </g>
        ))}
        <g className="ci-scan-y">
          <path d="M24 104h164" stroke={BRAND} strokeWidth="1.6" opacity="0.65" />
        </g>
      </g>

      {/* What comes back. The three returns are DRAWN whatever the motion is
          doing and the walking light only lifts one at a time on top of them —
          the first pass put the mark itself inside `ci-blink`, which rests at
          opacity 0, so four seconds in five this half of the scene was three
          leader lines pointing at nothing. */}
      <g className="reel-after-2">
        <path
          d="M192 130h26M192 210h26M192 290h26"
          {...T}
          opacity="0.45"
          strokeDasharray="3 5"
        />
        {[0, 1, 2].map((k) => (
          <g key={k} opacity="0.55">
            <circle cx="244" cy={130 + k * 80} r="11" {...T} />
            <path d={`M233 ${141 + k * 80}l-8 9h11`} {...T} />
          </g>
        ))}
        <g data-first-tick>
          {[0, 1, 2].map((k) => (
            <g key={k} className="ci-blink" style={walk(k, 3)}>
              <circle cx="244" cy={130 + k * 80} r="11" {...S} stroke={BRAND} strokeWidth="2.2" />
              <path d={`M233 ${141 + k * 80}l-8 9h11`} {...S} stroke={BRAND} strokeWidth="2.2" />
            </g>
          ))}
        </g>
      </g>

      {/* The community half of it: the same conversation, answered. */}
      <g className="reel-after-3">
        <path
          d="M206 330a6 6 0 016-6h62a6 6 0 016 6v-40a6 6 0 00-6-6h-62a6 6 0 00-6 6z"
          {...T}
          opacity="0.65"
        />
        <path d="M220 300h44M220 314h28" {...T} opacity="0.6" />
      </g>
    </g>
  );
}

/** WEB DESIGN & DEVELOPMENT — the page being built, then loading. The copy asks
 *  for "a fast, user-friendly website ... and the actions you want visitors to
 *  take": the whole page is in frame, its one call to action is the only brand
 *  mark on it, and the sweep at the end is the load. */
function SceneWeb() {
  return (
    <g stroke={ASH} color={ASH}>
      <rect x="18" y="16" width="264" height="328" rx="12" {...S} />
      <path d="M18 56h264" {...T} opacity="0.65" />
      <circle cx="36" cy="36" r="3.6" {...T} opacity="0.78" />
      <circle cx="50" cy="36" r="3.6" {...T} opacity="0.78" />
      <circle cx="64" cy="36" r="3.6" {...T} opacity="0.78" />
      <rect x="84" y="28" width="124" height="16" rx="8" {...T} opacity="0.35" />

      {/* The page, drawn in. `ci-draw` and `pathLength` go on the PATH:
          `pathLength` is only meaningful on a shape, so on a wrapping group the
          dash falls back to user units and the keyframe stops being
          length-independent. One delay for the whole headline, so no part of it
          arrives ahead of another. */}
      <g className="reel-after-1">
        <path d="M40 88h150M40 112h108" {...S} strokeWidth="2.2" pathLength="100" className="ci-draw" />
        <rect x="40" y="136" width="220" height="88" rx="8" {...T} opacity="0.65" />
        <path d="M40 210l44-36 30 24 26-20 60 44" {...T} opacity="0.65" />
        <circle cx="214" cy="162" r="10" {...T} opacity="0.65" />
      </g>

      {/* The one action. */}
      <g className="reel-after-2">
        <rect x="40" y="242" width="100" height="26" rx="13" {...S} stroke={BRAND} strokeWidth="2.2" />
        <path d="M60 255h60" {...T} stroke={BRAND} opacity="0.72" />
      </g>

      <g className="reel-after-3">
        {[0, 1, 2].map((c) => (
          <g key={c} transform={`translate(${c * 76} 0)`}>
            <rect x="40" y="290" width="68" height="34" rx="6" {...T} opacity="0.56" />
            <path d="M52 308h40" {...T} opacity="0.4" />
          </g>
        ))}
        {/* The load. */}
        <g className="ci-scan-y">
          <path d="M22 68h256" stroke={BRAND} strokeWidth="1.8" opacity="0.65" />
        </g>
      </g>
    </g>
  );
}

/** LEAD GENERATION — an enquiry becoming a conversation. The copy's promise is
 *  "a pipeline and ... more valuable, qualified sales conversations", so the
 *  form is only half the picture: what matters is what arrives, and it arrives
 *  as a record with a person on it rather than as a count. Two clicks fill the
 *  two fields, the third sends it. */
function SceneLead() {
  return (
    <g stroke={ASH} color={ASH}>
      {/* The form. */}
      <rect x="14" y="18" width="184" height="170" rx="10" {...S} />
      <path d="M38 48h88" {...S} strokeWidth="2.2" opacity="0.82" />

      {/* Two fields. Each is filled by its OWN click rather than by a stagger:
          two bars growing on offset delays put two different lengths on screen
          at every instant, and nothing on this page weights what a lead tells
          you first against what it tells you second. A pointer filling them in
          turn is the honest version of the same motion. */}
      {[0, 1].map((f) => (
        <g key={f}>
          <rect x="38" y={78 + f * 36} width="136" height="24" rx="6" {...T} opacity="0.55" />
          <g className={f === 0 ? "reel-after-1" : "reel-after-2"}>
            <rect
              x="38"
              y={78 + f * 36}
              width="136"
              height="24"
              rx="6"
              fill={BRAND}
              fillOpacity="0.14"
              stroke="none"
            />
            <path d={`M52 ${90 + f * 36}h${f === 0 ? 74 : 96}`} {...T} stroke={BRAND} opacity="0.85" />
          </g>
        </g>
      ))}
      <rect x="38" y="150" width="80" height="26" rx="13" {...S} stroke={BRAND} strokeWidth="2.2" />

      {/* The route out, and the one enquiry on it. Taken round rather than
          straight down: a 40-unit drop gives `ci-flow`'s packet nowhere to be
          seen travelling. */}
      <g className="reel-after-3">
        <path
          d="M198 163h40c14 0 20 10 20 25v24"
          {...T}
          opacity="0.55"
          strokeDasharray="3 5"
        />
        <path
          d="M198 163h40c14 0 20 10 20 25v24"
          pathLength="100"
          stroke={BRAND}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className="ci-flow"
        />

        {/* What it becomes: one qualified conversation, on file. */}
        <rect x="104" y="216" width="182" height="128" rx="10" {...S} />
        <circle cx="138" cy="252" r="14" {...S} stroke={BRAND} strokeWidth="2.2" />
        <path d="M164 246h86M164 262h54" {...T} opacity="0.65" />
        <path d="M124 292h142M124 312h98" {...T} opacity="0.45" />
        <path d="M242 320l6 6 13-15" {...S} stroke={BRAND} strokeWidth="2.4" />
      </g>
    </g>
  );
}

/** VIDEO MARKETING — one cut, and the three places the copy puts it: "across
 *  websites, social media and paid campaigns". Press play, the playhead runs;
 *  then the cut goes out, and the three destinations take one light between
 *  them so the scene never claims one carries more than another. */
function SceneVideo({ platform }: { platform: string }) {
  const dests = [18, 110, 202];
  return (
    <g stroke={ASH} color={ASH}>
      {/* The player. */}
      <rect x="18" y="16" width="264" height="150" rx="10" {...S} />
      <path d="M136 74l34 20-34 20z" {...S} stroke={BRAND} strokeWidth="2.4" />

      {/* The track, and the playhead on it once it has been pressed.
          `ci-scan-x` travels 230 user units, which is this track's length. */}
      <path d="M18 190h264" {...T} opacity="0.6" />
      <path
        d="M52 190h6M86 190h6M120 190h6M154 190h6M188 190h6M222 190h6"
        {...T}
        opacity="0.65"
      />
      <g className="reel-after-1">
        <g className="ci-scan-x">
          <path d="M20 182v16" stroke={BRAND} strokeWidth="2.8" strokeLinecap="round" />
        </g>
      </g>

      {/* Where it goes. */}
      <g className="reel-after-2">
        <path
          d="M150 198v16M150 214H58v18M150 214h92v18M150 214v18"
          {...T}
          opacity="0.46"
          strokeDasharray="3 5"
        />
        <g data-first-tick>
          {dests.map((x, d) => (
            <g key={x} className="ci-blink" style={walk(d, 3)}>
              <path
                d={`M150 214${d === 1 ? "" : `H${x + 40}`}v18`}
                pathLength="100"
                stroke={BRAND}
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ))}
        </g>

        {/* A website. */}
        <rect x={dests[0]} y="232" width="80" height="56" rx="7" {...T} opacity="0.85" />
        <path d={`M${dests[0]} 248h80`} {...T} opacity="0.6" />
        <path d={`M${dests[0] + 12} 266h46M${dests[0] + 12} 278h30`} {...T} opacity="0.55" />
        {/* A social platform — the one with its own page under this pillar. */}
        <rect x={dests[1]} y="232" width="80" height="56" rx="7" {...T} opacity="0.85" />
        <g transform={`translate(${dests[1] + 28} 248)`}>
          <ChannelIcon name={platform} size={24} className="text-brand" />
        </g>
        {/* A paid slot. */}
        <rect x={dests[2]} y="232" width="80" height="56" rx="7" {...T} opacity="0.85" />
        <path
          d={`M${dests[2]} 224v-6h10M${dests[2] + 80} 224v-6h-10`}
          {...T}
          opacity="0.72"
        />
        <path d={`M${dests[2] + 12} 254h52M${dests[2] + 12} 272h32`} {...T} opacity="0.55" />
      </g>

      {/* The cut itself, cued up as frames. */}
      <g className="reel-after-3">
        {[0, 1, 2, 3, 4].map((f) => (
          <g key={f} transform={`translate(${18 + f * 54} 312)`}>
            <rect width="46" height="32" rx="4" {...T} opacity={f === 2 ? 0 : 0.55} />
            {f === 2 && <rect width="46" height="32" rx="4" {...S} stroke={BRAND} strokeWidth="2" />}
          </g>
        ))}
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ services
   Read off `crafts` rather than written here, so the hero cannot name a service
   the services section does not, or miss one it adds. Scenes, routes and alt
   text are indexed positionally against the head of that list, so they cannot
   silently disagree about which screen belongs to which name.

   THE SEVENTH PILLAR IS NOT IN THE REEL. `crafts` has seven; the last is AI
   Hub, which has no landing page in `BUILT` and which the hero's own sentence
   places as something the work is "supported by ... where it adds value"
   rather than as a seventh channel. The slice is one number, so adding it later
   is adding a scene and changing a 6 to a 7. */

/** The four platforms on the Performance screen are the four the card lists.
 *  The Social and Video screens name platforms the site has a built page for
 *  under that pillar. `ChannelIcon` renders nothing for a name it does not
 *  hold, so a typo here is a missing mark rather than a wrong logo. */
const PERF_PLATFORMS = crafts[1].items; // Google Ads, Meta Ads, LinkedIn Ads, YouTube Ads
/** The four platforms with their own built page under the social pillar
 *  (`/{facebook,instagram,linkedin,tiktok}-marketing-agency…`).
 *  The keys carry "Ads" because that is how `ChannelIcon` indexes them; the
 *  marks themselves are labelled LinkedIn and TikTok. */
const SOCIAL_PLATFORMS = ["Facebook", "Instagram", "LinkedIn Ads", "TikTok Ads"];
const VIDEO_PLATFORM = "YouTube Ads";

const SCENES = [
  {
    Scene: () => <SceneSeo />,
    /** field, then your entry in the listing, then the page it opens. */
    route: [
      [268, 330],
      [150, 34],
      [96, 128],
      [214, 316],
    ] as Route,
    alt: "a search field being used, the listing it returns with your entry marked and visible in it, and the page the searcher lands on",
  },
  {
    Scene: () => <ScenePerformance platforms={PERF_PLATFORMS} />,
    /** the platform, the page's one action, the measurement. */
    route: [
      [280, 340],
      [106, 44],
      [90, 224],
      [236, 320],
    ] as Route,
    alt: "a campaign set up across four ad platforms, leading to a landing page and on into analytics, with one route running through all three",
  },
  {
    Scene: () => <SceneSocial platforms={SOCIAL_PLATFORMS} />,
    /** the platform tab, a post, the reply. */
    route: [
      [286, 344],
      [156, 22],
      [110, 140],
      [240, 308],
    ] as Route,
    alt: "a platform chosen, its feed of posts refreshing, engagement coming back off it and a reply being written",
  },
  {
    Scene: () => <SceneWeb />,
    /** the page body, the call to action, the cards. */
    route: [
      [286, 340],
      [150, 112],
      [92, 255],
      [180, 306],
    ] as Route,
    alt: "a whole page assembling inside a browser frame, with one call to action on it, and a load sweeping through",
  },
  {
    Scene: () => <SceneLead />,
    /** field one, field two, send. */
    route: [
      [280, 344],
      [106, 90],
      [106, 126],
      [78, 163],
    ] as Route,
    alt: "an enquiry form being completed field by field and sent, arriving as one qualified conversation on file",
  },
  {
    Scene: () => <SceneVideo platform={VIDEO_PLATFORM} />,
    /** play, the destinations, the cut. */
    route: [
      [286, 344],
      [152, 94],
      [150, 214],
      [64, 328],
    ] as Route,
    alt: "one video cut playing, then going out to a website, a social platform and a paid slot",
  },
];

const REEL = crafts.slice(0, 6).map((c, i) => ({
  no: c.no,
  name: c.title,
  ...SCENES[i],
}));

/* ---------------------------------------------------------------------- reel */

export function ServiceReel({ className }: { className?: string }) {
  const [at, setAt] = useState(0);
  /** Held while a reader is pointing at or tabbed into the rail. A reel that
   *  keeps moving under the segment you are using is the one thing this pattern
   *  reliably gets wrong. */
  const [held, setHeld] = useState(false);
  const reduced = usePrefersReducedMotion();

  /** The interval advances with the functional updater, so it never closes over
   *  `at` and never has to be rebuilt when a reader picks a segment. It IS torn
   *  down and rebuilt while the reel is held, which is what gives a chosen
   *  scene a full dwell of its own once the pointer leaves. */
  useEffect(() => {
    if (reduced || held) return;
    const id = window.setInterval(() => setAt((a) => (a + 1) % REEL.length), DWELL);
    return () => window.clearInterval(id);
  }, [reduced, held]);

  const active = REEL[at];

  return (
    /** Fills the row, so the drawing stands as tall as the copy beside it (team
     *  direction). `min-h-0` is what lets the stage below shrink inside a
     *  stretched grid cell — without it the SVG's intrinsic height wins and the
     *  cell grows past the copy column. */
    <div
      className={cn(
        /** BELOW `lg` THE REEL IS CAPPED AND CENTRED. The scenes are portrait
         *  300x360 because at `lg` they stand in a ~500px column beside the
         *  copy; let that drawing run the full width of a phone and it is
         *  letterboxed into a band with dead margins either side. A 340px cap
         *  gives the portrait screen its own proportions on a phone, which is
         *  the shape a phone reads best anyway. */
        "mx-auto flex w-full max-w-[340px] select-none flex-col sm:max-w-[420px] lg:h-full lg:min-h-0 lg:max-w-none",
        className,
      )}
    >
      {/* WHICH SERVICE IS ON. The playlist of all six names was removed, so this
          line is the only thing telling a reader what they are looking at. It
          crossfades with the scene rather than swapping under it, and it is
          sized well below the headline: a caption on a drawing, not a second
          heading. */}
      <div className="flex items-baseline gap-3 overflow-hidden">
        <span className="font-display text-[0.6875rem] font-bold tabular-nums text-brand">
          {active.no}
        </span>
        <AnimatePresence initial={false} mode="wait">
          <motion.h3
            key={at}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
            className="font-display text-sm font-extrabold uppercase leading-tight tracking-[0.04em] text-snow sm:text-base"
          >
            {active.name}
          </motion.h3>
        </AnimatePresence>
      </div>

      {/* THE RAIL: where in the run you are, and the only control. Six
          segments, no names — naming them is `sections/Craft`'s job, right
          below the fold. Each is a real button, so every scene is reachable by
          pointer, tap and keyboard rather than only by waiting. */}
      <ul
        className="mt-3 flex gap-1.5"
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
      >
        {REEL.map(({ name }, i) => {
          const on = i === at;
          return (
            <li key={name} className="flex-1">
              <button
                type="button"
                onClick={() => setAt(i)}
                onMouseEnter={() => setAt(i)}
                onFocus={() => setAt(i)}
                aria-pressed={on}
                /** The hit area is 24px tall around a 2px rule: a two-pixel
                 *  target would fail every touch guideline there is. */
                className="group flex h-6 w-full items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="sr-only">{name}</span>
                <span
                  aria-hidden
                  className={cn(
                    "block h-[2px] w-full overflow-hidden rounded-full transition-colors duration-300 motion-reduce:transition-none",
                    on ? "bg-line" : "bg-line/70 group-hover:bg-ash/60",
                  )}
                >
                  {/* `pin-progress` runs 0 to 1 with `forwards` and no inline
                      transform, so before it starts — and under reduced motion,
                      where globals.css kills it on the strength of the
                      `pin-progress` in this very style attribute — the segment
                      rests FULL rather than empty. A finished, readable state,
                      which is the rule for every loop on this site. */}
                  <span
                    key={on && !held ? `${at}-run` : `${i}-rest`}
                    className={cn(
                      "block h-[2px] w-full origin-left",
                      on ? "bg-brand" : "bg-transparent",
                    )}
                    style={
                      on && !held && !reduced
                        ? { animation: `pin-progress ${DWELL}ms linear forwards` }
                        : undefined
                    }
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* THE STAGE. No panel, no border, no fill: the drawing sits on the hero's
          own ground like everything else here. It had the `bg-ink-2` card the
          service-page hero visuals use, and in the light theme that is a
          near-white slab dropped into an open page, which is what team
          direction removed.

          `flex-1` with `min-h-0`, so the drawing takes whatever height the copy
          column leaves and nothing below it moves when the scene changes. */}
      {/* AN INTRINSIC HEIGHT BELOW `lg`, A STRETCHED ONE AT `lg` AND UP.
          `flex-1` on its own measured ZERO here: below `lg` the hero collapses
          to one column, so the grid row has no definite height for the reel's
          `h-full` to resolve against, the stage's only height came from
          `flex-1`, and a flex item with no intrinsic height gets none of a
          height that does not exist. Measured: the stage SVG was 741 wide by 0
          tall at 821px. The aspect gives it a real height wherever the row
          cannot, and is dropped at `lg`, where the copy column sets the row and
          `flex-1` is what makes the drawing stand as tall as the copy. */}
      <div className="relative mt-5 aspect-[5/6] min-h-0 w-full lg:aspect-auto lg:flex-1">
        <AnimatePresence initial={false}>
          <motion.div
            key={at}
            initial={{ opacity: 0, scale: reduced ? 1 : 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.99 }}
            transition={{ duration: reduced ? 0 : FADE, ease: EASE }}
            className="absolute inset-0"
          >
            {/* Only the scene on stage is mounted, so its pointer and its loops
                start with it rather than running unseen behind five others —
                which is also why the hero pays for one scene's animation rather
                than six. `--reel-dwell` is the dwell, so the demonstration
                finishes exactly as the stage changes. */}
            <svg
              viewBox="0 0 300 360"
              preserveAspectRatio="xMidYMid meet"
              className="h-full w-full"
              fill="none"
              role="img"
              aria-label={`${active.name}: ${active.alt}`}
              style={{ "--reel-dwell": `${DWELL}ms` } as CSSProperties}
            >
              <active.Scene />
              <Pointer route={active.route} />
            </svg>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
