import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

export type CascadeClaim = { no: string; title: string; body: string };

/** Four reasons, as four overlapping planes.
 *
 *  This section has now been a two-by-two card grid and a vertical spine, and
 *  both had the same problem: four claims of equal shape, one after another, in
 *  a page that is already three vertical runs deep. A stack of rows cannot stop
 *  looking like a stack of rows, however large the numerals get.
 *
 *  The claims themselves offer the way out. The second one is the section's
 *  thesis, that planning, filming, photography, editing, design and copy are
 *  "managed through one workflow", and the other three are facets of that same
 *  integration. So the four are drawn overlapping. Each plane sits on the one
 *  before it and steps right, which says connected without a connector line,
 *  and matters here because this page already spends a vertical rail on the
 *  stages section: a second rail would be the page repeating itself.
 *
 *  The overlap only ever eats padding, never words. Each plane is opaque and
 *  bordered so the stepped edge stays legible, and the tones alternate so two
 *  neighbouring planes never merge into one surface.
 *
 *  Below lg the cascade collapses to an ordinary stack. Overlap needs width to
 *  read as overlap; on a phone it would just be four panels crowding each
 *  other, so there the offsets and the negative margins simply do not apply. */

/** A trailing sentence, set apart from the claim it qualifies.
 *
 *  Applied to every claim rather than to a chosen one. Only the third has more
 *  than a single sentence, and what it carries is the boundary on the AI work
 *  ("Every AI-assisted asset is built from approved brand and product
 *  references"), which is the most specific promise in the section and reads
 *  as a condition rather than as more description. Any claim that later grows
 *  a second sentence gets the same treatment without a code change. */
function splitNote(body: string): { lead: string; note?: string } {
  const parts = body.split(/(?<=\.)\s+(?=[A-Z])/);
  if (parts.length < 2) return { lead: body };
  return { lead: parts[0], note: parts.slice(1).join(" ") };
}

/** Step and width per plane. The last one lands flush with the right edge. */
const STEP = ["lg:ml-0", "lg:ml-[6%]", "lg:ml-[12%]", "lg:ml-[18%]"];

export function ClaimCascade({ items }: { items: CascadeClaim[] }) {
  return (
    <ol className="space-y-4 lg:space-y-0">
      {items.map((claim, i) => {
        const last = i === items.length - 1;
        const { lead, note } = splitNote(claim.body);
        return (
          <li
            key={claim.no}
            className={cn(
              "relative lg:w-[82%]",
              STEP[i] ?? "lg:ml-[18%]",
              // Each plane rides over the one before it. The offset is smaller
              // than the panel's bottom padding, so what it covers is space.
              i > 0 && "lg:-mt-7",
            )}
            style={{ zIndex: i + 1 }}
          >
            <Rise delay={Math.min(i, 3) * 0.08}>
              <div
                className={cn(
                  "group relative overflow-hidden rounded-[1.25rem] border p-7 transition-colors duration-500 sm:p-9",
                  // Opaque, and alternating, so a plane never dissolves into
                  // the one it is sitting on. The last one carries a brand
                  // wash, which is translucent by nature, so it gets the same
                  // solid base underneath rather than letting the plane below
                  // read through it and break the stack.
                  last
                    ? "border-brand/45 bg-ink-2"
                    : i % 2 === 0
                      ? "border-line bg-ink-2 hover:border-ash/60"
                      : "border-line bg-ink-3 hover:border-ash/60",
                )}
              >
                {last && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-brand/[0.07]"
                  />
                )}
                <div className="relative flex items-start gap-6 sm:gap-9">
                  <span
                    aria-hidden
                    className={cn(
                      "font-display shrink-0 text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[0.8] tabular-nums transition-colors duration-500",
                      last ? "text-brand" : "text-stroke",
                    )}
                  >
                    {claim.no}
                  </span>

                  <div className="min-w-0">
                    <h3
                      className={cn(
                        "font-display text-[clamp(1.15rem,2.3vw,1.6rem)] font-extrabold uppercase leading-[1.16]",
                        last ? "text-brand" : "text-snow",
                      )}
                    >
                      {claim.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-4 max-w-2xl leading-relaxed sm:text-lg",
                        last ? "text-snow" : "text-fog",
                      )}
                    >
                      {lead}
                    </p>

                    {/* The condition on the claim above it. */}
                    {note && (
                      <p className="mt-5 max-w-2xl border-l-2 border-brand/60 pl-5 leading-relaxed text-snow">
                        {note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Rise>
          </li>
        );
      })}
    </ol>
  );
}
