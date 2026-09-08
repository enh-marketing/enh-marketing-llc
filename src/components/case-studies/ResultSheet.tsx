"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { study as copy, type Figure } from "@/content/case-studies";

/** THE RESULTS SHEET, AND THE ONLY REASON IT NEEDS A VIEWER.
 *
 *  Twenty-one of the twenty-two studies publish a one-page graphic summarising
 *  their campaign, and every one of them carries twenty-odd figures set in
 *  type that is roughly nine pixels tall once the image is scaled to the
 *  1240px measure. Printed at that size it is a texture rather than a
 *  document, and this site's floor is eleven pixels for anything a reader is
 *  meant to read.
 *
 *  So the sheet is shown at the measure AND is openable at its full 2000px
 *  width. That is the whole feature: no gallery, no carousel, no zoom-and-pan.
 *  The viewer is a plain overlay because it has one job.
 *
 *  WHY NOT THE SHARED Modal. That component is a dialog for forms and caps its
 *  panel at 42rem, which is narrower than the thing this has to show.
 *
 *  ACCESSIBILITY IS THE SAME CONTRACT Modal HONOURS: the overlay is a dialog,
 *  focus moves into it and returns to the trigger, Escape closes it, and the
 *  page behind cannot scroll while it is open. */
export function ResultSheet({ sheet, client }: { sheet: Figure; client: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    // Captured now rather than read in the cleanup: by the time the cleanup
    // runs the ref may point somewhere else, and returning focus to the wrong
    // element is worse than not returning it.
    const opener = trigger.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => panel.current?.focus(), 40);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
      root.style.overflow = previous;
      opener?.focus();
    };
  }, [open]);

  return (
    <figure className="mt-12">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${copy.sheetHint}: ${sheet.alt}`}
        className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-ink-3 transition-colors duration-500 hover:border-brand/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none"
      >
        <img
          src={sheet.src}
          alt={sheet.alt}
          width={sheet.w}
          height={sheet.h}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 1240px, 92vw"
          className="block h-auto w-full"
        />
        <span
          aria-hidden
          className="absolute bottom-4 right-4 inline-flex items-center gap-2.5 rounded-full border border-line bg-void/85 px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-snow backdrop-blur-sm transition-colors duration-300 group-hover:border-brand group-hover:text-brand"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14M7 5v4M5 7h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {copy.sheetHint}
        </span>
      </button>

      <figcaption className="mt-4 text-sm leading-relaxed text-ash">
        {copy.sheetLabel}, as published for {client}.
      </figcaption>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-8">
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-zoom-out bg-void/92 backdrop-blur-md"
            />
            <div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-label={sheet.alt}
              tabIndex={-1}
              data-lenis-prevent
              className="relative max-h-full w-full max-w-[92rem] overflow-auto outline-none"
            >
              <img
                src={sheet.full ?? sheet.src}
                alt={sheet.alt}
                width={sheet.w}
                height={sheet.h}
                className="mx-auto block h-auto w-full rounded-xl"
              />
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-void/80 text-snow backdrop-blur-sm transition-colors duration-300 hover:border-brand hover:text-brand sm:right-8 sm:top-8"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>,
          document.body,
        )}
    </figure>
  );
}
