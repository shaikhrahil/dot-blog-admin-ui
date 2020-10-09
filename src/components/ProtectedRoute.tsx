import {useAuth0} from '@auth0/auth0-react'
import React, {ReactElement} from 'react'
import {Redirect, Route, RouteProps} from 'react-router-dom'

interface Props extends RouteProps {}

export function ProtectedRoute(props: Props): ReactElement {
  const {isAuthenticated} = useAuth0()
  return isAuthenticated ? <Route {...props} /> : <Redirect to="/" />
}
