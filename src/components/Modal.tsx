import {ModalContext} from 'contexts'
import {ModalProps, SpanSize} from 'models'
import React, {forwardRef, ReactElement, useCallback, useContext, useEffect, useImperativeHandle, useState} from 'react'
import {createPortal} from 'react-dom'
import shortid from 'shortid'
import styled from 'styled-components'
import {classNames, hexToRgbA} from 'utils'
import {fadeIn} from './animations'
import {Col} from './Col'
import {Row} from './Row'

interface Props {
  children: ReactElement
  size?: SpanSize
  disableBackdropClose?: boolean
}

interface State {
  show: boolean
  data?: any
  id: string
}

const StyledModal = styled(Col)`
  ${({theme}) => theme.nm}
  animation: ${fadeIn} 0.2s linear forwards;
  /* transition: opacity, transform 0.5s;
  opacity: 0;
  transform: translateY(-100px); */
  margin: 100px 0px;
  padding: 30px 20px;
`

const BackDrop = styled(Row)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  ${({theme}) => theme.nm}
  background :  ${({theme}) => hexToRgbA(theme.nm.background, 0.95)};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  overflow-y: auto;
  z-index: -1;
  &.show {
    opacity: 1;
    z-index: 100;
    ${StyledModal} {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`

export const Modal = forwardRef<ModalProps, Props>(({children, size, disableBackdropClose}, ref) => {
  const widths: Record<SpanSize, number> = {
    lg: 8,
    md: 7,
    sm: 5,
    xl: 10,
    xs: 4,
  }
  const {id: modalId} = useContext(ModalContext)
  const [state, setState] = useState<State>({show: false, id: shortid()})
  const {id} = state
  const toggle = useCallback(
    (show: boolean = !state.show, data?: any) => {
      if (show) {
        document.getElementById(modalId)?.insertAdjacentHTML('afterend', `<div id=${id} class="modal" > </div>`)
      } else {
        const el = document.getElementById(id)
        el?.remove()
      }
      if (data) {
        setState({...state, show, data})
      } else {
        setState({...state, show})
      }
    },
    [setState, id, modalId, state],
  )

  const toggleShortcuts = useCallback(
    async (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggle(false)
      }
    },
    [toggle],
  )

  useEffect(() => {
    if (!disableBackdropClose) {
      document.addEventListener('keydown', toggleShortcuts)
    }
    return () => {
      document.removeEventListener('keydown', toggleShortcuts)
    }
  }, [toggleShortcuts])

  useImperativeHandle(ref, () => ({
    toggle,
    getData: () => state.data,
  }))

  return document.getElementById(id)
    ? createPortal(
        <BackDrop
          className={classNames({show: state.show})}
          onClick={() => {
            if (!disableBackdropClose) {
              toggle(false)
            }
          }}
        >
          <StyledModal xs={10} md={widths[size || 'md']} onClick={(e) => e.stopPropagation()}>
            {children}
          </StyledModal>
        </BackDrop>,
        document.getElementById(id)!,
      )
    : null
})
