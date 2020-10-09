import {Link as RouterLink} from 'react-router-dom'
import styled from 'styled-components'
import {history} from 'utils'

export const Link = styled(RouterLink)`
  text-decoration: none;
  padding: 10px 10px;
  color: black;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  :hover {
    border-color: ${(props) => props.theme.secondary};
    /* color: ${(props) => props.theme.secondary}; */
  }
  ${(props) => {
    return props.to.toString() === history.location.pathname
      ? {
          'border-color': props.theme.primary,
          // color: props.theme.primary,
        }
      : {}
  }}
`
