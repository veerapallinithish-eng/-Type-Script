import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SummaryStats from '../SummaryStats'

describe('SummaryStats', () => {
  it('renders the total amount', () => {
    render(<SummaryStats total={1250} highest={900} topCategory="Food" expenseCount={3} />)
    expect(screen.getByText('₹1,250.00')).toBeInTheDocument()
  })

  it('renders the highest expense', () => {
    render(<SummaryStats total={1250} highest={900} topCategory="Food" expenseCount={3} />)
    expect(screen.getByText('₹900.00')).toBeInTheDocument()
  })

  it('renders the top category and transaction count', () => {
    render(<SummaryStats total={1250} highest={900} topCategory="Food" expenseCount={3} />)
    expect(screen.getByText('Food')).toBeInTheDocument()
    expect(screen.getByText('3 transactions tracked')).toBeInTheDocument()
  })

  it('uses the singular transaction label for one expense', () => {
    render(<SummaryStats total={80} highest={80} topCategory="Food" expenseCount={1} />)
    expect(screen.getByText('1 transaction tracked')).toBeInTheDocument()
  })

  it('shows zero values gracefully when there are no expenses', () => {
    render(<SummaryStats total={0} highest={0} topCategory="—" expenseCount={0} />)
    expect(screen.getAllByText('₹0.00')).toHaveLength(2)
    expect(screen.getByText('0 transactions tracked')).toBeInTheDocument()
    expect(screen.getByText('—')).toBeInTheDocument()
  })
})
