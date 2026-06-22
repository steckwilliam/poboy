import type { GameItem } from '../types/game'

export const ITEMS: GameItem[] = [
  // Good ingredients
  {
    id: 'fried-shrimp',
    label: 'Fried Shrimp',
    category: 'good',
    points: 100,
    placeholderColor: '#f4a460',
    placeholderEmoji: '🍤',
    futureImagePath: '/images/fried-shrimp.png',
  },
  {
    id: 'roast-beef',
    label: 'Roast Beef',
    category: 'good',
    points: 120,
    placeholderColor: '#8b4513',
    placeholderEmoji: '🥩',
    futureImagePath: '/images/roast-beef.png',
  },
  {
    id: 'sausage-link',
    label: 'Sausage Link',
    category: 'good',
    points: 90,
    placeholderColor: '#cd5c5c',
    placeholderEmoji: '🌭',
    futureImagePath: '/images/sausage-link.png',
  },
  {
    id: 'tomato-slice',
    label: 'Tomato Slice',
    category: 'good',
    points: 50,
    placeholderColor: '#ff6347',
    placeholderEmoji: '🍅',
    futureImagePath: '/images/tomato-slice.png',
  },
  {
    id: 'pickle-slice',
    label: 'Pickle Slice',
    category: 'good',
    points: 40,
    placeholderColor: '#6b8e23',
    placeholderEmoji: '🥒',
    futureImagePath: '/images/pickle-slice.png',
  },
  {
    id: 'lettuce',
    label: 'Lettuce',
    category: 'good',
    points: 30,
    placeholderColor: '#90ee90',
    placeholderEmoji: '🥬',
    futureImagePath: '/images/lettuce.png',
  },
  {
    id: 'mayonnaise',
    label: 'Mayonnaise',
    category: 'good',
    points: 20,
    placeholderColor: '#fffacd',
    placeholderEmoji: '🫙',
    futureImagePath: '/images/mayonnaise.png',
  },
  {
    id: 'hot-sauce',
    label: 'Hot Sauce',
    category: 'good',
    points: 25,
    placeholderColor: '#dc143c',
    placeholderEmoji: '🌶️',
    futureImagePath: '/images/hot-sauce.png',
  },

  // Yuck items
  {
    id: 'traffic-cone',
    label: 'Traffic Cone',
    category: 'yuck',
    points: -50,
    placeholderColor: '#ff8c00',
    placeholderEmoji: '🚧',
    futureImagePath: '/images/traffic-cone.png',
  },
  {
    id: 'white-boot',
    label: 'White Boot',
    category: 'yuck',
    points: -75,
    placeholderColor: '#f5f5f5',
    placeholderEmoji: '👢',
    futureImagePath: '/images/white-boot.png',
  },
  {
    id: 'banana-peel',
    label: 'Banana Peel',
    category: 'yuck',
    points: -40,
    placeholderColor: '#ffd700',
    placeholderEmoji: '🍌',
    futureImagePath: '/images/banana-peel.png',
  },

  // Special item
  {
    id: 'top-bread',
    label: 'Top Bread',
    category: 'special',
    points: 200,
    placeholderColor: '#deb887',
    placeholderEmoji: '🍞',
    futureImagePath: '/images/top-bread.png',
  },
]

export const BOTTOM_BREAD: GameItem = {
  id: 'bottom-bread',
  label: 'Bottom Bread',
  category: 'special',
  points: 0,
  placeholderColor: '#d2a679',
  placeholderEmoji: '🥖',
  futureImagePath: '/images/bottom-bread.png',
}

export function getItemById(id: string): GameItem | undefined {
  if (id === BOTTOM_BREAD.id) return BOTTOM_BREAD
  return ITEMS.find((item) => item.id === id)
}

export const GOOD_ITEMS = ITEMS.filter((item) => item.category === 'good')
export const YUCK_ITEMS = ITEMS.filter((item) => item.category === 'yuck')
export const SPECIAL_ITEMS = ITEMS.filter((item) => item.category === 'special')
