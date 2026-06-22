import { useCallback, useRef, useState } from 'react'
import {
  BREAD_HEIGHT,
  BREAD_WIDTH,
  getPlateY,
  INITIAL_PLATE_X,
  ITEM_FALL_SPEED,
  PLATE_HEIGHT,
  PLATE_SPEED,
  PLATE_WIDTH,
  PLAYABLE_WIDTH,
  STACK_LAYER_HEIGHT,
} from '../constants/gameLayout'
import { getItemById } from '../data/items'
import type { FallingItem, GameplaySimState } from '../types/game'
import { checkCatchCollision, getCatchZone } from '../utils/collision'
import {
  addItemScore,
  isStackTooTall,
  isYuckLimitReached,
  MAX_STACK_LAYERS,
} from '../utils/scoring'
import {
  createFallingItem,
  createStackLayerId,
  isItemOffScreen,
  resetSpawnCounters,
} from '../utils/spawn'
import { useGameLoop } from './useGameLoop'
import { useKeyboard } from './useKeyboard'

function createInitialState(): GameplaySimState {
  resetSpawnCounters()
  return {
    score: 0,
    yuckCount: 0,
    round: 1,
    plateX: INITIAL_PLATE_X,
    fallingItem: createFallingItem(),
    stack: [],
    isPaused: false,
    isRunning: true,
  }
}

interface UseGameplayOptions {
  onGameOver: (score: number) => void
}

export function useGameplay({ onGameOver }: UseGameplayOptions) {
  const stateRef = useRef<GameplaySimState>(createInitialState())
  const onGameOverRef = useRef(onGameOver)
  onGameOverRef.current = onGameOver

  const [isPaused, setIsPaused] = useState(false)
  const [isRunning, setIsRunning] = useState(true)
  const [, setTick] = useState(0)

  const keysPressed = useKeyboard(isRunning && !isPaused)

  const triggerGameOver = useCallback((score: number) => {
    const s = stateRef.current
    s.isRunning = false
    setIsRunning(false)
    onGameOverRef.current(score)
    setTick((t) => t + 1)
  }, [])

  const handleCatch = useCallback(
    (s: GameplaySimState, item: FallingItem) => {
      const gameItem = getItemById(item.itemId)
      if (!gameItem) return

      if (gameItem.category === 'good') {
        s.score = addItemScore(s.score, gameItem)
        s.stack.push({ id: createStackLayerId(), itemId: gameItem.id })

        if (isStackTooTall(s.stack.length)) {
          triggerGameOver(s.score)
          return
        }
      } else if (gameItem.category === 'yuck') {
        s.yuckCount += 1

        if (isYuckLimitReached(s.yuckCount)) {
          triggerGameOver(s.score)
          return
        }
      }

      // TODO: top bread — catching it should finish the round and navigate to Round Complete
    },
    [triggerGameOver],
  )

  const handleUpdate = useCallback(
    (deltaMs: number) => {
      const s = stateRef.current
      if (!s.isRunning || s.isPaused) return

      const keys = keysPressed.current
      let dx = 0
      if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) {
        dx -= PLATE_SPEED * deltaMs
      }
      if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) {
        dx += PLATE_SPEED * deltaMs
      }

      s.plateX = Math.max(0, Math.min(PLAYABLE_WIDTH - PLATE_WIDTH, s.plateX + dx))

      if (s.fallingItem) {
        const item = s.fallingItem
        item.y += ITEM_FALL_SPEED * deltaMs

        const catchZone = getCatchZone(s.plateX, s.stack.length)

        if (checkCatchCollision(item, catchZone)) {
          handleCatch(s, item)
          if (s.isRunning) {
            s.fallingItem = createFallingItem()
          }
        } else if (isItemOffScreen(item)) {
          s.fallingItem = createFallingItem()
        } else {
          s.fallingItem = item
        }
      } else if (s.isRunning) {
        s.fallingItem = createFallingItem()
      }

      setTick((t) => t + 1)
    },
    [handleCatch, keysPressed],
  )

  useGameLoop({
    onUpdate: handleUpdate,
    isRunning: isRunning && !isPaused,
  })

  const togglePause = useCallback(() => {
    const s = stateRef.current
    s.isPaused = !s.isPaused
    setIsPaused(s.isPaused)
    setTick((t) => t + 1)
  }, [])

  const sim = stateRef.current
  const plateY = getPlateY()

  return {
    score: sim.score,
    yuckCount: sim.yuckCount,
    round: sim.round,
    plateX: sim.plateX,
    plateY,
    plateWidth: PLATE_WIDTH,
    plateHeight: PLATE_HEIGHT,
    breadWidth: BREAD_WIDTH,
    breadHeight: BREAD_HEIGHT,
    stackLayerHeight: STACK_LAYER_HEIGHT,
    fallingItem: sim.fallingItem,
    stack: sim.stack,
    isPaused,
    isRunning,
    togglePause,
    maxStackLayers: MAX_STACK_LAYERS,
  }
}
