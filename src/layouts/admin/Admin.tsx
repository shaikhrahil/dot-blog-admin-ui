import {useAuth0} from '@auth0/auth0-react'
import {Heart} from '@styled-icons/boxicons-solid/Heart'
import {Col, Dropdown, DropdownMenuItem, Footer, Header, Logo, NavLink, Row} from 'components'
import {Avatar} from 'components/Avatar'
import {ROUTES} from 'configs'
import React, {ReactElement} from 'react'
import {Route, Switch} from 'react-router-dom'
import shortid from 'shortid'
import AdminRoutes from './AdminRoutes'
import {GridAlt} from '@styled-icons/boxicons-regular/GridAlt'
import {BookBookmark} from '@styled-icons/boxicons-regular/BookBookmark'
import {User} from '@styled-icons/boxicons-regular/User'
import {Pencil} from '@styled-icons/boxicons-regular/Pencil'
import {NetworkChart} from '@styled-icons/boxicons-regular/NetworkChart'
import {Loader} from '@styled-icons/boxicons-regular/Loader'

function AdminLayout(): ReactElement {
  const {logout, user} = useAuth0()
  return (
    <section id="appContainer" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header>
        <Logo alt="logo" />
        <Col xs={0} lg={9}>
          <Row justify="flex-end" align="middle" gutter="lg">
            <NavLink to={ROUTES.ROOT} exact>
              <GridAlt size="25px" />
              <span>Stories</span>
            </NavLink>
            <NavLink to={ROUTES.MY_BLOGS} exact>
              <BookBookmark size="25px" />
              <span>My Blogs</span>
            </NavLink>
            <NavLink to={ROUTES.ABOUT} exact>
              <NetworkChart size="25px" />
              <span>About</span>
            </NavLink>
            <NavLink to={ROUTES.NEW_BLOG} exact>
              <Pencil size="25px" />
              <span>New Blog</span>
            </NavLink>
            <Dropdown
              title={
                <>
                  {user.picture ? <Avatar src={user.picture} alt={user.given_name} size="medium" bordered /> : <User size="25px" />}
                  <span>{user.given_name}</span>
                </>
              }
            >
              <DropdownMenuItem>
                <Loader size="25px" style={{marginRight: '10px'}} />
                Profile (Upcoming)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  logout()
                }}
              >
                Logout
              </DropdownMenuItem>
            </Dropdown>
          </Row>
        </Col>
      </Header>

      <section style={{flex: 1, position: 'relative'}}>
        <Switch>
          {AdminRoutes.map((props) => (
            <Route key={shortid()} {...props} />
          ))}
        </Switch>
      </section>

      <Footer id="footer">
        <span>Created with</span>
        <Heart color="#39FF14" width="25px" style={{margin: '0px 8px'}} />
        <span>By Rahil</span>
      </Footer>
    </section>
  )
}

export default AdminLayout
