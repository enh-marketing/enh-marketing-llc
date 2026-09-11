"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** DARK IS THE SITE'S DEFAULT, so the toggle starts true and tracks the opt-out
 *  state: light. It still syncs on mount, because the class is settled by the
 *  pre-hydration script in the layout and is not knowable during render -- but
 *  the initial value has to match the common case, or the first paint shows a
 *  sun on a dark page and swaps to a moon a moment later. */
export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      // Both values are written, so a reader who picks light is not handed
      // dark again the moment the default changes.
      localStorage.setItem("enh-theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-snow transition-colors duration-300 hover:border-brand"
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.svg
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
