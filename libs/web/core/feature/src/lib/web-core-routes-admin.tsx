import { UiContainer, UiDashboardGrid, UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import { IconAdjustmentsX, IconSettings, IconUsers, IconUsersGroup } from '@tabler/icons-react'
import { AdminCommunityFeature } from '@tokengator/web-community-feature'
import { DevAdminRoutes } from '@tokengator/web-dev-feature'
import { AdminPresetFeature } from '@tokengator/web-preset-feature'
import { AdminUserFeature } from '@tokengator/web-user-feature'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-crud generator
  { label: 'Communities', icon: IconUsersGroup, to: '/admin/communities' },
  { label: 'Mints', icon: IconSettings, to: '/admin/mints' },
  { label: 'Presets', icon: IconAdjustmentsX, to: '/admin/presets' },
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
  { label: 'Claims', icon: IconSettings, to: '/admin/claims' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-crud generator
  { path: 'development/*', element: <DevAdminRoutes /> },
  { path: 'users/*', element: <AdminUserFeature /> },
  { path: '/communities/*', element: <AdminCommunityFeature /> },
  { path: '/presets/*', element: <AdminPresetFeature /> },
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
