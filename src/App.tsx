import { useState } from 'react'
import { Download, Moon, Sun, WalletCards } from 'lucide-react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import FilterBar from './components/FilterBar'
import SummaryStats from './components/SummaryStats'
import ToastContainer from './components/ToastContainer'
import { useTheme } from './context/ThemeContext'
import useLocalStorage from './hooks/useLocalStorage'
import useToast from './hooks/useToast'
import type { Category, Expense, ExpenseInput, FilterType, SortType } from './types'
import { downloadExpensesCsv } from './utils/exportCsv'
import { toISODate } from './utils/date'

export default function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('edabip-expenses', [])
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [period, setPeriod] = useState<FilterType>('all')
  const [sort, setSort] = useState<SortType>('date')
  const [search, setSearch] = useState('')
  const { theme, toggleTheme } = useTheme()
  const { toasts, addToast, dismissToast } = useToast()

  const today = toISODate(new Date())
  const currentDate = new Date()
  const firstOfMonth = toISODate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
  const weekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
  const daysSinceMonday = (weekStart.getDay() + 6) % 7
  weekStart.setDate(weekStart.getDate() - daysSinceMonday)
  const firstOfWeek = toISODate(weekStart)

  const monthExpenses = expenses.filter((expense) => expense.date >= firstOfMonth && expense.date <= today)
  const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const highest = monthExpenses.reduce((max, expense) => Math.max(max, expense.amount), 0)
  const categoryCounts = monthExpenses.reduce<Partial<Record<Category, number>>>((counts, expense) => {
    counts[expense.category] = (counts[expense.category] ?? 0) + 1
    return counts
  }, {})
  const topCategory = Object.entries(categoryCounts).sort((left, right) => (right[1] ?? 0) - (left[1] ?? 0))[0]?.[0] ?? '—'

  const visibleExpenses = expenses
    .filter((expense) => category === 'all' || expense.category === category)
    .filter((expense) => period === 'all' || (period === 'week' ? expense.date >= firstOfWeek && expense.date <= today : expense.date >= firstOfMonth && expense.date <= today))
    .filter((expense) => `${expense.title} ${expense.category} ${expense.note ?? ''}`.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((left, right) => {
      if (sort === 'amount') return right.amount - left.amount
      if (sort === 'category') return left.category.localeCompare(right.category) || right.date.localeCompare(left.date)
      return right.date.localeCompare(left.date) || right.id - left.id
    })

  const handleSave = (input: ExpenseInput): void => {
    const expense: Expense = {
      ...input,
      id: editingExpense?.id ?? Date.now(),
      note: input.note || undefined,
    }
    setExpenses(editingExpense
      ? expenses.map((item) => item.id === editingExpense.id ? expense : item)
      : [expense, ...expenses])
    setEditingExpense(null)
    addToast(editingExpense ? 'Expense updated' : 'Expense added')
  }

  const handleDelete = (id: number): void => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
    if (editingExpense?.id === id) setEditingExpense(null)
    addToast('Expense deleted')
  }

  const handleExport = (): void => {
    if (expenses.length === 0) {
      addToast('Add an expense before exporting', 'error')
      return
    }
    downloadExpensesCsv(expenses)
    addToast('CSV export is ready')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="EDABIP home">
          <span className="brand__mark"><WalletCards size={20} strokeWidth={2.1} /></span>
          <span className="brand__name">edabip<span>.</span></span>
          <span className="brand__divider" />
          <span className="brand__product">Personal finance</span>
        </a>
        <div className="topbar__actions">
          <button className="button button--export" onClick={handleExport}><Download size={16} /> Export CSV</button>
          <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <span className="avatar" aria-label="Your account">R</span>
        </div>
      </header>

      <main className="dashboard" id="top">
        <section className="welcome-row">
          <div>
            <p className="eyebrow welcome-row__date">PERSONAL FINANCE <span /> {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}</p>
            <h1>Know where<br className="mobile-break" /> it goes<span>.</span></h1>
            <p className="welcome-row__sub">A clearer picture of your everyday spending.</p>
          </div>
          <div className="welcome-note"><span className="welcome-note__line" /><p>Small choices add up.<br /><strong>Make every one count.</strong></p></div>
        </section>

        <SummaryStats total={total} highest={highest} topCategory={topCategory} expenseCount={monthExpenses.length} />

        <div className="workspace-grid">
          <div className="activity-column">
            <FilterBar category={category} period={period} sort={sort} search={search} onCategoryChange={setCategory} onPeriodChange={setPeriod} onSortChange={setSort} onSearchChange={setSearch} />
            <ExpenseList expenses={visibleExpenses} hasExpenses={expenses.length > 0} onEdit={setEditingExpense} onDelete={handleDelete} />
          </div>
          <aside className="entry-column">
            <ExpenseForm key={editingExpense?.id ?? 'new-expense'} initialExpense={editingExpense} onSubmit={handleSave} onCancel={() => setEditingExpense(null)} />
            <div className="privacy-note"><span className="privacy-note__dot" /><p>Your data stays on this device.<br /><span>Stored privately in your browser.</span></p></div>
          </aside>
        </div>
      </main>
      <footer className="footer"><span>EDABIP <span className="footer__dot">/</span> SPEND WITH INTENTION</span><span>LOCAL-FIRST · PRIVATE BY DESIGN</span></footer>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}