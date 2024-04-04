import { UiContainer, UiDashboardGrid, UiDashboardItem } from '@pubkey-ui/core'
import { IconAdjustmentsX, IconSettings, IconUsersGroup } from '@tabler/icons-react'
import { UserCommunityFeature } from '@tokengator-mint/web-community-feature'
import { UserPresetFeature } from '@tokengator-mint/web-preset-feature'
import { SettingsFeature } from '@tokengator-mint/web-settings-feature'
import { SolanaFeature } from '@tokengator-mint/web-solana-feature'
import { UserFeature } from '@tokengator-mint/web-user-feature'
import { RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // User Dashboard Links are added by the web-crud generator
  { label: 'Communities', icon: IconUsersGroup, to: '/c' },
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Presets', icon: IconAdjustmentsX, to: '/presets' },
]

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/u/*', element: <UserFeature /> },
  { path: '/c/*', element: <UserCommunityFeature /> },
  { path: '/presets/*', element: <UserPresetFeature /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes(routes)
}

function Dashboard() {
  return (
    <UiContainer>
      <UiDashboardGrid links={links} />
    </UiContainer>
  )
}
