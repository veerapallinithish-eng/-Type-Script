import { useState } from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T): void => {
    setStored(value)
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Keep the in-memory update even when browser storage is unavailable.
    }
  }

  return [stored, setValue]
}