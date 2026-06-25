import type { GameItem } from '../types/game'

export const MAX_YUCK_COUNT = 3

// Controls how many caught ingredient layers can be stacked before the po' boy is considered too tall.
// Increase this to make rounds last longer. Decrease it to make the game harder.
// Counts only caught stack layers — not bottom bread. Top bread completes the round instead.
export const MAX_INGREDIENTS_BEFORE_TOO_TALL = 28

export function addItemScore(currentScore: number, item: GameItem): number {
  return Math.max(0, currentScore + item.points)
}

export function isYuckLimitReached(yuckCount: number): boolean {
  return yuckCount >= MAX_YUCK_COUNT
}

export function isStackTooTall(ingredientLayerCount: number): boolean {
  return ingredientLayerCount >= MAX_INGREDIENTS_BEFORE_TOO_TALL
}

export function yuckMeterPercent(yuckCount: number): number {
  return Math.min(100, (yuckCount / MAX_YUCK_COUNT) * 100)
}
