import styled from 'styled-components'
import {device} from './media'
import {NavLink} from './NavLink'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  text-decoration: none;
  .menu {
    display: none;
    svg {
      margin: 0px 5px;
    }
    /* & > * > * {
      padding: 5px;
    } */
  }
  .dropdown {
    display: flex;
    & + div {
      ${NavLink} {
        border-color: transparent;
        &.active {
          color: ${({theme}) => theme.primary};
        }
      }
    }
  }
  @media ${device.md} {
    .dropdown {
      display: none !important;
    }
    .menu {
      display: block;
    }
  }
`
