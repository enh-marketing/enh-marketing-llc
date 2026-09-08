import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

/* -------------------------------------------------------------------------- */
/*  PARTICLE DRIFT — @mengto/particle-drift on 21st.dev                       */
/*                                                                            */
/*  WHAT IT ACTUALLY IS, because it is not obvious from the outside. This is  */
/*  not a React canvas. It is an <iframe srcDoc> holding a complete HTML       */
/*  document, and that document is a finished landing page for a fictional     */
/*  company called "Zenith Compute Network", headline "Infinite execution      */
/*  threads", a throughput readout of "128.6 PB/s" and a "Provision Network"   */
/*  button. A script then hides all of it and leaves only the particle canvas  */
/*  visible. Every one of those words still ships inside the string below.     */
/*  None of it is rendered and none of it is ours.                             */
/*                                                                            */
/*  IT LOADS FOUR SCRIPTS FROM CDNS AT RUNTIME: Tailwind's browser build,      */
/*  Iconify, GSAP and ScrollTrigger, plus a Google Fonts stylesheet. That is   */
/*  the same class of thing as the Tubes component that was withheld, with     */
/*  one important difference: this runs under sandbox="allow-scripts" and      */
/*  WITHOUT allow-same-origin, so the frame is an opaque origin and cannot     */
/*  reach this page, its DOM, its cookies or its storage. It is contained.     */
/*  What it does still mean is five network requests to three third parties on */
/*  every load, and a blank background if any of them is unreachable.          */
/*                                                                            */
/*  ONE ADDITIVE CHANGE, and only one: a `transparent` prop. The component     */
/*  hard-forces its own page colour into the frame with                        */
/*  `background: #030509 !important`, which makes it an opaque black rectangle */
/*  and therefore impossible to lay over anything. Transparency is the whole   */
/*  point of putting it with the orbital scene, so the prop swaps that one     */
/*  declaration and nothing else. Default is false, which is the component     */
/*  exactly as published.                                                      */
/* -------------------------------------------------------------------------- */

type NeuformMode = "dark" | "light";
type NeuformModePreference = NeuformMode | "auto";

type FocusTarget = {
  selector: string;
  role: "background" | "ui";
  width?: string;
};

type BakeKnobs = {
  size: number;
  gap: number;
  length: number;
  density: number;
  strokeWidth: number;
  mode: NeuformMode;
  /** Added here, not upstream. See the `beams` prop. */
  beams: boolean;
};

type EffectDefinition = {
  title: string;
  source: string;
  background: string | ((mode: NeuformMode) => string);
  defaultMode?: NeuformModePreference;
  supportsMode?: boolean;
  targets: readonly FocusTarget[];
  focusCss?: string;
  patch?: (source: string, knobs: BakeKnobs) => string;
};

export type ParticleDriftProps = {
  mode?: NeuformModePreference;
  speed?: number;
  size?: number;
  gap?: number;
  length?: number;
  density?: number;
  strokeWidth?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  /**
   * Added here, not upstream. Drops the frame's forced page colour so the
   * particles can sit over something else. Without it the frame paints
   * #030509 behind them and hides whatever is underneath.
   */
  transparent?: boolean;
  /**
   * Added here, not upstream. Forwards the parent page's pointer into the
   * frame. Needed whenever the frame is laid over something else with
   * pointer-events:none, because it then receives no mouse events of its own
   * and its particles would sit inert.
   */
  followPointer?: boolean;
  /**
   * Added here, not upstream. The effect draws two things: the drifting ASCII
   * nodes with their proximity lines, and a separate set of fast blue vertical
   * beams shooting upward. This turns the beams off and leaves the letters.
   * Defaults to true, which is the component as published.
   */
  beams?: boolean;
  className?: string;
  style?: CSSProperties;
};

const PARTICLE_DRIFT_DEFAULTS = {
  mode: "dark" as NeuformMode,
  speed: 1,
  size: 1,
  gap: 2,
  length: 1,
  density: 1,
  strokeWidth: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

const LIGHT_PAPER = "#eef1f6";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function scaleCount(base: number, density: number, minimum = 1) {
  return Math.max(minimum, Math.round(base * density));
}

function resolveMode(
  mode: NeuformMode | number | string | undefined,
  fallback: NeuformMode = "dark",
): NeuformMode {
  if (mode === undefined || mode === null) return fallback;
  if (mode === "light" || mode === 1 || mode === "1") return "light";
  return "dark";
}

function readAutomaticMode(): NeuformMode {
  if (typeof document === "undefined" || typeof window === "undefined") return "dark";
  const root = document.documentElement;
  const declared = root.dataset.scheme ?? root.dataset.theme;
  if (declared === "light" || declared === "dark") return declared;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function useAutomaticMode(enabled: boolean) {
  const [mode, setMode] = useState<NeuformMode>(readAutomaticMode);

  useEffect(() => {
    if (!enabled || typeof document === "undefined" || typeof window === "undefined")
      return undefined;
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setMode(readAutomaticMode());
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-scheme", "data-theme"] });
    media.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
    };
  }, [enabled]);

  return mode;
}

function resolveBackground(background: EffectDefinition["background"], mode: NeuformMode) {
  return typeof background === "function" ? background(mode) : background;
}

/* Verbatim content of particle-drift.html, re-encoded as a template literal so
   it can be embedded without a Vite `?raw` loader. Rendered inside a sandboxed
   iframe via srcDoc. The marketing page it contains is hidden at runtime by the
   focus script further down; see the note at the top of this file. */
const PARTICLE_DRIFT_SOURCE = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zenith Compute Network</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@400&display=swap" rel="stylesheet">
</head>
<body class="bg-[#030509] min-h-screen flex items-center justify-center p-4 md:p-12 font-sans antialiased text-[#FFFFFF] overflow-x-hidden">
    <div class="w-full max-w-[1440px]" style="display:inline-block; padding:1px; border-radius:24px; background:linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0));">
        <div class="relative w-full flex flex-col md:flex-row overflow-hidden min-h-[600px] md:min-h-[650px]" style="background:#030509; border-radius:23px;">
            <canvas id="particle-canvas" class="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-100"></canvas>
            <div class="w-full md:w-[38%] px-8 lg:px-16 py-10 md:py-14 flex flex-col justify-between relative z-20 shrink-0">
                <div>
                    <h1 id="hero-heading" class="text-5xl md:text-7xl tracking-tight mb-6 leading-none opacity-0 font-light">Placeholder</h1>
                </div>
            </div>
            <div class="w-full md:w-[62%] relative bg-transparent overflow-hidden min-h-[400px] md:min-h-0 pointer-events-none"></div>
        </div>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const canvas = document.getElementById('particle-canvas');
            const ctx = canvas.getContext('2d');

            let width, height;
            let nodes = [];
            let beams = [];
            const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()'.split('');
            let mouse = { x: -1000, y: -1000 };

            function resize() {
                width = canvas.clientWidth;
                height = canvas.clientHeight;
                const dpr = window.devicePixelRatio || 1;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.scale(dpr, dpr);
            }

            window.addEventListener('resize', () => { resize(); initParticles(); });

            window.addEventListener('mousemove', e => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });

            // ADDED, not upstream. The frame is laid over another scene with
            // pointer-events:none so the pointer still reaches what is beneath
            // it, which means these events never arrive on their own. The
            // parent forwards them instead. Same closure, so the mouse
            // object is in scope; nothing else about the effect changes.
            window.addEventListener('message', function (ev) {
                if (!ev.data || ev.data.type !== 'threeui-pointer') return;
                mouse.x = ev.data.x;
                mouse.y = ev.data.y;
            });

            function initParticles() {
                nodes = Array.from({ length: 90 }).map(() => ({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vy: (Math.random() * 0.4) + 0.1,
                    char: chars[Math.floor(Math.random() * chars.length)]
                }));

                beams = Array.from({ length: 25 }).map(() => ({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    length: Math.random() * 100 + 50,
                    speed: (Math.random() * 6) + 3,
                    opacity: Math.random() * 0.5 + 0.3
                }));
            }

            resize();
            initParticles();

            function draw() {
                ctx.clearRect(0, 0, width, height);

                beams.forEach(b => {
                    b.y -= b.speed;
                    if (b.y + b.length < 0) { b.y = height + 100; b.x = Math.random() * width; }
                    let g = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.length);
                    g.addColorStop(0, \`rgba(96, 165, 250, \${b.opacity})\`);
                    g.addColorStop(1, 'transparent');
                    ctx.strokeStyle = g;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(b.x, b.y);
                    ctx.lineTo(b.x, b.y + b.length);
                    ctx.stroke();
                });

                ctx.font = '12px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.lineWidth = 0.5;
                for(let i = 0; i < nodes.length; i++) {
                    let n1 = nodes[i];
                    for(let j = i + 1; j < nodes.length; j++) {
                        let n2 = nodes[j];
                        let d = Math.hypot(n1.x - n2.x, n1.y - n2.y);
                        if(d < 120) {
                            ctx.strokeStyle = \`rgba(156, 163, 175, \${0.15 * (1 - d/120)})\`;
                            ctx.beginPath();
                            ctx.moveTo(n1.x, n1.y);
                            ctx.lineTo(n2.x, n2.y);
                            ctx.stroke();
                        }
                    }
                }

                nodes.forEach(n => {
                    n.y += n.vy; // Slow drift
                    if(n.y > height + 20) { n.y = -20; n.x = Math.random() * width; }

                    let dist = Math.hypot(mouse.x - n.x, mouse.y - n.y);
                    if (dist < 180 || Math.random() > 0.98) n.char = chars[Math.floor(Math.random() * chars.length)];

                    if (dist < 180) {
                        ctx.strokeStyle = \`rgba(96, 165, 250, \${0.5 * (1 - dist/180)})\`;
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }

                    ctx.fillStyle = dist < 180 ? '#60A5FA' : 'rgba(156, 163, 175, 0.4)';
                    ctx.fillText(n.char, n.x, n.y);
                });

                requestAnimationFrame(draw);
            }
            draw();
        });
    </script>
</body>
</html>`;

const PARTICLE_DRIFT_DEFINITION: EffectDefinition = {
  title: "Particle Drift",
  source: PARTICLE_DRIFT_SOURCE,
  supportsMode: true,
  background: (mode) => (mode === "light" ? LIGHT_PAPER : "#030509"),
  targets: [{ selector: "#particle-canvas", role: "background" }],
  patch(source, { size, length, density, mode, beams }) {
    const link = Math.round(120 * length);
    const proximityAlpha = mode === "light" ? 0.22 : 0.15;
    let next = source
      .replace("Array.from({ length: 90 })", `Array.from({ length: ${scaleCount(90, density, 12)} })`)
      // Zero-length array rather than deleting the loop: the forEach then has
      // nothing to walk, and the original drawing code is left exactly as it is.
      .replace(
        "Array.from({ length: 25 })",
        `Array.from({ length: ${beams ? scaleCount(25, density, 4) : 0} })`,
      )
      .replace("length: Math.random() * 100 + 50,", `length: (Math.random() * 100 + 50) * ${length},`)
      .replace(
        "n.y += n.vy; // Slow drift",
        "n.y += n.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1); // Slow drift",
      )
      .replace(
        "b.y -= b.speed;",
        "b.y -= b.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);",
      )
      .replace("if(d < 120) {", `if(d < ${link}) {`)
      .replace("0.15 * (1 - d/120)", `${proximityAlpha} * (1 - d/${link})`)
      .replace("ctx.lineWidth = 1.5;", `ctx.lineWidth = ${Number((1.5 * size).toFixed(2))};`);
    if (mode === "light") {
      next = next
        .replaceAll("rgba(96, 165, 250,", "rgba(37, 99, 235,")
        .replaceAll("rgba(156, 163, 175,", "rgba(36, 48, 68,");
    }
    return next;
  },
};

function buildFocusedDocument(
  definition: EffectDefinition,
  knobs: BakeKnobs & { speed: number; opacity: number; transparent: boolean },
) {
  const mode = knobs.mode;
  /* The one added line: with `transparent`, the frame stops painting its own
     page colour so whatever sits behind it shows through. */
  const background = knobs.transparent
    ? "transparent"
    : resolveBackground(definition.background, mode);
  const targetJson = JSON.stringify(definition.targets).replace(/</g, "\\u003c");
  const controlsJson = JSON.stringify({
    mode,
    speed: knobs.speed,
    size: knobs.size,
    gap: knobs.gap,
    length: knobs.length,
    density: knobs.density,
    strokeWidth: knobs.strokeWidth,
    opacity: knobs.opacity,
  }).replace(/</g, "\\u003c");
  const patchedSource = definition.patch
    ? definition.patch(definition.source, {
        size: knobs.size,
        gap: knobs.gap,
        length: knobs.length,
        density: knobs.density,
        strokeWidth: knobs.strokeWidth,
        mode,
        beams: knobs.beams,
      })
    : definition.source;
  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${background} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
${definition.focusCss ?? ""}
</style>`;
  const controlScript = `<script data-threeui-controls>
(function () {
  var controls = ${controlsJson};
  window.__SF_CONTROLS = controls;
  function applyVisual() {
    var opacity = controls.opacity == null ? 1 : controls.opacity;
    Array.prototype.forEach.call(document.querySelectorAll('[data-threeui-role]'), function (element) {
      element.style.opacity = String(opacity);
    });
  }
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'threeui-controls') return;
    var next = event.data.controls || {};
    Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
    applyVisual();
  });
  window.__SF_APPLY_CONTROLS = applyVisual;
})();
</script>`;
  const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    if (window.__SF_APPLY_CONTROLS) window.__SF_APPLY_CONTROLS();
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener("load", isolate, { once: true });
})();
</script>`;
  return patchedSource
    .replace(/<head([^>]*)>/i, `<head$1>${controlScript}${focusStyle}`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
}

export default function ParticleDrift({
  mode,
  speed = PARTICLE_DRIFT_DEFAULTS.speed,
  size = PARTICLE_DRIFT_DEFAULTS.size,
  gap = PARTICLE_DRIFT_DEFAULTS.gap,
  length = PARTICLE_DRIFT_DEFAULTS.length,
  density = PARTICLE_DRIFT_DEFAULTS.density,
  strokeWidth = PARTICLE_DRIFT_DEFAULTS.strokeWidth,
  opacity = PARTICLE_DRIFT_DEFAULTS.opacity,
  hue = PARTICLE_DRIFT_DEFAULTS.hue,
  saturation = PARTICLE_DRIFT_DEFAULTS.saturation,
  brightness = PARTICLE_DRIFT_DEFAULTS.brightness,
  transparent = false,
  followPointer = false,
  beams = true,
  className,
  style,
}: ParticleDriftProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const requestedMode = mode ?? PARTICLE_DRIFT_DEFINITION.defaultMode ?? PARTICLE_DRIFT_DEFAULTS.mode;
  const automaticMode = useAutomaticMode(requestedMode === "auto");
  const resolvedMode =
    requestedMode === "auto" ? automaticMode : resolveMode(requestedMode, PARTICLE_DRIFT_DEFAULTS.mode);
  const background = transparent
    ? "transparent"
    : resolveBackground(PARTICLE_DRIFT_DEFINITION.background, resolvedMode);
  const safeSpeed = clamp(speed, 0, 3);
  const safeSize = clamp(size, 0.05, 200);
  const safeGap = clamp(gap, 0, 64);
  const safeLength = clamp(length, 0.35, 2.5);
  const safeDensity = clamp(density, 0.25, 2.5);
  const safeStrokeWidth = clamp(strokeWidth, 0.25, 8);
  const safeOpacity = clamp(opacity, 0.05, 1);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);

  // Rebuild when baked geometry/mode knobs change. Speed and opacity stay live
  // through postMessage.
  const source = useMemo(
    () =>
      buildFocusedDocument(PARTICLE_DRIFT_DEFINITION, {
        mode: resolvedMode,
        speed: PARTICLE_DRIFT_DEFAULTS.speed,
        size: safeSize,
        gap: safeGap,
        length: safeLength,
        density: safeDensity,
        strokeWidth: safeStrokeWidth,
        opacity: PARTICLE_DRIFT_DEFAULTS.opacity,
        transparent,
        beams,
      }),
    [beams, resolvedMode, safeDensity, safeGap, safeLength, safeSize, safeStrokeWidth, transparent],
  );

  useEffect(() => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;
    frame.postMessage(
      {
        type: "threeui-controls",
        controls: {
          mode: resolvedMode,
          speed: safeSpeed,
          size: safeSize,
          gap: safeGap,
          length: safeLength,
          density: safeDensity,
          strokeWidth: safeStrokeWidth,
          opacity: safeOpacity,
        },
      },
      "*",
    );
  }, [
    resolvedMode,
    safeDensity,
    safeGap,
    safeLength,
    safeOpacity,
    safeSize,
    safeSpeed,
    safeStrokeWidth,
    source,
  ]);

  useEffect(() => {
    if (!followPointer) return;
    const frame = iframeRef.current;
    if (!frame) return;
    const onMove = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect();
      // After isolation the canvas is fixed to the frame's full size, so the
      // frame's own box is the canvas's box.
      frame.contentWindow?.postMessage(
        { type: "threeui-pointer", x: e.clientX - r.left, y: e.clientY - r.top },
        "*",
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [followPointer]);

  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      ref={iframeRef}
      className={className}
      title={PARTICLE_DRIFT_DEFINITION.title}
      srcDoc={source}
      sandbox="allow-scripts"
      loading="eager"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background,
        filter,
        ...style,
      }}
    />
  );
}
