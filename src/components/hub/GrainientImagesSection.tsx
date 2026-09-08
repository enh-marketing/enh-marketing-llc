/* eslint-disable react-hooks/set-state-in-effect --
 * Its layout effect sets a `ready` flag to mark that it is on the client. That
 * is a setState in an effect and our rule objects, but it is the file's own
 * design and not ours to change: editing an import to satisfy a linter is how
 * it quietly becomes a fork. It costs one extra render at mount and nothing
 * afterwards, and on the locked path this page uses, the effect returns before
 * `ready` is ever read. BlackHoleHeroSection carries the same kind of block for
 * the same reason.
 */

/* IMPORTED FROM 21ST.DEV, UNCHANGED.
 *
 * @httpsdesign-layercomja/grainient-images-section, kept exactly as delivered.
 * Both dependency lists are empty and its only import is `motion/react`, which
 * this project already has, so nothing was added and nothing was rewritten.
 *
 * WHY IT SUITS A SCROLL-DRIVEN PAGE. It reads scroll rather than capturing it,
 * so unlike the airlock it does not fight the machine for the wheel. And it
 * already has the escape hatch a chapter needs: pass `forceProgress` and it
 * stops measuring anything, drops its own 250vh track, becomes a plain 100vh
 * stage and takes its progress from outside. That is exactly the contract
 * hub/Journey.tsx offers, so it can be a chapter rather than a section bolted
 * on beside one. See hub/chapters/Creative.tsx.
 *
 * WHAT IS NOT KEPT is the demo artwork. Its default tiles are thirteen PNGs on
 * the author's own domain, 29.0 MB together and 2.2 MB each, measured. Tiles
 * are a prop, which is the whole reason this component was worth importing.
 */

"use client";

import * as React from "react";
import { useMotionValue } from "motion/react";

const ASSET = "https://design-layer.com/dev/grainient-images-section";
const IMAGE_ZOOM_VH = 150;
const TEXT_VIEWER_VH = 50;
const TRACK_VH = IMAGE_ZOOM_VH + TEXT_VIEWER_VH;
const IMAGE_PHASE = IMAGE_ZOOM_VH / TRACK_VH;
const ZOOM_BASE_Z = 500;

export type GrainientImageTile = {
  id: string;
  imageSrc: string;
  top: string;
  left?: string;
  right?: string;
  width: string;
  parallaxY: number;
  depth: number;
  aspectRatio: number;
  anchorYOnly?: boolean;
};

export type GrainientImagesSectionProps = {
  title?: string;
  titleLine2?: string;
  tiles?: GrainientImageTile[];
  forceProgress?: number;
  className?: string;
};

export const GRAINIENT_IMAGES_DEFAULT_TILES: GrainientImageTile[] = [
  { id: "01", imageSrc: `${ASSET}/image-01.png`, top: "34%", left: "7%", width: "14%", parallaxY: 50, depth: 300, aspectRatio: 0.981928 },
  { id: "03", imageSrc: `${ASSET}/image-03.png`, top: "27%", left: "21%", width: "11%", parallaxY: 20, depth: 150, aspectRatio: 1.25243 },
  { id: "02", imageSrc: `${ASSET}/image-02.png`, top: "14%", left: "40%", width: "13%", parallaxY: 120, depth: 500, aspectRatio: 1.07432 },
  { id: "04", imageSrc: `${ASSET}/image-04.png`, top: "24%", left: "62%", width: "10%", parallaxY: 20, depth: 100, aspectRatio: 0.889706 },
  { id: "05", imageSrc: `${ASSET}/image-05.png`, top: "17%", right: "50px", width: "12%", parallaxY: 70, depth: 450, aspectRatio: 1.43434, anchorYOnly: true },
  { id: "06", imageSrc: `${ASSET}/image-06.png`, top: "46%", left: "75%", width: "16%", parallaxY: 200, depth: 250, aspectRatio: 0.920188 },
  { id: "07", imageSrc: `${ASSET}/image-07.png`, top: "67%", left: "96%", width: "8%", parallaxY: 80, depth: 50, aspectRatio: 1.03226 },
  { id: "08", imageSrc: `${ASSET}/image-08.png`, top: "85%", left: "74%", width: "13%", parallaxY: 100, depth: 350, aspectRatio: 1.39815 },
  { id: "09", imageSrc: `${ASSET}/image-09.png`, top: "90%", left: "51%", width: "10%", parallaxY: 50, depth: 200, aspectRatio: 0.72619 },
  { id: "10", imageSrc: `${ASSET}/image-10.png`, top: "83%", left: "14%", width: "16%", parallaxY: 90, depth: 400, aspectRatio: 1.14724 },
  { id: "11", imageSrc: `${ASSET}/image-11.png`, top: "74%", left: "31%", width: "9%", parallaxY: 70, depth: 180, aspectRatio: 1.09574 },
  { id: "12", imageSrc: `${ASSET}/image-12.png`, top: "54%", left: "17%", width: "7%", parallaxY: 100, depth: 80, aspectRatio: 1.22857 },
  { id: "13", imageSrc: `${ASSET}/image-13.png`, top: "42%", left: "37%", width: "7%", parallaxY: 200, depth: 550, aspectRatio: 1.22857 },
];

const STYLE_CSS = `
    .grainient-images-section {
      background: #000;
      color: #f0f0f0;
      overflow: clip;
    }
    .grainient-images-stage {
      height: 100vh;
      width: 100%;
      position: sticky;
      top: 0;
      z-index: 1;
      overflow: visible;
      perspective: 1200px;
    }
    .grainient-images-zoom {
      position: absolute;
      inset: 0;
      transform-origin: 50% 50%;
      transform-style: preserve-3d;
      will-change: transform;
    }
    .grainient-images-title {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      max-width: 392px;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Rounded", "Segoe UI", Roboto, sans-serif;
      font-size: clamp(20px, 2.4vw, 34px);
      font-weight: 500;
      line-height: 1.2;
      color: #f0f0f0;
      pointer-events: none;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .grainient-images-tile-wrap {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: visible;
      transform-style: preserve-3d;
      transform: translate(-50%, -50%);
    }
    .grainient-images-tile-wrap--y-only {
      transform: translateY(-50%);
    }
    .grainient-images-tile {
      width: 100%;
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 5px;
      overflow: visible;
    }
    .grainient-images-tile img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: inherit;
    }
  `;

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function getScrollParent(el: HTMLElement): HTMLElement | Window {
  let node = el.parentElement;
  while (node) {
    const style = window.getComputedStyle(node);
    const oy = style.overflowY;
    const canScroll =
      (oy === "auto" || oy === "scroll" || oy === "overlay") &&
      node.scrollHeight > node.clientHeight + 1;
    if (canScroll) {
      if (node === document.documentElement || node === document.body) {
        return window;
      }
      return node;
    }
    node = node.parentElement;
  }
  return window;
}

function readScrollProgress(
  track: HTMLElement,
  scrollRoot: HTMLElement | Window,
): number {
  const useWindowScroll =
    !(scrollRoot instanceof HTMLElement) ||
    (typeof document !== "undefined" &&
      (scrollRoot === document.documentElement || scrollRoot === document.body));

  if (useWindowScroll) {
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const scrollable = track.offsetHeight - vh;
    if (scrollable <= 0) return 1;
    return clamp01(-rect.top / scrollable);
  }

  const rootRect = scrollRoot.getBoundingClientRect();
  const trackRect = track.getBoundingClientRect();
  const scrollable = track.offsetHeight - scrollRoot.clientHeight;
  if (scrollable <= 0) return 1;
  return clamp01((rootRect.top - trackRect.top) / scrollable);
}

function tilePositionStyle(tile: GrainientImageTile): React.CSSProperties {
  const base: React.CSSProperties = {
    top: tile.top,
    width: tile.width,
  };
  if (tile.left) base.left = tile.left;
  if (tile.right) base.right = tile.right;
  return base;
}

function outerTransform(
  tile: GrainientImageTile,
  enter: number,
  zoom: number,
): string {
  const dy = tile.parallaxY * (1 - enter);
  const tz = zoom * (ZOOM_BASE_Z + tile.depth);
  if (tile.anchorYOnly) {
    return `translateY(calc(-50% + ${dy}px)) translateZ(${tz}px)`;
  }
  return `translate(-50%, calc(-50% + ${dy}px)) translateZ(${tz}px)`;
}

export function GrainientImagesSection({
  title = "More than Gradients,",
  titleLine2 = "A complete Visual Engine",
  tiles = GRAINIENT_IMAGES_DEFAULT_TILES,
  forceProgress,
  className,
}: GrainientImagesSectionProps) {
  const [ready, setReady] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);
  const progress = useMotionValue(0);
  const enterProgress = useMotionValue(0);
  const [renderProgress, setRenderProgress] = React.useState(0);
  const [renderEnter, setRenderEnter] = React.useState(0);

  React.useLayoutEffect(() => {
    setReady(true);
  }, []);

  const locked = forceProgress != null && Number.isFinite(forceProgress);

  React.useEffect(() => {
    const un1 = progress.on("change", (v) => setRenderProgress(v));
    const un2 = enterProgress.on("change", (v) => setRenderEnter(v));
    return () => {
      un1();
      un2();
    };
  }, [progress, enterProgress]);

  React.useEffect(() => {
    if (locked) {
      progress.set(clamp01(forceProgress!));
      enterProgress.set(1);
      return;
    }
    if (!ready) return;

    const track = sectionRef.current;
    if (!track) return;

    const scrollRoot = getScrollParent(track);
    let raf = 0;

    const read = () => {
      const vh =
        scrollRoot instanceof HTMLElement
          ? scrollRoot.clientHeight
          : window.innerHeight || 1;
      const rect = track.getBoundingClientRect();
      const rootTop =
        scrollRoot instanceof HTMLElement
          ? scrollRoot.getBoundingClientRect().top
          : 0;
      enterProgress.set(clamp01((vh - (rect.top - rootTop)) / vh));
      if (track.offsetHeight <= vh + 2) return 0;
      return readScrollProgress(track, scrollRoot);
    };

    const apply = () => {
      progress.set(read());
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        apply();
      });
    };

    apply();

    if (scrollRoot instanceof HTMLElement) {
      scrollRoot.addEventListener("scroll", onScroll, { passive: true });
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onScroll, { passive: true });

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onScroll)
        : null;
    ro?.observe(track);

    return () => {
      if (scrollRoot instanceof HTMLElement) {
        scrollRoot.removeEventListener("scroll", onScroll);
      } else {
        window.removeEventListener("scroll", onScroll);
      }
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      ro?.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [forceProgress, locked, progress, enterProgress, ready]);

  const p = renderProgress;
  const zoomProgress = clamp01(p / IMAGE_PHASE);
  const textProgress = clamp01((p - IMAGE_PHASE) / (1 - IMAGE_PHASE));
  const zoomOpacity = 1 - clamp01((zoomProgress - 0.7) / 0.25);
  const titleOpacity = textProgress;
  const titleScale = 0.5 + 0.5 * textProgress;

  return (
    <section
      ref={sectionRef}
      className={cn("grainient-images-section relative w-full", className)}
      style={{ minHeight: locked ? "100vh" : `calc(100vh + ${TRACK_VH}vh)` }}
    >
      <style>{STYLE_CSS}</style>
      <div className="grainient-images-stage">
        <div className="grainient-images-zoom">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className={cn(
                "grainient-images-tile-wrap",
                tile.anchorYOnly && "grainient-images-tile-wrap--y-only",
              )}
              style={{
                ...tilePositionStyle(tile),
                transform: outerTransform(tile, renderEnter, zoomProgress),
                willChange: "transform",
              }}
            >
              <div
                className="grainient-images-tile"
                style={{
                  aspectRatio: tile.aspectRatio,
                  opacity: zoomOpacity,
                  visibility: zoomOpacity <= 0 ? "hidden" : "visible",
                }}
              >
                <img src={tile.imageSrc} alt="" loading="lazy" decoding="async" />
              </div>
            </div>
          ))}
        </div>

        <h2
          className="grainient-images-title"
          style={{
            opacity: titleOpacity,
            transform: `translate(-50%, -50%) scale(${titleScale})`,
            willChange: "transform, opacity",
          }}
        >
          {title}
          <br />
          {titleLine2}
        </h2>
      </div>

      {!locked && (
        <>
          <div aria-hidden style={{ height: `${IMAGE_ZOOM_VH}vh`, width: "100%" }} />
          <div aria-hidden style={{ height: `${TEXT_VIEWER_VH}vh`, width: "100%" }} />
        </>
      )}
    </section>
  );
}

export default GrainientImagesSection;
