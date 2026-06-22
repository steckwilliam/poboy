import type { FallingItem, Plate } from '../types/game'

export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

/** Check if two axis-aligned bounding boxes overlap */
export function boxesOverlap(a: BoundingBox, b: BoundingBox): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  )
}

/** Placeholder: detect if a falling item collides with the plate */
export function checkPlateCollision(
  item: FallingItem,
  plate: Plate,
): boolean {
  return boxesOverlap(item, plate)
}

// Future: check collision with stack top, screen bounds, max height, etc.
