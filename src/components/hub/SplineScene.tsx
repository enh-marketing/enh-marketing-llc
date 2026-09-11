"use client";

import { Suspense, lazy } from "react";
import { cn } from "@/lib/cn";

const Spline = lazy(() => import("@splinetool/react-spline"));

/** A Spline 3D scene.
 *
 *  SOURCE: @serafimcloud/splite on 21st.dev, as it is. The component is fifteen
 *  lines and this is those fifteen lines: a lazy import so the runtime is not
 *  in the first bundle, a Suspense boundary, and the scene. One thing differs
 *  and it is required rather than a preference: `cn` comes from @/lib/cn,
 *  because this project has no @/lib/utils.
 *
 *  THE SCENE IS NOT OURS AND THAT IS RECORDED HERE RATHER THAN DISCOVERED
 *  LATER. The robot is Spline's own public demo asset, served from
 *  prod.spline.design: 1.29MB, measured, on somebody else's origin. It is the
 *  same class of dependency that was taken out of the mountain hero and out of
 *  the airlock, and it is acceptable here only because this route exists to be
 *  looked at and compared, not to be shipped. Before any of this could go to
 *  /ai-hub the scene would have to be ours - commissioned, or built in Spline
 *  and self-hosted - and the robot would want to stop being the single most
 *  recognisable free asset in the tool.
 *
 *  It also brings two npm dependencies with it, @splinetool/react-spline and
 *  the runtime underneath it, which is a whole 3D engine that loads further
 *  chunks after its entry. The lazy import keeps all of that off every other
 *  route. */
export function SplineScene({ scene, className }: { scene: string; className?: string }) {
  return (
    <Suspense
      fallback={
        /* Not a spinner. The page behind this is black and the scene takes a
           moment on a cold cache; a spinner in the middle of a hero announces
           that something is missing, and nothing is. */
        <div className="h-full w-full" />
      }
    >
      <Spline scene={scene} className={cn(className)} />
    </Suspense>
  );
}
