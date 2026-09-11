"use client";

import { useRef } from "react";
import { ParticleField } from "@/components/hub/ParticleField";
import { SplineScene } from "@/components/hub/SplineScene";
import { OpeningLine, OpeningStandfirst } from "@/components/hub/OpeningLine";

/** The opening, with two things that answer the pointer.
 *
 *  ASKED FOR BY NAME: the particle field from @avanishverma4 and the Spline
 *  robot from @serafimcloud, in one hero, both reacting to the cursor. It lives
 *  at /ai-hub/hero-robot so it can be compared against the cupola without
 *  either of them having to be live to be looked at.
 *
 *  THE STACK, BACK TO FRONT. The field fills the section and takes the pointer
 *  from the window rather than from its own element, so it keeps pushing when
 *  the cursor crosses the robot or the copy. The robot sits in the right half,
 *  which is where the page's own layout already puts its subject: the cupola's
 *  is right of centre, the mountain's climber was, and the copy has been
 *  reading against a right-hand subject since the journey's cards were laid
 *  out. Over both, the same heading and the same sentence the other openings
 *  use, from hub/OpeningLine, unchanged.
 *
 *  THE COPY WORKS HERE FOR ONE REASON: it measures the block it is told to
 *  measure. OpeningLine reads `[data-section="AI Hub opener"]` for its scroll
 *  ramp and the sentence hangs off `[data-hub-line-block]`, neither of which
 *  knows or cares what is behind it. So the same two components sit over a
 *  photograph in three plates on one route and over a canvas and a 3D scene on
 *  this one, with nothing branching on which.
 *
 *  WHAT THIS OPENING DOES NOT HAVE IS A SUN, and the page's hinge is a sun: the
 *  orbital chapter enters on the pixel the light lands on, measured out of the
 *  photograph by sunScreenX. There is no such light here, so chapter two opens
 *  wherever the cupola's sun would have been. It is not wrong on screen - the
 *  system simply arrives - but the join is a cut rather than a carry, and that
 *  is the thing to look at when comparing the two. */
export function OpeningRobot() {
  const frame = useRef<HTMLElement>(null);

  return (
    <section
      ref={frame}
      data-section="AI Hub opener"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <ParticleField className="absolute inset-0 z-0" />

      {/* THE ROBOT IN THE RIGHT HALF, AND FULL HEIGHT. Spline scales its own
          camera to the box it is given; a box the width of the section would
          put him dead centre under the heading. `pointer-events-auto` on him
          alone, because he is the only thing here that has to be touched and
          the field is listening on the window regardless. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-full lg:w-[58%]">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="pointer-events-auto h-full w-full"
        />
      </div>

      {/* A wash under the copy, as the cupola has. The field is dark but the
          robot is lit, and the heading's left edge reaches into him on a narrow
          window. It fades with the copy because it is inside it. */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <OpeningLine />
        <OpeningStandfirst />
      </div>
    </section>
  );
}
