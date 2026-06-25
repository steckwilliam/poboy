import { BOTTOM_BREAD, getItemById } from '../data/items'
import type { StackLayer } from '../types/game'
import { getBottomBreadDisplaySize } from '../utils/breadItem'
import {
  getSandwichPreviewDisplaySize,
  getSandwichPreviewLayout,
  SANDWICH_PREVIEW_DISPLAY_SCALE,
} from '../utils/sandwichPreviewLayout'
import {
  getStackDisplaySize,
  getStackLayerLeft,
  getStackLayerTop,
} from '../utils/stackItem'

interface SandwichPreviewProps {
  stack: StackLayer[]
  className?: string
}

export function SandwichPreview({ stack, className }: SandwichPreviewProps) {
  const layout = getSandwichPreviewLayout(stack)
  const displaySize = getSandwichPreviewDisplaySize(stack)
  const bottomBreadDisplay = getBottomBreadDisplaySize(BOTTOM_BREAD)
  const bottomBreadOffsetX = BOTTOM_BREAD.plateRender?.offsetX ?? 0

  return (
    <div
      className={['sandwich-preview', className].filter(Boolean).join(' ')}
      style={{
        width: `${displaySize.width}px`,
        height: `${displaySize.height}px`,
      }}
      role="img"
      aria-label="Completed po' boy preview"
    >
      <div
        className="sandwich-preview__inner"
        style={{
          width: `${layout.innerWidth}px`,
          height: `${layout.innerHeight}px`,
          transform: `scale(${SANDWICH_PREVIEW_DISPLAY_SCALE})`,
        }}
      >
        {BOTTOM_BREAD.plateImagePath && (
          <div
            className="sandwich-preview__bread"
            style={{
              left: `${layout.breadCenterX + bottomBreadOffsetX}px`,
              top: `${layout.breadY}px`,
              width: `${bottomBreadDisplay.width}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <img
              className="sandwich-preview__bread-img"
              src={BOTTOM_BREAD.plateImagePath}
              alt=""
              draggable={false}
            />
          </div>
        )}

        {stack.map((layer, index) => {
          const item = getItemById(layer.itemId)
          if (!item) return null
          const stackImagePath = item.stackImagePath
          const displaySize = getStackDisplaySize(item, layout.stackAnchorWidth)
          const offsetX = item.stackRender?.offsetX ?? 0
          const layerTop = getStackLayerTop(
            layout.breadY,
            stack,
            index,
            layout.stackAnchorWidth,
          )

          if (stackImagePath) {
            return (
              <div
                key={layer.id}
                className="sandwich-preview__layer sandwich-preview__layer--image"
                style={{
                  left: `${layout.breadCenterX + offsetX}px`,
                  top: `${layerTop}px`,
                  width: `${displaySize.width}px`,
                  transform: 'translateX(-50%)',
                }}
              >
                <img
                  className="sandwich-preview__layer-img"
                  src={stackImagePath}
                  alt=""
                  draggable={false}
                />
              </div>
            )
          }

          const layerLeft = getStackLayerLeft(
            layout.breadCenterX,
            item,
            layout.stackAnchorWidth,
          )
          return (
            <div
              key={layer.id}
              className="sandwich-preview__layer sandwich-preview__layer--placeholder"
              style={{
                left: `${layerLeft}px`,
                top: `${layerTop}px`,
                width: `${displaySize.width}px`,
                height: `${displaySize.height}px`,
                backgroundColor: item.placeholderColor,
              }}
            >
              <span className="sandwich-preview__layer-emoji" aria-hidden="true">
                {item.placeholderEmoji}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
