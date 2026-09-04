"use client";

import { Rise } from "@/components/fx/Reveal";

/** Marketing ROI, drawn as the two columns it is.
 *
 *  The document's first sentence is the whole method: "the marketing cost and
 *  the resulting business value ... measured over the same period". Two
 *  columns, one bracket. Cost on the left names what the document names
 *  (advertising spend, agency fees, production costs); value on the right
 *  likewise (sales, revenue, gross profit); and the bracket beneath both is the
 *  one period they must share. Beneath, the second paragraph's two business
 *  models, each with what it reports, in the document's words.
 *
 *  No figures, no ratio, no arrow claiming one is bigger. The section is about
 *  how the calculation is set up, not what it comes to. */

/** The ledger is set in HTML, not as SVG text.
 *
 *  Its labels are the document's own nouns, so they are content: a reader has
 *  to be able to read them at any width, and text inside a viewBox scales with
 *  the box (at 320 wide these rendered at 6.3px). Only the bracket that ties
 *  the two columns to one period is drawn, because that is a picture and not a
 *  word. */
function Column({ title, rows, brand }: { title: string; rows: string[]; brand?: boolean }) {
  return (
    <div className={`flex-1 rounded-xl border p-4 ${brand ? "border-brand/60 bg-brand/[0.04]" : "border-line bg-ink-3"}`}>
      <p className={`font-display text-[0.6875rem] font-semibold uppercase leading-none ${brand ? "text-brand-text" : "text-ash"}`}>{title}</p>
      <ul className="mt-4 space-y-3">
        {rows.map((r, i) => (
          <li key={r}>
            <span className="font-display block text-[0.8125rem] font-bold uppercase leading-tight text-snow">{r}</span>
            <span
              aria-hidden
              className={`mt-1.5 block h-px origin-left ${brand ? "bg-brand/70" : "bg-fog/50"} ci-grow-x`}
              style={{ animationDelay: `${i * 300 + (brand ? 900 : 0)}ms` }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Ledger({ costs, values, periodLabel }: { costs: string[]; values: string[]; periodLabel: string }) {
  return (
    <div>
      <div className="flex gap-3 sm:gap-4">
        <Column title="Marketing cost" rows={costs} />
        <Column title="Business value" rows={values} brand />
      </div>
      {/* Measured over the same period: one bracket under both columns. */}
      <svg viewBox="0 0 220 18" aria-hidden className="mt-1 block w-full text-brand" preserveAspectRatio="none">
        <path d="M2 2 v8 H218 v-8" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        <path d="M110 10 v6" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      </svg>
      <p className="font-display mt-2 text-center text-[0.6875rem] font-semibold uppercase leading-none text-brand-text">{periodLabel}</p>
    </div>
  );
}

export function RoiLedger({
  lead,
  body,
  costs,
  values,
  periodLabel,
  models,
  reportsLabel,
}: {
  lead: string;
  body: string;
  costs: string[];
  values: string[];
  periodLabel: string;
  models: { name: string; reports: string[] }[];
  /** The model cards' shared heading, from the document. */
  reportsLabel: string;
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
      <div>
        <Rise>
          <p className="max-w-2xl text-base leading-[1.8] text-snow sm:text-lg">{lead}</p>
        </Rise>
        <Rise delay={0.1} className="mt-8">
          <div className="relative overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative">
              <Ledger costs={costs} values={values} periodLabel={periodLabel} />
            </div>
          </div>
        </Rise>
      </div>
      <div>
        <Rise delay={0.05}>
          <p className="max-w-2xl text-base leading-[1.8] text-fog sm:text-lg">{body}</p>
        </Rise>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {models.map((m, i) => (
            <Rise key={m.name} delay={0.12 + i * 0.06}>
              <div className="group h-full rounded-[1.25rem] border border-line bg-ink-3 p-6 transition-colors duration-500 hover:border-ash/50 motion-reduce:transition-none">
                <p className="font-display text-[clamp(1rem,1.5vw,1.2rem)] font-extrabold uppercase leading-tight text-snow">{m.name}</p>
                <p className="font-display mt-4 text-[0.6875rem] font-semibold uppercase text-ash">{reportsLabel}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {m.reports.map((r) => (
                    <li key={r} className="rounded-full border border-brand/40 bg-brand/[0.05] px-3 py-1 text-sm text-snow transition-colors duration-500 hover:border-brand motion-reduce:transition-none">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </div>
  );
}
