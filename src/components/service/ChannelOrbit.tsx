"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChannelIcon } from "@/components/service/ChannelIcon";

/** Hero visual: six channels orbiting one budget. Relevant to the page without
 *  asserting anything, so no figure is implied. Labels and marks are the
 *  channels from the page's own content. */
export function ChannelOrbit({ channels }: { channels: string[] }) {
  const reduced = useReducedMotion();
  const R = 196;
  const BOX = 560;
  const SPIN = 52;

  return (
    <div
      className="pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden -translate-y-1/2 items-center justify-center lg:flex"
      style={{ width: BOX, height: BOX }}
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(232,0,13,0.16), transparent 64%)",
        }}
      />

      {/* Emanating rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-brand/25"
          style={{ width: R * 2, height: R * 2 }}
          initial={{ scale: 0.66, opacity: 0 }}
          animate={reduced ? { scale: 1, opacity: 0.25 } : { scale: [0.66, 1.14], opacity: [0.5, 0] }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 5.4, repeat: Infinity, ease: "easeOut", delay: i * 1.8 }
          }
        />
      ))}

      {/* Orbit path */}
      <span
        className="absolute rounded-full border border-line/70"
        style={{ width: R * 2, height: R * 2 }}
      />
      <span
        className="absolute rounded-full border border-line/40"
        style={{ width: R * 1.34, height: R * 1.34 }}
      />

      {/* Nodes */}
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={reduced ? { rotate: 0 } : { rotate: 360 }}
        transition={reduced ? { duration: 0 } : { duration: SPIN, repeat: Infinity, ease: "linear" }}
      >
        {channels.map((name, i) => {
          const angle = (i / channels.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * R;
          const y = Math.sin(angle) * R;
          return (
            // Placement and counter-rotation stay on separate elements: motion
            // writes `rotate` into transform and would clobber the translate.
            <div
              key={name}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
            >
              <motion.div
                className="flex flex-col items-center gap-2.5"
                initial={{ rotate: 0 }}
                animate={reduced ? { rotate: 0 } : { rotate: -360 }}
                transition={
                  reduced ? { duration: 0 } : { duration: SPIN, repeat: Infinity, ease: "linear" }
                }
              >
                <motion.span
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-void text-fog"
                  animate={
                    reduced
                      ? {}
                      : { borderColor: ["#262626", "#e8000d", "#262626"], color: ["#9c9c97", "#f7f7f5", "#9c9c97"] }
                  }
                  transition={{
                    duration: SPIN / channels.length,
                    repeat: Infinity,
                    delay: (i * SPIN) / channels.length,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }}
                >
                  <ChannelIcon name={name} size={18} />
                </motion.span>
                <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-ash">
                  {name.replace(" Ads", "")}
                </span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Core */}
      <motion.span
        className="relative flex h-20 w-20 items-center justify-center rounded-full border border-brand/60 bg-void"
        animate={
          reduced
            ? {}
            : { boxShadow: ["0 0 0 0 rgba(232,0,13,0.32)", "0 0 0 26px rgba(232,0,13,0)"] }
        }
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut" }}
      >
        <motion.span
          className="h-2.5 w-2.5 rounded-full bg-brand"
          animate={reduced ? {} : { scale: [1, 1.35, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.span>
    </div>
  );
}
