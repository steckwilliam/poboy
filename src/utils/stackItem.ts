import {
  DEFAULT_STACK_LAYER_HEIGHT,
  DEFAULT_STACK_OVERLAP,
  DEFAULT_STACK_SPRITE_ASPECT,
  DEFAULT_STACK_SPRITE_WIDTH,
  FIRST_LAYER_OVERLAP_WITH_BREAD,
  PLACEHOLDER_STACK_WIDTH_RATIO,
} from '../constants/gameLayout'
import { getItemById } from '../data/items'
import type { GameItem, StackLayer } from '../types/game'

/** Logical display size for a stacked layer (visual only — not used for collision). */
export function getStackDisplaySize(
  gameItem: GameItem,
  breadWidth: number,
): { width: number; height: number } {
  if (gameItem.stackImagePath) {
    const width = gameItem.stackRender?.width ?? DEFAULT_STACK_SPRITE_WIDTH
    const height =
      gameItem.stackRender?.height ??
      Math.round(width * DEFAULT_STACK_SPRITE_ASPECT)
    return { width, height }
  }

  const width =
    gameItem.stackRender?.width ?? breadWidth * PLACEHOLDER_STACK_WIDTH_RATIO
  const height = gameItem.stackRender?.height ?? DEFAULT_STACK_LAYER_HEIGHT
  return { width, height }
}

/**
 * Top-left X for a stack layer, centered on the sandwich.
 * left = breadCenterX - layerDisplayWidth / 2 + offsetX
 */
export function getStackLayerLeft(
  breadCenterX: number,
  gameItem: GameItem,
  anchorWidth: number,
): number {
  const { width } = getStackDisplaySize(gameItem, anchorWidth)
  const offsetX = gameItem.stackRender?.offsetX ?? 0
  return breadCenterX - width / 2 + offsetX
}

/**
 * Top-left Y for a stack layer with per-item overlap tuning.
 * Layers stack upward from the bottom bread, slightly overlapping each other.
 */
export function getStackLayerTop(
  breadY: number,
  stack: StackLayer[],
  index: number,
  breadWidth: number,
): number {
  const gameItem = getItemById(stack[index].itemId)
  if (!gameItem) return breadY

  const { height } = getStackDisplaySize(gameItem, breadWidth)
  const offsetY = gameItem.stackRender?.offsetY ?? 0

  if (index === 0) {
    const layerBottom = breadY + FIRST_LAYER_OVERLAP_WITH_BREAD
    return layerBottom - height + offsetY
  }

  const prevTop = getStackLayerTop(breadY, stack, index - 1, breadWidth)
  const prevItem = getItemById(stack[index - 1].itemId)
  const overlap = prevItem?.stackRender?.overlap ?? DEFAULT_STACK_OVERLAP
  const layerBottom = prevTop + overlap

  return layerBottom - height
}
