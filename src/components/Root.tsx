import {Auth0Provider} from '@auth0/auth0-react'
import {ApolloWrapper} from 'components'
import {LightTheme} from 'configs'
import React, {ReactElement} from 'react'
import {Router} from 'react-router-dom'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {history} from 'utils'
import {AppView} from 'views'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

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
`

export function Root(): ReactElement {
  return (
    <Auth0Provider domain={domain!} clientId={clientId!} redirectUri={window.location.origin} audience="https://rahil-shaikh.com">
      <ApolloWrapper>
        <ThemeProvider theme={LightTheme}>
          <GlobalStyle />
          <Router history={history}>
            <AppView />
          </Router>
        </ThemeProvider>
      </ApolloWrapper>
    </Auth0Provider>
  )
}
