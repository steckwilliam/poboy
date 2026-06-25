import { TEST_SPAWN_ITEM_ID } from '../constants/gameplay'
import {
  GAME_FRAME_HEIGHT,
  INITIAL_BREAD_X,
  PLAYABLE_WIDTH,
} from '../constants/gameLayout'
import { getItemById } from '../data/items'
import type { FallingItem, GameItem, GameplaySimState } from '../types/game'
import { getFallingItemVisualSize } from './fallingItem'
import { createDressedIngredientSet } from './dressed'
import { pickRandomSpawnItem } from './random'

let fallingIdCounter = 0
let stackIdCounter = 0

export function resetSpawnCounters(): void {
  fallingIdCounter = 0
  stackIdCounter = 0
}

function pickSpawnItem(stackLayerCount: number, item?: GameItem): GameItem {
  if (item) return item

  if (TEST_SPAWN_ITEM_ID) {
    const testItem = getItemById(TEST_SPAWN_ITEM_ID)
    if (testItem) return testItem
  }

  return pickRandomSpawnItem(stackLayerCount)
}

export function createFallingItem(
  stackLayerCount: number,
  item?: GameItem,
): FallingItem {
  const spawnItem = pickSpawnItem(stackLayerCount, item)
  const visual = getFallingItemVisualSize(spawnItem)

  return {
    id: `falling-${++fallingIdCounter}`,
    itemId: spawnItem.id,
    x: Math.random() * (PLAYABLE_WIDTH - visual.width),
    y: -visual.height,
    swayPhase: Math.random() * Math.PI * 2,
  }
}

export function createStackLayerId(): string {
  return `stack-${++stackIdCounter}`
}

export function isItemOffScreen(item: FallingItem): boolean {
  return item.y > GAME_FRAME_HEIGHT
}

export interface GameplayInitOptions {
  score?: number
  round?: number
}

export function createGameplayState(
  options: GameplayInitOptions = {},
): GameplaySimState {
  resetSpawnCounters()
  return {
    score: options.score ?? 0,
    yuckCount: 0,
    round: options.round ?? 1,
    breadX: INITIAL_BREAD_X,
    fallingItem: createFallingItem(0),
    stack: [],
    isPaused: false,
    isRunning: true,
    gameTimeMs: 0,
    dressedIngredients: createDressedIngredientSet(),
    dressedAchieved: false,
    dressedBonusAwarded: false,
  }
}
