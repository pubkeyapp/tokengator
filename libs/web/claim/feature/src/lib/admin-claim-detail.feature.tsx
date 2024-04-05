import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOneClaim } from '@tokengator-mint/web-claim-data-access'
import { ClaimUiItem } from '@tokengator-mint/web-claim-ui'
import { useParams } from 'react-router-dom'
import { AdminClaimDetailInfoTab } from './admin-claim-detail-info.tab'
import { AdminClaimDetailSettingsTab } from './admin-claim-detail-settings.tab'

export default function AdminClaimDetailFeature() {
  const { claimId } = useParams<{ claimId: string }>() as { claimId: string }
  const { item, query } = useAdminFindOneClaim({ claimId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Claim not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'info',
      label: 'Info',
      element: <AdminClaimDetailInfoTab claimId={claimId} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <AdminClaimDetailSettingsTab claimId={claimId} />,
    },
  ]

  return (
    <UiPage
      title={<ClaimUiItem claim={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}
