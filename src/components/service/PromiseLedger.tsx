"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import { Modal } from "@/components/ui/Modal";
import { LeadForm, type FormField } from "@/components/service/LeadForm";
import { ArrowRight } from "@/components/ui/Button";

/** What is promised, set against what is not, resolving into the ask.
 *
 *  WHY THE REFUSALS COME FIRST AND KEEP EQUAL WEIGHT. A page that has spent its
 *  length saying which parts of this service do nothing cannot end by quietly
 *  shrinking the disclaimer. The refusals are on the left where reading starts,
 *  in a column the same width as the promises. The section is the page's
 *  credibility and the layout has to behave like it.
 *
 *  WHY THREE COLUMNS NOW. Two columns and a stacked footer measured 932px for
 *  370 characters — 0.40 characters per pixel, the emptiest section on the
 *  page, and the emptiness was reading as hesitancy rather than as poise. The
 *  method line and the call to action were the stacked footer; folded into a
 *  third column they turn the ledger into an argument that resolves: here is
 *  what we refuse, here is what we deliver, here is how you start.
 *
 *  NO STRIKETHROUGH. The obvious treatment is to cross out the left column, but
 *  these are not retracted claims — they are things the agency declines to
 *  promise, which reads as strength, not error. Markers carry the distinction,
 *  and each list keeps its own icon so it never rests on colour alone.
 *
 *  Held on ink-3, the tone the page reserves for its most declarative moments. */
export function PromiseLedger({
  id,
  label,
  index,
  title,
  strokeTitle,
  willNotLabel,
  willNot,
  willLabel,
  will,
  method,
  cta,
  formTitle,
  formFields,
  formSubmitLabel,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  willNotLabel: string;
  willNot: string[];
  willLabel: string;
  will: string[];
  method: string;
  cta: string;
  formTitle: string;
  formFields: FormField[];
  formSubmitLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section
      id={id}
      data-section={label}
      className="relative overflow-x-clip py-14 sm:py-16"
    >
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "contrast", label: "What we refuse, what we deliver" }}
          className="mb-14"
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <Column label={willNotLabel} items={willNot} tone="deny" />
          <Column label={willLabel} items={will} tone="affirm" delay={0.06} />

          {/* The third column is what the first two are for. */}
          <Rise delay={0.12}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-brand/35 bg-brand/[0.06] p-7 sm:p-8">
              <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-brand" />
              <div>
                <p className="text-xs font-semibold uppercase text-brand-text">
                  How it is measured
                </p>
                <p className="mt-6 leading-relaxed text-snow">{method}</p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group mt-9 inline-flex items-center justify-center gap-3 self-start rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
              >
                {cta}
                <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                  <ArrowRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5" />
                  <ArrowRight className="absolute -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </span>
              </button>
            </div>
          </Rise>
        </div>
      </Container>

      <Modal open={open} onClose={() => setOpen(false)} title={formTitle}>
        <LeadForm fields={formFields} submitLabel={formSubmitLabel} />
      </Modal>
    </section>
  );
}

function Column({
  label,
  items,
  tone,
  delay = 0,
}: {
  label: string;
  items: string[];
  tone: "deny" | "affirm";
  delay?: number;
}) {
  const affirm = tone === "affirm";
  return (
    <Rise delay={delay}>
      <div
        className={cn(
          "h-full rounded-2xl border p-7 sm:p-8",
          affirm ? "border-line bg-ink-2" : "border-line bg-ink-2/50",
        )}
      >
        <p
          className={cn(
            "text-xs font-semibold uppercase",
            affirm ? "text-brand-text" : "text-ash",
          )}
        >
          {label}
        </p>

        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li key={item} className="flex gap-3.5">
              <span
                aria-hidden
                className={cn(
                  "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                  affirm ? "border-brand/60 bg-brand/10" : "border-line bg-ink-3",
                )}
              >
                {affirm ? (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M20 6 9 17l-5-5"
                      stroke="var(--color-brand-text)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M18 6 6 18M6 6l12 12"
                      stroke="var(--color-ash)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className={cn(
                  "font-display text-base font-bold leading-snug sm:text-lg",
                  affirm ? "text-snow" : "text-fog",
                )}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Rise>
  );
}
