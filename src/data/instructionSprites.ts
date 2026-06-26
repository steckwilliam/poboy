export interface InstructionSprite {
  src: string
  alt: string
}

/** Good ingredient rows for the instructions screen — item ids match src/data/items.ts */
export interface GoodIngredientTier {
  label: string
  itemIds: string[]
}

export const GOOD_INGREDIENT_TIERS: GoodIngredientTier[] = [
  {
    label: 'Meats: Fried Shrimp, Sausage, Roast Beef',
    itemIds: ['fried-shrimp', 'sausage-link', 'roast-beef'],
  },
  {
    label: 'Toppings: Lettuce, Tomato, Pickle',
    itemIds: ['lettuce', 'tomato-slice', 'pickle-slice'],
  },
  {
    label: 'Sauces: Mayonnaise, Hot Sauce',
    itemIds: ['mayonnaise', 'hot-sauce'],
  },
]

export const YUCK_ITEM_SPRITES: InstructionSprite[] = [
  {
    src: '/assets/sprites/yuck/traffic-cone-falling.png',
    alt: 'Traffic cone',
  },
  {
    src: '/assets/sprites/yuck/white-rain-boot-falling.png',
    alt: 'White rain boot',
  },
  {
    src: '/assets/sprites/yuck/fish-skeleton-falling.png',
    alt: 'Fish skeleton',
  },
]

export const TOP_BREAD_INSTRUCTION_SPRITE = {
  src: '/assets/sprites/bread/top-bread.png',
  alt: 'Top bread',
}
