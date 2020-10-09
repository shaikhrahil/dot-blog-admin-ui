import {SpanSize} from 'models'
import styled from 'styled-components'

export const Row = styled.div<{direction?: 'row' | 'column'; justify?: string; align?: string; gutter?: SpanSize | [SpanSize, SpanSize]}>`
  display: flex;
  flex-wrap: wrap;
  ${({justify}) => justify && {justifyContent: justify}};
  ${({align}) => align && {alignItems: align}};
  ${({direction}) => direction && {flexDirection: direction}};

  > * {
    ${({theme, gutter}) =>
      gutter
        ? typeof gutter === 'string'
          ? {margin: `0px ${theme.space[gutter]}`}
          : {margin: `${theme.space[gutter[0]]} ${theme.space[gutter[1]]}`}
        : {}}
  }

  /* &::after {
    content: '';
    clear: both;
    display: table;
  } */
`
