import { Rise } from "@/components/fx/Reveal";

/** What a monthly scope covers, drawn as the boundary of the engagement.
 *
 *  WHAT WAS WRONG BEFORE. The section was two rounded panels of pills, one
 *  tinted with a brand wash, plus a segmented control that looked like a choice
 *  and did nothing. Three faults. Two panels of the same shape made the six
 *  things inside the scope and the four things outside it read as equivalent
 *  sets, which is the one thing this copy is trying not to say. The brand wash
 *  is a named anti-reference in this project's own notes. And the sentence the
 *  section exists for, "The number of finished assets is agreed before
 *  production starts", was the last clause of a small grey paragraph.
 *
 *  WHAT IT IS NOW. One rule, which is the scope. The six things an ongoing
 *  scope may include stand on it. The four things it does not hang off it on
 *  broken tethers, because the document does not refuse them, it puts them
 *  outside: "unless these are added separately". A dashed line is a connection
 *  that is not made and could be, which is the exact status of media spend here.
 *
 *  ROTATED, NOT REFLOWED. Six columns cannot become two columns and still mean
 *  anything: only the last row would touch the rule and the rest would be
 *  orphan marks. Below lg the same diagram turns ninety degrees. The rule runs
 *  down the left, solid and brand for as far as the scope holds, then dashed
 *  and ash past the end of it, and every item tethers off the side. The length
 *  of the solid run is the scope, which is the same statement either way.
 *
 *  Exactly one of the two is in the document at any width, so the reading order
 *  is the drawing's own order and nothing is announced twice.
 *
 *  NO CHOICE IS OFFERED. One-off or monthly is stated, not asked. The reader
 *  cannot pick their scope off a web page and the old control implied they
 *  could. */
export function ScopeLine({
  shape,
  includedLabel,
  included,
  commitment,
  excludedLabel,
  excluded,
  excludedTail,
}: {
  shape: string;
  includedLabel: string;
  included: string[];
  commitment: string;
  excludedLabel: string;
  excluded: string[];
  excludedTail: string;
}) {
  return (
    <div>
      {/* The frame: how it is scoped, and the commitment that comes with it.
          Paired so neither leaves an empty half. */}
      <Rise>
        <div className="grid items-start gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <p className="max-w-[46ch] text-base leading-relaxed text-fog sm:text-lg">{shape}</p>
          <p className="font-display max-w-[22ch] text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.15] text-brand lg:justify-self-end">
            {commitment}
          </p>
        </div>
      </Rise>

      <Rise delay={0.08} className="mt-12 lg:mt-14">
        <p
          aria-hidden
          className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-text"
        >
          {includedLabel}
        </p>

        {/* ── the rule across, at lg and up ───────────────────────────────── */}
        <div className="mt-7 hidden lg:block">
          {/* Bottom-aligned so every tick meets the rule at the same point
              whatever its label wraps to. */}
          <ul aria-label={includedLabel} className="grid grid-cols-6 items-end gap-x-6">
            {included.map((n) => (
              <li key={n} className="group flex flex-col justify-end">
                <span className="font-display text-[0.9375rem] font-bold uppercase leading-[1.25] text-snow transition-colors duration-500 group-hover:text-brand-text">
                  {n}
                </span>
                <span
                  aria-hidden
                  className="mt-3 h-5 w-0.5 bg-brand/70 transition-colors duration-500 group-hover:bg-brand"
                />
              </li>
            ))}
          </ul>

          <div aria-hidden className="h-[2px] w-full bg-brand" />

          {/* Six columns and four columns divide the same width, so tethers 1
              and 3 would otherwise land exactly under ticks 1 and 4 and read as
              one line passing through the rule. Offset inside the cell. */}
          <ul aria-label={excludedLabel} className="grid grid-cols-4 gap-x-6">
            {excluded.map((n) => (
              <li key={n} className="group flex flex-col pl-[18%]">
                <span
                  aria-hidden
                  className="h-5 w-0 border-l-2 border-dashed border-ash transition-colors duration-500 group-hover:border-brand/60"
                />
                <span className="mt-3 font-display text-[0.9375rem] font-bold uppercase leading-[1.25] text-ash transition-colors duration-500 group-hover:text-fog">
                  {n}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── the same rule, turned down the page, below lg ───────────────── */}
        <div className="mt-6 lg:hidden">
          <ul aria-label={includedLabel} className="border-l-2 border-brand">
            {included.map((n) => (
              <li key={n} className="flex items-center gap-3 py-2.5">
                <span aria-hidden className="h-0.5 w-5 shrink-0 bg-brand/70" />
                <span className="font-display text-[0.875rem] font-bold uppercase leading-[1.25] text-snow">
                  {n}
                </span>
              </li>
            ))}
          </ul>
          {/* Past the end of the scope the rule itself gives out. */}
          <ul aria-label={excludedLabel} className="border-l-2 border-dashed border-ash/60">
            {excluded.map((n) => (
              <li key={n} className="flex items-center gap-3 py-2.5">
                <span
                  aria-hidden
                  className="h-0 w-5 shrink-0 border-t-2 border-dashed border-ash"
                />
                <span className="font-display text-[0.875rem] font-bold uppercase leading-[1.25] text-ash">
                  {n}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 max-w-[64ch] text-sm leading-relaxed text-ash">
          <span aria-hidden className="font-display font-semibold uppercase tracking-[0.14em] text-fog">
            {excludedLabel}
          </span>{" "}
          {excludedTail}
        </p>
      </Rise>
    </div>
  );
}
