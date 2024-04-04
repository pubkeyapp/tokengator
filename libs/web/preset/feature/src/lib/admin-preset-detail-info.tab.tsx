import { useAdminFindOnePreset } from '@tokengator-mint/web-preset-data-access'
import { PresetUiInfo } from '@tokengator-mint/web-preset-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminPresetDetailInfoTab({ presetId }: { presetId: string }) {
  const { item, query } = useAdminFindOnePreset({ presetId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Preset not found." />
  }

  return (
    <UiCard>
      <PresetUiInfo preset={item} />
    </UiCard>
  )
}
