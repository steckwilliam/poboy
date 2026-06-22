export type Screen =
  | 'start'
  | 'instructions'
  | 'gameplay'
  | 'roundComplete'
  | 'gameOver'

export type ItemCategory = 'good' | 'yuck' | 'special'

export interface GameItem {
  id: string
  label: string
  category: ItemCategory
  points: number
  placeholderColor: string
  placeholderEmoji: string
  futureImagePath: string
}

export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export interface FallingItem extends BoundingBox {
  id: string
  itemId: string
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
  plateX: number
  fallingItem: FallingItem | null
  stack: StackLayer[]
  isPaused: boolean
  isRunning: boolean
}

export interface GameActions {
  onPause: () => void
  onQuit: () => void
  onRoundComplete: () => void
  onGameOver: (score: number) => void
}
