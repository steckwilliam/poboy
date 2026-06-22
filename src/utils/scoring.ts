import type { GameItem } from '../types/game'

export const MAX_YUCK_METER = 100
export const MAX_STACK_HEIGHT = 12

/** Placeholder: apply item points to the current score */
export function addItemScore(currentScore: number, item: GameItem): number {
  return Math.max(0, currentScore + item.points)
}

/** Placeholder: increase yuck meter when catching a yuck item */
export function addYuckAmount(
  currentYuck: number,
  amount: number = 20,
): number {
  return Math.min(MAX_YUCK_METER, currentYuck + amount)
}

/** Placeholder: check if yuck meter is full (game over condition) */
export function isYuckMeterFull(yuckMeter: number): boolean {
  return yuckMeter >= MAX_YUCK_METER
}

/** Placeholder: check if sandwich stack is too tall (game over condition) */
export function isStackTooTall(stackHeight: number): boolean {
  return stackHeight >= MAX_STACK_HEIGHT
}
