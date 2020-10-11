export interface ModalProps<T = any> {
  toggle: (show?: boolean, data?: T) => void
  getData: () => T
}
