import { useState } from 'react'
import type { ToastMessage, ToastVariant } from '../types'

export default function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const dismissToast = (id: string): void => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }

  const addToast = (message: string, variant: ToastVariant = 'success'): void => {
    const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
    setToasts((current) => [...current, { id, message, variant }])
  }

  return { toasts, addToast, dismissToast }
}