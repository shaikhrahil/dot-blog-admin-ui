import {FontSize} from 'models'
import styled from 'styled-components'

export const Text = styled.div<{level: FontSize; truncate?: number; underline?: boolean; align?: 'start' | 'center' | 'end'}>`
  ${(props) => props.theme.font[props.level]}
  ${({align}) => align && {textAlign: align}}
  ${({truncate}) =>
    truncate
      ? {
          'text-overflow': 'ellipsis',
          display: ' -webkit-box',
          '-webkit-line-clamp': truncate.toString(),
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        }
      : {}}
  ${({underline, theme}) => (underline ? {textDecoration: 'underline', textDecorationColor: theme.primary, textDecorationWidth: '5px'} : '')}
`
