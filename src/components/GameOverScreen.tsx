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
        <p className="result-screen__emoji" aria-hidden="true">😵</p>
        <h2 className="flash-heading result-screen__headline">
          Now that&apos;s just sloppy.
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
