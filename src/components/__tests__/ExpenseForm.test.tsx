import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { ExpenseInput } from '../../types'
import ExpenseForm from '../ExpenseForm'

describe('ExpenseForm', () => {
  it('renders all form fields', () => {
    render(<ExpenseForm initialExpense={null} onSubmit={vi.fn()} onCancel={vi.fn()} />)
    expect(screen.getByLabelText('What was it for?')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument()
    expect(screen.getByLabelText('Date')).toBeInTheDocument()
    expect(screen.getByLabelText('Category')).toBeInTheDocument()
    expect(screen.getByLabelText(/Note/)).toBeInTheDocument()
  })

  it('shows a validation error when the title is empty', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ExpenseForm initialExpense={null} onSubmit={onSubmit} onCancel={vi.fn()} />)
    await user.type(screen.getByPlaceholderText('0.00'), '80')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Add a title')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it.each(['0', '-5'])('rejects amount %s', async (amount) => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ExpenseForm initialExpense={null} onSubmit={onSubmit} onCancel={vi.fn()} />)
    await user.type(screen.getByLabelText('What was it for?'), 'Coffee')
    await user.type(screen.getByPlaceholderText('0.00'), amount)
    await user.click(screen.getByRole('button', { name: 'Add expense' }))
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits the normalized expense data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn<(expense: ExpenseInput) => void>()
    render(<ExpenseForm initialExpense={null} onSubmit={onSubmit} onCancel={vi.fn()} />)
    await user.type(screen.getByLabelText('What was it for?'), '  Coffee  ')
    await user.type(screen.getByPlaceholderText('0.00'), '80')
    await user.selectOptions(screen.getByLabelText('Category'), 'Transport')
    await user.type(screen.getByLabelText(/Note/), '  morning ride  ')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Coffee',
      amount: 80,
      category: 'Transport',
      date: expect.any(String),
      note: 'morning ride',
    })
  })

  it('resets the fields after a successful add', async () => {
    const user = userEvent.setup()
    render(<ExpenseForm initialExpense={null} onSubmit={vi.fn()} onCancel={vi.fn()} />)
    const title = screen.getByLabelText('What was it for?')
    const amount = screen.getByPlaceholderText('0.00')
    await user.type(title, 'Coffee')
    await user.type(amount, '80')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))
    expect(title).toHaveValue('')
    expect(amount).toHaveValue('')
    expect(screen.getByLabelText(/Note/)).toHaveValue('')
  })
})
