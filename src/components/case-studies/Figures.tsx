import { cn } from "@/lib/cn";
import type { Metric } from "@/content/case-studies";

/** THE PUBLISHED FIGURES. Four per study, everywhere a study appears.
 *
 *  THE VALUE IS PRINTED, NEVER COUNTED UP. The site has a Counter, and it is
 *  wrong here: these values are strings the source wrote, and half of them are
 *  not numbers at all. "#1" is a search position, "64×" is a multiple, "60–70"
 *  is a range and "1.8K" is already rounded. A count-up would have to parse
 *  each one, and every one it failed to parse it would print differently from
 *  the page it was migrated from. So they are set, in tabular figures, exactly
 *  as published.
 *
 *  THE LABEL IS NEVER TRUNCATED ON A DETAIL PAGE. It is the only thing that
 *  says what the number measures, and a figure whose caption is cut in half is
 *  a figure nobody can check. On a card in the archive it clamps to three
 *  lines, because there the full text is one click away and a ragged grid of
 *  cards is worse than a clamp.
 *
 *  ONE MEASURE, THREE SCALES. `card` inside a plate, `lead` on the cover
 *  story, `strip` across the top of a study page. They share the type
 *  treatment so a figure reads as the same object in all three. */
export function Figures({
  metrics,
  scale = "card",
  className,
  label,
}: {
  metrics: Metric[];
  scale?: "card" | "lead" | "strip";
  className?: string;
  /** Screen-reader name for the group. The figures are a list of results, and
   *  without this they are four unlabelled numbers in the accessibility tree. */
  label: string;
}) {
  const value =
    scale === "strip"
      ? "text-[clamp(1.75rem,4vw,2.6rem)]"
      : scale === "lead"
        ? "text-[clamp(1.6rem,3vw,2.2rem)]"
        : "text-[clamp(1.35rem,2.2vw,1.7rem)]";

  const caption = scale === "card" ? "line-clamp-3" : "";

  return (
    <dl
      aria-label={label}
      className={cn(
        "grid gap-x-6 gap-y-6",
        scale === "strip"
          ? "grid-cols-2 gap-y-8 border-t border-line pt-8 sm:grid-cols-4"
          : "grid-cols-2",
        className,
      )}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={cn(
            "min-w-0",
            /* The divider is a rule between columns, not a border box: on the
               strip every figure after the first carries a hairline to its
               left from sm up, which is where four fit on one row. */
            scale === "strip" && "sm:border-l sm:border-line sm:pl-6 sm:first:border-l-0 sm:first:pl-0",
          )}
        >
          <dt className="sr-only">{metric.label}</dt>
          <dd>
            <span
              className={cn(
                "font-display block font-extrabold leading-none tabular-nums text-brand",
                value,
              )}
            >
              {metric.value}
            </span>
            <span
              className={cn(
                "mt-2.5 block text-[0.6875rem] leading-[1.45] text-fog",
                scale === "strip" && "sm:text-xs",
                caption,
              )}
            >
              {metric.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
