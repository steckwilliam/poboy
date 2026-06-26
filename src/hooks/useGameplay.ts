import { useCallback, useEffect, useRef, useState } from 'react'
import { DRESSED_BONUS_POINTS, DRESSED_POPUP_DURATION_MS } from '../constants/dressed'
import { getRoundFallSpeedMultiplier, TOP_BREAD_BONUS_POINTS, TOP_BREAD_ID } from '../constants/gameplay'
import {
  BOTTOM_BREAD_DISPLAY_WIDTH,
  BREAD_MOVE_SPEED,
  ITEM_FALL_SPEED,
  PLAYABLE_WIDTH,
  STACK_LAYER_HEIGHT,
} from '../constants/gameLayout'
import { getItemById } from '../data/items'
import type { FallingItem, GameplaySimState, StackLayer } from '../types/game'
import { checkCatchCollision, getCatchZone } from '../utils/collision'
import {
  hasAllDressedIngredients,
  isDressedRequiredItem,
} from '../utils/dressed'
import {
  addItemScore,
  isStackTooTall,
  isYuckLimitReached,
  MAX_INGREDIENTS_BEFORE_TOO_TALL,
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
  onRoundComplete: (score: number, completedStack: StackLayer[]) => void
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
  const [showDressedPopup, setShowDressedPopup] = useState(false)
  const dressedPopupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [, setTick] = useState(0)

  useEffect(() => {
    return () => {
      if (dressedPopupTimerRef.current) {
        clearTimeout(dressedPopupTimerRef.current)
      }
    }
  }, [])

  const triggerDressedCelebration = useCallback(() => {
    setShowDressedPopup(true)
    if (dressedPopupTimerRef.current) {
      clearTimeout(dressedPopupTimerRef.current)
    }
    dressedPopupTimerRef.current = setTimeout(() => {
      setShowDressedPopup(false)
      dressedPopupTimerRef.current = null
    }, DRESSED_POPUP_DURATION_MS)
  }, [])

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
    (score: number, completedStack: StackLayer[]) => {
      stopGameplay()
      onRoundCompleteRef.current(score, completedStack)
    },
    [stopGameplay],
  )

  const spawnNextItem = useCallback((s: GameplaySimState) => {
    s.fallingItem = createFallingItem(s.stack.length, s.lastSpawnItemId)
    s.lastSpawnItemId = s.fallingItem.itemId
  }, [])

  const handleCatch = useCallback(
    (s: GameplaySimState, item: FallingItem) => {
      const gameItem = getItemById(item.itemId)
      if (!gameItem) return

      if (gameItem.id === TOP_BREAD_ID) {
        s.stack.push({ id: createStackLayerId(), itemId: TOP_BREAD_ID })
        s.fallingItem = null
        s.score += TOP_BREAD_BONUS_POINTS
        const completedStack = s.stack.map((layer) => ({ ...layer }))
        stopGameplay()
        setTick((t) => t + 1)
        requestAnimationFrame(() => {
          triggerRoundComplete(s.score, completedStack)
        })
        return
      }

      if (gameItem.category === 'good') {
        s.score = addItemScore(s.score, gameItem)
        s.stack.push({ id: createStackLayerId(), itemId: gameItem.id })

        if (
          !s.dressedBonusAwarded &&
          isDressedRequiredItem(gameItem.id) &&
          !s.dressedIngredients.has(gameItem.id)
        ) {
          s.dressedIngredients.add(gameItem.id)

          if (hasAllDressedIngredients(s.dressedIngredients)) {
            s.dressedAchieved = true
            s.dressedBonusAwarded = true
            s.score += DRESSED_BONUS_POINTS
            triggerDressedCelebration()
          }
        }

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
    [triggerGameOver, triggerRoundComplete, triggerDressedCelebration, stopGameplay],
  )

  const handleUpdate = useCallback(
    (deltaMs: number) => {
      const s = stateRef.current
      if (!s.isRunning || s.isPaused) return

      s.gameTimeMs += deltaMs

      const keys = keysPressed.current
      let dx = 0
      if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) {
        dx -= BREAD_MOVE_SPEED * deltaMs
      }
      if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) {
        dx += BREAD_MOVE_SPEED * deltaMs
      }

      s.breadX = Math.max(
        0,
        Math.min(PLAYABLE_WIDTH - BOTTOM_BREAD_DISPLAY_WIDTH, s.breadX + dx),
      )

      if (s.fallingItem) {
        const item = s.fallingItem
        const fallSpeed =
          ITEM_FALL_SPEED * getRoundFallSpeedMultiplier(s.round)
        item.y += fallSpeed * deltaMs

        const catchZone = getCatchZone(s.breadX, s.stack.length)
        const gameItem = getItemById(item.itemId)

        if (gameItem && checkCatchCollision(item, catchZone, gameItem)) {
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

  return {
    score: sim.score,
    yuckCount: sim.yuckCount,
    round: sim.round,
    breadX: sim.breadX,
    stackLayerHeight: STACK_LAYER_HEIGHT,
    fallingItem: sim.fallingItem,
    stack: sim.stack,
    gameTimeMs: sim.gameTimeMs,
    dressedAchieved: sim.dressedAchieved,
    showDressedPopup,
    isPaused,
    isRunning,
    togglePause,
    maxStackLayers: MAX_INGREDIENTS_BEFORE_TOO_TALL,
  }
}
