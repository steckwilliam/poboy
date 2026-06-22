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
