import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import useLocalStorage from '../useLocalStorage'

beforeEach(() => {
  window.localStorage.clear()
})

describe('useLocalStorage', () => {
  it('returns the initial value when the key is not stored', () => {
    const { result } = renderHook(() => useLocalStorage('expenses', [] as string[]))
    expect(result.current[0]).toEqual([])
  })

  it('returns the stored value when the key exists', () => {
    window.localStorage.setItem('expenses', JSON.stringify(['Lunch']))
    const { result } = renderHook(() => useLocalStorage('expenses', [] as string[]))
    expect(result.current[0]).toEqual(['Lunch'])
  })

  it('updates localStorage when the setter is called', () => {
    const { result } = renderHook(() => useLocalStorage('expenses', [] as string[]))
    act(() => result.current[1](['Coffee']))
    expect(window.localStorage.getItem('expenses')).toBe('["Coffee"]')
    expect(result.current[0]).toEqual(['Coffee'])
  })
})
