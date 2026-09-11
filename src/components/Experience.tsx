"use client";

import { useCallback, useEffect, useState } from "react";
import type { PartnerBadge } from "@/lib/content";
import { Preloader } from "@/components/fx/Preloader";
import { Hero } from "@/components/sections/Hero";

/** The preloader and the hero: the only part of the homepage that has to be
 *  interactive the moment the page arrives.
 *
 *  THIS USED TO BE THE WHOLE PAGE. Every section from Manifesto down to FAQ was
 *  in this one tree, hydrated as a single client:load island. The homepage
 *  pulls about a megabyte of uncompressed JavaScript -- motion/react alone is
 *  358KB -- and all of it was parsed and hydrated in one uninterruptible block.
 *
 *  On an iPhone that block is 3-4 seconds, and it landed at the worst possible
 *  instant. The preloader is an opaque fixed veil, so while it covers the
 *  screen the compositor and the main thread are nearly idle; the entire cost
 *  arrived the moment it lifted. It read as the page freezing right after the
 *  preloader, because that is precisely what it did.
 *
 *  Everything below the hero now lives in HomeSections and hydrates on idle.
 *  The split is safe because `started` -- the one piece of shared state
 *  MIGRATION.md warns about -- never leaves this file: Preloader hands it to
 *  Hero and nothing else reads it. */
export function Experience({ badges = [] }: { badges?: PartnerBadge[] }) {
  const [started, setStarted] = useState(false);

  /** Stable identity, and that matters more than it looks.
   *
   *  This used to be an inline arrow. Preloader takes it as a prop and lists
   *  it in a useEffect dependency array, so a fresh function on every render
   *  of this component tore that effect down and rebuilt it -- cancelling and
   *  restarting all three of the preloader's timers, including the one that
   *  hands the page over. */
  const handleDone = useCallback(() => setStarted(true), []);

  /** The page hands over on its own, whatever the preloader does.
   *
   *  The hero headline is not rendered until `started` flips, so if the
   *  handover never arrives the page is left with no headline, which is
   *  exactly what was reported on mobile. The preloader already carries timer
   *  based safety nets of its own, but they are its to run and they only work
   *  if its effect is alive. This one is not: it belongs to the component that
   *  owns the flag, it starts once on mount, and nothing can cancel it. */
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Preloader onDone={handleDone} />
      <Hero started={started} badges={badges} />
    </>
  );
}
