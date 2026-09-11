"use client";

import { useRef, useState } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { Prose, SectionRule } from "@/components/case-studies/Prose";
import { ProjectMedia } from "@/components/portfolio/ProjectMedia";
import { ProjectFilm } from "@/components/portfolio/ProjectFilm";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { ImageViewer } from "@/components/portfolio/ImageViewer";
import {
  canOpen,
  categoriesOf,
  siteLabel,
  project as copy,
  type Project,
} from "@/content/portfolio";

/** THE PROJECT: who they are, then what was made.
 *
 *  TWO CHAPTERS, NOT FOUR. `CaseStory` sets a study as brief / challenge /
 *  approach / outcome because its source publishes four rich texts under those
 *  four headings. A portfolio page publishes one rich text and a set of
 *  artefacts, so the page is the profile and then the artefacts, and no third
 *  or fourth section is invented to make the two archives match. The furniture
 *  is identical — `SectionRule`, `Prose`, the same measures, the same panel —
 *  so they read as one site without claiming the same content.
 *
 *  THE WORK CHAPTER IS WHATEVER THE PAGE ACTUALLY HAS, in the order it leads
 *  with: the film, then the artwork, then the site. Every one of the thirty-five
 *  has at least one of the three and none has all three, so this is a sequence
 *  of present things rather than a template with gaps. Where a project had
 *  nothing at all the chapter would be absent entirely, which is the rule this
 *  site already applies to a case study with no results sheet.
 *
 *  THE `Prose` AND `SectionRule` ARE THE CASE STUDIES', imported rather than
 *  copied. Both archives were migrated out of the same Webflow rich text into
 *  the same block model by the same converter, and that renderer is where this
 *  site's decisions about migrated prose live — typed blocks rather than
 *  `dangerouslySetInnerHTML`, links to unbuilt routes set as text. Writing a
 *  second copy of it here would be two places to keep those decisions. Both
 *  imports are safe for this island: they take the block model as types only,
 *  so nothing from the case study archive is bundled with this page. */
export function ProjectBody({ project }: { project: Project }) {
  const categories = categoriesOf(project);
  const [shotOpen, setShotOpen] = useState(false);
  const shotTrigger = useRef<HTMLButtonElement>(null);

  const shot = project.siteShot;
  const shotOpenable = shot ? canOpen(shot) : false;

  return (
    <div data-section="Project Body">
      {/* ------------------------------------------------------- profile */}
      {project.profile.length > 0 && (
        <section id="profile" className="relative overflow-x-clip py-14 sm:py-16">
          <Container>
            <SectionRule index="01" label={copy.briefLabel} />
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <Prose blocks={project.profile} className="max-w-[68ch]" />
              </div>
              <Rise delay={0.1} className="lg:col-span-4 lg:col-start-9">
                {/* The only filled panel on the page, and it holds the only
                    content that is a record rather than a sentence. Same panel
                    a case study's brief sets beside its profile. */}
                <dl className="rounded-2xl border border-line bg-ink-2 p-7">
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                      Project
                    </dt>
                    <dd className="font-display mt-2 text-[1.05rem] font-extrabold uppercase leading-tight text-snow">
                      {project.title}
                    </dd>
                  </div>
                  <div className="mt-6 border-t border-line pt-6">
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                      {copy.categoriesLabel}
                    </dt>
                    <dd className="mt-2 text-sm font-semibold text-snow">
                      {categories.map((c) => c.label).join(", ")}
                    </dd>
                  </div>
                  {project.projectUrl && (
                    <div className="mt-6 border-t border-line pt-6">
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                        {copy.liveSiteLabel}
                      </dt>
                      <dd className="mt-2">
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-snow underline decoration-brand decoration-2 underline-offset-4 transition-colors duration-300 hover:text-brand"
                        >
                          {siteLabel(project.projectUrl)}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </Rise>
            </div>
          </Container>
        </section>
      )}

      {/* ---------------------------------------------------------- film */}
      {project.film && (
        <section id="film" className="relative overflow-x-clip py-14 sm:py-16">
          <Container>
            <SectionRule index="02" label={copy.filmLabel} />
            <Rise>
              <ProjectFilm film={project.film} poster={project.thumb} />
            </Rise>
          </Container>
        </section>
      )}

      {/* ------------------------------------------------------- artwork */}
      {project.gallery && project.gallery.length > 0 && (
        <section id="artwork" className="relative overflow-x-clip py-14 sm:py-16">
          <Container>
            <SectionRule index="03" label={copy.galleryLabel} />
            <ProjectGallery figures={project.gallery} />
          </Container>
        </section>
      )}

      {/* ---------------------------------------------------------- site */}
      {shot && (
        <section id="site" className="relative overflow-x-clip py-14 sm:py-16">
          <Container>
            <SectionRule index="04" label={copy.siteLabel} />
            <figure>
              {shotOpenable ? (
                <button
                  ref={shotTrigger}
                  type="button"
                  onClick={() => setShotOpen(true)}
                  aria-label={`${copy.galleryHint}: ${shot.alt}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-ink-3 transition-colors duration-500 hover:border-brand/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none"
                >
                  <Shot shot={shot} />
                  <span
                    aria-hidden
                    className="absolute bottom-4 right-4 inline-flex items-center gap-2.5 rounded-full border border-line bg-void/85 px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-snow backdrop-blur-sm transition-colors duration-300 group-hover:border-brand group-hover:text-brand"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M10.5 10.5L14 14M7 5v4M5 7h4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    {copy.galleryHint}
                  </span>
                </button>
              ) : (
                <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-3">
                  <Shot shot={shot} />
                </div>
              )}

              <figcaption className="mt-4 text-sm leading-relaxed text-ash">{shot.alt}</figcaption>
            </figure>
          </Container>

          <ImageViewer
            figure={shot}
            open={shotOpen}
            onClose={() => setShotOpen(false)}
            returnFocusTo={() => shotTrigger.current}
          />
        </section>
      )}
    </div>
  );
}

/** The screenshot itself.
 *
 *  `object-contain`, not `cover`. These files are pictures of somebody's
 *  website at whatever height their homepage happens to be, and cropping one to
 *  a frame cuts off the page it exists to show. The box takes the file's own
 *  ratio instead, so nothing is cropped and nothing shifts while it loads. */
function Shot({ shot }: { shot: NonNullable<Project["siteShot"]> }) {
  return (
    <div className="relative" style={{ aspectRatio: `${shot.w} / ${shot.h}` }}>
      <ProjectMedia figure={shot} slot="sheet" fit="contain" />
    </div>
  );
}
