import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { AdminClaimFeature } from '@tokengator-mint/web-claim-feature'
import { useAdminFindOneCommunity } from '@tokengator-mint/web-community-data-access'
import { AdminCommunityMemberFeature } from '@tokengator-mint/web-community-member-feature'
import { CommunityUiItem } from '@tokengator-mint/web-community-ui'
import { AdminWalletFeature } from '@tokengator-mint/web-wallet-feature'
import { useParams } from 'react-router-dom'
import { AdminCommunityDetailInfoTab } from './admin-community-detail-info.tab'
import { AdminCommunityDetailSettingsTab } from './admin-community-detail-settings.tab'

export function AdminCommunityDetailFeature() {
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, query } = useAdminFindOneCommunity({ communityId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

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
      <UiTabRoutes
        tabs={[
          {
            path: 'info',
            label: 'Info',
            element: <AdminCommunityDetailInfoTab communityId={communityId} />,
          },
          { path: 'claims', label: 'Claims', element: <AdminClaimFeature communityId={communityId} /> },
          { path: 'members', label: 'Members', element: <AdminCommunityMemberFeature communityId={communityId} /> },
          { path: 'wallets', label: 'Wallets', element: <AdminWalletFeature communityId={communityId} /> },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminCommunityDetailSettingsTab communityId={communityId} />,
          },
        ]}
      />
    </UiPage>
  )
}
