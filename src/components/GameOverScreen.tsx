import { GameFrame } from './GameFrame'

interface GameOverScreenProps {
  score: number
  onPlayAgain: () => void
  onMainMenu: () => void
}

export function GameOverScreen({
  score,
  onPlayAgain,
  onMainMenu,
}: GameOverScreenProps) {
  return (
    <GameFrame className="game-frame--game-over" dimOverlay>
      <div className="result-screen">
        <h2 className="flash-heading result-screen__headline">
        Makin’ groceries? More like makin’ a mess.
        </h2>
        <p className="flash-text result-screen__score">
          Final Score: <strong>{score}</strong>
        </p>

        <div className="result-screen__buttons">
          <button type="button" className="btn-flash" onClick={onPlayAgain}>
            Play Again
          </button>
          <button type="button" className="btn-flash btn-flash--alt" onClick={onMainMenu}>
            Main Menu
          </button>
        </div>
      </div>
    </GameFrame>
  )
}
