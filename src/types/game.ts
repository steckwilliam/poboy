export type Screen =
  | 'start'
  | 'instructions'
  | 'gameplay'
  | 'roundComplete'
  | 'gameOver'

export type ItemCategory = 'good' | 'yuck' | 'special'

/** Per-item visual tuning for sandwich stack rendering (does not affect collision). */
export interface StackRenderSettings {
  /** How wide the layer appears on the sandwich */
  width?: number
  /** Layer height; derived from width + image aspect ratio when omitted */
  height?: number
  /** Moves only this layer left (negative) or right (positive) */
  offsetX?: number
  /** Moves only this layer up (negative) or down (positive) */
  offsetY?: number
  /** How much the next layer visually overlaps this one */
  overlap?: number
}

/** Per-item visual tuning for falling sprites (does not affect collision). */
export interface FallingRenderSettings {
  width?: number
  /** Derived from width + image aspect ratio when omitted */
  height?: number
  /** Moves only this falling sprite left (negative) or right (positive) */
  offsetX?: number
  /** Moves only this falling sprite up (negative) or down (positive) */
  offsetY?: number
}

/** Per-item visual tuning for fixed bottom bread on the playfield (does not affect collision). */
export interface PlateRenderSettings {
  width?: number
  /** Derived from width + image aspect ratio when omitted */
  height?: number
  offsetX?: number
  /** Positive moves the sprite down toward the bottom margin */
  offsetY?: number
}

export interface GameItem {
  id: string
  label: string
  category: ItemCategory
  points: number
  placeholderColor: string
  placeholderEmoji: string
  futureImagePath: string
  /** Optional sprite shown while the item is falling */
  fallingImagePath?: string
  /** Optional sprite shown when the item is stacked on the sandwich */
  stackImagePath?: string
  /** Optional sprite for the player bottom bread */
  plateImagePath?: string
  /** Visual falling sprite tuning — does not affect collision */
  fallingRender?: FallingRenderSettings
  /**
   * Visual stack tuning — does not affect collision.
   * stackRender.width controls how wide the layer appears on the sandwich.
   * stackRender.offsetX moves only this layer left/right.
   * stackRender.offsetY moves only this layer up/down.
   * stackRender.overlap controls how much the next layers visually overlap.
   */
  stackRender?: StackRenderSettings
  /** Visual bottom bread tuning — does not affect collision */
  plateRender?: PlateRenderSettings
}

export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export interface FallingItem {
  id: string
  itemId: string
  /** Top-left of the visible sprite (placeholder block or image) */
  x: number
  y: number
  /** Random phase offset so items do not sway in sync */
  swayPhase: number
}

export interface Plate extends BoundingBox {}

export interface StackLayer {
  id: string
  itemId: string
}

export interface GameplaySimState {
  score: number
  yuckCount: number
  round: number
  breadX: number
  fallingItem: FallingItem | null
  stack: StackLayer[]
  isPaused: boolean
  isRunning: boolean
  /** Elapsed gameplay time in ms — pauses with the game loop */
  gameTimeMs: number
  /** Dressing ingredients collected this round (for DRESSED! bonus) */
  dressedIngredients: Set<string>
  /** True once all dressing ingredients have been collected this round */
  dressedAchieved: boolean
  /** True once the +100 DRESSED! bonus has been awarded this round */
  dressedBonusAwarded: boolean
}

export interface GameActions {
  onPause: () => void
  onQuit: () => void
  onRoundComplete: () => void
  onGameOver: (score: number) => void
}
