import { GameFrame } from './GameFrame'

interface RoundCompleteScreenProps {
  score: number
  onContinue: () => void
  onMainMenu: () => void
}

export function RoundCompleteScreen({
  score,
  onContinue,
  onMainMenu,
}: RoundCompleteScreenProps) {
  return (
    <GameFrame className="game-frame--round-complete" dimOverlay>
      <div className="result-screen">
        <p className="result-screen__emoji" aria-hidden="true">🥪</p>
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
