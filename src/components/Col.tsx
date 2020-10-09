import {SpanSize} from 'models'
import styled from 'styled-components'

function getWidth(span: number): any {
  if (!span) return {}
  let width = (span / 12) * 100
  return {width: `${width}%`}
}

export const Col = styled.div<Partial<Record<SpanSize, number>>>`
  float: left;
  width: 100%;
  ${({xs}) => (xs ? getWidth(xs) : 'width : 100%')}

  @media only screen and (min-width : 768px) {
    ${({sm}) => sm && getWidth(sm)}
  }

  @media only screen and (min-width: 992px) {
    ${({md}) => md && getWidth(md)}
  }

  @media only screen and (min-width: 1200px) {
    ${({lg}) => lg && getWidth(lg)}
  }

  @media only screen and (min-width: 1400px) {
    ${({xl}) => xl && getWidth(xl)}
  }

  ${'.full-width'} {
    width: 100%;
  }
`
