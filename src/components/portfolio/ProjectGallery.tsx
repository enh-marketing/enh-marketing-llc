"use client";

import { useRef, useState } from "react";
import { ProjectMedia } from "@/components/portfolio/ProjectMedia";
import { ImageViewer } from "@/components/portfolio/ImageViewer";
import { canOpen, project as copy, type Figure } from "@/content/portfolio";
import { cn } from "@/lib/cn";

/** THE ARTWORK PUBLISHED ON A PROJECT'S PAGE.
 *
 *  FIVE ACROSS, NOT THREE, and the files decided it. Thirteen of the
 *  forty-nine artwork files are 219px square upstream — that is the whole
 *  file, not a thumbnail of one. At three across on this measure a tile is
 *  390px and those thirteen would be upscaled by nearly eighty percent; at five
 *  across a tile is about 230px, which is roughly their intrinsic width, so
 *  every tile in the grid is shown at or under the size its file actually has.
 *
 *  WHICH IS ALSO WHY ONLY SOME OF THEM OPEN. `canOpen` gates the viewer on the
 *  file being materially larger than the tile. A 1080px creative carries type
 *  that is unreadable at 230px and is worth opening; a 219px one is already
 *  being shown at full size and has nothing behind it, and this site's rule is
 *  that a hover state on something you cannot act on is a lie. So those are set
 *  as plain figures, with no cue and no cursor change.
 *
 *  THE GRID IS SQUARE because the artwork is: every one of these files is 1:1
 *  or within a pixel of it. The frame is stated rather than read off the file
 *  so a future export at another ratio does not break the row. */
export function ProjectGallery({ figures }: { figures: Figure[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const current = open === null ? null : figures[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {figures.map((figure, i) => {
          const openable = canOpen(figure);
          const picture = (
            <ProjectMedia
              figure={figure}
              slot="tile"
              className={cn(
                "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                openable && "group-hover:scale-105",
              )}
            />
          );

          return (
            <li key={figure.src}>
              {openable ? (
                <button
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`${copy.galleryHint}: ${figure.alt}`}
                  className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-ink-2 transition-colors duration-500 hover:border-brand/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none"
                >
                  {picture}
                  <span
                    aria-hidden
                    className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-void/80 text-snow opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M10.5 10.5L14 14M7 5v4M5 7h4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
              ) : (
                <div className="relative block aspect-square w-full overflow-hidden rounded-xl border border-line bg-ink-2">
                  {picture}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {current && (
        <ImageViewer
          figure={current}
          open
          onClose={() => setOpen(null)}
          returnFocusTo={() => (open === null ? null : (triggers.current[open] ?? null))}
        />
      )}
    </>
  );
}
