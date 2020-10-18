export interface Toast {
  id?: string
  level?: ToastLevels
  message: string
  duration?: number
}

export type ToastLevels = 'error' | 'warning' | 'info' | 'success' | 'loading'
