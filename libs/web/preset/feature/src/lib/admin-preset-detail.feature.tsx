import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOnePreset } from '@tokengator/web-preset-data-access'
import { PresetUiItem } from '@tokengator/web-preset-ui'
import { AdminPriceFeature } from '@tokengator/web-price-feature'
import { useParams } from 'react-router-dom'
import { AdminPresetDetailInfoTab } from './admin-preset-detail-info.tab'
import { AdminPresetDetailSettingsTab } from './admin-preset-detail-settings.tab'

export default function AdminPresetDetailFeature() {
  const { presetId } = useParams<{ presetId: string }>() as { presetId: string }
  const { item, query } = useAdminFindOnePreset({ presetId })

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
      element: <AdminPresetDetailInfoTab presetId={presetId} />,
    },
    {
      path: 'prices',
      label: 'Prices',
      element: <AdminPriceFeature presetId={presetId} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <AdminPresetDetailSettingsTab presetId={presetId} />,
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
