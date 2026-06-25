import {
  ENABLE_FALLING_ITEM_SWAY,
  SWAY_ROTATION_DEGREES,
  SWAY_SPEED,
} from '../constants/gameplay'

/** Visual-only sway rotation in degrees — does not affect collision. */
export function getFallingItemSwayRotation(
  gameTimeMs: number,
  swayPhase: number,
): number {
  if (!ENABLE_FALLING_ITEM_SWAY) return 0
  return Math.sin(gameTimeMs * SWAY_SPEED + swayPhase) * SWAY_ROTATION_DEGREES
}
