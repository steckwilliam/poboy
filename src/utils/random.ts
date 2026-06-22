import { GOOD_ITEMS, YUCK_ITEMS } from '../data/items'
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

/**
 * Random spawn picker — good and yuck items only.
 * TODO: top bread special item will end the round when caught (not implemented yet).
 */
export function pickRandomSpawnItem(): GameItem {
  const roll = Math.random()
  if (roll < 0.22) return pickRandom(YUCK_ITEMS)
  return pickRandom(GOOD_ITEMS)
}
