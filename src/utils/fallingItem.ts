import {
  BREAD_SPRITE_ASPECT,
  FALLING_ITEM_HITBOX_HEIGHT,
  FALLING_ITEM_HITBOX_WIDTH,
  FALLING_SPRITE_DISPLAY_HEIGHT,
  FALLING_SPRITE_DISPLAY_WIDTH,
  PLACEHOLDER_VISUAL_HEIGHT,
  PLACEHOLDER_VISUAL_WIDTH,
} from '../constants/gameLayout'
import type { BoundingBox, FallingItem, GameItem } from '../types/game'

/** Logical display size for a falling item (visual only — not used for collision). */
export function getFallingItemVisualSize(gameItem: GameItem): {
  width: number
  height: number
} {
  if (gameItem.fallingImagePath) {
    const width =
      gameItem.fallingRender?.width ?? FALLING_SPRITE_DISPLAY_WIDTH
    const height =
      gameItem.fallingRender?.height ??
      (gameItem.fallingRender?.width !== undefined
        ? Math.round(width * BREAD_SPRITE_ASPECT)
        : FALLING_SPRITE_DISPLAY_HEIGHT)
    return { width, height }
  }

  return {
    width: PLACEHOLDER_VISUAL_WIDTH,
    height: PLACEHOLDER_VISUAL_HEIGHT,
  }
}

/** Consistent catch hitbox centered on the item's visual bounds. */
export function getFallingItemHitbox(
  fallingItem: Pick<FallingItem, 'x' | 'y' | 'itemId'>,
  gameItem: GameItem,
): BoundingBox {
  const visual = getFallingItemVisualSize(gameItem)

  return {
    x: fallingItem.x + visual.width / 2 - FALLING_ITEM_HITBOX_WIDTH / 2,
    y: fallingItem.y + visual.height / 2 - FALLING_ITEM_HITBOX_HEIGHT / 2,
    width: FALLING_ITEM_HITBOX_WIDTH,
    height: FALLING_ITEM_HITBOX_HEIGHT,
  }
}
