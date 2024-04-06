import { useAdminFindOnePreset } from '@tokengator/web-preset-data-access'
import { AdminPresetUiUpdateForm } from '@tokengator/web-preset-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminPresetDetailSettingsTab({ presetId }: { presetId: string }) {
  const { item, query, updatePreset } = useAdminFindOnePreset({ presetId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Preset not found." />
  }

  return (
    <UiCard>
      <AdminPresetUiUpdateForm preset={item} submit={updatePreset} />
    </UiCard>
  )
}
