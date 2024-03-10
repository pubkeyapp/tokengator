import { IconSettings } from '@tabler/icons-react'
import { DevAdminRoutes } from '@tokengator-mint/web-dev-feature'
import { AdminUserFeature } from '@tokengator-mint/web-user-feature'
import { UiContainer, UiDashboardGrid, UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import { IconUsers } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { AdminMintFeature } from '@tokengator-mint/web-mint-feature'

const links: UiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-crud generator
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
  { label: 'Mints', icon: IconSettings, to: '/admin/mints' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-crud generator
  { path: 'development/*', element: <DevAdminRoutes /> },
  { path: 'users/*', element: <AdminUserFeature /> },
  { path: '/mints/*', element: <AdminMintFeature /> },
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
