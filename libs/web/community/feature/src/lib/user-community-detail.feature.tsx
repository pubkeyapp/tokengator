import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, type UiGridRoute, UiGridRoutes, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconDashboard, IconSettings, IconUsers } from '@tabler/icons-react'
import { useUserFindOneCommunity } from '@tokengator-mint/web-community-data-access'
import { UserCommunityMemberFeature } from '@tokengator-mint/web-community-member-feature'
import { CommunityUiItem } from '@tokengator-mint/web-community-ui'
import { useParams } from 'react-router-dom'
import { UserCommunityDetailDashboardTab } from './user-community-detail-dashboard-tab'
import { UserCommunityDetailSettingsTab } from './user-community-detail-settings.tab'

export function UserCommunityDetailFeature() {
  const { slug } = useParams<{ slug: string }>() as { slug: string }
  const { item, query } = useUserFindOneCommunity({ slug })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }
  const communityId = item.id

  const routes: UiGridRoute[] = [
    {
      path: 'dashboard',
      label: 'Dashboard',
      element: <UserCommunityDetailDashboardTab community={item} />,
      leftSection: <IconDashboard size={20} />,
    },
    {
      path: 'members',
      label: 'Members',
      element: <UserCommunityMemberFeature communityId={communityId} />,
      leftSection: <IconUsers size={20} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <UserCommunityDetailSettingsTab slug={slug} />,
      leftSection: <IconSettings size={20} />,
    },
  ]

  return (
    <UiPage
      title={<CommunityUiItem community={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiGridRoutes basePath={`${item?.viewUrl}`} routes={routes} />
    </UiPage>
  )
}
