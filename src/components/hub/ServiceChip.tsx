/** The link out of a category, as a chip.
 *
 *  It replaces a bare "See the service" with a rule after it. That read as a
 *  caption on a page whose every other element is lit, and it gave the one
 *  interactive thing in the frame no edges: on a black scene with a starfield
 *  running through it, underlined text is the weakest possible target.
 *
 *  THE ROCKET IS AN INLINE SVG, not an icon package. The site has no icon
 *  dependency and this page is not the place to add one for a single glyph.
 *  It is 20px, it sits on the right as asked, and it lifts along its own
 *  diagonal on hover, which is the direction it points.
 *
 *  GLASS RATHER THAN A SOLID FILL, because behind it is a moving scene and a
 *  solid plate would punch a hole in it. A hairline border and a low-alpha
 *  wash sit on top of the stars without hiding them, and the hover state
 *  brightens the border rather than the fill so the chip never becomes a slab.
 *
 *  The label is not `uppercase` in CSS: the words are capitalised in the markup
 *  so they survive into the accessible name as written.
 *
 *  THE HOVER LIFT WAS NOT ANIMATING AT ALL, and the transition list said it was.
 *  It named `transform`, but Tailwind v4 writes `-translate-y-0.5` to the
 *  separate `translate` property. Straight from the built stylesheet:
 *
 *    .transition-[background-color,border-color,transform]
 *      { transition-property: background-color,border-color,transform }
 *    .motion-safe:hover:-translate-y-0.5:hover
 *      { --tw-translate-y: calc(var(--spacing) * -.5);
 *        translate: var(--tw-translate-x) var(--tw-translate-y) }
 *
 *  `translate` is not in that list, so the chip snapped up two pixels instantly
 *  while its background and border washed in over 300ms, and the rocket beside
 *  it glided over those same 300ms because `transition-transform` DOES expand
 *  to `transform,translate,scale,rotate` in v4. Three speeds out of one pointer
 *  movement. It is the same trap that put the waveform half off the screen.
 *
 *  The plain `transition` utility is used instead of a hand-written list
 *  precisely so this cannot come back: it already covers translate, scale and
 *  rotate, so adding any of those later needs no matching edit here.
 *
 *  AND IT IS FASTER THAN THE PAGE. Hover feedback wants to be under 100ms
 *  whatever the rest of the design is doing; 300ms on a pointer-over reads as
 *  the interface thinking about it. The rocket is a beat behind at 150ms, which
 *  is the follow-through: the chip moves, the thing inside it catches up. */
export function ServiceChip({ href, label = "Explore" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      className="group font-grotesk mt-5 inline-flex lg:mt-7 items-center gap-3 rounded-full border border-white/25 bg-white/[0.06] py-3 pl-6 pr-5 text-[0.9rem] font-bold tracking-[0.01em] text-white backdrop-blur-sm transition duration-100 hover:border-[color-mix(in_srgb,var(--hub-accent-quiet)_70%,transparent)] hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 active:border-white/70 active:bg-white/[0.09] motion-reduce:transition-none"
    >
      {label}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-5 w-5 transition-transform duration-150 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Body and nose, pointing up-right. */}
        <path d="M13.5 4.5c2.6-1.4 5.2-1.6 6.2-1.4.3 1 .1 3.6-1.3 6.2-1.2 2.2-3.1 4-5 5.3l-3.4 2.3-3.4-3.4 2.3-3.4c1.3-1.9 3.1-3.8 5.3-5" />
        {/* Window. */}
        <circle cx="15.2" cy="8.8" r="1.7" />
        {/* Fins. */}
        <path d="M7.6 13.5 4.9 14a.6.6 0 0 0-.35 1l1.9 1.9M10.5 16.4l.5 2.7a.6.6 0 0 0 1 .35l1.9-1.9" />
        {/* Exhaust. */}
        <path d="m5.4 18.6-1.8 1.8M7.2 20.4l-1.2 1.2M3.6 16.8l-1.2 1.2" />
      </svg>
    </a>
  );
}
