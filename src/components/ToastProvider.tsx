import {CheckCircle, Error, ErrorCircle, InfoCircle} from '@styled-icons/boxicons-regular'
import {LoaderAlt} from '@styled-icons/boxicons-regular/LoaderAlt'
import {LightTheme} from 'configs'
import {ToastContext} from 'contexts'
import {Toast, ToastLevels} from 'models'
import React, {ReactElement, useContext, useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import shortid from 'shortid'
import styled from 'styled-components'
import {fadeIn, rotate} from './animations'
interface Props {
  children: ReactElement | ReactElement[]
}

export const ToastProvider = ({children}: Props) => {
  const id = useRef<string>(shortid()).current

  const [state, setState] = useState<{
    toasts: Toast[]
    notify: (toast: Toast) => string
    closeNotification: (id: string) => void
  }>(() => ({
    toasts: [],
    notify: (toast: Toast) => {
      setState((prevState) => ({...prevState, toasts: [toast, ...prevState.toasts]}))
      if (toast.level !== 'loading') {
        setTimeout(() => {
          setState((prevState) => ({...prevState, toasts: prevState.toasts.filter((x) => x.id !== toast.id)}))
        }, toast.duration!)
      }
      return toast.id!
    },
    closeNotification: (id: string) => {
      setState((prevState) => {
        const newToasts = prevState.toasts.filter((x) => x.id !== id)
        return {...prevState, toasts: newToasts}
      })
    },
  }))

  useEffect(() => {
    const toastEl = document.getElementById(id)
    if (!toastEl) {
      const el = document.createElement('div')
      el.id = id
      document.body.appendChild(el)
    }
  }, [id])


  return (
    <ToastContext.Provider value={{id, ...state}}>
      <ToastComponent />
      {children}
    </ToastContext.Provider>
  )
}

const ToastWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 101;
  transform: translateX(-50%);
`

const StyledToast = styled.div`
  ${({theme}) => theme.nm}
  animation: ${fadeIn} 0.2s linear forwards;
  padding: 10px;
  margin: 10px 5px;
  &.loading svg {
    animation: ${rotate} 2s linear infinite;
  }
`

const ToastComponent = () => {
  const {id, toasts} = useContext(ToastContext)
  const icons: Record<ToastLevels, any> = {
    error: <Error size="25px" color={LightTheme.error} />,
    info: <InfoCircle size="25px" color={LightTheme.secondary} />,
    success: <CheckCircle size="25px" color={LightTheme.primary} />,
    warning: <ErrorCircle size="25px" color={LightTheme.error} />,
    loading: <LoaderAlt size="25px" color={LightTheme.secondary} />,
  }
  return document.getElementById(id)
    ? createPortal(
        <ToastWrapper>
          {toasts.map(({level, message}) => {
            const Icon = icons[level as ToastLevels]
            return (
              <StyledToast key={shortid()} className={level}>
                {message} {Icon}
              </StyledToast>
            )
          })}
        </ToastWrapper>,
        document.getElementById(id)!,
      )
    : null
}
