import {Toast} from 'models/ToastModel'
import {createContext} from 'react'
import shortid from 'shortid'

export const ToastContext = createContext<{
  id: string
  toasts: Toast[]
  notify: (toast: Toast) => string
  closeNotification: (id: string) => void
}>({
  id: shortid(),
  toasts: [],
  notify: () => '',
  closeNotification: () => {},
})
