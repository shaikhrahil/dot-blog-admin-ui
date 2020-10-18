import {Auth0Provider} from '@auth0/auth0-react'
import {ApolloWrapper} from 'components'
import React, {ReactElement} from 'react'
import {Router} from 'react-router-dom'
import {history} from 'utils'
import {AppView} from 'views/AppView'
import {ThemeProvider} from './ThemeProvider'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

export function Root(): ReactElement {
  return (
    <Auth0Provider domain={domain!} clientId={clientId!} redirectUri={window.location.origin} audience="https://rahil-shaikh.com">
      <ApolloWrapper>
        <ThemeProvider>
          <Router history={history}>
            <AppView />
          </Router>
        </ThemeProvider>
      </ApolloWrapper>
    </Auth0Provider>
  )
}
