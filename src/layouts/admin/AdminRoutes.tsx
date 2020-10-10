import {ROUTES} from 'configs'
import {RouteProps} from 'react-router-dom'
import {BlogView} from 'views/BlogView'
import {DashboardView} from 'views/DashboardView'
import {DraftsView} from 'views/DraftsView'
import {MyBlogsView} from 'views/MyBlogsView'
import {NewBlogView} from 'views/NewBlogView'
import {NotFoundView} from 'views/NotFoundView'
import {ProfileView} from 'views/ProfileView'

const AdminRoutes: RouteProps[] = [
  {
    path: ROUTES.ROOT,
    component: DashboardView,
    exact: true,
  },
  {
    path: ROUTES.MY_BLOGS,
    component: MyBlogsView,
    exact: true,
  },
  {
    path: ROUTES.BLOG,
    component: BlogView,
    exact: true,
  },
  {
    path: ROUTES.NEW_BLOG,
    component: NewBlogView,
    exact: true,
  },
  {
    path: ROUTES.DRAFTS,
    component: DraftsView,
    exact: true,
  },
  {
    path: ROUTES.PROFILE,
    component: ProfileView,
    exact: true,
  },
  {
    path: '',
    component: NotFoundView,
  },
]

export default AdminRoutes
