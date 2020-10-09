import {useAuth0} from '@auth0/auth0-react'
import {ProtectedRoute} from 'components'
import {Admin, Auth} from 'layouts'
import React, {ReactElement} from 'react'
import {Route, Switch} from 'react-router-dom'
import {NotFoundView} from './NotFoundView'

export function AppView(): ReactElement {
  const {isAuthenticated} = useAuth0()
  return (
    <Switch>
      {!isAuthenticated ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/" component={Admin} />}
      <Route path="" component={NotFoundView} />
    </Switch>
  )
}
