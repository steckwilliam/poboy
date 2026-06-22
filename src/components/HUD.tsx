interface HUDProps {
  score: number
  yuckMeter: number
  round: number
  onPause: () => void
  onQuit: () => void
}

export function HUD({ score, yuckMeter, round, onPause, onQuit }: HUDProps) {
  return (
    <aside className="hud" aria-label="Game status">
      <div className="hud__stat">
        <span className="hud__label">Score</span>
        <span className="hud__value">{score}</span>
      </div>

      <div className="hud__stat hud__stat--yuck">
        <span className="hud__label">Yuck</span>
        <div className="yuck-meter">
          <div
            className="yuck-meter__fill"
            style={{ width: `${Math.min(100, yuckMeter)}%` }}
          />
        </div>
        <span className="hud__value hud__value--small">{yuckMeter}%</span>
      </div>

      <div className="hud__stat">
        <span className="hud__label">Round</span>
        <span className="hud__value">{round}</span>
      </div>

      <div className="hud__actions">
        <button type="button" className="btn-flash btn-flash--small" onClick={onPause}>
          Pause
        </button>
        <button type="button" className="btn-flash btn-flash--small" onClick={onQuit}>
          Main Menu
        </button>
      </div>
    </aside>
  )
}
