import {useAuth0} from '@auth0/auth0-react'
import {Heart} from '@styled-icons/boxicons-solid/Heart'
import {Dropdown, DropdownMenuItem, Footer, Header, NavLink, Logo, Row} from 'components'
import {Avatar} from 'components/Avatar'
import {ROUTES} from 'configs'
import React, {ReactElement} from 'react'
import {Route, Switch} from 'react-router-dom'
import shortid from 'shortid'
import AdminRoutes from './AdminRoutes'

function AdminLayout(): ReactElement {
  const {logout, user} = useAuth0()
  return (
    <section style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header>
        <Logo alt="logo" />
        <Row align="middle" gutter="lg">
          <NavLink to={ROUTES.ROOT} exact>
            Stories
          </NavLink>
          <NavLink to={ROUTES.MY_BLOGS} exact>
            My Blogs
          </NavLink>
          <NavLink to={ROUTES.ABOUT} exact>
            About
          </NavLink>
          <NavLink to={ROUTES.NEW_BLOG} exact>
            New Blog
          </NavLink>
          <Dropdown
            title={
              <>
                <Avatar src={user.picture} alt={user.given_name} size="medium" />
                <span>{user.given_name}</span>
              </>
            }
          >
            <DropdownMenuItem>Edit Profile </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                logout()
              }}
            >
              Logout
            </DropdownMenuItem>
          </Dropdown>
        </Row>
      </Header>

      <section style={{flex: 1, position: 'relative'}}>
        <Switch>
          {AdminRoutes.map((props) => (
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

export default AdminLayout
