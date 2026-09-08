import { CaseMedia } from "@/components/case-studies/CaseMedia";
import { ArrowRight } from "@/components/ui/Button";
import { hasStory, type Study } from "@/content/case-studies";
import { cn } from "@/lib/cn";

/** THE CASE STUDY CARD. One design, one definition, everywhere a study is
 *  listed.
 *
 *  TEAM DIRECTION, 2026-09-08: the archive is to use the card the homepage's
 *  Work carousel already uses, and only that one. The markup below is that
 *  card, lifted out of Work unchanged so the two cannot drift: a panel with
 *  the client's own result card at the top, then client, title, the four
 *  published figures two across, and the way in. It replaced `CasePlate` in
 *  the archive, which was a second design (a frameless plate whose width
 *  alternated 7/5, 5/7, 6/6 down a twelve-column mosaic).
 *
 *  IT CARRIES NO WIDTH OF ITS OWN. The caller sets that, because the two
 *  callers need different things: a fixed 280/300px in the drag carousel,
 *  where cards must not stretch, and a full grid cell in the archive. Nothing
 *  else about the card is a prop, which is the point of it being one card.
 *
 *  `wk-card` STAYS IN THE CLASS LIST. Work's arrow buttons measure a step by
 *  querying `.wk-card` and fall back to 320px when they find nothing, so the
 *  hook is load-bearing rather than decorative.
 *
 *  A STUDY WITH NO PAGE IS NOT A LINK. `hasStory` gates the tag, the hover
 *  state and the action line together: an <article> that stays put, because a
 *  hover state on something that cannot be clicked is a lie. */
export function CaseCard({
  study,
  position,
  slot = "plate",
  className,
  onClick,
}: {
  study: Study;
  /** The numeral on the picture. One-based, and it ascends in DOM order. */
  position: number;
  /** Which `sizes` the picture declares. `compact` in the carousel, where a
   *  card is 300px; the default in the archive, where a card is a third of the
   *  measure and the compact hint would fetch the soft file. */
  slot?: "plate" | "compact";
  className?: string;
  /** The carousel's drag guard: without it, letting go of a flung carousel
   *  navigates to whichever study happened to be under the finger. */
  onClick?: (e: React.MouseEvent) => void;
}) {
  const live = hasStory(study);
  const Root = live ? "a" : "article";

  return (
    <Root
      {...(live ? { href: `/case-studies/${study.slug}`, onClick } : {})}
      draggable={false}
      className={cn(
        "wk-card group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-ink-2 transition-colors duration-500",
        live &&
          "hover:border-brand/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      )}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: `${study.thumb.w} / ${study.thumb.h}` }}
      >
        <CaseMedia
          figure={study.thumb}
          slot={slot}
          className={cn(
            "transition-transform duration-700 motion-reduce:transition-none",
            live && "group-hover:scale-105",
          )}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-2 to-transparent" />
        <span className="font-display absolute right-4 top-4 rounded-full bg-void/60 px-2.5 py-1 text-[10px] font-bold tabular-nums text-ash backdrop-blur-sm">
          {String(position).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-4">
        {/* h4, below the section's own h3. Team direction, 2026-09-08. */}
        <h4 className="font-display text-lg font-bold text-snow transition-colors duration-500 group-hover:text-brand motion-reduce:transition-none">
          {study.client}
        </h4>
        <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-[13px] leading-snug text-fog">
          {study.title}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-line pt-5">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-display text-2xl font-extrabold leading-none tabular-nums text-brand">
                {m.value}
              </div>
              <div className="mt-1 line-clamp-3 text-[10.5px] leading-snug text-fog">{m.label}</div>
            </div>
          ))}
        </div>

        {live && (
          <span className="mt-auto flex items-center gap-2.5 pt-5 text-[10px] font-semibold uppercase tracking-[0.1em] text-snow">
            Read the case study
            <span className="relative flex h-3 w-3 items-center justify-center overflow-hidden text-brand">
              <ArrowRight className="absolute h-2.5 w-2.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3.5" />
              <ArrowRight className="absolute h-2.5 w-2.5 -translate-x-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            </span>
          </span>
        )}
      </div>
    </Root>
  );
}
