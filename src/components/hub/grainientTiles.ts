import type { GrainientImageTile } from "@/components/hub/GrainientImagesSection";

/** The tiles the creative chapter flies through.
 *
 *  THE LAYOUT IS THE COMPONENT'S OWN. Every position, width, parallax rate,
 *  depth and aspect ratio below is copied from
 *  GRAINIENT_IMAGES_DEFAULT_TILES, so the composition and the order things
 *  arrive in are the author's, not a rearrangement. Only the artwork is ours.
 *
 *  WHY THE ARTWORK IS ABSTRACT, AND WHY THAT IS THE HONEST ANSWER. This chapter
 *  carries AI Creative Production, and the obvious thing to put in it is our
 *  work. There is none we are allowed to show: the source documents mark client
 *  examples as needing permission first, and inventing them is out of the
 *  question. The component's own demo tiles are abstract gradient art rather
 *  than anybody's portfolio, so abstract gradients are both faithful to it and
 *  make no claim we cannot support. When permissioned work exists, the srcs
 *  below are the only thing that has to change.
 *
 *  THEY ARE ALSO NOT HOTLINKED. The delivered tiles are thirteen PNGs on the
 *  component author's own domain, measured at 29.0 MB together, 2.2 MB each.
 *  These are thirteen SVGs on our origin, 12.2 KB together, 958 bytes each,
 *  drawn from src/../scripts as flat gradients with a grain filter. That is the
 *  same picture at roughly one two-thousandth of the weight, and no request
 *  leaves our domain. */
export const GRAINIENT_TILES: GrainientImageTile[] = [
  { id: "01", imageSrc: "/ai-hub/grainient/tile-01.svg", top: "34%", left: "7%", width: "14%", parallaxY: 50, depth: 300, aspectRatio: 0.981928 },
  { id: "03", imageSrc: "/ai-hub/grainient/tile-03.svg", top: "27%", left: "21%", width: "11%", parallaxY: 20, depth: 150, aspectRatio: 1.25243 },
  { id: "02", imageSrc: "/ai-hub/grainient/tile-02.svg", top: "14%", left: "40%", width: "13%", parallaxY: 120, depth: 500, aspectRatio: 1.07432 },
  { id: "04", imageSrc: "/ai-hub/grainient/tile-04.svg", top: "24%", left: "62%", width: "10%", parallaxY: 20, depth: 100, aspectRatio: 0.889706 },
  { id: "05", imageSrc: "/ai-hub/grainient/tile-05.svg", top: "17%", right: "50px", width: "12%", parallaxY: 70, depth: 450, aspectRatio: 1.43434, anchorYOnly: true },
  { id: "06", imageSrc: "/ai-hub/grainient/tile-06.svg", top: "46%", left: "75%", width: "16%", parallaxY: 200, depth: 250, aspectRatio: 0.920188 },
  { id: "07", imageSrc: "/ai-hub/grainient/tile-07.svg", top: "67%", left: "96%", width: "8%", parallaxY: 80, depth: 50, aspectRatio: 1.03226 },
  { id: "08", imageSrc: "/ai-hub/grainient/tile-08.svg", top: "85%", left: "74%", width: "13%", parallaxY: 100, depth: 350, aspectRatio: 1.39815 },
  { id: "09", imageSrc: "/ai-hub/grainient/tile-09.svg", top: "90%", left: "51%", width: "10%", parallaxY: 50, depth: 200, aspectRatio: 0.72619 },
  { id: "10", imageSrc: "/ai-hub/grainient/tile-10.svg", top: "83%", left: "14%", width: "16%", parallaxY: 90, depth: 400, aspectRatio: 1.14724 },
  { id: "11", imageSrc: "/ai-hub/grainient/tile-11.svg", top: "74%", left: "31%", width: "9%", parallaxY: 70, depth: 180, aspectRatio: 1.09574 },
  { id: "12", imageSrc: "/ai-hub/grainient/tile-12.svg", top: "54%", left: "17%", width: "7%", parallaxY: 100, depth: 80, aspectRatio: 1.22857 },
  { id: "13", imageSrc: "/ai-hub/grainient/tile-13.svg", top: "42%", left: "37%", width: "7%", parallaxY: 200, depth: 550, aspectRatio: 1.22857 },
];
