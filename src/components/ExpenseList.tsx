import { ReceiptText } from 'lucide-react'
import type { Expense, ExpenseCardProps } from '../types'
import ExpenseCard from './ExpenseCard'

interface ExpenseListProps extends Pick<ExpenseCardProps, 'onEdit' | 'onDelete'> {
  expenses: Expense[]
  hasExpenses: boolean
}

export default function ExpenseList({ expenses, hasExpenses, onEdit, onDelete }: ExpenseListProps) {
  return (
    <section className="transactions" aria-labelledby="transactions-heading">
      <div className="transactions__heading">
        <div>
          <p className="eyebrow">YOUR ACTIVITY</p>
          <h2 id="transactions-heading">Transactions <span>{expenses.length}</span></h2>
        </div>
        <span className="transactions__period">Recent first</span>
      </div>
      {expenses.length > 0 ? (
        <div className="expense-list">
          {expenses.map((expense) => <ExpenseCard key={expense.id} expense={expense} onEdit={onEdit} onDelete={onDelete} />)}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state__icon"><ReceiptText size={22} /></span>
          <h3>{hasExpenses ? 'No matching expenses' : 'A fresh start'}</h3>
          <p>{hasExpenses ? 'Try a different search or filter.' : 'Your first expense will show up here.'}</p>
        </div>
      )}
    </section>
  )
}