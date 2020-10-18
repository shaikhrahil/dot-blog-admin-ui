import {ThemeProps} from 'models'
import React, {ImgHTMLAttributes, ReactElement, useMemo} from 'react'
import styled from 'styled-components'

const StyledImage = styled.img`
  width: calc(100% - 20px);
  border-radius: 30px;
  padding: 10px;
  ${(props: ThemeProps) => props.theme.nm};
  &.blurred-image {
    filter: blur(3px);
  }
`

export function Image(props: ImgHTMLAttributes<{}>): ReactElement {
  return useMemo(() => <StyledImage {...props} />, [props])
}
