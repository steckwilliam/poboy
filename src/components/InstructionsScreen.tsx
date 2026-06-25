import { getItemById } from '../data/items'
import {
  GOOD_INGREDIENT_TIERS,
  TOP_BREAD_INSTRUCTION_SPRITE,
  YUCK_ITEM_SPRITES,
  type GoodIngredientTier,
  type InstructionSprite,
} from '../data/instructionSprites'
import { GameFrame } from './GameFrame'

interface InstructionsScreenProps {
  onBack: () => void
  onPlay: () => void
}

function InstructionSpriteRow({
  sprites,
  className,
}: {
  sprites: InstructionSprite[]
  className?: string
}) {
  return (
    <div
      className={['instructions-screen__sprites', className].filter(Boolean).join(' ')}
      role="list"
    >
      {sprites.map((sprite) => (
        <img
          key={sprite.src}
          className="instructions-screen__sprite"
          src={sprite.src}
          alt={sprite.alt}
          draggable={false}
          role="listitem"
        />
      ))}
    </div>
  )
}

function GoodIngredientTierRow({ label, itemIds }: GoodIngredientTier) {
  return (
    <div className="instructions-screen__tier">
      <h4 className="instructions-screen__tier-label">{label}</h4>
      <div className="instructions-screen__sprites" role="list">
        {itemIds.map((itemId) => {
          const item = getItemById(itemId)
          if (!item?.fallingImagePath) return null

          return (
            <div
              key={itemId}
              className="instructions-screen__sprite-card"
              data-item-id={itemId}
              role="listitem"
            >
              <img
                className="instructions-screen__sprite"
                src={item.fallingImagePath}
                alt={item.label}
                draggable={false}
              />
              <span className="instructions-screen__points">+{item.points}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function InstructionsScreen({ onBack, onPlay }: InstructionsScreenProps) {
  return (
    <GameFrame className="game-frame--instructions" dimOverlay>
      <div className="instructions-screen">
        <h2 className="instructions-screen__title">How to Play</h2>

        <div className="instructions-screen__columns">
          <section className="instructions-screen__section instructions-screen__section--good">
            <h3 className="instructions-screen__label">Good Ingredients</h3>
            <p className="instructions-screen__text">
              Catch tasty ingredients to build your po&apos; boy.
            </p>
            <div className="instructions-screen__tiers">
              {GOOD_INGREDIENT_TIERS.map((tier) => (
                <GoodIngredientTierRow key={tier.label} {...tier} />
              ))}
            </div>
          </section>

          <section className="instructions-screen__section instructions-screen__section--yuck">
            <h3 className="instructions-screen__label instructions-screen__label--yuck">
              Yuck Items
            </h3>
            <p className="instructions-screen__text">
              Avoid the yucky items or you will increase the yuck meter. If you
              catch three bad items, the game is over.
            </p>
            <InstructionSpriteRow
              sprites={YUCK_ITEM_SPRITES}
              className="instructions-screen__sprites--yuck"
            />
          </section>
        </div>

        <section className="instructions-screen__section instructions-screen__section--bread">
          <img
            className="instructions-screen__bread-img"
            src={TOP_BREAD_INSTRUCTION_SPRITE.src}
            alt={TOP_BREAD_INSTRUCTION_SPRITE.alt}
            draggable={false}
          />
          <div className="instructions-screen__bread-copy">
            <p className="instructions-screen__text">
              A top piece of bread will randomly fall. If you&apos;re done
              building, catch the bread to finish your po&apos; boy. If not,
              let it fall and keep stacking for more points.
            </p>
            <p className="instructions-screen__text instructions-screen__text--warning">
              If your po&apos; boy gets too tall, the game is over.
            </p>
          </div>
        </section>

        <div className="instructions-screen__buttons">
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
