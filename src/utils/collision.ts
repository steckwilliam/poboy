import {
  BREAD_CATCH_HITBOX_HEIGHT,
  BREAD_CATCH_HITBOX_OFFSET_Y,
  BREAD_CATCH_HITBOX_WIDTH,
  CATCH_FORGIVENESS_PX,
  STACK_LAYER_HEIGHT,
} from '../constants/gameLayout'
import { BOTTOM_BREAD } from '../data/items'
import type { BoundingBox, FallingItem, GameItem } from '../types/game'
import {
  getBottomBreadDisplaySize,
  getBottomBreadTop,
  getBreadCenterX,
} from './breadItem'
import { getFallingItemHitbox } from './fallingItem'

/** Check if two axis-aligned bounding boxes overlap */
export function boxesOverlap(a: BoundingBox, b: BoundingBox): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  )
}

/** Catch zone around the bottom bread and sandwich stack (logical hitboxes only). */
export function getCatchZone(
  breadX: number,
  stackLayerCount: number,
): BoundingBox {
  const breadDisplay = getBottomBreadDisplaySize(BOTTOM_BREAD)
  const breadTop = getBottomBreadTop(BOTTOM_BREAD)
  const breadCenterX = getBreadCenterX(breadX, breadDisplay.width)
  const stackHeight = stackLayerCount * STACK_LAYER_HEIGHT

  return {
    x: breadCenterX - BREAD_CATCH_HITBOX_WIDTH / 2 - CATCH_FORGIVENESS_PX,
    y:
      breadTop +
      BREAD_CATCH_HITBOX_OFFSET_Y -
      stackHeight -
      CATCH_FORGIVENESS_PX,
    width: BREAD_CATCH_HITBOX_WIDTH + CATCH_FORGIVENESS_PX * 2,
    height: stackHeight + BREAD_CATCH_HITBOX_HEIGHT + CATCH_FORGIVENESS_PX,
  }
}

export function checkCatchCollision(
  item: FallingItem,
  catchZone: BoundingBox,
  gameItem: GameItem,
): boolean {
  return boxesOverlap(getFallingItemHitbox(item, gameItem), catchZone)
}
