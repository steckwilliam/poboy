import type { ReactNode } from 'react'

interface GameFrameProps {
  children: ReactNode
  /** Optional extra class for screen-specific layout */
  className?: string
  /** Semi-transparent dark overlay for text readability */
  dimOverlay?: boolean
}

/**
 * Shared Flash-style game frame used by every screen.
 * Background image is applied via CSS on `.game-frame`.
 * Place UI as absolutely positioned children inside the frame.
 */
export function GameFrame({ children, className, dimOverlay }: GameFrameProps) {
  return (
    <div className={['game-frame', className].filter(Boolean).join(' ')}>
      {dimOverlay && <div className="game-frame__dim" aria-hidden="true" />}
      {children}
    </div>
  )
}
