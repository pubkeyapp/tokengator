import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOneMint } from '@tokengator-mint/web-mint-data-access'
import { MintUiItem } from '@tokengator-mint/web-mint-ui'
import { useParams } from 'react-router-dom'
import { AdminMintDetailInfoTab } from './admin-mint-detail-info.tab'
import { AdminMintDetailSettingsTab } from './admin-mint-detail-settings.tab'

export function AdminMintDetailFeature() {
  const { mintId } = useParams<{ mintId: string }>() as { mintId: string }
  const { item, query } = useAdminFindOneMint({ mintId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Mint not found." />
  }

  return (
    <UiPage
      title={<MintUiItem mint={item} />}
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
            element: <AdminMintDetailInfoTab mintId={mintId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminMintDetailSettingsTab mintId={mintId} />,
          },
        ]}
      />
    </UiPage>
  )
}
