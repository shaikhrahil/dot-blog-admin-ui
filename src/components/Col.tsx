import {SpanSize} from 'models'
import styled from 'styled-components'
import {device} from './media'

function getWidth(span: number): any {
  if (!span) return {}
  let width = (span / 12) * 100
  return {maxWidth: `${width}%`}
}

export const Col = styled.div<Partial<Record<SpanSize, number>>>`
  float: left;
  width: 100%;
  ${({xs}) => xs && getWidth(xs)}

  @media ${device.sm} {
    ${({sm}) => sm && getWidth(sm)}
  }

  @media ${device.md} {
    ${({md}) => md && getWidth(md)}
  }

  @media ${device.lg} {
    ${({lg}) => lg && getWidth(lg)}
  }

  @media ${device.xl} {
    ${({xl}) => xl && getWidth(xl)}
  }
`
