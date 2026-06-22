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

export interface FallingItem {
  id: string
  itemId: string
  x: number
  y: number
  width: number
  height: number
}

export interface Plate {
  x: number
  y: number
  width: number
  height: number
}

export interface StackLayer {
  itemId: string
  y: number
}

export interface GameState {
  score: number
  yuckMeter: number
  round: number
  stackHeight: number
  plate: Plate
  fallingItems: FallingItem[]
  stack: StackLayer[]
  isPaused: boolean
  isRunning: boolean
}

export interface GameActions {
  onPause: () => void
  onQuit: () => void
  onRoundComplete: () => void
  onGameOver: () => void
}
