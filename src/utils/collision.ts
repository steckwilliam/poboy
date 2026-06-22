import {
  BREAD_HEIGHT,
  CATCH_FORGIVENESS_PX,
  getPlateY,
  PLATE_HEIGHT,
  PLATE_WIDTH,
  STACK_LAYER_HEIGHT,
} from '../constants/gameLayout'
import type { BoundingBox, FallingItem } from '../types/game'

/** Check if two axis-aligned bounding boxes overlap */
export function boxesOverlap(a: BoundingBox, b: BoundingBox): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  )
}

/** Catch zone around the plate and sandwich stack, expanded by CATCH_FORGIVENESS_PX */
export function getCatchZone(plateX: number, stackLayerCount: number): BoundingBox {
  const plateY = getPlateY()
  const stackHeight = BREAD_HEIGHT + stackLayerCount * STACK_LAYER_HEIGHT

  return {
    x: plateX - CATCH_FORGIVENESS_PX,
    y: plateY - stackHeight - CATCH_FORGIVENESS_PX,
    width: PLATE_WIDTH + CATCH_FORGIVENESS_PX * 2,
    height: PLATE_HEIGHT + stackHeight + CATCH_FORGIVENESS_PX,
  }
}

export function checkCatchCollision(
  item: FallingItem,
  catchZone: BoundingBox,
): boolean {
  return boxesOverlap(item, catchZone)
}
