import {useAuth0} from '@auth0/auth0-react'
import {Heart} from '@styled-icons/boxicons-solid/Heart'
import {Button, Footer, Header, Link, Logo, Spacer} from 'components'
import {ROUTES} from 'configs'
import React, {ReactElement} from 'react'
import {Route, Switch} from 'react-router-dom'
import shortid from 'shortid'
import AuthRoutes from './AuthRoutes'
function Auth(): ReactElement {
  const {loginWithRedirect} = useAuth0()

  return (
    <section style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header>
        <Logo alt="logo" />
        <Spacer size="lg">
          <Link to={ROUTES.ROOT}>Stories</Link>
          <Link to={ROUTES.ABOUT}>About</Link>
          <Link to={ROUTES.NEW_BLOG}>Try out the editor !</Link>
          <Button
            onClick={() => {
              loginWithRedirect()
            }}
            style={{marginTop: 0, marginBottom: 0}}
          >
            Register / Login
          </Button>
        </Spacer>
      </Header>
      <section style={{flex: 1, position: 'relative'}}>
        <Switch>
          {AuthRoutes.map((props) => (
            <Route key={shortid()} {...props} />
          ))}
        </Switch>
      </section>
      <Footer>
        <span>Created with</span>
        <Heart color="red" width="25px" style={{margin: '0px 8px'}} />
        <span>By Rahil</span>
      </Footer>
    </section>
  )
}

export default Auth
