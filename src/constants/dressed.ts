/** Bonus points awarded once per round when all dressing ingredients are collected. */
export const DRESSED_BONUS_POINTS = 100

/** Burst image used for the celebration popup and HUD badge. */
export const DRESSED_BURST_IMAGE = '/assets/ui/dressed-burst.png'

/** How long the large DRESSED! popup stays visible before fading out (ms). */
export const DRESSED_POPUP_DURATION_MS = 1800

/**
 * Good ingredients required for the DRESSED! bonus in a single round.
 * Item ids match src/data/items.ts (tomato-slice, pickle-slice, etc.).
 */
export const DRESSED_REQUIRED_ITEM_IDS = [
  'lettuce',
  'tomato-slice',
  'pickle-slice',
  'mayonnaise',
  'hot-sauce',
] as const

export type DressedRequiredItemId = (typeof DRESSED_REQUIRED_ITEM_IDS)[number]
