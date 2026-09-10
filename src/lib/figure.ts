/** Split a client-written figure into its hedge and its numeral.
 *
 *  Every figure on the automotive page keeps the document's own hedge — "More
 *  than 45,000", "Nearly 20,000", "Approximately 4,700" — and those hedges are
 *  part of the claim, not padding: they are the difference between a count and
 *  a guarantee, and this site does not delete them.
 *
 *  Setting the whole phrase at display scale makes the hedge shout and the
 *  numeral compete with it; setting the whole phrase small throws away the one
 *  piece of information a reader is scanning for. So the phrase is split at its
 *  last space and typeset in two weights. Nothing is reworded, nothing is
 *  dropped, and the two halves concatenate back to the client's string exactly.
 *
 *  A figure with no hedge ("70") returns an empty hedge and prints as itself. */
export function splitFigure(figure: string): { hedge: string; numeral: string } {
  const m = /^(.*)\s(\S+)$/.exec(figure.trim());
  if (!m) return { hedge: "", numeral: figure.trim() };
  return { hedge: m[1], numeral: m[2] };
}
