import { UiContainer, UiDashboardGrid, UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import { IconSettings, IconUsers, IconUsersGroup } from '@tabler/icons-react'
import { AdminCommunityFeature } from '@tokengator-mint/web-community-feature'
import { DevAdminRoutes } from '@tokengator-mint/web-dev-feature'
import { AdminMintFeature } from '@tokengator-mint/web-mint-feature'
import { AdminUserFeature } from '@tokengator-mint/web-user-feature'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-crud generator
  { label: 'Communities', icon: IconUsersGroup, to: '/admin/communities' },
  { label: 'Mints', icon: IconSettings, to: '/admin/mints' },
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-crud generator
  { path: 'development/*', element: <DevAdminRoutes /> },
  { path: 'users/*', element: <AdminUserFeature /> },
  { path: '/mints/*', element: <AdminMintFeature /> },
  { path: '/communities/*', element: <AdminCommunityFeature /> },
]

export default function WebCoreRoutesAdmin() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    {
      path: 'dashboard/*',
      element: (
        <UiContainer>
          <UiDashboardGrid links={links} />
        </UiContainer>
      ),
    },
    ...routes,
    { path: '*', element: <UiNotFound to="/admin" /> },
  ])
}