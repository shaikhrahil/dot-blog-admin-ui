import {ToastContext} from 'contexts'
import {Toast} from 'models/ToastModel'
import {useContext} from 'react'
import shortid from 'shortid'

export const useToast = () => {
  const {notify: notifyContext, closeNotification} = useContext(ToastContext)
  const notify = (props: Toast) => {
    return notifyContext({...props, id: props.id || shortid(), level: props.level || 'info', duration: props.duration || 5000})
  }
  return {notify, closeNotification}
}
