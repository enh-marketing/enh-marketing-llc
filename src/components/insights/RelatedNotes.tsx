"use client";

import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NoteCardFace } from "@/components/insights/NoteCard";
import { related as copy, type Note } from "@/content/insights";

/** WHAT TO READ NEXT.
 *
 *  THE SAME CARD AS THE REGISTER, and that is the whole point. This section
 *  used to have a composition of its own — one note taking the picture and the
 *  headline, the rest as small dated rows beside it. It now renders
 *  `NoteCardFace`, so a reader who has just come from the archive meets the
 *  same object again, and a change to the card reaches here without anyone
 *  remembering to make it twice.
 *
 *  THE SET IS DERIVED, NEVER PADDED. `relatedTo` in the content model offers
 *  the notes named by the article first, then others under the same topic
 *  newest-first, then the rest of the archive. So every entry is a real
 *  relation and the section renders whatever the archive can honestly fill —
 *  including nothing at all, in which case the caller drops it rather than
 *  showing an empty rail.
 *
 *  A NOTE WITH NO ARTICLE BEHIND IT IS STILL A TITLE, not a link. The card
 *  enforces that itself, which matters most here: the reader has just finished
 *  something and is being offered more, so a dead click is the worst place on
 *  the site for one.
 *
 *  ENTRANCE IS `Rise`, NOT ScrollTrigger. Three cards do not need the wave the
 *  register installs across seventy-two, and Rise is the site's one shared
 *  entrance. */
export function RelatedNotes({ notes }: { notes: Note[] }) {
  if (notes.length === 0) return null;

  return (
    <section
      id="read-next"
      data-section="Read Next"
      className="relative overflow-x-clip py-14 sm:py-16"
    >
      <Container>
        <SectionHeader
          index={copy.index}
          title={copy.title}
          strokeTitle={copy.strokeTitle}
          className="mb-12"
        />

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
