import {useAuth0} from '@auth0/auth0-react'
import {Heart} from '@styled-icons/boxicons-solid/Heart'
import {Dropdown, DropdownMenuItem, Footer, Header, Link, Logo, Row} from 'components'
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
          <Link to={ROUTES.ROOT}>Stories</Link>
          <Link to={ROUTES.MY_BLOGS}>My Blogs</Link>
          <Link to={ROUTES.ABOUT}>About</Link>
          <Link to={ROUTES.NEW_BLOG}>New Blog</Link>
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
        <Heart color="red" width="25px" style={{margin: '0px 8px'}} />
        <span>By Rahil</span>
      </Footer>
    </section>
  )
}

export default AdminLayout
