"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The five things set up, in the order the source sentence lists them.
 *
 *  The document writes this as one sentence, but it is a sequence: campaign,
 *  then creative, then the reply flow, then routing, then tracking. Rendered as
 *  a flow it can be read at a glance and it pairs with the route diagram above
 *  it — that one shows what the customer travels, this one shows what gets
 *  built to receive them. Lighting the steps in order is the assembly. */
export function SetupFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
      {steps.map((step, i) => (
        <motion.li
          key={step}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
          className="group relative flex lg:pr-3"
        >
          <div className="flex w-full flex-col gap-3 rounded-2xl border border-line bg-ink-2 p-5 transition-colors duration-500 hover:border-brand/45">
            <span className="font-display text-xs font-bold tabular-nums text-brand-text">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm leading-relaxed text-fog">{step}</span>
          </div>

          {/* Connector: the sequence continuing, on wide screens only. */}
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute right-0 top-1/2 hidden h-px w-3 -translate-y-1/2 bg-line lg:block"
            />
          )}
        </motion.li>
      ))}
    </ol>
  );
}
