import { ofetch } from 'ofetch'

const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL_V1
export const api = ofetch.create({ baseURL: apiURL })

// Basic value types that can be used in filters
export type FilterValue = string | number | boolean | null | undefined

// Interface for a single filter
export interface Filter<T extends FilterValue = FilterValue> {
  value: T
  operator?: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains' | 'ncontains'
}

// Main Filters interface
export interface Filters {
  [key: string]: FilterValue | Filter | FilterValue[] | Filter[]
}

// Helper type to extract keys from an object type
type KeysOfUnion<T> = T extends T ? keyof T : never

// Generic function to create typed filters for a specific model
export type TypedFilters<T> = {
  [K in KeysOfUnion<T>]?: FilterValue | Filter | FilterValue[] | Filter[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyFilterObject(value: any, filter: Filter): boolean {
  if (filter.value === undefined || filter.value === null) {
    return true // Skip filters with undefined or null values
  }

  switch (filter.operator) {
    case 'eq':
      return value === filter.value
    case 'neq':
      return value !== filter.value
    case 'gt':
      return value > filter.value
    case 'gte':
      return value >= filter.value
    case 'lt':
      return value < filter.value
    case 'lte':
      return value <= filter.value
    case 'contains':
      return String(value).toLowerCase().includes(String(filter.value).toLowerCase())
    case 'ncontains':
      return !String(value).toLowerCase().includes(String(filter.value).toLowerCase())
    case 'in':
      return Array.isArray(filter.value) && filter.value.includes(value)
    case 'nin':
      return Array.isArray(filter.value) && !filter.value.includes(value)
    default:
      return value === filter.value
  }
}

export function applyDirectFilter(value: unknown, filterValue: FilterValue): boolean {
  if (Array.isArray(filterValue)) {
    return filterValue.includes(value)
  }
  return value === filterValue
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filter<T extends object>(items: T[], filters?: TypedFilters<T>): T[] {
  return items.filter((item) => {
    if (!filters || Object.keys(filters).length === 0) {
      return true // Return all products if no filters are applied
    }

    return Object.entries(filters).every(([key, filter]) => {
      if (filter === undefined || filter === null) {
        return true // Skip undefined or null filters
      }

      const productValue = item[key as keyof T]

      if (typeof filter === 'object' && 'value' in filter) {
        // Handle Filter object
        return applyFilterObject(productValue, filter as Filter)
      } else {
        // Handle direct value
        return applyDirectFilter(productValue, filter as FilterValue)
      }
    })
  })
}

export type TypedQueryOptions<T> = {
  filters?: TypedFilters<T>
  enabled?: boolean
}
