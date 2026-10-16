import { useEffect } from 'react'
import { Check, CircleAlert, X } from 'lucide-react'
import type { ToastMessage } from '../types'

interface ToastItemProps {
  toast: ToastMessage
  onDismiss: (id: string) => void
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  useEffect(() => {
    const timeout = window.setTimeout(() => onDismiss(toast.id), 3200)
    return () => window.clearTimeout(timeout)
  }, [toast.id, onDismiss])

  const Icon = toast.variant === 'success' ? Check : CircleAlert

  return (
    <div className={`toast toast--${toast.variant}`} role="status">
      <span className="toast__icon"><Icon size={17} /></span>
      <span>{toast.message}</span>
      <button className="icon-button toast__close" onClick={() => onDismiss(toast.id)} aria-label="Dismiss notification">
        <X size={16} />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="toast-container" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />)}
    </div>
  )
}