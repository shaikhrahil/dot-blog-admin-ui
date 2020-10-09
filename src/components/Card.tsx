import {ThemeProps} from 'models'
import styled from 'styled-components'
import {Text} from './Text'

export const Card = styled.div<{clickable?: boolean}>`
  padding: 20px;
  ${(props: ThemeProps) => props.theme.nm};
  ${({clickable}) => (clickable ? {cursor: 'pointer'} : {})}
  transition:  all 0.1s;
  :hover {
    transform: translateY(-10px);
    ${Text} {
      color: ${({theme}) => theme.secondary};
    }
  }
  :active {
    transform: translateY(10px);
  }
`
