import {ThemeProps} from 'models'
import styled from 'styled-components'
import {hexToRgbA} from 'utils'
import {fadeIn} from './animations'
export const CardActionsOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  transition: opacity 0.1s;
  opacity: 0;
  z-index: -1;
  cursor: default;
  background: ${({theme}) => hexToRgbA(theme.nm.background, 0.95)};
`

export const Card = styled.div<{clickable?: boolean; overlay?: boolean}>`
  padding: 20px;
  ${(props: ThemeProps) => props.theme.nm};
  ${({clickable}) => (clickable ? {cursor: 'pointer'} : {})}
  transition:  all 0.1s;
  animation: ${fadeIn} 0.5s linear forwards;
  position: relative;
  :hover {
    transform: translateY(-10px);
    .title {
      color: ${({theme}) => theme.secondary};
    }
    ${({overlay}) =>
      overlay
        ? `${CardActionsOverlay} {
            z-index: 1;
            opacity: 1;
          }`
        : ''}
  }
  :active {
    transform: translateY(10px);
  }
`
