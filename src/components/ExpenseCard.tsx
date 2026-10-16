import { ArrowDownLeft, BookOpen, HeartPulse, MoreHorizontal, Pencil, ShoppingBag, Trash2, Utensils, Wallet } from 'lucide-react'
import type { ExpenseCardProps } from '../types'
import { formatExpenseDate } from '../utils/date'

const categoryIcons = {
  Food: Utensils,
  Transport: ArrowDownLeft,
  Shopping: ShoppingBag,
  Health: HeartPulse,
  Education: BookOpen,
  Other: Wallet,
}

export default function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
  const CategoryIcon = categoryIcons[expense.category]

  return (
    <article className="expense-row">
      <span className={`category-icon category-icon--${expense.category.toLowerCase()}`}><CategoryIcon size={18} strokeWidth={1.8} /></span>
      <div className="expense-row__main">
        <h3>{expense.title}</h3>
        <p>{expense.category}<span className="meta-dot" />{formatExpenseDate(expense.date)}</p>
        {expense.note && <p className="expense-row__note">{expense.note}</p>}
      </div>
      <div className="expense-row__amount">-₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <div className="expense-row__actions">
        <button className="icon-button" onClick={() => onEdit(expense)} aria-label={`Edit ${expense.title}`} title="Edit expense"><Pencil size={15} /></button>
        <button className="icon-button icon-button--danger" onClick={() => onDelete(expense.id)} aria-label={`Delete ${expense.title}`} title="Delete expense"><Trash2 size={15} /></button>
      </div>
      <MoreHorizontal className="expense-row__mobile-more" size={17} aria-hidden="true" />
    </article>
  )
}