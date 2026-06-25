/** Logical game frame size (4:3) — all gameplay math uses these units */
export const GAME_FRAME_WIDTH = 960
export const GAME_FRAME_HEIGHT = 720

/** Right-side HUD width in logical pixels */
export const HUD_WIDTH = 148

/** Main playable area (excludes HUD) */
export const PLAYABLE_WIDTH = GAME_FRAME_WIDTH - HUD_WIDTH

/** Left/right movement speed for the bottom bread */
export const BREAD_MOVE_SPEED = 0.38

/** Distance from bottom of frame to bottom of bread sprite */
export const BREAD_BOTTOM_MARGIN = 48

/** Visual size for placeholder falling items (emoji/block) */
export const PLACEHOLDER_VISUAL_WIDTH = 64
export const PLACEHOLDER_VISUAL_HEIGHT = 52

/** Logical catch hitbox — same for every falling item regardless of sprite size */
export const FALLING_ITEM_HITBOX_WIDTH = 70
export const FALLING_ITEM_HITBOX_HEIGHT = 70

/**
 * Bottom bread display width — visual size only, does not affect collision.
 * Tune how wide the player bread appears on screen.
 */
export const BOTTOM_BREAD_DISPLAY_WIDTH = 270

/** Top bread falling sprite display width — visual only */
export const TOP_BREAD_FALLING_DISPLAY_WIDTH = 200

/** Top bread stacked sprite display width — visual only */
export const TOP_BREAD_STACK_DISPLAY_WIDTH = 270

/** height/width for bread PNGs (360×120) */
export const BREAD_SPRITE_ASPECT = 120 / 360

/**
 * Bread catch hitbox — collision only, not tied to sprite pixel size.
 * May intentionally be wider than the visible bread for playability.
 */
export const BREAD_CATCH_HITBOX_WIDTH = 190
export const BREAD_CATCH_HITBOX_HEIGHT = 40
export const BREAD_CATCH_HITBOX_OFFSET_Y = 0

/** Display size for image-based falling sprites (collision uses hitbox constants above) */
export const FALLING_SPRITE_DISPLAY_WIDTH = 200
export const FALLING_SPRITE_DISPLAY_HEIGHT = 200

/** Default visual stack layer sizing (collision still uses STACK_LAYER_HEIGHT below) */
export const DEFAULT_STACK_LAYER_HEIGHT = 28
export const DEFAULT_STACK_OVERLAP = 10
export const FIRST_LAYER_OVERLAP_WITH_BREAD = 14
export const DEFAULT_STACK_SPRITE_WIDTH = 220
/** Default height/width ratio for wide stack sprites (e.g. fried-shrimp-stack.png 360×96) */
export const DEFAULT_STACK_SPRITE_ASPECT = 96 / 360
export const PLACEHOLDER_STACK_WIDTH_RATIO = 0.92

/** @deprecated Use PLACEHOLDER_VISUAL_WIDTH */
export const ITEM_WIDTH = PLACEHOLDER_VISUAL_WIDTH
/** @deprecated Use PLACEHOLDER_VISUAL_HEIGHT */
export const ITEM_HEIGHT = PLACEHOLDER_VISUAL_HEIGHT

export const ITEM_FALL_SPEED = 0.2

/** Logical stack spacing used by catch detection (not visual stack overlap) */
export const STACK_LAYER_HEIGHT = 22

/** @deprecated Placeholder-only; bottom bread uses BOTTOM_BREAD_DISPLAY_WIDTH */
export const BREAD_WIDTH = 96
/** @deprecated Placeholder-only */
export const BREAD_HEIGHT = 32

// Increase this to make catching easier.
// Decrease this to make catching stricter.
export const CATCH_FORGIVENESS_PX = 0

export const INITIAL_BREAD_X =
  (PLAYABLE_WIDTH - BOTTOM_BREAD_DISPLAY_WIDTH) / 2

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
