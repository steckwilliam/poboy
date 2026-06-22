import { useCallback, useState } from 'react'
import { GameOverScreen } from './components/GameOverScreen'
import { GameplayScreen } from './components/GameplayScreen'
import { InstructionsScreen } from './components/InstructionsScreen'
import { RoundCompleteScreen } from './components/RoundCompleteScreen'
import { StartScreen } from './components/StartScreen'
import type { Screen } from './types/game'
import './App.css'

const INITIAL_SCORE = 0
const INITIAL_YUCK = 0
const INITIAL_ROUND = 1

function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [score, setScore] = useState(INITIAL_SCORE)
  const [yuckMeter, setYuckMeter] = useState(INITIAL_YUCK)
  const [round, setRound] = useState(INITIAL_ROUND)

  const resetGameState = useCallback(() => {
    setScore(INITIAL_SCORE)
    setYuckMeter(INITIAL_YUCK)
    setRound(INITIAL_ROUND)
  }, [])

  const startNewGame = useCallback(() => {
    resetGameState()
    setScreen('gameplay')
  }, [resetGameState])

  const handleContinue = useCallback(() => {
    setRound((r) => r + 1)
    setYuckMeter(INITIAL_YUCK)
    setScreen('gameplay')
  }, [])

  const goToMainMenu = useCallback(() => {
    resetGameState()
    setScreen('start')
  }, [resetGameState])

  return (
    <div className="app">
      {screen === 'start' && (
        <StartScreen
          onPlay={startNewGame}
          onHowToPlay={() => setScreen('instructions')}
        />
      )}

      {screen === 'instructions' && (
        <InstructionsScreen
          onBack={() => setScreen('start')}
          onPlay={startNewGame}
        />
      )}

      {screen === 'gameplay' && (
        <GameplayScreen
          score={score}
          yuckMeter={yuckMeter}
          round={round}
          onPause={() => {
            // Future: pause overlay / freeze game loop
          }}
          onQuit={goToMainMenu}
        />
      )}

      {screen === 'roundComplete' && (
        <RoundCompleteScreen
          score={score}
          onContinue={handleContinue}
          onMainMenu={goToMainMenu}
        />
      )}

      {screen === 'gameOver' && (
        <GameOverScreen
          score={score}
          onPlayAgain={startNewGame}
          onMainMenu={goToMainMenu}
        />
      )}

      {/* Dev-only: quick navigation to test all screens */}
      {import.meta.env.DEV && (
        <nav className="dev-nav" aria-label="Development screen shortcuts">
          <button type="button" onClick={() => setScreen('start')}>Start</button>
          <button type="button" onClick={() => setScreen('instructions')}>Instructions</button>
          <button type="button" onClick={() => setScreen('gameplay')}>Gameplay</button>
          <button type="button" onClick={() => setScreen('roundComplete')}>Round Complete</button>
          <button type="button" onClick={() => setScreen('gameOver')}>Game Over</button>
        </nav>
      )}
    </div>
  )
}

export default App
