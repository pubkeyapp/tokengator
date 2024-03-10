import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useUserFindOneMint } from '@tokengator-mint/web-mint-data-access'
import { MintUiItem } from '@tokengator-mint/web-mint-ui'
import { useParams } from 'react-router-dom'
import { UserMintDetailInfoTab } from './user-mint-detail-info.tab'
import { UserMintDetailSettingsTab } from './user-mint-detail-settings.tab'

export function UserMintDetailFeature() {
  const { mintId } = useParams<{ mintId: string }>() as { mintId: string }
  const { item, query } = useUserFindOneMint({ mintId })

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
            element: <UserMintDetailInfoTab mintId={mintId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <UserMintDetailSettingsTab mintId={mintId} />,
          },
        ]}
      />
    </UiPage>
  )
}
