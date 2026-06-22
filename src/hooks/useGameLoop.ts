import { useEffect, useRef } from 'react'

export interface GameLoopOptions {
  /** Called each frame with delta time in milliseconds */
  onUpdate: (deltaMs: number) => void
  /** When false, the loop does not run */
  isRunning: boolean
}

/**
 * Placeholder game loop hook using requestAnimationFrame.
 * Future gameplay logic (movement, falling items, collisions) will run inside onUpdate.
 */
export function useGameLoop({ onUpdate, isRunning }: GameLoopOptions): void {
  const onUpdateRef = useRef(onUpdate)
  const lastTimeRef = useRef<number | null>(null)
  const frameIdRef = useRef<number | null>(null)

  onUpdateRef.current = onUpdate

  useEffect(() => {
    if (!isRunning) {
      lastTimeRef.current = null
      return
    }

    const tick = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp
      }

      const deltaMs = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      onUpdateRef.current(deltaMs)

      frameIdRef.current = requestAnimationFrame(tick)
    }

    frameIdRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current)
      }
      lastTimeRef.current = null
    }
  }, [isRunning])
}
