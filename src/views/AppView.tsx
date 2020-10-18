import {useAuth0} from '@auth0/auth0-react'
import {Loader, ProtectedRoute} from 'components'
import {Admin, Auth} from 'layouts'
import React, {ReactElement} from 'react'
import {Route, Switch} from 'react-router-dom'
import {NotFoundView} from './NotFoundView'

export function AppView(): ReactElement {
  const {isAuthenticated, isLoading, error} = useAuth0()
  console.log(error)
  return isLoading ? (
    <Loader fullscreen />
  ) : (
    <Switch>
      {!isAuthenticated ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/" component={Admin} />}
      <Route path="" component={NotFoundView} />
    </Switch>
  )
}
