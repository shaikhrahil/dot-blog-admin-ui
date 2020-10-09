import styled from 'styled-components'

export const SidebarTrigger = styled.button`
  cursor: pointer;
  transition: transform 0.2s;
  width: 70px;
  ${(props) => props.theme.nm}
  &:focus {
    outline: none;
    transform: rotateY(180deg);
  }
`
export const Sidebar = styled.div<{width?: string}>`
  position: absolute;
  height: 100%;
  width: ${({width}) => width || '20%'};
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 100%;
  transition: left 0.1s;
  ${(props) => props.theme.nm}
  &:focus-within {
    left: ${({width}) => `calc(100% - ${width})`};
  }
  ${SidebarTrigger} {
    position: absolute;
    top: 50%;
    z-index: 10;
    left: -50px;
  }
`
