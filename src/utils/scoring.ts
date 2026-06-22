import type { GameItem } from '../types/game'

export const MAX_YUCK_COUNT = 3
export const MAX_STACK_LAYERS = 12

export function addItemScore(currentScore: number, item: GameItem): number {
  return Math.max(0, currentScore + item.points)
}

export function isYuckLimitReached(yuckCount: number): boolean {
  return yuckCount >= MAX_YUCK_COUNT
}

export function isStackTooTall(stackLayerCount: number): boolean {
  return stackLayerCount >= MAX_STACK_LAYERS
}

export function yuckMeterPercent(yuckCount: number): number {
  return Math.min(100, (yuckCount / MAX_YUCK_COUNT) * 100)
}
