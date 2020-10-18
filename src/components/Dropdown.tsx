import React, {ReactElement, useRef, useState} from 'react'
import styled from 'styled-components'
import {classNames} from 'utils'
import {Col} from './Col'
import {SpanSize} from 'models'
import {Button} from './Button'

interface Props {
  title: string | ReactElement
  children: ReactElement[]
  align?: 'right' | 'left'
  className?: string
  menuSize?: Partial<Record<SpanSize, number>>
}

export const DropdownItem = styled.div`
  cursor: pointer;
  &:hover {
    color: ${({theme}) => theme.primary};
  }
  padding: 10px;
  & > * {
    margin: 0px 5px;
    & > * {
      margin: 0px 5px;
    }
  }
`

const StyledDropdown = styled(Col)`
  border: ${({theme}) => `2px solid ${theme.primary}`};
  background: ${({theme}) => theme.nm.background};
  border-radius: 20px;
  position: fixed;
  opacity: 0;
  transition: transform 0.3s, opacity 0.1s;
  transform: translateY(-50px);
  z-index: -1;
  &.open {
    opacity: 1;
    transform: translateY(0px);
    z-index: 10000;
  }
`

const DropdownTrigger = styled(Button)`
  background: transparent;
  padding: 5px 10px;
  box-shadow: none;
  margin: 0;
  display: flex;
  align-items: center;
`

export const Dropdown = (props: Props) => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, toggle] = useState<boolean>(false)

  const closeMenu = () => {
    toggle(false)
  }

  return (
    <>
      <StyledDropdown
        onClick={closeMenu}
        style={{
          top: (triggerRef.current?.offsetTop || 0) + (triggerRef.current?.offsetHeight || 0) + 10,
          minWidth: triggerRef.current?.offsetWidth,
          ...(props.align === 'right'
            ? {right: `calc(100% - ${(triggerRef.current?.offsetLeft || 0) + (triggerRef.current?.offsetWidth || 0) + 30}px)`}
            : {left: triggerRef.current?.offsetLeft}),
          width: Object.keys(props.menuSize || {}).length ? '100%' : 'auto',
        }}
        {...props.menuSize}
        className={classNames({open})}
      >
        {props.children}
      </StyledDropdown>
      <DropdownTrigger ref={triggerRef} className={props.className} onClick={() => toggle(!open)}>
        {props.title}
      </DropdownTrigger>
    </>
  )
}
