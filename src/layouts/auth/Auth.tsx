import {useAuth0} from '@auth0/auth0-react'
import {Heart} from '@styled-icons/boxicons-solid/Heart'
import {Button, Col, Footer, Header, Logo, NavLink, Row} from 'components'
import {ROUTES} from 'configs'
import React, {ReactElement} from 'react'
import {Route, Switch} from 'react-router-dom'
import shortid from 'shortid'
import AuthRoutes from './AuthRoutes'
import {NetworkChart} from '@styled-icons/boxicons-regular/NetworkChart'
import {User} from '@styled-icons/boxicons-regular/User'
import {GridAlt} from '@styled-icons/boxicons-regular/GridAlt'
import {Pencil} from '@styled-icons/boxicons-regular/Pencil'

function Auth(): ReactElement {
  const {loginWithRedirect} = useAuth0()

  return (
    <section id="appContainer" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header>
        <Logo alt="logo" />
        <Col xs={0} md={6}>
          <Row justify="flex-end" align="middle" gutter="lg">
            <NavLink to={ROUTES.ROOT} exact>
              <GridAlt size="25px" />
              <span>Stories</span>
            </NavLink>
            <NavLink to={ROUTES.ABOUT} exact>
              <NetworkChart size="25px" />
              <span> About</span>
            </NavLink>
            <NavLink to={ROUTES.NEW_BLOG} exact>
              <Pencil size="25px" />
              <span>Try out the editor !</span>
            </NavLink>
            <Button
              onClick={() => {
                loginWithRedirect()
              }}
              style={{marginTop: 0, marginBottom: 0}}
            >
              <User size="25px" />
              <span style={{marginLeft: '10px'}}>Register / Login</span>
            </Button>
          </Row>
        </Col>
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
        <Heart color="#39FF14" width="25px" style={{margin: '0px 8px'}} />
        <span>By Rahil</span>
      </Footer>
    </section>
  )
}

export default Auth
