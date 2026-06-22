/** Logical game frame size (4:3) — all gameplay math uses these units */
export const GAME_FRAME_WIDTH = 960
export const GAME_FRAME_HEIGHT = 720

/** Right-side HUD width in logical pixels */
export const HUD_WIDTH = 148

/** Main playable area (excludes HUD) */
export const PLAYABLE_WIDTH = GAME_FRAME_WIDTH - HUD_WIDTH

export const PLATE_WIDTH = 130
export const PLATE_HEIGHT = 24
export const PLATE_BOTTOM_MARGIN = 48
export const PLATE_SPEED = 0.38

export const ITEM_WIDTH = 64
export const ITEM_HEIGHT = 52
export const ITEM_FALL_SPEED = 0.2

export const BREAD_WIDTH = 96
export const BREAD_HEIGHT = 32
export const STACK_LAYER_HEIGHT = 22

// Increase this to make catching easier.
// Decrease this to make catching stricter.
export const CATCH_FORGIVENESS_PX = 0

export const INITIAL_PLATE_X = (PLAYABLE_WIDTH - PLATE_WIDTH) / 2

export function getPlateY(): number {
  return GAME_FRAME_HEIGHT - PLATE_BOTTOM_MARGIN - PLATE_HEIGHT
}

export function toPlayAreaPercentX(px: number): number {
  return (px / PLAYABLE_WIDTH) * 100
}

export function toFramePercentY(px: number): number {
  return (px / GAME_FRAME_HEIGHT) * 100
}

export function toPlayAreaPercentWidth(px: number): number {
  return (px / PLAYABLE_WIDTH) * 100
}

export function toFramePercentHeight(px: number): number {
  return (px / GAME_FRAME_HEIGHT) * 100
}
