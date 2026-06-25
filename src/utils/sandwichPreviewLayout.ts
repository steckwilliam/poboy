import { BOTTOM_BREAD } from '../data/items'
import type { StackLayer } from '../types/game'
import { getBottomBreadDisplaySize } from './breadItem'
import { getStackLayerTop } from './stackItem'

const PREVIEW_BOTTOM_MARGIN = 4
const PREVIEW_TOP_PADDING = 8

/** Layout box for a scaled sandwich preview (logical pixels). */
export function getSandwichPreviewLayout(stack: StackLayer[]): {
  innerWidth: number
  innerHeight: number
  breadY: number
  breadCenterX: number
  stackAnchorWidth: number
} {
  const stackAnchorWidth = getBottomBreadDisplaySize(BOTTOM_BREAD).width
  const bottomBread = getBottomBreadDisplaySize(BOTTOM_BREAD)

  let innerHeight = 160
  let breadY = innerHeight - bottomBread.height - PREVIEW_BOTTOM_MARGIN

  let minTop = breadY
  for (let i = 0; i < stack.length; i++) {
    minTop = Math.min(minTop, getStackLayerTop(breadY, stack, i, stackAnchorWidth))
  }

  const requiredHeight =
    breadY + bottomBread.height + PREVIEW_BOTTOM_MARGIN - minTop + PREVIEW_TOP_PADDING
  innerHeight = Math.max(100, Math.ceil(requiredHeight))
  breadY = innerHeight - bottomBread.height - PREVIEW_BOTTOM_MARGIN

  return {
    innerWidth: stackAnchorWidth,
    innerHeight,
    breadY,
    breadCenterX: stackAnchorWidth / 2,
    stackAnchorWidth,
  }
}

/** Scale factor from logical preview canvas to on-screen preview size. */
export const SANDWICH_PREVIEW_DISPLAY_SCALE = 0.62

export function getSandwichPreviewDisplaySize(stack: StackLayer[]): {
  width: number
  height: number
} {
  const layout = getSandwichPreviewLayout(stack)
  return {
    width: Math.round(layout.innerWidth * SANDWICH_PREVIEW_DISPLAY_SCALE),
    height: Math.round(layout.innerHeight * SANDWICH_PREVIEW_DISPLAY_SCALE),
  }
}
