import { GOOD_ITEMS, ITEMS, YUCK_ITEMS } from '../data/items'
import type { GameItem } from '../types/game'

/** Pick a random element from an array */
export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

/** Placeholder: select a random good ingredient */
export function pickRandomGoodItem(): GameItem {
  return pickRandom(GOOD_ITEMS)
}

/** Placeholder: select a random yuck item */
export function pickRandomYuckItem(): GameItem {
  return pickRandom(YUCK_ITEMS)
}

/**
 * Placeholder: weighted random item selection for spawning.
 * Future: adjust weights by round, yuck meter, and special bread timing.
 */
export function pickRandomSpawnItem(): GameItem {
  const roll = Math.random()
  if (roll < 0.15) return pickRandom(YUCK_ITEMS)
  if (roll < 0.18) return ITEMS.find((i) => i.id === 'top-bread')!
  return pickRandom(GOOD_ITEMS)
}
