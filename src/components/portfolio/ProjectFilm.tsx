"use client";

import { useState } from "react";
import { ProjectMedia } from "@/components/portfolio/ProjectMedia";
import type { Figure, Film } from "@/content/portfolio";

/** THE FILM, BEHIND A FAÇADE.
 *
 *  IT DOES NOT LOAD UNTIL IT IS ASKED TO, and there are two separate reasons,
 *  either of which on its own would be enough.
 *
 *  THE FIRST IS LENIS. It ships a rule — `.lenis.lenis-smooth iframe {
 *  pointer-events: none }` — that makes every iframe on this site inert while
 *  smooth scrolling is on, which is always. `StudioMap` hit this first and
 *  solved it the same way: the embed starts as a picture, one click mounts the
 *  player, and from then on the wrapper carries `data-lenis-prevent` so the
 *  player's own controls work and scrolling over it still moves the page.
 *
 *  THE SECOND IS WEIGHT. A Vimeo player is several hundred kilobytes of
 *  third-party script and a set of third-party cookies, on a page most readers
 *  will scroll past. Mounting it on click means a reader who does not watch
 *  never pays for it, and nothing is sent to Vimeo until they ask.
 *
 *  THE POSTER IS THE PROJECT'S OWN CARD, which on every one of these eleven is
 *  a still from the film it fronts. No thumbnail is fetched from Vimeo at build
 *  time, so nothing here depends on their API staying where it is. */
export function ProjectFilm({ film, poster }: { film: Film; poster: Figure }) {
  const [live, setLive] = useState(false);

  /* dnt=1 asks Vimeo not to track the session. autoplay only once the reader
     has clicked, which is the click that mounts this. */
  const src = `https://player.vimeo.com/video/${film.id}?dnt=1&autoplay=1&title=0&byline=0&portrait=0`;

  return (
    <div
      {...(live ? { "data-lenis-prevent": true } : {})}
      className="relative isolate aspect-video w-full overflow-hidden rounded-2xl border border-line bg-ink-2"
    >
      {live ? (
        <iframe
          title={film.title}
          src={src}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLive(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
        >
          <ProjectMedia
            figure={{ ...poster, alt: "" }}
            slot="sheet"
            className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <span aria-hidden className="absolute inset-0 bg-void/35 transition-colors duration-500 group-hover:bg-void/20 motion-reduce:transition-none" />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-brand text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 motion-reduce:group-hover:scale-100 sm:h-20 sm:w-20"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6 sm:h-7 sm:w-7">
              <path d="M7 4.5v15l13-7.5-13-7.5Z" />
            </svg>
          </span>
          {/* The accessible name of the control. The play glyph above it is
              decorative, and a button whose only content is an icon is a button
              with no name. */}
          <span className="sr-only">Play the film for {film.title}</span>
        </button>
      )}
    </div>
  );
}
