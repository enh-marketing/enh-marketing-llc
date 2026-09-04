"use client";

import { Rise } from "@/components/fx/Reveal";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";

/** Ongoing support, drawn as the rhythm it runs on.
 *
 *  The document frames this section by time: the inputs "change regularly",
 *  the first duty is "each month", and the closing line scopes "the monthly
 *  scope". So the board carries a month strip across its top, twelve ticks
 *  with one lit, and the lit one advances on a loop: the duties beneath are
 *  what happens at each tick. Nine duties is a three-by-three, which is how a
 *  rota is laid out, and each carries the site's glyph for what it does. No
 *  duty is invented and none is emphasised over another; the document lists
 *  them flat and so does this. */
export function MonthlyBoard({
  lead,
  items,
  scope,
}: {
  lead: string;
  items: { text: string; glyph: GlyphVariant }[];
  scope: string;
}) {
  const months = Array.from({ length: 12 });
  return (
    <div>
      <Rise>
        <p className="font-display max-w-3xl text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.18] text-snow">
          {lead}
        </p>
      </Rise>

      <Rise delay={0.1} className="mt-10">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-ink-2">
          {/* The month strip. */}
          <div aria-hidden className="flex items-center gap-4 border-b border-line px-7 py-4 sm:px-8">
            <span className="font-display shrink-0 text-[0.6875rem] font-semibold uppercase text-brand-text">Each month</span>
            <div className="flex flex-1 items-center justify-between">
              {months.map((_, i) => (
                <span key={i} className="relative flex h-3 w-3 items-center justify-center" {...(i === 0 ? { "data-first-tick": "" } : {})}>
                  <span className="absolute inset-0 rounded-full border border-line" />
                  <span
                    className="absolute inset-0 rounded-full bg-brand ci-blink"
                    style={{ animationDelay: `${i * 500}ms`, animationDuration: "6s" }}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* The duties. */}
          <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {items.map((d, i) => (
              <li key={d.text} className="group flex items-start gap-5 bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 sm:p-7">
                <span className="mt-0.5 h-9 w-9 shrink-0 text-ash transition-colors duration-500 group-hover:text-brand">
                  <CapabilityGlyph variant={d.glyph} />
                </span>
                <div>
                  <p className="font-display text-[0.6875rem] font-bold tabular-nums text-brand-text">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1.5 leading-snug text-snow">{d.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Rise>

      <Rise delay={0.15} className="mt-8">
        <p className="max-w-3xl border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">{scope}</p>
      </Rise>
    </div>
  );
}
