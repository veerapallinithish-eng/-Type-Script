import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowUpRight, Plus, Save, X } from 'lucide-react'
import useForm from '../hooks/useForm'
import { CATEGORIES, type ExpenseFormProps, type ExpenseInput } from '../types'
import { toISODate } from '../utils/date'

export default function ExpenseForm({ initialExpense, onSubmit, onCancel }: ExpenseFormProps) {
  const { values, setField } = useForm({
    title: initialExpense?.title ?? '',
    amount: initialExpense ? String(initialExpense.amount) : '',
    category: initialExpense?.category ?? 'Food',
    date: initialExpense?.date ?? toISODate(new Date()),
    note: initialExpense?.note ?? '',
  })
  const [error, setError] = useState('')
  const isEditing = initialExpense !== null

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target
    if (name === 'title' || name === 'amount' || name === 'category' || name === 'date' || name === 'note') {
      setField(name, value)
      setError('')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const amount = Number(values.amount)
    if (!values.title.trim() || !Number.isFinite(amount) || amount <= 0 || !values.date) {
      setError('Add a title, a valid amount, and a date.')
      return
    }

    const expense: ExpenseInput = {
      title: values.title.trim(),
      amount,
      category: values.category,
      date: values.date,
      note: values.note.trim(),
    }
    onSubmit(expense)
  }

  return (
    <section className="form-panel" aria-labelledby="form-heading">
      <div className="form-panel__heading">
        <div>
          <p className="eyebrow">QUICK ENTRY</p>
          <h2 id="form-heading">{isEditing ? 'Edit expense' : 'Add an expense'}</h2>
        </div>
        <span className="form-panel__mark"><ArrowUpRight size={20} /></span>
      </div>
      <form className="expense-form" onSubmit={handleSubmit}>
        <label className="field field--wide">
          <span>What was it for?</span>
          <input autoComplete="off" name="title" onChange={handleChange} placeholder="e.g. Sunday brunch" value={values.title} maxLength={64} />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Amount</span>
            <span className="amount-input"><span>₹</span><input inputMode="decimal" name="amount" onChange={handleChange} placeholder="0.00" value={values.amount} /></span>
          </label>
          <label className="field">
            <span>Date</span>
            <input name="date" onChange={handleChange} type="date" value={values.date} />
          </label>
        </div>

        <label className="field field--wide">
          <span>Category</span>
          <select name="category" onChange={handleChange} value={values.category}>
            {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>

        <label className="field field--wide">
          <span>Note <span className="field__optional">OPTIONAL</span></span>
          <input name="note" onChange={handleChange} placeholder="A little extra detail" value={values.note} maxLength={120} />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions">
          {isEditing && <button className="button button--quiet" onClick={onCancel} type="button"><X size={16} /> Cancel</button>}
          <button className="button button--primary" type="submit">
            {isEditing ? <Save size={16} /> : <Plus size={17} />}
            {isEditing ? 'Save changes' : 'Add expense'}
          </button>
        </div>
      </form>
    </section>
  )
}