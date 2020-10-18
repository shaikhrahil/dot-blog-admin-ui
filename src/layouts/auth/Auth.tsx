import {useAuth0} from '@auth0/auth0-react'
import {Heart} from '@styled-icons/boxicons-solid/Heart'
import {Button, Col, Dropdown, DropdownItem, Footer, Header, Logo, NavLink, Row} from 'components'
import {ROUTES} from 'configs'
import React, {ReactElement} from 'react'
import {Route, Switch} from 'react-router-dom'
import AuthRoutes from './AuthRoutes'
import {NetworkChart} from '@styled-icons/boxicons-regular/NetworkChart'
import {User} from '@styled-icons/boxicons-regular/User'
import {GridAlt} from '@styled-icons/boxicons-regular/GridAlt'
import {Pencil} from '@styled-icons/boxicons-regular/Pencil'

function Auth(): ReactElement {
  const {loginWithRedirect} = useAuth0()

  return (
    <main style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header>
        <Logo alt="logo" />
        <Col className="menu">
          <Row justify="flex-end" align="center" gutter="xl">
            <NavLink to={ROUTES.ROOT} exact>
              <GridAlt size="25px" /> Stories
              {/* <span>Stories</span> */}
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
        <Dropdown title={<>...</>} className="dropdown" align="right">
          <DropdownItem>
            <NavLink to={ROUTES.ROOT} exact>
              <GridAlt size="25px" />
              <span>Stories</span>
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink to={ROUTES.ABOUT} exact>
              <NetworkChart size="25px" />
              <span> About</span>
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink to={ROUTES.NEW_BLOG} exact>
              <Pencil size="25px" />
              <span>Try out the editor !</span>
            </NavLink>
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              loginWithRedirect()
            }}
            style={{padding: '15px'}}
          >
            <User size="25px" />
            <span>Login</span>
          </DropdownItem>
        </Dropdown>
      </Header>
      <section style={{flex: 1, position: 'relative'}}>
        <Switch>
          {AuthRoutes.map((props) => (
            <Route key={props.path?.toString() || 'page-not-found'} {...props} />
          ))}
        </Switch>
      </section>
      <Footer id="footer">
        <span>Created with</span>
        <Heart color="#39FF14" width="25px" style={{margin: '0px 8px'}} />
        <span>By Rahil</span>
      </Footer>
    </main>
  )
}

export default Auth
