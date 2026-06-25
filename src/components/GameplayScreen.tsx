import {
  BREAD_HEIGHT,
  BREAD_WIDTH,
  PLACEHOLDER_VISUAL_HEIGHT,
  PLACEHOLDER_VISUAL_WIDTH,
  toFramePercentHeight,
  toFramePercentY,
  toPlayAreaPercentWidth,
  toPlayAreaPercentX,
} from '../constants/gameLayout'
import { DRESSED_BURST_IMAGE } from '../constants/dressed'
import { SHOW_HITBOXES } from '../constants/gameplay'
import { BOTTOM_BREAD, getItemById } from '../data/items'
import { useGameplay } from '../hooks/useGameplay'
import {
  getBottomBreadDisplaySize,
  getBottomBreadTop,
  getBreadCenterX,
} from '../utils/breadItem'
import { getCatchZone } from '../utils/collision'
import { getFallingItemHitbox, getFallingItemVisualSize } from '../utils/fallingItem'
import { getFallingItemSwayRotation } from '../utils/fallingItemSway'
import { MAX_YUCK_COUNT, yuckMeterPercent } from '../utils/scoring'
import {
  getStackDisplaySize,
  getStackLayerLeft,
  getStackLayerTop,
} from '../utils/stackItem'
import { GameFrame } from './GameFrame'
import { HUD } from './HUD'
import type { StackLayer } from '../types/game'

interface GameplayScreenProps {
  initialScore: number
  initialRound: number
  onGameOver: (score: number) => void
  onRoundComplete: (score: number, completedStack: StackLayer[]) => void
  onQuit: () => void
}

export function GameplayScreen({
  initialScore,
  initialRound,
  onGameOver,
  onRoundComplete,
  onQuit,
}: GameplayScreenProps) {
  const {
    score,
    yuckCount,
    round,
    breadX,
    fallingItem,
    stack,
    gameTimeMs,
    dressedAchieved,
    showDressedPopup,
    isPaused,
    togglePause,
  } = useGameplay({
    initialScore,
    initialRound,
    onGameOver,
    onRoundComplete,
  })

  const bottomBreadDisplay = getBottomBreadDisplaySize(BOTTOM_BREAD)
  const breadCenterX = getBreadCenterX(breadX, bottomBreadDisplay.width)
  const bottomBreadOffsetX = BOTTOM_BREAD.plateRender?.offsetX ?? 0
  const breadY = getBottomBreadTop(BOTTOM_BREAD)
  const stackAnchorWidth = bottomBreadDisplay.width

  return (
    <GameFrame className="game-frame--gameplay">
      <div className="gameplay-screen__play-area" role="img" aria-label="Game playfield">
        {fallingItem && (() => {
          const item = getItemById(fallingItem.itemId)
          if (!item) return null
          const fallingImagePath = item.fallingImagePath
          const fallingSize = getFallingItemVisualSize(item)
          const fallingOffsetX = item.fallingRender?.offsetX ?? 0
          const fallingOffsetY = item.fallingRender?.offsetY ?? 0
          const swayRotation = getFallingItemSwayRotation(
            gameTimeMs,
            fallingItem.swayPhase,
          )
          return (
            <div
              className={[
                'game-sprite',
                'game-sprite--falling',
                fallingImagePath && 'game-sprite--falling-image',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{
                left: `${toPlayAreaPercentX(fallingItem.x + fallingOffsetX)}%`,
                top: `${toFramePercentY(fallingItem.y + fallingOffsetY)}%`,
                transform: `rotate(${swayRotation}deg)`,
                ...(fallingImagePath
                  ? {
                      width: `${toPlayAreaPercentWidth(fallingSize.width)}%`,
                    }
                  : {
                      width: `${toPlayAreaPercentWidth(PLACEHOLDER_VISUAL_WIDTH)}%`,
                      height: `${toFramePercentHeight(PLACEHOLDER_VISUAL_HEIGHT)}%`,
                      backgroundColor: item.placeholderColor,
                    }),
              }}
            >
              {fallingImagePath ? (
                <img
                  className="game-sprite__falling-img"
                  src={fallingImagePath}
                  alt={item.label}
                  draggable={false}
                />
              ) : (
                <>
                  <span className="game-sprite__emoji" aria-hidden="true">
                    {item.placeholderEmoji}
                  </span>
                  <span className="game-sprite__label">{item.label}</span>
                </>
              )}
            </div>
          )
        })()}

        {SHOW_HITBOXES &&
          fallingItem &&
          (() => {
            const item = getItemById(fallingItem.itemId)
            if (!item) return null
            const hitbox = getFallingItemHitbox(fallingItem, item)
            return (
              <div
                className="game-hitbox-debug game-hitbox-debug--falling"
                aria-hidden="true"
                style={{
                  left: `${toPlayAreaPercentX(hitbox.x)}%`,
                  top: `${toFramePercentY(hitbox.y)}%`,
                  width: `${toPlayAreaPercentWidth(hitbox.width)}%`,
                  height: `${toFramePercentHeight(hitbox.height)}%`,
                }}
              />
            )
          })()}

        {SHOW_HITBOXES &&
          (() => {
            const catchZone = getCatchZone(breadX, stack.length)
            return (
              <div
                className="game-hitbox-debug game-hitbox-debug--catch"
                aria-hidden="true"
                style={{
                  left: `${toPlayAreaPercentX(catchZone.x)}%`,
                  top: `${toFramePercentY(catchZone.y)}%`,
                  width: `${toPlayAreaPercentWidth(catchZone.width)}%`,
                  height: `${toFramePercentHeight(catchZone.height)}%`,
                }}
              />
            )
          })()}

        {stack.map((layer, index) => {
          const item = getItemById(layer.itemId)
          if (!item) return null
          const stackImagePath = item.stackImagePath
          const displaySize = getStackDisplaySize(item, stackAnchorWidth)
          const offsetX = item.stackRender?.offsetX ?? 0
          const layerTop = getStackLayerTop(
            breadY,
            stack,
            index,
            stackAnchorWidth,
          )

          if (stackImagePath) {
            return (
              <div
                key={layer.id}
                className="game-sprite game-sprite--stack game-sprite--stack-image"
                style={{
                  left: `${toPlayAreaPercentX(breadCenterX + offsetX)}%`,
                  top: `${toFramePercentY(layerTop)}%`,
                  width: `${toPlayAreaPercentWidth(displaySize.width)}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <img
                  className="game-sprite__stack-img"
                  src={stackImagePath}
                  alt={item.label}
                  draggable={false}
                />
              </div>
            )
          }

          const layerLeft = getStackLayerLeft(
            breadCenterX,
            item,
            stackAnchorWidth,
          )
          return (
            <div
              key={layer.id}
              className="game-sprite game-sprite--stack"
              style={{
                left: `${toPlayAreaPercentX(layerLeft)}%`,
                top: `${toFramePercentY(layerTop)}%`,
                width: `${toPlayAreaPercentWidth(displaySize.width)}%`,
                height: `${toFramePercentHeight(displaySize.height)}%`,
                backgroundColor: item.placeholderColor,
              }}
            >
              <span className="game-sprite__emoji" aria-hidden="true">
                {item.placeholderEmoji}
              </span>
            </div>
          )
        })}

        {BOTTOM_BREAD.plateImagePath ? (
          <div
            className="game-sprite game-sprite--bread game-sprite--bread-image"
            aria-label="Player sandwich base"
            style={{
              left: `${toPlayAreaPercentX(breadCenterX + bottomBreadOffsetX)}%`,
              top: `${toFramePercentY(breadY)}%`,
              width: `${toPlayAreaPercentWidth(bottomBreadDisplay.width)}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <img
              className="game-sprite__bread-img"
              src={BOTTOM_BREAD.plateImagePath}
              alt={BOTTOM_BREAD.label}
              draggable={false}
            />
          </div>
        ) : (
          <div
            className="game-sprite game-sprite--bread"
            aria-label="Player sandwich base"
            style={{
              left: `${toPlayAreaPercentX(breadCenterX - BREAD_WIDTH / 2)}%`,
              top: `${toFramePercentY(breadY)}%`,
              width: `${toPlayAreaPercentWidth(BREAD_WIDTH)}%`,
              height: `${toFramePercentHeight(BREAD_HEIGHT)}%`,
              backgroundColor: BOTTOM_BREAD.placeholderColor,
            }}
          >
            <span className="game-sprite__emoji" aria-hidden="true">
              {BOTTOM_BREAD.placeholderEmoji}
            </span>
          </div>
        )}
      </div>

      {showDressedPopup && (
        <div
          className="gameplay-screen__dressed-popup"
          role="status"
          aria-live="polite"
        >
          <img
            className="gameplay-screen__dressed-popup-img"
            src={DRESSED_BURST_IMAGE}
            alt="DRESSED! +100 bonus"
            draggable={false}
          />
        </div>
      )}

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
        dressedAchieved={dressedAchieved}
        isPaused={isPaused}
        onPause={togglePause}
        onQuit={onQuit}
      />
    </GameFrame>
  )
}
