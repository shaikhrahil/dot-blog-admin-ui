import {NavLink as RouterLink} from 'react-router-dom'
import styled from 'styled-components'

export const NavLink = styled(RouterLink)`
  text-decoration: none;
  padding: 10px 10px;
  color: black;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  & > * {
    margin: 0 5px;
  }
  :hover {
    border-color: ${(props) => props.theme.secondary};
    /* color: ${(props) => props.theme.secondary}; */
  }
  &.active {
    border-color: ${({theme}) => theme.primary};
  }
`
