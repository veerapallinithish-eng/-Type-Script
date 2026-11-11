import type { Category, Expense, FilterType } from '../types'
import { toISODate } from './date'

export function getTotalByCategory(expenses: Expense[], category: string): number {
  return expenses.reduce(
    (total, expense) => total + (expense.category === category ? expense.amount : 0),
    0,
  )
}

export function filterExpenses(
  expenses: Expense[],
  category: Category | 'all',
  period: FilterType,
  referenceDate = new Date(),
): Expense[] {
  const today = toISODate(referenceDate)
  const firstOfMonth = toISODate(new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1))
  const weekStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate())
  const daysSinceMonday = (weekStart.getDay() + 6) % 7
  weekStart.setDate(weekStart.getDate() - daysSinceMonday)
  const firstOfWeek = toISODate(weekStart)

  return expenses.filter((expense) => {
    const matchesCategory = category === 'all' || expense.category === category
    const matchesPeriod = period === 'all'
      || (period === 'week' && expense.date >= firstOfWeek && expense.date <= today)
      || (period === 'month' && expense.date >= firstOfMonth && expense.date <= today)
    return matchesCategory && matchesPeriod
  })
}
