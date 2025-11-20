import { CompactData, PageProps } from '@/types'
import { Meta, Pagination, PaginationLinks } from '@/types/MockData'
import { usePage } from '@inertiajs/react'

interface Filters {
  [key: string]: string | number | null | undefined
}

interface Payload<T> {
  data: T[]
  links: PaginationLinks
  meta: Meta
}

interface CustomPageProps<T> extends PageProps {
  page: {
    payload: Payload<T>
    compact?: CompactData | undefined
  }
  filters: Filters
}

// Generic hook to get paginated data from page.payload
/**
 * @params `isArray`- boolean
 *
 * पृष्ठमा डेटा एरेमा आउँछ भने true राख्नुहोस्, नभए false राख्नुहोस्।
 */
export function usePagePayload<T, C = undefined>(
  isArray: true,
): {
  data: T[]
  pagination: Pagination
  compact?: C
}
export function usePagePayload<T, C = undefined>(
  isArray: false,
): {
  data: T
  pagination: Pagination
  compact?: C
}
export function usePagePayload<T>(isArray: boolean) {
  // Access Inertia page props
  const { props } = usePage<CustomPageProps<T>>()

  // Extract data, links, and meta with fallbacks
  const data = props.page?.payload?.data ?? props.page?.payload ?? []

  const pagination = {
    links: props.page?.payload?.links ?? {
      first: null,
      last: null,
      prev: null,
      next: null,
    },
    meta: props.page?.payload?.meta ?? {
      current_page: 1,
      from: null,
      to: null,
      last_page: 1,
      per_page: 15,
      total: 0,
      path: '',
      links: [],
    },
  }

  const compact = props.page?.compact

  return {
    data,
    compact,
    pagination,
  }
}
