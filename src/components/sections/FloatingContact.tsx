"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { brand } from "@/lib/content";

/** Consolidated floating contact: WhatsApp, call and email (live-site widgets, unified). */
export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[75] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-64 overflow-hidden rounded-2xl border border-line bg-ink-2 p-2 shadow-2xl"
          >
            <div className="px-3 pb-2 pt-1.5">
              <p className="font-display text-sm font-bold text-snow">ENH Assistant</p>
              <p className="flex items-center gap-1.5 text-xs text-fog">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Online · Instant replies
              </p>
            </div>
            <a
              href={`https://wa.me/${brand.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-snow transition-colors hover:bg-ink-3"
            >
              <span className="h-2 w-2 rounded-full bg-green-500" /> WhatsApp us
            </a>
            <a
              href={`tel:${brand.phoneHref}`}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-snow transition-colors hover:bg-ink-3"
            >
              <span className="h-2 w-2 rounded-full bg-brand" /> Call {brand.phone}
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-snow transition-colors hover:bg-ink-3"
            >
              <span className="h-2 w-2 rounded-full bg-fog" /> Email us
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label="Contact ENH"
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.92 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_12px_34px_-8px_rgba(232,0,13,0.7)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="c"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.5 2 2 6 2 11c0 2 .8 3.8 2.1 5.2L3 22l6-1.6c1 .3 2 .5 3 .5 5.5 0 10-4 10-9S17.5 2 12 2Z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
