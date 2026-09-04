"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/** Monthly scope: what is in the bundle, and what sits outside it.
 *
 *  A MEMBERSHIP TEST, NOT TWO PANELS. An earlier version set this as two
 *  mirrored panels, included on one side and excluded on the other, which read
 *  as a split. The document's own logic is membership: an ongoing scope
 *  includes these six things, and does not include these four "unless these are
 *  added separately". So the six sit inside one bounded bundle and the four sit
 *  outside it, each tethered by a dashed "add separately" line that shows the
 *  boundary can be crossed but only on purpose. Inclusion is a place, not a
 *  column.
 *
 *  THE TWO SCOPES ARE A MODE, NOT A CONFIGURATOR. The copy says the work "can
 *  be scoped as a one-off project or a monthly service", so both are shown as
 *  modes at the head. Selecting one is emphasis only; it changes nothing about
 *  what is included, because the document does not say the two differ in
 *  content, only in cadence. The number of finished assets, the copy is clear,
 *  is agreed before production, so no count is drawn.
 *
 *  Every word is the document's own: the six inclusions, the four exclusions,
 *  and the exclusion sentence verbatim beneath. */
export function ScopeManifest({
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
  const [mode, setMode] = useState(1); // default to the monthly service

  return (
    <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
      {/* --------------------------------------------------------- the words -- */}
      <div>
        <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-fog">{lead}</p>

        {/* The two modes. Emphasis only. */}
        <div
          role="group"
          aria-label="Scope"
          className="mt-8 inline-flex rounded-full border border-line bg-ink-2 p-1"
        >
          {options.map((o, i) => (
            <button
              key={o}
              type="button"
              aria-pressed={mode === i}
              onClick={() => setMode(i)}
              className={cn(
                "font-display rounded-full px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.08em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none",
                mode === i ? "bg-brand text-white" : "text-ash hover:text-brand-text",
              )}
            >
              {o}
            </button>
          ))}
        </div>

        <p className="mt-10 max-w-[52ch] border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-ash">
          {exclusion}
        </p>
      </div>

      {/* -------------------------------------------------------- the bundle -- */}
      <div className="relative">
        {/* INCLUDED: the bounded bundle. */}
        <div className="rounded-[1.25rem] border border-brand/45 bg-brand/[0.05] p-5 sm:p-7">
          <p className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-brand-text">
            {includedLabel}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {included.map((it) => (
              <li
                key={it}
                className="font-display inline-flex items-center gap-2 rounded-lg border border-brand/40 bg-ink-3 px-3 py-2 text-[0.8125rem] font-bold uppercase tracking-[0.02em] text-snow"
              >
                <span aria-hidden className="text-brand-text">+</span>
                {it}
              </li>
            ))}
          </ul>
        </div>

        {/* The tethers: the boundary can be crossed, on purpose. */}
        <div aria-hidden className="flex items-stretch justify-center gap-2 py-1">
          <span className="font-display self-center px-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ash">
            add separately
          </span>
        </div>
        <div aria-hidden className="mx-8 h-4 border-l border-dashed border-ash/45" style={{ marginLeft: "auto", marginRight: "auto", width: 0 }} />

        {/* NOT INCLUDED: outside the bundle. */}
        <div className="rounded-[1.25rem] border border-dashed border-line p-5 sm:p-7">
          <p className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ash">
            {excludedLabel}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {excluded.map((it) => (
              <li
                key={it}
                className="font-display inline-flex items-center gap-2 rounded-lg border border-line bg-transparent px-3 py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.02em] text-ash"
              >
                <span aria-hidden className="text-ash/70">×</span>
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
