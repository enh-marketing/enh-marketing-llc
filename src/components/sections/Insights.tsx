import { all } from "@/content/insights";
import { pages, isPending } from "@/lib/sitemap";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { NoteCardFace } from "@/components/insights/NoteCard";
import { SpinStar } from "@/components/fx/Adornments";

/** The archive's teaser, mounted on the homepage and on all forty-one service
 *  and AI Hub pages.
 *
 *  IT IS THE SAME CARD AS THE ARCHIVE. This section used to have a composition
 *  of its own — a lead note with the picture and the display-scale headline,
 *  and two small dated rows beside it. That was three different presentations
 *  of a post across the site (here, the register, the read-next set), so a
 *  change to any of them had to be made three times and drifted the moment one
 *  was forgotten. It now renders `NoteCardFace`, the one card, in the same
 *  three-column grid the register uses.
 *
 *  IT READS THE REAL ARCHIVE. The three newest notes come from
 *  src/content/insights, so the titles, dates, topics and pictures on every
 *  page that mounts this section are the migrated articles' own, and each card
 *  links to its article. It used to read a separate three-item list in
 *  src/lib/content.ts whose images were Unsplash placeholders — which, once the
 *  real posts landed, meant forty-two pages advertised three articles with
 *  stock photography while /insights held seventy-two with their own.
 *
 *  The card's own `hasBody` guard still applies: a note with no article behind
 *  it is set as text with no hover state, so this section can never promise an
 *  article that is not there.
 *
 *  Server component. It carries no state or effects of its own; the reveal
 *  wrappers and the card are the client parts. */
export function Insights({
  index = "08",
  label = "Insights",
}: {
  index?: string;
  label?: string;
} = {}) {
  /** The three newest, which is what a teaser is for. */
  const notes = all().slice(0, 3);
  const archiveIsLive = !isPending(pages.insights);

  if (notes.length === 0) return null;

  return (
    <section id="insights" data-section={label} className="relative py-16 sm:py-20">
      <Container>
        <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
          <span className="text-brand">({index})</span> Our insights <SpinStar />
        </p>

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display display-xl font-extrabold uppercase text-snow">
            <span className="block">
              <Chars text="Field notes" />
            </span>
            {/* Real space: the two spans otherwise concatenate in textContent
                and the accessible name reads "Field notesfrom the climb." */}
            {" "}
            <span className="block text-stroke">
              <Chars text="from the climb." delay={0.15} />
            </span>
          </h2>

          {/* Only once the archive resolves. A link to a 404 is worse than no
              link, and "coming soon" is an announcement nobody asked for. */}
          {archiveIsLive && (
            <Rise delay={0.2}>
              <a
                href={pages.insights.href}
                className="group inline-flex items-center gap-3 py-1.5 text-sm font-semibold uppercase text-snow transition-colors duration-300 hover:text-brand"
              >
                All insights
                <span className="h-px w-8 bg-brand transition-all duration-300 group-hover:w-14" />
              </a>
            </Rise>
          )}
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note, i) => (
            <li key={note.slug}>
              <Rise delay={i * 0.08} className="h-full">
                <NoteCardFace note={note} />
              </Rise>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
