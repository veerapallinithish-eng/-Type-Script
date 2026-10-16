import type { Expense } from '../types'

function escapeCsv(value: string): string {
  return `"${value.replaceAll('"', '""')}"`
}

export function expensesToCsv(expenses: Expense[]): string {
  const rows = [
    ['Title', 'Amount', 'Category', 'Date', 'Note'],
    ...expenses.map(({ title, amount, category, date, note }) => [
      title,
      amount.toFixed(2),
      category,
      date,
      note ?? '',
    ]),
  ]

  return rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n')
}

export function downloadExpensesCsv(expenses: Expense[]): void {
  const blob = new Blob([expensesToCsv(expenses)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `edabip-expenses-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}