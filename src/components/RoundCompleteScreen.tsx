import { GameFrame } from './GameFrame'
import { SandwichPreview } from './SandwichPreview'
import type { StackLayer } from '../types/game'

interface RoundCompleteScreenProps {
  score: number
  completedStack: StackLayer[] | null
  onContinue: () => void
  onMainMenu: () => void
}

export function RoundCompleteScreen({
  score,
  completedStack,
  onContinue,
  onMainMenu,
}: RoundCompleteScreenProps) {
  const hasPreview = completedStack !== null && completedStack.length > 0

  return (
    <GameFrame className="game-frame--round-complete" dimOverlay>
      <div className="result-screen">
        {hasPreview ? (
          <SandwichPreview stack={completedStack} className="result-screen__preview" />
        ) : (
          <p className="result-screen__fallback" aria-hidden="true">
            🥖
          </p>
        )}

        <h2 className="flash-heading result-screen__headline">
          Now that&apos;s a po&apos; boy!
        </h2>
        <p className="flash-text result-screen__score">
          Score: <strong>{score}</strong>
        </p>

        <div className="result-screen__buttons">
          <button type="button" className="btn-flash" onClick={onContinue}>
            Continue
          </button>
          <button type="button" className="btn-flash btn-flash--alt" onClick={onMainMenu}>
            Main Menu
          </button>
        </div>
      </div>
    </GameFrame>
  )
}
