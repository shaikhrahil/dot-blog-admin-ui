import {keyframes} from 'styled-components'

export const fadeIn = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
`

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
