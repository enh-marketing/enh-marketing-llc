"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type LedgerItem = { title: string; body?: string };

/** Whatever a document offers to back a claim, in the form it arrives in. */
export type LedgerEvidence =
  | {
      at: number;
      kind: "chips";
      lead: string;
      chips: string[];
      /** A metric the document explicitly declines, shown struck through. */
      struck?: string;
      accent?: boolean;
    }
  /** A claim that is entirely a number. The figure is a substring of the
   *  claim's own title, so the row sets the title with that substring enlarged
   *  rather than printing the sentence twice. No `unit`: the title carries it. */
  | { at: number; kind: "figure"; figure: string };

/** Claims set against whatever backs each.
 *
 *  WHY THIS AND NOT A LIST OF CARDS. Both pages using this had it as a card
 *  grid first, and a card grid is what you build when you have not looked at
 *  what the items contain. On neither page are the six items six sentences of
 *  the same kind: some name four things each, one is a number, one is a
 *  refusal, one has no second sentence at all. Six identical boxes throw all of
 *  that away and spend a lot of vertical space doing it.
 *
 *  So the claim sits on the left and the evidence on the right, in whatever
 *  form the document gives it. Where a document offers nothing beyond the
 *  claim, the right side stays empty rather than being padded, and the claim
 *  takes the full width — which is its own signal, and reads as a flat
 *  statement rather than a hole.
 *
 *  THE REFUSAL GETS PULLED OUT. Both documents end on something they will not
 *  do: report followers, or rebuild a page that was never the problem. Set as
 *  row six of six it reads as an afterthought, when it is actually the line
 *  that decides whether a reader trusts the other five. `accentAt` lifts that
 *  row out of the ledger and gives it the panel it earns.
 *
 *  Every string is the calling document's. Figures are printed, never counted
 *  up: the site's Counter starts at zero and animates, so a frame where the
 *  animation has not run would show "0 years in the UAE market". A factual
 *  claim should never be briefly wrong for effect. */
export function ClaimLedger({
  id,
  label,
  index,
  title,
  strokeTitle,
  mark,
  markVariant = "contrast",
  aside,
  items,
  evidence = [],
  accentAt,
  footer,
  tone = "raised",
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  mark: string;
  /** Replaces the section mark. For a document that opens the section with a
   *  claim of its own rather than a label. */
  aside?: ReactNode;
  markVariant?: "growth" | "network" | "progression" | "contrast" | "ecosystem";
  items: LedgerItem[];
  evidence?: LedgerEvidence[];
  /** Index of the claim to lift out of the ledger and set as a panel. */
  accentAt?: number;
  /** Anything the section closes on: a call to action the source places after
   *  the list, a caveat. */
  footer?: ReactNode;
  /** "raised" paints its own band. "plain" leaves the background to the
   *  main-level banding rule, which is what a page already sitting on ink-3
   *  immediately above this section needs. */
  tone?: "raised" | "plain";
}) {
  const evidenceAt = (i: number) => evidence.find((e) => e.at === i);
  const rows = items
    .map((item, i) => ({ item, i }))
    .filter(({ i }) => i !== accentAt);
  const accent = accentAt === undefined ? null : items[accentAt];

  return (
    <section
      id={id}
      data-section={label}
      className={cn(
        "relative overflow-x-clip py-14 sm:py-16",
        tone === "raised" && "",
      )}
    >
      {/* Fine grid, fading from the evidence side. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 78% 40%, black, transparent 72%)",
        }}
      />

      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: markVariant, label: mark }}
          aside={aside}
          className="mb-10"
        />

        <ol className="border-t border-line">
          {rows.map(({ item, i }) => {
            const ev = evidenceAt(i);
            const isFigure = ev?.kind === "figure";
            // A figure claim carries its own evidence: the number IS the
            // sentence. Reserving a second column for it printed "15 years in
            // the UAE market." on the left and "15 / years in the UAE market"
            // on the right, which is the same claim made twice.
            const hasEvidence = !isFigure && (Boolean(ev) || Boolean(item.body));
            return (
              <li
                key={item.title}
                className={cn(
                  "group relative grid gap-x-12 gap-y-4 border-b border-line py-5",
                  // Only rows that actually have evidence reserve a column for
                  // it. Giving the bare ones an empty half was how this section
                  // grew to 1206px carrying almost nothing.
                  hasEvidence &&
                    "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center",
                )}
              >
                {/* A rule that wipes on hover, so a dense ledger still responds
                    to the cursor without anything moving. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />

                {/* The claim. */}
                <div className="flex items-start gap-5">
                  <span
                    aria-hidden
                    className="font-display mt-1.5 shrink-0 text-xs font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[clamp(0.98rem,1.6vw,1.2rem)] font-extrabold uppercase leading-[1.22] text-snow">
                    {isFigure && ev?.kind === "figure" ? (
                      // Split around the figure rather than recomposing the
                      // sentence, so the document's wording and its full stop
                      // survive verbatim. The spans stay inline: an inline
                      // child keeps the shared baseline, and the surrounding
                      // text nodes keep their own spaces.
                      (() => {
                        const at = item.title.indexOf(ev.figure);
                        const before = item.title.slice(0, at);
                        const after = item.title.slice(at + ev.figure.length);
                        return (
                          <>
                            {before}
                            <span className="text-[clamp(1.9rem,3.4vw,2.8rem)] leading-none text-brand">
                              {ev.figure}
                            </span>
                            {after}
                          </>
                        );
                      })()
                    ) : (
                      item.title
                    )}
                  </h3>
                </div>

                {/* And what the document offers to back it. */}
                {hasEvidence && (
                  <div className="lg:border-l lg:border-line lg:pl-12">
                    {ev?.kind === "chips" && (
                      <Rise>
                        <p className="text-[0.65rem] font-semibold uppercase text-ash">
                          {ev.lead}
                        </p>
                        <ul className="mt-3 flex flex-wrap items-center gap-2">
                          {ev.chips.map((chip) => (
                            <li
                              key={chip}
                              className={cn(
                                "font-display rounded-lg px-3 py-1.5 text-sm font-bold text-snow",
                                ev.accent
                                  ? "border border-brand/45 bg-brand/[0.08]"
                                  : "border border-line bg-ink-2 transition-colors duration-500 hover:border-brand/50",
                              )}
                            >
                              {chip}
                            </li>
                          ))}
                          {ev.struck && (
                            <li className="font-display rounded-lg border border-line px-3 py-1.5 text-sm font-bold text-ash line-through decoration-brand/70 decoration-2">
                              {ev.struck}
                            </li>
                          )}
                        </ul>
                      </Rise>
                    )}

                    {/* Claims the document substantiates in prose keep the
                        prose; claims it leaves bare are left bare. */}
                    {!ev && item.body && (
                      <Rise>
                        <p className="leading-relaxed text-fog sm:text-lg">{item.body}</p>
                      </Rise>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* The one the document ends on, given the width it earns. */}
        {accent && accentAt !== undefined && (
          <Rise delay={0.1}>
            <div className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-brand/45 bg-brand/[0.06] p-7 sm:p-8">
              <span
                aria-hidden
                className="font-display pointer-events-none absolute -right-4 -top-8 text-[7rem] font-extrabold leading-none text-brand/[0.14] sm:text-[9rem]"
              >
                {String(accentAt + 1).padStart(2, "0")}
              </span>
              {/* Same geometry as the rows above it: claim left, what backs it
                  right. Raised, not restructured — a panel that also changed
                  shape would read as a different kind of thing. */}
              <div
                className={cn(
                  "relative grid gap-x-12 gap-y-5",
                  accent.body &&
                    "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center",
                )}
              >
                <h3 className="font-display text-[clamp(1.2rem,2.3vw,1.8rem)] font-extrabold uppercase leading-[1.14] text-snow">
                  {accent.title}
                </h3>
                {accent.body && (
                  <p className="leading-relaxed text-fog sm:text-lg lg:border-l lg:border-brand/30 lg:pl-12">
                    {accent.body}
                  </p>
                )}
              </div>
            </div>
          </Rise>
        )}

        {footer}
      </Container>
    </section>
  );
}
