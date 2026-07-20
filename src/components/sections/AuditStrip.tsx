"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { Radar } from "@/components/fx/Adornments";

/** Live site's mid-page free-audit email capture, reimagined as a band. */
export function AuditStrip() {
  const [done, setDone] = useState(false);

  return (
    <section className="relative overflow-hidden border-y border-line bg-brand">
      <Container className="grid items-center gap-8 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <Rise>
          <div className="flex items-center gap-6">
            <Radar className="hidden shrink-0 sm:block" />
            <h2 className="font-display display-lg font-extrabold uppercase text-white">
              Get your free digital
              <br />
              marketing audit
            </h2>
          </div>
        </Rise>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.p
              key="ok"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-lg font-bold text-white"
            >
              Thank you! Your submission has been received.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              exit={{ opacity: 0, y: -12 }}
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="flex w-full flex-col gap-3"
            >
              <div className="flex w-full overflow-hidden rounded-full border border-white/40 bg-white/10 backdrop-blur">
                <input
                  type="email"
                  required
                  aria-label="Work email"
                  placeholder="you@company.com"
                  className="w-full bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-white px-7 text-sm font-semibold text-brand transition-colors hover:bg-snow"
                >
                  Submit
                </button>
              </div>
              <label className="flex items-center gap-2 text-xs text-white/80">
                <input type="checkbox" required className="accent-white" />
                I agree with the terms of the Privacy Policy — your information is 100%
                secure and confidential.
              </label>
            </motion.form>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
