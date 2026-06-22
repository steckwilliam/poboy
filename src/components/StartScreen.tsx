import { GameFrame } from './GameFrame'

interface StartScreenProps {
  onPlay: () => void
  onHowToPlay: () => void
}

export function StartScreen({ onPlay, onHowToPlay }: StartScreenProps) {
  return (
    <GameFrame className="game-frame--start">
      <h1 className="flash-title start-screen__title">
        <span className="flash-title__line">Po&apos; Boy</span>
        <span className="flash-title__line flash-title__line--accent">Pile-Up</span>
      </h1>

      <p className="flash-text start-screen__tagline">
        Stack up a legendary New Orleans sandwich!
      </p>

      <div className="start-screen__buttons">
        <button type="button" className="btn-flash btn-flash--large" onClick={onPlay}>
          Play
        </button>
        <button type="button" className="btn-flash" onClick={onHowToPlay}>
          How to Play
        </button>
      </div>
    </GameFrame>
  )
}
