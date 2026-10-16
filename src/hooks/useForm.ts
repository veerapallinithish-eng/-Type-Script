import { useState } from 'react'

export default function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)

  const setField = <K extends keyof T>(field: K, value: T[K]): void => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  return { values, setField }
}