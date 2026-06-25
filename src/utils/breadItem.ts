import {
  BOTTOM_BREAD_DISPLAY_WIDTH,
  BREAD_BOTTOM_MARGIN,
  BREAD_SPRITE_ASPECT,
  GAME_FRAME_HEIGHT,
} from '../constants/gameLayout'
import type { GameItem } from '../types/game'

/** Shared horizontal center for bottom bread and all stack layers. */
export function getBreadCenterX(
  breadX: number,
  breadDisplayWidth: number,
): number {
  return breadX + breadDisplayWidth / 2
}

/** Logical display size for the bottom bread sprite (visual only). */
export function getBottomBreadDisplaySize(gameItem: GameItem): {
  width: number
  height: number
} {
  const width = gameItem.plateRender?.width ?? BOTTOM_BREAD_DISPLAY_WIDTH
  const height =
    gameItem.plateRender?.height ?? Math.round(width * BREAD_SPRITE_ASPECT)
  return { width, height }
}

/** Top Y for the bottom bread — visual anchor for ingredient stacking. */
export function getBottomBreadTop(gameItem: GameItem): number {
  const { height } = getBottomBreadDisplaySize(gameItem)
  const offsetY = gameItem.plateRender?.offsetY ?? 0
  return GAME_FRAME_HEIGHT - BREAD_BOTTOM_MARGIN - height + offsetY
}
