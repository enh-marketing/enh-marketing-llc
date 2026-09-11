import { ProjectMedia } from "@/components/portfolio/ProjectMedia";
import { ArrowRight } from "@/components/ui/Button";
import { blurb, categoriesOf, holdings, type Project } from "@/content/portfolio";
import { cn } from "@/lib/cn";

/** THE PORTFOLIO CARD. One design, one definition, everywhere a project is
 *  listed.
 *
 *  IT IS `CaseCard`'S ANATOMY, WITH THE ONE THING THIS ARCHIVE HAS INSTEAD OF
 *  FIGURES. The panel, the radius, the border, the hover on the border and on
 *  the heading, the numeral on the picture, the ruled lower half and the
 *  two-arrow action line are all the case study card's, unchanged, so the two
 *  archives read as one site. What differs is what sits above the action line:
 *  a case study publishes four figures and puts them there, a portfolio entry
 *  publishes none, and inventing four would be inventing them. So that space
 *  carries the two things this entry does have — the disciplines it is filed
 *  under, which are read from the live index's own tabs, and what its page
 *  holds, which is counted from the page rather than written.
 *
 *  THE PICTURE BOX IS A FIXED 3:2, unlike the case study card's, which takes
 *  its ratio from the file. These thirty-five cards were exported at four
 *  slightly different ratios (1.43 to 1.50), and a grid whose rows are ragged
 *  by five percent looks like a mistake rather than a variation. The crop is
 *  under five percent on the widest of them, and it is `object-cover`, so
 *  nothing is squashed.
 *
 *  EVERY PROJECT HAS A PAGE, so unlike `CaseCard` there is no text-only state:
 *  the archive and the router are built from the same list, and a project that
 *  is in one is in the other.
 *
 *  IT CARRIES NO WIDTH OF ITS OWN. The caller sets that. */
export function PortfolioCard({
  project,
  position,
  slot = "card",
  className,
}: {
  project: Project;
  /** The numeral on the picture. One-based, and it ascends in DOM order. */
  position: number;
  slot?: "card" | "compact";
  className?: string;
}) {
  const categories = categoriesOf(project);
  const holds = holdings(project);

  return (
    <a
      href={`/portfolio/${project.slug}`}
      draggable={false}
      className={cn(
        "pf-card group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-ink-2 transition-colors duration-500",
        "hover:border-brand/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <ProjectMedia
          figure={project.thumb}
          slot={slot}
          className="transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-2 to-transparent" />
        <span className="font-display absolute right-4 top-4 rounded-full bg-void/60 px-2.5 py-1 text-[10px] font-bold tabular-nums text-ash backdrop-blur-sm">
          {String(position).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-4">
        {/* h4, below the section's own h3. Same level CaseCard sets. */}
        <h4 className="font-display text-lg font-bold text-snow transition-colors duration-500 group-hover:text-brand motion-reduce:transition-none">
          {project.title}
        </h4>
        {/* THE BLURB'S BOX IS EXACTLY THREE LINES, and the arithmetic is
            written out rather than rounded to the nearest spacing step.
            `line-clamp-3` alone leaves the height to the content, so the rule
            under it jumps up on a card whose opening sentence is short; the
            case study card answers that with `min-h-[3.75rem]`, which is 60px
            against three 13px lines at `leading-snug` — 53.6px. Those 6.4px
            are a window, and the top of a fourth line prints through it on
            every profile long enough to have one. Measured on this archive
            before the fix: ten to twenty-eight pixels of overhang on five of
            the thirty-five cards. So the leading is stated in pixels and the
            height is three of them, and there is no window left to print
            through. */}
        <p className="mt-2 line-clamp-3 h-[54px] overflow-hidden text-[13px] leading-[18px] text-fog">
          {blurb(project)}
        </p>

        <div className="mt-5 border-t border-line pt-5">
          <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
            {categories.map((category) => (
              <li
                key={category.key}
                className="font-display rounded-full border border-line px-3 py-1 text-[0.6875rem] font-extrabold uppercase tracking-[0.06em] text-ash transition-colors duration-500 group-hover:border-brand/40 group-hover:text-brand-text motion-reduce:transition-none"
              >
                {category.label}
              </li>
            ))}
          </ul>

          {holds.length > 0 && (
            /* Counted by `holdings`, never authored, so a card cannot promise
               a film the page does not have or five images where there are
               four. Each entry is checkable against the page it links to. */
            <p className="mt-3.5 text-[0.6875rem] leading-snug text-ash">{holds.join(" · ")}</p>
          )}
        </div>

        <span className="mt-auto flex items-center gap-2.5 pt-5 text-[10px] font-semibold uppercase tracking-[0.1em] text-snow">
          View the project
          <span className="relative flex h-3 w-3 items-center justify-center overflow-hidden text-brand">
            <ArrowRight className="absolute h-2.5 w-2.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3.5" />
            <ArrowRight className="absolute h-2.5 w-2.5 -translate-x-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
          </span>
        </span>
      </div>
    </a>
  );
}
