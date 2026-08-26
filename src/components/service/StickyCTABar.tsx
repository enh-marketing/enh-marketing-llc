"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";

/** Mobile-only. The hero CTAs scroll away and the next conversion point is
 *  thousands of pixels below, so bring one back once the hero clears. */
export function StickyCTABar() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 700));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[55] border-t border-line bg-void/95 py-3 pl-4 pr-[5.5rem] backdrop-blur-xl lg:hidden"
        >
          {/* WhatsApp is deliberately absent: FloatingContact already owns that
              affordance bottom-right, and the right padding clears its bubble. */}
          <Link
            href="#quote"
            className="block rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Request a quote
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
