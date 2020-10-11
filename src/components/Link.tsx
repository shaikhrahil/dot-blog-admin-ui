import {Link as RouterLink} from 'react-router-dom'
import styled from 'styled-components'

export const Link = styled(RouterLink)`
  text-decoration: none;
  transition: color 0.2s;
  color: inherit;
  :hover {
    color: ${(props) => props.theme.secondary};
  }
`
