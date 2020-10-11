import {ThemeProps} from 'models'
import React, {ReactElement, useRef} from 'react'
import styled from 'styled-components'

export const DropdownMenu = styled.div`
  padding: 15px 30px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
`

export const DropdownMenuItem = styled.div`
  padding: 5px 8px;
  text-align: center;
  cursor: pointer;
  font-size: ${(props: ThemeProps) => props.theme.font.caption.fontSize};
  :hover {
    color: ${({theme}) => theme.primary};
  }
`

const StyledDropdownMenu = styled.div`
  position: absolute;
  transition: top 0.2s;
  opacity: 0;
  top: 80%;
  left: 0;
  z-index: 10;
  min-width: 100%;
  border-radius: 20px;
  border: ${({theme}) => `2px solid ${theme.primary}`};

  ::before,
  ::after {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: ${({theme}) => `10px solid ${theme.primary}`};
    top: -10px;
    content: '';
    left: 50%;
    margin-left: -20px;
    position: absolute;
  }
`

export const StyledDropdown = styled.button`
  cursor: pointer;
  transition: transform 0.2s;
  border: none;
  display: flex;
  align-items: center;
  &:focus {
    outline: none;
    & + ${StyledDropdownMenu} {
      z-index: 100;
    }
  }
  background: none;
  z-index: 11;
  position: relative;
`

interface Props {
  title: string | ReactElement
  children: ReactElement[]
}

export const Dropdown = (props: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const openMenu = () => {
    if (menuRef.current) {
      if (menuRef.current.style.opacity === '1') {
        closeMenu()
      } else {
        menuRef.current.style.top = 'calc(100% + 10px)'
        menuRef.current.style.opacity = '1'
      }
    }
  }

  const closeMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.top = '80%'
      menuRef.current.style.opacity = '0'
    }
  }

  return (
    <div onBlur={closeMenu} onClick={(e) => e.stopPropagation()} style={{position: 'relative', display: 'inline-block'}}>
      <StyledDropdown onClick={openMenu}>{props.title}</StyledDropdown>
      <StyledDropdownMenu ref={menuRef}>
        <div className="w-100" onClick={closeMenu}>
          {props.children}
        </div>
      </StyledDropdownMenu>
    </div>
  )
}
