import {ModalProps, SpanSize} from 'models'
import React, {forwardRef, ReactElement, useImperativeHandle, useState} from 'react'
import {createPortal} from 'react-dom'
import styled from 'styled-components'
import {classNames, hexToRgbA} from 'utils'
import {Col} from './Col'
import {Row} from './Row'

interface Props {
  children: ReactElement
  size?: SpanSize
}

interface State {
  show: boolean
}

const StyledModal = styled(Col)`
  ${({theme}) => theme.nm}
  transition: opacity, transform 0.5s;
  opacity: 0;
  transform: translateY(-100px);
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

const Modal = forwardRef<ModalProps, Props>(({children, size}, ref) => {
  const widths: Record<SpanSize, number> = {
    lg: 8,
    md: 7,
    sm: 5,
    xl: 10,
    xs: 4,
  }
  const [state, setState] = useState<State>({show: false})
  const {show} = state
  const toggle = (show: boolean = !state.show) => {
    setState({...state, show})
  }

  useImperativeHandle(ref, () => ({
    toggle,
  }))

  return document.getElementById('modal') ? (
    createPortal(
      <BackDrop className={classNames({show})} onClick={() => toggle(false)}>
        <StyledModal xs={10} md={widths[size || 'md']} onClick={(e) => e.stopPropagation()}>
          {children}
        </StyledModal>
      </BackDrop>,
      document.getElementById('modal')!,
    )
  ) : (
    <BackDrop className={classNames({show})} onClick={() => toggle(false)}></BackDrop>
  )
})

export default Modal
