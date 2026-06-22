import { GameFrame } from './GameFrame'

interface InstructionsScreenProps {
  onBack: () => void
  onPlay: () => void
}

export function InstructionsScreen({ onBack, onPlay }: InstructionsScreenProps) {
  return (
    <GameFrame className="game-frame--instructions" dimOverlay>
      <div className="overlay-panel instructions-screen__panel">
        <h2 className="flash-heading">How to Play</h2>

        <ul className="instructions-list">
          <li>
            <span className="instructions-list__icon" aria-hidden="true">🍤</span>
            Catch <strong>good ingredients</strong> to build your po&apos; boy
          </li>
          <li>
            <span className="instructions-list__icon" aria-hidden="true">🚧</span>
            Avoid <strong>yuck items</strong> — they fill your yuck meter
          </li>
          <li>
            <span className="instructions-list__icon" aria-hidden="true">👢</span>
            Yuck items include a traffic cone, white boot, and banana peel
          </li>
          <li>
            <span className="instructions-list__icon" aria-hidden="true">🍞</span>
            Catching the <strong>top bread</strong> finishes the po&apos; boy and ends the round
          </li>
          <li>
            <span className="instructions-list__icon" aria-hidden="true">📏</span>
            If the po&apos; boy gets <strong>too tall</strong>, the game ends
          </li>
        </ul>

        <div className="overlay-panel__buttons">
          <button type="button" className="btn-flash btn-flash--alt" onClick={onBack}>
            Back
          </button>
          <button type="button" className="btn-flash" onClick={onPlay}>
            Play
          </button>
        </div>
      </div>
    </GameFrame>
  )
}
