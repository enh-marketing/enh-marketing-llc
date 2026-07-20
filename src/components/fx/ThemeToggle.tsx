"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("enh-theme", next ? "light" : "dark");
    } catch {}
  }

  return (
    <button
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggle}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-snow transition-colors duration-300 hover:border-brand"
    >
      <AnimatePresence mode="wait" initial={false}>
        {light ? (
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
