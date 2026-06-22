import { useCallback, useState } from 'react'
import { GameOverScreen } from './components/GameOverScreen'
import { GameplayScreen } from './components/GameplayScreen'
import { InstructionsScreen } from './components/InstructionsScreen'
import { RoundCompleteScreen } from './components/RoundCompleteScreen'
import { StartScreen } from './components/StartScreen'
import type { Screen } from './types/game'
import './App.css'

function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [finalScore, setFinalScore] = useState(0)
  const [gameSessionKey, setGameSessionKey] = useState(0)

  const startNewGame = useCallback(() => {
    setFinalScore(0)
    setGameSessionKey((k) => k + 1)
    setScreen('gameplay')
  }, [])

  const handleGameOver = useCallback((score: number) => {
    setFinalScore(score)
    setScreen('gameOver')
  }, [])

  const goToMainMenu = useCallback(() => {
    setFinalScore(0)
    setGameSessionKey((k) => k + 1)
    setScreen('start')
  }, [])

  const handleContinue = useCallback(() => {
    setGameSessionKey((k) => k + 1)
    setScreen('gameplay')
  }, [])

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
          key={gameSessionKey}
          onGameOver={handleGameOver}
          onQuit={goToMainMenu}
        />
      )}

      {screen === 'roundComplete' && (
        <RoundCompleteScreen
          score={finalScore}
          onContinue={handleContinue}
          onMainMenu={goToMainMenu}
        />
      )}

      {screen === 'gameOver' && (
        <GameOverScreen
          score={finalScore}
          onPlayAgain={startNewGame}
          onMainMenu={goToMainMenu}
        />
      )}

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
