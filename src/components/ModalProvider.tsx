import {ModalContext} from 'contexts'
import React, {ReactElement, useEffect, useRef} from 'react'
import shortid from 'shortid'

interface Props {
  children: ReactElement | ReactElement[]
}

export const ModalProvider = ({children}: Props) => {
  const id = useRef<string>(shortid()).current
  useEffect(() => {
    const modalEl = document.getElementById(id)
    if (!modalEl) {
      const el = document.createElement('div')
      el.id = id
      document.body.appendChild(el)
    }
  }, [id])

  return <ModalContext.Provider value={{id}}> {children} </ModalContext.Provider>
}
