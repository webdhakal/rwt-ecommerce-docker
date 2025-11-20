import { SidebarItem } from '@/types'

export function useSidebarMenuFilter(items: SidebarItem[], query: string): SidebarItem[] {
  return items
    .map((item) => {
      const matchesTitle = item.title.toLowerCase().includes(query.toLowerCase())

      const filteredSubItems = item.items ? useSidebarMenuFilter(item.items, query) : []

      if (matchesTitle || filteredSubItems.length > 0) {
        return {
          ...item,
          ...(filteredSubItems.length > 0 && { items: filteredSubItems }),
        }
      }

      return null
    })
    .filter(Boolean) as SidebarItem[]
}
