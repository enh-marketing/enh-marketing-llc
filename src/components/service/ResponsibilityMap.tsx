"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { Responsibility } from "@/content/services/website-maintenance-support";

/** Five services, one setup, and the seams between them.
 *
 *  WHY A MAP AND NOT A TABLE ALONE. The document's own sentence is the brief:
 *  "These services affect the same digital setup, but they cover different
 *  responsibilities." A table can list five responsibilities; it cannot show
 *  that they are five parts of one thing. And the question a reader actually
 *  arrives with is spatial — where does the plan I am buying stop, and whose is
 *  the rest? So the setup is drawn once and the table's rows point into it.
 *
 *  WHAT IS DRAWN WHERE. The website sits on the server that serves it, with the
 *  mailboxes on the same base beside it, because that is how the arrangement
 *  actually is: one hosting account underneath, two things running on top.
 *  Technical support is not a region — it is an entry into the website from
 *  outside, which is why it is drawn as a probe rather than as a box.
 *  Development is drawn past the site's current edge on a broken outline, since
 *  its own row says "new pages, features, integrations, redesigns and
 *  structural changes".
 *
 *  THE TABLE IS STILL A TABLE. The document supplies a table with two column
 *  headers, so this renders as one, with its headers intact. The lighting is a
 *  pointer enhancement over content that is complete without it: every region
 *  is drawn and every row is readable at rest, so nothing is behind the
 *  interaction. */

/** A stand-in row of content inside a drawn region. Never text. */
function Fill({ rows, on }: { rows: number[]; on: boolean }) {
  return (
    <span aria-hidden className="mt-2 flex flex-col gap-1.5">
      {rows.map((w, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-colors duration-500 motion-reduce:transition-none",
            on ? "bg-brand/60" : "bg-line",
          )}
          style={{ width: `${w}%` }}
        />
      ))}
    </span>
  );
}

export function ResponsibilityMap({
  id,
  label,
  index,
  title,
  strokeTitle,
  lede,
  columns,
  rows,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lede: string;
  columns: [string, string];
  rows: Responsibility[];
}) {
  const [lit, setLit] = useState<Responsibility["zone"] | null>(null);
  const on = (zone: Responsibility["zone"]) => lit === zone;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance leading-[1.2] text-snow">{lede}</p>}
          className="mb-14"
        />

        <div
          className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-16"
          onPointerLeave={() => setLit(null)}
        >
          {/* ------------------------------------------------- the one setup */}
          <div aria-hidden className="order-2 lg:order-1">
            <div className="relative rounded-2xl border border-line bg-ink-2 p-5 sm:p-7">
              {/* Beyond the current edge: new structure, not yet there. */}
              <div
                className={cn(
                  "flex items-center gap-2 rounded-lg border border-dashed p-3 transition-all duration-500 motion-reduce:transition-none",
                  on("build") ? "border-brand bg-brand/[0.06]" : "border-line opacity-70",
                )}
              >
                <span
                  className={cn(
                    "h-8 w-10 shrink-0 rounded transition-colors duration-500",
                    on("build") ? "bg-brand/25" : "bg-line/60",
                  )}
                />
                <span
                  className={cn(
                    "h-8 w-10 shrink-0 rounded border border-dashed transition-colors duration-500",
                    on("build") ? "border-brand/70" : "border-line",
                  )}
                />
                <span className="flex-1 space-y-1.5">
                  <span className="block h-1.5 w-2/3 rounded-full bg-line" />
                  <span className="block h-1.5 w-1/3 rounded-full bg-line" />
                </span>
                <svg
                  viewBox="0 0 16 16"
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors duration-500",
                    on("build") ? "text-brand" : "text-ash",
                  )}
                  fill="none"
                >
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>

              {/* The seam between what exists and what would be built. */}
              <div className="my-3 flex items-center gap-3">
                <span className="h-px flex-1 border-t border-dashed border-line" />
                <span className="h-1 w-1 rotate-45 bg-line" />
                <span className="h-px flex-1 border-t border-dashed border-line" />
              </div>

              {/* The website, and the mailboxes beside it. */}
              <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-3">
                <div
                  className={cn(
                    "relative rounded-lg border p-3 transition-all duration-500 motion-reduce:transition-none",
                    on("site")
                      ? "border-brand bg-brand/[0.07] shadow-[0_10px_30px_-18px_rgba(232,0,13,0.65)]"
                      : "border-line bg-ink-3",
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                        on("site") ? "bg-brand" : "bg-line",
                      )}
                    />
                    <span className="h-1 flex-1 rounded-full bg-snow/15" />
                  </span>
                  <Fill rows={[100, 82]} on={on("site")} />
                  <span className="mt-2 flex gap-1.5">
                    {[0, 1, 2].map((k) => (
                      <span
                        key={k}
                        className={cn(
                          "h-6 flex-1 rounded transition-colors duration-500 motion-reduce:transition-none",
                          on("site") ? "bg-brand/25" : "bg-line/70",
                        )}
                      />
                    ))}
                  </span>

                  {/* Technical support: an entry into the site from outside. */}
                  <span
                    className={cn(
                      "absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 motion-reduce:transition-none",
                      on("support")
                        ? "scale-110 border-brand bg-brand/15"
                        : "border-line bg-void",
                    )}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={cn(
                        "h-4 w-4 transition-colors duration-500",
                        on("support") ? "text-brand" : "text-ash",
                      )}
                      fill="none"
                    >
                      <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M15 15l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  </span>
                  {on("support") && (
                    <span className="pointer-events-none absolute inset-0 rounded-lg border border-dashed border-brand/70" />
                  )}
                </div>

                {/* Mailboxes. */}
                <div
                  className={cn(
                    "flex flex-col gap-1.5 rounded-lg border p-3 transition-all duration-500 motion-reduce:transition-none",
                    on("mail")
                      ? "border-brand bg-brand/[0.07] shadow-[0_10px_30px_-18px_rgba(232,0,13,0.65)]"
                      : "border-line bg-ink-3",
                  )}
                >
                  {[0, 1, 2].map((k) => (
                    <span
                      key={k}
                      className={cn(
                        "flex items-center gap-2 rounded border px-1.5 py-1.5 transition-colors duration-500 motion-reduce:transition-none",
                        on("mail") ? "border-brand/50" : "border-line",
                      )}
                    >
                      <svg
                        viewBox="0 0 16 12"
                        className={cn(
                          "h-2.5 w-3.5 shrink-0 transition-colors duration-500",
                          on("mail") ? "text-brand" : "text-ash",
                        )}
                        fill="none"
                      >
                        <rect x="0.8" y="0.8" width="14.4" height="10.4" rx="1.4" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M1.6 2l6.4 4.6L14.4 2" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                      <span className="h-1 flex-1 rounded-full bg-line" />
                    </span>
                  ))}
                </div>
              </div>

              {/* The base both of them run on. */}
              <div
                className={cn(
                  "mt-3 rounded-lg border p-3 transition-all duration-500 motion-reduce:transition-none",
                  on("server")
                    ? "border-brand bg-brand/[0.07] shadow-[0_10px_30px_-18px_rgba(232,0,13,0.65)]"
                    : "border-line bg-ink-3",
                )}
              >
                <div className="flex items-center gap-3">
                  {/* Storage. */}
                  <span className="flex shrink-0 flex-col gap-1">
                    {[0, 1, 2].map((k) => (
                      <span
                        key={k}
                        className={cn(
                          "block h-1.5 w-9 rounded-sm transition-colors duration-500",
                          on("server") ? "bg-brand/60" : "bg-line",
                        )}
                      />
                    ))}
                  </span>
                  {/* The certificate. */}
                  <svg
                    viewBox="0 0 24 24"
                    className={cn(
                      "h-5 w-5 shrink-0 transition-colors duration-500",
                      on("server") ? "text-brand" : "text-ash",
                    )}
                    fill="none"
                  >
                    <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  {/* The monitor line, which is continuous by nature. */}
                  <span className="relative h-px flex-1">
                    <span
                      className={cn(
                        "absolute inset-0 transition-colors duration-500",
                        on("server") ? "bg-brand/60" : "bg-line",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute -top-[2px] left-1/3 h-[5px] w-[5px] rounded-full transition-colors duration-500",
                        on("server") ? "bg-brand" : "bg-line",
                      )}
                    />
                  </span>
                  {/* Recovery points. */}
                  <span className="flex shrink-0 items-end gap-1">
                    {[10, 14, 18].map((h) => (
                      <span
                        key={h}
                        className={cn(
                          "w-2 rounded-sm transition-colors duration-500",
                          on("server") ? "bg-brand/60" : "bg-line",
                        )}
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------- the table */}
          <div className="order-1 lg:order-2">
            <Rise>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th
                      scope="col"
                      className="pb-3 pr-6 text-[0.6rem] font-semibold uppercase text-ash"
                    >
                      {columns[0]}
                    </th>
                    <th scope="col" className="pb-3 text-[0.6rem] font-semibold uppercase text-ash">
                      {columns[1]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const active = on(row.zone);
                    return (
                      <tr
                        key={row.no}
                        onPointerEnter={() => setLit(row.zone)}
                        className={cn(
                          "border-b border-line transition-colors duration-300 motion-reduce:transition-none",
                          active && "bg-brand/[0.04]",
                        )}
                      >
                        <th
                          scope="row"
                          className="w-[38%] py-5 pr-6 align-top font-normal"
                        >
                          <span className="flex items-start gap-3">
                            <span
                              aria-hidden
                              className={cn(
                                "font-display mt-1 shrink-0 text-[0.6rem] font-bold tabular-nums transition-colors duration-300",
                                active ? "text-brand-text" : "text-ash",
                              )}
                            >
                              {row.no}
                            </span>
                            <span
                              className={cn(
                                "font-display text-[0.95rem] font-extrabold uppercase leading-[1.16] transition-colors duration-300 sm:text-base",
                                active ? "text-brand" : "text-snow",
                              )}
                            >
                              {row.service}
                            </span>
                          </span>
                        </th>
                        <td className="py-5 align-top text-[0.9375rem] leading-relaxed text-fog">
                          {row.covers}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Rise>
          </div>
        </div>
      </Container>
    </section>
  );
}
