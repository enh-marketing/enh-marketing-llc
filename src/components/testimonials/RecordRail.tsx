import { Container } from "@/components/ui/Container";
import { voices, held, STARS } from "@/content/testimonials";

/** The three facts that describe this page, pinned to the base of the fold.
 *
 *  WHY NOT THE CLIENT LOGO STRIP that the seventeen service heroes carry here.
 *  The right-hand half of this hero is already a wall of client voices, so a
 *  marquee of thirty more names directly beneath it competes with the thing the
 *  page is about. What the fold is missing instead is the shape of what
 *  follows: how many testimonials there are, that every one of them is a five,
 *  and the longest relationship any of them names.
 *
 *  ALL THREE ARE READ OFF THE CONTENT. The count is a length, the rating is the
 *  one constant the source page publishes, and fifteen years is the largest
 *  figure any client states about themselves — looked up, not typed in, so none
 *  of it can go stale against the quotes. */
export function RecordRail() {
  const longest = held.find((v) => v.held?.years)?.held?.years;

  const rail = [
    { figure: String(voices.length), label: "Clients in their own words, unedited" },
    { figure: `${STARS}.0`, label: `Every one of them rated ${STARS} out of ${STARS}` },
    { figure: String(longest), label: "Years, the longest relationship a client names" },
  ];

  return (
    <Container className="border-t border-line py-6">
      <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-3">
        {rail.map((r, i) => (
          <div key={r.label} className={i > 0 ? "sm:border-l sm:border-line sm:pl-10" : undefined}>
            <div className="flex items-baseline gap-3.5">
              <dt className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-none tabular-nums text-brand">
                {r.figure}
              </dt>
              <dd className="text-[0.78rem] leading-snug text-fog">{r.label}</dd>
            </div>
          </div>
        ))}
      </dl>
    </Container>
  );
}
