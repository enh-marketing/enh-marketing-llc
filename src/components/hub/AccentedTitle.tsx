/** A heading in the site's two-tone treatment.
 *
 *  The site sets a heading in the foreground colour and gives its second half
 *  brand red: ServiceHero does it line by line, SectionHeader does it inline,
 *  and the home page's own hero does it to these exact words, with HEIGHTS in
 *  red. The red half is `.text-stroke`, which is the site's class for it and is
 *  worth using rather than `text-brand` directly: it was a 1.5px outline until
 *  that measured barely legible over a near-black page, and if it ever changes
 *  again this page changes with it.
 *
 *  NO FORCED BREAK. SectionHeader deliberately dropped the line break it used
 *  to have, on the grounds that the colour already marks the two halves and a
 *  break costs a line of width. This follows it.
 *
 *  THE BASE STAYS `text-white` RATHER THAN `text-snow`. Snow is a role token
 *  and it is near-black in the light theme; the dark values live on `html.dark`
 *  alone, and the reusable dark-chapter class this page would have wanted was
 *  retired. This page is dark whatever the reader's theme, so its foreground
 *  cannot be a token that follows it. Brand red is the same in both, so the
 *  accent needs no such care.
 *
 *  The space between the two spans is written out because it has to survive
 *  into textContent: without it the accessible name of the opener reads
 *  "Explore NewHeights". */
export function AccentedTitle({ text }: { text: string }) {
  const cut = text.trimEnd().lastIndexOf(" ");
  if (cut < 0) return <span className="text-stroke">{text}</span>;

  return (
    <>
      <span>{text.slice(0, cut)}</span>{" "}
      <span className="text-stroke">{text.slice(cut + 1)}</span>
    </>
  );
}
