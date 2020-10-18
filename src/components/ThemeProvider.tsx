import {LightTheme} from 'configs'
import React, {ReactElement} from 'react'
import {createGlobalStyle, ThemeProvider as StyledThemeProvider} from 'styled-components'
import {ModalProvider} from './ModalProvider'
import {ToastProvider} from './ToastProvider'

const GlobalStyle = createGlobalStyle`
  body {
      margin : 0;
      background: #f2f3f7;
      overflow-x : hidden;
  }
  * {
    font-family : Montserrat, sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans';
    font-size : 16px;
    line-height : 31px;
    letter-spacing : 0.8px;
    word-spacing : 2.5px
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #e1e1e1;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #000000;
  }
  ::-webkit-scrollbar-track {
    background: #666666;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-track:hover {
    background: #666666;
  }
  ::-webkit-scrollbar-track:active {
    background: #333333;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
`

interface Props {
  children: ReactElement | ReactElement[]
}

export const ThemeProvider = ({children}: Props) => {
  return (
    <StyledThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <ModalProvider>
        <ToastProvider>{children}</ToastProvider>
      </ModalProvider>
    </StyledThemeProvider>
  )
}
