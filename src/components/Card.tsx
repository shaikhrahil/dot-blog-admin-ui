import {ThemeProps} from 'models'
import styled, {keyframes} from 'styled-components'
import {hexToRgbA} from 'utils'
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

const fadeIn = keyframes`
  from {
    transform: translateY(-5px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
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
