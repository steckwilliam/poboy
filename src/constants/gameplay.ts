// TEMP TESTING ONLY:
// Set to an item id to force that item every time. Set to null for normal spawning.
//
// Good ingredients: fried-shrimp, roast-beef, sausage-link, tomato-slice,
//   pickle-slice, lettuce, mayonnaise, hot-sauce
// Yuck items: traffic-cone, white-boot, fish-skeleton
// Special: top-bread
export const TEST_SPAWN_ITEM_ID: string | null = null

/** When true, renders outlined rectangles for falling-item and catch hitboxes. */
export const SHOW_HITBOXES = false

/** When true, falling items visually sway left/right while falling. */
export const ENABLE_FALLING_ITEM_SWAY = true

/** Max tilt in degrees — increase for more dramatic sway. */
export const SWAY_ROTATION_DEGREES = 18

/** Sway oscillation speed — increase for faster back-and-forth movement. */
export const SWAY_SPEED = 0.006

// Increase to make top bread appear more often (when stack is long enough).
export const TOP_BREAD_SPAWN_CHANCE = 0.25

// Increase to require more good ingredients before top bread can spawn.
export const MIN_STACK_FOR_TOP_BREAD = 4

/** Bonus points added when the player catches the top bread */
export const TOP_BREAD_BONUS_POINTS = 50

/** Per-round fall speed increase: round 2 = +15%, round 3 = +30%, etc. */
export const ROUND_SPEED_INCREASE = 0.15

/** Chance that a non-top-bread spawn is a yuck item */
export const YUCK_SPAWN_CHANCE = 0.22

export const TOP_BREAD_ID = 'top-bread'

export function getRoundFallSpeedMultiplier(round: number): number {
  return 1 + (round - 1) * ROUND_SPEED_INCREASE
}
