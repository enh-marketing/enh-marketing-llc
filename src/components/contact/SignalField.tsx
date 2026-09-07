"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** THE HERO VISUAL: two signals meeting.
 *
 *  WHAT IT DRAWS, AND WHY IT IS THIS AND NOT A PICTURE OF SOMETHING. Two wave
 *  sources on one field. The lower one is fixed: it is the studio, and it is
 *  emitting whether anyone is watching or not. The other one is the visitor's
 *  pointer, and it emits too. Where the two wavefronts arrive together they
 *  brighten, where they arrive opposed they cancel, and the pattern between
 *  them is the whole subject of this page rendered as the physical thing it
 *  actually is. Reaching out and getting something back is not a metaphor here;
 *  it is what the shader computes.
 *
 *  THE DETAIL WORTH WAITING FOR IS FREE. Points equidistant from two sources
 *  always receive both waves in phase, so a permanently bright band runs along
 *  the perpendicular bisector of the two: the line where the two signals agree.
 *  Nobody draws it. It falls out of the interference, and it sweeps across the
 *  field as the visitor moves, which is the moment the drawing stops looking
 *  like decoration.
 *
 *  WHY WEBGL IS THE RIGHT ANSWER HERE AND NOT AN INDULGENCE. This site already
 *  speaks it: the homepage hero is a Three.js planet with a hand-written
 *  gradient shader and no textures, and the Manifesto scrubs a 3D bolt. A
 *  contact page carrying an SVG line drawing next to those reads as the cheap
 *  room in the house. This costs one fullscreen quad and one arithmetic
 *  fragment shader -- no geometry, no textures, no post-processing, nothing to
 *  download -- which is cheaper than the SVG it replaced was to lay out. It
 *  follows SaturnCanvas's own contract exactly: a try/catch around the
 *  renderer, an IntersectionObserver and a visibilitychange listener that stop
 *  the loop when nobody can see it, a ResizeObserver, and a full dispose.
 *
 *  WHAT REPLACED WHAT, AND WHY. This was a skyline whose towers grew 18% under
 *  the cursor. It was a drawing of a place rather than a drawing of the page's
 *  subject, and an 18% nudge is not an interaction anyone notices. Recorded
 *  because the pull toward "draw the city the client is in" is strong and it is
 *  the wrong instinct on this page.
 *
 *  IT DEGRADES TO A COMPLETE PICTURE, THREE TIMES OVER. The SVG underneath is
 *  the same two-source field drawn as concentric hairlines, and it is what the
 *  server renders, what a crawler sees, and what stays if WebGL is unavailable
 *  or the context is refused. The canvas fades over it only once it is really
 *  running. Under `prefers-reduced-motion` the canvas renders one still frame
 *  and never starts a loop, and the pointer is never read, so the field is a
 *  fixed interference pattern rather than a moving one. */

/** Where the studio's source sits, and where the visitor's rests before it has
 *  been touched. Both in the shader's own space: y runs 0 at the bottom to 1 at
 *  the top, and x runs 0 to the aspect ratio, so a ring is always round. */
const SRC_STUDIO: [number, number] = [0.66, 0.34];
const SRC_REST: [number, number] = [0.28, 0.7];

/** Ring spacing, travel speed, and how fast a source's amplitude falls off with
 *  distance. FALL is what makes the two sources read as sources rather than as
 *  a wallpaper of rings: the field is brightest where they are.
 *
 *  K WAS 46 AND THAT WAS TOO MANY LINES. Wavenumber sets how many antinodal
 *  hyperbolae fall between the sources -- roughly K times the distance between
 *  them, halved -- and at 46 the box filled with about nine of them and read as
 *  busy rather than precise. 34 gives seven. Raising it is the fastest way to
 *  make this look like noise again. */
const K = 34.0;
const OMEGA = 2.4;
const FALL = 2.6;

const VERT = /* glsl */ `
  void main() {
    /* Straight to clip space: the quad is the viewport, so no camera or model
       matrix is involved and none is set up. */
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec2 uRes;
  uniform vec2 uA;
  uniform vec2 uB;
  uniform float uT;
  uniform float uFade;
  uniform vec3 uInk;

  const float K = ${K.toFixed(1)};
  const float OMEGA = ${OMEGA.toFixed(1)};
  const float FALL = ${FALL.toFixed(1)};

  void main() {
    /* Normalised by HEIGHT on both axes, so x simply runs past 1.0 on a wide
       box. Dividing each axis by its own extent is the usual mistake and it
       turns every ring into an ellipse. */
    vec2 p = gl_FragCoord.xy / uRes.y;

    float d1 = distance(p, uA);
    float d2 = distance(p, uB);

    /* Amplitude falls off with distance, which is what makes the two read as
       sources rather than as a wallpaper of rings. */
    float a1 = 1.0 / (1.0 + d1 * FALL);
    float a2 = 1.0 / (1.0 + d2 * FALL);

    float w1 = sin(d1 * K - uT * OMEGA);
    float w2 = sin(d2 * K - uT * OMEGA);

    /* EACH SOURCE DRAWS ITS OWN WAVEFRONTS. Summing the two fields and then
       thresholding the result is physically tidy and visually wrong: the
       normalised sum is a weighted mean, so a crest of one source is cancelled
       wherever the other is in trough, and all that survives is a scatter of
       lozenges where the two happen to agree. That is exactly what the first
       version of this shader drew. Two ring families, added, is the picture.

       The narrow smoothstep is the hairline: at this wavenumber it lands around
       five pixels, which is the same weight as every rule on the page. Widen it
       and the whole thing turns into a blurry glow. */
    float rings = smoothstep(0.958, 0.999, w1) * a1 + smoothstep(0.958, 0.999, w2) * a2;

    /* AND THE STRUCTURE BETWEEN THEM, which is the part worth the visual.
       abs(cos(k * (d1 - d2) / 2)) is the interference ENVELOPE rather than the
       instantaneous sum, so it does not travel with the wavefronts: it is the
       fixed family of hyperbolae along which the two sources always arrive in
       phase. A ripple tank draws exactly this. It holds still while the waves
       move through it and it re-shapes bodily the moment the visitor moves
       their source, which is the interaction.

       Its midline is the perpendicular bisector of the two sources: the one
       path on which the two signals agree at every point, however far out you
       follow it. Nobody draws that line. It falls out of the arithmetic. */
    float env = abs(cos((d1 - d2) * K * 0.5));
    float anti = smoothstep(0.982, 1.0, env) * pow(clamp((a1 + a2) * 0.55, 0.0, 1.0), 0.9);

    /* The sources themselves. The studio's carries a static ring, so it reads
       as a fixed installation rather than as a second cursor, and both sit in a
       soft halo so the two stations hold the composition even where the lines
       are at their faintest. */
    float coreA = smoothstep(0.017, 0.006, d1);
    float ringA = smoothstep(0.0055, 0.0, abs(d1 - 0.052));
    float coreB = smoothstep(0.013, 0.004, d2);
    float halo = exp(-d1 * 7.0) * 0.34 + exp(-d2 * 8.0) * 0.26;

    /* The travelling wavefronts are the quieter layer and the antinodal lines
       the louder one: the motion is the texture, the structure is the subject. */
    float alpha = clamp(rings * 0.42 + anti + halo + coreA + ringA * 0.65 + coreB * 0.8, 0.0, 1.0);

    /* DISSOLVE INTO THE PAGE. Without this the field ends on the edges of its
       own box and the hero has a visible rectangle in it, which is the one
       thing that makes a full-bleed shader look bolted on. An elliptical
       falloff to the box's inscribed ellipse, so the drawing has no edges at
       all. */
    /* Named mid, NOT half. half is a RESERVED KEYWORD in GLSL ES, so declaring
       one fails compilation, Three.js then renders nothing at all, and the
       section shows only the CSS glow sitting behind the canvas -- which looks
       exactly like a shader that is merely too faint. It cost two rounds of
       tuning a picture that was never being drawn. (And no backticks in here
       either: this whole shader is a JS template literal.) */
    vec2 mid = vec2(uRes.x / uRes.y, 1.0) * 0.5;
    float vig = 1.0 - smoothstep(0.70, 1.30, length((p - mid) / mid));

    gl_FragColor = vec4(uInk, alpha * vig * uFade);
  }
`;

/** The still version of the same field, in SVG. Server-rendered, so the section
 *  is never empty: concentric hairlines from both sources, at the same places
 *  the shader puts them. viewBox is 140x100 because the box is 1.4:1, which is
 *  what turns the shader's aspect-space coordinates into these. */
function StillField() {
  /* The viewBox is 140 units wide for a box that is 1.4:1, so a source at
     fraction f of the width sits at f * 140, and the shader's y is measured
     from the BOTTOM while SVG's is measured from the top. */
  const A = [SRC_STUDIO[0] * 140, (1 - SRC_STUDIO[1]) * 100] as const;
  const B = [SRC_REST[0] * 140, (1 - SRC_REST[1]) * 100] as const;
  const radii = [7, 15, 23, 31, 39, 47, 55, 63, 71, 79];

  return (
    <svg
      viewBox="0 0 140 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Two sources of concentric waves, and the interference pattern between them."
    >
      {/* Clipped to the box, so the outer rings end at the edge rather than
          bulging the layout. */}
      <defs>
        <clipPath id="signal-field-clip">
          <rect x="0" y="0" width="140" height="100" />
        </clipPath>
      </defs>
      <g clipPath="url(#signal-field-clip)" fill="none" vectorEffect="non-scaling-stroke">
        {radii.map((r) => (
          <circle
            key={`a${r}`}
            cx={A[0]}
            cy={A[1]}
            r={r}
            className="stroke-brand"
            strokeWidth="0.35"
            opacity={Math.round((1 - r / 96) * 100) / 100}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {radii.map((r) => (
          <circle
            key={`b${r}`}
            cx={B[0]}
            cy={B[1]}
            r={r}
            className="stroke-brand"
            strokeWidth="0.35"
            opacity={Math.round((1 - r / 96) * 80) / 100}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <circle cx={A[0]} cy={A[1]} r="4.6" className="stroke-brand" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <circle cx={A[0]} cy={A[1]} r="1.5" className="fill-brand" />
        <circle cx={B[0]} cy={B[1]} r="1.2" className="fill-brand" />
      </g>
    </svg>
  );
}

export function SignalField() {
  const host = useRef<HTMLDivElement>(null);
  const still = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = host.current;
    const fallback = still.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      // No WebGL, no context, or a refusing driver: the SVG stays and that is a
      // complete picture, so there is nothing to report and nothing to clean up.
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.setClearAlpha(0);
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      width: "100%",
      height: "100%",
      display: "block",
    });

    /* The brand red, read off the stylesheet rather than written twice. It is
       the same value in both themes, which is why nothing here has to watch for
       a theme change. */
    const ink = new THREE.Color(
      getComputedStyle(document.documentElement).getPropertyValue("--color-brand").trim() ||
        "#e8000d",
    );

    const uniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uA: { value: new THREE.Vector2(...SRC_STUDIO) },
      uB: { value: new THREE.Vector2(...SRC_REST) },
      uT: { value: 0 },
      uFade: { value: reduce ? 1 : 0 },
      uInk: { value: ink },
    };

    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(geo, mat));
    /* A bare Camera: the vertex shader writes clip space directly, so there is
       no projection to set up and nothing to keep in sync on resize. */
    const camera = new THREE.Camera();

    /** Has the visitor's source been taken over by the pointer yet, where it
     *  rests until then, and where it is heading. Declared before `layout`,
     *  which reads all three. */
    let engaged = false;
    const restB = new THREE.Vector2(...SRC_REST);
    const targetB = new THREE.Vector2(...SRC_REST);

    const layout = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      const px = renderer.getDrawingBufferSize(new THREE.Vector2());
      uniforms.uRes.value.set(px.x, px.y);
      /* Both source positions are fractions of the WIDTH, so they scale with
         the aspect the shader works in. Without this the studio's source slides
         as the box changes shape. */
      const aspect = w / h;
      uniforms.uA.value.set(SRC_STUDIO[0] * aspect, SRC_STUDIO[1]);
      restB.set(SRC_REST[0] * aspect, SRC_REST[1]);
      if (!engaged) {
        targetB.copy(restB);
        uniforms.uB.value.copy(restB);
      }
    };

    layout();
    /* One frame immediately, and under reduced motion the only frame there will
       ever be. */
    renderer.render(scene, camera);

    /** THE FALLBACK IS NOT DISMISSED UNTIL THE CANVAS IS DEMONSTRABLY PAINTING.
     *  It used to be hidden right here, which was wrong twice: the first frame
     *  renders at uFade 0 and is therefore fully transparent, so the visual
     *  flashed empty; and in any environment where requestAnimationFrame never
     *  runs -- a background tab, a throttled preview -- the fade never ramps and
     *  the section stayed empty for good. Now the still field holds the space
     *  until the shader has faded up over it. */
    const dismissStill = () => {
      if (fallback) fallback.style.opacity = "0";
    };

    if (reduce) {
      dismissStill();
      const ro = new ResizeObserver(() => {
        layout();
        renderer.render(scene, camera);
      });
      ro.observe(mount);
      return () => {
        ro.disconnect();
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    /* ------------------------------------------------------------ the pointer */
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      if (!r.height) return;
      engaged = true;
      /* gl_FragCoord counts up from the bottom, so y is measured from the
         bottom edge. Both axes divide by HEIGHT, matching the shader. */
      targetB.set((e.clientX - r.left) / r.height, (r.bottom - e.clientY) / r.height);
    };
    const onLeave = () => {
      engaged = false;
      targetB.copy(restB);
    };
    mount.addEventListener("pointermove", onMove);
    mount.addEventListener("pointerleave", onLeave);

    /* --------------------------------------------------------------- the loop */
    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;
    let running = false;

    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      uniforms.uT.value += dt;
      /* Frame-rate independent easing rather than a fixed lerp factor: the
         pointer's source arrives with weight instead of snapping to the
         cursor, and it behaves the same at 60Hz and at 120. */
      const k = 1 - Math.exp(-dt * 9);
      uniforms.uB.value.lerp(targetB, k);
      uniforms.uFade.value = Math.min(1, uniforms.uFade.value + dt * 1.6);
      renderer.render(scene, camera);
      if (uniforms.uFade.value > 0.98) dismissStill();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running) return;
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    start();

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    io.observe(mount);
    const onVis = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(layout);
    ro.observe(mount);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mount.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerleave", onLeave);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    /* 1.4:1, which is what StillField's viewBox is cut to. Capped in height so
       it cannot push the four contact cards under the fold on a short screen. */
    <div className="relative aspect-[7/5] w-full max-h-[30rem]">
      {/* Depth behind the field, the same warm wash the other heroes carry. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-6%] -z-10"
        style={{
          background:
            "radial-gradient(46% 52% at 62% 62%, rgba(232,0,13,0.16), transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      <div
        ref={still}
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: 0.85 }}
      >
        <StillField />
      </div>
      {/* touch-none: the pointer drives the second source, and on a touch
          screen that must not also mean the page refuses to scroll. */}
      <div ref={host} aria-hidden className="absolute inset-0 touch-none" />
    </div>
  );
}
