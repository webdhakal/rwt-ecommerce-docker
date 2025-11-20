import { usePage } from '@inertiajs/react'

type ProductHighlightTypes =
  | 'recently_viewed'
  | 'best_deals'
  | 'weekly_deals'
  | 'new_arrivals'
  | 'most_popular'

type HighlightItem = Record<string, any> // Replace with actual product shape if available

type ProductData = {
  [key in ProductHighlightTypes]?: { data: HighlightItem[] }
}

const useHighlight = <T extends HighlightItem = HighlightItem>(
  type: ProductHighlightTypes,
): T[] => {
  const product = (usePage().props as { product?: ProductData }).product
  return (product?.[type]?.data ?? []) as T[]
}

export default useHighlight
