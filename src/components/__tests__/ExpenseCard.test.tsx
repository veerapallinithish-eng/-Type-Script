import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { Expense } from '../../types'
import ExpenseCard from '../ExpenseCard'

const expense: Expense = {
  id: 1,
  title: 'Lunch',
  amount: 250,
  category: 'Food',
  date: '2025-08-06',
}

describe('ExpenseCard', () => {
  it('renders the expense title and category', () => {
    const { container } = render(<ExpenseCard expense={expense} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByRole('heading', { name: 'Lunch' })).toBeInTheDocument()
    expect(container.querySelector('.expense-row__main p')).toHaveTextContent('Food')
  })

  it('renders the formatted amount and date', () => {
    const { container } = render(<ExpenseCard expense={expense} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('-₹250.00')).toBeInTheDocument()
    expect(container.querySelector('.expense-row__main p')).toHaveTextContent('Aug 6, 2025')
  })

  it('shows an accessible delete button', () => {
    render(<ExpenseCard expense={expense} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Delete Lunch' })).toBeInTheDocument()
  })

  it('calls onDelete with the expense id', () => {
    const onDelete = vi.fn()
    render(<ExpenseCard expense={expense} onEdit={vi.fn()} onDelete={onDelete} />)
    fireEvent.click(screen.getByRole('button', { name: 'Delete Lunch' }))
    expect(onDelete).toHaveBeenCalledWith(1)
  })
})
