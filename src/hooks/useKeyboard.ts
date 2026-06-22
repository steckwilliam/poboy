import { useEffect, useRef } from 'react'

const MOVEMENT_KEYS = new Set([
  'ArrowLeft',
  'ArrowRight',
  'a',
  'A',
  'd',
  'D',
])

export function useKeyboard(enabled: boolean) {
  const keysPressed = useRef(new Set<string>())

  useEffect(() => {
    if (!enabled) {
      keysPressed.current.clear()
      return
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (MOVEMENT_KEYS.has(e.key)) {
        e.preventDefault()
        keysPressed.current.add(e.key)
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key)
    }

    const onBlur = () => {
      keysPressed.current.clear()
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
      keysPressed.current.clear()
    }
  }, [enabled])

  return keysPressed
}
