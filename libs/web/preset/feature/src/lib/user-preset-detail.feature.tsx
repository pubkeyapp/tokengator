import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useUserFindOnePreset } from '@tokengator-mint/web-preset-data-access'
import { PresetUiItem } from '@tokengator-mint/web-preset-ui'
import { useParams } from 'react-router-dom'
import { UserPresetDetailInfoTab } from './user-preset-detail-info.tab'

export default function UserPresetDetailFeature() {
  const { presetId } = useParams<{ presetId: string }>() as { presetId: string }
  const { item, query } = useUserFindOnePreset({ presetId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Preset not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'info',
      label: 'Info',
      element: <UserPresetDetailInfoTab presetId={presetId} />,
    },
  ]

  return (
    <UiPage
      title={<PresetUiItem preset={item} />}
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
