export const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Health',
  'Education',
  'Other',
] as const

export type Category = (typeof CATEGORIES)[number]
export type FilterType = 'all' | 'week' | 'month'
export type SortType = 'date' | 'amount' | 'category'
export type Theme = 'light' | 'dark'
export type ToastVariant = 'success' | 'error'

export interface Expense {
  id: number
  title: string
  amount: number
  category: Category
  date: string
  note?: string
}

export interface ExpenseInput {
  title: string
  amount: number
  category: Category
  date: string
  note: string
}

export interface ToastMessage {
  id: string
  message: string
  variant: ToastVariant
}

export interface ExpenseFormProps {
  initialExpense: Expense | null
  onSubmit: (expense: ExpenseInput) => void
  onCancel: () => void
}

export interface ExpenseCardProps {
  expense: Expense
  onEdit: (expense: Expense) => void
  onDelete: (id: number) => void
}

export interface FilterBarProps {
  category: Category | 'all'
  period: FilterType
  sort: SortType
  search: string
  onCategoryChange: (category: Category | 'all') => void
  onPeriodChange: (period: FilterType) => void
  onSortChange: (sort: SortType) => void
  onSearchChange: (search: string) => void
}