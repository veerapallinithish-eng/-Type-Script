import { describe, expect, it } from 'vitest'
import type { Expense } from '../../types'
import { filterExpenses, getTotalByCategory } from '../expenses'

const expenses: Expense[] = [
  { id: 1, title: 'Coffee', amount: 80, category: 'Food', date: '2025-08-06' },
  { id: 2, title: 'Bus', amount: 40, category: 'Transport', date: '2025-08-04' },
  { id: 3, title: 'Groceries', amount: 1200, category: 'Food', date: '2025-08-01' },
  { id: 4, title: 'Book', amount: 500, category: 'Education', date: '2025-07-31' },
  { id: 5, title: 'Future expense', amount: 200, category: 'Food', date: '2025-08-07' },
]
const referenceDate = new Date(2025, 7, 6, 12)

describe('getTotalByCategory', () => {
  it('sums amounts in the requested category', () => {
    expect(getTotalByCategory(expenses, 'Food')).toBe(1480)
  })

  it('returns zero when no expense matches', () => {
    expect(getTotalByCategory(expenses, 'Health')).toBe(0)
  })

  it('returns zero for an empty list', () => {
    expect(getTotalByCategory([], 'Food')).toBe(0)
  })
})

describe('filterExpenses', () => {
  it('filters by category and includes all dates for the all-time period', () => {
    expect(filterExpenses(expenses, 'Food', 'all', referenceDate).map(({ id }) => id)).toEqual([1, 3, 5])
  })

  it('filters to the current Monday-through-today week', () => {
    expect(filterExpenses(expenses, 'all', 'week', referenceDate).map(({ id }) => id)).toEqual([1, 2])
  })

  it('filters to the current month through today', () => {
    expect(filterExpenses(expenses, 'all', 'month', referenceDate).map(({ id }) => id)).toEqual([1, 2, 3])
  })

  it('combines category and period filters', () => {
    expect(filterExpenses(expenses, 'Food', 'month', referenceDate).map(({ id }) => id)).toEqual([1, 3])
  })
})
