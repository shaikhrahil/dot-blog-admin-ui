import {ThemeProps} from 'models'
import styled from 'styled-components'

export const Button = styled.button<{icon?: boolean}>`
  padding: 15px 30px;
  cursor: pointer;
  transition: transform 0.2s;
  ${(props: ThemeProps) => props.theme.nm}
  margin: 12px 5px;
  &:focus {
    outline: none;
  }
  :hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(5px);
  }

  ${({icon}) => (icon ? {padding: '10px', borderRadius: '50%', width: 'auto'} : {})}
`
