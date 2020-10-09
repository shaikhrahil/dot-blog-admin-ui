import {SpanSize} from 'models'
import styled from 'styled-components'

export const Spacer = styled.div<{size: SpanSize}>`
  display: 'flex';
  align-items: 'center';
  justify-content: 'space-between';
  > * {
    margin-left: ${(props) => {
      return props.theme.space[props.size]
    }};
    margin-right: ${(props) => {
      return props.theme.space[props.size]
    }};
  }
`
