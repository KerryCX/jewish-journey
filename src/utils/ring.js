// src/utils/ring.js
//
// A four-position ring that fills clockwise: the newest item opened
// always claims the next position in sequence (evicting whoever was
// there), and closing an item just frees its position without moving
// the fill order along.

// The four positions, pinwheeling clockwise around the centre. Exported
// so consumers and tests share the same canonical order rather than
// each defining their own.
export const RING_POSITIONS = ["top", "right", "bottom", "left"];

export function createEmptyRing() {
  return { bySlot: {}, next: 0 };
}

/**
 * Applies a single toggle action to the ring state.
 *
 * - If `slug` is already open somewhere in the ring, closes it (frees
 *   that position) without touching the rotation cursor.
 * - If `slug` isn't open, claims the next position in clockwise order
 *   (per `next`), evicting whatever was already there, and advances the
 *   cursor by one.
 *
 * @param {{ bySlot: Record<string, string>, next: number }} ring
 * @param {string} slug
 * @param {string[]} [positions] defaults to RING_POSITIONS
 * @returns {{ bySlot: Record<string, string>, next: number }} new ring state
 */
export function applyRingToggle(ring, slug, positions = RING_POSITIONS) {
  const openPosition = Object.keys(ring.bySlot).find(
    (pos) => ring.bySlot[pos] === slug,
  );

  // Already open — close it, freeing that position without touching the
  // rotation cursor.
  if (openPosition) {
    const bySlot = { ...ring.bySlot };
    delete bySlot[openPosition];
    return { ...ring, bySlot };
  }

  // Not open — claim the next position in clockwise order, evicting
  // whatever (if anything) was already sitting there.
  const position = positions[ring.next % positions.length];
  return {
    bySlot: { ...ring.bySlot, [position]: slug },
    next: ring.next + 1,
  };
}

export function isSlugOpen(ring, slug) {
  return Object.values(ring.bySlot).includes(slug);
}
