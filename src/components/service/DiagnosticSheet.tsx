"use client";

import { Rise } from "@/components/fx/Reveal";
import { DiagnosticMap } from "@/components/service/DiagnosticMap";

/** The paid diagnostic.
 *
 *  The document lists ten things the diagnostic covers, as one run under "It
 *  covers:". An earlier version of this component split them into three groups
 *  and gave the middle pair the section's centrepiece treatment, because
 *  "Processes that are suitable for automation" sitting next to "Processes that
 *  should remain manual" is an automation agency reporting what it will not
 *  automate, which is real. But the split read as three separate sections and
 *  the last five looked like a continuation of the first five, so it is gone:
 *  TEAM COMMENT, 2026-09-08. The ten are one list, which is what the source
 *  says, and the drawing beside them carries a read for each.
 *
 *  either way. That sentence leads, and the free/paid split behind it is set as
 *  the two-line ledger it actually is rather than a third paragraph. */

/** Splits the terms into the promise and the two lines that qualify it.
 *  Returns null if the copy is rewritten into a different shape, in which case
 *  the caller prints it whole. */
function splitTerms(terms: string) {
  const parts = terms.split(/(?<=\.)\s+(?=[A-Z])/);
  if (parts.length < 3) return null;
  return { promise: parts[0], free: parts[1], paid: parts.slice(2).join(" ") };
}

export function DiagnosticSheet({
  lead,
  coversLead,
  observe,
  terms,
}: {
  lead: string;
  coversLead: string;
  observe: string[];
  terms: string;
}) {
  const t = splitTerms(terms);
  return (
    <div>
      <Rise>
        <p className="font-display max-w-3xl text-[clamp(1.15rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.18] text-snow">
          {lead}
        </p>
      </Rise>

      {/* The ten checks are ten reads on one process, not a feature list, so
          they annotate a drawing of it rather than stacking as rows. See
          DiagnosticMap. */}
      <DiagnosticMap coversLead={coversLead} observe={observe} />

      {/* The commitment, then the split behind it. */}
      <Rise delay={0.26} className="mt-11 border-t border-line pt-9">
        {t ? (
          <div className="grid gap-x-14 gap-y-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
            <p className="font-display text-[clamp(1.2rem,2.6vw,2rem)] font-extrabold uppercase leading-[1.14] text-snow">
              {t.promise}
            </p>
            <dl>
              {[
                { k: "Free", v: t.free, accent: false },
                { k: "Paid", v: t.paid, accent: true },
              ].map((row) => (
                <div key={row.k} className="flex items-baseline gap-5 border-t border-line py-4 first:border-t-0 first:pt-0">
                  <dt
                    className={
                      "font-display w-14 shrink-0 text-[0.62rem] font-semibold uppercase" +
                      (row.accent ? "text-brand-text" : "text-ash")
                    }
                  >
                    {row.k}
                  </dt>
                  <dd className="leading-relaxed text-fog">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">{terms}</p>
        )}
      </Rise>
    </div>
  );
}
