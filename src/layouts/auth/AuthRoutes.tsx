import {ROUTES} from 'configs'
import {RouteProps} from 'react-router-dom'
import {NewBlogView} from 'views/NewBlogView'
import {AboutView} from 'views/AboutView'
import {LandingView} from 'views/LandingView'
import {BlogView} from 'views/BlogView'

const routes: RouteProps[] = [
  {
    path: ROUTES.ROOT,
    component: LandingView,
    exact: true,
  },
  {
    path: ROUTES.ABOUT,
    component: AboutView,
    exact: true,
  },
  {
    path: ROUTES.NEW_BLOG,
    component: NewBlogView,
    exact: true,
  },
  {
    path: ROUTES.BLOG,
    component: BlogView,
    exact: true,
  },
]

export default routes
