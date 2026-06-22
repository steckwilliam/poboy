import { useCallback, useRef, useState } from 'react'
import { getRoundFallSpeedMultiplier, TOP_BREAD_BONUS_POINTS, TOP_BREAD_ID } from '../constants/gameplay'
import {
  BREAD_HEIGHT,
  BREAD_WIDTH,
  getPlateY,
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
  createGameplayState,
  createStackLayerId,
  isItemOffScreen,
} from '../utils/spawn'
import { useGameLoop } from './useGameLoop'
import { useKeyboard } from './useKeyboard'

interface UseGameplayOptions {
  initialScore: number
  initialRound: number
  onGameOver: (score: number) => void
  onRoundComplete: (score: number) => void
}

export function useGameplay({
  initialScore,
  initialRound,
  onGameOver,
  onRoundComplete,
}: UseGameplayOptions) {
  const stateRef = useRef<GameplaySimState>(
    createGameplayState({ score: initialScore, round: initialRound }),
  )
  const onGameOverRef = useRef(onGameOver)
  const onRoundCompleteRef = useRef(onRoundComplete)
  onGameOverRef.current = onGameOver
  onRoundCompleteRef.current = onRoundComplete

  const [isPaused, setIsPaused] = useState(false)
  const [isRunning, setIsRunning] = useState(true)
  const [, setTick] = useState(0)

  const keysPressed = useKeyboard(isRunning && !isPaused)

  const stopGameplay = useCallback(() => {
    const s = stateRef.current
    s.isRunning = false
    setIsRunning(false)
    setTick((t) => t + 1)
  }, [])

  const triggerGameOver = useCallback(
    (score: number) => {
      stopGameplay()
      onGameOverRef.current(score)
    },
    [stopGameplay],
  )

  const triggerRoundComplete = useCallback(
    (score: number) => {
      stopGameplay()
      onRoundCompleteRef.current(score)
    },
    [stopGameplay],
  )

  const spawnNextItem = useCallback((s: GameplaySimState) => {
    s.fallingItem = createFallingItem(s.stack.length)
  }, [])

  const handleCatch = useCallback(
    (s: GameplaySimState, item: FallingItem) => {
      const gameItem = getItemById(item.itemId)
      if (!gameItem) return

      if (gameItem.id === TOP_BREAD_ID) {
        s.score += TOP_BREAD_BONUS_POINTS
        triggerRoundComplete(s.score)
        return
      }

      if (gameItem.category === 'good') {
        s.score = addItemScore(s.score, gameItem)
        s.stack.push({ id: createStackLayerId(), itemId: gameItem.id })

        if (isStackTooTall(s.stack.length)) {
          triggerGameOver(s.score)
        }
      } else if (gameItem.category === 'yuck') {
        s.yuckCount += 1

        if (isYuckLimitReached(s.yuckCount)) {
          triggerGameOver(s.score)
        }
      }
    },
    [triggerGameOver, triggerRoundComplete],
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
        const fallSpeed =
          ITEM_FALL_SPEED * getRoundFallSpeedMultiplier(s.round)
        item.y += fallSpeed * deltaMs

        const catchZone = getCatchZone(s.plateX, s.stack.length)

        if (checkCatchCollision(item, catchZone)) {
          handleCatch(s, item)
          if (s.isRunning) {
            spawnNextItem(s)
          }
        } else if (isItemOffScreen(item)) {
          spawnNextItem(s)
        } else {
          s.fallingItem = item
        }
      } else if (s.isRunning) {
        spawnNextItem(s)
      }

      setTick((t) => t + 1)
    },
    [handleCatch, keysPressed, spawnNextItem],
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
