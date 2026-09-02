"use client";

import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { StartOption } from "@/content/services/linkedin-marketing";

/** Three routes, placed on the only timeline the document gives.
 *
 *  WHY NOT A TABLE, AND NOT CARDS. The section asks "which should you start
 *  with?", and the document answers it on one axis: time. Organic momentum
 *  "builds over 60 to 90 days"; ads produce "within the first week"; both is
 *  both. A grid of prose makes the reader extract that themselves. Putting the
 *  routes on a shared axis shows the actual difference — one starts almost
 *  immediately, one starts later and keeps going, and the recommended route is
 *  visibly the union of the two.
 *
 *  WHAT IS AND IS NOT DRAWN. Only start points. The bars begin at the moment
 *  the document names for that route and run on, because the document says the
 *  effects continue ("keeps paying back long after"). No heights, no curves, no
 *  comparison of volume: the source gives no magnitudes and a shape would be
 *  inventing a forecast. The two axis labels are its own words.
 *
 *  Both routes' prose is kept in full underneath. The chart is the summary, not
 *  a replacement for the answer. */

/** Where each named moment sits. Spacing is legibility, not scale: the document
 *  gives a week and a range of months, which no honest linear axis reconciles
 *  in the width of a page. */
const AT = [24, 62];

export function StartRoutes({
  columns,
  axis,
  options,
}: {
  columns: [string, string, string];
  axis: [string, string];
  options: StartOption[];
}) {
  const [startHere, fitsLabel, expectLabel] = columns;

  return (
    <div>
      {/* The axis, once, above every route. */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,2.15fr)] gap-x-12">
          <p className="text-[0.65rem] font-semibold uppercase text-ash">
            {startHere}
          </p>
          <div className="relative h-5">
            {axis.map((moment, i) => (
              <span
                key={moment}
                className="absolute top-0 text-[0.65rem] font-semibold uppercase text-brand-text"
                style={{ left: `${AT[i]}%`, transform: "translateX(-50%)" }}
              >
                {moment}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ol className="mt-4 border-t border-line lg:mt-3">
        {options.map((option, i) => (
          <li
            key={option.label}
            className={cn(
              "group border-b border-line py-6",
              option.recommended && "bg-brand/[0.05]",
            )}
          >
            <Rise delay={i * 0.07}>
              <div className="grid gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.15fr)]">
                <p
                  className={cn(
                    "font-display text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.16]",
                    option.recommended ? "text-brand" : "text-snow",
                  )}
                >
                  {option.label}
                </p>

                <div>
                  {/* When this route starts producing. */}
                  <div className="relative hidden h-7 lg:block" aria-hidden>
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
                    {AT.map((x, m) => (
                      <span
                        key={m}
                        className={cn(
                          "absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                          option.bands.includes(m) ? "bg-brand" : "bg-line",
                        )}
                        style={{ left: `${x}%` }}
                      />
                    ))}
                    {option.bands.map((b, k) => (
                      <span
                        key={b}
                        className={cn(
                          "absolute rounded-full",
                          option.recommended ? "bg-brand/70" : "bg-brand/45",
                        )}
                        style={{
                          left: `${AT[b]}%`,
                          right: 0,
                          height: option.bands.length > 1 ? 5 : 7,
                          top: option.bands.length > 1 ? `calc(50% + ${k * 8 - 6}px)` : "calc(50% - 3.5px)",
                        }}
                      />
                    ))}
                  </div>

                  <dl className="grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:mt-4">
                    <div>
                      <dt className="text-[0.65rem] font-semibold uppercase text-ash">
                        {fitsLabel}
                      </dt>
                      <dd
                        className={cn(
                          "mt-2 leading-relaxed",
                          option.recommended ? "text-snow" : "text-fog",
                        )}
                      >
                        {option.fits}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.65rem] font-semibold uppercase text-ash">
                        {expectLabel}
                      </dt>
                      <dd
                        className={cn(
                          "mt-2 leading-relaxed",
                          option.recommended ? "text-snow" : "text-fog",
                        )}
                      >
                        {option.expect}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Rise>
          </li>
        ))}
      </ol>
    </div>
  );
}
