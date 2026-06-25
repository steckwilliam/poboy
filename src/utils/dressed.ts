import {
  DRESSED_REQUIRED_ITEM_IDS,
  type DressedRequiredItemId,
} from '../constants/dressed'

const REQUIRED_SET = new Set<string>(DRESSED_REQUIRED_ITEM_IDS)

export function isDressedRequiredItem(itemId: string): itemId is DressedRequiredItemId {
  return REQUIRED_SET.has(itemId)
}

export function createDressedIngredientSet(): Set<string> {
  return new Set<string>()
}

export function hasAllDressedIngredients(collected: Set<string>): boolean {
  return DRESSED_REQUIRED_ITEM_IDS.every((id) => collected.has(id))
}
