import { useCallback, useState } from 'react'
import { GameOverScreen } from './components/GameOverScreen'
import { GameplayScreen } from './components/GameplayScreen'
import { InstructionsScreen } from './components/InstructionsScreen'
import { RoundCompleteScreen } from './components/RoundCompleteScreen'
import { StartScreen } from './components/StartScreen'
import type { Screen, StackLayer } from './types/game'
import './App.css'

const INITIAL_ROUND = 1

function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(INITIAL_ROUND)
  const [gameSessionKey, setGameSessionKey] = useState(0)
  const [completedSandwichStack, setCompletedSandwichStack] =
    useState<StackLayer[] | null>(null)

  const resetProgress = useCallback(() => {
    setScore(0)
    setRound(INITIAL_ROUND)
    setCompletedSandwichStack(null)
    setGameSessionKey((k) => k + 1)
  }, [])

  const startNewGame = useCallback(() => {
    resetProgress()
    setScreen('gameplay')
  }, [resetProgress])

  const handleGameOver = useCallback((finalScore: number) => {
    setScore(finalScore)
    setScreen('gameOver')
  }, [])

  const handleRoundComplete = useCallback(
    (completedScore: number, stack: StackLayer[]) => {
      setScore(completedScore)
      setCompletedSandwichStack(stack.map((layer) => ({ ...layer })))
      setScreen('roundComplete')
    },
    [],
  )

  const handleContinue = useCallback(() => {
    setRound((r) => r + 1)
    setGameSessionKey((k) => k + 1)
    setScreen('gameplay')
  }, [])

  const goToMainMenu = useCallback(() => {
    resetProgress()
    setScreen('start')
  }, [resetProgress])

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
          initialScore={score}
          initialRound={round}
          onGameOver={handleGameOver}
          onRoundComplete={handleRoundComplete}
          onQuit={goToMainMenu}
        />
      )}

      {screen === 'roundComplete' && (
        <RoundCompleteScreen
          score={score}
          completedStack={completedSandwichStack}
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
