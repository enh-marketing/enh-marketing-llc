"use client";

import { Rise } from "@/components/fx/Reveal";

/** Monthly production: two ways to scope it, what an ongoing scope may hold,
 *  and what it never includes unless added.
 *
 *  The document's two paragraphs are a list and an exclusion, so they are set
 *  as one: the options as two pills, the inclusions as chips, the exclusions as
 *  struck chips. The struck chips are the useful part, since "does not include"
 *  is the sentence that stops a misunderstanding before it starts. */
export function ScopeCard({
  lead,
  exclusion,
  options,
  included,
  excluded,
  includedLabel,
  excludedLabel,
}: {
  lead: string;
  exclusion: string;
  options: string[];
  included: string[];
  excluded: string[];
  includedLabel: string;
  excludedLabel: string;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      <div>
        <Rise>
          <div className="flex flex-wrap gap-3">
            {options.map((o, i) => (
              <span key={o} className={`font-display rounded-full border px-4 py-2 text-sm font-semibold uppercase ${i === 1 ? "border-brand bg-brand/[0.06] text-brand-text" : "border-line text-snow"}`}>
                {o}
              </span>
            ))}
          </div>
        </Rise>
        <Rise delay={0.08} className="mt-6">
          <p className="max-w-2xl leading-relaxed text-snow sm:text-lg">{lead}</p>
        </Rise>
        <Rise delay={0.12} className="mt-6">
          <p className="font-display text-[0.6875rem] font-semibold uppercase text-ash">{includedLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {included.map((x) => (
              <li key={x} className="rounded-full border border-line bg-ink-3 px-3 py-1 text-sm text-snow">{x}</li>
            ))}
          </ul>
        </Rise>
      </div>
      <Rise delay={0.1}>
        <div className="h-full rounded-[1.5rem] border border-line bg-ink-2 p-7 sm:p-9">
          <p className="font-display text-[0.6875rem] font-semibold uppercase text-brand-text">{excludedLabel}</p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {excluded.map((x) => (
              <li key={x} className="flex items-center gap-3 rounded-full border border-dashed border-line px-4 py-2">
                <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
                <span className="font-display text-sm font-bold uppercase leading-none text-snow">{x}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 border-t border-line pt-6 leading-relaxed text-fog">{exclusion}</p>
        </div>
      </Rise>
    </div>
  );
}
