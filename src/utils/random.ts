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
 * Top bread only rolls when stack has at least MIN_STACK_FOR_TOP_BREAD good layers.
 */
export function pickRandomSpawnItem(stackLayerCount: number): GameItem {
  if (
    stackLayerCount >= MIN_STACK_FOR_TOP_BREAD &&
    Math.random() < TOP_BREAD_SPAWN_CHANCE
  ) {
    return getTopBreadItem()
  }

  if (Math.random() < YUCK_SPAWN_CHANCE) {
    return pickRandom(YUCK_ITEMS)
  }

  return pickRandom(GOOD_ITEMS)
}
