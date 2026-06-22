import { useCallback } from 'react'
import { BOTTOM_BREAD } from '../data/items'
import { useGameLoop } from '../hooks/useGameLoop'
import { GameFrame } from './GameFrame'
import { HUD } from './HUD'

interface GameplayScreenProps {
  score: number
  yuckMeter: number
  round: number
  onPause: () => void
  onQuit: () => void
}

export function GameplayScreen({
  score,
  yuckMeter,
  round,
  onPause,
  onQuit,
}: GameplayScreenProps) {
  // Future: player movement, falling items, collisions, stack updates
  const handleUpdate = useCallback((_deltaMs: number) => {
    // Game loop tick — gameplay logic will go here
  }, [])

  useGameLoop({
    onUpdate: handleUpdate,
    isRunning: true,
  })

  return (
    <GameFrame className="game-frame--gameplay">
      <div className="gameplay-screen__play-area" role="img" aria-label="Game playfield">
        {/*
          Future sprite images: public/assets/sprites/
          e.g. plate.png, bottom-bread.png, fried-shrimp.png
        */}

        <div
          className="game-sprite game-sprite--falling"
          style={{ backgroundColor: '#f4a460' }}
        >
          <span className="game-sprite__emoji" aria-hidden="true">🍤</span>
          <span className="game-sprite__label">Fried Shrimp</span>
        </div>

        <div
          className="game-sprite game-sprite--bread"
          style={{ backgroundColor: BOTTOM_BREAD.placeholderColor }}
        >
          <span className="game-sprite__emoji" aria-hidden="true">
            {BOTTOM_BREAD.placeholderEmoji}
          </span>
          <span className="game-sprite__label">{BOTTOM_BREAD.label}</span>
        </div>

        <div className="game-sprite game-sprite--plate" aria-label="Player plate">
          <span className="game-sprite__emoji" aria-hidden="true">🍽️</span>
        </div>
      </div>

      <HUD
        score={score}
        yuckMeter={yuckMeter}
        round={round}
        onPause={onPause}
        onQuit={onQuit}
      />
    </GameFrame>
  )
}
