"use client";

import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** Reporting, drawn as the join the document asks for.
 *
 *  THE LEAD IS AN INSTRUCTION. "Ecommerce SEO reporting should connect search
 *  performance with store performance." Two things and a join, and the sentence
 *  that follows is exactly two sentences long: one listing what is tracked on
 *  the search side, one listing what the store's analytics can then show. So the
 *  section is those two panels with the join drawn between them, and the lead
 *  sits on the seam because that is what it is about.
 *
 *  NO FIGURES, BECAUSE THERE ARE NONE. The document contains no measurements
 *  anywhere, so nothing here carries an axis, a value or a direction of travel.
 *  The marks in each panel are the things the sentence beside them names, drawn
 *  once each and never sized against one another.
 *
 *  THE BRAND SPLIT IS A FORK, NOT A TREND. "An increase driven mainly by people
 *  already searching for the store name tells a different story from growth in
 *  customers discovering products for the first time." That is a fork. Both
 *  branches are drawn the same weight on purpose: giving either one more would
 *  be a claim about a split this document never measures. The two terms are
 *  marked inside the sentence rather than lifted out as captions, so each stays
 *  attached to the clause that explains why it matters.
 *
 *  THE LIMIT CLOSES THE SECTION. Attribution has limits, and the sentence
 *  saying so sits under the join it qualifies rather than in a footnote. */

export function SearchToStore({
  lead,
  trackedSearch,
  trackedStore,
  brandSplit,
  brandTerms,
  limit,
}: {
  lead: string;
  /** The document's two sentences: the search side, then the store side. */
  trackedSearch: string;
  trackedStore: string;
  brandSplit: string;
  brandTerms: string[];
  limit: string;
}) {
  return (
    <div>
      {/* The instruction, before the two things it is about. */}
      <Rise>
        <p className="statement font-display mx-auto mb-12 max-w-3xl text-center font-extrabold uppercase leading-[1.14] text-snow">
          {lead}
        </p>
      </Rise>

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] lg:items-stretch lg:gap-0">
        {/* The search side. */}
        <Rise className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-3 px-6 py-7 sm:px-8">
            <svg
              viewBox="0 0 300 150"
              role="img"
              aria-label="A results page with one position marked, the page it leads to, and the categories behind it."
              className="w-full"
            >
              <rect x="8" y="8" width="150" height="134" rx="7" fill="none" className="stroke-line" strokeWidth="1.5" />
              <rect x="24" y="24" width="86" height="9" rx="4.5" className="fill-fog/30" />
              <rect x="24" y="46" width="118" height="7" rx="3.5" className="fill-brand" />
              <rect x="24" y="58" width="90" height="5" rx="2.5" className="fill-fog/25" />
              <rect x="24" y="80" width="104" height="7" rx="3.5" className="fill-fog/30" />
              <rect x="24" y="92" width="72" height="5" rx="2.5" className="fill-fog/18" />
              <rect x="24" y="114" width="96" height="7" rx="3.5" className="fill-fog/30" />
              <path d="M162 50h28m-8-6l8 6-8 6" fill="none" className="stroke-brand" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="196" y="14" width="96" height="122" rx="7" className="fill-brand/[0.08] stroke-brand" strokeWidth="1.5" />
              <rect x="210" y="30" width="52" height="8" rx="4" className="fill-brand" />
              <rect x="210" y="50" width="68" height="34" rx="4" className="fill-ash/25" />
              <rect x="210" y="94" width="30" height="26" rx="3" className="fill-ash/20" />
              <rect x="248" y="94" width="30" height="26" rx="3" className="fill-ash/20" />
            </svg>
            <p className="mt-7 leading-relaxed text-fog">{trackedSearch}</p>
          </div>
        </Rise>

        {/* The join, and the sentence that asks for it. */}
        <div className="relative flex items-center justify-center py-2 lg:py-0">
          <div aria-hidden className="absolute inset-0 hidden items-center justify-center lg:flex">
            <svg
              viewBox="0 0 112 220"
              preserveAspectRatio="none"
              className="h-full w-full text-brand/60 lg:block"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <path
                  key={i}
                  d={"M0 " + (30 + i * 40) + "H112"}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="6 7"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </div>
          <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-brand bg-ink-2">
            <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 text-brand" fill="none">
              <path d="M4 8h6a4 4 0 010 8H4M20 8h-6a4 4 0 000 8h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        {/* The store side. */}
        <Rise delay={0.08} className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-3 px-6 py-7 sm:px-8">
            <svg
              viewBox="0 0 300 150"
              role="img"
              aria-label="A basket, the orders behind it and the record they are written into."
              className="w-full"
            >
              <path d="M18 34h34l16 66h84l16-52H62" fill="none" className="stroke-brand" strokeWidth="1.9" strokeLinejoin="round" strokeLinecap="round" />
              <circle cx="80" cy="118" r="9" className="fill-brand" />
              <circle cx="140" cy="118" r="9" className="fill-brand/55" />
              <rect x="196" y="12" width="96" height="126" rx="7" fill="none" className="stroke-line" strokeWidth="1.5" />
              <rect x="210" y="28" width="46" height="8" rx="4" className="fill-brand" />
              {[0, 1, 2, 3].map((r) => (
                <g key={r}>
                  <rect x="210" y={50 + r * 20} width={r % 2 ? 34 : 44} height="6" rx="3" className="fill-fog/32" />
                  <rect x="252" y={50 + r * 20} width="26" height="6" rx="3" className="fill-fog/18" />
                </g>
              ))}
              <path d="M210 132h68" className="stroke-brand" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <p className="mt-7 leading-relaxed text-fog">{trackedStore}</p>
          </div>
        </Rise>
      </div>

      {/* The fork the document draws inside the search side. */}
      <div className="mt-14 grid gap-8 border-t border-line pt-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center lg:gap-14">
        <Rise>
          <svg
            viewBox="0 0 260 150"
            role="img"
            aria-label="One stem splitting into two branches of equal weight."
            className="w-full max-w-xs"
          >
            <path d="M14 75h74" fill="none" className="stroke-brand" strokeWidth="2" strokeLinecap="round" />
            <path d="M88 75c34 0 34-52 68-52h84" fill="none" className="stroke-brand" strokeWidth="2" strokeLinecap="round" />
            <path d="M88 75c34 0 34 52 68 52h84" fill="none" className="stroke-brand" strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="75" r="6" className="fill-brand" />
            <circle cx="244" cy="23" r="6" className="fill-brand" />
            <circle cx="244" cy="127" r="6" className="fill-brand" />
          </svg>
        </Rise>
        <Rise delay={0.08}>
          <p className="leading-relaxed text-snow sm:text-lg">
            <Marked text={brandSplit} mark={brandTerms} />
          </p>
        </Rise>
      </div>

      <Rise delay={0.14} className="mt-10">
        <p className="max-w-3xl border-l-2 border-brand pl-6 leading-relaxed text-fog">{limit}</p>
      </Rise>
    </div>
  );
}
