"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Figure } from "@/content/portfolio";

/** THE FULL-SIZE VIEWER, for a picture the page shows smaller than it is.
 *
 *  IT IS `ResultSheet`'S OVERLAY, LIFTED OUT OF IT. That component pairs one
 *  trigger with one dialog because a case study has exactly one sheet; this
 *  section opens two different things — an artwork tile out of a grid of five,
 *  and a website screenshot — so the dialog is its own component and the
 *  callers own the trigger. The contract is unchanged and it is the one `Modal`
 *  honours: the overlay is a dialog, focus moves into it and returns to
 *  whatever opened it, Escape closes it, and the page behind cannot scroll
 *  while it is open.
 *
 *  WHY NOT THE SHARED `Modal`. That component is a dialog for forms and caps
 *  its panel at 42rem, which is narrower than the things this has to show.
 *
 *  `data-lenis-prevent` ON THE PANEL, so a tall screenshot scrolls inside the
 *  overlay instead of moving the page underneath it. */
export function ImageViewer({
  figure,
  open,
  onClose,
  returnFocusTo,
  children,
}: {
  figure: Figure;
  open: boolean;
  onClose: () => void;
  /** Where focus goes when it closes, as a getter rather than an element.
   *
   *  IT IS A FUNCTION FOR TWO REASONS. The caller holds the trigger in a ref,
   *  and a ref may not be read during render — the one in a grid is read by
   *  index, and which index is only known once something has been clicked. And
   *  it has to be resolved ON OPEN rather than in the cleanup: by the time the
   *  cleanup runs the caller's ref may point somewhere else, and returning
   *  focus to the wrong element is worse than not returning it. */
  returnFocusTo?: () => HTMLElement | null;
  /** An optional caption inside the overlay, under the picture. */
  children?: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const opener = returnFocusTo?.() ?? null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => panel.current?.focus(), 40);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
      root.style.overflow = previous;
      opener?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-zoom-out bg-void/92 backdrop-blur-md"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={figure.alt}
        tabIndex={-1}
        data-lenis-prevent
        className="relative max-h-full w-full max-w-[92rem] overflow-auto outline-none"
      >
        <img
          src={figure.src}
          alt={figure.alt}
          width={figure.w}
          height={figure.h}
          /* Capped at the file's own width. A 1080px artwork opened on a 1600px
             screen is shown at 1080px rather than stretched to fill, because
             upscaling it would present detail the file does not have. */
          style={{ maxWidth: `min(100%, ${figure.w}px)` }}
          className="mx-auto block h-auto w-full rounded-xl"
        />
        {children}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-void/80 text-snow backdrop-blur-sm transition-colors duration-300 hover:border-brand hover:text-brand sm:right-8 sm:top-8"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>,
    document.body,
  );
}
