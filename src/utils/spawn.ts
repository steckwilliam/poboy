import {
  GAME_FRAME_HEIGHT,
  INITIAL_PLATE_X,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  PLAYABLE_WIDTH,
} from '../constants/gameLayout'
import type { FallingItem, GameItem, GameplaySimState } from '../types/game'
import { pickRandomSpawnItem } from './random'

let fallingIdCounter = 0
let stackIdCounter = 0

export function resetSpawnCounters(): void {
  fallingIdCounter = 0
  stackIdCounter = 0
}

export function createFallingItem(
  stackLayerCount: number,
  item?: GameItem,
): FallingItem {
  const spawnItem = item ?? pickRandomSpawnItem(stackLayerCount)
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
    plateX: INITIAL_PLATE_X,
    fallingItem: createFallingItem(0),
    stack: [],
    isPaused: false,
    isRunning: true,
  }
}
