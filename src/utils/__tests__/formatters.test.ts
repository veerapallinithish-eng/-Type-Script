import { describe, expect, it } from 'vitest'
import { formatCurrency, formatDate } from '../formatters'

describe('formatCurrency', () => {
  it('formats a positive amount in rupees', () => {
    expect(formatCurrency(1500)).toBe('₹1,500.00')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('₹0.00')
  })

  it('formats large amounts with Indian digit grouping', () => {
    expect(formatCurrency(12345678.9)).toBe('₹1,23,45,678.90')
  })

  it('formats negative amounts', () => {
    expect(formatCurrency(-500)).toBe('-₹500.00')
  })
})

describe('formatDate', () => {
  it('formats a valid ISO date', () => {
    expect(formatDate('2025-08-06')).toBe('Aug 6, 2025')
  })

  it('returns a clear label for invalid input', () => {
    expect(formatDate('not-a-date')).toBe('Invalid date')
  })
})
