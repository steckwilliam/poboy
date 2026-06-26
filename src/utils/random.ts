import { GOOD_ITEMS, ITEMS, YUCK_ITEMS } from '../data/items'
import {
  MIN_STACK_FOR_TOP_BREAD,
  TOP_BREAD_ID,
  TOP_BREAD_SPAWN_CHANCE,
  YUCK_SPAWN_CHANCE,
} from '../constants/gameplay'
import type { GameItem } from '../types/game'

/** Pick a random element from an array */
export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function pickRandomExcluding(
  items: GameItem[],
  excludeId: string | null,
): GameItem {
  if (!excludeId || items.length <= 1) return pickRandom(items)
  const filtered = items.filter((item) => item.id !== excludeId)
  return pickRandom(filtered.length > 0 ? filtered : items)
}

export function pickRandomGoodItem(): GameItem {
  return pickRandom(GOOD_ITEMS)
}

export function pickRandomYuckItem(): GameItem {
  return pickRandom(YUCK_ITEMS)
}

function getTopBreadItem(): GameItem {
  return ITEMS.find((item) => item.id === TOP_BREAD_ID)!
}

/**
 * Pick the next falling item based on current stack size.
 * Top bread only rolls when stack has at least MIN_STACK_FOR_TOP_BREAD layers.
 * Skips immediate repeats when another item is available in the pool.
 */
export function pickRandomSpawnItem(
  stackLayerCount: number,
  lastItemId: string | null = null,
): GameItem {
  if (
    stackLayerCount >= MIN_STACK_FOR_TOP_BREAD &&
    lastItemId !== TOP_BREAD_ID &&
    Math.random() < TOP_BREAD_SPAWN_CHANCE
  ) {
    return getTopBreadItem()
  }

  if (Math.random() < YUCK_SPAWN_CHANCE) {
    return pickRandomExcluding(YUCK_ITEMS, lastItemId)
  }

  return pickRandomExcluding(GOOD_ITEMS, lastItemId)
}
