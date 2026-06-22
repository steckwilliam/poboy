import {
  GAME_FRAME_HEIGHT,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  PLAYABLE_WIDTH,
} from '../constants/gameLayout'
import type { FallingItem, GameItem } from '../types/game'
import { pickRandomSpawnItem } from './random'

let fallingIdCounter = 0
let stackIdCounter = 0

export function resetSpawnCounters(): void {
  fallingIdCounter = 0
  stackIdCounter = 0
}

export function createFallingItem(item?: GameItem): FallingItem {
  const spawnItem = item ?? pickRandomSpawnItem()
  return {
    id: `falling-${++fallingIdCounter}`,
    itemId: spawnItem.id,
    x: Math.random() * (PLAYABLE_WIDTH - ITEM_WIDTH),
    y: -ITEM_HEIGHT,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  }
}

export function createStackLayerId(): string {
  return `stack-${++stackIdCounter}`
}

export function isItemOffScreen(item: FallingItem): boolean {
  return item.y > GAME_FRAME_HEIGHT
}
