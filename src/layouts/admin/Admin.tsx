import {useAuth0} from '@auth0/auth0-react'
import {LogOut} from '@styled-icons/boxicons-regular'
import {BookBookmark} from '@styled-icons/boxicons-regular/BookBookmark'
import {GridAlt} from '@styled-icons/boxicons-regular/GridAlt'
import {Loader} from '@styled-icons/boxicons-regular/Loader'
import {NetworkChart} from '@styled-icons/boxicons-regular/NetworkChart'
import {Pencil} from '@styled-icons/boxicons-regular/Pencil'
import {User} from '@styled-icons/boxicons-regular/User'
import {Heart} from '@styled-icons/boxicons-solid/Heart'
import {Col, Dropdown, DropdownItem, Footer, Header, Logo, NavLink, Row} from 'components'
import {Avatar} from 'components/Avatar'
import {ROUTES} from 'configs'
import React, {ReactElement} from 'react'
import {Route, Switch} from 'react-router-dom'
import AdminRoutes from './AdminRoutes'

function AdminLayout(): ReactElement {
  const {logout, user} = useAuth0()
  return (
    <main style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header>
        <NavLink to={ROUTES.ROOT} exact>
          <Logo alt="logo" />
        </NavLink>
        <Col className="menu">
          <Row justify="flex-end" align="center" gutter="xl">
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
              align="right"
            >
              <DropdownItem>
                <Loader size="25px" style={{marginRight: '10px'}} />
                Profile (Upcoming)
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  console.log('sdkjknsdjdkcsdjchsdbcjh')
                  logout()
                }}
              >
                <LogOut size="25px" style={{marginRight: '10px'}} />
                Logout
              </DropdownItem>
            </Dropdown>
          </Row>
        </Col>
        <Dropdown
          title={<>{user.picture ? <Avatar src={user.picture} alt={user.given_name} size="medium" bordered /> : <User size="25px" />}</>}
          className="dropdown"
          align="right"
        >
          <DropdownItem>
            <NavLink to={ROUTES.ROOT} exact>
              <GridAlt size="25px" />
              <span>Stories</span>
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink to={ROUTES.MY_BLOGS} exact>
              <BookBookmark size="25px" />
              <span>My Blogs</span>
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink to={ROUTES.ABOUT} exact>
              <NetworkChart size="25px" />
              <span>About</span>
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink to={ROUTES.NEW_BLOG} exact>
              <Pencil size="25px" />
              <span>New Blog</span>
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <Loader size="25px" style={{marginRight: '10px'}} />
            Profile (Upcoming)
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              console.log('sdkjknsdjdkcsdjchsdbcjh')
              logout()
            }}
          >
            <LogOut size="25px" style={{marginRight: '10px'}} />
            Logout
          </DropdownItem>
        </Dropdown>
      </Header>

      <section style={{flex: 1, position: 'relative'}}>
        <Switch>
          {AdminRoutes.map((props) => (
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

export default AdminLayout
