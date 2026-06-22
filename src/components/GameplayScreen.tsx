import {
  toFramePercentHeight,
  toFramePercentY,
  toPlayAreaPercentWidth,
  toPlayAreaPercentX,
} from '../constants/gameLayout'
import { BOTTOM_BREAD, getItemById } from '../data/items'
import { useGameplay } from '../hooks/useGameplay'
import { MAX_YUCK_COUNT, yuckMeterPercent } from '../utils/scoring'
import { GameFrame } from './GameFrame'
import { HUD } from './HUD'

interface GameplayScreenProps {
  onGameOver: (score: number) => void
  onQuit: () => void
}

export function GameplayScreen({ onGameOver, onQuit }: GameplayScreenProps) {
  const {
    score,
    yuckCount,
    round,
    plateX,
    plateY,
    plateWidth,
    plateHeight,
    breadWidth,
    breadHeight,
    stackLayerHeight,
    fallingItem,
    stack,
    isPaused,
    togglePause,
  } = useGameplay({ onGameOver })

  const breadX = plateX + (plateWidth - breadWidth) / 2
  const breadY = plateY - breadHeight

  return (
    <GameFrame className="game-frame--gameplay">
      <div className="gameplay-screen__play-area" role="img" aria-label="Game playfield">
        {/*
          Future sprite images: public/assets/sprites/
          e.g. plate.png, bottom-bread.png, fried-shrimp.png
        */}

        {fallingItem && (() => {
          const item = getItemById(fallingItem.itemId)
          if (!item) return null
          return (
            <div
              className="game-sprite game-sprite--falling"
              style={{
                left: `${toPlayAreaPercentX(fallingItem.x)}%`,
                top: `${toFramePercentY(fallingItem.y)}%`,
                width: `${toPlayAreaPercentWidth(fallingItem.width)}%`,
                height: `${toFramePercentHeight(fallingItem.height)}%`,
                backgroundColor: item.placeholderColor,
              }}
            >
              <span className="game-sprite__emoji" aria-hidden="true">
                {item.placeholderEmoji}
              </span>
              <span className="game-sprite__label">{item.label}</span>
            </div>
          )
        })()}

        {stack.map((layer, index) => {
          const item = getItemById(layer.itemId)
          if (!item) return null
          const layerY = breadY - (index + 1) * stackLayerHeight
          const layerWidth = breadWidth * 0.92
          return (
            <div
              key={layer.id}
              className="game-sprite game-sprite--stack"
              style={{
                left: `${toPlayAreaPercentX(plateX + (plateWidth - layerWidth) / 2)}%`,
                top: `${toFramePercentY(layerY)}%`,
                width: `${toPlayAreaPercentWidth(layerWidth)}%`,
                height: `${toFramePercentHeight(stackLayerHeight)}%`,
                backgroundColor: item.placeholderColor,
              }}
            >
              <span className="game-sprite__emoji" aria-hidden="true">
                {item.placeholderEmoji}
              </span>
            </div>
          )
        })}

        <div
          className="game-sprite game-sprite--bread"
          style={{
            left: `${toPlayAreaPercentX(breadX)}%`,
            top: `${toFramePercentY(breadY)}%`,
            width: `${toPlayAreaPercentWidth(breadWidth)}%`,
            height: `${toFramePercentHeight(breadHeight)}%`,
            backgroundColor: BOTTOM_BREAD.placeholderColor,
          }}
        >
          <span className="game-sprite__emoji" aria-hidden="true">
            {BOTTOM_BREAD.placeholderEmoji}
          </span>
        </div>

        <div
          className="game-sprite game-sprite--plate"
          aria-label="Player plate"
          style={{
            left: `${toPlayAreaPercentX(plateX)}%`,
            top: `${toFramePercentY(plateY)}%`,
            width: `${toPlayAreaPercentWidth(plateWidth)}%`,
            height: `${toFramePercentHeight(plateHeight)}%`,
          }}
        >
          <span className="game-sprite__emoji" aria-hidden="true">🍽️</span>
        </div>
      </div>

      {isPaused && (
        <div className="gameplay-screen__pause-overlay" aria-live="polite">
          <span className="gameplay-screen__pause-text">Paused</span>
        </div>
      )}

      <HUD
        score={score}
        yuckCount={yuckCount}
        yuckMax={MAX_YUCK_COUNT}
        yuckPercent={yuckMeterPercent(yuckCount)}
        round={round}
        isPaused={isPaused}
        onPause={togglePause}
        onQuit={onQuit}
      />
    </GameFrame>
  )
}
